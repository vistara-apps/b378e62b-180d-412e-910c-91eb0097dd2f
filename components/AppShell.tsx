'use client';

import { useState } from 'react';
import { Navigation } from './Navigation';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('home');

  const shellClasses = variant === 'glass' 
    ? 'min-h-screen glass' 
    : 'min-h-screen bg-bg';

  return (
    <div className={shellClasses}>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <main className="pt-6">
          {children}
        </main>
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
