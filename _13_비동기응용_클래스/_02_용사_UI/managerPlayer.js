

export class ManagerPlayer {
    static instance = new ManagerPlayer();
    static getInstance(){
        return this.instance;
    }

    start(){
        this.money = 5000;
        this.power = 10;
        this.hpMax = 50;
        this.speed = 1.0;
    }

    
}