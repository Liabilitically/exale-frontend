'use client'
import React, { Suspense } from 'react';
import CallbackInner from './callback-inner';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackInner />
    </Suspense>
  );
}