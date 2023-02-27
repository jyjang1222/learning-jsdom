import { ManagerKey } from "./managerKey.js";
import { NodeBlock } from "./nodeBlock.js";

export class ManagerBlock{
    static instance = new ManagerBlock()
    static getInstance(){
        return this.instance;
    }
    start($tetris){
        this.$tetris = $tetris;
        this.blockList = [];    
        this.dataList = [];
        this.curBlock = null;
        this.cury = 1;  
        this.curx = 4; 
        this.colorList = ["w", "r", "o", "y", "g", "b", "n", "v", "" , "" ,  "dg" , "black"]; 
        this.WHITE = 0;
        this.BOX = 10;
        this.BLACK = 11;
        this.TIMER = 0;

        var sampleBlockList = this.getSample();
        for(var i = 0; i < sampleBlockList.length; i++){
            var sample = sampleBlockList[i];
            var block = new NodeBlock(sample.name , sample.index , sample.color , sample.shape);
            this.blockList.push(block);
        }

        console.log(this.blockList);

        for (var y = 0; y < 22; y++) {
            var tr = document.createElement("tr");
            this.$tetris.append(tr);
            var temp = []
            for (var x = 0; x < 12; x++) {
              var td = document.createElement("td");
              tr.append(td);
              temp.push(this.WHITE);
            }
            this.dataList.push(temp);
        }
        
          // 테두리는 외곽선을 표시하기위해서  10 숫자로 채워넣는다.    
          for(var i = 0; i < 12; i++){ // 가로두줄
            this.dataList[0][i] = this.BOX;
            this.dataList[21][i] = this.BOX;
            this.$tetris.children[0].children[i].className = this.colorList[this.BOX];
            this.$tetris.children[21].children[i].className = this.colorList[this.BOX];
          }
        
          for(var i = 0; i < 22; i++){ // 세로두줄
            this.dataList[i][0] = this.BOX;
            this.dataList[i][11] = this.BOX;
            this.$tetris.children[i].children[0].className = this.colorList[this.BOX];
            this.$tetris.children[i].children[11].className = this.colorList[this.BOX];
        }

        this.makeBlock();
       
    }
    update(){
        this.TIMER += 1;
        if(this.TIMER >= 100){
            this.TIMER = 0;
            if( this.down() == false){
                this.lineClear();
                this.makeBlock();
            }   
        }
        if(ManagerKey.getInstance().getKeyOnce("KeyS")){
            if( this.down() == false){
                this.lineClear();
                this.makeBlock();
            }     
        }
        if(ManagerKey.getInstance().getKeyOnce("KeyA")){
            this.left();
        }
        if(ManagerKey.getInstance().getKeyOnce("KeyD")){
            this.right();
        }
        if(ManagerKey.getInstance().getKeyOnce("KeyW")){
            this.rotate();
        }
        if(ManagerKey.getInstance().getKeyOnce("Space")){
            while(this.down()){}
            this.lineClear();
            this.makeBlock();
        }
    }

    lineClear(){  
        var del = [];
        for(var y = 1; y  < 22 - 1 ; y ++){
                var count = 0;
                for(var x = 1; x < 12 - 1; x ++){
                if(this.dataList[y][x] == this.BLACK){
                    count += 1;
                }
                if(count === 10){
                    del.push(y);       
                }
            }
        }
        console.log(del);
        for(var i = 0; i < del.length; i++){
             this.dataList.splice(del[i] , 1);
             this.dataList.splice(0 , 1);
             this.dataList.unshift([this.BOX,0,0,0,0,0,0,0,0,0,0,this.BOX]);
             this.dataList.unshift([10,10,10,10,10,10,10,10,10,10,10,10]);
        }
    }

    draw() {

        for (var y = 0; y < 22; y++) {
            for (var x = 0; x < 12; x++) {
                var index = this.dataList[y][x];
                this.$tetris.children[y].children[x].className = this.colorList[index];
            }
        }
    }

     tempBlock(curShape){
      var temp = [];
      for(var y in curShape){
        temp.push([])
        for (var x in curShape){
            temp[y].push(0);
        } 
      }
  
      var lastIndex = curShape.length - 1;
      for(var y in curShape){
        for (var x in curShape){
            temp[x][lastIndex] = curShape[y][x];
        }
        lastIndex -= 1; 
      }
      console.log(curShape);
      console.log(temp);
      return temp;
  
  }

    rotate(){
        var curShape = this.curBlock.shape;
        var nextShape = this.tempBlock(curShape);

        var curRealBlock = this.getRealBlock(curShape);
        var nextRealBlock = this.getRealBlock(nextShape);
        var canMove = this.getCanMove(nextRealBlock , 0 , 0);
        if (canMove == true){
            // (현재위치 WHILE ) 
            this.setData(curRealBlock , 0, 0, this.WHITE);
            // (오른쪽 색칠) 
            this.setData(nextRealBlock , 0, 0, this.curBlock.color);
            this.curBlock.shape = nextShape;
        }
    }
    left() {
        // 왼쪽 검사 
        var shape = this.curBlock.shape;
        var realBlock = this.getRealBlock(shape);
        var canMove = this.getCanMove(realBlock , 0, -1);
        if (canMove == true){
            // (현재위치 WHILE ) 
            this.setData(realBlock , 0, 0, this.WHITE);
      
            // (왼쪽 색칠) 
            this.setData(realBlock , 0, -1, this.curBlock.color);
            this.curx -= 1; // 현재x감소 
        }
    }

     right() {
        //오른쪽 검사 
        var shape = this.curBlock.shape;
        var realBlock = this.getRealBlock(shape);
        var canMove = this.getCanMove(realBlock , 0 , 1);
        if (canMove == true){
            // (현재위치 WHILE ) 
            this.setData(realBlock , 0, 0, this.WHITE);
    
            // (오른쪽 색칠) 
            this.setData(realBlock , 0, 1, this.curBlock.color);
            this.curx += 1; // 현재x증가 
        }
    }
    down() {
        var shape = this.curBlock.shape;
        var realBlock = this.getRealBlock(shape); // 현재블록의 실제 위치를 찾는다. 
        var canMove = this.getCanMove(realBlock, 1 , 0); // 한칸아래를 검사한다.
      
        if(canMove == false){ // 움직일수없으면 현재위치 BLACK 
      
            //(현재위치 BLACK)
            this.setData(realBlock , 0, 0, this.BLACK);
      
        }else if (canMove == true){ // 움직일수있으면 현재위치는 WHILE 다음위치는 COLOR
            // (현재위치 WHILE ) 
            this.setData(realBlock , 0, 0, this.WHITE);
      
            // (한칸아래 색칠) 
            this.setData(realBlock , 1, 0, this.curBlock.color);
            this.cury += 1; // 현재y증가 
        }
        return canMove // 결과 반환
    }

    setData(realBlock , ny , nx , color){
        for(var i = 0; i < realBlock.length; i++){
            var y = realBlock[i][0];
            var x = realBlock[i][1];
            this.dataList[y + ny][x + nx] = color;
        }
    }

    getRealBlock(shape){
   
        var realBlock = []; //현재 블럭에서 진짜블록의 위치만 저장  
        for(var i = 0; i < shape.length; i++){
            for(var j = 0; j < shape.length; j++){
              if(shape[i][j] == 1){
                realBlock.push([ i + this.cury , j + this.curx]); // 핸재 위치 를 더해줘야 한다. 
              }
            }
        }
    
        return realBlock;
    }

     getCanMove(realBlock, ny , nx){

        for(var i = 0; i < realBlock.length; i++){
            var y = realBlock[i][0];
            var x = realBlock[i][1];
            if(this.dataList[y + ny][x + nx] >= this.BOX){
                return false;
            }
        }
        
        return true;
    }
    gameOver(shape){
      var realBlock = this.getRealBlock(shape)
      if(this.getCanMove(realBlock , 0 , 0) == false){  
          alert("game over");
          window.location.reload() ;
      }
    
    }
    makeBlock() {

        var r = Math.floor(Math.random() * this.blockList.length);
        this.curBlock = this.blockList[r];
    
        var shape = this.curBlock.shape;
    
        this.cury = 1;  
        this.curx = 4; 
    
        this.gameOver(shape);

        for (var y = 0; y < shape.length; y++) {
            for (var x = 0; x < shape.length; x++) {
                if (shape[y][x] == 1) {
                    this.dataList[y + this.cury][x + this.curx] = this.curBlock.color;
                }
            }
        }
    }
    getSample(){
      var blocks = [
        {
          name: "s",  // 블럭모양
          color: 1,   // 색상번호
          shape: 
            [
              [0, 0, 0],
              [0, 1, 1],
              [1, 1, 0],
            ]
           
        },
        {
          name: "z",
          color: 2,
          shape: 
            [
              [0, 0, 0],
              [1, 1, 0],
              [0, 1, 1],
            ]
        },
        {
          name: "t",
          color: 3,
          shape: 
            [
              [0, 0, 0],
              [1, 1, 1],
              [0, 1, 0],
            ]
        },
        {
          name: "l",
          color: 4,
          shape: 
            [
              [0, 1, 0],
              [0, 1, 0],
              [0, 1, 1],
            ]
        },
        {
          name: "lr",
          color: 5,
          shape: 
            [
              [0, 1, 0],
              [0, 1, 0],
              [1, 1, 0],
            ]
        },
        {
          name: "o",
          color: 6,
          shape: [   
              [0, 0, 0],
              [0, 1, 1],
              [0, 1, 1],
          ]
        },
        {
          name: "b",
          color: 7,
          shape: 
            [
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ]
        },
      ]

        return blocks;
    }
};