import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Printer, 
  FileCode, 
  FileText, 
  Check, 
  Sparkles
} from 'lucide-react';
import { DocumentItem, EditorTheme } from '../types';
import { htmlToMarkdown, downloadFile } from '../utils/editorUtils';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentItem;
  theme: EditorTheme;
  onPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  document,
  theme,
  onPrint
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'md' | 'html' | 'txt' | 'json'>('pdf');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isDark = theme === 'dark' || theme === 'nord';
  const mdContent = htmlToMarkdown(document.content);
  const plainText = document.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const safeFileName = (document.title || 'manuscript').toLowerCase().replace(/[^a-z0-9]/g, '-');

  const handleDownload = () => {
    switch (selectedFormat) {
      case 'pdf':
        onClose();
        setTimeout(() => onPrint(), 200);
        break;
      case 'md':
        downloadFile(mdContent, `${safeFileName}.md`, 'text/markdown;charset=utf-8');
        break;
      case 'html': {
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${document.title || 'Manuscript'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Merriweather', Georgia, serif; line-height: 1.8; max-width: 780px; margin: 60px auto; padding: 0 30px; color: #1a1a1a; background: #fcfaf7; }
    h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; color: #1a1a1a; }
    h1 { font-size: 2.2rem; border-left: 4px solid #1a1a1a; padding-left: 1rem; }
    table { width: 100%; border-collapse: collapse; margin: 2rem 0; border: 1px solid #e5e0d8; }
    th, td { border: 1px solid #e5e0d8; padding: 10px 14px; text-align: left; }
    th { background: #f9f7f4; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
    blockquote { border-top: 1px solid #e5e0d8; border-bottom: 1px solid #e5e0d8; padding: 1.25rem 1rem; margin: 2rem 0; font-family: 'Playfair Display', Georgia, serif; font-style: italic; text-align: center; font-size: 1.2rem; }
    pre { background: #181716; color: #ede8e1; padding: 16px; border-radius: 2px; overflow-x: auto; font-family: monospace; }
    code { font-family: monospace; background: #f1ede8; padding: 2px 6px; border-radius: 2px; }
  </style>
</head>
<body>
${document.content}
</body>
</html>`;
        downloadFile(fullHtml, `${safeFileName}.html`, 'text/html;charset=utf-8');
        break;
      }
      case 'txt':
        downloadFile(plainText, `${safeFileName}.txt`, 'text/plain;charset=utf-8');
        break;
      case 'json':
        downloadFile(JSON.stringify(document, null, 2), `${safeFileName}.json`, 'application/json');
        break;
    }

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleCopyContent = () => {
    let contentToCopy = '';
    if (selectedFormat === 'md') contentToCopy = mdContent;
    else if (selectedFormat === 'html') contentToCopy = document.content;
    else if (selectedFormat === 'txt') contentToCopy = plainText;
    else if (selectedFormat === 'json') contentToCopy = JSON.stringify(document, null, 2);

    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <Download className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              EXPORT & PUBLISH MANUSCRIPT
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
        <div className="p-5 space-y-4">
          {/* Format selector buttons */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => setSelectedFormat('pdf')}
              className={`p-3 rounded-none sm:rounded-xs border text-center transition-all ${
                selectedFormat === 'pdf'
                  ? isDark
                    ? 'border-[#22c55e] bg-[#22c55e] text-black font-bold'
                    : 'border-[#ea580c] bg-[#ea580c] text-white font-bold'
                  : isDark ? 'border-[#1a3022] hover:bg-[#121c15] text-[#6f9c7d]' : 'border-[#d1e5d7] hover:bg-[#f4faf6] text-[#5e7a68]'
              }`}
            >
              <Printer className="w-4 h-4 mx-auto mb-1.5" />
              <div className="text-xs font-serif font-bold">PDF / Print</div>
              <div className="text-[9px] uppercase tracking-widest opacity-70">Typeset</div>
            </button>

            <button
              onClick={() => setSelectedFormat('md')}
              className={`p-3 rounded-none sm:rounded-xs border text-center transition-all ${
                selectedFormat === 'md'
                  ? isDark
                    ? 'border-[#22c55e] bg-[#22c55e] text-black font-bold'
                    : 'border-[#ea580c] bg-[#ea580c] text-white font-bold'
                  : isDark ? 'border-[#1a3022] hover:bg-[#121c15] text-[#6f9c7d]' : 'border-[#d1e5d7] hover:bg-[#f4faf6] text-[#5e7a68]'
              }`}
            >
              <FileCode className="w-4 h-4 mx-auto mb-1.5" />
              <div className="text-xs font-serif font-bold">Markdown</div>
              <div className="text-[9px] uppercase tracking-widest opacity-70">.md file</div>
            </button>

            <button
              onClick={() => setSelectedFormat('html')}
              className={`p-3 rounded-none sm:rounded-xs border text-center transition-all ${
                selectedFormat === 'html'
                  ? isDark
                    ? 'border-[#22c55e] bg-[#22c55e] text-black font-bold'
                    : 'border-[#ea580c] bg-[#ea580c] text-white font-bold'
                  : isDark ? 'border-[#1a3022] hover:bg-[#121c15] text-[#6f9c7d]' : 'border-[#d1e5d7] hover:bg-[#f4faf6] text-[#5e7a68]'
              }`}
            >
              <FileCode className="w-4 h-4 mx-auto mb-1.5" />
              <div className="text-xs font-serif font-bold">HTML</div>
              <div className="text-[9px] uppercase tracking-widest opacity-70">Web Page</div>
            </button>

            <button
              onClick={() => setSelectedFormat('txt')}
              className={`p-3 rounded-none sm:rounded-xs border text-center transition-all ${
                selectedFormat === 'txt'
                  ? isDark
                    ? 'border-[#22c55e] bg-[#22c55e] text-black font-bold'
                    : 'border-[#ea580c] bg-[#ea580c] text-white font-bold'
                  : isDark ? 'border-[#1a3022] hover:bg-[#121c15] text-[#6f9c7d]' : 'border-[#d1e5d7] hover:bg-[#f4faf6] text-[#5e7a68]'
              }`}
            >
              <FileText className="w-4 h-4 mx-auto mb-1.5" />
              <div className="text-xs font-serif font-bold">Plain Text</div>
              <div className="text-[9px] uppercase tracking-widest opacity-70">Raw .txt</div>
            </button>

            <button
              onClick={() => setSelectedFormat('json')}
              className={`p-3 rounded-none sm:rounded-xs border text-center transition-all ${
                selectedFormat === 'json'
                  ? isDark
                    ? 'border-[#22c55e] bg-[#22c55e] text-black font-bold'
                    : 'border-[#ea580c] bg-[#ea580c] text-white font-bold'
                  : isDark ? 'border-[#1a3022] hover:bg-[#121c15] text-[#6f9c7d]' : 'border-[#d1e5d7] hover:bg-[#f4faf6] text-[#5e7a68]'
              }`}
            >
              <Sparkles className="w-4 h-4 mx-auto mb-1.5" />
              <div className="text-xs font-serif font-bold">JSON Data</div>
              <div className="text-[9px] uppercase tracking-widest opacity-70">Backup</div>
            </button>
          </div>

          {/* Format Preview Box */}
          <div className={`rounded-none sm:rounded-xs border p-3 ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
            <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
                {selectedFormat === 'pdf' ? 'PRINT / PDF PREVIEW' : `${selectedFormat.toUpperCase()} SOURCE PREVIEW`}
              </span>
              {selectedFormat !== 'pdf' && (
                <button
                  onClick={handleCopyContent}
                  className="flex items-center gap-1 text-xs text-[#13261a] dark:text-[#e5fbf0] hover:text-[#ea580c] dark:hover:text-[#22c55e] font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy snippet'}</span>
                </button>
              )}
            </div>

            <div className="max-h-52 overflow-y-auto text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#13261a] dark:text-[#e5fbf0]">
              {selectedFormat === 'pdf' && (
                <div className="font-serif text-xs text-[#5e7a68] dark:text-[#6f9c7d] py-4 text-center italic">
                  Opens browser high-resolution print dialogue with editorial margins, clean typography, and suppressed UI controls.
                </div>
              )}
              {selectedFormat === 'md' && mdContent}
              {selectedFormat === 'html' && document.content}
              {selectedFormat === 'txt' && plainText}
              {selectedFormat === 'json' && JSON.stringify(document, null, 2)}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="text-xs text-[#5e7a68] dark:text-[#6f9c7d] font-mono">
            File: <span className="text-[#13261a] dark:text-[#22c55e]">{safeFileName}.{selectedFormat === 'pdf' ? 'pdf' : selectedFormat}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-none sm:rounded-xs text-xs font-bold uppercase tracking-widest shadow-xs transition-colors ${
                isDark
                  ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black'
                  : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{selectedFormat === 'pdf' ? 'Print / Save PDF' : `Download .${selectedFormat}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
