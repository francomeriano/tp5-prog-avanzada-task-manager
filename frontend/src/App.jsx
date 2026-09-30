import React, { useEffect, useState } from 'react';
import FormularioTarea from './components/FormularioTarea';
import ListadoTareas from './components/ListadoTareas';
import './styles.css';

const API_URL = 'http://localhost:4000/api/tasks';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);

  const cargarTareas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTareas(data);
    } catch (err) {
      console.error('Error al cargar tareas:', err);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleGuardar = async (tarea) => {
    try {
      if (tarea.id) {
        // Editar
        await fetch(`${API_URL}/${tarea.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tarea),
        });
        setTareaEnEdicion(null);
      } else {
        // Crear
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tarea),
        });
      }
      cargarTareas();
    } catch (err) {
      console.error('Error al guardar tarea:', err);
    }
  };

  const handleFinalizar = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/finalize`, { method: 'PATCH' });
      cargarTareas();
    } catch (err) {
      console.error('Error al finalizar tarea:', err);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta tarea?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      cargarTareas();
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
    }
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '24px' }}>
        <h1>Manejador de Tareas de Proyectos de Software</h1>
        <p style={{ color: '#6b7280' }}>TP5 - Programación Avanzada (React + Vite + Docker + PostgreSQL)</p>
      </header>

      <FormularioTarea
        tareaEnEdicion={tareaEnEdicion}
        onGuardar={handleGuardar}
        onCancelar={() => setTareaEnEdicion(null)}
      />

      <ListadoTareas
        tareas={tareas}
        onEditar={(task) => setTareaEnEdicion(task)}
        onEliminar={handleEliminar}
        onFinalizar={handleFinalizar}
      />
    </div>
  );
}