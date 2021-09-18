export interface IBird {
  sprites: any;
  context: any;
  sourceX: number;
  sourceY: number;
  x: number;
  y: number;
}

let velocity = 0
let movingY = 0

export default function Bird({sprites, context, sourceX, sourceY, x, y} : IBird){

  const height  = 24;
  const width   = 33;
  const gravity = 0.25;

  const update = () => {
    velocity = velocity + gravity;
    movingY = movingY + velocity;

  };

  const render = () => {
        context.drawImage(sprites, sourceX, sourceY, width, height, x, movingY, width, height)
  };

  update();
  render();
}
