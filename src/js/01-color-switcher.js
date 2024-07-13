function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let timerId = null;
toggleBtnStop(true);

function onBtnStartClick(evt) {
  toggleBtnStart(true);

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    toggleBtnStop(false);
  }, 1000);
}
function onBtnStopClick(evt) {
  toggleBtnStart(false);
  toggleBtnStop(true);

  clearInterval(timerId);
}

function toggleBtnStart(value) {
  btnStart.disabled = value;
}
function toggleBtnStop(value) {
  btnStop.disabled = value;
}
