export interface IBird {
  sprites: any;
  context: any;
  sourceX: number;
  sourceY: number;
  x: number;
  y: number;
}

export default function Floor({sprites, context, sourceX, sourceY, x, y} : IBird){

  const height = 22;
  const width = 224;

  context.drawImage(sprites, sourceX, sourceY, width, height, x, (y - height), width, height)
  context.drawImage(sprites, sourceX, sourceY, width, height, (x + width), (y - height), width, height)
}
