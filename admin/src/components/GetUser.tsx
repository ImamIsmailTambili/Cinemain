import { cookies } from 'next/headers';
import { api } from '@/lib/api';

async function getUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("jwt")?.value;

        if (!token) return null;

        const res = await api.get("/admin/me", {
            headers: {
                cookie: `jwt=${token}`,
            },
        });

        return res.data?.admin ?? null;
    } catch {
        return null;
    }
}

export default getUser