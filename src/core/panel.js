import util from './util.js';


export default class Panel {
  template = '';
  position = 'center center';
  targetElement;
  scroll = false;
  fullScreen = false;
  width = '360px';
  backdrop = true;
  clickOutsideToClose = false;
  escToClose = false;

  #overflowScrollRegex = /(auto|scroll)/;
  #id = `panel${util.getUID()}`;
  #onTransitionend_bound = this.#onTransitionend.bind(this);
  #callOnClick_bound = this.#callOnClick.bind(this);
  #onClickOutside_bound = this.#onClickOutside.bind(this);
  #onContainerScroll_bound = this.#onContainerScroll.bind(this);
  #elementsToIgnore = [];
  #showing = false;
  #element;
  #contentElement;
  #animationFrame;
  #animationTimer;
  #transitionendPromiseResolve;
  #contentPositionProperty;
  #contentPosition;
  #initialScrollPosition;

  constructor(params = {
    template: '',
    position: 'center center',
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
    this.targetElement = params.targetElement;
    this.scroll = params.scroll;
    this.fullScreen = params.fullScreen;
    this.width = params.width;
    this.backdrop = params.backdrop;
    this.clickOutsideToClose = params.clickOutsideToClose;
    this.escToClose = params.escToClose;
  }

  get element() {
    return this.#getFirstChild(this.#contentElement);
  }

  get showing() {
    return this.#showing;
  }

  async show() {
    if (this.#showing === true) return;

    // NOTE animation bug
    // transition end event was breaking and the fix was to use a second class for the open animation
    // we also need to set the max hight in javascript
    let classes = !this.targetElement ? 'mdw-open-animation' : 'mdw-open-animation-target';
    if (this.fullScreen) classes += ' mdw-fullscreen';
    if (this.backdrop) classes += ' mdw-backdrop';

    document.body.insertAdjacentHTML('beforeend', `
      <div class="mdw-panel ${classes}" id="${this.#id}">
        <div class="mdw-panel-content">
          ${this.template}
        </div>
      </div>
    `);

    await this.#nextAnimationFrameAsync();
    this.#element = document.querySelector(`#${this.#id}`);
    this.#contentElement = this.#element.querySelector(':scope > .mdw-panel-content');

    if (this.targetElement) {
      this.#setTargetElementPosition();
      this.#contentElement.classList.add('mdw-target-element');
      this.#contentElement.style.maxHeight = `${this.#getContentHeight() }px`;
      const targetElementScrollContainer = this.#getScrollContainerForTargetElement();
      this.#initialScrollPosition = targetElementScrollContainer.scrollTop;
      targetElementScrollContainer.addEventListener('scroll', this.#onContainerScroll_bound);
    }
    this.#element.classList.add('mdw-run-animation');

    await this.#transitionendAsync();
    this.#element.classList.remove('mdw-open-animation');
    this.#element.classList.remove('mdw-open-animation-target');
    this.#element.classList.remove('mdw-run-animation');

    this.#contentElement.addEventListener('click', this.#callOnClick_bound);
    if (this.clickOutsideToClose === true) document.body.addEventListener('click', this.#onClickOutside_bound);

    this.#showing = true;
    this.#callOnRender();
    this.#callOnShow();
  }

  async hide() {
    if (this.#showing === false) return;

    this.#element.classList.add('mdw-close-animation');
    if (this.targetElement) this.#contentElement.style.maxHeight = `${this.#getContentHeight()}px`;
    
    
    await this.#nextAnimationFrameAsync();
    this.#element.classList.add('mdw-run-animation');

    if (this.targetElement) {
      this.#getScrollContainerForTargetElement().removeEventListener('scroll', this.#onContainerScroll_bound);
      this.#contentElement.style.maxHeight = '0';
    }

    await this.#transitionendAsync();

    this.#contentElement.removeEventListener('click', this.#callOnClick_bound);
    if (this.clickOutsideToClose === true) document.body.removeEventListener('click', this.#onClickOutside_bound);

    this.#element.remove();
    this.#showing = false;
    this.#callOnHide();
  }

  resetTemplate() {
    this.#contentElement.innerHTML = this.template;
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

  async #nextAnimationFrameAsync() {
    cancelAnimationFrame(this.#animationFrame);
    return new Promise(resolve => {
      this.#animationFrame = requestAnimationFrame(() => {
        this.#animationFrame = 0;
        clearTimeout(this.#animationTimer);
        this.#animationTimer = setTimeout(resolve, 0);
      });
    });
  }

  async #transitionendAsync() {
    return new Promise(resolve => {
      this.#contentElement.addEventListener('transitionend', this.#onTransitionend_bound);
      this.#transitionendPromiseResolve = resolve;
    });
  }

  #onTransitionend() {
    if (!this.#transitionendPromiseResolve) return console.error('No transitionendPromiseResolve');
    this.#transitionendPromiseResolve();
    this.#contentElement.removeEventListener('transitionend', this.#onTransitionend_bound);
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
    
    // TODO handle case whn neither positions is on screen
    if (bottom + contentHeight <= clientHeight) {
      this.#contentElement.style.top = `${top}px`;
      this.#contentPositionProperty = 'top';
      this.#contentPosition = top;

    // align bottom of content to top of control
    } else {
      this.#contentElement.style.bottom = `${clientHeight - bounds.y}px`;
      this.#contentPositionProperty = 'bottom';
      this.#contentPosition = clientHeight - bounds.y;
    }

    // TODO handle case whn neither positions is on screen
    if (right + contentWidth <= clientWidth) {
      this.#contentElement.style.left = `${left}px`;

    // align right of content to right of control
    } else {
      this.#contentElement.style.right = `${clientWidth - bounds.x}px`;
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
