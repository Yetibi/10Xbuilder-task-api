import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { estado, prioridad } = req.query;

    let query = supabase.from('tasks').select('*');

    if (estado && typeof estado === 'string') {
      query = query.eq('estado', estado);
    }

    if (prioridad && typeof prioridad === 'string') {
      query = query.eq('prioridad', prioridad);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      res.status(400).json({ error: error.message, details: JSON.stringify(error) });
      return;
    }

    res.json({ data });
  } catch (err: any) {
    console.error('Controller error:', err);
    res.status(500).json({ error: err.message, details: err.stack });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, descripcion, estado = 'pendiente', prioridad = 'media' }: CreateTaskInput = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
      res.status(400).json({ error: 'titulo is required' });
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ titulo, descripcion, estado, prioridad }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates: UpdateTaskInput = req.body;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
