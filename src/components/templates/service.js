const MDWTemplate = new class {
  constructor() {
    this._templates = {};
    this._loadedTemplates = {};
  }

  // ALLOW A TEMPLTE TO BE RGISTERED MORE THAN ONCE WITHOUT THROWING AN ERROR
  registerOnce(id, template) {
    if (this._templates[id]) return;
    this.register(id, template);
  }

  async registerAndLoad(id, templateUrl) {
    if (this._templates[id]) return;
    this.register(id, templateUrl);
    if (templateUrl.includes('.html')) await this.loadHtml(templateUrl);
  }

  register(id, templateString) {
    if (!id) throw Error('requires id');
    if (!templateString) throw Error('requires templateString');
    if (this._templates[id]) throw Error(`id "${id}" already taken`);
    this._templates[id] = templateString;
  }

  unregister(id) {
    this._templates[id] = undefined;
  }

  async get(id, data) {
    if (!this._templates[id]) throw Error(`no template found with id: ${id}`);
    const template = this._templates[id];
    if (typeof template === 'function') return template(data);
    if (template.includes('.html')) return await this.loadHtml(template);
    return template;
  }

  async loadHtml(url) {
    if (this._loadedTemplates[url]) return this._loadedTemplates[url];

    const response = await fetch(url);
    const template = await response.text();
    this._loadedTemplates[url] = template;
    return template;
  }
}

window.MDWTemplate = MDWTemplate;

export default MDWTemplate;
