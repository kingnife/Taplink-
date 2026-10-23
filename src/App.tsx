import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { ScreenSwitcher } from './components/ScreenSwitcher';

import { HomeView } from './views/HomeView';
import { CardsView } from './views/CardsView';
import { InsightsView } from './views/InsightsView';
import { ProfileView } from './views/ProfileView';

import { NfcSessionModal } from './components/modals/NfcSessionModal';
import { TransactionAuthModal } from './components/modals/TransactionAuthModal';
import { TransactionReceiptModal } from './components/modals/TransactionReceiptModal';
import { NfcDiagnosticsModal } from './components/modals/NfcDiagnosticsModal';
import {
  AdjustLimitModal,
  DynamicQrModal,
  PinModal,
  ReplaceCardModal
} from './components/modals/UtilityModals';
import { NotificationsModal } from './components/modals/NotificationsModal';

const MainApp: React.FC = () => {
  const { activeTab, activeModal } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'cards':
        return <CardsView />;
      case 'insights':
        return <InsightsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex justify-center selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Luxury ambient background glow for larger displays */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-primary/10 via-tertiary/5 to-transparent blur-3xl" />
      </div>

      {/* Primary Mobile Container Frame */}
      <div className="relative w-full max-w-[480px] min-h-screen bg-surface flex flex-col shadow-2xl border-x border-surface-container-high/40">
        <Header />
        
        <main className="flex-1 w-full flex flex-col">
          {renderActiveView()}
        </main>

        <BottomNav />
        <Toast />
      </div>

      {/* Modal Sheet Overlays */}
      {activeModal === 'nfc-session' && <NfcSessionModal />}
      {activeModal === 'tx-auth' && <TransactionAuthModal />}
      {activeModal === 'tx-receipt' && <TransactionReceiptModal />}
      {activeModal === 'nfc-error' && <NfcDiagnosticsModal />}
      {activeModal === 'adjust-limit' && <AdjustLimitModal />}
      {activeModal === 'dynamic-qr' && <DynamicQrModal />}
      {activeModal === 'view-pin' && <PinModal />}
      {activeModal === 'replace-card' && <ReplaceCardModal />}
      {activeModal === 'notifications' && <NotificationsModal />}

      {/* Screen testing companion toolbar */}
      <ScreenSwitcher />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
