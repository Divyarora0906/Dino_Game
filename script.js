const dino = document.querySelector(".Dino");
const bg = document.getElementById("background");
const Start = document.getElementById("Start");
const QUit = document.getElementById("Quit");
let position = 0;
let gameActive = true;
const speed = 2;
let score = 0;
let calculateScore = () => {
  setInterval(() => {
    if (!gameActive) return;
    score += 1;
    document.getElementById("value").innerHTML = score;
  },500);
};
calculateScore();
const GameOver = document.getElementById("hide");
console.log(GameOver);
const Collision = () => {
  const dinoRect = dino.getBoundingClientRect();
  const AllObs = document.querySelectorAll("#ob");

  AllObs.forEach((e) => {
    const obsRect = e.getBoundingClientRect();

    const buffer = 6;

    if (
      dinoRect.left + buffer < obsRect.right - buffer &&
      dinoRect.right - buffer > obsRect.left + buffer &&
      dinoRect.top + buffer < obsRect.bottom - buffer &&
      dinoRect.bottom - buffer > obsRect.top + buffer
    ) {
      gameActive = false;
      GameOver.classList.remove("go");
      console.log(GameOver);

      console.log("OVER");
      console.log("GAME OVER");
    }
  });
};
const MoveBG = () => {
  if (!gameActive) return;
  position -= speed;
  bg.style.backgroundPosition = `${position}px 0`;
  Collision();
  requestAnimationFrame(MoveBG);
};
MoveBG();

let isjump = false;
let randomTime = 1000;

document.addEventListener("keydown", (e) => {
  if (e.code == "Space" && !isjump) {
    randomTime = Math.random() * (3000 - 1000) + 1000;
    isjump = true;
    dino.style.bottom = "55vh";

    setTimeout(() => {
      dino.style.bottom = "38%";
      setTimeout(() => {
        isjump = false;
      }, 250);
    }, 400);
  }
});

const GenerateObstacle = () => {
  if (!gameActive) return;
  const Obs = document.createElement("img");
  Obs.id = "ob";
  Obs.src = "./assets/Obs.png";
  bg.appendChild(Obs);

  setTimeout(() => {
    Obs.remove();
  }, 4000);

  let nextSpawnTime = Math.random() * (3000 - 1000) + 1000;
  setTimeout(GenerateObstacle, nextSpawnTime);
};
GenerateObstacle();

Start.addEventListener("click", () => {
  location.reload();
});
QUit.addEventListener("click", () => {
  window.location.href = "https://google.com";
});
