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

// 2. SISTEMA DE RÉCORDS EN LA NUBE CON FIREBASE (E y A)
const FIREBASE_URL = "https://amor-mio-records-default-rtdb.firebaseio.com";

let jugadorActual = 'E';
let recordE = 0;
let recordA = 0;

function mostrarRecords() {
  document.getElementById('texto-record-e').textContent = 'Record de E = ' + recordE;
  document.getElementById('texto-record-a').textContent = 'Record de A = ' + recordA;
}

function elegirJugador(letra) {
  jugadorActual = letra;
  document.getElementById('btn-E').classList.toggle('activo', letra === 'E');
  document.getElementById('btn-A').classList.toggle('activo', letra === 'A');
}

// Descarga los récords actuales desde Firebase
async function cargarRecordsNube() {
  try {
    const respuesta = await fetch(`${FIREBASE_URL}/records.json`);
    const datos = await respuesta.json();
    if (datos) {
      recordE = Number(datos.E) || 0;
      recordA = Number(datos.A) || 0;
      mostrarRecords();
    }
  } catch (error) {
    console.error("Error cargando récords de Firebase:", error);
  }
}

// Guarda el nuevo récord en Firebase
async function guardarRecordNube(letra, nuevoPuntaje) {
  try {
    await fetch(`${FIREBASE_URL}/records/${letra}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPuntaje)
    });
  } catch (error) {
    console.error("Error guardando récord en Firebase:", error);
  }
}

// Esta función la llama Godot cada vez que atrapas un objeto
window.actualizarPuntos = function(puntosActuales) {
  if (jugadorActual === 'E' && puntosActuales > recordE) {
    recordE = puntosActuales;
    mostrarRecords();
    guardarRecordNube('E', recordE);
  } else if (jugadorActual === 'A' && puntosActuales > recordA) {
    recordA = puntosActuales;
    mostrarRecords();
    guardarRecordNube('A', recordA);
  }
};

// Carga los récords al abrir la página y los sincroniza cada 5 segundos
cargarRecordsNube();
setInterval(cargarRecordsNube, 5000);
