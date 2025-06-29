import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListaEvaluaciones from './components/ListaEvaluaciones';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';   // ← necesitamos JS para toasts

function App() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [editarValores, setEditarValores] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  /* --- localStorage (igual) --- */
  useEffect(() => {
    const saved = localStorage.getItem('evaluaciones');
    if (saved) setEvaluaciones(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  /* --- helpers --- */
  const mostrarToast = (msg) => {
    setToastMsg(msg);
    const toastEl = document.getElementById('mainToast');
    if (toastEl) new window.bootstrap.Toast(toastEl).show();
  };

  const agregarEvaluacion = (nuevaEval) => {
    if (editarValores !== null) {
      const nuevas = [...evaluaciones];
      nuevas[editarValores.index] = nuevaEval;
      setEvaluaciones(nuevas);
      setEditarValores(null);
      mostrarToast('¡Evaluación actualizada!');
    } else {
      setEvaluaciones([...evaluaciones, nuevaEval]);
      mostrarToast('¡Evaluación agregada!');
    }
  };

  const eliminarEvaluacion = (i) => {
    setEvaluaciones(evaluaciones.filter((_, idx) => idx !== i));
    mostrarToast('Evaluación eliminada');
  };

  return (
    <div className="app-container">
      <div className="card p-4">
        <h2 className="text-center mb-4">Evaluación de Alumnos</h2>

        {/* Formulario */}
        <Formulario
          agregarEvaluacion={agregarEvaluacion}
          editarValores={editarValores}
          setEditarValores={setEditarValores}
        />

        <hr />

        {/* Lista */}
        <ListaEvaluaciones
          evaluaciones={evaluaciones}
          eliminarEvaluacion={eliminarEvaluacion}
          editarEvaluacion={setEditarValores}
        />
      </div>

      {/* Toast Bootstrap */}
      <div
        id="mainToast"
        className="toast align-items-center text-bg-primary border-0 position-fixed bottom-0 end-0 m-4"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toastMsg}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
}

export default App;
