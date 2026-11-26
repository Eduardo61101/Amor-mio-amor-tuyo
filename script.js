// 1. CONTADOR DE TIEMPO JUNTOS (20 de noviembre de 2026 a las 07:30:00)
const fechaInicio = new Date(2026, 10, 20, 7, 30, 0);

function actualizarContador() {
  const ahora = new Date();
  const diferencia = ahora - fechaInicio;
  const msTotales = Math.max(0, diferencia);

  const dias = Math.floor(msTotales / (1000 * 60 * 60 * 24));
  const horas = Math.floor((msTotales / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((msTotales / (1000 * 60)) % 60);
  const segundos = Math.floor((msTotales / 1000) % 60);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
  document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

// 2. SISTEMA DE RÉCORDS PARA EL MINIJUEGO (E y A)
let jugadorActual = 'E';
let recordE = Number(localStorage.getItem('record_E')) || 0;
let recordA = Number(localStorage.getItem('record_A')) || 0;

function mostrarRecords() {
  document.getElementById('texto-record-e').textContent = 'Record de E = ' + recordE;
  document.getElementById('texto-record-a').textContent = 'Record de A = ' + recordA;
}

function elegirJugador(letra) {
  jugadorActual = letra;
  document.getElementById('btn-E').classList.toggle('activo', letra === 'E');
  document.getElementById('btn-A').classList.toggle('activo', letra === 'A');
}

// Esta función la llama Godot automáticamente cada vez que atrapas un objeto
window.actualizarPuntos = function(puntosActuales) {
  if (jugadorActual === 'E' && puntosActuales > recordE) {
    recordE = puntosActuales;
    localStorage.setItem('record_E', recordE);
    mostrarRecords();
  } else if (jugadorActual === 'A' && puntosActuales > recordA) {
    recordA = puntosActuales;
    localStorage.setItem('record_A', recordA);
    mostrarRecords();
  }
};

// Muestra los récords guardados al abrir la página
mostrarRecords();
