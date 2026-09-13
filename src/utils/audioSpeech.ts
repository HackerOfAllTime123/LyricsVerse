// Speech synthesis helper for speaking poetic translated lyrics with natural cadence

export interface SpeechOptions {
  text: string;
  langCode: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

const LANGUAGE_CODE_MAP: Record<string, string> = {
  Spanish: 'es-ES',
  English: 'en-US',
  French: 'fr-FR',
  German: 'de-DE',
  Italian: 'it-IT',
  Portuguese: 'pt-BR',
  Japanese: 'ja-JP',
  Korean: 'ko-KR',
  'Mandarin Chinese': 'zh-CN',
  Russian: 'ru-RU',
  Arabic: 'ar-SA',
  Hindi: 'hi-IN',
  Dutch: 'nl-NL',
  Swedish: 'sv-SE',
  Turkish: 'tr-TR',
  Greek: 'el-GR',
};

export class LyricVoicePlayer {
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static speak(options: SpeechOptions): void {
    if (!this.isSupported()) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(options.text);
    const targetLang = LANGUAGE_CODE_MAP[options.langCode] || 'en-US';
    utterance.lang = targetLang;
    utterance.rate = options.rate || 0.95; // Slightly measured musical cadence
    utterance.pitch = options.pitch || 1.0;

    // Try to pick a natural high-quality voice for the target language if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.startsWith(targetLang.slice(0, 2)) && !v.name.includes('Google')
    ) || voices.find((v) => v.lang.startsWith(targetLang.slice(0, 2)));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options.onError?.(e);
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public static pause(): void {
    if (this.isSupported() && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public static resume(): void {
    if (this.isSupported() && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public static stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public static isPlaying(): boolean {
    return Boolean(this.isSupported() && window.speechSynthesis.speaking && !window.speechSynthesis.paused);
  }

  public static isPaused(): boolean {
    return Boolean(this.isSupported() && window.speechSynthesis.paused);
  }
}
