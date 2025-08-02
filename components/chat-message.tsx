'use client';

import { Message } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { PDFViewer } from '@/components/pdf-viewer';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        <Avatar className={`h-8 w-8 ${isUser ? 'ml-2' : 'mr-2'}`}>
          <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
            {isUser ? 'U' : 'AI'}
          </div>
        </Avatar>
        <div className="flex flex-col">
          <Card className={`${isUser ? 'bg-primary text-primary-foreground user-message' : 'bg-muted assistant-message'}`}>
            <CardContent className="p-3">
              <p className="whitespace-pre-wrap">{message.content}</p>
            </CardContent>
          </Card>
          
          {message.pdfReferences && message.pdfReferences.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.pdfReferences.map((reference, index) => (
                <PDFViewer key={index} reference={reference} />
              ))}
            </div>
          )}
          
          <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
