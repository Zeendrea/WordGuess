document.addEventListener('DOMContentLoaded', ()=>{
  let selectedDifficulty = null;

  const buttons = document.querySelectorAll('.difficulty');
  buttons.forEach(b=>{
    b.addEventListener('click', ()=>{
      const d = b.dataset.difficulty;
      if(!d) return;
      // visual feedback then redirect to instructions
      buttons.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      selectedDifficulty = d;
      window.location.href = `instructions.html?difficulty=${selectedDifficulty}`;
    });
  });
});
