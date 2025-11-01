import { House, CircleUserRound, BadgePercent } from 'lucide-react';
import Link from 'next/link';
import Scroll from './scroll';
import LoginPopup from '@/components/belumLoginPopup';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const headerSM = async () => {
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session?.user;
    return (
        <Scroll>
            <Link href="/" className="flex flex-col items-center text-sm gap-1">
                <House />
                <h1>Home</h1>
            </Link>
            <LoginPopup
                isLoggedIn={isLoggedIn}
                href="/pesanan"
                trigger={
                    <>
                        <BadgePercent />
                        <h1>Pesanan Saya</h1>
                    </>
                }
            />
            <LoginPopup
                isLoggedIn={isLoggedIn}
                href="/mtix"
                trigger={
                    <>
                        <CircleUserRound />
                        <h1>m.tix Saya</h1>
                    </>
                }
            />
        </Scroll >
    )
}

export default headerSM