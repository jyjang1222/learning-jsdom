import { ManagerBlock } from "./managerBlock.js";
import { ManagerKey } from "./managerKey.js";

export class ManagerGame{
    static instance = new ManagerGame()
    static getInstance(){
        return this.instance;
    }

    start($tetris){
        ManagerKey.getInstance().start();
        ManagerBlock.getInstance().start($tetris);
    }

    update(){
        ManagerBlock.getInstance().update();
    }

    draw(){
        ManagerBlock.getInstance().draw();
    }

};