import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

type PeriodType = 'Day' | 'Week' | 'Month' | 'Year';

interface ChartBarItem {
  id: string;
  label: string;
  amount: string;
  height: number;
  display: string;
}

interface PeriodData {
  title: string;
  totalSpent: string;
  trend: string;
  trendDirection: 'down' | 'up';
  averageLabel: string;
  averageValue: string;
  pacingStatus: string;
  tooltipContext: string;
  bars: ChartBarItem[];
  defaultBarIndex: number;
  axisLabels: [string, string, string];
  budgetAdviceTitle: string;
  budgetAdviceDesc: React.ReactNode;
  topMerchantName: string;
  topMerchantCount: string;
  topMerchantAmount: string;
  topMerchantPercent: string;
  categories: {
    name: string;
    icon: string;
    sharePercent: number;
    amount: string;
    bgClass: string;
    textClass?: string;
  }[];
}

const PERIOD_DATA: Record<PeriodType, PeriodData> = {
  Day: {
    title: 'Total Spent (Today, Oct 24)',
    totalSpent: '$192.30',
    trend: '-18.5%',
    trendDirection: 'down',
    averageLabel: 'Hourly Velocity:',
    averageValue: '$16.02 / hr',
    pacingStatus: 'Pacing Optimal',
    tooltipContext: 'at 14:32',
    bars: [
      { id: 'd-1', label: '09:00', amount: '$7.80', height: 24, display: '$7.80' },
      { id: 'd-2', label: '12:00', amount: '$0.00', height: 12, display: '$0' },
      { id: 'd-3', label: '14:30', amount: '$184.50', height: 128, display: '$184.50' },
      { id: 'd-4', label: '18:00', amount: '$0.00', height: 12, display: '$0' },
      { id: 'd-5', label: '21:00', amount: '$0.00', height: 12, display: '$0' }
    ],
    defaultBarIndex: 2,
    axisLabels: ['08:00 Morning', '14:00 Midday', '22:00 Night'],
    budgetAdviceTitle: 'Daily Velocity Guard',
    budgetAdviceDesc: (
      <>
        Today you are pacing <strong className="text-tertiary font-semibold">23% below</strong> your
        daily threshold of $250.00. Zero unauthorized POS velocity spikes.
      </>
    ),
    topMerchantName: 'Aesop Soho Flagship',
    topMerchantCount: '1 transaction',
    topMerchantAmount: '$184.50',
    topMerchantPercent: '95.9% of day',
    categories: [
      {
        name: 'Shopping & Luxury',
        icon: 'diamond',
        sharePercent: 96,
        amount: '$184.50',
        bgClass: 'bg-primary-container'
      },
      {
        name: 'Dining & Social',
        icon: 'restaurant',
        sharePercent: 4,
        amount: '$7.80',
        bgClass: 'bg-tertiary'
      }
    ]
  },
  Week: {
    title: 'Total Spent (This Week)',
    totalSpent: '$932.60',
    trend: '-8.2%',
    trendDirection: 'down',
    averageLabel: 'Daily Average:',
    averageValue: '$133.22 / day',
    pacingStatus: 'Pacing Optimal',
    tooltipContext: 'today',
    bars: [
      { id: 'w-mon', label: 'Mon', amount: '$142.00', height: 56, display: '$142' },
      { id: 'w-tue', label: 'Tue', amount: '$88.50', height: 38, display: '$88' },
      { id: 'w-wed', label: 'Wed', amount: '$210.00', height: 86, display: '$210' },
      { id: 'w-thu', label: 'Thu', amount: '$192.30', height: 78, display: '$192' },
      { id: 'w-fri', label: 'Fri', amount: '$165.80', height: 68, display: '$165' },
      { id: 'w-sat', label: 'Sat', amount: '$94.00', height: 42, display: '$94' },
      { id: 'w-sun', label: 'Sun', amount: '$40.00', height: 22, display: '$40' }
    ],
    defaultBarIndex: 3,
    axisLabels: ['Mon, Oct 21', 'Thu, Oct 24 (Today)', 'Sun, Oct 27'],
    budgetAdviceTitle: 'Weekly Trajectory',
    budgetAdviceDesc: (
      <>
        You are pacing <strong className="text-tertiary font-semibold">15% below</strong> your
        weekly allocation. On track to bank <strong className="text-on-surface font-semibold">$417.40</strong> in unspent quota.
      </>
    ),
    topMerchantName: 'Aesop Soho',
    topMerchantCount: '2 transactions',
    topMerchantAmount: '$265.50',
    topMerchantPercent: '28.5% of week',
    categories: [
      {
        name: 'Shopping & Luxury',
        icon: 'diamond',
        sharePercent: 41,
        amount: '$385.00',
        bgClass: 'bg-primary-container'
      },
      {
        name: 'Dining & Social',
        icon: 'restaurant',
        sharePercent: 27,
        amount: '$248.60',
        bgClass: 'bg-tertiary'
      },
      {
        name: 'Travel & Transit',
        icon: 'flight_takeoff',
        sharePercent: 15,
        amount: '$142.00',
        bgClass: 'bg-outline'
      },
      {
        name: 'Health & Wellness',
        icon: 'spa',
        sharePercent: 10,
        amount: '$95.00',
        bgClass: 'bg-outline-variant'
      },
      {
        name: 'Subscriptions & Bills',
        icon: 'receipt_long',
        sharePercent: 7,
        amount: '$62.00',
        bgClass: 'bg-outline-variant'
      }
    ]
  },
  Month: {
    title: 'Total Spent (October)',
    totalSpent: '$3,842.60',
    trend: '-12.4%',
    trendDirection: 'down',
    averageLabel: 'Daily Average:',
    averageValue: '$128.08 / day',
    pacingStatus: 'Pacing Optimal',
    tooltipContext: 'this week',
    bars: [
      { id: 'm-w1', label: 'W1', amount: '$850.00', height: 98, display: '$850' },
      { id: 'm-w2', label: 'W2', amount: '$1,120.00', height: 128, display: '$1.1k' },
      { id: 'm-w3', label: 'W3', amount: '$940.00', height: 108, display: '$940' },
      { id: 'm-w4', label: 'W4', amount: '$932.60', height: 106, display: '$932' }
    ],
    defaultBarIndex: 3,
    axisLabels: ['Oct 1', 'Oct 15', 'Oct 31'],
    budgetAdviceTitle: 'Budget Discipline',
    budgetAdviceDesc: (
      <>
        You are pacing <strong className="text-tertiary font-semibold">12% below</strong> your
        monthly budget cap. On track to preserve <strong className="text-on-surface font-semibold">$1,200.00</strong> this cycle.
      </>
    ),
    topMerchantName: 'Aesop Soho',
    topMerchantCount: '4 transactions',
    topMerchantAmount: '$420.50',
    topMerchantPercent: '10.9% of total',
    categories: [
      {
        name: 'Shopping & Luxury',
        icon: 'diamond',
        sharePercent: 37,
        amount: '$1,420.00',
        bgClass: 'bg-primary-container'
      },
      {
        name: 'Dining & Social',
        icon: 'restaurant',
        sharePercent: 23,
        amount: '$890.40',
        bgClass: 'bg-tertiary'
      },
      {
        name: 'Travel & Transit',
        icon: 'flight_takeoff',
        sharePercent: 17,
        amount: '$654.20',
        bgClass: 'bg-outline'
      },
      {
        name: 'Health & Wellness',
        icon: 'spa',
        sharePercent: 12,
        amount: '$480.00',
        bgClass: 'bg-outline-variant'
      },
      {
        name: 'Subscriptions & Bills',
        icon: 'receipt_long',
        sharePercent: 11,
        amount: '$398.00',
        bgClass: 'bg-outline-variant'
      }
    ]
  },
  Year: {
    title: 'Total Spent (2024 YTD)',
    totalSpent: '$46,120.00',
    trend: '+3.8%',
    trendDirection: 'up',
    averageLabel: 'Monthly Average:',
    averageValue: '$4,612.00 / mo',
    pacingStatus: 'Pacing Moderate',
    tooltipContext: 'Q4 YTD',
    bars: [
      { id: 'y-q1', label: 'Q1', amount: '$11,840.00', height: 108, display: '$11.8k' },
      { id: 'y-q2', label: 'Q2', amount: '$12,450.00', height: 116, display: '$12.4k' },
      { id: 'y-q3', label: 'Q3', amount: '$13,100.00', height: 128, display: '$13.1k' },
      { id: 'y-q4', label: 'Q4', amount: '$8,730.00', height: 86, display: '$8.7k' }
    ],
    defaultBarIndex: 3,
    axisLabels: ['Jan 2024', 'Jun 2024', 'Dec 2024'],
    budgetAdviceTitle: 'Annual Tax Exemption',
    budgetAdviceDesc: (
      <>
        Annual tax-advantaged private wealth structure preserves{' '}
        <strong className="text-on-surface font-semibold">$18,400.00</strong> under Private Tier II exemption.
      </>
    ),
    topMerchantName: 'Harrods London',
    topMerchantCount: '16 transactions',
    topMerchantAmount: '$6,420.00',
    topMerchantPercent: '13.9% of total',
    categories: [
      {
        name: 'Shopping & Luxury',
        icon: 'diamond',
        sharePercent: 39,
        amount: '$18,200.00',
        bgClass: 'bg-primary-container'
      },
      {
        name: 'Travel & Transit',
        icon: 'flight_takeoff',
        sharePercent: 25,
        amount: '$11,540.00',
        bgClass: 'bg-tertiary'
      },
      {
        name: 'Dining & Social',
        icon: 'restaurant',
        sharePercent: 19,
        amount: '$8,600.00',
        bgClass: 'bg-outline'
      },
      {
        name: 'Health & Wellness',
        icon: 'spa',
        sharePercent: 11,
        amount: '$4,880.00',
        bgClass: 'bg-outline-variant'
      },
      {
        name: 'Subscriptions & Bills',
        icon: 'receipt_long',
        sharePercent: 6,
        amount: '$2,900.00',
        bgClass: 'bg-outline-variant'
      }
    ]
  }
};

export const InsightsView: React.FC = () => {
  const { showToast } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('Month');
  
  // Track focused bar per period or default
  const activeData = PERIOD_DATA[selectedPeriod];
  const [focusedBarId, setFocusedBarId] = useState<string>(
    activeData.bars[activeData.defaultBarIndex].id
  );

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    const newPeriodData = PERIOD_DATA[period];
    setFocusedBarId(newPeriodData.bars[newPeriodData.defaultBarIndex].id);
    showToast(`Displaying ${period.toLowerCase()} analytics`);
  };

  const currentFocusedBar =
    activeData.bars.find((b) => b.id === focusedBarId) ||
    activeData.bars[activeData.defaultBarIndex];
  
  const currentFocusedIndex = activeData.bars.findIndex(
    (b) => b.id === currentFocusedBar.id
  );

  // Position calculation for tooltip centered above the selected bar
  const totalBars = activeData.bars.length;
  const barPercent = 100 / totalBars;
  const tooltipLeftPercent = (currentFocusedIndex + 0.5) * barPercent;

  return (
    <div className="flex flex-col w-full px-margin pb-28 pt-20 gap-space-md select-none">
      {/* Period Segmented Control */}
      <div className="w-full bg-surface-container-low p-1 rounded-xl flex items-center justify-between gap-1 shadow-sm border border-surface-container-high/40">
        {(['Day', 'Week', 'Month', 'Year'] as const).map((period) => (
          <button
            key={period}
            onClick={() => handlePeriodChange(period)}
            className={`flex-1 py-2 rounded-lg text-center font-label-md text-label-md transition-all active:scale-95 ${
              selectedPeriod === period
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Spending Overview Card */}
      <section className="w-full bg-surface-container rounded-xl p-5 shadow-md flex flex-col gap-4 border border-surface-container-high/60 transition-all">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              {activeData.title}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight tabular-nums">
                {activeData.totalSpent}
              </span>
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest shadow-inner border ${
              activeData.trendDirection === 'down'
                ? 'border-primary/20 text-tertiary'
                : 'border-[#16845B]/30 text-[#16845B]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {activeData.trendDirection === 'down' ? 'trending_down' : 'trending_up'}
            </span>
            <span className="font-label-sm text-label-sm font-semibold">{activeData.trend}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {activeData.averageLabel}
          </span>
          <span className="font-label-md text-label-md text-on-surface font-semibold tabular-nums">
            {activeData.averageValue}
          </span>
          <span className="ml-auto font-label-sm text-label-sm text-outline">
            {activeData.pacingStatus}
          </span>
        </div>

        {/* Breakdown Bar Chart Container */}
        <div className="relative w-full pt-7 pb-2">
          {/* Floating Tooltip positioned over the active bar */}
          <div
            className="absolute top-0 z-20 flex flex-col items-center pointer-events-none transition-all duration-300"
            style={{
              left: `${tooltipLeftPercent}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="bg-surface-container-highest px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-primary/30 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold tabular-nums">
                {currentFocusedBar.amount}
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                {activeData.tooltipContext}
              </span>
            </div>
            <div className="w-2 h-2 bg-surface-container-highest rotate-45 -mt-1 border-r border-b border-primary/30" />
          </div>

          {/* Interactive Bar Chart */}
          <div className="w-full h-44 flex items-end justify-between px-1 relative">
            {/* Guide lines */}
            <div className="absolute inset-x-0 h-44 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full h-px bg-outline" />
              <div className="w-full h-px bg-outline" />
              <div className="w-full h-px bg-outline" />
              <div className="w-full h-px bg-outline" />
            </div>

            {activeData.bars.map((bar) => {
              const isSelected = currentFocusedBar.id === bar.id;
              return (
                <div
                  key={bar.id}
                  onClick={() => setFocusedBarId(bar.id)}
                  className="flex-1 flex flex-col items-center gap-2 z-10 group cursor-pointer px-1"
                >
                  <span
                    className={`font-label-sm text-label-sm transition-opacity tabular-nums ${
                      isSelected
                        ? 'text-primary font-semibold opacity-100'
                        : 'text-on-surface-variant opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {bar.display}
                  </span>
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'bg-primary-container shadow-md'
                        : 'bg-surface-container-highest group-hover:bg-primary-container/70'
                    }`}
                    style={{ height: `${bar.height}px` }}
                  >
                    {isSelected && (
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-primary-fixed" />
                    )}
                  </div>
                  <span
                    className={`font-label-sm text-label-sm transition-colors ${
                      isSelected ? 'text-primary font-bold' : 'text-outline group-hover:text-on-surface'
                    }`}
                  >
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Axis Labels */}
          <div className="flex items-center justify-between text-outline font-label-sm text-label-sm pt-3 px-1">
            <span>{activeData.axisLabels[0]}</span>
            <span>{activeData.axisLabels[1]}</span>
            <span>{activeData.axisLabels[2]}</span>
          </div>
        </div>
      </section>

      {/* Spending Intelligence / Editorial Highlight Card */}
      <section className="w-full bg-surface-container rounded-xl p-5 shadow-md flex flex-col gap-4 border border-surface-container-high/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Intelligence &amp; Pacing
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest font-label-sm text-label-sm text-tertiary border border-tertiary/20">
            Cycle On-Track
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Smart Tip Banner */}
          <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3.5 border border-surface-container-high/40">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {activeData.budgetAdviceTitle}
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                {activeData.budgetAdviceDesc}
              </p>
            </div>
          </div>

          {/* Most Visited Merchant */}
          <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Top Merchant
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {activeData.topMerchantName}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {activeData.topMerchantCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                {activeData.topMerchantAmount}
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                {activeData.topMerchantPercent}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="w-full bg-surface-container rounded-xl p-5 shadow-md flex flex-col gap-5 border border-surface-container-high/60">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Top Categories</h2>
            <span className="font-body-sm text-body-sm text-outline">
              Ranked by {selectedPeriod.toLowerCase()} allocation
            </span>
          </div>
          <button
            aria-label="Filter Categories"
            onClick={() => showToast(`Filtered ${selectedPeriod.toLowerCase()} categories by velocity`)}
            className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-outline hover:text-on-surface transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {activeData.categories.map((cat) => (
            <div key={cat.name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm ${
                      cat.bgClass === 'bg-primary-container'
                        ? 'bg-primary-container text-on-primary'
                        : cat.bgClass === 'bg-tertiary'
                        ? 'bg-surface-container-highest text-tertiary'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {cat.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      {cat.sharePercent}% of {selectedPeriod.toLowerCase()} spend
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-md text-label-md text-on-surface font-bold tabular-nums">
                    {cat.amount}
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary">
                    {cat.sharePercent}%
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${cat.bgClass}`}
                  style={{ width: `${cat.sharePercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Export / Report CTA */}
        <button
          onClick={() => showToast(`Exporting encrypted ${selectedPeriod} statement (PDF & CSV)...`)}
          className="w-full mt-2 h-12 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-highest flex items-center justify-center gap-2 font-label-md text-label-md transition-colors shadow-sm border border-surface-container-high/40 active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px] text-tertiary">download</span>
          <span>Export {selectedPeriod} Statement &amp; Breakdown</span>
        </button>
      </section>

      {/* Bespoke Advisory Concierge Micro-Card */}
      <div
        onClick={() => showToast('Connecting to private advisory desk...')}
        className="w-full bg-surface-container-low rounded-xl p-4 flex items-center justify-between border border-surface-container-high/40 cursor-pointer hover:bg-surface-container-high/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Private Advisory Alert
            </span>
            <span className="font-body-sm text-body-sm text-outline">
              Annual tax optimization ready for review
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
      </div>
    </div>
  );
};
