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