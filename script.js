// Навигация и базовые функции
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация навигации
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Удаляем активный класс у всех кнопок
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');
      
      // Получаем целевую секцию
      const sectionId = this.dataset.section;
      
      // Скрываем все секции
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Показываем целевую секцию
      document.getElementById(sectionId).classList.add('active');
      
      // Меняем фон тела документа
      document.body.className = `${sectionId}-bg`;
    });
  });

  // Активируем начальную секцию
  document.querySelector('.nav-btn.active').click();
});

// Функция показа праздничной анимации
function showCelebration(message) {
  const celebration = document.getElementById('celebration');
  
  // Создаем сообщение
  const messageElement = document.createElement('div');
  messageElement.className = 'celebration-message animate__animated animate__bounceIn';
  messageElement.innerHTML = `
    <div>${message}</div>
    <div class="animate__animated animate__tada" style="font-size: 3rem;">🎉</div>
  `;

  // Создаем конфетти
  for(let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    celebration.appendChild(confetti);
  }

  celebration.appendChild(messageElement);
  
  // Удаляем анимацию через 3 секунды
  setTimeout(() => {
    celebration.innerHTML = '';
  }, 3000);
}
