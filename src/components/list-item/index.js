import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWRipple from '../../core/Ripple.js';

customElements.define('mdw-list-item', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_onSelectChange = this.onSelectChange.bind(this);
    this.bound_onSelectClick = this.onSelectClick.bind(this);
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

  get selectCheckbox() {
    return this.querySelector(':scope > mdw-checkbox')
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
    this.selectCheckbox && this.selectCheckbox.addEventListener('change', this.bound_onSelectChange);
    this.addEventListener('click', this.bound_onSelectClick, true);

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
    this.selectCheckbox && this.selectCheckbox.removeEventListener('change', this.bound_onSelectChange);
    this.removeEventListener('click', this.bound_onSelectClick, true);
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

  onSelectChange(e) {
    if (e.target.checked) this.list.itemSelected(this);
    else this.list.itemDeselected(this);
  }

  onSelectClick(e) {
    if (e.target.parentNode.nodeName === 'MDW-CHECKBOX' && e.target.parentNode.parentNode.nodeName === 'MDW-LIST-ITEM') {
      e.target.parentNode.checked = !e.target.parentNode.checked;
      e.stopPropagation();
    }

    // prevent select change
    if (!this.selectOnclick()) {
      return;
    }

    if (e.target === this.selectCheckbox) return;
    this.selectCheckbox.checked = !this.selectCheckbox.checked;
  }

  deselect() {
    this.selectCheckbox.checked = false;
  }
});
