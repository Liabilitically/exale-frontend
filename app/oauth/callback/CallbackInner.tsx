'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://exale-backend.onrender.com';

export default function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkAndRedirect = useCallback(async (code: string) => {
    try {
      const authRes = await fetch(`${backendUrl}/authenticate`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!authRes.ok) {
        router.push('/unauthorized');
        return;
      }

      const userCheck = await fetch(`${backendUrl}/check-user`, {
        method: 'GET',
        credentials: 'include'
      });

      router.push(userCheck.ok ? '/' : '/unauthorized');

    } catch (error) {
      console.error('Error during authentication:', error);
      router.push('/unauthorized');
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      checkAndRedirect(code);
    }
  }, [searchParams, checkAndRedirect]);

  return (
    <div className="text-center text-accent p-10">
      Checking user...
    </div>
  );
}
