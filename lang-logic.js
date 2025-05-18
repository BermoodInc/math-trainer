const wordsDB = {
  3: ['кот', 'дом', 'лес', 'рот', 'нос'],
  4: ['мама', 'папа', 'зима', 'лето', 'осень'],
  5: ['школа', 'дверь', 'окно', 'яблоко', 'солнце']
};

let currentWord = null;

// Инициализация
document.querySelectorAll('.length-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const length = parseInt(btn.dataset.length);
    startWordGame(length);
  });
});

// Начало игры
function startWordGame(length) {
  const words = wordsDB[length];
  currentWord = {
    word: words[Math.floor(Math.random() * words.length)],
    missingIndex: Math.floor(Math.random() * length)
  };
  
  renderWordCard();
}

// Отрисовка карточки
function renderWordCard() {
  const container = document.getElementById('lang-examples');
  const letters = currentWord.word.split('');
  letters[currentWord.missingIndex] = '?';

  const cardHTML = `
    <div class="word-card">
      <div class="word-display">
        ${letters.map((letter, index) => `
          <span class="letter-slot ${index === currentWord.missingIndex ? 'missing' : ''}">
            ${letter}
          </span>
        `).join('')}
      </div>
      <div class="letter-options">
        ${getLetterOptions().map(letter => `
          <div class="letter-option" data-letter="${letter}">
            ${letter}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = cardHTML;
  addLetterListeners();
}

// Получение вариантов букв
function getLetterOptions() {
  const correctLetter = currentWord.word[currentWord.missingIndex];
  const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  const options = [correctLetter];
  
  // Добавляем 3 случайные неправильные буквы
  while (options.length < 4) {
    const randomChar = String.fromCharCode(1072 + Math.floor(Math.random() * 32));
    if (!options.includes(randomChar) && randomChar !== correctLetter) {
      options.push(randomChar);
    }
  }
  
  return shuffleArray(options);
}

// Обработчики событий
function addLetterListeners() {
