import { useState, useEffect, FormEvent } from 'react';
import { Sun, Briefcase, Shirt, X } from 'lucide-react';
import { 
  ClothingItem, 
  Outfit, 
  HistoryEntry, 
  StyleProfile, 
  ClotheOccasion, 
  WeatherType, 
  StylistFeedback,
  AppStats,
  ColorFamily
} from './types';
import { DEFAULT_CLOSET } from './data/defaultCloset';
import { generateSmartOutfit } from './utils/outfitGenerator';

import { HomeTab } from './components/Tabs/HomeTab';
import { ClosetTab } from './components/Tabs/ClosetTab';
import { LooksTab } from './components/Tabs/LooksTab';
import { ProfileTab } from './components/Tabs/ProfileTab';
import { BottomNavigation } from './components/Navigation';

// High-resolution Unsplash model photos for exact fidelity
const MODEL_LOOK_PHOTOS: Record<string, string> = {
  'cream-beige': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=650&auto=format&fit=crop',
  'black-beige': 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=650&auto=format&fit=crop',
  'green-beige': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=650&auto=format&fit=crop',
  'white-black': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=650&auto=format&fit=crop',
  'blue-white': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=650&auto=format&fit=crop'
};

const CAROUSEL_RECENT_LOOKS = [
  { date: 'Seg, 20/05', image: MODEL_LOOK_PHOTOS['green-beige'] },
  { date: 'Sex, 17/05', image: MODEL_LOOK_PHOTOS['black-beige'] },
  { date: 'Qui, 16/05', image: MODEL_LOOK_PHOTOS['cream-beige'] },
  { date: 'Qua, 15/05', image: MODEL_LOOK_PHOTOS['white-black'] },
  { date: 'Ter, 14/05', image: MODEL_LOOK_PHOTOS['blue-white'] }
];

export default function App() {
  // Persistent State
  const [closet, setCloset] = useState<ClothingItem[]>(() => {
    const local = localStorage.getItem('morning_closet');
    return local ? JSON.parse(local) : DEFAULT_CLOSET;
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const local = localStorage.getItem('morning_history');
    return local ? JSON.parse(local) : [];
  });

  const [styleProfile, setStyleProfile] = useState<StyleProfile>(() => {
    const local = localStorage.getItem('morning_style_profile');
    return local ? JSON.parse(local) : {
      styleType: 'chic',
      favoriteColors: ['#fafaf9', '#09090b', '#fbcfe8'],
      avoidColors: []
    };
  });

  const [stats, setStats] = useState<AppStats>(() => {
    const local = localStorage.getItem('morning_stats');
    if (local) return JSON.parse(local);
    return {
      totalOutfitsChoosen: 128,
      totalTimeSavedMinutes: 240,
      currentStreakDays: 6,
      lastUsedDate: null
    };
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<'morning' | 'closet' | 'looks' | 'profile'>('morning');
  
  // Selection
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>('mild');
  const [selectedOccasion, setSelectedOccasion] = useState<ClotheOccasion>('work_casual');
  const [selectedStyle, setSelectedStyle] = useState<'elegant' | 'casual' | 'modern'>('elegant');
  
  const [suggestedOutfit, setSuggestedOutfit] = useState<Outfit | null>(null);
  const [activeModelPhoto, setActiveModelPhoto] = useState<string>(MODEL_LOOK_PHOTOS['cream-beige']);
  const [stylistFeedback, setStylistFeedback] = useState<StylistFeedback | null>(null);
  const [acceptedToday, setAcceptedToday] = useState(false);
  const [timeSavedToday] = useState(15);
  
  const [looksFilter, setLooksFilter] = useState<string>('para_hoje');
  const [closetCategoryFilter, setClosetCategoryFilter] = useState<string>('todas');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWeatherSelector, setShowWeatherSelector] = useState(false);
  const [showOccasionSelector, setShowOccasionSelector] = useState(false);
  const [showStyleSelector, setShowStyleSelector] = useState(false);

  // New Item State
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessory'>('top');
  const [newItemSubCategory, setNewItemSubCategory] = useState('Camisa');
  const [newItemColor, setNewItemColor] = useState('#eae5d8');
  const [newItemColorName, setNewItemColorName] = useState('Creme');
  const [newItemColorFamily, setNewItemColorFamily] = useState<ColorFamily>('neutra');
  const [newItemOccasions, setNewItemOccasions] = useState<ClotheOccasion[]>(['work_casual', 'work_formal']);
  const [newItemWeatherTypes, setNewItemWeatherTypes] = useState<WeatherType[]>(['mild', 'hot']);
  const [newItemFavorite, setNewItemFavorite] = useState(false);

  // Sync to local storage
  useEffect(() => localStorage.setItem('morning_closet', JSON.stringify(closet)), [closet]);
  useEffect(() => localStorage.setItem('morning_history', JSON.stringify(history)), [history]);
  useEffect(() => localStorage.setItem('morning_style_profile', JSON.stringify(styleProfile)), [styleProfile]);
  useEffect(() => localStorage.setItem('morning_stats', JSON.stringify(stats)), [stats]);

  // Generation Logic
  useEffect(() => {
    const outfit = generateSmartOutfit(closet, selectedOccasion, selectedWeather, history, styleProfile);
    if (outfit) {
      const creamTop = closet.find(i => i.id === 'top-seda-creme') || outfit.top;
      const beigeBottom = closet.find(i => i.id === 'bottom-alfaiataria-bege') || outfit.bottom;
      const scarpinShoes = closet.find(i => i.id === 'shoes-scarpin-nude') || outfit.shoes;
      const marromBag = closet.find(i => i.id === 'acc-bolsa-marrom') || outfit.accessory;
      
      let refinedOutfit = outfit;
      if (selectedStyle === 'elegant') {
        refinedOutfit = { ...outfit, top: creamTop, bottom: beigeBottom, shoes: scarpinShoes, accessory: marromBag };
        setActiveModelPhoto(MODEL_LOOK_PHOTOS['cream-beige']);
      } else if (selectedStyle === 'casual') {
        const greenTop = closet.find(i => i.id === 'top-camisa-verde') || outfit.top;
        refinedOutfit = { ...outfit, top: greenTop, bottom: beigeBottom, shoes: closet.find(i => i.id === 'shoes-tenis-branco') || outfit.shoes, accessory: marromBag };
        setActiveModelPhoto(MODEL_LOOK_PHOTOS['green-beige']);
      } else if (selectedStyle === 'modern') {
        const coleteTop = closet.find(i => i.id === 'top-colete-preto') || outfit.top;
        const blackBottom = closet.find(i => i.id === 'bottom-alfaiataria-preta') || outfit.bottom;
        refinedOutfit = { ...outfit, top: coleteTop, bottom: blackBottom, shoes: scarpinShoes, accessory: marromBag };
        setActiveModelPhoto(MODEL_LOOK_PHOTOS['black-beige']);
      }
      
      setSuggestedOutfit(refinedOutfit);
      fetchStylistFeedback(refinedOutfit, selectedOccasion, selectedWeather);
    }
  }, [selectedWeather, selectedOccasion, selectedStyle, closet]);

  const fetchStylistFeedback = async (outfit: Outfit, occasion: ClotheOccasion, weather: WeatherType) => {
    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outfit, occasion, weather })
      });
      if (response.ok) {
        const data = await response.json();
        setStylistFeedback(data);
      } else throw new Error();
    } catch {
      setStylistFeedback({
        title: selectedStyle === 'elegant' ? 'Clássico Moderno' : selectedStyle === 'casual' ? 'Leve & Fresco' : 'Minimalista Chic',
        commentary: 'Este look combina perfeitamente a sobriedade sutil com a elegância atemporal que valoriza a silhueta.',
        challenge: 'Combine com um brinco minimalista dourado e arrase.',
        compliment: 'Você está radiante, Luiza!',
        fromAi: false
      });
    }
  };

  const handleRegenerate = () => {
    setAcceptedToday(false);
    const outfit = generateSmartOutfit(closet, selectedOccasion, selectedWeather, history, styleProfile);
    if (outfit) {
      setSuggestedOutfit(outfit);
      fetchStylistFeedback(outfit, selectedOccasion, selectedWeather);
    }
  };

  const handleUseToday = () => {
    if (!suggestedOutfit) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const newHistoryEntry: HistoryEntry = {
      id: `history-${Date.now()}`,
      date: todayStr,
      outfit: suggestedOutfit,
      occasion: selectedOccasion,
      weather: selectedWeather,
      timeSavedMinutes: timeSavedToday,
      rating: 'love'
    };
    setHistory(prev => [newHistoryEntry, ...prev]);
    setStats(prev => ({
      ...prev,
      totalOutfitsChoosen: prev.totalOutfitsChoosen + 1,
      totalTimeSavedMinutes: prev.totalTimeSavedMinutes + timeSavedToday,
      currentStreakDays: prev.currentStreakDays + 1,
      lastUsedDate: todayStr
    }));
    setAcceptedToday(true);
  };

  const handleAddClosetItemSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: ClothingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      subCategory: newItemSubCategory,
      color: newItemColor,
      colorName: newItemColorName,
      colorFamily: newItemColorFamily,
      occasions: newItemOccasions,
      weatherTypes: newItemWeatherTypes,
      imageUrl: newItemCategory === 'top' 
        ? 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=300&auto=format&fit=crop' 
        : newItemCategory === 'bottom' 
        ? 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop' 
        : 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop',
      isFavorite: newItemFavorite,
      lastUsed: null
    };

    setCloset(prev => [newItem, ...prev]);
    setNewItemName('');
    setNewItemFavorite(false);
    setShowAddModal(false);
    setActiveTab('closet');
  };

  const circularPalette = [
    { hex: '#FCFAF6', name: 'Off-White' },
    { hex: '#18181A', name: 'Preto' },
    { hex: '#D7CBBB', name: 'Nude/Bege' },
    { hex: '#8F5C3E', name: 'Terracota' },
    { hex: '#1E4E8C', name: 'Azul' },
    { hex: '#6B8259', name: 'Verde Oliva' },
    { hex: '#DF728A', name: 'Rose' },
    { hex: '#A68CE6', name: 'Violeta' }
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex items-center justify-center p-0 md:p-6">
      
      {/* Modern Centered Screen */}
      <div className="w-full h-screen md:h-full md:max-h-[850px] max-w-md mx-auto relative bg-[#FCF9F5] shadow-2xl flex flex-col md:rounded-[2.5rem] overflow-hidden border border-stone-200">
        
        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto scrollbar-none pb-24">
          {activeTab === 'morning' && (
            <HomeTab
              user={{ name: 'Luiza', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' }}
              selectedWeather={selectedWeather}
              selectedOccasion={selectedOccasion}
              selectedStyle={selectedStyle}
              setShowWeatherSelector={setShowWeatherSelector}
              setShowOccasionSelector={setShowOccasionSelector}
              setShowStyleSelector={setShowStyleSelector}
              setSelectedStyle={setSelectedStyle}
              suggestedOutfit={suggestedOutfit}
              activeModelPhoto={activeModelPhoto}
              stylistFeedback={stylistFeedback}
              acceptedToday={acceptedToday}
              handleUseToday={handleUseToday}
              handleRegenerate={handleRegenerate}
              MODEL_LOOK_PHOTOS={MODEL_LOOK_PHOTOS}
              onOpenProfile={() => setActiveTab('profile')}
              onOpenNotifications={() => alert('Sem novas notificações')}
            />
          )}

          {activeTab === 'closet' && (
            <ClosetTab
              closet={closet}
              closetCategoryFilter={closetCategoryFilter}
              setClosetCategoryFilter={setClosetCategoryFilter}
              circularPalette={circularPalette}
            />
          )}

          {activeTab === 'looks' && (
            <LooksTab
              looksFilter={looksFilter}
              setLooksFilter={setLooksFilter}
              MODEL_LOOK_PHOTOS={MODEL_LOOK_PHOTOS}
              CAROUSEL_RECENT_LOOKS={CAROUSEL_RECENT_LOOKS}
              onOpenMorningTab={() => setActiveTab('morning')}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              stats={stats}
              styleProfile={styleProfile}
              setStyleProfile={setStyleProfile}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
          )}
        </div>

        {/* Bottom Navigation Navbar */}
        <BottomNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          setShowAddModal={setShowAddModal}
          setAcceptedToday={setAcceptedToday} 
        />

        {/* ===================== Modals ===================== */}
        
        {showAddModal && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in pb-12 md:pb-0">
            <div className="bg-white rounded-t-[2.5rem] w-full max-h-[90%] overflow-y-auto p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-medium text-stone-900">Cadastrar Peça</h3>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddClosetItemSubmit} className="space-y-5 pb-8">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-stone-400 tracking-wider">Nome da peça</label>
                  <input 
                    type="text" 
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Ex: T-shirt Algodão Egípcio"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 font-medium focus:outline-rose-400 focus:bg-white transition-all shadow-inner"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase text-stone-400 tracking-wider">Categoria</label>
                    <select 
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 font-medium focus:outline-rose-400 focus:bg-white"
                    >
                      <option value="top">Superior (Tops)</option>
                      <option value="bottom">Inferior (Calças)</option>
                      <option value="shoes">Calçado</option>
                      <option value="outerwear">Sobretudo</option>
                      <option value="accessory">Acessório</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase text-stone-400 tracking-wider">Tipo</label>
                    <input 
                      type="text" 
                      value={newItemSubCategory}
                      onChange={(e) => setNewItemSubCategory(e.target.value)}
                      placeholder="Ex: Camisa"
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 font-medium focus:outline-rose-400 focus:bg-white transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase text-stone-400 tracking-wider">Cor e Nome</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={newItemColor}
                        onChange={(e) => setNewItemColor(e.target.value)}
                        className="w-10 h-10 rounded-xl overflow-hidden border border-stone-200 p-0 shadow-sm cursor-pointer shrink-0"
                      />
                      <input 
                        type="text"
                        value={newItemColorName}
                        onChange={(e) => setNewItemColorName(e.target.value)}
                        placeholder="Ex: Creme"
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 font-medium focus:outline-rose-400 focus:bg-white shadow-inner"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase text-stone-400 tracking-wider">Família de cor</label>
                    <select 
                      value={newItemColorFamily}
                      onChange={(e) => setNewItemColorFamily(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-850 font-medium focus:outline-rose-400 focus:bg-white"
                    >
                      <option value="neutra">Neutra</option>
                      <option value="quente">Quente</option>
                      <option value="fria">Fria</option>
                      <option value="metalica">Metálica</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-200 select-none">
                  <input 
                    type="checkbox" 
                    id="new-fav"
                    checked={newItemFavorite}
                    onChange={(e) => setNewItemFavorite(e.target.checked)}
                    className="w-5 h-5 border border-stone-300 rounded focus:ring-rose-200 checked:bg-rose-500 text-white"
                  />
                  <label htmlFor="new-fav" className="text-sm font-medium text-stone-700 cursor-pointer">
                    Destacar como favorita
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-full text-sm font-bold mt-6 shadow-md transition-all active:scale-95"
                >
                  Adicionar ao Acervo
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Condition Modals (Weather, Occasion, Style) */}
        {showWeatherSelector && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in pb-12 md:pb-0">
            <div className="bg-white rounded-t-[2.5rem] w-full p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif text-stone-900 flex items-center gap-2">
                    <Sun className="w-6 h-6 text-amber-500" /> Previsão de Hoje
                  </h4>
                </div>
                <button onClick={() => setShowWeatherSelector(false)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'mild', label: 'Primavera', desc: 'Agradável 24°C' },
                  { key: 'hot', label: 'Verão', desc: 'Dias quentes' },
                  { key: 'cold', label: 'Inverno', desc: 'Aconchegante' },
                  { key: 'rainy', label: 'Úmido', desc: 'Dias chuvosos' }
                ].map(wItem => (
                  <div
                    key={wItem.key}
                    onClick={() => { setSelectedWeather(wItem.key as any); setShowWeatherSelector(false); }}
                    className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                      selectedWeather === wItem.key 
                        ? 'border-amber-400 bg-amber-50/30' 
                        : 'border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${selectedWeather === wItem.key ? 'text-amber-700' : 'text-stone-700'}`}>{wItem.label}</span>
                    <span className="block text-xs text-stone-500 mt-1">{wItem.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showOccasionSelector && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in pb-12 md:pb-0">
            <div className="bg-white rounded-t-[2.5rem] w-full p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif text-stone-900 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-stone-500" /> Agenda do Dia
                  </h4>
                </div>
                <button onClick={() => setShowOccasionSelector(false)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'work_casual', label: 'Office Casual', desc: 'Presencial' },
                  { key: 'meeting', label: 'Executivo', desc: 'Reuniões' },
                  { key: 'work_formal', label: 'Office Formal', desc: 'Alinhado' },
                  { key: 'weekend', label: 'Lazer', desc: 'Descontraído' }
                ].map(oItem => (
                  <div
                    key={oItem.key}
                    onClick={() => { setSelectedOccasion(oItem.key as any); setShowOccasionSelector(false); }}
                    className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                      selectedOccasion === oItem.key 
                        ? 'border-stone-900 bg-stone-50' 
                        : 'border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${selectedOccasion === oItem.key ? 'text-stone-900' : 'text-stone-700'}`}>{oItem.label}</span>
                    <span className="block text-xs text-stone-500 mt-1">{oItem.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showStyleSelector && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in pb-12 md:pb-0">
            <div className="bg-white rounded-t-[2.5rem] w-full p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif text-stone-900 flex items-center gap-2">
                    <Shirt className="w-6 h-6 text-rose-500" /> Sua Vibe
                  </h4>
                </div>
                <button onClick={() => setShowStyleSelector(false)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'elegant', label: 'Elegante', desc: 'Polido' },
                  { key: 'casual', label: 'Casual Chic', desc: 'Leve' },
                  { key: 'modern', label: 'Minimalista', desc: 'Clean' }
                ].map(sItem => (
                  <div
                    key={sItem.key}
                    onClick={() => { setSelectedStyle(sItem.key as any); setShowStyleSelector(false); }}
                    className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                      selectedStyle === sItem.key 
                        ? 'border-rose-400 bg-rose-50' 
                        : 'border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${selectedStyle === sItem.key ? 'text-rose-700' : 'text-stone-700'}`}>{sItem.label}</span>
                    <span className="block text-xs text-stone-500 mt-1">{sItem.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
