import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_FANS_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "First Name": formData.firstName,
            "Last Name": formData.lastName,
            Email: formData.email,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error(error);

      return NextResponse.json(
        { error },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}