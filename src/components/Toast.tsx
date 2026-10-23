import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 max-w-[90%] bg-surface-container-highest text-on-surface px-4 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-2xl border border-primary/20 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
      <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
      <span className="truncate">{toastMessage}</span>
    </div>
  );
};
