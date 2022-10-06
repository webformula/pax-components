import util from './util.js';


export default class Panel {
  template = '';
  position = 'center center';
  animation = 'translateY'; // translateY, scale
  adjustForBarsAndNavigation = false; // make sure the panel does not overlap navigation and bars
  targetElement;
  scroll = false;
  fullScreen = false;
  width = '360px';
  backdrop = true;
  clickOutsideToClose = false;
  escToClose = false;
  classes = '';
  offsetY = 0;
  offsetX = 0;

  #overflowScrollRegex = /(auto|scroll)/;
  #id = `panel${util.getUID()}`;
  #callOnClick_bound = this.#callOnClick.bind(this);
  #onClickOutside_bound = this.#onClickOutside.bind(this);
  #onContainerScroll_bound = this.#onContainerScroll.bind(this);
  #elementsToIgnore = [];
  #showing = false;
  #element;
  #contentElement;
  #contentPositionProperty;
  #contentPosition;
  #initialScrollPosition;

  constructor(params = {
    template: '',
    position: 'center center', // position does not work with targets
    animation: 'translateY', // translateY, scale
    adjustForBarsAndNavigation: false,
    targetElement: undefined,
    scroll: false,
    fullScreen: false,
    width: '360px',
    backdrop: true,
    clickOutsideToClose: false,
    escToClose: false
  }) {
    this.template = params.template;
    this.position = params.position;
    this.animation = params.animation;
    this.adjustForBarsAndNavigation = params.adjustForBarsAndNavigation;
    this.targetElement = params.targetElement;
    this.scroll = params.scroll;
    this.fullScreen = params.fullScreen;
    this.width = params.width;
    this.backdrop = params.backdrop;
    this.clickOutsideToClose = params.clickOutsideToClose;
    this.escToClose = params.escToClose;
  }

  get element() {
    return this.#contentElement;
  }

  get showing() {
    return this.#showing;
  }

  async show() {
    if (this.#showing === true) return;
    this.#showing = true;

    // NOTE animation bug
    // transition end event was breaking and the fix was to use a second class for the open animation
    // we also need to set the max hight in javascript
    let classes = !this.targetElement ? 'mdw-open-animation' : 'mdw-open-animation-target';
    if (this.classes) classes += ` ${this.classes}`;
    if (this.fullScreen) classes += ' mdw-fullscreen';
    if (this.backdrop) classes += ' mdw-backdrop';
    if (this.animation === 'scale') classes += ' mdw-animation-scale';

    document.body.insertAdjacentHTML('beforeend', `
      <div class="mdw-panel ${classes}" id="${this.#id}">
        <div class="mdw-panel-content">
          ${this.template}
        </div>
      </div>
    `);

    await util.nextAnimationFrameAsync();
    this.#element = document.querySelector(`#${this.#id}`);
    this.#contentElement = this.#element.querySelector(':scope > .mdw-panel-content');

    if (this.targetElement) {
      this.#setTargetElementPosition();
      this.#contentElement.classList.add('mdw-target-element');
      const targetElementScrollContainer = this.#getScrollContainerForTargetElement();
      this.#initialScrollPosition = targetElementScrollContainer.scrollTop;
      targetElementScrollContainer.addEventListener('scroll', this.#onContainerScroll_bound);
    } else {
      this.#setGlobalPosition();
    }
    if (this.animation === 'scale') this.#element.classList.add('mdw-animation-scale');
    this.#element.classList.add('mdw-run-animation');

    await util.transitionendAsync(this.#contentElement);
    this.#element.classList.remove('mdw-open-animation');
    this.#element.classList.remove('mdw-open-animation-target');
    this.#element.classList.remove('mdw-run-animation');

    this.#contentElement.addEventListener('click', this.#callOnClick_bound);
    if (this.clickOutsideToClose === true) document.body.addEventListener('click', this.#onClickOutside_bound);

    this.#callOnRender();
    this.#callOnShow();
  }

  async hide() {
    if (this.#showing === false) return;
    this.#showing = false;

    this.#element.classList.add('mdw-close-animation');
    if (this.targetElement) this.#contentElement.style.maxHeight = `${this.#getContentHeight()}px`;
    
    
    await util.nextAnimationFrameAsync();
    this.#element.classList.add('mdw-run-animation');

    if (this.targetElement) {
      this.#getScrollContainerForTargetElement().removeEventListener('scroll', this.#onContainerScroll_bound);
      this.#contentElement.style.maxHeight = '0';
    }

    await util.transitionendAsync(this.#contentElement);
    this.#contentElement.removeEventListener('click', this.#callOnClick_bound);
    if (this.clickOutsideToClose === true) document.body.removeEventListener('click', this.#onClickOutside_bound);

    this.#element.remove();
    this.#callOnHide();
  }

  resetTemplate() {
    this.#contentElement.innerHTML = this.template;
    if (this.targetElement) this.#setTargetElementPosition();
    this.#callOnRender();
  }

  toggle() {
    if (this.#showing) this.hide();
    else this.show();
  }

  lock() {
    this.#element.classList.add('mdw-lock');
  }

  unlock() {
    this.#element.classList.remove('mdw-lock');
  }

  addIgnoreElement(element) {
    this.#elementsToIgnore.push(element);
  }

  onClick() { }
  onShow() { }
  onHide() { }
  onRender() { }

  #callOnClick(event) {
    this.onClick(event);
  }

  #callOnShow() {
    this.onShow();
  }

  #callOnHide() {
    this.onHide();
  }

  #callOnRender() {
    this.onRender();
  }

  #onClickOutside(event) {
    if (this.#contentElement.contains(event.target)) return;
    const isIgnoreElement = this.#elementsToIgnore.find(v => v.contains(event.target));
    if (isIgnoreElement) return;
    this.hide();
  }

  #getContentHeight() {
    const scrollHeight = this.#contentElement.scrollHeight;
    const firstChild = this.#getFirstChild(this.#contentElement);
    if (!firstChild) return scrollHeight;
    
    const internalMaxHeight = parseInt((getComputedStyle(firstChild).getPropertyValue('max-height') || '').replace('px', ''));
    if (isNaN(internalMaxHeight)) return scrollHeight;

    if (scrollHeight > internalMaxHeight) return internalMaxHeight;
    return scrollHeight;
  }

  #getFirstChild(element) {
    let firstChild = element.firstChild;
    while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
      firstChild = firstChild.nextSibling;
    }
    return firstChild;
  }

  #setTargetElementPosition() {
    const bounds = this.targetElement.getBoundingClientRect();

    // start with panel at the bottom left
    let top = bounds.y + bounds.height;
    let left = bounds.x;


    // check if panel is off screen and move to best position
    const { clientWidth, clientHeight } = document.documentElement;
    const contentWidth = this.#contentElement.offsetWidth;
    const contentHeight = this.#getContentHeight();
    let bottom = top + contentHeight;
    let right = left + contentWidth;

    this.#contentElement.style.maxHeight = `${this.#getContentHeight()}px`;

    // TODO handle case whn neither positions is on screen
    if (bottom <= clientHeight) {
      top += this.offsetY;
      this.#contentElement.style.bottom = '';
      this.#contentElement.style.top = `${top}px`;
      this.#contentPositionProperty = 'top';
      this.#contentPosition = top;

    // align bottom of content to top of control
    } else {
      this.#contentElement.style.top = '';
      this.#contentElement.style.bottom = `${clientHeight - bounds.y + this.offsetY}px`;
      this.#contentPositionProperty = 'bottom';
      this.#contentPosition = clientHeight - bounds.y + this.offsetY;
    }

    // TODO handle case whn neither positions is on screen
    if (right <= clientWidth) {
      left += this.offsetX;
      this.#contentElement.style.left = `${left}px`;

    // align right of content to right of control
    } else {
      this.#contentElement.style.right = `${clientWidth - bounds.x + this.offsetX}px`;
    }
  }

  #setGlobalPosition() {
    switch(this.position) {
      case 'left bottom':
      case 'bottom left':
        this.#contentElement.style.position = 'fixed';
        this.#contentElement.style.left = `${0 + this.offsetX}px`;
        this.#contentElement.style.bottom = `${0 + this.offsetY}px`;
        this.#adjustPositionForBarsAndNavigation();
        break;

      case 'right bottom':
      case 'bottom right':
        this.#contentElement.style.position = 'fixed';
        this.#contentElement.style.right = `${0 + this.offsetX}px`;
        this.#contentElement.style.bottom = `${0 + this.offsetY}px`;
        this.#adjustPositionForBarsAndNavigation();
        break;

      case 'left top':
      case 'top left':
        this.#contentElement.style.position = 'fixed';
        this.#contentElement.style.left = `${0 + this.offsetX}px`;
        this.#contentElement.style.top = `${0 + this.offsetY}px`;
        this.#adjustPositionForBarsAndNavigation();
        break;

      case 'right top':
      case 'top right':
        this.#contentElement.style.position = 'fixed';
        this.#contentElement.style.right = `${0 + this.offsetX}px`;
        this.#contentElement.style.top = `${0 + this.offsetY}px`;
        this.#adjustPositionForBarsAndNavigation();
        break;
    }
  }

  #adjustPositionForBarsAndNavigation() {
    if (!this.adjustForBarsAndNavigation) return;

    if (this.position.includes('left')) {
      const navigation = document.querySelector('mdw-navigation');
      if (navigation) {
        const contentLeft = parseInt(getComputedStyle(this.#contentElement).left.replace('px', '') || 0);
        const navigationBounds = navigation.getBoundingClientRect();
        if (navigationBounds.x + navigationBounds.width > contentLeft + this.offsetX) {
          this.#contentElement.style.left = `${navigationBounds.x + navigationBounds.width + this.offsetX}px`;
        }
      }
    }

    if (this.position.includes('bottom')) {
      const bottomAppBar = document.querySelector('mdw-bottom-app-bar');
      if (bottomAppBar) {
        const bottomAppBarBounds = bottomAppBar.getBoundingClientRect();
        const contentBottom = window.innerHeight - parseInt(getComputedStyle(this.#contentElement).bottom.replace('px', '') || 0);
        if (bottomAppBarBounds.y < contentBottom + this.offsetY) {
          this.#contentElement.style.bottom = `${bottomAppBarBounds.height + this.offsetX}px`;
        }
      }
    }

    if (this.position.includes('top')) {
      const topAppBar = document.querySelector('mdw-top-app-bar');

      if (topAppBar) {
        const topAppBarBounds = topAppBar.getBoundingClientRect();
        const contentTop = parseInt(getComputedStyle(this.#contentElement).bottom.replace('px', '') || 0);
        if (topAppBarBounds.y + topAppBarBounds.height > contentTop - this.offsetY) {
          this.#contentElement.style.top = `${topAppBarBounds.y + topAppBarBounds.height + this.offsetY}px`;
        }
      }
    }
  }

  // TODO handle horizontal scroll
  #onContainerScroll(event) {
    if (this.#contentPositionProperty === 'top') this.#contentElement.style.top = `${this.#contentPosition + this.#initialScrollPosition - event.target.scrollTop}px`;
    else this.#contentElement.style.bottom = `${this.#contentPosition - this.#initialScrollPosition + event.target.scrollTop}px`;
  }

  #getScrollContainerForTargetElement() {
    let parentNode = this.targetElement.parentNode;
    while (parentNode !== null) {
      const style = getComputedStyle(parentNode);
      if (this.#overflowScrollRegex.test(style.overflow + style.overflowY)) return parentNode;
      parentNode = parentNode.parentNode;
      if (parentNode === document.body) return document.body;
    }
  }
}
