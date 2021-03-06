import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-linear-progress', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    if (this.percent === null) this.classList.add('mdw-query')
  }

  static get observedAttributes() {
    return ['mdw-percent'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch(name) {
      case 'mdw-percent':
        this.percent = newValue;
        break;
    }
  }

  get bar() {
    if (!this._bar) this._bar = this.shadowRoot.querySelector('.mdw-bar');
    return this._bar;
  }

  get percent() {
    return this.getAttribute('mdw-percent');
  }

  set percent(value) {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    this.bar.style.width = `${value}%`;
  }

  template() {
    return /* html */`
      <div class="mdw-bar"></div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 4px;
        padding-top: 0;
        margin-bottom: 0;
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.18);
      }

      .mdw-bar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-white) {
        background-color: rgba(255, 255, 255, 0.18);
      }

      :host(.mdw-white) .mdw-bar {
        background-color: white;
      }

      :host(.mdw-grey) {
        background-color: rgba(50, 50, 50, 0.18);
      }

      :host(.mdw-grey) .mdw-bar {
        background-color: grey;
      }

      :host(.mdw-secondary) {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.18);
      }

      :host(.mdw-secondary) .mdw-bar {
        background-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.18);
      }

      :host(.mdw-error) .mdw-bar {
        background-color: var(--mdw-theme-error);
      }


      :host(.mdw-query) .mdw-bar {
        transition: all 0.2s linear;
        animation: query .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);
      }

      @keyframes query {
        0% {
          opacity: 1;
          transform: translateX(35%) scale(.3, 1);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) scale(0, 1);
        }
      }
    `;
  }
});
