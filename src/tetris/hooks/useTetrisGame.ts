import { useState, useEffect, useCallback, useRef } from 'react'
import type { GameState } from '../constants'
import {
  createEmptyBoard,
  randomPiece,
  collides,
  mergeBoard,
  clearLines,
  rotatePiece
} from '../gameLogic'

const INITIAL_STATE: GameState = {
  board: createEmptyBoard(),
  currentPiece: null,
  nextPiece: null,
  score: 0,
  lines: 0,
  level: 1,
  gameOver: false,
  isPaused: false
}

const POINTS_PER_LINE = [0, 40, 100, 300, 1200] // classic NES scoring

export function useTetrisGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const gameLoopRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const dropCounterRef = useRef<number>(0)
  const dropIntervalRef = useRef<number>(1000) // ms per grid cell

  const startGame = useCallback(() => {
    const firstPiece = randomPiece()
    const nextPiece = randomPiece()
    setState({
      ...INITIAL_STATE,
      currentPiece: firstPiece,
      nextPiece
    })
    lastTimeRef.current = performance.now()
    dropCounterRef.current = 0
  }, [])

  const movePiece = useCallback((dx: number, dy: number) => {
    setState(prev => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const newX = prev.currentPiece.x + dx
      const newY = prev.currentPiece.y + dy
      if (!collides(prev.board, prev.currentPiece, dx, dy)) {
        return {
          ...prev,
          currentPiece: { ...prev.currentPiece, x: newX, y: newY }
        }
      }
      return prev
    })
  }, [])

  const rotate = useCallback(() => {
    setState(prev => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      const rotated = rotatePiece(prev.currentPiece)
      // wall kicks: try shifting left/right to avoid wall collision
      for (let kick = -1; kick <= 1; kick++) {
        if (!collides(prev.board, rotated, kick, 0)) {
          return { ...prev, currentPiece: { ...rotated, x: rotated.x + kick } }
        }
      }
      return prev
    })
  }, [])

  const hardDrop = useCallback(() => {
    setState(prev => {
      if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
      let dy = 0
      while (!collides(prev.board, prev.currentPiece, 0, dy + 1)) {
        dy++
      }
      return {
        ...prev,
        currentPiece: { ...prev.currentPiece, y: prev.currentPiece.y + dy }
      }
    })
  }, [])

  const lockPiece = useCallback(() => {
    setState(prev => {
      if (!prev.currentPiece || prev.gameOver) return prev

      const merged = mergeBoard(prev.board, prev.currentPiece)
      const { newBoard, linesCleared } = clearLines(merged)
      const scoreIncrease = POINTS_PER_LINE[linesCleared] * prev.level
      const newLines = prev.lines + linesCleared
      const newLevel = Math.floor(newLines / 10) + 1
      const newDropInterval = Math.max(100, 1000 - (newLevel - 1) * 100)
      dropIntervalRef.current = newDropInterval // update drop speed

      const nextPiece = randomPiece()

      // Check if next piece collides immediately -> game over
      if (collides(newBoard, nextPiece, 0, 0)) {
        return {
          ...prev,
          board: newBoard,
          currentPiece: null,
          nextPiece: null,
          score: prev.score + scoreIncrease,
          lines: newLines,
          level: newLevel,
          gameOver: true
        }
      }

      return {
        ...prev,
        board: newBoard,
        currentPiece: nextPiece,
        nextPiece: randomPiece(),
        score: prev.score + scoreIncrease,
        lines: newLines,
        level: newLevel
      }
    })
  }, [])

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }, [])

  // Game loop
  useEffect(() => {
    if (!state.currentPiece || state.gameOver || state.isPaused) return

    const gameLoop = (time: number) => {
      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time
      dropCounterRef.current += deltaTime

      if (dropCounterRef.current > dropIntervalRef.current) {
        // try to move down
        setState(prev => {
          if (!prev.currentPiece || prev.gameOver || prev.isPaused) return prev
          if (collides(prev.board, prev.currentPiece, 0, 1)) {
            lockPiece()
            return prev
          }
          return {
            ...prev,
            currentPiece: { ...prev.currentPiece, y: prev.currentPiece.y + 1 }
          }
        })
        dropCounterRef.current = 0
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(gameLoopRef.current!)
  }, [state.currentPiece, state.gameOver, state.isPaused, lockPiece])

  return {
    state,
    startGame,
    movePiece,
    rotate,
    hardDrop,
    togglePause
  }
}
