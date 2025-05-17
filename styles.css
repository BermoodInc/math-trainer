/* Базовые стили */
body {
    font-family: 'Comic Neue', cursive;
    margin: 0;
    padding: 20px;
    background: #fff9e6 url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><text x="10" y="80" font-size="60" fill="%23ffd700">🐾</text></svg>');
    color: #4a4a4a;
}

/* Основной контейнер */
.container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(255, 165, 0, 0.2);
    border: 3px solid #ffb347;
}

h1 {
    text-align: center;
    color: #ff6b6b;
    font-size: 2.5rem;
    margin: 0 0 2rem 0;
    text-shadow: 2px 2px #fff;
}

/* Панель управления */
.control-panel {
    background: #fff3e6;
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 2rem;
    border: 2px dashed #ff9f43;
}

.input-group {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-weight: 700;
    color: #ff6b6b;
}

.animal-input {
    padding: 0.8rem;
    border: 3px solid #ff9f43;
    border-radius: 12px;
    font-size: 1.1rem;
    width: 100px;
    text-align: center;
    background: #fff;
    transition: all 0.3s;
}

.animal-input:focus {
    border-color: #ff6b6b;
    box-shadow: 0 0 10px #ff9f43;
    outline: none;
}

.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.generate-btn {
    background: #ff9f43;
    color: white;
    text-shadow: 1px 1px #ff6b6b;
}

.clear-btn {
    background: #ff6b6b;
    color: white;
    text-shadow: 1px 1px #ff9f43;
}

button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

/* Примеры */
.examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    counter-reset: example-counter;
}

.example {
    background: #fff;
    padding: 1.5rem;
    border-radius: 15px;
    font-size: 1.4rem;
    position: relative;
    counter-increment: example-counter;
    box-shadow: 0 4px 10px rgba(255, 159, 67, 0.2);
    border: 2px solid #ffd700;
    transition: transform 0.3s;
}

.example:hover {
    transform: translateY(-3px);
}

.example::before {
    content: "🐾 " counter(example-counter);
    position: absolute;
    top: -15px;
    left: -10px;
    background: #ff9f43;
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 0.9rem;
}

.placeholder {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: #fff3e6;
    border: 3px solid #ff9f43;
    border-radius: 10px;
    margin: 0 5px;
    vertical-align: middle;
    position: relative;
}

.placeholder::after {
    content: "?";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ff6b6b;
    font-weight: bold;
}

/* Адаптивность */
@media (max-width: 600px) {
    .container {
        padding: 1rem;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    .animal-input {
        width: 80px;
    }
    
    button {
        padding: 0.8rem 1.5rem;
    }
}
