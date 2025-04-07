'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  customPath?: string;
}

export default function BackButton({ customPath }: BackButtonProps = {}) {
  const router = useRouter();

  const handleBack = () => {
    if (customPath) {
      router.push(customPath);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-4 left-4 px-4 py-2 rounded-lg backdrop-blur-sm bg-foreground/20 hover:bg-foreground/30 transition-colors text-sm flex items-center gap-2 z-50"
    >
      <span>←</span> Go Back
    </button>
  );
}
