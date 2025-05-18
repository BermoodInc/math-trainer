// База слов
const wordsDB = {
    3: ['кот', 'дом', 'лес', 'нос', 'рот'],
    4: ['книга', 'стол', 'зима', 'лето', 'мама'],
    5: ['школа', 'дверь', 'окно', 'яблоко', 'солнце']
};

let currentWord = null;

document.querySelectorAll('.length-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const length = parseInt(this.dataset.length);
        showWordCard(length);
    });
});

function showWordCard(length) {
    const word = getRandomWord(length);
    currentWord = {
        word: word,
        missingIndex: Math.floor(Math.random() * length)
    };
    
    renderWordCard();
}

function renderWordCard() {
    // Отрисовка карточки с пропущенной буквой
    // ... (полный код с обработкой выбора букв)
}
