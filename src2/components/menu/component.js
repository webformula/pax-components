import MDWPanelElement from '../panel/component.js';
import './component.css';

// TODO bottom sheet on mobile
// TODO sub menus

customElements.define('mdw-menu', class MDWMenuElement extends MDWPanelElement {
  #control;
  #controlSelector = this.getAttribute('control');
  #onControlClick_bound = this.#onControlClick.bind(this);
  #onPanelOpen_bound = this.#onPanelOpen.bind(this);
  #onPanelClose_bound = this.#onPanelClose.bind(this);
  #onItemClick_bound = this.#onItemClick.bind(this);

  constructor() {
    super();

    if (!this.#controlSelector) throw Error('No control found. Must provide the attributer "control" with a valid css selector');
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'menu');

    this.#control = document.querySelector(this.#controlSelector);
    if (!this.#control) throw Error('No control found. Must provide the attributer "control" with a valid css selector');

    this.target = this.#control;
    this.animation = 'expand';

    this.#control.addEventListener('click', this.#onControlClick_bound);
    this.addEventListener('open', this.#onPanelOpen_bound);
    this.addEventListener('close', this.#onPanelClose_bound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#control.removeEventListener('click', this.#onControlClick_bound);
    this.removeEventListener('open', this.#onPanelOpen_bound);
    this.removeEventListener('close', this.#onPanelClose_bound);
  }

  #onControlClick() {
    this.show();
  }

  #onPanelOpen() {
    this.addEventListener('click', this.#onItemClick_bound);
  }

  #onPanelClose() {
    this.removeEventListener('click', this.#onItemClick_bound);
  }

  // delay close so button press animation is seen
  #onItemClick(event) {
    if (event.target.nodeName !== 'MDW-BUTTON') return;

    setTimeout(() => {
      this.close();
    }, 40);
  }
});
