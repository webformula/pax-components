const invalidIdCharRegex = /-|\s/g;
const componentIdReplaceRegex = /(?<![\w])(component)(?![\w])/g;

export default class HTMLElementExtended extends HTMLElement {
  useShadowRoot = false;
  rendered = false;
  // templateString = 'string or path of html';

  #templateId = `template${parseInt(Math.random() * 99999)}`;
  #initiated = false;

  constructor() {
    super();

    this.id = this.id || this.#templateId;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  async beforeRender() { }
  async afterRender() { }

  template() {
    return /*html*/'';
  }

  async render() {
    if (!this.#initiated) {
      if (this.id.match(invalidIdCharRegex) !== null) console.warn(`cannot use 'component' methods if the id contains - or spaces : ${this.id}`);
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

    renderedTemplate = renderedTemplate.replace(componentIdReplaceRegex, this.id);
    this.rootElement.innerHTML = renderedTemplate;

    await this.afterRender();
    this.rendered = true;
  }


  // TODO look into how this would happen without rerender?
  // #createTemplate() {
  //   document.body.insertAdjacentHTML('beforeend', /*html*/`
  //     <template id="${this.#templateId}">
  //       <tr>
  //         <td class="record"></td>
  //         <td></td>
  //       </tr>
  //     </template>
  //   `);
  // }
}