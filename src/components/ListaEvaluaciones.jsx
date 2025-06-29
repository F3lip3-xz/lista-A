import React from 'react';

function ListaEvaluaciones({ evaluaciones, eliminarEvaluacion, editarEvaluacion }) {
  const getCategoria = (promedio) => {
    if (promedio <= 3.9) return { label: 'Deficiente', color: 'danger' };
    if (promedio <= 5.5) return { label: 'Con mejora', color: 'warning' };
    if (promedio <= 6.4) return { label: 'Buen trabajo', color: 'info' };
    return { label: 'Destacado', color: 'success' };
  };

  return (
    <div className="mt-4">
      <h3 className="h5 mb-3 fw-bold text-secondary">Evaluaciones Guardadas</h3>

      {evaluaciones.length === 0 ? (
        <p className="text-muted">No hay evaluaciones guardadas aún. ¡Agrega una!</p>
      ) : (
        evaluaciones.map((evalItem, index) => {
          const categoria = getCategoria(evalItem.promedio);

          return (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2 text-primary fw-semibold">{evalItem.nombre}</h5>
                <p className="card-text mb-1">
                  <strong>Asignatura:</strong> {evalItem.asignatura}
                </p>
                <p className="card-text mb-1">
                  <strong>Promedio:</strong> {evalItem.promedio.toFixed(1)}{' '}
                  <span className={`badge bg-${categoria.color} ms-2`}>{categoria.label}</span>
                </p>
                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => editarEvaluacion(index)}
                    className="btn btn-warning btn-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarEvaluacion(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListaEvaluaciones;
