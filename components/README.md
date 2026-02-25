# Component Architecture

This document describes the component-based architecture of the WordGuess game.

## Overview

The game is organized into modular components, each responsible for a specific aspect of the game functionality. This architecture provides:

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be easily reused or modified
- **Maintainability**: Code is organized and easier to understand
- **Testability**: Components can be tested independently

## Component Structure

```
components/
├── GameState.js        # Game state management and logic
├── GameGrid.js         # Grid display and animations
├── Keyboard.js         # On-screen keyboard component
├── Input.js            # Input field and validation
├── ScoreDisplay.js     # Score and best score display
├── Message.js          # Game messages and feedback
└── GameController.js   # Main controller (orchestrates all components)
```

## Component Details

### GameState.js
**Purpose**: Manages all game state and business logic

**Responsibilities**:
- Word selection and validation
- Guess checking algorithm
- Score calculation
- Hint generation
- LocalStorage management

**Key Methods**:
- `reset()` - Reset game state for new game
- `validateGuess(guess)` - Validate user input
- `checkGuess(guess)` - Check guess against secret word
- `submitGuess(guess)` - Process guess and update state
- `getHint()` - Generate hint (one per game)

**State Properties**:
- `secretWord` - Current word to guess
- `currentAttempt` - Current attempt number
- `guesses` - Array of all guesses
- `score` - Cumulative score
- `bestScore` - Best single-game score
- `gameOver` - Game end state

---

### GameGrid.js
**Purpose**: Manages the visual game grid

**Responsibilities**:
- Grid initialization
- Row updates with feedback colors
- Animation triggers (flip, shake)

**Key Methods**:
- `init()` - Initialize empty grid
- `updateRow(rowIndex, guess, feedback)` - Update row with guess and colors
- `shakeRow(rowIndex)` - Trigger shake animation for invalid guess
- `clear()` - Reset grid

**Features**:
- Staggered flip animations
- Color-coded feedback (green/yellow/gray)

---

### Keyboard.js
**Purpose**: Manages on-screen keyboard

**Responsibilities**:
- Keyboard rendering
- Key click handling
- Visual feedback (color coding)
- Enable/disable state

**Key Methods**:
- `init()` - Initialize keyboard layout
- `updateKeyStatus(letter, status)` - Update key color based on feedback
- `disable()` - Disable all keys (game over)
- `enable()` - Enable all keys (new game)
- `clear()` - Reset keyboard

**Callbacks**:
- `onKeyClick` - Called when letter key is clicked
- `onSubmit` - Called when Enter is clicked
- `onBackspace` - Called when Backspace is clicked

---

### Input.js
**Purpose**: Manages guess input field

**Responsibilities**:
- Input validation (length, characters)
- Submit handling
- Enable/disable state

**Key Methods**:
- `init()` - Initialize input handlers
- `getValue()` - Get current input value
- `clear()` - Clear input field
- `disable()` - Disable input (game over)
- `enable()` - Enable input (new game)

**Features**:
- Auto-uppercase conversion
- Character filtering (letters only)
- Length limiting (5 characters)
- Enter key support

---

### ScoreDisplay.js
**Purpose**: Manages score display

**Responsibilities**:
- Display current score
- Display best score
- Update score values

**Key Methods**:
- `updateScore(score)` - Update current score display
- `updateBestScore(bestScore)` - Update best score display

**Properties**:
- `score` - Current cumulative score
- `bestScore` - Best single-game score

---

### Message.js
**Purpose**: Manages game messages and feedback

**Responsibilities**:
- Display game messages
- Error messages
- Success messages
- Hint messages

**Key Methods**:
- `show(text, type)` - Show message with type (info/error/success/hint)
- `showWin(score)` - Show win message
- `showLose(secretWord)` - Show lose message
- `showAttempt(attempt, max)` - Show attempt counter
- `showHint(letter, position)` - Show hint message
- `showError(message)` - Show error message
- `reset()` - Reset to default message

**Message Types**:
- `info` - Default/informational (gray)
- `success` - Win message (green)
- `error` - Error/lose message (red)
- `hint` - Hint message (blue)

---

### GameController.js
**Purpose**: Main controller that orchestrates all components

**Responsibilities**:
- Component initialization
- Component coordination
- Event handling
- Game flow control

**Key Methods**:
- `constructor()` - Initialize all components
- `setupCallbacks()` - Setup component callbacks
- `init()` - Initialize new game
- `handleSubmit()` - Handle guess submission
- `handleWin(score)` - Handle win condition
- `handleLose()` - Handle lose condition
- `handleHint()` - Handle hint request
- `restart()` - Restart game

**Component Coordination**:
- Receives events from Input and Keyboard
- Updates GameState based on user actions
- Updates UI components (Grid, Keyboard, Message, ScoreDisplay)
- Manages game flow (win/lose/continue)

---

## Data Flow

```
User Input
    ↓
Input/Keyboard Component
    ↓
GameController.handleSubmit()
    ↓
GameState.validateGuess()
    ↓
GameState.submitGuess()
    ↓
GameController updates:
    - GameGrid (visual feedback)
    - Keyboard (key colors)
    - Message (status messages)
    - ScoreDisplay (score updates)
```

## Benefits of This Architecture

1. **Modularity**: Each component is independent and can be modified without affecting others
2. **Testability**: Components can be unit tested in isolation
3. **Scalability**: Easy to add new features or components
4. **Readability**: Clear separation makes code easier to understand
5. **Maintainability**: Changes are localized to specific components

## Usage Example

```javascript
// In main.js
import { GameController } from './components/GameController.js';

// Initialize game
const game = new GameController();

// Game is now running - all components are initialized and connected
```

## Extending the Architecture

To add new features:

1. **New Component**: Create a new component file (e.g., `Statistics.js`)
2. **Import**: Import in `GameController.js`
3. **Initialize**: Add to constructor
4. **Integrate**: Connect to game flow via callbacks or methods

Example:
```javascript
// In GameController.js
import { Statistics } from './Statistics.js';

constructor() {
    // ... existing code
    this.statistics = new Statistics('stats-container');
}
```

---

**Last Updated**: 2024  
**Architecture Version**: 1.0
