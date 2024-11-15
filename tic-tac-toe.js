/**
 * Controls the virtual board on which the game is played
 */
const gameboard = (function () {
  const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  /**
   * Place a symbol in grid square on gameboard
   * @param {String} symbol Symbol to be placed
   * @param {Number} square Grid square
   * @returns {Boolean} True if symbol successfully placed
   */
  function place(symbol, square) {
    if (board[square] != " ") return false;
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
   * Converts board into readable string for console or prompt display
   * @returns {String} Board converted into readable string
   */
  function showBoard() {
    return `${board[0]} | ${board[1]} | ${board[2]}\n-----\n${board[3]} | ${board[4]} | ${board[5]}\n-----\n${board[6]} | ${board[7]} | ${board[8]}`;
  }

  /**
   * Clears gameboard
   */
  function clear() {
    for (let i = 0; i < 9; i++) {
      board[i] = " ";
    }
  }

  return { place, getSquare, showBoard, clear };
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
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let playerTurn = 1;

  /**
   * Plays one turn of game
   * @param {Player} player Player taking turn
   * @param {Number} Square that was played
   * @returns {Array<{winner: String, squares: Array<Number>}>} Symbol of winner and array of winning squares, both empty if no winner
  */
  function playTurn(square) {
    let player = (playerTurn == 1) ? player1 : player2;
    
    // if square was occupied, return without changing player
    if (!gameboard.place(player.getSymbol(), square)) {
      return ["", []];
    }

    // change player
    if (playerTurn === 1) playerTurn = 2;
    else playerTurn = 1;

    return checkWinner(square);
  }

  /**
   * Play the game using the console and prompts
   */
  function playGameConsole() {
    let play = true;

    while (play) {
      let square = parseInt(prompt(`${gameboard.showBoard()}Enter square number:`));
      while (gameboard.getSquare(square) != " ") {
        square = parseInt(prompt(`${gameboard.showBoard()}Square occupied. Enter new square number:`));
      }
      let [winner, squares] = playTurn(square);

      if (winner === "C") {
        console.log("Cat's game!");
      }
      else if (winner === player1.getSymbol()) {
        console.log(`${player1.getName()} wins!`)
      }
      else if (winner === player2.getSymbol()) {
        console.log(`${player2.getName()} wins!`)
      }
      else {
        continue;
      }

      play = false;
      resetGame();
    }
  }

  /**
     * Check for a winner
     * @param {Number} square Square last placed
     * @returns {Array<{winner: String, squares: Array<Number>}>} Symbol of winner and array of winning squares, both empty if no winner
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
      if (gameboard.getSquare(i) != " ") continue;
      return ["", []];
    }

    return ["C", []];
  }

  /**
   * Resets the game and clears the board
   */
  function resetGame() {
    playerTurn = 1;
    gameboard.clear();
  }

  return { playGameConsole, playTurn }
})();

/**
 * Factory for player objects
 * @param {String} name Player's name
 * @param {String} symbol Player's symbol
 */
function Player(name, symbol) {
  function getName() {
    return name;
  }

  function getSymbol() {
    return symbol;
  }

  return { getName, getSymbol };
}