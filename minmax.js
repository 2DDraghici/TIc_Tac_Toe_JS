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
    board.forEach((element,index) => {
        if (element.classList.contains(X_CLASS)) currentBoard.push("x")
        if (element.classList.contains(O_CLASS)) currentBoard.push("o")
        if (!element.classList.contains(X_CLASS) && !element.classList.contains(O_CLASS)) currentBoard.push(index)
    });
    return currentBoard
}
function freeSpaceOnBoard(currentBoard)
{   fresSpaces = []
    for (let index = 0; index < currentBoard.length; index++) {
        if (!currentBoard[index]!="x" && !currentBoard[index]!="o") currentBoard.push(index)

    }
    return fresSpaces
}
function minimax (currentBoard,depth,maximazingPlayer)
{
    freeSpaces = freeSpaceOnBoard(currentBoard)
    if(checkIfWinnerFound(currentBoard,X_CLASS)) return -1
    else if(checkIfWinnerFound(currentBoard,O_CLASS)) return 1
    else if(freeSpaces.length== 0) return 0

    if(maximazingPlayer == O_CLASS){
        bestScore = -Infinity
        freeSpaces.forEach(element => {
        currentBoard[element] = O_CLASS
        score = minimax(currentBoard,depth+1,X_CLASS)
        currentBoard[element] = ""
        if(score>bestScore) bestScore = score
        });
        return bestScore
    }else if(maximazingPlayer == X_CLASS)
    {
        bestScore = +Infinity
        freeSpaces.forEach(element => {
        currentBoard[element] = X_CLASS
        score = minimax(currentBoard,depth+1,O_CLASS)
        currentBoard[element] = ""
        if(score<bestScore) bestScore = score
        });
        return bestScore
    }
}


function computer_hard(currentClass)
{
    bestScore = -Infinity
    bestMove=0
    let available_space = []
    currentBoard = boardStatus(board)
    available_space=freeSpaceOnBoard(currentBoard)
    available_space.forEach(element => {
        currentBoard[element] = currentClass
        score = minimax(currentBoard,0,currentClass)
        currentBoard[element] = ''
        if (score > bestScore) {
            bestScore = score
            bestMove = element
        }
    });

    board[bestMove].classList.add(O_CLASS)
    swap()
}
