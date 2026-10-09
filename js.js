const startBtn = document.querySelector("#start-button");
const restartBtn = document.querySelector("#restart-button");

const createPlayer = (name,marker,score) => {
    return {name,marker,score}
};

const gameboard = (()=>{

    const gameBoard = ["","","","","","","","",""];

    const win = [[0,1,2],[2,5,8],[6,7,8],[0,3,6],[0,4,8],[2,4,6],[3,4,5],[1,4,7]];

    const handleClick = (p,i) => {
        if(gameBoard[i]!="") return;
        gameBoard[i] = p.marker;
        console.log(gameBoard);
        document.getElementById(i).textContent = p.marker;
    }

    const reset=()=>{
        console.log("yes");
        const squares = document.getElementsByClassName("square");
        for(let i=0;i<9;i++){
            gameBoard[i]="";
            squares[i].textContent = "";
        }
    }

    const winning = (p) => {
        for(let arr of win){
            let m1 = arr[0];
            let m2 = arr[1];
            let m3 = arr[2];
            if(gameBoard[m1]!="" && gameBoard[m2]!="" && gameBoard[m3]!=""){
                if(gameBoard[m1]==gameBoard[m2] && gameBoard[m1]==gameBoard[m3]){
                    alert(`${p.name} win`);
                    p.score++;
                    return true;
                }
            }
        }
    }
    return {
        handleClick,
        winning,
        reset
    }
})();

const Game = (()=>{
    let players = [];
    const start = () => {
        players = [createPlayer(document.getElementById("player1").value,"X",0),createPlayer(document.getElementById("player2").value,"O",0)];
        console.log(players);
    }
    let gameOver = false;
    const box = document.getElementById("gameboard");
    let currPlayerIndex = 0;
    for(let i=0;i<9;i++){
        let square = document.createElement('div');
        square.className="square";
        square.id = i;
        box.appendChild(square);
        square.addEventListener("click",(e)=>{
            if(square.textContent==""){
                if(currPlayerIndex==0) currPlayerIndex = 1;
                else currPlayerIndex = 0;
            }
            let index = parseInt(e.target.id);
            gameboard.handleClick(players[currPlayerIndex],index);
            gameOver = gameboard.winning(players[currPlayerIndex]);
            const display = document.getElementById("result-display");
            display.textContent = `${players[0].name} score: ${players[0].score} || ${players[1].name} score: ${players[1].score}`
            if(gameOver) gameboard.reset();
        })
    }
    return {
        start
    }
})();

startBtn.addEventListener("click",()=>{
    Game.start();
})

restartBtn.addEventListener("click",()=>{
    gameboard.reset();
})