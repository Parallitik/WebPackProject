import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";
import { addListenerShowEl } from "./changechapter.js";
import { playBellSound } from "./howlerEl.js";
import "../sounds/bell-sound.mp3";
import "../css/style.scss";

const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");
dateCalcForm.addEventListener("submit", handleCalcDates);

const timer = document.getElementById("timer");
const btnOpenCalc = document.getElementById("opencalc");
const btnOpenTimer = document.getElementById("opentimer");

const timerInput = document.querySelector(".inputTimer");
const timerBtnEnter = document.getElementById("timerToEnter");

const timerBtnStart = document.getElementById("timerStart");
timerBtnStart.addEventListener("click", () => {
  timerStart();
});
const timerBtnStop = document.getElementById("timerStop");
timerBtnStop.addEventListener("click", () => {
  clearInterval(interval);
});

const timerExpTime = document.getElementById("timerExpTime");
const timerCurTime = document.getElementById("timerCurTime");

function handleCalcDates(event) {
  dateCalcResult.innerHTML = "";
  event.preventDefault();
  let { firstDate, secondDate } = event.target.elements;
  (firstDate = firstDate.value), (secondDate = secondDate.value);
  if (firstDate && secondDate) {
    const diff = diffDates(firstDate, secondDate);
    dateCalcResult.innerHTML = diffToHtml(diff);
  } else
    dateCalcResult.innerHTML = formatError(
      "Для расчета промежутка необходимо заполнить оба поля"
    );
}

// Импортированные функции переключения разделов
addListenerShowEl(btnOpenCalc, dateCalcForm, timer);
addListenerShowEl(btnOpenTimer, timer, dateCalcForm);

// код таймера
timerBtnEnter.addEventListener("click", () => {
  timerExpTime.innerText = timerInput.value;
});

let interval,
  count = 0;
function timerStart() {
  interval = setInterval(() => {
    count++;
    timerCurTime.innerText = count;
    if (count === +timerExpTime.innerText && count !== 0) {
      clearInterval(interval);
      playBellSound();
    }
  }, 1000);
}
