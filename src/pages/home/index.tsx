import React, { ReactElement, useRef, useEffect, useState } from 'react'

import { Container } from './styles'

import bird from '../../components/Bird'
import background from '../../components/Background'
import floor from '../../components/Floor'
import menu from '../../components/Menu'
import pipes from '../../components/Pipes'
import score from '../../components/Score'
import endMenu from '../../components/EndMenu'

interface IScreen {
  renderCanvas: () => void;
  updateCanvas: () => void;
  click?: () => void;
}

declare global {
    interface Window {
        currentScreen: IScreen;
        startScreen: IScreen;
        endScreen: IScreen
        score: number;
        die: boolean;
    }
}

window.score = 0;
window.bestScore = 0;

export default function GamePage() : ReactElement {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasEl, setCanvas] = useState<HTMLCanvasElement | null>()
  const [context, setContext] = useState<CanvasRenderingContext2D | null>()
  const [gameSprite, setGameSprite] = useState<HTMLImageElement | null>()
  const [gameSounds, setGameSounds] = useState<HTMLAudioElement[] | null>(null)

  let frames = 0;

  const switchScreen = (newScreen: IScreen) => {
    window.currentScreen = newScreen
  }

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas?.getContext('2d');
    let sprites = new Image();
    let sounds : HTMLAudioElement[] = [];

    sprites.src = 'game.png';

    sounds[0] = new Audio();
    sounds[0].src = 'efeitos_caiu.wav'
    sounds[1] = new Audio();
    sounds[1].src = 'efeitos_hit.wav'
    sounds[2] = new Audio();
    sounds[2].src = 'efeitos_ponto.wav'
    sounds[3] = new Audio();
    sounds[3].src = 'efeitos_pulo.wav'

    sprites.onload = () => {
      setGameSounds(sounds)
      setGameSprite(sprites)
      setCanvas(canvas)
      setContext(context)
    }

  }, [])

  useEffect(() => {
    if(gameSprite && context && canvasEl && gameSounds){

      let Bird = new bird(gameSprite as HTMLImageElement, context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)
      let Background = new background(gameSprite as HTMLImageElement, context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)
      let Floor = new floor(gameSprite as HTMLImageElement, context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)
      let Menu = new menu(gameSprite as HTMLImageElement, context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)
      let Pipes = new pipes(gameSprite as HTMLImageElement, context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)
      let Score = new score(context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)
      let EndMenu = new endMenu(gameSprite as HTMLImageElement, context as CanvasRenderingContext2D, canvasEl as HTMLCanvasElement)

      let gameScreen : IScreen = {
        renderCanvas: () => {
          Background.render();
          Bird.render();
          Pipes.render();
          Score.render();
          Floor.render();
        },
        click: () => {
          Bird.jumping(gameSounds[3]);
        },
        updateCanvas: () => {
          Floor.update();
          Bird.update(Floor.y, gameSounds[1]);
          Bird.animation(frames);
          Bird.fallAnimation(frames);
          Pipes.update(frames, Bird.y, Bird.x, Bird.height, Bird.width, gameSounds[0], gameSounds[1]);
          Score.update(frames, gameSounds[2]);
        }
      }

      let initScreen : IScreen = {
        renderCanvas: () => {
          Background.render();
          Floor.render();
          Menu.render();
          Bird.render();
        },
        click: () => {
          switchScreen(gameScreen)
        },
        updateCanvas: () => {
          Bird.animation(frames);
          Floor.update();
        }
      }

      let endScreen : IScreen = {
        renderCanvas: () => {
          Background.render();
          Pipes.render();
          EndMenu.render(window.bestScore, window.score);
          Floor.render();
          Bird.render();
        },
        click: () => {
          Score.reset();
          Bird.reset();
          Pipes.resetPipes();
          Pipes.reset(null);

          switchScreen(initScreen)
        },
        updateCanvas: () => {
          Bird.update((Floor.y + 23), null);
        }
      }

      switchScreen(initScreen)
      window.startScreen = initScreen;
      window.endScreen = endScreen;
    }
  }, [gameSprite, context, canvasEl, gameSounds])

  useEffect(() => {
    if(window.currentScreen && gameSprite && context){
      looping()
    }
  }, [gameSprite, context])

  window.addEventListener('click', () => {
    if(window.currentScreen && window.currentScreen.click) {
      window.currentScreen.click()
    }
  })

  const looping = () => {
    context?.clearRect(0, 0, canvasEl?.width as number, canvasEl?.height as number);

    frames += 1
    window.currentScreen?.renderCanvas();
    window.currentScreen?.updateCanvas();

    requestAnimationFrame(looping)

  }

	return (
		<Container className='display-flex'>
      <canvas width='518' height='540' ref={canvasRef}>
      </canvas>
		</Container>
	)
}
