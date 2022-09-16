import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';


customElements.define('mdw-navigation-button', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #onclick_bound = this.#onclick.bind(this);


  constructor() {
    super();

    // if (this.#shouldShow()) this.classList.add('mdw-show');
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    this.addEventListener('click', this.#onclick_bound);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onclick_bound);
  }

  #onclick() {
    document.querySelector('mdw-navigation').toggle();
  }

  // TODO
  #shouldShow() {
    return !util.isMobileOrSmallScreen();
  }

  template() {
    return /* html */`
      <mdw-button class="mdw-icon-button">
        <mdw-icon>menu</mdw-icon>
      </mdw-button>
    `;
  }
});
