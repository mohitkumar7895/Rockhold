import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { query } from '@/lib/db';

declare global {
  var __rockholdUploads: Map<string, { buffer: Buffer; mimeType: string }> | undefined;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;

  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  // 1. Check in-memory container cache
  if (globalThis.__rockholdUploads && globalThis.__rockholdUploads.has(filename)) {
    const cached = globalThis.__rockholdUploads.get(filename)!;
    return new Response(new Uint8Array(cached.buffer), {
      status: 200,
      headers: {
        'Content-Type': cached.mimeType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // 2. Check local public uploads directory (if local disk is readable)
  try {
    const localPath = path.join(process.cwd(), 'public/images/uploads', filename);
    if (fs.existsSync(localPath)) {
      const buffer = await fs.promises.readFile(localPath);
      const mimeType = getMimeType(filename);
      // Cache in memory
      setUploadCache(filename, buffer, mimeType);
      return new Response(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  } catch (e) {
    // Ignore read errors
  }

  // 3. Check OS temp directory (/tmp/rockhold-uploads)
  try {
    const tmpPath = path.join(os.tmpdir(), 'rockhold-uploads', filename);
    if (fs.existsSync(tmpPath)) {
      const buffer = await fs.promises.readFile(tmpPath);
      const mimeType = getMimeType(filename);
      setUploadCache(filename, buffer, mimeType);
      return new Response(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  } catch (e) {
    // Ignore temp read errors
  }

  // 4. Check MySQL uploaded_files table
  try {
    const rows = await query<any[]>(
      'SELECT mime_type, data FROM uploaded_files WHERE filename = ? LIMIT 1',
      [filename]
    );
    if (rows && rows.length > 0) {
      const row = rows[0];
      const buffer = Buffer.isBuffer(row.data) ? row.data : Buffer.from(row.data);
      const mimeType = row.mime_type || getMimeType(filename);
      setUploadCache(filename, buffer, mimeType);

      // Attempt to save to tmp directory for faster future reads
      try {
        const tmpDir = path.join(os.tmpdir(), 'rockhold-uploads');
        if (!fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir, { recursive: true });
        }
        fs.writeFileSync(path.join(tmpDir, filename), buffer);
      } catch (err) {}

      return new Response(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  } catch (dbErr) {
    // MySQL table not ready or disconnected
  }

  return NextResponse.json({ error: 'File not found' }, { status: 404 });
}

function setUploadCache(filename: string, buffer: Buffer, mimeType: string) {
  if (!globalThis.__rockholdUploads) {
    globalThis.__rockholdUploads = new Map();
  }
  // Prevent unbounded memory growth: keep up to 100 most recent items
  if (globalThis.__rockholdUploads.size > 100) {
    const firstKey = globalThis.__rockholdUploads.keys().next().value;
    if (firstKey) globalThis.__rockholdUploads.delete(firstKey);
  }
  globalThis.__rockholdUploads.set(filename, { buffer, mimeType });
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.gif':
      return 'image/gif';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream';
  }
}
