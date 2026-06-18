# 📔 Digital Diary (Antigravity Diary)

A modern full-stack digital diary web application built with **React 19** and **Spring Boot 3.5**. Write, save, and manage your personal journal entries with a beautiful dark glassmorphism UI.

---

## ✨ Features

- **🔐 Secure Authentication** — User registration & login with JWT tokens
- **📝 CRUD Operations** — Create, read, update, and delete diary entries
- **🔍 Search & Filter** — Filter entries by keywords, start date, and end date
- **📄 Pagination** — Browse entries with page navigation (12 per page)
- **👤 Entry Ownership** — Each user sees only their own entries
- **🌙 Dark Glassmorphism UI** — Modern, responsive design with blur effects
- **📱 Responsive** — Works on desktop, tablet, and mobile
- **📖 Detail View** — Click any entry to read full content with preserved formatting

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version |
|------------|---------|
| React | 19 |
| Vite | 8 |
| React Router | 7 |
| Axios | 1.18 |
| CSS3 | Glassmorphism Design |
| Deployment | Vercel |

### Backend
| Technology | Version |
|------------|---------|
| Java | 17 |
| Spring Boot | 3.5.15 |
| Spring Security | JWT Authentication |
| Spring Data JPA | Hibernate ORM |
| H2 Database | Development |
| PostgreSQL | Production-ready |
| Maven | Build Tool |
| Deployment | Docker / Render / Railway |

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven (included via wrapper)

### Run Locally

**1. Start the Backend**
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
Backend runs at `http://localhost:8080`

**2. Start the Frontend**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

**3. Open the App**
Navigate to `http://localhost:5173` in your browser.

---

## 🌐 Deployment

### Backend (Docker)
```bash
docker build -t digital-diary .
docker run -p 8080:8080 digital-diary
```

### Frontend (Vercel)
Connect the `frontend/` directory to Vercel. Set environment variable:
```
VITE_API_URL=https://your-backend-url.com
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `jdbc:h2:file:./data/diarydb` | JDBC URL |
| `DATABASE_USER` | `sa` | Database username |
| `DATABASE_PASSWORD` | `` | Database password |
| `JWT_SECRET` | (auto-generated) | JWT signing key |
| `JWT_EXPIRATION` | `86400000` | Token expiry (ms) |
| `SERVER_PORT` | `8080` | Server port |
| `VITE_API_URL` | `http://localhost:8080` | Backend API URL |

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Register Page
![Register Page](screenshots/register.png)

### Diary Dashboard
![Diary Dashboard](screenshots/dashboard.png)

### Create Entry
![Create Entry](screenshots/create-entry.png)

### Entry Detail View
![Entry Detail View](screenshots/detail-view.png)

---

## 📁 Project Structure

```
digital-diary/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/com/diary/backend/
│   │   │   ├── controller/     # REST Controllers
│   │   │   ├── model/          # JPA Entities
│   │   │   ├── repository/     # Data Repositories
│   │   │   ├── security/       # JWT + Security Config
│   │   │   ├── dto/            # Request/Response DTOs
│   │   │   └── exception/      # Global Exception Handler
│   │   └── resources/
│   └── pom.xml
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── pages/              # Page Components
│   │   ├── components/         # Shared Components
│   │   ├── api.js              # Axios Configuration
│   │   ├── App.jsx             # Router Setup
│   │   └── index.css           # Global Styles
│   ├── vercel.json             # Vercel Deployment Config
│   └── package.json
│
├── Dockerfile                  # Containerization
└── README.md
```

---

## 📬 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get JWT | No |
| GET | `/api/entries` | List entries (paginated) | Yes |
| GET | `/api/entries/{id}` | Get entry by ID | Yes |
| POST | `/api/entries` | Create new entry | Yes |
| PUT | `/api/entries/{id}` | Update entry | Yes |
| DELETE | `/api/entries/{id}` | Delete entry | Yes |

---

## 👨‍🏫 Acknowledgements

Special thanks to **Mr. G. Vikramram Sir** for his excellent guidance and training throughout the Full Stack Java course. His teaching helped me gain the knowledge and confidence to complete this project successfully.

---

## 📄 License

This project is for educational purposes as part of the Full Stack Java course.
