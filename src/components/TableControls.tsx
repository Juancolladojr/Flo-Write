import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Plus, 
  Trash2, 
  Grid, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Columns,
  Rows
} from 'lucide-react';
import { EditorTheme } from '../types';

interface TableControlsProps {
  editor: Editor | null;
  theme: EditorTheme;
}

export const TableControls: React.FC<TableControlsProps> = ({ editor, theme }) => {
  if (!editor || !editor.isActive('table')) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  const btnClass = `flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-none sm:rounded-xs transition-colors ${
    isDark
      ? 'hover:bg-[#121c15] text-[#e5fbf0] hover:text-[#22c55e]'
      : 'hover:bg-[#f4faf6] text-[#13261a] hover:text-[#ea580c]'
  }`;

  return (
    <div
      id="floating-table-controls"
      className={`no-print flex items-center gap-1.5 px-3 py-1.5 rounded-none sm:rounded-xs shadow-xl border backdrop-blur-md mb-2 flex-wrap animate-in fade-in slide-in-from-top-1 ${
        isDark
          ? 'bg-[#0d1410]/95 border-[#1a3022] text-[#e5fbf0]'
          : 'bg-[#ffffff]/95 border-[#d1e5d7] text-[#13261a]'
      }`}
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] px-1 flex items-center gap-1">
        <Grid className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e]" /> Table Matrix:
      </span>

      {/* Row operations */}
      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        className={btnClass}
        title="Add Row Above"
      >
        <ArrowUp className="w-3 h-3 text-[#5e7a68] dark:text-[#6f9c7d]" /> +Row Above
      </button>

      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className={btnClass}
        title="Add Row Below"
      >
        <ArrowDown className="w-3 h-3 text-[#5e7a68] dark:text-[#6f9c7d]" /> +Row Below
      </button>

      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        className={btnClass}
        title="Delete Current Row"
      >
        <Rows className="w-3 h-3 text-rose-500" /> Del Row
      </button>

      <div className={`h-3 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

      {/* Column operations */}
      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        className={btnClass}
        title="Add Column Left"
      >
        <ArrowLeft className="w-3 h-3 text-[#5e7a68] dark:text-[#6f9c7d]" /> +Col Left
      </button>

      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className={btnClass}
        title="Add Column Right"
      >
        <ArrowRight className="w-3 h-3 text-[#5e7a68] dark:text-[#6f9c7d]" /> +Col Right
      </button>

      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        className={btnClass}
        title="Delete Current Column"
      >
        <Columns className="w-3 h-3 text-rose-500" /> Del Col
      </button>

      <div className={`h-3 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

      {/* Header toggles */}
      <button
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        className={btnClass}
        title="Toggle Header Row"
      >
        Toggle Header
      </button>

      {/* Delete table */}
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-none sm:rounded-xs bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 transition-colors ml-auto"
        title="Delete Entire Table"
      >
        <Trash2 className="w-3 h-3" /> Remove Table
      </button>
    </div>
  );
};
