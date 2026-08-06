import { cookies } from 'next/headers';
import { api } from '@/lib/api';

async function getUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("jwt")?.value;

        if (!token) return null;

        const res = await api.get("/auth/me", {
            headers: {
                cookie: `jwt=${token}`,
            },
        });

        return res.data?.user ?? null;
    } catch {
        return null;
    }
}

export default getUser