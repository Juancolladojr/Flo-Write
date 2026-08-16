import React, { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { Search, ChevronUp, ChevronDown, X, CaseSensitive } from 'lucide-react';
import { EditorTheme } from '../types';

interface FindReplaceModalProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
}

export const FindReplaceModal: React.FC<FindReplaceModalProps> = ({
  editor,
  isOpen,
  onClose,
  theme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const isDark = theme === 'dark' || theme === 'nord';

  useEffect(() => {
    if (!editor || !searchTerm) {
      setMatchCount(0);
      setCurrentMatchIndex(0);
      return;
    }

    const text = editor.getText();
    const flags = caseSensitive ? 'g' : 'gi';
    try {
      const regex = new RegExp(escapeRegex(searchTerm), flags);
      const matches = text.match(regex);
      const count = matches ? matches.length : 0;
      setMatchCount(count);
      if (count > 0 && currentMatchIndex === 0) setCurrentMatchIndex(1);
      if (count === 0) setCurrentMatchIndex(0);
    } catch {
      setMatchCount(0);
    }
  }, [searchTerm, caseSensitive, editor]);

  function escapeRegex(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const findNext = () => {
    if (!editor || !searchTerm) return;
    const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n');
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(escapeRegex(searchTerm), flags);
    
    const matches: { from: number; to: number }[] = [];
    let m;
    while ((m = regex.exec(docText)) !== null) {
      matches.push({ from: m.index, to: m.index + m[0].length });
    }

    if (matches.length === 0) return;

    let nextIdx = (currentMatchIndex % matches.length);
    const targetMatch = matches[nextIdx];
    setCurrentMatchIndex(nextIdx + 1);

    try {
      editor.chain().focus().setTextSelection({ from: targetMatch.from + 1, to: targetMatch.to + 1 }).run();
    } catch (e) {}
  };

  const findPrev = () => {
    if (!editor || !searchTerm) return;
    const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n');
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(escapeRegex(searchTerm), flags);
    
    const matches: { from: number; to: number }[] = [];
    let m;
    while ((m = regex.exec(docText)) !== null) {
      matches.push({ from: m.index, to: m.index + m[0].length });
    }

    if (matches.length === 0) return;

    let prevIdx = (currentMatchIndex - 2 + matches.length) % matches.length;
    const targetMatch = matches[prevIdx];
    setCurrentMatchIndex(prevIdx + 1);

    try {
      editor.chain().focus().setTextSelection({ from: targetMatch.from + 1, to: targetMatch.to + 1 }).run();
    } catch (e) {}
  };

  const handleReplaceCurrent = () => {
    if (!editor || !searchTerm) return;
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to);

    const matches = caseSensitive
      ? selectedText === searchTerm
      : selectedText.toLowerCase() === searchTerm.toLowerCase();

    if (matches) {
      editor.chain().focus().insertContent(replaceTerm).run();
      findNext();
    } else {
      findNext();
    }
  };

  const handleReplaceAll = () => {
    if (!editor || !searchTerm) return;
    const html = editor.getHTML();
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(escapeRegex(searchTerm), flags);
    const newHtml = html.replace(regex, replaceTerm);
    editor.commands.setContent(newHtml);
    setMatchCount(0);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed top-16 right-6 z-50 w-80 rounded-none sm:rounded-xs shadow-2xl border p-3.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 ${
      isDark
        ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
        : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
    }`}>
      <div className={`flex items-center justify-between pb-2 border-b mb-3 ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
          <Search className="w-3.5 h-3.5 text-[#ea580c] dark:text-[#22c55e]" />
          <span>FIND & REPLACE</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {/* Find Input with match counter */}
        <div className="relative flex items-center">
          <input
            id="find-input"
            type="text"
            placeholder="Search text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') findNext();
              if (e.key === 'Escape') onClose();
            }}
            autoFocus
            className={`w-full text-xs px-2.5 py-1.5 pr-20 rounded-none border outline-none font-sans ${
              isDark
                ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
                : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] focus:border-[#ea580c]'
            }`}
          />
          <div className="absolute right-2 flex items-center gap-1 text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] font-mono">
            {searchTerm && (
              <span>
                {matchCount > 0 ? `${currentMatchIndex}/${matchCount}` : '0/0'}
              </span>
            )}
          </div>
        </div>

        {/* Replace Input */}
        <div className="flex items-center">
          <input
            id="replace-input"
            type="text"
            placeholder="Replace with..."
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleReplaceCurrent();
            }}
            className={`w-full text-xs px-2.5 py-1.5 rounded-none border outline-none font-sans ${
              isDark
                ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
                : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] focus:border-[#ea580c]'
            }`}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setCaseSensitive(!caseSensitive)}
            className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-none transition-colors border ${
              caseSensitive
                ? isDark
                  ? 'bg-[#22c55e] text-black border-[#22c55e] font-black'
                  : 'bg-[#ea580c] text-white border-[#ea580c]'
                : 'border-transparent text-[#5e7a68] dark:text-[#6f9c7d] hover:bg-[#f4faf6] dark:hover:bg-[#121c15]'
            }`}
            title="Match Case Sensitive"
          >
            <CaseSensitive className="w-3.5 h-3.5" /> Case
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={findPrev}
              disabled={matchCount === 0}
              className="p-1 rounded-none hover:bg-[#f4faf6] dark:hover:bg-[#121c15] text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] disabled:opacity-30"
              title="Previous Match"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={findNext}
              disabled={matchCount === 0}
              className="p-1 rounded-none hover:bg-[#f4faf6] dark:hover:bg-[#121c15] text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] disabled:opacity-30"
              title="Next Match"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleReplaceCurrent}
            disabled={!searchTerm}
            className={`text-xs font-bold uppercase tracking-wider py-1.5 px-2 rounded-none border transition-colors disabled:opacity-40 ${
              isDark
                ? 'border-[#1a3022] hover:bg-[#121c15] text-[#e5fbf0] hover:text-[#22c55e]'
                : 'border-[#d1e5d7] hover:bg-[#f4faf6] text-[#13261a] hover:text-[#ea580c]'
            }`}
          >
            Replace
          </button>
          <button
            onClick={handleReplaceAll}
            disabled={!searchTerm}
            className={`text-xs font-bold uppercase tracking-wider py-1.5 px-2 rounded-none transition-colors disabled:opacity-40 ${
              isDark
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold'
                : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
            }`}
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
};
