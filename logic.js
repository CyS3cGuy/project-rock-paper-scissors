const IMG_PATHS = ["./images/rock.png", "./images/paper.png", "./images/scissors.png"];
const GESTURES = ["ROCK", "PAPER", "SCISSORS"];

// Variables
let gameState = "Start";
let roundNum = 1;
let phaseText = "(Phase: Rock, Paper, Scissors)";
let playerScore = 0;
let computerScore = 0;
let playerChoice = [-1, -1];
let computerChoice = [-1, -1];
let playerFinalChoice = [-1, -1]; // First element is the gesture value, second element is the index position of "playerChoice" being chosen
let computerFinalChoice = [-1, -1]; // First element is the gesture value, second element is the index position of "computerChoice" being chosen
let playerParaDisplay = ["none", "none"];
let playerImgDisplay = ["none", "none"];
let computerImgDisplay = ["none", "none"];
let proceedBtnText = "Start Game";
let proceedBtnDisabled = false;
let notificationText = "Fancy Starting a Game??";
let winner = null;

// DOM - in #message-container
const proceedBtn = document.querySelector("#btn-proceed");
const roundNumTextSpan = document.querySelector("#roundnum-text");
const phaseTextSpan = document.querySelector("#phase-text")

// DOM - in #player-choice-container
const playerScoreTextSpan = document.querySelector("#player-score .score")

const playerChoiceContainer =
    [document.querySelector("#player-choice-one"),
    document.querySelector("#player-choice-two")];

const playerChoiceParas =
    [document.querySelector("#player-choice-one p"),
    document.querySelector("#player-choice-two p")];

const playerChoiceParaFinal = document.querySelector("#player-choice-final p");

const playerChoiceImgs =
    [document.querySelector("#player-choice-one img"),
    document.querySelector("#player-choice-two img")];

const playerChoiceImgFinal = document.querySelector("#player-choice-final img");

const playerChoiceBtnContainer =
    [document.querySelector("#player-choice-one .button-choice"),
    document.querySelector("#player-choice-two .button-choice")];

const playerChoiceBtnContainerFinal = document.querySelector("#player-choice-final .button-choice");

// DOM - in #computer-choice-container
const computerScoreTextSpan = document.querySelector("#computer-score .score");

const computerChoiceContainer =
    [document.querySelector("#computer-choice-one"),
    document.querySelector("#computer-choice-two")];

const computerChoiceImgs =
    [document.querySelector("#computer-choice-one img"),
    document.querySelector("#computer-choice-two img")];

const computerChoiceImgFinal = document.querySelector("#computer-choice-final img");

// DOM - in #notification
const notificationTextSpan = document.querySelector("#notification span");

// Update DOM based on set global variables the first time when game run
updateDOMByGlobalVars(true, true, true);

proceedBtn.addEventListener("click", proceedGame);

function proceedGame() {
    if (gameState === "Start" || gameState === "Continue") {
        if (gameState === "Start") {
            initGlobalVariables(false);
            updateDOMByGlobalVars(true, true, true);
        }
        else if (gameState === "Continue") {
            initGlobalVariables(true);
            ++roundNum;
            updateDOMByGlobalVars(true, true, true);
        }

        removeBorderChoiceBox(playerChoiceContainer);
        removeBorderChoiceBox(computerChoiceContainer);

        // Choose 2 gestures for computer 
        chooseTwoGesturesForComputer();

        // Create rock, paper and scissors buttons for player to choose
        const rockBtns = [document.createElement("button"), document.createElement("button")];
        const paperBtns = [document.createElement("button"), document.createElement("button")];
        const scissorsBtns = [document.createElement("button"), document.createElement("button")];

        for (let i = 0; i < 2; i++) {
            createButton(rockBtns[i], playerChoiceBtnContainer[i], "Rock", 0);
            createButton(paperBtns[i], playerChoiceBtnContainer[i], "Paper", 1);
            createButton(scissorsBtns[i], playerChoiceBtnContainer[i], "Scissors", 2);

            // Add individual event listener to gesture buttons
            playerChoiceBtnContainer[i].addEventListener("click", listen_chooseGesture);
        }
    }

    else if (gameState === "ProceedToMinusOne") {
        proceedBtnDisabled = true;
        phaseText = "(Phase: Minus One)";
        notificationText = "Click on the image to choose your final choice.";
        computerImgDisplay = ["block", "block"];

        clearAllChild(playerChoiceBtnContainer[0]);
        clearAllChild(playerChoiceBtnContainer[1]);

        updateDOMByGlobalVars(true, true, true);

        let computerChoiceOneWinningIndicator =
            [computeWinningIndicator(computerChoice[0], playerChoice[0]),
            computeWinningIndicator(computerChoice[0], playerChoice[1])];

        let computerChoiceTwoWinningIndicator =
            [computeWinningIndicator(computerChoice[1], playerChoice[0]),
            computeWinningIndicator(computerChoice[1], playerChoice[1])];

        let computerWinningChance =
            [computeWinningChance(computerChoiceOneWinningIndicator),
            computeWinningChance(computerChoiceTwoWinningIndicator)];

        computerFinalChoice = chooseFinalGestureForComputer(computerWinningChance, computerChoice);

        playerChoiceContainer.forEach((choiceBox) => {
            choiceBox.classList.add("pointercursor");
            choiceBox.addEventListener("click", listen_selectChoiceBox);
        })
    }

    else if (gameState === "FinalChoiceConfirm") {

        playerChoiceContainer.forEach((choiceBox) => {
            choiceBox.removeEventListener("click", listen_selectChoiceBox);
            choiceBox.classList.remove("chosen-border");
            choiceBox.classList.remove("pointercursor");
        });

        winner = computeWinner(playerFinalChoice[0], computerFinalChoice[0]);
        computeScore(winner);

        let winRoundMsg = `You choose ${GESTURES[playerFinalChoice[0]]}, Computer choose ${GESTURES[computerFinalChoice[0]]}. You WIN this round! Click "Start Next Round" button.`;
        let loseRoundMsg = `You choose ${GESTURES[playerFinalChoice[0]]}, Computer choose ${GESTURES[computerFinalChoice[0]]}. You LOSE this round. Click "Start Next Round" button.`;
        let drawRoundMsg = `You choose ${GESTURES[playerFinalChoice[0]]}, Computer choose ${GESTURES[computerFinalChoice[0]]}. This round is a DRAW. Click "Start Next Round" button.`

        let winGameMsg = `You choose ${GESTURES[playerFinalChoice[0]]}, Computer choose ${GESTURES[computerFinalChoice[0]]}. Congratulations! You WIN the game!! Start another game, shall we?`;
        let loseGameMsg = `You choose ${GESTURES[playerFinalChoice[0]]}, Computer choose ${GESTURES[computerFinalChoice[0]]}.Oops! You LOSE the game... Let's start another game?`;

        if (playerScore === 5 || computerScore === 5) {
            notificationText = playerScore === 5 ? winGameMsg : loseGameMsg;
            proceedBtnText = "Start Next Game";
            phaseText = "(Phase: Game Completed)";
            gameState = "Start";
        }
        else {
            notificationText = winner === "player" ? winRoundMsg : winner === "computer" ? loseRoundMsg : drawRoundMsg;
            proceedBtnText = "Start Next Round";
            phaseText = "(Phase: Round Completed)";
            gameState = "Continue";
        }

        updateDOMByGlobalVars(true, true);

        // Add winner, loser or draw border
        if (winner === "player") {
            playerChoiceContainer[playerFinalChoice[1]].classList.add("winner-border");
            computerChoiceContainer[computerFinalChoice[1]].classList.add("loser-border");
        }
        else if (winner === "computer") {
            playerChoiceContainer[playerFinalChoice[1]].classList.add("loser-border");
            computerChoiceContainer[computerFinalChoice[1]].classList.add("winner-border");
        }
        else {
            playerChoiceContainer[playerFinalChoice[1]].classList.add("draw-border");
            computerChoiceContainer[computerFinalChoice[1]].classList.add("draw-border");
        }
    }

}

// Event Listener

// Listener function to assign values to global variables and display appropriate gesture images when gesture buttons are clicked in Rock, Paper and Scissors phase
function listen_chooseGesture(event) {
    // Get which choice is being targeted
    // And get which button is clicked
    let choiceValue = +event.target.parentElement.parentElement.getAttribute("value");
    let buttonGestureValue = +event.target.value;


    // Populate into player choice array where the position is determined by the choice value
    playerChoice[choiceValue] = Number.isInteger(buttonGestureValue) ? buttonGestureValue : playerChoice[choiceValue];

    // Make sure to display the image
    playerImgDisplay[choiceValue] = "block";
    playerParaDisplay[choiceValue] = "none";

    let hasPlayerChosenFirstChoice = playerChoice[0] != -1;
    let hasPlayerChosenSecondChoice = playerChoice[1] != -1;

    if (hasPlayerChosenFirstChoice && hasPlayerChosenSecondChoice) {
        proceedBtnText = 'Proceed Next Phase';
        notificationText = 'Click "Proceed Next Phase".';
        proceedBtnDisabled = false;
        gameState = "ProceedToMinusOne";

    } else if (hasPlayerChosenFirstChoice || hasPlayerChosenSecondChoice) {
        notificationText = 'Choose one more gesture.';
    }

    updateDOMByGlobalVars(true, true, true);
}

// Listener function to assign player choice to global variable and add border around player choice in Minus One phase
function listen_selectChoiceBox(event) {
    // Select the current choice clicked and add border to it
    let selectedChoiceBox = event.currentTarget;
    let currentChoiceClicked = +selectedChoiceBox.getAttribute("value");
    selectedChoiceBox.classList.add("chosen-border");

    // Remember to remove the border to unselect the other choice
    let theOtherChoice = (currentChoiceClicked + 1) % 2;
    playerChoiceContainer[theOtherChoice].classList.remove("chosen-border");

    // Assign to the global variable for keeping track of player final choice
    playerFinalChoice = [playerChoice[currentChoiceClicked], currentChoiceClicked];

    notificationText = 'Click "Confirm Final Choice"';
    proceedBtnText = "Confirm Final Choice";
    proceedBtnDisabled = false;
    gameState = "FinalChoiceConfirm";

    updateDOMByGlobalVars(true, true);
}


// Initialise global variables

function initGlobalVariables(needCarryNextRound) {

    phaseText = "(Phase: Rock, Paper, Scissors)";
    playerChoice = [-1, -1];
    computerChoice = [-1, -1];
    playerFinalChoice = [-1, -1]; // First element is the gesture value, second element is the index position of "playerChoice" being chosen
    computerFinalChoice = [-1, -1]; // First element is the gesture value, second element is the index position of "computerChoice" being chosen
    playerParaDisplay = ["block", "block"];
    playerImgDisplay = ["none", "none"];
    computerImgDisplay = ["none", "none"];
    proceedBtnText = "Start Game";
    proceedBtnDisabled = true;
    notificationText = "Choose Two Gestures.";

    if (!needCarryNextRound) {
        roundNum = 1;
        playerScore = 0;
        computerScore = 0;
    }
}

// Update DOM element based on global variables
function updateDOMByGlobalVars(reupdateText = true, reupdateLogic = true, reupdateImage = false) {
    if (reupdateLogic) {
        proceedBtn.disabled = proceedBtnDisabled;
    }

    if (reupdateText) {
        // Update text content
        proceedBtn.textContent = proceedBtnText;
        roundNumTextSpan.textContent = roundNum;
        phaseTextSpan.textContent = phaseText;
        playerScoreTextSpan.textContent = playerScore;
        computerScoreTextSpan.textContent = computerScore;
        notificationTextSpan.textContent = notificationText;
    }


    if (reupdateImage) {
        // Update images
        playerChoiceImgs.forEach((imageElement, index) => {
            imageElement.style["display"] = playerImgDisplay[index];
            imageElement.src = playerChoice[index] === -1 ? "" : IMG_PATHS[playerChoice[index]];

        });

        computerChoiceImgs.forEach((imageElement, index) => {
            imageElement.style["display"] = computerImgDisplay[index];
            imageElement.src = computerChoice[index] === -1 ? "" : IMG_PATHS[computerChoice[index]];
        });

        // Update the paragraph text in image box
        playerChoiceParas.forEach((paraElement, index) => {

            paraElement.textContent = `Choose Your ${index + 1}${index === 0 ? "st" : "nd"} Choice`;
            paraElement.style["display"] = playerParaDisplay[index];
        });
    }
}

// Function to create buttons and append to a parent
// Input: the button element, the parent container, what text it holds and the value it holds
function createButton(buttonElement, parent, text, value) {
    buttonElement.textContent = text;
    buttonElement.value = value;
    parent.appendChild(buttonElement);
}

// Function to clear all children elements in a parent
// Input: the parent element
function clearAllChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

// Function to remove border
// Input: the container that contains the choice boxes
function removeBorderChoiceBox(choiceContainer) {
    choiceContainer.forEach((choiceBox) => {
        choiceBox.classList.remove("winner-border");
        choiceBox.classList.remove("loser-border");
        choiceBox.classList.remove("draw-border");
    });
}

// Function to choose 2 gestures for computer
function chooseTwoGesturesForComputer() {
    let tempArr = [0, 1, 2];

    // Get the first choice
    computerChoice[0] = randomiseNum(0, 2);

    // We do not want to let computer choose the same gesture, so we have to do the following to choose one of the remaining 2
    tempArr = tempArr.filter(e => e !== computerChoice[0]);
    computerChoice[1] = tempArr[randomiseNum(0, 1)];
}

// Function to choose the final choice for computer
// Input: 1st argument is an array of winning chance, where first element is the winning chance of the first gesture, and second element is the winning chance of the second gesture
// Input: 2nd argument is an array of gesture value, where first element is the first gesture value chosen, second element is the second gesture value chosen
// Output: an array, 1st element is the gesture value, 2nd element is the position index of the choice
function chooseFinalGestureForComputer(winningChance, gesture) {
    if (winningChance[0] > winningChance[1]) {
        return [gesture[0], 0];
    } else if (winningChance[1] > winningChance[0]) {
        return [gesture[1], 1];
    }

    let randomNum = randomiseNum(0, 1);
    return [gesture[randomNum], randomNum];
}

// Function to compute winning indicator
// Input: 1st argument is the primary gesture choice value, 2nd argument is the gesture choice value for primary gesture choice value to compare with
// Output: 1 - primary gesture wins, -1 - primary gesture lose, 0.5 primary gesture draws
function computeWinningIndicator(primaryGestureValue, comparingGestureValue) {
    if (primaryGestureValue > comparingGestureValue) {
        if (primaryGestureValue + comparingGestureValue === 2) {
            return -1;
        }
        else {
            return 1;
        }
    }
    else if (primaryGestureValue < comparingGestureValue) {
        if (primaryGestureValue + comparingGestureValue === 2) {
            return 1;
        }
        else {
            return -1;
        }
    }
    else if (primaryGestureValue === comparingGestureValue) {
        return 0.5;
    }

    alert("Error: No winning indicator found");
    return undefined;
}

// Function to compute winning chance
// Input: Takes in winning indicator array, where first element is the first winning indicator, second element is the second winning indicator
// Output: An average out of the 2 winning indicator
function computeWinningChance(winningIndicator) {
    return (winningIndicator[0] + winningIndicator[1]) / 2;
}

// Function to compute the winner
// Input: 1st argument is the player gesture value, 2nd argument is the computer gesture value
// Output: a string which says who win, or who draw
function computeWinner(player, computer) {
    if (player > computer) {
        if (player + computer === 2) {
            return "computer";
        }
        else {
            return "player";
        }
    }
    else if (player < computer) {
        if (player + computer === 2) {
            return "player";
        }
        else {
            return "computer";
        }
    }
    else if (player === computer) {
        return "draw";
    }

    alert("Error: No winner found");
    return undefined;
}

// Function to compute the score
// Input: argument is the winner string
function computeScore(winner) {
    playerScore = winner === "player" ? playerScore + 1 : playerScore;
    computerScore = winner === "computer" ? computerScore + 1 : computerScore;
}

// Utility function to randomise number between min and max

function randomiseNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}