const d = document;

function iniciarJuego() {
  let $btnSeleccionar = d.getElementById("btn-seleccionar");
  $btnSeleccionar.addEventListener("click", seleccionarMokeponJugador);
}

function seleccionarMokeponJugador() {
  let $btnHipodoge = d.getElementById('hipodoge');
  let $btnCapipepo = d.getElementById('capipepo');
  let $btnRatigueya = d.getElementById('ratigueya');
  let $spanMokeponJugador = d.getElementById('mokepon-jugador');

  if($btnHipodoge.checked) {
    $spanMokeponJugador.innerHTML = 'Hipodoge';
  } else if ($btnCapipepo.checked) {
    $spanMokeponJugador.innerHTML = 'Capipepo';
  } else if ($btnRatigueya.checked) {
    $spanMokeponJugador.innerHTML = 'Ratigueya';
  } else {
    alert("Selecciona un Mokepon");
  }
}

window.addEventListener("load", iniciarJuego);
