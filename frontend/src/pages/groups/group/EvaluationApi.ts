import axios from "axios";
import { Evaluation } from "@/lib/types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/evaluations`;

export const getEvaluation = async (studentId: string, groupId: string, classEventId: string): Promise<Evaluation> => {
  const { data } = await axios.get(`${BASE_URL}/${studentId}/${groupId}/${classEventId}`);
  return data;
};

export const saveEvaluation = async (payload: Evaluation): Promise<Evaluation> => {
  const { data } = await axios.post(`${BASE_URL}`, payload);
  return data;
};

export const getGradeEvaluationsForStudent = async (studentId: string): Promise<Evaluation> => {
  const { data } = await axios.get(`${BASE_URL}/grades/${studentId}`)
  return data;
}
export const getEvaluationsForStudent = async (studentId: string): Promise<Evaluation> => {
  console.log("ALO???")
  console.log("🚀 ~ getEvaluationsForStudent ~ `${BASE_URL}/${studentId}`:", `${BASE_URL}/${studentId}`)
  const { data } = await axios.get(`${BASE_URL}/${studentId}`)
  return data;
}