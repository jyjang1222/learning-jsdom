import  {ManagerGame}  from "./managerGame.js";

function draw(){
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);    
    //-----------------------------------------------
    ManagerGame.getInstance().update();
    ManagerGame.getInstance().draw();
    //-----------------------------------------------
}
function loading(){

    //추후 로딩 구현
    
    setInterval(draw, 10);
}

//-----------[캔버스]----------------------------
var $canvas = document.getElementById("myCanvas");
var ctx = $canvas.getContext("2d"); 
//-----------[시작]----------------------------
ManagerGame.getInstance().start(ctx);

$canvas.style.border = "1px solid black";

// setTimeout( loading , 10);
loading();




