import React, { useState } from 'react';
import {
  TranslationRequest,
  TranslationStyle,
  PresetSong,
} from '../types';
import {
  TARGET_LANGUAGES,
  GENRE_OPTIONS,
  TEMPO_OPTIONS,
  PRESET_SONGS,
} from '../data/presets';
import {
  Sparkles,
  Music,
  Sliders,
  Feather,
  Globe,
  Mic,
  BookOpen,
  RotateCcw,
  Check,
} from 'lucide-react';

interface TranslationFormProps {
  onSubmit: (request: TranslationRequest) => void;
  isLoading: boolean;
  onSelectPreset: (preset: PresetSong) => void;
  currentLyrics: string;
  setLyrics: (val: string) => void;
  songTitle: string;
  setSongTitle: (val: string) => void;
  artist: string;
  setArtist: (val: string) => void;
  targetLang: string;
  setTargetLang: (val: string) => void;
  sourceLang: string;
  setSourceLang: (val: string) => void;
  genre: string;
  setGenre: (val: string) => void;
  tempo: string;
  setTempo: (val: string) => void;
  translationStyle: TranslationStyle;
  setTranslationStyle: (val: TranslationStyle) => void;
  includePhonetic: boolean;
  setIncludePhonetic: (val: boolean) => void;
}

export const TranslationForm: React.FC<TranslationFormProps> = ({
  onSubmit,
  isLoading,
  onSelectPreset,
  currentLyrics,
  setLyrics,
  songTitle,
  setSongTitle,
  artist,
  setArtist,
  targetLang,
  setTargetLang,
  sourceLang,
  setSourceLang,
  genre,
  setGenre,
  tempo,
  setTempo,
  translationStyle,
  setTranslationStyle,
  includePhonetic,
  setIncludePhonetic,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLyrics.trim() || isLoading) return;

    onSubmit({
      lyrics: currentLyrics,
      targetLanguage: targetLang,
      sourceLanguage: sourceLang,
      songTitle,
      artist,
      genre,
      tempo,
      translationStyle,
      includePhonetic,
    });
  };

  const lineCount = currentLyrics
    ? currentLyrics.split('\n').filter((l) => l.trim().length > 0).length
    : 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Preset Chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Quick Song Samples (Idioms & Poetry)
          </label>
          <span className="text-[11px] text-stone-600">Click any to test</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SONGS.slice(0, 5).map((song) => (
            <button
              key={song.id}
              type="button"
              id={`chip-${song.id}`}
              onClick={() => onSelectPreset(song)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100/90 text-stone-700 hover:bg-amber-100 hover:text-amber-950 border border-stone-200 hover:border-amber-300 transition-colors"
            >
              <Music className="w-3 h-3 text-amber-700" />
              <span>{song.title}</span>
              <span className="text-stone-600 text-[10px]">({song.artist})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Lyrics Text Area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="lyrics-input"
            className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5"
          >
            <Feather className="w-3.5 h-3.5 text-amber-700" />
            Music Lyrics to Translate
          </label>
          <div className="flex items-center gap-3 text-xs text-stone-600">
            <span>{lineCount} lines</span>
            <span>•</span>
            <span>{currentLyrics.length} chars</span>
            {currentLyrics && (
              <button
                type="button"
                onClick={() => {
                  setLyrics('');
                  setSongTitle('');
                  setArtist('');
                }}
                className="text-stone-600 hover:text-rose-600 transition-colors text-xs flex items-center gap-1"
                title="Clear lyrics"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="relative rounded-xl border border-stone-300 bg-stone-50/40 focus-within:border-amber-700 focus-within:ring-2 focus-within:ring-amber-700/20 transition-all">
          <textarea
            id="lyrics-input"
            rows={8}
            value={currentLyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder="Paste your song lyrics here (verses, chorus, bridge)...
Example:
'The scars of your love remind me of us
They keep me thinking that we almost had it all
Rolling in the deep...'"
            className="w-full p-4 text-base font-lyric text-stone-900 bg-transparent resize-y outline-none leading-relaxed placeholder:text-stone-400"
            required
          />
        </div>
      </div>

      {/* Language & Style Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Source Language */}
        <div>
          <label
            htmlFor="source-lang-select"
            className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
          >
            Source Language
          </label>
          <select
            id="source-lang-select"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          >
            <option value="Auto-detect">Auto-detect Language</option>
            {TARGET_LANGUAGES.map((l) => (
              <option key={`src-${l.code}`} value={l.name}>
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Target Language */}
        <div>
          <label
            htmlFor="target-lang-select"
            className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
          >
            Target Language
          </label>
          <select
            id="target-lang-select"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 font-medium"
          >
            {TARGET_LANGUAGES.map((l) => (
              <option key={`tgt-${l.code}`} value={l.name}>
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Translation Priority / Style */}
        <div>
          <label
            htmlFor="translation-style-select"
            className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
          >
            Translation Philosophy
          </label>
          <select
            id="translation-style-select"
            value={translationStyle}
            onChange={(e) => setTranslationStyle(e.target.value as TranslationStyle)}
            className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          >
            <option value="balanced">Balanced Literary & Rhythmic</option>
            <option value="singable">Singable & Meter-Matched</option>
            <option value="poetic_fidelity">Deep Poetic Imagery & Metaphors</option>
          </select>
        </div>
      </div>

      {/* Toggle Advanced Musical Context */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 hover:text-amber-950 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showAdvanced ? 'Hide Musical Details' : 'Add Song Details (Genre, Tempo, Artist)'}</span>
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Song Title (Optional)
              </label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="e.g. Rolling in the Deep"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:border-amber-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Artist / Composer
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="e.g. Adele"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:border-amber-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Musical Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:border-amber-700"
              >
                {GENRE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tempo & Feel
              </label>
              <select
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:border-amber-700"
              >
                {TEMPO_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Options Row & Submit */}
      <div className="pt-2 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includePhonetic}
            onChange={(e) => setIncludePhonetic(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 text-amber-800 focus:ring-amber-700 cursor-pointer"
          />
          <span className="text-xs text-stone-700">
            Include phonetic romanization for singing non-Latin scripts (Romaji/Pinyin)
          </span>
        </label>

        <button
          id="translate-submit-btn"
          type="submit"
          disabled={isLoading || !currentLyrics.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-amber-200 border-t-transparent rounded-full animate-spin" />
              <span>Crafting Poetic Translation...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Translate Lyrics with Poetic Idioms</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
