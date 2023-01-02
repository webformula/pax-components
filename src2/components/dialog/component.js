import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';

// NOTE: follows spec https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement

// TODO panel element
// TODO esc
// TODO fullscreen

export default class MDWDialogElement extends HTMLElementExtended {
  useShadowRoot = false;

  #backdropElement;
  #clickBackdropClose = false;
  #returnValue;
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
    if (this.#backdropElement) return;
    this.#backdropElement = document.createElement('mdw-backdrop');
    this.insertAdjacentElement('beforebegin', this.#backdropElement);
    if (this.#clickBackdropClose === true) this.#backdropElement.addEventListener('click', this.#backdropClickHandler_bound);
  }

  #removeBackdrop() {
    if (!this.#backdropElement) return;
    this.#backdropElement.removeEventListener('click', this.#backdropClickHandler_bound);
    this.#backdropElement.remove();
    this.#backdropElement = undefined;
  }

  #backdropClickHandler() {
    this.close();
  }
}

customElements.define('mdw-dialog', MDWDialogElement);
