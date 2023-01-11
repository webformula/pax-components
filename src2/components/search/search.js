import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./search.css';
import './search-global.css';
import util from '../../core/util.js';
import svgIconSearch from '../../svg-icons/search_FILL0_wght400_GRAD0_opsz24.svg';
import svgIconClose from '../../svg-icons/close_FILL0_wght400_GRAD0_opsz24.svg';
import svgIconHistory from '../../svg-icons/history_FILL0_wght400_GRAD0_opsz24.svg';
// import svgIconMic from '../../svg-icons/mic_FILL1_wght400_GRAD0_opsz24.svg';


// TODO search view mobile

customElements.define('mdw-search', class MDWSearchElement extends HTMLElementExtended {
  useShadowRoot = true;

  #value = '';
  #placeholder = 'Search';
  #open = false;
  #suggestions = [];
  #quickResults = [];
  #input;
  #templateElement = document.createElement('template');
  #sections = [{
    id: 'default'
  }];
  #templates = {
    default: data => /*html*/`<mdw-list-item value="${data.value}">${data.primary || data.value}</mdw-list-item>`,
    quick: data => /*html*/`<mdw-list-item value="${data.value}">${data.primary || data.value}</mdw-list-item>`
  };
  #historyMax = 100;
  #historyId;
  #history = [];

  #open_bound = this.open.bind(this);
  #onInput_bound = this.#onInput.bind(this);
  #onKeydown_bound = this.#onKeydown.bind(this);
  #onClearClick_bound = this.#onClearClick.bind(this);
  #close_bound = this.close.bind(this);
  #itemClick_bound = this.#itemClick.bind(this);



  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.suggestionsContainer) this.insertAdjacentHTML('beforeend', '<mdw-suggestions></mdw-suggestions>');
    if (this.querySelector('[slot=leading]')) this.classList.add('mdw-has-leading');
    if (this.querySelector('[slot=trailing]')) this.classList.add('mdw-has-trailing');

    this.#historyId = this.getAttribute('history');
    if (this.#historyId) this.#history = JSON.parse(localStorage.getItem(`${this.#historyId}_history`) || '[]');
  }

  afterRender() {
    this.#input = this.shadowRoot.querySelector('input');
    this.#input.addEventListener('focus', this.#open_bound);
    this.shadowRoot.querySelector('.clear').addEventListener('click', this.#onClearClick_bound);
  }

  disconnectedCallback() {
    this.#input.removeEventListener('focus', this.#open_bound);
    this.#input.removeEventListener('input', this.#onInput_bound);
    this.shadowRoot.querySelector('.clear').removeEventListener('click', this.#onClearClick_bound);
    window.removeEventListener('keydown', this.#onKeydown_bound);
    this.suggestionsContainer.close();
    this.suggestionsContainer.removeEventListener('close', this.#close_bound);
  }

  template() {
    return /*html*/`
      <div class="textfield">
        <slot name="leading"></slot>
        <div class="mdw-svg-icon search">${svgIconSearch}</div>
        <input placeholder="${this.#placeholder}">
        <span class="spinner"></span>
        <div class="mdw-svg-icon clear">${svgIconClose}</div>
        <slot name="trailing"></slot>
      </div>
      <slot></slot>
      <style>${styleAsString}</style>
    `;
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
  }

  get placeholder() {
    return this.#placeholder;
  }
  set placeholder(value) {
    this.#placeholder = value;
    this.setAttribute('aria-label', value);
    if (this.rendered) this.shadowRoot.querySelector('input').placeholder = value;
  }

  get value() {
    return this.#value;
  }

  get searchValue() {
    return this.shadowRoot.querySelector('input').value;
  }
  set searchValue(value) {
    if (this.rendered) this.shadowRoot.querySelector('input').value = value;
  }

  get suggestionsContainer() {
    return this.querySelector('mdw-suggestions');
  }

  get sections() {
    return this.#sections;
  }

  get suggestions() {
    return this.#suggestions;
  }

  get quickResults() {
    return this.#quickResults;
  }

  get #hasSearchValue() {
    return this.classList.contains('mdw-has-search-value');
  }
  set #hasSearchValue(value) {
    this.classList.toggle('mdw-has-search-value', !!value);
  }

  get #hasSuggestions() {
    return this.#suggestions.length > 0;
  }

  open() {
    if (this.#open) return;
    
    this.#input.selectionStart = 10000;
    this.#input.addEventListener('input', this.#onInput_bound);
    window.addEventListener('keydown', this.#onKeydown_bound);
    this.suggestionsContainer.show();
    this.suggestionsContainer.addEventListener('close', this.#close_bound);
    this.suggestionsContainer.addEventListener('click', this.#itemClick_bound);
    this.classList.add('mdw-open');
    this.#open = true;
    this.#render();
  }

  close() {
    if (!this.#open) return;

    this.#input.removeEventListener('input', this.#onInput_bound);
    window.removeEventListener('keydown', this.#onKeydown_bound);
    this.suggestionsContainer.close();
    this.suggestionsContainer.removeEventListener('click', this.#itemClick_bound);
    this.suggestionsContainer.removeEventListener('close', this.#close_bound);
    this.#clearAll();
    this.classList.remove('mdw-open');
    this.#open = false;
  }


  pending() {
    this.shadowRoot.querySelector('.spinner').innerHTML = `
      <mdw-progress-circular thickness="2" diameter="28" class="mdw-indeterminate"></mdw-progress-circular>
    `;
    this.classList.add('mdw-pending');
  }

  resolve() {
    this.shadowRoot.querySelector('.spinner').innerHTML = '';
    this.classList.remove('mdw-pending');
  }

  registerSection(id, title = '') {
    this.#sections.push({
      id,
      title
    });
  }

  registerTemplate(template, section = 'default') {
    this.#templates[section] = template;
  }

  updateSuggestions(suggestions) {
    if (!Array.isArray(suggestions) || suggestions.find(v => v.value === undefined)) {
      throw Error('suggestions must be an Array of Objects with at least a value property: [{ value: ""}]');
    }

    this.#suggestions = suggestions || [];
    this.resolve();
    if (this.rendered) this.#render();
  }

  updateQuickResults(quickResults) {
    if (!Array.isArray(quickResults) || quickResults.find(v => v.value === undefined)) {
      throw Error('quickResults must be an Array of Objects with at least a value property: [{ value: ""}]');
    }

    this.#quickResults = quickResults || [];
    if (this.rendered) this.#render();
  }

  #render() {
    // TODO one problem here is when user calls updateSuggestions with empty array. Should i auto switch to history
    if (this.#hasSuggestions) {
      const sectionSplit = this.#sections.map(({ id, title }) => ({
        id,
        title,
        suggestions: this.#suggestions.filter(v => (v.section || 'default') === id)
      })).filter(v => v.suggestions.length > 0);

      this.#templateElement.innerHTML = /*html*/`
        <mdw-list class="mdw-line-compact">
          ${sectionSplit.map(section => /*html*/`
            ${section.title ? /*html*/`<div class="mdw-sub-header">${section.title}</div>` : ''}
            ${section.suggestions.map(sug => /*html*/`
              ${this.#templates[section.id || 'default'](sug)}
            `).join('\n')}
          `).join('\n')}
        </mdw-list>
      `;
      this.#highlight();
      this.suggestionsContainer.replaceChildren(this.#templateElement.content.cloneNode(true));
      
    // history and quick results
    } else if (this.#hasSearchValue && (this.#history.length > 0 || this.#quickResults.length > 0)) {
      this.#templateElement.innerHTML = /*html*/`
        <mdw-list class="mdw-line-compact">
          ${util.fuzzySearch(this.searchValue, this.#history).slice(0, 10).map(this.#historyTemplate).join('\n')}
          ${this.quickResults.length > 0 ? /*html*/`
            <div class="mdw-sub-header">Quick results</div>
            ${this.#quickResults.map(v => /*html*/`
              ${this.#templates.quick(v)}
            `).join('\n')}
          ` : ''}
        </mdw-list>
      `;
      this.#highlight();
      this.suggestionsContainer.replaceChildren(this.#templateElement.content.cloneNode(true));
    // clear
    } else {
      this.suggestionsContainer.innerHTML = '';
    }
  }

  #highlight() {
    const searchValue = this.searchValue;
    const highlightRegex = new RegExp(searchValue, 'gi');
    this.#getTextNodes(this.#templateElement.content).forEach(node => {
      if (!node.textContent.trim()) return;

      const replaceElement = document.createElement('span');
      replaceElement.innerHTML = node.textContent.replaceAll(highlightRegex, `<mark>${searchValue}</mark>`);
      node.parentNode.insertBefore(replaceElement, node);
      node.remove();
    });
  }

  #getTextNodes(node) {
    let nodes = [];
    if (!node) return nodes;

    node = node.firstChild;
    while (node) {
      if (node.nodeType == 3) nodes.push(node);
      else if (
        node.nodeName !== 'MDW-ICON'
        && node.nodeName !== 'MDW-AVATAR'
        && !node.hasAttribute('history')
        && !node.classList.contains('mdw-sub-header')
      ) nodes = nodes.concat(this.#getTextNodes(node));
      node = node.nextSibling;
    }
    return nodes;
  }

  #onInput() {
    this.#clearAll();

    if (this.searchValue !== '') {
      if (this.#hasSearchValue === false) this.#hasSearchValue = true;
    } else if (this.#hasSearchValue === true) this.#hasSearchValue = false;

    this.dispatchEvent(new Event('input'));
  }

  #onClearClick() {
    this.searchValue = '';
    this.#hasSearchValue = false;
    this.classList.remove('mdw-has-search-value');
    this.#clearAll();
    this.#input.focus();
  }

  #itemClick(event) {
    if (event.target.nodeName !== 'MDW-LIST-ITEM') return;

    if (event.target.hasAttribute('history')) {
      this.#input.value = event.target.value;
      this.pending();
      this.dispatchEvent(new Event('search'));
      return;
    }

    this.#value = event.target.getAttribute('value');
    this.close();
    this.dispatchEvent(new Event('change'));
  }

  #clearAll() {
    this.#suggestions = [];
    this.#quickResults = [];
    this.#render();
  }

  #historyTemplate(value) {
    return /*html*/`
      <mdw-list-item value="${value}" history>
        <div class="mdw-svg-icon">${svgIconHistory}</div>
        ${value}
      </mdw-list-item>
    `;
  }

  #storeHistory(value) {
    if (!this.#historyId) return;
    if (!value || value.length < 2) return;
    if (this.#history.includes(value)) return
    this.#history.unshift(value);
    if (this.#history.length > this.#historyMax) this.#history = this.#history.slice(0, this.#historyMax);
    localStorage.setItem(`${this.#historyId}_history`, JSON.stringify(this.#history));
  }

  #onKeydown(event) {
    const { key, shiftKey } = event;
    const escape = key === 'Escape';
    const tab = key === 'Tab';
    const enter = key === 'Enter';
    const downArrow = key === 'ArrowDown';
    const upArrow = key === 'ArrowUp';

    if (escape) this.close();

    if ((tab && !shiftKey) || downArrow) {
      this.#focusNext();
      event.preventDefault();
    } else if ((tab && shiftKey) || upArrow) {
      this.#focusPrevious();
      event.preventDefault();
    }

    if (enter) {
      const focusedElement = document.activeElement;
      if (focusedElement.nodeName === 'MDW-SEARCH' && !!this.searchValue) {
        this.#storeHistory(this.searchValue);
        this.pending();
        this.dispatchEvent(new Event('search'));
      }

      if (focusedElement.nodeName === 'MDW-LIST-ITEM') {
        if (focusedElement.hasAttribute('history')) {
          this.#input.value = focusedElement.value;
          this.pending();
          this.dispatchEvent(new Event('search'));
        } else {
          this.#value = focusedElement.getAttribute('value');
          this.close();
          this.dispatchEvent(new Event('change'));
        }
      }
    }
  }

  #focusNext() {
    const focusedElement = document.activeElement;
    let nextFocus;

    // if no focus on options then try focusing on element after selected
    if (!focusedElement || focusedElement.nodeName !== 'MDW-LIST-ITEM') {
      nextFocus = this.querySelector('mdw-list-item');
    }

    // try next sibling
    else if (
      focusedElement.nextElementSibling &&
      focusedElement.nextElementSibling.nodeName === 'MDW-LIST-ITEM'
    ) nextFocus = focusedElement.nextElementSibling;

    // it is possible next sibling is a header so try jumping it
    else if (
      focusedElement.nextElementSibling &&
      focusedElement.nextElementSibling.nextElementSibling &&
      focusedElement.nextElementSibling.nextElementSibling.nodeName === 'MDW-LIST-ITEM'
    ) nextFocus = focusedElement.nextElementSibling.nextElementSibling;

    else if (!nextFocus) nextFocus = this.querySelector('mdw-list-item');

    if (nextFocus) nextFocus.focus();
  }

  #focusPrevious() {
    const focusedElement = document.activeElement;
    let nextFocus;

    // if no focus on options then try focusing on element after selected
    if (!focusedElement || focusedElement.nodeName !== 'MDW-LIST-ITEM') {
      nextFocus = [...this.querySelectorAll('mdw-list-item')].pop();
    }

    // try next sibling
    else if (
      focusedElement.previousElementSibling &&
      focusedElement.previousElementSibling.nodeName === 'MDW-LIST-ITEM'
    ) nextFocus = focusedElement.previousElementSibling;

    // it is possible next sibling is a header so try jumping it
    else if (
      focusedElement.previousElementSibling &&
      focusedElement.previousElementSibling.previousElementSibling &&
      focusedElement.previousElementSibling.previousElementSibling.nodeName === 'MDW-LIST-ITEM'
    ) nextFocus = focusedElement.previousElementSibling.previousElementSibling;

    else if (!nextFocus) nextFocus = [...this.querySelectorAll('mdw-list-item')].pop();

    if (nextFocus) nextFocus.focus();
  }
});
