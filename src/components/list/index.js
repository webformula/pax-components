import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-list', class extends HTMLElementExtended {
  constructor() {
    super();
    this.selectedIndexes_ = [];
    this.selectType = this.getAttribute('mdw-select');
  }

  static get observedAttributes() {
    return ['mdw-select', 'mdw-select-onclick'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-select':
        this.selectType = newValue;
        break;
      case 'mdw-select-onclick':
        this.selectOnclick = newValue !== null;
        break;
    }
  }

  connectedCallback() {
    if (this.hasAttribute('mdw-select')) {
      const items = [...this.querySelectorAll('mdw-list-item')];
      const keys = items.map(el => el.getAttribute('mdw-key')).filter(v => !!v);
      if (keys.length === items.length) {
        const deDup = Object.entries(Object.fromEntries(keys.map(v => ([v, true]))));
        if (items.length !== deDup.length) {
          this._doNotUseKeys = true;
          throw Error('[mdw-key] values on mdw-list-item cannot have duplicates');
        }
      }
    }
  }

  set selectOnclick(value) {
    this.selectOnclick_ = value;
  }

  get selectOnclick() {
    return this.selectOnclick_;
  }

  set selectType(value) {
    if (value === null) return;
    if (!['single', 'multiple'].includes(value)) console.warn('mdw-list[mdw-select] attribute - only accepts "single" or "multiple"');
    this.selectType_ = value;
  }

  get selectType() {
    return this.selectType_;
  }

  get selected() {
    return [].concat(this.selectedIndexes_);
  }

  deselectAll() {
    [...this.querySelectorAll('mdw-list-item')].forEach(child => child.deselect());
    this.selectedIndexes_ = [];
  }

  itemSelected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    const selectValue = !this._doNotUseKeys && listItem.key ? listItem.key : index;
    if (this.selectType_ === 'single') {
      if (!this._doNotUseKeys && listItem.key) {
        this.selectedIndexes_.forEach(key => this.querySelector(`[mdw-key="${key}"]`).deselect());
      } else {
        const children = [...this.children];
        this.selectedIndexes_.forEach(i => children[i].deselect());
      }

      this.selectedIndexes_ = [];
    }
    this.selectedIndexes_.push(selectValue);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    const key = !this._doNotUseKeys && listItem.key ? listItem.key : index;
    this.selectedIndexes_.splice(this.selectedIndexes_.indexOf(key), 1);
    this.handleChange();
  }

  handleChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }

  closeExpanded() {
    this.dispatchEvent(new CustomEvent('MDWList:closeExpanded', this));
  }
});
