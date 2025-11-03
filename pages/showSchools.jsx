import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    image_url: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("schools")) || [];
    setSchools(stored);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      const updated = schools.filter((s) => s.id !== id);
      setSchools(updated);
      localStorage.setItem("schools", JSON.stringify(updated));
    }
  };

  const handleEdit = (school) => {
    setEditingSchool(school);
    setFormData(school);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = schools.map((s) =>
      s.id === editingSchool.id ? { ...formData } : s
    );
    setSchools(updated);
    localStorage.setItem("schools", JSON.stringify(updated));
    setEditingSchool(null);
  };

  return (
    <div className="show-schools-page">
      <h2 className="page-title">All Schools</h2>

      {schools.length === 0 ? (
        <div className="empty-state">
          <h3>No Schools Found</h3>
          <p>Start by adding your first school to the directory.</p>
          <a href="/" className="back-btn">← Back to Home</a>
        </div>
      ) : (
        <div className="school-grid">
          {schools.map((s) => (
            <div key={s.id} className="school-card">
              <div className="image-wrapper">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.name} className="school-image" />
                ) : (
                  <div className="image-placeholder">No Image</div>
                )}
                <div className="overlay">
                  <p>{s.name}</p>
                </div>
              </div>

              <div className="school-info">
                <h3>{s.name}</h3>
                <p className="school-address">{s.address}</p>
                <p className="school-location">
                  {s.city}, {s.state}
                </p>
                <p className="school-contact">
                  <strong>Contact:</strong> {s.contact}
                </p>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <a href="/" className="back-btn bottom-back-btn">← Back to Home</a>

      {editingSchool && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit School</h3>
            <form onSubmit={handleSave} className="edit-form">
              {["name", "address", "city", "state", "contact", "email", "image_url"].map((field) => (
                <div key={field} className="form-group">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    required={field !== "image_url"}
                  />
                </div>
              ))}
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingSchool(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}