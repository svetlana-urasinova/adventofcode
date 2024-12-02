import { ConfigValues, getConfigValue } from './utils/load-config.js';
import { loadPages } from './utils/load-pages.js';

const headerTitleYearElement = document.querySelector('.header-title-year');
const mainElement = document.querySelector('.main');
const mainTitleElement = mainElement.querySelector('.main-title');
const mainSourceElement = mainElement.querySelector('.main-source');
const mainSourceLinkToAocElement = mainSourceElement.querySelector('.main-source-link-aoc');
const mainSourceLinkToGithubElement = mainSourceElement.querySelector('.main-source-link-github');
const mainContentElement = mainElement.querySelector('.main-content');
const sidebarElement = document.querySelector('.sidebar');
const sidebarYearSelectElement = sidebarElement.querySelector('.sidebar-year-select');
const sidebarMenuElement = sidebarElement.querySelector('.sidebar-list');
const sidebarMenuItemTemplate = document.querySelector('#sidebar_list_item');

const currentDate = {
  year: null,
  day: null,
};

window.onload = async () => {
  const { year, day } = getPageDataFromUrl();

  const pages = await loadPages();

  currentDate.year = year || Math.max(...Object.keys(pages));
  currentDate.day = day || 1;

  initYearsSelectElement(pages);

  if (location.hash) {
    loadPage(pages, currentDate.day);
  } else {
    generateSidebarMenu(pages);
  }
};

function initYearsSelectElement(pages) {
  const years = Object.keys(pages);

  for (const year of years) {
    const optionElement = document.createElement('option');

    optionElement.textContent = year;
    optionElement.value = year;

    sidebarYearSelectElement.appendChild(optionElement);
  }

  sidebarYearSelectElement.addEventListener('change', function (event) {
    yearsChangeHandler(event.target.value);
  });
}

function yearsChangeHandler(year) {
  currentDate.year = year;

  location.hash = `${year}/day${currentDate.day}`;
  loadPage(currentDate.day);
}

function getSidebarItemElement(day, selected) {
  const sidebarItemClone = sidebarMenuItemTemplate.content.cloneNode(true);
  const sidebarItem = sidebarItemClone.querySelector('.sidebar-list-item');

  const linkElement = sidebarItem.querySelector('a');

  linkElement.textContent = `Day ${day}`;
  linkElement.setAttribute('href', `#${currentDate.year}/day${day}`);
  linkElement.addEventListener('click', () => {
    sidebarItemClickHandler(day);
  });

  if (selected) {
    linkElement.classList.add('selected');
  }

  return sidebarItem;
}

function sidebarItemClickHandler(day) {
  currentDate.day = day;

  const pageContent = loadPage(day);

  if (pageContent) {
    mainContentElement.textContent = pageContent;
  }
}

function generateSidebarMenu(pages) {
  const { year, day } = currentDate;

  const currentYearPages = pages[year];

  if ('content' in document.createElement('template')) {
    sidebarMenuElement.innerHTML = '';

    for (let i = 1; i <= Object.keys(currentYearPages).length; i++) {
      const sidebarItemElement = getSidebarItemElement(i, i === day);
      sidebarMenuElement.appendChild(sidebarItemElement);
    }
  }
}

function loadPage(pages, currentDay) {
  const { year } = currentDate;

  const getPageContent = pages[year][currentDay];

  headerTitleYearElement.textContent = year;
  generateSidebarMenu(pages);

  if (getPageContent) {
    mainTitleElement.textContent = `Day ${currentDay}`;
    mainTitleElement.classList.remove('hidden');

    const aocLink = `${getConfigValue(ConfigValues.AocUrl)}${year}/day/${currentDay}`;
    mainSourceLinkToAocElement.textContent = aocLink;
    mainSourceLinkToAocElement.setAttribute('href', aocLink);

    const githubLink = `${getConfigValue(ConfigValues.GithubUrl)}${year}/${currentDay}`;
    mainSourceLinkToGithubElement.textContent = githubLink;
    mainSourceLinkToGithubElement.setAttribute('href', githubLink);
    mainSourceElement.classList.remove('hidden');

    const pageContent = getPageContent() || '';
    mainContentElement.innerHTML = pageContent;
  }
}

function getPageDataFromUrl() {
  const hash = window.location.hash.substring(1);
  const groups = hash.match(/^(?<year>[\d]{4})(\/day(?<day>\d+))?$/)?.groups;

  const year = groups?.year ? Number(groups.year) : null;
  const day = groups?.day ? Number(groups.day) : null;

  return { year, day };
}
