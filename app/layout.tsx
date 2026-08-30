import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bowpad — Launch tokens on Robinhood Chain',
  description:
    'Create and trade community tokens on Robinhood Chain. No code, just your wallet and an idea.',
  icons: {
    icon: '/bowpad-logo-original.png',
    apple: '/bowpad-logo-original.png',
  },
  openGraph: {
    title: 'Bowpad — Explore. Launch. Trade.',
    description: 'Create and trade community tokens on Robinhood Chain.',
    images: [
      {
        url: '/og-logo.png',
        width: 1731,
        height: 909,
        alt: 'Bowpad — Explore. Launch. Trade.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bowpad — Explore. Launch. Trade.',
    description: 'Create and trade community tokens on Robinhood Chain.',
    images: ['/og-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
