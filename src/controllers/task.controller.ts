import type { Request, Response } from "express";
import * as taskService from "../services/task.service.js";
import type { CreateTaskDto, UpdateTaskDto } from "../models/task.model.js";

type IdParams = { id: string };

const VALID_STATUSES = ["pending", "in_progress", "done"];
const VALID_PRIORITIES = ["low", "medium", "high"];

export async function getAll(_req: Request, res: Response) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
}

export async function getById(req: Request<IdParams>, res: Response) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve task" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { title, description, status, priority } = req.body as CreateTaskDto;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    if (status && !VALID_STATUSES.includes(status)) {
      res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
      return;
    }

    if (priority && !VALID_PRIORITIES.includes(priority)) {
      res.status(400).json({ error: `Priority must be one of: ${VALID_PRIORITIES.join(", ")}` });
      return;
    }

    const task = await taskService.createTask({ title: title.trim(), description, status, priority });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function update(req: Request<IdParams>, res: Response) {
  try {
    const { title, description, status, priority } = req.body as UpdateTaskDto;

    if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
      res.status(400).json({ error: "Title cannot be empty" });
      return;
    }

    if (status && !VALID_STATUSES.includes(status)) {
      res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
      return;
    }

    if (priority && !VALID_PRIORITIES.includes(priority)) {
      res.status(400).json({ error: `Priority must be one of: ${VALID_PRIORITIES.join(", ")}` });
      return;
    }

    const dto: UpdateTaskDto = {};
    if (title !== undefined) dto.title = title.trim();
    if (description !== undefined) dto.description = description;
    if (status !== undefined) dto.status = status;
    if (priority !== undefined) dto.priority = priority;

    const task = await taskService.updateTask(req.params.id, dto);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
}

export async function remove(req: Request<IdParams>, res: Response) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
}
