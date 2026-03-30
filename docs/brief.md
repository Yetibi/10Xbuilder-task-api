# Brief: Task Manager API

Vamos a crear una API sencilla para gestionar tareas. El proyecto estará pensado para trabajar únicamente por medio de solicitudes HTTP, sin interfaz web y sin panel visual. La API servirá para crear, consultar, actualizar y eliminar tareas de forma clara y ordenada.

## Objetivo

Construir una API pequeña, fácil de entender y fácil de probar, que sirva como ejemplo práctico de un CRUD real.

## Qué vamos a construir

Una API de tareas donde cada tarea pueda tener un título, una descripción opcional, un estado y una prioridad. Con esta base será posible listar tareas, consultar una en específico, crear nuevas, editar las existentes y eliminarlas.

## Stack

El proyecto se construirá con Express.js para manejar la API y Supabase para guardar la información. También se documentará con OpenAPI para dejar claro cómo funciona cada endpoint y cómo probarlo.

## Enfoque del proyecto

La API debe mantenerse simple. No queremos un sistema grande ni complejo. La intención es trabajar con un solo recurso principal, que son las tareas, y construir alrededor de eso una base limpia y funcional.

## Alcance

La API debe permitir:

- crear tareas
- listar tareas
- consultar una tarea por id
- actualizar tareas
- eliminar tareas

## Restricciones

Este proyecto será solamente una API. No habrá frontend, dashboard ni interfaz gráfica.

Tampoco vamos a agregar funcionalidades extra que desvíen el objetivo, como autenticación avanzada, panel de administración, archivos adjuntos, notificaciones o tiempo real. La prioridad es mantener el proyecto pequeño, claro y enfocado en un CRUD bien resuelto.

## Resultado esperado

Al final debemos tener una API funcional, conectada a Supabase, con endpoints claros, una estructura ordenada y lista para probarse por HTTP. Debe ser lo bastante simple para entenderse rápido, pero lo bastante sólida para sentirse como un backend real.
