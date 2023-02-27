
function init() {
    console.log("init()")
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    setEnemySpot();
    createEnemy();
}

function keyDownHandler(e) {
    // 68 ==> d
    // 65 ==> a 
    if (e.keyCode == 68) {
        key["right"] = true;
    }
    else if (e.keyCode == 65) {
        key["left"] = true;
    }
    else if (e.keyCode == 87) {
        key["up"] = true;
    }
    else if (e.keyCode == 83) {
        key["down"] = true;
    }

    if (e.keyCode == 38) {
        if (shootkey["up"] == "ready") {
            shootkey["up"] = "shoot";
        }
    }


}
function keyUpHandler(e) {
    if (e.keyCode == 68) {
        key["right"] = false;
    }
    else if (e.keyCode == 65) {
        key["left"] = false;
    }
    else if (e.keyCode == 87) {
        key["up"] = false;
    }
    else if (e.keyCode == 83) {
        key["down"] = false;
    }
    if (e.keyCode == 38) {
        shootkey["up"] = "ready";
    }

}
// -------------- Enemy ----------------------
function setEnemySpot() {
    startx = 50
    starty = 100;

    var spot = { x: startx, y: starty }
    spotList[0] = spot
    var spot = { x: startx + 100, y: starty}
    spotList[1] = spot
    var spot = { x: startx + 200, y: starty }
    spotList[2] = spot
    var spot = { x: startx + 300, y: starty }
    spotList[3] = spot
}
function drawSpot() {
    for (var i = 0; i < spotList.length; i++) {
        ctx.beginPath();
        ctx.rect(spotList[i]["x"], spotList[i]["y"], 10, 10);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

function setEnmeyTimer(wait) {
    timer += 1;
    if (timer % wait == 0) {
        timer = 0;
        createEnemy();
    }
}
function createEnemy() {

    for (var i = 0; i < 4; i++) {
    
        startx = spotList[i]["x"] - 20 ;
        starty = spotList[i]["y"] ;
        startw = 50;
        starth = 50;

        var enemy = {
            x: startx, y: starty, w: startw, h: starth, 
            imagew : 80 , imageh : 80,
            color: "red", speed: 3, dead: 300, img: new Image()
        };
       

        enemy["img"].src = "image/enemy1.png";
        var len = enemyList.length;
        enemyList[len] = enemy;
    }

}
function moveEnmeyList() {
    for (var i = 0; i < enemyList.length; i++) {
        enemyList[i]["dead"] -= 1;
        if (enemyList[i]["dead"] <= 0) {
            enemyList.splice(i, 1);
            return
        }
        enemyList[i]["y"] += enemyList[i]["speed"];


    }
}
function drawEnmeyList() {
    for (var i = 0; i < enemyList.length; i++) {
        drawRect(enemyList[i]);
        ctx.drawImage(enemyList[i]["img"],
             enemyList[i]["x"] -  enemyList[i]["w"]/3,
             enemyList[i]["y"] -  enemyList[i]["h"]/3, 
             enemyList[i]["imagew"], 
             enemyList[i]["imageh"]);
            
    }
}
// ============== Enemy ======================
// -------------- player ----------------------
function movePlayer() {
    if (key["right"]) {
        player["x"] += player["speed"];
    }
    if (key["left"]) {
        player["x"] -= player["speed"];
    }
    if (key["up"]) {
        player["y"] -= player["speed"];
    }
    if (key["down"]) {
        player["y"] += player["speed"];
    }

}
function moveBoltList() {
    for (var i = 0; i < boltList.length; i++) {
        boltList[i]["dead"] -= 1;
        if (boltList[i]["dead"] <= 0) {

            boltList.splice(i, 1);
            return;
        }
        boltList[i]["y"] -= boltList[i]["speed"];
    }
}
function createBolt() {
    var bolt = {
        x: player["x"] +5, y: player["y"] - 50, w: 40, h: 40, speed: 5,
        imagew : 80 , imageh : 80 , img: new Image(), dead: 200
    }
    bolt["img"].src = "image/bolt_1.png";
    len = boltList.length;
    boltList[len] = bolt;
    console.log(boltList);
}
function shootPlayer() {
    if (shootkey["up"] == "shoot") {
        shootkey["up"] = "wait";
        createBolt();
    }
}

function drawPlayer() {
    drawRect(player);
    ctx.drawImage(player["img"], player["x"] - player["w"]/2, player["y"] - player["h"]/2, player["imagew"], player["imageh"]);
   
}
function drawBoltList() {
    for (var i = 0; i < boltList.length; i++) {
        drawRect(boltList[i]);
        ctx.drawImage(boltList[i]["img"], boltList[i]["x"]-boltList[i]["w"]/2, boltList[i]["y"]-20, boltList[i]["imagew"], boltList[i]["imageh"]);
    }
}
//=============== player ======================

//-------------------------------------- COLLISION -----------------------------------------

function inrect(x , y , rect){
    if(x > rect["x"] && x < (rect["x"] + rect["w"]) 
    && y > rect["y"] && y <rect["y"] + rect["h"]){
        //console.log(true);
        return true;
    }
    return false;
}
function collision(a , b){
    if(a["w"] > b["w"]){
        temp = a;
        a = b;
        b = temp;
    }
    result = inrect(a["x"] , a["y"] , b);
    if(result) return true;
    result = inrect((a["x"] + a["w"] ), a["y"] , b);
    if(result) return true;
    result = inrect(a["x"] , (a["y"] + a["h"]), b);
    if(result) return true;
    result = inrect((a["x"] + a["w"]) , (a["y"] + a["h"]) ,  b);
    if(result) return true;
    return false;
}

function collision_enemylist_player(){
    for(var i = 0; i < enemyList.length; i++){
        if(collision(player , enemyList[i])){
            player["color"] = "red";
            gameRun = false;
            return;
        }
        else{
            player["color"] = "blue";
            gameRun = true;
        }
    }   
}
function collision_enemylist_boltlist(){
    for(var i = 0; i < enemyList.length; i++){
        for(var j = 0; j < boltList.length; j++){
            if(collision(boltList[j] , enemyList[i])){
                enemyList.splice(i , 1);       
                boltList.splice(j , 1);
                return;
            }
        }    
    }   
}
//===================================== COLLISION =====================================

// -------------- bg --------------------------
function moveBg() {
    bg1["y"] += bg1["speed"];
    bg2["y"] += bg2["speed"];
    bg3["y"] += bg3["speed"];
    if (bg1["y"] >= 1000) {
        bg1["y"] = -500;
    }
    if (bg2["y"] >= 1000) {
        bg2["y"] = -500;
    }
    if (bg3["y"] >= 1000) {
        bg3["y"] = -500;
    }
}
function drawBg() {
    ctx.drawImage(bg1["img"], bg1["x"], bg1["y"], bg1["w"], bg1["h"]);
    ctx.drawImage(bg2["img"], bg2["x"], bg2["y"], bg2["w"], bg2["h"]);
    ctx.drawImage(bg3["img"], bg3["x"], bg3["y"], bg3["w"], bg3["h"]);
}
//================ bg ===============================
//--------------- draw ------------------------------
function update(){
    moveBg();
    movePlayer();
    moveBoltList();
    collision_enemylist_player();
    collision_enemylist_boltlist();
    shootPlayer();
    if(gameRun){
        moveEnmeyList();
        setEnmeyTimer(300);
    } 
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    update();
    drawBg();
    drawSpot();
    drawPlayer();  
    drawBoltList();  
    drawEnmeyList();
}
function drawRect(data) {
    ctx.beginPath();
    ctx.rect(data["x"] , data["y"], data["w"], data["h"] );
    ctx.fillStyle = data["color"];
    ctx.fill();
    ctx.closePath();
}
//================ draw ===============================
//---------------- var --------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//https://blog.outsider.ne.kr/322
var key = { right: false, left: false, up: false, down: false };
var shootkey = { up: "ready" }; // ready , shoot , wait 
var timer = 0;
var gameRun = true;

var startx = 150; var starty = 600; var startw = 50; var starth = 50;
var player = { 
    x: startx , y: starty , w: startw, h: starth , speed: 2, color: "red", img: new Image() ,  
    imagew : 100 , imageh : 100
}
player["img"].src = "image/player.png";

var bg1 = { x: 0, y: 500, w: 400, h: 500, img: new Image(), speed: 0.5 };
bg1["img"].src = "image/stage_01.png";
var bg2 = { x: 0, y: 0, w: 400, h: 500, img: new Image(), speed: 0.5 };
bg2["img"].src = "image/stage_01.png";
var bg3 = { x: 0, y: -500, w: 400, h: 500, img: new Image(), speed: 0.5 };
bg3["img"].src = "image/stage_01.png";
var enemyList = [];
var spotList = [];
var boltList = [];
var stageState = "ready"; // ready , stage1 , stage2 , end.. 
init();
setInterval(draw, 10);
//================ var ================================