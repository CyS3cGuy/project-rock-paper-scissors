const IMG_PATH = ["./images/rock.png", "./images/paper.png", "./images/scissors.png"];

// Variables
let gameState = "Start";
let roundNum = 1;
let phaseText = "(Phase: Rock, Paper, Scissors)";
let playerScore = 0;
let computerScore = 0;
let playerChoice = [-1, -1, -1];
let computerChoice = [-1, -1, -1];
let playerParaDisplay = ["block", "block"];
let playerImgDisplay = ["none", "none"];
let proceedBtnText = "Proceed Next Phase";
let proceedBtnDisabled = true;
let notificationText = "Choose Two Gestures.";

// DOM - in #message-container
const proceedBtn = document.querySelector("#btn-proceed");
const roundNumTextSpan = document.querySelector("#roundnum-text");
const phaseTextSpan = document.querySelector("#phase-text")

// DOM - in #player-choice-container
const playerChoiceContainer =
    [document.querySelector("#player-choice-container ")]
const playerScoreTextSpan = document.querySelector("#player-score .score")
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
const computerScoreTextSpan = document.querySelector("#computer-score .score")
const computerChoiceImgs =
    [document.querySelector("#computer-choice-one img"),
    document.querySelector("#computer-choice-two img")];
const computerChoiceImgFinal = document.querySelector("#computer-choice-final img");

// DOM - in #notification
const notificationTextSpan = document.querySelector("#notification span");


proceedBtn.addEventListener("click", proceedGame);



// gameState = "Start" || gameState = "Continue" (IF proceed button is clicked and gameState is "Start" or "Continue")
// 1. IF gameState = "Start"
//    1.1 Initialise global variables. 
// 2. IF gameState = "Continue"
//    2.1 increase roundnum
// 3. Create rock, paper and scissors buttons for 2 choices
// 4. Assign values to rock (0), paper (1) and scissors (2) button
// 5. Add event listener to the buttons, such that if gesture button is selected, value is stored in the player choice. however, buttons for the choice remain active for player to change their mind. 
// 6. check if 2 buttons are pressed
//    6.1 IF only 1 button is pressed, 
//        6.1.1 update notification text to "Choose One More Gesture."
//    6.2 ELSE IF 2 buttons are preseed,
//        6.2.1 Update notification text to "Click Proceed Next Phase"
//        6.2.2 Update proceed button text to "Proceed Next Phase"
//        6.2.2 Enable the proceed button
// 7. run computer logic to choose 2 values and store the 2 values in a predefined array
//    7.1 create temporary array to store [0,1,2]
//    7.2 Math.floor(Math.random() * (max - min + 1) + min) where max is 2 and 0 is min to determine first gesture. store it in the 1st element of predefined array
//    7.3 filter out the temporary array to only store the unchosen number (tempArr.filter(e => e !== firstGesture))
//    7.4 run Math.floor(Math.random() * (max - min + 1) + min) again where max is 1 and 0 is min to determine the index of array and obtain second gesture
// 8. if player click proceed button, update gameState to "ProceedToMinus"
//
// gameState = "ProceedToMinus" (IF proceed button is clicked and gameState is "ProceedToMinus")
// 1. disable proceed button
// 2. Update phase text to "Minus One"
// 2. remove rock, paper and scissors buttons 
// 3. display choice image for player and computer
// 4. compute the final choice for computer
//    4.1 compute the chance of winning of first gesture for computer
//        4.1.1 IF computer gesture value === player first gesture value
//                  winning1 = 0.5
//              ELSE IF computer gesture value > player first gesture value && computer gesture value + player first gesture value !== 2
//                  winning1 = 1
//        4.1.2 ELSE 
//                  winning1 = -1 
//        4.1.3 do the same for player second gesture (winning2)
//        4.1.4 winningChance1 = (winning1 + winning2 / 2)
//    4.2 compute the chance of winning of second gesture for computer
//        4.2.2 do the same for winningChance2
//    4.3 compare both chances of winning and select the gesture that yield highest chance of winning
//        4.3.1 IF winningChance1 > winningChance2, select first gesture
//        4.3.2 ELSE IF winningChance2 > winningChance1, select second gesture
//        4.3.3 ELSE IF winningChance1 = winningChance2, Math.floor(Math.random() * (max - min + 1) + min) where max is 2 and 1 is min
//              IF 1, then first gesture
//              ELSE IF 2, then second gesture
// 4. add event listener to the player choice container element in such a way that player can click on the image to choose his/her final choice
//    4.1 upon click, get the value of the image container to determine the choice and store in predefined variable
//    4.2 toggle border class to create a colored border around chosen image (remember to untoggle already chosen image if the new chosen is not the existing chosen)
//    4.3 update proceed button text to "Confirm Final Choice"
//    4.4 update notification text to "Click Confirm Final Choice"
//    4.5 enable the proceed button
// 5. if player click proceed button, update gameState to "FinalChoiceConfirm"
//
// gameState = "FinalChoiceConfirm" (IF proceed button is clicked and gameState is "FinalChoiceConfirm"
// 1. remove player choice container element event listener
// 2. compute who wins (reuse the function used for determine the winning chance. remember that -1 means player wins and 1 means computer wins, 0.5 means draw)
// 2. compute score 
// 3. check if score for player or computer reach 5
//    3.1 IF playerScore || computerScore == 5
//        3.1.1 IF playerScore == 5, then update notification text to "Congratulations! You win!"
//        3.1.2 ELSE, update notification text to "Oops! Tough luck. You lose..."
//        3.1.3 update proceed button text to "Start Another Game"
//        3.1.5 update gameState to "Start"
//        3.1.6 update phase text to "Game Completed"
//    3.2 ELSE 
//        3.2.1 IF player wins, update notifications to "You win this round!"
//        3.2.2 ELSE IF computer wins, update notifications to "Computer wins this round!"
//        3.2.3 ELSE update notifications to "This round is a draw"
//        3.2.4 Update proceed button text to "Start Next Round"
//        3.2.6 update gameState to "Continue"
//        3.2.7 update phase text to "Round Completed"

function proceedGame() {
    if (gameState === "Start" || gameState === "Continue") {
        if (gameState === "Start") { initGlobalVariables(); updateDOMByGlobalVars(true, true, true) }
        else if (gameState === "Continue") { ++roundNum; }

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

            playerChoiceBtnContainer[i].addEventListener("click", (e) => {
                // Get which choice is being targeted
                // And get which button is clicked
                let choiceValue = +e.target.parentElement.parentElement.getAttribute("value");
                let buttonGestureValue = +e.target.value;


                // Populate into player choice array where the position is determined by the choice value
                playerChoice[choiceValue] = buttonGestureValue !== undefined ? buttonGestureValue : playerChoice[choiceValue];

                // Make sure to display the image
                playerImgDisplay[choiceValue] = "block";
                playerParaDisplay[choiceValue] = "none";

                let hasPlayerChosenFirstChoice = playerChoice[0] != -1;
                let hasPlayerChosenSecondChoice = playerChoice[1] != -1;

                if (hasPlayerChosenFirstChoice && hasPlayerChosenSecondChoice) {
                    proceedBtnText = 'Proceed Next Phase';
                    notificationText = 'Click "Proceed Next Phase".';
                    proceedBtnDisabled = false;

                } else if (hasPlayerChosenFirstChoice || hasPlayerChosenSecondChoice) {
                    notificationText = 'Choose one more gesture.';
                }

                updateDOMByGlobalVars(true, true, true);
            })
        }

        gameState = "ProceedToMinusOne";
    }

    else if (gameState === "ProceedToMinusOne") {
        proceedBtnDisabled = true;
        phaseText = "(Phase: Minus One)";
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

        computerChoice[2] = chooseFinalGestureForComputer(computerWinningChance, [computerChoice[0], computerChoice[1]]);
    }



}

// Initialise global variables

function initGlobalVariables() {
    roundNum = 1;
    phaseText = "(Phase: Rock, Paper, Scissors)";
    playerScore = 0;
    computerScore = 0;
    playerChoice = [-1, -1, -1];
    computerChoice = [-1, -1, -1];
    playerParaDisplay = ["block", "block"];
    playerImgDisplay = ["none", "none"];
    proceedBtnText = "Start Game";
    proceedBtnDisabled = true;
    notificationText = "Choose Two Gestures.";
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
            imageElement.src = playerChoice[index] === -1 ? "" : IMG_PATH[playerChoice[index]];

        });

        computerChoiceImgs.forEach((imageElement, index) => {
            imageElement.src = computerChoice[index] === -1 ? "" : IMG_PATH[computerChoice[index]];
        });

        // Update the paragraph text in image box
        playerChoiceParas.forEach((paraElement, index) => {

            paraElement.textContent = `Choose Your ${index + 1}${index === 0 ? "st" : "nd"} Choice`;
            paraElement.style["display"] = playerParaDisplay[index];
        });
    }
}

// Input: the button element, the parent container, what text it holds and the value it holds
function createButton(buttonElement, parent, text, value) {
    buttonElement.textContent = text;
    buttonElement.value = value;
    parent.appendChild(buttonElement);
}

function clearAllChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
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
function chooseFinalGestureForComputer(winningChance, gesture) {
    if (winningChance[0] > winningChance[1]) {
        return gesture[0];
    } else if (winningChance[1] > winningChance[0]) {
        return gesture[1];
    }

    return gesture[randomiseNum(0, 1)];
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
    else if (primaryGestureValue === comparingGestureValue) {
        return 0.5;
    }

    return -1;
}

// Function to compute winning chance
// Input: Takes in winning indicator array, where first element is the first winning indicator, second element is the second winning indicator
// Output: An average out of the 2 winning indicator
function computeWinningChance(winningIndicator) {
    return (winningIndicator[0] + winningIndicator[1]) / 2;
}

// Utility function to randomise number between min and max

function randomiseNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 

/*
// IF roundNum = 5
if (roundNum === 5) {
    // Zeroise the score
    score = 0;

    // Initialise the roundnum to 1
    roundNum = 0;

    // Replace score span on DOM with score variable
    score_span.innerText = score.toString();

    // Replace totalRound span on DOM with 0
    totalRound_span.innerText = "0";
}

// Replace whowins span DOM with "?? "
whowin_span.innerText = "?? Win";

// Increase roundnum variable
++roundNum;

// Display updated round number on DOM
roundnum_span.innerText = roundNum.toString();

// Enable the human choice button DOM
rock_button.disabled = false;
paper_button.disabled = false;
scissors_button.disabled = false;
}

// When user click any human choice button (Rock, Paper or Scissors)
let chooseGesture = function (event) {
// Store choice in human_choice variable (the '+' convert string to number)
human_choice = getHumanChoice(event);

// Disable human choice button DOM
rock_button.disabled = true;
paper_button.disabled = true;
scissors_button.disabled = true;

// Store a random number between 1 - 3 for computer choice in comp_choice variable
computer_choice = getComputerChoice();

// Replace choice image source path according to choice
// minus 1 because index position starts at 0
human_choice_image.src = IMG_PATH[human_choice - 1];
computer_choice_image.src = IMG_PATH[computer_choice - 1];

// Make choice text = display: none for human and computer
human_choice_txt.style.display = "none";
computer_choice_txt.style.display = "none";

// Display choice image for human and computer
human_choice_image.style.display = "block";
computer_choice_image.style.display = "block";

// Compare human choice and computer choice and determine who win
// IF draw
//   Store "Draw" in winner variable
//   Increase score by 0.5 


if (human_choice === 1 && computer_choice === 1 ||
    human_choice === 2 && computer_choice === 2 ||
    human_choice === 3 && computer_choice === 3) {
    winner = "Draw";
    score += 0.5;

    // ELSE IF human win, 
    //   Store "You Win" in winner variable
    //   Increase score by 1
} else if (human_choice === 1 && computer_choice === 3 ||
    human_choice === 2 && computer_choice === 1 ||
    human_choice === 3 && computer_choice === 2) {
    winner = "You Win!";
    score += 1;

    // ELSE 
    //   Computer win,
    //   Store "Computer Win" in winner variable        
} else {
    winner = "Computer Win!";
}

// Replace whowins span DOM with the winner variable
whowin_span.innerText = winner;

// Replace the score span DOM with the score variable
score_span.innerText = score.toString();

// Replace the totalRound span DOM with the roundnum variable
totalRound_span.innerText = roundNum.toString();

// IF roundNum < 5
//   Replace start-game-button text to "Start Next Round"
if (roundNum < 5) {
    startgame_button.innerText = "Start Next Round";
}
// ELSE IF roundNum = 5
//   Replace start-game-button text to "Game Over. Restart Game?"

else if (roundNum = 5) {
    startgame_button.innerText = "Game Over. Restart Game?"
}

// Enable start-game-button
startgame_button.disabled = false;
}

startgame_button.addEventListener("click", startGame);
rock_button.addEventListener("click", chooseGesture);
paper_button.addEventListener("click", chooseGesture);
scissors_button.addEventListener("click", chooseGesture);

// Get human choice function
// INPUT: Mouse click event
// OUTPUT: Number value from button element
function getHumanChoice(event) {
return +event.target.value;
}

// Get computer choice function
// INPUT: null
// OUTPUT: A random number value from 1 to 3
function getComputerChoice() {
return Math.round(Math.random() * 2 + 1);
*/

