/**
 * LandingPage Component - Manages the landing page/modal
 */
export class LandingPage {
    constructor(landingPageId) {
        this.landingPage = document.getElementById(landingPageId);
        this.onStartGame = null;
        this.init();
    }
    
    init() {
        // Show landing page on initialization
        this.show();
        
        // Setup difficulty buttons
        const difficultyBtns = this.landingPage.querySelectorAll('.difficulty-btn');
        let selectedDifficulty = 'medium'; // Default
        
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                difficultyBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                selectedDifficulty = btn.dataset.difficulty;
                
                // Update selected difficulty display
                const selectedEl = this.landingPage.querySelector('#selected-difficulty');
                if (selectedEl) {
                    const difficultyNames = {
                        easy: 'Easy',
                        medium: 'Medium',
                        hard: 'Hard'
                    };
                    selectedEl.innerHTML = `Selected: <strong>${difficultyNames[selectedDifficulty]}</strong>`;
                }
                
                // Store selected difficulty
                this.selectedDifficulty = selectedDifficulty;
            });
        });
        
        // Set default (Medium) as active
        if (difficultyBtns.length > 1) {
            difficultyBtns[1].classList.add('active'); // Medium is second button
        }
        this.selectedDifficulty = 'medium';
        
        // Setup start button
        const startBtn = this.landingPage.querySelector('#start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.hide();
                if (this.onStartGame) {
                    this.onStartGame(this.selectedDifficulty);
                }
            });
        }
    }
    
    show() {
        if (this.landingPage) {
            this.landingPage.classList.add('active');
        }
        // Prevent body scroll and add class for CSS
        document.body.style.overflow = 'hidden';
        document.body.classList.add('landing-active');
    }
    
    hide() {
        if (this.landingPage) {
            this.landingPage.classList.remove('active');
        }
        // Restore body scroll and remove class
        document.body.style.overflow = '';
        document.body.classList.remove('landing-active');
    }
    
    isVisible() {
        return this.landingPage && this.landingPage.classList.contains('active');
    }
}