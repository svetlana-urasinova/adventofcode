import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The sum of the total sizes of directories that are not larger than 100000 is <span class="answer">${part1Answer}</span>.</p>        
        <p>The total size of the smallest directory that could free enough space <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const MAX_DIR_SIZE = 100000;

  const { files, dirs } = parseInput(data);
  const dirsSizes = getDirsSizes(dirs, files);

  return dirsSizes.reduce((sum, size) => { return size > MAX_DIR_SIZE ? sum : sum + size }, 0);
}

export function part2(data) {
  const { files, dirs, total } = parseInput(data);

  const dirsSizes = getDirsSizes(dirs, files);
  const spaceToFree = countSpaceToFree(total);

  dirsSizes.sort((a, b) => a - b);

  for (const size of dirsSizes) {
    if (size >= spaceToFree) {
      return size;
    }
  }
}

export function getInputData(input) {
  return input.split("\n");
}

function parseInput(data) {
  const files = {};
  const dirs = [];

  let total = 0;
  let currentPath = '';

  for (const instruction of data) {
    if (instruction[0] === '$') {
      const [_, command, param] = instruction.split(' ');

      if (command === 'cd') {
        currentPath = updateCurrentPath(currentPath, param);
      }
    } else {
      const [info, name] = instruction.split(' ');
      const currentPathWithName = currentPath + '/' + name;

      if (info === 'dir') {
        dirs.push(currentPathWithName);
      } else {
        const size = Number(info);

        files[currentPathWithName] = size;
        total += size;
      }
    }
  }

  return { files, dirs, total };
}

function updateCurrentPath(currentPath, param) {
  switch (param) {
    case '/':
      return currentPath;
    case '..':
      const indexOfDelimiter = currentPath.lastIndexOf('/');
      return currentPath.slice(0, indexOfDelimiter);
    default:
      return `${currentPath}/${param}`;
  }
}

function getDirsSizes(dirs, files) {
  return dirs.map(dir => countDirSize(dir, files));
}

function countDirSize(dir, files) {
  return Object.keys(files)
    .reduce((sum, path) => {
      return path.startsWith(dir) ? sum + files[path] : sum
    }, 0);
}

function countSpaceToFree(total) {
  const TOTAL_SPACE = 70000000;
  const SPACE_REQUIRED = 30000000;

  return SPACE_REQUIRED - TOTAL_SPACE + total;
}