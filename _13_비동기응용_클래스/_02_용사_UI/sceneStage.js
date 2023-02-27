import { ManagerStage } from "./managerStage.js";

export class SceneStage{

    start(){  
        
        this.curStage = ManagerStage.getInstance().getCurStage();
        this.curStage.start();
    }
   
    update(){
        this.curStage.update();
    }

    draw(){
        this.curStage.draw();
    }
 
}