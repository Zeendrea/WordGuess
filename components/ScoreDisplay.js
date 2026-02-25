/**
 * ScoreDisplay Component - Manages score display
 */
export class ScoreDisplay {
    constructor(scoreId, bestScoreId) {
        this.scoreEl = document.getElementById(scoreId);
        this.bestScoreEl = document.getElementById(bestScoreId);
        this.score = 0;
        this.bestScore = 0;
    }
    
    updateScore(score) {
        this.score = score;
        this.scoreEl.textContent = score;
    }
    
    updateBestScore(bestScore) {
        this.bestScore = bestScore;
        this.bestScoreEl.textContent = bestScore;
    }
    
    reset() {
        // Don't reset cumulative score, only display
        // Score persists across games
    }
}