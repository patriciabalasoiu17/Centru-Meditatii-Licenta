"use client";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { day: "Luni", prezenti: 45, absenti: 20 },
    { day: "Marți", prezenti: 60, absenti: 30 },
    { day: "Miercuri", prezenti: 90, absenti: 10 },
    { day: "Joi", prezenti: 50, absenti: 25 },
    { day: "Vineri", prezenti: 70, absenti: 40 },
    { day: "Sâmbătă", prezenti: 30, absenti: 50 },
];

export function PresenceChart() {
    return (
        // <ChartContainer className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="prezenti" fill="hsl(var(--chart-1))" />
                <Bar dataKey="absenti" fill="hsl(var(--chart-2))" />
            </BarChart>
        </ResponsiveContainer>
        // </ChartContainer>
    );
}

