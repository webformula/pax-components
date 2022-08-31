import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import './component.css';

customElements.define('mdw-menu', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #panel;
  #control;

  #onControlClick_bound = this.#onControlClick.bind(this);
  #onPanelClick_bound = this.#onPanelClick.bind(this);


  constructor() {
    super();

    this.#control = this.#getControl();
    const ul = this.querySelector(':scope > ul');
    ul.classList.add('mdw-menu-panel');
    this.#panel = new Panel();
    this.#panel.template = ul.outerHTML;
    this.#panel.backdrop = false;
    this.#panel.clickOutsideToClose = true;
    this.#panel.targetElement = this.#control;
    ul.remove();
  }

  connectedCallback() {
    this.#control.addEventListener('click', this.#onControlClick_bound);
    this.#panel.onClick = this.#onPanelClick_bound;
  }


  #onControlClick() {
    this.#panel.toggle();
  }

  // delay close so button press animation is seen
  #onPanelClick() {
    this.#panel.lock();
    setTimeout(() => {
      this.#panel.hide();
    }, 150);
  }

  #getControl() {
    let firstChild = this.firstChild;
    while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
      firstChild = firstChild.nextSibling;
    }
    return firstChild;
  }
});
