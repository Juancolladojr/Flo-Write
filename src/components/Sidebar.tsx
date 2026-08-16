import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Copy, 
  Search, 
  Folder, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Pin, 
  Sparkles,
  Archive,
  Calendar,
  X,
  Layers,
  Clapperboard,
  Drama,
  Music,
  Feather
} from 'lucide-react';
import { DocumentItem, EditorTheme } from '../types';

interface SidebarProps {
  documents: DocumentItem[];
  currentDocId: string;
  onSelectDoc: (id: string) => void;
  onCreateDoc: () => void;
  onDeleteDoc: (id: string) => void;
  onDuplicateDoc: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
  onOpenStartupHub?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  currentDocId,
  onSelectDoc,
  onCreateDoc,
  onDeleteDoc,
  onDuplicateDoc,
  isOpen,
  onClose,
  theme,
  onOpenStartupHub,
}) => {
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  if (!isOpen) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  // Filter documents
  const filtered = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !filterTag || (doc.tags && doc.tags.includes(filterTag));
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(documents.flatMap((d) => d.tags || []))
  );

  const getFormatIcon = (format?: string) => {
    switch (format) {
      case 'screenwriting': return <Clapperboard className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />;
      case 'play': return <Drama className={`w-3.5 h-3.5 ${isDark ? 'text-[#4ade80]' : 'text-[#16a34a]'}`} />;
      case 'songwriting': return <Music className={`w-3.5 h-3.5 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />;
      case 'poetry': return <Feather className={`w-3.5 h-3.5 ${isDark ? 'text-[#86efac]' : 'text-[#c2410c]'}`} />;
      default: return <FileText className={`w-3.5 h-3.5 ${isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'}`} />;
    }
  };

  return (
    <aside
      id="document-sidebar"
      className={`no-print w-72 flex-shrink-0 border-r flex flex-col h-full z-20 select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0]'
          : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a]'
      }`}
    >
      {/* Sidebar Header */}
      <div className={`p-4 border-b ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className={`w-4 h-4 ${isDark ? 'text-[#22c55e]' : 'text-[#ea580c]'}`} />
            <span className={`font-bold text-xs uppercase tracking-[0.2em] ${isDark ? 'text-[#4ade80]' : 'text-[#13261a]'}`}>
              MANUSCRIPTS
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-none md:hidden ${
              isDark ? 'text-[#6f9c7d] hover:text-[#22c55e]' : 'text-[#5e7a68] hover:text-[#ea580c]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons: Format Hub & Blank Doc */}
        <div className="space-y-2">
          {onOpenStartupHub && (
            <button
              id="sidebar-format-hub-btn"
              onClick={onOpenStartupHub}
              className={`w-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider py-2 px-3 rounded-none sm:rounded-xs shadow-xs transition-colors ${
                isDark
                  ? 'bg-[#22c55e] hover:bg-[#16a34a] text-[#000000] font-black shadow-[0_0_8px_#22c55e]'
                  : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-white dark:text-[#000000]" />
              <span>Format Hub & Start</span>
            </button>
          )}

          <button
            id="new-document-sidebar-btn"
            onClick={onCreateDoc}
            className={`w-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-none border transition-colors ${
              isDark
                ? 'border-[#1a3022] bg-[#0d1510] hover:bg-[#132219] text-[#e5fbf0] hover:border-[#22c55e]/40'
                : 'border-[#d1e5d7] bg-white hover:bg-[#e8f4ec] text-[#13261a] hover:border-[#ea580c]/50'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Blank Manuscript</span>
          </button>
        </div>
      </div>


      {/* Search Bar */}
      <div className={`px-4 py-2.5 border-b ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
        <div className="relative flex items-center">
          <Search className={`w-3.5 h-3.5 absolute left-2.5 ${isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'}`} />
          <input
            id="sidebar-search-input"
            type="text"
            placeholder="Search manuscripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-none border outline-none font-sans ${
              isDark
                ? 'bg-[#0d1510] border-[#1a3022] text-[#e5fbf0] placeholder-[#6f9c7d] focus:border-[#22c55e]'
                : 'bg-white border-[#d1e5d7] text-[#13261a] placeholder-[#5e7a68] focus:border-[#ea580c]'
            }`}
          />
        </div>

        {/* Tags filter chips */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1 mt-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterTag(null)}
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${
                filterTag === null
                  ? isDark
                    ? 'bg-[#22c55e] text-[#000000] border-[#22c55e] font-bold'
                    : 'bg-[#ea580c] text-white border-[#ea580c]'
                  : isDark
                  ? 'bg-transparent text-[#6f9c7d] border-[#1a3022]'
                  : 'bg-transparent text-[#5e7a68] border-[#d1e5d7]'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border whitespace-nowrap ${
                  filterTag === tag
                    ? isDark
                      ? 'bg-[#22c55e] text-[#000000] border-[#22c55e] font-bold'
                      : 'bg-[#ea580c] text-white border-[#ea580c]'
                    : isDark
                    ? 'bg-transparent text-[#6f9c7d] border-[#1a3022]'
                    : 'bg-transparent text-[#5e7a68] border-[#d1e5d7]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 flex items-center justify-between ${
          isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'
        }`}>
          <span>ARCHIVE ({filtered.length})</span>
          <span className="font-mono">{documents.length} TOTAL</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-10 px-4 text-[#8c8881]">
            <Archive className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs font-serif italic">No manuscripts found</p>
          </div>
        ) : (
          filtered.map((doc) => {
            const isSelected = doc.id === currentDocId;
            const plainContent = doc.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            const dateFormatted = new Date(doc.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });

            return (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc.id)}
                className={`group relative p-2.5 rounded-none sm:rounded-xs border transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-[#0f1b13] border-[#22c55e] text-[#e5fbf0] shadow-[0_0_8px_rgba(34,197,94,0.15)]'
                      : 'bg-white border-[#ea580c] text-[#13261a] shadow-xs'
                    : isDark
                    ? 'border-transparent hover:bg-[#0f1712] hover:border-[#1a3022] text-[#8ea797]'
                    : 'border-transparent hover:bg-[#e8f4ec] hover:border-[#d1e5d7] text-[#5e7a68]'
                }`}
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {getFormatIcon(doc.format)}
                    <h4 className={`text-xs font-serif font-bold truncate ${
                      isSelected 
                        ? isDark ? 'text-[#22c55e]' : 'text-[#ea580c]' 
                        : isDark ? 'text-[#e5fbf0] group-hover:text-[#22c55e]' : 'text-[#13261a] group-hover:text-[#ea580c]'
                    }`}>
                      {doc.title || 'Untitled Manuscript'}
                    </h4>
                  </div>

                  {/* Actions on hover */}
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateDoc(doc.id);
                      }}
                      title="Duplicate"
                      className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-[#8c8881] hover:text-[#1a1a1a] dark:hover:text-[#ede8e1]"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    {documents.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDoc(doc.id);
                        }}
                        title="Delete"
                        className="p-1 rounded hover:bg-rose-100 text-[#8c8881] hover:text-rose-600 dark:hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Excerpt preview */}
                <p className={`text-[11px] line-clamp-2 font-sans leading-relaxed mb-2 ${
                  isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'
                }`}>
                  {plainContent || 'Empty manuscript...'}
                </p>

                {/* Metadata bottom row */}
                <div className={`flex items-center justify-between text-[10px] font-mono ${
                  isDark ? 'text-[#6f9c7d]' : 'text-[#5e7a68]'
                }`}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {dateFormatted}
                  </span>
                  {doc.tags && doc.tags[0] && (
                    <span className="uppercase tracking-wider font-semibold">
                      #{doc.tags[0]}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer */}
      <div className={`p-3 border-t text-[11px] font-serif italic text-center ${
        isDark ? 'border-[#1a3022] text-[#6f9c7d]' : 'border-[#d1e5d7] text-[#5e7a68]'
      }`}>
        <span>Editorial & Publishing Suite</span>
      </div>
    </aside>
  );
};
