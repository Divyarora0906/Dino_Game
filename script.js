const dino = document.querySelector(".Dino");
const bg = document.getElementById("background");

const Start = document.getElementById("Start");
const Quit = document.getElementById("Quit");

const gameOverBox = document.getElementById("gameover-box");
const finalScore = document.getElementById("finalScore");

let position = 0;
let gameActive = true;
let gameOver = false;   
const speed = 2;
let score = 0;
let scoreTimer;


function startScore() {
  scoreTimer = setInterval(() => {
    if (!gameActive) return;
    score++;
    document.getElementById("value").innerText = score;
  }, 500);
}

function stopScore() {
  clearInterval(scoreTimer);
}

startScore();


function Collision() {
  const dinoRect = dino.getBoundingClientRect();
  const AllObs = document.querySelectorAll(".ob");

  AllObs.forEach(obs => {
    const obsRect = obs.getBoundingClientRect();
    const buffer = 6;

    if (
      dinoRect.left + buffer < obsRect.right - buffer &&
      dinoRect.right - buffer > obsRect.left + buffer &&
      dinoRect.top + buffer < obsRect.bottom - buffer &&
      dinoRect.bottom - buffer > obsRect.top + buffer
    ) {
      gameActive = false;
      gameOver = true;
      stopScore();

      finalScore.innerText = score;
      gameOverBox.classList.remove("hidden");
    }
  });
}

function MoveBG() {
  if (!gameActive) return;

  position -= speed;
  bg.style.backgroundPosition = `${position}px 0`;

  Collision();

  requestAnimationFrame(MoveBG);
}

MoveBG();

let isjump = false;

function jump() {
  if (isjump || !gameActive) return;

  isjump = true;
  dino.style.bottom = "55vh";

  setTimeout(() => {
    dino.style.bottom = "38%";
    setTimeout(() => (isjump = false), 250);
  }, 400);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

document.addEventListener("touchstart", jump);

function GenerateObstacle() {

  if (!gameActive) {
    setTimeout(GenerateObstacle, 400);
    return;
  }

  const Obs = document.createElement("img");
  Obs.className = "ob";
  Obs.src = "./assets/obstacle.png";

  bg.appendChild(Obs);

  setTimeout(() => Obs.remove(), 4000);

  let nextSpawnTime = Math.random() * (3000 - 1000) + 1000;
  setTimeout(GenerateObstacle, nextSpawnTime);
}

GenerateObstacle();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (!gameOver) {     
      gameActive = false;
      stopScore();
    }
  } 
  else {
    if (!gameOver) {
      gameActive = true;
      startScore();
      MoveBG();
    }
  }
});

Start.addEventListener("click", () => {
  window.location.reload();
});

Quit.addEventListener("click", () => {
  window.location.href = "https://google.com";
});
