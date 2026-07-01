// Place this file at: app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey  = process.env.AIRTABLE_TOKEN;
    const baseId  = process.env.AIRTABLE_BASE_ID;
    // Use a separate table for the waitlist — add AIRTABLE_WAITLIST_TABLE to .env.local
    // e.g. AIRTABLE_WAITLIST_TABLE=Waitlist
    const table   = process.env.AIRTABLE_TABLE_WAITLIST ?? 'Waitlist';

    if (!apiKey || !baseId) {
      console.error('Missing Airtable env vars');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'First Name': firstName ?? '',
            'Last Name':  lastName  ?? '',
            Email:        email,
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.json();
      console.error('Airtable error:', err);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}