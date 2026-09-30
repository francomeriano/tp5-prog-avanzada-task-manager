const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 1. Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar tareas' });
  }
});

// 2. Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
  const {
    nombre_proyecto,
    tipo_actividad,
    estado,
    resumen,
    descripcion,
    prioridad,
    informador,
    persona_asignada,
    precondicion,
    fecha_creacion,
    fecha_cierre,
    sprint,
  } = req.body;

  try {
    const query = `
      INSERT INTO tasks (
        nombre_proyecto, tipo_actividad, estado, resumen, descripcion,
        prioridad, informador, persona_asignada, precondicion,
        fecha_creacion, fecha_cierre, sprint
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const values = [
      nombre_proyecto,
      tipo_actividad,
      estado || 'Pendiente',
      resumen,
      descripcion,
      prioridad,
      informador,
      persona_asignada,
      precondicion,
      fecha_creacion || new Date().toISOString().split('T')[0],
      fecha_cierre || null,
      sprint,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar la tarea' });
  }
});

// 3. Editar/Actualizar una tarea completa
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre_proyecto,
    tipo_actividad,
    estado,
    resumen,
    descripcion,
    prioridad,
    informador,
    persona_asignada,
    precondicion,
    fecha_creacion,
    fecha_cierre,
    sprint,
  } = req.body;

  try {
    const query = `
      UPDATE tasks SET
        nombre_proyecto = $1,
        tipo_actividad = $2,
        estado = $3,
        resumen = $4,
        descripcion = $5,
        prioridad = $6,
        informador = $7,
        persona_asignada = $8,
        precondicion = $9,
        fecha_creacion = $10,
        fecha_cierre = $11,
        sprint = $12
      WHERE id = $13
      RETURNING *;
    `;
    const values = [
      nombre_proyecto,
      tipo_actividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      persona_asignada,
      precondicion,
      fecha_creacion,
      fecha_cierre || null,
      sprint,
      id,
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// 4. Finalizar tarea (actualiza estado a "Finalizada")
app.patch('/api/tasks/:id/finalize', async (req, res) => {
  const { id } = req.params;
  const hoy = new Date().toISOString().split('T')[0];
  try {
    const query = `
      UPDATE tasks 
      SET estado = 'Finalizada', fecha_cierre = COALESCE(fecha_cierre, $1)
      WHERE id = $2 
      RETURNING *;
    `;
    const result = await pool.query(query, [hoy, id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al finalizar la tarea' });
  }
});

// 5. Eliminar tarea
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});