import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AdjustLimitModal: React.FC = () => {
  const { closeModal, cardSettings, updateMonthlyLimit } = useApp();
  const [tempLimit, setTempLimit] = useState(cardSettings.monthlyLimit);

  const presets = [10000, 15000, 25000, 50000];

  const handleSave = () => {
    updateMonthlyLimit(tempLimit);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-[420px] bg-surface-container rounded-2xl p-6 border border-primary/20 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Adjust Monthly Limit</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Modify the maximum monthly authorization threshold for physical and virtual cards.
        </p>

        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low border border-surface-container-high">
          <span className="font-label-sm text-outline uppercase tracking-wider">Configured Threshold</span>
          <span className="font-display-hero-mobile text-primary font-bold tabular-nums">
            ${tempLimit.toLocaleString('en-US')}
          </span>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-2">
          {presets.map((amt) => (
            <button
              key={amt}
              onClick={() => setTempLimit(amt)}
              className={`py-2 rounded-lg font-label-md text-xs transition-all ${
                tempLimit === amt
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ${amt / 1000}k
            </button>
          ))}
        </div>

        {/* Range Slider */}
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min="5000"
            max="100000"
            step="1000"
            value={tempLimit}
            onChange={(e) => setTempLimit(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer h-2 bg-surface-container-highest rounded-lg"
          />
          <div className="flex justify-between font-label-sm text-outline text-[11px]">
            <span>$5,000</span>
            <span>$50,000</span>
            <span>$100,000</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={closeModal}
            className="flex-1 h-12 rounded-xl bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-semibold hover:brightness-105 active:scale-[0.99] transition-all"
          >
            Save Limit
          </button>
        </div>
      </div>
    </div>
  );
};

export const DynamicQrModal: React.FC = () => {
  const { closeModal, pendingPayment, authorizePayment } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-[420px] bg-surface-container rounded-2xl p-6 border border-primary/20 shadow-2xl flex flex-col items-center text-center gap-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">qr_code_2</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Dynamic QR Code</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Present this one-time token to the cashier laser barcode/QR reader.
        </p>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl shadow-xl flex items-center justify-center">
          <svg className="w-48 h-48" viewBox="0 0 100 100" fill="none">
            {/* Simulated Clean Stylized QR Matrix */}
            <rect width="100" height="100" fill="white" />
            {/* Top-left position marker */}
            <rect x="10" y="10" width="24" height="24" fill="#131313" />
            <rect x="14" y="14" width="16" height="16" fill="white" />
            <rect x="18" y="18" width="8" height="8" fill="#131313" />
            {/* Top-right position marker */}
            <rect x="66" y="10" width="24" height="24" fill="#131313" />
            <rect x="70" y="14" width="16" height="16" fill="white" />
            <rect x="74" y="18" width="8" height="8" fill="#131313" />
            {/* Bottom-left position marker */}
            <rect x="10" y="66" width="24" height="24" fill="#131313" />
            <rect x="14" y="70" width="16" height="16" fill="white" />
            <rect x="18" y="74" width="8" height="8" fill="#131313" />
            {/* Data blocks */}
            <rect x="38" y="14" width="6" height="6" fill="#131313" />
            <rect x="48" y="14" width="12" height="6" fill="#131313" />
            <rect x="38" y="24" width="10" height="10" fill="#131313" />
            <rect x="52" y="28" width="8" height="6" fill="#131313" />
            <rect x="14" y="38" width="8" height="10" fill="#131313" />
            <rect x="26" y="42" width="12" height="6" fill="#131313" />
            <rect x="42" y="42" width="16" height="16" fill="#C8A64D" />
            <rect x="62" y="42" width="8" height="14" fill="#131313" />
            <rect x="74" y="38" width="12" height="6" fill="#131313" />
            <rect x="74" y="48" width="6" height="12" fill="#131313" />
            <rect x="38" y="66" width="12" height="6" fill="#131313" />
            <rect x="54" y="66" width="6" height="12" fill="#131313" />
            <rect x="64" y="66" width="14" height="8" fill="#131313" />
            <rect x="38" y="78" width="16" height="8" fill="#131313" />
            <rect x="60" y="80" width="8" height="8" fill="#131313" />
            <rect x="74" y="76" width="14" height="12" fill="#131313" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-label-sm text-outline uppercase tracking-wider">
            Token: TL-QR-904128
          </span>
          <span className="font-body-md text-on-surface font-semibold">
            {pendingPayment.merchant} • ${pendingPayment.amount.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => {
            authorizePayment();
          }}
          className="w-full h-12 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-semibold hover:brightness-105 active:scale-[0.99] transition-all"
        >
          Simulate Optical Scanner Confirmation
        </button>
      </div>
    </div>
  );
};

export const PinModal: React.FC = () => {
  const { closeModal, showToast } = useApp();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-[420px] bg-surface-container rounded-2xl p-6 border border-primary/20 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">password</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Obsidian Hardware PIN</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your PIN is securely synchronized directly with the cryptographic element in your titanium Obsidian card.
        </p>

        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-surface-container-low border border-surface-container-high gap-3">
          <span className="font-label-sm text-outline uppercase tracking-wider">Physical Card PIN</span>
          <div className="flex items-center gap-4 text-3xl font-mono tracking-widest text-primary font-bold">
            {revealed ? (
              <span>8 4 9 1</span>
            ) : (
              <span>• • • •</span>
            )}
          </div>
          <button
            onClick={() => setRevealed(!revealed)}
            className="text-xs text-primary font-medium hover:underline mt-1"
          >
            {revealed ? 'Conceal PIN' : 'Authenticate with Face ID to View'}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 h-12 rounded-xl bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              showToast('Hardware PIN re-key requested via secure enclave');
              closeModal();
            }}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-semibold hover:brightness-105 active:scale-[0.99] transition-all"
          >
            Reset PIN
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReplaceCardModal: React.FC = () => {
  const { closeModal, showToast } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-[420px] bg-surface-container rounded-2xl p-6 border border-primary/20 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">sync_saved_locally</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Reissue Obsidian Metal</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your existing card will remain active until the replacement titanium metal card is authenticated via mobile NFC.
        </p>

        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
          <div className="flex justify-between font-body-sm">
            <span className="text-on-surface-variant">Courier Delivery</span>
            <span className="text-on-surface font-medium">Armored Express (Next Day)</span>
          </div>
          <div className="flex justify-between font-body-sm">
            <span className="text-on-surface-variant">Delivery Address</span>
            <span className="text-on-surface font-medium">Mayfair, London W1K</span>
          </div>
          <div className="flex justify-between font-body-sm">
            <span className="text-on-surface-variant">Private Tier Fee</span>
            <span className="text-primary font-semibold">Waived ($0.00)</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 h-12 rounded-xl bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              showToast('Titanium express courier dispatch scheduled');
              closeModal();
            }}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-semibold hover:brightness-105 active:scale-[0.99] transition-all"
          >
            Confirm Reissue
          </button>
        </div>
      </div>
    </div>
  );
};
