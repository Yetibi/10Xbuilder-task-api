# Configuración de Supabase

## 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) e inicia sesión (o crea una cuenta).
2. Haz clic en **New Project**.
3. Elige una organización, asigna un nombre al proyecto y una contraseña para la base de datos.
4. Selecciona la región más cercana y haz clic en **Create new project**.
5. Espera a que el proyecto termine de aprovisionarse.

## 2. Crear la tabla `tasks`

Ve a **SQL Editor** en el panel lateral de Supabase y ejecuta el siguiente script:

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que ejecuta la función en cada UPDATE
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

## 3. Obtener las credenciales

1. En el panel de Supabase, ve a **Settings → API**.
2. Copia el valor de **Project URL** (ejemplo: `https://abc123.supabase.co`).
3. Copia la clave **anon / public** que aparece en **Project API keys**.

## 4. Configurar variables de entorno

En la raíz del proyecto:

```bash
cp .env.example .env
```

Abre el archivo `.env` y reemplaza los valores:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anon-aqui
PORT=3000
```
