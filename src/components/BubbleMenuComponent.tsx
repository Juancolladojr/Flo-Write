import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Highlighter,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Quote
} from 'lucide-react';
import { EditorTheme } from '../types';

interface BubbleMenuComponentProps {
  editor: Editor | null;
  onOpenLinkModal: () => void;
  theme: EditorTheme;
}

export const BubbleMenuComponent: React.FC<BubbleMenuComponentProps> = ({
  editor,
  onOpenLinkModal,
  theme
}) => {
  const [coords, setCoords] = useState<{ top: number; left: number; visible: boolean }>({
    top: 0,
    left: 0,
    visible: false
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updatePosition = () => {
      const { selection } = editor.state;
      const isTextSelected = !selection.empty && editor.isFocused;

      if (!isTextSelected) {
        setCoords((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }

      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setCoords((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width === 0 && rect.height === 0) {
        setCoords((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }

      // Position centered directly above the selection
      const top = Math.max(10, rect.top - 48 + window.scrollY);
      const left = Math.max(10, rect.left + rect.width / 2 + window.scrollX);

      setCoords({ top, left, visible: true });
    };

    editor.on('selectionUpdate', updatePosition);
    editor.on('blur', () => {
      // Small delay to allow clicking menu items before closing
      setTimeout(() => {
        if (!menuRef.current?.contains(document.activeElement)) {
          setCoords((prev) => ({ ...prev, visible: false }));
        }
      }, 150);
    });

    return () => {
      editor.off('selectionUpdate', updatePosition);
    };
  }, [editor]);

  if (!editor || !coords.visible) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  const btnClass = (active: boolean) =>
    `p-1.5 transition-all flex items-center justify-center cursor-pointer ${
      active
        ? isDark
          ? 'bg-[#22c55e] text-black font-bold shadow-[0_0_6px_rgba(34,197,94,0.5)]'
          : 'bg-[#ea580c] text-white font-bold'
        : isDark
        ? 'text-[#6f9c7d] hover:text-[#22c55e] hover:bg-[#121c15]'
        : 'text-[#5e7a68] hover:text-[#ea580c] hover:bg-[#f4faf6]'
    }`;

  return (
    <div
      ref={menuRef}
      id="editorial-floating-bubble-menu"
      style={{
        position: 'absolute',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 50
      }}
      className={`no-print flex items-center gap-0.5 px-1.5 py-1 rounded-none sm:rounded-xs shadow-2xl border backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 ${
        isDark
          ? 'bg-[#0d1410]/95 text-[#e5fbf0] border-[#1a3022]'
          : 'bg-[#ffffff]/95 text-[#13261a] border-[#d1e5d7]'
      }`}
      onMouseDown={(e) => e.preventDefault()} // Keep editor focus
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive('bold'))}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive('italic'))}
        title="Italic"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnClass(editor.isActive('underline'))}
        title="Underline"
      >
        <UnderlineIcon className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive('strike'))}
        title="Strikethrough"
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </button>

      <div className={`h-3.5 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editor.isActive('heading', { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive('heading', { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive('blockquote'))}
        title="Pull Quote"
      >
        <Quote className="w-3.5 h-3.5" />
      </button>

      <div className={`h-3.5 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
        className={btnClass(editor.isActive('highlight'))}
        title="Highlight"
      >
        <Highlighter className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={btnClass(editor.isActive('code'))}
        title="Inline Code"
      >
        <Code className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={onOpenLinkModal}
        className={btnClass(editor.isActive('link'))}
        title="Hyperlink"
      >
        <LinkIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
