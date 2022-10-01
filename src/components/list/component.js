import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';

customElements.define('mdw-list', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #value = this.getAttribute('value');
  #isSelectable = this.classList.contains('mdw-select') || this.classList.contains('mdw-select-multiple');
  #isSelectMultiple = this.classList.contains('mdw-select-multiple');
  #subHeaders = [...this.querySelectorAll('.mdw-sub-header')];
  #scrollParent = this.#getScrollParent(this);
  #scroll_bound = this.#scroll.bind(this);
  #onclick_bound = this.#onclick.bind(this);

  constructor() {
    super();

    [...this.querySelectorAll('mdw-list-item')].forEach(element => element.tabIndex = 0);
    if (this.#subHeaders.length > 0) this.#scrollParent.addEventListener('scroll', this.#scroll_bound);
    this.addEventListener('click', this.#onclick_bound);
    if (this.#isSelectable && this.#value !== null && this.#value !== undefined) this.value = this.#value;
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.#value = newValue;
      if (this.rendered) this.value = newValue;
    }
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;

    if (!this.#isSelectable) return;

    const values = this.#value.split(',');
    [...this.querySelectorAll('mdw-list-item[value]')].forEach(item => {
      if (values.includes(item.getAttribute('value'))) {
        item.setAttribute('selected', '');
        const selectControl = this.#getSelectControl(item);
        // not sure what is causing to need this
        setTimeout(() => {
          if (selectControl && selectControl.nodeName === 'MDW-CHECKBOX') selectControl.checked = true;
        }, 0);
      } else if (item.hasAttribute('selected')) {
        item.removeAttribute('selected');
        const selectControl = this.#getSelectControl(item);
        if (selectControl && selectControl.nodeName === 'MDW-CHECKBOX') selectControl.checked = false;
      }
    });
  }

  #scroll() {
    this.classList.toggle('mdw-scrolled', this.#scrollParent.scrollTop !== 0);
    const top = this.#scrollParent.getBoundingClientRect().y;
    this.#subHeaders.forEach(element => {
      if (top >= element.getBoundingClientRect().y - 42) element.classList.add('mdw-stuck');
      else element.classList.remove('mdw-stuck');
    });
  }

  #getScrollParent(node) {
    if (!node) return;
    if (node.nodeName === 'BODY') return node;
    if (node.scrollHeight > node.clientHeight) return node;
    return this.#getScrollParent(node.parentNode);
  }

  #onclick(event) {
    const item = this.#getItemParent(event.target);
    if (!item) return;
    if (this.#isSelectable && this.#isSelectControl(event.target)) {
      if (item.hasAttribute('selected')) {
        this.value = this.value.split(',').filter(v => v !== item.getAttribute('value')).join(',');
      } else {
        if (this.#isSelectMultiple) {
          const newValueArr = this.value.split(',');
          newValueArr.push(item.getAttribute('value'));
          this.value = newValueArr.filter(v => !!v).join(',');
        } else {
          this.value = item.getAttribute('value');
        }
      }
      event.preventDefault();
    }
    item.blur();
  }

  #getItemParent(node) {
    if (!node || node.nodeName === 'MDW-LIST') return;
    if (node.nodeName === 'MDW-LIST-ITEM') return node;
    return this.#getItemParent(node.parentNode);
  }

  #isSelectControl(node) {
    if (node.nodeName === 'MDW-CHECKBOX') return true;
    if (node.classList.contains('mdw-select-control')) return true;
    return false;
  }

  #getSelectControl(listItem) {
    return listItem.querySelector('mdw-checkbox') || listItem.querySelector('.mdw-select-control');
  }
});
