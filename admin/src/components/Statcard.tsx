import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
    return (
        <div className="bg-white md:rounded-xl p-6 border border-blue-950 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-lg bg-blue-950 flex items-center justify-center">
                    <Icon color='white' className="w-10 h-10" />
                </div>
            </div>
            <h3 className="text-sm font-medium mb-1 text-center">{title}</h3>
            <p className="text-2xl font-semibold text-center">{value}</p>
        </div>
    );
}