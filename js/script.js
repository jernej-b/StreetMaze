// Global variables for maze structure
var cols, rows;
var w = 30;
var grid = [];
var current;
var stack = [];
let solutionPath = []; // Store clean path from start to end

// Timer and game state variables
let startTime;
let timerRunning = false;
let mazeGenerating = false;
let endCell;
const countdownDuration = 600;
let path = [];
let reachedEnd = false;
let moveCount = 0; // Track player moves

// Player position
let playerX, playerY;  // X = col (left-right), Y = row (top-bottom)
let blinkState = true;
let blinkTimer = 0;

// Animation variables
let solving = false;
let solveIndex = 0;

function setup() {
    let mazeContainer = select('#mazeContainer');
    let canvas = createCanvas(900, 900);
    canvas.parent(mazeContainer);
    
    cols = floor(width / w);
    rows = floor(height / w);

    console.log(`Canvas size: ${width}x${height}, Cols (X): ${cols}, Rows (Y): ${rows}`);

    select('#startMazeBtn').mousePressed(startMaze);
    select('#restartMazeBtn').mousePressed(restartMaze);
    select('#solveMazeBtn').mousePressed(solveMaze);
    select('#infoBtn').mousePressed(showInfo); // New button handler

    resetGrid();

    document.addEventListener('keydown', function (event) {
        if (!mazeGenerating && !reachedEnd && !solving) {
            switch (event.key) {
                case 'ArrowUp': movePlayer(0, -1); break;
                case 'ArrowDown': movePlayer(0, 1); break;
                case 'ArrowLeft': movePlayer(-1, 0); break;
                case 'ArrowRight': movePlayer(1, 0); break;
            }
        }
    });
}

function resetGrid() {
    grid = new Array(rows);
    stack = [];
    path = [];
    solutionPath = [];
    reachedEnd = false;
    moveCount = 0;
    solving = false;
    solveIndex = 0;
    
    for (var y = 0; y < rows; y++) {
        grid[y] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            grid[y][x] = new Cell(x, y);
        }
    }

    playerX = floor(random(0, cols));
    playerY = 0;
    current = grid[playerY][playerX];
    current.visited = true;
    console.log(`Starting cell: X=${playerX}, Y=${playerY}`);
    path.push(current);
    solutionPath.push(current);

    let endX = floor(random(0, cols));
    endCell = grid[rows - 1][endX];
    console.log(`Ending cell: X=${endX}, Y=${rows - 1}`);
}

function startMaze() {
    if (!timerRunning && !mazeGenerating) {
        resetGrid();
        mazeGenerating = true;
        updateTimerDisplay("10:00");
    }
}

function restartMaze() {
    timerRunning = false;
    mazeGenerating = false;
    updateTimerDisplay("10:00");
    moveCount = 0;
    resetGrid();
}

function solveMaze() {
    if (!mazeGenerating && !reachedEnd && !solving) {
        solving = true;
        solveIndex = 0;
        playerX = solutionPath[0].x; // Reset player to start
        playerY = solutionPath[0].y;
        console.log("Starting solve animation");
    }
}

function showInfo() {
    Swal.fire({
        title: "Street Maze Rules & Info",
        html: `
            <ul style="text-align: left;">
                <li>Use arrow keys to move the red square from the top to the green endpoint at the bottom.</li>
                <li>You have 10 minutes to reach the end before time runs out.</li>
                <li><strong>Start:</strong> Generates a new maze.</li>
                <li><strong>Restart:</strong> Resets the maze and timer.</li>
                <li><strong>Solve:</strong> Animates the solution path from start to the endpoint.</li>
                <li>Moves and time taken are shown when you win or solve the maze.</li>
            </ul>
        `,
        icon: "info",
        confirmButtonText: "Got It!"
    });
}

function updateTimer() {
    if (timerRunning) {
        const elapsedTime = floor((Date.now() - startTime) / 1000);
        const remainingTime = countdownDuration - elapsedTime;

        if (remainingTime <= 0) {
            timerRunning = false;
            updateTimerDisplay("00:00");
            Swal.fire({
                title: "Time's Up!",
                text: "The 10-minute countdown has ended. Try again?",
                icon: "warning",
                confirmButtonText: "Restart",
            }).then((result) => {
                if (result.isConfirmed) restartMaze();
            });
        } else {
            const minutes = floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            updateTimerDisplay(formattedTime);
            requestAnimationFrame(updateTimer);
        }
    }
}

function updateTimerDisplay(timeString) {
    select('#timer').html(`Time: ${timeString}`);
}

function draw() {
    background(51);

    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            grid[y][x].show();
        }
    }

    // Blinking effect
    blinkTimer += 0.1;
    if (blinkTimer >= 1) {
        blinkState = !blinkState;
        blinkTimer = 0;
    }

    // Draw player (red square)
    fill(255, 0, 0);
    noStroke();
    rect(playerX * w + w / 2 - 10, playerY * w + w / 2 - 10, 20, 20);

    // Draw end point (green square, blinking)
    if (endCell) {
        if (blinkState) {
            fill(0, 255, 0, 100);
            rect(endCell.x * w + w / 2 - 10, endCell.y * w + w / 2 - 10, 20, 20);
        }
    }

    if (mazeGenerating) {
        current.visited = true;
        current.highlight();
        var next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            // Manage solutionPath
            if (solutionPath[solutionPath.length - 1] !== endCell) {
                solutionPath.push(next);
                if (next === endCell) {
                    console.log("Endpoint reached, solution path saved.");
                }
            }
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
            // Trim solutionPath if backtracking before reaching end
            if (solutionPath.length > 1 && solutionPath[solutionPath.length - 1] !== endCell) {
                solutionPath.pop();
            }
        } else {
            mazeGenerating = false;
            if (!timerRunning) {
                startTime = Date.now();
                timerRunning = true;
                updateTimer();
            }
            console.log("Maze generation complete.");
        }
    }

    // Handle solve animation
    if (solving) {
        if (frameCount % 10 === 0) { // Slow down animation (~166ms at 60fps)
            if (solveIndex < solutionPath.length) {
                playerX = solutionPath[solveIndex].x;
                playerY = solutionPath[solveIndex].y;
                solveIndex++;
            } else {
                solving = false;
                if (playerX === endCell.x && playerY === endCell.y) {
                    reachedEnd = true;
                    timerRunning = false;
                    const elapsedTime = floor((Date.now() - startTime) / 1000);
                    const minutes = floor(elapsedTime / 60);
                    const seconds = elapsedTime % 60;
                    const timeTaken = `${minutes}:${String(seconds).padStart(2, '0')}`;
                    Swal.fire({
                        title: "Maze Solved!",
                        text: `Solution completed!\nMoves: ${moveCount}\nTime: ${timeTaken}`,
                        icon: "success",
                        confirmButtonText: "Play Again",
                    }).then((result) => {
                        if (result.isConfirmed) restartMaze();
                    });
                }
            }
        }
    }
}

function movePlayer(dx, dy) {
    let newX = playerX + dx;
    let newY = playerY + dy;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        let currentCell = grid[playerY][playerX];
        let nextCell = grid[newY][newX];

        let canMove = false;
        if (dx > 0 && !currentCell.walls[1] && !nextCell.walls[3]) {
            canMove = true;
        } else if (dx < 0 && !currentCell.walls[3] && !nextCell.walls[1]) {
            canMove = true;
        } else if (dy > 0 && !currentCell.walls[2] && !nextCell.walls[0]) {
            canMove = true;
        } else if (dy < 0 && !currentCell.walls[0] && !nextCell.walls[2]) {
            canMove = true;
        }

        if (canMove) {
            playerX = newX;
            playerY = newY;
            moveCount++;
            console.log(`Moved to: X=${playerX}, Y=${playerY}, Moves: ${moveCount}`);

            let nextCell = grid[playerY][playerX];
            if (!reachedEnd && nextCell && !path.includes(nextCell)) {
                path.push(nextCell);
            }
            if (nextCell === endCell) {
                reachedEnd = true;
                timerRunning = false;
                const elapsedTime = floor((Date.now() - startTime) / 1000);
                const minutes = floor(elapsedTime / 60);
                const seconds = elapsedTime % 60;
                const timeTaken = `${minutes}:${String(seconds).padStart(2, '0')}`;
                Swal.fire({
                    title: "Congratulations!",
                    text: `You reached the end!\nMoves: ${moveCount}\nTime: ${timeTaken}`,
                    icon: "success",
                    confirmButtonText: "Play Again",
                }).then((result) => {
                    if (result.isConfirmed) restartMaze();
                });
            }
        } else {
            console.log("Blocked by walls!");
        }
    } else {
        console.log("Out of bounds!");
    }
}

function index(x, y) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) {
        return undefined;
    }
    return grid[y][x];
}

function removeWalls(a, b) {
    var dx = a.x - b.x;
    if (dx === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (dx === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var dy = a.y - b.y;
    if (dy === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (dy === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];
        var top = index(x, y - 1);
        var right = index(x + 1, y);
        var bottom = index(x, y + 1);
        var left = index(x - 1, y);

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom); // Should be bottom
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        }
        return undefined;
    };

    this.highlight = function() {
        var px = this.x * w;
        var py = this.y * w;
        noStroke();
        fill(0, 236, 255, 100);
        rect(px, py, w, w);
    };

    this.show = function() {
        var px = this.x * w;
        var py = this.y * w;
        
        if (this.visited) {
            // Optional: Uncomment to visualize visited cells
            // noStroke();
            // fill(0, 206, 255, 100);
            // rect(px, py, w, w);
        }

        stroke(255);
        strokeWeight(1.2);
        if (this.walls[0]) line(px, py, px + w, py);         // Top
        if (this.walls[1]) line(px + w, py, px + w, py + w); // Right
        if (this.walls[2]) line(px + w, py + w, px, py + w); // Bottom
        if (this.walls[3]) line(px, py + w, px, py);         // Left
    };
}