export const COLS = 10
export const ROWS = 20
// BLOCK_SIZE will be calculated based on screen width

export type PieceType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export interface Piece {
  type: PieceType
  shape: number[][] // 4x4 matrix (or variable)
  x: number
  y: number
}

export const PIECE_SHAPES: Record<PieceType, number[][]> = {
  I: [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  J: [
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ],
  L: [
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ],
  O: [
    [1,1],
    [1,1]
  ],
  S: [
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
  T: [
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ],
  Z: [
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ]
}

export const COLORS: Record<PieceType, string> = {
  I: '#00f5ff',
  J: '#0051ff',
  L: '#ff7b00',
  O: '#ffdd00',
  S: '#00ff66',
  T: '#cc00ff',
  Z: '#ff0055'
}

export type Cell = number // 0 = empty, 1 = filled

export type Board = Cell[][]

export interface GameState {
  board: Board
  currentPiece: Piece | null
  nextPiece: Piece | null
  score: number
  lines: number
  level: number
  gameOver: boolean
  isPaused: boolean
}
