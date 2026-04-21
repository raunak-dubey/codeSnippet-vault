'use client';

import React from 'react';
import { Snippet } from '../types';
import { LanguageBadge } from './LanguageBadge';
import { CopyButton } from './CopyButton';

interface SnippetItemProps {
  snippet: Snippet;
  isActive: boolean;
  onSelect: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function SnippetItem({
  snippet,
  isActive,
  onSelect,
  onDelete,
}: SnippetItemProps) {
  return (
    <div
      onClick={() => onSelect(snippet)}
      className={`
        group relative flex items-start gap-3 rounded-lg px-3 py-3 cursor-pointer
        transition-colors duration-100
        ${
          isActive
            ? 'bg-[#acc7ff]/10 border border-[#acc7ff]/15'
            : 'border border-transparent hover:bg-white/3'
        }
      `}
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`text-sm font-medium truncate ${
              isActive ? 'text-[#acc7ff]' : 'text-[#d9e6fd]/90'
            }`}
          >
            {snippet.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <LanguageBadge language={snippet.language} />
          <span className="text-[10px] text-[#d9e6fd]/25">
            {formatRelativeTime(snippet.updatedAt)}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 shrink-0">
        <CopyButton code={snippet.code} size="sm" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(snippet.id);
          }}
          className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-[#d9e6fd]/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          title="Delete snippet"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
