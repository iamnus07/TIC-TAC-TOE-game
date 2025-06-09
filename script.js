let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); 
let newGameBtn = document.querySelector("#new-btn"); 
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg"); 

let turnO = true; // true for O's turn, false for X's turn

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");

        if (box.innerText === "") { // Ensure box is empty before placing X or O
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            box.disabled = true; // Disable the box after selection
            turnO = !turnO; // Toggle turn
            checkWinner(); // Check if there is a winner
        }
    });
});

// Function to show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`; // Fixed msg usage
    msgContainer.classList.remove("hide"); // Show message container
};

// Function to hide winner message
const hideWinner = () => {
    msgContainer.classList.add("hide"); // Hide message container
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("winner", pos1val);
            showWinner(pos1val);
            return; // Exit function once a winner is found
        }
    }

    // Check for a draw (no empty boxes left)
    const isDraw = Array.from(boxes).every(box => box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

// Function to reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false; // Enable boxes for the new game
    });
    turnO = true; // Reset turn to player O
    hideWinner(); // Hide winner message
};

// Event listener for reset button
resetBtn.addEventListener("click", resetGame);

// Event listener for new game button
newGameBtn.addEventListener("click", () => {
    resetGame(); // Reset game for new game
    hideWinner(); // Hide winner message
});

