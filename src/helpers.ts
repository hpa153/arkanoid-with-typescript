import { Brick } from './sprites/Brick';
import {
  BRICK_IMAGES,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY
} from './setup';

export function createBricks(): Brick[] {
  return LEVEL.reduce((accu, element, iterator) => {
    // Get row and col of brick
    const row = Math.floor((iterator + 1) / STAGE_COLS);
    const col = iterator % STAGE_COLS;

    // Get position of brick
    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    // Return if there's no brick
    if (element === 0) {
      return accu;
    }

    // Return array of bricks
    return [
      ...accu,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        {x, y},
        BRICK_ENERGY[element],
        BRICK_IMAGES[element]
      )
    ]
  }, [] as Brick[]);
};
