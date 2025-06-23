import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CallbackInner = dynamic(() => import('./CallbackInner'), { ssr: false });

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackInner />
    </Suspense>
  );
}