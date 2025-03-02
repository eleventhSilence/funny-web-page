const frame = document.querySelector('.frame');
const ball = document.querySelector('.ball');

// Получаем размеры рамки и шарика
const frameRect = frame.getBoundingClientRect();
const ballRect = ball.getBoundingClientRect();

let ballX = Math.random() * (frameRect.width - ballRect.width); // Начальная позиция шарика по X
let ballY = Math.random() * (frameRect.height - ballRect.height); // Начальная позиция шарика по Y

const speedX = 2;
const speedY = 3;
let ballSpeedX = Math.random() < 0.5 ? -speedX : speedX;
let ballSpeedY = Math.random() < 0.5 ? -speedY : speedY;

// Устанавливаем начальное положение шарика
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

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
  requestAnimationFrame(moveBall);
}

// Запускаем анимацию
moveBall();