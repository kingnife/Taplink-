import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../types';

export const TransactionAuthModal: React.FC = () => {
  const { closeModal, openModal, authorizePayment, pendingPayment } = useApp();
  const [holdProgress, setHoldProgress] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authLabel, setAuthLabel] = useState('Double Tap or Hold to Authorize');

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const tapCountRef = useRef(0);
  const tapResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const completeAuth = () => {
    setIsAuthenticating(true);
    setHoldProgress(100);
    setAuthLabel('Authenticating Biometrics...');

    setTimeout(() => {
      setAuthLabel('Authorized & Settled');
      authorizePayment();
    }, 700);
  };

  const startHold = () => {
    if (isAuthenticating) return;
    setHoldProgress(0);
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          completeAuth();
          return 100;
        }
        return next;
      });
    }, 30);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    if (!isAuthenticating && holdProgress < 100) {
      setHoldProgress(0);
    }
  };

  const handleClick = () => {
    if (isAuthenticating) return;
    tapCountRef.current++;
    if (tapCountRef.current === 1) {
      tapResetTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 350);
    } else if (tapCountRef.current >= 2) {
      if (tapResetTimerRef.current) clearTimeout(tapResetTimerRef.current);
      tapCountRef.current = 0;
      completeAuth();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-[480px] h-full min-h-screen bg-surface flex flex-col justify-between overflow-y-auto selection:bg-primary-container selection:text-on-primary-container border-x border-surface-container-high/40">
        {/* Top Header */}
        <header className="fixed top-0 w-full max-w-[480px] z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.65)] pt-safe border-b border-surface-container-high/40">
          <div className="h-16 px-gutter flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <button
                aria-label="Go back"
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors"
                onClick={() => openModal('nfc-session')}
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <img
                alt="TapLink Brand Emblem"
                className="h-7 w-auto object-contain"
                src={ASSETS.brandEmblem}
              />
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
                Transaction Detail
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

        {/* Content */}
        <div className="flex-1 flex flex-col pt-20 pb-8 px-margin select-none justify-between">
          <div>
            {/* Merchant Identity Header */}
            <section className="flex flex-col items-center text-center mt-space-sm mb-space-md">
              <div className="relative w-20 h-20 mb-space-sm flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-surface-container-high shadow-md border border-primary/20" />
                <div className="relative w-16 h-16 rounded-full bg-surface-container flex items-center justify-center shadow-sm overflow-hidden border border-primary/40">
                  <img
                    className="w-full h-full object-cover opacity-90"
                    alt="Aesop Soho Flagship"
                    src={ASSETS.aesopEmblem}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md border border-primary">
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>

              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                {pendingPayment.merchant}
              </h2>
              <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                <span className="text-primary font-label-md text-label-md">Verified Merchant</span>
                <span className="text-surface-variant text-[6px]">●</span>
                <span>London, UK</span>
              </div>
            </section>

            {/* Total Authorization Display */}
            <section className="flex flex-col items-center justify-center mb-space-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-1">
                Total Authorization
              </span>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="font-headline-lg text-headline-lg text-primary">$</span>
                <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight tabular-nums font-bold">
                  {pendingPayment.amount.toFixed(2)}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant self-end pb-1.5">
                  USD
                </span>
              </div>

              {/* NFC Wave Ping */}
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">
                  contactless
                </span>
                <span className="font-label-sm text-label-sm tracking-wide">
                  NFC Near-Field Active Session
                </span>
              </div>
            </section>

            {/* Payment Detailed Breakdown Card */}
            <section className="bg-surface-container rounded-xl p-5 shadow-lg space-y-4 mb-space-md border border-surface-container-high/60">
              {/* Row 1: Funding Source */}
              <div className="flex items-center justify-between min-h-[44px]">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Funding Source
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-5 h-3.5 rounded-sm bg-surface-container-highest flex items-center justify-center overflow-hidden border border-primary/30">
                      <div className="w-2 h-1.5 rounded-full bg-primary-container" />
                    </div>
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      TapLink Obsidian
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant tracking-wider font-mono">
                      •••• 9412
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Available
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">
                    $12,480.00
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-surface-variant opacity-60" />

              {/* Row 2: Method & Protocol */}
              <div className="flex items-center justify-between min-h-[40px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">contactless</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Protocol
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      NFC Contactless
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm border border-surface-container-highest">
                  Tokenized EMV
                </span>
              </div>

              <div className="h-px w-full bg-surface-variant opacity-60" />

              {/* Financial Breakdown Rows */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-headline-sm text-headline-sm tabular-nums">
                    ${pendingPayment.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span>Network &amp; Clearing Fee</span>
                    <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
                      info
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-on-surface-variant line-through text-body-sm">$1.25</span>
                    <span className="text-primary font-label-md text-label-md">Instant $0.00</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-outline-variant opacity-40" />

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Total Debit
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Direct Ledger Settlement
                  </span>
                </div>
                <span className="font-number-display text-number-display text-on-surface tracking-tight tabular-nums">
                  ${pendingPayment.amount.toFixed(2)}
                </span>
              </div>
            </section>

            {/* Security Strip */}
            <section className="bg-surface-container-low rounded-xl p-3.5 flex items-center gap-3 mb-space-lg shadow-sm border border-surface-container-high/40">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-primary tracking-wide">
                    SECURE LINK
                  </span>
                  <span className="text-surface-variant text-[5px]">●</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    Session #TL-849102
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Replay-Protected • 256-bit AES Hardware Authentication
                </span>
              </div>
            </section>
          </div>

          {/* Interactive Action Trays */}
          <section className="flex flex-col gap-3 mt-auto">
            {/* Primary Authorization CTA */}
            <button
              id="auth-button"
              type="button"
              onClick={handleClick}
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              className={`relative w-full h-[54px] rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-3 shadow-md transition-all duration-200 select-none overflow-hidden active:scale-[0.99] ${
                isAuthenticating
                  ? 'bg-surface-container-highest text-primary'
                  : 'bg-primary-container text-on-primary-container hover:brightness-105'
              }`}
            >
              {/* Hold Scrim */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-primary opacity-30 transition-all duration-75 pointer-events-none"
                style={{ width: `${holdProgress}%` }}
              />
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                face
              </span>
              <span className="tracking-tight">{authLabel}</span>
            </button>

            {/* Secondary Reject Action */}
            <button
              onClick={() => openModal('nfc-error')}
              className="w-full h-12 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors active:bg-surface-container-high border border-surface-container-high/60"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              <span>Reject Payment or Test Error Screen</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
