window.onload = ()=>{
    for (let i = 0; i < allGrid.length; i++) {
       allGrid[i].setAttribute("onclick", "clickedBox(this)");
    }
}

const playBoard = document.querySelector(".game-board")
const selectBox = document.querySelector(".player-box")
const selectBtnX = selectBox.querySelector(".options .playerX")

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

const selectBtnO = selectBox.querySelector(".options .playerO")
const players = document.querySelector(".players")

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerIcon = "X";
let runBot = true;

function clickedBox(element){
    if (players.classList.contains("player")) {
        playerIcon = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerIcon);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerIcon);
        players.classList.add("active");
    }
    checkWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout (() => {
        bot(runBot);
    }, randomTimeDelay);
}

const allGrid = document.querySelectorAll("section span")

function bot() {
    let array = [];
    if (runBot) {
        playerIcon = "O";
        for (let i = 0; i < allGrid.length; i++) {
            if(allGrid[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) { 
                playerIcon = "X";
                allGrid[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allGrid[randomBox].setAttribute("id", playerIcon);
                players.classList.add("active");
            } else {
                allGrid[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allGrid[randomBox].setAttribute("id", playerIcon);
            }
            checkWinner();
        }
        allGrid[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerIcon = "X";
    }
}

function getElement(classname){
    return document.querySelector(".grid" + classname).id;
}

function checkIcon(Element1, Element2, Element3, icon){ 
    if(getElement(Element1) == icon && getElement(Element2) == icon && getElement(Element3) == icon){
        return true;
    }
}

const resultBox = document.querySelector(".result-box")
const wonText = resultBox.querySelector(".winner")


function checkWinner() {
    if (checkIcon(1,2,3,playerIcon) || checkIcon(4,5,6, playerIcon) || checkIcon(7,8,9, playerIcon) || checkIcon(1,4,7, playerIcon) || checkIcon(2,5,8, playerIcon) || checkIcon(3,6,9, playerIcon) || checkIcon(1,5,9, playerIcon) || checkIcon(3,5,7, playerIcon)) {
        runBot = false;
        bot(runBot);
        setTimeout(()=> {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `PLAYER <p>${playerIcon}</p> WON`;
    } else {
        if (getElement(1) != "" && getElement(2) != "" && getElement(3) != "" && getElement(4) != "" && getElement(5) != "" && getElement(6) != "" && getElement(7) != "" && getElement(8) != "" && getElement(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "DRAW!";
        }
    }
}

const replayBtn = resultBox.querySelector("button")

replayBtn.onclick = () => {
    window.location.reload();
}