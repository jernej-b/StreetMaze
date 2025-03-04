// Global variables for maze structure
var cols, rows;
var w = 30;
var grid = [];
var current;
var stack = [];

// Timer and game state variables
let startTime;
let timerRunning = false;
let mazeGenerating = false;
let endCell;
const countdownDuration = 600;
let path = [];
let reachedEnd = false;

// Player position
let playerX, playerY;  // X = col (left-right), Y = row (top-bottom)
let blinkState = true;
let blinkTimer = 0;

function setup() {
    let mazeContainer = select('#mazeContainer');
    let canvas = createCanvas(900, 900);
    canvas.parent(mazeContainer);
    
    cols = floor(width / w); // X-direction (left to right)
    rows = floor(height / w); // Y-direction (top to bottom)

    console.log(`Canvas size: ${width}x${height}, Cols (X): ${cols}, Rows (Y): ${rows}`);

    select('#startMazeBtn').mousePressed(startMaze);
    select('#restartMazeBtn').mousePressed(restartMaze);

    resetGrid();

    document.addEventListener('keydown', function (event) {
        if (!mazeGenerating && !reachedEnd) {
            switch (event.key) {
                case 'ArrowUp': movePlayer(0, -1); break;    // Y up
                case 'ArrowDown': movePlayer(0, 1); break;   // Y down
                case 'ArrowLeft': movePlayer(-1, 0); break;  // X left
                case 'ArrowRight': movePlayer(1, 0); break;  // X right
            }
        }
    });
}

function resetGrid() {
    grid = new Array(rows); // Rows = Y
    stack = [];
    path = [];
    reachedEnd = false;
    
    for (var y = 0; y < rows; y++) {
        grid[y] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            grid[y][x] = new Cell(x, y); // x = col, y = row
        }
    }

    playerX = floor(random(0, cols)); // Random X (column)
    playerY = 0;                      // Top Y (row)
    current = grid[playerY][playerX];
    current.visited = true;
    console.log(`Starting cell: X=${playerX}, Y=${playerY}`);
    path.push(current);

    let endX = floor(random(0, cols)); // Random X for end
    endCell = grid[rows - 1][endX];    // Bottom row (Y=29), random X
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
    resetGrid();
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

    // Draw player (red square, no blinking)
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

    // Draw end point (green square)
    if (endCell) {
        fill(0, 255, 0, 100);
        rect(endCell.x * w + w / 2 - 10, endCell.y * w + w / 2 - 10, 20, 20);
    }

    if (mazeGenerating) {
        current.visited = true;
        current.highlight();
        var next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
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
}

function movePlayer(dx, dy) {
    let newX = playerX + dx; // X = columns (left-right)
    let newY = playerY + dy; // Y = rows (top-bottom)

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        let currentCell = grid[playerY][playerX];
        let nextCell = grid[newY][newX];

        let canMove = false;
        if (dx > 0 && !currentCell.walls[1] && !nextCell.walls[3]) {       // Right
            canMove = true;
        } else if (dx < 0 && !currentCell.walls[3] && !nextCell.walls[1]) { // Left
            canMove = true;
        } else if (dy > 0 && !currentCell.walls[2] && !nextCell.walls[0]) { // Down
            canMove = true;
        } else if (dy < 0 && !currentCell.walls[0] && !nextCell.walls[2]) { // Up
            canMove = true;
        }

        if (canMove) {
            playerX = newX;
            playerY = newY;
            console.log(`Moved to: X=${playerX}, Y=${playerY}`);

            let nextCell = grid[playerY][playerX];
            if (!reachedEnd && nextCell && !path.includes(nextCell)) {
                path.push(nextCell);
            }
            if (nextCell === endCell) {
                reachedEnd = true;
                console.log("Endpoint reached!");
                Swal.fire({
                    title: "Congratulations!",
                    text: "You reached the end!",
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
    var dx = a.x - b.x; // X difference (columns)
    if (dx === 1) {
        a.walls[3] = false; // Left of a
        b.walls[1] = false; // Right of b
    } else if (dx === -1) {
        a.walls[1] = false; // Right of a
        b.walls[3] = false; // Left of b
    }
    var dy = a.y - b.y; // Y difference (rows)
    if (dy === 1) {
        a.walls[0] = false; // Top of a
        b.walls[2] = false; // Bottom of b
    } else if (dy === -1) {
        a.walls[2] = false; // Bottom of a
        b.walls[0] = false; // Top of b
    }
}

function Cell(x, y) {
    this.x = x;          // Column index (X, left-right)
    this.y = y;          // Row index (Y, top-bottom)
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
        if (bottom && !bottom.visited) neighbors.push(bottom); // Fixed to bottom
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