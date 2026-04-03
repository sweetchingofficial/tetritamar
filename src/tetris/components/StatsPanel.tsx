import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTetrisGame } from '../hooks/useTetrisGame';

export const StatsPanel = () => {
  const { state } = useTetrisGame();
  const { score, lines, level } = state;

  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.label}>Lines</Text>
        <Text style={styles.value}>{lines}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>{level}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  statBox: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StatsPanel;
