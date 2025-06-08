"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Absence } from "@/lib/types";

export default function PieChartAbsences({ data }: { data: Absence[] }) {
    const groupsMap = new Map<string, number>();
    data.forEach((a) => {
        groupsMap.set(a.groupName, (groupsMap.get(a.groupName) || 0) + 1);
    });

    const chartData = Array.from(groupsMap.entries()).map(([name, value]) => ({ name, value }));
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"];

    return (
        <div className="w-full h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
