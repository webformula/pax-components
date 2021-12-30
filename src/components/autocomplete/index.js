import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWSurface from '../surface/service.js';

customElements.define('mdw-autocomplete', class extends HTMLElementExtended {
  constructor() {
    super();
    
    this._rowTemplate = this._defaultTemplate.bind(this);
    this.bound_onBlur = this._onBlur.bind(this);
    this.bound_onFocus = this._onFocus.bind(this);
    this.bound_onInput = this._onInput.bind(this);
    this.bound_onKeydown = this._onKeydown.bind(this);
    this.bound_onClick = this._onClick.bind(this);
    this.bound_mouseDown = this._mouseDown.bind(this);
    this.bound_mouseUp = this._mouseUp.bind(this);
    this.bound_showSpinner = this._showSpinner.bind(this);

    this.input.setAttribute('autocomplete', 'off');
  }

  get input() {
    return this.parentNode.querySelector('input');
  }

  get data() {
    return this._data || [];
  }
  set data(value = []) {
    if (!Array.isArray(value)) console.error('mdw-autocomplete.data must br an array');
    this._data = value;
    this._updateData();
  }

  get rowTemplate() {
    return this._rowTemplate;
  }
  set rowTemplate(callback) {
    if (typeof callback !== 'function') return;
    this._rowTemplate = callback;
  }

  get mdwSuggestions() {
    return this.hasAttribute('mdw-suggestions') && this.getAttribute('mdw-suggestions') !== 'off';
  }
  set mdwSuggestions(value = false) {
    if (value === true || value === 'on') this.setAttribute('mdw-suggestions', 'on');
    else this.removeAttribute('mdw-suggestions');
  }

  get _textfieldElement() {
    return this.parentNode;
  }

  get _spinnerContainer() {
    return this._textfieldElement.querySelector('.mdw-spinner-container');
  }

  get _suggestionHideContainer() {
    return this._textfieldElement.querySelector('.mdw-autocomplete-suggestion .mdw-suggestion-hide');
  }

  get _suggestionShowContainer() {
    return this._textfieldElement.querySelector('.mdw-autocomplete-suggestion .mdw-suggestion-show');
  }

  static get observedAttributes() {
    return ['mdw-suggestions'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'mdw-suggestions':
        this._isSuggestionsEnabled = this.mdwSuggestions;
        break;
    }
  }

  connectedCallback() {
    this.input.addEventListener('focus', this.bound_onFocus);
    this.input.addEventListener('blur', this.bound_onBlur);
    this._textfieldElement.insertAdjacentHTML('beforeend', '<div class="mdw-autocomplete-suggestion"><span class="mdw-suggestion-hide"></span><span class="mdw-suggestion-show"></span></div>');
    this._textfieldElement.insertAdjacentHTML('beforeend', '<span class="mdw-spinner-container"></span>');
  }

  async open() {
    if (!this._canOpen) return;
    if (this._isOpen) return;
    document.body.addEventListener('keydown', this.bound_onKeydown);
    this._isOpen = true;
    this._surfaceElement = await MDWSurface.open({
      mobileComponent: 'panel',
      desktopComponent: 'panel',
      scrollPanelWidthPage: true,
      anchorElement: this.input,
      autoPosition: true,
      position: 'center bottom',
      animation: {
        type: 'scale',
        origin: 'top',
        opacity: true
      },
      classes: 'mdw-auto-complete',
      template: `
        <mdw-content style="min-width: ${this.input.offsetWidth}px" class="mdw-no-padding">
          <mdw-list>
            ${this._data.map((d, i) => this._renderRow(d, i)).join('\n')}
          </mdw-list>
        </mdw-content>
      `
    });

    this.input.addEventListener('input', this.bound_onInput);
    this._surfaceElement.element.addEventListener('click', this.bound_onClick);
    this._surfaceElement.element.addEventListener('mousedown', this.bound_mouseDown);
    this._surfaceElement.element.addEventListener('mouseup', this.bound_mouseUp);

    this._showSuggestion();
  }

  close() {
    if (!this._isOpen) return;
    this._removeSuggestion();
    document.body.removeEventListener('keydown', this.bound_onKeydown);
    this.input.removeEventListener('input', this.bound_onInput);
    this._surfaceElement.element.removeEventListener('click', this.bound_onClick);
    this._surfaceElement.element.removeEventListener('mousedown', this.bound_mouseDown);
    this._surfaceElement.element.removeEventListener('mouseup', this.bound_mouseUp);
    this._unFocusItem();
    this._surfaceElement.close();
    this._surfaceElement = undefined;
    this._isOpen = false;
  }

  loading() {
    this.bound_showSpinner();
  }


  // --- private ---

  _updateData() {
    this._resetFocus();
    this._hideSpinner();
    if (this._data.length === 0) return this.close();

    // first render for data in open
    if (!this._isOpen) return this.open();

    this._surfaceElement.element.querySelector('mdw-list').innerHTML = this._data.map(d => this._renderRow(d)).join('\n');

    this._showSuggestion();
  }

  _showSpinner() {
    if (this._showSpinner === true) return;
    this._showSpinner = true;
    const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
    this._spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="24" class="${isWhite ? 'mdw-white' : 'mdw-grey'}" style="position: absolute; right: 6px; top: calc(50% - 12px);"></mdw-circular-progress>`;
  }

  _hideSpinner() {
    this._showSpinner = false;
    this._spinnerContainer.innerHTML = '';
  }

  _onFocus() {
    this._canOpen = true;
  }

  _onBlur() {
    if (this._mouseIsDown) return;

    this._canOpen = false;
    this.close();
  }

  _onInput() {
    this._showSuggestion();
  }

  _showSuggestion() {
    if (this._isSuggestionsEnabled !== true) return;

    const value = this.input.value;
    if (!value) this._removeSuggestion();

    const match = this._data.find(({ text }) => text.toLowerCase().indexOf(value.toLowerCase()) === 0);

    if (!match) return this._removeSuggestion();
    this._suggestionHideContainer.innerHTML = value;
    this._suggestionShowContainer.innerHTML = match.text.replace(value, '');
  }

  _removeSuggestion() {
    if (this._isSuggestionsEnabled !== true) return;

    this._suggestionHideContainer.innerHTML = '';
    this._suggestionShowContainer.innerHTML = '';
  }

  _mouseDown() {
    this._mouseIsDown = true;
  }

  _mouseUp() {
    this._mouseIsDown = false;
  }

  _onClick(event) {
    const parentElement = this._getItemNode(event.target);
    if (!parentElement) {
      const elementText = event.target.outerHTML;
      const found = this._data.find(({ text }) => elementText.includes(text));
      if (!found) throw Error('mdw-autocomplete: could not match item clicked');

      this.input.value = found.text;
      this.close();
      this.dispatchEvent(new CustomEvent('change', { detail: found }));
      return;
    }

    const index = parentElement.getAttribute('mdw-index');
    const item = this._data[index];
    this.input.value = item.text;
    this.close();
    this.dispatchEvent(new CustomEvent('change', { detail: item }));
  }

  _getItemNode(child) {
    let node = child;
    while (node != null) {
      if (node.nodeName === 'MDW-CONTENT') return;
      if (node.hasAttribute('mdw-index')) return node;
      node = node.parentNode;
    }
  }

  _onKeydown(e) {
    if (!this._isOpen) return;

    switch (e.keyCode) {
      case 40: //down
        this._focusNext();
        break;

      case 38: //up
        this._focusPrevious();
        break;

      case 13: //enter
        this._selectFocused();
        break;

      case 27: //esc
        this.close();
        break;
    }
  }

  _focusNext() {
    if (!this._isOpen) return;

    const elements = [...this._surfaceElement.element.querySelector('mdw-list').children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex += 1;
    if (this._focusIndex > elements.length - 1) this._focusIndex = elements.length - 1;
    this._unFocusItem();

    this._focusedOption = elements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  _focusPrevious() {
    if (!this._isOpen) return;

    const elements = [...this._surfaceElement.element.querySelector('mdw-list').children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    this._unFocusItem();

    this._focusedOption = elements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  _selectFocused() {
    if (!this._isOpen) return;

    const elements = [...this._surfaceElement.element.querySelector('mdw-list').children];

    if (this._focusIndex == undefined || this._focusIndex > elements.length - 1) this._focusIndex = 0;
    
    const value = this._data[this._focusIndex];
    this.input.value = value.text;
    this.close();

    this.dispatchEvent(new CustomEvent('change', { detail: value }));
  }

  _resetFocus() {
    this._unFocusItem();
    this._focusIndex = undefined;
  }

  _unFocusItem() {
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = undefined;
  }

  _defaultTemplate(data) {
    return `<mdw-list-item>${data.text}</mdw-list-item>`;
  }

  _renderRow(data, index) {
    const row = this._rowTemplate(data);

    if (row.includes('mdw-index=')) return row;
    if (row.includes('<mdw-list-item')) return row.replace('<mdw-list-item', `<mdw-list-item mdw-index="${index}"`);
    if (row.indexOf('<div') === 0) return row.trim().replace('<div', `<div mdw-index="${index}"`);

    console.warn('mdw-autocomplete: cannot auto add "mdw-index" attribute to row template, please add mdw-index to guarantee item selection works correctly.');
    return row;
  }
});
