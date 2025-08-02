import { Message, PDFReference } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock PDF data for demonstration purposes
const mockPDFs: Record<string, { title: string; pages: string[] }> = {
  'research-paper-1.pdf': {
    title: 'Advances in Natural Language Processing',
    pages: [
      'Abstract: This paper explores recent advances in natural language processing techniques, focusing on transformer architectures and their applications in various domains.',
      'Introduction: Natural Language Processing (NLP) has seen significant advancements in recent years, particularly with the introduction of transformer-based models like BERT, GPT, and T5.',
      'Methodology: We conducted experiments using a corpus of 10,000 documents across multiple domains to evaluate the performance of different transformer architectures.',
      'Results: Our experiments show that transformer models consistently outperform traditional approaches across all metrics, with particularly strong results in tasks requiring contextual understanding.',
      'Discussion: The implications of these results suggest that transformer architectures represent a fundamental shift in NLP capabilities, enabling more nuanced understanding of language.',
    ],
  },
  'technical-doc-1.pdf': {
    title: 'System Architecture Documentation',
    pages: [
      'Executive Summary: This document outlines the architecture of our distributed processing system, including component interactions and data flow patterns.',
      'System Overview: The system consists of three main components: data ingestion, processing pipeline, and storage layer, each designed for horizontal scalability.',
      'Data Flow: User requests are processed through the API gateway, which routes them to appropriate microservices based on request type and load balancing considerations.',
      'Security Considerations: All data is encrypted both at rest and in transit, with access controls implemented at multiple levels of the architecture.',
      'Deployment Strategy: The system is deployed using containerization and orchestration tools to ensure consistency across environments and facilitate scaling.',
    ],
  },
  'legal-document-1.pdf': {
    title: 'Terms of Service Agreement',
    pages: [
      'Introduction: This Terms of Service Agreement ("Agreement") constitutes a legally binding agreement between the user ("User") and our company ("Company").',
      'Service Description: The Company provides a platform for digital content management and collaboration, accessible via web and mobile applications.',
      'User Obligations: Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.',
      'Intellectual Property: All content provided through the Service, including but not limited to text, graphics, logos, and software, is the property of the Company or its licensors.',
      'Limitation of Liability: To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
    ],
  },
};

// Simulate API call to send a message and get a response
export async function sendMessage(content: string): Promise<Message> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a response based on the user's message
  const response = generateResponse(content);
  
  return {
    id: uuidv4(),
    role: 'assistant',
    content: response.content,
    timestamp: new Date(),
    pdfReferences: response.pdfReferences,
  };
}

// Mock function to generate responses with PDF references
function generateResponse(userMessage: string): { content: string; pdfReferences: PDFReference[] } {
  const lowerCaseMessage = userMessage.toLowerCase();
  const pdfReferences: PDFReference[] = [];
  let responseContent = '';
  
  // Generate different responses based on keywords in the user's message
  if (lowerCaseMessage.includes('natural language') || lowerCaseMessage.includes('nlp') || lowerCaseMessage.includes('ai')) {
    responseContent = 'Based on the research papers in the collection, transformer architectures have significantly advanced the field of Natural Language Processing. These models excel at understanding context and semantic relationships.';
    
    pdfReferences.push({
      pdfName: 'research-paper-1.pdf',
      pageNumber: 1,
      content: mockPDFs['research-paper-1.pdf'].pages[1],
      highlightedText: 'Natural Language Processing (NLP) has seen significant advancements in recent years, particularly with the introduction of transformer-based models',
    });
    
    pdfReferences.push({
      pdfName: 'research-paper-1.pdf',
      pageNumber: 3,
      content: mockPDFs['research-paper-1.pdf'].pages[3],
      highlightedText: 'transformer models consistently outperform traditional approaches across all metrics',
    });
  } 
  else if (lowerCaseMessage.includes('architecture') || lowerCaseMessage.includes('system') || lowerCaseMessage.includes('design')) {
    responseContent = 'The system architecture documentation describes a distributed processing system with three main components: data ingestion, processing pipeline, and storage layer. The system is designed for horizontal scalability and uses containerization for deployment.';
    
    pdfReferences.push({
      pdfName: 'technical-doc-1.pdf',
      pageNumber: 1,
      content: mockPDFs['technical-doc-1.pdf'].pages[1],
      highlightedText: 'The system consists of three main components: data ingestion, processing pipeline, and storage layer, each designed for horizontal scalability.',
    });
    
    pdfReferences.push({
      pdfName: 'technical-doc-1.pdf',
      pageNumber: 4,
      content: mockPDFs['technical-doc-1.pdf'].pages[4],
      highlightedText: 'The system is deployed using containerization and orchestration tools',
    });
  }
  else if (lowerCaseMessage.includes('legal') || lowerCaseMessage.includes('terms') || lowerCaseMessage.includes('agreement')) {
    responseContent = 'The Terms of Service Agreement outlines the legal relationship between users and the company. It covers service description, user obligations, intellectual property rights, and limitation of liability.';
    
    pdfReferences.push({
      pdfName: 'legal-document-1.pdf',
      pageNumber: 2,
      content: mockPDFs['legal-document-1.pdf'].pages[2],
      highlightedText: 'Users are responsible for maintaining the confidentiality of their account credentials',
    });
    
    pdfReferences.push({
      pdfName: 'legal-document-1.pdf',
      pageNumber: 3,
      content: mockPDFs['legal-document-1.pdf'].pages[3],
      highlightedText: 'All content provided through the Service, including but not limited to text, graphics, logos, and software, is the property of the Company',
    });
  }
  else {
    // Default response if no keywords match
    responseContent = 'I found several documents in the collection that might be relevant to your query. Please ask a more specific question about natural language processing, system architecture, or legal agreements to get more targeted information.';
    
    // Provide a sample from each document
    pdfReferences.push({
      pdfName: 'research-paper-1.pdf',
      pageNumber: 0,
      content: mockPDFs['research-paper-1.pdf'].pages[0],
      highlightedText: 'This paper explores recent advances in natural language processing techniques',
    });
    
    pdfReferences.push({
      pdfName: 'technical-doc-1.pdf',
      pageNumber: 0,
      content: mockPDFs['technical-doc-1.pdf'].pages[0],
      highlightedText: 'This document outlines the architecture of our distributed processing system',
    });
    
    pdfReferences.push({
      pdfName: 'legal-document-1.pdf',
      pageNumber: 0,
      content: mockPDFs['legal-document-1.pdf'].pages[0],
      highlightedText: 'This Terms of Service Agreement ("Agreement") constitutes a legally binding agreement',
    });
  }
  
  return { content: responseContent, pdfReferences };
}

// Function to get available PDFs
export async function getAvailablePDFs(): Promise<string[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return Object.keys(mockPDFs);
}
