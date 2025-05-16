class CartaMayor {
  constructor() {
    this.drawButton = document.getElementById('drawButton');
    this.playerCardEl = document.getElementById('playerCard');
    this.computerCardEl = document.getElementById('computerCard');
    this.resultText = document.getElementById('result');

    // Nombres exactos de las subcarpetas
    this.suits = ['corazones', 'diamantes', 'picas', 'treboles'];

    // Sonidos para el resultado
    this.sounds = {
      win: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_4f4d0d7f2a.mp3'),
      lose: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_2eb1943c1e.mp3'),
      draw: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_42cf3a7cf8.mp3')
    };

    this.drawButton.addEventListener('click', () => this.drawCards());
  }

  getCardImagePath(value, suit) {
    return `cartasMayores/${suit}/${value}.jpg`;
  }

  animateCard(element) {
    element.classList.add('flip');
    setTimeout(() => element.classList.remove('flip'), 500);
  }

  drawCards() {
    const player = this.getRandomCard();
    const computer = this.getRandomCard();

    this.animateCard(this.playerCardEl);
    this.animateCard(this.computerCardEl);

    this.playerCardEl.src = this.getCardImagePath(player.value, player.suit);
    this.computerCardEl.src = this.getCardImagePath(computer.value, computer.suit);

    if (player.value > computer.value) {
      this.resultText.textContent = '¡Ganaste!';
      this.sounds.win.play();
    } else if (player.value < computer.value) {
      this.resultText.textContent = 'Perdiste...';
      this.sounds.lose.play();
    } else {
      this.resultText.textContent = 'Empate';
      this.sounds.draw.play();
    }
  }

  getRandomCard() {
    const value = Math.floor(Math.random() * 13) + 1; // 1 a 13
    const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
    return { value, suit };
  }
}

new CartaMayor();
