import { HTMLElementExtended } from '@webformula/pax-core/index.js';

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
    const index = Array.prototype.indexOf.call(this.children, listItem) - 1;
    if (this.selectType_ === 'single') {
      const children = [...this.children];
      this.selectedIndexes_.forEach(i => children[i].deselect());
      this.selectedIndexes_ = [];
    }
    this.selectedIndexes_.push(index);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem) - 1;
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
