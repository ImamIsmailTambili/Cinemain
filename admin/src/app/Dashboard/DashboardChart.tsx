"use client";

import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { api } from "@/lib/api";

const DashboardChart = () => {
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState<number | null>(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const params: any = { year };
            if (month) params.month = month;

            const res = await api.get("/admin/dashboard/chart", { params });
            setData(res.data.data);
        };

        fetchData();
    }, [year, month]);

    return (
        <div className="bg-white md:rounded-xl  p-3 md:p-6 border border-blue-950 shadow-sm">

            <div className="flex items-center justify-between mb-6">
                <h3 className="md:text-lg font-semibold text-blue-950">Orders per Day</h3>

                <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border rounded px-1 md:px-3 py-1 text-sm md:text-md"
                    >
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                    </select>

                    <select
                        value={month ?? ""}
                        onChange={(e) =>
                            setMonth(e.target.value ? Number(e.target.value) : null)
                        }
                        className="border rounded px-1 md:px-3 py-1 text-sm md:text-md"
                    >
                        <option value="">All Months</option>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Month {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis
                        width={30}
                        tickMargin={4}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#3b82f6"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;