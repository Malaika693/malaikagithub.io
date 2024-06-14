let gameState, score, isPlaying, defaultTimer, countdownTimer, lastObsSpawn, playerX, playerY, initPlayerX, initPlayerY, DEBUG, obSpeed, isJumping, doubleJumped, maxJumpDistance, jumpStrength, gravityStrength, obstacles, level, timeUntilSpawn, gravity, playerVelocity, playerAcceleration, playerSize, obstacleSize, playerHalfSize, obstacleHalfSize, gameStarted, isDead, highScores;
let jumpSound, gameOverSound;
let backgroundColor;

function preload() {
  soundFormats('mp3', 'ogg');
  jumpSound = loadSound('jump.mp3');
  gameOverSound = loadSound('gameover.mp3');
}

function setup() {
  frameRate(60);
  createCanvas(400, 400);
  initializeGameVariables();
  backgroundColor = color(255, 255, 255); // Default background color
}

function initializeGameVariables() {
  gameState = 0;
  score = 0;
  isPlaying = false;
  defaultTimer = 5;
  countdownTimer = null;
  lastObsSpawn = null;
  playerX = null;
  playerY = null;
  initPlayerX = 60;
  initPlayerY = 300;
  DEBUG = false;
  obSpeed = 0.1;
  isJumping = false;
  doubleJumped = false;
  maxJumpDistance = 120;
  jumpStrength = 20;
  gravityStrength = 8;
  obstacles = [];
  level = 1;
  timeUntilSpawn = null;
  gravity = -9.8;
  playerVelocity = 0;
  playerAcceleration = 0;
  playerSize = 30;
  obstacleSize = 30;
  playerHalfSize = playerSize / 2;
  obstacleHalfSize = obstacleSize / 2;
  gameStarted = 0;
  isDead = false;
  highScores = [];
}

function initGame() {
  level = 1;
  timeUntilSpawn = int(random(1, 5 - level)) * 1000;
  score = 0;
  isDead = false;
  obstacles = [];
  playerX = initPlayerX;
  playerY = initPlayerY;
  backgroundColor = color(255, 255, 255); // Reset background color to white
  drawWelcomeScreen();
}

function drawWelcomeScreen() {
  fill(0);
  textSize(30);
  textStyle(BOLDITALIC);
  textAlign(CENTER, CENTER);
  text('THE JUMPING GAME\nPress Space to Start!', 200, 200);
  if (DEBUG || keyIsDown(32)) {
    gameState++;
  }
}

function drawHUD() {
  if (!isDead) {
    fill(0);
    textSize(26);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('SCORE: ' + score, 0, 0);
  }
  rectMode(CORNER);
  fill(0);
  rect(0, initPlayerY + 15, width, 100);
}

function keyPressed() {
  if (!isDead && gameState === 1 && keyCode === 32) {
    if (isJumping && !doubleJumped) {
      playerVelocity = 30;
      doubleJumped = true;
      jumpSound.play();  // Play jump sound
    } else if (!isJumping) {
      playerVelocity = 40;
      isJumping = true;
      jumpSound.play();  // Play jump sound
    }
  }
}

function drawPlayer() {
  rectMode(CENTER);
  strokeWeight(3);
  fill(isDead ? 255 : 0, 0, 0);
  let dt = deltaTime / 100;

  if (isJumping) {
    playerY -= playerVelocity * dt;
    playerVelocity += gravity * dt;
    if (playerY >= initPlayerY) {
      playerY = initPlayerY;
      playerVelocity = 0;
      isJumping = false;
      doubleJumped = false;
    }
  }
  rect(playerX, playerY, playerSize);
}

function playGame() {
  if (!isPlaying) {
    isPlaying = true;
    lastObsSpawn = int(millis());
    gameStarted = int(millis());
  } else {
    if (int(millis()) - gameStarted > 10000) {
      level++;
      gameStarted = int(millis());
      backgroundColor = color(random(255), random(255), random(255)); // Change background color every level
    }
    drawHUD();
    drawPlayer();
    spawnObstacles();
    drawObstacles();
    if (isDead) {
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(48);
      textStyle(BOLDITALIC);
      text("GAME OVER!", 200, 200);
      if (keyIsDown(32)) {
        gameState++;
      }
    }
    if (detectCollision()) {
      if (!isDead) {
        isDead = true;
        gameOverSound.play();  // Play game over sound once
      }
    }
  }
}

function detectCollision() {
  let topOfObstacle = initPlayerY - obstacleHalfSize;
  let bottomOfPlayer = playerY + playerHalfSize;
  let playerRightSide = playerX + playerHalfSize;
  let playerLeftSide = playerX - playerHalfSize;

  for (let i = 0; i < obstacles.length; i++) {
    let obstacleLeftSide = obstacles[i].x - obstacleHalfSize;
    let obstacleRightSide = obstacles[i].x + obstacleHalfSize;
    if (obstacleLeftSide <= playerRightSide && obstacleRightSide >= playerLeftSide) {
      if (bottomOfPlayer >= topOfObstacle) {
        return true;
      }
    } else {
      if (obstacleRightSide < playerLeftSide && !obstacles[i].scored) {
        score++;
        obstacles[i].scored = true;
      }
      if (obstacleLeftSide >= playerRightSide) return false;
    }
  }
  return false;
}

function drawObstacles() {
  if (isDead) {
    return;
  }
  let dt = deltaTime / 100;
  for (let i = 0; i < obstacles.length; i++) {
    rectMode(CENTER);
    strokeWeight(3);
    fill(255, 0, 0);
    rect(obstacles[i].x, initPlayerY, obstacles[i].size);
    obstacles[i].x -= (15 * dt) + obstacles[i].speed;
  }
  if (obstacles.length && obstacles[0].x < 0) {
    obstacles.splice(0, 1);
  }
}

function spawnObstacles() {
  if (isDead) {
    return;
  }
  if (int(millis() - lastObsSpawn) >= timeUntilSpawn) {
    if (obstacles.length < 8) {
      obstacles.push(createObstacle());
      timeUntilSpawn = calculateSpawnTime();
      lastObsSpawn = millis();
    }
  }
}

function createObstacle() {
  let obstacleType = int(random(3)); // 3 different types of obstacles
  let size, speed;

  switch (obstacleType) {
    case 0: // Small, fast obstacle
      size = 20;
      speed = int(random(max(1, level - 1), min(level * 3, 30)));
      break;
    case 1: // Medium, medium-speed obstacle
      size = 30;
      speed = int(random(max(1, level - 1), min(level * 2, 20)));
      break;
    case 2: // Large, slow obstacle
      size = 40;
      speed = int(random(max(1, level - 1), min(level, 15)));
      break;
    default:
      size = 30;
      speed = int(random(max(1, level - 1), min(level * 2, 20)));
      break;
  }
  return {
    x: 410,
    size: size,
    speed: speed,
    scored: false
  };
}

function calculateSpawnTime() {
  if (level < 5) {
    return random(1, max(0.1, 2)) * 1000;
  } else if (level < 8) {
    return random(1, max(0.1, 2)) * 800;
  } else if (level < 12) {
    return random(1, max(0.1, 2)) * 720;
  } else {
    return random(1, max(0.1, 2)) * (500 - (level * 2));
  }
}

function gameOver() {
  isPlaying = false;
  fill(0);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Your Score: " + score, 200, 100);
  textSize(24);
  text("CLICK TO RESTART", 200, 200);
}

function mouseClicked() {
  if (gameState === 2) {
    gameState = 0;
    initializeGameVariables();
  }
}

function draw() {
  background(backgroundColor);
  switch (gameState) {
    case 1:
      playGame();
      break;
    case 2:
      gameOver();
      break;
    default:
      initGame();
      break;
  }
}
