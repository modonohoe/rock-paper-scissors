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

//false at the beginning and can be made true to trigger endGame
let gameOver = false;

// The restart button will only appear at the end of the game
restartButton.style.display = "none";

// This function has been adopted from the Code Institute walkthrough project by Matt Rudge
// Event listeners for the buttons
for (let button of buttons) {
    button.addEventListener("click", function () {
        let playerChoice = this.getAttribute("data-choice");
        playGame(playerChoice);
    });

}

// This function has been adopted from the Code Institute walkthrough project by Matt Rudge
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
 * Accepts two strings - computer and player's choices
 */

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
 * Updates score a depending on the return of the checkWinner function
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
        playerUpdates.textContent = "Draw... you both lose.";
    }
}

/**
 * Determines the overall winner
 * Diasables buttons and hides them so no further choices can be made
 * Shows the restart button.
 */

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

/**
 * Resets the game.
 * Hides the restart button and enables use of buttons again.
 */

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
        button.disabled = false;
    }
}

