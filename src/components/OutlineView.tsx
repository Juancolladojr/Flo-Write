import React from 'react';
import { Editor } from '@tiptap/react';
import { Compass, Hash, X, BookOpen, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { DocumentStats, EditorTheme } from '../types';

interface OutlineViewProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
  stats: DocumentStats;
  theme: EditorTheme;
}

interface OutlineItem {
  id: string;
  level: number;
  text: string;
  pos: number;
}

export const OutlineView: React.FC<OutlineViewProps> = ({
  editor,
  isOpen,
  onClose,
  stats,
  theme
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  // Extract headings from editor document
  const getHeadings = (): OutlineItem[] => {
    if (!editor) return [];
    const headings: OutlineItem[] = [];

    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'heading') {
        const text = node.textContent;
        const level = node.attrs.level;
        if (text.trim()) {
          headings.push({
            id: `heading-${pos}`,
            level,
            text,
            pos
          });
        }
      }
    });

    return headings;
  };

  const headings = getHeadings();

  const handleScrollToHeading = (pos: number) => {
    if (!editor) return;
    editor.chain().focus().setTextSelection(pos + 1).run();
  };

  return (
    <aside
      id="document-outline-panel"
      className={`no-print w-72 flex-shrink-0 border-l flex flex-col h-full z-20 select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
          : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a]'
      }`}
    >
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
          <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
            DOCUMENT STRUCTURE
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Analytics Summary Box */}
      <div className="p-4">
        <div
          className={`p-3 rounded-none sm:rounded-xs border ${
            isDark
              ? 'bg-[#080d0a] border-[#1a3022]'
              : 'bg-white border-[#d1e5d7]'
          }`}
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] mb-2.5">
            COMPOSITION METRICS
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] block">Words</span>
              <span className="font-mono font-bold text-sm text-[#13261a] dark:text-[#22c55e]">{stats.words}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] block">Characters</span>
              <span className="font-mono font-bold text-sm text-[#13261a] dark:text-[#22c55e]">{stats.characters}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] block">Read Time</span>
              <span className="font-mono font-bold text-sm text-[#13261a] dark:text-[#22c55e]">~{stats.readingTimeMinutes} min</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] block">Paragraphs</span>
              <span className="font-mono font-bold text-sm text-[#13261a] dark:text-[#22c55e]">{stats.paragraphs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Headings List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] py-1 mb-1">
          TABLE OF CONTENTS
        </div>

        {headings.length === 0 ? (
          <div className="py-8 text-center text-[#5e7a68] dark:text-[#6f9c7d] font-serif italic text-xs">
            No headings detected.<br />Add H1, H2, or H3 headings to populate the outline.
          </div>
        ) : (
          headings.map((h, i) => (
            <button
              key={h.id}
              onClick={() => handleScrollToHeading(h.pos)}
              className={`w-full text-left py-1.5 px-2 rounded-none transition-colors group flex items-start gap-1.5 ${
                h.level === 1
                  ? 'font-serif font-bold text-xs text-[#13261a] dark:text-[#e5fbf0]'
                  : h.level === 2
                  ? 'pl-4 text-xs font-serif text-[#2a4d36] dark:text-[#a1cbb0]'
                  : 'pl-7 text-[11px] font-sans text-[#5e7a68] dark:text-[#6f9c7d]'
              } hover:bg-[#e8f4ec] dark:hover:bg-[#121c15] hover:text-[#ea580c] dark:hover:text-[#22c55e]`}
            >
              <span className="text-[10px] font-mono text-[#5e7a68] dark:text-[#6f9c7d] group-hover:text-[#ea580c] dark:group-hover:text-[#22c55e] flex-shrink-0 mt-0.5">
                {h.level === 1 ? `${i + 1}.` : '›'}
              </span>
              <span className="truncate flex-1">{h.text}</span>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className={`p-3 border-t text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] font-mono text-center ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
        AUTO-INDEXED STRUCTURE
      </div>
    </aside>
  );
};
