import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-list', class extends HTMLElementExtended {
  constructor() {
    super();
    this.selectedIndexes_ = [];
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
    this.selectOnclick_ = value;
  }

  get selectOnclick() {
    return this.selectOnclick_;
  }

  set selectType(value) {
    this.selectType_ = value;
  }

  get selectType() {
    return this.selectType_;
  }

  get selected() {
    return [].concat(this.selectedIndexes_);
  }

  deselectAll() {
    [...this.children].forEach(child => child.deselect());
    this.selectedIndexes_ = [];
  }

  itemSelected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    if (this.selectType_ === 'single') {
      const children = [...this.children];
      this.selectedIndexes_.forEach(i => children[i].deselect());
      this.selectedIndexes_ = [];
    }
    this.selectedIndexes_.push(index);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    this.selectedIndexes_.splice(this.selectedIndexes_.indexOf(index), 1);
    this.handleChange();
  }

  handleChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }

  closeExpanded() {
    this.dispatchEvent(new CustomEvent('MDWList:closeExpanded', this));
  }
});
