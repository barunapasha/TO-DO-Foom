import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo Tracker',
  description: 'A simple todo tracker application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

