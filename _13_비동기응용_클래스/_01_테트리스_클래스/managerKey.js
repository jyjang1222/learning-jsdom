

export class ManagerKey{
    static instance = new ManagerKey()
    static getInstance(){
        return this.instance;
    }

    start(){
        this.keyOnceList = {
        "KeyD" : "ready" , 
        "KeyA" : "ready" , 
        "KeyW" : "ready" , 
        "KeyS" : "ready" ,
        "Space" : "ready" ,
    };
        document.addEventListener("keydown", (e) => {
            if(this.keyOnceList[e.code] == "ready"){
                this.keyOnceList[e.code] = "push";
            }
        }, false);

        document.addEventListener("keyup", (e) => {
            if(this.keyOnceList[e.code] == "wait"){
                this.keyOnceList[e.code] = "ready";
            }
        }, false);
    }

    getKeyOnce(key){
        if(this.keyOnceList[key] == "push"){
            this.keyOnceList[key]  = "wait";
            return true;
        }else{
            return false;
        }
        
      
    }

};