import React, { useState, useEffect } from 'react';

const estadoInicial = {
  nombre_proyecto: '',
  tipo_actividad: 'Desarrollo',
  estado: 'Pendiente',
  resumen: '',
  descripcion: '',
  prioridad: 'Media',
  informador: '',
  persona_asignada: '',
  precondicion: '',
  fecha_creacion: new Date().toISOString().split('T')[0],
  fecha_cierre: '',
  sprint: 'Sprint 1',
};

export default function FormularioTarea({ tareaEnEdicion, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState(estadoInicial);

  useEffect(() => {
    if (tareaEnEdicion) {
      setFormData({
        ...tareaEnEdicion,
        fecha_creacion: tareaEnEdicion.fecha_creacion ? tareaEnEdicion.fecha_creacion.split('T')[0] : '',
        fecha_cierre: tareaEnEdicion.fecha_cierre ? tareaEnEdicion.fecha_cierre.split('T')[0] : '',
      });
    } else {
      setFormData(estadoInicial);
    }
  }, [tareaEnEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
    if (!tareaEnEdicion) setFormData(estadoInicial);
  };

  return (
    <div className="card">
      <h2>{tareaEnEdicion ? 'Editar Tarea' : 'Nueva Tarea de Proyecto'}</h2>
      <form onSubmit={handleSubmit} className="grid-form">
        <div className="form-group">
          <label>Nombre del Proyecto *</label>
          <input
            type="text"
            name="nombre_proyecto"
            required
            value={formData.nombre_proyecto}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tipo de Actividad</label>
          <select name="tipo_actividad" value={formData.tipo_actividad} onChange={handleChange}>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Bug / Corrección">Bug / Corrección</option>
            <option value="Testing">Testing</option>
            <option value="Refactor">Refactor</option>
            <option value="Documentación">Documentación</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Bloqueada">Bloqueada</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>

        <div className="form-group">
          <label>Prioridad</label>
          <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Crítica">Crítica</option>
          </select>
        </div>

        <div className="form-group">
          <label>Informador (Reporter) *</label>
          <input
            type="text"
            name="informador"
            required
            value={formData.informador}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Persona Asignada *</label>
          <input
            type="text"
            name="persona_asignada"
            required
            value={formData.persona_asignada}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Sprint *</label>
          <input
            type="text"
            name="sprint"
            required
            placeholder="Ej: Sprint 1"
            value={formData.sprint}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha de Creación</label>
          <input
            type="date"
            name="fecha_creacion"
            required
            value={formData.fecha_creacion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha de Cierre</label>
          <input
            type="date"
            name="fecha_cierre"
            value={formData.fecha_cierre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Resumen *</label>
          <input
            type="text"
            name="resumen"
            required
            placeholder="Breve título o resumen de la tarea"
            value={formData.resumen}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Precondición</label>
          <textarea
            name="precondicion"
            rows="2"
            placeholder="Requisitos previos necesarios para ejecutar la tarea"
            value={formData.precondicion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width actions">
          <button type="submit" className="btn-primary">
            {tareaEnEdicion ? 'Actualizar Tarea' : 'Crear Tarea'}
          </button>
          {tareaEnEdicion && (
            <button type="button" className="btn-secondary" onClick={onCancelar}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}