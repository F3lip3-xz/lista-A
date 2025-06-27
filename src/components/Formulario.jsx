import React, { useState, useEffect } from 'react';

// Componente Formulario para agregar o actualizar evaluaciones
function Formulario({ agregarEvaluacion, editarValores, setEditarValores }) {
  // Estados para almacenar los valores del formulario
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');

  // Efecto para prellenar el formulario cuando se está en modo edición
  useEffect(() => {
    if (editarValores) {
      setNombre(editarValores.nombre || ''); // Pone el nombre de la evaluación a editar
      setAsignatura(editarValores.asignatura || ''); // Pone la asignatura de la evaluación a editar
      setPromedio(editarValores.promedio || ''); // Pone el promedio de la evaluación a editar
    }
  }, [editarValores]); // Se ejecuta cuando cambia editarValores

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el recargo de la página
    // Valida que los campos no estén vacíos y el promedio esté en rango (0-7)
    if (nombre && asignatura && promedio >= 0 && promedio <= 7) {
      agregarEvaluacion({ nombre, asignatura, promedio: parseFloat(promedio) }); // Envía la nueva o actualizada evaluación
      setNombre(''); // Limpia el campo nombre
      setAsignatura(''); // Limpia el campo asignatura
      setPromedio(''); // Limpia el campo promedio
      setEditarValores(null); // Sale del modo edición
    } else {
      alert('Por favor, ingrese datos válidos (promedio entre 0.0 y 7.0)'); // Muestra alerta si los datos son inválidos
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={asignatura} onChange={(e) => setAsignatura(e.target.value)} placeholder="Asignatura" />
      <input value={promedio} onChange={(e) => setPromedio(e.target.value)} type="number" min="0.0" max="7.0" step="0.1" placeholder="Promedio (0.0-7.0)" />
      <button type="submit">{editarValores ? 'Actualizar Evaluación' : 'Agregar Evaluación'}</button>
    </form>
  );
}

export default Formulario;