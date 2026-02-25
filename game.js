// Basic Wordle-like engine: 5-letter words, 6 rows
document.addEventListener('DOMContentLoaded', ()=>{
  const difficulty = localStorage.getItem('difficulty');
  if(!difficulty){ window.location.href = 'index.html'; return; }
  document.getElementById('difficulty-show').textContent = difficulty.toUpperCase();

  const WORDS = {
    easy: ['APPLE','CHASE','BRAVE','PLANT','RIVER','LIGHT','SMILE','GLOWY'],
    medium: ['TABLE','CIVIC','GRAIN','SWEAR','TRACK','RHYME','CLOUD'],
    hard: ['QUICK','ZEBRA','PIXEL','JUMBO','VIXEN','CRYPT','NYMPH']
  };

  const secret = pickWord(difficulty);
  const rows = 6, cols = 5;
  let curRow = 0, curCol = 0, finished=false;

  const boardEl = document.getElementById('board');

  buildBoard();
  window.addEventListener('keydown', handleKey);

  function pickWord(d){
    const arr = WORDS[d] || WORDS.medium;
    return arr[Math.floor(Math.random()*arr.length)];
  }

  function buildBoard(){
    boardEl.innerHTML = '';
    for(let r=0;r<rows;r++){
      const row = document.createElement('div'); row.className='row';
      for(let c=0;c<cols;c++){
        const t = document.createElement('div'); t.className='tile'; t.dataset.r=r; t.dataset.c=c; t.setAttribute('aria-hidden','false');
        row.appendChild(t);
      }
      boardEl.appendChild(row);
    }
  }

  // On-screen keyboard removed; physical keyboard remains supported.

  function handleKey(e){
    if(finished) return;
    const k = (e.key || '').toString();
    if(/^([a-zA-Z])$/.test(k)){
      addLetter(k.toUpperCase());
      return;
    }
    if(k==='Backspace'){
      deleteLetter();return;
    }
    if(k==='Enter'){
      submitGuess();return;
    }
  }

  function tileAt(r,c){ return boardEl.children[r].children[c]; }

  function addLetter(letter){
    if(curCol>=cols) return;
    const t = tileAt(curRow, curCol);
    t.textContent = letter; t.dataset.letter = letter; curCol++;
  }

  function deleteLetter(){
    if(curCol<=0) return; curCol--; const t = tileAt(curRow, curCol); t.textContent=''; delete t.dataset.letter;
  }

  function submitGuess(){
    if(curCol!==cols) return; // not full
    const guess = Array.from(boardEl.children[curRow].children).map(x=>x.dataset.letter||'').join('');
    if(guess.length!==cols) return;
    evaluateGuess(guess);
  }

  function evaluateGuess(guess){
    const secretArr = secret.split('');
    const result = Array(cols).fill('absent');
    // first pass correct
    for(let i=0;i<cols;i++){
      const letter = guess[i];
      if(secret[i]===letter){ result[i]='correct'; secretArr[i]=null; }
    }
    // second pass present
    for(let i=0;i<cols;i++){
      if(result[i]==='correct') continue;
      const letter = guess[i];
      const idx = secretArr.indexOf(letter);
      if(idx>-1){ result[i]='present'; secretArr[idx]=null; }
    }

    // animate tiles
    for(let i=0;i<cols;i++){
      const tile = tileAt(curRow,i);
      (function(t,cls,letter){
        t.classList.add('flip');
        setTimeout(()=>{
          t.classList.remove('flip');
          t.classList.add(cls);
        }, 180 + i*120);
        // no on-screen keyboard to update
      })(tile, result[i], guess[i]);
    }

    // finish row
    setTimeout(()=>{
      if(guess===secret){ finished=true; setTimeout(()=>alert('Nice! You guessed it: '+secret),300); }
      else if(curRow+1>=rows){ finished=true; setTimeout(()=>alert('Out of guesses — answer: '+secret),300); }
      else{ curRow++; curCol=0; }
    }, 260 + cols*120);
  }

  function updateKey(letter,cls){
    const keys = keyboardEl.querySelectorAll('.key');
    keys.forEach(k=>{ if(k.dataset.key===letter){
      // upgrade class precedence: correct > present > absent
      if(k.classList.contains('correct')) return;
      if(cls==='correct'){ k.classList.remove('present','absent'); k.classList.add('correct'); }
      else if(cls==='present' && !k.classList.contains('present')){ if(!k.classList.contains('correct')){ k.classList.add('present'); }}
      else if(cls==='absent' && !k.classList.contains('present') && !k.classList.contains('correct')){ k.classList.add('absent'); }
    }});
  }

});
