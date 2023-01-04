import HTMLElementExtended from '../HTMLElementExtended.js';
import './card.css';
import arrowDropDownSVG from '../../svg-icons/expand_more_FILL0_wght400_GRAD0_opsz24.svg';
import chevronLeftIconSVGRaw from '../../svg-icons/arrow_back_ios_FILL1_wght300_GRAD0_opsz24.svg';

import util from '../../core/util.js';

// TODO drag close fullscreen and expand


// TODO expanded card on drag. Look at material guidelines for video
// TODO drag reorder grid


export default class MDWCardElement extends HTMLElementExtended {
  #isFullscreen = this.classList.contains('mdw-fullscreen');
  #isExpanding = !!this.querySelector(':Scope > .mdw-card-content > .mdw-expanded');

  #expandClick_bound = this.#expandClick.bind(this);
  #fullscreenClick_bound = this.#fullscreenClick.bind(this);
  #fullscreenBackClick_bound = this.#fullscreenBackClick.bind(this);
  #imgOnload_bound = this.#imgOnload.bind(this);

  #fullscreenPlaceHolder;
  #fullscreenBackButton;


  constructor() {
    super();

    this.classList.add('mdw-no-animation');
  }

  connectedCallback() {
    const arrow = this.querySelector('.mdw-expand-arrow');
    if (arrow) arrow.innerHTML = arrowDropDownSVG;

    if (this.#isFullscreen) {
      this.#fullscreenBackButton = document.createElement('div');
      this.#fullscreenBackButton.classList.add('mdw-card-fullscreen-back');
      this.#fullscreenBackButton.innerHTML = chevronLeftIconSVGRaw;
      this.insertAdjacentElement('afterbegin', this.#fullscreenBackButton);
      this.#fullscreenBackButton.addEventListener('click', this.#fullscreenBackClick_bound);
      this.addEventListener('click', this.#fullscreenClick_bound);
    } else if (this.#isExpanding) this.addEventListener('click', this.#expandClick_bound);

    this.#calculateImgMaxHeightForFullscreen();

    this.classList.add('mdw-no-animation');

    util.nextAnimationFrameAsync().then(() => {
      this.classList.remove('mdw-no-animation');
    });
  }

  async #fullscreen() {
    if (!this.#fullscreenPlaceHolder) this.#fullscreenPlaceHolder = document.createElement('div');
    const bounds = this.getBoundingClientRect();


    this.#fullscreenPlaceHolder.style.height = `${bounds.height}px`;
    this.#fullscreenPlaceHolder.style.width = `${bounds.width}px`;
    this.#fullscreenPlaceHolder.style.margin = getComputedStyle(this).margin;
    this.insertAdjacentElement('beforebegin', this.#fullscreenPlaceHolder);
    this.style.setProperty('--mdw-card-fullscreen-top', `${bounds.top}px`);
    this.style.setProperty('--mdw-card-fullscreen-left', `${bounds.left}px`);
    this.style.setProperty('--mdw-card-fullscreen-width', `${bounds.width}px`);
    this.style.setProperty('--mdw-card-fullscreen-height', `${bounds.height}px`);
    this.classList.add('mdw-show');
  }

  #expandClick(e) {
    const expanded = this.querySelector('.mdw-card-content > .mdw-expanded');
    if (this.classList.contains('mdw-show')) {
      expanded.style.height = '';
      this.classList.remove('mdw-show');
    } else {
      expanded.style.height = `${expanded.offsetHeight + expanded.scrollHeight}px`;
      this.classList.add('mdw-show')
    }
  }

  #fullscreenClick() {
    this.removeEventListener('click', this.#fullscreenClick_bound);
    this.#fullscreen();
  }

  async #fullscreenBackClick() {
    this.classList.remove('mdw-show');
    await util.animationendAsync(this);
    this.#fullscreenPlaceHolder.remove();
    this.addEventListener('click', this.#fullscreenClick_bound);
  }

  // sets height for fullscreen view so image can expand
  #calculateImgMaxHeightForFullscreen() {
    const img = this.querySelector(':scope > .mdw-card-image img');
    if (!img) return;

    if (!img.height) img.addEventListener('load', this.#imgOnload_bound);
    else {
      const maxHeight = img.height / img.width * window.innerWidth;
      this.style.setProperty('--mdw-card-fullscreen-img-height', `${maxHeight}px`);
    }
  }

  #imgOnload() {
    this.querySelector(':scope > .mdw-card-image img').removeEventListener('load', this.#imgOnload_bound);
    this.#calculateImgMaxHeightForFullscreen();
  }
}

customElements.define('mdw-card', MDWCardElement);
