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
let interval = null; // 25 minutes in seconds
let isRunning = false; // Estado del timer

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const playSound = (audioElement) => {
  // Reset audio to beginning and play
  audioElement.currentTime = 0;
  audioElement.play().catch((e) => {
    console.log("No se pudo reproducir el audio:", e);
  });
};

const startTimer = () => {
  // Solo iniciar si no está corriendo ya
  if (!isRunning) {
    isRunning = true;

    // Reproducir sonido de inicio
    playSound(startSound);

    // Iniciar música de fondo después de un pequeño delay
    setTimeout(() => {
      playSound(backgroundMusic);
    }, 500);

    interval = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;

        // Detener música de fondo
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;

        // Reproducir sonido de final
        playSound(endSound);

        alert("¡Tiempo terminado!");
        timeLeft = 1500; // Reset to 25 minutes
        updateTimer();
      }
    }, 1000);
  }
};

const stopTimer = () => {
  clearInterval(interval);
  isRunning = false;

  // Detener música de fondo
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  // Reproducir sonido de stop
  playSound(stopSound);
};

const resetTimer = () => {
  clearInterval(interval);
  isRunning = false;
  timeLeft = 1500; // Reset to 25 minutes
  updateTimer();

  // Detener música de fondo
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  // Reproducir sonido de reset
  playSound(resetSound);
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// Inicializar el display
updateTimer();
