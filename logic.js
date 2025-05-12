let players = ['x', 'o'];
let playingField;
let activePlayer = 0;
let fieldSize = 3; // Размер поля по умолчанию

document.addEventListener('DOMContentLoaded', function () {
  // Создаем select для выбора размера поля
  const sizeSelector = document.createElement('div');
  sizeSelector.innerHTML = `
    <label for="field-size">Выберите размер поля: </label>
    <select id="field-size">
      <option value="3">3x3</option>
      <option value="4">4x4</option>
      <option value="5">5x5</option>
      <option value="6">6x6</option>
      <option value="7">7x7</option>
      <option value="8">8x8</option>
    </select>
    <button id="apply-size">Начать игру</button>
  `;

  document.body.prepend(sizeSelector);

  // Обработчик изменения размера поля
  document.getElementById('apply-size').addEventListener('click', function () {
    fieldSize = parseInt(document.getElementById('field-size').value);
    startGame();
  });

  // Запустить игру с начальным размером поля
  startGame();
});

function startGame() {
  // Создаем игровое поле выбранного размера
  playingField = Array(fieldSize)
    .fill()
    .map(() => Array(fieldSize).fill(''));
  activePlayer = 0;
  renderBoard(playingField);
}

function click(row, col) {
  // Проверяем, что ячейка пустая
  if (playingField[row][col] !== '') {
    return;
  }

  // 1. Обновить игровое поле, записать в нужную ячейку символ игрока
  playingField[row][col] = players[activePlayer];

  // 2. Вызвать функцию `renderBoard` для отрисовки нового состояния игрового поля
  renderBoard(playingField);

  // 3. Проверить, выигрышная ли сложилась ситуация
  if (checkWin(row, col)) {
    // 4. Если ситуация выигрышная, вызвать функцию `showWinner` и передать в неё номер игрока
    showWinner(activePlayer);
    startGame();
  } else if (checkDraw()) {
    // Проверка на ничью
    showDraw();
    startGame();
  } else {
    // 5. Если нужно играть дальше, то передать ход следующему игроку
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
}

function checkWin(row, col) {
  const symbol = players[activePlayer];
  const size = fieldSize;

  // Проверка горизонтали
  let horizontalWin = true;
  for (let i = 0; i < size; i++) {
    if (playingField[row][i] !== symbol) {
      horizontalWin = false;
      break;
    }
  }
  if (horizontalWin) return true;

  // Проверка вертикали
  let verticalWin = true;
  for (let i = 0; i < size; i++) {
    if (playingField[i][col] !== symbol) {
      verticalWin = false;
      break;
    }
  }
  if (verticalWin) return true;

  // Проверка диагонали (сверху слева - вниз вправо)
  if (row === col) {
    let diagonalWin = true;
    for (let i = 0; i < size; i++) {
      if (playingField[i][i] !== symbol) {
        diagonalWin = false;
        break;
      }
    }
    if (diagonalWin) return true;
  }

  // Проверка диагонали (сверху справа - вниз влево)
  if (row + col === size - 1) {
    let antiDiagonalWin = true;
    for (let i = 0; i < size; i++) {
      if (playingField[i][size - 1 - i] !== symbol) {
        antiDiagonalWin = false;
        break;
      }
    }
    if (antiDiagonalWin) return true;
  }

  return false;
}

function checkDraw() {
  // Проверка на ничью - все ячейки заполнены
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      if (playingField[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function showDraw() {
  alert('Ничья!');
}
