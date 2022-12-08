import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p><span class="answer">${part1Answer}</span> trees are visible outside the grid.</p>        
        <p>Best scenic score is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(trees) {
  return part1FastSolution(trees);
  // return part1ConsistentSolution(trees);
}

export function part2(trees) {
  let maxScore = -1;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
      const score = countScenicScore({ x: i, y: j }, trees);

      if (score > maxScore) { maxScore = score }
    }
  }

  return maxScore;
}

export function getInputData(data) {
  return data.split("\n").map(row => row.split("").map(el => Number(el)));
}

function move(coords, trees, direction) {
  const { x, y } = coords;

  switch (direction) {
    case 'up':
      return getTree({ x: x - 1, y }, trees)
    case 'down':
      return getTree({ x: x + 1, y }, trees)
    case 'left':
      return getTree({ x, y: y - 1 }, trees)
    case 'right':
      return getTree({ x, y: y + 1 }, trees)
  }
}

function getTreeHeight(coords, trees) {
  const { x, y } = coords;

  return trees[x] && trees[x][y] !== undefined ? trees[x][y] : -1;
}

function getTree(coords, trees) {
  const height = getTreeHeight(coords, trees);

  return { coords: height >= 0 ? coords : null, height }
}

function look(coords, trees, direction) {
  const currentTree = getTree(coords, trees);
  let neighborTree = { ...currentTree }
  let isVisible = false;

  do {
    neighborTree = move(neighborTree.coords, trees, direction);

    if (!neighborTree.coords) {
      isVisible = true;
      break;
    }
  } while (neighborTree.height < currentTree.height)

  return isVisible;
}

function isTreeVisible(coords, trees) {
  return look(coords, trees, 'up')
    || look(coords, trees, 'down')
    || look(coords, trees, 'left')
    || look(coords, trees, 'right');
}

function getScenicScoreByDirection(coords, trees, direction) {
  const currentTree = getTree(coords, trees);
  let neighborTree = { ...currentTree }
  let counter = 0;

  do {
    neighborTree = move(neighborTree.coords, trees, direction);

    if (!neighborTree.coords) {
      break;
    }

    counter++;
  } while (neighborTree.height < currentTree.height)

  return counter;
}

function countScenicScore(coords, trees) {
  return getScenicScoreByDirection(coords, trees, 'up')
    * getScenicScoreByDirection(coords, trees, 'down')
    * getScenicScoreByDirection(coords, trees, 'left')
    * getScenicScoreByDirection(coords, trees, 'right');
}

function part1ConsistentSolution(trees) {
  // performance ~ 10ms

  let visibleTreesCounter = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
      if (isTreeVisible({ x: i, y: j }, trees)) { visibleTreesCounter++; }
    }
  }

  return visibleTreesCounter;
}

function createMax(trees) {
  return {
    top: new Array(trees.length).fill(-1),
    bottom: new Array(trees.length).fill(-1),
    left: new Array(trees[0].length).fill(-1),
    right: new Array(trees[0].length).fill(-1)
  }
}

function part1FastSolution(trees) {
  // performance ~ 2ms

  const max = createMax(trees);

  const visibility = new Array(trees.length);
  for (let i = 0; i < visibility.length; i++) {
    visibility[i] = [];
  }

  for (let i = 0; i < trees.length; i++) {
    const oi = trees.length - i - 1;

    for (let j = 0; j < trees[0].length; j++) {
      const oj = trees[0].length - j - 1;

      if (trees[i][j] > max.top[j]) {
        max.top[j] = trees[i][j];
        visibility[i][j] = true;
      }

      if (trees[i][j] > max.left[i]) {
        max.left[i] = trees[i][j];
        visibility[i][j] = true;
      }

      if (trees[oi][oj] > max.bottom[oj]) {
        max.bottom[oj] = trees[oi][oj];
        visibility[oi][oj] = true;
      }

      if (trees[oi][oj] > max.right[oi]) {
        max.right[oi] = trees[oi][oj];
        visibility[oi][oj] = true;
      }
    }
  }

  return visibility.reduce((sum, row) => sum + row.filter(Boolean).length, 0)
}
