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
  
    seleccionarMokeponEnemigo();
}

function seleccionarMokeponEnemigo() {
  let mokeponAleatorio = mokeponEnemigoAleatorio(1,3);
  let $spanMokeponEnemigo = d.getElementById('mokepon-enemigo');

  if (mokeponAleatorio == 1 ) {
    $spanMokeponEnemigo.innerHTML = 'Hipodoge';
  } else if (mokeponAleatorio == 2 ) {
    $spanMokeponEnemigo.innerHTML = 'Capipepo';
  } else {
    $spanMokeponEnemigo.innerHTML = 'Ratigueya';
  } 
}

function mokeponEnemigoAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
