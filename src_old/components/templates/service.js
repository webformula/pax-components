const MDWTemplate = new class {
  constructor() {
    this._loadedTemplates = {};
  }

  async get(template, data) {
    if (this.isString(template)) {
      return new Function(`return \`${template}\`;`).call(data);
    }

    if (!this.isUrl(template)) throw Error('Template must be a string or url');

    const templateStr = await this.loadHtml(template);
    return new Function(`return \`${templateStr}\`;`).call(data);
  }

  async loadHtml(url) {
    if (window._templates && window._templates[url]) return window._templates[url];
    if (this._loadedTemplates[url]) return this._loadedTemplates[url];

    const response = await fetch(url);
    const template = await response.text();
    this._loadedTemplates[url] = template;
    return template;
  }

  isString(template) {
    if (this.isUrl(template)) return false;
    if (typeof template !== 'string') return false;
    return template.includes('<');
  }

  isUrl(template) {
    return !!template.match(/.html$/);
  }
}

window.MDWTemplate = MDWTemplate;

export default MDWTemplate;
