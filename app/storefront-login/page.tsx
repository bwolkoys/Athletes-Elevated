import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Athletes Elevated — Storefront password gate (login page)
// Save this file as: <your app dir>/storefront-login/page.tsx
// (a sibling folder to `storefront/`, NOT nested inside it — middleware.ts
// only gates /storefront/:path*, so this route needs to live outside that
// prefix or the redirect would loop forever).

const COOKIE_NAME = "ae_storefront_auth";
const COOKIE_VALUE = "granted";

async function checkPassword(formData: FormData) {
  "use server";

  const password = formData.get("password");
  const from = formData.get("from")?.toString() || "/storefront";

  if (password === process.env.STOREFRONT_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect(from);
  }

  redirect(`/storefront-login?from=${encodeURIComponent(from)}&error=1`);
}

export default async function StorefrontLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const params = await searchParams;
  const from = params.from || "/storefront";
  const hasError = params.error === "1";

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#092866] to-[#071c4a] px-6"
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center">
        <p className="mb-1 text-lg font-extrabold tracking-wide text-[#092866]">
          ATHLETES <span className="text-[#146FF8]">ELEVATED</span>
        </p>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-[#1b1d20]">
          Member Access Only
        </p>
        <form action={checkPassword} className="text-left">
          <input type="hidden" name="from" value={from} />
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#092866]">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="mb-4 w-full rounded border border-[#3c3b3b] px-4 py-3 text-sm outline-none focus:border-[#146FF8]"
          />
          {hasError && (
            <p className="mb-4 text-xs font-semibold text-red-600">
              That password isn't right — try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-sm bg-[#146FF8] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}