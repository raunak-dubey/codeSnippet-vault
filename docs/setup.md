# Code Snippet Vault — Setup Guide

## 1. Prerequisites

Ensure the following are installed on your system:

* Node.js (v18 or higher recommended)
* pnpm (preferred package manager)
* MongoDB (or access to MongoDB Atlas)

## 2. Clone the Repository

```bash
git clone https://github.com/raunak-dubey/codeSnippet-vault.git
cd codeSnippet-vault
```

## 3. Install Dependencies

```bash
pnpm install
```

## 4. Environment Variables

Create a `.env` file in both `backend/` and `frontend/` directories.

### Backend (`backend/.env`)

```env
PORT=4000
MONGO_URI=
JWT_SECRET=
LOG_LEVEL=debug
APP_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
EMAIL_FROM=
```

---

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development
```

## 5. Running the Project

### Start Backend

```bash
cd backend
pnpm start:dev
```

Backend will run on: `http://localhost:4000`

---

### Start Frontend

```bash
cd frontend
pnpm dev
```

Frontend will run on: `http://localhost:3000`

## 6. Project Structure

```
frontend/
backend/
packages/
```

## 7. Common Issues

### Port Already in Use

* Change `PORT` in backend `.env`

---

### MongoDB Connection Error

* Ensure `MONGO_URI` is correct
* Check network access if using MongoDB Atlas

---

### Environment Variables Not Loading

* Restart the dev server after changes

## 8. Notes for Contributors

* Follow existing project structure
* Keep code modular and clean
* Use meaningful commit messages
* Avoid introducing unnecessary dependencies

## 9. Production Considerations (Basic)

* Use environment-specific variables
* Enable secure cookie settings (if using cookies)
* Set proper logging levels
* Validate all inputs strictly
