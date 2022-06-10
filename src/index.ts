import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";

// Images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from './images/ball.png';

// Configs of sprites
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from './setup';
import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;

// Game over
function setGameOver(view: CanvasView) {
  view.displayInfo("Game Over!");
  gameOver = false;
}

// Game won
function setGameWon(view: CanvasView) {
  view.displayInfo("Game Won!");
  gameOver = false;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  // Move the ball
  ball.moveBall();

  // Move paddle within canvas
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  // Check collision
  collision.checkBallCollision(ball, paddle, view);

  const isCollidingWithBrick = collision.isCollidingBricks(ball, bricks);

  if (isCollidingWithBrick) { 
    score += 1;
    view.displayScore(score);
  }

  // Game over on ball leaving field
  if (ball.pos.y > view.canvas.height) {
    gameOver = true;
  }

  // Game won
  if (bricks.length === 0) {
    return setGameWon(view);
  }

  if (gameOver) {
    return setGameOver(view);
  }

  // Render the canvas in interval
  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

// Start game
function startGame(view: CanvasView) {
  // Reset display
  score = 0;
  view.displayInfo("");
  view.displayScore(0);

  // Collision instance
  const collision = new Collision();

  // Create bricks
  const bricks = createBricks();

  // Create Paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5
    },
    PADDLE_IMAGE
  );

  // Create ball
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY
    },
    BALL_IMAGE
  )

  gameLoop(view, bricks, paddle, ball, collision);
}

// Create new view
const view = new CanvasView("#playField");
view.initStartButton(startGame);
