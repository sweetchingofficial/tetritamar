import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { Piece } from '../constants';
import { COLORS } from '../constants';

interface NextPieceProps {
  piece: Piece | null;
}

export const NextPiece = ({ piece }: NextPieceProps) => {
  const blockSize = 20;

  if (!piece) {
    return (
      <View style={styles.container}>
        <View style={[styles.previewBox, { width: 4 * blockSize, height: 4 * blockSize }]} />
      </View>
    );
  }

  const { shape, type } = piece;
  const color = COLORS[type];

  const cells = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        cells.push(
          <View
            key={`${y}-${x}`}
            style={{
              position: 'absolute',
              left: x * blockSize,
              top: y * blockSize,
              width: blockSize,
              height: blockSize,
              backgroundColor: color,
              borderWidth: 1,
              borderColor: '#0f172a',
            }}
          />
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.previewBox, { width: 4 * blockSize, height: 4 * blockSize }]}>
        {cells}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  previewBox: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 4,
    position: 'relative',
  },
});

export default NextPiece;
