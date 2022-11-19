export default class HTMLElementExtended extends HTMLElement {
  useShadowRoot = false;
  rendered = false;
  // templateString = 'string or path of html';
  #initiated = false;

  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}

  async beforeRender() { }
  async afterRender() { }

  // makes html safe from executing malicious code
  // Should be used for any user inputted data
  htmlEscape(value = '') {
    return value
      .replace(/&/g, '&amp;')
      .replace(/>/g, '&gt;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;');
  }

  template() {
    return /*html*/'';
  }

  async render() {
    if (!this.#initiated) {
      if (this.useShadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.rootElement = this.shadowRoot;
      } else {
        this.rootElement = this;
      }

      this.#initiated = true;
    }

    await this.beforeRender();

    let renderedTemplate;
    if (this.templateString) {
      renderedTemplate = new Function(`return \`${this.templateString}\`;`).call(this, this);
    } else {
      renderedTemplate = this.template.call(this, this);
    }

    this.rootElement.innerHTML = renderedTemplate;

    await this.afterRender();
    this.rendered = true;
  }
}
