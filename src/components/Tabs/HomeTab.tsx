import React from 'react';
import { Sun, Briefcase, Shirt, Heart, Sparkles, Check, RefreshCw, CheckCircle, Bell, Settings } from 'lucide-react';
import { Outfit, ClotheOccasion, WeatherType, StylistFeedback } from '../../types';
import { ClothingVisual } from '../ClothingVisual';

interface HomeTabProps {
  user: { name: string; avatar: string };
  selectedWeather: WeatherType;
  selectedOccasion: ClotheOccasion;
  selectedStyle: 'elegant' | 'casual' | 'modern';
  setShowWeatherSelector: (s: boolean) => void;
  setShowOccasionSelector: (s: boolean) => void;
  setShowStyleSelector: (s: boolean) => void;
  setSelectedStyle: (s: 'elegant' | 'casual' | 'modern') => void;
  suggestedOutfit: Outfit | null;
  activeModelPhoto: string;
  stylistFeedback: StylistFeedback | null;
  acceptedToday: boolean;
  handleUseToday: () => void;
  handleRegenerate: () => void;
  MODEL_LOOK_PHOTOS: Record<string, string>;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
}

export function HomeTab({
  user,
  selectedWeather,
  selectedOccasion,
  selectedStyle,
  setShowWeatherSelector,
  setShowOccasionSelector,
  setShowStyleSelector,
  setSelectedStyle,
  suggestedOutfit,
  activeModelPhoto,
  stylistFeedback,
  acceptedToday,
  handleUseToday,
  handleRegenerate,
  MODEL_LOOK_PHOTOS,
  onOpenProfile,
  onOpenNotifications
}: HomeTabProps) {
  return (
    <div className="px-6 pt-6 pb-24 space-y-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-12 h-12 rounded-full object-cover border border-stone-200"
            />
          </div>
          <div>
            <h2 className="text-xl font-serif text-stone-900 flex items-center gap-2">
              Bom dia, {user.name} <span>✨</span>
            </h2>
            <p className="text-stone-500 text-sm mt-0.5">Pronta para inspirar o mundo?</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-all cursor-pointer shadow-sm"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button 
            onClick={onOpenProfile} 
            className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-all cursor-pointer shadow-sm"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conditions Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Weather */}
        <div 
          onClick={() => setShowWeatherSelector(true)}
          className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-rose-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-400 group-hover:text-rose-500 transition-colors">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Clima</span>
          </div>
          <div>
            <span className="text-2xl font-serif text-stone-900 block">24°</span>
            <span className="text-xs text-stone-500 block truncate mt-1">Sol ameno</span>
          </div>
        </div>

        {/* Occasion */}
        <div 
          onClick={() => setShowOccasionSelector(true)}
          className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-rose-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-400 group-hover:text-rose-500 transition-colors">
            <Briefcase className="w-4 h-4 text-stone-400" />
            <span>Rotina</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-stone-900 block truncate capitalize">
              {selectedOccasion.replace('_', ' ')}
            </span>
            <span className="text-xs text-stone-500 block mt-1">Presencial</span>
          </div>
        </div>

        {/* Style */}
        <div 
          onClick={() => setShowStyleSelector(true)}
          className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-rose-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-400 group-hover:text-rose-500 transition-colors">
            <Shirt className="w-4 h-4 text-stone-400" />
            <span>Vibe</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-stone-900 block capitalize">
              {selectedStyle}
            </span>
            <span className="text-xs text-stone-500 block mt-1">Sofisticada</span>
          </div>
        </div>
      </div>

      {/* Suggested Look */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-stone-900">
            A curadoria de hoje
          </h3>
          <button className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 hover:bg-rose-100 transition-all">
            <Heart className="w-5 h-5 fill-rose-600" />
          </button>
        </div>

        {suggestedOutfit ? (
          <div className="grid grid-cols-12 gap-6 bg-white p-4 rounded-[2rem] border border-stone-200 shadow-sm">
            {/* Model Preview Image */}
            <div className="col-span-5 rounded-2xl overflow-hidden shadow-inner aspect-[3/4] relative">
              <img 
                src={activeModelPhoto} 
                alt="Daily look" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Look Details */}
            <div className="col-span-7 flex flex-col justify-center gap-3">
              {[
                { label: 'Camisa', item: suggestedOutfit.top },
                { label: 'Bottom', item: suggestedOutfit.bottom },
                { label: 'Calçados', item: suggestedOutfit.shoes },
                { label: 'Bolsa', item: suggestedOutfit.accessory }
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {slot.item && (
                    <ClothingVisual
                      category={slot.item.category}
                      subCategory={slot.item.subCategory}
                      color={slot.item.color}
                      imageUrl={slot.item.imageUrl}
                      size="sm"
                      className="shrink-0 w-12 h-12 rounded-xl shadow-sm border border-stone-100"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-stone-900 truncate">
                      {slot.item?.name || 'Item'}
                    </span>
                    <span className="block text-xs text-stone-500 truncate mt-0.5 capitalize">
                      {slot.item?.colorName} • {slot.item?.subCategory}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed border-stone-300 rounded-3xl bg-stone-50">
            <p className="text-sm text-stone-500 font-medium">Nenhum look montado</p>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          {acceptedToday ? (
            <div className="col-span-2 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl p-4 flex items-center justify-center gap-3 text-sm font-medium">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Excelente! Look registrado no seu diário.
            </div>
          ) : (
            <>
              <button 
                onClick={handleUseToday}
                className="bg-stone-900 hover:bg-stone-800 text-white p-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Check className="w-4 h-4" /> Eu vou usar
              </button>

              <button 
                onClick={handleRegenerate}
                className="bg-white hover:bg-stone-50 text-stone-800 p-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all border border-stone-200 shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-stone-400" /> Outra opção
              </button>
            </>
          )}
        </div>
      </div>

      {/* Consultoria Estilista */}
      {stylistFeedback && (
        <div className="bg-rose-50/50 border border-rose-100 rounded-[2rem] p-6 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-rose-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Insight da Estilista
          </span>
          <h4 className="text-base font-serif text-stone-900">
            {stylistFeedback.title}
          </h4>
          <p className="text-stone-600 text-sm leading-relaxed italic">
            "{stylistFeedback.commentary}"
          </p>
          {stylistFeedback.challenge && (
            <p className="text-sm text-rose-700 font-medium mt-3 pt-3 border-t border-rose-100/50">
              💡 {stylistFeedback.challenge}
            </p>
          )}
        </div>
      )}

      {/* Alternative Options */}
      <div className="space-y-4">
        <h4 className="text-lg font-serif text-stone-900">Variações de estilo</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: 'elegant', label: 'Elegante', photo: MODEL_LOOK_PHOTOS['cream-beige'] },
            { key: 'casual', label: 'Casual', photo: MODEL_LOOK_PHOTOS['green-beige'] },
            { key: 'modern', label: 'Moderno', photo: MODEL_LOOK_PHOTOS['black-beige'] }
          ].map((opt) => (
            <div 
              key={opt.key}
              onClick={() => setSelectedStyle(opt.key as any)}
              className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                selectedStyle === opt.key ? 'border-amber-400 shadow-md' : 'border-transparent'
              }`}
            >
              <img src={opt.photo} alt={opt.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-3">
                <span className="text-xs font-medium text-white shadow-sm">
                  {opt.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
