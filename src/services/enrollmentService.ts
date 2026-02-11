import axios from "axios";
import type { Course } from "../types/course";

const API_URL = "http://localhost:8080";

export const getMyCourses = async (): Promise<Course[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/me/enrollments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await axios.get(`${API_URL}/me/enrollments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const enroll = async (courseId: number) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/me/enrollments/${courseId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unenroll = async (courseId: number) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/me/enrollments/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
