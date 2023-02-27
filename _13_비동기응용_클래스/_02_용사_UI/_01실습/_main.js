import {ManagerGame} from "./managerGame.js";

// 캔버스 그리기
let $canvas = document.getElementById("myCanvas");
$canvas.style.border = "1px solid black";

// 이미지를 그리기 위한 2d 모드의 객체생성
let ctx = $canvas.getContext("2d");

ManagerGame.getInstance().start(ctx);
ManagerGame.getInstance().draw();
