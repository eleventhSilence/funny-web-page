const frame = document.querySelector('.frame');
const ball = document.querySelector('.ball');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');

// Получаем размеры рамки и шарика
let frameRect = frame.getBoundingClientRect();
let ballRect = ball.getBoundingClientRect();

let ballX = Math.random() * (frameRect.width - ballRect.width); // Начальная позиция шарика по X
let ballY = Math.random() * (frameRect.height - ballRect.height); // Начальная позиция шарика по Y

const speedX = 2;
const speedY = 3;
let ballSpeedX = Math.random() < 0.5 ? -speedX : speedX;
let ballSpeedY = Math.random() < 0.5 ? -speedY : speedY;

// Устанавливаем начальное положение шарика
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

let animationId = null; // Идентификатор анимации

// Функция для запуска/остановки анимации
function toggleAnimation() {
    if (animationId === null) {
      // Если анимация остановлена, запускаем её
      moveBall();
      startStopButton.textContent = 'Стоп';
    } else {
      // Если анимация запущена, останавливаем её
      cancelAnimationFrame(animationId);
      animationId = null;
      startStopButton.textContent = 'Старт';
    }
}

// Функция для перезагрузки анимации
function resetAnimation() {
    // Останавливаем текущую анимацию
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  
    // Сбрасываем позицию и направление шарика
    frameRect = frame.getBoundingClientRect();
    ballRect = ball.getBoundingClientRect();
    ballX = Math.random() * (frameRect.width - ballRect.width);
    ballY = Math.random() * (frameRect.height - ballRect.height);
    ballSpeedX = Math.random() < 0.5 ? -speedX : speedX;
    ballSpeedY = Math.random() < 0.5 ? -speedY : speedY;
  
    // Устанавливаем начальное положение шарика
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
  
    // Переключаем кнопку "Старт/Стоп" в состояние "Старт"
    startStopButton.textContent = 'Старт';
}

function moveBall() {
  // Получаем текущие размеры рамки (на случай изменения размера окна)
  const frameRect = frame.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
    
  // Предварительно обновляем позицию шарика
  let newBallX = ballX + ballSpeedX;
  let newBallY = ballY + ballSpeedY;

  // Вычисляем правую и нижнюю границы шарика
  const ballRight = newBallX + ballRect.width;
  const ballBottom = newBallY + ballRect.height;

  // Проверяем столкновение с правой стенкой
  if (ballRight > frameRect.width - 3) {
    ballSpeedX = -ballSpeedX; // Меняем направление по X
    newBallX = frameRect.width - ballRect.width - 3; // Корректируем позицию
  }

  // Проверяем столкновение с левой стенкой
  if (newBallX < 0) {
    ballSpeedX = -ballSpeedX; // Меняем направление по X
    newBallX = 0; // Корректируем позицию
  }

  // Проверяем столкновение с нижней стенкой
  if (ballBottom > frameRect.height - 4) {
    ballSpeedY = -ballSpeedY; // Меняем направление по Y
    newBallY = frameRect.height - ballRect.height - 4; // Корректируем позицию
  }

  // Проверяем столкновение с верхней стенкой
  if (newBallY < 0) {
    ballSpeedY = -ballSpeedY; // Меняем направление по Y
    newBallY = 0; // Корректируем позицию
  }

  // Обновляем позицию шарика
  ballX = newBallX;
  ballY = newBallY;

  // Применяем новую позицию шарика
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Рекурсивно вызываем функцию для анимации
  animationId = requestAnimationFrame(moveBall);
}

// Назначаем обработчики событий для кнопок
startStopButton.addEventListener('click', toggleAnimation);
resetButton.addEventListener('click', resetAnimation);

// Запускаем анимацию
startStopButton.textContent = 'Старт';