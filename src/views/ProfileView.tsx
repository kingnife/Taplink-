import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../types';

export const ProfileView: React.FC = () => {
  const {
    profileSettings,
    trustedDevices,
    toggleBiometrics,
    revokeDevice,
    showToast,
    resetAllState,
    openModal
  } = useApp();

  return (
    <div className="flex flex-col w-full px-margin pb-28 pt-20 space-y-space-md select-none">
      {/* TOP PROFILE CARD (Obsidian & Champagne Craft) */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md border border-surface-container-high/60">
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
        <div className="flex items-start gap-space-md relative z-10">
          {/* Avatar with Champagne Accent Ring */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-primary-container shadow-sm">
              <img
                alt="Elena Voronina"
                className="w-full h-full rounded-full object-cover"
                src={ASSETS.avatar}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-surface-container flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16845B]" />
            </div>
          </div>

          {/* Identity Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-space-xs mb-0.5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                Elena Voronina
              </h2>
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>

            {/* Account Tier Pill */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-primary my-1 border border-primary/20">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield
              </span>
              <span className="font-label-sm text-label-sm tracking-wide">
                Obsidian Private Tier II
              </span>
            </div>

            {/* Membership Metadata */}
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Client #TL-883921 <span className="mx-1 opacity-40">•</span> Verified since 2021
            </p>
          </div>
        </div>

        {/* Security Posture Mini Meter */}
        <div className="mt-space-md pt-space-sm bg-surface-container-high/40 -mx-space-md -mb-space-md px-space-md py-3 flex items-center justify-between border-t border-surface-container-high/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
            <span className="font-label-sm text-label-sm text-on-surface">
              Maximum Vault Hardening Active
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20 font-semibold">
            100% Secure
          </span>
        </div>
      </div>

      {/* SECTION 1: SECURITY & BIOMETRICS */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Security &amp; Biometrics
          </span>
          <span className="font-label-sm text-label-sm text-primary">Biometric Guard</span>
        </div>

        <div className="rounded-xl bg-surface-container overflow-hidden border border-surface-container-high/60 divide-y divide-surface-container-high">
          {/* Biometric Toggle Row */}
          <div className="flex items-center justify-between min-h-[64px] px-space-md py-2.5">
            <div className="flex items-center gap-space-md min-w-0 pr-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                  Biometric Face ID / Fingerprint
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Required for payments over $100
                </span>
              </div>
            </div>

            <button
              role="switch"
              aria-checked={profileSettings.biometricFaceId}
              onClick={toggleBiometrics}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                profileSettings.biometricFaceId ? 'bg-primary-container' : 'bg-surface-variant'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-on-primary shadow-sm ring-0 transition duration-200 ease-in-out mt-1 ${
                  profileSettings.biometricFaceId ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Passcode & Hardware Key */}
          <div
            onClick={() => showToast('Passcode verified via enclave')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">pin</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  Passcode &amp; Hardware Key
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  6-digit Passcode set
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div
            onClick={() => showToast('Strict YubiKey + SMS hardware multi-factor operational')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">key</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  Two-Factor Authentication
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Hardware Key + SMS
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
                Strict
              </span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                chevron_right
              </span>
            </div>
          </div>

          {/* Auto-Lock Timer */}
          <div
            onClick={() => showToast('Auto-lock timer set to immediate 0s latency')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">timer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  Auto-Lock Timer
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Immediately upon exit
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant flex-shrink-0">
              <span className="font-label-sm text-label-sm text-outline">0s delay</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: DEVICE MANAGEMENT & SESSIONS */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Trusted Devices (2 Active)
          </span>
          <button
            onClick={() => showToast('Displaying 2 registered cryptographic devices')}
            className="font-label-sm text-label-sm text-primary hover:underline"
          >
            Manage All
          </button>
        </div>

        <div className="rounded-xl bg-surface-container overflow-hidden border border-surface-container-high/60 divide-y divide-surface-container-high">
          {trustedDevices.map((device) => (
            <div
              key={device.id}
              className={`flex items-center justify-between min-h-[64px] px-space-md py-3 transition-opacity ${
                device.isRevoked ? 'opacity-30 pointer-events-none' : ''
              }`}
            >
              <div className="flex items-start gap-space-md min-w-0">
                <div className="relative w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">
                    {device.name.includes('iPhone') ? 'phone_iphone' : 'laptop_mac'}
                  </span>
                  {device.isCurrent && !device.isRevoked && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16845B] ring-2 ring-surface-container" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                      {device.name}
                    </span>
                    {device.isCurrent && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-surface-container-high text-primary border border-primary/20">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {device.lastActive}
                  </span>
                </div>
              </div>

              <div className="flex items-center flex-shrink-0 ml-2">
                {device.isCurrent ? (
                  <span
                    className="material-symbols-outlined text-[18px] text-[#16845B]"
                    title="Secured with Secure Enclave"
                  >
                    lock
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => revokeDevice(device.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-surface-container-high text-error font-label-sm text-label-sm active:bg-error-container/30 transition-colors border border-error/20"
                  >
                    {device.isRevoked ? 'Revoked' : 'Revoke'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: PAYMENT & PRIVACY LIMITS */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Payment &amp; Privacy Limits
          </span>
        </div>

        <div className="rounded-xl bg-surface-container overflow-hidden border border-surface-container-high/60 divide-y divide-surface-container-high">
          {/* NFC Tap Confirmation Threshold */}
          <div
            onClick={() => showToast('Biometric NFC threshold set: Always require Face ID')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">contactless</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  NFC Tap Confirmation Threshold
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Always require hold / Face ID
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </div>
          </div>

          {/* Data Sharing & Privacy */}
          <div
            onClick={() => showToast('Strict Zero-Knowledge privacy mode active')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  Data Sharing &amp; Privacy
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Strict Privacy Mode Enabled
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary mr-1" />
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                chevron_right
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: SUPPORT & DOCUMENTATION */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Private Advisory
          </span>
        </div>

        <div className="rounded-xl bg-surface-container overflow-hidden border border-surface-container-high/60 divide-y divide-surface-container-high">
          {/* Concierge Support */}
          <div
            onClick={() => showToast('Private banker hotline: +44 20 7946 0912 connected')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  Private Concierge Support
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  24/7 Priority Banker connected
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
                Active
              </span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                chevron_right
              </span>
            </div>
          </div>

          {/* Legal & Disclosures */}
          <div
            onClick={() => showToast('Accessing PRA / FCA regulatory disclosure docket')}
            className="flex items-center justify-between min-h-[56px] px-space-md py-2.5 active:bg-surface-container-high/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-md min-w-0 pr-2">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                  Legal, Licenses &amp; Disclosures
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Regulatory filings &amp; banking terms
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: SIGN OUT ACTION */}
      <div className="pt-space-sm pb-2">
        <button
          type="button"
          onClick={resetAllState}
          className="w-full h-[52px] rounded-xl bg-surface-container text-error hover:bg-error-container/20 flex items-center justify-center gap-2 active:scale-[0.99] transition-all font-headline-sm text-headline-sm shadow-sm border border-error/20"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sign Out / Reset Node</span>
        </button>
        <p className="font-body-sm text-body-sm text-outline text-center mt-3">
          App Build v4.12.0 (Build 9042) • Encrypted via TLS 1.3
        </p>
      </div>
    </div>
  );
};
