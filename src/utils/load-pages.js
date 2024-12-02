import { solvedPuzzles } from '../constants/solved-puzzles.js';

export async function loadPages() {
  const pages = {};

  for (const year of Object.keys(solvedPuzzles)) {
    pages[year] = await getImports(year);
  }

  return pages;
}

async function getImports(year) {
  const imports = solvedPuzzles[year].map(async day => {
    try {
      const module = await import(`../${year}/${day}/index.js`);

      return { day, module };
    } catch (error) {
      console.error(`Error importing module for ${year}/${day}:`, error);

      return { day, module: null };
    }
  });

  return (await Promise.all(imports)).reduce((acc, { day, module }) => ({ ...acc, [day]: module.main }), {});
}
