const Gameboard = (() => { //module
    const gameboard = [[null, null, null],[null, null, null],[null, null, null]];
    const getBoard = () => gameboard;
    return gameboard;
})();



const displayController = (() => {
    const renderDisplay = (gameboard) => {
        
        let game = document.querySelector('.gameboard')
        game.innerHTML="";
        let rowc = 0;
        let cellc;
        gameboard.forEach((row) => {
            cellc = 0;
            let div = document.createElement('div');
            div.classList.add(`row`);
            div.classList.add(`${rowc}`);
            game.appendChild(div)
            row.forEach((cell) => {
                let divc = document.createElement('div');
                divc.classList.add(`cell`);
                divc.classList.add(`${rowc}${cellc}`);
                divc.classList.add(cell)
                div.appendChild(divc)
                if (cell == "X"){
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("width", "800");
                    svg.setAttribute("height", "800");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    svg.setAttribute("fill", "none");
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            
                    // Create a path element and set its attributes
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", "M18.3689 5.64103L5.63548 18.3634M5.63106 5.64103L18.3645 18.3634M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z");
                    path.setAttribute("stroke", "#000000");
                    path.setAttribute("stroke-width", "2");
                    path.setAttribute("stroke-linecap", "round");
                    path.setAttribute("stroke-linejoin", "round");
            
                    // Append the path to the SVG
                    svg.appendChild(path);
            
            
                    // Append the Image element to the document
                    divc.appendChild(svg);
                }
                else if (cell == "O"){
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("width", "800");
                    svg.setAttribute("height", "800");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    svg.setAttribute("fill", "none");
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            
                    // Create a path element and set its attributes
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z");
                    path.setAttribute("stroke", "#000000");
                    path.setAttribute("stroke-width", "2");
                    path.setAttribute("stroke-linecap", "round");
                    path.setAttribute("stroke-linejoin", "round");
            
                    // Append the path to the SVG
                    svg.appendChild(path);
            
            
                    // Append the Image element to the document
                    divc.appendChild(svg);
                }
                cellc += 1;
                
            });
            rowc +=1;
        });
        
    };
    const renderWinner = (winner) =>{
        let body = document.querySelector("body")
        let dialog = document.createElement('dialog');
        dialog.innerHTML = (`${winner} won!`)
        body.appendChild(dialog)
        dialog.showModal()
    }
    return {renderDisplay, renderWinner};
})();

const game = (() => { //module
    let player;
    let player2;
    const initializeGame = () => {
        //initializes game
        const gameboard = Gameboard;
        
            //picks the first player
        player = Player("X");
        player2 = Player("O")
        displayController.renderDisplay(gameboard);
        playGame(player, gameboard);
        
    }
    const playGame = (currentPlayer, gameboard) =>{
        let playername = currentPlayer.getName()
        
        let cells = document.querySelectorAll('.cell')
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                
                if (!(cell.classList.contains('X') || cell.classList.contains('O'))){
                    
                    let row = cell.classList[1][0]
                    let column = cell.classList[1][1]
                    //cell.classList.add(playername)
                    gameboard[row][column] = playername
                    let nextPlayer = currentPlayer === player ? player2 : player;
                    displayController.renderDisplay(gameboard);
                    playGame(nextPlayer, gameboard);
                    currentPlayer.makeMove(gameboard)
                }
            });
          });
    }
    const switchPlayer = (currentplayer) => {

        if (currentplayer == "X") {
            currentplayer = "O"
        }
        else {
            currentplayer = "X";
        }
    }
    const playRound = (currentPlayer,gameboard) => {
       
        currentPlayer.makeMove(gameboard)
        switchPlayer(currentPlayer);
        
    }
    const endGame = winner => {
        // display winner or display end message, button to restart
    };
    return {initializeGame, endGame};
})();


const Player = (playername) => {
    let getName = () => playername;
    let makeMove = (gameboard) => {
        let won = true;
    
        for (row in [0,1,2]) { //checks win via row
            if ((gameboard[row][0] == gameboard[row][1]) && (gameboard[row][1] == gameboard[row][2]) && (gameboard[row][1] == getName())){
                playerWon();
            }
        }
        for (j in [0,1,2]){
            if ((gameboard[0][j] == gameboard[1][j]) && (gameboard[0][j] == gameboard[2][j]) && (gameboard[0][j] == getName())){
                playerWon();
            }
        }
        if ((gameboard[0][0] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][2]) && (gameboard[1][1] == getName())){
            playerWon();
        }
        if ((gameboard[2][0] == gameboard[1][1]) && (gameboard[1][1] == gameboard[0][2]) && (gameboard[1][1] == getName())){
            playerWon();
        }
        //updates gameboard  
    }
    let playerWon = () => {
        //checks whether user has won, if yes ends the game and displays winner
        displayController.renderWinner(getName())
        //if 
    }
    return {makeMove, getName}
}

game.initializeGame();
