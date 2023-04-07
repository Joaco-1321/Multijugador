const puntajes = [],
  celdas = [],
  limite = 9,
  players = [
    {
      id: 1,
      nombre: "",
      puntos: 0,
      posicionActual: [],
      celda: null,
    },
    {
      id: 2,
      nombre: "",
      puntos: 0,
      posicionActual: [],
      celda: null,
    },
  ],
  objetivo = {
    posicion: [],
    celda: null,
  };

let id,
  tiempo = 3;

function cuentaAtras() {
  if (tiempo === 0) {
    tiempo = 3;
    clearInterval(id);
    temporizador.style.display = "none";
    inicarPosiciones();
  }

  temporizador.textContent = tiempo--;
}

function reinicio(event) {
  if (typeof event !== "undefined") {
    for (const [i, jugador] of players.entries()) {
      puntajes[i].textContent = 0;
      jugador["puntos"] = 0;
      if (jugador["celda"] !== null)
        jugador["celda"].classList.remove("jugador" + jugador["id"]);
    }

    if (objetivo["celda"] !== null)
      objetivo["celda"].classList.remove("objetivo");
  }

  document.removeEventListener("keydown", mover);
  temporizador.style.display = "flex";
  id = setInterval(cuentaAtras, 1000);
}

function inicarPosiciones() {
  const posicionesOcupadas = [];

  let contador = 0,
    clase;

  document.addEventListener("keydown", mover);

  for (let jugador of players) {
    clase = "jugador" + jugador["id"];

    contador++;

    if (jugador["celda"] !== null) {
      jugador["celda"].classList.remove(clase);
      objetivo["celda"].classList.remove("objetivo");
    }

    jugador["posicionActual"] = posicionSinRepetir(posicionesOcupadas);
    jugador["celda"] =
      celdas[jugador["posicionActual"][0]][jugador["posicionActual"][1]];
    jugador["celda"].classList.add(clase);
  }

  objetivo["posicion"] = posicionSinRepetir(posicionesOcupadas);
  objetivo["celda"] = celdas[objetivo["posicion"][0]][objetivo["posicion"][1]];
  objetivo["celda"].classList.add("objetivo");
}

function mover(event) {
  let jugador, haciaLimite, eje, sobreLimite, colisiona, posicion;

  switch (event["keyCode"]) {
    case 65:
      jugador = 1;
      eje = 1;
      haciaLimite = false;
      break;

    case 68:
      jugador = 1;
      eje = 1;
      haciaLimite = true;
      break;

    case 83:
      jugador = 1;
      eje = 0;
      haciaLimite = true;
      break;

    case 87:
      jugador = 1;
      eje = 0;
      haciaLimite = false;
      break;

    case 37:
      jugador = 0;
      eje = 1;
      haciaLimite = false;
      break;

    case 38:
      jugador = 0;
      eje = 0;
      haciaLimite = false;
      break;

    case 39:
      jugador = 0;
      eje = 1;
      haciaLimite = true;
      break;

    case 40:
      jugador = 0;
      eje = 0;
      haciaLimite = true;
      break;
  }

  if (
    typeof jugador !== "undefined" &&
    typeof eje !== "undefined" &&
    typeof haciaLimite !== "undefined"
  ) {
    posicion = players[jugador]["posicionActual"];

    sobreLimite = haciaLimite
      ? ++posicion[eje] >= celdas.length
      : --posicion[eje] < 0;

    if (sobreLimite) posicion[eje] = haciaLimite ? 0 : celdas.length - 1;

    colisiona = igualArrays(
      players[0]["posicionActual"],
      players[1]["posicionActual"]
    );

    if (colisiona) {
      sobreLimite = haciaLimite
        ? --posicion[eje] < 0
        : ++posicion[eje] >= celdas.length;

      if (sobreLimite) posicion[eje] = haciaLimite ? celdas.length - 1 : 0;
    } else {
      players[jugador]["celda"] = actualizarCelda(players[jugador]);
    }
  }

  verificaGanador();
}

function verificaGanador() {
  let hayGanador = false,
    contador = 0;

  do {
    if (players[contador]["celda"].classList.contains("objetivo"))
      hayGanador = true;
    else contador++;
  } while (contador < players.length && !hayGanador);

  if (hayGanador) {
    puntajes[contador].textContent = ++players[contador]["puntos"];
    reinicio();
  }
}

function actualizarCelda(player) {
  let clase = "jugador" + player["id"];

  player["celda"].classList.toggle(clase);
  player["celda"] =
    celdas[player["posicionActual"][0]][player["posicionActual"][1]];
  player["celda"].classList.toggle(clase);

  return player["celda"];
}

function random(numero) {
  return Math.trunc(Math.random() * (numero + 1));
}

function posicionSinRepetir(lista) {
  let contador, esRepetido, pos;

  do {
    contador = 0;
    esRepetido = false;
    pos = [random(limite), random(limite)];

    while (!esRepetido && contador < lista.length) {
      esRepetido = igualArrays(lista[contador], pos);

      if (esRepetido) {
        console.log("una vuelta");
      } else {
        contador++;
      }
    }

    if (esRepetido) {
      console.log("repetido");
    }
  } while (esRepetido);

  lista.push(pos);

  return pos;
}

function igualArrays(arr1, arr2) {
  let iguales = true,
    posicion = 0;

  do {
    if (arr1[posicion] !== arr2[posicion]) iguales = false;
  } while (++posicion < arr1.length && iguales);

  return iguales;
}
