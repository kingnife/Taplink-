import React from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, startNfcSession } = useApp();

  const handleTabClick = (tab: AppTab) => {
    if (tab === 'pay') {
      startNfcSession(false);
    } else {
      setActiveTab(tab);
    }
  };

  const navItems: { tab: AppTab; label: string; icon: string }[] = [
    { tab: 'home', label: 'Home', icon: 'home' },
    { tab: 'pay', label: 'Pay', icon: 'contactless' },
    { tab: 'cards', label: 'Cards', icon: 'credit_card' },
    { tab: 'insights', label: 'Insights', icon: 'monitoring' },
    { tab: 'profile', label: 'Profile', icon: 'account_circle' }
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.7)] border-t border-surface-container-high/40">
      <div className="flex items-center justify-around h-16 px-gutter">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          const isPay = item.tab === 'pay';

          return (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`flex flex-col items-center justify-center w-14 h-12 transition-colors relative active:scale-95 ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {isPay ? (
                <div className="relative">
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              ) : (
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
              )}
              <span className="font-label-sm text-label-sm mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
