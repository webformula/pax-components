import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import arrowDropDownSVG from '../../svg-icons/expand_more_FILL0_wght400_GRAD0_opsz24.svg';
import util from '../../core/util.js';

// TODO all existing


// TODO expanded card on drag. Look at material guidelines for video
// TODO drag reorder grid


export default class MDWCardElement extends HTMLElementExtended {
  #isFullscreen = this.classList.contains('mdw-fullscreen');
  #isExpanding = !!this.querySelector(':Scope > .mdw-card-content > .mdw-expanded');

  #expandClick_bound = this.#expandClick.bind(this);
  #fullscreenClick_bound = this.#fullscreenClick.bind(this);
  #imgOnload_bound = this.#imgOnload.bind(this);

  #fullscreenPlaceHolder;


  constructor() {
    super();
  }

  connectedCallback() {
    const arrow = this.querySelector('.mdw-expand-arrow');
    if (arrow) arrow.innerHTML = arrowDropDownSVG;

    if (this.#isFullscreen) this.addEventListener('click', this.#fullscreenClick_bound);
    else if (this.#isExpanding) this.addEventListener('click', this.#expandClick_bound);

    this.#calculateImgMaxHeightForFullscreen();
  }

  async #fullscreen() {
    if (!this.#fullscreenPlaceHolder) this.#fullscreenPlaceHolder = document.createElement('div');
    const bounds = this.getBoundingClientRect();


    this.#fullscreenPlaceHolder.style.height = `${bounds.height}px`;
    this.#fullscreenPlaceHolder.style.width = `${bounds.width}px`;
    this.#fullscreenPlaceHolder.style.margin = getComputedStyle(this).margin;
    this.insertAdjacentElement('beforebegin', this.#fullscreenPlaceHolder);
    this.style.position = 'fixed';
    this.style.top = `${bounds.top}px`;
    this.style.left = `${bounds.left}px`;
    this.style.height = `${bounds.height}px`;
    this.style.width = `${bounds.width}px`;
    this.classList.add('mdw-show');

    await util.nextAnimationFrameAsync();

    this.style.top = '';
    this.style.left = '';
    this.style.height = '';
    this.style.width = '';
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
    this.#fullscreen();
  }

  // sets height for fullscreen view so image can expand
  #calculateImgMaxHeightForFullscreen() {
    const img = this.querySelector(':scope > .mdw-card-image img');
    if (!img) return;

    // const height = this.getAttribute('height');
    // const width = this.getAttribute('width');
    if (!img.height) img.addEventListener('load', this.#imgOnload_bound);
    else {
      const maxHeight = img.height / img.width * window.innerWidth;
      this.style.setProperty('--mdw-img-fullscreen-height', `${maxHeight}px`);
    }
  }

  #imgOnload() {
    this.querySelector(':scope > .mdw-card-image img').addEventListener('load', this.#imgOnload_bound);
    // this.#calculateImgMaxHeightForFullscreen();
  }
}

customElements.define('mdw-card', MDWCardElement);
