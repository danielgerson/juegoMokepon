const d = document;

/* Variables del DOM */
const $seccionAtaques = d.getElementById("ataques");
const $seccionReiniciar = d.getElementById("reiniciar-juego");
const $btnSeleccionar = d.getElementById("btn-seleccionar");
const $btnFuego = d.getElementById("btn-fuego");
const $btnAgua = d.getElementById("btn-agua");
const $btnTierra = d.getElementById("btn-tierra");
const $btnReiniciar = d.getElementById("btn-reiniciar");
const $insertarMokepones = d.getElementById('container-mokepones');

const $seccionMokepones = d.getElementById("mokepones");
const $spanMokeponJugador = d.getElementById("mokepon-jugador");

const $spanMokeponEnemigo = d.getElementById("mokepon-enemigo");


const $spanVidasJugador = d.getElementById("vidas-jugador");
const $spanVidasEnemigo = d.getElementById("vidas-enemigo");

const $seccionMensaje = d.getElementById("resultado");
const $mensajeAtaqueJugador = d.getElementById("ataques-jugador");
const $mensajeAtaqueEnemigo = d.getElementById("ataques-enemigo");

let mokepones = [];
let opcionMokepones;
let $btnHipodoge
let $btnCapipepo
let $btnRatigueya
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 3);
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 3);
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3);

hipodoge.ataques.push(
  { id: 'btn-agua', nombre: 'Agua' },
  { id: 'btn-agua', nombre: 'Agua' },
  { id: 'btn-agua', nombre: 'Agua' },
  { id: 'btn-fuego', nombre: 'Fuego' },
  { id: 'btn-tierra', nombre: 'Tierra' }
);

capipepo.ataques.push(
  { id: 'btn-tierra', nombre: 'Tierra' },
  { id: 'btn-tierra', nombre: 'Tierra' },
  { id: 'btn-tierra', nombre: 'Tierra' },
  { id: 'btn-agua', nombre: 'Agua' },
  { id: 'btn-fuego', nombre: 'Fuego' }
)

ratigueya.ataques.push(
  { id: 'btn-fuego', nombre: 'Fuego' },
  { id: 'btn-fuego', nombre: 'Fuego' },
  { id: 'btn-fuego', nombre: 'Fuego' },
  { id: 'btn-agua', nombre: 'Agua' },
  { id: 'btn-tierra', nombre: 'Tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  $seccionAtaques.style.display = "none";
  $seccionReiniciar.style.display = "none";

  mokepones.forEach(mokepon => {
    opcionMokepones = `
    <input type="radio" name="mokepon" id=${mokepon.nombre} />
    <label class="card-mokepon" for=${mokepon.nombre}>
      <p>${mokepon.nombre}</p>
      <img
        src=${mokepon.foto}
        alt=${mokepon.nombre}
      />
    </label>
    `
    $insertarMokepones.innerHTML += opcionMokepones;

    $btnHipodoge = d.getElementById("Hipodoge");
    $btnCapipepo = d.getElementById("Capipepo");
    $btnRatigueya = d.getElementById("Ratigueya");
  })
  

  $btnSeleccionar.addEventListener("click", seleccionarMokeponJugador);

  $btnFuego.addEventListener("click", ataqueFuego);
  $btnAgua.addEventListener("click", ataqueAgua);
  $btnTierra.addEventListener("click", ataqueTierra);

  $btnReiniciar.addEventListener("click", reiniciar);
}

function seleccionarMokeponJugador() {
  $seccionAtaques.style.display = "flex";
  $seccionMokepones.style.display = "none";

  if ($btnHipodoge.checked) {
  $spanMokeponJugador.innerHTML = $btnHipodoge.id;
  } else if ($btnCapipepo.checked) {
    $spanMokeponJugador.innerHTML = $btnCapipepo.id;
  } else if ($btnRatigueya.checked) {
    $spanMokeponJugador.innerHTML = $btnRatigueya.id;
  } else {
    alert("Selecciona un Mokepon");
    $seccionAtaques.style.display = "none";
  }

  seleccionarMokeponEnemigo();
}

function seleccionarMokeponEnemigo() {
  let mokeponAleatorio = aleatorio(1, 3);

  if (mokeponAleatorio == 1) {
    $spanMokeponEnemigo.innerHTML = "Hipodoge";
  } else if (mokeponAleatorio == 2) {
    $spanMokeponEnemigo.innerHTML = "Capipepo";
  } else {
    $spanMokeponEnemigo.innerHTML = "Ratigueya";
  }
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueEnemigoAleatorio();
}

function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueEnemigoAleatorio();
}

function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueEnemigoAleatorio();
}

function ataqueEnemigoAleatorio() {
  let numeroAtaqueEnemigo = aleatorio(1, 3);
  if (numeroAtaqueEnemigo == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (numeroAtaqueEnemigo == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }

  combate();
}

function combate() {
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATASTE");
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    $spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    $spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    $spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidasJugador--;
    $spanVidasJugador.innerHTML = vidasJugador;
  }
  contadorVidas();
}

function contadorVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeJuego("GANASTE!. La PC no tiene vidas.");
  } else if (vidasJugador == 0) {
    crearMensajeJuego("PERDISTE!. Ya no tienes vidas para seguir jugando");
  }
}

function reiniciar() {
  location.reload();
}

function crearMensaje(resultadoJuego) {
  let $mostarAtaqueJugador = d.createElement("p");
  let $mostarAtaqueEnemigo = d.createElement("p");

  $seccionMensaje.innerHTML = resultadoJuego;
  $mostarAtaqueJugador.innerHTML = ataqueJugador;
  $mostarAtaqueEnemigo.innerHTML = ataqueEnemigo;


  $mensajeAtaqueJugador.appendChild($mostarAtaqueJugador);
  $mensajeAtaqueEnemigo.appendChild($mostarAtaqueEnemigo);
}

function crearMensajeJuego(resultadoJuegoFinal) {
  $seccionMensaje.innerHTML = resultadoJuegoFinal;
  $seccionReiniciar.style.display = "block";

  $btnFuego.disabled = true;
  $btnAgua.disabled = true;
  $btnTierra.disabled = true;
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
