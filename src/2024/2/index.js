import { input } from './input.js';

const MIN_DIFF = 1;
const MAX_DIFF = 3;

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Total amount of safe reports is <span class="answer">${part1Answer}</span>.</p>        
        <p>Total amount of safe reports with using the Problem Dampener is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  return data.reduce((total, report) => (isReportSafe(report) ? ++total : total), 0);
}

export function part2(data) {
  return data.reduce((total, report) => (isReportSafe(report, true) ? ++total : total), 0);
}

export function getInputData(data) {
  return data.split('\n').map(line => line.split(/\s+/).map(el => +el));
}

function isReportSafe(report, tolerateOnce = false) {
  let canSkip = tolerateOnce;

  const reportSign = getReportSign(report);

  for (let i = 1; i < report.length; i++) {
    if (!isPairSafe(report, reportSign, i - 1, i)) {
      if (!canSkip || (!canSkipElement(report, reportSign, i - 1) && !canSkipElement(report, reportSign, i))) {
        return false;
      }

      i++;
      canSkip = false;
    }
  }

  return true;
}

function getReportSign(report) {
  // input doesn't contain any reports with length < 4 so we can skip such cases

  const firstPairSign = Math.sign(report[1] - report[0]);

  return firstPairSign === Math.sign(report[2] - report[1]) ? firstPairSign : Math.sign(report[3] - report[2]);
}

function isPairSafe(report, reportSign, firstIndex, secondIndex) {
  if (report[firstIndex] === undefined || report[secondIndex] === undefined) {
    return true;
  }

  const sign = Math.sign(report[secondIndex] - report[firstIndex]);

  const diff = Math.abs(report[secondIndex] - report[firstIndex]);

  return sign === reportSign && diff >= MIN_DIFF && diff <= MAX_DIFF;
}

function canSkipElement(report, reportSign, index) {
  return isPairSafe(report, reportSign, index - 1, index + 1) && isPairSafe(report, reportSign, index + 1, index + 2);
}
