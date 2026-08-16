import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { EditorTheme } from '../types';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  const shortcutGroups = [
    {
      title: 'Text Formatting',
      shortcuts: [
        { label: 'Bold', keys: ['Ctrl / ⌘', 'B'] },
        { label: 'Italic', keys: ['Ctrl / ⌘', 'I'] },
        { label: 'Underline', keys: ['Ctrl / ⌘', 'U'] },
        { label: 'Strikethrough', keys: ['Ctrl / ⌘', 'Shift', 'X'] },
        { label: 'Inline Code', keys: ['Ctrl / ⌘', 'E'] },
        { label: 'Highlight Text', keys: ['Ctrl / ⌘', 'Shift', 'H'] },
        { label: 'Clear Formatting', keys: ['Ctrl / ⌘', '\\'] }
      ]
    },
    {
      title: 'Headings & Sections',
      shortcuts: [
        { label: 'Heading 1', keys: ['Ctrl / ⌘', 'Alt', '1'] },
        { label: 'Heading 2', keys: ['Ctrl / ⌘', 'Alt', '2'] },
        { label: 'Heading 3', keys: ['Ctrl / ⌘', 'Alt', '3'] },
        { label: 'Bullet List', keys: ['Ctrl / ⌘', 'Shift', '8'] },
        { label: 'Numbered List', keys: ['Ctrl / ⌘', 'Shift', '7'] },
        { label: 'Editorial Checklist', keys: ['Ctrl / ⌘', 'Shift', '9'] },
        { label: 'Pull Quote', keys: ['Ctrl / ⌘', 'Shift', 'B'] },
        { label: 'Code Block', keys: ['Ctrl / ⌘', 'Alt', 'C'] }
      ]
    },
    {
      title: 'Navigation & Commands',
      shortcuts: [
        { label: 'Slash Commands', keys: ['/'] },
        { label: 'Find & Replace', keys: ['Ctrl / ⌘', 'F'] },
        { label: 'Insert Hyperlink', keys: ['Ctrl / ⌘', 'K'] },
        { label: 'Undo', keys: ['Ctrl / ⌘', 'Z'] },
        { label: 'Redo', keys: ['Ctrl / ⌘', 'Y'] },
        { label: 'Print / Export PDF', keys: ['Ctrl / ⌘', 'P'] },
        { label: 'Indent Line', keys: ['Tab'] },
        { label: 'Outdent Line', keys: ['Shift', 'Tab'] }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl rounded-none sm:rounded-xs shadow-2xl border overflow-hidden ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              KEYBOARD SHORTCUTS REFERENCE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {shortcutGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ea580c] dark:text-[#22c55e]">
                {group.title}
              </h3>
              <div className="space-y-1">
                {shortcutGroups && group.shortcuts.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between p-2 rounded-none border text-xs ${
                      isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'
                    }`}
                  >
                    <span className="font-serif font-bold text-xs text-[#13261a] dark:text-[#e5fbf0]">
                      {s.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k, i) => (
                        <kbd
                          key={i}
                          className="px-1.5 py-0.5 rounded-none text-[10px] font-mono font-semibold bg-white dark:bg-[#0d1410] text-[#13261a] dark:text-[#22c55e] border border-[#d1e5d7] dark:border-[#1a3022]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`p-3.5 border-t flex justify-between items-center text-xs text-[#5e7a68] dark:text-[#6f9c7d] ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <span className="font-serif italic">Markdown shortcuts like #, *, 1. can also be typed inline.</span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors ${
              isDark
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black'
                : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
            }`}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
