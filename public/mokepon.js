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
let mokeponJugadorObjeto;
let ataqueJugador = [];
let victoriasJugador = 0;
let indexJugador;
let jugadorId = null;

/* Variables PC */
let mokeponesEnemigos = [];
let ataqueMokeponEnemigo;
let ataqueEnemigo = [];
let victoriasEnemigo = 0;
let indexEnemigo;
let enemigoId = null;

/* Variables Generales */
let mokepones = [];
let opcionMokepones;
let opcionAtaques;
let botones = [];
let alturaPantalla;
let anchoPanatalla = window.innerWidth - 20;
const anchoMaximoPantalla = 550;

if (anchoPanatalla > anchoMaximoPantalla) {
  anchoPanatalla = anchoMaximoPantalla - 20;
}

alturaPantalla = (anchoPanatalla * 600 ) / 800;
$canvas.width = anchoPanatalla
$canvas.height = alturaPantalla

/* Variables Canvas */
let lienzo = $canvas.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';

class Mokepon {
  constructor(nombre, foto, vida,fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.w = 50;
    this.h = 50;
    this.x = aleatorio(0, $canvas.width - this.w);
    this.y = aleatorio(0, $canvas.height - this.h);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepones() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.w,
      this.h
      )
  }
}

// Mokepones Jugador
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.webp", 3, "./assets/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 3, "./assets/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.webp", 3, "./assets/ratigueya.png");
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 3, "./assets/tucapalma.png");
let pydos = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 3, "./assets/pydos.png");
let langostelvis = new Mokepon("Langostelvis","./assets/mokepons_mokepon_langostelvis_attack.png",3, "./assets/langostelvis.png");

const HIPODOGE_ATAQUES = [
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-tierra", nombre: "Tierra 🌿" }
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-fuego", nombre: "Fuego 🔥" }
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-tierra", nombre: "Tierra 🌿" }
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

const TUCAPALMA_ATAQUES = [
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-fuego", nombre: "Fuego 🔥" }
]

tucapalma.ataques.push(...TUCAPALMA_ATAQUES);

const PYDOS_ATAQUES = [
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-tierra", nombre: "Tierra 🌿" },
  { id: "btn-agua", nombre: "Agua 💧" }
]

pydos.ataques.push(...PYDOS_ATAQUES);

const LANGOSTELVIS_ATAQUES = [
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-fuego", nombre: "Fuego 🔥" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-agua", nombre: "Agua 💧" },
  { id: "btn-tierra", nombre: "Tierra 🌿" }
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES);

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

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://192.168.1.35:8080/unirse",
  {
    method: 'GET'
  }).then(function(res) {
    /* console.log(res); */

    if(res.ok) {
      res.text()
      .then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      })
    }
  })
}

function seleccionarMokeponJugador() {
  // $seccionAtaques.style.display = "flex";  
  $seccionMokepones.style.display = "none";

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
    $seccionMokepones.style.display = "flex";
    $seccionAtaques.style.display = "none";
  }

  seleccionarMokeponPeticion(mokeponJugador);

  extraerAtaque(mokeponJugador);
  $seccionCanvas.style.display = "flex";
  inciarMapa();
  
}

function seleccionarMokeponPeticion(mokeponJugador) {
  fetch(`http://192.168.1.35:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mokeponJugador
    })
  })
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

      if(ataqueJugador.length === 5) {
        enviarAtaques();
      }

    });
  });
}

function enviarAtaques() {
  fetch(`http://192.168.1.35:8080/mokepon/${jugadorId}/ataques`,{
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })
  })

  intervalo = setInterval(obtenerAtaques, 50)

}

function obtenerAtaques() {
  fetch(`http://192.168.1.35:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ ataques }) {
            if (ataques.length === 5) {
              ataqueEnemigo = ataques;
              combate();
            }
          })
      }
    })
}

function seleccionarMokeponEnemigo(enemigo) {
  $spanMokeponEnemigo.innerHTML = enemigo.nombre;
  ataqueMokeponEnemigo = enemigo.ataques;

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
  clearInterval(intervalo);

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

function pintarCanvas() {
  mokeponJugadorObjeto.x = mokeponJugadorObjeto.x + mokeponJugadorObjeto.velocidadX;
  mokeponJugadorObjeto.y = mokeponJugadorObjeto.y + mokeponJugadorObjeto.velocidadY;
  lienzo.clearRect(0,0, $canvas.width, $canvas.height);
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    $canvas.width,
    $canvas.height
  )

  mokeponJugadorObjeto.pintarMokepones();

  enviarPosicion( mokeponJugadorObjeto.x, mokeponJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    if (mokepon != undefined) {
      mokepon.pintarMokepones();
      revisarColision(mokepon);
    }

  })
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.1.35:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  .then(function(res) {
    if (res.ok) {
      res.json()
      .then(function ({ enemigos }) {
        console.log(enemigos);
        
        // Mokepones enemigos
        mokeponesEnemigos = enemigos.map(function(enemigoServer) {
          let mokeponEnemigo = null;

          if (enemigoServer.mokepon != undefined) {

            const mokeponNombre = enemigoServer.mokepon.nombre || "";
            if (mokeponNombre === "Hipodoge") {
                mokeponEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.webp", 3, "./assets/hipodoge.png", enemigoServer.id);
              } else if (mokeponNombre === "Capipepo") {
                mokeponEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 3, "./assets/capipepo.png", enemigoServer.id);
              } else if (mokeponNombre === "Ratigueya") {
                mokeponEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.webp", 3, "./assets/ratigueya.png", enemigoServer.id);
              } else if(mokeponNombre === "Tucapalma") {
                mokeponEnemigo = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 3, "./assets/tucapalma.png", enemigoServer.id);
              } else if (mokeponNombre === "Pydos") {
                mokeponEnemigo = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 3, "./assets/pydos.png", enemigoServer.id);
              } else if (mokeponNombre === "Langostelvis") {
                mokeponEnemigo = new Mokepon("Langostelvis","./assets/mokepons_mokepon_langostelvis_attack.png",3, "./assets/langostelvis.png", enemigoServer.id);
              }
              
              mokeponEnemigo.x = enemigoServer.x;
              mokeponEnemigo.y = enemigoServer.y;
          }
            return mokeponEnemigo
          })
        })
    }
  })
}

function moverDerecha() {
  mokeponJugadorObjeto.velocidadX = 5;
}

function moverAbajo() {
  mokeponJugadorObjeto.velocidadY = 5;
}

function moverIzquierda() {
  mokeponJugadorObjeto.velocidadX = -5;
}

function moverArriba() {
  mokeponJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mokeponJugadorObjeto.velocidadY = 0;
  mokeponJugadorObjeto.velocidadX = 0;
}

function movimientoTeclado(event) {
  switch(event.key) {
    case 'ArrowUp':
      moverArriba();
      break
    case 'ArrowRight':
      moverDerecha();
      break
    case 'ArrowDown':
      moverAbajo();
      break
    case 'ArrowLeft':
      moverIzquierda();
      break
  }
}

function inciarMapa() {
  
  mokeponJugadorObjeto = extrarObjetoMokepon(mokeponJugador);

  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener('keydown', movimientoTeclado);
  window.addEventListener('keyup', detenerMovimiento);
}

function extrarObjetoMokepon() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mokeponJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.h
  const derechaEnemigo = enemigo.x + enemigo.w
  const izquieraEnemigo = enemigo.x

  const arribaMokepon = mokeponJugadorObjeto.y
  const abajoMokepon = mokeponJugadorObjeto.y + mokeponJugadorObjeto.h
  const derechaMokepon = mokeponJugadorObjeto.x + mokeponJugadorObjeto.w
  const izquierdaMokepon = mokeponJugadorObjeto.x

  if (abajoMokepon < arribaEnemigo || 
      arribaMokepon > abajoEnemigo ||
      derechaMokepon < izquieraEnemigo ||
      izquierdaMokepon > derechaEnemigo
     ) {
    return 
  }

  detenerMovimiento();
  clearInterval(intervalo);
  enemigoId = enemigo.id;
  $seccionAtaques.style.display = "flex";
  $seccionCanvas.style.display = "none";
  seleccionarMokeponEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);