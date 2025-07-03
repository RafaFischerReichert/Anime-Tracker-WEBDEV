# Anime Tracker API

## Overview

Anime Tracker is a RESTful API built with Node.js, Express, and TypeScript for managing anime series, characters, users, and voice actors. It supports user authentication, password management, and file uploads (e.g., user avatars). The backend uses PostgreSQL via TypeORM for data persistence.

## Features

- **Anime Management:** Create, list, update, and delete anime series.
- **Character Management:** Add and view characters, associating them with anime and voice actors.
- **Voice Actor Management:** CRUD operations for voice actors.
- **User Management:** Register, authenticate, update profiles, upload avatars, and delete users.
- **Password Recovery:** Request password reset and set a new password via email.
- **Authentication:** JWT-based authentication for protected routes.
- **File Uploads:** Upload and serve user avatars.
- **Validation:** Input validation using Celebrate/Joi.

## Tech Stack

- Node.js, Express, TypeScript
- PostgreSQL, TypeORM
- JWT for authentication
- Multer for file uploads
- Nodemailer (Ethereal) for email
- Celebrate/Joi for validation

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Anime-Tracker-WEBDEV
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the database:**
   - Edit `ormconfig.json` if needed (default user: `postgres`, password: `docker`, db: `api-anime-tracker`).
   - Create the database in PostgreSQL:
     ```sql
     CREATE DATABASE api-anime-tracker;
     ```

4. **Run migrations:**
   ```bash
   npm run typeorm migration:run
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will start on port 3333.

### Environment Variables

- The current setup uses hardcoded values for JWT secret and Ethereal email (for development/testing).
- For production, you should move secrets (e.g., JWT secret) to environment variables.

### API Endpoints

#### Anime

- `GET /anime` – List all anime
- `GET /anime/:id` – Get anime by ID
- `POST /anime` – Create anime
- `PUT /anime/:id` – Update anime
- `DELETE /anime/:id` – Delete anime

#### Characters

- `GET /characters/:id` – Get character by ID (auth required)
- `POST /characters` – Create character (auth required)

#### Voice Actors

- `GET /actors` – List all voice actors (auth required)
- `GET /actors/:id` – Get voice actor by ID (auth required)
- `POST /actors` – Create voice actor (auth required)
- `PUT /actors/:id` – Update voice actor (auth required)
- `DELETE /actors/:id` – Delete voice actor (auth required)

#### Users

- `GET /users` – List users (auth required)
- `POST /users` – Register user
- `PATCH /users/avatar` – Upload avatar (auth required)
- `DELETE /users/:id` – Delete user

#### Sessions

- `POST /sessions` – Authenticate (login)

#### Password

- `POST /password/forgot` – Request password reset
- `POST /password/reset` – Reset password

#### Profile

- `GET /profile` – Get current user profile (auth required)
- `PUT /profile` – Update profile (auth required)

### File Uploads

- User avatars are uploaded to the `/uploads` directory and served at `/files/<filename>`.

### Development Notes

- Uses Ethereal email for password recovery (for development/testing).
- All protected routes require a valid JWT token in the `Authorization` header.

## License

ISC

## Author

RafaFischerReichert
