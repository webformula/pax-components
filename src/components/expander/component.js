import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';

customElements.define('mdw-expander', class MDWExpander extends HTMLElementExtended {
  useShadowRoot = false;

  #control = this.querySelector('.mdw-expander-control');
  #content = this.querySelector('.mdw-expander-content');
  #controlClick_bound = this.#controlClick.bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    this.#control.addEventListener('click', this.#controlClick_bound);
  }

  disconnectedCallback() {
    this.#control.removeEventListener('click', this.#controlClick_bound);
  }

  async show() {
    this.classList.add('mdw-show');
    this.classList.remove('mdw-hide');
    this.#content.style.height = `${this.#content.scrollHeight}px`;
  }

  async hide() {
    this.#content.style.height = `${this.#content.offsetHeight}px`;
    await util.nextAnimationFrameAsync();
    this.classList.add('mdw-hide');
    this.classList.remove('mdw-show');
    this.#content.style.height = '0';
  }

  toggle() {
    if (this.classList.contains('mdw-show')) {
      this.hide();
    } else {
      this.show();
    }
  }

  #controlClick(event) {
    this.toggle();
  }
});
