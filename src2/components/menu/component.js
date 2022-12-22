import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../panel/service.js';
import util from '../../core/util.js';
import './component.css';

// TODO (NOT SURE WHAT THIS. BAD FORM MY SELF) remove control click after checking on mobile
// TODO focus next broken with async search (arrow down multiple times after typing)
// TODO sub menus

// TODO look into allowing mdw-menu to be a panel

customElements.define('mdw-menu', class MDWMenu extends HTMLElementExtended {
  // useTemplate = false;

  #control;
  #controlSelector = this.getAttribute('control');
  #panel;
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onPanelOpen_bound = this.#onPanelOpen.bind(this);
  #onPanelClose_bound = this.#onPanelClose.bind(this);
  #onItemClick_bound = this.#onItemClick.bind(this);

  constructor() {
    super();

    if (!this.#controlSelector) throw Error('No control found. Must provide the attributer "control" with a valid css selector');
  }

  connectedCallback() {
    this.#control = document.querySelector(this.#controlSelector);
    if (!this.#control) throw Error('No control found. Must provide the attributer "control" with a valid css selector');
    this.#control.addEventListener('focus', this.#onControlFocus_bound);
  }

  afterRender() {
    this.#panel = this.querySelector('mdw-panel');
    this.#panel.addEventListener('open', this.#onPanelOpen_bound);
    this.#panel.addEventListener('close', this.#onPanelClose_bound);
  }

  template() {
    return `<mdw-panel target="${this.#controlSelector}" animation="scale">${this.innerHTML}</mdw-panel>`;
  }

  #onControlFocus() {
    this.#panel.show();
  }

  #onPanelOpen() {
    this.#panel.addEventListener('click', this.#onItemClick_bound);
  }

  #onPanelClose() {
    this.#panel.removeEventListener('click', this.#onItemClick_bound);
  }

  // delay close so button press animation is seen
  #onItemClick(event) {
    if (event.target.nodeName !== 'MDW-BUTTON') return;

    setTimeout(() => {
      this.#panel.close();
    }, 40);
  }
});
