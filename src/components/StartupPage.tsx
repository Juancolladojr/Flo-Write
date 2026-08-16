import React, { useState } from 'react';
import { 
  Clapperboard, 
  Drama, 
  Music, 
  Feather, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  BookOpen,
  Check,
  Film,
  Layers,
  X
} from 'lucide-react';
import { DocumentFormat, DocumentItem, EditorTheme, TemplateItem } from '../types';
import { TEMPLATES } from '../data/templates';

interface StartupPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormat: (format: DocumentFormat, templateId?: string) => void;
  onSelectDocument: (docId: string) => void;
  recentDocuments: DocumentItem[];
  theme: EditorTheme;
}

export const StartupPage: React.FC<StartupPageProps> = ({
  isOpen,
  onClose,
  onSelectFormat,
  onSelectDocument,
  recentDocuments,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'formats' | 'templates' | 'recents'>('formats');
  const isDark = theme === 'dark' || theme === 'nord';

  if (!isOpen) return null;

  const FORMAT_OPTIONS: Array<{
    id: DocumentFormat;
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ReactNode;
    templateId: string;
    description: string;
    features: string[];
    sampleSnippet: string;
    fontFamily: string;
  }> = [
    {
      id: 'screenwriting',
      title: 'Screenwriting Format',
      subtitle: 'Industry-Standard Screenplay & Scripts',
      badge: 'Hollywood Standard',
      icon: <Clapperboard className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      templateId: 'screenplay-standard',
      description: 'Strict Courier 12pt layout with formatted scene headings (sluglines), action lines, centered character cues, parentheticals, and transitions.',
      features: [
        'Scene Sluglines (INT. / EXT. - TIME)',
        'Centered Character Names & Parentheticals',
        'Constrained Dialogue Margin Blocks',
        'Right-Aligned Transitions (CUT TO:, FADE IN:)'
      ],
      sampleSnippet: `EXT. CHICAGO RAIL YARD - NIGHT

ELENA (30s) dashes across the damp gravel.

                    ELENA
          (checking watch, breathless)
He should have been here ten minutes ago.

                    MARCUS
Trains don't wait for good weather, Elena.`,
      fontFamily: 'font-mono-code'
    },
    {
      id: 'play',
      title: 'Stage Play Format',
      subtitle: 'Theatrical Scripts & Act Structures',
      badge: 'Theatrical Standard',
      icon: <Drama className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      templateId: 'stage-play-standard',
      description: 'Classical theatrical drama format with Act & Scene divisions, Dramatis Personae cast breakdown, bracketed stage directions, and speaker indentations.',
      features: [
        'Act & Scene Heading Divisions',
        'Dramatis Personae Character Lists',
        'Italicized Stage Directions [In Brackets]',
        'Character Speech Cues & Hanging Indents'
      ],
      sampleSnippet: `ACT I, SCENE 1
[AT RISE: Late afternoon sun filters through frosted glass. JULIAN trims an exotic orchid.]

ELEANOR. [Restrained anxiety.] You haven't looked at the afternoon post, have you Julian?

JULIAN. [Without looking up.] Living things do not demand an accounting.`,
      fontFamily: 'font-serif-merriweather'
    },
    {
      id: 'songwriting',
      title: 'Songwriting Format',
      subtitle: 'Lyrics, Chords & Song Structures',
      badge: 'Music & Audio',
      icon: <Music className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      templateId: 'songwriting-standard',
      description: 'Musician-first layout featuring Key, BPM/Tempo, Time Signature, and Capo tracking, with structured section chips (Verse, Chorus, Bridge) and chord notations.',
      features: [
        'Key, BPM, Capo & Tuning Header Cards',
        'Section Chips: [VERSE], [CHORUS], [BRIDGE]',
        'Aligned Chord Annotations Above Lyrics',
        'Rhyme Scheme & Rhythm Guides'
      ],
      sampleSnippet: `[Key: G Major • 112 BPM • Capo: 2nd Fret]

[VERSE 1]
[G]                [D/F#]             [Em7]
Morning frost is clinging to the fence line,
[Cadd9]            [G]                [D]
Watching sunrise spill across the cedar trees.

[CHORUS]
So roll on, Riverstone Road, take me where the river bends...`,
      fontFamily: 'font-sans-default'
    },
    {
      id: 'poetry',
      title: 'Poetry Format',
      subtitle: 'Stanzas, Verses & Poetic Meter',
      badge: 'Literary & Verse',
      icon: <Feather className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      templateId: 'poetry-standard',
      description: 'Elegant poetic typography with generous line-height, stanza spacing, variable hanging indents, epigraph banners, and meter/rhyme annotations.',
      features: [
        'Stanza Structure & Grouping Rules',
        'Sonnets, Quatrains & Free Verse Indents',
        'Meter & Form Badges [Iambic Pentameter]',
        'Margin Rhyme Scheme Annotations (A B B A)'
      ],
      sampleSnippet: `I. Sonnet of the Salt Mist
[ Form: Petrarchan Sonnet • Meter: Iambic Pentameter ]

The restless ocean climbs the jagged shore,     (A)
And spills white foam upon the granite grey;     (B)
The gulls take flight into the fading day,       (B)
While sailors count the leagues of miles before. (A)`,
      fontFamily: 'font-serif-playfair'
    }
  ];

  return (
    <div
      id="startup-format-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className={`w-full max-w-5xl rounded-none sm:rounded-xs shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
      >
        {/* Header Masthead */}
        <div
          className={`p-6 border-b flex items-start justify-between relative ${
            isDark ? 'border-[#1a3022] bg-[#080d0a]' : 'border-[#d1e5d7] bg-[#f4faf6]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-serif font-black tracking-wider text-base text-[#13261a] dark:text-[#e5fbf0]">
                FLO-WRITE
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold px-2 py-0.5 border ${
                isDark 
                  ? 'bg-[#0e1f13] text-[#22c55e] border-[#22c55e]/40 shadow-[0_0_6px_rgba(34,197,94,0.2)]' 
                  : 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]'
              }`}>
                STARTUP &amp; FORMAT HUB
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#13261a] dark:text-[#e5fbf0]">
              Choose Your Manuscript Format
            </h2>
            <p className="text-xs text-[#5e7a68] dark:text-[#6f9c7d] font-sans mt-1 max-w-2xl leading-relaxed">
              Start writing with industry-standard formatting presets tailored for Screenwriting, Stage Plays, Songwriting, and Classical Poetry.
            </p>
          </div>

          <button
            id="close-startup-hub-btn"
            onClick={onClose}
            title="Continue to Editor"
            className={`p-1.5 rounded-none border border-transparent transition-colors ${
              isDark 
                ? 'text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#1a3022]' 
                : 'text-[#5e7a68] hover:text-[#ea580c] hover:border-[#d1e5d7]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div
          className={`px-6 py-2.5 border-b flex items-center justify-between gap-4 ${
            isDark ? 'border-[#1a3022] bg-[#0a0f0c]' : 'border-[#d1e5d7] bg-[#ffffff]'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('formats')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-none border transition-colors flex items-center gap-1.5 ${
                activeTab === 'formats'
                  ? isDark
                    ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_8px_#22c55e]'
                    : 'bg-[#ea580c] text-white border-[#ea580c]'
                  : isDark
                  ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]'
                  : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#f4faf6]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Specialized Formats (4)</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-none border transition-colors flex items-center gap-1.5 ${
                activeTab === 'templates'
                  ? isDark
                    ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_8px_#22c55e]'
                    : 'bg-[#ea580c] text-white border-[#ea580c]'
                  : isDark
                  ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]'
                  : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#f4faf6]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Templates ({TEMPLATES.length})</span>
            </button>
            {recentDocuments.length > 0 && (
              <button
                onClick={() => setActiveTab('recents')}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-none border transition-colors flex items-center gap-1.5 ${
                  activeTab === 'recents'
                    ? isDark
                      ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_8px_#22c55e]'
                      : 'bg-[#ea580c] text-white border-[#ea580c]'
                    : isDark
                    ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]'
                    : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#f4faf6]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Recent Manuscripts ({recentDocuments.length})</span>
              </button>
            )}
          </div>

          {/* Quick Blank Slate */}
          <button
            id="quick-blank-page-btn"
            onClick={() => {
              onSelectFormat('standard', 'blank');
              onClose();
            }}
            className={`hidden sm:flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-none border border-transparent transition-colors ${
              isDark
                ? 'text-[#6f9c7d] hover:text-[#22c55e] hover:border-[#1a3022]'
                : 'text-[#5e7a68] hover:text-[#ea580c] hover:border-[#d1e5d7]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blank Canvas</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'formats' && (
            <div className="space-y-6">
              {/* Four Core Formats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FORMAT_OPTIONS.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-none sm:rounded-xs border p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg ${
                      isDark
                        ? 'bg-[#080d0a] border-[#1a3022] hover:border-[#22c55e]/60'
                        : 'bg-[#f4faf6] border-[#d1e5d7] hover:border-[#ea580c]/60'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-none border ${isDark ? 'border-[#1a3022] bg-[#0d1410]' : 'border-[#d1e5d7] bg-white'}`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-base text-[#13261a] dark:text-[#e5fbf0]">
                              {item.title}
                            </h3>
                            <span className="text-[11px] text-[#5e7a68] dark:text-[#6f9c7d] font-sans">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-none border ${
                          isDark 
                            ? 'border-[#1a3022] bg-[#0d1410] text-[#22c55e]' 
                            : 'border-[#d1e5d7] bg-white text-[#ea580c]'
                        }`}>
                          {item.badge}
                        </span>
                      </div>

                      <p className="text-xs text-[#5e7a68] dark:text-[#6f9c7d] font-sans leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Feature Checklist */}
                      <div className="mb-4 space-y-1">
                        {item.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#13261a] dark:text-[#a7f3d0]">
                            <Check className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Live Code/Formatting Snippet Box */}
                      <div className={`p-3 rounded-none border text-[11px] font-mono leading-relaxed mb-5 overflow-x-auto whitespace-pre ${
                        isDark 
                          ? 'bg-[#050806] border-[#1a3022] text-[#4ade80]' 
                          : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
                      }`}>
                        {item.sampleSnippet}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-[#d1e5d7] dark:border-[#1a3022]">
                      <button
                        onClick={() => {
                          onSelectFormat(item.id, item.templateId);
                          onClose();
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest py-2 px-3 rounded-none font-bold shadow-xs transition-colors ${
                          isDark
                            ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                            : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
                        }`}
                      >
                        <span>Start {item.title.split(' ')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* General Blank / Prose Banner */}
              <div
                className={`p-5 rounded-none sm:rounded-xs border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#ffffff] border-[#d1e5d7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-none border ${isDark ? 'border-[#1a3022] bg-[#0d1410]' : 'border-[#d1e5d7] bg-[#f4faf6]'}`}>
                    <FileText className="w-5 h-5 text-[#ea580c] dark:text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#13261a] dark:text-[#e5fbf0]">
                      Standard Prose &amp; General Writing Canvas
                    </h4>
                    <p className="text-xs text-[#5e7a68] dark:text-[#6f9c7d]">
                      Clean, distraction-free rich text editor for general essays, articles, documentation &amp; daily notes.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectFormat('standard', 'blank');
                    onClose();
                  }}
                  className={`w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none border transition-colors whitespace-nowrap ${
                    isDark
                      ? 'border-[#1a3022] hover:border-[#22c55e] hover:bg-[#121c15] text-[#e5fbf0]'
                      : 'border-[#d1e5d7] hover:border-[#ea580c] hover:bg-[#f4faf6] text-[#13261a]'
                  }`}
                >
                  Start Blank Canvas
                </button>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className={`p-4 rounded-none border flex flex-col justify-between ${
                    isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 border ${
                        isDark 
                          ? 'border-[#1a3022] bg-[#0d1410] text-[#22c55e]' 
                          : 'border-[#d1e5d7] bg-white text-[#ea580c]'
                      }`}>
                        {tmpl.category}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm mb-1 text-[#13261a] dark:text-[#e5fbf0]">{tmpl.title}</h4>
                    <p className="text-xs text-[#5e7a68] dark:text-[#6f9c7d] line-clamp-2 mb-4 leading-relaxed">{tmpl.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectFormat(tmpl.format || 'standard', tmpl.id);
                      onClose();
                    }}
                    className={`w-full text-xs font-bold uppercase tracking-wider py-1.5 rounded-none transition-colors ${
                      isDark
                        ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold'
                        : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
                    }`}
                  >
                    Open Template
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recents' && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d] mb-2">
                CONTINUE EDITING
              </div>
              {recentDocuments.map((doc) => {
                const plain = doc.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDocument(doc.id);
                      onClose();
                    }}
                    className={`p-3.5 rounded-none border flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                      isDark 
                        ? 'bg-[#080d0a] border-[#1a3022] hover:border-[#22c55e]' 
                        : 'bg-[#f4faf6] border-[#d1e5d7] hover:border-[#ea580c]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#ea580c] dark:text-[#22c55e]" />
                        <h4 className="font-serif font-bold text-sm truncate text-[#13261a] dark:text-[#e5fbf0]">
                          {doc.title || 'Untitled Manuscript'}
                        </h4>
                        {doc.format && (
                          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 border ${
                            isDark ? 'border-[#1a3022] text-[#22c55e]' : 'border-[#d1e5d7] text-[#ea580c]'
                          }`}>
                            {doc.format}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5e7a68] dark:text-[#6f9c7d] truncate">{plain || 'Empty manuscript...'}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#5e7a68] dark:text-[#6f9c7d] font-mono">
                      <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between text-xs text-[#5e7a68] dark:text-[#6f9c7d] ${
            isDark ? 'border-[#1a3022] bg-[#080d0a]' : 'border-[#d1e5d7] bg-[#f4faf6]'
          }`}
        >
          <span className="font-serif italic">
            Flo-write Editorial &amp; Publishing Environment &bull; Version 2.5
          </span>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-bold text-[#ea580c] dark:text-[#22c55e] hover:underline"
          >
            Skip to Editor &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
