import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-sheet-header', class extends HTMLElementExtended {
  constructor() {
    super();

    if (this.parentNode.registerHeader) this.parentNode.registerHeader(this);
    this.cloneTemplate(true);
    this.showing = false;
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
    return !!this.title_ ? this.title_ : this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  set title(value) {
    this.title_ = value;
  }

  close() {
    this.parentNode.close();
  }

  show() {
    this.classList.add('mdw-show');
  }

  hide() {
    this.classList.remove('mdw-show');
  }

  toggle(value) {
    if (this.showing && !value) {
      this.showing = value;
      this.hide();
    } else if (value) {
      this.showing = value;
      this.show();
    }
  }

  showDragIcon() {
    this.classList.add('mdw-sheet-header-draggable');
  }

  styles() {
    return `
      :host {
        display: block;
        height: 56px;
        z-index: 1;
      }

      :host .mdw-sheet-header-fullscreen {
        opacity: 0;
        pointer-events: none;
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        z-index: 1;
        background-color: white;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                    0 4px 5px 0 rgba(0,0,0,.14),
                    0 1px 10px 0 rgba(0,0,0,.12);
      }

      :host(.mdw-show) .mdw-sheet-header-fullscreen {
        opacity: 1;
        pointer-events: all;
        position: relative;
      }

      .mdw-sheet-header-drag-icon {
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

      :host(.mdw-sheet-header-draggable) .mdw-sheet-header-drag-icon {
        display: block;
      }

      :host(.mdw-show.mdw-sheet-header-draggable) .mdw-sheet-header-drag-icon {
        opacity: 0;
      }
    `;
  }

  template() {
    return `
      <div class="mdw-sheet-header-drag-icon"></div>

      <div class="mdw-sheet-header-fullscreen">
        <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
          <mdw-icon>close</mdw-icon>
        </mdw-button>
        ${this.title}
      </div>

      <div class="mdw-sheet-header-container">
      </div>
    `;
  }
});
