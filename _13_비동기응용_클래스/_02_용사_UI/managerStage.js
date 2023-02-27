import { Stage01 } from "./stage01.js";
import { Stage02 } from "./stage02.js";


export class ManagerStage {
    static instance = new ManagerStage();
    static getInstance(){
        return this.instance;
    }

    start(){
        this.stageList= {};
        this.setStage();
        this.stageLevel = 1;
        this.curStageName = "stage01";
    }

    getCurStage(){
        return this.stageList[this.curStageName];
    }

    setStage(){
        this.stageList["stage01"] = new Stage01();
        this.stageList["stage02"] = new Stage02() ; // 아직안만듬
       
    }
    
}