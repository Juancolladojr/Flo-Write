// Web Audio API Metronome Engine with zero-drift lookahead scheduling

export type MetronomeSound = 'woodblock' | 'click' | 'digital' | 'cowbell';

export type TimeSignature = '4/4' | '3/4' | '2/4' | '6/8';

export interface MetronomeConfig {
  bpm: number;
  beatsPerMeasure: number;
  sound: MetronomeSound;
  volume: number; // 0 to 1
  accentBeatOne: boolean;
}

class MetronomeAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isRunning: boolean = false;
  private bpm: number = 120;
  private beatsPerMeasure: number = 4;
  private sound: MetronomeSound = 'woodblock';
  private volume: number = 0.8;
  private accentBeatOne: boolean = true;

  private currentBeat: number = 0;
  private nextNoteTime: number = 0;
  private timerId: number | null = null;
  private lookaheadMs: number = 25; // How often to check for scheduling (ms)
  private scheduleAheadSec: number = 0.1; // How far ahead to schedule audio (sec)

  private onBeatCallbacks: Array<(beatIndex: number, totalBeats: number, isAccent: boolean) => void> = [];

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private initAudio() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public subscribeBeat(cb: (beatIndex: number, totalBeats: number, isAccent: boolean) => void) {
    this.onBeatCallbacks.push(cb);
    return () => {
      this.onBeatCallbacks = this.onBeatCallbacks.filter((c) => c !== cb);
    };
  }

  private notifyBeat(beatIndex: number, isAccent: boolean) {
    for (const cb of this.onBeatCallbacks) {
      cb(beatIndex, this.beatsPerMeasure, isAccent);
    }
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(30, Math.min(300, Math.round(newBpm)));
  }

  public getBpm(): number {
    return this.bpm;
  }

  public setTimeSignature(ts: TimeSignature) {
    switch (ts) {
      case '3/4':
        this.beatsPerMeasure = 3;
        break;
      case '2/4':
        this.beatsPerMeasure = 2;
        break;
      case '6/8':
        this.beatsPerMeasure = 6;
        break;
      case '4/4':
      default:
        this.beatsPerMeasure = 4;
        break;
    }
    this.currentBeat = 0;
  }

  public setSound(sound: MetronomeSound) {
    this.sound = sound;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public setAccent(accent: boolean) {
    this.accentBeatOne = accent;
  }

  public start() {
    if (this.isRunning) return;
    this.initAudio();
    if (!this.audioCtx) return;

    this.isRunning = true;
    this.currentBeat = 0;
    this.nextNoteTime = this.audioCtx.currentTime + 0.05;

    this.scheduler();
  }

  public stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
  }

  private scheduleNote(beatNumber: number, time: number) {
    if (!this.audioCtx) return;

    const isAccent = beatNumber === 0 && this.accentBeatOne;

    // Trigger visual beat indicator via setTimeout aligned to audio context time
    const timeDelta = Math.max(0, (time - this.audioCtx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isRunning) {
        this.notifyBeat(beatNumber, isAccent);
      }
    }, timeDelta);

    // Audio synthesis according to selected sound preset
    this.playTone(time, isAccent);
  }

  private playTone(time: number, isAccent: boolean) {
    if (!this.audioCtx || this.volume <= 0) return;

    const ctx = this.audioCtx;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    if (this.sound === 'woodblock') {
      // Warm resonant woodblock tone
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      const freq = isAccent ? 1250 : 900;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.04);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.5, time);
      osc2.frequency.exponentialRampToValueAtTime(freq * 0.8, time + 0.03);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime((isAccent ? 1.0 : 0.65) * this.volume, time + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      osc.connect(gainNode);
      osc2.connect(gainNode);

      osc.start(time);
      osc2.start(time);
      osc.stop(time + 0.055);
      osc2.stop(time + 0.055);

    } else if (this.sound === 'digital') {
      // Electronic digital blip
      const osc = ctx.createOscillator();
      const freq = isAccent ? 1760 : 880; // A6 or A5
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime((isAccent ? 0.6 : 0.35) * this.volume, time + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

      osc.connect(gainNode);
      osc.start(time);
      osc.stop(time + 0.045);

    } else if (this.sound === 'cowbell') {
      // Classic 808-style cowbell harmonics
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      const baseFreq = isAccent ? 800 : 540;
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(baseFreq, time);
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, time);

      // Bandpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 1.2, time);
      filter.Q.setValueAtTime(3.0, time);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime((isAccent ? 0.7 : 0.45) * this.volume, time + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + 0.085);
      osc2.stop(time + 0.085);

    } else {
      // Studio transient click
      const osc = ctx.createOscillator();
      const freq = isAccent ? 2200 : 1500;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(100, time + 0.015);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime((isAccent ? 0.9 : 0.5) * this.volume, time + 0.001);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

      osc.connect(gainNode);
      osc.start(time);
      osc.stop(time + 0.025);
    }
  }

  private scheduler = () => {
    if (!this.isRunning || !this.audioCtx) return;

    // While there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadSec) {
      this.scheduleNote(this.currentBeat, this.nextNoteTime);
      this.nextNote();
    }

    this.timerId = window.setTimeout(this.scheduler, this.lookaheadMs);
  };
}

export const metronomeEngine = new MetronomeAudioEngine();
