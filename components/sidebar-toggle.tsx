'use client';

import { Button } from '@/components/ui/button';
import { PanelLeftIcon, PanelLeftCloseIcon } from 'lucide-react';

interface SidebarToggleProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function SidebarToggle({ isSidebarOpen, toggleSidebar }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleSidebar}
      aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      {isSidebarOpen ? (
        <PanelLeftCloseIcon className="h-5 w-5" />
      ) : (
        <PanelLeftIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
