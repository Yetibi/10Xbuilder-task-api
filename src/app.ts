import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import { tasksRouter } from './routes/tasks.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const openapiPath = join(__dirname, '../docs/openapi.yaml');
const openapiContent = readFileSync(openapiPath, 'utf-8');
const swaggerDocument = YAML.load(openapiContent);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument as any));

app.use('/tasks', tasksRouter);

app.use(errorHandler);

export default app;
