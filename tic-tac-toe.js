/**
 * Controls the virtual board on which the game is played
 */
const gameboard = (function () {
  const board = new Array(9);

  /**
   * Place a symbol in grid square on gameboard
   * @param {String} symbol Symbol to be placed
   * @param {Number} square Grid square
   * @return {Boolean} True if symbol successfully placed
   */
  function place(symbol, square) {
    if (board[square] != undefined) return false;
    board[square] = symbol;
    return true; 
  }

  /**
   * Check for a winner
   * @param {Number} square Square last placed
   * @return {Array<Number>} Array of winning squares, empty if no winner
   */
  function checkWinner(square) {
    const symbol = board[square];

    switch (square) {
      case 0:{
        if (board[1] === symbol && board[2] === symbol) return [0, 1, 2];
        if (board[3] === symbol && board[6] === symbol) return [0, 3, 6];
        if (board[4] === symbol && board[8] === symbol) return [0, 4, 8];
        return [];
      }
      case 1:{
        if (board[0] === symbol && board[2] === symbol) return [0, 1, 2];
        if (board[4] === symbol && board[7] === symbol) return [1, 4, 7];
        return [];
      }
      case 2:{
        if (board[0] === symbol && board[1] === symbol) return [0, 1, 2];
        if (board[4] === symbol && board[6] === symbol) return [2, 4, 6];
        if (board[5] === symbol && board[8] === symbol) return [2, 5, 8];
        return [];
      }
      case 3:{
        if (board[0] === symbol && board[6] === symbol) return [0, 3, 6];
        if (board[4] === symbol && board[5] === symbol) return [3, 4, 5];
        return [];
      }
      case 4:{
        if (board[0] === symbol && board[8] === symbol) return [0, 4, 8];
        if (board[1] === symbol && board[7] === symbol) return [1, 4, 7];
        if (board[2] === symbol && board[6] === symbol) return [2, 4, 6];
        if (board[3] === symbol && board[5] === symbol) return [3, 4, 5];
        return [];
      }
      case 5:{
        if (board[2] === symbol && board[8] === symbol) return [2, 5, 8];
        if (board[3] === symbol && board[4] === symbol) return [3, 4, 5];
        return [];
      }
      case 6:{
        if (board[0] === symbol && board[3] === symbol) return [0, 3, 6];
        if (board[2] === symbol && board[4] === symbol) return [2, 4, 6];
        if (board[7] === symbol && board[8] === symbol) return [6, 7, 8];
        return [];
      }
      case 7:{
        if (board[1] === symbol && board[4] === symbol) return [1, 4, 7];
        if (board[6] === symbol && board[8] === symbol) return [6, 7, 8];
        return [];
      }
      case 8:{
        if (board[0] === symbol && board[4] === symbol) return [0, 4, 8];
        if (board[2] === symbol && board[5] === symbol) return [2, 5, 8];
        if (board[6] === symbol && board[7] === symbol) return [6, 7, 8];
        return [];
      }
    }
  }

  /**
   * Clears gameboard
   */
  function clear() {
    for (let i = 0; i < 9; i++) {
      board[i] = undefined;
    }
  }
  
  return {place, checkWinner, clear};
})();

/**
 * Controls the display of the game on the screen
 */
const displayController = (function () {

})();

function playerFactory () {

}