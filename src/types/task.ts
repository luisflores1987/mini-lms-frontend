export interface Task {
  id: number;
  title: string;
  description: string;
}

export interface UserTask {
  taskId: number;
  title: string;
  description: string;
  completed: boolean;
}
