import { NextRequest, NextResponse } from "next/server";
import { createAirtablePrediction } from "../../lib/airtable";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const closeAt = process.env.PREDICTIONS_CLOSE_AT;
  if (closeAt && Date.now() > new Date(closeAt).getTime()) {
    return NextResponse.json(
      { error: "Predictions have closed." },
      { status: 403 }
    );
  }

  const {
    firstName,
    lastName,
    email,
    country,
    westHamScore,
    wrexhamScore,
    firstScorer,
    goalMinute,
    agreedToTerms,
    optedInToUpdates,
  } = body;

  const errors: string[] = [];
  if (!isNonEmptyString(firstName)) errors.push("First name is required.");
  if (!isNonEmptyString(lastName)) errors.push("Last name is required.");
  if (!isNonEmptyString(email) || !EMAIL_RE.test(email as string))
    errors.push("A valid email is required.");
  if (!isNonEmptyString(country)) errors.push("country is required.");
  if (!isFiniteNumber(westHamScore) || westHamScore < 0 || westHamScore > 30)
    errors.push("West Ham score must be a number between 0 and 30.");
  if (!isFiniteNumber(wrexhamScore) || wrexhamScore < 0 || wrexhamScore > 30)
    errors.push("Wrexham score must be a number between 0 and 30.");
  if (!isNonEmptyString(firstScorer)) errors.push("First goalscorer is required (or \"Goalless\").");
  if (!isFiniteNumber(goalMinute) || goalMinute < 0 || goalMinute > 90)
    errors.push("Goal minute must be a number between 0 and 90.");
  if (agreedToTerms !== true)
    errors.push("You must agree to the campaign terms and privacy policy.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    await createAirtablePrediction({
      firstName: (firstName as string).trim(),
      lastName: (lastName as string).trim(),
      email: (email as string).trim().toLowerCase(),
      country: (country as string).trim(),
      westHamScore: westHamScore as number,
      wrexhamScore: wrexhamScore as number,
      firstScorer: (firstScorer as string).trim(),
      goalMinute: goalMinute as number,
      agreedToTerms: true,
      optedInToUpdates: optedInToUpdates === true,
    });
  } catch (err) {
    console.error("Failed to write prediction to Airtable:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't save your prediction right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}