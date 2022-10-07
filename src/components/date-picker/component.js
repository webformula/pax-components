import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './component.css';
import './desktop.js';

customElements.define('mdw-date-picker', class MDWDatePicker extends HTMLElementExtended {
  useShadowRoot = false;

  #id = this.getAttribute('id') || `mdw-date-picker-${util.getUID()}`;
  #value = '';
  #displayDate = '';
  #panel;
  #control;
  #isTextField = false;
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onPanelRender_bound = this.#onPanelRender.bind(this);
  #onPanelHide_bound = this.#onPanelHide.bind(this);


  constructor() {
    super();

    this.setAttribute('id', this.#id);
    this.#control = this.parentNode;
    if (this.#control.nodeName === 'MDW-TEXT-FIELD') {
      this.#isTextField = true;
      this.#control.classList.add('mdw-has-date-picker');
    }

    if (this.#isTextField) this.value = this.#control.querySelector('input').value;
    else if (his.hasAttribute('value')) this.value = this.getAttribute('value');

    this.#displayDate = dateUtil.parse(this.value ? this.value : dateUtil.today());

    this.#preparePanel();
  }

  get value() {
    return this.#value && dateUtil.format(this.#value, 'YYYY-MM-dd');
  }
  set value(value) {
    this.#value = value && dateUtil.parse(value);
  }

  get displayDate() {
    return this.#displayDate;
  }

  connectedCallback() {
    if (this.#isTextField) {
      this.#control.querySelector('input').addEventListener('focus', this.#onControlFocus_bound);
    } else {
      this.#control.addEventListener('focus', this.#onControlFocus_bound);
    }
  }

  disconnectedCallback() {
    if (this.#isTextField) {
      this.#control.querySelector('input').removeEventListener('focus', this.#onControlFocus_bound);
    } else {
      this.#control.removeEventListener('focus', this.#onControlFocus_bound);
    }
  }

  setValueDate(date) {
    this.#value = date;
    if (this.#isTextField) this.#control.querySelector('input').value = this.value;
  }

  setDisplayDate(date) {
    this.#displayDate = date;
  }

  hide() {
    this.#panel.hide();
  }

  #onPanelRender() {
    
  }

  #onPanelHide() {
  }

  #onControlFocus() {
    this.#panel.show();
  }

  #preparePanel() {
    this.#panel = new Panel();
    this.#panel.classes = 'mdw-date-picker-panel';
    this.#panel.template = this.template();
    this.#panel.backdrop = false;
    this.#panel.clickOutsideToClose = true;
    this.#panel.targetElement = this.#control;
    this.#panel.onRender = this.#onPanelRender_bound;
    this.#panel.onHide = this.#onPanelHide_bound;
    this.#panel.addIgnoreElement(this.#control);
  }

  template() {
    return /* html */`
      <mdw-date-picker-desktop mdw-date-picker-id="${this.#id}"></mdw-date-picker-desktop>
    `;
  }
});
