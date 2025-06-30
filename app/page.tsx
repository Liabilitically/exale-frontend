'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Inbox from './components/inbox';
import Navbar from './components/navbar';

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://exale-backend.onrender.com';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/check-user`, {
      method: 'GET',
      credentials: 'include', // Ensure cookies are sent
    })
      .then(res => {
        if (!res.ok) router.push('/login');
        else setLoading(false);
      })
      .catch(() => router.push('/login'));
  }, [router]);

  if (loading) return <div className="p-10 text-center text-accent">Loading...</div>;

  return (
    <main className="px-4 py-6 min-h-screen">
      <Navbar />
      <h1 className="text-2xl font-bold pb-2 pt-8 px-8">Lead Emails</h1>
      <Inbox />
    </main>
  );
}
