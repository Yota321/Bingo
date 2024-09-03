document.addEventListener('DOMContentLoaded', () => {
    const bingoBoard = document.querySelector('.bingo-board');
    let numbers = generateUniqueRandomNumbers(1, 25, 25);

    numbers.forEach(number => {
        const box = document.createElement('div');
        box.classList.add('bingo-box');
        box.textContent = number;
        bingoBoard.appendChild(box);
    });
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
