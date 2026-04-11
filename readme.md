# Code Snippet Vault

A fast, minimal web application to store, manage, and retrieve reusable code snippets.

## Overview

Code Snippet Vault helps developers avoid losing useful code by providing a centralized, searchable snippet system.

Designed with a focus on:
- Fast retrieval (<5 seconds)
- Quick creation (<15 seconds)
- Low cognitive load

## Tech Stack

* Frontend: Next.js (App Router), TanStack Query
* Backend: Node.js, Express
* Database: MongoDB (Mongoose)
* Auth: JWT + Refresh Token + Email Verification

## Features

* Authentication (Register, Login, Email Verification)
* Snippet management (create, edit, delete, search)
* Real time search filtering
* Copy to clipboard
* Protected routes

## Project Structure

```
frontend/
backend/
packages/
```

## Quick Start
```bash
git clone https://github.com/raunak-dubey/codeSnippet-vault.git
cd codeSnippet-vault
pnpm install
```

> For full setup instructions, see [Setup Guide](./docs/setup.md)

## Contribution

Contributions are welcome. If you'd like to improve this project, follow the steps below:

### Steps

1. Fork the Repository
2. Clone Your Fork
3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

4. Make Your Changes

* Follow the existing project structure
* Keep code clean and consistent
* Write meaningful commit messages

5. Commit and Push

```bash
git add .
git commit -m "feat(feature): your feature description"
git push origin feature/your-feature-name
```

6. Create a Pull Request

## Documentation


* [System](./docs/system.md)
* [Architecture](./docs/architecture.md)
* [Design](./docs/design.md)
* [API](./docs/api.md)
* [Setup](./docs/setup.md)
