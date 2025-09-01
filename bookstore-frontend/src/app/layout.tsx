'use client';

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { UserAnswersProvider } from "@/context/useranswer.context";


export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-screen bg-white" lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserAnswersProvider> {/* Bọc UserAnswersProvider */}
            {children}
          </UserAnswersProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
