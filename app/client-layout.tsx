'use client';

import { useState } from 'react';
import { Header } from '@/components/header';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    
    // Dispatch custom event for the page component to listen to
    window.dispatchEvent(
      new CustomEvent('sidebarToggle', { detail: { isOpen: newState } })
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
