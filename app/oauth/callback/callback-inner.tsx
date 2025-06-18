'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

const backend_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkUser = useCallback(async (code: string) => {
    const res = await fetch(`${backend_url}/oauth/callback?code=${code}`, {
      credentials: 'include',
    });

    if (res.ok) {
      router.push('/inbox');
    } else {
      router.push('/error');
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      checkUser(code);
    }
  }, [searchParams, checkUser]); // ✅ No more warning

  return <div className="text-center text-accent font-bold mt-10">Checking user...</div>;
}