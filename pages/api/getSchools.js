// pages/api/getSchools.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    });

    const [rows] = await conn.execute("SELECT * FROM schools ORDER BY created_at DESC");
    await conn.end();

    res.status(200).json(Array.isArray(rows) ? rows : []);
  } catch (e) {
    console.error("getSchools error:", e);
    res.status(500).json({ error: e.message || "Server error" });
  }
}
