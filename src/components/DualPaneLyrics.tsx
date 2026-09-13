import React, { useState } from 'react';
import { LyricStanza, StanzaLine } from '../types';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { LyricVoicePlayer } from '../utils/audioSpeech';

interface DualPaneLyricsProps {
  stanzas: LyricStanza[];
  targetLanguage: string;
  sourceLanguage?: string;
  showPhonetic?: boolean;
}

export const DualPaneLyrics: React.FC<DualPaneLyricsProps> = ({
  stanzas,
  targetLanguage,
  sourceLanguage = 'Original',
  showPhonetic = true,
}) => {
  const [hoveredLineKey, setHoveredLineKey] = useState<string | null>(null);
  const [playingLineKey, setPlayingLineKey] = useState<string | null>(null);

  const handleSpeakLine = (lineKey: string, text: string) => {
    if (playingLineKey === lineKey) {
      LyricVoicePlayer.stop();
      setPlayingLineKey(null);
      return;
    }

    setPlayingLineKey(lineKey);
    LyricVoicePlayer.speak({
      text,
      langCode: targetLanguage,
      rate: 0.9,
      onEnd: () => setPlayingLineKey(null),
      onError: () => setPlayingLineKey(null),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          <span>Hover over any line to highlight its corresponding poetic translation</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px] text-stone-600">
              𝅘𝅥 = Syllables
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 font-mono text-[10px] text-amber-800">
              A/B = Rhyme
            </span>
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {stanzas.map((stanza, sIdx) => (
          <div
            key={sIdx}
            className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden"
          >
            {/* Stanza Header */}
            <div className="px-4 py-2.5 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-xs font-heading font-semibold text-stone-800 uppercase tracking-wider">
                  {stanza.stanzaType || `Stanza ${stanza.stanzaNumber || sIdx + 1}`}
                </span>
              </div>
              <span className="text-[11px] text-stone-700">
                {stanza.lines.length} lines
              </span>
            </div>

            {/* Stanza Content: Dual Columns */}
            <div className="divide-y divide-stone-100">
              {stanza.lines.map((line, lIdx) => {
                const lineKey = `${sIdx}-${lIdx}`;
                const isHovered = hoveredLineKey === lineKey;
                const isSpeaking = playingLineKey === lineKey;

                return (
                  <div
                    key={lIdx}
                    onMouseEnter={() => setHoveredLineKey(lineKey)}
                    onMouseLeave={() => setHoveredLineKey(null)}
                    className={`grid grid-cols-1 md:grid-cols-2 transition-colors ${
                      isHovered ? 'bg-amber-50/50' : 'hover:bg-stone-50/70'
                    }`}
                  >
                    {/* Left Column: Original */}
                    <div className="p-3.5 sm:px-5 sm:py-3.5 border-b md:border-b-0 md:border-r border-stone-100 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-[11px] text-stone-600 font-mono select-none w-5 pt-0.5 shrink-0">
                          {lIdx + 1}
                        </span>
                        <div>
                          <p className="font-lyric text-base sm:text-lg text-stone-700 leading-snug">
                            {line.original}
                          </p>
                          {line.rhythmNote && (
                            <p className="text-[11px] text-stone-600 mt-1 italic">
                              {line.rhythmNote}
                            </p>
                          )}
                        </div>
                      </div>

                      {line.syllableOriginal !== undefined && (
                        <span
                          title={`Original syllable count: ${line.syllableOriginal}`}
                          className="shrink-0 text-[11px] font-mono text-stone-600 px-1.5 py-0.5 rounded bg-stone-100"
                        >
                          {line.syllableOriginal} 𝅘𝅥
                        </span>
                      )}
                    </div>

                    {/* Right Column: Poetic Translation */}
                    <div className="p-3.5 sm:px-5 sm:py-3.5 flex items-start justify-between gap-3 bg-amber-50/20 md:bg-transparent">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-[11px] text-amber-700/60 font-mono select-none w-5 pt-0.5 shrink-0 hidden md:inline-block">
                          {lIdx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-lyric text-base sm:text-lg text-stone-900 font-medium leading-snug">
                            {line.translated}
                          </p>

                          {showPhonetic && line.phonetic && (
                            <p className="text-xs text-amber-900/80 font-mono mt-1">
                              {line.phonetic}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {line.rhymeTag && (
                          <span
                            title={`Rhyme marker: ${line.rhymeTag}`}
                            className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-amber-100/80 text-amber-900 border border-amber-200"
                          >
                            {line.rhymeTag}
                          </span>
                        )}

                        {line.syllableTranslated !== undefined && (
                          <span
                            title={`Translated syllable count: ${line.syllableTranslated}`}
                            className="text-[11px] font-mono text-stone-600 px-1.5 py-0.5 rounded bg-stone-100"
                          >
                            {line.syllableTranslated} 𝅘𝅥
                          </span>
                        )}

                        <button
                          type="button"
                          title="Listen to line cadence"
                          onClick={() => handleSpeakLine(lineKey, line.translated)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSpeaking
                              ? 'bg-amber-600 text-white'
                              : 'text-stone-400 hover:text-amber-800 hover:bg-amber-100/60'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
