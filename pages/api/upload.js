import cloudinary from "cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(400).json({ error: "File parsing failed" });
      }

      const file = files.image?.[0] || files.image;
      if (!file) return res.status(400).json({ error: "No file uploaded" });

      const result = await cloudinary.v2.uploader.upload(file.filepath, {
        folder: "school-images",
        use_filename: true,
        unique_filename: false,
      });

      fs.unlinkSync(file.filepath);
      res.status(200).json({ url: result.secure_url });
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
}
