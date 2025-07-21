const start = document.getElementById("start");
const stop = document.getElementById("stopB");
const reset = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

// Audio elements
const startSound = document.getElementById("startSound");
const backgroundMusic = document.getElementById("backgroundMusic");
const stopSound = document.getElementById("stopSound");
const resetSound = document.getElementById("resetSound");
const endSound = document.getElementById("endSound");

let timeLeft = 1500;
let interval = null; 
let isRunning = false; 

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const playSound = (audioElement) => {

  audioElement.currentTime = 0;
  audioElement.play().catch((e) => {
    console.log("No se pudo reproducir el audio:", e);
  });
};

const startTimer = () => {

  if (!isRunning) {
    isRunning = true;


    playSound(startSound);


    setTimeout(() => {
      playSound(backgroundMusic);
    }, 500);

    interval = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;

  
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;

 
        playSound(endSound);

        alert("¡TEM!");
        timeLeft = 1500; 
        updateTimer();
      }
    }, 1000);
  }
};

const stopTimer = () => {
  clearInterval(interval);
  isRunning = false;


  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;


  playSound(stopSound);
};

const resetTimer = () => {
  clearInterval(interval);
  isRunning = false;
  timeLeft = 1500; // Reset to 25 minutes
  updateTimer();


  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;


  playSound(resetSound);
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);


updateTimer();
