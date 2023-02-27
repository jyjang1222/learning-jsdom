
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

    if(e.keyCode == 38) {
        if( shootkey["up"] =="ready"){
            shootkey["up"] = "shoot";
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
    if(e.keyCode == 38) {
        shootkey["up"] = "ready";
    }
   
}
// -------------- player ----------------------
function movePlayer() {
    if(key["right"] ){
        player["x"] += player["speed"];
    }
    if(key["left"] ){
        player["x"] -= player["speed"];
    }
    if(key["up"] ){
        player["y"] -= player["speed"];
    }
    if(key["down"] ){
        player["y"] += player["speed"];
    }   
}
function moveBoltList(){
    for(var i = 0; i < boltList.length; i++){
        boltList[i]["dead"]-=1;
        if(boltList[i]["dead"] <= 0){
            
            boltList.splice(i , 1);
            return;
        }
        boltList[i]["y"] -=  boltList[i]["speed"];
    }
}
function createBolt(){
    var bolt = {x : player["x"] + 25 , y : player["y"] - 30 , w : 50 , h : 50 ,  speed : 5 ,
    img : new Image() , dead : 200}  
    bolt["img"].src = "image/bolt_1.png";
    len = boltList.length;
    boltList[len] = bolt;
    console.log(boltList);
}
function shootPlayer(){    
     if(shootkey["up"] == "shoot" ){
        shootkey["up"] = "wait";     
        createBolt();
     }    
}
function drawPlayer() {
     ctx.drawImage(player["img"] , player["x"] , player["y"] , player["w"] , player["h"] );   
}
function drawBoltList(){
    for(var i = 0; i < boltList.length; i++){
        ctx.drawImage(boltList[i]["img"] , boltList[i]["x"] , boltList[i]["y"] , boltList[i]["w"] , boltList[i]["h"] );   
    }
}
//=============== player ======================
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
    ctx.drawImage(bg1["img"] , bg1["x"] , bg1["y"] , bg1["w"] , bg1["h"] );   
    ctx.drawImage(bg2["img"] , bg2["x"] , bg2["y"] , bg2["w"] , bg2["h"] );   
    ctx.drawImage(bg3["img"] , bg3["x"] , bg3["y"] , bg3["w"] , bg3["h"] );   
}
//================ bg ===============================
//--------------- draw ------------------------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveBg();
    drawBg();
    drawPlayer();
    movePlayer();
    shootPlayer();
    drawBoltList();
    moveBoltList();
}

//================ draw ===============================
//---------------- var --------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//https://blog.outsider.ne.kr/322
var key = { right : false , left : false  , up : false , down : false };
var shootkey = {  up : "ready" }; // ready , shoot , wait 
var timer = 0;
var gameUpdate = true;
var player = {x : 150 , y : 600 , w : 100 , h : 100, speed : 2 , color : "blue" , img : new Image()}
player["img"].src = "image/player.png";
var bg1 = {x : 0, y : 500 , w : 400, h : 500 , img : new Image() , speed : 0.5};
bg1["img"].src = "image/stage_01.png";
var bg2 = {x : 0, y : 0 , w : 400, h : 500 , img : new Image() , speed : 0.5};
bg2["img"].src = "image/stage_01.png";
var bg3 = {x : 0, y : -500 , w : 400, h : 500 , img : new Image() , speed : 0.5};
bg3["img"].src = "image/stage_01.png";
var enemyList = [];
var spotList = [];
var boltList = [];
init();
setInterval(draw, 10);
//================ var ================================