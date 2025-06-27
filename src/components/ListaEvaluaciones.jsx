import React from 'react';

// Componente para mostrar la lista de evaluaciones
function ListaEvaluaciones({ evaluaciones, eliminarEvaluacion, editarEvaluacion }) {
  // Función para determinar la categoría según el promedio
  const getCategoria = (promedio) => {
    if (promedio <= 3.9) return 'Deficiente'; // Categoría para promedios hasta 3.9
    if (promedio <= 5.5) return 'Con mejora'; // Categoría para promedios hasta 5.5
    if (promedio <= 6.4) return 'Buen trabajo'; // Categoría para promedios hasta 6.4
    return 'Destacado'; // Categoría para promedios de 6.5 a 7.0
  };

  return (
    <div>
      <h3>Evaluaciones Guardadas</h3>
      {evaluaciones.length === 0 ? ( // Condición para mostrar mensaje si no hay evaluaciones
        <p>No hay evaluaciones guardadas aún. ¡Agrega una!</p>
      ) : (
        evaluaciones.map((evaluacion, index) => (
          <div key={index}> {/* Clave única para cada elemento de la lista */}
            <p>
              Alumno: {evaluacion.nombre}, Asignatura: {evaluacion.asignatura}, 
              Promedio: {evaluacion.promedio}, Categoría: {getCategoria(evaluacion.promedio)}
            </p>
            <button onClick={() => eliminarEvaluacion(index)}>Eliminar</button> {/* Botón para eliminar la evaluación */}
            <button onClick={() => editarEvaluacion(index)}>Editar</button> {/* Botón para editar la evaluación */}
          </div>
        ))
      )}
    </div>
  );
}


export default ListaEvaluaciones;