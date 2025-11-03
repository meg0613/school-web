import { useState } from "react";
import { useRouter } from "next/router";

export default function AddSchool() {
  const router = useRouter();
  const [school, setSchool] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setSchool({ ...school, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const uploadToLocal = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadToLocal(file);
      }

      const newSchool = { ...school, image_url: imageUrl, id: Date.now() };
      const stored = JSON.parse(localStorage.getItem("schools")) || [];
      localStorage.setItem("schools", JSON.stringify([...stored, newSchool]));

      alert("School added successfully!");
      router.push("/showSchools");
    } catch (err) {
      console.error(err);
      alert("Failed to add school: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New School</h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="school-form"
      >
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={school.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              value={school.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input
              name="state"
              value={school.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              name="contact"
              value={school.contact}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            value={school.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={school.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Add School"}
        </button>
      </form>

      <a href="/" className="home-link">
        ← Back to Home
      </a>
    </div>
  );
}
