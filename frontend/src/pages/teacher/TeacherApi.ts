import axios from "axios";
import { Teacher } from "./types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/teacher`;

export const getTeachers = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getTeacher = async (id: string): Promise<Teacher> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const getTeacherByEmail = async (email: string): Promise<Teacher> => {
  const res = await axios.get(`${BASE_URL}/email/${email}`);
  return res.data;
};

export const addTeacher = async (teacher: Teacher) => {
  await axios.post(BASE_URL, teacher);
};

export const updateTeacher = async ({
  id,
  teacher,
}: {
  id: string;
  teacher: Teacher;
}) => {
  await axios.patch(`${BASE_URL}/${id}`, teacher);
};

export const deleteTeacher = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
