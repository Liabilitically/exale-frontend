'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

export default function CallbackInner() {
  const backend_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkUser = useCallback(async (code: string) => {
    console.log("code param Inside checkUser:", code);
    const res = await fetch(`${backend_url}/authenticate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    console.log("Authenticate res:", res);

    if (res.ok) {
      const authRes = await fetch(`${backend_url}/check-user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!authRes.ok) return router.push('/unauthorized');

      // Wait until cookies are reliably set
      setTimeout(() => {
        router.push('/');
      }, 100); // gives browser time to store cookies

    } else {
      alert('Authentication failed.');
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      console.log("Code Obtained:", code);
      checkUser(code);
    }
  }, [searchParams, checkUser]);

  return <div className="text-center text-accent p-10">Checking user...</div>;
}
