export interface Group {
    _id?: string,
    name: string,
    teacherId: string,
    students: string[],
    subject: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}