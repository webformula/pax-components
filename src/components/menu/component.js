import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import util from '../../core/util.js';
import './component.css';

// TODO remove control click after checking on mobile
// TODO focus next broken with async search

customElements.define('mdw-menu', class MDWMenu extends HTMLElementExtended {
  useShadowRoot = false;

  #panel;
  #control;
  #itemElementsForSearch;
  #options;
  #isTextField = false;
  #id;
  #focusableElements;
  #lastSearchValue;
  #isAsyncSearch = false;
  #isAsyncSearchOnEnter = false;
  #isInBottomAppBar = this.parentNode.nodeName === 'MDW-BOTTOM-APP-BAR';
  #onControlClick_bound = this.#onControlClick.bind(this);
  #onPanelClick_bound = this.#onPanelClick.bind(this);
  #onPanelHide_bound = this.#onPanelHide.bind(this);
  #onPanelShow_bound = this.#onPanelShow.bind(this);
  #onPanelRender_bound = this.#onPanelRender.bind(this);
  #onKeydown_bound = this.#onKeydown.bind(this);
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onTextFieldInput_debounce_bound = util.debounce(this.#onTextFieldInput, 300).bind(this);


  constructor() {
    super();

    this.#control = this.#getControl();
    this.#isAsyncSearch = this.classList.contains('mdw-async-search');
    this.#isAsyncSearchOnEnter = this.classList.contains('mdw-async-search-on-enter');
    this.#preparePanel();
  }

  get value() {
    if (this.#isTextField) return this.#control.querySelector('input').value;
  }

  get options() {
    return this.#options;
  }
  set options(value = []) {
    this.#options = value;
    this.#panel.template = `
      <ul id="${this.#id}" class="mdw-menu-panel ${value.length === 0 ? 'mdw-no-items' : ''}" style="${!this.#isTextField ? '' : `width: ${this.#control.offsetWidth}px;`}">
        ${!this.#isAsyncSearch ? '' : `<mdw-progress-linear class="mdw-indeterminate"></mdw-progress-linear>`}
        <div class="mdw-no-items">No items</div>  
        ${value.map(value => `<li>${value}</li>`).join('\n')}
      </ul>
    `;
    this.#panel.element.querySelector('.mdw-menu-panel').classList.remove('mdw-async-searching');
    if (this.#panel.showing) this.#panel.resetTemplate();
  }

  connectedCallback() {
    this.#control.addEventListener('click', this.#onControlClick_bound);
    this.#panel.onClick = this.#onPanelClick_bound;
    this.#panel.onShow = this.#onPanelShow_bound;
    this.#panel.onHide = this.#onPanelHide_bound;
    this.#panel.onRender = this.#onPanelRender_bound;

    if (this.#isTextField === true) {
      this.#panel.addIgnoreElement(this.#control);
      this.#control.querySelector('input').addEventListener('input', this.#onTextFieldInput_debounce_bound);
      this.#control.querySelector('input').addEventListener('focus', this.#onControlFocus_bound);
    } else {
      this.#control.addEventListener('focus', this.#onControlFocus_bound);
    }
  }

  disconnectedCallback() {
    this.#control.removeEventListener('click', this.#onControlClick_bound);

    if (this.#isTextField === true) {
      this.#control.querySelector('input').removeEventListener('input', this.#onTextFieldInput_debounce_bound);
      this.#control.querySelector('input').removeEventListener('focus', this.#onControlFocus_bound);
    } else {
      this.#control.removeEventListener('focus', this.#onControlFocus_bound);
    }
  }

  #preparePanel() {
    const ul = this.querySelector(':scope > ul') || document.createElement('ul');
    ul.classList.add('mdw-menu-panel');
    ul.classList.add('mdw-menu-panel-shadow');
    if (ul.hasAttribute('id')) this.#id = ul.getAttribute('id');
    else {
      this.#id = `mdw_menu_ul_${util.getUID()}`;
      ul.setAttribute('id', this.#id);
    }

    const liElements = [...ul.querySelectorAll('li')];
    // set initial options
    this.#options = liElements.map(li => this.#getLabelFromElement(li));
    liElements.forEach(e => {
      if (!e.hasAttribute('tabindex')) e.setAttribute('tabindex', '0');
      if (e.hasAttribute('selected')) e.setAttribute('aria-selected', 'true');
    });
    // set aria roles and prepare selected value
    if (this.#isTextField) {
      ul.style.minWidth = `${this.#control.offsetWidth}px`;
      this.#control.querySelector('input').setAttribute('aria-own', this.#id);
      ul.setAttribute('role', 'listbox');
      liElements.forEach(e => e.setAttribute('role', 'option'));

      const defaultSelected = liElements.find(element => element.hasAttribute('selected'));
      if (defaultSelected) this.#control.querySelector('input').value = this.#getLabelFromElement(defaultSelected);
    } else {
      this.#control.setAttribute('aria-own', this.#id);
      ul.setAttribute('role', 'menu');
      liElements.forEach(e => e.setAttribute('role', 'menuitem'));
    }

    const noItems = document.createElement('dic');
    noItems.innerHTML = 'No items';
    noItems.classList.add('mdw-no-items');
    ul.insertAdjacentElement('afterbegin', noItems);

    if (this.#isAsyncSearch) {
      const progress = document.createElement('mdw-progress-linear');
      progress.classList.add('mdw-indeterminate');
      ul.insertAdjacentElement('afterbegin', progress);
    }

    this.#panel = new Panel();
    this.#panel.template = ul.outerHTML;
    this.#panel.backdrop = false;
    this.#panel.clickOutsideToClose = true;
    this.#panel.targetElement = this.#control;

    // position menu above app bar https://m3.material.io/components/bottom-app-bar/guidelines
    if (this.#isInBottomAppBar) {
      this.#panel.targetElement = this.parentNode;
      this.#panel.offsetY = 10;
      this.#panel.offsetX = 10;
    }

    ul.remove();
  }

  #onControlClick() {
    if (this.#isTextField && this.#panel.showing === true) return;
    // this.#panel.toggle(); // TODO figure out if onControlFocus always covers this
  }

  #onControlFocus() {
    this.#panel.show();
  }

  // delay close so button press animation is seen
  #onPanelClick(event) {
    if (this.#isTextField && event.target.nodeName === 'LI') {
      this.#handleTextFieldSelect(event.target);
    }

    this.#panel.lock();
    setTimeout(() => {
      this.#panel.hide();
    }, 40);
  }

  #onPanelRender() {
    const liElements = [...this.#panel.element.querySelectorAll('li')];

    // update options on open
    this.#options = liElements.map(li => this.#getLabelFromElement(li));
    this.#panel.element.querySelector('.mdw-menu-panel').classList.toggle('mdw-no-items', this.#options.length === 0);

    if (this.#isTextField === true) {
      this.#control.classList.add('mdw-raise-label');
      this.#itemElementsForSearch = liElements.map(element => ({
        element,
        label: this.#getLabelFromElement(element)
      }));
      this.#updateSelectedItemDisplay();
    }
    this.#focusableElements = [...this.#panel.element.querySelectorAll('li:not([tabindex="-1"]')];
  }

  #onPanelShow() {
    document.body.addEventListener('keydown', this.#onKeydown_bound);
  }

  #onPanelHide() {
    if (this.#isTextField === true) {
      this.#control.autocomplete = '';
      this.#control.classList.remove('mdw-raise-label');
    }
    this.#panel.element.querySelector('.mdw-menu-panel').classList.remove('mdw-async-searching');
    document.body.removeEventListener('keydown', this.#onKeydown_bound);
  }

  #getControl() {
    let firstChild = this.firstChild;
    while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
      firstChild = firstChild.nextSibling;
    }
    if (firstChild.nodeName === 'MDW-TEXT-FIELD') this.#isTextField = true;
    return firstChild;
  }

  #onTextFieldInput(event) {    
    // panel can be closed by hitting enter on search
    if (!this.#panel.showing) this.#panel.show();

    if (this.#isAsyncSearch) {
      if (!this.#isAsyncSearchOnEnter) {
        this.#panel.element.querySelector('.mdw-menu-panel').classList.add('mdw-async-searching');
        const input = this.#control.querySelector('input');
        input.dispatchEvent(new Event('search', this));
        this.#lastSearchValue = input.value;
      }
      return;
    }


    if (!event.target.value.trim()) {
      this.#panel.resetTemplate();
      return;
    }

    const filtered = util.fuzzySearch(event.target.value, this.#itemElementsForSearch);

    const fragment = new DocumentFragment();
    for (const item of filtered) {
      fragment.append(item.element);
    }

    this.#panel.element.querySelector('.mdw-menu-panel').replaceChildren(fragment);

    if (filtered.length > 0) {
      const regex = new RegExp(`^${event.target.value}`, 'i');
      if (filtered[0].label.match(regex) === null) {
        this.#control.autocomplete = '';
        return;
      }

      this.#control.autocomplete = filtered[0].label.replace(regex, '');
    } else {
      this.#control.autocomplete = '';
    }
  }

  #handleTextFieldSelect(element) {
    this.#control.querySelector('input').value = this.#getLabelFromElement(element);
    this.#control.autocomplete = '';
    this.#updateSelectedItemDisplay();
    this.dispatchEvent(new Event('change', this));
  }

  #updateSelectedItemDisplay() {
    const currentSelected = this.#itemElementsForSearch.find(({ element }) => element.hasAttribute('selected'));
    if (currentSelected) {
      currentSelected.element.removeAttribute('selected');
      currentSelected.element.removeAttribute('selected');
    }

    const textFieldValue = this.#control.querySelector('input').value;
    const selectedItem = this.#itemElementsForSearch.find(({ label }) => label === textFieldValue);
    if (selectedItem) {
      selectedItem.element.setAttribute('selected', 'true');
      selectedItem.element.setAttribute('aria-selected', 'true');
      selectedItem.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  #getLabelFromElement(element) {
    const labelElement = element.querySelector(':scope > .mdw-label');
    let label;
    if (labelElement) label = labelElement.innerText;
    else label = element.innerText;
    return label;
  }

  #onKeydown(event) {
    const { key, keyCode, shiftKey } = event;
    const escape = key === 'Escape' || keyCode === 27;
    const tab = key === 'Tab' || keyCode === 9;
    const enter = key === 'Enter' || keyCode === 13;
    const downArrow = key === 'ArrowDown' || keyCode === 40;
    const rightArrow = key === 'ArrowRight' || keyCode === 39;
    const upArrow = key === 'ArrowUp' || keyCode === 38;
    const leftArrow = key === 'ArrowLeft' || keyCode === 37;

    if (escape && this.#panel.clickOutsideToClose === true) this.#panel.hide();

    if ((tab && !shiftKey) || downArrow || rightArrow) {
      this.#focusNextElement();
      event.preventDefault();
    } else if ((tab && shiftKey) || upArrow || leftArrow) {
      this.#focusPreviousElement();
      event.preventDefault();
    }
    
    if (enter) {
      if (this.#isTextField && document.activeElement.nodeName === 'INPUT') {

        // prevent item select when search input has changed
        const isSearchChange = this.#isAsyncSearch && this.#lastSearchValue !== document.activeElement.value;
        this.#lastSearchValue = document.activeElement.value;
        this.#panel.element.querySelector('.mdw-menu-panel').classList.add('mdw-async-searching');

        if (!isSearchChange && this.#panel.element.querySelector('.mdw-menu-panel').children.length > 0) {
          this.#handleTextFieldSelect(this.#panel.element.querySelector('.mdw-menu-panel').children[0]);
          this.#panel.hide();
          return;
        }
      }

      const isItem = this.#panel.element.contains(document.activeElement) && document.activeElement.nodeName === 'LI';
      if (isItem) {
        if (this.#isTextField) this.#handleTextFieldSelect(document.activeElement);
        else event.target.click();
        this.#panel.hide();
      }
    }
  }

  #focusNextElement() {
    const lastIndex = this.#focusableElements.length - 1;
    const indexOfFocus = this.#focusableElements.indexOf(document.activeElement);
    if (indexOfFocus === -1) {
      const currentSelected = this.#itemElementsForSearch.find(({ element }) => element.hasAttribute('selected'));
      if (currentSelected) {
        const indexOfCurrent = this.#focusableElements.indexOf(currentSelected.element);
        if (indexOfCurrent === lastIndex) this.#focusableElements[0].focus();
        else this.#focusableElements[indexOfCurrent + 1].focus();
      } else this.#focusableElements[0].focus();
    }

    else if (indexOfFocus === lastIndex) this.#focusableElements[0].focus();
    else this.#focusableElements[indexOfFocus + 1].focus();
  }

  #focusPreviousElement() {
    const lastIndex = this.#focusableElements.length    - 1;
    const indexOfFocus = this.#focusableElements.indexOf(document.activeElement);

    if (indexOfFocus === -1) {
      const currentSelected = this.#itemElementsForSearch.find(({ element }) => element.hasAttribute('selected'));
      if (currentSelected) {
        const indexOfCurrent = this.#focusableElements.indexOf(currentSelected.element);
        if (indexOfCurrent === 0) this.#focusableElements[lastIndex].focus();
        else this.#focusableElements[indexOfCurrent - 1].focus();
      } else this.#focusableElements[0].focus();
    }

    else if (indexOfFocus === 0) this.#focusableElements[lastIndex].focus();
    else this.#focusableElements[indexOfFocus - 1].focus();
  }
});
