// Constants

const buttons = document.getElementsByClassName("control");
const restartButton = document.getElementById("restart-button");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const playerImage = document.getElementById("player-image");
const computerImage = document.getElementById("computer-image");
const playerUpdates = document.getElementById("player-updates");
const choices = ["rock", "paper", "scissors"];
const dashboard = document.getElementById("game");

let gameOver = false; //false at the beginning and can be made true to trigger endGame

// The restart button will only appear at the end of the game
restartButton.style.display = "none";

// Event listeners for the buttons

for (let button of buttons) {
    button.addEventListener("click", function () {
        let playerChoice = this.getAttribute("data-choice");
        playGame(playerChoice);
    });

}

/**
 * Main game function. Accepts one parameter;
 * the data-choice of the button selected
 */

function playGame(playerChoice) {

    playerImage.src = `assets/images/${choices[playerChoice]}.jpg`;
    playerImage.alt = choices[playerChoice];

    let computerChoice = Math.floor(Math.random() * 3);

    computerImage.src = `assets/images/${choices[computerChoice]}.jpg`;
    computerImage.alt = choices[computerChoice];

    let result = checkWinner(choices[computerChoice], choices[playerChoice]);

    updateScores(result);
}

/**
 * Checks the winner of the game
 * Accepts two strings
**/

function checkWinner(computerChoice, playerChoice) {
    if (computerChoice === playerChoice) {
        return "Draw!";
    } else if (
        (computerChoice === "rock" && playerChoice === "scissors") ||
        (computerChoice === "paper" && playerChoice === "rock") ||
        (computerChoice === "scissors" && playerChoice === "paper")
    ) {
        return "computer";
    } else {
        return "player";
    }
}

/**
 * Updates score 
 */

function updateScores(result) {
    if (result === "player") {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
        playerUpdates.textContent = "You win this round...";
        if (parseInt(playerScore.textContent) === 10) {
            endGame("player");
        }
    } else if (result === "computer") {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
        playerUpdates.textContent = "Computer wins this round...";
        if (parseInt(computerScore.textContent) === 10) {
            endGame("computer");
        }
    } else {
        playerUpdates.textContent = "Draw... you both lose :P";
    }
}

function endGame(winner) {
    gameOver = true;
    for (let button of buttons) {
        button.disabled = true;
    }
    playerUpdates.textContent = winner === "player" ? "Congratulations - you're the winner!!" : "Computer wins this time... try again?";

    dashboard.style.display = "none";
    restartButton.style.display = "flex";
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    gameOver = false;
    dashboard.style.display = "inline";

    playerScore.textContent = "0";
    computerScore.textContent = "0";
    playerImage.src = `assets/images/player.png`;
    computerImage.src = `assets/images/computer.png`;
    playerUpdates.textContent = "aaaaand... begin!";
    restartButton.style.display = "none";
    for (let button of buttons) {
        button.disabled = false; // Enable the buttons

    }
}

