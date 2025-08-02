'use client';

import { useState, useEffect } from 'react';
import { getAvailablePDFs } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export function PDFSidebar() {
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const availablePDFs = await getAvailablePDFs();
        setPdfs(availablePDFs);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPDFs();
  }, []);

  return (
    <Card className="h-full bg-sidebar-background text-sidebar-foreground">
      <CardHeader className="px-4 py-3 border-b border-sidebar-border">
        <CardTitle className="text-base font-medium">Available Documents</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[calc(100vh-9.5rem)] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : pdfs.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No PDFs available
            </div>
          ) : (
            <ul className="p-2">
              {pdfs.map((pdf) => (
                <li key={pdf} className="group">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="truncate text-left">{pdf}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
