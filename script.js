// Основная функция генерации
function generateExamples() {
    // Получаем значения из полей ввода
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    
    // Проверка валидности диапазона
    if (min >= max) {
        alert('Максимальное число должно быть больше минимального!');
        return;
    }

    // Очищаем предыдущие примеры
    const examplesContainer = document.getElementById('examples');
    examplesContainer.innerHTML = '';
    
    // Генерируем 40 примеров
    for (let i = 0; i < 40; i++) {
        const example = createSingleExample(min, max);
        examplesContainer.innerHTML += `<div class="example">${example}</div>`;
    }
}

// Создание одного примера
function createSingleExample(min, max) {
    // Выбираем случайный тип примера (0-2)
    const type = Math.floor(Math.random() * 3);
    
    // Генерируем числа для примера
    const a = randomInt(min, max);
    const b = randomInt(min, max);
    
    switch(type) {
        case 0: // Обычный пример: a + b = []
            return `${a} + ${b} = []`;
            
        case 1: // Пример с пропущенным числом: [] + a = b
            const c = a + b;
            return `[] + ${a} = ${c}`;
            
        case 2: // Пример с пропущенным оператором: a [] b = c
            const operator = Math.random() > 0.5 ? '+' : '-';
            const result = operator === '+' ? a + b : a - b;
            return `${a} [] ${b} = ${result}`;
    }
}

// Генерация случайного целого числа
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
