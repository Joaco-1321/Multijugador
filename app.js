const puntajeJugador1 = document.createElement('div'),
	puntajeJugador2 = document.createElement('div'),
	celdas = [],
	limite = 9,
	jugadores = {
		jugador1: [],
		jugador2: []
	},
	jug = [
		{
			nombre: '',
			puntos: 0,
			posicion: []
		}
	],
	puntos = {
		jugador1: 0,
		jugador2: 0
	};

const players = [
	{
		nombre: '',
		puntos: 0,
		posicion: []
	},
	{
		nombre: '',
		puntos: 0,
		posicion: []
	}
];

let jugador1, jugador2;

document.addEventListener('DOMContentLoaded', maquetaPagina);

document.addEventListener('keydown', mover);

function maquetaPagina() {

	const body = document.getElementsByTagName('body')[0],
		header = document.createElement('header'),
		main = document.createElement('main');

	let section,
		clase;

	// header.classList.add('contenedor');
	header.innerHTML = '<h2>Juego de Sergio</h2>';
	body.appendChild(header);

	for (let i = 0; i < 2; i++) {

		clase = i === 0 ? 'puntuacion' : 'juego';
		section = document.createElement('section');
		section.classList.add(clase, 'contenedor');
		main.appendChild(section);

	}

	body.appendChild(main);
	pintarPuntuacion();
	pintarJuego();

}

function pintarPuntuacion() {

	const puntuacion = document.getElementsByClassName('puntuacion')[0];

	puntuacion.classList.add('contenedor');
	puntuacion.style.flexDirection = 'column';
	puntuacion.style.justifyContent = 'space-around';

	puntajeJugador1.classList.add('jugador1');
	puntajeJugador1.classList.add('contenedor');
	puntajeJugador1.classList.add('puntaje');
	puntajeJugador1.textContent = 0;

	puntajeJugador2.classList.add('jugador2');
	puntajeJugador2.classList.add('contenedor');
	puntajeJugador2.classList.add('puntaje');
	puntajeJugador2.textContent = 0;

	puntuacion.appendChild(puntajeJugador1);
	puntuacion.appendChild(puntajeJugador2);

}

function pintarJuego() {

	const juego = document.getElementsByClassName('juego')[0],
		tablero = document.createElement('div');

	let celda;

	tablero.classList.add('tablero');

	for (let i = 0; i < 10; i++) {

		celdas.push([]);

		for (let j = 0; j < 10; j++) {

			celda = document.createElement('div');
			celda.classList.add('celda');
			celdas[i].push(celda);
			tablero.appendChild(celda);

		}

	}

	juego.appendChild(tablero);
	inicarPosiciones();

}

function inicarPosiciones() {

	const posicionesOcupadas = [];

	let objetivo;

	for (let i = 0; i < 2; i++) {

		if (i === 0) {

			jugadores['jugador1'] = (posicionSinRepetir(posicionesOcupadas));
			jugador1 = celdas[jugadores['jugador1'][0]][jugadores['jugador1'][1]];
			jugador1.classList.add('jugador1');

		} else {

			jugadores['jugador2'] = (posicionSinRepetir(posicionesOcupadas));
			jugador2 = celdas[jugadores['jugador2'][0]][jugadores['jugador2'][1]];
			jugador2.classList.add('jugador2');


		}


	}

	objetivo = posicionSinRepetir(posicionesOcupadas);
	celdas[objetivo[0]][objetivo[1]].classList.add('objetivo');

}

function mover(event) {

	switch (event['key']) {
		case 'w':
			if (--jugadores['jugador2'][0] < 0) {
				jugadores['jugador2'][0] = limite;
			}
			jugador2 = cambiarDePosicion(jugador2, 'jugador2');
			break;

		case 'ArrowUp':
			if (--jugadores['jugador1'][0] < 0) {
				jugadores['jugador1'][0] = limite;
			}
			jugador1 = cambiarDePosicion(jugador1, 'jugador1');
			break;

		case 's':
			if (++jugadores['jugador2'][0] >= celdas.length) {
				jugadores['jugador2'][0] = 0;
			}
			jugador2 = cambiarDePosicion(jugador2, 'jugador2');
			break;
		case 'ArrowDown':
			if (++jugadores['jugador1'][0] >= celdas.length) {
				jugadores['jugador1'][0] = 0;
			}
			jugador1 = cambiarDePosicion(jugador1, 'jugador1');
			break;

		case 'a':
			if (--jugadores['jugador2'][1] < 0) {
				jugadores['jugador2'][1] = limite;
			}
			jugador2 = cambiarDePosicion(jugador2, 'jugador2');
			break;
		case 'ArrowLeft':
			if (--jugadores['jugador1'][1] < 0) {
				jugadores['jugador1'][1] = limite;
			}
			jugador1 = cambiarDePosicion(jugador1, 'jugador1');
			break;
		case 'd':
			if (++jugadores['jugador2'][1] >= celdas.length) {
				jugadores['jugador2'][1] = 0;
			}
			jugador2 = cambiarDePosicion(jugador2, 'jugador2');
			break;
		case 'ArrowRight':
			if (++jugadores['jugador1'][1] >= celdas.length) {
				jugadores['jugador1'][1] = 0;
			}
			jugador1 = cambiarDePosicion(jugador1, 'jugador1');
			break;
	}

	verificaGanador();

}

function verificaGanador() {

	const ganoJugador1 = jugador1.classList.contains('objetivo'),
		ganoJugador2 = jugador2.classList.contains('objetivo');

	if (ganoJugador1 || ganoJugador2) {

		if (ganoJugador1) {
			puntajeJugador1.textContent = ++puntos['jugador1'];
			jugador1.classList.remove('objetivo');
		} else {
			puntajeJugador2.textContent = ++puntos['jugador2'];
			jugador2.classList.remove('objetivo');
		}

		jugador1.classList.remove('jugador1');
		jugador2.classList.remove('jugador2');

		inicarPosiciones();

	}

}

function cambiarDePosicion(player, nombre) {

	player.classList.toggle(nombre);
	player = celdas[jugadores[nombre][0]][jugadores[nombre][1]];
	player.classList.toggle(nombre);

	return player;

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

			if (lista[contador][0] === pos[0] && lista[contador][1] === pos[1]) {
				esRepetido = true;
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