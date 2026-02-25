
# WordGuess - Word Guessing Game

A Wordle-style word guessing game built with vanilla JavaScript and Vite.

## Features

- 🎮 Classic word guessing mechanics (5-letter words, 6 attempts)
- 🎨 Color-coded feedback (Green/Yellow/Gray)
- ⌨️ On-screen keyboard with visual feedback
- 💡 Hint system (reveals one letter position)
- 📊 Score tracking with best score persistence
- 🔄 Restart functionality
- 📱 Responsive design

## Setup Instructions

### 1. Initialize the Project

```bash
npm install
```

This will install Vite and all necessary dependencies.

### 2. Run the Game

Start the development server:

```bash
npm start
```

Or alternatively:

```bash
npm run dev
```

The game will be available at `http://localhost:5173` (or the port shown in the terminal).

### 3. Build for Production (Optional)

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
word-guess-game/
├── index.html          # Main HTML file
├── style.css           # Game styles
├── main.js            # Entry point (initializes GameController)
├── components/        # Component-based architecture
│   ├── GameState.js   # Game state management
│   ├── GameGrid.js    # Grid display component
│   ├── Keyboard.js    # On-screen keyboard component
│   ├── Input.js       # Input field component
│   ├── ScoreDisplay.js # Score display component
│   ├── Message.js     # Message display component
│   ├── GameController.js # Main controller
│   └── README.md      # Component architecture docs
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

### Component Architecture

The game uses a modular component-based architecture for better organization and maintainability. Each component handles a specific aspect of the game:

- **GameState**: Manages game logic, validation, and state
- **GameGrid**: Handles visual grid and animations
- **Keyboard**: Manages on-screen keyboard
- **Input**: Handles user input
- **ScoreDisplay**: Manages score display
- **Message**: Handles game messages
- **GameController**: Orchestrates all components

See `components/README.md` for detailed component documentation.

## How to Play

1. **Objective**: Guess the 5-letter secret word in 6 attempts or fewer.

2. **Feedback Colors**:
   - 🟢 **Green**: Correct letter in the correct position
   - 🟡 **Yellow**: Correct letter but in the wrong position
   - ⚫ **Gray**: Letter is not in the word

3. **Features**:
   - Type your guess in the input field or use the on-screen keyboard
   - Press Enter or click Submit to submit your guess
   - Use the Hint button to reveal one letter position (one-time use per game)
   - Your score increases based on how few attempts you use
   - Best score is saved in your browser's localStorage

4. **Scoring**:
   - Points = (6 - attempts used) × 10
   - Example: Guessing in 3 attempts = 30 points

## Game Logic Explanation

### Word Selection
- A random word is selected from a predefined array of 5-letter words on game start

### Guess Validation
- Checks that the guess is exactly 5 letters
- Validates that only alphabetic characters are used

### Feedback Algorithm
1. **First Pass**: Identifies letters in correct positions (marked as 'correct')
2. **Second Pass**: Identifies correct letters in wrong positions (marked as 'present')
3. **Remaining**: All other letters are marked as 'absent'

### State Management
- Game state tracks current attempt, guesses history, and game over status
- Score persists across games using localStorage
- Best score is saved and displayed

## Custom Features

1. **Score System**: Points awarded based on attempts used, with best score tracking
2. **Hint Button**: Reveals one random letter position (one-time use per game)
3. **Visual Keyboard**: On-screen keyboard that shows which letters have been used and their status

## Browser Compatibility

Works on all modern browsers that support ES6+ JavaScript and CSS Grid.

## License

Free to use and modify for personal or educational purposes.
