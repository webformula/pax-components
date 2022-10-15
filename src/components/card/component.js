import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';
import Panel from '../../core/panel.js';
import util from '../../core/util.js';
import Drag from '../../core/drag.js';


// TODO expanded drag
// TODO drag order grid
// TODO fullscreen on desktop


customElements.define('mdw-card', class MDWCard extends HTMLElementExtended {
  useShadowRoot = false;
  
  #id = this.getAttribute('id') || `mdw-fullscreen-car-${util.getUID()}`;
  #panel;
  #imgHeight;
  #imgWidth;
  #originalFullscreenCard;
  #isOutlined = this.classList.contains('mdw-outlined');
  #isInPanel = this.parentNode.classList.contains('mdw-panel-content');
  #isFullscreen = this.classList.contains('mdw-fullscreen');
  #isExpanding = !!this.querySelector('.mdw-card-content > .mdw-expanded');
  #mouseUp_bound = this.#mouseup.bind(this);
  #onClick_bound = this.#onClick.bind(this);
  #onClickFullscreenBack_bound = this.#onClickFullscreenBack.bind(this);
  #imgOnload_bound = this.#imgOnload.bind(this);

  #swipeActionElement = this.querySelector('mdw-card-swipe-action');
  #ondrag_bound = this.#ondrag.bind(this);
  #ondragStart_bound = this.#ondragStart.bind(this);
  #ondragEnd_bound = this.#ondragEnd.bind(this);
  #swipeActionClick_bound = this.#swipeActionClick.bind(this);
  #dragStartPosition;
  #drag;

  constructor() {
    super();
    this.tabIndex = 0;

    // this happens when a card is copied into a panel for fullscreen
    if (this.#isInPanel) {
      this.#calculateImgMaxHeightForFullscreen();
    }

    if (this.#isInPanel) {
      this.#originalFullscreenCard = document.querySelector(`#${this.getAttribute('mdw-card-id')}`);
      this.querySelector('.mdw-card-fullscreen-back').addEventListener('click', this.#onClickFullscreenBack_bound);
    } else if (this.#isFullscreen) {
      this.setAttribute('id', this.#id);
      this.setAttribute('mdw-card-id', this.#id);
      this.insertAdjacentHTML('afterbegin', '  <mdw-icon class="mdw-card-fullscreen-back">arrow_back_ios_new</mdw-icon>');
      this.addEventListener('click', this.#onClick_bound);
    } else if (this.#isExpanding) {
      // expands without going fullscreen
      this.addEventListener('click', this.#onClick_bound);
    }

    // setup swipe actions
    if (this.#swipeActionElement) {
      this.classList.add('mdw-has-swipe-action');
      this.#drag = new Drag(this);
      this.#drag.onDrag(this.#ondrag_bound);
      this.#drag.onStart(this.#ondragStart_bound);
      this.#drag.onEnd(this.#ondragEnd_bound);
      this.#swipeActionElement.addEventListener('click', this.#swipeActionClick_bound);
    }
  }


  connectedCallback() {
    this.addEventListener('mouseup', this.#mouseUp_bound);

    const rippleElement = this.querySelector(':scope > .mdw-ripple');
    if (rippleElement) {
      setTimeout(() => {
        this.ripple = new Ripple({
          element: rippleElement,
          triggerElement: this
        });
      }, 0);
    }

    this.#drag && this.#drag.enable();
  }

  disconnectedCallback() {
    this?.ripple?.destroy();
    this.removeEventListener('mouseup', this.#mouseUp_bound);
    this.removeEventListener('mouseup', this.#mouseUp_bound);

    if (this.#isInPanel) {
      this.querySelector('.mdw-card-fullscreen-back').removeEventListener('click', this.#onClickFullscreenBack_bound);
    } else if (this.#isFullscreen) {
      this.removeEventListener('click', this.#onClick_bound);
    } else if (this.#isExpanding) {
      // expands without going fullscreen
      this.removeEventListener('click', this.#onClick_bound);
    }

    // setup swipe actions
    if (this.#swipeActionElement) {
      this.#swipeActionElement.removeEventListener('click', this.#swipeActionClick_bound);
    }

    if (this.#drag) {
      this.#drag.destroy();
      this.#drag = undefined;
    }
  }

  hide() {
    if (this.#isFullscreen && this.#panel && this.#panel.showing) {
      this.#panel.hide();
    }
  }

  #mouseup() {
    this.blur();
  }

  #onClick() {
    if (this.#isFullscreen) this.#transitionFullScreen();
    else if (this.#isExpanding) this.#expandContract();
  }

  #onClickFullscreenBack() {
    this.#originalFullscreenCard.hide();
  }

  #expandContract() {
    const expanded = this.querySelector('.mdw-card-content > .mdw-expanded');
    if (this.classList.contains('mdw-expanded')) {
      expanded.style.height = '0';
      this.classList.remove('mdw-expanded');
    } else {
      this.classList.add('mdw-expanded');
      expanded.style.height = `${expanded.offsetHeight + expanded.scrollHeight}px`;
    }
  }

  #transitionFullScreen() {
    let template = this.outerHTML;
    template = template.replace(`id="${this.#id}"`, '');
    template = template.replace(`mdw-card-id="${this.#id}"`, '');
    this.#panel = new Panel();
    this.#panel.template = this.outerHTML;
    this.#panel.targetElement = this;
    this.#panel.fullscreen = true;
    this.#panel.disableFullscreenDesktop = true;
    this.#panel.show();
  }

  // sets height for fullscreen view so image can expand
  #calculateImgMaxHeightForFullscreen() {
    const img = this.querySelector('.mdw-card-image img');
    if (!img) return;

    this.#imgHeight = this.getAttribute('height');
    this.#imgWidth = this.getAttribute('width');
    if (!this.#imgHeight || !this.#imgWidth) img.addEventListener('load', this.#imgOnload_bound);
    else {
      this.style.setProperty('--mdw-img-fullscreen-height', `${this.#getImgFullscreenHeight()}px`);
    }
  }

  #imgOnload() {
    const img = this.querySelector('.mdw-card-image img');
    img.removeEventListener('load', this.#imgOnload_bound);
    this.#imgHeight = this.#imgHeight || img.offsetHeight;
    this.#imgWidth = this.#imgWidth || img.offsetWidth;
    this.style.setProperty('--mdw-img-fullscreen-height', `${this.#getImgFullscreenHeight()}px`);
  }

  #getImgFullscreenHeight() {
    // TODO how can i make 560 dynamic?
    // 560 currently comes directly from panel.css
    if (window.innerHeight > 600) {
      const styleWidth = parseInt(getComputedStyle(this).width.replace('px', ''));
      if (styleWidth < 560) return this.#imgHeight / this.#imgWidth * styleWidth;
      return this.#imgHeight / this.#imgWidth * 560;
    }
    return this.#imgHeight / this.#imgWidth * window.innerWidth;
  }


  #ondragStart({ element }) {
    element.classList.add('mdw-dragging');
    this.#dragStartPosition = parseInt(getComputedStyle(this).getPropertyValue('--mdw-card-swipe-position').replace('px', ''));
  }

  #ondrag({ distance }) {
    let position = this.#dragStartPosition + distance.x;
    if (position > 60) position = 60;
    if (position < 0) position = 0;
    if (this.#isOutlined && position < 1) position = 1;
    this.style.setProperty('--mdw-card-swipe-position', `${position}px`);  }

  async #ondragEnd({ element }) {
    element.classList.remove('mdw-dragging');
    const position = parseInt(getComputedStyle(this).getPropertyValue('--mdw-card-swipe-position').replace('px', ''));
    if (position < 30) this.style.setProperty('--mdw-card-swipe-position', `0px`);
    else this.style.setProperty('--mdw-card-swipe-position', `60px`);
  }

  #swipeActionClick(event) {
    if (event.target.nodeName === 'MDW-ICON') {
      if (this.#swipeActionElement.hasAttribute('checked')) this.#swipeActionElement.removeAttribute('checked');
      else this.#swipeActionElement.setAttribute('checked', '');
      this.#swipeActionElement.dispatchEvent(new Event('change'));
    }
  }
});
