import React from 'react';
import { X, BarChart2, BookOpen, Volume2, Award } from 'lucide-react';
import { DocumentStats, EditorTheme } from '../types';

interface DocumentStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: DocumentStats;
  theme: EditorTheme;
}

export const DocumentStatsModal: React.FC<DocumentStatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  theme
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark' || theme === 'nord';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-none sm:rounded-xs shadow-2xl border overflow-hidden ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              MANUSCRIPT ANALYTICS & STATS
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
        <div className="p-5 space-y-5">
          {/* Main Counters Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-none border text-center ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
              <div className="text-2xl font-serif font-bold text-[#13261a] dark:text-[#22c55e]">{stats.words}</div>
              <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] uppercase tracking-wider font-bold mt-1">Total Words</div>
            </div>

            <div className={`p-3.5 rounded-none border text-center ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
              <div className="text-2xl font-serif font-bold text-[#13261a] dark:text-[#22c55e]">{stats.characters}</div>
              <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] uppercase tracking-wider font-bold mt-1">Characters</div>
            </div>

            <div className={`p-3.5 rounded-none border text-center ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
              <div className="text-2xl font-serif font-bold text-[#13261a] dark:text-[#22c55e]">{stats.paragraphs}</div>
              <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] uppercase tracking-wider font-bold mt-1">Paragraphs</div>
            </div>
          </div>

          {/* Time & Readability Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-none border flex items-center gap-3 ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
              <div className="p-2 rounded-none bg-white dark:bg-[#0d1410] border border-[#d1e5d7] dark:border-[#1a3022] text-[#ea580c] dark:text-[#22c55e]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] uppercase tracking-wider">Reading Time</div>
                <div className="text-sm font-serif font-bold text-[#13261a] dark:text-[#e5fbf0]">{stats.readingTimeMinutes} min{stats.readingTimeMinutes !== 1 ? 's' : ''}</div>
                <div className="text-[9px] text-[#5e7a68] dark:text-[#6f9c7d]">Avg 200 WPM</div>
              </div>
            </div>

            <div className={`p-3.5 rounded-none border flex items-center gap-3 ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
              <div className="p-2 rounded-none bg-white dark:bg-[#0d1410] border border-[#d1e5d7] dark:border-[#1a3022] text-[#ea580c] dark:text-[#22c55e]">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] uppercase tracking-wider">Speaking Time</div>
                <div className="text-sm font-serif font-bold text-[#13261a] dark:text-[#e5fbf0]">{stats.speakingTimeMinutes} min{stats.speakingTimeMinutes !== 1 ? 's' : ''}</div>
                <div className="text-[9px] text-[#5e7a68] dark:text-[#6f9c7d]">Avg 130 WPM</div>
              </div>
            </div>
          </div>

          {/* Readability Score */}
          <div className={`p-4 rounded-none border ${isDark ? 'bg-[#080d0a] border-[#1a3022]' : 'bg-[#f4faf6] border-[#d1e5d7]'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#13261a] dark:text-[#e5fbf0]">
                <Award className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
                <span>Flesch Reading Ease Index</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#13261a] dark:text-[#22c55e]">{stats.readingEaseScore} / 100</span>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-[#d1e5d7] dark:bg-[#1a3022] h-1.5 rounded-none overflow-hidden mb-2">
              <div
                className="bg-[#ea580c] dark:bg-[#22c55e] h-full transition-all duration-300"
                style={{ width: `${stats.readingEaseScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#5e7a68] dark:text-[#6f9c7d]">
              <span className="uppercase tracking-wider text-[10px]">Readability Standard:</span>
              <span className="font-serif font-bold text-[#13261a] dark:text-[#22c55e]">{stats.readingEaseLevel}</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="text-xs space-y-1.5 pt-1">
            <div className="flex justify-between py-1 border-b border-[#d1e5d7] dark:border-[#1a3022] text-[#5e7a68] dark:text-[#6f9c7d]">
              <span>Characters (without spaces):</span>
              <span className="font-mono font-bold text-[#13261a] dark:text-[#e5fbf0]">{stats.charactersNoSpaces}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#d1e5d7] dark:border-[#1a3022] text-[#5e7a68] dark:text-[#6f9c7d]">
              <span>Estimated Sentences:</span>
              <span className="font-mono font-bold text-[#13261a] dark:text-[#e5fbf0]">{stats.sentences}</span>
            </div>
            <div className="flex justify-between py-1 text-[#5e7a68] dark:text-[#6f9c7d]">
              <span>Avg. Words per Sentence:</span>
              <span className="font-mono font-bold text-[#13261a] dark:text-[#e5fbf0]">
                {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : '0'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3.5 border-t flex justify-end ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-colors ${
              isDark
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black'
                : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
