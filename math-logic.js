let mathState = {
  currentExamples: [],
  interactiveMode: false,
  solvedCount: 0
};

// Генерация примеров
function generateMathExamples(mode) {
  const min = parseInt(document.getElementById('math-min').value);
  const max = parseInt(document.getElementById('math-max').value);
  
  // Валидация ввода
  if (min >= max) {
    alert('Максимальное число должно быть больше минимального!');
    return;
  }

  mathState.interactiveMode = mode === 'interactive';
  mathState.currentExamples = createValidExamples(min, max);
  mathState.solvedCount = 0;
  
  renderMathExamples();
}

// Создание валидных примеров
function createValidExamples(min, max) {
  const examples = new Set();
  const attemptsLimit = 100;
  let attempts = 0;

  while (examples.size < 30 && attempts < attemptsLimit) {
    const type = Math.floor(Math.random() * 3);
    let example;

    switch(type) {
      case 0: // Пропущено первое число
        const b1 = randomInt(min, max);
        const result1 = randomInt(min, max);
        const a1 = result1 - b1;
        if (a1 >= min && a1 <= max) {
          example = `? ${b1} = ${result1}`;
        }
        break;

      case 1: // Пропущено второе число
        const a2 = randomInt(min, max);
        const result2 = randomInt(min, max);
        const b2 = result2 - a2;
        if (b2 >= min && b2 <= max) {
          example = `${a2} ? = ${result2}`;
        }
        break;

      case 2: // Пропущен оператор
        const a3 = randomInt(min, max);
        const b3 = randomInt(min, max);
        if (a3 + b3 <= max) {
          example = `${a3} ? ${b3} = ${a3 + b3}`;
        } else if (a3 - b3 >= min) {
          example = `${a3} ? ${b3} = ${a3 - b3}`;
        }
        break;
    }

    if (example && !examples.has(example)) {
      examples.add(example);
    }
    attempts++;
  }

  return Array.from(examples);
}

// Отрисовка примеров
function renderMathExamples() {
  const container = document.getElementById('math-examples');
  container.innerHTML = '';

  if (mathState.interactiveMode) {
    renderInteractiveMode();
  } else {
    renderListMode();
  }
}

// Режим списка
function renderListMode() {
  const groups = {
    missingFirst: [],
    missingSecond: [],
    missingOperator: []
  };

  mathState.currentExamples.forEach(ex => {
    if (ex.startsWith('?')) groups.missingFirst.push(ex);
    else if (ex.includes('? =')) groups.missingSecond.push(ex);
    else groups.missingOperator.push(ex);
  });

  // Отрисовка групп
  renderGroup('Пропущено первое число:', groups.missingFirst);
  renderGroup('Пропущено второе число:', groups.missingSecond);
  renderGroup('Пропущен оператор:', groups.missingOperator);
}

// Отрисовка группы
function renderGroup(title, examples) {
  if (examples.length === 0) return;

  const container = document.getElementById('math-examples');
  const groupHTML = `
    <div class="example-group">
      <h3 class="group-title">${title}</h3>
      <div class="examples-grid">
        ${examples.map(ex => `
          <div class="example">
            ${ex.replace(/\?/g, '<span class="placeholder">?</span>')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.innerHTML += groupHTML;
}

// Интерактивный режим
function renderInteractiveMode() {
  const container = document.getElementById('math-examples');
  container.innerHTML = mathState.currentExamples.map((ex, index) => `
    <div class="interactive-card" data-index="${index}">
      <div class="equation">
        ${ex.replace(/\?/g, '<input type="number" class="math-input-field">')}
      </div>
      <button onclick="checkMathAnswer(${index})" class="check-btn">Проверить</button>
    </div>
  `).join('');
}

// Проверка ответа
function checkMathAnswer(index) {
  const card = document.querySelector(`.interactive-card[data-index="${index}"]`);
  const inputs = card.querySelectorAll('.math-input-field');
  const originalExample = mathState.currentExamples[index];
  
  let isCorrect = true;
  inputs.forEach((input, i) => {
    const correctValue = getCorrectValue(originalExample, i);
    if (parseInt(input.value) !== correctValue) {
      isCorrect = false;
      input.classList.add('wrong');
      setTimeout(() => input.classList.remove('wrong'), 500);
    }
  });

  if (isCorrect) {
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
    mathState.solvedCount++;
    
    if (mathState.solvedCount === mathState.currentExamples.length) {
      showCelebration('Молодец! Все примеры решены! 🎉');
    }
  }
}

// Получение правильного ответа
function getCorrectValue(example, inputIndex) {
  const parts = example.split(' ');
  let value;
  
  if (example.startsWith('?')) {
    value = parseInt(parts[4]) - parseInt(parts[1]);
  } else if (example.includes('? =')) {
    value = parseInt(parts[4]) - parseInt(parts[0]);
  } else {
    const a = parseInt(parts[0]);
    const b = parseInt(parts[2]);
    value = parts[3] === '+' ? a + b : a - b;
  }
  
  return value;
}

// Вспомогательные функции
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearMathExamples() {
  document.getElementById('math-examples').innerHTML = '';
  mathState.currentExamples = [];
}
