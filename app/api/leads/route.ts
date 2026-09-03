import { NextRequest, NextResponse } from "next/server";


// 4. Add these to your environment (`.env.local` locally, and your host's
//    env settings — Vercel, etc. — in production):
//      AIRTABLE_API_KEY=pat_xxxxxxxx        (the token from step 2)
//      AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX   (the base ID from step 3)
//      AIRTABLE_TABLE_NAME=Marketplace Leads  (exact table name, or its tbl... id)
//
// That's the only setup needed — this route does the rest.

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_MOCK_MARKETPLACE || "Marketplace Leads";

type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

function isValidLead(body: unknown): body is LeadPayload {
  if (!body || typeof body !== "object") return false;
  const { firstName, lastName, email } = body as Record<string, unknown>;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    typeof firstName === "string" &&
    firstName.trim().length > 0 &&
    typeof lastName === "string" &&
    lastName.trim().length > 0 &&
    typeof email === "string" &&
    emailPattern.test(email.trim())
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidLead(body)) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  const { firstName, lastName, email } = body;

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    // Don't fail the request just because Airtable isn't configured yet —
    // log it server-side so the lead isn't silently lost, and fix the env
    // vars when ready.
    console.error(
      "AIRTABLE_API_KEY / AIRTABLE_BASE_ID is not set — lead was received but not saved to Airtable.",
      { firstName, lastName, email }
    );
    return NextResponse.json({ ok: true, saved: false });
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                "First Name": firstName,
                "Last Name": lastName,
                Email: email,
              },
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Airtable API error:", res.status, detail);
      return NextResponse.json({ ok: true, saved: false });
    }

    return NextResponse.json({ ok: true, saved: true });
  } catch (err) {
    console.error("Failed to save lead to Airtable:", err);
    return NextResponse.json({ ok: true, saved: false });
  }
}