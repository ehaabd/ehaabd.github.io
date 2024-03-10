let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let boxesMini = Array.from(document.getElementsByClassName('boxMini'));

//X corresponds to blue
//O corresponds to yellow
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(false);
let spacesMini = Array(81).fill(null);
let playableBox = 4;

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const startGame = () => {
    boxesMini.forEach(boxMini => boxMini.addEventListener('click', boxMiniClicked));
    restartBtn.addEventListener('click', restart)
}

//Copied from StackOverflow because JavaScript is weird
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function boxMiniClicked(e){
    const id = e.target.id;

    if(id>(9*playableBox-1) && id<(9*playableBox+9)){
        if(!spacesMini[id]){
            spacesMini[id] = currentPlayer;
            e.target.innerText = currentPlayer;
    
            if(playerHasWonMini()){
                if(((spaces[playableBox]==X_TEXT) && currentPlayer==O_TEXT)||(spaces[playableBox]==O_TEXT && currentPlayer == X_TEXT)){
                    spaces[playableBox] = 'Y';
                    boxes[playableBox].style.backgroundColor='#00ff00';
                }else if(currentPlayer == X_TEXT){
                    spaces[playableBox] = X_TEXT;
                    boxes[playableBox].style.backgroundColor = '#1582ca';
                }else{
                    spaces[playableBox] = O_TEXT;
                    boxes[playableBox].style.backgroundColor = '#8f8a29';
                }
                if(playerHasWon()){
                    playerText.innerHTML = `${currentPlayer} has won!`;
                    boxesMini.forEach(boxMini => boxMini.removeEventListener('click', boxMiniClicked));
                } 
            }
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
            playableBox = (id%9);
            for(let i=0; i<9; i++){
                if(spacesMini[i+(playableBox*9)] == null){
                    break;
                }else if(i==8){
                    for(let j=0; j<81; j++){
                        if(spacesMini[j]==null){
                            playableBox=Math.floor(j/9);
                            break;
                        }
                    }
                }
            }
        }
    } 
}

function playerHasWonMini(){
    for(const condition of winningCombos){
        let a = condition[0], b = condition[1], c = condition[2];
        
        if(spacesMini[a+(playableBox*9)] != null && (spacesMini[a+(playableBox*9)] == spacesMini[b+(playableBox*9)]) && spacesMini[b+(playableBox*9)] == spacesMini[c+(playableBox*9)]){
            if(spaces[playableBox] == 'Y'){
                return false;
            }

            if(spaces[playableBox] == null){
                return true;
            }

            if(spaces[playableBox] == O_TEXT && spacesMini[a+(playableBox*9)] == O_TEXT){
                continue;
            }

            if(spaces[playableBox] == X_TEXT && spacesMini[a+(playableBox*9)] == X_TEXT){
                continue;
            }
            return true;
        }
    }
    return false;
}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] !== null && (spaces[a] === spaces[b] || spaces[b] === "Y") && (spaces[a] === spaces[c] || spaces[c] === "Y")) {
            if (spaces[a] !== "Y") {
                return spaces[a];
            } else if (spaces[b] !== "Y") {
                return spaces[b];
            } else if (spaces[c] !== "Y") {
                return spaces[c];
            }else{
                playerText.innerHTML = 'Um . . . Why would you do this? Nobody wins!';
                break;
            }
        }
    }

    return false;
}


function restart() {
    spaces.fill(null);
    spacesMini.fill(null);

    boxes.forEach( box => {
        box.style.backgroundColor = '';
    })

    boxesMini.forEach( boxMini=> {
        boxMini.innerText = '';
    })

    playableBox = 4;
    playerText.innerHTML = 'Tic Tac Toe Squared';
    currentPlayer = X_TEXT;
    startGame();
}

startGame();