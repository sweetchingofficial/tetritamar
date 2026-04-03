import type { Board, Piece, PieceType } from './constants'
import { PIECE_SHAPES, COLS, ROWS } from './constants'

export function createEmptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0))
}

export function randomPiece(): Piece {
  const types = Object.keys(PIECE_SHAPES) as PieceType[]
  const type = types[Math.floor(Math.random() * types.length)]
  const shape = PIECE_SHAPES[type].map(row => [...row])
  return {
    type,
    shape,
    x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
    y: 0
  }
}

export function rotatePiece(piece: Piece): Piece {
  const rows = piece.shape.length
  const cols = piece.shape[0].length
  const rotated: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0))
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = piece.shape[r][c]
    }
  }
  return {
    ...piece,
    shape: rotated
  }
}

export function collides(board: Board, piece: Piece, offsetX = 0, offsetY = 0): boolean {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        const newX = piece.x + c + offsetX
        const newY = piece.y + r + offsetY
        if (
          newX < 0 || newX >= COLS ||
          newY >= ROWS ||
          (newY >= 0 && board[newY][newX])
        ) {
          return true
        }
      }
    }
  }
  return false
}

export function mergeBoard(board: Board, piece: Piece): Board {
  const newBoard = board.map(row => [...row])
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        const boardY = piece.y + r
        const boardX = piece.x + c
        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          newBoard[boardY][boardX] = 1
        }
      }
    }
  }
  return newBoard
}

export function clearLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => cell === 0))
  const linesCleared = ROWS - newBoard.length
  while (newBoard.length < ROWS) {
    newBoard.unshift(Array(COLS).fill(0))
  }
  return { newBoard, linesCleared }
}
