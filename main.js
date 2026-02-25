/**
 * Main entry point for the Wordle game
 */
import { GameController } from './components/GameController.js';

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
});