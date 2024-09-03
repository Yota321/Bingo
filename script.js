let score = 0;
let timeLeft = 60;
let timerInterval;
let hintsEnabled = false;

document.addEventListener("DOMContentLoaded", function() {
    const bingoBoard = document.getElementById("bingo-board");
    const newGameButton = document.getElementById("new-game");
    const toggleHintsButton = document.getElementById("toggle-hints");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    function createBingoBoard() {
        bingoBoard.innerHTML = '';
        let numbers = Array.from({length: 25}, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        numbers.forEach(number => {
            const button = document.createElement("button");
            button.innerText = number;
            button.onclick = () => markNumber(button);
            bingoBoard.appendChild(button);
        });
    }

    function markNumber(button) {
        if (!button.classList.contains("marked")) {
            button.classList.add("marked");
            checkBingo();
        }
    }

    function checkBingo() {
        const buttons = Array.from(bingoBoard.children);
        const lines = [
            [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
            [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
        ];
        let bingo = lines.some(line => line.every(i => buttons[i].classList.contains("marked")));
        if (bingo) {
            alert("Bingo!");
            score++;
            scoreDisplay.textContent = score;
            resetTimer();
        }
    }

    function startTimer() {
        timeLeft = 60;
        timerDisplay.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                createBingoBoard();
                resetTimer();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        startTimer();
    }

    function toggleHints() {
        hintsEnabled = !hintsEnabled;
        toggleHintsButton.textContent = hintsEnabled ? "Hints On" : "Hints Off";
        document.querySelectorAll("#bingo-board button").forEach(button => {
            if (hintsEnabled && !button.classList.contains("marked")) {
                button.style.backgroundColor = "#ffc107";
            } else {
                button.style.backgroundColor = "#007bff";
            }
        });
    }

    newGameButton.onclick = () => {
        createBingoBoard();
        resetTimer();
        score = 0;
        scoreDisplay.textContent = score;
    };

    toggleHintsButton.onclick = toggleHints;

    createBingoBoard();
    startTimer();
});
