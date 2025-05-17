// Основные константы
const MAX_EXAMPLES = 30; // Максимальное количество примеров
let currentMin = 1;
let currentMax = 6;

// Генерация примеров с проверкой диапазона
function generateExamples() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    
    // Валидация ввода
    if (min >= max) {
        alert('Максимальное число должно быть больше минимального!');
        return;
    }
    
    currentMin = min;
    currentMax = max;
    
    const examplesContainer = document.getElementById('examples');
    examplesContainer.innerHTML = '';
    
    let generated = 0;
    while (generated < MAX_EXAMPLES) {
        const example = createValidExample(min, max);
        if (example) {
            examplesContainer.innerHTML += `
                <div class="example">
                    ${example}
                    <span class="hint" title="Нажмите для решения">🔍</span>
                </div>`;
            generated++;
        }
    }
    
    // Добавляем обработчики для подсказок
    document.querySelectorAll('.hint').forEach(hint => {
        hint.addEventListener('click', showSolution);
    });
}

// Создание корректного примера с проверкой диапазона
function createValidExample(min, max) {
    const types = [
        generateMissingNumber,   // Пропущенное число
        generateFullEquation,    // Полный пример
        generateMissingOperator  // Пропущенный оператор
    ];
    
    for (let i = 0; i < 10; i++) { // Попыток для генерации
        const example = types[Math.floor(Math.random() * types.length)](min, max);
        if (example && checkRange(example, min, max)) {
            return example;
        }
    }
    return null;
}

// Проверка всех чисел в примере
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
}

function showSolution(e) {
    const example = e.target.parentElement;
    const placeholder = example.querySelector('.placeholder');
    const equation = example.textContent;
    
    // Логика решения примера
    if (equation.includes('+')) {
        placeholder.textContent = equation.split('=')[1].trim() - equation.split('+')[1].split('=')[0].trim();
    } else if (equation.includes('-')) {
        placeholder.textContent = equation.split('=')[1].trim() + equation.split('-')[1].split('=')[0].trim();
    }
    
    e.target.remove();
}

// Инициализация подсказок
document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    const target = e.target.closest('.tooltip');
    
    if (target) {
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
        tooltip.textContent = target.dataset.title;
        tooltip.style.opacity = '1';
    } else {
        tooltip.style.opacity = '0';
    }
});

// Первоначальная генерация
generateExamples();
