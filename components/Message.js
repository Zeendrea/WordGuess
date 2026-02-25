/**
 * Message Component - Manages game messages
 */
export class Message {
    constructor(messageId) {
        this.messageEl = document.getElementById(messageId);
    }
    
    show(text, type = 'info') {
        this.messageEl.textContent = text;
        
        switch(type) {
            case 'success':
                this.messageEl.style.color = '#6aaa64';
                break;
            case 'error':
                this.messageEl.style.color = '#e74c3c';
                break;
            case 'hint':
                this.messageEl.style.color = '#667eea';
                break;
            default:
                this.messageEl.style.color = '#333';
        }
    }
    
    showWin(score) {
        this.show(`🎉 You Win! Click Restart to play again. Score: +${score}`, 'success');
    }
    
    showLose(secretWord) {
        this.show(`❌ Game Over! The word was: ${secretWord}. Click Restart to try again.`, 'error');
    }
    
    showAttempt(attempt, maxAttempts) {
        this.show(`Attempt ${attempt} of ${maxAttempts}`, 'info');
    }
    
    showHint(letter, position) {
        this.show(`💡 Hint: Letter "${letter}" is in position ${position} (One hint per game)`, 'hint');
    }
    
    showError(message) {
        this.show(message, 'error');
    }
    
    reset(wordLength = 5) {
        this.show(`Guess the ${wordLength}-letter word!`, 'info');
    }
}