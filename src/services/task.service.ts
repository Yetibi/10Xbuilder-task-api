import { supabase } from "../config/supabase.js";
import type { Task, CreateTaskDto, UpdateTaskDto } from "../models/task.model.js";

const TABLE = "tasks";

export async function getAllTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Task[];
}

export async function getTaskById(id: string): Promise<Task | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code === "PGRST116") return null;
  if (error) throw error;
  return data as Task;
}

export async function createTask(dto: CreateTaskDto): Promise<Task> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(dto)
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function updateTask(
  id: string,
  dto: UpdateTaskDto
): Promise<Task | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(dto)
    .eq("id", id)
    .select()
    .single();

  if (error && error.code === "PGRST116") return null;
  if (error) throw error;
  return data as Task;
}

export async function deleteTask(id: string): Promise<boolean> {
  const { error, count } = await supabase
    .from(TABLE)
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) throw error;
  return (count ?? 0) > 0;
}
