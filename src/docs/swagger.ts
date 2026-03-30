export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'API sencilla para gestionar tareas (CRUD).',
  },
  servers: [
    {
      url: 'http://localhost:3014',
      description: 'Servidor de desarrollo',
    },
  ],
  paths: {
    '/tasks': {
      get: {
        summary: 'Listar todas las tareas',
        tags: ['Tasks'],
        responses: {
          '200': {
            description: 'Lista de tareas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Crear una tarea',
        tags: ['Tasks'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateTask' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Tarea creada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
          '400': {
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/tasks/{id}': {
      get: {
        summary: 'Consultar una tarea por ID',
        tags: ['Tasks'],
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        responses: {
          '200': {
            description: 'Tarea encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
          '404': {
            description: 'Tarea no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      patch: {
        summary: 'Actualizar una tarea',
        tags: ['Tasks'],
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateTask' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Tarea actualizada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
          '400': {
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '404': {
            description: 'Tarea no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Eliminar una tarea',
        tags: ['Tasks'],
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        responses: {
          '204': { description: 'Tarea eliminada' },
          '404': {
            description: 'Tarea no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      TaskId: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        description: 'UUID de la tarea',
      },
    },
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          title: { type: 'string', example: 'Comprar leche' },
          description: {
            type: 'string',
            nullable: true,
            example: 'Ir al supermercado',
          },
          status: {
            type: 'string',
            enum: ['pending', 'in_progress', 'done'],
            example: 'pending',
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            example: 'medium',
          },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
      CreateTask: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string', example: 'Comprar leche' },
          description: { type: 'string', example: 'Ir al supermercado' },
          status: {
            type: 'string',
            enum: ['pending', 'in_progress', 'done'],
            default: 'pending',
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            default: 'medium',
          },
        },
      },
      UpdateTask: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Comprar pan' },
          description: { type: 'string', example: 'En la panadería' },
          status: {
            type: 'string',
            enum: ['pending', 'in_progress', 'done'],
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Task not found' },
        },
      },
    },
  },
};
