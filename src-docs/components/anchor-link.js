import { HTMLElementExtended, css } from '@webformula/pax-core';

customElements.define('anchor-link', class extends HTMLElementExtended {
  constructor() {
    super();
    this.addEventListener('click', this.scrollTo.bind(this));
  }

  connectedCallback() {
    const param = router.getParameter('anchor');
    if (param && param.replace('hash-', '#') === this.selector) {
      setTimeout(() => {
        this.scrollTo();
      }, 0);
    }
  }

  scrollTo() {
    let anchor = this.getAnchor();
    let scrollElement = this.getScrollElement();
    let count = anchor.offsetTop - scrollElement.scrollTop - this.offset;
    scrollElement.scrollBy({
      top: count,
      left: 0,
      behavior: 'smooth'
    });
    router.addParameter('anchor', this.selector.replace('#', 'hash-'));
  }

  get selector() {
    return this.getAttribute('selector');
  }

  get offset() {
    return (this.getAttribute('offset') || '0').replace('px', '');
  }

  getAnchor() {
    let p = this;
    while (p = p.parentNode) {
      if (p.nodeType === 11 || p.nodeType === 9) {
        return p.querySelector(this.selector);
      }
    }
  }

  getScrollElement() {
    let parent = this.parentNode;
    while (parent !== undefined && this.hasComputedStyleValue('overflowY', parent) === false) {
      if (parent.nodeType === 9) parent = undefined;
      else parent = parent.parentNode || parent.host;
    }
    return parent;
  }

  hasComputedStyleValue(key, target) {
    if (!target || target.nodeType !== 1) return false;
    let computedStyles = window.getComputedStyle(target);
    return typeof computedStyles[key] !== 'undefined' && (computedStyles[key] == 'scroll' || computedStyles[key] == 'auto');
  }
});
