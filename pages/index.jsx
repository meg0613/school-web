export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the School Directory</h1>
      <p>
        Add and explore schools with details, images, and location previews.
      </p>
      <div className="button-group">
        <a href="/addSchool" className="home-btn">Add a School</a>
        <a href="/showSchools" className="home-btn">View Schools</a>
        <a href="/dashboard" className="home-btn">View Dashboard</a>
      </div>
    </div>
  );
}
