let mathState = {
    examples: new Set(),
    currentMode: 'list'
};

function generateMathExamples(mode) {
    mathState.currentMode = mode;
    const min = parseInt(document.getElementById('math-min').value);
    const max = parseInt(document.getElementById('math-max').value);
    
    // Генерация примеров с проверкой диапазона
    const examples = generateValidExamples(min, max);
    
    // Отрисовка
    renderMathExamples(examples);
}

function renderMathExamples(examples) {
    const container = document.getElementById('math-examples');
    container.innerHTML = '';
    
    if(mathState.currentMode === 'list') {
        // Режим списка с группировкой
        const groups = {
            missingFirst: [],
            missingSecond: [],
            missingOperator: []
        };
        
        examples.forEach(ex => {
            if(ex.includes('+') || ex.includes('-')) {
                if(ex.startsWith('?')) groups.missingFirst.push(ex);
                else if(ex.includes('?')) groups.missingSecond.push(ex);
                else groups.missingOperator.push(ex);
            }
        });
        
        // Отрисовка групп
        renderGroup('Пропущено первое число', groups.missingFirst);
        renderGroup('Пропущено второе число', groups.missingSecond);
        renderGroup('Пропущен оператор', groups.missingOperator);
    } else {
        // Интерактивный режим
        examples.forEach((ex, index) => {
            const card = createInteractiveCard(ex, index);
            container.appendChild(card);
        });
    }
}

function createInteractiveCard(example, index) {
    // Реализация интерактивного решения
    // ... (полный код с обработкой ввода)
}
