import React, { ReactElement, useRef, useEffect, useState } from 'react'

import { Container } from './styles'

import Bird from '../../components/Bird'
import Background from '../../components/Background'
import Floor from '../../components/Floor'

export default function GamePage() : ReactElement {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>()
  const [gameSprite, setGameSprite] = useState<HTMLImageElement>()

  useEffect(() => {
    const canvas = canvasRef.current;
    const sprites = new Image();

    const context2d = canvas?.getContext('2d');
    sprites.src = 'game.png'

    setContext(context2d)
    setGameSprite(sprites)
  }, [])

  useEffect(() => {
    if(context && gameSprite){
      gameSprite.onload = () => {
          looping()
      }
    }
  }, [context, gameSprite])

  const looping = () => {

    Background({
      sprites: gameSprite,
      canvas: canvasRef.current? canvasRef.current : null,
      context,
      sourceX: 390,
      sourceY: 0,
      x: 0,
      y: canvasRef.current? canvasRef.current.height : 0
    })

    Floor({
      sprites: gameSprite,
      context,
      sourceX: 0,
      sourceY: 610,
      x: 0,
      y: canvasRef.current? canvasRef.current.height: 0
    })

    Bird({
      sprites: gameSprite,
      context,
      sourceX: 0,
      sourceY: 0,
      x: 10,
      y: 50,
    })

    requestAnimationFrame(looping)
  }

	return (
		<Container className='display-flex'>
      <canvas ref={canvasRef}>
      </canvas>
		</Container>
	)
}
