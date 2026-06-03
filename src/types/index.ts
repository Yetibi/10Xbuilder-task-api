export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada';
export type TaskPriority = 'baja' | 'media' | 'alta';

export interface Task {
  id: string;
  titulo: string;
  descripcion?: string;
  estado: TaskStatus;
  prioridad: TaskPriority;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  titulo: string;
  descripcion?: string;
  estado?: TaskStatus;
  prioridad?: TaskPriority;
}

export interface UpdateTaskInput {
  titulo?: string;
  descripcion?: string;
  estado?: TaskStatus;
  prioridad?: TaskPriority;
}
