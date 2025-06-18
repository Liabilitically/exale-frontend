'use client';
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OauthCallback() {
    const router = useRouter();
    const params = useSearchParams();

    const backend_url = process.env.NEXT_PUBLIC_API_URL;

    const checkUser = async () => {
        try {
            const res = await fetch(`${backend_url}/check-user`, {
                method: "GET",
                credentials: "include",
            });

            console.log("user checked")
            
            if (res.status === 403) {
                await fetch('/api/logout', { method: 'POST' });
                router.push("/unauthorized")
            } else if (res.status === 401) {
                router.push("/login");
            } else if (!res.ok) {
                console.error("Unexpected error:", await res.text());
            } else {
                router.push('/');
            }
        } catch (err) {
            console.error("Failed to check user:", err)
        }
    };

    useEffect(() => {
        const code = params.get('code');
        if (code) {
            fetch(`${backend_url}/authenticate`, {
                method: "POST",
                body: JSON.stringify({ code }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).then(async () => {
                console.log("fetched authenticate")
                await checkUser();
            });
        }
    }, [params]);

    return (
        <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner loading-3xl" />
        </div>
    );
}