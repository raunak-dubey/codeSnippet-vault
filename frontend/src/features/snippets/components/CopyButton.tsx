'use client';

import React, { useState, useCallback } from 'react';
import { useToast } from '@/features/snippets/components/ToastProvider';

interface CopyButtonProps {
  code: string;
  size?: 'sm' | 'md';
  variant?: 'ghost' | 'solid';
  label?: boolean;
}

export function CopyButton({
  code,
  size = 'md',
  variant = 'ghost',
  label = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        showToast('Copied to clipboard');

        setTimeout(() => setCopied(false), 1500);
      } catch {
        showToast('Failed to copy', 'error');
      }
    },
    [code, showToast],
  );

  const sizeClasses = size === 'sm' ? 'h-7 px-2' : 'h-9 px-3';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  const variantClasses =
    variant === 'solid'
      ? 'bg-[#acc7ff]/15 text-[#acc7ff] hover:bg-[#acc7ff]/25 border border-[#acc7ff]/20'
      : 'text-[#d9e6fd]/50 hover:text-[#acc7ff] hover:bg-white/5';

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center justify-center gap-1.5 rounded-lg
        text-xs font-medium transition-all duration-150 cursor-pointer
        ${sizeClasses} ${variantClasses}
        ${copied ? 'text-[#52b15b]! border-[#52b15b]/20! bg-[#52b15b]/10!' : ''}
      `}
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          className={iconSize}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className={iconSize}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
      {label && (copied ? 'Copied!' : 'Copy')}
    </button>
  );
}
