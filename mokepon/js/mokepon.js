const d = document;
let ataqueJugador;

function iniciarJuego() {
  let $btnSeleccionar = d.getElementById("btn-seleccionar");
  $btnSeleccionar.addEventListener("click", seleccionarMokeponJugador);

  let $btnFuego = d.getElementById('btn-fuego');
  $btnFuego.addEventListener('click', ataqueFuego);
  let $btnAgua = d.getElementById('btn-agua');
  $btnAgua.addEventListener('click', ataqueAgua);
  let $btnTierra = d.getElementById('btn-tierra');
  $btnTierra.addEventListener('click', ataqueTierra);
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

function ataqueFuego() {
  ataqueJugador = 'FUEGO';
  alert(ataqueJugador);
}

function ataqueAgua() {
  ataqueJugador = 'AGUA';
  alert(ataqueJugador);
}

function ataqueTierra() {
  ataqueJugador = 'TIERRA';
  alert(ataqueJugador);
}

function mokeponEnemigoAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
