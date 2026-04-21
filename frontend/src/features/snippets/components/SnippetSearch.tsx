'use client';

import React from 'react';

interface SnippetSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SnippetSearch({ value, onChange }: SnippetSearchProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d9e6fd]/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search snippets..."
        className="
          w-full rounded-lg bg-[#0a0e14] border border-white/5
          py-2.5 pl-10 pr-4 text-sm text-[#d9e6fd]
          placeholder:text-[#d9e6fd]/25
          focus:outline-none focus:border-[#acc7ff]/30 focus:ring-1 focus:ring-[#acc7ff]/20
          transition-colors
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d9e6fd]/30 hover:text-[#d9e6fd]/60 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
