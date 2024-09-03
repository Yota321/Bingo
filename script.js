document.addEventListener('DOMContentLoaded', () => {
    const bingoBoard = document.getElementById('bingo-board');
    const timerElement = document.getElementById('timer');
    const messageElement = document.getElementById('message');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    let markedCells = 0;
    let linesCompleted = 0;
    let timer;
    let secondsElapsed = 0;

    // Create the Bingo board
    for (let i = 1; i <= 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.textContent = i;
        cell.addEventListener('click', markCell);
        bingoBoard.appendChild(cell);
    }

    // Timer that counts up from 0
    timer = setInterval(() => {
        secondsElapsed++;
        timerElement.textContent = `Time: ${secondsElapsed} seconds`;
    }, 1000);

    // Function to mark a cell
    function markCell(event) {
        const cell = event.target;
        if (!cell.classList.contains('marked')) {
            cell.classList.add('marked');
            markedCells++;
            playClickSound();
            triggerVibration(100);  // Vibrate for 100 milliseconds
            checkBingo();
        }
    }

    // Function to play click sound
    function playClickSound() {
        clickSound.play();
    }

    // Function to play win sound
    function playWinSound() {
        winSound.play();
    }

    // Function to trigger vibration
    function triggerVibration(duration) {
        if ("vibrate" in navigator) {
            navigator.vibrate(duration);
        }
    }

    // Check for 5 lines completed
    function checkBingo() {
        const cells = document.querySelectorAll('.bingo-cell');
        let rows = [0, 0, 0, 0, 0];
        let cols = [0, 0, 0, 0, 0];
        let diag1 = 0, diag2 = 0;

        cells.forEach((cell, index) => {
            if (cell.classList.contains('marked')) {
                const row = Math.floor(index / 5);
                const col = index % 5;
                rows[row]++;
                cols[col]++;
                if (row === col) diag1++;
                if (row + col === 4) diag2++;
            }
        });

        // Count completed lines
        linesCompleted = 0;
        linesCompleted += rows.filter(row => row === 5).length;
        linesCompleted += cols.filter(col => col === 5).length;
        if (diag1 === 5) linesCompleted++;
        if (diag2 === 5) linesCompleted++;

        // If 5 lines are completed, show Bingo
        if (linesCompleted >= 5) {
            messageElement.textContent = `Bingo! You completed in ${secondsElapsed} seconds!`;
            playWinSound();
            triggerVibration([500, 200, 500, 200, 500]); // Continuous vibration pattern
            clearInterval(timer);

            // Display a dialog box to stop vibration
            setTimeout(() => {
                alert("Congratulations! You won! Click OK to stop vibration.");
                navigator.vibrate(0); // Stop all vibrations
            }, 1000);
        }
    }
});
