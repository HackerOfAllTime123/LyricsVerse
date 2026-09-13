import React from 'react';
import { MetricAndCadence } from '../types';
import { Mic, Activity, Music, Sparkles, Check, Flame } from 'lucide-react';

interface MetricCadenceViewProps {
  metrics: MetricAndCadence;
  targetLanguage: string;
}

export const MetricCadenceView: React.FC<MetricCadenceViewProps> = ({
  metrics,
  targetLanguage,
}) => {
  const score = metrics.singabilityScore || 85;

  return (
    <div className="space-y-5">
      {/* Top Cards: Singability & Rhyme Scheme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Singability Score */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Vocal Singability
            </span>
            <Mic className="w-4 h-4 text-amber-700" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl font-heading font-bold text-stone-900">
              {score}
            </span>
            <span className="text-xs text-stone-600 font-medium">/ 100</span>
          </div>
          <div>
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  score >= 85
                    ? 'bg-emerald-600'
                    : score >= 70
                    ? 'bg-amber-600'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-600 mt-2">
              {score >= 85
                ? 'High melodic alignment, natural stresses for singing'
                : 'Poetically rich with moderate rhythmic flexibility'}
            </p>
          </div>
        </div>

        {/* Meter Cadence */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Rhythm & Metric Cadence
            </span>
            <Activity className="w-4 h-4 text-amber-700" />
          </div>
          <div className="my-2">
            <p className="text-sm font-medium text-stone-900 leading-relaxed">
              {metrics.meterDescription}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700">
            <span className="font-semibold text-stone-800">Rhyme Scheme:</span>
            <span className="font-mono bg-stone-100 px-2.5 py-0.5 rounded text-amber-900 font-medium">
              {metrics.rhymeSchemeSummary || 'AABB / Slant Rhyme'}
            </span>
          </div>
        </div>
      </div>

      {/* Vocal Delivery Tips for singers */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
            <Music className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-stone-900 font-heading">
            Vocalist & Performer Delivery Guidelines ({targetLanguage})
          </h3>
        </div>

        <p className="text-xs text-stone-700 mb-4">
          Key linguistic and breath placement tips when performing these translated lyrics to the original music:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {metrics.vocalDeliveryTips?.map((tip, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-2.5"
            >
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
