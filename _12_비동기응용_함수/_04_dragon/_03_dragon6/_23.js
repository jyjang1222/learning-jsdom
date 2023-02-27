
function init() {
    console.log("init()")
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    setEnemySpot();
   // createEnemy();
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
    if(gameState == "title"){
        gameState = "game";
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
            imagew : 80 , imageh : 80, life : 5, 
            color: "red", speed: 3, dead: 300, img: new Image()
        };
       

        enemy["img"].src = "image/enemy1.png";
        var len = enemyList.length;
        enemyList[len] = enemy;
    }

}

function enemyDeadTime(enemy){
    enemy["dead"] -= 1;
    if(enemy["dead"] <= 0){
        return true;
    }
    return false;
}
function enemyDeadLife(enemy){
    if(enemy["life"] <= 0){
        return true;
    }
    return false;
}
function moveEnmeyList() {
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyDeadTime(enemyList[i])) {          
           
            enemyList.splice(i, 1);
            return
        }
        if (enemyDeadLife(enemyList[i])) {

            var ran = Math.floor(Math.random() * 4); // 확률 4 ==> 25%
            if(ran ==  0){
                createItem(enemyList[i]["x"] , enemyList[i]["y"]);
            }
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

// -------------- Item ----------------------
function createItem(posx , posy){
    var item1 = { x: posx, y: posy, w: 50, h: 50, img: new Image(), speed: 0.5 , 
        imagew : 50 , imageh : 50};
    item1["img"].src = "image/item1.png";
    len = itemList.length;
    itemList[len] = item1;
    console.log(item1);
}
function moveItem(){
    for(var i = 0; i < itemList.length; i++){
        itemList[i]["y"] += itemList[i]["speed"];
    }
}
function drawItem(){  
    for(var i = 0; i < itemList.length; i++){
        drawRect(itemList[i]);
        ctx.drawImage(itemList[i]["img"],
        itemList[i]["x"],
        itemList[i]["y"], 
        itemList[i]["imagew"], 
        itemList[i]["imageh"]);
    }
}
// ============== Item ========================

// -------------- player ----------------------
function checkLine(){
    if (player["y"] < gameline["y"]){
        player["y"] = gameline["y"];
        return true;
    }
    if (player["x"] < gameline["x"]){
        player["x"] = gameline["x"];
        return true;
    }
    if (player["x"] > gameline["w"] ){
        player["x"] = gameline["w"] ;
        return true;
    }
    if (player["y"] > gameline["h"] ){
        player["y"] = gameline["h"] ;
        return true;
    }
}
function deadPlayer(){
    if(player["life"] <= 0){
        gameState = "gameover";
        return
    }
}
function movePlayer() {
    deadPlayer();

    if (key["right"]) {      
        if(player["x"]  +  player["speed"] < gameline["w"]){
            player["x"] += player["speed"];
        }
    }
    if (key["left"]) {
        if(player["x"] - player["speed"] > gameline["x"]){
            player["x"] -= player["speed"];
        }
       
    }
    if (key["up"]) {
        if(player["y"] - player["speed"] > gameline["y"]){
            player["y"] -= player["speed"];
        }
     
    }
    if (key["down"]) {
        if(player["y"] + player["speed"] < gameline["h"]){
            player["y"] += player["speed"];
        }
    }
}


function moveBoltList() {
    for (var i = 0; i < boltList.length; i++) {

        if( boltList[i]["y"] < gameline["y"]){
            boltList.splice(i, 1);
            return;
        }
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
        x: player["x"] + 5, y: player["y"] - 50, w: 40, h: 40, speed: 5,
        imagew : 80 , imageh : 80 , img: new Image(), dead: 200 , power : 1
    }
    len = boltList.length;
    boltList[len] = bolt;
    boltLevelSet();
}
function shootPlayer() {
    if (shootkey["up"] == "shoot") {
        shootkey["up"] = "wait";
        createBolt();
    }
}
function boltLevelSet(){
    if(player["level"] == 1){
        for(var i = 0; i < boltList.length; i++){
            boltList[i]["img"].src = "image/bolt_1.png";
        }    
    }
    else if(player["level"] == 2){
        for(var i = 0; i < boltList.length; i++){
            boltList[i]["img"].src = "image/bolt_2.png";
            boltList[i]["power"] =2;
        }    
    }
    else if(player["level"] == 3){
        for(var i = 0; i < boltList.length; i++){
            boltList[i]["img"].src = "image/bolt_3.png";
            boltList[i]["power"] =3;
        }    
    }
}
function levelSetPlayer(plus){
    player["level"] += plus;
    if(player["level"] >= 3){
        player["level"] = 3;
    }
    if(player["level"] <= 1){
        player["level"] = 1;
    }
    boltLevelSet();
   

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

function drawLife() {
    for(var i = 0; i < player["life"]; i++){
        ctx.drawImage(player["lifeImg"],  i * 50 , 300 , 60 , 50 );
    }
}



//=============== player ======================

//--------------- COLLISION -------------------

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
            enemyList[i]["life"] = 0;
            player["life"] -= 1;
            levelSetPlayer(-1);
            console.log("player level : "  + player["level"]);
            return;
        }
        
    }   
}

function collision_itemList_player(){
    for(var i = 0; i < itemList.length; i++){
        if(collision(player , itemList[i])){

            itemList.splice(i , 1);
            levelSetPlayer(1);
            console.log("player level : "  + player["level"]);
            return;
        }
        
    }   
}

function collision_enemylist_boltlist(){
    for(var i = 0; i < enemyList.length; i++){
        for(var j = 0; j < boltList.length; j++){
            if(collision(boltList[j] , enemyList[i])){
                enemyList[i]["y"] -= 10;
                enemyList[i]["life"] -= boltList[j]["power"];              
                boltList.splice(j , 1);
                return;
            }
        }    
    }   
}
//================ COLLISION ==================

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
    collision_enemylist_player();
    collision_enemylist_boltlist();
    collision_itemList_player();
    movePlayer();
    shootPlayer();
    moveBoltList();
    moveItem();

    if(gameRun){
        moveEnmeyList();
        setEnmeyTimer(300);
    } 
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    if(gameState == "title"){
        drawTitle();
    }
    else if(gameState == "game"){
        update();

        drawBg();
        drawSpot();
        drawItem();
        drawPlayer();  
        drawBoltList();    
        drawEnmeyList();  
        drawLife();
        
    }else if(gameState == "gameover"){

        drawBg();
        drawSpot();
        drawPlayer();  
        drawBoltList();  
        drawEnmeyList();
        drawLife();
        drawGameover();
    }  
}
function drawGameover(){
    ctx.drawImage(gameover["img"], gameover["x"], gameover["y"], gameover["w"], gameover["h"]);
}
function drawTitle(){
    ctx.drawImage(title["img"], title["x"], title["y"], title["w"], title["h"]);
   // ctx.drawImage(item1["img"], item1["x"], item1["y"], item1["w"], item1["h"]);
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
var gameState = "title"; // title , game , gameover 
var gameline = {x : 0 , y : 300 , w : 350 , h : 750}; // 경계선
//===================================================================================
var startx = 150; var starty = 600; var startw = 50; var starth = 50;
var player = { 
    x: startx , y: starty , w: startw, h: starth , speed: 2, color: "red",  level : 1,
    img: new Image(), imagew : 100 , imageh : 100 , life : 3  , lifeImg : new Image()
}
player["img"].src = "image/player.png";
player["lifeImg"].src = "image/hart.png";
//===================================================================================
var bg1 = { x: 0, y: 500, w: 400, h: 500, img: new Image(), speed: 0.5 };
bg1["img"].src = "image/stage_01.png";
var bg2 = { x: 0, y: 0, w: 400, h: 500, img: new Image(), speed: 0.5 };
bg2["img"].src = "image/stage_01.png";
var bg3 = { x: 0, y: -500, w: 400, h: 500, img: new Image(), speed: 0.5 };
bg3["img"].src = "image/stage_01.png";
var title = { x: 0, y: 250, w: 400, h: 600, img: new Image() };
title["img"].src = "image/title.png";
var gameover = { x: 125, y: 450, w: 150, h: 80, img: new Image()};
gameover["img"].src = "image/gameover.jpg";
//=================================================================================
var enemyList = [];
var spotList = [];
var boltList = [];
var itemList = [];
//=================================================================================
init();
setInterval(draw, 10);
//================ var ============================================================