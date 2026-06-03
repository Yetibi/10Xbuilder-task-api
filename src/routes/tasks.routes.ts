import { Router } from 'express';
import * as tasksController from '../controllers/tasks.controller';

export const tasksRouter = Router();

tasksRouter.get('/', tasksController.getAll);
tasksRouter.post('/', tasksController.create);
tasksRouter.get('/:id', tasksController.getById);
tasksRouter.patch('/:id', tasksController.update);
tasksRouter.delete('/:id', tasksController.remove);
