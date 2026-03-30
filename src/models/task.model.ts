export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "done";
  priority?: "low" | "medium" | "high";
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "done";
  priority?: "low" | "medium" | "high";
}
