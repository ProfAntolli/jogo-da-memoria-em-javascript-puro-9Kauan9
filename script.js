const images = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png',
    'img5.png', 'img6.png'
  ];
  
  const gameContainer = document.querySelector('.memory-game');
  
  // Duplicar e embaralhar as imagens
  let cards = [...images, ...images].sort(() => 0.5 - Math.random());
  
  cards.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
  
    card.innerHTML = `
      <img class="front-face" src="img/${img}" alt="Carta">
      <div class="back-face">❓</div>
    `;
  
    gameContainer.appendChild(card);
  });
  
  // Lógica de virar cartas
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
  
    checkForMatch();
  }
  
  function checkForMatch() {
    const isMatch = firstCard.querySelector('.front-face').src ===
                    secondCard.querySelector('.front-face').src;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
  
  // Adiciona evento de clique a todas as cartas
  document.querySelectorAll('.memory-card').forEach(card =>
    card.addEventListener('click', flipCard)
  );