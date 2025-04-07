import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm">
      <BackButton />
      <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔒 Mode Locked
        </h1>
        <p className="text-xl mb-8 text-foreground/80">
          This difficulty level is not yet available. Please try Easy mode for now.
        </p>
        <div className="space-y-4">
          <Link
            href="/game"
            className="block px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-center hover:opacity-90 transition-opacity"
          >
            Choose Different Difficulty
          </Link>
          <Link
            href="/game/easy"
            className="block px-6 py-4 rounded-xl bg-foreground/20 text-white font-bold text-center hover:bg-foreground/30 transition-colors"
          >
            Play Easy Mode
          </Link>
        </div>
      </div>
    </div>
  );
}


