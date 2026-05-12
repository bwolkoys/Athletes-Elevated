import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Full Name": formData.name,
            "Email Address": formData.email,
            "Mobile Number": formData.mobile,
            "City and State": formData.city,
            "Primary Sport": formData.sport,

            "Current Status": formData.status,
            "Career Stage": formData.career_stage,
            "Top Career Accomplishment": formData.accomplishment,
            "Verification Source": formData.verification,

            Interests: Array.isArray(formData.interests)
              ? formData.interests.join(", ")
              : formData.interests,

            Goals: formData.goals,
            Contribution: formData.contribution,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Airtable error:", error);

      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}