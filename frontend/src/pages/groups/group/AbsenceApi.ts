import axios from "axios";
import { Absence, MaxAttendance } from "@/lib/types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/absences`;

export const addAbsence = async (absence: {
  studentId: string;
  groupName: string;
  classEventId: string;
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

export const getMaxAttendance = async (
  currentDate: string
): Promise<MaxAttendance> => {
  const response = await axios.get(`${BASE_URL}/max-attendance?date=${currentDate}`);

  return response.data;
};


export const deleteAbsence = async (studentId: string, groupId: string, classEventId: string) => {
  const response = await axios.delete(`${BASE_URL}/${studentId}/${groupId}/${classEventId}`);
  return response.data;
};
