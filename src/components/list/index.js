import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-list', class extends HTMLElementExtended {
  constructor() {
    super();
    this._selectedIndexes = [];
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

  set selectOnclick(value) {
    this._selectOnclick = value;
  }

  get selectOnclick() {
    return this._selectOnclick;
  }

  set selectType(value) {
    this._selectType = value;
  }

  get selectType() {
    return this._selectType;
  }

  get selected() {
    return [].concat(this._selectedIndexes);
  }

  deselectAll() {
    [...this.children].forEach(child => child.deselect());
    this._selectedIndexes = [];
  }

  itemSelected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    if (this._selectType === 'single') {
      const children = [...this.children];
      this._selectedIndexes.forEach(i => children[i].deselect());
      this._selectedIndexes = [];
    }
    this._selectedIndexes.push(index);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    this._selectedIndexes.splice(this._selectedIndexes.indexOf(index), 1);
    this.handleChange();
  }

  handleChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }
});
