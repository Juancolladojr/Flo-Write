import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Quote,
  Terminal,
  Minus,
  Info,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Clapperboard,
  Drama,
  Music,
  Feather,
  UserCheck,
  Disc,
  FileCode
} from 'lucide-react';
import { EditorTheme } from '../types';

interface SlashCommandMenuProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
  theme: EditorTheme;
}

interface CommandOption {
  id: string;
  title: string;
  description: string;
  category: 'Typography' | 'Lists' | 'Blocks' | 'Callouts' | 'Screenwriting' | 'Plays' | 'Songwriting' | 'Poetry';
  icon: React.ReactNode;
  action: (editor: Editor) => void;
}


export const SlashCommandMenu: React.FC<SlashCommandMenuProps> = ({
  editor,
  isOpen,
  onClose,
  theme
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark' || theme === 'nord';

  const commands: CommandOption[] = [
    {
      id: 'h1',
      title: 'Heading 1',
      description: 'Major section headline in serif display',
      category: 'Typography',
      icon: <Heading1 className="w-4 h-4 text-[#1a1a1a] dark:text-[#ede8e1]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleHeading({ level: 1 }).run()
    },
    {
      id: 'h2',
      title: 'Heading 2',
      description: 'Secondary section title',
      category: 'Typography',
      icon: <Heading2 className="w-4 h-4 text-[#1a1a1a] dark:text-[#ede8e1]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleHeading({ level: 2 }).run()
    },
    {
      id: 'h3',
      title: 'Heading 3',
      description: 'Subsection paragraph header',
      category: 'Typography',
      icon: <Heading3 className="w-4 h-4 text-[#1a1a1a] dark:text-[#ede8e1]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleHeading({ level: 3 }).run()
    },
    {
      id: 'bullet-list',
      title: 'Bullet List',
      description: 'Unordered point list',
      category: 'Lists',
      icon: <List className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleBulletList().run()
    },
    {
      id: 'numbered-list',
      title: 'Numbered Sequence',
      description: 'Ordered numeric list',
      category: 'Lists',
      icon: <ListOrdered className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleOrderedList().run()
    },
    {
      id: 'task-list',
      title: 'Editorial Checklist',
      description: 'Tasks with square checklist boxes',
      category: 'Lists',
      icon: <CheckSquare className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleTaskList().run()
    },
    {
      id: 'quote',
      title: 'Pull Quote',
      description: 'Editorial serif quote block with divider lines',
      category: 'Blocks',
      icon: <Quote className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleBlockquote().run()
    },
    {
      id: 'table',
      title: 'Data Table',
      description: 'Insert 3x3 editable table matrix',
      category: 'Blocks',
      icon: <Table className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    },
    {
      id: 'code',
      title: 'Code Block',
      description: 'Monospace terminal code block',
      category: 'Blocks',
      icon: <Terminal className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).toggleCodeBlock().run()
    },
    {
      id: 'divider',
      title: 'Divider Line',
      description: 'Subtle section rule divider',
      category: 'Blocks',
      icon: <Minus className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).setHorizontalRule().run()
    },
    {
      id: 'callout-info',
      title: 'Note Box',
      description: 'Framed editorial callout',
      category: 'Callouts',
      icon: <Info className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="callout callout-info"><p><strong>Editorial Note:</strong> Insert note details here...</p></div><p></p>').run();
      }
    },
    {
      id: 'callout-success',
      title: 'Key Takeaway Box',
      description: 'Highlighted key takeaway',
      category: 'Callouts',
      icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="callout callout-success"><p><strong>Key Takeaway:</strong> Highlighting core conclusion.</p></div><p></p>').run();
      }
    },
    {
      id: 'callout-warning',
      title: 'Attention Box',
      description: 'Editorial caution advisory',
      category: 'Callouts',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="callout callout-warning"><p><strong>Attention:</strong> Important notice for reader.</p></div><p></p>').run();
      }
    },
    {
      id: 'date',
      title: 'Date Stamp',
      description: 'Insert today\'s formatted date',
      category: 'Blocks',
      icon: <Calendar className="w-4 h-4 text-[#8c8881]" />,
      action: (ed) => {
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent(`<strong>${dateStr}</strong> `).run();
      }
    },
    // Screenwriting Commands
    {
      id: 'screenplay-slugline',
      title: 'Scene Heading / Slugline',
      description: 'EXT. / INT. LOCATION - TIME OF DAY',
      category: 'Screenwriting',
      icon: <Clapperboard className="w-4 h-4 text-amber-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<p class="screenplay-slugline"><strong>EXT. LOCATION - DAY</strong></p><p class="screenplay-action"></p>').run();
      }
    },
    {
      id: 'screenplay-character',
      title: 'Character & Dialogue Cue',
      description: 'Centered uppercase character cue with dialogue margin',
      category: 'Screenwriting',
      icon: <UserCheck className="w-4 h-4 text-amber-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<p class="screenplay-character"><strong>CHARACTER NAME</strong></p><p class="screenplay-parenthetical"><em>(parenthetical emotion)</em></p><p class="screenplay-dialogue">Enter dialogue line here...</p><p class="screenplay-action"></p>').run();
      }
    },
    {
      id: 'screenplay-transition',
      title: 'Scene Transition',
      description: 'Right-aligned CUT TO: / FADE IN: transition',
      category: 'Screenwriting',
      icon: <FileCode className="w-4 h-4 text-amber-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<p class="screenplay-transition"><strong>CUT TO:</strong></p><p class="screenplay-slugline"><strong>INT. NEW LOCATION - NIGHT</strong></p>').run();
      }
    },
    // Stage Play Commands
    {
      id: 'play-act-scene',
      title: 'Act & Scene Header',
      description: 'ACT I, SCENE 1 theatrical heading',
      category: 'Plays',
      icon: <Drama className="w-4 h-4 text-emerald-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<h2 class="play-act-scene">ACT I</h2><h3 style="text-align: center; text-transform: uppercase; font-size: 0.95rem; color: #8c8881;">SCENE 1</h3><p class="play-stage-direction"><em>[AT RISE: Setting description and initial stage movements.]</em></p>').run();
      }
    },
    {
      id: 'play-stage-direction',
      title: 'Stage Direction',
      description: 'Bracketed italicized stage movement [Stage direction]',
      category: 'Plays',
      icon: <Drama className="w-4 h-4 text-emerald-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<p class="play-stage-direction"><em>[Crosses stage right, pausing before the open doorway.]</em></p>').run();
      }
    },
    {
      id: 'play-speech',
      title: 'Character Speech Line',
      description: 'SPEAKER. Dialogue speech block',
      category: 'Plays',
      icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<p class="play-dialogue"><strong>SPEAKER.</strong> <em>[With measured conviction.]</em> Insert character dialogue line here.</p>').run();
      }
    },
    // Songwriting Commands
    {
      id: 'song-section-verse',
      title: 'Verse Section Block',
      description: '[VERSE 1] chip with chord and lyric lines',
      category: 'Songwriting',
      icon: <Music className="w-4 h-4 text-indigo-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="song-section-header"><span class="song-badge">VERSE 1</span></div><p class="song-chord-line"><code>[C]                [G]                [Am]         [F]</code></p><p class="song-lyric-line">Write your verse lyrics here...</p>').run();
      }
    },
    {
      id: 'song-section-chorus',
      title: 'Chorus Section Block',
      description: '[CHORUS] hook section block',
      category: 'Songwriting',
      icon: <Disc className="w-4 h-4 text-indigo-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="song-section-header"><span class="song-badge song-badge-chorus">CHORUS</span></div><p class="song-chord-line"><code>[F]                [C]                [G]          [Am]</code></p><p class="song-lyric-line">Sing your main hook chorus lines here...</p>').run();
      }
    },
    {
      id: 'song-section-bridge',
      title: 'Bridge Section Block',
      description: '[BRIDGE] transition section block',
      category: 'Songwriting',
      icon: <Music className="w-4 h-4 text-indigo-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="song-section-header"><span class="song-badge song-badge-bridge">BRIDGE</span></div><p class="song-chord-line"><code>[Dm]               [Am]               [G]</code></p><p class="song-lyric-line">Insert bridge melody and lyrical shift here...</p>').run();
      }
    },
    {
      id: 'song-tempo-meta',
      title: 'Tempo & Time Signature Stamp',
      description: '[Tempo: 120 BPM • 4/4 Time • Key: G Major]',
      category: 'Songwriting',
      icon: <Music className="w-4 h-4 text-indigo-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<p class="song-meta"><strong>[Tempo: 120 BPM &bull; 4/4 Time &bull; Key: G Major]</strong></p>').run();
      }
    },
    // Poetry Commands
    {
      id: 'poetry-stanza',
      title: 'Poetry Stanza (Quatrain)',
      description: '4-line structured stanza with rhyme annotations',
      category: 'Poetry',
      icon: <Feather className="w-4 h-4 text-purple-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="poetry-stanza"><p>First line of the poetic stanza, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span><br>Second line flowing like gentle rain; <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>Third line carrying the quiet refrain, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>Closing line anchored in the heart once more. <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span></p></div>').run();
      }
    },
    {
      id: 'poetry-free-verse',
      title: 'Free Verse Stanza (With Indents)',
      description: 'Free verse lines with variable indentation rhythm',
      category: 'Poetry',
      icon: <Feather className="w-4 h-4 text-purple-600" />,
      action: (ed) => {
        ed.chain().focus().deleteRange({ from: ed.state.selection.from - 1, to: ed.state.selection.from }).insertContent('<div class="poetry-stanza"><p>Night awakens in silence,<br><span style="padding-left: 2.5rem;">a quiet lantern in the vast dark.</span><br>We follow the river\'s memory,<br><span style="padding-left: 4.5rem;">where water turns to song.</span></p></div>').run();
      }
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex] && editor) {
          filteredCommands[selectedIndex].action(editor);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, editor, onClose]);

  if (!isOpen || !editor) return null;

  return (
    <div
      ref={containerRef}
      id="slash-commands-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-none sm:rounded-xs shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className={`p-3 border-b flex items-center gap-2 ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <Sparkles className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
          <input
            id="slash-command-search-input"
            type="text"
            placeholder="Type command or block title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-xs font-sans outline-none placeholder-[#5e7a68] dark:placeholder-[#6f9c7d]"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-none bg-[#f4faf6] dark:bg-[#080d0a] text-[#5e7a68] dark:text-[#6f9c7d] border border-[#d1e5d7] dark:border-[#1a3022]">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#5e7a68] dark:text-[#6f9c7d] font-serif italic">
              No matching elements found
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action(editor);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-none transition-colors ${
                    isSelected
                      ? isDark
                        ? 'bg-[#121c15] text-[#22c55e] border-l-2 border-[#22c55e]'
                        : 'bg-[#e8f4ec] text-[#ea580c] border-l-2 border-[#ea580c]'
                      : 'hover:bg-[#f4faf6] dark:hover:bg-[#121c15]'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-none border ${
                      isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-serif font-bold">{item.title}</div>
                    <div className="text-[11px] text-[#5e7a68] dark:text-[#6f9c7d] truncate">
                      {item.description}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#5e7a68] dark:text-[#6f9c7d]">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
