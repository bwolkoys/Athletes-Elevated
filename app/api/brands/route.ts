import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const data = await req.json();
 
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_BRANDS_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Full Name & Role":       data.fullNameRole,
            "Email":                  data.email,
            "Phone":                  data.phone,
            "Brand Name":             data.brandName,
            "Website":                data.website,
            "HQ City":                data.hqCity,
            "HQ Country":             data.hqCountry,
            "Brand Tier":             data.brandTier,
            "Product Category":       data.productCategory,
            "Years Operating":        data.yearsOperating,
            "Annual Revenue":         data.annualRevenue,
            "Distribution Channels":  Array.isArray(data.distributionChannels)
                                        ? data.distributionChannels.join(", ")
                                        : data.distributionChannels,
            "Why a Fit":              data.fitReason,
          },
        }),
      }
    );
 
    if (!response.ok) {
      const error = await response.json();
      console.error("Airtable error:", error);
      return NextResponse.json({ error }, { status: response.status });
    }
 
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}