const frame = document.querySelector('.frame');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');

// Получаем размеры рамки и шарика
let frameRect = frame.getBoundingClientRect();

const mainBall = document.querySelector('.main-ball');
let mainBallX = Math.random() * (frameRect.width - mainBall.offsetWidth); // Начальная позиция шарика по X
let mainBallY = Math.random() * (frameRect.height - mainBall.offsetHeight); // Начальная позиция шарика по Y

const mainBallSpeedX = 2;
const mainBallSpeedY = 3;

let mainBallDirectionX = Math.random() < 0.5 ? -mainBallSpeedX : mainBallSpeedX;
let mainBallDirectionY = Math.random() < 0.5 ? -mainBallSpeedY : mainBallSpeedY;

// Устанавливаем начальное положение основного шарика
mainBall.style.left = `${mainBallX}px`;
mainBall.style.top = `${mainBallY}px`;

// Массив для хранения всех шариков
const balls = [];
balls.push({
  element: mainBall,
  x: mainBallX,
  y: mainBallY,
  speedX: mainBallDirectionX,
  speedY: mainBallDirectionY,
});

const trails = [];

let animationId = null; // Идентификатор анимации

// Функция для запуска/остановки анимации
function toggleAnimation() {
    if (animationId === null) {
      // Если анимация остановлена, запускаем её
      moveBalls();
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

    // Удаляем все шарики, кроме основного
    balls.forEach((ball, index) => {
      if (index !== 0  && frame.contains(ball.element)) {
        frame.removeChild(ball.element);
      }
    });

    // Оставляем только основной шарик
    balls.splice(1);

    // Удаляем все следы
    trails.forEach((trail) => {
      if (frame.contains(trail)) { // Проверяем, существует ли элемент
        frame.removeChild(trail);
      }
    });
    trails.length = 0;
  
    // Сбрасываем позицию и направление основного шарика
    frameRect = frame.getBoundingClientRect();
    mainBallX = Math.random() * (frameRect.width - mainBall.offsetWidth);
    mainBallY = Math.random() * (frameRect.height - mainBall.offsetHeight);
    mainBallDirectionX = Math.random() < 0.5 ? -mainBallSpeedX : mainBallSpeedX;
    mainBallDirectionY = Math.random() < 0.5 ? -mainBallSpeedY : mainBallSpeedY;

    // Обновляем свойства основного шарика в массиве balls
    balls[0].x = mainBallX;
    balls[0].y = mainBallY;
    balls[0].speedX = mainBallDirectionX;
    balls[0].speedY = mainBallDirectionY;
  
    // Устанавливаем начальное положение основного шарика
    mainBall.style.left = `${mainBallX}px`;
    mainBall.style.top = `${mainBallY}px`;
  
    // Переключаем кнопку "Старт/Стоп" в состояние "Старт"
    startStopButton.textContent = 'Старт';
}

// Функция для создания следа
function createTrail(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('trail');

  // Получаем размеры основного шарика
  const ballWidth = mainBall.offsetWidth;
  const ballHeight = mainBall.offsetHeight;

  // Устанавливаем размеры следа (в 1.5 раза меньше шарика)
  const trailSize = Math.min(ballWidth, ballHeight) / 1.5; // След чуть меньше шарика
  trail.style.width = `${trailSize}px`;
  trail.style.height = `${trailSize}px`;

  // Вычисляем центр шарика
  const centerX = x + ballWidth / 2 - trailSize / 2; // Центрируем след
  const centerY = y + ballHeight / 2 - trailSize / 2;

  // Устанавливаем позицию следа
  trail.style.left = `${centerX}px`;
  trail.style.top = `${centerY}px`;

  // Получаем текущий цвет основного шарика
  const mainBallColor = getCurrentGradientColor(mainBall);
  trail.style.backgroundColor = mainBallColor.replace('rgb', 'rgba').replace(')', ', 0.05)');

  // Добавляем след перед основным шариком
  frame.insertBefore(trail, mainBall);

  // Добавляем след в массив
  trails.push(trail);
  
  // Удаляем след через 1 секунду
  setTimeout(() => {
    if (frame.contains(trail)) { // Проверяем, существует ли элемент
      frame.removeChild(trail);
      trails.splice(trails.indexOf(trail), 1);
    }
  }, 300); // Время жизни следа (1 секунда)
}

// Функция для создания нового шарика
function createBall(x, y) {
  const newBall = document.createElement('div');
  newBall.classList.add('ball');
  newBall.style.left = `${x}px`;
  newBall.style.top = `${y}px`;

  // Получаем цвет основного шарика
  const mainBallColor = getCurrentGradientColor(mainBall);

  // Преобразуем цвет в HSL
  const hslColor = rgbToHsl(mainBallColor);

  // Генерируем новый оттенок, отличающийся от основного
  const mainHue = hslColor[0]; // Оттенок основного шарика
  let newHue;

  // Генерация нового оттенка, который отличается от основного минимум на 30 градусов
  do {
    newHue = Math.random() * 360; // Случайный оттенок
  } while (Math.abs(newHue - mainHue) < 120); // Повторяем, пока оттенок не будет достаточно отличаться
  
  const newColor = `hsl(${newHue}, ${hslColor[1]}%, ${hslColor[2]}%)`;

  // Устанавливаем новый цвет
  newBall.style.backgroundColor = newColor;

  // Добавляем шарик в рамку
  frame.appendChild(newBall);

  // Случайное направление движения
  const speedX = 3 + Math.random() * 2;
  const speedY = 3 + Math.random() * 2;
  const directionX = Math.random() < 0.5 ? -speedX : speedX;
  const directionY = Math.random() < 0.5 ? -speedY : speedY;

  // Добавляем шарик в массив
  balls.push({
    element: newBall,
    x: x,
    y: y,
    speedX: directionX,
    speedY: directionY,
  });
}

function moveBalls() {
  balls.forEach((ball) => {
    // Получаем текущие размеры рамки (на случай изменения размера окна)
    const frameRect = frame.getBoundingClientRect();

    // Предварительно обновляем позицию шарика
    let newBallX = ball.x + ball.speedX;
    let newBallY = ball.y + ball.speedY;

    // Вычисляем правую и нижнюю границы шарика
    const ballRight = newBallX + ball.element.offsetWidth;
    const ballBottom = newBallY + ball.element.offsetHeight;

    // Проверяем столкновение с правой стенкой
    if (ballRight > frameRect.width - 3) {
      ball.speedX = -ball.speedX; // Меняем направление по X
      newBallX = frameRect.width - ball.element.offsetWidth - 3; // Корректируем позицию

      // Если это основной шарик, создаем новый шарик
      if (ball.element.classList.contains('main-ball')) {
        createBall(newBallX, newBallY);
      }
    }

    // Проверяем столкновение с левой стенкой
    if (newBallX < 0) {
      ball.speedX = -ball.speedX; // Меняем направление по X
      newBallX = 0; // Корректируем позицию

      // Если это основной шарик, создаем новый шарик
      if (ball.element.classList.contains('main-ball')) {
        createBall(newBallX, newBallY);
      }
    }

    // Проверяем столкновение с нижней стенкой
    if (ballBottom > frameRect.height - 4) {
      ball.speedY = -ball.speedY; // Меняем направление по Y
      newBallY = frameRect.height - ball.element.offsetHeight - 4; // Корректируем позицию

      // Если это основной шарик, создаем новый шарик
      if (ball.element.classList.contains('main-ball')) {
        createBall(newBallX, newBallY);
      }
    }

    // Проверяем столкновение с верхней стенкой
    if (newBallY < 0) {
      ball.speedY = -ball.speedY; // Меняем направление по Y
      newBallY = 0; // Корректируем позицию

      // Если это основной шарик, создаем новый шарик
      if (ball.element.classList.contains('main-ball')) {
        createBall(newBallX, newBallY);
      }
    }

    // Обновляем позицию шарика
    ball.x = newBallX;
    ball.y = newBallY;

    // Применяем новую позицию шарика
    ball.element.style.left = `${ball.x}px`;
    ball.element.style.top = `${ball.y}px`;

    // Если это основной шарик, создаем след
    if (ball.element.classList.contains('main-ball')) {
      createTrail(ball.x, ball.y);
    }
  });

  // Рекурсивно вызываем функцию для анимации
  animationId = requestAnimationFrame(moveBalls);
}

// Назначаем обработчики событий для кнопок
startStopButton.addEventListener('click', toggleAnimation);
resetButton.addEventListener('click', resetAnimation);

// Запускаем анимацию
startStopButton.textContent = 'Старт';

// Функция для преобразования RGB в HSL
function rgbToHsl(rgb) {
  // Извлекаем значения R, G, B из строки
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  const rgbValues = rgb.slice(4).split(')')[0].split(sep);

  // Преобразуем значения в числа
  let r = rgbValues[0] / 255;
  let g = rgbValues[1] / 255;
  let b = rgbValues[2] / 255;

  // Находим минимальное и максимальное значение
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Оттенок и насыщенность равны 0
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Возвращаем HSL в виде массива [h, s, l]
  return [h * 360, s * 100, l * 100];
}

// Функция для получения текущего цвета градиента
function getCurrentGradientColor(element) {
  // Создаем временный элемент для анализа градиента
  const tempElement = document.createElement('div');
  tempElement.style.background = getComputedStyle(element).background;
  document.body.appendChild(tempElement);

  // Получаем цвет из градиента
  const gradientColors = getComputedStyle(tempElement).backgroundImage.match(/rgb\([^)]+\)/g);
  const currentColor = gradientColors ? gradientColors[0] : '#ff0000'; // По умолчанию красный

  // Удаляем временный элемент
  document.body.removeChild(tempElement);

  return currentColor;
}