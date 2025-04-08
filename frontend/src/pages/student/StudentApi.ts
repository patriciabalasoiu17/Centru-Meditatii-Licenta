import axios from "axios";
import { Student } from "./types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/student`;

export const getStudents = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getStudent = async (id: string): Promise<Student> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const addStudent = async (student: Student) => {
  await axios.post(BASE_URL, student);
};

export const updateStudent = async ({
  id,
  student,
}: {
  id: string;
  student: Student;
}) => {
  await axios.patch(`${BASE_URL}/${id}`, student);
};

export const deleteStudent = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
