// Place this file at: app/api/partnerships/route.ts

import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_TOKEN    = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID  = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE    = process.env.AIRTABLE_TABLE_PARTNERSHIPS!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      organization,
      email,
      phone,
      inquiryType,
      heardAbout,
      message,
    } = body;

    // Basic required-field guard
    if (!firstName || !lastName || !organization || !email || !inquiryType || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Map form fields → Airtable field names.
    // Update the keys on the right to match your actual Airtable column names.
    const fields: Record<string, string> = {
      'First Name':     firstName,
      'Last Name':      lastName,
      'Organization':   organization,
      'Email':          email,
      'Inquiry Type':   inquiryType,
      'Message':        message,
    };

    if (phone)      fields['Phone']           = phone;
    if (heardAbout) fields['How They Found Us'] = heardAbout;

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.json();
      console.error('Airtable error:', err);
      return NextResponse.json({ error: 'Failed to save to Airtable.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Partnerships API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}