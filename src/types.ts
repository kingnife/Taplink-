export interface Transaction {
  id: string;
  recipient: string;
  subtext: string;
  amount: number; // negative for debits, positive for deposits
  category: 'technology' | 'deposit' | 'dining' | 'wellness' | 'luxury' | 'travel' | 'subscriptions';
  timestamp: string;
  status: 'Cleared' | 'Deposit' | 'Recurring' | 'Settled';
  icon: string;
  iconColor?: string;
  location?: string;
  reference?: string;
  authCode?: string;
}

export interface CardSettings {
  isFrozen: boolean;
  showDetails: boolean;
  cardType: 'physical' | 'virtual';
  monthlySpent: number;
  monthlyLimit: number;
  contactless: boolean;
  online: boolean;
  atm: boolean;
  roaming: boolean;
  geoGuard: boolean;
  viewPinUnlocked: boolean;
}

export interface ProfileSecuritySettings {
  biometricFaceId: boolean;
  twoFactorMode: 'Strict' | 'Standard';
  autoLockDelay: string;
  nfcThresholdAlwaysFaceId: boolean;
  strictPrivacyMode: boolean;
  conciergeActive: boolean;
}

export interface TrustedDevice {
  id: string;
  name: string;
  platform: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  isRevoked: boolean;
}

export type AppTab = 'home' | 'pay' | 'cards' | 'insights' | 'profile';

export type AppModal =
  | 'nfc-session'
  | 'tx-auth'
  | 'tx-receipt'
  | 'nfc-error'
  | 'dynamic-qr'
  | 'adjust-limit'
  | 'view-pin'
  | 'replace-card'
  | 'notifications'
  | null;

export const ASSETS = {
  brandEmblem: 'https://lh3.googleusercontent.com/aida/AEtjO1XvfRiy9zRgP35PcXm6gdxsS_iOCoSPagwqwMzZDh-kn981R6qCrnmQ_3YKgb1HVmq65kVn9J-Y52PNjaY3gjuUOGPR8bZnI8mwuqQfnA75kjLCJ4DgMe22zg1y3edVLmm2hQcLbYgvXvOUHYET3HqKKV5bh-FnZNKI_s3rIw8Z5lSpnkrIB_hR6-lj79DAJK-p4zWZMpUDB8DIq_siK_UEcb0Kt0QAUe5gNqpdhGC1IyWZx667wgz_uWo',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqaDtDG_0_-cpLnIJNkcLMgE-yhvX2N1h6xB-y665p1Wq3_6iXNKy2b-stESCyCvrOeFNZOvwFa4WZiFibyaPiAe_lDJo31g2pXXkmQxGq9E1p9cnGJWfD1aJd1VVTO_Iy88DyzjXXFZbMqtSGoYzxLTL2eKTfD1R8GuQjgT5clss0_u5CbXmeGBT72qXBA_DZlgHGUZyjQULgyVqifJCHWcMzVxyij1BVzc-gchYUDa03aHp1NgNGVA',
  aesopEmblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmdzj5K3OZn631wSa93qv6PneSlCptJqQDwOnqJri6C7Lnrhc8mT8hnhRV9H6njzy0Tu0ZhL_7WDa08toFZiX7-53rStKcJyJhEJi4hRdeCNzOQyksrs1GaeU7jTAQ7uGuScZu3yg9m-1zbkK_2O2QwiOjHjvhYrJJwoad9j1WFqn8P3JecjKCCqtrHjyWP9vWU5kXUxj1CJWMa-1MteE2OjlYRxS0V7coP28c9SyTqnG-nG73tpt3tA',
  locationMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5jOYP3hNs3gd642OSICwsa7ytxWPhfXiEVxb2Xq7kY8C4cnU0GMa3gpZ2rJLBMktUYhGnqIBknAvhSP3su9GLXSPx56DIVxqzW7fNJ_qlnMowpZktdk2y4zfcV8vOZE58PAFicRqFOtLpiKo6B-_SfTZZRkwEI7j1jdpXQFvFpsYMgq0deyEZqQ30anMJU565yWCSI8z--aSsNHltmeWvZo1d6Mhtjv6STPHzgBPfntU0Qa0sB2-kaw'
};
