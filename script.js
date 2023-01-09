oneplayerButton = document.getElementById("1player_button");
twoplayerbutton = document.getElementById("2player_button");
multiplayer_selection = document.getElementById("multiplayer_selection");
singleplayer_selection = document.getElementById("singleplayer_selection");
restartButton = document.getElementById("restart-button");

twoplayerbutton.addEventListener("click", () => {
  console.log("2 player mode selected");
  multiplayer_selection.classList.remove("unselected");
  singleplayer_selection.classList.add("unselected");
});

oneplayerButton.addEventListener("click", () => {
  console.log("1 player mode selected");
  multiplayer_selection.classList.add("unselected");
  singleplayer_selection.classList.remove("unselected");
});

//start MP
player1 = document.getElementById("player1");
player2 = document.getElementById("player2");
mp_start = document.getElementById("mp_start");
player1_name = "";
player2_name = "";

mp_start.addEventListener("click", () => {
  console.log(player1.value);
  player1_name = player1.value;
  player2_name = player2.value;
});

// Tic Tac Toe module
const TicTacToe = (() => {
  //Common Functions for Sp and Mp
  const gameboard = document.getElementById("gameboard");
  let counter = 0;
  cells = document.getElementsByClassName("cell");
  let xTurn = true;

  const X_CLASS = "x";
  const O_CLASS = "o";
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const startNewGame = () => {
    //board removes previous classes,clears the cells of any classes and sets X as first player
    //remove modals

    gameboard.classList.remove("o");
    gameboard.classList.remove("x");
    console.log("board classes cleared");

    //clear cells
    cells = document.getElementsByClassName("cell");
    Array.from(cells).forEach((element) => {
      element.classList.remove("x");
      element.classList.remove("o");
    });
    gameboard.classList.add("x");
    let currentClass = "x";
    return currentClass;
  };

  const playGame = (currentClass = startNewGame()) => {
    console.log("Game Started");
    Array.from(cells).forEach((element) => {
      element.addEventListener("click", onClick, { once: true });
    });
  };
  const onClick = (e) => {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;

    //Add class to selected  cell
    addPiece(cell, currentClass);
    counter = counter + 1;
    console.log("counter is " + counter);

    //Check for win
    if (checkWin(currentClass)) {
      console.log("winner");
      if (currentClass == "x") {
        winner = player1_name;
      } else {
        winner = player2_name;
      }
      displayModal("win", winner);
      counter = 0;
    }
    //Check for draw
    checkDraw(counter);
    //Switch class
    swap();
    gameboard_class(currentClass);
  };
  //Add Piece
  const addPiece = (cell, currentClass) => {
    cell.classList.add(currentClass);
  };
  //add hover
  const gameboard_class = (currentClass) => {
    if (currentClass == O_CLASS) {
      gameboard.classList.remove("o");
      gameboard.classList.add("x");
    } else {
      gameboard.classList.remove("x");
      gameboard.classList.add("o");
    }
  };
  //Swap Turns
  const swap = () => {
    xTurn = !xTurn;
  };
  //Check Win
  const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentClass);
      });
    });
  };
  const checkDraw = (counter) => {
    if (counter == 9) {
      console.log("draw");
      //bring up draw modal
      displayModal("draw");
    }
  };
  modal_container = document.getElementById("modal_container");

  win_modal = document.getElementById("win_modal");
  modal_message = document.getElementById("modal_message");

  //display Modal
  const displayModal = (modal, winner) => {
    if (modal == "draw") {
      modal_container.classList.remove("unselected");
      win_modal.classList.remove("unselected");
      modal_message.textContent = "draw";
    }
    if (modal == "win") {
      modal_container.classList.remove("unselected");
      win_modal.classList.remove("unselected");
      modal_message.textContent = `${winner} WON!`;
    }
  };

  return { playGame };
})();

mp_start = document.getElementById("mp_start");
mp_start.addEventListener("click", () => {
  console.log("check");
  TicTacToe.playGame();
});

restartButton.addEventListener('click', function() {
  document.location.reload()
});

modal_container.classList.add("unselected");
win_modal.classList.add("unselected");
TicTacToe.playGame
