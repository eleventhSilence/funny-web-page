const frame = document.querySelector('.frame');
const ball = document.querySelector('.ball');

// Получаем размеры рамки и шарика
const frameRect = frame.getBoundingClientRect();
const ballRect = ball.getBoundingClientRect();

let ballX = Math.random() * (frameRect.width - ballRect.width); // Начальная позиция шарика по X
let ballY = Math.random() * (frameRect.height - ballRect.height); // Начальная позиция шарика по Y

const speedX = 1;
const speedY = 1;
let ballSpeedX = Math.random() < 0.5 ? -speedX : speedX;
let ballSpeedY = Math.random() < 0.5 ? -speedY : speedY;

// Устанавливаем начальное положение шарика
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

function moveBall() {
   // Получаем текущие размеры рамки (на случай изменения размера окна)
   const frameRect = frame.getBoundingClientRect();
   const ballRect = ball.getBoundingClientRect();

  // Проверяем столкновение с правой и левой стенкой
  if (ballX + ballRect.width >= frameRect.width || ballX < 0) {
    ballSpeedX = -ballSpeedX; // Меняем направление по X

    // Корректируем позицию шарика, чтобы он не выходил за границы
    if (ballX + ballRect.width >= frameRect.width) {
      ballX = frameRect.width - ballRect.width; // Прижимаем к правой стенке
    } else if (ballX <= 0) {
      ballX = 0; // Прижимаем к левой стенке
    }
  }

  // Проверяем столкновение с верхней и нижней стенкой
  if (ballY + ballRect.height >= frameRect.height || ballY < 0) {
    ballSpeedY = -ballSpeedY; // Меняем направление по Y
    
    // Корректируем позицию шарика, чтобы он не выходил за границы
    if (ballY + ballRect.height >= frameRect.height) {
      ballY = frameRect.height - ballRect.height; // Прижимаем к нижней стенке
    } else if (ballY <= 0) {
      ballY = 0; // Прижимаем к верхней стенке
    }
  }

  // Обновляем позицию шарика
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Применяем новую позицию шарика
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Рекурсивно вызываем функцию для анимации
  requestAnimationFrame(moveBall);
}

// Запускаем анимацию
moveBall();