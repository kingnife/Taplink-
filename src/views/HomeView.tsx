import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const {
    balance,
    isBalanceMasked,
    toggleBalanceMask,
    showToast,
    copyToClipboard,
    startNfcSession,
    setActiveTab,
    openModal,
    transactions
  } = useApp();

  const [copied, setCopied] = useState(false);

  const handleCopyVault = () => {
    copyToClipboard('GB89TPLK94120000008425', 'Vault IBAN');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedBalance = `$${balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

  return (
    <div className="flex flex-col w-full px-margin pb-28 pt-20 gap-space-md select-none">
      {/* Subtle Ambient Glow & Welcome Ribbon */}
      <section className="flex flex-col gap-space-xs pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">
              Encrypted &amp; Active
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Thursday, Oct 24</span>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Welcome back,</p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Good evening, Elena
            </h2>
          </div>
          <button
            aria-label="Security settings"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high text-tertiary transition-transform active:scale-95 shadow-sm hover:brightness-110"
            onClick={() => setActiveTab('profile')}
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </button>
        </div>
      </section>

      {/* Total Available Balance Card */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container p-5 shadow-xl flex flex-col gap-3 border border-surface-container-high/60">
        {/* Subtle tactile mesh watermark */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none text-primary">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeWidth="6" />
            <path
              d="M25 50 C 25 30, 75 30, 75 50 C 75 70, 25 70, 25 50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Top Label & Privacy Toggle */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Total Available Balance
            </span>
          </div>
          <button
            aria-label="Toggle balance privacy"
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-1 px-1.5 rounded-lg active:bg-surface-container-high"
            onClick={toggleBalanceMask}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isBalanceMasked ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        {/* Balance Readout & Gain Badge */}
        <div className="flex items-baseline justify-between gap-2 relative z-10">
          <div className="flex items-baseline gap-1">
            {isBalanceMasked ? (
              <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-widest font-bold">
                ••••••••
              </span>
            ) : (
              <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight font-bold tabular-nums">
                {formattedBalance}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded-full text-[#16845B]">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span className="font-label-sm text-label-sm font-semibold">+2.4%</span>
          </div>
        </div>

        {/* Masked IBAN + Copy Trigger */}
        <div className="flex items-center justify-between pt-2 mt-1 relative z-10 bg-surface-container-low/70 -mx-5 -mb-5 px-5 py-3 border-t border-surface-container-high/40">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
            <span className="font-body-sm text-body-sm text-on-surface tracking-wide">
              Black Vault •••• 9412
            </span>
          </div>
          <button
            className="flex items-center gap-1 text-primary hover:text-primary-fixed transition-colors text-label-sm font-label-sm py-1 px-2 rounded-md active:bg-surface-container-high"
            onClick={handleCopyVault}
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'done' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </section>

      {/* Quick Money Actions Row */}
      <section className="grid grid-cols-4 gap-2.5">
        {/* Send */}
        <button
          onClick={() => showToast('Instant wire dispatcher ready')}
          className="group flex flex-col items-center gap-2 p-2 rounded-xl transition-all active:scale-95 focus:outline-none"
        >
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface group-hover:text-primary shadow-md transition-colors border border-surface-container-highest/40">
            <span className="material-symbols-outlined text-[24px]">arrow_outward</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
            Send
          </span>
        </button>

        {/* Receive */}
        <button
          onClick={() => openModal('dynamic-qr')}
          className="group flex flex-col items-center gap-2 p-2 rounded-xl transition-all active:scale-95 focus:outline-none"
        >
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface group-hover:text-primary shadow-md transition-colors border border-surface-container-highest/40">
            <span className="material-symbols-outlined text-[24px]">south_west</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
            Receive
          </span>
        </button>

        {/* Tap to Pay (Hero Accent Action) */}
        <button
          onClick={() => startNfcSession(false)}
          className="group relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all active:scale-95 focus:outline-none"
        >
          <div className="relative w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary-container/20 transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[26px]">contactless</span>
            {/* Ready Badge Pip */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 px-1 items-center justify-center rounded-full bg-surface-container-lowest text-[9px] font-bold text-primary ring-1 ring-primary/40">
              Ready
            </span>
          </div>
          <span className="font-label-md text-label-md text-primary font-semibold">
            Tap to Pay
          </span>
        </button>

        {/* Analytics */}
        <button
          onClick={() => setActiveTab('insights')}
          className="group flex flex-col items-center gap-2 p-2 rounded-xl transition-all active:scale-95 focus:outline-none"
        >
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface group-hover:text-primary shadow-md transition-colors border border-surface-container-highest/40">
            <span className="material-symbols-outlined text-[24px]">bar_chart</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
            Analytics
          </span>
        </button>
      </section>

      {/* Primary Linked Card Quick Glance */}
      <section
        onClick={() => setActiveTab('cards')}
        className="relative overflow-hidden rounded-xl bg-surface-container p-4 shadow-md flex items-center justify-between gap-3 border border-surface-container-high/60 cursor-pointer hover:bg-surface-container-high/40 transition-colors"
      >
        {/* Visual Card Mock Miniature */}
        <div className="relative w-20 h-13 py-2 px-2.5 rounded-lg bg-surface-container-lowest flex flex-col justify-between shrink-0 shadow-inner overflow-hidden border border-surface-container-high/80">
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-highest/20 via-transparent to-primary/10 pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <span className="material-symbols-outlined text-primary text-[14px]">contactless</span>
            <div className="w-3.5 h-2.5 rounded-[2px] bg-primary/70" />
          </div>
          <span className="font-label-sm text-[8px] text-outline tracking-widest font-mono relative z-10 leading-none">
            •••• 4821
          </span>
        </div>

        {/* Card Description & Balance */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm text-on-surface truncate">
              Obsidian Metal
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
            TapLink Virtual • Active
          </p>
        </div>

        {/* Value & Expand Trigger */}
        <div className="text-right shrink-0 flex items-center gap-2">
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tabular-nums">
              $12,480.00
            </span>
            <p className="font-label-sm text-[10px] text-on-surface-variant uppercase">
              Card Limit
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            chevron_right
          </span>
        </div>
      </section>

      {/* Visual Wealth Trend Sparkline Mini-Banner */}
      <section className="rounded-xl bg-surface-container-low p-4 flex items-center justify-between gap-3 border border-surface-container-high/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">insights</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-medium">
              Private Yield Tier II
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Accruing daily at 4.85% APY
            </p>
          </div>
        </div>

        {/* Lightweight SVG Sparkline */}
        <svg className="w-20 h-8 shrink-0 overflow-visible" fill="none" viewBox="0 0 80 32">
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C8A64D" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C8A64D" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 26 Q 16 22, 28 20 T 52 10 T 80 4 L 80 32 L 0 32 Z" fill="url(#goldGradient)" />
          <path
            d="M 0 26 Q 16 22, 28 20 T 52 10 T 80 4"
            fill="none"
            stroke="#C8A64D"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="80" cy="4" fill="#C8A64D" r="3" />
        </svg>
      </section>

      {/* Recent Activity Section */}
      <section className="flex flex-col gap-space-sm pt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Activity</h3>
          <button
            onClick={() => showToast('Complete encrypted ledger history loaded')}
            className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors active:opacity-80 py-1"
          >
            See All ({transactions.length + 20})
          </button>
        </div>

        {/* Transactions List Container */}
        <div className="rounded-xl bg-surface-container overflow-hidden shadow-sm flex flex-col divide-y divide-surface-container-highest border border-surface-container-high/60">
          {transactions.map((tx) => {
            const isPositive = tx.amount > 0;
            return (
              <div
                key={tx.id}
                onClick={() => {
                  if (tx.recipient.includes('Aesop')) {
                    openModal('tx-receipt');
                  } else {
                    showToast(`Transaction details: ${tx.recipient} (${tx.amount < 0 ? '-' : '+'}$${Math.abs(tx.amount).toFixed(2)})`);
                  }
                }}
                className="flex items-center justify-between p-3.5 hover:bg-surface-container-high/50 transition-colors cursor-pointer active:bg-surface-container-high"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 ${
                      isPositive ? 'text-[#16845B]' : 'text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-body-md text-body-md text-on-surface font-semibold truncate">
                      {tx.recipient}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {tx.subtext}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <p
                    className={`font-body-md text-body-md font-semibold tracking-tight tabular-nums ${
                      isPositive ? 'text-[#16845B]' : 'text-on-surface'
                    }`}
                  >
                    {isPositive ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                  </p>
                  <span
                    className={`font-label-sm text-[10px] ${
                      isPositive ? 'text-[#16845B]/80' : 'text-on-surface-variant'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
