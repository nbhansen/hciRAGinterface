'use client';

import { PDFReference } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PDFViewerProps {
  reference: PDFReference;
}

export function PDFViewer({ reference }: PDFViewerProps) {
  return (
    <Card className="border border-border bg-card/50 overflow-hidden pdf-card">
      <CardHeader className="py-2 px-4 bg-muted/50 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
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
          <CardTitle className="text-sm font-medium">{reference.pdfName}</CardTitle>
        </div>
        <Badge variant="outline" className="text-xs">
          Page {reference.pageNumber + 1}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="bg-background/50 p-3 rounded-md border border-border/50">
          {reference.highlightedText ? (
            <p>
              {reference.content.split(reference.highlightedText).map((part, index, array) => {
                // If this is the last part and there's no highlighted text after it, just return the part
                if (index === array.length - 1) {
                  return <span key={index}>{part}</span>;
                }
                // Otherwise, return the part followed by the highlighted text
                return (
                  <span key={index}>
                    {part}
                    <span className="highlight-text">
                      {reference.highlightedText}
                    </span>
                  </span>
                );
              })}
            </p>
          ) : (
            <p>{reference.content}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
