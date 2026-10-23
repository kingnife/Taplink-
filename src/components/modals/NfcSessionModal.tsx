import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../types';

export const NfcSessionModal: React.FC = () => {
  const { closeModal, openModal, shouldSimulateFailure, showToast } = useApp();
  const [secondsLeft, setSecondsLeft] = useState(102); // 01:42
  const [orbActive, setOrbActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOrbTap = () => {
    if (navigator.vibrate) {
      navigator.vibrate([30, 40, 30]);
    }
    setOrbActive(true);
    showToast('Terminal handshake detected...');

    setTimeout(() => {
      setOrbActive(false);
      if (shouldSimulateFailure) {
        openModal('nfc-error');
      } else {
        openModal('tx-auth');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-[480px] h-full min-h-screen bg-surface flex flex-col justify-between overflow-y-auto selection:bg-primary-container selection:text-on-primary-container border-x border-surface-container-high/40">
        {/* Top Header Bar */}
        <header className="fixed top-0 w-full max-w-[480px] z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.65)] pt-safe border-b border-surface-container-high/40">
          <div className="h-16 px-gutter flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <button
                aria-label="Go back"
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors"
                onClick={closeModal}
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <img
                alt="TapLink Brand Emblem"
                className="h-7 w-auto object-contain"
                src={ASSETS.brandEmblem}
              />
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
                Nfc Tap Session
              </h1>
            </div>

            <div className="flex items-center gap-space-xs">
              <button
                aria-label="Close"
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
                onClick={closeModal}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-primary/30"
                src={ASSETS.avatar}
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col pt-20 pb-8 px-margin select-none justify-between">
          <div>
            {/* Status Badge with Subtle Active Pulse */}
            <div className="flex items-center justify-center pt-space-xs pb-space-md">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high shadow-sm border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                  Ready to Tap
                </span>
                <span className="material-symbols-outlined text-primary text-[14px]">sensors</span>
              </div>
            </div>

            {/* Concentric NFC Radar Area */}
            <div className="relative w-full flex items-center justify-center py-space-md">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer Ripple Wave 3 */}
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse scale-105 pointer-events-none" />
                {/* Concentric Ring 2 */}
                <div className="absolute inset-3 rounded-full bg-surface-container-high/80 flex items-center justify-center border border-primary/10">
                  {/* Concentric Ring 1 */}
                  <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center shadow-lg shadow-black/60 border border-primary/20">
                    {/* Central Pulse Core */}
                    <div
                      id="nfcOrb"
                      role="button"
                      tabIndex={0}
                      onClick={handleOrbTap}
                      className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-inner relative group transition-transform active:scale-95 cursor-pointer border border-primary/30 ${
                        orbActive ? 'bg-primary-container scale-105' : 'bg-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-primary text-[32px] transition-transform duration-300 group-hover:scale-110"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        contactless
                      </span>
                      <span className="font-label-sm text-[9px] uppercase tracking-widest text-primary/80 mt-0.5">
                        NFC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Radiating Decorative Rings (Inline SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#c8a64d"
                    strokeDasharray="4 6"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="68"
                    stroke="#e7c266"
                    strokeOpacity="0.25"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="48"
                    stroke="#c8a64d"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>

            {/* Primary Guidance & Terminal Context */}
            <div className="flex flex-col items-center text-center mt-space-xs mb-space-lg">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                Hold near payment terminal
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[270px]">
                Position the top edge of your device flush against the reader surface
              </p>

              {/* Detected Terminal Micro-bar */}
              <div className="mt-space-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-[11px] border border-surface-container-high/60">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Terminal: Verifone V400m</span>
                <span className="opacity-40">•</span>
                <span className="text-primary-fixed-dim font-mono">#9821</span>
              </div>

              {/* Interactive Simulation Helper Button */}
              <button
                onClick={handleOrbTap}
                className="mt-3 text-xs text-primary font-medium px-3 py-1 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all flex items-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-[14px]">touch_app</span>
                <span>Tap central orb to connect terminal</span>
              </button>
            </div>

            {/* Active Card Selector Card */}
            <div
              className="w-full bg-surface-container rounded-xl p-space-md shadow-md mb-space-md transition-all active:bg-surface-container-high border border-surface-container-high/60 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => showToast('Card credentials verified: Obsidian Infinite •••• 9412')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-md min-w-0">
                  {/* Obsidian Card Mini Emblem */}
                  <div className="w-12 h-8 rounded-md bg-surface-container-lowest flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-sm border border-primary/30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-surface-variant to-primary/20" />
                    <span
                      className="material-symbols-outlined text-primary text-[18px] relative z-10"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      credit_card
                    </span>
                    <div className="absolute bottom-1 right-1 w-2 h-1.5 rounded-sm bg-primary/70" />
                  </div>

                  {/* Card Credentials */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-[14px] text-on-surface font-semibold truncate">
                        TapLink Obsidian Infinite
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                        •••• 9412
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline" />
                      <span className="font-body-sm text-body-sm text-primary font-medium tabular-nums">
                        $12,480.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action / Switcher Icon */}
                <div className="flex items-center gap-1 text-on-surface-variant flex-shrink-0 pl-2">
                  <span className="font-label-sm text-label-sm hidden sm:inline">Change</span>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fallback & Secondary Controls */}
          <div className="flex flex-col gap-space-sm w-full mt-auto">
            {/* QR Fallback Button */}
            <button
              onClick={() => openModal('dynamic-qr')}
              className="w-full h-12 bg-surface-container-high hover:bg-surface-variant active:bg-surface-container rounded-xl flex items-center justify-center gap-2 text-on-surface transition-colors shadow-sm border border-surface-container-highest/60"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">
                qr_code_scanner
              </span>
              <span className="font-label-md text-label-md">NFC not responding? Use Dynamic QR</span>
            </button>

            {/* Cancel Session */}
            <button
              onClick={closeModal}
              className="w-full h-11 bg-transparent active:bg-surface-container-low rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="font-body-md text-body-md">Cancel Payment</span>
            </button>

            {/* Security Session Footnote */}
            <div className="flex flex-col items-center justify-center gap-1 mt-space-xs text-center">
              <div className="flex items-center gap-1.5 text-outline">
                <span className="material-symbols-outlined text-[15px] text-primary/80">lock</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant tracking-tight">
                  EMVCo &amp; Level 3 Encrypted Session
                </span>
              </div>
              <div className="font-label-sm text-[11px] text-on-surface-variant">
                Session expires in{' '}
                <span className="text-primary font-semibold tabular-nums font-mono">
                  {formatTimer(secondsLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
