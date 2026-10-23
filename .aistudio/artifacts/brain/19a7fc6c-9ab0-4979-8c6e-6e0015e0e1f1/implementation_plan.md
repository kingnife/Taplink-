# TapLink Private — Obsidian & Gilt Mobile Banking

A luxury, private-client mobile banking application built to faithfully reproduce all 8 provided screens with authentic Obsidian & Champagne Gold aesthetics, tactile haptic-inspired interactions, real-time NFC payment simulation, dynamic spending analytics, and comprehensive card security controls.

### User Review & Confirmed Decisions

> [!IMPORTANT]
> The following architectural and user experience choices were confirmed during interactive clarification:
> - **Interactive Simulation**: Full interactive NFC simulation featuring terminal discovery, biometric Face ID hold/double-tap authorization, timeout diagnostic handling, and settled transaction generation.
> - **State Persistence**: Card locks, monthly spending limits, channel toggles, biometric preferences, device authorizations, and newly generated transaction receipts persist in browser local storage (`localStorage`).
> - **Navigation & Sheet Overlays**: 5-tab persistent bottom navigation (Home, Pay, Cards, Insights, Profile) with layered modal sheets for contextual flows (NFC Tap session, Payment Authorization, Payment Successful Receipt, NFC Diagnostic Error, Dynamic QR Modal, and Limit Adjustment).

---

## 1. Overview & Core Concept

- **What It Does**: TapLink Private is a digital banking platform engineered for ultra-high-net-worth clients, delivering institutional security with haute horology design restraint. Users can view their real-time liquid balance, manage physical Obsidian metal cards and virtual fleet cards, adjust capital controls, analyze categorized monthly spending through interactive charts, and execute tokenized NFC tap-to-pay transactions with biometric validation.
- **Target Audience**: Discerning private banking clientele who value privacy, hardware-backed vault security, tactile digital craftsmanship, and frictionless card management.
- **Key Value**: Delivers the visual fidelity of bespoke luxury editorial print paired with responsive, zero-latency financial controls and interactive payment flows.

---

## 2. User Experience & Visual Design

### 8 Screen Implementation Scope
1. **01 — Home Dashboard (`HomeView`)**:
   - Total Available Balance ($84,250.40) with privacy masking (`••••••••`), +2.4% gain badge, and one-tap IBAN copy.
   - Quick action grid: *Send*, *Receive*, *Tap to Pay* (accented gold with "Ready" pip), and *Analytics*.
   - Primary linked card micro-glance (Obsidian Metal •••• 4821 with live card limit).
   - Private Yield Tier II banner with responsive inline SVG gold yield sparkline.
   - Recent activity list with real-time status chips and instant drill-down.
2. **05 — Cards & Controls (`CardsView`)**:
   - Card segment switcher: *Obsidian Metal* vs. *Virtual Fleet*.
   - Luxury metal card stage with EMV chip texture, tactile inner bevel, contactless icon, masked PAN, and cardholder metadata.
   - Quick card actions: Lock/Unlock (with realistic grayscale card freeze), Reveal Details (masked/unmasked card number & CVV 891), Replace Card modal, and Wallet sync.
   - Capital controls with live spend tracking ($4,120 / $15,000 threshold), gradient progress bar, and interactive budget adjustment.
   - Card security toggles: Contactless & NFC, Online Transactions, ATM Cash Withdrawals, and International Roaming.
   - Hardware PIN decrypt flow and Geographic Guard (GPS mobile telemetry validation).
3. **06 — Spending Insights (`InsightsView`)**:
   - Period segmented control: *Day*, *Week*, *Month*, *Year*.
   - Spending overview card ($3,842.60 total spent in October, -12.4% trend, $128.08/day average).
   - Interactive weekly bar chart (W1–W4) with dynamic floating tooltip ($932.60 this week) and interactive bar focus.
   - Intelligence & Pacing bento card: Budget discipline advice and Top Merchant breakdown (Aesop Soho, $420.50).
   - Top 5 spending categories with proportional progress tracks: Shopping & Luxury, Dining & Social, Travel & Transit, Health & Wellness, Subscriptions & Bills.
   - Export Statement breakdown CTA and Private Advisory alert.
4. **07 — Profile & Security (`ProfileView`)**:
   - Client identity banner: Elena Voronina with verified badge, Obsidian Private Tier II shield, and 100% Vault Hardening posture.
   - Security & Biometrics: Face ID/Fingerprint toggle, Passcode & Hardware Key, Strict 2FA, and Auto-Lock timer.
   - Trusted Devices manager: Current iPhone 15 Pro Max and MacBook Pro 16" with interactive Revoke action.
   - Payment & privacy limits: NFC tap threshold and strict data sharing controls.
   - 24/7 Private Concierge banker support and legal disclosure drawer.
5. **NFC Tap Session Modal (`NfcTapSessionModal`)**:
   - Concentric animated radar rings with tactile golden NFC core orb.
   - Terminal status indicator (Verifone V400m #9821) and active EMVCo Level 3 encrypted session countdown timer.
   - Card selector strip (TapLink Obsidian Infinite •••• 9412).
   - Dynamic QR code alternative fallback and tap simulation triggers.
6. **Transaction Detail Authorization Modal (`TransactionAuthModal`)**:
   - Aesop Soho Flagship verified merchant header and hero authorization amount ($184.50 USD).
   - Complete itemized breakdown: Funding source, tokenized EMV protocol, subtotal, waived clearing fee, and direct ledger debit.
   - "Double Tap or Hold to Authorize" action button with smooth hold progress animation and biometric validation.
7. **Transaction Receipt / Success Modal (`TransactionReceiptModal`)**:
   - Authoritative emerald verification seal with settled timestamp (Face ID verified).
   - Itemized record: Merchant MID, funding source, contactless POS #04, reference code (TXN-90214820-TL) with clipboard copy, and auth code.
   - Location snapshot: 41 Lexington St, Carnaby, London with street map thumbnail.
   - Split Expense, Official PDF download, and Report an Issue actions.
8. **NFC Reader Not Detected / Diagnostic Modal (`NfcDiagnosticsModal`)**:
   - Clear amber alert status with zero-fund deduction guarantee.
   - Interactive Hardware Diagnostic checklist: Device NFC Subsystem (Active), Terminal Signal (Interrupted), Physical Clearance (Advisory).
   - Recovery actions: "Try NFC Tap Again" with interactive retry animation, Dynamic QR Code, and Merchant Push Transfer.

### Visual Styling & Theme Specs
- **Background & Canvas**: Obsidian `#131313` / `#151515` canvas with structural `#201F1F` cards and `#2A2A2A` raised surfaces.
- **Accents**: Champagne Gold (`#C8A64D`), Light Gold (`#E7C266`), Deep Gold (`#7A5C10`), and Settled Emerald (`#16845B`).
- **Typography**: Plus Jakarta Sans with strict tabular numerals (`font-variant-numeric: tabular-nums`) for currency and time.
- **Images**: Local hotlinked images directly matching the reference HTML assets, including the TapLink crest, user avatar, and Aesop branding.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive Simulation Mode vs Static Views**
  - *Chosen Approach*: Implement a fully operational interactive state machine. Clicking "Tap to Pay" launches the NFC Tap Session; tapping the radar initiates the terminal handshake; users can either trigger the authorization view ($184.50 Aesop charge) or test the diagnostic failure view; holding to authorize deducts funds from the balance, adds a new transaction to Recent Activity, and displays the official receipt.
  - *Why*: Ensures realistic evaluation of payment workflows while allowing effortless regression testing across all 8 screens.
- **Decision 2: Persistent Local Storage Model**
  - *Chosen Approach*: Centralized React state initialized from and synchronized with `localStorage`. Includes balance adjustments, card frozen state, transaction history, and privacy toggles.
  - *Why*: User actions (e.g. freezing the card or adjusting limits) remain persistent across browser refreshes, providing a true native-app feel.
- **Decision 3: Dual Responsive Shell Design**
  - *Chosen Approach*: On mobile screens (<640px), the interface renders natively full-bleed with standard iOS/Android safe area padding. On desktop screens, it renders in an elegant centered luxury obsidian device chassis accompanied by a discreet "Screen Navigator & Simulation Controller" toolbar, allowing immediate jumping between all 8 states without losing user context.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             TapLink Private App                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Top Bar (Brand Emblem + 05/06/07 Screen Title + Notifications + Profile)   │
├─────────────────────────────────────────────────────────────────────────────┤
│                               Active Screen                                 │
│  ┌───────────────────────┬───────────────────────┬───────────────────────┐  │
│  │      Home View        │   Cards & Controls    │    Insights View      │  │
│  │ (Balance, Pay Hero,   │ (Metal Card, Freeze,  │ (Period Tabs, Charts, │  │
│  │  Activity, Yield)     │  Limits, Switches)    │  Categories, Pacing)  │  │
│  ├───────────────────────┴───────────────────────┼───────────────────────┤  │
│  │               Profile View                    │   Floating Modals     │  │
│  │ (Biometrics, Devices, Limits, Support)        │ (NFC Radar, Auth,     │  │
│  │                                               │  Receipt, Diagnostics)│  │
│  └───────────────────────────────────────────────┴───────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│            Persistent Bottom Navigation Bar (Home, Pay, Cards,              │
│                           Insights, Profile)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Persistent App State Store (Balance, Card Status, Activity, Limits, Toggles)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### State Model & Persistence
- `balance`: Current liquid capital (default: `$84,250.40`).
- `isBalanceMasked`: Toggle for privacy mode.
- `cardSettings`: Physical card freeze status, details revealed, monthly limit ($15,000), channel toggles (Contactless, Online, ATM, Roaming), and Geo Guard.
- `transactions`: Array of past transactions (Apple Store, Julian K., Blue Bottle, Equinox, Aesop Soho) with status and timestamp.
- `activeTab`: Main screen navigation (`home`, `pay`, `cards`, `insights`, `profile`).
- `activeModal`: Modal overlay stack (`nfc-tap`, `tx-auth`, `tx-receipt`, `nfc-diag`, `limit-adjust`, `qr-code`, `replace-card`).
