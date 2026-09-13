import React, { useState, useEffect } from 'react';
import { TranslationResponse } from '../types';
import { DualPaneLyrics } from './DualPaneLyrics';
import { IdiomBreakdown } from './IdiomBreakdown';
import { MetricCadenceView } from './MetricCadenceView';
import {
  Sparkles,
  Columns,
  BookHeart,
  Activity,
  FileText,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Copy,
  Check,
  Download,
  Music,
  Share2,
} from 'lucide-react';
import { LyricVoicePlayer } from '../utils/audioSpeech';

interface TranslationResultProps {
  result: TranslationResponse;
  songTitle?: string;
  artist?: string;
}

type TabType = 'dual' | 'idioms' | 'metrics' | 'manuscript';

export const TranslationResult: React.FC<TranslationResultProps> = ({
  result,
  songTitle,
  artist,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dual');
  const [copied, setCopied] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);

  const displayTitle = result.songTitle || songTitle || 'Music Lyric Translation';
  const displayArtist = artist ? `by ${artist}` : '';

  useEffect(() => {
    return () => {
      LyricVoicePlayer.stop();
    };
  }, [result]);

  const handleTogglePlayFull = () => {
    if (isPlayingFull) {
      LyricVoicePlayer.stop();
      setIsPlayingFull(false);
      return;
    }

    setIsPlayingFull(true);
    LyricVoicePlayer.speak({
      text: result.fullPoeticTranslation,
      langCode: result.targetLanguage,
      rate: speechRate,
      onEnd: () => setIsPlayingFull(false),
      onError: () => setIsPlayingFull(false),
    });
  };

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(result.fullPoeticTranslation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `LYRICPOET TRANSLATION
Song: ${displayTitle} ${displayArtist}
Language: ${result.detectedSourceLanguage} → ${result.targetLanguage}

=== POETIC TRANSLATION ===
${result.fullPoeticTranslation}

=== LINGUIST & POETIC OVERVIEW ===
${result.summaryOverview}

=== METRIC & CADENCE ===
Meter: ${result.metricAndCadence.meterDescription}
Rhyme Scheme: ${result.metricAndCadence.rhymeSchemeSummary}
Singability Score: ${result.metricAndCadence.singabilityScore}/100

=== IDIOMATIC & POETIC TRANSFORMATIONS ===
${result.idiomAdaptations
  .map(
    (i, idx) =>
      `${idx + 1}. "${i.originalIdiom}"\n   • Literal (flawed): "${i.literalMeaning}" (Why it fails: ${i.whyLiteralFails})\n   • Poetic Equivalent: "${i.poeticEquivalent}"\n   • Nuance: ${i.linguisticNuance}\n   • Emotional Resonance: ${i.emotionalResonance}\n`
  )
  .join('\n')}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${displayTitle.replace(/\s+/g, '_')}_${result.targetLanguage}_PoeticTranslation.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Card: Overview & Audio Player Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                {result.detectedSourceLanguage} → {result.targetLanguage}
              </span>
              <span className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                Singability: {result.metricAndCadence.singabilityScore}/100
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-heading font-bold text-stone-900 mt-1">
              {displayTitle}
            </h2>
            {displayArtist && (
              <p className="text-sm font-medium text-stone-700">{displayArtist}</p>
            )}
          </div>

          {/* Action Buttons & Audio Bar */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Audio Cadence Listen Button */}
            <button
              id="play-poetic-lyrics-btn"
              type="button"
              onClick={handleTogglePlayFull}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingFull
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
              }`}
              title="Listen to the translated lyrics with Speech Cadence"
            >
              {isPlayingFull ? (
                <>
                  <Square className="w-3.5 h-3.5" />
                  <span>Stop Cadence</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Hear Lyric Cadence</span>
                </>
              )}
            </button>

            {/* Copy Translation */}
            <button
              id="copy-translation-btn"
              type="button"
              onClick={handleCopyTranslation}
              className="px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy translated lyrics"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Lyrics</span>
                </>
              )}
            </button>

            {/* Download Text */}
            <button
              id="download-analysis-btn"
              type="button"
              onClick={handleDownload}
              className="px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download text file with full analysis"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Linguist Overview Note */}
        <div className="mt-5 p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-950 font-heading">
              Literary & Poetic Strategy
            </span>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mt-1">
              {result.summaryOverview}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 gap-1 sm:gap-2 overflow-x-auto pb-px">
        <button
          id="tab-dual-btn"
          type="button"
          onClick={() => setActiveTab('dual')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-xl transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
            activeTab === 'dual'
              ? 'border-amber-800 text-amber-900 bg-white font-semibold'
              : 'border-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
          }`}
        >
          <Columns className="w-4 h-4" />
          <span>Side-by-Side Lyrics</span>
        </button>

        <button
          id="tab-idioms-btn"
          type="button"
          onClick={() => setActiveTab('idioms')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-xl transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
            activeTab === 'idioms'
              ? 'border-amber-800 text-amber-900 bg-white font-semibold'
              : 'border-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
          }`}
        >
          <BookHeart className="w-4 h-4" />
          <span>Idioms & Metaphors ({result.idiomAdaptations?.length || 0})</span>
        </button>

        <button
          id="tab-metrics-btn"
          type="button"
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-xl transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
            activeTab === 'metrics'
              ? 'border-amber-800 text-amber-900 bg-white font-semibold'
              : 'border-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Rhythm, Meter & Vocalist Guide</span>
        </button>

        <button
          id="tab-manuscript-btn"
          type="button"
          onClick={() => setActiveTab('manuscript')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-xl transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
            activeTab === 'manuscript'
              ? 'border-amber-800 text-amber-900 bg-white font-semibold'
              : 'border-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Manuscript View</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'dual' && (
          <DualPaneLyrics
            stanzas={result.stanzas}
            targetLanguage={result.targetLanguage}
            sourceLanguage={result.detectedSourceLanguage}
          />
        )}

        {activeTab === 'idioms' && (
          <IdiomBreakdown
            idioms={result.idiomAdaptations}
            targetLanguage={result.targetLanguage}
          />
        )}

        {activeTab === 'metrics' && (
          <MetricCadenceView
            metrics={result.metricAndCadence}
            targetLanguage={result.targetLanguage}
          />
        )}

        {activeTab === 'manuscript' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-10 shadow-xs max-w-3xl mx-auto">
            <div className="text-center pb-6 border-b border-stone-100">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-800">
                Poetic Translation in {result.targetLanguage}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 mt-2">
                {displayTitle}
              </h3>
              {displayArtist && (
                <p className="text-sm text-stone-700 mt-1 italic">{displayArtist}</p>
              )}
            </div>

            <div className="py-8 space-y-6 text-center">
              {result.fullPoeticTranslation
                .split('\n\n')
                .map((stanza, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {stanza.split('\n').map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className="font-lyric text-lg sm:text-xl text-stone-800 leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
              <span>Translated by LyricPoet (Gemini Literary AI)</span>
              <span>Preserving emotion, rhythm & idioms</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
