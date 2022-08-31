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

  #id = `panel${util.getUID()}`;
  #onTransitionend_bound = this.#onTransitionend.bind(this);
  #callOnPanelClick_bound = this.#callOnPanelClick.bind(this);
  #onClickOutside_bound = this.#onClickOutside.bind(this);
  #showing = false;
  #element;
  #contentElement;
  #animationFrame;
  #animationTimer;
  #transitionendPromiseResolve;

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



  async show() {
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
    }
    this.#element.classList.add('mdw-run-animation');

    await this.#transitionendAsync();
    this.#element.classList.remove('mdw-open-animation');
    this.#element.classList.remove('mdw-open-animation-target');
    this.#element.classList.remove('mdw-run-animation');

    this.#contentElement.addEventListener('click', this.#callOnPanelClick_bound);
    if (this.clickOutsideToClose === true) document.body.addEventListener('click', this.#onClickOutside_bound);

    this.#showing = true;
  }

  async hide() {
    this.#element.classList.add('mdw-close-animation');
    if (this.targetElement) this.#contentElement.style.maxHeight = `${this.#getContentHeight()}px`;
    
    
    await this.#nextAnimationFrameAsync();
    this.#element.classList.add('mdw-run-animation');

    if (this.targetElement) this.#contentElement.style.maxHeight = '0';

    await this.#transitionendAsync();

    this.#contentElement.removeEventListener('click', this.#callOnPanelClick_bound);
    if (this.clickOutsideToClose === true) document.body.removeEventListener('click', this.#onClickOutside_bound);

    this.#element.remove();
    this.#showing = false;
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

  onClick() {}

  #callOnPanelClick(event) {
    this.onClick(event);
  }

  #onClickOutside(event) {
    if (this.#contentElement.contains(event.target)) return;
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

    // align bottom of content to top of control
    } else {
      this.#contentElement.style.bottom = `${clientHeight - bounds.y}px`;
    }

    // TODO handle case whn neither positions is on screen
    if (right + contentWidth <= clientWidth) {
      this.#contentElement.style.left = `${left}px`;

    // align right of content to right of control
    } else {
      this.#contentElement.style.right = `${clientWidth - bounds.x}px`;
    }
  }
}
