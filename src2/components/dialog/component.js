import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';

// NOTE: follows spec https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement

// TODO esc
// TODO fullscreen

customElements.define('mdw-dialog', class MDWDialog extends HTMLElementExtended {
  useShadowRoot = false;

  #backdropElement;
  #clickBackdropClose = false;
  #returnValue;
  #backDropIsRemoving = false;
  #backdropClickHandler_bound = this.#backdropClickHandler.bind(this)

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'dialog');
  }

  get open() {
    return this.hasAttribute('open');
  }

  get clickBackdropClose() {
    return this.#clickBackdropClose;
  }
  set clickBackdropClose(value) {
    this.#clickBackdropClose = value;
  }

  get returnValue() {
    return this.#returnValue;
  }

  disconnectedCallback() {
    this.#removeBackdrop();
  }


  show(backdrop = true) {
    if (this.open === true) return;

    if (backdrop) this.#addBackdrop();
    this.setAttribute('open', '');
  }
  showModal() {
    this.show(true);
  }

  close(returnValue) {
    if (this.open !== true) return;

    this.removeAttribute('open');
    this.#removeBackdrop();
    this.#returnValue = returnValue;
    this.dispatchEvent(new Event('close'));
  }

  #addBackdrop() {
    this.#backdropElement = document.createElement('div');
    this.#backdropElement.classList.add('mdw-dialog-backdrop');
    this.insertAdjacentElement('beforebegin', this.#backdropElement);
    if (this.#clickBackdropClose === true) this.#backdropElement.addEventListener('click', this.#backdropClickHandler_bound);

    setTimeout(() => {
      this.#backdropElement.style.opacity = 1;
    }, 10);
  }

  async #removeBackdrop() {
    if (!this.#backdropElement || this.#backDropIsRemoving === true) return;
    this.#backDropIsRemoving = true;

    this.#backdropElement.removeEventListener('click', this.#backdropClickHandler_bound);
    this.#backdropElement.style.opacity = 0;

    await util.transitionendAsync(this.#backdropElement);

    this.#backdropElement.remove();
    this.#backdropElement = undefined;
  }

  #backdropClickHandler() {
    this.close();
  }
});
