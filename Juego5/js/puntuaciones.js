var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
window.onload = function(){
	dibujoInicial();
}
//dibuja el mapa inicial
function dibujoInicial(){
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, 600, 250);	
	ctx.fillStyle ="#8A0808";
	ctx.font="25pt Rockwell Condensed";
	ctx.fillText("",180,50);
	ctx.strokeStyle = "black";
	ctx.strokeText("",180,50);
}
