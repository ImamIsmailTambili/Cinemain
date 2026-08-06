import { Bell } from 'lucide-react';
import { api } from '@/lib/api';

const NotifTopbar = async () => {
    const response = await api.get('/admin/notification');
    const notif = response.data.data;

    const unread = notif.filter((n: any) => !n.isRead);

    return (
        <div className="relative inline-flex">
            <Bell color="black" size={25} />

            {unread.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-white text-sm">
                    {unread.length}
                </div>
            )}
        </div>
    );
};

export default NotifTopbar;
