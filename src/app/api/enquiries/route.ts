export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { contactFormSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '15', 10)));
    const offset = (page - 1) * limit;

    let sql = `
      SELECT e.*, p.name as product_name, p.slug as product_slug
      FROM enquiries e
      LEFT JOIN products p ON e.product_id = p.id
      WHERE 1=1
    `;
    let countSql = `SELECT COUNT(*) as total FROM enquiries e WHERE 1=1`;
    const params: any[] = [];
    const countParams: any[] = [];

    if (status && status !== 'all') {
      sql += ' AND e.status = ?';
      countSql += ' AND e.status = ?';
      params.push(status);
      countParams.push(status);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      const searchClause = ' AND (e.name LIKE ? OR e.email LIKE ? OR e.phone LIKE ? OR e.company LIKE ? OR e.message LIKE ?)';
      sql += searchClause;
      countSql += searchClause;
      params.push(term, term, term, term, term);
      countParams.push(term, term, term, term, term);
    }

    sql += ' ORDER BY e.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [enquiries, countResult] = await Promise.all([
      query<any[]>(sql, params),
      query<any[]>(countSql, countParams),
    ]);

    const total = countResult[0]?.total || 0;

    return NextResponse.json({
      success: true,
      enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Fetch enquiries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Please check the form fields', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, company, subject, message, product_id } = validated.data;

    const result: any = await query(
      `INSERT INTO enquiries (name, email, phone, company, subject, message, product_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        name,
        email,
        phone,
        company || null,
        subject || 'General Enquiry',
        message,
        product_id || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      enquiryId: result.insertId,
    });
  } catch (error: any) {
    console.error('Submit enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry: ' + error.message },
      { status: 500 }
    );
  }
}
