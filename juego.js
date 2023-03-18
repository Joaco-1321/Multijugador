const puntajes = [],
	celdas = [],
	limite = 9,
	players = [
		{
			nombre: '',
			puntos: 0,
			posicionActual: [],
			celda: null
		},
		{
			nombre: '',
			puntos: 0,
			posicionActual: [],
			celda: null
		}
	];

document.addEventListener('keydown', mover);

function inicarPosiciones() {

	const posicionesOcupadas = [];

	let contador = 1,
		objetivo;

	for (let jugador of players) {

		jugador['nombre'] = 'jugador' + contador;

		if (!puntajes[contador - 1].classList.contains(jugador['nombre']))
			puntajes[contador - 1].classList.add(jugador['nombre']);

		contador++;

		if (jugador['celda'] !== null)
			jugador['celda'].classList.remove(jugador['nombre']);

		jugador['posicionActual'] = (posicionSinRepetir(posicionesOcupadas));
		jugador['celda'] = celdas[jugador['posicionActual'][0]][jugador['posicionActual'][1]];
		jugador['celda'].classList.add(jugador['nombre']);

	}

	objetivo = posicionSinRepetir(posicionesOcupadas);
	celdas[objetivo[0]][objetivo[1]].classList.add('objetivo');

}

function mover(event) {

	let jugador,
		haciaLimite,
		eje,
		sobreLimite,
		colisiona;

	switch (event['keyCode']) {
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

	if (typeof jugador !== 'undefined' &&
		typeof eje !== 'undefined' &&
		typeof haciaLimite !== 'undefined') {

		sobreLimite = haciaLimite ?
			++players[jugador]['posicionActual'][eje] >= celdas.length :
			--players[jugador]['posicionActual'][eje] < 0;

		if (sobreLimite)
			players[jugador]['posicionActual'][eje] = haciaLimite ? 0 : celdas.length - 1;

		colisiona = igualArrays(players[0]['posicionActual'], players[1]['posicionActual']);

		if (colisiona) {

			sobreLimite = haciaLimite ?
				++players[jugador]['posicionActual'][eje] >= celdas.length :
				--players[jugador]['posicionActual'][eje] < 0;

			if (sobreLimite)
				players[jugador]['posicionActual'][eje] = haciaLimite ? 0 : celdas.length - 1;

		}

		players[jugador]['celda'] = actualizarCelda(players[jugador]);

	}

	verificaGanador();

}

function verificaGanador() {

	let hayGanador = false,
		contador = 0;

	do {

		if (players[contador]['celda'].classList.contains('objetivo'))
			hayGanador = true;
		else
			contador++;

	} while (contador < players.length && !hayGanador);

	if (hayGanador) {

		puntajes[contador].textContent = ++players[contador]['puntos'];
		players[contador]['celda'].classList.remove('objetivo');

		inicarPosiciones();

	}

}

function actualizarCelda(player) {

	player['celda'].classList.toggle(player['nombre']);
	player['celda'] = celdas[player['posicionActual'][0]][player['posicionActual'][1]];
	player['celda'].classList.toggle(player['nombre']);

	return player['celda'];

}

function random(numero) {
	return Math.trunc(Math.random() * (numero + 1));
}

function posicionSinRepetir(lista) {

	let contador,
		esRepetido,
		pos;

	do {

		contador = 0;
		esRepetido = false;
		pos = [random(limite), random(limite)];

		while (!esRepetido && contador < lista.length) {

			esRepetido = igualArrays(lista[contador], pos);

			if (esRepetido) {
				console.log('una vuelta');
			} else {
				contador++;
			}

		}

		if (esRepetido) {
			console.log('repetido');
		}

	} while (esRepetido);

	lista.push(pos);

	return pos;

}

function igualArrays(arr1, arr2) {

	let iguales = true,
		posicion = 0;

	do {

		if (arr1[posicion] !== arr2[posicion])
			iguales = false;

	} while (++posicion < arr1.length && iguales);

	return iguales;

}