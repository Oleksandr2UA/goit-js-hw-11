import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector("input[name='delay']"),
  stepEl: document.querySelector("input[name='step']"),
  amountEl: document.querySelector("input[name='amount']"),
  formEl: document.querySelector('form'),
};
refs.formEl.addEventListener('input', onFormInput);
refs.formEl.addEventListener('submit', onFormSubmit);

const obj = {};

function onFormInput(evt) {
  obj[evt.target.name] = evt.target.value;
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const amount = Number(obj.amount);
  const step = Number(obj.step);
  let delay = Number(obj.delay);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
