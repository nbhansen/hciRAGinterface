# PDF Query Chat Interface

A modern web application that allows users to ask questions about a collection of PDFs and receive answers with concrete examples from the documents.

## Features

- **Chat Interface**: Ask questions in a familiar chat-style interface
- **PDF References**: View specific sections from PDFs that support the AI's answers
- **Highlighted Text**: Easily identify the most relevant parts of the PDF content
- **Responsive Design**: Works on both desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes

## Technology Stack

- **Frontend**: React, Next.js, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: React Hooks
- **Theming**: next-themes

## Project Structure

- `/app`: Next.js app directory containing pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility functions, types, and API services
- `/public`: Static assets

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

The application provides a chat interface where users can ask questions about the content of PDFs. The backend processes these questions and returns answers along with relevant excerpts from the PDFs. The frontend displays these answers and highlights the most relevant parts of the PDF content.

In the current implementation, the backend is mocked with sample data for demonstration purposes. In a production environment, this would connect to a real backend service that processes PDFs and queries.

## Mobile Support

The application includes a responsive design that works well on mobile devices. On smaller screens, the PDF sidebar can be toggled on and off using the sidebar toggle button in the header.
