Maze Game
A fun and interactive maze game built using p5.js. The game generates a random maze using a depth-first search algorithm, and the player must navigate through the maze to reach the endpoint before the timer runs out. The game features a 10-minute countdown timer, blinking endpoint, and keyboard controls for movement.

Features
Random Maze Generation: The maze is generated using a depth-first search algorithm, ensuring a unique maze every time.

Player Movement: Use the arrow keys (↑, ↓, ←, →) to move the player through the maze.

Timer: A 10-minute countdown timer adds urgency to the game.

Blinking Endpoint: The endpoint blinks to make it easier to spot.

Restart Functionality: Restart the game at any time to generate a new maze and reset the timer.

Responsive Design: The game canvas is 900x900 pixels, with a grid size of 30x30 cells.

How to Play
Start the Game: Click the "Start Maze" button to generate a new maze and start the timer.

Navigate the Maze: Use the arrow keys to move the player (red square) through the maze.

Reach the Endpoint: Find the green endpoint at the bottom of the maze before the timer runs out.

Restart: Click the "Restart Maze" button to generate a new maze and reset the timer.

Controls
Arrow Up (↑): Move the player up.

Arrow Down (↓): Move the player down.

Arrow Left (←): Move the player left.

Arrow Right (→): Move the player right.

Game Logic
Maze Generation: The maze is generated using a depth-first search algorithm. Walls are removed between cells to create paths.

Player Movement: The player moves one cell at a time. Movement is restricted by walls and maze boundaries.

Timer: The timer starts when the maze is fully generated. If the timer reaches 0, the game ends.

Endpoint: The endpoint is randomly placed in the bottom row of the maze. Reaching it triggers a victory message.

Code Structure
Global Variables: Store maze dimensions, grid, player position, timer, and game state.

Setup Function: Initializes the canvas, grid, and event listeners.

Reset Function: Resets the grid, player position, and timer.

Draw Function: Renders the maze, player, and endpoint.

Move Function: Handles player movement and checks for valid moves.

Maze Generation: Uses depth-first search to generate the maze.

Timer Logic: Manages the countdown timer and game-over conditions.

Dependencies
p5.js: Used for rendering the canvas and handling game logic.

SweetAlert2: Used for displaying game-over and victory messages.# StreetMaze
