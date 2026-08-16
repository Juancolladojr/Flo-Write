import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  Volume2, 
  VolumeX, 
  Plus, 
  Minus, 
  Music, 
  Sliders, 
  Disc, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Radio,
  Zap,
  Tag
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorTheme } from '../types';
import { metronomeEngine, MetronomeSound, TimeSignature } from '../utils/metronomeAudio';

interface SongwritingMetronomeBarProps {
  editor: Editor | null;
  theme: EditorTheme;
  isOpen: boolean;
  onClose: () => void;
}

const TEMPO_MARKINGS = [
  { min: 40, max: 60, name: 'Largo (Broad & Slow)' },
  { min: 61, max: 76, name: 'Adagio (Slow & Stately)' },
  { min: 77, max: 108, name: 'Andante (Walking Pace)' },
  { min: 109, max: 120, name: 'Moderato / Allegretto' },
  { min: 121, max: 156, name: 'Allegro (Fast & Bright)' },
  { min: 157, max: 176, name: 'Vivace (Lively & Fast)' },
  { min: 177, max: 300, name: 'Presto (Very Fast)' },
];

export const SongwritingMetronomeBar: React.FC<SongwritingMetronomeBarProps> = ({
  editor,
  theme,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>('4/4');
  const [sound, setSound] = useState<MetronomeSound>('woodblock');
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [accentBeatOne, setAccentBeatOne] = useState(true);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Tap tempo state
  const tapTimesRef = useRef<number[]>([]);
  const tapTimeoutRef = useRef<number | null>(null);
  const [isTapping, setIsTapping] = useState(false);

  const isDark = theme === 'dark' || theme === 'nord';

  // Synchronize metronome parameters
  useEffect(() => {
    metronomeEngine.setBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    metronomeEngine.setTimeSignature(timeSignature);
  }, [timeSignature]);

  useEffect(() => {
    metronomeEngine.setSound(sound);
  }, [sound]);

  useEffect(() => {
    metronomeEngine.setVolume(isMuted ? 0 : volume / 100);
  }, [volume, isMuted]);

  useEffect(() => {
    metronomeEngine.setAccent(accentBeatOne);
  }, [accentBeatOne]);

  // Subscribe to real-time audio beats
  useEffect(() => {
    const unsubscribe = metronomeEngine.subscribeBeat((beatIdx) => {
      setCurrentBeat(beatIdx);
      setTimeout(() => {
        setCurrentBeat((prev) => (prev === beatIdx ? null : prev));
      }, 100);
    });

    return () => {
      unsubscribe();
      metronomeEngine.stop();
    };
  }, []);

  if (!isOpen) return null;

  const togglePlayback = () => {
    const running = metronomeEngine.toggle();
    setIsPlaying(running);
    if (!running) {
      setCurrentBeat(null);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    const clamped = Math.max(30, Math.min(280, Math.round(newBpm)));
    setBpm(clamped);
    metronomeEngine.setBpm(clamped);
  };

  const handleTapTempo = () => {
    const now = performance.now();
    setIsTapping(true);

    if (tapTimeoutRef.current) {
      window.clearTimeout(tapTimeoutRef.current);
    }

    tapTimesRef.current.push(now);

    // Keep only last 5 taps
    if (tapTimesRef.current.length > 5) {
      tapTimesRef.current.shift();
    }

    if (tapTimesRef.current.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgInterval > 150 && avgInterval < 3000) {
        const calculatedBpm = Math.round(60000 / avgInterval);
        handleBpmChange(calculatedBpm);
      }
    }

    tapTimeoutRef.current = window.setTimeout(() => {
      tapTimesRef.current = [];
      setIsTapping(false);
    }, 2000);
  };

  const insertTempoToEditor = () => {
    if (!editor) return;
    const tempoText = `<p class="song-meta"><strong>[Tempo: ${bpm} BPM &bull; ${timeSignature} Time]</strong></p>`;
    editor.chain().focus().insertContent(tempoText).run();
  };

  const getTempoLabel = (val: number) => {
    const found = TEMPO_MARKINGS.find((m) => val >= m.min && val <= m.max);
    return found ? found.name : 'Custom Tempo';
  };

  const beatsCount = timeSignature === '3/4' ? 3 : timeSignature === '2/4' ? 2 : timeSignature === '6/8' ? 6 : 4;

  return (
    <div
      id="songwriting-metronome-bar"
      className={`border-b px-4 py-2.5 transition-all duration-200 z-30 select-none ${
        isDark 
          ? 'bg-[#080d0a] border-[#1a3022] text-[#e5fbf0]' 
          : 'bg-[#f4faf6] border-[#d1e5d7] text-[#13261a]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Main Metronome Ribbon Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Branding & Play Button & Visual Beat Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-none border border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]">
                <Music className="w-4 h-4 text-[#ea580c] dark:text-[#22c55e]" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#13261a] dark:text-[#e5fbf0]">
                    Metronome
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest px-1.5 py-0.2 border border-[#d1e5d7] dark:border-[#1a3022] text-[#5e7a68] dark:text-[#6f9c7d]">
                    {timeSignature}
                  </span>
                </div>
                <div className="text-[10px] text-[#5e7a68] dark:text-[#6f9c7d] font-sans">
                  {getTempoLabel(bpm)}
                </div>
              </div>
            </div>

            {/* Main Play / Stop Button */}
            <button
              id="metronome-play-btn"
              onClick={togglePlayback}
              title={isPlaying ? 'Stop Metronome' : 'Start Metronome Audio (120 BPM)'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xs ${
                isPlaying
                  ? isDark
                    ? 'bg-[#22c55e] text-[#000000] font-black shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse'
                    : 'bg-[#ea580c] hover:bg-[#c2410c] text-white animate-pulse'
                  : isDark
                  ? 'bg-[#0d1410] border border-[#1a3022] text-[#22c55e] hover:bg-[#121c15] hover:border-[#22c55e]'
                  : 'bg-[#13261a] hover:bg-[#1f3d29] text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start</span>
                </>
              )}
            </button>

            {/* Visual Beat LEDs */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]">
              {Array.from({ length: beatsCount }).map((_, idx) => {
                const isActive = currentBeat === idx;
                const isAccentBeat = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-75 flex items-center justify-center text-[8px] font-mono font-bold ${
                      isActive
                        ? isAccentBeat
                          ? isDark
                            ? 'bg-[#22c55e] text-black scale-125 shadow-sm shadow-[#22c55e]'
                            : 'bg-[#ea580c] text-white scale-125 shadow-sm shadow-orange-500/50'
                          : isDark
                          ? 'bg-[#4ade80] text-black scale-115 shadow-sm shadow-[#4ade80]'
                          : 'bg-[#15803d] text-white scale-115 shadow-sm shadow-green-500/50'
                        : isDark
                        ? 'bg-[#121c15] text-[#6f9c7d]'
                        : 'bg-[#d1e5d7] text-[#5e7a68]'
                    }`}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center: BPM Display & Steppers & Slider */}
          <div className="flex items-center gap-2">
            {/* Quick Step Down -5 / -1 */}
            <div className="flex items-center">
              <button
                onClick={() => handleBpmChange(bpm - 5)}
                title="Decrease 5 BPM"
                className="px-1.5 py-1 text-[11px] font-mono font-bold text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] border-y border-l border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]"
              >
                -5
              </button>
              <button
                onClick={() => handleBpmChange(bpm - 1)}
                title="Decrease 1 BPM"
                className="p-1 text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] border border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct BPM Digital Readout & Input */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-none border border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]">
              <input
                id="metronome-bpm-input"
                type="number"
                min="30"
                max="280"
                value={bpm}
                onChange={(e) => handleBpmChange(Number(e.target.value))}
                className="w-12 text-center text-sm font-mono font-bold bg-transparent outline-none text-[#13261a] dark:text-[#e5fbf0]"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e7a68] dark:text-[#6f9c7d]">BPM</span>
            </div>

            {/* Quick Step Up +1 / +5 */}
            <div className="flex items-center">
              <button
                onClick={() => handleBpmChange(bpm + 1)}
                title="Increase 1 BPM"
                className="p-1 text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] border border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleBpmChange(bpm + 5)}
                title="Increase 5 BPM"
                className="px-1.5 py-1 text-[11px] font-mono font-bold text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] border-y border-r border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410]"
              >
                +5
              </button>
            </div>

            {/* Smooth BPM Slider */}
            <input
              id="metronome-bpm-slider"
              type="range"
              min="40"
              max="240"
              value={bpm}
              onChange={(e) => handleBpmChange(Number(e.target.value))}
              className="w-24 sm:w-32 accent-[#ea580c] dark:accent-[#22c55e] cursor-pointer hidden md:block"
            />

            {/* Tap Tempo Button */}
            <button
              id="metronome-tap-tempo-btn"
              onClick={handleTapTempo}
              title="Tap repeatedly to set tempo"
              className={`px-2.5 py-1 text-[11px] font-mono uppercase font-bold tracking-wider rounded-none border transition-colors ${
                isTapping
                  ? isDark
                    ? 'bg-[#22c55e] text-black border-[#22c55e] scale-95 font-black'
                    : 'bg-[#ea580c] text-white border-[#ea580c] scale-95'
                  : isDark
                  ? 'border-[#1a3022] bg-[#0d1410] text-[#e5fbf0] hover:bg-[#121c15]'
                  : 'border-[#d1e5d7] bg-white text-[#13261a] hover:bg-[#e8f4ec]'
              }`}
            >
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e]" />
                <span>Tap</span>
              </div>
            </button>
          </div>

          {/* Right: Sound, Volume, Insert Tempo & Collapse */}
          <div className="flex items-center gap-2">
            {/* Quick Insert to Song */}
            {editor && (
              <button
                onClick={insertTempoToEditor}
                title="Insert [Tempo: 120 BPM] into manuscript"
                className="hidden lg:flex items-center gap-1 px-2 py-1 text-[11px] uppercase tracking-wider font-bold rounded-none border border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410] hover:bg-[#f4faf6] dark:hover:bg-[#121c15] text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
              >
                <Tag className="w-3 h-3 text-[#ea580c] dark:text-[#22c55e]" />
                <span>Stamp Tempo</span>
              </button>
            )}

            {/* Toggle Sound / Settings Expand */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title="More Metronome Audio Settings"
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-none border transition-colors ${
                isExpanded
                  ? isDark
                    ? 'bg-[#22c55e] text-black border-[#22c55e] font-bold'
                    : 'bg-[#ea580c] text-white border-[#ea580c] font-bold'
                  : 'border-[#d1e5d7] dark:border-[#1a3022] bg-white dark:bg-[#0d1410] text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#13261a] dark:hover:text-[#e5fbf0]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] uppercase font-bold tracking-wider">Audio</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Close Bar */}
            <button
              onClick={() => {
                metronomeEngine.stop();
                setIsPlaying(false);
                onClose();
              }}
              title="Hide Metronome"
              className="p-1 text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e] rounded-none border border-transparent hover:border-[#d1e5d7] dark:hover:border-[#1a3022]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Sound & Time Signature Settings */}
        {isExpanded && (
          <div className={`pt-2.5 mt-1 border-t flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-150 ${
            isDark ? 'border-[#1a3022]' : 'border-[#d1e5d7]'
          }`}>
            {/* Time Signatures */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5e7a68] dark:text-[#6f9c7d]">Time Sig:</span>
              {(['4/4', '3/4', '2/4', '6/8'] as TimeSignature[]).map((ts) => (
                <button
                  key={ts}
                  onClick={() => setTimeSignature(ts)}
                  className={`px-2 py-0.5 text-xs font-mono font-bold rounded-none border transition-colors ${
                    timeSignature === ts
                      ? isDark
                        ? 'bg-[#22c55e] text-black border-[#22c55e]'
                        : 'bg-[#ea580c] text-white border-[#ea580c]'
                      : isDark
                      ? 'border-[#1a3022] bg-[#0d1410] text-[#6f9c7d] hover:text-[#22c55e]'
                      : 'border-[#d1e5d7] bg-white text-[#5e7a68] hover:text-[#ea580c]'
                  }`}
                >
                  {ts}
                </button>
              ))}
            </div>

            {/* Sound Choice */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5e7a68] dark:text-[#6f9c7d]">Sound:</span>
              {(
                [
                  { id: 'woodblock', label: 'Woodblock' },
                  { id: 'click', label: 'Studio Click' },
                  { id: 'digital', label: 'Digital Beep' },
                  { id: 'cowbell', label: '808 Percussion' }
                ] as Array<{ id: MetronomeSound; label: string }>
              ).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSound(s.id)}
                  className={`px-2 py-0.5 text-xs font-sans rounded-none border transition-colors ${
                    sound === s.id
                      ? isDark
                        ? 'bg-[#22c55e] text-black border-[#22c55e] font-bold'
                        : 'bg-[#ea580c] text-white border-[#ea580c] font-bold'
                      : isDark
                      ? 'border-[#1a3022] bg-[#0d1410] text-[#6f9c7d] hover:text-[#22c55e]'
                      : 'border-[#d1e5d7] bg-white text-[#5e7a68] hover:text-[#ea580c]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Volume & Accent Toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-[#5e7a68] dark:text-[#6f9c7d] cursor-pointer">
                <input
                  type="checkbox"
                  checked={accentBeatOne}
                  onChange={(e) => setAccentBeatOne(e.target.checked)}
                  className="rounded-none accent-[#ea580c] dark:accent-[#22c55e]"
                />
                <span>Accent Beat 1</span>
              </label>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1 text-[#5e7a68] dark:text-[#6f9c7d] hover:text-[#ea580c] dark:hover:text-[#22c55e]"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-20 accent-[#ea580c] dark:accent-[#22c55e] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
