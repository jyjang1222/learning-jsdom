// ---------------------------------------------------
const canvas = document.getElementById("snake_field");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const block_count = 20;
const block_size = Math.round(width / block_count);
// console.log(block_size);

let snake = [];
let apple = null;
let key = null;
let score = 0;
let max = 0;
let speed = 1;
// var key = { right: null, left: null, up: null, down: null };

const FIELD_COLOR = "#f0f0f0";
const APPLE_COLOR = "#FF0000";
const GRID_COLOR = "#d9d9d9"; //#d9d9d9
const SNAKE_COLOR = "blue"; //#00asdFF00

// ---------------------------------------------------
// 초기화식
const init = () => {
  max = maxScore(score);
  // console.log(max);
  document.getElementById("max").innerHTML = max;
  document.addEventListener("keydown", keyDownHandler);
  //   document.addEventListener("keyup", keyUpHandler);

  // snake[0] : 0 0
  // snake[1] : 25 0

  // reverse => snake[0] : 25 0
  // snake[1] : 0 0
  snake = [];
  for (let i = 0; i < 2; i++) {
    snake.push({
      x: i * block_size,
      y: 0,
    });
    snake.reverse();
  }
  console.log(snake);

  key = "right";
  score = 0;
  speed = 1;
  spawn_apple();
};

// keyDownHandler 이벤트 처리기
const keyDownHandler = (e) => {
  var keyCode = e.keyCode;
  // console.log(keyCode);
  switch (keyCode) {
    case 39:
      // 반대방향으로 가는거 막아두기
      if (key != "left") {
        key = "right";
        break;
      }

    case 37:
      if (key != "right") {
        key = "left";
        break;
      }

    case 38:
      if (key != "down") {
        key = "up";
        break;
      }

    case 40:
      if (key != "up") {
        key = "down";
        break;
      }
  }
  //   console.log(key);
};

// draw
const draw = () => {
  draw_field();
  draw_snake();
  draw_apple();
};

// map 그리기
const draw_field = () => {
  ctx.fillStyle = FIELD_COLOR; //ctx 색상 지정
  ctx.fillRect(0, 0, width, height); // ctx 모양(좌표, 좌표, 가로, 세로)
  ctx.strokeStyle = GRID_COLOR; // 선스타일 지정(테두리)

  // 가로줄 그리기
  // blcok_size = 25; 19번 반복
  for (let i = block_size; i < height; i += block_size) {
    ctx.moveTo(0, i); // moveTo(x, y) : 선 출발점 지정
    ctx.lineTo(width, i); // lineTo(x, y) : 선의 도착점 지정
    ctx.stroke(); // stroke() : 선 그리기
    // console.log(i);
  }

  // 세로줄 그리기
  for (let i = block_size; i < width; i += block_size) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
};

// 사과그리기
const draw_apple = () => {
  ctx.beginPath(); // 열기
  ctx.fillStyle = APPLE_COLOR; // fillStyle() : 컬러삽입
  ctx.arc(
    apple.x + block_size / 2,
    apple.y + block_size / 2,
    block_size / 2,
    0,
    2 * Math.PI
  ); // arc() : 동그라미그리기
  ctx.fill(); // fill() : 채우기
  ctx.closePath();
};

// 뱀 그리기
const draw_snake = () => {
  ctx.fillStyle = SNAKE_COLOR; // snake 색상
  ctx.strokeStyle = "#000000"; // snake 외곽선 색상
  //   ctx.fillRect(20, 20, block_size, block_size);
  //   ctx.strokeRect(20, 20, block_size, block_size);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, block_size, block_size);
    ctx.strokeRect(snake[i].x, snake[i].y, block_size, block_size);
  }
};

// 사과 랜덤위치 생성
// return의 값이 true이면(position이 중복이면) do 실행해서 다시 apple 좌표값을 받음.
const spawn_apple = () => {
  do {
    apple = {
      x:
        Math.floor(Math.round(Math.random() * width) / block_size) * block_size,

      y:
        Math.floor(Math.round(Math.random() * height) / block_size) *
        block_size,
    };
  } while (applePosCk(apple));
};

// 사과위치 뱀위치 중복 체크
const applePosCk = (applePos) => {
  var contact = false;
  for (let i = 0; i < snake.lenght; i++) {
    if (snake[i].x == applePos.x && snake[i].y == applePos.y) {
      contact = true;
      break;
    }
  }
  // console.log(contact);
  return contact;
};

// 벽 충돌 체크
const blockColison = (pos) => {
  var colison = true;
  if (0 <= pos.x && pos.x < width && 0 <= pos.y && pos.y < height) {
    colison = false;
  }
  // console.log(colison)
  return colison;
};

// 몸통 충돌 체크
const snakeColison = (pos) => {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x == pos.x && snake[i].y == pos.y) {
      return true;
    }
  }
};

// max스코어 구하기
const maxScore = (sc) => {
  if (max <= sc) {
    max = sc;
  }
  return max;
};

// 이동
const move = () => {
  let newPos = {};

  if (key == "up") {
    newPos = {
      x: snake[0].x,
      y: snake[0].y - block_size,
    };
  } else if (key == "down") {
    newPos = {
      x: snake[0].x,
      y: snake[0].y + block_size,
    };
  } else if (key == "right") {
    newPos = {
      x: snake[0].x + block_size,
      y: snake[0].y,
    };
  } else if (key == "left") {
    newPos = {
      x: snake[0].x - block_size,
      y: snake[0].y,
    };
  }
  // console.log(key);

  // 종료조건
  // true가 하나만 있어도 종료
  if (blockColison(newPos) || snakeColison(newPos)) {
    alert("gameover");
    alert("score : " + score);
    init();

    // 사과 먹기
  } else if (newPos.x == apple.x && newPos.y == apple.y) {
    score += 10;
    if (score % 50 == 0) {
      speed += 0.5;
    }
    // 애플 재생성
    spawn_apple();

    // 스네이크 머리추가, block 추가
    snake.unshift({
      x: newPos.x,
      y: newPos.y,
    });
  } else {
    // 꼬리삭제 머리추가, block 추가 없이 이동
    snake.pop();
    snake.unshift({
      x: newPos.x,
      y: newPos.y,
    });
  }
  draw();
  setTimeout(move, 100 / speed);
};

init();
move();
