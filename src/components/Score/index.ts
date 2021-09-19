declare global {
    interface Window {
        score: number;
        bestScore: number;
    }
}

class Score{
  context : CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  score = 0;
  bestScore = window.bestScore;
  y = 50;
  x = 0;

  constructor(context : CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.context = context
    this.canvas = canvas

    this.x = canvas.width - 15
  }

  reset(){
    window.bestScore = this.score > window.bestScore? this.score : window.bestScore;
    window.score = this.score
    this.score = 0;
  }

  render(){
    this.context.font = '35px "Dosis"';
    this.context.fillStyle = 'white';
    this.context.textAlign = 'right'
    this.context.fillText(`${this.score}`, this.x, this.y);

    console.log(window.bestScore, this.score)
  }

  update(frames : number){
    const pipeDelay = 110;
    const hasScored = frames % pipeDelay === 0;

    if(hasScored){
      this.score += 1;
      window.bestScore = window.bestScore < this.score ? this.score : window.bestScore;
      window.score = this.score
    }

  }
}

export default Score;
