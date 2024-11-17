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
  // interactable elements
  const squares = Array.from(document.querySelectorAll(".square"));
  const grid = document.querySelector("#gameboard");
  const name1 = document.querySelector("#name-1");
  const name2 = document.querySelector("#name-2");
  const score1 = document.querySelector("#score-1");
  const score2 = document.querySelector("#score-2");
  const newGameButton = document.querySelector("#new-game");
  const winnerText = document.querySelector("#winner");

  // reset name fields
  window.onload = function () {
    name1.value = "";
    name2.value = "";
  }

  // set event listeners
  grid.addEventListener("click", gridClick);
  name1.addEventListener("keypress", nameEnter);
  name2.addEventListener("keypress", nameEnter);
  newGameButton.addEventListener("click", newGame);

  /**
   * Execute game logic
   * @param {Event} event 
   */
  function gridClick(event) {
    // bail if square was occupied
    if (event.target.textContent) return;

    const player = gameController.getCurrentPlayer();
    const square = event.target;
    const squareNumber = parseInt(square.getAttribute("data-index"));

    // change square style and add symbol

    if (player.getSymbol() === "X") square.className += " player-1";
    else square.className += " player-2";

    square.textContent = player.getSymbol();

    // if player won, update grid and score and display winning message

    let [winner, winningSquares] = gameController.playTurn(squareNumber);

    if (!winner) return;
    else if (winner === "C") {
      winnerText.textContent = "Cat's game!";
    }
    else if (winner === "X") {
      player.addScore();
      score1.textContent = player.getScore();
      winnerText.textContent = `${player.getName()} wins!`;
    }
    else if (winner === "O") {
      player.addScore();
      score2.textContent = player.getScore();
      winnerText.textContent = `${player.getName()} wins!`;
    }

    grid.removeEventListener("click", gridClick)
  }

  /**
   * If the enter key was pressed, update the player name
   * @param {Event} event 
   */
  function nameEnter(event) {
    if (event.key != "Enter") return;

    const players = gameController.getPlayers();
    
    if (event.target.id === "name-1") players[0].setName(event.target.value);
    else players[1].setName(event.target.value);
  }

  /**
   * Reset game board
   */
  function newGame() {
    grid.addEventListener("click", gridClick);
    squares.forEach(square => {
      square.className = "square";
      square.textContent = "";
    });

    winnerText.textContent = "";

    gameController.resetGame();
  }

})();

/**
 * Controls the logic of how the game is played
 */
const gameController = (function () {
  const player1 = Player("Player 1", "X", 0);
  const player2 = Player("Player 2", "O", 0);
  let playerTurn = 1;

  /**
   * Get players
   * @returns {Array<Player>} Array containing both players
   */
  function getPlayers() {
    return [player1, player2];
  }

  /**
   * Get player whose turn it is
   * @returns {Player} Player whose turn it is
   */
  function getCurrentPlayer() {
    if (playerTurn === 1) return player1;
    else return player2;
  }

  /**
   * Plays one turn of game
   * @param {Number} square Square that was played
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

  return { getPlayers, getCurrentPlayer, playGameConsole, playTurn, resetGame }
})();

/**
 * Game player
 * @param {String} name Player's name
 * @param {String} symbol Player's symbol
 * @param {Number} score Player's score
 */
function Player(name, symbol, score) {
  function getName() {
    return name;
  }

  function getSymbol() {
    return symbol;
  }

  function getScore() {
    return score;
  }

  /**
   * Set name
   * @param {String} newName Name to be set
   */
  function setName(newName) {
    name = newName;
  }

  /**
   * Add 1 to player score
   */
  function addScore() {
    score++;
  }

  return { getName, getSymbol, getScore, setName, addScore };
}