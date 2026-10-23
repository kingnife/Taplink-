import React from 'react';
import { useApp } from '../context/AppContext';

export const CardsView: React.FC = () => {
  const {
    cardSettings,
    toggleCardFreeze,
    toggleCardDetails,
    setCardType,
    toggleCardChannel,
    openModal,
    showToast
  } = useApp();

  const isVirtual = cardSettings.cardType === 'virtual';
  const spent = cardSettings.monthlySpent;
  const limit = cardSettings.monthlyLimit;
  const percentSpent = Math.min(100, (spent / limit) * 100);
  const availableAmount = Math.max(0, limit - spent);
  const percentAvailable = (100 - percentSpent).toFixed(1);

  return (
    <div className="flex flex-col w-full px-margin pb-28 pt-20 space-y-space-md select-none">
      {/* Top Selector: Physical Obsidian vs Virtual Disposable */}
      <div className="flex items-center justify-between p-1 bg-surface-container rounded-xl border border-surface-container-high/60">
        <button
          onClick={() => setCardType('physical')}
          className={`flex-1 py-2.5 px-3 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${
            !isVirtual
              ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">credit_card</span>
          <span>Obsidian Metal</span>
        </button>

        <button
          onClick={() => setCardType('virtual')}
          className={`flex-1 py-2.5 px-3 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${
            isVirtual
              ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">token</span>
          <span>Virtual Fleet</span>
        </button>
      </div>

      {/* Luxury Metal Card Stage */}
      <div
        className={`relative w-full aspect-[1.586/1] rounded-xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl bg-surface-container-lowest transition-all duration-300 border border-primary/20 ${
          cardSettings.isFrozen ? 'grayscale opacity-60' : ''
        }`}
      >
        {/* Texture & Precision Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest via-surface-container-low to-surface-variant/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
        {/* Hairline Inner Accent Bevel */}
        <div className="absolute inset-[1px] rounded-[11px] pointer-events-none bg-gradient-to-b from-primary/20 via-transparent to-primary/5 opacity-60" />

        {/* Top Card Header: Crest & Contactless Signal */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high/90 flex items-center justify-center shadow-inner border border-primary/30">
              <span className="text-primary font-headline-sm text-headline-sm tracking-tighter font-bold">
                TL
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary font-bold">
                {isVirtual ? 'Fleet Alpha' : 'Obsidian'}
              </span>
              <span className="font-body-sm text-[10px] leading-3 text-on-surface-variant uppercase tracking-wider">
                {isVirtual ? 'Dynamic Virtual' : 'Infinite Private'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`material-symbols-outlined text-primary text-[20px] rotate-90 opacity-80 ${
                cardSettings.contactless ? '' : 'line-through opacity-40'
              }`}
              title="Contactless Active"
            >
              contactless
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-label-sm tracking-wider uppercase font-semibold ${
                cardSettings.isFrozen
                  ? 'bg-error-container text-error'
                  : 'bg-surface-container-high/80 text-on-surface-variant'
              }`}
            >
              {cardSettings.isFrozen ? 'Locked' : 'Active'}
            </span>
          </div>
        </div>

        {/* Chip & Holographic Inlay Details */}
        <div className="relative z-10 flex items-center gap-4 my-auto pt-2">
          {/* Metallic EMV Chip */}
          <div className="w-11 h-8 rounded-md bg-gradient-to-br from-tertiary-fixed via-primary-container to-secondary-container p-0.5 flex flex-col justify-between shadow-sm relative overflow-hidden border border-primary/40">
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.4)_50%,transparent_75%)]" />
            <div className="w-full h-[1px] bg-on-primary-container/30 mt-2" />
            <div className="w-full h-[1px] bg-on-primary-container/30 mb-2" />
          </div>
          {/* Subtle Obsidian Monogram */}
          <span className="material-symbols-outlined text-[28px] text-primary/30">shield</span>
        </div>

        {/* Cardholder & Number Bottom Layout */}
        <div className="relative z-10 space-y-3">
          {/* Masked Account Numbers */}
          <div className="flex items-center justify-between text-on-surface font-number-display text-[19px] tracking-[0.22em] tabular-nums">
            {cardSettings.showDetails ? (
              <>
                <span>4155</span>
                <span>8892</span>
                <span>0034</span>
                <span className="text-primary-fixed-dim">9412</span>
              </>
            ) : (
              <>
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
                <span className="text-primary-fixed-dim">9412</span>
              </>
            )}
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <p className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                Cardholder
              </p>
              <p className="font-headline-sm text-headline-sm tracking-wider text-on-surface uppercase font-medium">
                {isVirtual ? 'DISPOSABLE ONLINE' : 'Elena Voronina'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                  Expires
                </p>
                <p className="font-label-md text-label-md text-on-surface tabular-nums">09/28</p>
              </div>
              <div className="h-6 flex items-center">
                <span className="font-headline-sm text-headline-sm italic font-extrabold text-on-surface/90 tracking-tight">
                  VISA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Card Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {/* Freeze Toggle */}
        <button
          aria-label="Toggle Card Freeze"
          onClick={toggleCardFreeze}
          className="group flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.98] min-h-[76px] border border-surface-container-high/60"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              cardSettings.isFrozen
                ? 'bg-error-container text-error'
                : 'bg-surface-container-high text-primary group-hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {cardSettings.isFrozen ? 'lock' : 'lock_open'}
            </span>
          </div>
          <span
            className={`font-label-sm text-label-sm mt-2 transition-colors ${
              cardSettings.isFrozen ? 'text-error font-semibold' : 'text-on-surface-variant group-hover:text-on-surface'
            }`}
          >
            {cardSettings.isFrozen ? 'Unlock' : 'Lock'}
          </span>
        </button>

        {/* Show Card Details */}
        <button
          aria-label="Reveal Card Details"
          onClick={toggleCardDetails}
          className="group flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.98] min-h-[76px] border border-surface-container-high/60"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[22px]">
              {cardSettings.showDetails ? 'visibility_off' : 'visibility'}
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 group-hover:text-on-surface transition-colors">
            {cardSettings.showDetails ? 'Conceal' : 'Details'}
          </span>
        </button>

        {/* Replace / Reissue Card */}
        <button
          aria-label="Replace or report card"
          onClick={() => openModal('replace-card')}
          className="group flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.98] min-h-[76px] border border-surface-container-high/60"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[22px]">sync_saved_locally</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 group-hover:text-on-surface transition-colors">
            Replace
          </span>
        </button>

        {/* Add to Apple / Google Wallet */}
        <button
          aria-label="Add to digital wallet"
          onClick={() => showToast('Synchronized with Apple Wallet and Google Pay')}
          className="group flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.98] min-h-[76px] border border-surface-container-high/60"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[22px]">wallet</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 group-hover:text-on-surface transition-colors">
            Wallet
          </span>
        </button>
      </div>

      {/* Monthly Velocity & Spending Limit Bento Tile */}
      <div className="p-5 rounded-xl bg-surface-container space-y-4 border border-surface-container-high/60">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-outline">
              Capital Controls
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
              Monthly Limit
            </h2>
          </div>
          <button
            onClick={() => openModal('adjust-limit')}
            className="px-3.5 py-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container-highest font-label-md text-label-md transition-colors flex items-center gap-1 active:scale-95 border border-primary/20"
          >
            <span>Adjust</span>
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-lg text-headline-lg text-primary tabular-nums">
                ${spent.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">spent</span>
            </div>
            <div className="text-right">
              <span className="font-body-md text-body-md text-on-surface-variant tabular-nums">
                ${limit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} threshold
              </span>
            </div>
          </div>

          {/* Refined Gold-to-Dark Linear Progress Track */}
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${percentSpent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1 font-body-sm text-body-sm text-on-surface-variant">
            <span>
              {percentAvailable}% Available (${availableAmount.toLocaleString('en-US')})
            </span>
            <span className="text-outline">Resets in 11 days</span>
          </div>
        </div>
      </div>

      {/* Card Channels & Security Switches */}
      <div className="rounded-xl bg-surface-container divide-y divide-surface-container-high overflow-hidden border border-surface-container-high/60">
        {/* Contactless */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">contactless</span>
            </div>
            <div className="min-w-0">
              <p className="font-body-md text-body-md font-semibold text-on-surface truncate">
                Contactless &amp; NFC
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Daily threshold $2,500/day
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={cardSettings.contactless}
            onClick={() => toggleCardChannel('contactless')}
            className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none ${
              cardSettings.contactless ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-[2px] left-[2px] w-6 h-6 rounded-full transition-transform ${
                cardSettings.contactless
                  ? 'translate-x-5 bg-on-primary'
                  : 'translate-x-0 bg-on-surface'
              }`}
            />
          </button>
        </div>

        {/* Online Transactions */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">language</span>
            </div>
            <div className="min-w-0">
              <p className="font-body-md text-body-md font-semibold text-on-surface truncate">
                Online Transactions
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                3D Secure v2.2 biometrics
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={cardSettings.online}
            onClick={() => toggleCardChannel('online')}
            className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none ${
              cardSettings.online ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-[2px] left-[2px] w-6 h-6 rounded-full transition-transform ${
                cardSettings.online
                  ? 'translate-x-5 bg-on-primary'
                  : 'translate-x-0 bg-on-surface'
              }`}
            />
          </button>
        </div>

        {/* ATM Cash Withdrawals */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">local_atm</span>
            </div>
            <div className="min-w-0">
              <p className="font-body-md text-body-md font-semibold text-on-surface truncate">
                ATM Cash Withdrawals
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Daily cash quota $1,000
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={cardSettings.atm}
            onClick={() => toggleCardChannel('atm')}
            className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none ${
              cardSettings.atm ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-[2px] left-[2px] w-6 h-6 rounded-full transition-transform ${
                cardSettings.atm
                  ? 'translate-x-5 bg-on-primary'
                  : 'translate-x-0 bg-on-surface'
              }`}
            />
          </button>
        </div>

        {/* International Roaming */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">public_off</span>
            </div>
            <div className="min-w-0">
              <p className="font-body-md text-body-md font-semibold text-on-surface truncate">
                International Roaming
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Block cross-border charges
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={cardSettings.roaming}
            onClick={() => toggleCardChannel('roaming')}
            className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none ${
              cardSettings.roaming ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-[2px] left-[2px] w-6 h-6 rounded-full transition-transform ${
                cardSettings.roaming
                  ? 'translate-x-5 bg-on-primary'
                  : 'translate-x-0 bg-on-surface'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Hardware PIN & Geographic Guard Stack */}
      <div className="rounded-xl bg-surface-container overflow-hidden border border-surface-container-high/60">
        <button
          onClick={() => openModal('view-pin')}
          className="w-full p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors text-left border-b border-surface-container-high active:bg-surface-container-highest"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">password</span>
            </div>
            <div>
              <p className="font-body-md text-body-md font-semibold text-on-surface">
                View or Reset PIN
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Instant encrypted hardware sync
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
        </button>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">near_me</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-body-md text-body-md font-semibold text-on-surface truncate">
                  Geographic Guard
                </p>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-semibold">
                  GPS
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Validate POS with mobile telemetry
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={cardSettings.geoGuard}
            onClick={() => toggleCardChannel('geoGuard')}
            className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none ${
              cardSettings.geoGuard ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-[2px] left-[2px] w-6 h-6 rounded-full transition-transform ${
                cardSettings.geoGuard
                  ? 'translate-x-5 bg-on-primary'
                  : 'translate-x-0 bg-on-surface'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
