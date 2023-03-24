const d = document;
let ataqueJugador;
let ataqueEnemigo;
let resultadoJuego;
let vidasJugador = 3;
let vidasEnemigo = 3;

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
  let mokeponAleatorio = aleatorio(1,3);
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
  ataqueEnemigoAleatorio();
}

function ataqueAgua() {
  ataqueJugador = 'AGUA';
  ataqueEnemigoAleatorio();
}

function ataqueTierra() {
  ataqueJugador = 'TIERRA';
  ataqueEnemigoAleatorio();
}

function ataqueEnemigoAleatorio() {
  let numeroAtaqueEnemigo = aleatorio(1,3);
  if (numeroAtaqueEnemigo == 1 ) {
    ataqueEnemigo = 'FUEGO'
  } else if (numeroAtaqueEnemigo == 2 ) {
    ataqueEnemigo = 'AGUA'
  } else {
    ataqueEnemigo = 'TIERRA'
  }

  combate();
}

function combate() {
  let $spanVidasJugador = d.getElementById('vidas-jugador');
  let $spanVidasEnemigo = d.getElementById('vidas-enemigo');

  if (ataqueJugador == ataqueEnemigo) {
    resultadoJuego = 'EMPATASTE';
    crearMensaje();
  } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
    resultadoJuego = 'GANASTE';
    crearMensaje();
    vidasEnemigo--;
    $spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' ) {
    resultadoJuego = 'GANASTE';
    crearMensaje();
    vidasEnemigo--;
    $spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
    resultadoJuego = 'GANASTE';
    crearMensaje();
    vidasEnemigo--;
    $spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    resultadoJuego = 'PERDISTE';
    crearMensaje();
    vidasJugador--;
    $spanVidasJugador.innerHTML = vidasJugador;
  };
  contadorVidas();
}

function contadorVidas() {
  if (vidasEnemigo == 0){
    crearMensajeJuego('GANASTE!. La PC no tiene vidas.')
  } else if (vidasJugador == 0) {
    crearMensajeJuego('PERDISTE!. Ya no tienes vidas para seguir jugando');
  }
}

function crearMensaje () {
  let $seccionMensaje = d.getElementById('mensajes');

  let $mensajeParrafo = d.createElement("p");
  $mensajeParrafo.innerHTML = `Tu mokepon ataco con ${ataqueJugador}, el mokepon enemigo ataco con ${ataqueEnemigo} - ${resultadoJuego}`;
  
  $seccionMensaje.appendChild($mensajeParrafo);
}

function crearMensajeJuego (resultadoJuegoFinal) {
  let $seccionMensaje = d.getElementById('mensajes');

  let $mensajeParrafo = d.createElement("p");
  $mensajeParrafo.innerHTML = resultadoJuegoFinal;
  
  $seccionMensaje.appendChild($mensajeParrafo);
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
