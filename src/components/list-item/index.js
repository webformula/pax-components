import { HTMLElementExtended } from '@webformula/pax-core';
import MDWRipple from '../../core/Ripple.js';
import './expanded.js';

customElements.define('mdw-list-item', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_onSelect = this.onSelect.bind(this);
    this.bound_onclickSelect = this.onclickSelect.bind(this);
    this.bound_checkHREFCurrent = this.checkHREFCurrent.bind(this);
  }

  get list() {
    return this.parentNode;
  }

  get expanded() {
    return this.querySelector('mdw-list-item-expanded');
  }

  get key() {
    return this.getAttribute('mdw-key');
  }

  isSelect() {
    return ['single', 'multiple'].includes(this.list.selectType);
  }

  selectOnclick() {
    return !!this.list.selectOnclick;
  }

  connectedCallback() {
    this.connectRipple();
    this.connectHREF();
    this.connectSelect();

    const expanded = this.expanded;
    if (expanded) {
      requestAnimationFrame(() => {
        expanded.listItem = this;
      });
    }
  }

  disconnectedCallback() {
    if (this.ripple) this.ripple.destroy();
    this.removeEventListener('click', this.bound_hrefClick);
    if (this._selectEl) this._selectEl.removeEventListener('change', this.bound_onSelect);
    this.removeEventListener('click', this.bound_onclickSelect);
    window.removeEventListener('hashchange', this.bound_checkHREFCurrent);
  }

  expand() {
    const expandElement = this.expanded;
    if (expandElement) {
      expandElement.open();
    }
  }

  connectRipple() {
    const element = this.querySelector('.mdw-ripple');
    if (!element) return;
    this.ripple = new MDWRipple({
      element,
      triggerElement: this
    });
    this.classList.add('mdw-has-ripple');
  }

  connectHREF() {
    if (!this.hasAttribute('href')) return;
    this.checkHREFCurrent();
    window.addEventListener('hashchange', this.bound_checkHREFCurrent);
    this.addEventListener('click', this.bound_hrefClick);
  }

  checkHREFCurrent() {
    if (!this.hasAttribute('href')) return;
    const href = document.location.href;
    const hash = document.location.hash;
    if (href === this.getAttribute('href') || href === this.getAttribute('href-alt')) this.classList.add('mdw-current-link');
    else if (hash === this.getAttribute('href') || hash === this.getAttribute('href-alt')) this.classList.add('mdw-current-link');
    else this.classList.remove('mdw-current-link');
  }

  hrefClick() {
    // open in new tab / window
    if (this.getAttribute('target') === '_blank') {
      window.open(this.getAttribute('href'), '_blank');
      return;
    }

    document.location.href = this.getAttribute('href');
  }

  onSelect(e) {
    if (e.target.checked) this.list.itemSelected(this);
    else this.list.itemDeselected(this);
  }

  onclickSelect(e) {
    if (!this.selectOnclick()) return;
    if (e.target === this._selectEl) return;
    this._selectEl.checked = !this._selectEl.checked;
  }

  connectSelect() {
    if (this.isSelect()) {
      this._selectEl = this.querySelector('mdw-checkbox');
      if (this._selectEl) this._selectEl.addEventListener('change', this.bound_onSelect);
      if (this.selectOnclick()) this.addEventListener('click', this.bound_onclickSelect);
    }
  }

  deselect() {
    this._selectEl.checked = false;
  }
});
