import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }

    const file = files.image?.[0] || files.image;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = `school_${Date.now()}_${file.originalFilename}`;
    const newPath = path.join(uploadDir, fileName);

    fs.renameSync(file.filepath, newPath);

    const fileUrl = `/uploads/${fileName}`;
    res.status(200).json({ url: fileUrl });
  });
}
