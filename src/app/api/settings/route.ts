export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT setting_key, setting_value, setting_group FROM website_settings');
    const settings: Record<string, string> = {};
    const grouped: Record<string, Record<string, string>> = {};

    for (const row of rows) {
      settings[row.setting_key] = row.setting_value;
      if (!grouped[row.setting_group]) {
        grouped[row.setting_group] = {};
      }
      grouped[row.setting_group][row.setting_key] = row.setting_value;
    }

    return NextResponse.json({
      success: true,
      settings,
      grouped,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 });
    }

    // Upsert each setting
    for (const [key, value] of Object.entries(settings)) {
      if (typeof key === 'string') {
        await query(
          `INSERT INTO website_settings (setting_key, setting_value)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = ?`,
          [key, String(value ?? ''), String(value ?? '')]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Website settings saved successfully',
    });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
