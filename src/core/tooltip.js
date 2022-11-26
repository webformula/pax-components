import util from './util.js';


let tooltipElement;
let lastMousePosition;
let tooltipTimer;

const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'attributes') {
      if (mutation.attributeName === 'title') convertTitleToTooltip(mutation.target);
      if (mutation.attributeName === 'tooltip') prepareTooltip(mutation.target);
    }
  }
});

document.addEventListener('DOMContentLoaded', initialize);


async function initialize() {
  if (document.body.classList.contains('mdw-no-tooltip')) return;

  document.body.insertAdjacentHTML('beforeend', '<mdw-tooltip class="mdw-main-tooltip" aria-label="blank"></mdw-tooltip>');
  await util.nextAnimationFrameAsync();
  tooltipElement = document.querySelector('mdw-tooltip.mdw-main-tooltip');

  observer.observe(document.body, { subtree: true, attributeFilter: ['title', 'tooltip'] });

  // observer will not catch the initial load of the page
  [...document.querySelectorAll('[title]')].forEach(convertTitleToTooltip);
}

function convertTitleToTooltip(element) {
  // removed
  if (!element.hasAttribute('title')) return;

  const titleValue = element.getAttribute('title');
  element.removeAttribute('title');

  if (!titleValue) return;
  element.setAttribute('tooltip', titleValue);
}

function prepareTooltip(element) {
  // removed
  if (!element.hasAttribute('tooltip')) return;

  element.addEventListener('mouseover', onMouseover);
  element.addEventListener('mouseout', onMouseout);
}

function onMouseover(event) {
  lastMousePosition = event.clientX;
  // this = the element with this event
  startTooltipTimer(this);
}

function onMouseout(event) {
  // if a target has multiple sub elements we do not want to remove the tooltip
  // this = the element with this event
  // relatedTarget = this element the mouse was moved to
  const isLeavingTarget = event.relatedTarget !== this && !this.contains(event.relatedTarget);
  if (isLeavingTarget) removeTooltip(this);
}

function onMousemove(event) {
  lastMousePosition = event.clientX;
}

function startTooltipTimer(target) {
  if (tooltipTimer) return;
  tooltipTimer = setTimeout(() => {
    const text = target.getAttribute('tooltip');
    tooltipElement.innerHTML = text;
    tooltipElement.setAttribute('aria-label', text);
    tooltipElement.show(target, lastMousePosition);
  }, 1000);
  target.addEventListener('mousemove', onMousemove);
}


function removeTooltip(target) {
  if (!tooltipTimer) return;
  target.removeEventListener('mousemove', onMousemove);
  tooltipElement.hide();
  clearTimeout(tooltipTimer);
  tooltipTimer = undefined;
}
