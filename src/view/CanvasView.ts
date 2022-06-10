// Import types (converted from class by typescript)
import { Ball } from "../sprites/Ball";
import { Brick } from "../sprites/Brick";
import { Paddle } from "../sprites/Paddle";

export class CanvasView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.scoreDisplay = document.querySelector("#score");
    this.start = document.querySelector("#start");
    this.info = document.querySelector("#info");
  }

  // Method to clear canvas
  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Method to initialize the start button
  initStartButton(startFunction: (view: CanvasView) => void): void {
    this.start?.addEventListener("click", () => startFunction(this));
  }

  // Method to display score
  displayScore(score: number): void {
    if (this.scoreDisplay) {
      this.scoreDisplay.innerHTML = score.toString();
    }
  }

  // Method to display game info
  displayInfo(text: string): void {
    if (this.info) {
      this.info.innerHTML = text;
    }
  }

  // Method to display sprites
  drawSprite(sprite: Brick | Ball | Paddle): void {
    if (!sprite) {
      return;
    }

    this.context?.drawImage(
      sprite.image,
      sprite.pos.x,
      sprite.pos.y,
      sprite.width,
      sprite.height,
    );
  }

  // Method to display all bricks
  drawBricks(bricks: Brick[]): void {
    bricks.forEach(brick => this.drawSprite(brick));
  }
};
