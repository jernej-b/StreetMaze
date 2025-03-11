// Global variables for maze structure
let cols = 20;
let rows = 20;
let w = 40;
let grid = [     [[true, false, false, true], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, false, false], [true, true, true, false], [true, false, false, true], [true, true, true, false], [true, false, false, true], [true, false, false, false], [true, true, true, false], [true, false, false, true], [true, false, true, false], [true, true, false, false], [true, false, false, true], [true, false, true, false], [true, true, false, false], [true, false, false, true], [true, false, true, false], [true, true, false, false]],

[[false, true, false, true], [true, false, false, true], [true, false, true, false], [true, true, false, false], [false, true, false, true], [true, false, false, true], [false, true, true, false], [true, false, true, true], [false, true, true, false], [false, false, false, true], [true, false, true, false], [false, true, true, false], [true, false, false, true], [false, true, true, false], [false, true, false, true], [true, false, false, true], [false, true, true, false], [false, true, false, true], [true, true, false, true], [false, true, false, true]],

[[false, true, false, true], [false, true, false, true], [true, false, true, true], [false, false, false, false], [false, true, true, false], [false, true, false, true], [true, false, false, true], [true, false, false, false], [true, true, false, false], [false, false, true, true], [true, true, false, false], [true, false, false, true], [false, true, true, false], [true, false, false, true], [false, true, true, false], [false, false, true, true], [true, false, false, false], [false, false, true, false], [false, true, true, false], [false, true, false, true]],

[[false, true, false, true], [false, false, true, true], [true, true, false, false], [false, true, true, true], [true, false, false, true], [false, true, true, false], [false, true, false, true], [false, true, false, true], [false, true, false, true], [true, false, true, true], [false, true, true, false], [false, false, true, true], [true, false, true, false], [false, true, true, false], [true, false, false, true], [true, true, false, false], [false, false, false, true], [true, true, true, false], [true, false, false, true], [false, true, false, false]],

[[false, true, false, true], [true, true, false, true], [false, false, true, true], [true, false, true, false], [false, true, true, false], [true, true, false, true], [false, true, false, true], [false, true, false, true], [false, false, true, true], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, true, false, false], [true, false, false, true], [false, true, true, false], [false, true, false, true], [false, true, false, true], [true, false, false, true], [false, true, true, false], [false, true, false, true]],

[[false, true, false, true], [false, false, true, true], [true, true, false, false], [true, false, false, true], [true, false, true, false], [false, true, false, false], [false, true, false, true], [false, false, true, true], [true, false, true, false], [true, true, false, false], [true, false, true, true], [true, false, true, false], [false, false, true, false], [false, true, true, false], [true, false, false, true], [false, true, true, false], [false, true, true, true], [false, true, false, true], [true, false, false, true], [false, true, true, false]],

[[false, false, true, true], [true, true, false, false], [false, true, false, true], [false, false, true, true], [true, true, false, false], [false, true, false, true], [false, true, false, true], [true, false, false, true], [true, true, false, false], [false, false, true, true], [true, false, true, false], [true, true, false, false], [true, false, false, true], [true, true, true, false], [false, true, false, true], [true, false, false, true], [true, false, true, false], [false, true, true, false], [false, false, true, true], [true, true, false, false]],

[[true, false, false, true], [false, true, true, false], [false, true, false, true], [true, false, false, true], [false, true, true, false], [false, false, true, true], [false, true, true, false], [false, true, false, true], [false, false, true, true], [true, true, true, false], [true, false, false, true], [false, true, true, false], [false, false, false, true], [true, false, true, false], [false, true, true, false], [false, false, true, true], [true, false, true, false], [true, true, false, false], [true, true, false, true], [false, true, false, true]],

[[false, false, true, true], [true, true, false, false], [false, false, true, true], [false, false, true, false], [true, false, true, false], [true, false, true, false], [true, false, true, false], [false, true, true, false], [true, false, false, true], [true, false, true, false], [false, true, true, false], [true, false, false, true], [false, true, true, false], [true, false, false, true], [true, true, false, false], [true, false, false, true], [true, false, true, false], [false, true, true, false], [false, true, false, true], [false, true, false, true]],

[[true, true, false, true], [false, false, true, true], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, true, false, false], [true, false, false, true], [true, false, true, false], [false, true, true, false], [true, false, true, true], [true, false, true, false], [false, false, true, false], [true, false, true, false], [false, true, true, false], [false, true, false, true], [false, false, false, true], [true, false, true, false], [true, true, false, false], [false, false, true, true], [false, true, false, false]],

[[false, false, false, true], [true, false, true, false], [true, false, false, false], [true, true, false, false], [true, false, false, true], [false, true, true, false], [false, true, false, true], [true, false, false, true], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, true, false, false], [true, true, false, true], [true, false, false, true], [false, true, true, false], [false, false, false, true], [true, true, true, false], [false, false, true, true], [true, true, false, false], [false, true, false, true]],

[[false, true, true, true], [true, false, false, true], [false, true, true, false], [false, true, false, true], [false, true, false, true], [true, false, true, true], [false, false, false, false], [false, true, true, false], [true, false, true, true], [true, true, false, false], [true, false, false, true], [false, true, true, false], [false, false, true, true], [false, true, false, false], [true, false, false, true], [false, true, true, false], [true, false, false, true], [true, false, true, false], [false, true, true, false], [false, true, false, true]],

[[true, false, false, true], [false, true, true, false], [true, false, false, true], [false, true, true, false], [false, false, true, true], [true, true, false, false], [false, false, true, true], [true, false, true, false], [true, false, true, false], [false, true, true, false], [false, false, false, true], [true, false, true, false], [true, true, false, false], [false, true, false, true], [false, false, true, true], [true, true, true, false], [false, true, false, true], [true, true, false, true], [true, false, false, true], [false, true, true, false]],

[[false, false, false, true], [true, true, false, false], [false, true, true, true], [true, false, false, true], [true, true, false, false], [false, true, false, true], [true, false, false, true], [true, true, false, false], [true, false, false, true], [true, true, false, false], [false, false, false, true], [true, true, true, false], [false, true, false, true], [false, false, true, true], [true, false, true, false], [true, false, true, false], [false, true, true, false], [false, false, false, true], [false, true, true, false], [true, true, false, true]],

[[false, true, true, true], [false, false, true, true], [true, true, false, false], [false, true, false, true], [false, true, false, true], [false, false, true, true], [false, true, true, false], [false, false, true, true], [false, true, true, false], [false, true, false, true], [false, true, true, true], [true, false, false, true], [false, true, true, false], [true, false, true, true], [true, false, false, false], [true, false, true, false], [true, true, false, false], [false, true, false, true], [true, false, false, true], [false, true, false, false]],

[[true, false, false, true], [true, true, false, false], [false, true, false, true], [false, true, false, true], [false, false, false, true], [true, false, true, false], [true, false, true, false], [true, false, true, false], [true, true, false, false], [false, false, true, true], [true, true, false, false], [false, false, false, true], [true, false, true, false], [true, true, false, false], [false, false, true, true], [true, true, false, false], [false, true, true, true], [false, true, false, true], [false, true, false, true], [false, true, false, true]],

[[false, true, false, true], [false, true, false, true], [false, false, true, true], [false, true, true, false], [false, true, false, true], [true, true, false, true], [true, false, false, true], [true, false, true, false], [false, true, true, false], [true, true, false, true], [false, true, false, true], [false, true, false, true], [true, false, false, true], [false, true, true, false], [true, false, false, true], [false, true, true, false], [true, false, false, true], [false, true, true, false], [false, true, false, true], [false, true, false, true]],

[[false, true, false, true], [false, false, true, true], [true, false, true, false], [true, false, true, false], [false, true, true, false], [false, false, true, true], [false, false, true, false], [true, false, true, false], [true, true, false, false], [false, true, false, true], [false, true, false, true], [false, true, true, true], [false, true, false, true], [true, true, false, true], [false, false, false, true], [true, false, true, false], [false, true, true, false], [true, false, false, true], [false, true, true, false], [false, true, false, true]],

[[false, false, false, true], [true, true, false, false], [true, false, false, true], [true, true, false, false], [true, false, false, true], [true, false, true, false], [true, false, true, false], [true, true, false, false], [false, false, true, true], [false, true, true, false], [false, true, false, true], [true, false, false, true], [false, true, true, false], [false, false, false, true], [false, true, true, false], [true, false, false, true], [true, true, false, false], [false, false, true, true], [true, true, false, false], [false, true, false, true]],

[[false, true, true, true], [false, false, true, true], [false, true, true, false], [false, false, true, true], [false, false, true, false], [true, false, true, false], [true, true, true, false], [false, false, true, true], [true, false, true, false], [true, false, true, false], [false, false, true, false], [false, true, true, false], [true, false, true, true], [false, false, true, false], [true, false, true, false], [false, true, true, false], [false, false, true, true], [true, false, true, false], [false, true, true, false], [false, true, true, true]]

];

// Game state variables
let startTime;
let timerRunning = false;
let endX = 19;
let endY = 19;
const countdownDuration = 600; // 10 minutes in seconds
let reachedEnd = false;
let moveCount = 0;
let playerX = 7;
let playerY = 0;
let blinkState = true;
let blinkTimer = 0;

// Solver variables
let solutionPath = [];
let isSolving = false;
let solveStep = 0;
let carAngle = 0;
let targetAngle = 0;
const rotationSpeed = 1;

const hardcodedPath = [    [7, 0], [6, 0], [6, 1], [5, 1], [5, 2], [5, 3], [4, 3], [4, 4], [3, 4], [2, 4],
    [2, 3], [1, 3], [1, 2], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2], [4, 1], [4, 0],
    [3, 0], [2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 6], [1, 7], [0, 7], [0, 8], [1, 8], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9],
    [5, 10], [4, 10], [4, 11], [4, 12], [5, 12], [5, 13], [5, 14], [6, 14], [6, 13],
    [7, 13], [7, 14], [8, 14], [8, 13], [9, 13], [9, 14], [9, 15], [10, 15], [10, 16],
    [10, 17], [10, 18], [10, 19], [11, 19], [11, 18], [12, 18], [12, 17], [12, 16],
    [13, 16], [13, 15], [12, 15], [11, 15], [11, 14], [12, 14], [12, 13], [12, 12],
    [11, 12], [10, 12], [10, 11], [11, 11], [11, 10], [10, 10], [9, 10], [8, 10],
    [7, 10], [7, 11], [6, 11], [6, 10], [6, 9], [7, 9], [8, 9], [8, 8], [9, 8],
    [10, 8], [10, 7], [11, 7], [11, 6], [10, 6], [9, 6], [9, 5], [8, 5], [7, 5],
    [7, 4], [7, 3], [7, 2], [8, 2], [8, 3], [8, 4], [9, 4], [10, 4], [11, 4],
    [12, 4], [12, 5], [13, 5], [13, 4], [14, 4], [14, 3], [15, 3], [15, 4], [15, 5],
    [14, 5], [14, 6], [14, 7], [13, 7], [12, 7], [12, 8], [11, 8], [11, 9], [12, 9],
    [13, 9], [13, 8], [14, 8], [14, 9], [14, 10], [13, 10], [13, 11], [13, 12],
    [13, 13], [14, 13], [15, 13], [16, 13], [16, 12], [16, 11], [17, 11], [18, 11],
    [18, 10], [17, 10], [17, 9], [16, 9], [15, 9], [15, 8], [16, 8], [17, 8], [17, 7],
    [16, 7], [15, 7], [15, 6], [16, 6], [17, 6], [17, 5], [17, 4], [18, 4], [18, 3],
    [19, 3], [19, 4], [19, 5], [18, 5], [18, 6], [19, 6], [19, 7], [19, 8], [19, 9],
    [19, 10], [19, 11], [19, 12], [18, 12], [18, 13], [17, 13], [17, 14], [17, 15],
    [17, 16],[16, 16], [16, 17], [15, 17], [14, 17], [14, 18], [13, 18], [13, 19], [14, 19],
    [15, 19], [15, 18], [16, 18], [16, 19], [17, 19], [18, 19], [18, 18], [17, 18],
    [17, 17], [18, 17], [18, 16], [18, 15], [18, 14], [19, 14], [19, 15], [19, 16],
    [19, 17], [19, 18], [19, 19]
]; 

function setup() {
    createCanvas(800, 800);
    document.getElementById('startMazeBtn').addEventListener('click', startMaze);
    document.getElementById('restartMazeBtn').addEventListener('click', restartMaze);
    document.getElementById('solveMazeBtn').addEventListener('click', solveMaze);
    document.getElementById('infoBtn').addEventListener('click', showInfo);
}

function draw() {
    background(61);

    // Draw maze cells
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y]?.[x]?.length === 4) showCell(x, y);
        }
    }

    // Draw solution path as squares
    if (isSolving && solutionPath.length > 0) {
        fill(255, 255, 0); // Yellow squares
        noStroke();
        const squareSize = 6;
        for (let i = 0; i < solveStep; i++) {
            const [x, y] = solutionPath[i];
            rect(x * w + w / 2, y * w + w / 2, squareSize, squareSize, CENTER);
        }
    }

    // Blink end point
    blinkTimer += 0.03;
    if (blinkTimer >= 1) {
        blinkState = !blinkState;
        blinkTimer = 0;
    }
    if (blinkState) {
        fill(0, 215, 0, 200);
        noStroke();
        rect(endX * w + w / 2 - 10, endY * w + w / 2 - 10, 20, 20);
    }

    drawCar(playerX * w + w / 2, playerY * w + w / 2);
}

function drawCar(x, y, dx = null, dy = null) {
    if (dx !== null && dy !== null) {
        if (dx === 0 && dy === -1) targetAngle = -HALF_PI;
        else if (dx === 0 && dy === 1) targetAngle = HALF_PI;
        else if (dx === -1 && dy === 0) targetAngle = PI;
        else if (dx === 1 && dy === 0) targetAngle = 0;
    } else {
        if (keyIsDown(UP_ARROW)) targetAngle = -HALF_PI;
        else if (keyIsDown(DOWN_ARROW)) targetAngle = HALF_PI;
        else if (keyIsDown(LEFT_ARROW)) targetAngle = PI;
        else if (keyIsDown(RIGHT_ARROW)) targetAngle = 0;
    }

    carAngle = lerp(carAngle, targetAngle, rotationSpeed);
    push();
    translate(x, y);
    rotate(carAngle);

    fill(255, 0, 0); // Car body
    noStroke();
    rectMode(CENTER);
    rect(0, 0, 30, 20);
    fill(100); 
    rect(2, 0, 7, 18);
    fill(205, 205, 0); // Lights
    rect(13, 7, 3, 5);
    rect(13, -7, 3, 5);
    fill(205, 0, 0); // Rear
    rect(-10, 0, 15, 20);
    

    pop();
}

function keyPressed() {
    if (!reachedEnd && timerRunning && !isSolving) {
        switch (keyCode) {
            case UP_ARROW: movePlayer(0, -1); break;
            case DOWN_ARROW: movePlayer(0, 1); break;
            case LEFT_ARROW: movePlayer(-1, 0); break;
            case RIGHT_ARROW: movePlayer(1, 0); break;
        }
    }
}

function startMaze() {
    if (!timerRunning && !reachedEnd) {
        startTime = millis() / 1000;
        timerRunning = true;
        updateTimer();
    }
}

function restartMaze() {
    timerRunning = false;
    updateTimerDisplay("10:00");
    playerX = 7;
    playerY = 0;
    reachedEnd = false;
    moveCount = 0;
    isSolving = false;
}

function solveMaze() {
    if (isSolving || reachedEnd) return;
    solutionPath = hardcodedPath;
    isSolving = true;
    solveStep = 0;
    if (playerX !== 7 || playerY !== 0) {
        playerX = 7;
        playerY = 0;
        moveCount = 0;
    }
    animateSolution();
}

function animateSolution() {
    if (!isSolving || solveStep >= solutionPath.length) {
        isSolving = false;
        if (solveStep >= solutionPath.length) {
            playerX = endX;
            playerY = endY;
            reachedEnd = true;
            moveCount = solutionPath.length - 1;
            Swal.fire({
                title: "Maze Solved!",
                text: `Solved with predefined path!\nMoves: ${moveCount}`,
                icon: "success",
                confirmButtonText: "Restart"
            }).then(result => {
                if (result.isConfirmed) restartMaze();
            });
        }
        return;
    }

    const [currentX, currentY] = solutionPath[solveStep - 1] || [playerX, playerY];
    const [nextX, nextY] = solutionPath[solveStep];
    const dx = nextX - currentX;
    const dy = nextY - currentY;

    playerX = nextX;
    playerY = nextY;
    solveStep++;
    moveCount = solveStep - 1;
    drawCar(playerX * w + w / 2, playerY * w + w / 2, dx, dy);
    setTimeout(animateSolution, 200);
}

function showInfo() {
    Swal.fire({
        title: "Street Maze Rules & Info",
        html: `
            <ul style="text-align: left;">
                <li>Use arrow keys to drive the car.</li>
                <li>Reach the green endpoint in 10 minutes.</li>
                <li><strong>Start:</strong> Begins the timer.</li>
                <li><strong>Restart:</strong> Resets everything.</li>
                <li><strong>Solve:</strong> Solves the maze.</li>
            </ul>
        `,
        icon: "info",
        confirmButtonText: "Got It!"
    });
}

function updateTimer() {
    if (timerRunning) {
        const elapsedTime = Math.floor((millis() / 1000) - startTime);
        const remainingTime = countdownDuration - elapsedTime;
        if (remainingTime <= 0) {
            timerRunning = false;
            updateTimerDisplay("00:00");
            Swal.fire({
                title: "Time's Up!",
                text: "10 minutes ended. Try again?",
                icon: "warning",
                confirmButtonText: "Restart"
            }).then(result => {
                if (result.isConfirmed) restartMaze();
            });
        } else {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            updateTimerDisplay(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            setTimeout(updateTimer, 100);
        }
    }
}

function updateTimerDisplay(timeString) {
    document.getElementById('timer').innerHTML = `Time: ${timeString}`;
}

function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;
    if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) return;

    const canMove = (
        (dx > 0 && !grid[newY][newX][3] && !grid[playerY][playerX][1]) || // Right
        (dx < 0 && !grid[newY][newX][1] && !grid[playerY][playerX][3]) || // Left
        (dy > 0 && !grid[newY][newX][0] && !grid[playerY][playerX][2]) || // Down
        (dy < 0 && !grid[newY][newX][2] && !grid[playerY][playerX][0])    // Up
    );

    if (canMove) {
        playerX = newX;
        playerY = newY;
        moveCount++;
        if (playerX === endX && playerY === endY) {
            reachedEnd = true;
            timerRunning = false;
            const elapsedTime = Math.floor((millis() / 1000) - startTime);
            const timeTaken = `${Math.floor(elapsedTime / 60)}:${String(elapsedTime % 60).padStart(2, '0')}`;
            Swal.fire({
                title: "Congratulations!",
                text: `You reached the end!\nMoves: ${moveCount}\nTime: ${timeTaken}`,
                icon: "success",
                confirmButtonText: "Play Again"
            }).then(result => {
                if (result.isConfirmed) restartMaze();
            });
        }
    }
}

function showCell(x, y) {
    const px = x * w;
    const py = y * w;
    stroke(255);
    strokeWeight(3);
    if (grid[y][x][0]) line(px, py, px + w, py); // Top
    if (grid[y][x][1]) line(px + w, py, px + w, py + w); // Right
    if (grid[y][x][2]) line(px + w, py + w, px, py + w); // Bottom
    if (grid[y][x][3]) line(px, py + w, px, py); // Left
}
