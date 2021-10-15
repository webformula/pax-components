import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWSurface from '../surface/service.js';

customElements.define('mdw-autocomplete', class extends HTMLElementExtended {
  constructor() {
    super();
    
    this._rowTemplate = this._defaultTemplate.bind(this);

    this.bound_onBlur = this._onBlur.bind(this);
    this.bound_onFocus = this._onFocus.bind(this);
    this.bound_onKeydown = this._onKeydown.bind(this);
    this.bound_onClick = this._onClick.bind(this);
    this.bound_mouseDown = this._mouseDown.bind(this);
    this.bound_mouseUp = this._mouseUp.bind(this);
    this.bound_showSpinner = this._showSpinner.bind(this);
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

  get _textfieldElement() {
    return this.parentNode;
  }

  get _spinnerContainer() {
    return this._textfieldElement.querySelector('.mdw-spinner-container');
  }

  connectedCallback() {
    this.input.addEventListener('focus', this.bound_onFocus);
    this.input.addEventListener('blur', this.bound_onBlur);

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

    this._surfaceElement.element.addEventListener('click', this.bound_onClick);
    this._surfaceElement.element.addEventListener('mousedown', this.bound_mouseDown);
    this._surfaceElement.element.addEventListener('mouseup', this.bound_mouseUp);
  }

  close() {
    if (!this._isOpen) return;
    document.body.removeEventListener('keydown', this.bound_onKeydown);
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
    this._focusIndex = 0;
    if (this._data.length === 0) return this.close();

    this._resetFocus();
    this._hideSpinner();

    // first render for data in open
    if (!this._isOpen) return this.open();

    this._surfaceElement.element.querySelector('mdw-list').innerHTML = this._data.map(d => this._rowTemplate(d)).join('\n');
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

  _mouseDown() {
    this._mouseIsDown = true;
  }

  _mouseUp() {
    this._mouseIsDown = false;
  }

  _onClick(event) {
    if (!this.hasAttribute('mdw-index')) {
      const elementText = event.target.outerHTML;
      const found = this._data.find(({ text }) => elementText.includes(text));
      if (!found) throw Error('mdw-autocomplete: could not match item clicked');

      this.input.value = found.text;
      this.close();
      this.dispatchEvent(new CustomEvent('change', { detail: found }));
      return;
    }

    const index = event.target.getAttribute('mdw-index');
    const item = this._data[index];
    this.input.value = item.text;
    this.close();
    this.dispatchEvent(new CustomEvent('change', { detail: item }));
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
