# TechMeUP - IT Ticketing System

A full-stack IT ticketing application built with Express, React, and PostgreSQL. Allows users to submit, track, and manage IT support tickets with role-based access control.

## Tech Stack

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Tokens (JWT) + bcrypt
- **Validation:** Zod

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Styling:** Custom CSS (dark theme)

### Database
- **PostgreSQL** with Prisma schema migrations

---

## Prerequisites

- Node.js 20+
- PostgreSQL 14+

---

## Setup & Installation

### 1. Database Setup

Ensure PostgreSQL is running, then create the database:

```bash
# Create the database
createdb techmeup

# Run migrations
# cd backend
npx prisma migrate dev

# Seed demo data
npx prisma db seed
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

The API server starts on **`http://localhost:3001`**.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server starts on **`http://localhost:3000`** and proxies API requests to the backend.

---

## Project Structure

```
TechMeUP/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Demo data seeder
│   ├── src/
│   │   ├── config/            # Environment & Prisma client
│   │   ├── controllers/       # Auth, tickets, comments
│   │   ├── middleware/        # JWT auth & role checks
│   │   ├── routes/            # REST API routes
│   │   └── index.ts           # Express server entry
│   ├── .env                   # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Shared UI components
│   │   ├── contexts/          # Auth context provider
│   │   ├── pages/             # Login, Dashboard, Tickets
│   │   ├── services/          # API client
│   │   └── App.tsx            # Router setup
│   └── package.json
└── README.md
```

---

## API Endpoints

### Auth
| Method | Endpoint       | Description     | Auth Required |
|--------|----------------|-----------------|---------------|
| POST   | `/api/auth/register` | Register user | No            |
| POST   | `/api/auth/login`    | Login         | No            |
| GET    | `/api/auth/me`       | Get current user | Yes        |

### Tickets
| Method | Endpoint              | Description         | Auth Required |
|--------|-----------------------|---------------------|---------------|
| GET    | `/api/tickets`        | List tickets        | Yes           |
| GET    | `/api/tickets/:id`    | Get ticket details  | Yes           |
| POST   | `/api/tickets`        | Create ticket       | Yes           |
| PUT    | `/api/tickets/:id`    | Update ticket       | Yes           |
| DELETE | `/api/tickets/:id`    | Delete ticket       | Yes           |

### Comments
| Method | Endpoint                    | Description         | Auth Required |
|--------|-----------------------------|---------------------|---------------|
| GET    | `/api/comments/ticket/:id`  | Get ticket comments | Yes           |
| POST   | `/api/comments`             | Add comment         | Yes           |

---

## Demo Accounts

| Role        | Email                      | Password   |
|-------------|----------------------------|------------|
| Admin       | `admin@techmeup.com`       | `admin123` |
| Technician  | `tech@techmeup.com`        | `tech123`  |
| User        | `user@techmeup.com`        | `user123`  |

---

## Features

- **User Authentication** — Register, login, JWT-based sessions
- **Role-Based Access** — Admin, Technician, and Requester roles with different permissions
- **Ticket Management** — Create, update, filter, and delete tickets
- **Ticket Comments** — Add and view comments on tickets
- **Dashboard** — Overview with stats cards (total, open, in-progress, resolved)
- **Dark Theme UI** — Clean, modern interface

---

## Environment Variables

Create `backend/.env` with:

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/techmeup
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## Scripts

### Backend

| Script           | Command              | Description              |
|------------------|----------------------|--------------------------|
| Dev              | `npm run dev`        | Start dev server         |
| DB Migrate       | `npm run db:migrate` | Run schema migrations    |
| DB Generate      | `npm run db:generate`| Regenerate Prisma client |
| DB Seed          | `npm run db:seed`    | Seed demo data           |

### Frontend

| Script    | Command        | Description          |
|-----------|----------------|----------------------|
| Dev       | `npm run dev`  | Start dev server     |
| Build     | `npm run build`| Build for production |
| Preview   | `npm run preview` | Preview production build |

---

## Database Schema

### Models

- **User** — Authenticated users with roles (Admin, Technician, Requester)
- **Ticket** — IT support tickets with status, priority, and assignee
- **Comment** — Comments attached to tickets

### Ticket States

`OPEN` → `IN_PROGRESS` → `RESOLVED` → `CLOSED`

### Ticket Priorities

`LOW` | `MEDIUM` | `HIGH` | `CRITICAL`

---

## License

MIT