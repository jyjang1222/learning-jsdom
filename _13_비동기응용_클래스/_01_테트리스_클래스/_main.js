import { ManagerGame } from "./managerGame.js";

function draw(){
    ManagerGame.getInstance().update();
    ManagerGame.getInstance().draw();
}


var $tetris = document.querySelector("#tetris");
ManagerGame.getInstance().start($tetris);
setInterval(draw, 10);