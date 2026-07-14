// Place this file at: app/api/west-ham/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, ageConfirmed, marketingConsent, termsAccepted } = body;

    // Server-side guard: reject if required consent boxes weren't checked
    if (!ageConfirmed || !termsAccepted) {
      return NextResponse.json({ error: 'Required consents not provided' }, { status: 400 });
    }

    const AIRTABLE_TOKEN    = process.env.AIRTABLE_TOKEN;
    const AIRTABLE_BASE_ID  = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE    = process.env.AIRTABLE_TABLE_WHU_WAITLIST;

    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE) {
      console.error('Missing env vars:', {
        AIRTABLE_TOKEN:         !!AIRTABLE_TOKEN,
        AIRTABLE_BASE_ID:       !!AIRTABLE_BASE_ID,
        AIRTABLE_TABLE_WHU_WAITLIST: !!AIRTABLE_TABLE,
      });
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

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
            'First Name':        firstName ?? '',
            'Last Name':         lastName  ?? '',
            'Email':             email,
            'Age Confirmed':     ageConfirmed     === true, // boolean checkbox field
            'Marketing Consent': marketingConsent  === true, // boolean checkbox field
            'Terms Accepted':    termsAccepted     === true, // boolean checkbox field
          },
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error('Airtable error:', error);
      return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('West Ham route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}