import type { Metadata } from 'next';
import { Work_Sans, Inter } from 'next/font/google';
import './globals.css';
import NavbarClient from '@/components/NavbarClient';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'WEISON | Premium Shirt',
  description: 'Discover premium shirts designed for a refined everyday fit and feel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${workSans.variable} ${inter.variable} font-sans bg-dark-900 text-white antialiased`}>
        <NavbarClient />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
