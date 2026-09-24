/**
 * Athletes Elevated — Airtable image proxy
 * Place at:  app/api/airtable-image/[table]/[recordId]/[attachmentId]/route.ts
 *
 * Airtable attachment URLs expire after a few hours. This route looks up a
 * fresh URL for the attachment and streams the image, so the site's image
 * links never break. Replacing a photo in Airtable gives it a new attachment
 * ID, so the site picks up the new photo automatically.
 */

import { TABLES } from "../../../../../lib/athletes";

type Params = { params: Promise<{ table: string; recordId: string; attachmentId: string }> };

type Attachment = {
  id: string;
  url: string;
  type?: string;
  thumbnails?: { large?: { url: string }; full?: { url: string } };
};

async function findAttachmentUrl(
  table: string,
  recordId: string,
  attachmentId: string,
  fresh: boolean
): Promise<string | null> {
    const token = process.env.AIRTABLE_TOKEN_ATHDETAILS;
  const baseId = process.env.AIRTABLE_BASE_ID_ATHDETAILS;
  if (!token || !baseId) return null;

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}/${recordId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      // Cached for 30 min (links last ~2 hrs). If the cached link has expired we retry fresh.
      ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 1800 } }),
    }
  );
  if (!res.ok) return null;

  const { fields } = (await res.json()) as { fields: Record<string, unknown> };
  for (const value of Object.values(fields)) {
    if (!Array.isArray(value)) continue;
    const match = (value as Attachment[]).find((a) => a && a.id === attachmentId);
    if (match) return match.url;
  }
  return null;
}

export async function GET(_req: Request, { params }: Params) {
  const { table, recordId, attachmentId } = await params;

  const tableName = TABLES[table as keyof typeof TABLES];
  if (!tableName || !/^rec\w+$/.test(recordId) || !/^att\w+$/.test(attachmentId)) {
    return new Response("Not found", { status: 404 });
  }

  for (const fresh of [false, true]) {
    const url = await findAttachmentUrl(tableName, recordId, attachmentId, fresh);
    if (!url) continue;
    const img = await fetch(url, { cache: "no-store" });
    if (img.ok && img.body) {
      return new Response(img.body, {
        headers: {
          "Content-Type": img.headers.get("content-type") ?? "image/jpeg",
          // The attachment ID never changes for the same file, so cache hard.
          "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        },
      });
    }
  }

  return new Response("Image not found", { status: 404 });
}