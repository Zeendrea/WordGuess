document.addEventListener('DOMContentLoaded', ()=>{
  const diff = localStorage.getItem('difficulty');
  if(!diff){
    // not allowed, go back to landing
    window.location.href = 'index.html';
    return;
  }
  document.getElementById('difficulty-label').textContent = diff.toUpperCase();

  document.getElementById('start-game').addEventListener('click', ()=>{
    window.location.href = 'game.html';
  });
});
