import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { getMaxAttendance } from "@/pages/groups/group/AbsenceApi";
import { addDays, startOfWeek, startOfMonth, eachDayOfInterval, eachMonthOfInterval, format, isSameMonth } from "date-fns";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";

const fallbackData = [
    { name: "Luni", prezenti: 0, absente: 0 },
    { name: "Marți", prezenti: 0, absente: 0 },
    { name: "Miercuri", prezenti: 0, absente: 0 },
    { name: "Joi", prezenti: 0, absente: 0 },
    { name: "Vineri", prezenti: 0, absente: 0 },
    { name: "Sâmbătă", prezenti: 0, absente: 0 },
    { name: "Duminică", prezenti: 0, absente: 0 },
];

const dayNames = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];

export default function AttendanceChart() {
    const [viewType, setViewType] = useState<"week" | "month">("week");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dates = viewType === "week"
        ? eachDayOfInterval({ start: startOfWeek(selectedDate, { weekStartsOn: 1 }), end: addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), 6) })
        : eachDayOfInterval({ start: startOfMonth(selectedDate), end: addDays(startOfMonth(selectedDate), 30) }).filter((d) => isSameMonth(d, selectedDate));

    const { data: attendanceData } = useQuery({
        queryKey: ["attendance", viewType, selectedDate.toISOString()],
        queryFn: async () => {
            const results = await Promise.all(
                dates.map(async (date) => {
                    const iso = date.toISOString().split("T")[0];
                    const result = await getMaxAttendance(iso);
                    return { date, ...result };
                })
            );
            return results;
        },
    });

    const chartData = attendanceData
        ? attendanceData.map((entry) => ({
            name: viewType === "week"
                ? dayNames[entry.date.getDay()]
                : format(entry.date, "d MMM"),
            prezenti: entry.prezente,
            absente: entry.absente,
        }))
        : fallbackData;

    return (
        <div className="w-full p-4 rounded-xl shadow bg-white dark:bg-muted space-y-4">
            <div className="flex items-center gap-4">
                <Select
                    value={viewType}
                    onValueChange={(val) => setViewType(val as "week" | "month")}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Alege o grupa" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup className="bg-slate-300">
                            <SelectItem value="week">Săptămână</SelectItem>
                            <SelectItem value="month">Lună</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <input
                    type="date"
                    value={format(selectedDate, "yyyy-MM-dd")}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="border p-2 rounded"
                />
            </div>

            <h2 className="text-xl font-semibold">Prezențe și Absențe - {viewType === "week" ? "săptămâna" : "luna"} selectată</h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="prezenti" name="Maxim prezenți" fill="#8884d8" />
                    <Bar dataKey="absente" name="Absente înregistrate" fill="#f87171" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
