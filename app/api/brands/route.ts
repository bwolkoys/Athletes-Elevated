// Place this file at: app/api/brands/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {
      firstName, lastName, email, phone,
      brandName, website, hqCity, hqCountry,
      industry, yearsOperating, distributionChannels, whyAFit,
    } = await req.json();

    if (!firstName || !lastName || !email || !brandName || !whyAFit) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    const token   = process.env.AIRTABLE_TOKEN;
    const baseId  = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_BRANDS_ID; // matches your .env

    if (!token || !baseId || !tableId) {
      console.error('[brands] Missing Airtable env vars:', { token: !!token, baseId: !!baseId, tableId: !!tableId });
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Contact First Name':   firstName,
          'Contact Last Name':    lastName,
          'Email':                email,
          'Phone':                phone || '',
          'Brand Name':           brandName,
          'Website':              website || '',
          'HQ City':              hqCity || '',
          'HQ Country':           hqCountry || '',
          'Industry':     industry || '',
          'Years Operating':      yearsOperating || '',
          'Distribution Channels': distributionChannels || '',
          'Why a Fit':            whyAFit,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[brands] Airtable error:', err);
      return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[brands] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}