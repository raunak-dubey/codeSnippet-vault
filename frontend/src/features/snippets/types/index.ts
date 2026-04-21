export type ProgrammingLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'rust'
  | 'go'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'html'
  | 'css'
  | 'sql'
  | 'bash'
  | 'json'
  | 'yaml'
  | 'markdown'
  | 'other';

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: ProgrammingLanguage;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SnippetCreatePayload {
  title: string;
  code: string;
  language: ProgrammingLanguage;
  description?: string;
}

export interface SnippetUpdatePayload {
  title?: string;
  code?: string;
  language?: ProgrammingLanguage;
  description?: string;
}
