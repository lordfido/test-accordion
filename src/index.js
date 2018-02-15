// Get custom styles
import './styles/main';

import ajaxUrl from './more-tabs';

let sectionCount;
let sectionWidth;
let accordion;

/**
 * Place new tabs into the Accordion
 */
const addMoreTabs = (tabs) => {
  tabs.forEach(t => {
    const date = new Date().toLocaleString();

    // Creates the title
    const tabTitle = document.createElement('dt');
    tabTitle.classList.add('Accordion-title');
    tabTitle.innerText = t.title;

    // Creates the data
    const tabData = document.createElement('dd');
    tabData.classList.add('Accordion-data');
    tabData.innerHTML = `<p>${t.data}, added on ${date}`;

    // Append both elements to the accordion
    accordion.append(tabTitle);
    accordion.append(tabData);
  });

  const selectedTab = document.querySelector('.Accordion-data.is-open');

  // Init the accordion
  initAccordion(selectedTab);
}

/**
 * Makes an AJAX call
 */
const requestMoreTabs = () => {
  // Create a config object
  const config = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  // Create the Http Request
  const request = new Request(ajaxUrl, config);

  // Fetch data
  fetch(request)
    .then(res => res.json())
    .then(res => { addMoreTabs(res); });
}

/**
 * Open/close tabs
 * @param {DOMElement} elem - The element that is going to be open
 * @param {array} tabs - An array with all available tabs
 */
const toggleTabs = (elem, tabs) => {

  // Close other elements
  tabs.forEach(d => d.classList.remove('is-open'));

  // Open selected element
  elem.classList.add('is-open');
}

/**
 * Function that checks the click, and runs other methods
 * @param {Event} e - Click event
 */
const handleClick = (e) => {
  // Get clicked element
  const { target } = e;

  // Title elements
  if (target.classList.contains('Accordion-title')) {
    // Get some elements form the DOM
    const { nextElementSibling: elem } = target;
    const tabs = Array.from(document.querySelectorAll('.Accordion-data'));

    toggleTabs(elem, tabs);
  }
}

/**
 * Remove all custom widths and classnames from the accordion
 * and open the first available tab
 * @param {DOMElement} initialTab - The tab that is going to be selected
 */
const initAccordion = (initialTab) => {
  // Update some variables
  sectionCount = document.querySelectorAll('.Accordion-title').length;
  sectionWidth = document.querySelector('.Accordion-title').offsetWidth;

  // Get all data elements
  const tabs = Array.from(document.querySelectorAll('.Accordion-data'));

  toggleTabs(initialTab, tabs);
};


/**
 * Initialize event listeners
 */
const init = () => {
  // Update some variables
  accordion = document.querySelector('.Accordion');
  const button = document.getElementById('add');

  const initialTab = document.querySelector('.Accordion-data');
  initAccordion(initialTab);

  // Detect mouse clicks on the accordion
  accordion.addEventListener('click', handleClick);

  // Detect mouse clicks on the butotn
  button.addEventListener('click', requestMoreTabs);
};

init();