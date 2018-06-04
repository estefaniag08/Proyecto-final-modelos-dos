
var tamanoXLienzo = 1200;							//TamanoLienzo X
var tamanoYLienzo = 800;							//TamanoLienzo Y
var posX, posY;										//Posicion donde estará el estudiante  
var elCanvas;
var contexto;
var buffer;
var contextoBuffer;	

var est = new estudiante();							//Objeto del tipo estudiante
var vidaEst;
var jugando;
var antImg = 1;
var i,j, puntaje;
var profesoresMalos;		//Arreglo con todos los profesores malos que hay
var profesoresBuenos;	//Arreglo con todos profesores buenos
var person; 			//Nombre de usuario

$(document).ready(inicializar);						//Se inicia la ejecucion con la funcion inicializar
$(document).keydown(botones);						//Se tiene un event listener de teclado

function inicializar(){
	person = prompt("Por favor ingrese un nombre de usuario", " ");
	document.getElementById("nombreUsuario").value = person;
	jugando = false;
	profesoresMalos = [new profesorMalo(0), new profesorMalo(1), new profesorMalo(0), new profesorMalo(1),new profesorMalo(0),new profesorMalo(1),new profesorMalo(0),new profesorMalo(1), new profesorMalo(0), new profesorMalo(1)];
	profesoresBuenos = [ new profesorBueno(0), new profesorBueno(0), new profesorBueno(0), new profesorBueno(0), new profesorBueno(1), new profesorBueno(1)];
	est.inicio();									//Inicializamos los valores del estudiante
	elCanvas = document.getElementById("lienzo");	//Canvas del documento html
	contexto = elCanvas.getContext("2d");			//Extrae  el contexto del canvas
	buffer = document.createElement("canvas");		//Se crea un nuevo elemento canvas en el documento
//	run();											//Inicia el algoritmo del juego
	$("#iniciarBoton").click(function(){
		if(jugando===false){
			jugando=true;
			run();
		}	
	});
	
}	
//Mueve el estudiante a traves del canvas
function botones(event){	
	est.validarImg(event.which);
	if(event.which===39 || event.which===68){	//Si la tecla presionada es la flecha derecha
		est.validarColisionPared("derecha");
		posX=posX+12;
	}
	if(event.which===37 || event.which===65){	//Si la tecla presionada es la flecha izquierda
		est.validarColisionPared("izquierda");
		posX=posX-12;	
	}
	if(event.which===38 || event.which===87){	//Si la tecla presionada es la flecha arriba
		est.validarColisionPared("arriba");
		posY=posY-12;
	}
	if(event.which===40 || event.which===83){	//Si la tecla presionada es la flecha abajo
		est.validarColisionPared("frente");
		posY=posY+12;
	}
}
//Clase del tipo estudiante
function estudiante(){
	//Los id de las imagenes del estudiante
	var arregloImgsId = ["img1F","img2F", "img3F", "img1A", "img2A", "img3A","img1I", "img2I", "img3I", "img1D", "img2D", "img3D"];	//Los id de las imagenes del estudiante
	var imagen;														//Saber cual fue la ultima imagen utilizada, para dar continuidad a la animacion
	var tamanoImagenXE = 86, tamanoImagenYE = 103; 								//Tamano de la imagen actual
	this.inicio = function(){
		posX=450;		//Inicializamos valores de posicion y vida
		posY=250;
		vidaEst=1000;
		puntaje=0;
	};
	//Dibuja el estudiante en la nueva posicion
	this.actualizar = function(ctx){
		ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
		this.imagen = document.getElementById(arregloImgsId[antImg]);
		ctx.drawImage(this.imagen,posX,posY); 										//Dibuja la imagen
		ctx.save();
		ctx.fillStyle = "#ffffff";
		ctx.font = "12px sans-serif";
		ctx.fillText("puntos: "+ puntaje, posX, (posY + 105));
		ctx.fillText("vida: "+ vidaEst, posX, posY);
	};
	//Valida cuando el estudiante se sale del canvas, si lo hace, reinicia la posicion, para hacer parecer que vuelve al inicio
	this.validarColisionPared = function(direccionE){	
		if(direccionE==="derecha"){
			if(posX-tamanoImagenXE>tamanoXLienzo){
				posX=-40;
			}
		}
		if(direccionE==="izquierda"){
			if(posX+tamanoImagenXE<0){
				posX=tamanoXLienzo;
			}
		}
		if(direccionE==="arriba"){
			if(posY+tamanoImagenYE<0){
				posY=tamanoYLienzo;
			}
		}
		if(direccionE==="frente"){
			if(posY-tamanoImagenYE>tamanoYLienzo){
				posY=-40;
			}
		}
	};
	//Valida la colision con otros elementos
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-posX), 2)+Math.pow( (y-posY),2));
		if(distancia>this.imagen.width){
			return false;
		} else if (distancia<=this.imagen.width){
			return true;	
		}   
	};
	//Valida cual imagen se pondrá para simular la animacion de movimiento del estudiante
	this.validarImg = function(tecla){		
		var imgFin;
		if(tecla===39 || tecla===68){		//Si la tecla presionada es la flecha derecha
			if (antImg===9){
				imgFin=10;
			}
			if(antImg===10){
				imgFin=11;
			}
			if(antImg===11){
				imgFin=9;
			}
			if (antImg < 9){
				imgFin=11;
			}
		}
		if(tecla===37 || tecla===65){		//Si la tecla presionada es la flecha izquierda
			if (antImg===6){
				imgFin=7;
			}
			if(antImg===7){
				imgFin=8;
			}
			if(antImg===8){
				imgFin=6;
			}
			if(antImg<6 || antImg>8){
				imgFin=7;
			}
		}
		if(tecla===38 || tecla===87){	//Si la tecla presionada es la flecha arriba
			if (antImg===3){
				imgFin=4;
			} 
			if(antImg===4){
				imgFin=5;
			}
			if(antImg===5){
				imgFin=3;
			}
			if(antImg<3 || antImg>5) {
				imgFin=5;
			}
		}
		if(tecla===40 || tecla===83){	//Si la tecla presionada es la flecha abajo
			if (antImg===0){
				imgFin=1;
			} 
			if(antImg===1){
				imgFin=2;
			}
			if(antImg===2){
				imgFin=0;
			}
			if (antImg >2){
				imgFin=1;
			}	
		}
		antImg=imgFin;
	};
}

function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}
//Clase del tipo profesor bueno

function profesorBueno(ori){
	//var arregloImgProfB = ["imgPB2-A", "imgPB2-F"];//Imagenes de profesor bueno, que se pued emover de ariiba a abajo o de der a izq
	var img, velocidad;
	var colisionPared=false;
	var xAliado, yAliado;
	var orientacion = ori;
	var direccion;
	if(orientacion===1){
		this.img = document.getElementById("imgPB2-F");
		this.direccion=1;
		this.yAliado=20;
		
	} else if(orientacion===0) {
		this.img = document.getElementById("imgPB2-A");
		this.direccion=-1;
		this.yAliado=tamanoXLienzo;
	}	

	
	this.xAliado = aleatorio(10,tamanoXLienzo-50);
	this.velocidad = 0;
	while(this.velocidad === 0){
		this.velocidad=aleatorio(8,15);
	}
		
	this.dibujarAliado = function(ctx){
		var img3 = this.img;
		ctx.drawImage(img3,this.xAliado,this.yAliado);
	};		
	
	this.moverAliado = function(){
		this.yAliado = this.yAliado + (this.direccion*0.2*(this.velocidad/10));
		this.yAliado = (tamanoYLienzo + this.yAliado)%tamanoYLienzo;
		this.reiniciar();
	};
	
	this.reiniciar = function(){
		if(this.yAliado<2 || this.yAliado>=tamanoYLienzo ){
			orientacion = Math.floor(aleatorio(0,1));
			colisionPared=true;
		}
		if(orientacion===1 && colisionPared===true){
			this.img = document.getElementById("imgPB2-F");
			this.direccion = 1;
			this.velocidad=aleatorio(8,15);
			this.xAliado=aleatorio(10,tamanoXLienzo-50);
			this.yAliado = 2;
			colisionPared=false;

		} 
		if(orientacion===-1  && colisionPared===true) {
			this.img = document.getElementById("imgPB2-A");	
			this.direccion = -1;
			this.velocidad = aleatorio(8,15);
			this.xAliado = aleatorio(10,tamanoXLienzo-50);
			this.yAliado = tamanoYLienzo-2;
			colisionPared=false;
		}	
	};
}

//Clase del tipo profesor malo
function profesorMalo(ori){
	var img, velocidad;
	var colisionPared=false;
	var xEnemigo, yEnemigo;
	var orientacion = ori;
	var direccion;
	if(orientacion===1){
		this.img = document.getElementById("imgPC1-D");
		this.direccion=1;
		this.xEnemigo=20;
		
	} else if(orientacion===0) {
		this.img = document.getElementById("imgPC1-I");
		this.direccion=-1;
		this.xEnemigo=tamanoXLienzo;
	}	

	
	this.yEnemigo = aleatorio(10,tamanoYLienzo-50);
	this.velocidad = 0;
	while(this.velocidad === 0){
		this.velocidad=aleatorio(3,7);
	}
		
	this.dibujarEnemigo = function(ctx){
		var img3 = this.img;
		ctx.drawImage(img3,this.xEnemigo,this.yEnemigo);
	};		
	
	this.moverEnemigo = function(){
		this.xEnemigo = this.xEnemigo + (this.direccion*0.2*(this.velocidad/10));
		this.xEnemigo = (tamanoXLienzo + this.xEnemigo)%tamanoXLienzo;
		this.reiniciar();
	};
	
	this.reiniciar = function(){
		if(this.xEnemigo<=2 || this.xEnemigo>=tamanoXLienzo ){	
			colisionPared=true;
		}
		if(orientacion===1 && colisionPared===true){
			this.img = document.getElementById("imgPC1-D");
			this.direccion = 1;
			this.velocidad=aleatorio(1,7);
			this.xEnemigo=2;
			this.yEnemigo = aleatorio(10,tamanoYLienzo-50);
			colisionPared=false;

		} 
		if(orientacion===-1  && colisionPared===true) {
			this.img = document.getElementById("imgPC1-I");	
			this.direccion = -1;
			this.velocidad=aleatorio(3,7);
			this.xEnemigo=tamanoXLienzo-2;
			this.yEnemigo = aleatorio(10,tamanoYLienzo-50);
			colisionPared=false;
		}	
	};
}
	
function run(){
	buffer.width = elCanvas.width;				//El buffer se pone del tamaño del canvas del documento html
	buffer.height = elCanvas.height;
	contextoBuffer = buffer.getContext("2d");	//El contexto del buffer es 2d
	if(jugando){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);	//Hace un rectangulo dentro de un rectangulo de tamaño dado el cual limpia dibujos anteriormente hechos
		
		est.actualizar(contextoBuffer);	//Se dibuja el estudiante en el este contexto
		for(i=0; i<profesoresMalos.length; i++){		//Mueve los profesores malos
			profesoresMalos[i].dibujarEnemigo(contextoBuffer);
			profesoresMalos[i].moverEnemigo();
			if(est.colision(profesoresMalos[i].xEnemigo,profesoresMalos[i].yEnemigo)){
				vidaEst= vidaEst-1;
				puntaje = puntaje-0.5;
			}
		}
		for (i=0; i<profesoresBuenos.length; i++){
			profesoresBuenos[i].dibujarAliado(contextoBuffer);
			profesoresBuenos[i].moverAliado();
			if(est.colision(profesoresBuenos[i].xAliado, profesoresBuenos[i].yAliado)){
				vidaEst = vidaEst+1;
				puntaje = puntaje+2;
				
			}
		}
		if(vidaEst<=0 || puntaje<-10){
			jugando=false;
		}									
		contexto.clearRect(0,0,elCanvas.width,elCanvas.height);	//Se limpia el rectangulo del contexto del canvas del html
		contexto.drawImage(buffer, 0, 0);			//Se dibuja lo que está en el buffer

		setInterval(run,10);
	} else {
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		contextoBuffer.font = "120px sans-serif";
		contextoBuffer.fillText("GAME OVER", 150, 340);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "75px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,elCanvas.width,elCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
}		


