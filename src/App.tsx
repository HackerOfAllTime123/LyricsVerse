import React, { useState } from 'react';
import { Header } from './components/Header';
import { TranslationForm } from './components/TranslationForm';
import { TranslationResult } from './components/TranslationResult';
import { PresetSelectorModal } from './components/PresetSelectorModal';
import {
  TranslationRequest,
  TranslationResponse,
  TranslationStyle,
  PresetSong,
} from './types';
import { PRESET_SONGS } from './data/presets';
import { Sparkles, AlertTriangle, Music, ArrowDown } from 'lucide-react';

export default function App() {
  const defaultPreset = PRESET_SONGS[0]; // Adele - Rolling in the Deep

  const [currentLyrics, setLyrics] = useState(defaultPreset.lyrics);
  const [songTitle, setSongTitle] = useState(defaultPreset.title);
  const [artist, setArtist] = useState(defaultPreset.artist);
  const [targetLang, setTargetLang] = useState(defaultPreset.defaultTarget);
  const [sourceLang, setSourceLang] = useState(defaultPreset.sourceLanguage);
  const [genre, setGenre] = useState(defaultPreset.genre);
  const [tempo, setTempo] = useState(defaultPreset.tempo);
  const [translationStyle, setTranslationStyle] = useState<TranslationStyle>('balanced');
  const [includePhonetic, setIncludePhonetic] = useState(true);

  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResponse | null>(null);

  const handleSelectPreset = (preset: PresetSong) => {
    setLyrics(preset.lyrics);
    setSongTitle(preset.title);
    setArtist(preset.artist);
    setSourceLang(preset.sourceLanguage);
    setTargetLang(preset.defaultTarget);
    setGenre(preset.genre);
    setTempo(preset.tempo);
    setError(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleTranslate = async (req: TranslationRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/translate-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed. Please try again.');
      }

      setResult(data);
      // Smooth scroll to result
      setTimeout(() => {
        const el = document.getElementById('translation-output-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to generate poetic lyric translation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <Header
        onOpenPresets={() => setIsPresetsOpen(true)}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Intro Hero banner */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-semibold tracking-wide border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Expert Literary Translation for Song Lyrics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-900 tracking-tight leading-tight">
            Preserve emotion, rhythm & idioms across languages.
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Never translate idioms literally. LyricPoet transforms figures of speech into culturally resonant equivalents that preserve the original musicality, meter, and emotional impact.
          </p>
        </section>

        {/* Translation Input Form */}
        <section>
          <TranslationForm
            onSubmit={handleTranslate}
            isLoading={isLoading}
            onSelectPreset={handleSelectPreset}
            currentLyrics={currentLyrics}
            setLyrics={setLyrics}
            songTitle={songTitle}
            setSongTitle={setSongTitle}
            artist={artist}
            setArtist={setArtist}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            genre={genre}
            setGenre={setGenre}
            tempo={tempo}
            setTempo={setTempo}
            translationStyle={translationStyle}
            setTranslationStyle={setTranslationStyle}
            includePhonetic={includePhonetic}
            setIncludePhonetic={setIncludePhonetic}
          />
        </section>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Translation Notice</p>
              <p className="text-xs text-rose-800 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Indicator when submitting */}
        {isLoading && !result && (
          <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4 animate-in fade-in">
            <div className="relative w-12 h-12 mx-auto">
              <div className="w-12 h-12 rounded-full border-3 border-amber-200 border-t-amber-800 animate-spin" />
              <Music className="w-5 h-5 text-amber-800 absolute inset-0 m-auto" />
            </div>
            <div>
              <h3 className="text-base font-heading font-semibold text-stone-900">
                Linguist Analyzing Rhyme, Cadence & Idioms...
              </h3>
              <p className="text-xs text-stone-700 mt-1 max-w-md mx-auto">
                Finding poetic equivalents in {targetLang} that sing naturally to the music and honor the original emotion.
              </p>
            </div>
          </div>
        )}

        {/* Translation Output Result */}
        {result && (
          <section id="translation-output-section" className="scroll-mt-20">
            <TranslationResult
              result={result}
              songTitle={songTitle}
              artist={artist}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-100/60 py-6 text-center text-xs text-stone-700">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold text-stone-800">LyricPoet</span>
            <span>•</span>
            <span>Literary & Linguistic Music Translation</span>
          </div>
          <p className="text-[11px] text-stone-600">
            Powered by Gemini AI • Poetic idiom adaptation & musical rhythm preservation
          </p>
        </div>
      </footer>

      {/* Preset Picker Modal */}
      <PresetSelectorModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelect={handleSelectPreset}
      />
    </div>
  );
}
