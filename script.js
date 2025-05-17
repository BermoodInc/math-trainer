// Основные настройки
const MAX_EXAMPLES = 30;
const generatedExamples = new Set(); // Для отслеживания уникальности
let currentMin = 1;
let currentMax = 6;

// Главная функция генерации
function generateExamples() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    
    // Сброс при изменении диапазона
    if (min !== currentMin || max !== currentMax) {
        generatedExamples.clear();
        currentMin = min;
        currentMax = max;
    }
    
    // Валидация
    if (min >= max) {
        alert('Максимальное число должно быть больше минимального! 🦁');
        return;
    }
    
    const examplesContainer = document.getElementById('examples');
    examplesContainer.innerHTML = '';
    
    let generated = 0;
    let attempts = 0;
    
    while (generated < MAX_EXAMPLES && attempts < 100) {
        const example = createValidExample(min, max);
        attempts++;
        
        if (example && !generatedExamples.has(example)) {
            examplesContainer.innerHTML += `
                <div class="example">
                    ${example}
                </div>`;
            generatedExamples.add(example);
            generated++;
            attempts = 0;
        }
    }
    
    if (generated < MAX_EXAMPLES) {
        alert(`Не удалось создать все уникальные примеры 😿
Создано: ${generated} из ${MAX_EXAMPLES}`);
    }
}

// Создание примера с проверкой
function createValidExample(min, max) {
    const generators = [
        generateMissingNumber,
        generateFullEquation,
        generateMissingOperator
    ];
    
    for (let i = 0; i < 10; i++) {
        const example = generators[Math.floor(Math.random() * generators.length)](min, max);
        if (example && checkRange(example, min, max)) {
            return example;
        }
    }
    return null;
}

// Проверка диапазона
function checkRange(example, min, max) {
    const numbers = example.match(/\d+/g) || [];
    return numbers.every(num => {
        const n = parseInt(num);
        return n >= min && n <= max;
    });
}

// Генераторы примеров
function generateMissingNumber(min, max) {
    const a = randomInt(min, max);
    const result = randomInt(min, max);
    const b = result - a;
    
    if (b >= min && b <= max) {
        return `<div class="placeholder"></div> + ${a} = ${result}`;
    }
    return null;
}

function generateFullEquation(min, max) {
    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const op = Math.random() > 0.5 ? '+' : '-';
    const result = op === '+' ? a + b : a - b;
    
    if (result >= min && result <= max) {
        return `${a} ${op} ${b} = <div class="placeholder"></div>`;
    }
    return null;
}

function generateMissingOperator(min, max) {
    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const result = randomInt(min, max);
    
    if (a + b === result) {
        return `${a} <div class="placeholder"></div> ${b} = ${result}`;
    }
    if (a - b === result) {
        return `${a} <div class="placeholder"></div> ${b} = ${result}`;
    }
    return null;
}

// Вспомогательные функции
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearExamples() {
    document.getElementById('examples').innerHTML = '';
    generatedExamples.clear();
}

// Запуск при загрузке
generateExamples();
