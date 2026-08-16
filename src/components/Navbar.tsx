import React from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Undo, 
  Redo, 
  HelpCircle, 
  BarChart2, 
  Columns, 
  Sun, 
  Moon, 
  Coffee, 
  Compass, 
  Check, 
  Layout, 
  Sparkles,
  Menu,
  Feather,
  Layers,
  Music
} from 'lucide-react';
import { DocumentItem, EditorTheme, LayoutMode, DocumentStats } from '../types';

interface NavbarProps {
  currentDoc: DocumentItem;
  onUpdateTitle: (title: string) => void;
  stats: DocumentStats;
  theme: EditorTheme;
  onThemeChange: (theme: EditorTheme) => void;
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenStats: () => void;
  onOpenFindReplace: () => void;
  onOpenExport: () => void;
  onOpenShortcuts: () => void;
  onOpenTemplates: () => void;
  onOpenStartupHub?: () => void;
  onToggleMetronome?: () => void;
  isMetronomeOpen?: boolean;
  onNewDoc: () => void;
  onPrint: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isOutlineOpen: boolean;
  onToggleOutline: () => void;
  isSaving: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDoc,
  onUpdateTitle,
  stats,
  theme,
  onThemeChange,
  layoutMode,
  onLayoutModeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenStats,
  onOpenFindReplace,
  onOpenExport,
  onOpenShortcuts,
  onOpenTemplates,
  onOpenStartupHub,
  onToggleMetronome,
  isMetronomeOpen,
  onNewDoc,
  onPrint,
  isSidebarOpen,
  onToggleSidebar,
  isOutlineOpen,
  onToggleOutline,
  isSaving,
}) => {

  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [titleInput, setTitleInput] = React.useState(currentDoc.title);
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = React.useState(false);

  React.useEffect(() => {
    setTitleInput(currentDoc.title);
  }, [currentDoc.title]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      onUpdateTitle(titleInput.trim());
    } else {
      setTitleInput(currentDoc.title);
    }
  };

  const isDark = theme === 'dark' || theme === 'nord';

  return (
    <header className={`no-print border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-[#0a0f0c] border-[#1a3022] text-[#e5fbf0]' 
        : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
    } px-4 py-2.5 select-none relative z-30`}>
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Brand Logo, Sidebar Toggle, Document Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            id="toggle-sidebar-btn"
            onClick={onToggleSidebar}
            title={isSidebarOpen ? 'Hide Library' : 'Show Library'}
            className={`p-1.5 rounded-none sm:rounded-xs transition-colors border ${
              isDark
                ? 'text-[#6f9c7d] hover:text-[#22c55e] border-transparent hover:border-[#1a3022]'
                : 'text-[#5e7a68] hover:text-[#ea580c] border-transparent hover:border-[#d1e5d7]'
            }`}
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Editorial Brand Mark */}
          <div className={`hidden lg:flex items-center gap-2 pr-3 border-r ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
            <span className={`font-serif font-black tracking-tighter text-base ${isDark ? 'text-[#e5fbf0]' : 'text-[#13261a]'}`}>
              FLO-WRITE
            </span>
            <span className={`text-[9px] uppercase tracking-[0.25em] font-bold px-1.5 py-0.5 rounded-none sm:rounded-xs ${
              isDark ? 'bg-[#0e1f13] text-[#22c55e] border border-[#22c55e]/30' : 'bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]'
            }`}>
              STUDIO
            </span>
          </div>

          <div className="flex items-center gap-2 min-w-0 max-w-md">
            {isEditingTitle ? (
              <input
                id="doc-title-input"
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSubmit();
                  if (e.key === 'Escape') {
                    setTitleInput(currentDoc.title);
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                className={`text-sm font-serif font-bold px-2 py-1 rounded-none border outline-none w-full ${
                  isDark
                    ? 'bg-[#0f1712] border-[#22c55e] text-[#e5fbf0] focus:ring-1 focus:ring-[#22c55e]'
                    : 'bg-[#f4faf6] border-[#ea580c] text-[#13261a] focus:ring-1 focus:ring-[#ea580c]'
                }`}
              />
            ) : (
              <button
                id="doc-title-btn"
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename document"
                className={`text-sm font-serif font-bold truncate px-2 py-1 rounded-none text-left transition-colors border-b border-transparent ${
                  isDark 
                    ? 'text-[#e5fbf0] hover:border-[#22c55e] hover:text-[#22c55e]' 
                    : 'text-[#13261a] hover:border-[#ea580c] hover:text-[#ea580c]'
                }`}
              >
                {currentDoc.title || 'Untitled Document'}
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono italic tracking-wide">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${
              isSaving 
                ? 'bg-amber-500 animate-pulse' 
                : isDark ? 'bg-[#22c55e] shadow-[0_0_8px_#22c55e]' : 'bg-[#16a34a]'
            }`}></span>
            <span className={isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'}>{isSaving ? 'Saving...' : 'Saved'}</span>
          </div>
        </div>

        {/* Center Section: Quick Undo / Redo & Word pill */}
        <div className="hidden md:flex items-center gap-1.5">
          <button
            id="nav-undo-btn"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className={`p-1.5 rounded-none sm:rounded-xs transition-colors ${
              !canUndo 
                ? 'opacity-25 cursor-not-allowed' 
                : isDark 
                ? 'hover:bg-[#121c15] text-[#e5fbf0] hover:text-[#22c55e]' 
                : 'hover:bg-[#f4faf6] text-[#13261a] hover:text-[#ea580c]'
            }`}
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            id="nav-redo-btn"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y / Ctrl+Shift+Z)"
            className={`p-1.5 rounded-none sm:rounded-xs transition-colors ${
              !canRedo 
                ? 'opacity-25 cursor-not-allowed' 
                : isDark 
                ? 'hover:bg-[#121c15] text-[#e5fbf0] hover:text-[#22c55e]' 
                : 'hover:bg-[#f4faf6] text-[#13261a] hover:text-[#ea580c]'
            }`}
          >
            <Redo className="w-3.5 h-3.5" />
          </button>

          <div className={`h-4 w-px mx-1.5 ${isDark ? 'bg-[#1a3022]' : 'bg-[#d1e5d7]'}`} />

          {/* Quick Word & Read Time Pill */}
          <button
            id="nav-stats-pill"
            onClick={onOpenStats}
            title="View Detailed Document Analytics"
            className={`flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-none sm:rounded-xs border transition-colors ${
              isDark 
                ? 'bg-[#0f1712] border-[#1a3022] text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#22c55e]/40' 
                : 'bg-[#f4faf6] border-[#d1e5d7] text-[#5e7a68] hover:text-[#13261a] hover:border-[#ea580c]/50'
            }`}
          >
            <span>{stats.words} WORDS</span>
            <span className="opacity-40">&bull;</span>
            <span>{stats.readingTimeMinutes}M READ</span>
          </button>
        </div>

        {/* Right Section: Actions, Layout, Theme, Outline, Export */}
        <div className="flex items-center gap-1.5">
          {/* Find & Replace */}
          <button
            id="nav-find-replace-btn"
            onClick={onOpenFindReplace}
            title="Find & Replace (Ctrl+F)"
            className={`p-1.5 rounded-none sm:rounded-xs transition-colors border border-transparent ${
              isDark 
                ? 'text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#1a3022]' 
                : 'text-[#5e7a68] hover:text-[#ea580c] hover:border-[#d1e5d7]'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Document Outline Toggle */}
          <button
            id="nav-outline-btn"
            onClick={onToggleOutline}
            title={isOutlineOpen ? 'Hide Document Outline' : 'Show Document Outline'}
            className={`p-1.5 rounded-none sm:rounded-xs transition-colors border ${
              isOutlineOpen 
                ? isDark
                  ? 'bg-[#22c55e] text-[#000000] border-[#22c55e] font-bold shadow-[0_0_8px_#22c55e]'
                  : 'bg-[#13261a] text-white border-[#13261a]' 
                : isDark 
                ? 'border-transparent text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#1a3022]' 
                : 'border-transparent text-[#5e7a68] hover:text-[#13261a] hover:border-[#d1e5d7]'
            }`}
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Layout Mode Dropdown */}
          <div className="relative">
            <button
              id="nav-layout-menu-btn"
              onClick={() => {
                setShowLayoutMenu(!showLayoutMenu);
                setShowThemeMenu(false);
              }}
              title="Change View Layout"
              className={`p-1.5 rounded-none sm:rounded-xs transition-colors border border-transparent ${
                isDark 
                  ? 'text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#1a3022]' 
                  : 'text-[#5e7a68] hover:text-[#ea580c] hover:border-[#d1e5d7]'
              }`}
            >
              {layoutMode === 'page' ? <FileText className="w-4 h-4" /> :
               layoutMode === 'continuous' ? <Layout className="w-4 h-4" /> :
               layoutMode === 'split-markdown' ? <Columns className="w-4 h-4" /> :
               <FileText className="w-4 h-4" />}
            </button>

            {showLayoutMenu && (
              <div 
                className={`absolute right-0 mt-2 w-48 rounded-none sm:rounded-xs shadow-xl border p-1 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                  isDark 
                    ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]' 
                    : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1.5 border-b mb-1 ${
                  isDark ? 'text-[#4ade80] border-[#1a3022]' : 'text-[#ea580c] border-[#d1e5d7]'
                }`}>
                  VIEW LAYOUT
                </div>
                <button
                  onClick={() => {
                    onLayoutModeChange('page');
                    setShowLayoutMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-none transition-colors ${
                    layoutMode === 'page' 
                      ? isDark ? 'bg-[#22c55e] text-[#000000] font-bold' : 'bg-[#13261a] text-white font-semibold' 
                      : isDark ? 'hover:bg-[#121c15]' : 'hover:bg-[#f4faf6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Paginated Sheet
                  </span>
                  {layoutMode === 'page' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    onLayoutModeChange('continuous');
                    setShowLayoutMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-none transition-colors ${
                    layoutMode === 'continuous' 
                      ? isDark ? 'bg-[#22c55e] text-[#000000] font-bold' : 'bg-[#13261a] text-white font-semibold' 
                      : isDark ? 'hover:bg-[#121c15]' : 'hover:bg-[#f4faf6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layout className="w-3.5 h-3.5" /> Continuous Flow
                  </span>
                  {layoutMode === 'continuous' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    onLayoutModeChange('split-markdown');
                    setShowLayoutMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-none transition-colors ${
                    layoutMode === 'split-markdown' 
                      ? isDark ? 'bg-[#22c55e] text-[#000000] font-bold' : 'bg-[#13261a] text-white font-semibold' 
                      : isDark ? 'hover:bg-[#121c15]' : 'hover:bg-[#f4faf6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Columns className="w-3.5 h-3.5" /> Split Markdown
                  </span>
                  {layoutMode === 'split-markdown' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    onLayoutModeChange('zen');
                    setShowLayoutMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-none transition-colors ${
                    layoutMode === 'zen' 
                      ? isDark ? 'bg-[#22c55e] text-[#000000] font-bold' : 'bg-[#13261a] text-white font-semibold' 
                      : isDark ? 'hover:bg-[#121c15]' : 'hover:bg-[#f4faf6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Feather className="w-3.5 h-3.5" /> Zen Fullscreen
                  </span>
                  {layoutMode === 'zen' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Theme Switcher Dropdown / Quick Toggle */}
          <div className="relative">
            <button
              id="nav-theme-menu-btn"
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowLayoutMenu(false);
              }}
              title="Canvas & Palette Theme (Light Green & Orange / Black & Neon Green)"
              className={`p-1.5 rounded-none sm:rounded-xs transition-colors border ${
                isDark 
                  ? 'text-[#22c55e] border-[#1a3022] hover:bg-[#101b13] shadow-[0_0_6px_rgba(34,197,94,0.2)]' 
                  : 'text-[#ea580c] border-[#d1e5d7] hover:bg-[#f4faf6]'
              }`}
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-[#22c55e]" />
              ) : (
                <Sun className="w-4 h-4 text-[#ea580c]" />
              )}
            </button>

            {showThemeMenu && (
              <div 
                className={`absolute right-0 mt-2 w-56 rounded-none sm:rounded-xs shadow-xl border p-1 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                  isDark 
                    ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]' 
                    : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1.5 border-b mb-1 ${
                  isDark ? 'text-[#4ade80] border-[#1a3022]' : 'text-[#ea580c] border-[#d1e5d7]'
                }`}>
                  THEME PALETTE
                </div>
                <button
                  onClick={() => {
                    onThemeChange('light');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-none transition-colors mb-1 ${
                    !isDark 
                      ? 'bg-[#ea580c] text-white font-bold' 
                      : isDark ? 'hover:bg-[#121c15]' : 'hover:bg-[#f4faf6]'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="flex items-center gap-2 font-semibold">
                      <Sun className="w-3.5 h-3.5 text-amber-300" /> Light Version
                    </span>
                    <span className={`text-[10px] opacity-80 ${!isDark ? 'text-white' : 'text-[#6f9c7d]'}`}>
                      Mint Green & White • Orange hint
                    </span>
                  </div>
                  {!isDark && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    onThemeChange('dark');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-none transition-colors ${
                    isDark 
                      ? 'bg-[#22c55e] text-[#000000] font-bold shadow-[0_0_8px_#22c55e]' 
                      : isDark ? 'hover:bg-[#121c15]' : 'hover:bg-[#f4faf6]'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="flex items-center gap-2 font-semibold">
                      <Moon className="w-3.5 h-3.5 text-emerald-950 dark:text-[#000000]" /> Dark Version
                    </span>
                    <span className={`text-[10px] opacity-80 ${isDark ? 'text-[#000000]' : 'text-[#5e7a68]'}`}>
                      Obsidian Black • Neon Green
                    </span>
                  </div>
                  {isDark && <Check className="w-3.5 h-3.5 text-[#000000]" />}
                </button>
              </div>
            )}
          </div>

          {/* Metronome Bar Toggle Button */}
          {onToggleMetronome && (
            <button
              id="nav-metronome-toggle-btn"
              onClick={onToggleMetronome}
              title="Toggle Metronome (Songwriting Audio & Tempo)"
              className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-none sm:rounded-xs border transition-colors ${
                isMetronomeOpen
                  ? isDark
                    ? 'border-[#22c55e] bg-[#22c55e] text-[#000000] shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                    : 'border-[#ea580c] bg-[#ea580c] text-white shadow-xs'
                  : currentDoc.format === 'songwriting'
                  ? isDark
                    ? 'border-[#22c55e]/50 bg-[#0e1f13] text-[#4ade80] hover:bg-[#132c1b]'
                    : 'border-[#ea580c]/50 bg-[#fff7ed] text-[#ea580c] hover:bg-[#ffedd5]'
                  : isDark
                  ? 'border-[#1a3022] bg-[#0f1712] hover:bg-[#15231a] text-[#e5fbf0]'
                  : 'border-[#d1e5d7] bg-[#f4faf6] hover:bg-[#e8f4ec] text-[#13261a]'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${
                isMetronomeOpen 
                  ? isDark ? 'text-[#000000]' : 'text-white' 
                  : isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'
              }`} />
              <span className="hidden md:inline">Metronome</span>
            </button>
          )}

          {/* Startup Format Hub Button */}
          {onOpenStartupHub && (
            <button
              id="nav-startup-hub-btn"
              onClick={onOpenStartupHub}
              title="Startup Formats Hub (Screenwriting, Plays, Songwriting, Poetry)"
              className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-none sm:rounded-xs border transition-colors ${
                isDark
                  ? 'border-[#22c55e]/60 bg-[#0e1f13] hover:bg-[#132b1b] text-[#4ade80]'
                  : 'border-[#13261a] bg-[#13261a] text-white hover:bg-[#1e3b28]'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#fb923c]'}`} />
              <span>Format Hub</span>
            </button>
          )}

          {/* Templates Gallery Button */}
          <button
            id="nav-templates-btn"
            onClick={onOpenTemplates}
            title="Browse Starter Templates"
            className={`hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-none sm:rounded-xs border transition-colors ${
              isDark
                ? 'border-[#1a3022] bg-[#0f1712] hover:bg-[#15231a] text-[#e5fbf0]'
                : 'border-[#d1e5d7] bg-[#f4faf6] hover:bg-[#e8f4ec] text-[#13261a]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />
            <span>Templates</span>
          </button>

          {/* Export & Download Button */}
          <button
            id="nav-export-btn"
            onClick={onOpenExport}
            title="Export & Publish"
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-none sm:rounded-xs shadow-xs transition-all ${
              isDark
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-[#000000] font-black shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Shortcuts / Help */}
          <button
            id="nav-shortcuts-btn"
            onClick={onOpenShortcuts}
            title="Keyboard Shortcuts & Help (?)"
            className={`p-1.5 rounded-none sm:rounded-xs transition-colors border border-transparent ${
              isDark 
                ? 'text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#1a3022]' 
                : 'text-[#5e7a68] hover:text-[#ea580c] hover:border-[#d1e5d7]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
