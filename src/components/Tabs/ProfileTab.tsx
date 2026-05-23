import React from 'react';
import { Sparkles, Flame, Clock, Info } from 'lucide-react';
import { AppStats, StyleProfile } from '../../types';

interface ProfileTabProps {
  stats: AppStats;
  styleProfile: StyleProfile;
  setStyleProfile: React.Dispatch<React.SetStateAction<StyleProfile>>;
  selectedStyle: string;
  setSelectedStyle: (s: 'elegant'|'casual'|'modern') => void;
}

export function ProfileTab({
  stats,
  styleProfile,
  setStyleProfile,
  selectedStyle,
  setSelectedStyle
}: ProfileTabProps) {
  return (
    <div className="px-6 pt-6 pb-24 space-y-8 animate-fade-in text-left">
      <div>
        <h3 className="text-2xl font-serif text-stone-900 flex items-center gap-3">
          Sua Aura <Sparkles className="w-6 h-6 text-rose-400" />
        </h3>
        <p className="text-sm text-stone-500 mt-1">Seu algoritmo pessoal de estilo</p>
      </div>

      {/* Gamification Stats */}
      <div className="bg-stone-900 rounded-[2rem] p-6 grid grid-cols-2 gap-4 shadow-lg text-white">
        <div className="space-y-2 border-r border-stone-700 pr-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-400">Consistência</span>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="text-xl font-serif">{stats.currentStreakDays} dias</span>
          </div>
        </div>

        <div className="space-y-2 pl-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-400">Tempo Poupado</span>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span className="text-xl font-serif">{stats.totalTimeSavedMinutes}m</span>
          </div>
        </div>
      </div>

      <div className="space-y-8 pt-4">
        {/* Style Base */}
        <div className="space-y-4">
          <span className="block text-xs font-semibold text-stone-500 uppercase tracking-widest">Base de Estilo</span>
          <div className="grid grid-cols-1 gap-3">
            {[
              { key: 'elegant', label: 'Elegante Clássico', desc: 'Foco em alfaiataria, seda e cortes precisos.' },
              { key: 'casual', label: 'Casual Refinado', desc: 'Confortável, tecidos naturais e versatilidade.' },
              { key: 'modern', label: 'Minimalista Chic', desc: 'Poucas cores, muito contraste e texturas lisas.' }
            ].map(pref => (
              <div
                key={pref.key}
                onClick={() => setSelectedStyle(pref.key as any)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-center ${
                  selectedStyle === pref.key 
                    ? 'border-stone-900 bg-stone-50' 
                    : 'border-stone-100 bg-white hover:border-stone-300'
                }`}
              >
                <span className={`block text-sm font-semibold ${selectedStyle === pref.key ? 'text-stone-900' : 'text-stone-700'}`}>
                  {pref.label}
                </span>
                <span className="block text-xs text-stone-500 mt-1">{pref.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory */}
        <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#EAE0D5] flex gap-4 items-start">
          <Info className="w-5 h-5 text-[#C4A484] shrink-0 mt-0.5" />
          <div>
            <h6 className="text-sm font-semibold text-stone-800">Sobre o Style Studio</h6>
            <p className="text-sm text-stone-600 leading-relaxed mt-1">
              Suas preferências ditam a montagem dos looks matinais. Altere os pesos aqui para receber sugestões fora da sua zona de conforto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
