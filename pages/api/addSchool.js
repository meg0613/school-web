import formidable from "formidable";
import mysql from "mysql2/promise";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveSchoolToDB({ name, address, city, state, contact, email, imageUrl }) {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  });

  const [result] = await conn.execute(
    `INSERT INTO schools (name, address, city, state, contact, email, image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, address, city, state, contact, email, imageUrl]
  );

  await conn.end();
  return result;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST supported" });
    return;
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("form parse err:", err);
      res.status(500).json({ error: "Form parse error" });
      return;
    }

    try {
      const name = fields.name || "";
      const address = fields.address || "";
      const city = fields.city || "";
      const state = fields.state || "";
      const contact = fields.contact || "";
      const email = fields.email || "";

      let imageUrl = "";

      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const filePath = file.filepath || file.path;
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "schoolImages", use_filename: true, unique_filename: false },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          const readStream = fs.createReadStream(filePath);
          readStream.pipe(stream);
        });

        imageUrl = uploadResult?.secure_url || "";
      }

      const dbRes = await saveSchoolToDB({
        name,
        address,
        city,
        state,
        contact,
        email,
        imageUrl,
      });

      res.status(200).json({ message: "School added", id: dbRes.insertId });
    } catch (e) {
      console.error("Handler error", e);
      res.status(500).json({ error: e.message || "Server error" });
    }
  });
}
