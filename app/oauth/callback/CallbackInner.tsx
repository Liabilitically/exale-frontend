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
      // Step 1: Authenticate
      const authRes = await fetch(`${backend_url}/authenticate`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!authRes.ok) return router.push('/login');

      // Step 2: Check if user is allowed (in Firestore)
      const checkRes = await fetch(`${backend_url}/check-user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (checkRes.status == 403) {
        router.push('/unauthorized');
      } else if (!checkRes.ok) {
        router.push('/login');
      } else {
        // Step 3: Set logged_in cookie on frontend
        document.cookie = 'logged_in=true; path=/; max-age=3600; secure; samesite=None';

        // Step 4: Redirect to homepage after a short delay
        setTimeout(() => router.push('/'), 50);
      }
    };

    authenticate();
  }, [searchParams, router]);

  return (
    <div className="flex items-start justify-center h-screen">
      <span className="loading loading-spinner loading-5xl text-accent" />
    </div>
  );
}