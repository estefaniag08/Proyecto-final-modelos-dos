var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");
var bien = new Image();
var perdio = new Image();
var victoria = new Image();
var uno = new Image();
var dos = new Image();
var tres = new Image();
var cuatro = new Image();
var cinco = new Image();
var seis = new Image();
var siete = new Image();
var ocho = new Image();
var bum = new Image();
var bandera = new Image();
var banderaIcono = new Image();
var interrogacion = new Image();
var mina = new Image();
var jugando = true;
var aleatorioi;
var aleatorioj;
var vacio= new Image();
bien.src = "img/bien.png";
perdio.src = "img/perdio.png";
victoria.src = "img/victoria.png";
uno.src = "img/1.png";
dos.src = "img/2.png";
tres.src = "img/3.png";
cuatro.src = "img/4.png";
cinco.src = "img/5.png";
seis.src = "img/6.png";
siete.src = "img/7.png";
ocho.src = "img/8.png";
bum.src = "img/bum.png";
bandera.src = "img/bandera.png";
banderaIcono.src = "img/banderaIcono.png";
interrogacion.src = "img/interrogacion.png";
mina.src = "img/mina.png";
vacio.src="img/presionado.png"
//variable que se activa para poner banderas
var activaBandera = false;
//para quitar las banderas cuando se de doble clic
var avanza = true;
var puntaje = 0;
var matrizBanderas = new Array(32);
var tablero = new Array(34);
var contador_s = 0;
for (i = 0; i < 34; i++) {
    tablero[i] = new Array(18);
    for (var j = 0; j < 18; j++) {
        tablero[i][j] = new Tablero(0,0,0);
    }
}
for (i = 0; i < 32; i++){
	matrizBanderas[i] = new Array(16);
	for (var j = 0; j < 16; j++) {
      matrizBanderas[i][j] = false;
   }
}
generarTablero();
var contadorBanderas = 99;
//dibuja apenas carga la ventana, dibuja los botones
window.onload = function(){
	dibujar();
	click();
}
//dibuja el mapa inicial
function dibujar(){
	
	ctx.fillStyle ="red";
	ctx.font="10pt Verdana";
	ctx.fillText(contadorBanderas,710,55);
	ctx.strokeRect(700, 40, 50, 25);
	ctx.fillStyle = "#000000";
    ctx.fillRect(25, 40, 50, 25);
    ctx.fillStyle = "#fff";
    ctx.font="10pt Verdana";
    ctx.fillText("0",30,55);

	ctx.drawImage(banderaIcono, 155, 35);
	ctx.drawImage(bien, 395, 30);
	
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 16; j++){
			ctx.strokeRect((i * 25) + 20, (j * 25) + 90, 25, 25);			
		}
	}	
}

//dibuja bandera una por una
function dibujaBanderas(i, j){
	//revisa si hay una bandera anteriormente puesta y la dibuja o la quita
	if(matrizBanderas[i][j] == false){
		matrizBanderas[i][j] = true;
		ctx.drawImage(bandera, (i * 25) + 20, (j * 25) + 90);
		contadorBanderas--;
		ctx.fillStyle ="white";
		ctx.fillRect(700, 40, 50, 25);
		ctx.strokeRect(700, 40, 50, 25);

		//modifica contador
		ctx.fillStyle ="red";
		ctx.font="10pt Verdana";
		ctx.fillText(contadorBanderas,710,55);
		
	}else{
		matrizBanderas[i][j] = false;
		ctx.fillStyle ="#ffffff";
		ctx.fillRect((i * 25) + 20, (j * 25) + 90, 25, 25);	
		ctx.strokeRect((i * 25) + 20, (j * 25) + 90, 25, 25);
		contadorBanderas++;	
		ctx.fillRect(700, 40, 50, 25);
		ctx.strokeRect(700, 40, 50, 25);
		//modifica contador
		ctx.fillStyle ="red";
		ctx.font="10pt Verdana";
		ctx.fillText(contadorBanderas,710,55);
		
	}
	

}
//recarga la página
function reiniciar(){
	location.reload();
}
function actualizaIconoBandera(boleano){
	if(!boleano){
		activaBandera = true;
		ctx.fillStyle ="#9da7b7";
		ctx.fillRect(155, 35, 40, 40);
		ctx.drawImage(banderaIcono, 155,35);
	}else{
		activaBandera = false;
		ctx.fillStyle ="#ffffff";
		ctx.fillRect(155, 35, 40, 40);
		ctx.drawImage(banderaIcono, 155,35);
	}

}
function click(){
	
	canvas.addEventListener("click",
	function(e){
	    //clic para reiniciar
	    if (e.clientX - canvas.offsetLeft > 395 && e.clientX - canvas.offsetLeft < 445 && e.clientY - canvas.offsetTop > 30 && e.clientY - canvas.offsetTop < 80) {
	        reiniciar();
	    }
	    if(jugando){
            if(avanza){
                carga();
                avanza = false;
            }
	        //clic que cambia la variable activaBandera
	        if(e.clientX - canvas.offsetLeft > 155 && e.clientX - canvas.offsetLeft < 195 && e.clientY-canvas.offsetTop > 35 && e.clientY-canvas.offsetTop < 70){
	            actualizaIconoBandera(activaBandera);
            }
	        //clic para jugar
	        for (var i = 0; i < 32; i++) {
	            if(e.clientX - canvas.offsetLeft > (i * 25) + 20 && e.clientX - canvas.offsetLeft < (i * 25) + 45){
	                for (var j = 0; j < 16; j++) {
	                    if(e.clientY-canvas.offsetTop > (j * 25) + 90 && e.clientY-canvas.offsetTop < (j * 25) + 115 ){
	                        if(activaBandera){
	                            dibujaBanderas(i,j);
                                ganar();

	                        }else{
	                            //alert("clic izquierdo" + i + " " + j)
	                            mirarMinas(i + 1, j + 1);
	                            console.log(tablero.mina);
	                        }
	                    }	
	                }	
	            }
	        }
	    }
	}, false);
}
function Tablero(mina, visto, contador) {
    this.mina = mina;
    this.visto = visto;
    this.contador = contador;
    this.setMina = function (mina) { this.mina = mina; };
    this.setVisto = function (visto) { this.visto = visto; };
    this.setContador = function (contador) { this.contador = contador; };

}
function getRandom(max) {
    max = max - 1;
    return Math.round(Math.random()*max)+1;
}
function generarTablero() { //asigna las minas al tablero
    for (var i = 0; i < 99; i++) {
        while (true) {//bucle que dura hasta que encuentre una posicion en el tablero donde no se haya asignado una mina
            aleatorioi = getRandom(32);
            aleatorioj = getRandom(16);
            if (tablero[aleatorioi][aleatorioj].mina != 1) {
                tablero[aleatorioi][aleatorioj].setMina(1);
                break;
            }
        }
    }
    for (var i = 0; i < 34; i=i + 33) {//asigna los limites al tablero
        for (var j = 0; j < 18;j++) {
            tablero[i][j].setMina(-1);
        }
    }
    for (var i = 0; i < 34; i++) {//asigna los limites al tablero
        for (var j = 0; j < 18; j = j + 17) {
            tablero[i][j].setMina(-1);
        }
    }
}
function mirarMinas(n, m) {
    minaCont = 0;
    
    if (tablero[n][m].mina == 1) {
        detenerse();
        perder(m,n);
    } else if (tablero[n][m].mina == -1 || tablero[n][m].visto == 1 || tablero[n][m].visto == 2) {
        
    } else {
        tablero[n][m].setVisto(1);
        for (var i = n - 1; i <= n + 1; i++) { // for que comprueba las casillas aledañas a la seleccionada
            for (var j = m - 1; j <= m + 1; j++) {
                if (tablero[i][j].mina == 1) {//cuenta las minas que hay alrededor de la casilla seleccionada
                    minaCont++;
                    tablero[n][m].setContador(minaCont);
                }
             }
        }
        if (tablero[n][m].visto != 2 && tablero[n][m].visto != 0 && tablero[n][m].contador == 0) {//verifica que anteriormente no se haya recorrido esa casilla recursivamente y que no haya ningun numero en ella
            for (var i = n - 1; i <= n + 1; i++) {//recorre las casillas aledañas a la seleccionada
                for (var j = m - 1; j <= m + 1; j++) {
                    if (i == n && j == m) {//marca de forma especial la casilla seleccionada, para que no se vuelva a recorrer recursivamente
                        tablero[n][m].setVisto(2);
                    } else {//recursivamente se llama para verificar las casillas aledañas a las casillas aledañas
                        mirarMinas(i, j);
                    }
                }
            }
        }
        actualizarTablero(n - 1, m - 1, tablero[n][m].contador);
    }
}
function perder(x, y) {
    contadoruno = 0;
    contadordos = 0;
    foruno = 0;
    fordos = 0;
    for (var i = 1; i < 33; i++) {
        foruno++;
        for (var j = 1; j < 17; j++) {
            fordos++;
            if (tablero[i][j].mina != 1) {
                mirarMinas(i, j);
                contadoruno++;
            } else if (tablero[i][j].mina == -1) {

            }else {
                actualizarTablero(i - 1, j - 1, -1);//actualiza el tablero con las minas
                contadordos++;
            }
        }
    }
    actualizarTablero(x-1 , y-1 , -2);
}
function actualizarTablero(i, j, contador) {
    switch (contador) {
        case 0:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            break;
        case 1:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(uno, (i * 25) + 20, (j * 25) + 90);
            break;
        case 2:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(dos, (i * 25) + 20, (j * 25) + 90);
            break;
        case 3:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(tres, (i * 25) + 20, (j * 25) + 90);
            break;
        case 4:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(cuatro, (i * 25) + 20, (j * 25) + 90);
            break;
        case 5:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(cinco, (i * 25) + 20, (j * 25) + 90);
            break;
        case 6:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(seis, (i * 25) + 20, (j * 25) + 90);
            break;
        case 7:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(siete, (i * 25) + 20, (j * 25) + 90);
            break;
        case 8:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(ocho, (i * 25) + 20, (j * 25) + 90);
            break;
        case -1:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(mina, (i * 25) + 20, (j * 25) + 90);
            break;
        case -2:
            ctx.drawImage(vacio, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(bum, (i * 25) + 20, (j * 25) + 90);
            ctx.drawImage(perdio, 395, 30)
            //estadoCronometro = false;
            jugando = false;
            break;
    }
}
function ganar() {//verifica que el tablero de minas y el tablero de banderas sea igual
    contador = 0;
    for (var i = 1; i < 33; i++) {
        for (var j = 1; j < 17; j++) {
            if (tablero[i][j].mina == 1 && matrizBanderas[i - 1][j - 1]) {
                contador++;
            }
        }
    }
    if (contador == 99 && contadorBanderas == 0) {
        detenerse();
        puntaje = contador_s;
        ctx.fillStyle = "#f1fba6";
        ctx.fillRect(0, 0, 460, 170);
        ctx.fillStyle ="#8A0808";
        ctx.font="30pt Rockwell Condensed";
        ctx.fillText("¡GANADOR!",100,90);
        ctx.font="20pt Rockwell Condensed";
        ctx.fillText("Tiempo: " + puntaje,10,150);
    }
}
function detenerse(){
    clearInterval(cronometro);
}
function carga(){
    contador_s = 1;
    cronometro = setInterval(
    function(){
        ctx.fillStyle = "#000000";
        ctx.fillRect(25, 40, 50, 25);
        ctx.fillStyle = "#fff";
        ctx.font="10pt Verdana";
        ctx.fillText(contador_s,30,55);
        contador_s++;
    },1000);
}
