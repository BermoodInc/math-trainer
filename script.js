let currentExamples = [];

function generateExamples() {
    const min = parseInt(document.getElementById('min').value) || 1;
    const max = parseInt(document.getElementById('max').value) || 5;
    
    if(min >= max) {
        alert('Максимум должен быть больше минимума!');
        return;
    }

    currentExamples = [];
    const types = ['addition', 'subtraction', 'missing_number', 'missing_operator'];
    
    while(currentExamples.length < 20) {
        const type = types[Math.floor(Math.random() * types.length)];
        const example = generateExample(type, min, max);
        
        if(example && isUnique(example)) {
            currentExamples.push(example);
        }
    }
    
    showList();
}

function generateExample(type, min, max) {
    let a, b, result, question;
    
    switch(type) {
        case 'addition':
            a = randomInt(min, max);
            b = randomInt(min, max);
            result = a + b;
            if(result > max) return null;
            question = `${a} + ${b} =`;
            break;
            
        case 'subtraction':
            a = randomInt(min, max);
            b = randomInt(min, a);
            result = a - b;
            question = `${a} - ${b} =`;
            break;
            
        case 'missing_number':
            a = randomInt(min, max);
            b = randomInt(min, max);
            if(Math.random() > 0.5) {
                result = a + b;
                if(result > max) return null;
                question = `${a} + \${missing} = ${result}`;
            } else {
                if(a < b) [a, b] = [b, a];
                result = a - b;
                question = `${a} - \${missing} = ${result}`;
            }
            break;
            
        case 'missing_operator':
            a = randomInt(min, max);
            b = randomInt(min, max);
            const operators = ['+', '-'];
            const op = operators[Math.random() > 0.5 ? 1 : 0];
            result = op === '+' ? a + b : a - b;
            if(result < min || result > max) return null;
            question = `${a} \${missing} ${b} = ${result}`;
            break;
    }
    
    return { question, answer: result, type };
}

function isUnique(example) {
    return !currentExamples.some(e => e.question === example.question);
}

function showList() {
    const container = document.getElementById('list-container');
    container.innerHTML = currentExamples.map(e => 
        `<div class="example">${e.question.replace('${missing}', '<span class="missing"></span>')}</div>`
    ).join('');
    
    document.getElementById('list-container').classList.remove('hidden');
    document.getElementById('solve-container').classList.add('hidden');
}

function showSolve() {
    const container = document.getElementById('solve-container');
    container.innerHTML = currentExamples.map((e, index) => {
        const inputType = e.type === 'missing_operator' ? 'text' : 'number';
        return `
            <div class="example">
                ${e.question.replace('${missing}', `
                    <input type="${inputType}" 
                           data-answer="${e.answer}" 
                           data-index="${index}"
                           placeholder="?"
                           class="answer-input">
                `)}
                <span class="result-icon" id="result-${index}"></span>
            </div>
        `;
    }).join('');
    
    document.getElementById('solve-container').classList.remove('hidden');
    document.getElementById('list-container').classList.add('hidden');

    document.querySelectorAll('.answer-input').forEach(input => {
        input.addEventListener('input', function() {
            checkAnswer(this);
        });
    });
}

function checkAnswer(input) {
    const index = input.dataset.index;
    const userAnswer = input.value.trim();
    const correctAnswer = input.dataset.answer;
    const resultIcon = document.getElementById(`result-${index}`);
    
    if(input.type === 'number') {
        const isCorrect = parseInt(userAnswer) === parseInt(correctAnswer);
        resultIcon.textContent = isCorrect ? '✓' : '✗';
        resultIcon.style.color = isCorrect ? 'green' : 'red';
    } else {
        const isCorrect = userAnswer === correctAnswer;
        resultIcon.textContent = isCorrect ? '✓' : '✗';
        resultIcon.style.color = isCorrect ? 'green' : 'red';
    }
}

function clearAll() {
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    document.getElementById('list-container').innerHTML = '';
    document.getElementById('solve-container').innerHTML = '';
    currentExamples = [];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
