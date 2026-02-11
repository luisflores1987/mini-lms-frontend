import axios from "axios";
import type { UserTask } from "../types/task";

const API_URL = "http://localhost:8080";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getTasksWithStatus = async (courseId: number): Promise<UserTask[]> => {
  const response = await axios.get(
    `${API_URL}/me/tasks?courseId=${courseId}`,
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const completeTask = async (taskId: number) => {
  await axios.post(
    `${API_URL}/me/tasks/${taskId}/complete`,
    {},
    { headers: getAuthHeader() }
  );
};

export const uncompleteTask = async (taskId: number) => {
  await axios.delete(
    `${API_URL}/me/tasks/${taskId}/complete`,
    { headers: getAuthHeader() }
  );
};
