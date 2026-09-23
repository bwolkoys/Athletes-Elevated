import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Test",
  robots: { index: false, follow: false },
};

const BASE_URL =
  "https://airtable.com/embed/appPKAjxOqaURojxV/pagOIeQdRNDm64gIH/form";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FormTestPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const ownerParam = params["owner guid"];
  const owner = Array.isArray(ownerParam) ? ownerParam[0] : ownerParam ?? "";

  const formParams = new URLSearchParams({
    "prefill_Contact Owner": owner,
    "hide_Contact Owner": "true",
  });

  const src = `${BASE_URL}?${formParams.toString()}`;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      <iframe
        className="airtable-embed"
        src={src}
        width="100%"
        height="533"
        style={{ background: "transparent", border: "1px solid #ccc" }}
        title="Airtable Form"
      />
    </main>
  );
}