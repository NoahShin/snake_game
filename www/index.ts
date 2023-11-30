import init, { World, Direction, GameStatus } from "snake_game";
import { rnd } from "./utils/rnd";

init().then((wasm) => {
  const CELL_SIZE = 20;
  const WORLD_WIDTH = 32;
  const snakeSpawnIdx = rnd(WORLD_WIDTH * WORLD_WIDTH);

  const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
  const worldWidth = world.width();

  const points = document.getElementById("points");
  const gameStatus = document.getElementById("game-status");
  const gameControlBtn = document.getElementById("game-control-btn");
  const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");

  const ctx = canvas.getContext("2d");

  canvas.height = worldWidth * CELL_SIZE;
  canvas.width = worldWidth * CELL_SIZE;

  gameControlBtn.addEventListener("click", (_) => {
    const status = world.game_status();

    if (status === undefined) {
      gameControlBtn.textContent = "Playing...";
      world.start_game();
      play();
    } else {
      location.reload();
    }
  });

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        world.change_snake_dir(Direction.Up);
        break;
      case "ArrowRight":
        world.change_snake_dir(Direction.Right);
        break;
      case "ArrowDown":
        world.change_snake_dir(Direction.Down);
        break;
      case "ArrowLeft":
        world.change_snake_dir(Direction.Left);
        break;
    }
  });

  function drawWorld() {
    ctx.beginPath();

    for (let x = 0; x < worldWidth + 1; x++) {
      ctx.moveTo(CELL_SIZE * x, 0);
      ctx.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE);
    }

    for (let y = 0; y < worldWidth + 1; y++) {
      ctx.moveTo(0, CELL_SIZE * y);
      ctx.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y);
    }

    ctx.stroke();
  }

  function drawReward() { // 빨강 랜덤하게 뜨기
    const idx = world.reward_cell(); 
    const col = idx % worldWidth;
    const row = Math.floor(idx / worldWidth);

    ctx.beginPath();
    ctx.fillStyle = "#FF0000"; // 빨강
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.stroke();
  }

  function drawSnake() {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      world.snake_cells(),
      world.snake_length()
    );

    snakeCells
      .slice()
      .reverse()
      .forEach((cellIdx, i) => {
        const col = cellIdx % worldWidth;
        const row = Math.floor(cellIdx / worldWidth);

        ctx.fillStyle = i === snakeCells.length - 1 ? "#7878db" : "#000000";

        ctx.beginPath();
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });

    ctx.stroke();
  }

  function drawGameStatus() {
    gameStatus.textContent = world.game_status_text();
    points.textContent = world.points().toString();
  }

  function paint() {
    drawWorld(); // 백그라운드 그리기
    drawSnake(); // 뱀 항상 그리기
    drawReward(); // 빨강 랜덤하게 뜨기
    drawGameStatus();
  }

  function play() {
    const status = world.game_status();

    if (status == GameStatus.Won || status == GameStatus.Lost) {
      gameControlBtn.textContent = "Re-Play";
      return;
    }

    // const fps = 3; // 이러면 속도가 일정해서 재미가 없음
    const fps = world.points() > 0 ? 3 + world.points() : 3;
    // TODO: 벽에 부딪히면 죽게 하고 싶은데..
    setTimeout(() => { // 계속 그려
      console.log("Playing!");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.step();
      paint();
      // the method takes a callback to invoked before the next repaint
      requestAnimationFrame(play); // , 애니메이션과 그 외의 반복 작업을 수행하기 위해 사용된다. 이 메서드는 브라우저의 리페인트 주기에 맞게 콜백 함수를 실행하도록 예약한다
    }, 1000 / fps);
  }

  paint();
});
