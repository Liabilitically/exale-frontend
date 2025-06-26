import { Suspense } from 'react';
import CallbackInner from './CallbackInner';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackInner />
    </Suspense>
  );
}