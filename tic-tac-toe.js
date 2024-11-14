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
     * @return {Array<Number>} Array of winning squares, empty if no winner
     */
  function checkWinner(square) {
    const symbol = gameboard.getSquare(square);

    switch (square) {
      case 0: {
        if (gameboard.getSquare(1) === symbol && gameboard.getSquare(2) === symbol) return [0, 1, 2];
        if (gameboard.getSquare(3) === symbol && gameboard.getSquare(6) === symbol) return [0, 3, 6];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(8) === symbol) return [0, 4, 8];
        return [];
      }
      case 1: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(2) === symbol) return [0, 1, 2];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(7) === symbol) return [1, 4, 7];
        return [];
      }
      case 2: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(1) === symbol) return [0, 1, 2];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(6) === symbol) return [2, 4, 6];
        if (gameboard.getSquare(5) === symbol && gameboard.getSquare(8) === symbol) return [2, 5, 8];
        return [];
      }
      case 3: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(6) === symbol) return [0, 3, 6];
        if (gameboard.getSquare(4) === symbol && gameboard.getSquare(5) === symbol) return [3, 4, 5];
        return [];
      }
      case 4: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(8) === symbol) return [0, 4, 8];
        if (gameboard.getSquare(1) === symbol && gameboard.getSquare(7) === symbol) return [1, 4, 7];
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(6) === symbol) return [2, 4, 6];
        if (gameboard.getSquare(3) === symbol && gameboard.getSquare(5) === symbol) return [3, 4, 5];
        return [];
      }
      case 5: {
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(8) === symbol) return [2, 5, 8];
        if (gameboard.getSquare(3) === symbol && gameboard.getSquare(4) === symbol) return [3, 4, 5];
        return [];
      }
      case 6: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(3) === symbol) return [0, 3, 6];
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(4) === symbol) return [2, 4, 6];
        if (gameboard.getSquare(7) === symbol && gameboard.getSquare(8) === symbol) return [6, 7, 8];
        return [];
      }
      case 7: {
        if (gameboard.getSquare(1) === symbol && gameboard.getSquare(4) === symbol) return [1, 4, 7];
        if (gameboard.getSquare(6) === symbol && gameboard.getSquare(8) === symbol) return [6, 7, 8];
        return [];
      }
      case 8: {
        if (gameboard.getSquare(0) === symbol && gameboard.getSquare(4) === symbol) return [0, 4, 8];
        if (gameboard.getSquare(2) === symbol && gameboard.getSquare(5) === symbol) return [2, 5, 8];
        if (gameboard.getSquare(6) === symbol && gameboard.getSquare(7) === symbol) return [6, 7, 8];
        return [];
      }
    }
  }

  return {checkWinner}
})();

function playerFactory() {

}