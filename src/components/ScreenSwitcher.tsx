import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ScreenSwitcher: React.FC = () => {
  const {
    setActiveTab,
    openModal,
    startNfcSession,
    resetAllState,
    shouldSimulateFailure,
    activeTab,
    activeModal
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const screens = [
    { label: '01 — Home Dashboard', action: () => { setActiveTab('home'); openModal(null); } },
    { label: '05 — Cards & Controls', action: () => { setActiveTab('cards'); openModal(null); } },
    { label: '06 — Insights', action: () => { setActiveTab('insights'); openModal(null); } },
    { label: '07 — Profile & Security', action: () => { setActiveTab('profile'); openModal(null); } },
    { label: 'Nfc Tap Session (Radar)', action: () => startNfcSession(false) },
    { label: 'Transaction Auth ($184.50)', action: () => openModal('tx-auth') },
    { label: 'Payment Successful Receipt', action: () => openModal('tx-receipt') },
    { label: 'NFC Reader Not Detected (Diag)', action: () => openModal('nfc-error') }
  ];

  return (
    <>
      {/* Discreet floating helper pill (desktop & testing) */}
      <div className="fixed top-3 right-4 z-50 hidden lg:flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3.5 py-1.5 rounded-full bg-surface-container-high/90 text-primary border border-primary/30 text-xs font-semibold shadow-lg backdrop-blur-md hover:bg-surface-container-highest transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">devices</span>
          <span>Screens ({screens.length})</span>
          <span className="material-symbols-outlined text-[14px]">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        <button
          onClick={() => startNfcSession(true)}
          className="px-3 py-1.5 rounded-full bg-surface-container-high/90 text-secondary border border-secondary/30 text-xs font-medium shadow-md backdrop-blur-md hover:bg-surface-container-highest transition-all flex items-center gap-1"
          title="Test terminal timeout / error diagnostic screen"
        >
          <span className="material-symbols-outlined text-[14px]">sensors_off</span>
          <span>Simulate NFC Fail</span>
        </button>

        <button
          onClick={resetAllState}
          className="px-2.5 py-1.5 rounded-full bg-surface-container-high/90 text-on-surface-variant hover:text-error text-xs font-medium border border-surface-container-highest shadow-md backdrop-blur-md transition-all flex items-center"
          title="Reset vault to initial state"
        >
          <span className="material-symbols-outlined text-[15px]">restart_alt</span>
        </button>
      </div>

      {/* Screen Drawer Dropdown on Desktop */}
      {isOpen && (
        <div className="fixed top-14 right-4 z-50 hidden lg:flex flex-col w-72 bg-surface-container rounded-2xl p-3 border border-primary/30 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high px-2">
            <span className="font-label-sm text-outline uppercase tracking-wider text-[11px]">
              Jump to Screen
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            {screens.map((screen, idx) => {
              const isCurrent =
                (idx === 0 && activeTab === 'home' && !activeModal) ||
                (idx === 1 && activeTab === 'cards' && !activeModal) ||
                (idx === 2 && activeTab === 'insights' && !activeModal) ||
                (idx === 3 && activeTab === 'profile' && !activeModal) ||
                (idx === 4 && activeModal === 'nfc-session') ||
                (idx === 5 && activeModal === 'tx-auth') ||
                (idx === 6 && activeModal === 'tx-receipt') ||
                (idx === 7 && activeModal === 'nfc-error');

              return (
                <button
                  key={screen.label}
                  onClick={() => {
                    screen.action();
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isCurrent
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="truncate">{screen.label}</span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
