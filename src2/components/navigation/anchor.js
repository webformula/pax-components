import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./anchor.css';
import Ripple from '../../core/Ripple.js';
import './anchor-global.css';
import util from '../../core/util.js';

customElements.define('mdw-anchor', class MDWAnchorElement extends HTMLElementExtended {
  useShadowRoot = true;
  useTemplate = false;

  #ripple;
  #active = false;
  #onClick_bound = this.#onClick.bind(this);


  constructor() {
    super();
    
    if (this.querySelector('[slot=rail]')) this.classList.add('mdw-has-rail-content');
  }

  connectedCallback() {
    this.setAttribute('role', 'link');
  }

  afterRender() {
    this.#ripple = new Ripple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this
    });

    // allow pax core to handle location changes
    if (!window.paxCoreSPA) this.addEventListener('click', this.#onClick_bound);
  }

  disconnectedCallback() {
    this.#ripple.destroy();
  }

  template() {
    const rail = this.querySelector('[slot=rail]');
    const hasRailContent = rail !== null;
    const mainHasIcon = this.querySelector(':scope > mdw-icon');
    const railHasIcon = this.querySelector('[slot=rail] mdw-icon');
    const railHasText = hasRailContent && util.getTextFromNode(rail) !== '';
    return /*html*/`
      <div class="background ${hasRailContent ? 'has-rail-content' : ''} ${railHasIcon ? 'rail-has-icon' : ''} ${railHasText ? 'rail-has-text' : ''}"></div>
      <slot class="main ${hasRailContent ? 'has-rail-content' : ''} ${mainHasIcon ? 'has-icon' : ''}"></slot>
      <slot class="rail ${hasRailContent ? 'has-rail-content' : ''} ${railHasIcon ? 'has-icon' : ''} ${railHasText ? 'has-text' : ''}" name="rail"></slot>
      <div class="ripple"></div>
      <style>${styleAsString}</style>
    `;
  }

  get href() {
    return `${location.origin}${this.getAttribute('href')}`;
  }

  get active() {
    return this.#active;
  }
  set active(value) {
    this.#active = !!value;
    this.classList.toggle('mdw-active', this.#active);
  }

  #onClick() {
    location.href = this.href;
  }
});
