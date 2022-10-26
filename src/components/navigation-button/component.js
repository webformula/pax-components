import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';


customElements.define('mdw-navigation-button', class MDWNavigationButton extends HTMLElementExtended {
  useShadowRoot = false;

  #onclick_bound = this.#onclick.bind(this);
  #onNavigationState_bound = this.#onNavigationState.bind(this);


  constructor() {
    super();

    this.tabIndex = 0;
    this.setAttribute('role', 'button');
  }

  connectedCallback() {
    this.render();
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
    document.querySelector('mdw-navigation').toggle();
  }

  #onNavigationState() {
    if (document.querySelector('mdw-navigation').state === 'drawer') this.querySelector('mdw-button').removeAttribute('toggled');
    else this.querySelector('mdw-button').setAttribute('toggled', '');
  }

  template() {
    return /* html */`
      <mdw-button class="mdw-icon-toggle-button">
        <mdw-icon class="mdw-bold mdw-small" value="on">menu</mdw-icon>
        <mdw-icon class="mdw-bold mdw-small" value="off">menu_open</mdw-icon>
      </mdw-button>
    `;
  }
});
