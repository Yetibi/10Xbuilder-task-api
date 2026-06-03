# 10XBuilder Task API

A simple REST API for managing tasks with full CRUD operations, built with Node.js, Express, TypeScript, and Supabase.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Filter tasks by status and priority
- ✅ Full OpenAPI 3.0 documentation with Swagger UI
- ✅ TypeScript with strict type checking
- ✅ CORS enabled
- ✅ Error handling middleware
- ✅ Environment-based configuration

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **API Documentation**: OpenAPI 3.0 + Swagger UI
- **Package Manager**: npm

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/10Xbuilder-task-api.git
cd 10Xbuilder-task-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project:
   - Click "New project"
   - Enter a project name (e.g., "10Xbuilder-tasks")
   - Set a secure password
   - Select your preferred region
   - Click "Create new project"

### 4. Set up the database

After your Supabase project is created:

1. Go to the SQL Editor in your Supabase dashboard
2. Create a new query and paste this SQL:

```sql
CREATE TABLE tasks (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo      TEXT NOT NULL,
  descripcion TEXT,
  estado      TEXT NOT NULL DEFAULT 'pendiente'
                CHECK (estado IN ('pendiente', 'en_progreso', 'completada')),
  prioridad   TEXT NOT NULL DEFAULT 'media'
                CHECK (prioridad IN ('baja', 'media', 'alta')),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

3. Click "Run" to create the table
4. Enable Row Level Security (RLS):
   - Go to the "Authentication" section
   - Click "Policies" in the SQL Editor
   - For the `tasks` table, enable RLS
   - Create a policy to allow all operations for testing:
     - Policy name: "Allow all operations"
     - Expression: `true`
     - Operations: SELECT, INSERT, UPDATE, DELETE

### 5. Configure environment variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Get your credentials from Supabase:
   - Go to your Supabase project dashboard
   - Click "Settings" → "API"
   - Copy the **Project URL** and **Anon Key**
   - Update `.env` with these values:

```env
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3000
```

### 6. Start the development server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

Swagger documentation: `http://localhost:3000/docs`

## Available Scripts

- `npm run dev` - Start development server with ts-node (watches for changes)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application

## API Endpoints

All endpoints return JSON responses.

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | List all tasks (with optional filters) |
| `GET` | `/tasks/:id` | Get a specific task |
| `POST` | `/tasks` | Create a new task |
| `PATCH` | `/tasks/:id` | Update a task partially |
| `DELETE` | `/tasks/:id` | Delete a task |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health status |

### Documentation

| Endpoint | Description |
|----------|-------------|
| `GET` | `/docs` | Interactive Swagger UI |

## Example Requests

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Buy groceries",
    "descripcion": "Milk, eggs, bread",
    "estado": "pendiente",
    "prioridad": "media"
  }'
```

### List all tasks

```bash
curl http://localhost:3000/tasks
```

### Filter tasks by status

```bash
curl http://localhost:3000/tasks?estado=en_progreso
```

### Get a specific task

```bash
curl http://localhost:3000/tasks/{task-id}
```

### Update a task

```bash
curl -X PATCH http://localhost:3000/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "completada"
  }'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/{task-id}
```

## Project Structure

```
src/
├── index.ts              # Application entry point
├── app.ts                # Express configuration
├── config/
│   └── supabase.ts       # Supabase client
├── routes/
│   └── tasks.routes.ts   # Task routes
├── controllers/
│   └── tasks.controller.ts # Task business logic
├── middleware/
│   └── errorHandler.ts   # Global error handler
└── types/
    └── index.ts          # TypeScript type definitions

docs/
├── brief.md              # Project brief
└── openapi.yaml          # OpenAPI 3.0 specification
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `PORT` | Server port (default: 3000) | No |

## Troubleshooting

### "SUPABASE_URL or SUPABASE_ANON_KEY missing"

Make sure you've created a `.env` file in the project root with your Supabase credentials.

### "Table 'tasks' not found"

Make sure you've created the `tasks` table in your Supabase database using the SQL provided in the setup instructions.

### CORS errors

The API has CORS enabled for all origins. If you're still experiencing issues, update the CORS configuration in `src/app.ts`.

## License

MIT - See LICENSE file for details

## Author

Oscar Barajas
