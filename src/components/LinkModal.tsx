import React, { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { X, Link as LinkIcon, Trash2 } from 'lucide-react';
import { EditorTheme } from '../types';

interface LinkModalProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
}

export const LinkModal: React.FC<LinkModalProps> = ({
  editor,
  isOpen,
  onClose,
  theme
}) => {
  const [url, setUrl] = useState('');
  const isDark = theme === 'dark' || theme === 'nord';

  useEffect(() => {
    if (editor && isOpen) {
      const prevUrl = editor.getAttributes('link').href || '';
      setUrl(prevUrl);
    }
  }, [editor, isOpen]);

  if (!isOpen || !editor) return null;

  const handleSave = () => {
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      let validUrl = url.trim();
      if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://') && !validUrl.startsWith('mailto:')) {
        validUrl = `https://${validUrl}`;
      }
      editor.chain().focus().extendMarkRange('link').setLink({ href: validUrl, target: '_blank' }).run();
    }
    onClose();
  };

  const handleRemove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-sm rounded-none sm:rounded-xs shadow-2xl border overflow-hidden ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
      >
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              HYPERLINK
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] mb-1.5">
              DESTINATION URL
            </label>
            <input
              id="link-url-input"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') onClose();
              }}
              autoFocus
              className={`w-full text-xs px-3 py-2 rounded-none border outline-none font-sans ${
                isDark
                  ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
                  : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] focus:border-[#ea580c]'
              }`}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {editor.isActive('link') ? (
              <button
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs text-rose-500 hover:underline font-serif"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Link
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-widest transition-colors ${
                  isDark
                    ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black'
                    : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
                }`}
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
