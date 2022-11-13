import HTMLElementExtended from '../HTMLElementExtended.js';
import './tabs-content.css';


customElements.define('mdw-tabs-content', class MDWTabsContent extends HTMLElementExtended {
  useShadowRoot = false;

  #tabsId = this.getAttribute('mdw-tabs');
  #tabsElement;
  #tabChange_bound = this.#tabChange.bind(this);

  constructor() {
    super();

    if (!this.#tabsId) throw Error('<mdw-tabs-content> requires attribute mdw-tabs. This should be the id of the mdw-tabs element');
  }

  connectedCallback() {
    this.#tabsElement = document.querySelector(`#${this.#tabsId}`);
    if (!this.#tabsElement) throw Error('<mdw-tabs-content> requires attribute mdw-tabs. This should be the id of the mdw-tabs element');
    this.#updateSelected(parseInt(this.#tabsElement.value));
    this.#tabsElement.addEventListener('change', this.#tabChange_bound);
  }

  #tabChange(event) {
    this.#updateSelected(parseInt(event.detail));
  }
  
  #updateSelected(index) {
    const content = this.querySelectorAll('.mdw-content')[index - 1];
    if (!content) throw Error(`No mdw-content at index: ${index}`);

    const selected = this.querySelector('.mdw-content[selected]');
    if (selected) selected.removeAttribute('selected');
    content.setAttribute('selected', '');
  }
});
