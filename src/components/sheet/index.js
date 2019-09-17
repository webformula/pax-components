import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener } from '../../core/gestures.js'

customElements.define('mdw-sheet', class extends HTMLElementExtended {
  constructor() {
    super();
    this.classList.add('mdw-closed');
    this.isShowing = false;
    this.cloneTemplate();

    this.isModal = this.hasAttribute('mdw-modal');
    this.bound_onclick = this.onclick.bind(this);
  }

  connectedCallback() {
    this.transformPropertyName = MDWUtils.transformPropertyName;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.bound_onclick);
  }

  get sheetABS() {
    return this.shadowRoot.querySelector('.sheet-abs');
  }

  get sheetContainer() {
    return this.shadowRoot.querySelector('.sheet-container');
  }

  onclick({ target }) {
    if (target.nodeName === 'MDW-SHEET' && this.isModal) {
      this.hide();
    }
  }

  show() {
    this.classList.remove('mdw-closed');
    this.isShowing = true;
    this.calculateInitialShowPosition();
    if (this.isModal) this.addEventListener('click', this.bound_onclick);
    let startYPos = this.translateYCurrent;

    // This event will continue to start move and end until you remove it
    addSwipeListener(this.sheetContainer, event => {
      switch (event.state) {
        case 'start':
          startYPos = this.translateYCurrent;
        case 'move':
          // 0 = scroll end
          // prevent scrolling past end
          const newPos = startYPos + event.distance.y;
          if (newPos < 0) this.setTranslateY(0);
          else this.setTranslateY(newPos);
          break;
        case 'end':
          if (this.translateYCurrent - this.translateYMin > 0) this.snapTranslation();
      }
    });
  }

  hide() {
    this.classList.add('mdw-closed');
    this.isShowing = false;
    this.clearTransform();
    this.removeEventListener('click', this.bound_onclick);
    removeSwipeListener(this.sheetContainer);
  }

  toggle() {
    if (this.isShowing) this.hide();
    else this.show();
  }

  // isAtScrollEnd() {
  //   return this.sheetContainer.getBoundingClientRect().y <= this.sheetABS.offsetTop;
  // }

  calculateInitialShowPosition() {
    const sheetHeight = this.sheetContainer.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;
    const halfHeight = clientHeight / 2;
    const fullHeight = this.scrollHeight - clientHeight;
    const height = sheetHeight <= halfHeight ? 0 : fullHeight - halfHeight;
    this.translateYinitial = height;
    this.translateYMin = this.sheetContainer.offsetTop - this.sheetABS.offsetTop;
    this.translateYScrollEnd = 0;
    this.setTranslateY(height);

    // TODO fix this

    // check for offscreen elements and offset height so that a partial element is showing
    // This will help show people they can scroll
    // const all = MDWUtils.querySlottedAll(this, 'mdw-list-item');
    // const initialTop = this.sheetABS.offsetTop + height;
    // const onScreen = all.map(el => ({
    //   el,
    //   onScreen: (initialTop + el.offsetTop) < clientHeight
    // }));
    // const offScreen = onScreen.filter(({ onScreen }) => onScreen === false);
    // if (offScreen.length === 0) height = scrollHeight;
    // else height -= offScreen[0].el.offsetHeight / 2;
    //
    // console.log({ scrollHeight, clientHeight, halfHeight, heightOffset, height });
    // height = 300;
    // this.sheetContainer.style[this.transformPropertyName] = `translateY(${height}px)`;
  }

  setTranslateY(value, postFix = 'px') {
    this.translateYCurrent = value;
    this.sheetContainer.style[this.transformPropertyName] = `translateY(${value}${postFix})`;
  }

  // snap the sheet to one of 2 resting posiotions
  // resting pos a: initial postion at the center
  // resting pos b: the top of the page with the header
  snapTranslation() {
    const distanceFromInitial = this.translateYinitial - this.translateYCurrent;
    const distanceFromMin = this.translateYCurrent - this.translateYMin;
    if (distanceFromInitial < distanceFromMin) this.setTranslateY(this.translateYinitial);
    else this.setTranslateY(this.translateYMin);
  }

  clearTransform() {
    this.sheetContainer.style[this.transformPropertyName] = '';
  }

  get internalStylesFile() {
    return './internal.css';
  }

  template() {
    return '<div class="sheet-abs"><div class="sheet-container"><slot></slot></div></div>';
  }
});
