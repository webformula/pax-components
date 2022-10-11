import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';
import Panel from '../../core/panel.js';

customElements.define('mdw-card', class MDWCard extends HTMLElementExtended {
  useShadowRoot = false;

  #panel;
  #imgHeight;
  #imgWidth;
  #isExpanding = !!this.querySelector('.mdw-expanding-container');
  #mouseUp_bound = this.#mouseup.bind(this);
  #onClick_bound = this.#onClick.bind(this);
  #imgOnload_bound = this.#imgOnload.bind(this);

  constructor() {
    super();
    this.tabIndex = 0;

    if (this.#isExpanding) {
      this.addEventListener('click', this.#onClick_bound);
    }

    if (this.parentNode.classList.contains('mdw-panel-content')) {
      this.#calculateImgMaxHeightForFullscreen();
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
  }

  #mouseup() {
    this.blur();
  }

  #onClick(event) {
    this.#transitionToFullScreen();
  }

  #transitionToFullScreen() {
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
