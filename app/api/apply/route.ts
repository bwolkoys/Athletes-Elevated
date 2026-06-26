// Place this file at: app/api/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    sportOrIndustry,
    referredBy,
    whyJoin,
    website,
  } = body;

  // These come from your .env.local file
  const AIRTABLE_TOKEN    = process.env.AIRTABLE_TOKEN!;
  const AIRTABLE_BASE_ID  = process.env.AIRTABLE_BASE_ID!;
  const AIRTABLE_TABLE    = process.env.AIRTABLE_TABLE_MEMBERSHIP_ID!;

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'First Name':        firstName,
          'Last Name':         lastName,
          'Email':             email,
          'Phone':             phone,
          'Role':              role,
          'Sport / Industry':  sportOrIndustry,
          'Referred By':       referredBy,
          'Why Join':          whyJoin,
          'Website':           website,
        },
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error('Airtable error:', error);
    return NextResponse.json({ error: 'Airtable submission failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}