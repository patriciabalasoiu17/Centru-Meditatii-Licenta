export interface Absence {
    _id: string;
    studentId: string;
    groupName: string;
    classEventId: string;
    date: string;
    reason?: string;
}

export interface MaxAttendance {
    prezente: number;
    absente: number;
}

export interface MaxAttendanceDate extends MaxAttendance {
    date: Date;
}

export interface Subject {
    name: string;
    understanding: string;
    exercises: string;
}

export interface Gap {
    classLevel: string;
    topic: string;
    observation: string;
}

export interface Evaluation {
    studentId: string;
    groupName: string;
    classEventId: string;
    behavior: string;
    subjects: Subject[];
    gaps: Gap[];
    grade?: number | null;
    gradeComment?: string;
    homework?: string;
}
