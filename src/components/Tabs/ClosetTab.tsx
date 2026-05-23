import React from 'react';
import { Shirt, Search, SlidersHorizontal, Heart, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { ClothingItem } from '../../types';

interface ClosetTabProps {
  closet: ClothingItem[];
  closetCategoryFilter: string;
  setClosetCategoryFilter: (cat: string) => void;
  circularPalette: Array<{ hex: string; name: string }>;
}

export function ClosetTab({
  closet,
  closetCategoryFilter,
  setClosetCategoryFilter,
  circularPalette
}: ClosetTabProps) {
  return (
    <div className="px-6 pt-6 pb-24 space-y-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-stone-900">
            Closet
          </h2>
          <p className="text-stone-500 text-sm mt-1">Seu acervo digital organizado</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 shadow-sm hover:bg-stone-50">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-sm hover:bg-stone-800">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
        {[
          { key: 'todas', label: 'Tudo' },
          { key: 'top', label: 'Tops' },
          { key: 'bottom', label: 'Bottoms' },
          { key: 'outerwear', label: 'Casacos/Vestidos' },
          { key: 'shoes', label: 'Sapatos' },
          { key: 'accessory', label: 'Acessórios' }
        ].map(col => (
          <button
            key={col.key}
            onClick={() => setClosetCategoryFilter(col.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              closetCategoryFilter === col.key 
                ? 'bg-stone-900 text-white shadow-md' 
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total items */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between h-32 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-serif text-stone-900 block">{closet.length + 84}</span>
            <span className="text-xs text-stone-500 font-medium uppercase tracking-wide mt-1 block">Peças Ativas</span>
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between h-32 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-2xl font-serif text-stone-900 block">24</span>
            <span className="text-xs text-stone-500 font-medium uppercase tracking-wide mt-1 block">Favoritas</span>
          </div>
        </div>
      </div>

      {/* Colors Analysis */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-serif font-medium text-stone-900">Paleta do seu armário</span>
        </div>

        <div className="flex items-center justify-between">
          {circularPalette.slice(0,6).map((col, cIdx) => (
            <div 
              key={cIdx} 
              className="w-10 h-10 rounded-full border border-stone-200/80 cursor-pointer shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
          <div className="w-10 h-10 rounded-full border border-dashed border-stone-400 bg-stone-50 cursor-pointer flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all font-light text-xl">
            +
          </div>
        </div>

        <div className="bg-rose-50/50 border border-rose-100/50 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left flex-grow">
            <p className="text-sm font-medium text-stone-900">Dominância Neutra</p>
            <p className="text-xs text-stone-500 mt-1">
              70% das suas peças são neutras. Ótimo para versatilidade.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </div>
      </div>
    </div>
  );
}
