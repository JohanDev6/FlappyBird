export interface IBackground {
  sprites: any;
  canvas: HTMLCanvasElement | null;
  context: any;
  sourceX: number;
  sourceY: number;
  x: number;
  y: number;
}

export default function Background({sprites, canvas, context, sourceX, sourceY, x, y} : IBackground){

  const height = 114;
  const width = 275;

  context.fillStyle = '#74b1f7'
  context.fillRect(0,0, canvas?.width, canvas?.height)

  context.drawImage(sprites, sourceX, sourceY, width, height, x, (y - height), width, height)
  context.drawImage(sprites, sourceX, sourceY, width, height, (x + width), (y - height), width, height)
}
