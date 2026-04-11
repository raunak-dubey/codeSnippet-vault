# Code Snippet Vault — API Documentation

## 1. Base URL

```
http://localhost:4000
```

## 2. Authentication

### 2.1 Register

**POST** `/auth/register`

#### Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "message": "Verification email sent successfully"
}
```

#### Errors

* 400: Invalid input
* 409: Email already exists

---

### 2.2 Login

**POST** `/auth/login`

#### Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "accessToken": "string"
}
```

#### Errors

* 400: Invalid input
* 401: Invalid credentials

---

### 2.3 Refresh Token

**POST** `/auth/refresh`

#### Body

```json
{
  "refreshToken": "string"
}
```

#### Response

```json
{
  "accessToken": "string"
}
```

#### Errors

* 401: Invalid or expired refresh token

## 3. Snippets

> All snippet routes require authentication.

---

### 3.1 Get All Snippets

**GET** `/snippets`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
[
  {
    "id": "string",
    "title": "string",
    "language": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### 3.2 Get Single Snippet

**GET** `/snippets/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
{
  "id": "string",
  "title": "string",
  "code": "string",
  "language": "string",
  "description": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Errors

* 404: Snippet not found

---

### 3.3 Create Snippet

**POST** `/snippets`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Body

```json
{
  "title": "string",
  "code": "string",
  "language": "string",
  "description": "string"
}
```

#### Response

```json
{
  "id": "string",
  "title": "string",
  "code": "string",
  "language": "string",
  "description": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Errors

* 400: Validation error

---

### 3.4 Update Snippet

**PUT** `/snippets/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Body

```json
{
  "title": "string",
  "code": "string",
  "language": "string",
  "description": "string"
}
```

#### Response

```json
{
  "message": "Snippet updated successfully"
}
```

#### Errors

* 400: Validation error
* 404: Snippet not found

---

### 3.5 Delete Snippet

**DELETE** `/snippets/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
{
  "message": "Snippet deleted successfully"
}
```

#### Errors

* 404: Snippet not found

---

### 3.6 Search Snippets

**GET** `/snippets/search?query=<text>`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
[
  {
    "id": "string",
    "title": "string",
    "language": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

## 4. Error Format

All errors follow a consistent structure:

```json
{
  "message": "string",
  "statusCode": number
}
```

## 5. Status Codes

* 200: Success
* 201: Resource created
* 400: Bad request / validation error
* 401: Unauthorized
* 404: Not found
* 409: Conflict
* 500: Internal server error
