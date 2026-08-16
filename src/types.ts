export type DocumentFormat = 'standard' | 'screenwriting' | 'play' | 'songwriting' | 'poetry';

export interface DocumentItem {
  id: string;
  title: string;
  content: string; // HTML string
  createdAt: number;
  updatedAt: number;
  isPinned?: boolean;
  tags?: string[];
  icon?: string;
  wordCount?: number;
  format?: DocumentFormat;
}

export type EditorTheme = 'light' | 'sepia' | 'dark' | 'nord';

export type LayoutMode = 'page' | 'continuous' | 'split-markdown' | 'zen';

export interface DocumentStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  paragraphs: number;
  sentences: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  readingEaseScore: number;
  readingEaseLevel: string;
}

export interface SlashCommand {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Typography' | 'Lists' | 'Blocks' | 'Callouts' | 'Screenwriting' | 'Plays' | 'Songwriting' | 'Poetry';
  action: () => void;
}

export interface TemplateItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'General' | 'Work' | 'Writing' | 'Academic' | 'Screenwriting' | 'Plays' | 'Songwriting' | 'Poetry';
  format?: DocumentFormat;
  content: string;
}

