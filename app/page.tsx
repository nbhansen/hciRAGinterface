'use client';

import { useState, useEffect } from 'react';
import { ChatContainer } from '@/components/chat-container';
import { PDFSidebar } from '@/components/pdf-sidebar';

export default function HomePage() {
  // Get the sidebar state from URL on initial load for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Listen for custom events from the header component
  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsSidebarOpen(e.detail.isOpen);
    };

    // Add event listener
    window.addEventListener('sidebarToggle' as any, handleSidebarToggle as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('sidebarToggle' as any, handleSidebarToggle as EventListener);
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] gap-4 p-4 chat-pattern-bg">
      {/* Mobile sidebar - shown when toggled */}
      <div 
        className={`fixed inset-y-14 left-0 z-30 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <PDFSidebar />
      </div>
      
      {/* Desktop sidebar - always visible on md+ screens */}
      <div className="w-64 hidden md:block">
        <PDFSidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        <ChatContainer />
      </div>
      
      {/* Overlay when mobile sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => {
            // Dispatch event to close sidebar
            window.dispatchEvent(
              new CustomEvent('sidebarToggle', { detail: { isOpen: false } })
            );
            setIsSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
}
