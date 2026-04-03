import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { useTetrisGame } from './src/tetris/hooks/useTetrisGame';
import TetrisBoard from './src/tetris/components/TetrisBoard';
import NextPiece from './src/tetris/components/NextPiece';
import Controls from './src/tetris/components/Controls';
import StatsPanel from './src/tetris/components/StatsPanel';

export default function App() {
  const {
    state,
    startGame,
    togglePause,
  } = useTetrisGame();

  // Handle Android back button to pause/exit
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (state.gameOver) {
        // Let system handle exit
        return false;
      }
      if (!state.currentPiece && !state.gameOver) {
        // Not started, exit
        return false;
      }
      // Pause/Resume
      togglePause();
      return true; // prevent default
    });

    return () => backHandler.remove();
  }, [state, togglePause]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>TETRIS</Text>

      {!state.currentPiece && !state.gameOver ? (
        <View style={styles.startOverlay}>
          <Text style={styles.startTitle}>Tetritamar</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>PLAY</Text>
          </TouchableOpacity>
          <Text style={styles.controlsHint}>
            Use buttons below to move, rotate, drop.
          </Text>
        </View>
      ) : (
        <>
          <StatsPanel />
          <View style={styles.boardRow}>
            <TetrisBoard />
            <View style={styles.sidePanel}>
              <Text style={styles.sideLabel}>Next</Text>
              <NextPiece piece={state.nextPiece ? { ...state.nextPiece, x: 0, y: 0 } : null} />
              <TouchableOpacity
                style={[styles.pauseButton, state.isPaused && styles.pauseButtonActive]}
                onPress={togglePause}
              >
                <Text style={styles.pauseButtonText}>{state.isPaused ? 'RESUME' : 'PAUSE'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Controls />
        </>
      )}

      {state.gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverTitle}>GAME OVER</Text>
          <Text style={styles.gameOverScore}>Score: {state.score}</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>PLAY AGAIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22d3ee',
    marginBottom: 20,
    textShadowColor: '#22d3ee',
    textShadowRadius: 10,
  },
  boardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  sidePanel: {
    alignItems: 'center',
    marginTop: 20,
  },
  sideLabel: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 8,
  },
  pauseButton: {
    marginTop: 20,
    backgroundColor: '#eab308',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  pauseButtonActive: {
    backgroundColor: '#22c55e',
  },
  pauseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  startOverlay: {
    alignItems: 'center',
    marginTop: 40,
  },
  startTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#22d3ee',
    marginBottom: 40,
    textShadowColor: '#22d3ee',
    textShadowRadius: 15,
  },
  startButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  controlsHint: {
    color: '#94a3b8',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 20,
  },
  gameOverScore: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },
});
