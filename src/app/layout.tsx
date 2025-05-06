import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/context/GameContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Riddle Quest',
  description: 'Challenge your mind with Riddle Quest, an engaging puzzle game featuring brain teasers of varying difficulty. Solve riddles against the clock, earn achievements, track your progress, and compete with friends. Perfect for puzzle enthusiasts looking to sharpen their wit and problem-solving skills in a fun, interactive environment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}



