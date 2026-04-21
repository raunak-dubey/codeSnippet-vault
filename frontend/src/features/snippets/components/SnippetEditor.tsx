'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Snippet, SnippetUpdatePayload } from '../types';
import { LanguageBadge } from './LanguageBadge';
import { CopyButton } from './CopyButton';
import { useToast } from '@/features/snippets/components/ToastProvider';

interface SnippetEditorProps {
  snippet: Snippet | null;
  onSave: (id: string, payload: SnippetUpdatePayload) => void;
}

export function SnippetEditor({ snippet, onSave }: SnippetEditorProps) {
  const [editableCode, setEditableCode] = useState('');
  const [editableTitle, setEditableTitle] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (snippet) {
      setEditableCode(snippet.code);
      setEditableTitle(snippet.title);
      setIsDirty(false);
    }
  }, [snippet]);

  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditableCode(e.target.value);
      setIsDirty(true);
    },
    [],
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditableTitle(e.target.value);
      setIsDirty(true);
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (!snippet) return;

    onSave(snippet.id, {
      title: editableTitle,
      code: editableCode,
    });
    setIsDirty(false);
    showToast('Snippet saved');
  }, [snippet, editableTitle, editableCode, onSave, showToast]);

  // Keyboard shortcut: Ctrl/Cmd + S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (isDirty && snippet) handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, snippet, handleSave]);

  // Empty state
  if (!snippet) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/3">
            <svg
              className="h-8 w-8 text-[#d9e6fd]/15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </div>
          <p className="text-sm text-[#d9e6fd]/30">Select a snippet to view</p>
          <p className="mt-1 text-xs text-[#d9e6fd]/15">or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top Bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-white/5">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="
              bg-transparent text-[#d9e6fd] text-base font-semibold
              border-none outline-none w-full
              focus:ring-0 placeholder:text-[#d9e6fd]/20
            "
            placeholder="Snippet title..."
          />
          <LanguageBadge language={snippet.language} />
        </div>

        <div className="flex items-center gap-2 ml-4 shrink-0">
          <CopyButton code={editableCode} size="md" variant="solid" label />

          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`
              inline-flex items-center gap-1.5 rounded-lg h-9 px-3
              text-xs font-medium transition-all duration-150 cursor-pointer
              ${
                isDirty
                  ? 'bg-[#acc7ff]/15 text-[#acc7ff] border border-[#acc7ff]/20 hover:bg-[#acc7ff]/25'
                  : 'bg-white/5 text-[#d9e6fd]/20 border border-white/5 cursor-not-allowed'
              }
            `}
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-hidden relative">
        {/* Line numbers gutter */}
        <div className="absolute inset-0 flex">
          <div className="shrink-0 w-14 bg-[#0a0e14]/50 border-r border-white/5 pt-4 pb-4 overflow-hidden">
            <div className="flex flex-col">
              {editableCode.split('\n').map((_, i) => (
                <span
                  key={i}
                  className="block px-3 text-right text-[11px] leading-6 text-[#d9e6fd]/15 font-mono select-none"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          <textarea
            value={editableCode}
            onChange={handleCodeChange}
            spellCheck={false}
            className="
              flex-1 resize-none bg-transparent text-[#d9e6fd]/90
              p-4 pl-5 font-mono text-[13px] leading-6
              focus:outline-none selection:bg-[#acc7ff]/20
              scrollbar-thin overflow-auto
            "
            style={{ tabSize: 2 }}
          />
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-2 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#d9e6fd]/20">
            {editableCode.split('\n').length} lines
          </span>
          <span className="text-[10px] text-[#d9e6fd]/20">
            {editableCode.length} chars
          </span>
        </div>
        {isDirty && (
          <span className="text-[10px] text-[#acc7ff]/50 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#acc7ff]/50" />
            Unsaved changes
          </span>
        )}
        {!isDirty && snippet.description && (
          <span className="text-[10px] text-[#d9e6fd]/20 truncate max-w-xs">
            {snippet.description}
          </span>
        )}
      </div>
    </div>
  );
}
