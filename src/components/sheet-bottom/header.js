import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-sheet-bottom-header', class extends HTMLElementExtended {
  constructor() {
    super();

    if (this.parentNode._registerHeader) this.parentNode._registerHeader(this);
    this.sheetInstance = this.parentNode;
    this.bound_close = this.close.bind(this);
    this.bound_toTop = this.toTop.bind(this);
    this.innerHTML = this.template(this.isModal, this.title, this.innerHTML);

    const mdwHeader = this.querySelector('mdw-header');
    if (mdwHeader) {
      this.classList.add('has-standard-header');
      mdwHeader.setAttribute('class', this.classList.toString());
    }
  }

  connectedCallback() {
    this.closeButton && this.closeButton.addEventListener('click', this.bound_close);
    if (this._hasMdwHeader) this.mdwHeader.addEventListener('click', this.bound_toTop);
  }

  disconnectedCallback() {
    this.closeButton && this.closeButton.removeEventListener('click', this.bound_close);
    if (this._hasMdwHeader) this.mdwHeader.removeEventListener('click', this.bound_toTop);
  }

  get closeButton() {
    return this.querySelector('#mdw-sheet-close-action');
  }

  get mdwHeader() {
    return this.querySelector('mdw-header');
  }


  get isModal() {
    return this.parentNode.type === 'modal';
  }

  get title() {
    return !!this._title ? this._title : this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  set title(value) {
    this._title = value;
  }

  close() {
    if (this.isModal) return this.parentNode.close();
    this.parentNode.exitFullscreen();
  }

  disable() {
    this.classList.add('mdw-disabled');
  }

  show() {
    this.classList.add('mdw-show');
    this.isShowing = true;
  }

  hide() {
    this.classList.remove('mdw-show');
    this.isShowing = false;
  }

  toTop() {
    this.parentNode._transitionToNearestPosition();
  }

  template(isModal, title, headerInnerHTML) {
    const doc = new DOMParser().parseFromString(headerInnerHTML, 'text/html');
    const topBar = doc.querySelector('mdw-sheet-top-bar');
    if (topBar) headerInnerHTML = headerInnerHTML.replace(topBar.outerHTML, '');
    this._hasMdwHeader = !!(headerInnerHTML && headerInnerHTML !== '');
    if (title === 'null') title = '';
    
    return `
      ${topBar ? topBar.outerHTML : `
        <mdw-sheet-top-bar>
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            ${!isModal ? '<mdw-icon>keyboard_arrow_down</mdw-icon>' : '<mdw-icon>close</mdw-icon>'}
          </mdw-button>
          ${title}
        </mdw-sheet-top-bar>
      `}
      
      ${this._hasMdwHeader === false ? '' :
        `<mdw-header>
          ${headerInnerHTML}
        </mdw-header>`
      }
    `;
  }
});
