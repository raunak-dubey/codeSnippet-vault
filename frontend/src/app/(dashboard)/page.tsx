'use client';

import React, { useState, useCallback } from 'react';
import { ToastProvider } from '@/features/snippets/components/ToastProvider';
import { SnippetList } from '@/features/snippets/components/SnippetList';
import { SnippetEditor } from '@/features/snippets/components/SnippetEditor';
import { SnippetCreateModal } from '@/features/snippets/components/SnippetCreateModal';
import { mockSnippets } from '@/features/snippets/data/mockSnippets';
import {
  Snippet,
  SnippetCreatePayload,
  SnippetUpdatePayload,
} from '@/features/snippets/types';

export default function Dashboard() {
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSelect = useCallback((snippet: Snippet) => {
    setActiveSnippet(snippet);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      setSnippets((prev) => prev.filter((s) => s.id !== id));
      if (activeSnippet?.id === id) {
        setActiveSnippet(null);
      }
    },
    [activeSnippet],
  );

  const handleCreate = useCallback((payload: SnippetCreatePayload) => {
    const newSnippet: Snippet = {
      id: crypto.randomUUID(),
      title: payload.title,
      code: payload.code,
      language: payload.language,
      description: payload.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSnippets((prev) => [newSnippet, ...prev]);
    setActiveSnippet(newSnippet);
  }, []);

  const handleSave = useCallback(
    (id: string, payload: SnippetUpdatePayload) => {
      setSnippets((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, ...payload, updatedAt: new Date() } : s,
        ),
      );

      if (activeSnippet?.id === id) {
        setActiveSnippet((prev) =>
          prev ? { ...prev, ...payload, updatedAt: new Date() } : null,
        );
      }
    },
    [activeSnippet],
  );

  return (
    <ToastProvider>
      <aside className="w-[30%] min-w-[20rem] max-w-120 h-screen border-r border-white/5 bg-[#121a25] flex flex-col">
        <SnippetList
          snippets={snippets}
          activeSnippetId={activeSnippet?.id ?? null}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onCreateNew={() => setIsCreateModalOpen(true)}
        />
      </aside>

      {/* Editor Panel */}
      <main className="flex-1 h-screen bg-[#0a0e14] flex flex-col overflow-hidden">
        <SnippetEditor snippet={activeSnippet} onSave={handleSave} />
      </main>

      {/* Create Modal */}
      <SnippetCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </ToastProvider>
  );
}
