'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

const backend_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkUser = useCallback(async (code: string) => {
    const res = await fetch(`${backend_url}/authenticate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      const authRes = await fetch(`${backend_url}/check-user`, {
        method: 'GET',
        credentials: 'include',
      });

      router.push(authRes.ok ? '/' : '/unauthorized');
    } else {
      alert('Authentication failed.');
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      checkUser(code);
    }
  }, [searchParams, checkUser]);

  return <div className="text-center text-accent p-10">Checking user...</div>;
}
