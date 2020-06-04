import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-sheet-header', class extends HTMLElementExtended {
  constructor() {
    super();

    this.hasCollapsedHeader = (this.children || []).length !== 0;
    if (!this.hasCollapsedHeader) this.classList.add('mdw-hide-collapsed-header');
    if (this.parentNode.registerHeader) this.parentNode.registerHeader(this, this.hasCollapsedHeader);
    this.innerHTMLString = this.innerHTML;
    this.innerHTML = '';
    this.cloneTemplate(true);
    this.showingFullscreen = false;
    this.bound_close = this.close.bind(this);

    if (this.parentNode.classList.contains('mdw-shaped')) this.classList.add('mdw-shaped');
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

  get isModal() {
    if (!this.parentNode) return false;
    return this.parentNode.isModal || false;
  }

  close() {
    if (this.isModal) this.parentNode.close();
    else this.parentNode.collapse();
  }

  disableCollapsedHeader() {
    this.classList.add('mdw-sheet-disable-collapsed-header');
  }

  showFullscreen() {
    this.classList.add('mdw-show-fullscreen');
  }

  hideFullscreen() {
    this.classList.remove('mdw-show-fullscreen');
  }

  toggleFullscreen(value) {
    if (this.showingFullscreen && !value) {
      this.showingFullscreen = value;
      this.hideFullscreen();
    } else if (value) {
      this.showingFullscreen = value;
      this.showFullscreen();
    }
  }

  showDragIcon() {
    this.classList.add('mdw-sheet-top-bar-draggable');
  }

  template() {
    return `
      <div class="mdw-sheet-top-bar-drag-icon"></div>

      <div class="mdw-sheet-top-bar-fullscreen">
        ${this.isModal ? `
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            <mdw-icon>close</mdw-icon>
          </mdw-button>
        ` :
        `
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            <mdw-icon>keyboard_arrow_down</mdw-icon>
          </mdw-button>
        `}
        ${this.title}
      </div>

      <div class="mdw-sheet-top-bar-container">
        ${this.innerHTMLString}
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

      :host .mdw-sheet-top-bar-fullscreen {
        opacity: 0;
        pointer-events: none;
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

      :host(.mdw-show-fullscreen) .mdw-sheet-top-bar-fullscreen {
        opacity: 1;
        pointer-events: all;
        position: relative;
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



      /* collapsed header */

      .mdw-sheet-top-bar-container {
        display: flex;
        opacity: 1;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        position: absolute;
        top: 0;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-on-primary);
      }

      :host(.mdw-shaped) .mdw-sheet-top-bar-container {
        border-radius: 8px 8px 0 0;
      }

      :host(.mdw-sheet-disable-collapsed-header) .mdw-sheet-top-bar-container {
        display: none;
      }

      :host(.mdw-show-fullscreen) .mdw-sheet-top-bar-container {
        opacity: 0;
        pointer-events: none;
      }

      :host(.mdw-hide-collapsed-header) .mdw-sheet-top-bar-container {
        display: none;
      }

      :host(.mdw-two-line) .mdw-sheet-top-bar-fullscreen,
      :host(.mdw-two-line) .mdw-sheet-top-bar-container {
        height: 72px;
      }

      :host(.mdw-three-line) .mdw-sheet-top-bar-fullscreen,
      :host(.mdw-three-line) .mdw-sheet-top-bar-container {
        height: 88px;
      }

      :host(.mdw-two-line.mdw-shaped) .mdw-sheet-top-bar-fullscreen,
      :host(.mdw-two-line.mdw-shaped) .mdw-sheet-top-bar-container {
        border-radius: 10px 10px 0 0;
      }

      :host(.mdw-three-line.mdw-shaped) .mdw-sheet-top-bar-fullscreen,
      :host(.mdw-three-line.mdw-shaped) .mdw-sheet-top-bar-container {
        border-radius: 12px 12px 0 0;
      }

      :host(.mdw-white) .mdw-sheet-top-bar-container {
        background-color: white;
        color: var(--mdw-theme-on-primary);
        border-bottom: 1px solid var(--mdw-theme-checkboxborder);
      }

      /* sections */

      section {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        padding: 8px 12px;
        z-index: 1;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      section[align="start"] {
        align-items: flex-start;
        order: -1;
      }

      section + section,
      section[align="end"] {
        align-items: flex-end;
        order: 1;
      }


      /* text */
      section .mdw-title {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: .0125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
      }

      section .mdw-subtitle {
        font-size: 15px;
        letter-spacing: .0125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
      }

      section .mdw-detail-text {
        font-size: 12px;
        letter-spacing: .0125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
      }
    `;
  }
});
