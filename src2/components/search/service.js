import util from '../../core/util.js';
// const registeredClasses = new WeakSet();

const MDWSearch = class MDWSearch {
  #element;
  #sections = [];
  #templates = [];

  constructor(searchElementSelector) {
    if (!searchElementSelector) throw Error('requires searchElementSelector');
    this.#element = document.querySelector(searchElementSelector);
    if (!this.#element) {
      util.waitForElement(searchElementSelector)
        .then(element => {
          this.#element = element;
          this.#updateElement();
        })
        .catch(() => {
          throw Error(`Could not find element using searchElementSelector: ${searchElementSelector}`);
        });
    }
  }

  get value() {
    return this.#element.value;
  }

  get searchValue() {
    return this.#element.searchValue;
  }

  get element() {
    return this.#element;
  }

  registerSection(id, title = '') {
    this.#sections.push({ id, title });
    this.#updateElement();
  }

  registerTemplate(template, section = 'default') {
    this.#templates.push({ template, section });
    this.#updateElement();
  }

  clearSuggestions() {
    this.#element.clearSuggestions();
  }

  updateSuggestions(suggestions) {
    this.#element.updateSuggestions(suggestions);
  }

  updateQuickResults(quickResults) {
    this.#element.updateQuickResults(quickResults);
  }

  #updateElement() {
    if (!this.#element) return;

    this.#sections.forEach(v => this.#element.registerSection(v.id, v.title));
    this.#sections = [];
    this.#templates.forEach(v => this.#element.registerTemplate(v.template, v.section));
    this.#templates = [];
  }
}

window.MDWSearch = MDWSearch;
export default MDWSearch;
