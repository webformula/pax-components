import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import util from '../../core/util.js';
import './component.css';

// TODO update style to v3
// TODO add mutation observer for added list items?

customElements.define('mdw-list', class MDWList extends HTMLElementExtended {
  useShadowRoot = false;

  #actionActiveThreshold = 64;
  #value = this.getAttribute('value');
  #isSelectable = this.classList.contains('mdw-select') || this.classList.contains('mdw-select-multiple');
  #isSelectMultiple = this.classList.contains('mdw-select-multiple');
  #subHeaders = [...this.querySelectorAll('.mdw-sub-header')];
  #scrollParent = this.#getScrollParent(this);
  #scroll_bound = this.#scroll.bind(this);
  #onclick_bound = this.#onclick.bind(this);
  #ondrag_bound = this.#ondrag.bind(this);
  #ondragStart_bound = this.#ondragStart.bind(this);
  #ondragEnd_bound = this.#ondragEnd.bind(this);
  #onActionElementClick_bound = this.#onActionElementClick.bind(this);
  #dragStartPosition;
  #drags = [];

  constructor() {
    super();

    this.setAttribute('role', 'list');

    [...this.querySelectorAll('mdw-list-item')].forEach(element => {
      element.tabIndex = 0
      element.setAttribute('role', 'listitem');
      if (this.#isSelectable) {
        const avatar = element.querySelector('mdw-avatar');
        if (avatar) avatar.classList.add('mdw-checkbox');
      }

      // setup swipe actions
      if (element.querySelector('mdw-list-item-action-right') || element.querySelector('mdw-list-item-action-left')) {
        const drag = new Drag(element);
        drag.onDrag(this.#ondrag_bound);
        drag.onStart(this.#ondragStart_bound);
        drag.onEnd(this.#ondragEnd_bound);
        this.#drags.push(drag);
      }

      // setup mdw-action elements. these trigger the change event on the list, same as the swipe actions
      [...element.querySelectorAll('.mdw-action')].forEach(actionElement => {
        actionElement.addEventListener('click', this.#onActionElementClick_bound)
      });
    });
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

  connectedCallback() {
    this.#drags.forEach(d => d.enable());
  }

  disconnectedCallback() {
    this.#drags.forEach(d => d.destroy());
    this.#drags = undefined;
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    if (this.#isSelectable) this.#updateSelection(value);
    this.#value = value;
  }

  #updateSelection(value, dispatch = false) {
    const change = this.#value !== value;
    this.#value = value;

    const values = this.#value.split(',');
    [...this.querySelectorAll('mdw-list-item[value]')].forEach(item => {
      if (values.includes(item.getAttribute('value'))) {
        item.setAttribute('selected', '');
        const selectControl = this.#getSelectControl(item);
        // not sure what is causing to need this
        setTimeout(() => {
          if (selectControl && (selectControl.nodeName === 'MDW-AVATAR' || selectControl.nodeName === 'MDW-CHECKBOX')) selectControl.checked = true;
        }, 0);
      } else if (item.hasAttribute('selected')) {
        item.removeAttribute('selected');
        const selectControl = this.#getSelectControl(item);
        if (selectControl && (selectControl.nodeName === 'MDW-AVATAR' || selectControl.nodeName === 'MDW-CHECKBOX')) selectControl.checked = false;
      }
    });

    if (dispatch && change) this.dispatchEvent(new CustomEvent('change', { detail: { action: 'selection' } }));
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
    if (node.scrollHeight > node.offsetHeight) return node;
    return this.#getScrollParent(node.parentNode);
  }

  #onclick(event) {
    const item = this.#getItemParent(event.target);
    if (!item) return;
    if (this.#isSelectable && this.#isSelectControl(event.target)) {
      if (item.hasAttribute('selected')) {
        this.#updateSelection(this.value.split(',').filter(v => v !== item.getAttribute('value')).join(','), true);
      } else {
        if (this.#isSelectMultiple) {
          const newValueArr = this.value.split(',');
          newValueArr.push(item.getAttribute('value'));
          this.#updateSelection(newValueArr.filter(v => !!v).join(','), true);
        } else {
          this.#updateSelection(item.getAttribute('value'), true);
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
    if (node.nodeName === 'MDW-AVATAR') return true;
    if (node.nodeName === 'MDW-CHECKBOX') return true;
    if (node.classList.contains('mdw-select-control')) return true;
    return false;
  }

  #getSelectControl(listItem) {
    return listItem.querySelector('mdw-avatar') || listItem.querySelector('mdw-checkbox') || listItem.querySelector('.mdw-select-control');
  }

  #ondragStart({ element }) {
    element.classList.add('mdw-dragging');
    this.#dragStartPosition = parseInt(getComputedStyle(element).getPropertyValue('--mdw-list-item-swipe-position').replace('px', ''));
  }

  #ondrag({ distance, element }) {
    const position = this.#dragStartPosition + distance.x;
    element.style.setProperty('--mdw-list-item-swipe-position', `${position}px`);
    element.classList.toggle('mdw-action-active', position < -this.#actionActiveThreshold || position > this.#actionActiveThreshold);
  }

  async #ondragEnd({ element }) {
    element.classList.remove('mdw-dragging');

    const position = parseInt(getComputedStyle(element).getPropertyValue('--mdw-list-item-swipe-position').replace('px', ''));
    if (position > -this.#actionActiveThreshold && position < this.#actionActiveThreshold) element.style.setProperty('--mdw-list-item-swipe-position', `0px`);
    else {
      const actionElement = position < -this.#actionActiveThreshold ? element.querySelector('mdw-list-item-action-left') : element.querySelector('mdw-list-item-action-right');
      const remove = actionElement.hasAttribute('remove');
      if (remove) {
        if (position > 0) {
          const leftSwipeControl = element.querySelector('mdw-list-item-action-left');
          if (leftSwipeControl) leftSwipeControl.style.opacity = 0;
          element.style.setProperty('--mdw-list-item-swipe-position', `100%`);
        } else {
          const rightSwipeControl = element.querySelector('mdw-list-item-action-right');
          if (rightSwipeControl) rightSwipeControl.style.opacity = 0;
          // TODO figure out why action is bouncing. not happening with right
          element.style.setProperty('--mdw-list-item-swipe-position', `-100%`);
        }
        await util.transitionendAsync(element);
        this.#remove(element);
      } else element.style.setProperty('--mdw-list-item-swipe-position', `0px`);
      this.dispatchEvent(new CustomEvent('change', { detail: {
        action: actionElement.getAttribute('action'),
        listItem: element,
        ...(remove && { remove : true })
      }}));
    }
  }

  async #onActionElementClick(event) {
    const action = event.target.getAttribute('action');
    if (!action) {
      console.warn('no action set on element with class: .mdw-action', element);
      return;
    }
    
    const remove = event.target.hasAttribute('remove');
    const listItem = this.#getItemParent(event.target);
    if (remove) {
      const leftSwipeControl = listItem.querySelector('mdw-list-item-action-left');
      if (leftSwipeControl) leftSwipeControl.style.opacity = 0;
      const rightSwipeControl = listItem.querySelector('mdw-list-item-action-right');
      if (rightSwipeControl) rightSwipeControl.style.opacity = 0;
      listItem.style.setProperty('--mdw-list-item-swipe-position', `100%`);
      await util.transitionendAsync(listItem);
      this.#remove(listItem);
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        action,
        listItem: this.#getItemParent(event.target),
        ...(remove && { remove: true })
      }
    }));
  }

  async #remove(element) {
    element.style.overflowY = 'hidden';
    element.style.transition = 'height 320ms';
    element.style.height = '0';
    await util.nextAnimationFrameAsync();
    await util.transitionendAsync(element);
    element.remove();
  }
});
