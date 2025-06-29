import React, { useState, useEffect } from "react";

/**
 * Formulario de carga / edición de evaluaciones
 * — Bootstrap 5 —
 *
 * ✅ Validación visual usando clases `is-valid` / `is-invalid`.
 * ✅ Muestra texto de ayuda cuando los datos no son correctos.
 * ✅ Reutiliza el mismo componente tanto para agregar como para editar.
 */
function Formulario({ agregarEvaluacion, editarValores, setEditarValores }) {
  /* --------------------------- estado del formulario --------------------------- */
  const [form, setForm] = useState({ nombre: "", asignatura: "", promedio: "" });
  const [touched, setTouched] = useState({ nombre: false, asignatura: false, promedio: false });

  /* ---------------------------- cargar datos al editar -------------------------- */
  useEffect(() => {
    if (editarValores) {
      setForm({
        nombre: editarValores.nombre || "",
        asignatura: editarValores.asignatura || "",
        promedio:
          editarValores.promedio !== undefined && editarValores.promedio !== null
            ? editarValores.promedio
            : "",
      });
    }
  }, [editarValores]);

  /* --------------------------------- helpers ----------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const promedioNumber = parseFloat(form.promedio);
  const isNombreValid = form.nombre.trim().length > 0;
  const isAsignaturaValid = form.asignatura.trim().length > 0;
  const isPromedioValid = !isNaN(promedioNumber) && promedioNumber >= 0 && promedioNumber <= 7;

  const formIsValid = isNombreValid && isAsignaturaValid && isPromedioValid;

  /* --------------------------------- submit ------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    // marcamos todos los campos como tocados para disparar feedback visual
    setTouched({ nombre: true, asignatura: true, promedio: true });

    if (!formIsValid) return; // el usuario verá feedback en pantalla

    agregarEvaluacion({
      nombre: form.nombre.trim(),
      asignatura: form.asignatura.trim(),
      promedio: promedioNumber,
    });

    // reset
    setForm({ nombre: "", asignatura: "", promedio: "" });
    setTouched({ nombre: false, asignatura: false, promedio: false });
    setEditarValores(null);
  };

  /* --------------------------------- render ------------------------------------ */
  return (
    <form onSubmit={handleSubmit} className="mb-4" noValidate>
      {/* Nombre */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre del Alumno</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Juan Pérez"
          className={`form-control shadow-sm ${
            touched.nombre ? (isNombreValid ? "is-valid" : "is-invalid") : ""
          }`}
        />
        <div className="invalid-feedback">Este campo es obligatorio.</div>
      </div>

      {/* Asignatura */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Asignatura</label>
        <input
          name="asignatura"
          value={form.asignatura}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Matemáticas"
          className={`form-control shadow-sm ${
            touched.asignatura ? (isAsignaturaValid ? "is-valid" : "is-invalid") : ""
          }`}
        />
        <div className="invalid-feedback">Este campo es obligatorio.</div>
      </div>

      {/* Promedio */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Promedio (0.0 – 7.0)</label>
        <input
          name="promedio"
          type="number"
          step="0.1"
          min="0"
          max="7"
          value={form.promedio}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: 6.5"
          className={`form-control shadow-sm ${
            touched.promedio ? (isPromedioValid ? "is-valid" : "is-invalid") : ""
          }`}
        />
        <div className="invalid-feedback">
          Ingresa un número entre 0.0 y 7.0.
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 fw-bold">
        {editarValores ? "Actualizar Evaluación" : "Agregar Evaluación"}
      </button>
    </form>
  );
}

export default Formulario;
