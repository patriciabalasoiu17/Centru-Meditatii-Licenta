import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { GradeSummary } from "@/pages/student/catalog/columns/gradesPerSubjectColumns";

export default function BarChartMedii({ data }: { data: GradeSummary[] }) {
    const chartData = data.map((g) => ({
        subject: g.subject,
        medie: Number(g.average.toFixed(2)),
    }));

    return (
        <div className="w-full h-[300px]">
            
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="medie" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
} 
