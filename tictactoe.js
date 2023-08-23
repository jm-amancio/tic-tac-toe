// Player (factory function)
const Player = (name, mark) => {
    let getName = () => name;
    let getMark = () => mark;
    return {getName, getMark};
}

// Cell (factory function) - a "square" on the board
const Cell = () => {
    let mark = '';             // mark is initially empty
    let getMark = () => mark;  // returns cell mark
    let setMark = (newMark) => mark = newMark; // changes cell mark
    return {getMark, setMark};
}

// Gameboard (module) - the board
const Gameboard = (() =>  {
    const row = 3, column = 3;
    const board = [];       // the gameboard array
    const gameboardUI = document.querySelector('.gameboard');

    // fills the gameboard array with 9 cells
    function createGameboard (){
        for(let i=0; i<row; i++){
            board[i] = [];
            for(let j=0; j<column; j++){
                board[i].push(Cell());
            }
        }
    }

    // creates the HTML component of the gameboard array
    function createGameboardUI (){
        for(let i=0; i<row; i++){
            for(let j=0; j<column; j++){
                const div = document.createElement('div');
                div.classList.add('cell');
                div.setAttribute('value', `${i}-${j}`);
                div.addEventListener('click', () => {
                    DisplayController.printNewRound(i, j);
                });
                gameboardUI.appendChild(div);
            }
        }
    }

    // returns gameboard array (the current state)
    function getGameboard () {
        return board;
    }

    // function is called when a player clicks a div representing a cell
    // if cell is empty, it changes the value of a cell and returns true 
    // else, it changes no value and returns false
    function setGameboard(rowIndex, columnIndex, player) {
        if(board[rowIndex][columnIndex].getMark() === '') {
            board[rowIndex][columnIndex].setMark(player);
            return true;
        }
        return false;
    }

    function printBoard(){
        let k = 0;
        while (k < 9){
            for(let i=0; i<row; i++){
                for(let j=0; j<column; j++){
                    gameboardUI.children[k].textContent = board[i][j].getMark();
                    k++;
                }
            }
        }
    }

    return {createGameboard, createGameboardUI, getGameboard, setGameboard, printBoard};
})();

const DisplayController = (() => {
    // creates players and marks
    const players = [];
    players.push(Player('OnePM', 'O'));
    players.push(Player('TwoPM', 'X'));

    // getActivePlayer && switches player turn
    let getActivePlayer = players[0];
    const switchPlayerTurn = () => 
        (getActivePlayer === players[0]) 
        ? (getActivePlayer = players[1])
        : (getActivePlayer = players[0]);

    function newGame(){
        Gameboard.createGameboard();
        Gameboard.createGameboardUI();
    }

    function restartGame(){
        Gameboard.createGameboard();
        Gameboard.printBoard();
    }

    function printNewRound(rowIndex, colIndex){
        let isMoveValid = Gameboard.setGameboard(rowIndex, colIndex, getActivePlayer.getMark());
        if(isMoveValid){
            Gameboard.printBoard();
            // check winning logic
            switchPlayerTurn();
        }
    }

    function isWinner(){
        
    }

    return {switchPlayerTurn, printNewRound, newGame, restartGame};
})();

DisplayController.newGame();
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click',() => DisplayController.restartGame());