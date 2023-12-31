function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
  let resultado = "";
  if (jugada == 1) {
    resultado = "Piedra";
  } else if (jugada == 2) {
    resultado = "Papel";
  } else if (jugada == 3) {
    resultado = "Tijera";
  } else {
    resultado = "MAL ELEGIDO";
  }
  return resultado;
}

function combate(opPc, opJugador) {
  // COMBATE
  if (pc == jugador) {
    resultadoCombate = "EMPATE";
    alert(resultadoCombate);
  } else if (jugador == 1 && pc == 3) {
    resultadoCombate = "GANASTE";
    alert(resultadoCombate);
  } else if (jugador == 2 && pc == 1) {
    resultadoCombate = "GANASTE";
    alert(resultadoCombate);
  } else if (jugador == 3 && pc == 2) {
    resultadoCombate = "GANASTE";
    alert(resultadoCombate);
  } else {
    resultadoCombate = "PERDISTE";
    alert(resultadoCombate);
  }
}

let jugador = 0;
let triunfos = 0;
let perdidas = 0;
let pc = 0;
let resultadoCombate = "";

while (triunfos < 3 && perdidas < 3) {
  pc = aleatorio(1, 3);
  jugador = prompt("Elige: 1 para piedra, 2 para papel o 3 para tijera: ");
  alert("PC elige: " + eleccion(pc));
  alert("Tú eliges: " + eleccion(jugador));

  combate(pc, jugador);

  if (resultadoCombate == "GANASTE") {
    triunfos = triunfos + 1;
  } else if (resultadoCombate == "PERDISTE") {
    perdidas = perdidas + 1;
  }
}

alert(`Ganste: ${triunfos} veces. Perdiste: ${perdidas} veces.`);
