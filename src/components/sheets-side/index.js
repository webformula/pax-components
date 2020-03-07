import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener } from '../../core/swipe.js';

customElements.define('mdw-sheet-side', class extends HTMLElementExtended {
  constructor() {
    super();

    this._useBackdrop = true;
    this.bound_onSwipe = this.onSwipe.bind(this);
  }

  connectedCallback() {
    // auto add modal for mobile
    if (MDWUtils.isMobile) this.classList.add('mdw-modal');
    // auto hide if modal
    if (this.isModal && !this.isHidden) this.classList.add('mdw-hide');
  }

  disconnectedCallback() {
    if (this._backdrop) this._backdrop.remove();
    removeSwipeListener(document.body, this.bound_onSwipe);
  }

  get isModal() {
    return this.classList.contains('mdw-modal');
  }

  get isHidden() {
    return this.classList.contains('mdw-hide');
  }

  set useBackdrop(value) {
    this._useBackdrop = !!value;
  }

  show() {
    this.classList.remove('mdw-hide');
    if (this.isModal) {
      addSwipeListener(document.body, this.bound_onSwipe);
      if (this._useBackdrop) this._backdrop = MDWUtils.addBackdrop(this, () => this.hide(), { sheet: true });
    }
  }

  hide() {
    this.classList.add('mdw-hide');
    if (this._backdrop) this._backdrop.remove();
    removeSwipeListener(document.body, this.bound_onSwipe);
  }

  toggle() {
    if (this.isHidden) this.show();
    else this.hide();
  }

  onSwipe(event) {
    if (event.direction.x === 1) this.hide();
  }
});
