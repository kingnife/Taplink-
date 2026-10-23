import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const { closeModal } = useApp();

  const notifications = [
    {
      id: '1',
      title: 'POS Terminal Paired',
      desc: 'Verifone V400m #9821 encrypted socket ready for tap.',
      time: '2m ago',
      icon: 'contactless'
    },
    {
      id: '2',
      title: 'Monthly Limit Pacing Alert',
      desc: 'Spending currently 12% below authorized cap. Pacing optimal.',
      time: '2h ago',
      icon: 'insights'
    },
    {
      id: '3',
      title: 'Biometric Heartbeat Passed',
      desc: 'Face ID enclave verified across London UK POS telemetry.',
      time: 'Today 11:15',
      icon: 'verified_user'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-[420px] bg-surface-container rounded-2xl p-6 border border-primary/20 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Private Alerts</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-semibold truncate">
                    {n.title}
                  </span>
                  <span className="font-label-sm text-outline text-[11px] shrink-0 ml-1">
                    {n.time}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {n.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={closeModal}
          className="w-full h-11 rounded-xl bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors mt-1"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
