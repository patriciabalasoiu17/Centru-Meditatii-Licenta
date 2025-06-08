import axios from "axios";
import { Group } from "./types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/group`;

export const getGroups = async ({
  teacherId,
  name,
}: {
  teacherId?: string;
  name?: string;
}): Promise<Group[] | Group> => {
  var url = BASE_URL;
  if (teacherId) {
    url += `?teacherId=${teacherId}`;
  } else if (name) {
    url += `?name=${name}`;
  }

  const response = await axios.get(url);
  return response.data;
};


export const getGroupsByTeacherId = async ({
  teacherId,
}: {
  teacherId?: string;
}): Promise<Group[]> => {
  var url = BASE_URL;
  if (teacherId) {
    url += `?teacherId=${teacherId}`;
  }

  const response = await axios.get(url);
  return response.data;
};

export const getGroupByName = async ({
  name,
}: {
  name?: string;
}): Promise<Group> => {
  var url = `${BASE_URL}?name=${name}`;
  const response = await axios.get(url);
  return response.data;
};

export const getGroup = async (id: string): Promise<Group> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const addGroup = async (group: Group) => {
  await axios.post(BASE_URL, group);
};

export const updateGroup = async ({
  id,
  group,
}: {
  id: string;
  group: Group;
}) => {
  await axios.patch(`${BASE_URL}/${id}`, group);
};

export const deleteGroup = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
