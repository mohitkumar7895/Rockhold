import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { query } from '@/lib/db';

declare global {
  var __rockholdUploads: Map<string, { buffer: Buffer; mimeType: string }> | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Please log in to admin panel' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = (formData.get('file') || formData.get('image')) as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File exceeds 10MB size limit' },
        { status: 400 }
      );
    }

    // Validate allowed mime types
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'application/pdf',
    ];

    const fileType = file.type || 'image/jpeg';
    if (!allowedMimeTypes.includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WEBP, SVG, GIF, PDF' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const ext = path.extname(file.name) || (fileType === 'application/pdf' ? '.pdf' : '.jpg');
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .toLowerCase()
      .substring(0, 50);
    const uniqueName = `${baseName || 'upload'}-${Date.now()}${ext}`;

    // 1. In-memory cache for fast container serving
    if (!globalThis.__rockholdUploads) {
      globalThis.__rockholdUploads = new Map();
    }
    if (globalThis.__rockholdUploads.size > 100) {
      const firstKey = globalThis.__rockholdUploads.keys().next().value;
      if (firstKey) globalThis.__rockholdUploads.delete(firstKey);
    }
    globalThis.__rockholdUploads.set(uniqueName, { buffer, mimeType: fileType });

    // 2. Safe OS Temp storage (/tmp is always writable on Vercel & serverless)
    try {
      const tmpDir = path.join(os.tmpdir(), 'rockhold-uploads');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tmpDir, uniqueName), buffer);
    } catch (tmpErr) {
      console.warn('Could not write to os.tmpdir:', tmpErr);
    }

    // 3. Local disk public storage (writable in local dev / dedicated servers)
    try {
      const uploadsDir = path.join(process.cwd(), 'public/images/uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, uniqueName), buffer);
    } catch (fsErr) {
      // Intentionally caught: Vercel serverless has a read-only /var/task filesystem
      // Storage falls back to in-memory, /tmp, and MySQL below.
    }

    // 4. MySQL persistent storage (survives container restarts on Vercel)
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS \`uploaded_files\` (
          \`id\` INT AUTO_INCREMENT PRIMARY KEY,
          \`filename\` VARCHAR(255) NOT NULL UNIQUE,
          \`original_name\` VARCHAR(255) NOT NULL,
          \`mime_type\` VARCHAR(100) NOT NULL,
          \`size\` INT NOT NULL,
          \`data\` LONGBLOB NOT NULL,
          \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_upload_filename (\`filename\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      await query(
        `INSERT INTO uploaded_files (filename, original_name, mime_type, size, data)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE data = VALUES(data), mime_type = VALUES(mime_type)`,
        [uniqueName, file.name, fileType, file.size, buffer]
      );
    } catch (dbErr: any) {
      console.warn('MySQL uploaded_files persistence warning (non-fatal):', dbErr?.message);
    }

    // Base64 Data URL for instant zero-latency client-side preview
    const dataUrl = `data:${fileType};base64,${buffer.toString('base64')}`;
    const servedUrl = `/api/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: servedUrl,
      publicUrl: `/images/uploads/${uniqueName}`,
      dataUrl,
      filename: uniqueName,
    });
  } catch (error: any) {
    console.error('Upload error in POST /api/upload:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error?.message || 'Internal Server Error') },
      { status: 500 }
    );
  }
}
