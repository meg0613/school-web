import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Missing id" });

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST, user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
    });
    await conn.execute("DELETE FROM schools WHERE id = ?", [id]);
    await conn.end();
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
