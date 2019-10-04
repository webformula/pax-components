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
    this.removeBackdrop();
  }

  get contentElement() {
    return this.querySelector('mdw-sheet-content');
  }

  get title() {
    return this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  get isModal() {
    return this.hasAttribute('mdw-modal');
  }

  registerHeader(element, hasCollaspedHeader) {
    this.headerElement = element;
    this.headerElement.title = this.title;
    if (hasCollaspedHeader) this.classList.add('mdw-has-collasped-header');
    if (this.isModal) element.disableCollapsedHeader();
  }

  setupHeader() {
    if (!this.querySelector('mdw-sheet-header')) {
      this.insertAdjacentHTML('afterbegin', `<mdw-sheet-header mdw-title="${this.title}"></mdw-sheet-header>`);
    }
  }

  addBackdrop() {
    if (this.isModal) {
      this.backdrop = MDWUtils.addBackdrop(this, () => {
        this.close();
      });
    }
  }

  removeBackdrop() {
    if (this.backdrop) this.backdrop.remove();
    this.backdrop = undefined;
  }

  setInitalPositions() {
    // page height
    this.viewHeight = window.innerHeight;

    // half height for modal, quater hight for non modal
    this.clientCenter = this.isModal ? this.viewHeight / 2 : this.viewHeight / 4;
    this.contentHeight = this.contentElement.offsetHeight;
    this.intialHeight = Math.min(this.contentHeight, this.clientCenter);

    // user set inital height
    if (this.hasAttribute('mdw-collapsed-height')) this.intialHeight = parseInt(this.getAttribute('mdw-collapsed-height').replace('px', ''));

    // the transform: translateY postion for the top of the page
    this.scrollY = -(this.viewHeight - this.intialHeight - 56);
    this.isDraggable = this.contentHeight > this.clientCenter;
    this.style.top = `calc(100% - ${this.intialHeight + 56}px)`;
  }

  open() {
    // lear close timeout so we do not overlap on a fast open
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
    this.classList.remove('mdw-closed');
    this.addBackdrop();

    // animation in sheet
    setTimeout(() => {
      this.setInitalPositions();
      this.setPosition(0);
      if (this.isDraggable) addSwipeListener(this.contentElement, this.bound_onSwipe);
      this.contentElement.addEventListener('scroll', this.bound_onScroll);
    }, 0);
    if (this.isModal) MDWUtils.lockPageScroll();
  }

  close() {
    removeSwipeListener(this.contentElement, this.bound_onSwipe);
    this.contentElement.removeEventListener('scroll', this.bound_onScroll);
    this.setPosition(this.intialHeight + this.headerElement.offsetHeight);
    this.closeTimeout = setTimeout(() => {
      this.classList.add('mdw-closed');
      this.headerElement.hideFullscreen();
    }, 600);
    this.isOpen = false;
    this.removeBackdrop();
  }

  collapse() {
    if (this.isDraggable) addSwipeListener(this.contentElement, this.bound_onSwipe);
    this.setPosition(0);
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  onSwipe(event) {
    switch (event.state) {
      case 'start':
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
    if (y <= this.scrollY) {
      y = this.scrollY;
      this.style.touchAction = '';
      disableSwipeListenerForElement(this.contentElement);
    }
    if (this.currentDragPosition === y) return;
    this.style[MDWUtils.transformPropertyName] = `translate3d(0, ${y}px, 0)`;
    this.currentDragPosition = y;

    // show header befor it hits the top
    if (y - this.scrollY < 80) {
      this.headerElement.showFullscreen();
      this.classList.add('mdw-sheet-fullscreen');
    } else {
      this.headerElement.hideFullscreen();
      this.classList.remove('mdw-sheet-fullscreen');
    }

    // if is draggable
    if (this.isDraggable) this.headerElement.showDragIcon();
  }

  snapPosition(velocity) {
    // snap based on velocity (swipe montion)
    if (velocity < -0.7) return this.setPosition(this.scrollY);
    if (this.startDragPosition === this.scrollY && velocity > 0.7) return this.setPosition(0);
    if (this.startDragPosition <= 0 && velocity > 0.7) return this.close();

    // snap based on position
    const split = Math.abs(this.scrollY) / 2;
    // half way between center and top
    if (this.currentDragPosition - this.scrollY < split) this.setPosition(this.scrollY);
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
