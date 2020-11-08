import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWUtils from '../../core/Utils.js';
import MDWSurface from '../surface/service.js';


// TODO implement validity

customElements.define('mdw-select', class extends HTMLElementExtended {
  constructor() {
    super();

    this._handleLabel();
    this._handleEnhanced();
    this.cloneTemplate(true);

    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onChange = this.onChange.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
    this.bound_onKeyDown = this.onKeyDown.bind(this);
  }

  connectedCallback() {
    if (this.isEnhanced) {
      if (this._selected) this.value = this._selected.value;
      this.shadowRoot.querySelector('render-block').addEventListener('click', this.bound_onClick);
      document.body.addEventListener('keydown', this.bound_onKeyDown);
    } else {
      this.selectElement.addEventListener('focus', this.bound_onFocus);
      this.selectElement.addEventListener('blur', this.bound_onBlur);
      this.selectElement.addEventListener('change', this.bound_onChange);
    }

    // capture option selected attribute and float the label
    this.onChange();
  }

  disconnectedCallback() {
    if (this.isEnhanced) {
      this.shadowRoot.querySelector('render-block').removeEventListener('click', this.bound_onClick);
      document.body.removeEventListener('keydown', this.bound_onKeyDown);
    } else {
      this.selectElement.removeEventListener('focus', this.bound_onFocus);
      this.selectElement.removeEventListener('blur', this.bound_onBlur);
      this.selectElement.removeEventListener('change', this.bound_onChange);
    }
  }

  get value() {
    if (this.isEnhanced) return this._value;
    return this.selectElement.value || this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange();
    this.dispatchEvent(new Event('change'));
  }

  get selectElement() {
    return MDWUtils.querySlotted(this, 'select');
  }

  get label() {
    return this.shadowRoot.querySelector('label');
  }

  get labelWidth() {
    return this.label.offsetWidth * 0.9;
  }

  get enhancedElementId() {
    if (!this._enhancedElementId) this._enhancedElementId = `select-enhanced-${MDWUtils.uid()}`;
    return this._enhancedElementId;
  }

  get panel() {
    return document.querySelector(`#${this.enhancedElementId}`);
  }

  get sheet() {
    return document.querySelector(`#${this.enhancedElementId}`);
  }

  get isEnhanced() {
    return this.getAttribute('mdw-enhanced') !== null;
  }

  get outlined() {
    return [].slice.apply(this.classList || []).includes('mdw-outlined');
  }

  get notch() {
    if (!this._notch) this._notch = this.shadowRoot.querySelector('.mdw-outlined-notch');
    return this._notch;
  }




  _handleLabel() {
    const label = this.querySelector('label');
    if (label) {
      this._labelText = label.innerText;
      label.remove();
    }
  }

  _handleEnhanced() {
    if (!this.isEnhanced) return;

    // setup options for generating a list
    this._optionsMap = [...this.querySelectorAll('option')].map(el => {
      return {
        text: el.innerText,
        value: el.value,
        selected: el.hasAttribute('selected')
      };
    });

    this._selected = (this._optionsMap.filter(({ selected }) => selected === true)[0] || { text: '', value: '' });

    // transfer onchange event
    const selectElement = this.querySelector('select'); // <select> is the parent element for options. This is not the selected option
    if (selectElement) {
      const selectOnchange = selectElement.getAttribute('onchange');
      if (selectOnchange) this.setAttribute('onchange', selectOnchange);
      selectElement.remove();
    }
  }

  onFocus() {
    this.classList.add('mdw-focused');
    if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
  }

  onBlur() {
    this.classList.remove('mdw-focused');
    this.classList.toggle('mdw-not-empty', this.value);

    MDWUtils.unlockPageScroll();
  }

  onChange() {
    if (this.value && this.label) {
      this.label.classList.add('mdw-select--float-above');
      this.label.classList.remove('mdw-empty-no-float');
      if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
    } else {
      this.label.classList.remove('mdw-select--float-above');
      this.label.classList.add('mdw-empty-no-float');
      if (this.outlined) this.notch.style.width = '0';
    }
  }


  async onClick(event) {
    // handle focus
    this._focusIndex === undefined;
    this.onFocus();
    MDWUtils.lockPageScroll();

    this._surfaceElement = await MDWSurface.open({
      mobileComponent: 'sheetBottom',
      desktopComponent: 'panel',
      scrollPanelWidthPage: true,
      anchorElement: this,
      animation: {
        type: 'scale',
        origin: 'top',
        opacity: true
      },
      template: `
        <mdw-content style="min-width: ${this.offsetWidth}px" class="mdw-no-padding">
          <mdw-list>
            ${this._optionsMap.map(({ text, value, selected }) => `
              <mdw-list-item value="${value}"${selected ? ' selected' : ''}>${text}</mdw-list-item>
            `).join('\n')}
          </mdw-list>
        </mdw-content>
      `
    });

    // handle panel element
    if (this._surfaceElement && this._surfaceElement.element.nodeName === 'MDW-PANEL') {
      this._surfaceElement.element.clickBodyToClose();
      this._surfaceElement.element.addEventListener('click', this.bound_onPanelClick);
      this._surfaceElement.element.addEventListener('MDWPanel:closed', () => {
        this._surfaceElement = undefined;
        this.onBlur();
      });
    }

    if (this._surfaceElement && this._surfaceElement.element.nodeName === 'MDW-SHEET-BOTTOM') {
      this._surfaceElement.element.addEventListener('click', this.bound_onPanelClick);
      this._surfaceElement.element.addEventListener('MDWSheet:closed', () => {
        this._surfaceElement = undefined;
        this.onBlur();
      });
    }
  }

  onPanelClick(event) {
    if (!event.target.hasAttribute('value')) return;
    this.value = event.target.getAttribute('value');
    this.setSelectedText(event.target.innerText);

    // handle current selection
    const currentSelected = this._surfaceElement.element.querySelector('[selected]');
    if (currentSelected) {
      currentSelected.removeAttribute('selected');
      const oldMatch = this._optionsMap.find(({ value }) => value === currentSelected.getAttribute('value'));
      if (oldMatch) oldMatch.selected = false;
    }

    // handle new selection
    event.target.setAttribute('selected', '');
    const newMatch = this._optionsMap.find(({ value }) => value === event.target.getAttribute('value'));
    if (newMatch) newMatch.selected = true;
    console.log(this._optionsMap);
    
    this._surfaceElement.close();
    this._surfaceElement = undefined;
    this.onBlur();
  }

  setSelectedText(value) {
    this.shadowRoot.querySelector('.mdw-select__selected-text').innerText = value;
  }


  // --- key controls ---

  onKeyDown(event) {
    // open if focused
    if (!this._surfaceElement && this.classList.contains('mdw-focused')) {
      this.onClick();
      event.preventDefault();
      return;
    }

    if (!this._surfaceElement || this._surfaceElement.element.nodeName !== 'MDW-PANEL' || !this._surfaceElement.element.isOpen()) return;

    switch (event.keyCode) {
      case 40: //down
      case 39: //right
        this.focusNext();
        event.preventDefault();
        break;

      case 38: //up
      case 37: //left
        this.focusPrevious();
        event.preventDefault();
        break;

      case 13: //enter
        this.selectFocused();
        event.preventDefault();
        break;

      default:
        if (event.keyCode >= 31 || event.keyCode <= 90) {
          const nodeIndex = this.keyboardSearchNodes(event.keyCode);
          if (nodeIndex !== undefined) this.selectNode(nodeIndex);
          event.stopPropagation();
          event.preventDefault();
        }
    }
  }

  // key searching
  //   if you press "s" then it will find the first item that starts with an "s"
  //   if you press "s" then "t" it will find the first item that starts with an "st"
  keyboardSearchNodes(keyCode) {
    if (this._clearSearchTimeout !== undefined) clearTimeout(this._clearSearchTimeout);
    this._clearSearchTimeout = setTimeout(() => {
      this._clearSearchTimeout = undefined;
      this._keyboardSearchStr = '';
      this._keyboardOptionNames = undefined;
    }, 300);
    if (this._keyboardSearchStr === undefined) this._keyboardSearchStr = '';
    this._keyboardSearchStr += String.fromCharCode(keyCode);
    const search = new RegExp('^' + this._keyboardSearchStr, 'i');

    if (!this._keyboardOptionNames) this._keyboardOptionNames = [...this._surfaceElement.element.querySelectorAll('mdw-list-item')].map(el => el.innerText);

    const length = this._keyboardOptionNames.length;
    let i = 0;
    while (i < length) {
      if (search.test(this._keyboardOptionNames[i])) {
        return i;
      }
      i += 1;
    }
  }

  selectNode(index) {
    const optionElements = [...this._surfaceElement.element.querySelectorAll('mdw-list-item')];
    this._focusIndex = index;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusNext() {
    const optionElements = [...this._surfaceElement.element.querySelectorAll('mdw-list-item')];
    if (this._focusIndex === undefined) {
      const index = optionElements.findIndex(el => el.classList.contains('mdw-focused'));
      if (index >= 0) this._focusedOption = optionElements[index];
      this._focusIndex = index <= 0 ? 1 : index + 1;
    } else this._focusIndex += 1;
    if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusPrevious() {
    const optionElements = [...this._surfaceElement.element.querySelectorAll('mdw-list-item')];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  selectFocused() {
    const optionElements = [...this._surfaceElement.element.querySelectorAll('mdw-list-item')];
    if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
    this.onPanelClick({ target: optionElements[this._focusIndex] });
  }



  template() {
    return `
      <i class="mdw-select__icon"></i>
      ${!this.isEnhanced ? '<slot></slot>' : `
        <div class="mdw-select__selected-text">${this._selected.text}</div>
      `}
      <label>${this._labelText}</label>
      ${this.outlined ? '' : '<div class="mdw-line-ripple"></div>'}
      ${!this.outlined ? '' : `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `}
    `;
  }

  styles() {
    return /* css */`
      :host-context(.mdw-density-comfortable) .mdw-select__icon {
        bottom: 15px;
      }

      :host-context(.mdw-density-comfortable) .mdw-select__selected-text {
        height: 48px;
        padding-top: 16px;
      }

      :host(.mdw-outlined):host-context(.mdw-density-comfortable) .mdw-select__icon {
        bottom: 20px;
      }
      
      :host(.mdw-outlined):host-context(.mdw-density-comfortable) label {
        top: 18px;
      }

      :host-context(.mdw-density-compact) .mdw-select__icon {
        bottom: 12px;
      }

      :host(.mdw-outlined):host-context(.mdw-density-compact) .mdw-select__icon {
        top: 18px;
      }

      :host(.mdw-outlined):host-context(.mdw-density-compact) label {
        top: 12px;
      }

      :host-context(.mdw-density-compact) .mdw-select__selected-text {
        height: 40px;
        line-height: 1.1rem;
      }

      :host-context(.mdw-density-compact) ::slotted(select) {
        height: 40px;
        padding-top: 12px;
      }

      :host-context(.mdw-density-compact) label {
        top: 16px;
      }

      :host(.mdw-outlined.mdw-focused):host-context(.mdw-density-compact) label,
      :host(.mdw-outlined):host-context(.mdw-density-compact) label.mdw-select--float-above {
        transform: translateY(-100%) scale(0.75);
      }

      ::slotted(label.mdw-empty-no-float) {
        transform: none;
      }

      .mdw-select__icon {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        position: absolute;
        bottom: 23px;
        left: auto;
        right: 16px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--mdw-theme-on-secondary);
      }

      :host(:not(.mdw-select--disabled)) ::slotted(select),
      :host(:not(.mdw-select--disabled)) .mdw-select__selected-text {
        border-bottom-color: rgba(var(--mdw-theme-on-background--rgb), 0.54);
        color: var(--mdw-theme-on-primary);
      }

      ::slotted(select),
      .mdw-select__selected-text {
        position: absolute;
        padding: 20px 52px 4px 16px;
        font-family: Roboto,sans-serif;
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 400;
        letter-spacing: .009375em;
        text-decoration: inherit;
        text-transform: inherit;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        border: none;
        border-bottom: 1px solid;
        outline: none;
        background-color: transparent;
        color: inherit;
        white-space: nowrap;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      /* outlined */
      :host(.mdw-outlined) ::slotted(select),
      :host(.mdw-outlined) .mdw-select__selected-text {
        padding: 12px 52px 12px 16px;
        display: flex;
        border: none;
        background-color: transparent;
        z-index: 1;
      }
      :host(.mdw-outlined) ::slotted(select) {
        border-radius: 4px;
      }

      ::slotted(select) {
        border-radius: 4px 4px 0 0;
      }

      :host([dir=rtl]) ::slotted(select),
      ::slotted(select[dir=rtl]),
      :host([dir=rtl]) .mdw-select__selected-text,
      .mdw-select__selected-text[dir=rtl] {
        padding-left: 52px;
        padding-right: 16px;
      }


      label {
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 400;
        letter-spacing: 0.009375em;
        text-decoration: inherit;
        text-transform: inherit;
        position: absolute;
        left: 0;
        transform-origin: left top;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        line-height: 1.15rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: text;
        overflow: hidden;
        will-change: transform;
        transform: none;
        pointer-events: none;
        color: rgba(var(--mdw-theme-on-background--rgb), .6);
        z-index: 1;

        left: 16px;
        right: initial;
        top: 21px;
      }

      :host(.mdw-no-animation) label {
        transition: none;
      }

      label:not(.mdw-empty-no-float) {
        transform: translateY(-70%) scale(0.75);
      }

      ::slotted(select:focus) + label,
      label.mdw-select--float-above {
        transform: translateY(-70%) scale(0.75);
      }

      :host(.mdw-outlined) label.mdw-select--float-above {
        transform: translateY(-132%) scale(0.75);
      }

      :host(.mdw-select--with-leading-icon) label {
        left: 48px;
        right: initial;
      }

      :host(.mdw-outlined) label {
        left: 15px;
        right: initial;
        top: 18px;
      }

      :host(.mdw-outlined.mdw-select--with-leading-icon) label {
        left: 36px;
        right: initial;
      }

      :host(.mdw-outlined.mdw-select--with-leading-icon) label.mdw-select--float-above {
        left: 36px;
        right: initial;
      }

      .mdw-outlined-border-container {
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        height: 100%;
        text-align: left;
        pointer-events: none;
      }

      .mdw-outlined-leading {
        border-radius: 4px 0 0 4px;
        border-left: 1px solid;
        border-right: none;
        width: 12px;
      }

      .mdw-outlined-notch {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: calc(100% - 12px * 2);
      }

      .mdw-outlined-trailing {
        border-left: none;
        border-right: 1px solid;
        border-radius: 0 4px 4px 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
      }

      .mdw-outlined-leading,
      .mdw-outlined-notch,
      .mdw-outlined-trailing {
        box-sizing: border-box;
        height: 100%;
        border-top: 1px solid;
        border-bottom: 1px solid;
        pointer-events: none;

        border-color: rgba(var(--mdw-theme-on-background--rgb), 0.54);
      }

      :host(.mdw-focused:not([mdw-no-float])) .mdw-outlined-notch,
      :host(.mdw-not-empty:not([mdw-no-float])) .mdw-outlined-notch {
        border-top: none;
      }

      :host(.mdw-focused) .mdw-outlined-leading,
      :host(.mdw-focused) .mdw-outlined-notch,
      :host(.mdw-focused) .mdw-outlined-trailing,
      ::slotted(select:focus) .mdw-outlined-leading,
      ::slotted(select:focus) .mdw-outlined-notch,
      ::slotted(select:focus) .mdw-outlined-trailing {
        border-width: 2px;
        border-color: var(--mdw-theme-primary);
      }

      :host(.invalid) .mdw-outlined-leading,
      :host(.invalid) .mdw-outlined-notch,
      :host(.invalid) .mdw-outlined-trailing {
        border-color: var(--mdw-theme-error);
      }

      /* shaped */
      :host(.mdw-shaped) {
        border-radius: var(--mdw-theme--button-shape-radius, 18px);
        /* border: none; */
      }

      :host(.mdw-shaped) .mdw-outlined-leading {
        border-radius: var(--mdw-theme--button-shape-radius, 18px) 0 0 var(--mdw-theme--button-shape-radius, 18px);
        border-left: 1px solid;
        border-right: none;
        width: 24px;
      }

      :host(.mdw-shaped) .mdw-outlined-trailing {
        border-radius: 0 var(--mdw-theme--button-shape-radius, 18px) var(--mdw-theme--button-shape-radius, 18px) 0;
      }

      :host(.mdw-shaped:not(.mdw-outlined)):after,
      :host(.mdw-shaped:not(.mdw-outlined)):before  {
        border-radius: var(--mdw-theme--button-shape-radius, 18px);
        /* border: none; */
      }


      /* no float label */
      :host([mdw-no-float]) label.mdw-select--float-above {
        opacity: 0;
      }

      :host([mdw-no-float]) label {
        transform: none !important;
      }

      
      /* density */
      :host(.mdw-density-comfortable) {
        height: 48px !important;
      }

      :host(.mdw-density-comfortable) label {
        top: 16px;
      }

      :host(.mdw-density-comfortable) ::slotted(select:focus) + label,
      :host(.mdw-density-comfortable) label.mdw-select--float-above {
        transform: translateY(-120%) scale(.75);
      }

     :host(.mdw-density-compact) {
        height: 40px !important;
      }

      :host(.mdw-density-compact) label {
        top: 12px;
      }

      :host(.mdw-density-compact) ::slotted(select:focus) + label,
      :host(.mdw-density-compact) label.mdw-select--float-above {
        transform: translateY(-100%) scale(.75);
      }
    `;
  }
});
