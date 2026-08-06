import getUser from '../GetUser';
import NotifTopbar from './NotifTopbar';
import Link from 'next/link';

const TopBar = async () => {
    const admin = await getUser();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between md:justify-end px-3 md:px-10">
            {/* Logo */}
            <Link href="/Dashboard" className="md:hidden text-2xl font-logo text-blue-950">
                Cinemain
            </Link>

            <div className="flex items-center gap-3 md:gap-4">
                <Link href="/Notif">
                    <NotifTopbar />
                </Link>

                <div className="flex items-center gap-1 md:gap-4  pl-2 md:pl-4 border-l border-slate-200">
                    <div className="text-right">
                        <p className="text-sm font-semibold">{admin?.username?.toUpperCase()}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-950 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{admin?.username
                            .slice(0, 2)
                            .toUpperCase()
                        }</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TopBar