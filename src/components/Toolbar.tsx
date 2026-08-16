import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Highlighter,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  CheckSquare,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  Minus,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  RemoveFormatting,
  Info,
  Calendar,
  Smile,
  Layers,
  Clapperboard,
  Drama,
  Music,
  Feather
} from 'lucide-react';
import { EditorTheme } from '../types';

interface ToolbarProps {
  editor: Editor | null;
  theme: EditorTheme;
  onOpenLinkModal: () => void;
  onOpenImageModal: () => void;
  onOpenSpecialCharModal: () => void;
  onToggleMetronome?: () => void;
  isMetronomeOpen?: boolean;
}


const TEXT_COLORS = [
  { name: 'Default', color: 'inherit' },
  { name: 'Editorial Ink', color: '#1a1a1a' },
  { name: 'Muted Taupe', color: '#8c8881' },
  { name: 'Crimson Red', color: '#b91c1c' },
  { name: 'Warm Terracotta', color: '#c2410c' },
  { name: 'Forest Moss', color: '#15803d' },
  { name: 'Deep Navy', color: '#1d4ed8' },
  { name: 'Plum Indigo', color: '#4338ca' },
  { name: 'Wine Plum', color: '#7e22ce' },
  { name: 'Soft Charcoal', color: '#4b5563' }
];

const HIGHLIGHT_COLORS = [
  { name: 'Parchment Yellow', color: '#fef08a' },
  { name: 'Sage Green', color: '#d1fae5' },
  { name: 'Sky Tint', color: '#e0f2fe' },
  { name: 'Peach Warm', color: '#ffedd5' },
  { name: 'Lilac Muted', color: '#f3e8ff' },
  { name: 'Rose Pale', color: '#fce7f3' }
];

const FONT_FAMILIES = [
  { name: 'Editorial Serif (Playfair)', value: 'Playfair Display', fontClass: 'font-serif-playfair' },
  { name: 'Classic Book (Merriweather)', value: 'Merriweather', fontClass: 'font-serif-merriweather' },
  { name: 'Modern Sans (Plus Jakarta)', value: 'Plus Jakarta Sans', fontClass: 'font-sans-default' },
  { name: 'Monospace (JetBrains)', value: 'JetBrains Mono', fontClass: 'font-mono-code' },
  { name: 'Display Geometric (Outfit)', value: 'Outfit', fontClass: 'font-display-outfit' },
  { name: 'Handwriting Script (Caveat)', value: 'Caveat', fontClass: 'font-handwriting' }
];

export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  theme,
  onOpenLinkModal,
  onOpenImageModal,
  onOpenSpecialCharModal,
  onToggleMetronome,
  isMetronomeOpen
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showCalloutPicker, setShowCalloutPicker] = useState(false);
  const [showFormatPicker, setShowFormatPicker] = useState(false);
  const [tableGrid, setTableGrid] = useState({ rows: 3, cols: 3 });

  const colorRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (highlightRef.current && !highlightRef.current.contains(event.target as Node)) {
        setShowHighlightPicker(false);
      }
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setShowTablePicker(false);
      }
      if (calloutRef.current && !calloutRef.current.contains(event.target as Node)) {
        setShowCalloutPicker(false);
      }
      if (formatRef.current && !formatRef.current.contains(event.target as Node)) {
        setShowFormatPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  if (!editor) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  const insertTable = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    setShowTablePicker(false);
  };

  const insertCallout = (type: 'info' | 'success' | 'warning' | 'tip') => {
    const titles = {
      info: 'Editorial Note',
      success: 'Key Takeaway',
      warning: 'Attention',
      tip: 'Writer\'s Insight'
    };
    const html = `<div class="callout callout-${type}"><p><strong>${titles[type]}:</strong> Write your text here...</p></div><p></p>`;
    editor.chain().focus().insertContent(html).run();
    setShowCalloutPicker(false);
  };

  const insertDate = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    editor.chain().focus().insertContent(`<strong>${dateStr}</strong> `).run();
  };

  const handleBlockChange = (val: string) => {
    if (val === 'p') editor.chain().focus().setParagraph().run();
    else if (val === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run();
    else if (val === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
    else if (val === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
    else if (val === 'h4') editor.chain().focus().toggleHeading({ level: 4 }).run();
    else if (val === 'quote') editor.chain().focus().toggleBlockquote().run();
    else if (val === 'code') editor.chain().focus().toggleCodeBlock().run();
  };

  const btnClass = (active: boolean) =>
    `p-1.5 rounded-none sm:rounded-xs transition-all flex items-center justify-center border ${
      active
        ? isDark
          ? 'bg-[#22c55e] text-[#000000] border-[#22c55e] font-bold shadow-[0_0_8px_rgba(34,197,94,0.4)]'
          : 'bg-[#ea580c] text-white border-[#ea580c] font-bold'
        : isDark
        ? 'border-transparent text-[#6f9c7d] hover:bg-[#0f1712] hover:text-[#22c55e] hover:border-[#1a3022]'
        : 'border-transparent text-[#5e7a68] hover:bg-[#f4faf6] hover:text-[#ea580c] hover:border-[#d1e5d7]'
    }`;

  return (
    <div
      id="rich-editor-toolbar"
      className={`no-print border-b select-none sticky top-0 z-20 transition-colors duration-200 overflow-x-auto ${
        isDark
          ? 'bg-[#0a0f0c]/95 border-[#1a3022] backdrop-blur-md'
          : 'bg-[#ffffff]/95 border-[#d1e5d7] backdrop-blur-md'
      } px-4 py-2`}
    >
      <div className="flex items-center gap-1.5 flex-wrap min-w-max">
        {/* Block Type Dropdown */}
        <select
          id="block-type-select"
          value={
            editor.isActive('heading', { level: 1 })
              ? 'h1'
              : editor.isActive('heading', { level: 2 })
              ? 'h2'
              : editor.isActive('heading', { level: 3 })
              ? 'h3'
              : editor.isActive('heading', { level: 4 })
              ? 'h4'
              : editor.isActive('blockquote')
              ? 'quote'
              : editor.isActive('codeBlock')
              ? 'code'
              : 'p'
          }
          onChange={(e) => handleBlockChange(e.target.value)}
          className={`text-xs font-serif font-bold px-2.5 py-1.5 rounded-none sm:rounded-xs border outline-none cursor-pointer transition-colors ${
            isDark
              ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
              : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] hover:bg-[#e8f4ec] focus:border-[#ea580c]'
          }`}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Headline 1</option>
          <option value="h2">Headline 2</option>
          <option value="h3">Subhead 3</option>
          <option value="h4">Section Label 4</option>
          <option value="quote">Pull Quote</option>
          <option value="code">Code Block</option>
        </select>

        {/* Font Family Dropdown */}
        <select
          id="font-family-select"
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setFontFamily(e.target.value).run();
            } else {
              editor.chain().focus().unsetFontFamily().run();
            }
          }}
          className={`text-xs font-serif font-medium px-2.5 py-1.5 rounded-none sm:rounded-xs border outline-none cursor-pointer transition-colors ${
            isDark
              ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0] focus:border-[#22c55e]'
              : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a] hover:bg-[#e8f4ec] focus:border-[#ea580c]'
          }`}
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>

        <div className={`h-4 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

        {/* Inline Formatting */}
        <button
          id="btn-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive('bold'))}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive('italic'))}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive('underline'))}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive('strike'))}
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={btnClass(editor.isActive('code'))}
          title="Inline Code"
        >
          <Code className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-subscript"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={btnClass(editor.isActive('subscript'))}
          title="Subscript"
        >
          <SubscriptIcon className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-superscript"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={btnClass(editor.isActive('superscript'))}
          title="Superscript"
        >
          <SuperscriptIcon className="w-3.5 h-3.5" />
        </button>

        <div className={`h-4 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

        {/* Text Color Picker */}
        <div className="relative" ref={colorRef}>
          <button
            id="btn-color-picker"
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowHighlightPicker(false);
              setShowTablePicker(false);
              setShowCalloutPicker(false);
            }}
            className={btnClass(showColorPicker)}
            title="Text Ink Color"
          >
            <Palette className="w-3.5 h-3.5" />
          </button>

          {showColorPicker && (
            <div
              className={`absolute left-0 mt-2 p-2.5 rounded-none sm:rounded-xs shadow-xl border z-50 w-48 animate-in fade-in zoom-in-95 ${
                isDark ? 'bg-[#0d1410] border-[#1a3022]' : 'bg-[#ffffff] border-[#d1e5d7]'
              }`}
            >
              <div className={`text-[9px] font-bold mb-2 uppercase tracking-[0.2em] ${isDark ? 'text-[#4ade80]' : 'text-[#ea580c]'}`}>
                INK PALETTE
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => {
                      if (c.color === 'inherit') {
                        editor.chain().focus().unsetColor().run();
                      } else {
                        editor.chain().focus().setColor(c.color).run();
                      }
                      setShowColorPicker(false);
                    }}
                    className={`w-6 h-6 rounded-none border flex items-center justify-center hover:scale-110 transition-transform ${
                      isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'
                    }`}
                    style={{ backgroundColor: c.color === 'inherit' ? (isDark ? '#e5fbf0' : '#ffffff') : c.color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Highlight Color Picker */}
        <div className="relative" ref={highlightRef}>
          <button
            id="btn-highlight-picker"
            onClick={() => {
              setShowHighlightPicker(!showHighlightPicker);
              setShowColorPicker(false);
              setShowTablePicker(false);
              setShowCalloutPicker(false);
            }}
            className={btnClass(editor.isActive('highlight'))}
            title="Highlight Text"
          >
            <Highlighter className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />
          </button>

          {showHighlightPicker && (
            <div
              className={`absolute left-0 mt-2 p-2.5 rounded-none sm:rounded-xs shadow-xl border z-50 w-48 animate-in fade-in zoom-in-95 ${
                isDark ? 'bg-[#0d1410] border-[#1a3022]' : 'bg-[#ffffff] border-[#d1e5d7]'
              }`}
            >
              <div className={`text-[9px] font-bold mb-2 uppercase tracking-[0.2em] ${isDark ? 'text-[#4ade80]' : 'text-[#ea580c]'}`}>
                HIGHLIGHT SHADE
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {HIGHLIGHT_COLORS.map((h) => (
                  <button
                    key={h.name}
                    title={h.name}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color: h.color }).run();
                      setShowHighlightPicker(false);
                    }}
                    className="h-6 rounded-none border border-black/10 hover:scale-105 transition-transform"
                    style={{ backgroundColor: h.color }}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setShowHighlightPicker(false);
                }}
                className={`w-full mt-2 text-[10px] uppercase tracking-wider font-bold py-1 rounded-none transition-colors ${
                  isDark ? 'bg-[#121c15] text-[#6f9c7d] hover:text-[#22c55e]' : 'bg-[#f4faf6] text-[#5e7a68] hover:text-[#ea580c]'
                }`}
              >
                Clear Shade
              </button>
            </div>
          )}
        </div>

        <div className={`h-4 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

        {/* Alignment */}
        <button
          id="btn-align-left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={btnClass(editor.isActive({ textAlign: 'left' }))}
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          id="btn-align-center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={btnClass(editor.isActive({ textAlign: 'center' }))}
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          id="btn-align-right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={btnClass(editor.isActive({ textAlign: 'right' }))}
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>
        <button
          id="btn-align-justify"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={btnClass(editor.isActive({ textAlign: 'justify' }))}
          title="Justify Text"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <div className={`h-4 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

        {/* Lists & Tasks */}
        <button
          id="btn-bullet-list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-ordered-list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive('orderedList'))}
          title="Numbered Sequence"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-task-list"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={btnClass(editor.isActive('taskList'))}
          title="Editorial Checklist"
        >
          <CheckSquare className="w-3.5 h-3.5" />
        </button>

        <div className={`h-4 w-px mx-0.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

        {/* Inserts: Link, Image, Table, Callout, Special Characters, Date, HR */}
        <button
          id="btn-insert-link"
          onClick={onOpenLinkModal}
          className={btnClass(editor.isActive('link'))}
          title="Insert Hyperlink"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-insert-image"
          onClick={onOpenImageModal}
          className={btnClass(false)}
          title="Insert Image / Figure"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>

        {/* Table Generator Dropdown */}
        <div className="relative" ref={tableRef}>
          <button
            id="btn-insert-table"
            onClick={() => {
              setShowTablePicker(!showTablePicker);
              setShowColorPicker(false);
              setShowHighlightPicker(false);
              setShowCalloutPicker(false);
            }}
            className={btnClass(editor.isActive('table'))}
            title="Insert Table Grid"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>

          {showTablePicker && (
            <div
              className={`absolute left-0 mt-2 p-3 rounded-none sm:rounded-xs shadow-xl border z-50 w-52 animate-in fade-in zoom-in-95 ${
                isDark ? 'bg-[#0d1410] border-[#1a3022]' : 'bg-[#ffffff] border-[#d1e5d7]'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center justify-between ${
                isDark ? 'text-[#4ade80]' : 'text-[#ea580c]'
              }`}>
                <span>INSERT TABLE</span>
                <span className="font-mono">{tableGrid.rows} &times; {tableGrid.cols}</span>
              </div>
              <div className="grid grid-cols-6 gap-1 mb-3">
                {Array.from({ length: 36 }).map((_, i) => {
                  const r = Math.floor(i / 6) + 1;
                  const c = (i % 6) + 1;
                  const isHovered = r <= tableGrid.rows && c <= tableGrid.cols;
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setTableGrid({ rows: r, cols: c })}
                      onClick={() => insertTable(r, c)}
                      className={`w-6 h-6 border cursor-pointer transition-colors ${
                        isHovered
                          ? isDark
                            ? 'bg-[#22c55e] border-[#22c55e]'
                            : 'bg-[#ea580c] border-[#ea580c]'
                          : isDark
                          ? 'bg-[#121c15] border-[#1a3022]'
                          : 'bg-[#f4faf6] border-[#d1e5d7]'
                      }`}
                    />
                  );
                })}
              </div>
              <button
                onClick={() => insertTable(3, 3)}
                className={`w-full text-xs font-bold uppercase tracking-wider py-1.5 rounded-none transition-colors ${
                  isDark
                    ? 'bg-[#22c55e] text-[#000000] font-black hover:bg-[#16a34a]'
                    : 'bg-[#ea580c] text-white hover:bg-[#c2410c]'
                }`}
              >
                Insert 3 &times; 3 Table
              </button>
            </div>
          )}
        </div>

        {/* Callout Box Selector */}
        <div className="relative" ref={calloutRef}>
          <button
            id="btn-insert-callout"
            onClick={() => {
              setShowCalloutPicker(!showCalloutPicker);
              setShowColorPicker(false);
              setShowHighlightPicker(false);
              setShowTablePicker(false);
            }}
            className={btnClass(false)}
            title="Insert Editorial Box"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {showCalloutPicker && (
            <div
              className={`absolute left-0 mt-2 p-1.5 rounded-none sm:rounded-xs shadow-xl border z-50 w-48 animate-in fade-in zoom-in-95 ${
                isDark ? 'bg-[#0d1410] border-[#1a3022]' : 'bg-[#ffffff] border-[#d1e5d7]'
              }`}
            >
              <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-[0.2em] border-b mb-1 ${
                isDark ? 'text-[#4ade80] border-[#1a3022]' : 'text-[#ea580c] border-[#d1e5d7]'
              }`}>
                EDITORIAL BOX
              </div>
              <button
                onClick={() => insertCallout('info')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                <span>&bull;</span> Note Box
              </button>
              <button
                onClick={() => insertCallout('success')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#4ade80]' : 'hover:bg-[#f4faf6] text-emerald-700'
                }`}
              >
                <span>&bull;</span> Key Takeaway
              </button>
              <button
                onClick={() => insertCallout('warning')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-amber-400' : 'hover:bg-[#f4faf6] text-amber-700'
                }`}
              >
                <span>&bull;</span> Attention Note
              </button>
              <button
                onClick={() => insertCallout('tip')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-orange-400' : 'hover:bg-[#f4faf6] text-[#ea580c]'
                }`}
              >
                <span>&bull;</span> Writer's Insight
              </button>
            </div>
          )}
        </div>

        {/* Format Specific Quick Elements */}
        <div className="relative" ref={formatRef}>
          <button
            id="btn-format-elements"
            onClick={() => {
              setShowFormatPicker(!showFormatPicker);
              setShowColorPicker(false);
              setShowHighlightPicker(false);
              setShowTablePicker(false);
              setShowCalloutPicker(false);
            }}
            className={btnClass(showFormatPicker)}
            title="Insert Script / Song / Play / Poetry Format Elements"
          >
            <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />
          </button>

          {showFormatPicker && (
            <div
              className={`absolute left-0 mt-2 p-1.5 rounded-none sm:rounded-xs shadow-xl border z-50 w-64 animate-in fade-in zoom-in-95 ${
                isDark ? 'bg-[#0d1410] border-[#1a3022]' : 'bg-[#ffffff] border-[#d1e5d7]'
              }`}
            >
              {/* Screenwriting */}
              <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-[0.2em] border-b mb-1 flex items-center justify-between ${
                isDark ? 'text-[#4ade80] border-[#1a3022]' : 'text-[#ea580c] border-[#d1e5d7]'
              }`}>
                <span>SCREENWRITING</span>
                <Clapperboard className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e]" />
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<p class="screenplay-slugline"><strong>INT. LOCATION - DAY</strong></p><p class="screenplay-action"></p>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Scene Heading (Slugline)
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<p class="screenplay-character"><strong>CHARACTER</strong></p><p class="screenplay-parenthetical"><em>(emotion)</em></p><p class="screenplay-dialogue">Dialogue line here...</p><p class="screenplay-action"></p>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Character & Dialogue Cue
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<p class="screenplay-transition"><strong>CUT TO:</strong></p>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Transition (CUT TO:)
              </button>

              {/* Stage Play */}
              <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-[0.2em] border-b mt-2 mb-1 flex items-center justify-between ${
                isDark ? 'text-[#4ade80] border-[#1a3022]' : 'text-[#ea580c] border-[#d1e5d7]'
              }`}>
                <span>STAGE PLAY</span>
                <Drama className="w-3 h-3 text-emerald-600 dark:text-[#4ade80]" />
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<h2 class="play-act-scene">ACT I</h2><h3 style="text-align: center; text-transform: uppercase; font-size: 0.95rem; color: #8c8881;">SCENE 1</h3>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Act & Scene Division
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<p class="play-stage-direction"><em>[Stage direction movement...]</em></p>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Stage Direction [Italic]
              </button>

              {/* Songwriting */}
              <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-[0.2em] border-b mt-2 mb-1 flex items-center justify-between ${
                isDark ? 'text-[#4ade80] border-[#1a3022]' : 'text-[#ea580c] border-[#d1e5d7]'
              }`}>
                <span>SONGWRITING</span>
                <Music className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e]" />
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<div class="song-section-header"><span class="song-badge">VERSE 1</span></div><p class="song-chord-line"><code>[G]                [D]                [Em]         [C]</code></p><p class="song-lyric-line">Lyric line here...</p>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Verse Section + Chords
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<div class="song-section-header"><span class="song-badge song-badge-chorus">CHORUS</span></div><p class="song-chord-line"><code>[G]                [D]                [C]</code></p><p class="song-lyric-line">Chorus hook lyric line...</p>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Chorus Section + Chords
              </button>
              {onToggleMetronome && (
                <button
                  onClick={() => {
                    onToggleMetronome();
                    setShowFormatPicker(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-xs font-semibold flex items-center justify-between rounded-none transition-colors ${
                    isDark ? 'hover:bg-[#121c15] text-[#22c55e]' : 'hover:bg-[#f4faf6] text-[#ea580c]'
                  }`}
                >
                  <span>&bull; Metronome (Audio Click)</span>
                  <Music className="w-3 h-3" />
                </button>
              )}

              {/* Poetry */}
              <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-[0.2em] border-b mt-2 mb-1 flex items-center justify-between ${
                isDark ? 'text-[#4ade80]' : 'text-[#ea580c]'
              } border-b ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
                <span>POETRY</span>
                <Feather className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e]" />
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().insertContent('<div class="poetry-stanza"><p>First verse line of stanza, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span><br>Second verse line echoing deep; <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>Third verse line with promises to keep, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>Closing verse line on the shore. <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span></p></div>').run();
                  setShowFormatPicker(false);
                }}
                className={`w-full text-left px-2 py-1 text-xs rounded-none transition-colors ${
                  isDark ? 'hover:bg-[#121c15] text-[#e5fbf0]' : 'hover:bg-[#f4faf6] text-[#13261a]'
                }`}
              >
                &bull; Stanza with Rhyme Markers
              </button>
            </div>
          )}
        </div>

        {/* Special Characters */}
        <button
          id="btn-special-char"
          onClick={onOpenSpecialCharModal}
          className={btnClass(false)}
          title="Insert Special Characters & Typographic Marks"
        >
          <Smile className="w-3.5 h-3.5" />
        </button>

        {/* Date Stamp */}
        <button
          id="btn-insert-date"
          onClick={insertDate}
          className={btnClass(false)}
          title="Insert Date Stamp"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>

        {/* Horizontal Rule */}
        <button
          id="btn-horizontal-rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={btnClass(false)}
          title="Divider Line"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        {/* Clear Formatting */}
        <button
          id="btn-clear-formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className={btnClass(false)}
          title="Clear Formatting"
        >
          <RemoveFormatting className={`w-3.5 h-3.5 ${isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'}`} />
        </button>
      </div>
    </div>
  );
};
