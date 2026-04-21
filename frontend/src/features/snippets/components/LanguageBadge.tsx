import React from 'react';
import { ProgrammingLanguage } from '../types';

interface LanguageBadgeProps {
  language: ProgrammingLanguage;
}

const LANGUAGE_CONFIG: Record<
  ProgrammingLanguage,
  { label: string; color: string }
> = {
  typescript: { label: 'TS', color: '#3178c6' },
  javascript: { label: 'JS', color: '#f7df1e' },
  python: { label: 'PY', color: '#3572a5' },
  rust: { label: 'RS', color: '#dea584' },
  go: { label: 'GO', color: '#00add8' },
  java: { label: 'JV', color: '#b07219' },
  csharp: { label: 'C#', color: '#68217a' },
  cpp: { label: 'C++', color: '#f34b7d' },
  html: { label: 'HTML', color: '#e34c26' },
  css: { label: 'CSS', color: '#563d7c' },
  sql: { label: 'SQL', color: '#e38c00' },
  bash: { label: 'SH', color: '#4eaa25' },
  json: { label: 'JSON', color: '#a0a0a0' },
  yaml: { label: 'YAML', color: '#cb171e' },
  markdown: { label: 'MD', color: '#083fa1' },
  other: { label: 'TXT', color: '#6b7280' },
};

export function LanguageBadge({ language }: LanguageBadgeProps) {
  const config = LANGUAGE_CONFIG[language] ?? LANGUAGE_CONFIG.other;

  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase"
      style={{
        backgroundColor: `${config.color}20`,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}
