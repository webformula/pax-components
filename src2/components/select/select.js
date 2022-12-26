import MDWPanelElement from '../panel/component.js';
import './select.css';
import util from '../../core/util.js';


// TODO async search. figure out how to handle search clear / re open
// TODO keyboard for search (enter key). Do i want this?
// TODO fix click for non input. the text field clickable area that is not the input


customElements.define('mdw-select', class MDWSelect extends MDWPanelElement {
  #textfield = this.parentElement;
  #input = this.parentNode.querySelector('input');
  #arrowElement = document.createElement('div');
  #onInputFocus_bound = this.#onInputFocus.bind(this);
  #onClick_bound = this.#onClick.bind(this);
  #onOpen_bound = this.#onOpen.bind(this);
  #onClose_bound = this.#onClose.bind(this);
  #isSearch = this.classList.contains('mdw-search');
  #isSearchAsync = this.classList.contains('mdw-search-async');
  #onKeydown_bound = this.#onKeydown.bind(this);
  #options = [];
  #onInputSearch_debounce_bound = util.debounce(this.#onInputSearch, 300).bind(this);
  #onInputSearchAsync_bound = this.#onInputSearchAsync.bind(this);
  #searchAsyncEvent_debounced = util.debounce(this.#searchAsyncEvent, 300).bind(this);
  #selectedValue = '';
  #selectedLabel = '';


  constructor() {
    super();

    if (!this.#input) throw Error('No input found. mdw-select must be inside mdw-textfield');
    this.target = this.#textfield;
    this.animation = 'scale';
    this.addClickOutsideCloseIgnore(this.#input);

    // makes the input not usable, only clickable. Create normal select
    if (!this.#isSearch && !this.#isSearchAsync) {
      this.#textfield.classList.add('mdw-select-no-search');
      this.#input.setAttribute('readonly', '');
      this.offsetY = -this.#textfield.offsetHeight;
    }

    this.#arrowElement.classList.add('mdw-select-arrow');
    this.insertAdjacentElement('beforebegin', this.#arrowElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'select');
    this.#setWidth();

    // grab initial options
    this.#options = [...this.querySelectorAll('mdw-option')].map(element => ({
      label: util.getTextFromNode(element),
      element
    }));

    this.addEventListener('open', this.#onOpen_bound);
    this.addEventListener('close', this.#onClose_bound);

    if (this.#isSearchAsync) {
      this.insertAdjacentHTML('afterbegin', '<mdw-progress-linear class="mdw-indeterminate"></mdw-progress-linear>');
    }
    if (this.#options.length === 0) this.insertAdjacentHTML('beforeend', '<div class="mdw-no-items">No items</div>');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#input.removeEventListener('focus', this.#onInputFocus_bound);
    this.removeEventListener('open', this.#onOpen_bound);
    this.removeEventListener('close', this.#onClose_bound);
    this.removeEventListener('click', this.#onClick_bound);
    document.body.removeEventListener('keydown', this.#onKeydown_bound);
    if (this.#isSearch) this.#input.removeEventListener('input', this.#onInputSearch_debounce_bound);
    if (this.#isSearchAsync) this.#input.removeEventListener('input', this.#onInputSearchAsync_bound);
  }

  get value() {
    return this.#selectedValue;
  }

  set value(value) {
    value = `${value}`;
    const option = this.#options.find(v => v.element.value === value);
    if (!option) {
      this.#selectedValue = '';
      this.#selectedLabel = '';
    } else {
      this.#selectedValue = option.element.value;
      this.#selectedLabel = option.label;
    }
    this.#input.value = this.#selectedLabel;
  }

  get options() {
    return this.querySelectorAll('mdw-option');
  }
  
  set optionValues(values) {
    if (!Array.isArray(values) || values.length === 0) {
      this.#options = [];
    } else {
      this.#options = values.map(v => {
        const element = document.createElement('mdw-option');
        element.value = v.value;
        element.innerText = v.label;

        return {
          label: v.label,
          element
        };
      });
    }
    this.#updateOptions();
  }

  // remove progress bar. This automatically called after optionValues are set
  resolveSearch() {
    this.classList.remove('mdw-search-async-searching');
  }

  #onOpen() {
    this.#textfield.classList.add('mdw-raise-label');
    if (!this.#isSearch) this.#updateOptionDisplay();
    else this.#updateOptions();

    this.#arrowElement.classList.add('mdw-open');
    this.addEventListener('click', this.#onClick_bound);
    document.body.addEventListener('keydown', this.#onKeydown_bound);
    if (this.#isSearch) this.#input.addEventListener('input', this.#onInputSearch_debounce_bound);
    if (this.#isSearchAsync) this.#input.addEventListener('input', this.#onInputSearchAsync_bound);
  }

  #onClose() {
    this.#textfield.classList.remove('mdw-raise-label');
    this.#arrowElement.classList.remove('mdw-open');
    this.removeEventListener('click', this.#onClick_bound);
    document.body.removeEventListener('keydown', this.#onKeydown_bound);
    if (this.#isSearch) this.#input.removeEventListener('input', this.#onInputSearch_debounce_bound);
    if (this.#isSearchAsync) this.#input.removeEventListener('input', this.#onInputSearchAsync_bound);

    // reset value if not changed
    this.#input.value = this.#selectedLabel;
  }

  #onInputFocus() {
    this.show();
  }

  #onClick(event) {
    if (event.target.nodeName === 'MDW-OPTION') {
      this.#selectOption(event.target);
      this.close();
    }
  }

  #selectOption(optionElement) {
    this.#selectedLabel = util.getTextFromNode(optionElement);
    this.#selectedValue = optionElement.value;

    // clear any autocomplete text
    this.#textfield.autocomplete = '';
    this.#updateOptionDisplay();
    this.dispatchEvent(new Event('change', this));
  }

  #updateOptionDisplay() {
    const currentSelected = this.querySelector('mdw-option[selected]')
    if (currentSelected) {
      currentSelected.removeAttribute('selected');
      currentSelected.removeAttribute('aria-selected');
    }

    const nextSelected = this.querySelector(`mdw-option[value="${this.#selectedValue}"]`);
    if (nextSelected) {
      nextSelected.setAttribute('selected', '');
      nextSelected.setAttribute('aria-selected', 'true');
      nextSelected.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  #updateOptions() {
    const fragment = new DocumentFragment();
    for (const item of this.#options) {
      fragment.append(item.element);
    }
    this.replaceChildren(fragment);
    if (this.#isSearchAsync) {
      this.insertAdjacentHTML('afterbegin', '<mdw-progress-linear class="mdw-indeterminate"></mdw-progress-linear>');
    }
    if (this.#options.length === 0) this.insertAdjacentHTML('beforeend', '<div class="mdw-no-items">No items</div> ');
    this.#updateOptionDisplay();
    this.resolveSearch();
  }

  #onKeydown(event) {
    const { key, shiftKey } = event;
    const escape = key === 'Escape';
    const tab = key === 'Tab';
    const enter = key === 'Enter';
    const downArrow = key === 'ArrowDown';
    const rightArrow = key === 'ArrowRight';
    const upArrow = key === 'ArrowUp';
    const leftArrow = key === 'ArrowLeft';

    if (escape && this.clickOutsideToClose === true) this.close();

    if ((tab && !shiftKey) || downArrow || rightArrow) {
      this.#focusNext();
      event.preventDefault();
    } else if ((tab && shiftKey) || upArrow || leftArrow) {
      this.#focusPrevious();
      event.preventDefault();
    }

    if (enter) {
      const focusedElement = document.activeElement;
      if (focusedElement.nodeName === 'INPUT') {
        const firstOption = this.querySelector('mdw-option');
        firstOption.click();
        this.close();
      }

      if (focusedElement.nodeName === 'MDW-OPTION') {
        event.target.click();
        this.close();
      }
    }
  }

  #focusNext() {
    const focusedElement = document.activeElement;
    const selected = this.querySelector('mdw-option[selected]');
    let nextFocus;

    // if no focus on options then try focusing on element after selected
    if (!focusedElement || focusedElement.nodeName !== 'MDW-OPTION') {
      if (selected) nextFocus = selected.nextElementSibling;
    }

    // try next sibling
    if (focusedElement && focusedElement.nodeName === 'MDW-OPTION' && !nextFocus) nextFocus = focusedElement.nextElementSibling;
    if (!nextFocus) nextFocus = this.querySelector('mdw-option'); // first
    if (nextFocus) nextFocus.focus();
  }

  #focusPrevious() {
    const focusedElement = document.activeElement;
    const selected = this.querySelector('mdw-option[selected]');
    let nextFocus;

    // if no focus on options then try focusing on element after selected
    if (!focusedElement || focusedElement.nodeName !== 'MDW-OPTION') {
      if (selected) nextFocus = selected.previousElementSibling;
    }

    // try next sibling
    if (focusedElement && focusedElement.nodeName === 'MDW-OPTION' && !nextFocus) nextFocus = focusedElement.previousElementSibling;
    if (!nextFocus) nextFocus = this.querySelector('mdw-option:last-of-type'); // last
    if (nextFocus) nextFocus.focus();
  }

  #onInputSearch(event) {
    const terms = event.target.value.trim();
    if (!terms) return this.#updateOptions();

    const filtered = util.fuzzySearch(terms, this.#options);
    
    const fragment = new DocumentFragment();
    for (const item of filtered) {
      fragment.append(item.element);
    }
    this.replaceChildren(fragment);

    if (filtered.length > 0) {
      const regex = new RegExp(`^${terms}`, 'i');
      if (filtered[0].label.match(regex) === null) {
        this.#textfield.autocomplete = '';
      } else {
        this.#textfield.autocomplete = filtered[0].label;
      }
    } else {
      this.#textfield.autocomplete = '';
    }
  }

  #onInputSearchAsync(event) {
    const terms = event.target.value.trim();
    if (!terms) return this.#updateOptions();
    this.classList.add('mdw-search-async-searching');
    this.#searchAsyncEvent_debounced();
  }

  #searchAsyncEvent(event) {
    this.#input.dispatchEvent(new Event('search', this));
  }

  // set the min width of the select to the input width
  async #setWidth() {
    this.style.minWidth = `${this.#textfield.offsetWidth}px`;
    this.#input.addEventListener('focus', this.#onInputFocus_bound);

    // fonts can cause input widths to change
    await document.fonts.ready;
    this.style.minWidth = `${this.#textfield.offsetWidth}px`;
  }
});
