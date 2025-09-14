import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PantryPal AI - Smart Kitchen Assistant',
  description: 'Your AI-powered kitchen assistant that turns groceries into meals and waste into savings.',
  keywords: ['pantry', 'meal planning', 'AI', 'recipes', 'grocery', 'food waste'],
  authors: [{ name: 'PantryPal AI Team' }],
  openGraph: {
    title: 'PantryPal AI - Smart Kitchen Assistant',
    description: 'Your AI-powered kitchen assistant that turns groceries into meals and waste into savings.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
