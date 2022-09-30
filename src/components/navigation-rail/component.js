import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';


customElements.define('mdw-navigation-rail', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #mdwPageChange_bound = this.#mdwPageChange.bind(this);

  
  constructor() {
    super();
  }

  async connectedCallback() {
    window.addEventListener('mdwPageChange', this.#mdwPageChange_bound);
    this.#mdwPageChange();

    [...this.querySelectorAll('a')].forEach(element => {
      if (element.querySelector('.mdw-label')) {
        element.classList.add('mdw-contains-label');
      }
    })

    await util.nextAnimationFrameAsync();
    this.classList.add('mdw-add-animation');
  }

  disconnectedCallback() {
    window.removeEventListener('mdwPageChange', this.#mdwPageChange_bound);
  }

  #mdwPageChange() {
    let currentLink = this.querySelector('a.mdw-current-link');
    if (currentLink) currentLink.classList.remove('mdw-current-link');

    // try full url
    let match = this.querySelector(`a[href="${location.href}"]`);

    // try full url without search parameters
    if (!match) match = this.querySelector(`a[href="${location.href.split('?')[0]}"]`);

    // try pathname with search parameters
    if (!match) match = this.querySelector(`a[href="${location.pathname}?${location.href.split('?')[1]}"]`);

    // try just pathname
    if (!match) match = this.querySelector(`a[href="${location.pathname}"]`);

    if (match) match.classList.add('mdw-current-link');
  }
});
