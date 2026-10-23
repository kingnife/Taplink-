import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../types';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, showToast, openModal } = useApp();

  const getTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'cards':
        return '05 — Cards & Controls';
      case 'insights':
        return '06 — Insights';
      case 'profile':
        return '07 — Profile & Security';
      case 'pay':
        return 'Nfc Tap Session';
      default:
        return 'TapLink Private';
    }
  };

  return (
    <header className="fixed top-0 w-full max-w-[480px] z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.65)] pt-safe border-b border-surface-container-high/40">
      <div className="h-16 px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img
            alt="TapLink Brand Emblem"
            className="h-8 w-auto object-contain cursor-pointer transition-transform active:scale-95"
            src={ASSETS.brandEmblem}
            onClick={() => setActiveTab('home')}
          />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-outline">
              TapLink Private
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface">
              {getTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Notifications"
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-colors active:bg-surface-container-high"
            onClick={() => openModal('notifications')}
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <button
            aria-label="Profile"
            className={`w-11 h-11 flex items-center justify-center rounded-full focus:outline-none transition-all ${
              activeTab === 'profile' ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <img
              alt="Elena Voronina Profile"
              className="w-8 h-8 rounded-full object-cover border border-primary/30"
              src={ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
