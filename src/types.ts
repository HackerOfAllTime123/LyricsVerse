export type TranslationStyle = 'singable' | 'poetic_fidelity' | 'balanced';

export interface TranslationRequest {
  lyrics: string;
  targetLanguage: string;
  sourceLanguage?: string;
  genre?: string;
  tempo?: string;
  translationStyle: TranslationStyle;
  includePhonetic?: boolean;
  songTitle?: string;
  artist?: string;
}

export interface StanzaLine {
  original: string;
  translated: string;
  phonetic?: string;
  syllableOriginal?: number;
  syllableTranslated?: number;
  rhythmNote?: string;
  rhymeTag?: string;
}

export interface LyricStanza {
  stanzaNumber: number;
  stanzaType?: string; // Verse 1, Chorus, Bridge, etc.
  lines: StanzaLine[];
}

export interface IdiomAdaptation {
  originalIdiom: string;
  literalMeaning: string;
  whyLiteralFails: string;
  poeticEquivalent: string;
  linguisticNuance: string;
  emotionalResonance: string;
}

export interface MetricAndCadence {
  meterDescription: string;
  rhymeSchemeSummary: string;
  singabilityScore: number; // 1-100
  vocalDeliveryTips: string[];
}

export interface TranslationResponse {
  songTitle?: string;
  detectedSourceLanguage: string;
  targetLanguage: string;
  summaryOverview: string;
  fullPoeticTranslation: string;
  stanzas: LyricStanza[];
  idiomAdaptations: IdiomAdaptation[];
  metricAndCadence: MetricAndCadence;
}

export interface PresetSong {
  id: string;
  title: string;
  artist: string;
  genre: string;
  sourceLanguage: string;
  defaultTarget: string;
  lyrics: string;
  tempo: string;
  description: string;
}
