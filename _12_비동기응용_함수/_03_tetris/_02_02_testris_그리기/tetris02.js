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
var curBlock;  // 현재블록의 위치를 저장할 배열 
var cury = 1;  // 현재y
var curx = 4;  // 현재x
var colors = ["w", "r", "o", "y", "g", "b", "n", "v", "" , "" ,  "dg" , "black"]; // 0~7 은 이동 색상 // 11은외각 , 12은 이동불가 
var tetris = document.querySelector("#tetris");  //  [20,10] 사이즈의 그림을 표현한다. // 테두리를 위해 [22, 12] 만든다. 
var data = [];                                    // [20,10] 사이즈의 데이터를 표현한다. // 테두리를 위해 [22,12] 만든다. 

// 초기화 함수 
function init() {
  // tetris 에는 테이블로 그림을 그리고, data에는 숫자 0으로 가득채운다. 

  for (var y = 0; y < 22; y++) {
    var tr = document.createElement("tr");
    tetris.append(tr);
    var temp = []
    for (var x = 0; x < 12; x++) {
      var td = document.createElement("td");
      tr.append(td);
      temp.push(0);
    }
    data.push(temp);
  }

  // 테두리는 외곽선을 표시하기위해서  10 숫자로 채워넣는다.    
  for(var i = 0; i < 12; i++){ // 가로두줄
      data[0][i] = 10;
      data[21][i] = 10;
      tetris.children[0].children[i].className = colors[10];
      tetris.children[21].children[i].className = colors[10];
  }

  for(var i = 0; i < 22; i++){ // 세로두줄
      data[i][0] = 10;
      data[i][11] = 10;
      tetris.children[i].children[0].className = colors[10];
      tetris.children[i].children[11].className = colors[10];
  }
  console.log(data);


}

function makeBlock() {

  var r = Math.floor(Math.random() * blocks.length);
  curBlock = blocks[r];

  var shape = curBlock.shape;
  cury = 1;  
  curx = 4;  

  for (var y = 0; y < shape.length; y++) {
    for (var x = 0; x < shape.length; x++) {
      if (shape[y][x] == 1) {
        data[y + cury][x + curx] = curBlock.color;
      }
    }
  }
}


function draw() {

  for (var y = 0; y < 22; y++) {
    for (var x = 0; x < 12; x++) {
        index = data[y][x];
        tetris.children[y].children[x].className = colors[index];
    }
  }
}
