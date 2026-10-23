import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Transaction,
  CardSettings,
  ProfileSecuritySettings,
  TrustedDevice,
  AppTab,
  AppModal
} from '../types';

interface AppContextType {
  // State
  balance: number;
  isBalanceMasked: boolean;
  cardSettings: CardSettings;
  profileSettings: ProfileSecuritySettings;
  trustedDevices: TrustedDevice[];
  transactions: Transaction[];
  activeTab: AppTab;
  activeModal: AppModal;
  toastMessage: string | null;
  pendingPayment: {
    merchant: string;
    amount: number;
    location: string;
    refCode: string;
    authCode: string;
    date: string;
  };
  shouldSimulateFailure: boolean;

  // Actions
  setActiveTab: (tab: AppTab) => void;
  openModal: (modal: AppModal) => void;
  closeModal: () => void;
  toggleBalanceMask: () => void;
  toggleCardFreeze: () => void;
  toggleCardDetails: () => void;
  setCardType: (type: 'physical' | 'virtual') => void;
  toggleCardChannel: (channel: keyof Pick<CardSettings, 'contactless' | 'online' | 'atm' | 'roaming' | 'geoGuard'>) => void;
  updateMonthlyLimit: (newLimit: number) => void;
  revokeDevice: (id: string) => void;
  toggleBiometrics: () => void;
  showToast: (message: string) => void;
  startNfcSession: (triggerFailure?: boolean) => void;
  authorizePayment: () => void;
  resetAllState: () => void;
  copyToClipboard: (text: string, label: string) => void;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    recipient: 'Apple Store Regent St',
    subtext: 'Technology • Today 14:32',
    amount: -1299.00,
    category: 'technology',
    timestamp: 'Today 14:32',
    status: 'Cleared',
    icon: 'laptop_mac'
  },
  {
    id: 'tx-2',
    recipient: 'Transfer from Julian K.',
    subtext: 'Instant Pay • Today 11:15',
    amount: 450.00,
    category: 'deposit',
    timestamp: 'Today 11:15',
    status: 'Deposit',
    icon: 'payments',
    iconColor: '#16845B'
  },
  {
    id: 'tx-3',
    recipient: 'Blue Bottle Coffee',
    subtext: 'Dining • Yesterday',
    amount: -7.80,
    category: 'dining',
    timestamp: 'Yesterday',
    status: 'Cleared',
    icon: 'local_cafe'
  },
  {
    id: 'tx-4',
    recipient: 'Equinox Sports Club',
    subtext: 'Wellness • Oct 21',
    amount: -280.00,
    category: 'wellness',
    timestamp: 'Oct 21',
    status: 'Recurring',
    icon: 'fitness_center'
  }
];

const DEFAULT_CARD_SETTINGS: CardSettings = {
  isFrozen: false,
  showDetails: false,
  cardType: 'physical',
  monthlySpent: 4120.00,
  monthlyLimit: 15000.00,
  contactless: true,
  online: true,
  atm: true,
  roaming: false,
  geoGuard: true,
  viewPinUnlocked: false
};

const DEFAULT_PROFILE_SETTINGS: ProfileSecuritySettings = {
  biometricFaceId: true,
  twoFactorMode: 'Strict',
  autoLockDelay: '0s delay',
  nfcThresholdAlwaysFaceId: true,
  strictPrivacyMode: true,
  conciergeActive: true
};

const DEFAULT_DEVICES: TrustedDevice[] = [
  {
    id: 'dev-1',
    name: 'iPhone 15 Pro Max',
    platform: 'iOS 18.1',
    location: 'London, UK • Active now',
    lastActive: 'Active now',
    isCurrent: true,
    isRevoked: false
  },
  {
    id: 'dev-2',
    name: 'MacBook Pro 16"',
    platform: 'macOS Sonoma',
    location: 'London, UK',
    lastActive: 'macOS Sonoma • Last active 2h ago',
    isCurrent: false,
    isRevoked: false
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or fallback
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('taplink_balance');
    return saved ? parseFloat(saved) : 84250.40;
  });

  const [isBalanceMasked, setIsBalanceMasked] = useState<boolean>(() => {
    return localStorage.getItem('taplink_masked') === 'true';
  });

  const [cardSettings, setCardSettings] = useState<CardSettings>(() => {
    const saved = localStorage.getItem('taplink_card_settings');
    return saved ? JSON.parse(saved) : DEFAULT_CARD_SETTINGS;
  });

  const [profileSettings, setProfileSettings] = useState<ProfileSecuritySettings>(() => {
    const saved = localStorage.getItem('taplink_profile_settings');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE_SETTINGS;
  });

  const [trustedDevices, setTrustedDevices] = useState<TrustedDevice[]>(() => {
    const saved = localStorage.getItem('taplink_devices');
    return saved ? JSON.parse(saved) : DEFAULT_DEVICES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('taplink_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [activeModal, setActiveModal] = useState<AppModal>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  const [shouldSimulateFailure, setShouldSimulateFailure] = useState<boolean>(false);

  const [pendingPayment, setPendingPayment] = useState({
    merchant: 'Aesop Soho Flagship',
    amount: 184.50,
    location: '41 Lexington St, Carnaby, London W1F 9AN',
    refCode: 'TXN-90214820-TL',
    authCode: 'AUTH-741982',
    date: 'Oct 24, 2024 at 14:32:18 GMT'
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('taplink_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('taplink_masked', isBalanceMasked.toString());
  }, [isBalanceMasked]);

  useEffect(() => {
    localStorage.setItem('taplink_card_settings', JSON.stringify(cardSettings));
  }, [cardSettings]);

  useEffect(() => {
    localStorage.setItem('taplink_profile_settings', JSON.stringify(profileSettings));
  }, [profileSettings]);

  useEffect(() => {
    localStorage.setItem('taplink_devices', JSON.stringify(trustedDevices));
  }, [trustedDevices]);

  useEffect(() => {
    localStorage.setItem('taplink_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const showToast = (message: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    setToastTimer(timer);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    showToast(`${label} copied to clipboard`);
  };

  const toggleBalanceMask = () => {
    setIsBalanceMasked(prev => !prev);
  };

  const toggleCardFreeze = () => {
    setCardSettings(prev => {
      const next = !prev.isFrozen;
      showToast(next ? 'Obsidian Infinite has been locked' : 'Obsidian Infinite is active');
      return { ...prev, isFrozen: next };
    });
  };

  const toggleCardDetails = () => {
    setCardSettings(prev => {
      const next = !prev.showDetails;
      showToast(next ? 'Card numbers visible (CVV: 891)' : 'Card details concealed');
      return { ...prev, showDetails: next };
    });
  };

  const setCardType = (type: 'physical' | 'virtual') => {
    setCardSettings(prev => ({ ...prev, cardType: type }));
    showToast(type === 'virtual' ? 'Switched to Dynamic Virtual Fleet' : 'Switched to Physical Obsidian');
  };

  const toggleCardChannel = (channel: keyof Pick<CardSettings, 'contactless' | 'online' | 'atm' | 'roaming' | 'geoGuard'>) => {
    setCardSettings(prev => {
      const nextVal = !prev[channel];
      const names: Record<string, string> = {
        contactless: 'Contactless & NFC',
        online: 'Online Purchases',
        atm: 'ATM Withdrawals',
        roaming: 'International Roaming',
        geoGuard: 'Geographic Guard'
      };
      showToast(`${names[channel]} ${nextVal ? 'enabled' : 'disabled'}`);
      return { ...prev, [channel]: nextVal };
    });
  };

  const updateMonthlyLimit = (newLimit: number) => {
    setCardSettings(prev => ({ ...prev, monthlyLimit: newLimit }));
    showToast(`Monthly spending limit adjusted to $${newLimit.toLocaleString()}`);
  };

  const revokeDevice = (id: string) => {
    setTrustedDevices(prev =>
      prev.map(d => (d.id === id ? { ...d, isRevoked: true } : d))
    );
    showToast('Device session revoked');
  };

  const toggleBiometrics = () => {
    setProfileSettings(prev => {
      const next = !prev.biometricFaceId;
      showToast(`Biometric authentication ${next ? 'activated' : 'deactivated'}`);
      return { ...prev, biometricFaceId: next };
    });
  };

  const startNfcSession = (triggerFailure = false) => {
    setShouldSimulateFailure(triggerFailure);
    setActiveModal('nfc-session');
  };

  const authorizePayment = () => {
    // Deduct amount
    const deduction = pendingPayment.amount;
    setBalance(prev => Math.max(0, prev - deduction));
    setCardSettings(prev => ({
      ...prev,
      monthlySpent: prev.monthlySpent + deduction
    }));

    // Add to recent activity if not already present
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      recipient: pendingPayment.merchant,
      subtext: 'Dining & Luxury • Just now',
      amount: -deduction,
      category: 'luxury',
      timestamp: 'Just now',
      status: 'Cleared',
      icon: 'storefront',
      location: pendingPayment.location,
      reference: pendingPayment.refCode,
      authCode: pendingPayment.authCode
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast('Payment Authorized & Settled via Face ID');
    setActiveModal('tx-receipt');
  };

  const resetAllState = () => {
    localStorage.clear();
    setBalance(84250.40);
    setIsBalanceMasked(false);
    setCardSettings(DEFAULT_CARD_SETTINGS);
    setProfileSettings(DEFAULT_PROFILE_SETTINGS);
    setTrustedDevices(DEFAULT_DEVICES);
    setTransactions(DEFAULT_TRANSACTIONS);
    setActiveTab('home');
    setActiveModal(null);
    showToast('Vault state reset to pristine baseline');
  };

  return (
    <AppContext.Provider
      value={{
        balance,
        isBalanceMasked,
        cardSettings,
        profileSettings,
        trustedDevices,
        transactions,
        activeTab,
        activeModal,
        toastMessage,
        pendingPayment,
        shouldSimulateFailure,
        setActiveTab,
        openModal: (m) => setActiveModal(m),
        closeModal: () => setActiveModal(null),
        toggleBalanceMask,
        toggleCardFreeze,
        toggleCardDetails,
        setCardType,
        toggleCardChannel,
        updateMonthlyLimit,
        revokeDevice,
        toggleBiometrics,
        showToast,
        startNfcSession,
        authorizePayment,
        resetAllState,
        copyToClipboard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
