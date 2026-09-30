CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  nombre_proyecto VARCHAR(150) NOT NULL,
  tipo_actividad VARCHAR(100) NOT NULL,
  estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
  resumen VARCHAR(255) NOT NULL,
  descripcion TEXT,
  prioridad VARCHAR(50) NOT NULL,
  informador VARCHAR(100) NOT NULL,
  persona_asignada VARCHAR(100) NOT NULL,
  precondicion TEXT,
  fecha_creacion DATE NOT NULL,
  fecha_cierre DATE,
  sprint VARCHAR(50) NOT NULL
);