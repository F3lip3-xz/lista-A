import React, { useState, useEffect } from 'react';
import Formulario from '../src/components/Formulario';
import ListaEvaluaciones from '../src/components/ListaEvaluaciones';
import './App.css';

// Componente principal de la aplicación
function App() {
  // Estado para almacenar la lista de evaluaciones
  const [evaluaciones, setEvaluaciones] = useState([]);
  // Estado para manejar los valores de la evaluación en modo edición
  const [editarValores, setEditarValores] = useState(null);

  // Efecto para cargar evaluaciones guardadas al iniciar la aplicación
  useEffect(() => {
    const saved = localStorage.getItem('evaluaciones');
    if (saved) setEvaluaciones(JSON.parse(saved)); // Carga desde localStorage si existe
  }, []); // Se ejecuta solo al montar el componente

  // Efecto para guardar evaluaciones en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones)); // Guarda la lista en localStorage
  }, [evaluaciones]); // Se ejecuta cada vez que cambia evaluaciones

  // Función para agregar o actualizar una evaluación
  const agregarEvaluacion = (nuevaEval) => {
    if (editarValores !== null) {
      const nuevasEvaluaciones = [...evaluaciones]; // Crea una copia de la lista
      nuevasEvaluaciones[editarValores.index] = nuevaEval; // Actualiza la evaluación en el índice correspondiente
      setEvaluaciones(nuevasEvaluaciones); // Actualiza el estado
      setEditarValores(null); // Sale del modo edición
    } else {
      setEvaluaciones([...evaluaciones, nuevaEval]); // Agrega una nueva evaluación si no está en modo edición
    }
  };

  // Función para eliminar una evaluación
  const eliminarEvaluacion = (index) => {
    setEvaluaciones(evaluaciones.filter((_, i) => i !== index)); // Filtra la lista eliminando el índice seleccionado
  };

  // Función para iniciar el modo edición
  const editarEvaluacion = (index) => {
    setEditarValores({ ...evaluaciones[index], index }); // Pasa los datos de la evaluación y su índice
  };

  return (
    <div className="App">
      <h2>Evaluación de Alumnos</h2>
      <Formulario agregarEvaluacion={agregarEvaluacion} editarValores={editarValores} setEditarValores={setEditarValores} />
      <ListaEvaluaciones
        evaluaciones={evaluaciones}
        eliminarEvaluacion={eliminarEvaluacion}
        editarEvaluacion={editarEvaluacion}
      />
    </div>
  );
}

export default App;