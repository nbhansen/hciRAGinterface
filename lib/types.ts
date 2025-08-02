export type MessageRole = 'user' | 'assistant';

export interface PDFReference {
  pdfName: string;
  pageNumber: number;
  content: string;
  highlightedText?: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  pdfReferences?: PDFReference[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
