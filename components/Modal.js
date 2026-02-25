/**
 * Modal Component - Manages the "How to Play" modal popup
 */
export class Modal {
    constructor(modalId, overlayId) {
        this.modal = document.getElementById(modalId);
        this.overlay = document.getElementById(overlayId);
        this.onStart = null;
        this.init();
    }
    
    init() {
        // Show modal on initialization
        this.show();
        
        // Setup difficulty buttons
        const difficultyBtns = this.modal.querySelectorAll('.difficulty-btn');
        let selectedDifficulty = 'medium'; // Default
        
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                difficultyBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                selectedDifficulty = btn.dataset.difficulty;
                
                // Update selected difficulty display
                const selectedEl = this.modal.querySelector('#selected-difficulty');
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
        const startBtn = this.modal.querySelector('#start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.hide();
                if (this.onStart) {
                    this.onStart(this.selectedDifficulty);
                }
            });
        }
        
        // Close on overlay click (optional - can be disabled)
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    // Optional: prevent closing on overlay click
                    // this.hide();
                }
            });
        }
    }
    
    show() {
        if (this.modal) {
            this.modal.classList.add('active');
        }
        if (this.overlay) {
            this.overlay.classList.add('active');
        }
        // Prevent body scroll and add class for CSS
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-active');
    }
    
    hide() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
        // Restore body scroll and remove class
        document.body.style.overflow = '';
        document.body.classList.remove('modal-active');
    }
    
    isVisible() {
        return this.modal && this.modal.classList.contains('active');
    }
}
