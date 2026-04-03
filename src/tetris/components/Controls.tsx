import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTetrisGame } from '../hooks/useTetrisGame';

export const Controls = () => {
  const { movePiece, rotate, hardDrop } = useTetrisGame();

  const btnStyle = [styles.btn, { width: 60, height: 60 }];
  const btnTextStyle = { fontSize: 24, color: '#fff' };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={btnStyle} onPress={rotate}>
          <Text style={btnTextStyle}>↻</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={btnStyle} onPress={() => movePiece(-1, 0)}>
          <Text style={btnTextStyle}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => movePiece(0, 1)}>
          <Text style={btnTextStyle}>↓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => movePiece(1, 0)}>
          <Text style={btnTextStyle}>→</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.hardDrop]} onPress={() => hardDrop()}>
          <Text style={[btnTextStyle, { fontSize: 18 }]}>DROP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 6,
  },
  btn: {
    backgroundColor: '#475569',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hardDrop: {
    backgroundColor: '#ef4444',
    width: 200,
    height: 56,
  },
});

export default Controls;
