# 📚 Library Management System

A full-stack web app for managing a library's book collection — search, add, and delete books, with every change persisted to a real cloud database in real time.

Built to practice and demonstrate: RESTful API design, frontend-backend integration, cloud database usage (PostgreSQL via Neon), and deployment of a multi-service application.

---

## 🔗 Live Demo

- **Frontend:** [your-github-pages-link-here](#)
- **Backend API:** [your-render-link-here](#)

> Replace these links once deployed — see the Deployment section below.

---

## 🎥 See it in action

The GIF below shows adding a book on the website and the same row appearing instantly in the Neon database dashboard — demonstrating the frontend, backend, and database are truly connected, not just using mock data.

![Demo of adding a book and seeing it update in the database](docs/screenshots/demo.gif)

*(See `docs/screenshots/HOW_TO_RECORD_DEMO.md` for how this GIF was captured.)*

---

## ✨ Features

- **Search** books by title or author, live as you type
- **Add** new books with title, author, genre, and copy count
- **Delete** books from the collection
- Each book tracks **available vs. total copies** and shows an Available / Checked Out status
- Data is stored in a real **PostgreSQL** database (hosted on Neon) — not local storage or mock data
- Clean, custom-designed UI built with vanilla HTML/CSS/JS (no frontend framework required)

---

## 🏗️ Architecture

```
┌─────────────────┐        HTTPS/fetch()       ┌──────────────────┐        SQL         ┌─────────────┐
│   Frontend       │  ─────────────────────────▶ │   Backend API     │ ──────────────────▶ │  Database    │
│  index.html       │ ◀───────────────────────── │  Express (Node.js) │ ◀────────────────── │  PostgreSQL  │
│  (GitHub Pages)   │        JSON responses        │  (Render)         │     query results    │  (Neon)      │
└─────────────────┘                              └──────────────────┘                     └─────────────┘
```

- **Frontend** — static HTML/CSS/JavaScript, calls the backend via `fetch()`
- **Backend** — Node.js + Express REST API, handles validation and talks to the database
- **Database** — PostgreSQL, hosted on [Neon](https://neon.tech), serverless and free-tier friendly

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|---------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript (fetch API) |
| Backend    | Node.js, Express.js                   |
| Database   | PostgreSQL (Neon, serverless)         |
| Hosting    | GitHub Pages (frontend), Render (backend) |

---

## 📂 Project Structure

```
library-management-system/
├── frontend/
│   └── index.html          # Complete UI: HTML, CSS, and JS in one file
├── backend/
│   ├── server.js            # Express app entry point
│   ├── routes/
│   │   └── books.js          # REST API routes (GET, POST, DELETE, etc.)
│   ├── config/
│   │   └── db.js              # PostgreSQL connection (Neon)
│   ├── schema.sql            # Database table definition + sample data
│   ├── .env.example          # Template for environment variables
│   └── package.json
├── docs/
│   └── screenshots/          # Images/GIFs used in this README
├── LICENSE
└── README.md
```

---

## 🔌 API Reference

Base URL: `http://localhost:3000/api/books` (local) or your deployed Render URL.

| Method | Endpoint             | Description                       |
|--------|------------------------|-------------------------------------|
| GET    | `/api/books`            | Get all books (supports `?search=`) |
| GET    | `/api/books/:id`        | Get a single book by ID             |
| POST   | `/api/books`             | Add a new book                     |
| PUT    | `/api/books/:id`         | Update a book                      |
| DELETE | `/api/books/:id`         | Delete a book                      |
| PATCH  | `/api/books/:id/checkout`| Check out one copy                 |
| PATCH  | `/api/books/:id/return`  | Return one copy                    |
| GET    | `/api/health`             | Health check                       |

**Example — add a book:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","genre":"Fiction","copies":3}'
```

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version)
- A free [Neon](https://neon.tech) account (or any PostgreSQL database)

### 1. Clone the repo
```bash
git clone https://github.com/alina693/library-management-system.git
cd library-management-system
```

### 2. Set up the database
- Create a Neon project and copy your connection string
- Run the contents of `backend/schema.sql` in the Neon SQL Editor (creates the `books` table with sample data)

### 3. Configure the backend
```bash
cd backend
cp .env.example .env
```
Edit `.env` and paste your Neon connection string into `DATABASE_URL`.

### 4. Install and run the backend
```bash
npm install
npm start
```
Server runs at `http://localhost:3000`.

### 5. Open the frontend
Open `frontend/index.html` directly in your browser. It will fetch live data from your running backend.

---

## ☁️ Deployment

This project is deployed as three independent pieces:

1. **Database** → [Neon](https://neon.tech) (PostgreSQL, free tier)
2. **Backend** → [Render](https://render.com) (Web Service, free tier)
3. **Frontend** → [GitHub Pages](https://pages.github.com) (static hosting)

See `backend/DEPLOY.md` for the full step-by-step deployment guide.

---

## 🗺️ Roadmap / Possible Improvements

- [ ] Edit-book functionality (currently add/delete only)
- [ ] User authentication for librarian vs. member roles
- [ ] Pagination for large collections
- [ ] Due dates and overdue tracking
- [ ] Unit and integration tests

---

## 👤 About

Built by Alina John as a project to learn full-stack development — from a static frontend, to a REST API, to a deployed cloud-connected application.

- GitHub: [https://github.com/alina693](#)
- LinkedIn: [https://www.linkedin.com/in/alina-john-20421a297/](#)

