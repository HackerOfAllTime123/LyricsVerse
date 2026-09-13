import React from 'react';
import { IdiomAdaptation } from '../types';
import { Sparkles, AlertCircle, CheckCircle2, BookHeart, Compass, ArrowRight } from 'lucide-react';

interface IdiomBreakdownProps {
  idioms: IdiomAdaptation[];
  targetLanguage: string;
}

export const IdiomBreakdown: React.FC<IdiomBreakdownProps> = ({ idioms, targetLanguage }) => {
  if (!idioms || idioms.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-500">
        <p>No prominent idioms or figures of speech detected in this excerpt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <BookHeart className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-amber-950 font-heading">
            Literary & Idiomatic Transformations ({idioms.length})
          </h3>
          <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
            As an expert lyricist and linguist, literal translation of idioms is strictly avoided. Below are the cultural and poetic equivalents crafted to preserve the raw emotion, musical cadence, and poetic depth in {targetLanguage}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {idioms.map((item, idx) => (
          <div
            key={idx}
            id={`idiom-card-${idx}`}
            className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:border-amber-300"
          >
            {/* Card Header: Original -> Poetic Equivalent */}
            <div className="p-4 bg-stone-50/80 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700">
                  Idiom #{idx + 1}
                </span>
                <span className="text-base font-semibold text-stone-900 font-lyric italic">
                  "{item.originalIdiom}"
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Poetic Equivalent:</span>
                <span className="font-lyric text-emerald-950 font-bold text-sm">
                  "{item.poeticEquivalent}"
                </span>
              </div>
            </div>

            {/* Card Body: Comparison */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Clunky Literal Translation vs Poetic Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-rose-50/50 border border-rose-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800 mb-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Flawed Literal Translation:</span>
                  </div>
                  <p className="text-xs text-stone-800 font-medium line-through decoration-rose-400">
                    "{item.literalMeaning}"
                  </p>
                  <p className="text-[11px] text-rose-700 mt-1.5 leading-snug">
                    <span className="font-medium">Why it fails:</span> {item.whyLiteralFails}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-50/40 border border-emerald-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Linguistic Nuance:</span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed">
                    {item.linguisticNuance}
                  </p>
                </div>
              </div>

              {/* Emotional Resonance Bar */}
              <div className="pt-2 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-600">
                <Compass className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Emotional & Poetic Resonance: </span>
                  <span>{item.emotionalResonance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
