import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener, disableSwipeListenerForElement, enableSwipeListenerForElement } from '../../core/gestures.js';

customElements.define('mdw-sheet', class extends HTMLElementExtended {
  constructor() {
    super();

    this.isOpen = false;
    this.classList.add('mdw-closed');
    this.currentDragPosition = -1;
    this.bound_onSwipe = this.onSwipe.bind(this);
    this.bound_onScroll = this.onScroll.bind(this);
    this.style[MDWUtils.transformPropertyName] = 'translate3d(0, 100%, 0)';
    this.setupHeader();
  }

  disconnectedCallback() {
    removeSwipeListener(this.contentElement, this.bound_onSwipe);
    this.removeEventListener('scroll', this.bound_onScroll);
  }

  get contentElement() {
    return this.querySelector('mdw-sheet-content');
  }

  get title() {
    return this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  registerHeader(element) {
    this.headerElement = element;
    this.headerElement.title = this.title;
  }

  setupHeader() {
    if (!this.querySelector('mdw-sheet-header')) {
      this.insertAdjacentHTML('afterbegin', `<mdw-sheet-header mdw-title="${this.title}"></mdw-sheet-header>`);
    }
  }

  open() {
    // lear close timeout so we do not overlap on a fast open
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
    this.classList.remove('mdw-closed');

    // animation in sheet
    setTimeout(() => {
      this.setPosition(0);
      addSwipeListener(this.contentElement, this.bound_onSwipe);
      this.contentElement.addEventListener('scroll', this.bound_onScroll);
    }, 0);
    this.isOpen = true;
  }

  close() {
    removeSwipeListener(this.contentElement, this.bound_onSwipe);
    this.contentElement.removeEventListener('scroll', this.bound_onScroll);
    this.setPosition(-this.topY);
    this.closeTimeout = setTimeout(() => {
      this.classList.add('mdw-closed');
    }, 600);
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  onSwipe(event) {
    switch (event.state) {
      case 'start':
        this.topY = -(this.offsetHeight / 2);
        this.startDragPosition = this.currentDragPosition;
        break;
      case 'move':
        this.setPosition(this.startDragPosition + event.distance.y);
        break;
      case 'end':
        this.snapPosition(event.velocity.y);
        break;
    }
  }

  setPosition(y) {
    // if the sheet is at top then setup scrolling
    if (y <= this.topY) {
      y = this.topY;
      // this.headerElement.fix();
      this.style.touchAction = '';
      disableSwipeListenerForElement(this.contentElement);
    }
    if (this.currentDragPosition === y) return;
    this.style[MDWUtils.transformPropertyName] = `translate3d(0, ${y}px, 0)`;
    this.currentDragPosition = y;

    // show header befor it hits the top
    if (y - this.topY < 80) this.headerElement.show();
    else this.headerElement.hide();

    // if is draggable
    if (this.offsetHeight / 2 < this.contentElement.scrollHeight) {
      this.headerElement.showDragIcon();
    }
  }

  snapPosition(velocity) {
    // snap based on velocity (swipe montion)
    if (velocity < -0.7) return this.setPosition(this.topY);
    if (this.startDragPosition === this.topY && velocity > 0.7) return this.setPosition(0);
    if (this.startDragPosition <= 0 && velocity > 0.7) return this.close();

    // snap based on position
    const split = Math.abs(this.topY) / 2;
    // half way between center and top
    if (this.currentDragPosition - this.topY < split) this.setPosition(this.topY);
    // half way between center and bottom
    else if (this.currentDragPosition > split) this.close();
    else this.setPosition(0);
  }

  onScroll() {
    if (this.contentElement.scrollTop === 0) {
      enableSwipeListenerForElement(this.contentElement);
    }
  }
});
