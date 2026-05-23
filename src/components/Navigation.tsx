import React from 'react';
import { Home, Shirt, Plus, Sparkles, User } from 'lucide-react';

interface NavigationProps {
  activeTab: 'morning' | 'closet' | 'looks' | 'profile';
  setActiveTab: (tab: 'morning' | 'closet' | 'looks' | 'profile') => void;
  setShowAddModal: (show: boolean) => void;
  setAcceptedToday: (val: boolean) => void;
}

export function BottomNavigation({
  activeTab,
  setActiveTab,
  setShowAddModal,
  setAcceptedToday
}: NavigationProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-stone-200/80 px-6 py-4 flex items-center justify-between z-40 shrink-0 shadow-lg select-none pb-safe">
      
      {/* Tab 1: Início */}
      <button 
        onClick={() => { setActiveTab('morning'); setAcceptedToday(false); }}
        className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${
          activeTab === 'morning' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <Home className={`w-6 h-6 ${activeTab === 'morning' ? 'fill-stone-900/10' : ''}`} />
        <span className="text-[10px] font-medium tracking-wide">Início</span>
      </button>

      {/* Tab 2: Closet */}
      <button 
        onClick={() => setActiveTab('closet')}
        className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${
          activeTab === 'closet' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <Shirt className={`w-6 h-6 ${activeTab === 'closet' ? 'fill-stone-900/10' : ''}`} />
        <span className="text-[10px] font-medium tracking-wide">Closet</span>
      </button>

      {/* Center FAB */}
      <div className="relative -top-6 shrink-0">
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-white shadow-xl active:scale-95 transition-all cursor-pointer"
          title="Nova Peça"
        >
          <Plus className="w-6 h-6 stroke-[2.5px]" />
        </button>
      </div>

      {/* Tab 3: Looks */}
      <button 
        onClick={() => setActiveTab('looks')}
        className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${
          activeTab === 'looks' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <Sparkles className={`w-6 h-6 ${activeTab === 'looks' ? 'fill-stone-900/10' : ''}`} />
        <span className="text-[10px] font-medium tracking-wide">Looks</span>
      </button>

      {/* Tab 4: Profile */}
      <button 
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${
          activeTab === 'profile' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-stone-900/10' : ''}`} />
        <span className="text-[10px] font-medium tracking-wide">Aura</span>
      </button>
    </div>
  );
}
