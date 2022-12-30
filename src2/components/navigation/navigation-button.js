import HTMLElementExtended from '../HTMLElementExtended.js';
import './navigation-button.css';
import menuIconSVGRaw from '../../svg-icons/menu_FILL1_wght400_GRAD0_opsz24.svg';
import menuOpenIconSVGRaw from '../../svg-icons/menu_open_FILL1_wght400_GRAD0_opsz24.svg';

customElements.define('mdw-navigation-button', class MDWNavigationButtonElement extends HTMLElementExtended {
  // useShadowRoot = true;

  #onclick_bound = this.#onclick.bind(this);
  #onNavigationState_bound = this.#onNavigationState.bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    this.tabIndex = 0;
    // this.setAttribute('role', 'button')
    // this.setAttribute('aria-label', 'toggle navigation');
  }

  get navigation() {
    return document.body.querySelector('mdw-navigation');
  }

  get open() {
    return document.body.querySelector('mdw-navigation').open;
  }
  set open(value) {
    document.body.querySelector('mdw-navigation').open = !!value;
  }

  toggle() {
    document.body.querySelector('mdw-navigation').toggle();
  }

  afterRender() {
    this.#onNavigationState();
    window.addEventListener('mdw-navigation-state', this.#onNavigationState_bound);
    this.addEventListener('click', this.#onclick_bound);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onclick_bound);
    window.removeEventListener('mdw-navigation-state', this.#onNavigationState_bound);
  }

  #onclick() {
    this.toggle();
  }

  #onNavigationState() {
    this.classList.toggle('mdw-navigation-hide', !this.open);
  }

  template() {
    return /* html */`
      <mdw-button class="mdw-icon-toggle-button" aria-label="toggle navigation" ${this.navigation.open ? '' : 'toggled'}>
        <div class="mdw-icon-svg" value="on">${menuIconSVGRaw}</div>
        <div class="mdw-icon-svg" value="off">${menuOpenIconSVGRaw}</div>
      </mdw-button>
    `;
  }
});
