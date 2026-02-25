# Standard Operating Procedure (SOP)
## WordGuess Game - Development and Usage Guide

---

## 1. Project Overview

**Project Name:** WordGuess  
**Type:** Web-based Word Guessing Game  
**Technology Stack:** Vanilla JavaScript, HTML5, CSS3, Vite  
**Version:** 1.0.0

### Purpose
WordGuess is a Wordle-style word guessing game that challenges players to guess a 5-letter word within 6 attempts. The game provides visual feedback through color-coded tiles and includes features like hints, scoring, and persistent best score tracking.

---

## 2. Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd Knowles
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs Vite and all required development dependencies.

3. **Start development server**
   ```bash
   npm start
   ```
   or
   ```bash
   npm run dev
   ```

4. **Access the game**
   - Open browser and navigate to `http://localhost:5173`
   - The port may vary if 5173 is occupied (check terminal output)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

---

## 3. Game Rules and Mechanics

### Core Rules

1. **Objective:** Guess the 5-letter secret word within 6 attempts
2. **Input:** Only 5-letter words from the game's dictionary are accepted
3. **Feedback Colors:**
   - 🟢 **Green:** Correct letter in correct position
   - 🟡 **Yellow:** Correct letter in wrong position
   - ⚫ **Gray:** Letter not in the word

### Special Features

#### Hint System
- **Availability:** One hint per game
- **Functionality:** Reveals one random letter position
- **Usage:** Click the "💡 Hint" button
- **Restriction:** Button becomes disabled after use
- **Reset:** Hint resets when starting a new game

#### Scoring System
- **Calculation:** Points = (6 - attempts used + 1) × 10
- **Examples:**
  - Win in 1 attempt = 60 points
  - Win in 3 attempts = 40 points
  - Win in 6 attempts = 10 points
- **Score Types:**
  - **Current Score:** Cumulative across all games
  - **Best Score:** Highest single-game score (saved in localStorage)

#### End-Game Conditions

**Win:**
- Player correctly guesses the word
- Input and keyboard are disabled
- Message: "🎉 You Win! Click Restart to play again."
- Score is added to cumulative total
- Best score is updated if current game score exceeds it

**Lose:**
- Player fails to guess after 6 attempts
- Input and keyboard are disabled
- Message: "❌ Game Over! The word was: [WORD]. Click Restart to try again."
- No points awarded

---

## 4. Technical Architecture

### File Structure

```
Knowles/
├── index.html          # Main HTML structure
├── style.css           # Game styling and animations
├── main.js            # Game logic and state management
├── package.json       # Project dependencies
├── README.md          # User documentation
├── SOP.md            # This file
└── TeamMembers.md     # Team information
```

### Key Components

#### main.js
- **Game State Management:** Tracks secret word, attempts, guesses, scores
- **Validation:** Word length, character validation, dictionary checking
- **Feedback Algorithm:** Two-pass system for correct/present/absent detection
- **UI Updates:** Grid rendering, keyboard state, message display
- **LocalStorage:** Best score persistence

#### style.css
- **Responsive Design:** Mobile-friendly layout
- **Animations:**
  - Pop animation for filled cells
  - Flip animation for tile reveals
  - Shake animation for invalid guesses
- **Color Scheme:** Green/Yellow/Gray feedback system

#### index.html
- **Structure:** Header, game grid, input, keyboard, rules
- **Accessibility:** Semantic HTML, proper labels

---

## 5. Game Logic Details

### Word Selection
- Random selection from predefined word array (50+ words)
- Words are 5 letters, all uppercase
- No duplicate words in a single session

### Guess Validation Process

1. **Length Check:** Must be exactly 5 characters
2. **Character Check:** Only alphabetic characters allowed
3. **Dictionary Check:** Word must exist in WORDS array
4. **Error Handling:** Clear error messages for each validation failure

### Feedback Algorithm

**Two-Pass System:**

1. **First Pass (Correct Positions):**
   - Compare each letter position
   - Mark exact matches as 'correct'
   - Mark matched letters as used (null)

2. **Second Pass (Present Letters):**
   - Check remaining letters for presence in word
   - Mark as 'present' if found (wrong position)
   - Mark matched letters as used (null)

3. **Remaining Letters:**
   - All unmatched letters marked as 'absent'

### Keyboard State Management

- **Visual Feedback:** Keys change color based on letter status
- **Priority System:** Correct > Present > Absent
- **Disabled State:** Keys disabled after game ends
- **Re-enable:** Keyboard re-enabled on restart

---

## 6. State Management

### Game State Variables

```javascript
secretWord: string          // Current word to guess
currentAttempt: number      // Current attempt (0-5)
guesses: array             // Array of guess objects
score: number             // Cumulative score
currentGameScore: number  // Current game's score
bestScore: number         // Best single-game score
gameOver: boolean         // Game end state
hintUsed: boolean         // Hint usage flag
```

### LocalStorage Usage

- **Key:** `'bestScore'`
- **Value:** Highest single-game score (number)
- **Persistence:** Survives browser refresh/close
- **Initialization:** Loaded on game start

---

## 7. User Interface Features

### Visual Elements

1. **Game Grid:** 6 rows × 5 columns
2. **Input Field:** Real-time validation, uppercase conversion
3. **On-Screen Keyboard:** Visual feedback, clickable keys
4. **Score Display:** Current and best score
5. **Message Area:** Game status, hints, errors
6. **Control Buttons:** Hint, Restart

### Animations

- **Pop:** Cell fill animation (0.2s)
- **Flip:** Tile reveal animation (0.6s, staggered)
- **Shake:** Invalid guess feedback (0.5s)

### Responsive Design

- Mobile-friendly layout
- Adaptive font sizes
- Flexible grid spacing
- Touch-friendly buttons

---

## 8. Error Handling

### Input Validation Errors

1. **Insufficient Length:** "Please enter exactly 5 letters!"
2. **Invalid Characters:** "Only letters are allowed!"
3. **Not in Dictionary:** "Word not in dictionary! Try another word."

### Visual Error Feedback

- Red error messages
- Shake animation on invalid row
- Input field cleared after error

---

## 9. Testing Checklist

### Functional Testing

- [ ] Word selection is random
- [ ] Guess validation works correctly
- [ ] Feedback colors match letter status
- [ ] Score calculation is accurate
- [ ] Best score saves and loads correctly
- [ ] Hint works once per game
- [ ] Keyboard disables after game end
- [ ] Restart resets game state properly
- [ ] Input disables after win/lose
- [ ] Animations trigger correctly

### Edge Cases

- [ ] Empty input submission
- [ ] Invalid word submission
- [ ] Hint after all letters revealed
- [ ] Multiple rapid submissions
- [ ] Browser refresh during game
- [ ] LocalStorage unavailable

---

## 10. Deployment

### Production Build

1. Run `npm run build`
2. Deploy `dist/` folder contents to web server
3. Ensure server supports SPA routing (if using client-side routing)

### Environment Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage support (for best score)

---

## 11. Maintenance

### Adding New Words

Edit `WORDS` array in `main.js`:
```javascript
const WORDS = [
    'APPLE', 'BRAVE', // ... existing words
    'NEWWORD' // Add new word here
];
```

### Modifying Scoring

Edit score calculation in `handleSubmit()` function:
```javascript
currentGameScore = (MAX_ATTEMPTS - attemptsUsed + 1) * 10;
```

### Styling Changes

All styles in `style.css`. Key sections:
- `.grid-cell` - Tile styling
- `.key` - Keyboard styling
- Animations - `@keyframes` rules

---

## 12. Troubleshooting

### Common Issues

**Game not starting:**
- Check browser console for errors
- Verify Vite server is running
- Check port availability

**Score not saving:**
- Verify localStorage is enabled
- Check browser privacy settings
- Clear browser cache if needed

**Animations not working:**
- Verify CSS is loaded
- Check browser compatibility
- Disable browser extensions that might interfere

---

## 13. Future Enhancements

### Potential Features

1. Difficulty levels (4-letter, 6-letter words)
2. Daily challenge mode
3. Statistics tracking (games played, win rate)
4. Share results functionality
5. Theme customization
6. Sound effects
7. Multiplayer mode

---

## 14. Contact and Support

For issues or questions:
- Check README.md for user documentation
- Review code comments in main.js
- Check browser console for error messages

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Development Team
