import { UserResource } from "@clerk/types";
import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getUsersWithoutRole = async () => {
  const response = await axios.get(`${BASE_URL}/without-role`);
  return response.data;
};

export const getUser = async (id: string): Promise<UserResource> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const addRole = async (id: string, role: string) => {
  const response = await axios.put(`${BASE_URL}/${id}/role`, { role: role });
  return response.data;
};
