import { delay } from '../../../utils/delay.js';
import { Display } from '../../../vizualisation/display/display.js';
import { input } from '../input.js';
import { getInputData, getReportSign, isPairSafe, canSkipElement } from './../index.js';

const timeout = 200;

const display1 = new Display('#display1');
const display2 = new Display('#display2');

const TOTAL_ELEMENT_SELECTOR = '.total';
const CURRENT_ELEMENT_SELECTOR = '.current';

window.onload = async () => {
  const data = getInputData(input);

  for (let i = 0; i < data.length; i++) {
    await delay(timeout);

    updateDisplay(display1, data[i], false);
    updateDisplay(display2, data[i], true);
  }

  display1.clearElement(CURRENT_ELEMENT_SELECTOR);
  display2.clearElement(CURRENT_ELEMENT_SELECTOR);
};

function updateDisplay(display, report, tolerateOnce) {
  const result = isReportSafe(report, tolerateOnce);

  if (result.isSafe) {
    const total = Number(display.getElementContent(TOTAL_ELEMENT_SELECTOR));

    display.updateElement(total + 1, TOTAL_ELEMENT_SELECTOR);
  }

  const currentContent = buildCurrentContent(report, result.isSafe, result.skip);

  display.updateElement(currentContent, CURRENT_ELEMENT_SELECTOR);
}

function buildCurrentContent(report, isSafe, skipIndex) {
  const template = document.getElementById('number-template');

  const container = document.createElement('div');

  container.classList.add('numbers');

  for (let i = 0; i < report.length; i++) {
    const numberElement = template.content.cloneNode(true).firstElementChild;

    if (!isSafe || i === skipIndex) {
      numberElement.classList.add('red');
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
