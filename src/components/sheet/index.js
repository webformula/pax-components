import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener } from '../../core/gestures.js'

customElements.define('mdw-sheet', class extends HTMLElementExtended {
  constructor() {
    super();

    this.headerHeight = 56;
    this.classList.add('mdw-closed');
    this.isShowing = false;
    this.isModal = this.hasAttribute('mdw-modal');
    this.bound_onclick = this.onclick.bind(this);

    if (!this.querySelector('mdw-sheet-header')) {
      this.insertAdjacentHTML('afterbegin', '<mdw-sheet-header></mdw-sheet-header>');
    }
  }

  connectedCallback() {
    this.transformPropertyName = MDWUtils.transformPropertyName;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.bound_onclick);
  }

  registerHeader(element) {
    this.headerElement = element;
  }

  registerContent(element) {
    this.contentElement = element;
  }

  get sheetContainer() {
    return this.contentElement.shadowRoot.querySelector('.mdw-sheet-content-container');
  }

  onclick({ target }) {
    if (target.nodeName === 'MDW-SHEET' && this.isModal) {
      this.hide();
    }
  }


  show() {
    this.classList.remove('mdw-closed');
    this.contentElement.show();
    this.isShowing = true;
    this.calculateInitialShowPosition();
    if (this.isModal) this.addEventListener('click', this.bound_onclick);
    let startYPos = this.translateYCurrent;

    // This event will continue to start move and end until you remove it
    addSwipeListener(this.sheetContainer, event => {
      switch (event.state) {
        case 'start':
          startYPos = this.currentPosition;
        case 'move':
          const newPos = startYPos + event.distance.y;
          // full screen
          if (newPos < 0) this.setPosition(0);
          // close if below threshold
          else if (newPos > this.closeThresholdHeight) return this.hide();
          else this.setPosition(newPos);

          // show initial header
          this.classList.toggle('mdw-full-screen', this.currentPosition - 12 <= this.minimumPosition);
          // this.classList.toggle('mdw-show-fixed-header', this.sheetContainer.getBoundingClientRect().top <= 0);
          break;
        case 'end':
          if (this.currentPosition - this.minimumPosition > 0) this.snapTranslation();
          // show initial header
          this.classList.toggle('mdw-full-screen', (this.currentPosition - 12) <= this.minimumPosition);

          // end happens when the pointer event is done
          // but the animation is moving the element so we need to keep an eye on it
          // this will fix the headers state
          // the animation runs for 400 ms
          // if (!this.fixHeaderInterval) this.fixHeaderInterval = setInterval(() => {
          //   this.classList.toggle('mdw-show-fixed-header', this.sheetContainer.getBoundingClientRect().top <= 0);
          // }, 4);
          // setTimeout(() => {
          //   clearInterval(this.fixHeaderInterval);
          //   this.fixHeaderInterval = undefined;
          // }, 400);
      }
    });
  }

  hide() {
    this.classList.add('mdw-closed');
    this.contentElement.hide();
    this.isShowing = false;
    this.sheetContainer.style[this.transformPropertyName] = '';
    this.removeEventListener('click', this.bound_onclick);
    removeSwipeListener(this.sheetContainer);
    this.classList.remove('mdw-full-screen');
    // this.classList.remove('mdw-show-fixed-header');
    // if (this.fixHeaderInterval) clearInterval(this.fixHeaderInterval);
    // this.fixHeaderInterval = undefined;
  }

  close() {
    this.hide();
  }

  toggle() {
    if (this.isShowing) this.hide();
    else this.show();
  }

  calculateInitialShowPosition() {
    const sheetHeight = this.sheetContainer.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;
    const halfHeight = clientHeight / 2;
    const fullHeight = this.scrollHeight - clientHeight;
    const height = sheetHeight <= halfHeight ? 0 : fullHeight - halfHeight;
    this.closeThresholdHeight = sheetHeight - (height / 4);
    this.initialPosition = height;
    this.minimumPosition = this.sheetContainer.offsetTop - this.contentElement.offsetTop + this.headerHeight;
    this.setPosition(height);
  }

  setPosition(value, postFix = 'px') {
    this.currentPosition = value;
    this.sheetContainer.style[this.transformPropertyName] = `translateY(${value}${postFix})`;
  }

  // snap the sheet to one of 2 resting posiotions
  // resting pos a: initial postion at the center
  // resting pos b: the top of the page with the header
  snapTranslation() {
    const distanceFromInitial = this.initialPosition - this.currentPosition;
    const distanceFromMin = this.currentPosition - this.minimumPosition;
    if (distanceFromInitial < distanceFromMin) this.setPosition(this.initialPosition);
    else this.setPosition(this.minimumPosition);
  }
});
