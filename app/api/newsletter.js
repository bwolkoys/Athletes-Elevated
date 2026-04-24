import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { firstName, lastName, email, interest, message } = req.body;
  if (!firstName || !email) return res.status(400).json({ error: 'Missing required fields' });

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    INSERT INTO newsletter_signups (first_name, last_name, email, interest, message)
    VALUES (${firstName}, ${lastName}, ${email}, ${interest}, ${message})
  `;

  return res.status(200).json({ success: true });
}