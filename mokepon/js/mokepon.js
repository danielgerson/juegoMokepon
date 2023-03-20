const d = document;

function seleccionarMokeponJugador() {
  alert('Seleccionaste Mokepon');
}

let $btnSeleccionar = d.getElementById('btn-seleccionar');
$btnSeleccionar.addEventListener('click', seleccionarMokeponJugador);