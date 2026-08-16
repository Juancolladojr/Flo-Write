import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { X, Image as ImageIcon, Upload, Globe } from 'lucide-react';
import { EditorTheme } from '../types';

interface ImageModalProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  editor,
  isOpen,
  onClose,
  theme
}) => {
  const [tab, setTab] = useState<'url' | 'upload'>('url');
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const isDark = theme === 'dark' || theme === 'nord';

  if (!isOpen || !editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreview(dataUrl);
      setUrl(dataUrl);
      if (!altText) setAltText(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  const handleInsert = () => {
    if (!url.trim()) return;
    editor.chain().focus().setImage({ src: url.trim(), alt: altText.trim() }).run();
    setUrl('');
    setAltText('');
    setPreview(null);
    onClose();
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
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              INSERT IMAGE / FIGURE
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selector */}
        <div className={`px-4 py-2 border-b flex items-center gap-2 ${isDark ? 'border-[#1a3022] bg-[#080d0a]' : 'border-[#d1e5d7] bg-[#f4faf6]'}`}>
          <button
            onClick={() => setTab('url')}
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-none border transition-colors ${
              tab === 'url'
                ? isDark
                  ? 'bg-[#22c55e] text-black border-[#22c55e]'
                  : 'bg-[#ea580c] text-white border-[#ea580c]'
                : isDark ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]' : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#e8f4ec]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Web Link
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-none border transition-colors ${
              tab === 'upload'
                ? isDark
                  ? 'bg-[#22c55e] text-black border-[#22c55e]'
                  : 'bg-[#ea580c] text-white border-[#ea580c]'
                : isDark ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]' : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#e8f4ec]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
        </div>

        <div className="p-4 space-y-3">
          {tab === 'url' ? (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] mb-1.5">
                IMAGE URL
              </label>
              <input
                id="image-url-input"
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoFocus
                className={`w-full text-xs px-3 py-2 rounded-none border outline-none font-sans ${
                  isDark
                    ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
                    : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] focus:border-[#ea580c]'
                }`}
              />
            </div>
          ) : (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-none p-6 text-center cursor-pointer transition-colors ${
                  isDark ? 'border-[#1a3022] hover:border-[#22c55e] bg-[#080d0a]' : 'border-[#d1e5d7] hover:border-[#ea580c] bg-[#f4faf6]'
                }`}
              >
                <Upload className="w-6 h-6 mx-auto mb-2 text-[#5e7a68] dark:text-[#6f9c7d]" />
                <div className="text-xs font-serif font-bold text-[#13261a] dark:text-[#e5fbf0]">
                  Click to select image file from computer
                </div>
                <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] mt-1 uppercase tracking-wider">PNG, JPG, WebP, GIF</div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] mb-1.5">
              ALT TEXT / CAPTION (OPTIONAL)
            </label>
            <input
              id="image-alt-input"
              type="text"
              placeholder="Descriptive figure caption..."
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className={`w-full text-xs px-3 py-2 rounded-none border outline-none font-sans ${
                isDark
                  ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
                  : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] focus:border-[#ea580c]'
              }`}
            />
          </div>

          {/* Thumbnail preview */}
          {preview && (
            <div className={`mt-2 rounded-none overflow-hidden max-h-32 border ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!url}
              className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-widest disabled:opacity-40 transition-colors ${
                isDark
                  ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold'
                  : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
              }`}
            >
              Insert Figure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
