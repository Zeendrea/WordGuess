/**
 * Keyboard Component - Manages on-screen keyboard
 */
export class Keyboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.onKeyClick = null;
        this.onSubmit = null;
        this.onBackspace = null;
        this.init();
    }
    
    init() {
        this.container.innerHTML = '';
        
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];
        
        rows.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            
            // Add Enter key for last row
            if (rowIndex === 2) {
                const enterKey = document.createElement('button');
                enterKey.className = 'key wide';
                enterKey.textContent = 'Enter';
                enterKey.disabled = false;
                enterKey.addEventListener('click', () => {
                    if (this.onSubmit) this.onSubmit();
                });
                rowDiv.appendChild(enterKey);
            }
            
            row.forEach(letter => {
                const key = document.createElement('button');
                key.className = 'key';
                key.textContent = letter;
                key.dataset.letter = letter;
                key.disabled = false;
                key.addEventListener('click', () => {
                    if (this.onKeyClick) this.onKeyClick(letter);
                });
                rowDiv.appendChild(key);
            });
            
            // Add Backspace for last row
            if (rowIndex === 2) {
                const backspaceKey = document.createElement('button');
                backspaceKey.className = 'key wide';
                backspaceKey.textContent = '⌫';
                backspaceKey.disabled = false;
                backspaceKey.addEventListener('click', () => {
                    if (this.onBackspace) this.onBackspace();
                });
                rowDiv.appendChild(backspaceKey);
            }
            
            this.container.appendChild(rowDiv);
        });
    }
    
    updateKeyStatus(letter, status) {
        const key = document.querySelector(`[data-letter="${letter}"]`);
        if (!key) return;
        
        // Priority: correct > present > absent
        if (status === 'correct') {
            key.classList.remove('absent', 'present');
            key.classList.add('correct');
        } else if (status === 'present' && !key.classList.contains('correct')) {
            key.classList.remove('absent');
            key.classList.add('present');
        } else if (status === 'absent' && 
                   !key.classList.contains('correct') && 
                   !key.classList.contains('present')) {
            key.classList.add('absent');
        }
    }
    
    disable() {
        const keys = this.container.querySelectorAll('.key');
        keys.forEach(key => {
            key.disabled = true;
            if (!key.classList.contains('correct') && !key.classList.contains('present')) {
                key.style.opacity = '0.5';
            }
            key.style.cursor = 'not-allowed';
        });
    }
    
    enable() {
        const keys = this.container.querySelectorAll('.key');
        keys.forEach(key => {
            key.disabled = false;
            key.style.cursor = 'pointer';
            if (!key.classList.contains('correct') && 
                !key.classList.contains('present') && 
                !key.classList.contains('absent')) {
                key.style.opacity = '1';
            }
        });
    }
    
    clear() {
        this.init();
    }
}
