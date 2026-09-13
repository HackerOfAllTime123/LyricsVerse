import React from 'react';
import { Music, Sparkles, BookOpen, Feather } from 'lucide-react';

interface HeaderProps {
  onOpenPresets: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPresets, onReset }) => {
  return (
    <header className="border-b border-stone-200 bg-stone-50/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-50 flex items-center justify-center shadow-sm">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-heading font-bold tracking-wide text-stone-900">
                LyricPoet
              </h1>
              <span className="hidden sm:inline-flex text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
                Literary Translator
              </span>
            </div>
            <p className="text-xs text-stone-700 hidden md:block">
              Music lyrics translation preserving poetic idioms, rhythm, and emotion
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            id="browse-song-presets-btn"
            type="button"
            onClick={onOpenPresets}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Famous Song Samples</span>
          </button>
        </div>
      </div>
    </header>
  );
};
