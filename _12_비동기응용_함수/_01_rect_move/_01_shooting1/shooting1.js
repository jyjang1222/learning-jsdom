function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
}

function drawPlayer(){
    ctx.beginPath();

    ctx.rect(0, 0, 100, 100);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.closePath();
}

//-------------------------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
setInterval(draw, 10);