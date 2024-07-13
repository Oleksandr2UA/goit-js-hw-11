import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const refs = {
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
// Button
const btn = document.querySelector('button');
btn.addEventListener('click', onBtnClick);
btn.disabled = true;

// Chosen date
let chosenDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
    const auxChosenDate = selectedDates[0];

    if (nowDate > auxChosenDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btn.disabled = false;
      chosenDate = auxChosenDate;
    }
  },
};
flatpickr('#datetime-picker', options);

function onBtnClick(evt) {
  const timerId = setInterval(() => {
    const nowDate = Date.now();
    timeLeft = chosenDate - nowDate;

    const objTime = convertMs(timeLeft);

    if (objTime.minutes === 0 && objTime.seconds === 0) {
      clearInterval(timerId);
    }

    updateUI(objTime);
  }, 1000);
}
function updateUI({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
