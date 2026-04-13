# System Documentation

## 1. Overview

### What is this?
Code Snippet Vault is a web application designed to help developers store, manage, and quickly retrieve reusable code snippets.

---

### Who is it for?
Developers who frequently reuse code and need a fast, organized way to access snippets across devices.

---

### Problem it solves
Developers often:
- lose useful code snippets
- store them in scattered places (notes, files, chats)
- waste time searching for previously written code

This system provides a **centralized, fast, and minimal solution** for snippet management.

## 2. Core Features

### 2.1 User Authentication
- Users can register using email and password
- Users can log in securely
- JWT-based authentication is used for protected routes
- Users can log out
- Session handling supports secure access control

---

### 2.2 Snippet Management

#### **Create Snippet**
Users can create a snippet with:
- title (required)
- code (required)
- programming language (required)
- description (optional)

Each snippet is linked to a specific user.

---

#### **View Snippets**
- Users can view all their snippets
- Each snippet displays:
  - title
  - programmingLanguage
  - created date
- Users can only access their own data

---

#### **Update Snippet**
- Users can edit all snippet fields
- Changes are saved and reflected immediately

---

#### **Delete Snippet**
- Users can permanently delete a snippet
- Deleted data is removed from the system

---

### 2.3 Search
- Users can search snippets by:
  - title
  - code content
  - programmingLanguage
- Results are filtered dynamically in real time

---

### 2.4 Clipboard
- Each snippet has a copy button
- Clicking copies the full code
- Visual feedback confirms the action

---

### 2.5 Cross-Device Access
- Users can access their snippets from any device
- Data is synced via the backend database

## 3. User Flows

### 3.1 Create Snippet Flow
1. User initiates snippet creation
2. Inputs code (primary action)
3. Adds title and optional description
4. Selects programmingLanguage
5. Saves snippet

Target time: < 15 seconds

### 3.2 Retrieve Snippet Flow
1. User searches or browses snippets
2. Selects a snippet
3. Copies or edits the snippet

Target time: < 5 seconds

## 4. Data Model

### 4.1 User

```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "role": "string",
  "isEmailVerified": "boolean",
  "emailVerifiedAt": "date",
  "createdAt": "date"
}
```

### 4.2 Snippet Schema

```json
{
  "Id": "string",
  "userId": "string",
  "title": "string",
  "code": "string",
  "programmingLanguage": "string",
  "description": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## 5. Non-Functional Requirements

### 5.1 Performance
- API response time: under 300ms for standard operations
- Search response time: under 500ms
- UI interactions should feel instant and responsive

---

### 5.2 Security
- Passwords are securely hashed via bcrypt
- JWT-based authentication is enforced
- Users cannot access other users’ data
- Input validation is applied on both client and server
- Rate limiting is applied to prevent abuse

---

### 5.3 Scalability
- System supports growth in users and data
- Database queries are optimized for search operations
- Backend follows modular architecture

---

### 5.4 Usability
- Minimal, developer-focused interface
- Low cognitive load
- Fast navigation and interaction

---

### 5.5 Reliability
- Consistent data handling during CRUD operations
- Clear error responses for failed requests
- Graceful handling of server failures

---

### 5.6 Maintainability
- Code follow:
  - KISS (Keep It Simple)
  - DRY (Don’t Repeat Yourself)

- Backend structure follows modules:
  - auth/
  - user/
  - snippets/

## 6. Constraints
- Initial focus is on functionality over advanced UI
- Relies on third-party managed services:
    MongoDB Atlas (database)
    Deployment platforms (e.g., Render)

## 7. Future Scope
- Tagging and categorization system
- Syntax highlighting
- Keyboard shortcuts for power users
- Snippet sharing via link
- Folder organization
- AI-based snippet suggestions