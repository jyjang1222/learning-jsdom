
function init(){
    console.log("init()")
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    //setSpot();
}

function keyDownHandler(e) {
    // 68 ==> d
    // 65 ==> a 
    if(e.keyCode == 68) {
        key["right"] = true;
    }
    else  if(e.keyCode == 65) {
        key["left"]  = true;
    }
    else if(e.keyCode == 87) {
        key["up"] = true;
    }
    else  if(e.keyCode == 83) {
        key["down"]  = true;
    } 

    if(e.keyCode == 37) {
        if( shootkey["left"] =="ready"){
            shootkey["left"] = "shoot";
        }
    }
    else if(e.keyCode == 38) {
        if( shootkey["up"] =="ready"){
            shootkey["up"] = "shoot";
        }
    }
    else if(e.keyCode == 39) {
        if( shootkey["right"] =="ready"){
            shootkey["right"] = "shoot";
        }
    }
    else if(e.keyCode == 40) {
        if( shootkey["down"] =="ready"){
            shootkey["down"] = "shoot";
        }
    }
    
}
function keyUpHandler(e) {
    if(e.keyCode == 68) {
        key["right"] = false;
    }
    else if(e.keyCode == 65) {
        key["left"]  = false;
    }
    else if(e.keyCode == 87) {
        key["up"] = false;  
    }
    else  if(e.keyCode == 83) {
        key["down"]  = false;
    }
    if(e.keyCode == 37) {
        shootkey["left"] = "ready";
    }
    else if(e.keyCode == 38) {
        shootkey["up"] = "ready";
    }
    else if(e.keyCode == 39) {
        shootkey["right"] = "ready";
    }
    else if(e.keyCode == 40) {
        shootkey["down"] = "ready";
    }
}
// -------------- bg --------------------------
function moveBg() {
   bg1["y"] += bg1["speed"];
   bg2["y"] += bg2["speed"];
   bg3["y"] += bg3["speed"];
   if(bg1["y"] >= 1000){
        bg1["y"] = -500;
   }
   if(bg2["y"] >= 1000){
    bg2["y"] = -500;
    }
    if(bg3["y"] >= 1000){
        bg3["y"] = -500;
    }
}
function drawBg() {
    ctx.drawImage(bg1["img"] , 
    bg1["x"] , bg1["y"] , bg1["w"] , bg1["h"] );   
    ctx.drawImage(bg2["img"] , 
    bg2["x"] , bg2["y"] , bg2["w"] , bg2["h"] );   
    ctx.drawImage(bg3["img"] , 
    bg3["x"] , bg3["y"] , bg3["w"] , bg3["h"] );   
}
//================ bg ================================
//--------------- draw -------------------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveBg();
    drawBg();
}


//================ draw ================================
//---------------- var --------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//https://blog.outsider.ne.kr/322
var key = { right : false , left : false  , up : false , down : false };
var shootkey = { right : "ready", left : "ready"  , up : "ready" , down : "ready" }; // ready , shoot , wait 
var timer = 0;
var gameUpdate = true;
var player = {x : 375 , y : 375 , size : 50 , speed : 4 , color : "blue"}
var enemyList = [];
var spotList = [];
var boltList = [];

var bg1 = {x : 0, y : 500 , w : 400, h : 500 , img : new Image() , speed : 0.5};
bg1["img"].src = "image/stage_01.png";
var bg2 = {x : 0, y : 0 , w : 400, h : 500 , img : new Image() , speed : 0.5};
bg2["img"].src = "image/stage_01.png";
var bg3 = {x : 0, y : -500 , w : 400, h : 500 , img : new Image() , speed : 0.5};
bg3["img"].src = "image/stage_01.png";
init();
setInterval(draw, 10);
//================ var ================================