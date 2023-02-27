import {ManagerGame, ManagerImage} from "./managerImage.js";
import { ManagerScene } from "./managerScene.js";


export class ManagerGame {
    // 싱글톤
    static instance = new ManagerGame();
    static getInstance() { return ManagerGame.instance; }

    start(ctx) {
        this.ctx = ctx;         // 언제 필요한 것인지 모르겠음....???

        ManagerImage.getInstance().start();
        ManagerScene.getInstance().start();

        ManagerScene.getInstance().changeScene("title");
    }

    draw() {
        ManagerScene.getInstance().draw();
    }

}