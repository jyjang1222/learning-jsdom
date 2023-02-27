import { UnitCloudList } from "./unitCloudList.js";
export class Stage01{
    start(){  
        this.cloudList = new UnitCloudList();
  
    }
   
    update(){
        this.cloudList.update();

    }

    draw(){
        this.cloudList.draw();

    }
   
}