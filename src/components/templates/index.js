import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWTemplate from './service.js';

customElements.define('mdw-template', class extends HTMLElementExtended {
  constructor() {
    super();
    
    const templateUrl = this.url;
    if (templateUrl) {
      MDWTemplate
        .get(templateUrl, window.activePage)
        .then(htmlSting => {
          this.insertAdjacentHTML('beforeend', htmlSting)
        });
    }
  }

  get url() {
    return this.getAttribute('mdw-url')
  }
});
