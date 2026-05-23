import React from 'react';
import { Search, SlidersHorizontal, Sun, Heart, Clock, Bookmark, Briefcase, Sparkles, ChevronRight } from 'lucide-react';

interface LooksTabProps {
  looksFilter: string;
  setLooksFilter: (filter: string) => void;
  MODEL_LOOK_PHOTOS: Record<string, string>;
  CAROUSEL_RECENT_LOOKS: Array<{date: string, image: string}>;
  onOpenMorningTab: () => void;
}

export function LooksTab({
  looksFilter,
  setLooksFilter,
  MODEL_LOOK_PHOTOS,
  CAROUSEL_RECENT_LOOKS,
  onOpenMorningTab
}: LooksTabProps) {
  return (
    <div className="px-6 pt-6 pb-24 space-y-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-stone-900">
            Stylebook
          </h2>
          <p className="text-stone-500 text-sm mt-1">Sua galeria de inspirações</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 shadow-sm hover:bg-stone-50">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 shadow-sm hover:bg-stone-50">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
        {[
          { key: 'para_hoje', label: 'Em Alta', icon: <Sun className="w-4 h-4" /> },
          { key: 'favoritos', label: 'Salvos', icon: <Heart className="w-4 h-4" /> },
          { key: 'usados', label: 'Histórico', icon: <Clock className="w-4 h-4" /> },
          { key: 'salvos', label: 'Coleções', icon: <Bookmark className="w-4 h-4" /> }
        ].map(p => (
          <button
            key={p.key}
            onClick={() => setLooksFilter(p.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              looksFilter === p.key 
                ? 'bg-rose-50 border border-rose-200 text-rose-700 shadow-sm' 
                : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {p.icon}
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Banner */}
      <div className="bg-[#FAF2EC] rounded-[2rem] p-6 border border-[#E8D4C8] relative overflow-hidden shadow-sm">
        <img 
          src={MODEL_LOOK_PHOTOS['cream-beige']} 
          alt="Seu look ideal model" 
          className="absolute right-0 top-0 bottom-0 w-32 h-full object-cover rounded-r-[2rem] opacity-90" 
          referrerPolicy="no-referrer"
        />
        
        <div className="max-w-[200px] space-y-4 text-left relative z-10">
          <span className="block text-xs font-medium text-stone-600 uppercase tracking-wide">Para seu dia</span>
          
          <div>
            <h4 className="text-xl font-serif text-stone-900 leading-tight">Focus Elegance</h4>
            <p className="text-sm text-stone-700 mt-1">
              Curadoria especial baseada no seu perfil.
            </p>
          </div>

          <button 
            onClick={onOpenMorningTab}
            className="mt-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full px-5 py-3 font-medium text-xs inline-flex items-center gap-2 shadow-sm transition-all"
          >
            Descobrir <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="space-y-4 text-left">
        <h4 className="text-lg font-serif text-stone-900">Editor's Pick</h4>

        <div className="grid grid-cols-2 gap-4">
          {/* Pick 1 */}
          <div className="bg-white border border-stone-200 p-2 rounded-3xl shadow-sm group cursor-pointer hover:shadow-md transition-all">
            <div className="relative aspect-[3/4] bg-stone-50 rounded-2xl overflow-hidden mb-3">
              <img src={MODEL_LOOK_PHOTOS['cream-beige']} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="px-2 pb-2">
              <span className="block text-sm font-semibold text-stone-900">Modern Classic</span>
              <span className="block text-xs text-stone-500 mt-1">Alfaiataria impecável</span>
            </div>
          </div>

          {/* Pick 2 */}
          <div className="bg-white border border-stone-200 p-2 rounded-3xl shadow-sm group cursor-pointer hover:shadow-md transition-all">
            <div className="relative aspect-[3/4] bg-stone-50 rounded-2xl overflow-hidden mb-3">
              <img src={MODEL_LOOK_PHOTOS['black-beige']} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="px-2 pb-2">
              <span className="block text-sm font-semibold text-stone-900">Noite & Minimal</span>
              <span className="block text-xs text-stone-500 mt-1">Contraste arrojado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
