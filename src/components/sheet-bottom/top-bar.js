import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-sheet-top-bar', class extends HTMLElementExtended {
  constructor() {
    super();

    if (this.parentNode._registerTopBar) this.parentNode._registerTopBar(this);
    this.cloneTemplate(true);
    this.bound_close = this.close.bind(this);
  }

  connectedCallback() {
    this.closeButton.addEventListener('click', this.bound_close);
  }

  disconnectedCallback() {
    this.closeButton.removeEventListener('click', this.bound_close);
  }

  get closeButton() {
    return this.shadowRoot.querySelector('#mdw-sheet-close-action');
  }

  get title() {
    return !!this._title ? this._title : this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  set title(value) {
    this._title = value;
  }

  close() {
    this.parentNode.hide();
  }

  disable() {
    this.classList.add('mdw-disabled');
  }

  show() {
    this.classList.add('mdw-show');
  }

  hide() {
    this.classList.remove('mdw-show');
  }

  showDragIcon() {
    this.classList.add('mdw-sheet-top-bar-draggable');
  }

  template() {
    return `
      <div class="mdw-sheet-top-bar-drag-icon"></div>

      <div class="mdw-sheet-top-bar-fullscreen">
        <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
          <mdw-icon>close</mdw-icon>
        </mdw-button>
        ${this.title}
      </div>
    `;
  }


  styles() {
    return /* css */`
      :host {
        display: block;
        height: 56px;
        z-index: 1;
      }

      :host(:not(.mdw-show)) {
        opacity: 0;
        user-events: none;
      }

      :host(.mdw-disabled) {
        display: none;
      }

      :host .mdw-sheet-top-bar-fullscreen {
        position: fixed;
        top: 0;
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        z-index: 1;
        background-color: var(--mdw-theme-surface);
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                    0 4px 5px 0 rgba(0,0,0,.14),
                    0 1px 10px 0 rgba(0,0,0,.12);
      }

      .mdw-sheet-top-bar-drag-icon {
        display: none;
        opacity: 1;
        width: 12%;
        height: 4px;
        border-radius: 2px;
        margin: 0 auto;
        position: relative;
        top: 62px;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        background-color: #DDD;
      }

      :host(.mdw-sheet-top-bar-draggable) .mdw-sheet-top-bar-drag-icon {
        display: block;
      }

      :host(.mdw-show-fullscreen.mdw-sheet-top-bar-draggable) .mdw-sheet-top-bar-drag-icon {
        opacity: 0;
      }
    `;
  }
});
