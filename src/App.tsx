/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';

import { DocumentItem, DocumentFormat, EditorTheme, LayoutMode, TemplateItem } from './types';
import { loadDocuments, saveDocuments, getActiveDocumentId, setActiveDocumentId } from './utils/storage';
import { calculateDocumentStats, htmlToMarkdown, downloadFile } from './utils/editorUtils';
import { TEMPLATES } from './data/templates';

import { Navbar } from './components/Navbar';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { OutlineView } from './components/OutlineView';
import { BubbleMenuComponent } from './components/BubbleMenuComponent';
import { TableControls } from './components/TableControls';
import { SlashCommandMenu } from './components/SlashCommandMenu';
import { DocumentStatsModal } from './components/DocumentStatsModal';
import { FindReplaceModal } from './components/FindReplaceModal';
import { ExportModal } from './components/ExportModal';
import { SpecialCharModal } from './components/SpecialCharModal';
import { TemplatesModal } from './components/TemplatesModal';
import { StartupPage } from './components/StartupPage';
import { SongwritingMetronomeBar } from './components/SongwritingMetronomeBar';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { LinkModal } from './components/LinkModal';
import { ImageModal } from './components/ImageModal';
import { Minimize2, Copy, Check } from 'lucide-react';

export default function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => loadDocuments());
  const [activeDocId, setActiveDocIdState] = useState<string>(() => {
    const savedId = getActiveDocumentId();
    const found = documents.find((d) => d.id === savedId);
    return found ? found.id : (documents[0]?.id || 'doc-1');
  });

  const [theme, setTheme] = useState<EditorTheme>('light');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('page');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Modals state
  const [isStartupOpen, setIsStartupOpen] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isSpecialCharOpen, setIsSpecialCharOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);
  const [isMetronomeOpen, setIsMetronomeOpen] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);


  const activeDoc = useMemo(() => {
    return documents.find((d) => d.id === activeDocId) || documents[0];
  }, [documents, activeDocId]);

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // TipTap Editor instance
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'cursor-pointer',
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-none sm:rounded-xs max-w-full my-4 border border-[#e5e0d8] dark:border-[#2e2c29]',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Type "/" for formatting blocks or begin composition...',
      }),
      Subscript,
      Superscript,
      Typography,
      CharacterCount,
    ],
    content: activeDoc ? activeDoc.content : '',
    onUpdate: ({ editor }) => {
      setIsSaving(true);
      const newHtml = editor.getHTML();
      const text = editor.getText();
      const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        setDocuments((prevDocs) => {
          const updated = prevDocs.map((doc) => {
            if (doc.id === activeDocId) {
              return {
                ...doc,
                content: newHtml,
                updatedAt: Date.now(),
                wordCount,
              };
            }
            return doc;
          });
          saveDocuments(updated);
          return updated;
        });
        setIsSaving(false);
      }, 500);

      // Check if user typed '/'
      const selection = editor.state.selection;
      const pos = selection.$from.pos;
      if (pos > 0) {
        const lastChar = editor.state.doc.textBetween(Math.max(0, pos - 1), pos);
        if (lastChar === '/') {
          setIsSlashMenuOpen(true);
        }
      }
    },
  });

  // Switch document content when active document changes
  useEffect(() => {
    if (editor && activeDoc && editor.getHTML() !== activeDoc.content) {
      editor.commands.setContent(activeDoc.content, { emitUpdate: false });
    }
  }, [activeDocId]);

  // Keyboard shortcut listener (Ctrl+F, Ctrl+P, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (isCmdOrCtrl && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFindReplaceOpen((prev) => !prev);
      }
      if (isCmdOrCtrl && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handlePrint();
      }
      if (isCmdOrCtrl && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsLinkModalOpen(true);
      }
      if (e.key === '?' && !isCmdOrCtrl && !editor?.isFocused) {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editor]);

  // Auto-open Metronome for songwriting format documents
  useEffect(() => {
    if (activeDoc?.format === 'songwriting') {
      setIsMetronomeOpen(true);
    }
  }, [activeDocId, activeDoc?.format]);

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateTitle = (title: string) => {
    setDocuments((prev) => {
      const updated = prev.map((d) => (d.id === activeDocId ? { ...d, title, updatedAt: Date.now() } : d));
      saveDocuments(updated);
      return updated;
    });
  };

  const handleSelectDoc = (id: string) => {
    setActiveDocIdState(id);
    setActiveDocumentId(id);
  };

  const handleCreateDoc = () => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: 'Untitled Manuscript',
      content: '<h1>Untitled Manuscript</h1><p>Start composition or type <mark class="highlight-yellow"><strong>/</strong></mark> for block commands...</p>',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
      tags: ['Draft'],
      wordCount: 2,
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    saveDocuments(updated);
    handleSelectDoc(newDoc.id);
  };

  const handleDeleteDoc = (id: string) => {
    if (documents.length <= 1) return;
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    saveDocuments(updated);
    if (activeDocId === id) {
      handleSelectDoc(updated[0].id);
    }
  };

  const handleDuplicateDoc = (id: string) => {
    const target = documents.find((d) => d.id === id);
    if (!target) return;
    const duplicated: DocumentItem = {
      ...target,
      id: `doc-${Date.now()}`,
      title: `${target.title} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
    };
    const updated = [duplicated, ...documents];
    setDocuments(updated);
    saveDocuments(updated);
    handleSelectDoc(duplicated.id);
  };

  const handleApplyTemplate = (template: TemplateItem, createNew: boolean) => {
    if (createNew) {
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: template.title,
        content: template.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isPinned: false,
        tags: [template.category],
      };
      const updated = [newDoc, ...documents];
      setDocuments(updated);
      saveDocuments(updated);
      handleSelectDoc(newDoc.id);
    } else {
      if (editor) {
        editor.commands.setContent(template.content);
        handleUpdateTitle(template.title);
      }
    }
  };

  const handleSelectFormat = (format: DocumentFormat, templateId?: string) => {
    let title = 'Untitled Manuscript';
    let content = '<p>Begin writing here...</p>';
    let tags: string[] = ['prose'];

    if (templateId) {
      const template = TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        title = template.title;
        content = template.content;
        tags = [template.category, format];
      }
    } else {
      switch (format) {
        case 'screenwriting':
          title = 'Untitled Screenplay';
          content = TEMPLATES.find(t => t.id === 'screenplay-standard')?.content || `
            <div class="screenplay-container">
              <h1 class="screenplay-title">UNTITLED SCREENPLAY</h1>
              <p class="screenplay-author">Written by [Author Name]</p>
              <p class="screenplay-slugline"><strong>EXT. CITY SKYLINE - DUSK</strong></p>
              <p class="screenplay-action">The amber glow of sunset reflects against towering skyscrapers.</p>
              <p class="screenplay-character"><strong>PROTAGONIST</strong></p>
              <p class="screenplay-parenthetical"><em>(whispering)</em></p>
              <p class="screenplay-dialogue">Every story has a beginning. This is where ours takes root.</p>
            </div>
          `;
          tags = ['screenwriting', 'script'];
          break;
        case 'play':
          title = 'Untitled Stage Play';
          content = TEMPLATES.find(t => t.id === 'stage-play')?.content || `
            <div class="play-container">
              <h1 class="play-title">UNTITLED PLAY</h1>
              <p class="play-author">By [Playwright Name]</p>
              <h2 class="play-act-scene">ACT I, SCENE 1</h2>
              <p class="play-stage-direction"><em>[AT RISE: The stage is dimly lit by a single lantern hanging above a rustic table.]</em></p>
              <p class="play-speech"><span class="play-speaker">HERO:</span> (Stepping into the light) Time waits for no man, yet here we linger.</p>
            </div>
          `;
          tags = ['plays', 'theatre'];
          break;
        case 'songwriting':
          title = 'Untitled Song';
          content = TEMPLATES.find(t => t.id === 'songwriting-chord-chart')?.content || `
            <div class="songwriting-container">
              <h1 class="song-title">UNTITLED SONG</h1>
              <p class="song-meta">Key: G Major | Tempo: 120 BPM | 4/4 Time</p>
              <div class="song-section-header"><span class="song-badge">VERSE 1</span></div>
              <p class="song-chord-line"><code>[G]                [D]                [Em]         [C]</code></p>
              <p class="song-lyric-line">Walking down the midnight avenue, leaves beneath my feet.</p>
              <div class="song-section-header"><span class="song-badge song-badge-chorus">CHORUS</span></div>
              <p class="song-chord-line"><code>[C]                [G]                [D]          [Em]</code></p>
              <p class="song-lyric-line">Sing into the open sky, let the melody take flight.</p>
            </div>
          `;
          tags = ['songwriting', 'lyrics', 'chords'];
          setIsMetronomeOpen(true);
          break;
        case 'poetry':
          title = 'Untitled Poem';
          content = TEMPLATES.find(t => t.id === 'poetry-manuscript')?.content || `
            <div class="poetry-container">
              <h1 class="poetry-title">SONNET OF THE QUIET HOURS</h1>
              <p class="poetry-dedication"><em>To the quiet keepers of midnight reflections</em></p>
              <div class="poetry-stanza">
                <p>When shadows lengthen on the quiet floor,<br>
                And distant murmurs fade into the night,<br>
                The world retreats behind the bolted door,<br>
                And solitary stars begin their light.</p>
              </div>
            </div>
          `;
          tags = ['poetry', 'verse'];
          break;
        default:
          title = 'Untitled Manuscript';
          content = '<p>Begin writing your story here...</p>';
          tags = ['prose'];
          break;
      }
    }

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
      tags,
      format,
    };

    const updated = [newDoc, ...documents];
    setDocuments(updated);
    saveDocuments(updated);
    handleSelectDoc(newDoc.id);
    setIsStartupOpen(false);
  };


  const stats = useMemo(() => {
    if (!editor) {
      return calculateDocumentStats('', '');
    }
    return calculateDocumentStats(editor.getText(), editor.getHTML());
  }, [editor?.state?.doc]);

  const isDark = theme === 'dark' || theme === 'nord';
  const isZen = layoutMode === 'zen';
  const isSplitMarkdown = layoutMode === 'split-markdown';

  return (
    <div
      id="rich-text-editor-app"
      className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
        isDark
          ? 'bg-[#050805] text-[#e5fbf0]'
          : 'bg-[#edf6f0] text-[#13261a]'
      }`}
    >
      {/* Top Navbar */}
      {!isZen && (
        <Navbar
          currentDoc={activeDoc}
          onUpdateTitle={handleUpdateTitle}
          stats={stats}
          theme={theme}
          onThemeChange={setTheme}
          layoutMode={layoutMode}
          onLayoutModeChange={setLayoutMode}
          onUndo={() => editor?.chain().focus().undo().run()}
          onRedo={() => editor?.chain().focus().redo().run()}
          canUndo={editor ? editor.can().undo() : false}
          canRedo={editor ? editor.can().redo() : false}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenFindReplace={() => setIsFindReplaceOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenTemplates={() => setIsTemplatesOpen(true)}
          onOpenStartupHub={() => setIsStartupOpen(true)}
          onToggleMetronome={() => setIsMetronomeOpen(!isMetronomeOpen)}
          isMetronomeOpen={isMetronomeOpen}
          onNewDoc={handleCreateDoc}
          onPrint={handlePrint}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isOutlineOpen={isOutlineOpen}
          onToggleOutline={() => setIsOutlineOpen(!isOutlineOpen)}
          isSaving={isSaving}
        />
      )}

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        {!isZen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            documents={documents}
            currentDocId={activeDocId}
            onSelectDoc={handleSelectDoc}
            onCreateDoc={handleCreateDoc}
            onDeleteDoc={handleDeleteDoc}
            onDuplicateDoc={handleDuplicateDoc}
            theme={theme}
            onOpenStartupHub={() => setIsStartupOpen(true)}
          />
        )}


        {/* Central Editor Viewport */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Formatting Ribbon */}
          {!isZen && (
            <Toolbar
              editor={editor}
              theme={theme}
              onOpenLinkModal={() => setIsLinkModalOpen(true)}
              onOpenImageModal={() => setIsImageModalOpen(true)}
              onOpenSpecialCharModal={() => setIsSpecialCharOpen(true)}
              onToggleMetronome={() => setIsMetronomeOpen(!isMetronomeOpen)}
              isMetronomeOpen={isMetronomeOpen}
            />
          )}

          {/* Songwriting Metronome Audio Bar */}
          <SongwritingMetronomeBar
            editor={editor}
            theme={theme}
            isOpen={isMetronomeOpen}
            onClose={() => setIsMetronomeOpen(false)}
          />

          {/* Zen Mode Exit Button */}
          {isZen && (
            <div className="fixed top-4 right-4 z-50 animate-in fade-in">
              <button
                onClick={() => setLayoutMode('page')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-none sm:rounded-xs text-xs uppercase tracking-widest font-bold backdrop-blur-md shadow-xl transition-all border ${
                  isDark
                    ? 'bg-[#0a0f0c] text-[#22c55e] border-[#22c55e] hover:bg-[#101a13]'
                    : 'bg-[#13261a] text-white hover:bg-[#1e3b28] border-[#ea580c]'
                }`}
              >
                <Minimize2 className="w-3.5 h-3.5" /> Exit Zen Mode
              </button>
            </div>
          )}

          {/* Editor Canvas Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
            {/* Split View Container */}
            <div className={`w-full flex gap-6 ${isSplitMarkdown ? 'max-w-7xl' : ''} justify-center`}>
              
              {/* Document Sheet */}
              <div
                className={`editor-page-sheet w-full transition-all duration-200 ${
                  layoutMode === 'page'
                    ? 'max-w-[850px] min-h-[1100px] p-8 sm:p-14 lg:p-16 rounded-none sm:rounded-xs border editor-page-shadow my-2'
                    : isSplitMarkdown
                    ? 'flex-1 min-h-[900px] p-6 sm:p-10 rounded-none sm:rounded-xs border editor-page-shadow my-2'
                    : 'max-w-4xl min-h-screen p-6 sm:p-12'
                } ${
                  isDark
                    ? 'theme-dark bg-[#0a0f0c] border-[#1a3022] text-[#e5fbf0]'
                    : 'theme-light bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
                }`}
              >
                {/* Floating Table Controls */}
                <TableControls editor={editor} theme={theme} />

                {/* Floating Bubble Toolbar on Selection */}
                <BubbleMenuComponent
                  editor={editor}
                  theme={theme}
                  onOpenLinkModal={() => setIsLinkModalOpen(true)}
                />

                {/* TipTap Editor Surface */}
                <EditorContent
                  id="rich-text-prosemirror-editor"
                  editor={editor}
                  className="outline-none min-h-[700px] cursor-text"
                />
              </div>

              {/* Split Markdown Live Viewer */}
              {isSplitMarkdown && (
                <div
                  className={`flex-1 rounded-none sm:rounded-xs border p-5 flex flex-col my-2 max-h-[1100px] overflow-hidden ${
                    isDark
                      ? 'bg-[#0a0f0c] border-[#1a3022] text-[#e5fbf0]'
                      : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
                  }`}
                >
                  <div className={`flex items-center justify-between pb-3 border-b mb-3 ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#4ade80]' : 'text-[#ea580c]'}`}>
                      MARKDOWN RENDER STREAM
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(htmlToMarkdown(editor?.getHTML() || ''));
                        setCopiedMarkdown(true);
                        setTimeout(() => setCopiedMarkdown(false), 2000);
                      }}
                      className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                        isDark 
                          ? 'text-[#e5fbf0] hover:text-[#22c55e]' 
                          : 'text-[#13261a] hover:text-[#ea580c]'
                      }`}
                    >
                      {copiedMarkdown ? <Check className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMarkdown ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className={`flex-1 overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed ${isDark ? 'text-[#e5fbf0]' : 'text-[#13261a]'}`}>
                    {htmlToMarkdown(editor?.getHTML() || '')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Outline Drawer */}
        {!isZen && (
          <OutlineView
            editor={editor}
            isOpen={isOutlineOpen}
            onClose={() => setIsOutlineOpen(false)}
            stats={stats}
            theme={theme}
          />
        )}
      </div>

      {/* Floating Slash Command Menu */}
      <SlashCommandMenu
        editor={editor}
        isOpen={isSlashMenuOpen}
        onClose={() => setIsSlashMenuOpen(false)}
        theme={theme}
      />

      {/* Find and Replace Modal */}
      <FindReplaceModal
        editor={editor}
        isOpen={isFindReplaceOpen}
        onClose={() => setIsFindReplaceOpen(false)}
        theme={theme}
      />

      {/* Document Stats & Analytics Modal */}
      <DocumentStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        theme={theme}
      />

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        document={activeDoc}
        theme={theme}
        onPrint={handlePrint}
      />

      {/* Startup Format Launcher Hub */}
      <StartupPage
        isOpen={isStartupOpen}
        onClose={() => setIsStartupOpen(false)}
        onSelectFormat={handleSelectFormat}
        onSelectDocument={(id) => {
          handleSelectDoc(id);
          setIsStartupOpen(false);
        }}
        recentDocuments={documents}
        theme={theme}
      />

      {/* Templates Modal */}
      <TemplatesModal

        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onApplyTemplate={handleApplyTemplate}
        theme={theme}
      />

      {/* Special Character / Symbols Modal */}
      <SpecialCharModal
        editor={editor}
        isOpen={isSpecialCharOpen}
        onClose={() => setIsSpecialCharOpen(false)}
        theme={theme}
      />

      {/* Keyboard Shortcuts Reference */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        theme={theme}
      />

      {/* Link Modal */}
      <LinkModal
        editor={editor}
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        theme={theme}
      />

      {/* Image Modal */}
      <ImageModal
        editor={editor}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        theme={theme}
      />
    </div>
  );
}
