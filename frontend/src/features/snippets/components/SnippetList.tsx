'use client';

import React, { useState, useMemo } from 'react';
import { Snippet } from '../types';
import { SnippetItem } from './SnippetItem';
import { SnippetSearch } from './SnippetSearch';

interface SnippetListProps {
  snippets: Snippet[];
  activeSnippetId: string | null;
  onSelect: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export function SnippetList({
  snippets,
  activeSnippetId,
  onSelect,
  onDelete,
  onCreateNew,
}: SnippetListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSnippets = useMemo(() => {
    if (!searchQuery.trim()) return snippets;

    const query = searchQuery.toLowerCase();
    return snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.language.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query),
    );
  }, [snippets, searchQuery]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#d9e6fd]">Snippets</h2>
            <p className="text-[11px] text-[#d9e6fd]/30 mt-0.5">
              {filteredSnippets.length} snippet
              {filteredSnippets.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="
              h-8 w-8 inline-flex items-center justify-center rounded-lg
              bg-[#acc7ff]/10 text-[#acc7ff] border border-[#acc7ff]/15
              hover:bg-[#acc7ff]/20 transition-colors cursor-pointer
            "
            title="New Snippet"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <SnippetSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
        {filteredSnippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <svg
                className="h-5 w-5 text-[#d9e6fd]/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <p className="text-xs text-[#d9e6fd]/30">
              {searchQuery
                ? 'No snippets match your search'
                : 'No snippets yet'}
            </p>
            {!searchQuery && (
              <button
                onClick={onCreateNew}
                className="mt-2 text-xs text-[#acc7ff]/70 hover:text-[#acc7ff] transition-colors"
              >
                Create your first snippet
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredSnippets.map((snippet) => (
              <SnippetItem
                key={snippet.id}
                snippet={snippet}
                isActive={snippet.id === activeSnippetId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
