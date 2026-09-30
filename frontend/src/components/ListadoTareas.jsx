import React from 'react';

export default function ListadoTareas({ tareas, onEditar, onEliminar, onFinalizar }) {
  if (tareas.length === 0) {
    return (
      <div className="card">
        <h2>Listado de Tareas</h2>
        <p>No hay tareas registradas en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Listado de Tareas ({tareas.length})</h2>
      <div className="task-list">
        {tareas.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.estado === 'Finalizada' ? 'finalizada' : ''}`}
          >
            <div className="task-header">
              <h3>
                [{task.nombre_proyecto}] - {task.resumen}
              </h3>
              <div>
                <span className="badge badge-priority">{task.prioridad}</span>{' '}
                <span className="badge badge-state">{task.estado}</span>
              </div>
            </div>

            <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>{task.descripcion}</p>

            <div style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.6' }}>
              <strong>Actividad:</strong> {task.tipo_actividad} | <strong>Sprint:</strong> {task.sprint}<br />
              <strong>Asignado:</strong> {task.persona_asignada} | <strong>Informador:</strong> {task.informador}<br />
              {task.precondicion && (
                <><strong>Precondición:</strong> {task.precondicion}<br /></>
              )}
              <strong>Creado:</strong> {task.fecha_creacion?.split('T')[0]}{' '}
              {task.fecha_cierre && <>| <strong>Cierre:</strong> {task.fecha_cierre?.split('T')[0]}</>}
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={() => onEditar(task)}>
                Editar
              </button>
              {task.estado !== 'Finalizada' && (
                <button className="btn-success" onClick={() => onFinalizar(task.id)}>
                  Finalizar
                </button>
              )}
              <button className="btn-danger" onClick={() => onEliminar(task.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}