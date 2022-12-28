import HTMLElementExtended from '../HTMLElementExtended.js';
import './list.css';
import Drag from '../../core/Drag.js';
import util from '../../core/util.js';


// TODO add mutation observer for added list items?

customElements.define('mdw-list-item', class MDWListItemElement extends HTMLElementExtended {
  #drag;
  #checked = false;
  #value = '';
  #selectCheckbox;
  #onclickSelect_bound = this.#onclickSelect.bind(this);
  #onclickAction_bound = this.#onclickAction.bind(this);
  #hasActions = this.querySelector('[action]');
  #hasSwipeActions = this.querySelector('mdw-list-item-action-right') || this.querySelector('mdw-list-item-action-left');
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragStart_bound = this.#onDragStart.bind(this);
  #onDragEnd_bound = this.#onDragEnd.bind(this);
  #dragStartPosition;
  #actionActiveThreshold = 64;

  constructor() {
    super();
  }

  connectedCallback() {
    this.tabIndex = 0;
    this.setAttribute('role', 'listitem');

    if (this.#selectable) {
      const avatar = this.querySelector('mdw-avatar');
      if (avatar) {
        avatar.classList.add('mdw-checkbox');
        avatar.setAttribute('role', 'checkbox');
      }

      this.#selectCheckbox = this.querySelector('mdw-checkbox');
      this.addEventListener('click', this.#onclickSelect_bound);
    }

    if (this.#hasActions) this.addEventListener('click', this.#onclickAction_bound);

    if (this.#hasSwipeActions) {
      this.#drag = new Drag(this);
      this.#drag.onDrag(this.#onDrag_bound);
      this.#drag.onStart(this.#onDragStart_bound);
      this.#drag.onEnd(this.#onDragEnd_bound);
      this.#drag.enable();
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onclickSelect_bound);
    this.removeEventListener('click', this.#onclickAction_bound);

    if (this.#drag) {
      this.#drag.destroy();
      this.#drag = undefined;
    }
  }
  
  get #selectable() {
    return this.parentElement.selectable;
  }

  static get observedAttributes() {
    return ['value', 'checked'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
    // TODO update parent
  }

  get checked() {
    return this.#checked;
  }
  set checked(value) {
    this.#checked = !!value;
    this.classList.toggle('mdw-checked', this.#checked);
    this.setAttribute('aria-checked', this.#checked.toString() || 'false');
    if (this.#selectCheckbox) this.#selectCheckbox.checked = this.checked;
    this.parentElement.updateSelection(this.value, this.checked);
  }

  async remove() {
    this.style.overflowY = 'hidden';
    this.style.transition = 'height 320ms';
    this.style.height = '0';
    await util.nextAnimationFrameAsync();
    await util.transitionendAsync(this);
    super.remove();
  }

  #onclickSelect(event) {
    if (!this.#isSelectControl(event.target)) return;
    this.checked = !this.checked;
  }

  #isSelectControl(node) {
    if (node.nodeName === 'MDW-AVATAR') return true;
    if (node.nodeName === 'MDW-CHECKBOX') return true;
    if (node.classList.contains('mdw-select-control')) return true;
    return false;
  }

  async #onclickAction(event) {
    const action = event.target.getAttribute('action');
    const remove = event.target.hasAttribute('action-remove');
    if (remove) {
      const leftSwipeControl = this.querySelector('mdw-list-item-action-left');
      if (leftSwipeControl) leftSwipeControl.style.opacity = 0;
      const rightSwipeControl = this.querySelector('mdw-list-item-action-right');
      if (rightSwipeControl) rightSwipeControl.style.opacity = 0;
      this.style.setProperty('--mdw-list-item-swipe-position', `100%`);
      await util.transitionendAsync(this);
      this.remove(this);
    }

    this.parentElement.dispatchEvent(new CustomEvent('change', {
      detail: {
        action,
        value: this.value,
        listItem: this,
        ...(remove && { remove: true })
      }
    }));
  }

  #onDragStart() {
    this.classList.add('mdw-dragging');
    this.#dragStartPosition = parseInt(getComputedStyle(this).getPropertyValue('--mdw-list-item-swipe-position').replace('px', ''));
  }

  #onDrag({ distance }) {
    const position = this.#dragStartPosition + distance.x;
    this.style.setProperty('--mdw-list-item-swipe-position', `${position}px`);
    this.classList.toggle('mdw-action-active', position < -this.#actionActiveThreshold || position > this.#actionActiveThreshold);
  }

  async #onDragEnd() {
    this.classList.remove('mdw-dragging');
    const position = parseInt(getComputedStyle(this).getPropertyValue('--mdw-list-item-swipe-position').replace('px', ''));

    if (position > -this.#actionActiveThreshold && position < this.#actionActiveThreshold) {
      this.style.setProperty('--mdw-list-item-swipe-position', `0px`);
    } else {
      const actionElement = position < -this.#actionActiveThreshold ? this.querySelector('mdw-list-item-action-left') : this.querySelector('mdw-list-item-action-right');
      const remove = actionElement.hasAttribute('action-remove');

      if (remove) {
        actionElement.style.opacity = 0;
        this.style.setProperty('--mdw-list-item-swipe-position', position > 0 ? `100%` : '-100%');
        // TODO figure out why action is bouncing. not happening with right
        await util.transitionendAsync(this);
        this.remove();
      } else {
        this.style.setProperty('--mdw-list-item-swipe-position', `0px`);
      }

      this.parentElement.dispatchEvent(new CustomEvent('change', {
        detail: {
          action: actionElement.getAttribute('action'),
          value: this.value,
          listItem: this,
          ...(remove && { remove: true })
        }
      }));
    }
  }
});
