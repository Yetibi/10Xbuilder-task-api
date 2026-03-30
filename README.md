# Task Manager API

API REST para gestionar tareas, construida con Express.js, TypeScript y Supabase.

## Prerrequisitos

- Node.js 18+
- Una cuenta en [Supabase](https://supabase.com)

## Configuración

1. Instala las dependencias:

```bash
npm install
```

2. Crea el proyecto y la tabla en Supabase siguiendo la guía en [`docs/supabase-setup.md`](docs/supabase-setup.md).

3. Configura las variables de entorno:

```bash
cp .env.example .env
```

Edita `.env` con la URL y clave de tu proyecto Supabase.

## Desarrollo

```bash
npm run dev
```

El servidor arranca en `http://localhost:3000`.

## Endpoints

| Método | Ruta         | Descripción             |
| ------ | ------------ | ----------------------- |
| POST   | /tasks       | Crear una tarea         |
| GET    | /tasks       | Listar todas las tareas |
| GET    | /tasks/:id   | Consultar tarea por ID  |
| PATCH  | /tasks/:id   | Actualizar una tarea    |
| DELETE | /tasks/:id   | Eliminar una tarea      |

## Documentación

La documentación interactiva de la API (Swagger UI) está disponible en:

```
http://localhost:3000/docs
```

## Build

```bash
npm run build
npm start
```
