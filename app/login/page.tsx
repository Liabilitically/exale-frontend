'use client';

export default function LoginPage() {
  const loginWithGoogle = () => {
    const redirectUri = 'https://exale-frontend.vercel.app/oauth/callback';
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const scope = 'https://www.googleapis.com/auth/gmail.modify';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = url;
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className='text-center border-1 p-12 rounded-2xl'>
            <strong className='text-5xl text-accent'>Login</strong><br/><br/><br/>
            <button onClick={loginWithGoogle} className="btn btn-outline p-4 rounded">Continue with Google</button>
        </div>
    </div>
  );
}
