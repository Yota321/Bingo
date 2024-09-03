document.addEventListener('DOMContentLoaded', () => {
    const bingoBoard = document.querySelector('.bingo-board');
    const bingoHeaders = ['letter-B', 'letter-I', 'letter-N', 'letter-G', 'letter-O'];
    let markedCount = 0;

    // Generate 25 unique random numbers from 1 to 25
    let numbers = generateUniqueRandomNumbers(1, 25, 25);

    // Populate the bingo board with number boxes
    numbers.forEach((number, index) => {
        const box = document.createElement('div');
        box.classList.add('bingo-box');
        box.textContent = number;
        box.dataset.index = index; // Save index for checking rows/columns/diagonals
        box.addEventListener('click', () => {
            if (!box.classList.contains('clicked')) {
                box.classList.add('clicked');
                checkForLine();
            }
        });
        bingoBoard.appendChild(box);
    });

    // Function to generate unique random numbers
    function generateUniqueRandomNumbers(min, max, count) {
        let numbers = [];
        while (numbers.length < count) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers;
    }

    // Function to check if a line of 5 is completed
    function checkForLine() {
        const boxes = Array.from(document.querySelectorAll('.bingo-box'));
        const lines = getLines();

        // Check each line
        lines.forEach(line => {
            if (line.every(index => boxes[index].classList.contains('clicked'))) {
                markBingoHeader();
            }
        });
    }

    // Function to get all possible lines (rows, columns, diagonals)
    function getLines() {
        let lines = [];

        // Rows
        for (let i = 0; i < 5; i++) {
            lines.push([i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4]);
        }

        // Columns
        for (let i = 0; i < 5; i++) {
            lines.push([i, i + 5, i + 10, i + 15, i + 20]);
        }

        // Diagonals
        lines.push([0, 6, 12, 18, 24]);
        lines.push([4, 8, 12, 16, 20]);

        return lines;
    }

    // Function to mark a letter from "BINGO"
    function markBingoHeader() {
        if (markedCount < bingoHeaders.length) {
            const header = document.getElementById(bingoHeaders[markedCount]);
            header.classList.add('clicked');
            markedCount++;
            if (markedCount === bingoHeaders.length) {
                alert('Bingo! You won!');
            }
        }
    }
});
