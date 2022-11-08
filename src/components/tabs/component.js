import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';

// TODO events
// TODO distance based transition time
// TODO icons
// TODO ripples
// TODO states

customElements.define('mdw-tabs', class MDWTabs extends HTMLElementExtended {
  useShadowRoot = false;

  #tabCLick_bound = this.#tabCLick.bind(this);


  constructor() {
    super();
  }

  async connectedCallback() {
    this.insertAdjacentHTML('beforeend', `<div class="mdw-underline"></div>`);
    await util.nextAnimationFrameAsync();
    this.#positionUnderline();

    this.addEventListener('click', this.#tabCLick_bound);
  }

  #positionUnderline() {
    const element = this.querySelector('.mdw-underline');
    const selected = this.querySelector('.mdw-tab[selected]');
    const containerBounds = this.getBoundingClientRect();
    const tabBounds = selected.getBoundingClientRect();

    const left = tabBounds.x - containerBounds.x;
    const right = tabBounds.width;

    element.style.left = `${left}px`;
    element.style.width = `${right}px`;
  }

  #tabCLick(event) {
    const selected = this.querySelector('.mdw-tab[selected]');
    if (event === selected) return;

    selected.removeAttribute('selected');
    event.target.setAttribute('selected', '');

    this.#positionUnderline();
  }
});
