# Software Requirement Specification (SRS)

## 1. Introduction

Code Snippet Vault is a cloud-based web application designed to help developers store, organize, search, and retrieve reusable code snippets across multiple devices.

The system enables authenticated users to securely manage their personal snippet collection with fast access, minimal UI clutter, and efficient search capabilities.

## 2. System Overview

The application will follow a **MERN architecture**:

- **Frontend:** Next.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based access and refresh token

### Hosting / Infrastructure (3rd-party managed)

- **Database hosting:** MongoDB Atlas
- **Deployment platform:** Render

The system is designed for **scalability, cross-device access, and real-time usability**.

## 3. Functional Requirements

### 3.1 User Authentication

- The system shall allow users to register using:
  - Email
  - Password

- The system shall allow users to log in securely.
- The system shall generate and return a JWT token upon successful login.
- The system shall authenticate all protected routes using JWT.
- The system shall allow users to log out.

---

### 3.2 Snippet Creation

- The system shall allow authenticated users to create a snippet.
- Each snippet shall include:
  - Title (required)
  - Code (required)
  - Programming Language (required)
  - Description (optional)

- The system shall associate each snippet with a specific user.
- The system shall store snippets in the database.

---

### 3.3 View Snippets

- The system shall allow users to view all their snippets.
- The system shall display:
  - Title
  - Language
  - Created date

- The system shall ensure users can only access their own snippets.

---

### 3.4 Update Snippet

- The system shall allow users to edit:
  - Title
  - Code
  - Language
  - Description

- Changes shall be updated in the database in real time.

---

### 3.5 Delete Snippet

- The system shall allow users to delete a snippet.
- Deleted snippets shall be permanently removed from the database.

---

### 3.6 Search Functionality

- The system shall allow users to search snippets by:
  - Title
  - Code content
  - Language

- The system shall return filtered results dynamically.

---

### 3.7 Copy to Clipboard

- The system shall provide a copy button for each snippet.
- Clicking the button shall copy the full code to the clipboard.
- The system shall provide visual confirmation after copying.

---

### 3.8 Cross-Device Access

- The system shall allow users to access their snippets from any device after login.
- All data shall be synced via the backend database.

## 4. Data Requirements

### 4.1 User Schema

```json
{
  "Id": "string",
  "email": "string",
  "passwordHash": "string",
  "createdAt": "date"
}
```

---

### 4.2 Snippet Schema

```json
{
  "Id": "string",
  "userId": "string",
  "title": "string",
  "code": "string",
  "language": "string",
  "description": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## 5. Non-Functional Requirements

### 5.1 Performance

- API response time shall be under **300ms** for standard operations.
- The UI shall feel responsive with minimal loading delays.
- Search results shall appear within **500ms**.

---

### 5.2 Security

- Passwords shall be hashed using a secure algorithm (e.g., bcrypt).
- JWT tokens shall be used for authentication.
- Users shall not access other users’ data.
- Input validation shall be implemented on both frontend and backend.
- Rate limiting shall be implemented.

---

### 5.3 Scalability

- The system shall support increasing users and data without major redesign.
- Database queries shall be optimized for search operations.
- Backend shall follow modular architecture.

---

### 5.4 Usability

- The UI shall be minimal and developer-focused.
- Users shall:
  - Add a snippet within 15 seconds
  - Retrieve a snippet within 5 seconds

- Navigation shall be intuitive and fast.

---

### 5.5 Reliability

- The system shall ensure data consistency during CRUD operations.
- Failures in API requests shall return meaningful error messages.
- The system shall handle server errors gracefully.

---

### 5.6 Maintainability

- Code shall follow:
  - KISS (Keep It Simple)
  - DRY (Don’t Repeat Yourself)

- Backend shall follow modules structure:
  - user/
  - auth/
  - snippets/

## 6. External Integrations

- Database hosting via managed service (e.g., MongoDB Atlas)
- Deployment platforms for frontend/backend
- Clipboard API for copy functionality

## 7. Constraints

- The system will initially prioritize functionality over advanced UI.
- Development will be done by a single developer.
- Infrastructure will rely on third-party managed services.

## 8. Future Enhancements

- Tagging and categorization system
- Syntax highlighting (Prism.js or similar)
- Keyboard shortcuts (power-user feature)
- Snippet sharing via link
- Folder organization
- AI-based snippet suggestions

## 🧭 Smart Execution Plan

### Phase 1 (MVP Backend + Auth)

- User authentication (register/login)
- Create + fetch snippets

### Phase 2

- Update + delete
- Search

### Phase 3

- UI improvements
- Performance polish
