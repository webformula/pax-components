import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import { call } from 'file-loader';
import MDWUtils from '../../core/Utils.js';
import MDWSurface from '../surface/service.js';

customElements.define('mdw-autocomplete', class extends HTMLElementExtended {
  constructor() {
    super();
    
    this._templateCallback = this.defaultTemplate.bind(this);

    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onKeydown = this.onKeydown.bind(this);
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
    this.updateData();
  }

  get templateCallback() {
    return this._templateCallback;
  }
  set templateCallback(callback) {
    if (typeof callback !== 'function') return;
    this._templateCallback = callback;
  }

  connectedCallback() {
    this.input.addEventListener('focus', this.bound_onFocus);
    this.input.addEventListener('blur', this.bound_onBlur);
  }

  updateData() {
    this._focusIndex = 0;
    if (this._data.length === 0) return this.close();
    
    this.resetFocus();

    // first render for data in open
    if (!this._isOpen) return this.open();

    this._surfaceElement.element.querySelector('mdw-list').innerHTML = this._data.map(d => this._templateCallback(d)).join('\n');
  }

  onFocus() {
    this._canOpen = true;
  }

  onBlur() {
    this._canOpen = false;
    this.close();
  }

  onKeydown(e) {
    if (!this._isOpen) return;

    switch (e.keyCode) {
      case 40: //down
        this.focusNext();
        break;

      case 38: //up
        this.focusPrevious();
        break;

      case 13: //enter
        this.selectFocused();
        break;

      case 27: //esc
        this.close();
        break;
    }
  }

  focusNext() {
    if (!this._isOpen) return;

    const elements = [...this._surfaceElement.element.querySelector('mdw-list').children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex += 1;
    if (this._focusIndex > elements.length - 1) this._focusIndex = elements.length - 1;
    this.unFocusItem();

    this._focusedOption = elements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusPrevious() {
    if (!this._isOpen) return;

    const elements = [...this._surfaceElement.element.querySelector('mdw-list').children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    this.unFocusItem();

    this._focusedOption = elements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  selectFocused() {
    if (!this._isOpen) return;

    const elements = [...this._surfaceElement.element.querySelector('mdw-list').children];

    if (this._focusIndex == undefined || this._focusIndex > elements.length - 1) this._focusIndex = 0;
    
    const value = this._data[this._focusIndex];
    this.input.value = value.text;
    this.close();

    this.dispatchEvent(new CustomEvent('change', { detail: value }));
  }

  resetFocus() {
    this.unFocusItem();
    this._focusIndex = undefined;
  }

  unFocusItem() {
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = undefined;
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
      template: `
        <mdw-content style="min-width: ${this.input.offsetWidth}px" class="mdw-no-padding">
          <mdw-list>
            ${this._data.map(d => this._templateCallback(d)).join('\n')}
          </mdw-list>
        </mdw-content>
      `
    });
  }

  close() {
    if (!this._isOpen) return;
    document.body.removeEventListener('keydown', this.bound_onKeydown);
    this.unFocusItem();
    this._surfaceElement.close();
    this._surfaceElement = undefined;
    this._isOpen = false;
  }

  defaultTemplate(data) {
    return `<mdw-list-item>${data.text}</mdw-list-item>`;
  }
});
