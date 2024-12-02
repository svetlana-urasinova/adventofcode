import { input } from '../input.js';
import { getInputData, getReportSign, isPairSafe, canSkipElement } from './../index.js';

const timeout = 100;

const display1Element = document.querySelector('#display1');
const display2Element = document.querySelector('#display2');

const total1Element = display1Element.querySelector('#total1');
const total2Element = display2Element.querySelector('#total2');

const current1Element = display1Element.querySelector('#current1');
const current2Element = display2Element.querySelector('#current2');

window.onload = () => {
  let i = 0;

  let total1 = 0;
  let total2 = 0;

  const data = getInputData(input);

  const timerId = setInterval(() => {
    const result1 = isReportSafe(data[i]);
    const result2 = isReportSafe(data[i], true);

    if (result1.isSafe) {
      total1++;
    }

    if (result2.isSafe) {
      total2++;
    }

    total1Element.textContent = total1;
    total2Element.textContent = total2;

    current1Element.innerHTML = '';
    current1Element.appendChild(getCurrentElement(data[i], result1.isSafe));

    current2Element.innerHTML = '';
    current2Element.appendChild(getCurrentElement(data[i], result2.isSafe, result2.skip));

    i++;

    if (i === data.length) {
      current1Element.innerHTML = '';
      current2Element.innerHTML = '';

      clearInterval(timerId);
    }
  }, timeout);
};

function getCurrentElement(report, isSafe, skipIndex) {
  const container = document.createElement('div');

  container.classList.add('numbers');

  if (!isSafe) {
    container.classList.add('unsafe');
  }

  for (let i = 0; i < report.length; i++) {
    const numberElement = document.createElement('div');

    numberElement.classList.add('number');

    if (i === skipIndex) {
      numberElement.classList.add('skipped');
    }

    numberElement.textContent = report[i];

    container.appendChild(numberElement);
  }

  return container;
}

function isReportSafe(report, tolerateOnce = false) {
  let canSkip = tolerateOnce;

  const reportSign = getReportSign(report);

  let skip = null;

  for (let i = 1; i < report.length; i++) {
    if (!isPairSafe(report, reportSign, i - 1, i)) {
      if (!canSkip) {
        return { isSafe: false, skip: null };
      }

      if (canSkipElement(report, reportSign, i - 1)) {
        skip = i - 1;
      } else if (canSkipElement(report, reportSign, i)) {
        skip = i;
      } else {
        return { isSafe: false, skip: null };
      }

      i++;
      canSkip = false;
    }
  }

  return { isSafe: true, skip };
}
