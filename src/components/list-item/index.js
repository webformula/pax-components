customElements.define('mdw-list-item', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_onSelect = this.onSelect.bind(this);
    this.bound_onclickSelect = this.onclickSelect.bind(this);
  }

  get list() {
    return this.parentNode;
  }

  isSelect() {
    return !!this.list.selectType;
  }

  selectOnclick() {
    return !!this.list.selectOnclick;
  }

  connectedCallback() {
    this.connectRipple();
    this.connectHREF();
    this.connectSelect();
  }

  disconnectedCallback() {
    if (this.ripple) this.ripple.destroy();
    this.removeEventListener('click', this.bound_hrefClick);
    if (this.selectEl_) this.selectEl_.removeEventListener('change', this.bound_onSelect);
    this.removeEventListener('click', this.bound_onclickSelect);
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
    this.addEventListener('click', this.bound_hrefClick);
  }

  hrefClick() {
    document.location.href = this.getAttribute('href');
  }

  onSelect(e) {
    if (e.target.checked) this.list.itemSelected(this);
    else this.list.itemDeselected(this);
  }

  onclickSelect(e) {
    if (!this.selectOnclick()) return;
    if (e.target === this.selectEl_) return;
    this.selectEl_.checked = !this.selectEl_.checked;
  }

  connectSelect() {
    if (this.isSelect()) {
      this.selectEl_ = this.querySelector('mdw-checkbox');
      if (this.selectEl_) this.selectEl_.addEventListener('change', this.bound_onSelect);
      if (this.selectOnclick()) this.addEventListener('click', this.bound_onclickSelect);
    }
  }

  deselect() {
    this.selectEl_.checked = false;
  }
});
