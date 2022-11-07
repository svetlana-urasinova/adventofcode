import { main as day1of2019 } from './2019/1/index.js';
import { main as day2of2019 } from './2019/2/index.js';
import { main as day3of2019 } from './2019/3/index.js';
import { main as day4of2019 } from './2019/4/index.js';
import { main as day5of2019 } from './2019/5/index.js';

import { main as day1of2021 } from './2021/1/index.js';
import { main as day2of2021 } from './2021/2/index.js';
import { main as day3of2021 } from './2021/3/index.js';
import { main as day4of2021 } from './2021/4/index.js';
import { main as day5of2021 } from './2021/5/index.js';
import { main as day6of2021 } from './2021/6/index.js';
import { main as day7of2021 } from './2021/7/index.js';

export const pages = {
  2019: {
    day1: () => day1of2019(),
    day2: () => day2of2019(),
    day3: () => day3of2019(),
    day4: () => day4of2019(),
    day5: () => day5of2019(),
  },

  2021: {
    day1: () => day1of2021(),
    day2: () => day2of2021(),
    day3: () => day3of2021(),
    day4: () => day4of2021(),
    day5: () => day5of2021(),
    day6: () => day6of2021(),
    day7: () => day7of2021(),
  }
}