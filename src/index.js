import { main as day1 } from './1/index.js';
import { main as day2 } from './2/index.js';

const DAYS_COUNT = 2;

const mainElement = document.querySelector(".main");
const mainTitleElement = mainElement.querySelector(".main-title");
const mainContentElement = mainElement.querySelector(".main-content");
const sidebarElement = document.querySelector(".sidebar");
const sidebarItemTemplate = document.querySelector("#sidebar_item");

const pages = {
  day1: () => day1(),
  day2: () => day2(),
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

    const pageContent = getPageContent() || '';
    mainContentElement.innerHTML = pageContent;
  }
}
