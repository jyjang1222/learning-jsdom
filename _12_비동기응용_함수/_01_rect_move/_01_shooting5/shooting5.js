function init(){
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  
  setEnemyList(4);
}

function setEnemyList(size) {
  for(var i=0; i<size; i++) {
    var e = {"x" :120 + 150*i, "y" : 300, "size" : 80, "speed" : 2, "color" : "green"};
    enemyList[i] = e;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEnemyList();
  drawPlayer();
  
  movePlayer();
  collCheck();
}

function drawPlayer(){
  ctx.beginPath();

  ctx.rect(player["x"], player["y"],  player["size"],  player["size"]);
  ctx.fillStyle = player["color"];
  ctx.fill();

  ctx.closePath();
}

function drawEnemy(enemy) {
    ctx.beginPath();
  
    ctx.rect(enemy["x"], enemy["y"],  enemy["size"],  enemy["size"]);
    ctx.fillStyle = enemy["color"];
    ctx.fill();

    ctx.closePath();
}

function drawEnemyList() {
  for(var i=0; i<enemyList.length; i++) {
    drawEnemy(enemyList[i]);
  }
}

function keyDownHandler(e) {
  // 아스키코드 값
  // 68 ==> d
  // 65 ==> a 
  // 87 ==> w
  // 83 ==> s
  if(e.keyCode == 68) {         // d
      key["right"] = true;
  }
  else  if(e.keyCode == 65) {   // a
      key["left"]  = true;
  }
  else if(e.keyCode == 87) {    // w
      key["up"] = true;
  }
  else  if(e.keyCode == 83) {   // s
      key["down"]  = true;
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
 
}

function movePlayer() {
  if(key["right"] ){
    player["x"] += player["speed"];
    if(player["x"] >= canvas.width - player["size"]) {
      player["x"] = canvas.width - player["size"];
    }
  }
  if(key["left"] ){
      player["x"] -= player["speed"];
      if(player["x"] < 0) {
        player["x"] = 0;
      }
  }
  if(key["up"] ){
      player["y"] -= player["speed"];
      if(player["y"] < 0) {
        player["y"] = 0;
      }
  }
  if(key["down"] ){
      player["y"] += player["speed"];
      if(player["y"] >= canvas.height - player["size"]) {
        player["y"] = canvas.height - player["size"];
      }
  }
}

function inRect(pX, pY, enemy) {
    if((enemy["x"] < pX && pX < enemy["x"] + enemy["size"]) 
        && enemy["y"] <  pY &&  pY < enemy["y"] + enemy["size"]) {
        return true;
    } else {
        return false;
    }
}

function collison(enemy) {
    // player의 왼쪽 상단 모서리가 닿으면
    if(inRect(player["x"], player["y"], enemy)) return true;
    
    // player의 오른쪽 상단 모서리가 닿으면
    else if(inRect(player["x"] + player["size"], player["y"], enemy)) return true;
    // player의 왼쪽 하단 모서리가 닿으면
    else if(inRect(player["x"], player["y"] + player["size"], enemy)) return true;
    // player의 오른쪽 하단 모서리가 닿으면
    else if(inRect(player["x"] + player["size"], player["y"] + player["size"], enemy)) return true;
    else return false;
}

function collCheck() {
  for(var i=0; i<enemyList.length; i++) {
    if(collison(enemyList[i])) {
      enemyList[i]["color"] = "red";
    } else {
      enemyList[i]["color"] = "green";
    }
  }
  
}

//-------------------------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
var key = { "right" : false , "left" : false, "up" : false , "down" : false};
var player = {"x" : 150 , "y" : 150 , "size" : 50 , "speed" : 2, "color" : "blue"};
// var enemy = {"x" : 300, "y" : 300, "size" : 80, "speed" : 2, "color" : "green"};
var enemyList = [];

init();
setInterval(draw, 10);