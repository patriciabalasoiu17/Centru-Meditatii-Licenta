import { ColumnDef } from "@tanstack/react-table";

export type GradeSummary = {
    subject: string;
    evaluations: { date: string; grade: number | string }[];
    average: number;
};

export const gradesPerSubjectColumns: ColumnDef<GradeSummary>[] = [
    {
        accessorKey: "subject",
        header: "Materie",
    },
    {
        accessorKey: "evaluations",
        header: "Note",
        cell: ({ row }) => (
            <div className="space-y-1">
                {row.original.evaluations.map((evalItem, idx) => (
                    <div key={idx}>{`${evalItem.grade} (${evalItem.date})`}</div>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "average",
        header: "Media",
        cell: ({ getValue }) => {
            const avg = getValue() as number;
            return typeof avg === "number" ? avg.toFixed(2) : "-";
        },
    },
];
