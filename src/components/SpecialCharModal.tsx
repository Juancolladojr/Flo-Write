import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { X, Smile } from 'lucide-react';
import { EditorTheme } from '../types';

interface SpecialCharModalProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
}

const CHAR_CATEGORIES: { name: string; symbols: string[] }[] = [
  {
    name: 'Arrows',
    symbols: ['←', '→', '↑', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '⇒', '⇐', '⇑', '⇓', '⇔', '➔', '➜', '➤', '↳', '↵']
  },
  {
    name: 'Typography',
    symbols: ['—', '–', '…', '•', '·', '°', '©', '®', '™', '§', '¶', '†', '‡', '«', '»', '“', '”', '‘', '’', '‹', '›', '№']
  },
  {
    name: 'Currency',
    symbols: ['$', '€', '£', '¥', '₹', '₽', '₩', '₿', '¢', '¤', '₫', '₱', '฿', '₸', '₺', '₴']
  },
  {
    name: 'Math & Logic',
    symbols: ['±', '×', '÷', '≠', '≈', '≤', '≥', '√', '∞', '∑', '∏', 'π', '∆', '∫', '∂', '∈', '∉', '⊂', '⊆', '∪', '∩', '¬', '∧', '∨', '∀', '∃']
  },
  {
    name: 'Fractions & Accents',
    symbols: ['½', '⅓', '⅔', '¼', '¾', '⅛', '⅜', '⅝', '⅞', 'é', 'è', 'ê', 'ë', 'á', 'à', 'ä', 'ñ', 'ü', 'ö', 'ß', 'ç', 'ø', 'å', 'æ']
  },
  {
    name: 'Greek Letters',
    symbols: ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Ω', 'Δ', 'Σ', 'Φ']
  }
];

export const SpecialCharModal: React.FC<SpecialCharModalProps> = ({
  editor,
  isOpen,
  onClose,
  theme
}) => {
  const [activeTab, setActiveTab] = useState('Typography');
  const isDark = theme === 'dark' || theme === 'nord';

  if (!isOpen || !editor) return null;

  const currentCategory = CHAR_CATEGORIES.find((c) => c.name === activeTab) || CHAR_CATEGORIES[0];

  const handleInsert = (char: string) => {
    editor.chain().focus().insertContent(char).run();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md rounded-none sm:rounded-xs shadow-2xl border overflow-hidden ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              SPECIAL CHARACTERS & SYMBOLS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className={`px-4 py-2 border-b flex items-center gap-1.5 overflow-x-auto ${isDark ? 'border-[#1a3022] bg-[#080d0a]' : 'border-[#d1e5d7] bg-[#f4faf6]'}`}>
          {CHAR_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-none border whitespace-nowrap transition-colors ${
                activeTab === cat.name
                  ? isDark
                    ? 'bg-[#22c55e] text-black border-[#22c55e]'
                    : 'bg-[#ea580c] text-white border-[#ea580c]'
                  : isDark ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]' : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#e8f4ec]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid of symbols */}
        <div className="p-4 grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
          {currentCategory.symbols.map((symbol, idx) => (
            <button
              key={idx}
              onClick={() => handleInsert(symbol)}
              className={`h-10 text-base font-serif rounded-none border flex items-center justify-center transition-all hover:scale-105 ${
                isDark
                  ? 'bg-[#080d0a] border-[#1a3022] hover:border-[#22c55e] text-[#e5fbf0]'
                  : 'bg-[#f4faf6] border-[#d1e5d7] hover:border-[#ea580c] text-[#13261a]'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={`p-3 border-t flex justify-between items-center text-xs text-[#5e7a68] dark:text-[#6f9c7d] ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <span>Click to insert symbol</span>
          <button
            onClick={onClose}
            className={`px-3 py-1 rounded-none font-bold uppercase tracking-wider text-xs transition-colors ${
              isDark
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black'
                : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
