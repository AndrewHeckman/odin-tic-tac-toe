/**
 * Controls the virtual board on which the game is played
 */
const gameboard = (function () {
  const board = new Array(9);

  /**
   * Place a symbol in grid square on gameboard
   * @param {String} symbol Symbol to be placed
   * @param {Number} square Grid square
   * @returns {Boolean} True if symbol successfully placed
   */
  function place(symbol, square) {
    if (board[square] != undefined) return false;
    board[square] = symbol;
    return true;
  }

  /**
   * Gets the symbol placed in a square
   * @param {Number} square Square to get symbol of
   * @returns {String} Symbol in square
   */
  function getSquare(square) {
    return board[square];
  }

  /**
   * Clears gameboard
   */
  function clear() {
    for (let i = 0; i < 9; i++) {
      board[i] = undefined;
    }
  }

  return { place, getSquare, clear };
})();

/**
 * Controls the display of the game on the screen
 */
const displayController = (function () {

})();

/**
 * Controls the logic of how the game is played
 */
const gameController = (function () {
  /**
     * Check for a winner
     * @param {Number} square Square last placed
     * @return {Array<{winner: String, squares: Array<Number>}>} Symbol of winner and array of winning squares, both empty if no winner
     */
  function checkWinner(square) {
    const symbol = gameboard.getSquare(square);

    switch (square) {
      case 0: {
        if (gameboard.getSquare(1) === symbol && gameboard.getSquare(2) === symbol) return [symbol, [0, 1, 2]];
        if (gameboard.getSquare(3) === symbol && gameboard.getSquare(6) === symbol) return [symbol, [0, 3, 6]];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(8) === symbol) return [symbol, [0, 4, 8]];
        break;
      }
      case 1: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(2) === symbol) return [symbol, [0, 1, 2]];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(7) === symbol) return [symbol, [1, 4, 7]];
        break;
      }
      case 2: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(1) === symbol) return [symbol, [0, 1, 2]];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(6) === symbol) return [symbol, [2, 4, 6]];
        if (gameboard.getSquare(5) === symbol && gameboard.getSquare(8) === symbol) return [symbol, [2, 5, 8]];
        break;
      }
      case 3: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(6) === symbol) return [symbol, [0, 3, 6]];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(5) === symbol) return [symbol, [3, 4, 5]];
        break;
      }
      case 4: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(8) === symbol) return [symbol, [0, 4, 8]];
        if (gameboard.getSquare(1) === symbol && gameboard.getSquare(7) === symbol) return [symbol, [1, 4, 7]];
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(6) === symbol) return [symbol, [2, 4, 6]];
        if (gameboard.getSquare(3) === symbol && gameboard.getSquare(5) === symbol) return [symbol, [3, 4, 5]];
        break;
      }
      case 5: {
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(8) === symbol) return [symbol, [2, 5, 8]];
        if (gameboard.getSquare(3) === symbol && gameboard.getSquare(4) === symbol) return [symbol, [3, 4, 5]];
        break;
      }
      case 6: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(3) === symbol) return [symbol, [0, 3, 6]];
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(4) === symbol) return [symbol, [2, 4, 6]];
        if (gameboard.getSquare(7) === symbol && gameboard.getSquare(8) === symbol) return [symbol, [6, 7, 8]];
        break;
      }
      case 7: {
        if (gameboard.getSquare(1) === symbol && gameboard.getSquare(4) === symbol) return [symbol, [1, 4, 7]];
        if (gameboard.getSquare(6) === symbol && gameboard.getSquare(8) === symbol) return [symbol, [6, 7, 8]];
        break;
      }
      case 8: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(4) === symbol) return [symbol, [0, 4, 8]];
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(5) === symbol) return [symbol, [2, 5, 8]];
        if (gameboard.getSquare(6) === symbol && gameboard.getSquare(7) === symbol) return [symbol, [6, 7, 8]];
        break;
      }
    }

    // check for tie. if an empty cell is found, there is no winner and the game continues.
    // if there are no empty cells, it's the cat's game
    for (let i = 0; i < 9; i++) {
      if (gameboard.getSquare(i) != undefined) continue;
      return ["", []];
    }
    
    return ["C", []];
  }

  return {checkWinner}
})();

/**
 * Factory for player objects
 * @param {String} name Player's name
 * @param {String} symbol Player's symbol
 */
function playerFactory (name, symbol) {
  function getName() {
    return name;
  }

  function getSymbol() {
    return symbol;
  }

  return {getName, getSymbol};
}