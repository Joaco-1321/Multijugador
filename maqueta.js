const temporizador = document.createElement('div');

document.addEventListener('DOMContentLoaded', maquetaPagina);

function maquetaPagina() {

	const body = document.getElementsByTagName('body')[0],
		header = document.createElement('header'),
		main = document.createElement('main');

	let section,
		clase;

	header.innerHTML = '<h2>Juego de Sergio</h2>';
	body.appendChild(header);

	for (let i = 0; i < 2; i++) {

		clase = i === 0 ? 'puntuacion' : 'juego';
		section = document.createElement('section');
		section.classList.add(clase, 'contenedor');
		main.appendChild(section);

	}

	body.appendChild(main);

	temporizador.id = 'temporizador';
	temporizador.textContent = tiempo--;

	body.appendChild(temporizador);
	
	pintarPuntuacion();
	pintarJuego();

	id = setInterval(cuentaAtras, 1000);

}

function pintarPuntuacion() {

	const puntuacion = document.getElementsByClassName('puntuacion')[0],
		boton = document.createElement('button');

	puntuacion.classList.add('contenedor');
	puntuacion.style.flexDirection = 'column';
	puntuacion.style.justifyContent = 'space-around';

	for (let i = 0; i < 2; i++) {

		puntajes.push(document.createElement('div'));
		puntajes[i].style.backgroundColor = i === 0 ? 'orange' : 'blue';
		puntajes[i].classList.add('contenedor');
		puntajes[i].classList.add('puntaje');
		puntajes[i].textContent = 0;
		puntuacion.appendChild(puntajes[i]);
		
	}

	boton.id = 'boton';
	boton.textContent = 'reiniciar';
	boton.addEventListener('click', reinicio);
	puntuacion.appendChild(boton);

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
	
}