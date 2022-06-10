import { Vector } from "../types";

export class Paddle {
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean;
  private moveRight: boolean;

  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;

    // Keyboard event Listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  get width(): number {
    return this.paddleWidth;
  }

  get height(): number {
    return this.paddleHeight;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.paddleImage;
  }

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }

  get isMovingRight(): boolean {
    return this.moveRight;
  }

  // Move the paddle left and right
  movePaddle(): void {
    if (this.moveLeft) {
      this.pos.x -= this.speed;
    }

    if (this.moveRight) {
      this.pos.x += this.speed;
    }
  }

  // Move paddle
  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft") {
      this.moveLeft = true;
    }

    if (e.key === "ArrowRight" || e.code === "ArrowRight") {
      this.moveRight = true;
    }
  }

  // Stop moving paddle on key up
  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft") {
      this.moveLeft = false;
    }

    if (e.key === "ArrowRight" || e.code === "ArrowRight") {
      this.moveRight = false;
    }
  }
};
