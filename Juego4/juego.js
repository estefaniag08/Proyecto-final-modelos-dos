var cont = 1;
var tamano = 0;
var palabras = [];

var imagenes = [];
var canvas= document.getElementById("lienzo");
var pincel = canvas.getContext("2d");

var canvitas= document.getElementById("casillas");
var pincelito = canvitas.getContext("2d");
	
var palabraEscogida;
var fondo = new Image();
var palabraEscogidaV;
var tiempo;
var puntos;
var puntuacion;
var nivel = 0;
var person;

var comprobaciones="abcdefghijklmnñopqrstuvwxyz";

function inicializar(){
	person = prompt("Por favor ingrese un nombre de usuario", " ");
	document.getElementById("nombreUsuario").value = person;
	cargarPalabras();
	puntos = 0;
	puntuacion = 0;
	tiempo = palabras.length*10;
	palabraEscogida = palabras[getRandomInt(0,palabras.length)];
	palabraEscogidaV = palabraEscogida;	
	palabraEscogida = palabraEscogida.toLowerCase();
	cont = 1;
	fondo.src = "fondo.jpg";
	cargarImagenes();
	ocultarBoton();
	mostrarTexto();
	limpiar();
	cargarCasillas();
	setInterval(puntaje,1000);
}

function jugarNuevamente(){
	cargarPalabras();
	puntos = 0;
	puntuacion = 0;
	tiempo = palabras.length*10;
	palabraEscogida = palabras[getRandomInt(0,palabras.length)];
	palabraEscogidaV = palabraEscogida;	
	palabraEscogida = palabraEscogida.toLowerCase();
	cont = 1;
	fondo.src = "fondoBordev2.png";
	cargarImagenes();
	ocultarBoton();
	mostrarTexto();
	limpiar();
	cargarCasillas();
}

function reiniciar(){
	mostrarTexto();
	
	var indice = palabras.indexOf(palabraEscogidaV);
	palabras.splice(indice, 1); 
	
	tiempo = palabras.length*10;
	puntos = 0;
	if (palabras.length > 0) {
		palabraEscogida = palabras[getRandomInt(0,palabras.length)];
		palabraEscogidaV = palabraEscogida;	
		palabraEscogida = palabraEscogida.toLowerCase();
		cont = 1;
		fondo.src = "fondoBordev2.png";
		ocultarBoton();
		limpiar();
		cargarImagenes();
		cargarCasillas();
	} else {
		palabraEscogidaV = "";
		ocultarTexto();
		ocultarBoton();
		ganadorAbsoluto();
		juegoNuevoBoton();	
	}
}

function ganadorAbsoluto(){
	pincelito.drawImage(fondo,0,0,canvitas.width,canvitas.height);
	pincelito.font = "30px Times New Roman";
	pincelito.fillStyle="#0000FF";	
	pincelito.fillText("¡Felicitaciones! Has completado todo el juego",10,tamano+70);
	pincelito.fillText("Tu puntaje fue: "+puntuacion,40,tamano+170);
}

function cargarPalabras(){
	palabras = [];
	palabras.push("Colombia");
	palabras.push("Argentina");
	palabras.push("Paraguay");
	palabras.push("Brasil");
	palabras.push("Venezuela");
	palabras.push("Ecuador");
	palabras.push("Panama");
	palabras.push("Chile");
	palabras.push("Honduras");
	palabras.push("Uruguay");
	palabras.push("Peru");
	palabras.push("Bolivia");
	palabras.push("Arabia");
	palabras.push("Australia");
	palabras.push("China");
	palabras.push("Japon");
	palabras.push("Francia");
	palabras.push("Portugal");
	palabras.push("Rusia");
	palabras.push("Eslovaquia");
}

function cargarCasillas(){	
	var widthFondo = canvitas.width;
	tamano = widthFondo - (20*(palabraEscogida.length+1));
	tamano = tamano/palabraEscogida.length;
	var heightFondo = canvitas.height;
	pincelito.drawImage(fondo,0,0,widthFondo,heightFondo);
	pincelito.fillStyle="#FFFFFF";
	for (var i = 0; i <= palabraEscogida.length; i++) {
		pincelito.fillRect(20+((tamano+20)*i),20,tamano,tamano);	
	}
}

function ganar(){
	puntuacion = puntuacion + (tiempo*puntos);
	pincelito.font = "15px Times New Roman";
	pincelito.fillStyle="#00FF00";	
	pincelito.fillText("¡Felicitaciones! Adivinaste la palabra. La palabra era "+palabraEscogidaV.toUpperCase() + ". Tu puntaje fue: "+puntuacion ,10,tamano+50);
	subirNivelBoton();
	ocultarTexto();
}

function perder(){
	pincel.drawImage(imagenes[9],0,0,400,400);	
	puntuacion = puntuacion + (tiempo*puntos);
	pincelito.font = "15px Times New Roman";
	pincelito.fillStyle="#FF0000";	
	pincelito.fillText("No lograste adivinar la palabra :(, la palabra era " + palabraEscogidaV.toUpperCase() + ". Tu puntaje fue: " + puntuacion ,10,tamano+50);
	juegoNuevoBoton();
	ocultarTexto();
}

function subirNivelBoton(){	
	var elemento = document.getElementById("subir");
	elemento.setAttribute("class","botonMostrar");
	elemento.addEventListener("click",reiniciar);
}
function juegoNuevoBoton(){
	var elemento = document.getElementById("reiniciar");
	elemento.setAttribute("class","botonMostrar");
	elemento.addEventListener("click",jugarNuevamente);
}

function ocultarTexto(){
	var elemento = document.getElementById("contenedor");
	elemento.setAttribute("class","botonOculto");	
	nivel++;
}


function mostrarTexto(){
	var elemento = document.getElementById("contenedor");
	elemento.setAttribute("class","botonMostrar");	
}

function dibujarLetra(letter){
	pincelito.font = (tamano-20)+"px Arial";
	pincelito.fillStyle="#000000";	
	if (palabraEscogidaV.indexOf(letter)==0) {
		pincelito.fillText(letter.toUpperCase(),30,10+tamano);
	}
	for (var i = 0; i < palabraEscogidaV.length; i++) {
		if (palabraEscogidaV.toLowerCase().indexOf(letter,i)!=-1) {
			pincelito.fillText(letter.toUpperCase(),30+((tamano+20)*palabraEscogidaV.toLowerCase().indexOf(letter,i)),10+tamano);
		}
	}
}

function limpiar(){
	var elemento = document.getElementById("contenedor");
	elemento.value = "";
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function cargarImagenes(){
	imagenes = [];
	for (var i = 1; i <= 10; i++) {		
		imagenes.push(new Image());
		imagenes[i-1].src = i+".png";
	}	
	pincel.drawImage(imagenes[0],0,0,400,400);
}

function dibujar(){
	if (cont<(imagenes.length-1)) {
		pincel.drawImage(imagenes[cont],0,0,400,400);
		cont++;
	}
	else {
		perder();
	}
}

function puntaje(){
	
	if(palabraEscogida.length>0){
		var canvotas= document.getElementById("time");
		var pincelote = canvotas.getContext("2d");
		pincelote.fillStyle="rgba(39,15,15,1.00)";	
		pincelote.fillRect(0,0,canvotas.width,canvotas.height);
		pincelote.font = "70px Times New Roman";
		pincelote.fillStyle="rgba(244,245,205,1.00)";	
		tiempo--;	
		var segundos = (tiempo%60).toString();
		if (segundos.length == 1) {
			segundos = "0" + segundos;
		}
		var minutos = (Math.trunc(tiempo/60)).toString();
		if (minutos.length==1) {
			minutos = "0" + minutos;
		}
		var restante = minutos + " : " + segundos;
		if(tiempo>0){	
			pincelote.fillText(restante,110,canvotas.height-30);
		} else if (tiempo==0) {
			perder();
			pincelote.fillText(restante,110,canvotas.height-30);
		}
	}
}
			
function comprobar(event){
	var caracter = event.key;
	limpiar();
	if (tieneLetras(caracter) && caracter.length == 1) {
		if (palabraEscogida.indexOf(caracter.toLowerCase())!= -1 || palabraEscogidaV.indexOf(caracter.toLowerCase())!= -1) {
			if(palabraEscogida.indexOf(caracter.toLowerCase())!= -1){
				while(palabraEscogida.indexOf(caracter.toLowerCase())!= -1){
					palabraEscogida = palabraEscogida.replace(caracter,"");	
					puntos++;
				}
				dibujarLetra(caracter);
			}
		} else {
			if (puntos>0) {
			puntos--;
			}
			alert("La letra '"+caracter.toUpperCase()+"' no está en la palabra escogida");
			dibujar();
		}
	}
	if (palabraEscogida.length == 0) {
		ganar();
	}
}

function tieneLetras(texto){
   texto = texto.toLowerCase();
   for(var i=0; i<texto.length; i++){
      if (comprobaciones.indexOf(texto.charAt(i),0)!=-1){
         return true;
      }
   }
   return false;
}

function ocultarBoton(){
	var elemento = document.getElementById("reiniciar");
	elemento.setAttribute("class","botonOculto");
	var elemento = document.getElementById("subir");
	elemento.setAttribute("class","botonOculto");
}

inicializar();