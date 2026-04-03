# Tetritamar - Tetris for Android

A classic Tetris game built with React Native and Expo.

## Features

- Classic Tetris gameplay
- Responsive board sizing
- On-screen touch controls
- Score, lines, level tracking
- Pause/Resume
- Game Over screen with restart
- Neon dark theme

## Project Structure

```
Tetritamar/
├── App.tsx                     # Main app component
├── app.json                    # Expo config (package: com.tetritamar.tetris)
├── src/
│   └── tetris/
│       ├── constants.ts       # COLS, ROWS, Piece shapes, COLORS
│       ├── gameLogic.ts       # Pure game logic (collision, rotate, clear)
│       ├── hooks/
│       │   └── useTetrisGame.ts  # Game hook (state, loop, controls)
│       └── components/
│           ├── TetrisBoard.tsx   # Game board grid (Views)
│           ├── NextPiece.tsx     # Preview of next piece
│           ├── Controls.tsx      # On-screen buttons
│           └── StatsPanel.tsx    # Score, lines, level
├── assets/                     # App icons and splash (defaults provided)
├── package.json
└── tsconfig.json
```

## How to Run in Development

1. Install dependencies:

```bash
npm install
```

2. Start Expo development server:

```bash
npx expo start
```

3. Install Expo Go on your Android device.
4. Scan the QR code with Expo Go to run the app.

## Building the APK

You can create a standalone APK using EAS Build.

### Prerequisites

- Node.js and npm installed
- Expo CLI: `npm install -g expo-cli`
- An Expo account (free)

### Steps

```bash
# Log in to Expo (opens browser)
npx expo login

# Install EAS CLI (if not installed)
npm install -g eas-cli

# Configure project for build (accept defaults)
eas build:configure

# Build for Android (production)
eas build --platform android --profile production
```

The build will run in the cloud. When finished, you'll get a URL to download the APK/AAB.

You can also build a development APK for testing:

```bash
eas build --platform android --profile development
```

## Game Controls

- **← →** : Move piece left/right
- **↓** : Soft drop (move down faster)
- **↻** : Rotate piece
- **DROP** : Hard drop (instant fall)
- **PAUSE/RESUME** : Toggle pause

You can also use keyboard on devices with physical keyboards.

## Configuration

- Package name: `com.tetritamar.tetris`
- Version: 1.0.0
- Orientation: portrait

## Customization

- Colors defined in `src/tetris/constants.ts`
- Game parameters (points per line, speed curve) in `src/tetris/hooks/useTetrisGame.ts`
- UI layout in `App.tsx` and component files

## License

MIT
