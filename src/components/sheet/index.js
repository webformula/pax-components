import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-sheet', class extends HTMLElementExtended {
  constructor() {
    super();

    this.cloneTemplate();
    this.classList.add('mdw-closed');
    this.bound_onScroll = this.onScroll.bind(this);
  }

  registerHeader(element) {
    this.headerElement = element;
  }

  get contentElement() {
    return this.querySelector('mdw-sheet-content');
  }

  // there are 2 spacers so we can easily snap scrolling to the center pos
  get scrollSpacerElement() {
    return this.shadowRoot.querySelector('.mdw-scroll-spacer');
  }

  get scrollSpacerElement2() {
    return this.shadowRoot.querySelector('.mdw-scroll-spacer-2');
  }

  open() {
    this.classList.remove('mdw-closed');
    setTimeout(() => {
      this.classList.add('mdw-open');
      this.scrollTop = this.scrollSpacerElement2.offsetHeight;
      this.scrollPosOffset = this.scrollSpacerElement.offsetHeight;
    }, 0);
    this.addEventListener('scroll', this.bound_onScroll);
  }

  close() {
    this.classList.remove('mdw-open');
    this.classList.add('mdw-closed');
    this.removeEventListener('scroll', this.bound_onScroll);
  }

  toggle() {
    if (this.isShowing) this.close();
    else this.open();
  }

  onScroll(event) {
    const pos = this.scrollTop - this.scrollPosOffset;
    this.headerElement.toggle(pos >= -40);
    this.headerElement.toggleFixed(pos >= 0);
    if (this.scrollTop < 100) this.close();
  }

  styles() {
    return `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        overflow-x: hidden;
        overflow-y: scroll;
        scroll-snap-type: y proximity;
        -webkit-overflow-scrolling: touch;
      }

      :host(.mdw-closed) {
        display: none;
      }

      :host .mdw-sheet-scroller {
        display: block;
        scroll-snap-align: start;
      }

      :host(.mdw-open) .mdw-scroll-spacer {
        height: 50%;
      }

      :host .mdw-scroll-spacer {
        scroll-snap-align: start;
        height: 100%;
        transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      :host(.mdw-open) .mdw-scroll-spacer-2 {
        height: 50%;
        scroll-snap-align: start;
      }

      ::slotted(mdw-sheet-content) {
        display: block;
        background-color: white;
      }
    `;
  }

  template() {
    return '<div class="mdw-scroll-spacer-2"></div><div class="mdw-scroll-spacer"></div><div class="mdw-sheet-scroller"><slot></slot></div>';
  }
});
