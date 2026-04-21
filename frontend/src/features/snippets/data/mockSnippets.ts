import { Snippet } from '../types';

export const mockSnippets: Snippet[] = [
  {
    id: '1',
    title: 'React useDebounce Hook',
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    language: 'typescript',
    description:
      'A custom React hook for debouncing values. Useful for search inputs and API calls.',
    createdAt: new Date('2025-01-15T10:30:00'),
    updatedAt: new Date('2025-01-18T14:20:00'),
  },
  {
    id: '2',
    title: 'Express Auth Middleware',
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};`,
    language: 'typescript',
    description: 'JWT authentication middleware for Express.js applications.',
    createdAt: new Date('2025-01-10T09:00:00'),
    updatedAt: new Date('2025-01-10T09:00:00'),
  },
  {
    id: '3',
    title: 'Python Quick Sort',
    code: `def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)


# Usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = quick_sort(numbers)
print(sorted_numbers)`,
    language: 'python',
    description: 'Clean implementation of QuickSort algorithm in Python.',
    createdAt: new Date('2025-01-08T16:45:00'),
    updatedAt: new Date('2025-01-12T11:30:00'),
  },
  {
    id: '4',
    title: 'CSS Grid Auto-Fill Layout',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.grid-item {
  background: var(--surface);
  border-radius: 8px;
  padding: 1.25rem;
  transition: transform 0.15s ease;
}

.grid-item:hover {
  transform: translateY(-2px);
}`,
    language: 'css',
    description:
      'Responsive CSS Grid layout with auto-fill for card-based designs.',
    createdAt: new Date('2025-01-05T13:20:00'),
    updatedAt: new Date('2025-01-05T13:20:00'),
  },
  {
    id: '5',
    title: 'Rust Error Handling Pattern',
    code: `use std::fmt;
use std::io;

#[derive(Debug)]
enum AppError {
    IoError(io::Error),
    ParseError(String),
    NotFound(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::IoError(e) => write!(f, "IO error: {}", e),
            AppError::ParseError(msg) => write!(f, "Parse error: {}", msg),
            AppError::NotFound(item) => write!(f, "Not found: {}", item),
        }
    }
}

impl From<io::Error> for AppError {
    fn from(error: io::Error) -> Self {
        AppError::IoError(error)
    }
}

fn read_config(path: &str) -> Result<String, AppError> {
    let content = std::fs::read_to_string(path)?;
    if content.is_empty() {
        Err(AppError::ParseError("Empty config file".into()))
    } else {
        Ok(content)
    }
}`,
    language: 'rust',
    description:
      'Idiomatic Rust error handling with custom error types and From trait.',
    createdAt: new Date('2025-01-03T08:15:00'),
    updatedAt: new Date('2025-01-14T17:00:00'),
  },
  {
    id: '6',
    title: 'SQL Window Functions',
    code: `-- Rank employees by salary within each department
SELECT
    employee_name,
    department,
    salary,
    RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank,
    AVG(salary) OVER (
        PARTITION BY department
    ) AS dept_avg_salary,
    salary - AVG(salary) OVER (
        PARTITION BY department
    ) AS diff_from_avg
FROM employees
ORDER BY department, salary_rank;`,
    language: 'sql',
    description:
      'SQL window functions for ranking and aggregation within partitions.',
    createdAt: new Date('2025-01-01T12:00:00'),
    updatedAt: new Date('2025-01-01T12:00:00'),
  },
  {
    id: '7',
    title: 'Go HTTP Server',
    code: `package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	Message string \`json:"message"\`
	Status  int    \`json:"status"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{
		Message: "OK",
		Status:  200,
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", healthHandler)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}`,
    language: 'go',
    description: 'Simple Go HTTP server with JSON response handling.',
    createdAt: new Date('2024-12-28T10:00:00'),
    updatedAt: new Date('2025-01-06T09:30:00'),
  },
  {
    id: '8',
    title: 'Bash Deploy Script',
    code: `#!/bin/bash
set -euo pipefail

APP_NAME="myapp"
DEPLOY_DIR="/opt/\${APP_NAME}"
BACKUP_DIR="/opt/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Deploying \${APP_NAME}..."

# Create backup
echo "📦 Creating backup..."
mkdir -p "\${BACKUP_DIR}"
tar -czf "\${BACKUP_DIR}/\${APP_NAME}_\${TIMESTAMP}.tar.gz" "\${DEPLOY_DIR}" 2>/dev/null || true

# Pull latest
echo "⬇️  Pulling latest changes..."
cd "\${DEPLOY_DIR}"
git pull origin main

# Install dependencies
echo "📥 Installing dependencies..."
npm ci --production

# Restart service
echo "🔄 Restarting service..."
sudo systemctl restart "\${APP_NAME}"

echo "✅ Deploy complete!"`,
    language: 'bash',
    description: 'Production deployment script with backup and error handling.',
    createdAt: new Date('2024-12-25T15:30:00'),
    updatedAt: new Date('2024-12-25T15:30:00'),
  },
];
