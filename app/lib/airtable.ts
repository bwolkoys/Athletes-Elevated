export type PredictionPayload = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    westHamScore: number;
    wrexhamScore: number;
    firstScorer: string;
    goalMinute: number;
    shotsGoal: number;
    agreedToTerms: boolean;
    optedInToUpdates: boolean;
  };
  

  function toAirtableFields(payload: PredictionPayload) {
    return {
      "First Name": payload.firstName,
      "Last Name": payload.lastName,
      "Email": payload.email,
      "Country": payload.country,
      "West Ham Score": payload.westHamScore,
      "Wrexham Score": payload.wrexhamScore,
      "First Goalscorer": payload.firstScorer,
      "Goal Minute": payload.goalMinute,
      "Shots on Goal": payload.shotsGoal,
      "Agreed To Terms": payload.agreedToTerms,
      "Opted In To Updates": payload.optedInToUpdates,
    };
  }
  
  export async function createAirtablePrediction(payload: PredictionPayload) {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_PREDICTIONS;
  
    if (!token || !baseId || !tableName) {
      throw new Error(
        "Airtable is not configured. Set AIRTABLE_TOKEN, AIRTABLE_BASE_ID and AIRTABLE_TABLE_NAME (see .env.local.example)."
      );
    }
  
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: toAirtableFields(payload) }],
      }),
      cache: "no-store",
    });
  
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `Airtable request failed (${res.status}): ${detail || res.statusText}`
      );
    }
  
    return res.json();
  }