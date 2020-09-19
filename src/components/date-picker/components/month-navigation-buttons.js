import { HTMLElementExtended, html, css } from '@webformula/pax-core';

customElements.define('mdw-date-picker--month-navigation-buttons', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_dispatchLeft = this.dispatchLeft.bind(this);
    this.bound_dispatchRight = this.dispatchRight.bind(this);

    this.cloneTemplate();
  }

  addEvents() {
    this.leftButton.addEventListener('click', this.bound_dispatchLeft);
    this.rightButton.addEventListener('click', this.bound_dispatchRight);
  }

  removeEvents() {
    this.leftButton.removeEventListener('click', this.bound_dispatchLeft);
    this.rightButton.removeEventListener('click', this.bound_dispatchRight);
  }

  get leftButton() {
    return this.shadowRoot.querySelector('.left');
  }

  get rightButton() {
    return this.shadowRoot.querySelector('.right');
  }

  dispatchLeft() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:previousMonth', {
      composed: true
    }));
  }

  dispatchRight() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:nextMonth', {
      composed: true
    }));
  }

  template() {
    return /* html */`
      <mdw-button class="mdw-icon left">
        <mdw-icon>keyboard_arrow_left</mdw-icon>
      </mdw-button>
      <mdw-button class="mdw-icon right">
        <mdw-icon>keyboard_arrow_right</mdw-icon>
      </mdw-button>
    `;
  }

  styles() {
    return /* css */`
      :host {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
        height: 48px;
        transition: opacity 0.1s linear;
        opacity: 1;
      }
      mdw-button {
        color: var(--mdw-theme-text--body);
      }
      :host(.hide) mdw-button {
        display: none;
      }
    `;
  }
});
