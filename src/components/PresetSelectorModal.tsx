import React from 'react';
import { PRESET_SONGS } from '../data/presets';
import { PresetSong } from '../types';
import { X, Music2, ArrowRight, Sparkles } from 'lucide-react';

interface PresetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (preset: PresetSong) => void;
}

export const PresetSelectorModal: React.FC<PresetSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-lg font-heading font-bold text-stone-900 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-amber-700" />
              Song Excerpt Presets
            </h2>
            <p className="text-xs text-stone-700 mt-0.5">
              Select a world-renowned song packed with rich metaphors and cultural idioms
            </p>
          </div>
          <button
            id="close-presets-modal-btn"
            type="button"
            onClick={onClose}
            className="text-stone-600 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4 max-h-[70vh] overflow-y-auto p-1">
          {PRESET_SONGS.map((song) => (
            <div
              key={song.id}
              id={`preset-card-${song.id}`}
              onClick={() => {
                onSelect(song);
                onClose();
              }}
              className="group p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-amber-50/40 hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    {song.genre}
                  </span>
                  <span className="text-[11px] text-stone-600">
                    {song.sourceLanguage} → {song.defaultTarget}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-stone-900 mt-2 text-base group-hover:text-amber-900 transition-colors">
                  {song.title}
                </h3>
                <p className="text-xs font-medium text-stone-700">by {song.artist}</p>
                <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                  {song.description}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-medium text-amber-800 group-hover:translate-x-0.5 transition-transform">
                <span className="text-stone-600 font-normal">Click to load lyrics</span>
                <span className="flex items-center gap-1">
                  Load <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
