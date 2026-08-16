import React, { useState } from 'react';
import { X, Sparkles, FileText, Rocket, Users, Feather, Mail, Briefcase, Plus, Film, Drama, Music, Clapperboard } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { EditorTheme, TemplateItem } from '../types';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: TemplateItem, createNew: boolean) => void;
  theme: EditorTheme;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
  theme
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const isDark = theme === 'dark' || theme === 'nord';

  if (!isOpen) return null;

  const categories = ['All', 'Screenwriting', 'Plays', 'Songwriting', 'Poetry', 'Work', 'Writing', 'Academic', 'General'];

  const filtered = selectedCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
      case 'Clapperboard': return <Film className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Drama': return <Drama className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Music': return <Music className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'Feather': return <Feather className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-[#8c8881]" />;
      case 'Users': return <Users className="w-4 h-4 text-[#8c8881]" />;
      case 'Mail': return <Mail className="w-4 h-4 text-[#8c8881]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#8c8881]" />;
      default: return <FileText className="w-4 h-4 text-[#8c8881]" />;
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-3xl rounded-none sm:rounded-xs shadow-2xl border overflow-hidden flex flex-col max-h-[85vh] ${
          isDark
            ? 'bg-[#0d1410] border-[#1a3022] text-[#e5fbf0]'
            : 'bg-[#ffffff] border-[#d1e5d7] text-[#13261a]'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#5e7a68] dark:text-[#6f9c7d]">
              MANUSCRIPT TEMPLATES LIBRARY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className={`px-5 py-3 border-b flex items-center gap-2 overflow-x-auto ${isDark ? 'border-[#1a3022] bg-[#080d0a]' : 'border-[#d1e5d7] bg-[#f4faf6]'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-none border whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-[#22c55e] text-black border-[#22c55e]'
                    : 'bg-[#ea580c] text-white border-[#ea580c]'
                  : isDark ? 'border-[#1a3022] text-[#6f9c7d] hover:bg-[#121c15]' : 'border-[#d1e5d7] text-[#5e7a68] hover:bg-[#e8f4ec]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-none sm:rounded-xs border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#080d0a] border-[#1a3022] hover:border-[#22c55e]'
                  : 'bg-[#f4faf6] border-[#d1e5d7] hover:border-[#ea580c]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={`p-1.5 rounded-none border ${isDark ? 'border-[#1a3022] bg-[#0d1410]' : 'border-[#d1e5d7] bg-white'}`}>
                    {getIcon(item.icon)}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none border ${isDark ? 'border-[#1a3022] bg-[#0d1410] text-[#6f9c7d]' : 'border-[#d1e5d7] bg-white text-[#5e7a68]'}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm mb-1 text-[#13261a] dark:text-[#e5fbf0]">{item.title}</h3>
                <p className="text-xs text-[#5e7a68] dark:text-[#6f9c7d] font-sans leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className={`flex items-center gap-2 pt-3 border-t ${isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'}`}>
                <button
                  onClick={() => {
                    onApplyTemplate(item, false);
                    onClose();
                  }}
                  className={`flex-1 text-xs uppercase tracking-wider py-1.5 px-2.5 rounded-none border font-bold transition-colors ${
                    isDark
                      ? 'border-[#1a3022] hover:bg-[#121c15] text-[#e5fbf0] hover:text-[#22c55e]'
                      : 'border-[#d1e5d7] hover:bg-white text-[#13261a] hover:text-[#ea580c]'
                  }`}
                >
                  Insert Here
                </button>
                <button
                  onClick={() => {
                    onApplyTemplate(item, true);
                    onClose();
                  }}
                  className={`flex-1 text-xs uppercase tracking-wider py-1.5 px-2.5 rounded-none font-bold shadow-xs transition-colors flex items-center justify-center gap-1 ${
                    isDark
                      ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black'
                      : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> New Doc
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
