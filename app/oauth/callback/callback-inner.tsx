'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

const backend_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const info_svg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
    </svg>
  );

  const checkUser = useCallback(async (code: string) => {
    const user_authenticated_res = await fetch(`${backend_url}/authenticate?code=${code}`, {
      credentials: 'include',
    });

    if (user_authenticated_res.ok) {
      const user_authorized_res = await fetch(`${backend_url}/check-user`, {
        credentials: 'include',
      });

      if (user_authorized_res.ok){
        router.push('/');
      } else {
        router.push('/unauthorized')
      }
    } else {
      return (
        <div className='toast'>
          <div role='alert' className='alert alert-error font-bold items-center'>
            {info_svg}
            Invalid Authentication. Please try again later.
          </div>
        </div>
      );
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      checkUser(code);
    }
  }, [searchParams, checkUser]);

  return <div className="text-center items-center text-accent h-max">Checking user...</div>;
}