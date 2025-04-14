import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function HardModeNotFound() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-900/20 to-rose-900/20">
      <BackButton />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="text-6xl mb-4">🚧</div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                Coming Soon!
              </h1>
            </div>
            <p className="text-xl mb-8 text-foreground/80">
              We're working hard to bring you the Hard difficulty mode. Stay tuned for our most challenging riddles yet!
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-foreground/20 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-2">What to expect:</h2>
              <ul className="space-y-2 text-foreground/80">
                <li>• Expert-level riddles</li>
                <li>• Very strict time limits</li>
                <li>• Maximum scoring potential</li>
                <li>• Exclusive achievements</li>
              </ul>
            </div>

            <Link
              href="/game"
              className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Try Easy Mode
            </Link>

            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 rounded-lg bg-foreground/20 text-white font-semibold hover:bg-foreground/30 transition-colors text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

