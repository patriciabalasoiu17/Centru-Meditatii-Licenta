import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FlatEvaluation } from "@/pages/student/catalog/columns/allGradesFlatColumns";

export default function LineChartEvolutie({ data }: { data: FlatEvaluation[] }) {
    const chartData = data
        .filter((e) => typeof e.grade === "number")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((e) => ({
            date: e.date,
            grade: Number(e.grade),
        }));

    return (
        <div className="w-full h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 10]} allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="grade" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}