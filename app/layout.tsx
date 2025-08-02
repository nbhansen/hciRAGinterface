import type * as React from "react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { ClientLayout } from "./client-layout";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PDF Query Assistant",
  description: "Ask questions about your PDF documents and get answers with specific references.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
