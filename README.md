# School Directory Web Application

This is a web-based application developed using **Next.js** that allows users to manage and view information about different schools.

The system provides functionality to add, edit, and delete school entries, along with image uploads and a dashboard for visual insights.

---

## Overview

The **School Directory** project serves as a simplified school information management platform where users can:

* Add new schools along with details such as name, address, contact, and image.
* Edit or delete existing school records.
* View all schools in an organized grid layout.
* Upload and preview images locally before saving.
* Analyze school distribution visually using an analytics dashboard.

---

## Features

* **Add, View, Edit, Delete Schools** — Users can perform all CRUD operations efficiently.
* **Preview Before Upload** — Images can be previewed before saving.
* **Responsive Design** — Works seamlessly across different screen sizes.
* **Data Persistence** — Information is stored in the browser’s local storage.
* **Dashboard Analytics** — Displays school data distribution using charts.
* **User-Friendly Interface** — Pastel tones and minimal design for a pleasant experience.

---

## Technologies Used

| Technology                     | Purpose                                          |
| ------------------------------ | ------------------------------------------------ |
| **Next.js**                    | Framework for server-side rendering and routing  |
| **React.js**                   | UI library for building dynamic interfaces       |
| **Formidable**                 | Used for handling file uploads locally           |
| **Chart.js + react-chartjs-2** | Visual representation of school data             |
| **Framer Motion**              | Smooth animations and transitions                |
| **CSS**                        | Custom styling for layout and design consistency |

---

## Project Structure

```
school-web/
│
├── pages/
│   ├── index.jsx           # Home page
│   ├── addSchool.jsx       # Add new school
│   ├── showSchools.jsx     # View and manage schools
│   ├── dashboard.jsx       # Analytics dashboard
│   └── api/
│       ├── upload.js       # Handles local file uploads
│       ├── addSchool.js
│       ├── deleteSchool.js
│       ├── getSchools.js
│
├── styles/
│   └── globals.css         # Global styling for the project
│
├── package.json
└── README.md
```

---

## Installation and Setup

Follow these steps to set up the project on your local system:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/meg0613/school-web.git
   cd school-web
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   npm run dev
   ```

4. Open the project in your browser at
   [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open the homepage and navigate to **Add School**.
2. Enter all school details and select an image to upload.
3. Click **Add School** to save the record.
4. Navigate to **Show Schools** to view, edit, or delete schools.
5. Visit the **Dashboard** page to view graphical analytics.

---

## Future Enhancements

* Integration with a real database (MySQL or MongoDB).
* Authentication system for admin access.
* Cloud image storage using Cloudinary or AWS S3.
* Advanced search and filter options.
* Pagination for better data handling.

---

## Author

**Developed by:** Meghna Chaturvedi
**GitHub:** [@meg0613](https://github.com/meg0613)
**LinkedIn:** [LinkedIn](https://www.linkedin.com/in/meghnachaturvedi001/)

---

## License

This project is open-source and available under the **MIT License**.
