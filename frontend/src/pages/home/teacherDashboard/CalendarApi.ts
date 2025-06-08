import axios from "axios";
import moment from "moment";
import { Event } from "react-big-calendar";
import { toast } from "sonner";

const BASE_URL = `${import.meta.env.VITE_API_URL}/classEvent`;

export interface ClassEvent extends Event {
  _id?: string;
  teacherId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export const getClassEvents = async ({ teacherId }: { teacherId: string }) => {
  const response = await axios.get(`${BASE_URL}?teacherId=${teacherId}`);

  return (response.data as ClassEvent[]).map((e) => {
    return {
      ...e,
      start: moment(e.start).toDate(),
      end: moment(e.end).toDate(),
    };
  });
};

export const getClassEvent = async (id: string): Promise<Event> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const addClassEvent = async (classEvent: ClassEvent) => {
  if (
    classEvent.end == null ||
    classEvent.end == undefined ||
    classEvent.start == null ||
    classEvent.start == undefined
  ) {
    toast.error("Dates cannot be null!");
    return;
  }

  //find the number of weeks between end of occurence and start of occurence
  const weeksOfOccurence = Math.round(
    (classEvent.end.valueOf() - classEvent.start.valueOf()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  if (weeksOfOccurence == 0) {
    await axios.post(BASE_URL, classEvent);
  }

  for (var i = 0; i < weeksOfOccurence; i++) {
    const nextAppointmentEndDate = new Date(
      classEvent.start.getFullYear(),
      classEvent.start.getMonth(),
      classEvent.start.getDate() + i * 7,
      classEvent.end.getHours(),
      classEvent.end.getMinutes()
    );

    const nextAppointmentStartDate = new Date(
      classEvent.start.getFullYear(),
      classEvent.start.getMonth(),
      classEvent.start.getDate() + i * 7,
      classEvent.start.getHours(),
      classEvent.start.getMinutes()
    );
    const nextAppointment = {
      ...classEvent,
      start: nextAppointmentStartDate,
      end: nextAppointmentEndDate,
    };
    await axios.post(BASE_URL, nextAppointment);
  }
};

export const updateClassEvent = async ({
  id,
  classEvent,
}: {
  id: string;
  classEvent: Event;
}) => {
  await axios.patch(`${BASE_URL}/${id}`, classEvent);
};

export const deleteClassEvent = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
