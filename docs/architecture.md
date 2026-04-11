# Code Snippet Vault — Architecture Documentation

## 1. System Overview

Code Snippet Vault follows a simple but intentional architecture optimized for speed and clarity.

```
Client (Next.js App Router)
        ↓
API Layer (Express Server)
        ↓
Database (MongoDB - Mongoose)
```

### Key Characteristics

* **Stateless backend** using JWT authentication
* **Thin frontend** focused on interaction and rendering
* **Modular backend** organized by domain (auth, user, snippets)
* **Single database** for fast iteration and simplicity

## 2. Request Flow

### Standard Request Lifecycle

1. User interacts with UI (e.g., clicks "Save Snippet")
2. Frontend triggers API call via service layer
3. Request passes through backend middleware:

   * Authentication check (JWT)
   * Request validation
4. Controller handles the request
5. Service layer executes business logic
6. Database is queried/updated via Mongoose
7. Response is returned to frontend
8. TanStack Query updates UI state automatically

---

### Example: Search Flow (Core Feature)

1. User types in search input
2. Frontend debounces input
3. API request sent: `GET /snippets?query=...`
4. Backend:

   * extracts userId from token
   * queries snippets collection
   * applies filters on title, code, language
5. Matching results returned
6. UI updates instantly without page reload

**Important:** Search is designed to feel real-time (<500ms target)

---

## 3. Authentication Flow

Authentication uses **JWT + Refresh Token strategy**.

### Login Flow

1. User submits credentials
2. Backend verifies email + password
3. Backend generates:

   * Access Token (short-lived)
   * Refresh Token (long-lived)
4. Tokens are sent to client

---

### Authenticated Requests

1. Client sends access token in headers
2. Backend middleware:

   * verifies token
   * attaches `userId` to request
3. Request proceeds to controller

---

### Token Refresh

1. Access token expires
2. Client sends refresh token
3. Backend validates refresh token
4. New access token issued

---

### Security Decisions

* Passwords are hashed (bcrypt)
* Protected routes require valid JWT
* User isolation enforced via `userId` filtering

## 4. Backend Structure

Backend follows a **feature-based modular structure**:

```
src/
  modules/
    auth/
    user/
    snippets/
```

### Module Responsibilities

#### auth/

* Register & login
* Token generation
* Email verification

#### user/

* User data handling
* Account-level logic

#### snippets/

* Create, read, update, delete snippets
* Search functionality

---

### Layered Architecture

Each module typically follows:

* **Route** → defines endpoints
* **Controller** → handles request/response
* **Service** → business logic
* **Model** → database schema

---

### Middleware

* Authentication (JWT verification)
* Validation (request body checks)
* Error handling (centralized)

---

## 5. Frontend Structure

Frontend is built using **Next.js App Router** with feature-based organization.

```
app/
  auth/
  dashboard/

features/
  auth/
  snippets/

shared/
  lib/
  styles/
  providers/
```

---

### Responsibilities

* **app/** → routing and page-level structure
* **features/** → domain logic (auth, snippets)
* **shared/** → reusable components, styles, and providers

---

### State Management

Uses **TanStack Query** for:

* API data fetching
* Caching responses
* Managing loading and error states
* Syncing UI with server state

---

### Data Flow Example

1. Component triggers mutation (create snippet)
2. API call executed
3. TanStack Query updates cache
4. Snippet list updates automatically

## 6. Database Design

### Database: MongoDB (via Mongoose)

Chosen for flexibility and fast development iteration.

---

### Collections

#### Users

* username (unique)
* email (unique)
* passwordHash
* createdAt

#### Snippets

* userId (reference to user)
* title
* code
* language
* description
* timestamps

---

### Relationships

* One user → many snippets
* Each snippet belongs to one user

---

### Query Strategy

All snippet queries are scoped by `userId` to enforce isolation.

---

### Indexing (Important for Search)

Recommended indexes:

* `userId`
* `title`
* `language`

For advanced search:

* text index on `title` + `code`

## 7. Design Decisions

### Why MongoDB?

* Flexible schema for evolving product
* Easy to iterate during early development
* Good fit for document-based data

---

### Why JWT + Refresh Tokens?

* Stateless authentication
* Scales easily
* Separates short-lived access from long-lived sessions

---

### Why Next.js (App Router)?

* Built-in routing and layout system
* Good integration with modern React patterns
* Supports fast UI updates

---

### Why TanStack Query?

* Eliminates manual state syncing
* Built-in caching
* Handles async complexity cleanly

---

### Why Express?

* Minimal and flexible
* Full control over API structure
* Easy to structure modular backend

## 8. Performance Considerations

* Search optimized via indexing
* Minimal payload responses
* Client-side caching via TanStack Query
* Avoid unnecessary re-renders

## 9. Future Improvements

* Full-text search optimization
* Redis caching layer
* Rate limiting middleware
* Background jobs (if needed)
* Horizontal scaling of backend
