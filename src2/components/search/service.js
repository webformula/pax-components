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
    this.#templates.forEach(v => this.#element.registerTemplate(v.template, v.section));
  }
  


  // #connected = false;
  // #element;
  // #searchElementSelector;
  // #sections = [{
  //   id: 'default'
  // }];
  // #templates = {
  //   default: data => /*html*/`<mdw-list-item value="${data.value}">${data.primary || data.value}</mdw-list-item>`
  // };
  // #suggestions = [];
  // #elementConnectedCallback_bound = this.#elementConnectedCallback.bind(this);
  // #elementDisconnectedCallback_bound = this.#elementDisconnectedCallback.bind(this);

  // constructor(searchElementSelector) {
  //   if (!searchElementSelector) throw Error('requires searchElementSelector');
  //   this.#searchElementSelector = searchElementSelector;

  //   registeredConnected.push(this.#elementConnectedCallback_bound);
  //   registeredDisconnected.push(this.#elementDisconnectedCallback_bound);
  // }

  // #elementConnectedCallback(element) {
  //   if (document.querySelector(this.#searchElementSelector) === element) {
  //     this.#element = element;
  //     this.#connected = true;
  //     if (this.#suggestions.length > 0) this.#render();
  //   }
  // }

  // #elementDisconnectedCallback(element) {
  //   if (this.#element === element) {
  //     this.#element = undefined;
  //     this.#connected = false;
  //   }
  // }

  // get value() {
  //   return this.#element.value;
  // }


  // registerSection(id, title = '') {
  //   this.#sections.push({
  //     id,
  //     title
  //   });
  // }

  // registerTemplate(template, section = 'default') {
  //   this.#templates[section] = template;
  // }

  // updateSuggestions(suggestions) {
  //   if (suggestions.find(v => v.value === undefined)) {
  //     throw Error('suggestions must be an Array of Objects with at least a value property: [{ value: ""}]');
  //   }

  //   this.#suggestions = suggestions || [];
  //   if (this.#connected) this.#render();
  // }

  // clearSuggestions() {
  //   this.#element.clearSuggestions();
  // }

  // #render() {
  //   const sectionSplit = this.#sections.map(({ id, title }) => ({
  //     id,
  //     title,
  //     suggestions: this.#suggestions
  //       .filter(v => (v.section || 'default') === id)
  //       // .sort()
  //   }));

  //   const value = this.#element.value;
  //   const re = new RegExp(value, 'gi');
  //   const template = document.createElement('template');
  //   template.innerHTML = /*html*/`
  //     <mdw-list class="mdw-line-compact">
  //       ${sectionSplit.map(section => /*html*/`
  //         ${section.title ? /*html*/`<div class="mdw-sub-header">${section.title.replace(re, `<mark>${value}</mark>`)}</div>` : ''}
  //         ${section.suggestions.map(sug => /*html*/`
  //           ${this.#templates[section.id || 'default'](sug)}
  //         `).join('\n')}
  //       `).join('\n')}
  //     </mdw-list>
  //   `;

  //   this.#getTextNodes(template.content).forEach(node => {
  //     if (!node.textContent.trim()) return;

  //     const replaceElement = document.createElement('span');
  //     replaceElement.innerHTML = node.textContent.replaceAll(re, `<mark>${value}</mark>`);
  //     node.parentNode.insertBefore(replaceElement, node);
  //     node.remove();
  //   });

  //   this.#element.suggestionsContainer.replaceChildren(template.content.cloneNode(true));
  //   this.#element.classList.toggle('mdw-has-suggestions', this.#suggestions.length > 0);

  //   this.#element.resolve();
  // }

  // #getTextNodes(node) {
  //   let nodes = [];
  //   if (!node) return nodes;

  //   node = node.firstChild;
  //   while (node) {
  //     if (node.nodeType == 3) nodes.push(node);
  //     else if (
  //       node.nodeName !== 'MDW-ICON'
  //       && node.nodeName !== 'MDW-AVATAR'
  //       && !node.classList.contains('mdw-sub-header')
  //     ) nodes = nodes.concat(this.#getTextNodes(node));
  //     node = node.nextSibling;
  //   }
  //   return nodes;
  // }
};

// function mdwSearchConnected(element) {
//   console.log('add', ws)
//   // registeredConnected.forEach(fn => fn(element));
// }

// function mdwSearchDisconnected(element) {
//   console.log('remove', ws)
//   // registeredDisconnected.forEach(fn => fn(element));

//   setTimeout(() => {
//     console.log('a', ws)
//   }, 100);
// }


// window._mdwSearchConnected = mdwSearchConnected;
// window._mdwSearchDisconnected = mdwSearchDisconnected;
window.MDWSearch = MDWSearch;
export default MDWSearch;
