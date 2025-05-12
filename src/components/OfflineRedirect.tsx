'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useIsOnline from '@/hooks/useIsOnline';
import { toast } from 'react-hot-toast';

export default function OfflineRedirect({ children }: { children: React.ReactNode }) {
  const isOnline = useIsOnline();
  const router = useRouter();

  useEffect(() => {
    if (!isOnline) {
      toast.error("You're offline — redirected to home");
      router.push('/');
    }
  }, [isOnline, router]);

  return <>{children}</>;
}