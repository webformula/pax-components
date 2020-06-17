import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWTemplate from './service.js';

customElements.define('mdw-template', class extends HTMLElementExtended {
  constructor() {
    super();

    const templateId = this.templateId;
    if (templateId) MDWTemplate
      .get(templateId)
      .then(htmlSting => {
        this.insertAdjacentHTML('beforeend', htmlSting)
      })
    
    const templateUrl = this.templateUrl;
    if (templateUrl) {
      MDWTemplate
        .loadHtml(templateUrl)
        .then(htmlSting => {
          this.insertAdjacentHTML('beforeend', htmlSting)
        })
    }
  }

  get templateId() {
    return this.getAttribute('template-id')
  }

  get templateUrl() {
    return this.getAttribute('template-url')
  }

  async show(templateId) {
    const htmlSting = await MDWTemplate.get(templateId)
    this.innerHTML = htmlSting;
  }
})
