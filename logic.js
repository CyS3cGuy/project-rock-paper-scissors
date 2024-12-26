const IMG_PATH = ["./images/rock.png", "./images/paper.png", "./images/scissors.png"];

let roundNum = 0;
let winner = "?? Win";
let score = 0;
let computer_choice = 0;
let human_choice = 0;

let startgame_button = document.querySelector("#btn-start");
let rock_button = document.querySelector("#btn-rock");
let paper_button = document.querySelector("#btn-paper");
let scissors_button = document.querySelector("#btn-scissors");
let roundnum_span = document.querySelector(".roundnum");
let whowin_span = document.querySelector(".whowin");
let score_span = document.querySelector(".score");
let totalRound_span = document.querySelector(".totalRound");
let human_choice_txt = document.querySelector(".your-choice .choice-image p");
let human_choice_image = document.querySelector(".your-choice .choice-image img");
let computer_choice_txt = document.querySelector(".computer-choice .choice-image p");
let computer_choice_image = document.querySelector(".computer-choice .choice-image img");


// When user click "Start Game" Button (Note: Since event listener need a callback function expression, this can only be done once the function is defined.)

let startGame = function () {

    // Disable "Start Game" button
    startgame_button.disabled = true;

    // Make choice image = display: none for human and computer
    human_choice_image.style.display = "none";
    computer_choice_image.style.display = "none";

    // Display choice text for human and computer 
    human_choice_txt.style.display = "block";
    computer_choice_txt.style.display = "block";

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
}