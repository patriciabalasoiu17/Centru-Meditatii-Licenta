import { ColumnDef } from "@tanstack/react-table";

export type FlatEvaluation = {
    subject: string;
    grade: number | string;
    date: string;
    groupName: string;
    behavior: string;
    comment: string;
    topics: string[];
    gaps: string[];
    understandings: string[];
};

export const allGradesFlatColumns: ColumnDef<FlatEvaluation>[] = [
    { accessorKey: "subject", header: "Materie" },
    { accessorKey: "grade", header: "Notă" },
    { accessorKey: "date", header: "Data" },
    { accessorKey: "groupName", header: "Grupă" },
    { accessorKey: "behavior", header: "Comportament" },
    { accessorKey: "comment", header: "Observație" },
    {
        accessorKey: "topics",
        header: "Subiecte",
        cell: ({ row }) => (
            <div className="space-y-1">
                {row.original.topics.map((topic, idx) => (
                    <div key={idx}>{topic}</div>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "gaps",
        header: "Lacune",
        cell: ({ row }) => (
            <div className="space-y-1">
                {row.original.gaps.map((gap, idx) => (
                    <div key={idx}>{gap}</div>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "understandings",
        header: "Înțelegeri & Exerciții",
        cell: ({ row }) => (
            <div className="space-y-1">
                {row.original.understandings.map((u, idx) => (
                    <div key={idx}>{u}</div>
                ))}
            </div>
        ),
    },
];
