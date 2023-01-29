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

const Singleplayer = (()=>
{
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
    console.log(`current class is ${currentClass}`)
    Array.from(cells).forEach((element) => {
      element.addEventListener("click", onClick, { once: true });
    });
  };
  const onClick = (e) => {
    const cell = e.target;
    const currentClass = X_CLASS;

    //Add class to selected  cell
    addPiece(cell, currentClass);
    counter = counter + 1;
    console.log("counter is " + counter);

    //Check for win
    if (checkWin(currentClass)) {
      console.log("winner: player");

      displayModal("win", "Player");
      counter = 0;
      return
    }
    //Check for draw
    checkDraw(counter);

    //Computer does its move ; check if computer wins/draws ; switch back to player
    computer_hard(O_CLASS);

  };



  //computer easy logic; fills a random available spot with its class
    const computer_easy = (currentClass) =>
    {
      //check for empty space
      let available_space = []
      Array.from(cells).forEach((element) => {
        if (!element.classList.contains(X_CLASS) && !element.classList.contains(O_CLASS) ) {
            available_space.push(element)
        }
      });
      //add its class to a random available cell
      console.log(available_space)
      let random_cell = Math.floor(Math.random()* available_space.length)
      available_space[random_cell].classList.add(currentClass)
      console.log(`added a piece to the ${random_cell} position`)
      console.log(available_space)

      checkDraw(counter)
      if (checkWin(currentClass)) {
        console.log("winner: computer");
        displayModal("win", "Computer");
        counter = 0;
      }
      swap()

    }
    board = Array.from(cells)


  //Add Piece
  const addPiece = (cell, currentClass) => {
    cell.classList.add(currentClass);
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

  //minmax
  function checkIfWinnerFound(currBdSt, currMark) {
    if (
        (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
        (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
        (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
        (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark)
    ) {
        return true;
    } else {
        return false;
    }
}
//transform the board into an Array
function boardStatus (board)
{
    currentBoard = []
    board.forEach((element) => {
        if (element.classList.contains(X_CLASS)) currentBoard.push("x")
        if (element.classList.contains(O_CLASS)) currentBoard.push("o")
        if (!element.classList.contains(X_CLASS) && !element.classList.contains(O_CLASS)) currentBoard.push('')
    });
    console.log(`%ccurrent board is `,"background-color:grey; color: yellow;")
    console.log(currentBoard)
    return currentBoard
}
function freeSpaceOnBoard(currentBoard)
{   fresSpaces = []
    for (let index = 0; index < currentBoard.length; index++) {

        if (currentBoard[index]=='')
        {
          fresSpaces.push(index)
        }
    }
    console.log(`free board is ${fresSpaces}`)
    return fresSpaces
}
// function minimax (currentBoard,depth,maximazingPlayer)
// {
//     freeSpaces = freeSpaceOnBoard(currentBoard)
//     if(checkIfWinnerFound(currentBoard,X_CLASS)) {console.log("%cX WON",'background-color:green;'); return -1;}
//     if(checkIfWinnerFound(currentBoard,O_CLASS)) {console.log("%cO WON",'background-color:purple;'); return 1;}
//     if(freeSpaces.length == 0) { console.log("%cDRAW", 'background-color:white; color:black;'); return 0;}

//     if(maximazingPlayer == O_CLASS){
//         console.log("%c looking for a move for O",'background-color:blue;')
//         bestScore = -1000
//         currentBoard.forEach(element =>
//           {   if(element == '')
//                   {
//                     element = O_CLASS
//                     console.log(`the board during O's Turn is`)
//                     console.log(currentBoard)
//                     let score = minimax(currentBoard,depth+1,X_CLASS)
//                     element = ''
//                     if(score>bestScore) {bestScore = score; console.log(`best score is ${bestScore}`)}
//                   }
//           });
//         return bestScore
//     }else if(maximazingPlayer == X_CLASS)
//     {
//         console.log("%clooking for a move for X",`background-color:red`)
//         bestScore = 1000
//         currentBoard.forEach(element => {

//           if(element == '')
//           {
//             element = O_CLASS
//             console.log(`the board during X's Turn is`)
//             console.log(currentBoard)
//             let score = minimax(currentBoard,depth+1,O_CLASS)
//             element = ''
//             if(score>bestScore) {bestScore = score; console.log(`best score is ${bestScore}`)}
//           }
//         });
//         return bestScore
//     }
// }



function minimax(currBdSt,isMaximazing)
{
  freeSpaces = freeSpaceOnBoard(currBdSt)
  if(checkIfWinnerFound(currBdSt,X_CLASS)) {console.log("%cX WON",'background-color:green;'); return -1;}
  if(checkIfWinnerFound(currBdSt,O_CLASS)) {console.log("%cO WON",'background-color:purple;'); return 1;}
  if(freeSpaces.length == 0) { console.log("%cDRAW", 'background-color:white; color:black;'); return 0;}

  if(isMaximazing == O_CLASS)
  {
    let bestScore = -Infinity
    for (let index = 0; index < currBdSt.length; index++) {
      if (currBdSt[index] == '') {
        currBdSt[index] = O_CLASS
        let score = minimax(currBdSt,X_CLASS)
        currBdSt[index] = ''
        if (score>bestScore) bestScore = score
      }

    }
    return bestScore
  }else {
    let bestScore = Infinity
    for (let index = 0; index < currBdSt.length; index++) {
      if (currBdSt[index] == '') {
        currBdSt[index] = X_CLASS
        let score = minimax(currBdSt,O_CLASS)
        currBdSt[index] = ''
        if (score<bestScore) bestScore = score
      }

    }
    return bestScore

  }

}


function computer_hard(currentClass)
{
    currentBoard = boardStatus(board)
    bestScore = -Infinity
    let bestMove;
    for (let index = 0; index < currentBoard.length; index++) {
      if (currentBoard[index] == '') {
        currentBoard[index] = currentClass
        let score = minimax(currentBoard,X_CLASS)
        currentBoard[index] = ''
        if(score>bestScore)
        {
          bestScore = score
          bestMove = index
        }
      }

    }
    console.log(`added O on ${bestMove}`)
    board[bestMove].classList.add(currentClass)
    counter += 1
    if (checkWin(O_CLASS)) {
      console.log("winner: Computer");

      displayModal("win", "Computer");
      counter = 0;
      return
    }
    checkDraw(counter)
    swap()
}


  return { playGame };
})()


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


easy_button = document.getElementById("easy_button");
easy_button.addEventListener("click", () => {
  console.log("check");
  Singleplayer.playGame();
});
