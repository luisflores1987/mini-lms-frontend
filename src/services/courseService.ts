import api from "../api/axiosConfig";

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  durationHours: number;
}

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses");
  return response.data.content ?? response.data;
};

export const getCourseById = async (id: number): Promise<Course> => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};
