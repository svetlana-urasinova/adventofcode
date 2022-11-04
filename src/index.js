import { links } from './links.js';

import { main as day1 } from './1/index.js';
import { main as day2 } from './2/index.js';
import { main as day3 } from './3/index.js';
import { main as day4 } from './4/index.js';

const DAYS_COUNT = 4;

const mainElement = document.querySelector(".main");
const mainTitleElement = mainElement.querySelector(".main-title");
const mainSourceElement = mainElement.querySelector(".main-source");
const mainSourceLinkToAocElement = mainSourceElement.querySelector(".main-source-link-aoc");
const mainSourceLinkToGithubElement = mainSourceElement.querySelector(".main-source-link-github");
const mainContentElement = mainElement.querySelector(".main-content");
const sidebarElement = document.querySelector(".sidebar");
const sidebarItemTemplate = document.querySelector("#sidebar_item");

const pages = {
  day1: () => day1(),
  day2: () => day2(),
  day3: () => day3(),
  day4: () => day4(),
}

window.onload = () => {

  if ('content' in document.createElement('template')) {
    for (let i = 1; i <= DAYS_COUNT; i++) {
      const sidebarItemElement = getSidebarItemElement(i);
      sidebarElement.appendChild(sidebarItemElement);
    }
  }

  const currentIndex = location.hash.substring(1);
  if (!!currentIndex) {
    loadPage(currentIndex);
  }
}


function getSidebarItemElement(index) {
  const sidebarItemClone = sidebarItemTemplate.content.cloneNode(true);
  const sidebarItem = sidebarItemClone.querySelector(".sidebar-item");

  sidebarItem.textContent = `Day ${index}`;
  sidebarItem.setAttribute('href', `#${index}`);
  sidebarItem.addEventListener('click', () => { sidebarItemClickHandler(index) });

  return sidebarItem;
}

function sidebarItemClickHandler(index) {
  const pageContent = loadPage(index);

  if (pageContent) {
    mainContentElement.textContent = pageContent
  }
}

function loadPage(index) {
  const getPageContent = pages[`day${index}`];

  if (getPageContent) {
    mainTitleElement.textContent = `Day ${index}`;
    mainTitleElement.classList.remove('hidden');

    mainSourceLinkToAocElement.textContent = links.aoc + index;
    mainSourceLinkToAocElement.setAttribute('href', links.aoc + index);
    mainSourceLinkToGithubElement.textContent = links.github + index;
    mainSourceLinkToGithubElement.setAttribute('href', links.github + index);
    mainSourceElement.classList.remove('hidden');

    const pageContent = getPageContent() || '';
    mainContentElement.innerHTML = pageContent;
  }
}
