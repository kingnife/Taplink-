import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../types';

export const NfcDiagnosticsModal: React.FC = () => {
  const { closeModal, openModal, showToast } = useApp();
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryLabel, setRetryLabel] = useState('Try NFC Tap Again');

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryLabel('Positioning Near Reader...');

    setTimeout(() => {
      setRetryLabel('Hold Near Terminal Wave');
      setTimeout(() => {
        setIsRetrying(false);
        setRetryLabel('Try NFC Tap Again');
        openModal('nfc-session');
      }, 1200);
    }, 1000);
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col pt-20 pb-8 px-margin select-none justify-between">
          <div>
            {/* Status Alert Banner */}
            <div className="mt-space-sm mb-space-md flex items-center justify-between px-space-md py-space-xs rounded-full bg-surface-container-low border border-surface-container-high/60">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Session Active • Not Charged
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-mono">
                Token #TL-8921
              </span>
            </div>

            {/* Contextual Warning Emblem */}
            <div className="flex flex-col items-center text-center mt-space-sm mb-space-lg">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high shadow-xl mb-space-md border border-primary/20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary-container/20 to-transparent" />
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-surface-container border border-surface-container-highest">
                  <span className="material-symbols-outlined text-[32px] text-secondary">
                    contactless_off
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center shadow-md border border-secondary">
                  <span
                    className="material-symbols-outlined text-[15px] text-on-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    priority_high
                  </span>
                </div>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                NFC Reader Not Detected
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px]">
                The contactless terminal timed out or your antenna could not establish a stable
                connection with the counter reader.
              </p>
            </div>

            {/* Preserved Session Ledger Card */}
            <div className="bg-surface-container rounded-xl p-space-md mb-space-md shadow-md border border-surface-container-high/60">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg border border-surface-container-high/40">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      storefront
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Reserved Intent
                    </p>
                    <p className="font-headline-sm text-headline-sm text-on-surface truncate">
                      Aesop Soho Flagship
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-space-xs">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Amount
                  </p>
                  <p className="font-number-display text-number-display text-on-surface tabular-nums">
                    $184.50
                  </p>
                </div>
              </div>

              {/* Reassurance Micro-state */}
              <div className="flex items-center gap-space-xs px-space-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                <span className="font-body-sm text-body-sm">
                  Zero funds deducted. Session secured for 04:48.
                </span>
              </div>
            </div>

            {/* Diagnostic Checklist Box */}
            <div className="bg-surface-container rounded-xl p-space-md mb-space-lg shadow-md space-y-space-md border border-surface-container-high/60">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                  Hardware Diagnostics
                </span>
                <span
                  onClick={() => showToast('Diagnostics re-scanned: Antenna clear')}
                  className="font-label-sm text-label-sm text-secondary flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <span className="material-symbols-outlined text-[14px]">tune</span> Live Scan
                </span>
              </div>

              {/* Diagnostic Item 1 */}
              <div className="flex items-start gap-space-sm">
                <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5 border border-secondary/30">
                  <span
                    className="material-symbols-outlined text-[17px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-headline-sm text-body-md text-on-surface">
                      Device NFC Subsystem
                    </p>
                    <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded border border-secondary/20 font-semibold">
                      Active
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Hardware antenna operational and authorized.
                  </p>
                </div>
              </div>

              {/* Diagnostic Item 2 */}
              <div className="flex items-start gap-space-sm">
                <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5 border border-secondary">
                  <span className="material-symbols-outlined text-[17px] text-on-secondary-container">
                    sensors_off
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-headline-sm text-body-md text-on-surface">
                      Terminal Signal
                    </p>
                    <span className="font-label-sm text-label-sm text-tertiary bg-surface-container-high px-2 py-0.5 rounded border border-tertiary/20 font-semibold">
                      Interrupted
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Point-of-sale reader closed socket or suffered interference.
                  </p>
                </div>
              </div>

              {/* Diagnostic Item 3 */}
              <div className="flex items-start gap-space-sm">
                <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5 border border-outline/30">
                  <span className="material-symbols-outlined text-[17px] text-on-surface-variant">
                    shield
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-headline-sm text-body-md text-on-surface">
                      Physical Clearance
                    </p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded border border-surface-container-highest">
                      Advisory
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Thick metallic armor cases, card inserts, or MagSafe accessories can dampen
                    signal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Actions Section */}
          <div className="space-y-space-sm mb-space-lg">
            {/* Primary Retry Action */}
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className={`w-full h-[52px] bg-primary text-on-primary font-headline-sm text-headline-sm rounded-xl flex items-center justify-center gap-space-xs transition-all active:scale-[0.99] shadow-lg shadow-primary-container/20 hover:brightness-105 ${
                isRetrying ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-500 ${
                  isRetrying ? 'animate-spin' : ''
                }`}
              >
                sync
              </span>
              <span>{retryLabel}</span>
            </button>

            {/* Alternative Recovery 1: Dynamic QR Code */}
            <button
              onClick={() => openModal('dynamic-qr')}
              className="w-full min-h-[56px] px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-left rounded-xl flex items-center justify-between gap-space-md transition-all active:scale-[0.99] border border-surface-container-high/60"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    qr_code_2
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    Pay via Dynamic QR Code
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Display one-time token for merchant laser scanner
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                chevron_right
              </span>
            </button>

            {/* Alternative Recovery 2: Merchant Push Transfer */}
            <button
              onClick={() => showToast('Direct push dispatch triggered to Aesop POS #7829')}
              className="w-full min-h-[56px] px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-left rounded-xl flex items-center justify-between gap-space-md transition-all active:scale-[0.99] border border-surface-container-high/60"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    send_money
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    Merchant Push Transfer
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Direct dispatch using Aesop Soho terminal ID: #7829
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                chevron_right
              </span>
            </button>

            {/* Cancel & Return to Home */}
            <div className="text-center pt-space-xs">
              <button
                onClick={closeModal}
                className="inline-flex items-center justify-center py-2 px-space-md text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
              >
                Cancel &amp; Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
