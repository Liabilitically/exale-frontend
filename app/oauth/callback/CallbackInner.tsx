'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const backend_url = process.env.NEXT_PUBLIC_API_URL!;

export default function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const authenticate = async () => {
      try {
        // Step 1: Exchange code for tokens
        const authRes = await fetch(`${backend_url}/authenticate`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!authRes.ok) {
          console.error('Auth failed:', authRes.status);
          return router.push('/login');
        }

        const allCookies = document.cookie;
        console.warn('Client cookies after auth:', allCookies);

        // Step 2: Check if user is in Firestore
        const checkRes = await fetch(`${backend_url}/check-user`, {
          method: 'GET',
          credentials: 'include',
        });

        // ✅ Check explicit status first
        if (checkRes.status === 403) {
          console.warn('User not allowed (403)');
          return router.push('/unauthorized');
        } else if (!checkRes.ok) {
          console.error('Check-user failed:', checkRes.status);
          return router.push('/login');
        }

        await fetch('/api/set-cookie', {
          method: 'POST',
        });
        router.push('/');

      } catch (err) {
        console.error('CallbackInner error:', err);
        router.push('/login');
      }
    };

    authenticate();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner loading-5xl text-accent" />
    </div>
  );
}