const d = document;

function iniciarJuego() {
  let $btnSeleccionar = d.getElementById("btn-seleccionar");
  $btnSeleccionar.addEventListener("click", seleccionarMokeponJugador);
}

function seleccionarMokeponJugador() {
  let $btnHipodoge = d.getElementById('hipodoge');
  let $btnCapipepo = d.getElementById('capipepo');
  let $btnRatigueya = d.getElementById('ratigueya');

  if($btnHipodoge.checked) {
    alert("Elegiste a Hipodoge");
  } else if ($btnCapipepo.checked) {
    alert("Elegiste a Capipepo");
  } else if ($btnRatigueya.checked) {
    alert("Elegiste a Ratigueya");
  } else {
    alert("Selecciona un Mokepon");
  }
}

window.addEventListener("load", iniciarJuego);
