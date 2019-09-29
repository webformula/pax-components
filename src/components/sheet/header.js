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
    if (!this.parentNode || !this.parentNode.isModal) return false;
    return this.parentNode.isModal();
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
    this.classList.add('mdw-sheet-header-draggable');
  }

  get internalStylesFile() {
    return './header-internal.css';
  }

  template() {
    return `
      <div class="mdw-sheet-header-drag-icon"></div>

      <div class="mdw-sheet-header-fullscreen">
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

      <div class="mdw-sheet-header-container">
        ${this.innerHTMLString}
      </div>
    `;
  }
});
