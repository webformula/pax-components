import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';
import Panel from '../../core/panel.js';
import util from '../../core/util.js';

customElements.define('mdw-card', class MDWCard extends HTMLElementExtended {
  useShadowRoot = false;
  
  #id = this.getAttribute('id') || `mdw-fullscreen-car-${util.getUID()}`;
  #panel;
  #imgHeight;
  #imgWidth;
  #originalFullscreenCard;
  #isFullscreen = this.classList.contains('mdw-fullscreen');
  #isExpanding = !!this.querySelector('.mdw-expanding-container');
  #mouseUp_bound = this.#mouseup.bind(this);
  #onClick_bound = this.#onClick.bind(this);
  #onClickFullscreenBack_bound = this.#onClickFullscreenBack.bind(this);
  #imgOnload_bound = this.#imgOnload.bind(this);

  constructor() {
    super();
    this.tabIndex = 0;

    // this happens when a card is copied into a panel for fullscreen
    if (this.parentNode.classList.contains('mdw-panel-content')) {
      this.#calculateImgMaxHeightForFullscreen();
    }

    if (this.parentNode.classList.contains('mdw-panel-content')) {
      this.#originalFullscreenCard = document.querySelector(`#${this.getAttribute('mdw-card-id')}`);
      this.querySelector('.mdw-card-fullscreen-back').addEventListener('click', this.#onClickFullscreenBack_bound);
    } else if (this.#isFullscreen) {
      this.setAttribute('id', this.#id);
      this.setAttribute('mdw-card-id', this.#id);
      this.insertAdjacentHTML('afterbegin', '  <mdw-icon class="mdw-card-fullscreen-back">arrow_back_ios_new</mdw-icon>');
      this.addEventListener('click', this.#onClick_bound);
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
  }

  disconnectedCallback() {
    this?.ripple?.destroy();
    this.removeEventListener('mouseup', this.#mouseUp_bound);
    this.removeEventListener('mouseup', this.#mouseUp_bound);

    if (this.parentNode.classList.contains('mdw-panel-content')) {
      this.querySelector('.mdw-card-fullscreen-back').removeEventListener('click', this.#onClickFullscreenBack_bound);
    } else if (this.#isFullscreen) {
      this.removeEventListener('click', this.#onClick_bound);
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
  }

  #onClickFullscreenBack() {
    this.#originalFullscreenCard.hide();
  }

  #transitionFullScreen() {
    let template = this.outerHTML;
    template = template.replace(`id="${this.#id}"`, '');
    template = template.replace(`mdw-card-id="${this.#id}"`, '');
    this.#panel = new Panel();
    this.#panel.template = this.outerHTML;
    this.#panel.targetElement = this;
    this.#panel.targetToFullscreen = true;;
    this.#panel.show();
  }

  // sets height for fullscreen view so image can expand
  #calculateImgMaxHeightForFullscreen() {
    const img = this.querySelector('.mdw-img-container img');
    if (!img) return;

    this.#imgHeight = this.getAttribute('height');
    this.#imgWidth = this.getAttribute('width');
    if (!this.#imgHeight || !this.#imgWidth) img.addEventListener('load', this.#imgOnload_bound);
    else {
      this.style.setProperty('--mdw-img-fullscreen-height', `${this.#imgHeight / this.#imgWidth * window.innerWidth}px`);
    }
  }

  #imgOnload() {
    const img = this.querySelector('.mdw-img-container img');
    img.removeEventListener('load', this.#imgOnload_bound);
    this.#imgHeight = this.#imgHeight || img.offsetHeight;
    this.#imgWidth = this.#imgWidth || img.offsetWidth;
    this.style.setProperty('--mdw-img-fullscreen-height', `${this.#imgHeight / this.#imgWidth * window.innerWidth}px`);
  }
});
