const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = 'right';
let score = 0;

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lime';
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    // Move the snake
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    // Wrap around the canvas
    head.x = (head.x + canvas.width / gridSize) % (canvas.width / gridSize);
    head.y = (head.y + canvas.height / gridSize) % (canvas.height / gridSize);

    // Check for collisions with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Add the new head to the snake
    snake.unshift(head);

    // Check if the snake ate the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        generateFood();
    } else {
        // Remove the tail if the snake didn't eat food
        snake.pop();
    }

    draw();
}

function gameOver() {
    alert('Game Over!');
    // Reset the game
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    generateFood();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

generateFood();
setInterval(update, 100);
