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
  const tokenParam = params["eit_send"];
  const sendToken = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam ?? "";

  const formParams = new URLSearchParams({
    "prefill_Send Token": sendToken,
    "hide_Send Token": "true",
  });

  const src = `${BASE_URL}?${formParams.toString()}`;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      <iframe
        id="airtable-form"
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