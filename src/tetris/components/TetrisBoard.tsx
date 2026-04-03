import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTetrisGame } from '../hooks/useTetrisGame';
import { COLS, ROWS, COLORS } from '../constants';

export const TetrisBoard = () => {
  const { width } = useWindowDimensions();
  const boardWidth = Math.min(width * 0.9, 300);
  const blockSize = boardWidth / COLS;
  const boardHeight = blockSize * ROWS;

  const { state } = useTetrisGame();

  // Build display board with current piece merged
  const displayBoard = state.board.map(row => [...row]);

  if (state.currentPiece) {
    for (let r = 0; r < state.currentPiece.shape.length; r++) {
      for (let c = 0; c < state.currentPiece.shape[r].length; c++) {
        if (state.currentPiece.shape[r][c]) {
          const by = state.currentPiece.y + r;
          const bx = state.currentPiece.x + c;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            displayBoard[by][bx] = 2; // active piece cell
          }
        }
      }
    }
  }

  const cells = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const val = displayBoard[y][x];
      let backgroundColor = '#1e293b'; // empty - gray-800
      if (val === 1) {
        backgroundColor = '#ffffff'; // locked
      } else if (val === 2) {
        backgroundColor = COLORS[state.currentPiece?.type || 'I'];
      }

      cells.push(
        <View
          key={`${y}-${x}`}
          style={{
            width: blockSize,
            height: blockSize,
            backgroundColor,
            borderWidth: 1,
            borderColor: '#0f172a',
          }}
        />
      );
    }
  }

  return (
    <View
      style={{
        width: boardWidth,
        height: boardHeight,
        backgroundColor: '#0f172a',
        borderWidth: 2,
        borderColor: '#334155',
        borderRadius: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {cells}
    </View>
  );
};

export default TetrisBoard;
