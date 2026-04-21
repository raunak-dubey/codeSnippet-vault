'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/features/snippets/components/Modal';
import { ProgrammingLanguage, SnippetCreatePayload } from '../types';

interface SnippetCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: SnippetCreatePayload) => void;
}

const LANGUAGES: { value: ProgrammingLanguage; label: string }[] = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'other', label: 'Other' },
];

export function SnippetCreateModal({
  isOpen,
  onClose,
  onCreate,
}: SnippetCreateModalProps) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>('typescript');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const codeRef = useRef<HTMLTextAreaElement>(null);

  // Reset and auto-focus on code field
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setLanguage('typescript');
      setCode('');
      setDescription('');

      // Delay focus to ensure modal is rendered
      setTimeout(() => {
        codeRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    onCreate({
      title: title.trim() || 'Untitled Snippet',
      language,
      code,
      description: description.trim() || undefined,
    });

    onClose();
  };

  const inputClasses = `
    w-full rounded-lg bg-[#0a0e14] border border-white/5
    px-3 py-2.5 text-sm text-[#d9e6fd]
    placeholder:text-[#d9e6fd]/20
    focus:outline-none focus:border-[#acc7ff]/30 focus:ring-1 focus:ring-[#acc7ff]/20
    transition-colors
  `;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Snippet">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-[#d9e6fd]/40 mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., React useDebounce Hook"
            className={inputClasses}
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-medium text-[#d9e6fd]/40 mb-1.5">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
            className={`${inputClasses} cursor-pointer`}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Code */}
        <div>
          <label className="block text-xs font-medium text-[#d9e6fd]/40 mb-1.5">
            Code <span className="text-[#acc7ff]/60">*</span>
          </label>
          <textarea
            ref={codeRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={10}
            spellCheck={false}
            className={`${inputClasses} font-mono text-[13px] leading-6 resize-none`}
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Description (optional) */}
        <div>
          <label className="block text-xs font-medium text-[#d9e6fd]/40 mb-1.5">
            Description{' '}
            <span className="text-[#d9e6fd]/15 font-normal">optional</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the snippet"
            className={inputClasses}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="
              h-9 px-4 rounded-lg text-sm font-medium
              text-[#d9e6fd]/40 hover:text-[#d9e6fd]/70
              hover:bg-white/5 transition-colors cursor-pointer
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!code.trim()}
            className={`
              h-9 px-4 rounded-lg text-sm font-medium
              transition-all duration-150 cursor-pointer
              ${
                code.trim()
                  ? 'bg-[#acc7ff]/15 text-[#acc7ff] border border-[#acc7ff]/20 hover:bg-[#acc7ff]/25'
                  : 'bg-white/5 text-[#d9e6fd]/15 border border-white/5 cursor-not-allowed'
              }
            `}
          >
            Create Snippet
          </button>
        </div>
      </form>
    </Modal>
  );
}
