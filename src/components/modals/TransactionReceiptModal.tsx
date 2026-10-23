import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../types';

export const TransactionReceiptModal: React.FC = () => {
  const { closeModal, pendingPayment, showToast, copyToClipboard } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyRef = () => {
    copyToClipboard(pendingPayment.refCode, 'Reference number');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Payment Receipt - ${pendingPayment.merchant}`,
        text: `${pendingPayment.merchant} payment of $${pendingPayment.amount.toFixed(2)} confirmed. Ref: ${pendingPayment.refCode}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      showToast('Encrypted receipt link copied to clipboard');
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
            {/* Minimal Top Header Bar for Receipt Actions */}
            <div className="flex items-center justify-between py-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-tertiary">verified</span>
                <span className="font-label-md text-label-md tracking-wider uppercase text-on-surface-variant">
                  Transaction Receipt
                </span>
              </div>
              <button
                aria-label="Export or Share Receipt"
                onClick={handleShare}
                className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-all active:scale-95 shadow-sm border border-surface-container-highest/60"
              >
                <span className="material-symbols-outlined text-[20px]">ios_share</span>
              </button>
            </div>

            {/* Authoritative Verification & Status Area */}
            <div className="flex flex-col items-center text-center mt-space-sm mb-space-lg">
              {/* Distinctive Verification Seal */}
              <div className="relative flex items-center justify-center mb-space-md">
                <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center shadow-md border border-primary/20">
                  <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#16845B] flex items-center justify-center text-on-surface shadow-sm">
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                      >
                        check
                      </span>
                    </div>
                  </div>
                </div>
                {/* Floating Emblem Indicator */}
                <div className="absolute -bottom-1 -right-1 bg-surface-container-highest rounded-full p-1 shadow-sm border border-primary/20">
                  <span
                    className="material-symbols-outlined text-[15px] text-tertiary block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield
                  </span>
                </div>
              </div>

              {/* Title & Authorization Meta */}
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-1">
                Payment Successful
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[15px] text-tertiary">face</span>
                <span>Authorized via Face ID</span>
                <span className="opacity-40">•</span>
                <span>{pendingPayment.date}</span>
              </div>

              {/* Prominent Amount Block */}
              <div className="mt-space-lg flex flex-col items-center">
                <div className="font-display-hero-mobile text-display-hero-mobile text-on-surface font-number-display tracking-tight leading-none font-bold tabular-nums">
                  -${pendingPayment.amount.toFixed(2)}
                </div>
                <div className="flex items-center gap-1.5 mt-2 font-body-md text-body-md text-on-surface-variant">
                  <span>Paid to</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {pendingPayment.merchant}
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Transaction Record Card */}
            <div className="w-full bg-surface-container rounded-xl p-5 shadow-sm space-y-4 border border-surface-container-high/60">
              {/* Recipient & Merchant ID */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">storefront</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Recipient
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {pendingPayment.merchant}
                    </span>
                  </div>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-lowest px-2.5 py-1 rounded-md font-mono border border-surface-container-high">
                  MID-883921
                </span>
              </div>

              <div className="h-px w-full bg-surface-variant opacity-60" />

              {/* Funding Source */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Funding Source
                    </span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      Obsidian Debit Card
                    </span>
                  </div>
                </div>
                <span className="font-body-sm text-body-sm font-semibold tracking-widest text-on-surface bg-surface-container-high px-2 py-1 rounded font-mono border border-surface-container-highest">
                  •••• 9412
                </span>
              </div>

              {/* Terminal Details & Channel */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">contactless</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Terminal Type
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      NFC Contactless POS
                    </span>
                  </div>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Terminal #04
                </span>
              </div>

              <div className="h-px w-full bg-surface-variant opacity-60" />

              {/* Transaction Reference with Instant Copy */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Transaction Reference
                  </span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface tracking-wide mt-0.5 font-mono">
                    {pendingPayment.refCode}
                  </span>
                </div>
                <button
                  aria-label="Copy reference number"
                  onClick={handleCopyRef}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:text-primary active:scale-95 transition-all flex items-center gap-1.5 border border-surface-container-highest/60"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copied ? 'done' : 'content_copy'}
                  </span>
                  <span className="font-label-sm text-label-sm">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Auth Code and Settled Status */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Auth Code
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface font-mono mt-0.5">
                    {pendingPayment.authCode}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#16845B]/15 px-3 py-1.5 rounded-full border border-[#16845B]/30">
                  <div className="w-2 h-2 rounded-full bg-[#16845B] animate-pulse" />
                  <span className="font-label-sm text-label-sm text-[#16845B] uppercase tracking-wider font-semibold">
                    Settled &amp; Cleared
                  </span>
                </div>
              </div>
            </div>

            {/* Store Location Context Snapshot */}
            <div className="w-full bg-surface-container-low rounded-xl p-4 mt-space-md shadow-sm flex items-center gap-3 border border-surface-container-high/40">
              <div
                className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0 border border-primary/20 shadow-inner"
                style={{ backgroundImage: `url('${ASSETS.locationMap}')` }}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">
                  Location Recorded
                </span>
                <span className="font-body-md text-body-md text-on-surface truncate font-semibold">
                  41 Lexington St, Carnaby
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  London W1F 9AN, United Kingdom
                </span>
              </div>
              <button
                aria-label="View Map Pin"
                onClick={() => showToast('Opening encrypted offline city cache')}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              </button>
            </div>
          </div>

          {/* Post-Payment Action Trays */}
          <div className="flex flex-col gap-3 mt-space-lg w-full">
            {/* Primary CTA: Done */}
            <button
              onClick={closeModal}
              className="w-full h-[52px] rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-semibold flex items-center justify-center shadow-sm hover:opacity-95 active:scale-[0.99] transition-all"
            >
              Done
            </button>

            {/* Secondary Split / Download Action Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => showToast('Select contacts to split this $184.50 charge')}
                className="h-12 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-medium flex items-center justify-center gap-2 hover:bg-surface-variant active:scale-[0.98] transition-all shadow-sm border border-surface-container-highest/60"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  call_split
                </span>
                <span>Split Expense</span>
              </button>
              <button
                onClick={() => showToast('Official signed PDF receipt generated')}
                className="h-12 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-medium flex items-center justify-center gap-2 hover:bg-surface-variant active:scale-[0.98] transition-all shadow-sm border border-surface-container-highest/60"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  picture_as_pdf
                </span>
                <span>Official PDF</span>
              </button>
            </div>

            {/* Discreet Support Inquiry Link */}
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={() => showToast('Dispute investigation initiated with private banker')}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-error transition-colors py-2 px-3"
              >
                <span className="material-symbols-outlined text-[16px]">flag</span>
                <span className="font-body-sm text-body-sm underline underline-offset-4">
                  Report an issue with this transaction
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
