class Bird{
  sprites: HTMLImageElement;
  context : CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  width = 33;
  height = 24;
  sourceX = 0;
  sourceY = 0;
  gravity = 0.25;
  die = false;
  velocity = 0;
  jump = 4.5;
  x = 10;
  y = 10;

  currentFrame = 0;

  frames = [
    {spritesX: 0, spritesY: 0},
    {spritesX: 0, spritesY: 26},
    {spritesX: 0, spritesY: 52},
    {spritesX: 0, spritesY: 26}
  ]

  constructor(sprites : HTMLImageElement, context : CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.sprites = sprites
    this.canvas = canvas
    this.context = context

    this.y = canvas.height / 2.5;
  }

  render(){
    this.context.drawImage(this.sprites, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  update(){
    if(this.die){
      return;
    }

    this.velocity = this.velocity + this.gravity;
    this.y = this.y + this.velocity;
  }

  jumping(){
    this.velocity = - this.jump
  }

  reset(){
    this.die = false;
    this.velocity = 0;
    this.x = 10;
    this.y = this.canvas.height / 2.5;
  }

  dieAnimation(frames : number, birdY : number, floorY : number){
    const delayFramesDie = 20;
    const delay = frames % delayFramesDie === 0;

    const framingDie = 10

    if(delay){
      if(this.y >= floorY){
          this.y -= framingDie
      }
    }
  }

  animation(frames : number){

    const { spritesX , spritesY } : any = this.frames[this.currentFrame];
    this.sourceX = spritesX;
    this.sourceY = spritesY;

    const delayFrames = 10;
    const delay = frames % delayFrames === 0;

    if(delay){
      const base = 1;
      const index = base + this.currentFrame;
      const baseIndex = this.frames.length;

      this.currentFrame =index % baseIndex;
    }
  }

  observerCollision(targetY : number) : boolean{
      const birdY = (this.y - this.height);

      if(birdY >= (targetY - 95)){ this.die = true; return true;
      }else{ this.die = false; return false;}
  }
}

export default Bird
