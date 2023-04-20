const d = document;

/* Variables del DOM */
const $seccionAtaques = d.getElementById("ataques");
const $seccionReiniciar = d.getElementById("reiniciar-juego");
const $btnSeleccionar = d.getElementById("btn-seleccionar");

const $btnReiniciar = d.getElementById("btn-reiniciar");
const $insertarMokepones = d.getElementById("container-mokepones");
const $containerAtaques = d.getElementById("container-ataques");

const $seccionMokepones = d.getElementById("mokepones");
const $spanMokeponJugador = d.getElementById("mokepon-jugador");

const $spanMokeponEnemigo = d.getElementById("mokepon-enemigo");

const $spanVidasJugador = d.getElementById("vidas-jugador");
const $spanVidasEnemigo = d.getElementById("vidas-enemigo");

const $seccionMensaje = d.getElementById("resultado");
const $mensajeAtaqueJugador = d.getElementById("ataques-jugador");
const $mensajeAtaqueEnemigo = d.getElementById("ataques-enemigo");

const $seccionCanvas = d.getElementById("mapa-canvas")
const $canvas = d.getElementById("mapa");

/* Botones y variables mokepones */
let $btnHipodoge;
let $btnCapipepo;
let $btnRatigueya;
let $btnTucapalma;
let $btnPydos;
let $btnLangostelvis;
let $btnFuego;
let $btnAgua;
let $btnTierra;

/* Variables Jugador */
let mokeponJugador;
let ataqueJugador = [];
let victoriasJugador = 0;
let indexJugador;

/* Variables PC */
let ataqueMokeponEnemigo;
let ataqueEnemigo = [];
let victoriasEnemigo = 0;
let indexEnemigo;

/* Variables Generales */
let mokepones = [];
let opcionMokepones;
let opcionAtaques;
let botones = [];

/* Variables Canvas */
let lienzo = $canvas.getContext("2d");

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.x = 20;
    this.y = 30;
    this.w = 80;
    this.h = 80;
    this.mapaFoto = new Image();
    this.mapaFoto.src = foto;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.webp", 3);
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 3);
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.webp", 3);
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 3);
let pydos = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 3);
let langostelvis = new Mokepon("Langostelvis","./assets/mokepons_mokepon_langostelvis_attack.png",3);

hipodoge.ataques.push(
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-tierra", nombre: "Tierra 🌿" }
);

capipepo.ataques.push(
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-fuego", nombre: "Fuego 🔥" }
);

ratigueya.ataques.push(
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-tierra", nombre: "Tierra 🌿" }
);

tucapalma.ataques.push(
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-fuego", nombre: "Fuego 🔥" }
);

pydos.ataques.push(
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-agua", nombre: "Agua 💧" }
);

langostelvis.ataques.push(
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-tierra", nombre: "Tierra 🌿" }
);

mokepones.push(hipodoge, capipepo, ratigueya, tucapalma, pydos, langostelvis);

function iniciarJuego() {
  $seccionAtaques.style.display = "none";
  $seccionReiniciar.style.display = "none";
  $seccionCanvas.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionMokepones = `
    <input type="radio" name="mokepon" id=${mokepon.nombre} />
    <label class="card-mokepon" for=${mokepon.nombre}>
      <p>${mokepon.nombre}</p>
      <img
        src=${mokepon.foto}
        alt=${mokepon.nombre}
      />
    </label>
    `;
    $insertarMokepones.innerHTML += opcionMokepones;
  });

  $btnHipodoge = d.getElementById("Hipodoge");
  $btnCapipepo = d.getElementById("Capipepo");
  $btnRatigueya = d.getElementById("Ratigueya");
  $btnTucapalma = d.getElementById("Tucapalma");
  $btnPydos = d.getElementById("Pydos");
  $btnLangostelvis = d.getElementById("Langostelvis");

  $btnSeleccionar.addEventListener("click", seleccionarMokeponJugador);

  $btnReiniciar.addEventListener("click", reiniciar);
}

function seleccionarMokeponJugador() {
  // $seccionAtaques.style.display = "flex";
  $seccionMokepones.style.display = "none";
  $seccionCanvas.style.display = "flex";

  if ($btnHipodoge.checked) {
    $spanMokeponJugador.innerHTML = $btnHipodoge.id;
    mokeponJugador = $btnHipodoge.id;
  } else if ($btnCapipepo.checked) {
    $spanMokeponJugador.innerHTML = $btnCapipepo.id;
    mokeponJugador = $btnCapipepo.id;
  } else if ($btnRatigueya.checked) {
    $spanMokeponJugador.innerHTML = $btnRatigueya.id;
    mokeponJugador = $btnRatigueya.id;
  } else if ($btnTucapalma.checked) {
    $spanMokeponJugador.innerHTML = $btnTucapalma.id;
    mokeponJugador = $btnTucapalma.id;
  } else if ($btnPydos.checked) {
    $spanMokeponJugador.innerHTML = $btnPydos.id;
    mokeponJugador = $btnPydos.id;
  } else if ($btnLangostelvis.checked) {
    $spanMokeponJugador.innerHTML = $btnLangostelvis.id;
    mokeponJugador = $btnLangostelvis.id;
  } else {
    alert("Selecciona un Mokepon");
    $seccionAtaques.style.display = "none";
  }

  extraerAtaque(mokeponJugador);
  seleccionarMokeponEnemigo();
}

function extraerAtaque(mokeponJugador) {
  let ataques;

  mokepones.forEach((mokepon) => {
    if (mokeponJugador === mokepon.nombre) {
      ataques = mokepon.ataques;
    }
  });

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionAtaques = `
    <button id=${ataque.id} class="btn-ataques BAtaques">${ataque.nombre}</button>
    `;
    $containerAtaques.innerHTML += opcionAtaques;
  });

  $btnFuego = d.getElementById("btn-fuego");
  $btnAgua = d.getElementById("btn-agua");
  $btnTierra = d.getElementById("btn-tierra");
  botones = d.querySelectorAll(".BAtaques");
}

function secuenciaAtaques() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "Fuego 🔥") {
        ataqueJugador.push("FUEGO");
        boton.style.background = "#3c4048";
        boton.disabled = true;
      } else if (e.target.textContent === "Agua 💧") {
        ataqueJugador.push("AGUA");
        boton.style.background = "#3c4048";
        boton.disabled = true;
      } else if (e.target.textContent === "Tierra 🌿") {
        ataqueJugador.push("TIERRA");
        boton.style.background = "#3c4048";
        boton.disabled = true;
      }

      ataqueEnemigoAleatorio();
    });
  });
}

function seleccionarMokeponEnemigo() {
  let mokeponAleatorio = aleatorio(0, mokepones.length);

  $spanMokeponEnemigo.innerHTML = mokepones[mokeponAleatorio].nombre;
  ataqueMokeponEnemigo = mokepones[mokeponAleatorio].ataques;

  secuenciaAtaques();
}

function ataqueEnemigoAleatorio() {
  let numeroAtaqueEnemigo = aleatorio(0, ataqueMokeponEnemigo.length - 1);

  if (numeroAtaqueEnemigo == 0 || numeroAtaqueEnemigo == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (numeroAtaqueEnemigo == 3 || numeroAtaqueEnemigo == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }

  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAtaques(jugador, enemigo) {
  indexJugador = ataqueJugador[jugador];
  indexEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] == ataqueEnemigo[index]) {
      indexAtaques(index, index);
      crearMensaje("EMPATASTE");
    } else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") {
      indexAtaques(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      $spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") {
      indexAtaques(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      $spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA") {
      indexAtaques(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      $spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAtaques(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      $spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  contadorVidas();
}

function contadorVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeJuego("EMPATASTE!!!");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeJuego("FELICIDADES, GANASTE!!! 🤠.");
  } else {
    crearMensajeJuego("LO SIENTO, PERDISTE!!! 😞. SUERTE A LA PROXIMA.");
  }
}

function reiniciar() {
  location.reload();
}

function crearMensaje(resultadoJuego) {
  let $mostarAtaqueJugador = d.createElement("p");
  let $mostarAtaqueEnemigo = d.createElement("p");

  $seccionMensaje.innerHTML = resultadoJuego;
  $mostarAtaqueJugador.innerHTML = indexJugador;
  $mostarAtaqueEnemigo.innerHTML = indexEnemigo;

  $mensajeAtaqueJugador.appendChild($mostarAtaqueJugador);
  $mensajeAtaqueEnemigo.appendChild($mostarAtaqueEnemigo);
}

function crearMensajeJuego(resultadoJuegoFinal) {
  $seccionMensaje.innerHTML = resultadoJuegoFinal;
  $seccionReiniciar.style.display = "flex";
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mostrarMokepon() {
  lienzo.clearRect(0,0, $canvas.width, $canvas.height);
  lienzo.drawImage(
    capipepo.mapaFoto,
    capipepo.x,
    capipepo.y,
    capipepo.w,
    capipepo.h
    )
}

function moverCapipepoDerecha() {
  capipepo.x = capipepo.x + 5;
  mostrarMokepon()
}

function moverCapipepoAbajo() {
  capipepo.y = capipepo.y + 5;
  mostrarMokepon();
}

function moverCapipepoIzquierda() {
  capipepo.x = capipepo.x - 5;
  mostrarMokepon();
}

function moverCapipepoArriba() {
  capipepo.y = capipepo.y - 5;
  mostrarMokepon();
}

function detenerMovimiento() {

}

window.addEventListener("load", iniciarJuego);