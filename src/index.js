import { links } from './links.js';

import { main as day1of2019 } from './2019/1/index.js';
import { main as day2of2019 } from './2019/2/index.js';
import { main as day3of2019 } from './2019/3/index.js';
import { main as day4of2019 } from './2019/4/index.js';

import { main as day1of2021 } from './2021/1/index.js';
import { main as day2of2021 } from './2021/2/index.js';
import { main as day3of2021 } from './2021/3/index.js';
import { main as day4of2021 } from './2021/4/index.js';

const headerTitleYearElement = document.querySelector(".header-title-year");
const mainElement = document.querySelector(".main");
const mainTitleElement = mainElement.querySelector(".main-title");
const mainSourceElement = mainElement.querySelector(".main-source");
const mainSourceLinkToAocElement = mainSourceElement.querySelector(".main-source-link-aoc");
const mainSourceLinkToGithubElement = mainSourceElement.querySelector(".main-source-link-github");
const mainContentElement = mainElement.querySelector(".main-content");
const sidebarElement = document.querySelector(".sidebar");
const sidebarYearSelectElement = sidebarElement.querySelector(".sidebar-year-select");
const sidebarMenuElement = sidebarElement.querySelector(".sidebar-menu");
const sidebarMenuItemTemplate = document.querySelector("#sidebar_menu_item");

const pages = {
  2019: {
    day1: () => day1of2019(),
    day2: () => day2of2019(),
    day3: () => day3of2019(),
    day4: () => day4of2019(),
  },

  2021: {
    day1: () => day1of2021(),
    day2: () => day2of2021(),
    day3: () => day3of2021(),
    day4: () => day4of2021(),
  }
}

window.onload = () => {
  updateSelectElement();

  sidebarYearSelectElement.addEventListener('change', () => {
    selectChangeHandler();
  })

  if (location.hash) {
    const currentDay = getCurrentDay();
    loadPage(currentDay);
  } else {
    generateSidebarMenu();
  }
}

function updateSelectElement() {
  const currentYear = getCurrentYear();

  const years = Object.keys(pages);

  for (let year of years) {
    const optionElement = document.createElement('option');
    optionElement.textContent = year;
    optionElement.value = year;
    sidebarYearSelectElement.appendChild(optionElement);
  }

  sidebarYearSelectElement.value = currentYear;
}

function selectChangeHandler() {
  const currentDay = getCurrentDay();
  const currentYear = sidebarYearSelectElement.value;

  location.hash = `${currentYear}/day${currentDay}`;
  loadPage(currentDay);
}

function getSidebarItemElement(day) {
  const sidebarItemClone = sidebarMenuItemTemplate.content.cloneNode(true);
  const sidebarItem = sidebarItemClone.querySelector(".sidebar-menu-item");
  const currentYear = getCurrentYear();

  sidebarItem.textContent = `Day ${day}`;
  sidebarItem.setAttribute('href', `#${currentYear}/day${day}`);
  sidebarItem.addEventListener('click', () => { sidebarItemClickHandler(day) });

  return sidebarItem;
}

function sidebarItemClickHandler(day) {
  const pageContent = loadPage(day);

  if (pageContent) {
    mainContentElement.textContent = pageContent;
  }
}

function generateSidebarMenu() {
  const currentYear = getCurrentYear();
  const currentYearPages = pages[currentYear];

  if ('content' in document.createElement('template')) {
    sidebarMenuElement.innerHTML = '';

    for (let i = 1; i <= Object.keys(currentYearPages).length; i++) {
      const sidebarItemElement = getSidebarItemElement(i);
      sidebarMenuElement.appendChild(sidebarItemElement);
    }
  }
}

function loadPage(currentDay) {
  const currentYear = getCurrentYear();
  const getPageContent = pages[currentYear][`day${currentDay}`];

  headerTitleYearElement.textContent = currentYear;
  generateSidebarMenu();

  if (getPageContent) {
    mainTitleElement.textContent = `Day ${currentDay}`;
    mainTitleElement.classList.remove('hidden');

    const aocLink = `${links.aoc}${currentYear}/day/${currentDay}`;
    mainSourceLinkToAocElement.textContent = aocLink;
    mainSourceLinkToAocElement.setAttribute('href', aocLink);

    const githubLink = `${links.github}${currentYear}/${currentDay}`;
    mainSourceLinkToGithubElement.textContent = githubLink;
    mainSourceLinkToGithubElement.setAttribute('href', githubLink);
    mainSourceElement.classList.remove('hidden');

    const pageContent = getPageContent() || '';
    mainContentElement.innerHTML = pageContent;
  }
}

function getCurrentDay() {
  const { day } = getPageDataFromUrl();

  return day || 1;
}

function getCurrentYear() {
  const { year } = getPageDataFromUrl();

  return year || Object.keys(pages)[0];
}

function getPageDataFromUrl() {
  const hash = location.hash.substring(1);
  const match = hash.match(/^([\d]{4})(\/day(\d+))?$/);

  return { year: match?.[1] || null, day: match?.[3] || null }
}
