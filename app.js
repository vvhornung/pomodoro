const start = document.getElementById("start");
const stop = document.getElementById("stopB");
const reset = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

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

const startTimer = () => {
  // Solo iniciar si no está corriendo ya
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;
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
};

const resetTimer = () => {
  clearInterval(interval);
  isRunning = false;
  timeLeft = 1500; // Reset to 25 minutes
  updateTimer();
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// Inicializar el display
updateTimer();
