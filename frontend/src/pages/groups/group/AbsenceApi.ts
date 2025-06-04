import axios from "axios";
import { Absence } from "./types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/absences`;

export const addAbsence = async (absence: {
  studentId: string;
  groupId: string;
  date: Date;
  reason: string;
}) => {
  const response = await axios.post(BASE_URL, absence);
  return response.data;
};

export const getAbsencesForStudent = async (
  studentId: string
): Promise<Absence[]> => {
  const response = await axios.get(`${BASE_URL}/student/${studentId}`);
  return response.data;
};
