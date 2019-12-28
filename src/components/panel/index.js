import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

/* --- mdw-panel ---
 * The panel allows you to create positions floating elements.
 * mdw-panel is used for menu, dialog, tooltip
 */

 // TODO fix open and close animations
customElements.define('mdw-panel', class extends HTMLElementExtended {
  constructor() {
    super();
    this.FOCUSABLE_ELEMENTS = [
      'button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)',
      'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
    ].join(', ');
    this._clickOutsideClose = false;
    this._boundHandleBodyClick = this._handleBodyClick.bind(this);
    this._boundHandleKeydown = this._handleKeydown.bind(this);
    this._clickOutsideCloseIgnorElement = [];
    this._autoPosition = false;
    this.setTarget(this.getAttribute('mdw-target') || this.parentNode);
  }

  connectedCallback() {
    this.classList.add('mdw-upgraded');
    this.transformPropertyName = MDWUtils.transformPropertyName;
  }

  disconnectedCallback() {
    this.removeBodyClickEvent_();
    this.removeKeydownEvent_();
    clearTimeout(this._openAnimationEndTimerId);
    clearTimeout(this._closeAnimationEndTimerId);
    cancelAnimationFrame(this._animationRequestId);
  }

  static get observedAttributes() {
    return ['mdw-position'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-position':
        const split = newValue.split(' ');
        this._position = `${split[0] || 'left'} ${split[1] || 'top'}`;
        this._setPosition();
        break;
    }
  }

  get target() {
    return this._target;
  }

  setTarget(value) {
    // convert css selector to node
    if (value && typeof value === 'string') {
      const orig = value;
      value = document.querySelector(value);
      if (value === null) throw Error(`invalid css selector or elemnt does not exits for target value ${orig}`);
    }
    this._target = value;
  }

  setClickOutsideClose(value) {
    this._clickOutsideClose = !!value;
  }

  setQuickOpen(value) {
    this._isQuickOpen = !!value;
  }

  autoPosition() {
    this._autoPosition = true;
    this._setPosition();
  }

  clickBodyToClose() {
    this._clickOutsideClose = true;
  }

  isOpen() {
    return this._isOpen;
  }

  open(clickBodyToClose) {
    if (clickBodyToClose !== undefined) this._clickOutsideClose = clickBodyToClose;
    // handle focused element
    const focusableElements = this.querySelectorAll(this.FOCUSABLE_ELEMENTS);
    this._firstFocusableElement = focusableElements[0];
    this._lastFocusableElement = focusableElements[focusableElements.length - 1];
    this.saveFocus();

    // handle animation
    if (!this._isQuickOpen) {
      this.classList.add('mdw-panel--animating-open');
      this._animationRequestId = this._runNextAnimationFrame(() => {
        this.classList.add('mdw-open');
        this._openAnimationEndTimerId = setTimeout(() => {
          this._openAnimationEndTimerId = 0;
          this.classList.remove('mdw-panel--animating-open');
          this.notifyOpen();
        }, 150);

        this._setPosition();
      });
    } else {
      this.classList.add('mdw-open');
      this._setPosition();
    }

    this.addBodyClickEvent_();
    this.addKeydownEvent_();
    this._isOpen = true;
  }

  // TODO FIX THE CLOSING ANIMATION
  close() {
    if (!this._isQuickOpen) {
      this.classList.add('mdw-panel--animating-closed');
      this.removeBodyClickEvent_();
      this._animationRequestId = this._runNextAnimationFrame(() => {
        this.classList.remove('mdw-open');
        if (this._isQuickOpen) this.notifyClose();
        else {
          this._closeAnimationEndTimerId = setTimeout(() => {
            this._closeAnimationEndTimerId = 0;
            this.classList.remove('mdw-panel--animating-closed');
            this.resetPosition();
            this.notifyClose();
          }, 75);
        }
      });
    } else {
      this.classList.remove('mdw-open');
      this.resetPosition();
    }

    this.removeKeydownEvent_();
    this._isOpen = false;
    const isRootFocused = this.isFocused();
    const childHasFocus = document.activeElement && this.contains(document.activeElement);
    if (isRootFocused || childHasFocus) this.restoreFocus();
  }

  _runNextAnimationFrame(callback) {
    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = requestAnimationFrame(() => {
      this._animationFrame = 0;
      clearTimeout(this._animationTimer);
      this._animationTimer = setTimeout(callback, 0);
    });
  }

  isFocused() {
    return document.activeElement === this;
  }

  saveFocus() {
    this._previousFocus = document.activeElement;
  }

  restoreFocus() {
    if (this.contains(document.activeElement) && this._previousFocus && this._previousFocus.focus) this._previousFocus.focus();
  }

  focusFirstElement() {
    if (this._firstFocusableElement && this._firstFocusableElement.focus) this._firstFocusableElement.focus()
  }

  focusLastElement() {
    if (this._lastFocusableElement && this._lastFocusableElement.focus) this._lastFocusableElement.focus()
  }

  isFirstElementFocused() {
    this._firstFocusableElement ? this._firstFocusableElement === document.activeElement : false;
  }

  isLastElementFocused() {
    this._lastFocusableElement ? this._lastFocusableElement === document.activeElement : false;
  }

  addBodyClickEvent_() {
    if (!this._clickOutsideClose) return;
    setTimeout(() => {
      this.hasBodyEvent = true;
      document.body.addEventListener('click', this._boundHandleBodyClick);
    }, 0);
  }

  removeBodyClickEvent_() {
    if (this.hasBodyEvent) document.body.removeEventListener('click', this._boundHandleBodyClick);
    this.hasBodyEvent = false;
  }

  addKeydownEvent_() {
    this.hasKeydownEvent = true;
    document.body.addEventListener('keydown', this._boundHandleKeydown);
  }

  removeKeydownEvent_() {
    if (this.hasKeydownEvent) document.body.removeEventListener('keydown', this._boundHandleKeydown);
    this.hasKeydownEvent = false;
  }

  ignoreElementOnClickToClose(el) {
    this._clickOutsideCloseIgnorElement.push(el);
  }

  _handleBodyClick(event) {
    const el = event.target;
    if (this._clickOutsideCloseIgnorElement.includes(el)) return;
    if (this.contains(el)) return;
    this.removeBodyClickEvent_();
    this.close();
  }

  _handleKeydown(event) {
    const { key, keyCode, shiftKey } = event;
    const isEscape = key === 'Escape' || keyCode === 27;
    const isTab = key === 'Tab' || keyCode === 9;

    if (isEscape) this.close();
    else if (isTab) {
      if (this.isLastElementFocused() && !shiftKey) {
        this.focusFirstElement();
        event.preventDefault();
      } else if (this.isFirstElementFocused() && shiftKey) {
        this.focusLastElement();
        event.preventDefault();
      }
    }
  }

  notifyClose() {
    this.dispatchEvent(new Event('MDWPanel:closed', this));
  }

  notifyOpen() {
    this.dispatchEvent(new Event('MDWPanel:open'), this);
  }

  hoistToBody() {
    if (this._isHoisted) return;
    document.body.appendChild(this);
    this._isHoisted = true;
  }

  getRelativePos(node) {
    let pos = { x: 0, y: 0 };

    while (node !== null) {
        console.log(node);
        pos.x += node.offsetLeft;
        pos.y += node.offsetTop;
        node = node.offsetParent;
    }

    return pos;
  }

  _setPosition() {
    if (!this.isOpen()) return;

    // use offset with and height to avoid problems due to transform: scale()
    // getBoundingClientRect will return the adjusted width based on the scale factor
    const position = this._position.split(' ');
    let aValue = position[0];
    let bValue = position[1];
    // auto correct swapped values
    if (['top', 'bottom', 'inner-bottom', 'inner-top'].includes(aValue) || ['left', 'right', 'inner-left', 'inner-right'].includes(bValue)) {
      aValue = position[1];
      bValue = position[0];
    }

    const { left, top } = this._calculatePosition(aValue, bValue);

    this.style.top = `${parseInt(top)}px`;
    this.style.left = `${parseInt(left)}px`;
    this.style[this.transformPropertyName] = 'scale(1)';
    this.style[`${this.transformPropertyName}-origin`] = `${this._scaleOriginX} ${this._scaleOriginY}`;
  }

  _calculatePosition(xValue, yValue, count = 0) {
    const target = this.target;
    const offsetParent = this.offsetParent;
    const targetRect = target.getBoundingClientRect();
    const offsetParentRect = offsetParent ? offsetParent.getBoundingClientRect() : { x: 0, y:0 };
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    let top = 0;
    let left = 0;

    switch(xValue) {
      case 'left':
        left = targetRect.x - width - offsetParentRect.x;
        this._scaleOriginX = 'right';
        break;
      case 'right':
        left = targetRect.x + targetRect.width - offsetParentRect.x;
        this._scaleOriginX = 'left';
        break;
      case 'center':
        left = targetRect.x + (targetRect.width / 2) - (width / 2) - offsetParentRect.x;
        this._scaleOriginX = 'center';
        break;
      case 'inner-left':
        left = targetRect.x - offsetParentRect.x;
        this._scaleOriginX = 'left';
        break;
      case 'inner-right':
        left = targetRect.x + targetRect.width - width - offsetParentRect.x;
        this._scaleOriginX = 'right';
        break;
    }

    switch(yValue) {
      case 'top':
        top = targetRect.y - height - offsetParentRect.y;
        this._scaleOriginY = 'bottom';
        break;
      case 'bottom':
        top = targetRect.y + targetRect.height - offsetParentRect.y;
        this._scaleOriginY = 'top';
        break;
      case 'center':
        top = targetRect.y + (targetRect.height / 2) - (height / 2) - offsetParentRect.y;
        this._scaleOriginY = 'center';
        break;
      case 'inner-top':
        top = targetRect.y - offsetParentRect.y;
        this._scaleOriginY = 'top';
        break;
      case 'inner-bottom':
        top = targetRect.y + targetRect.height - height - offsetParentRect.y;
        this._scaleOriginY = 'bottom';
        break;
    }

    return this._adjustOutOfBoundsPosition(xValue, yValue, left, top, count);
  }

  _adjustOutOfBoundsPosition(xValue, yValue, left, top, count) {
    if (!this._autoPosition) return { left, top };
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    const { clientWidth, clientHeight } = document.documentElement;
    let recalculate = false;

    switch(yValue) {
      case 'top':
        if (top < 0) {
          yValue = 'bottom';
          recalculate = true;
        }
      case 'inner-bottom':
        if (top < 0) {
          yValue = 'inner-top';
          recalculate = true;
        }
        break;
      case 'bottom':
        if (Math.ceil((top + height) - clientHeight) > 0) {
          yValue = 'top';
          recalculate = true;
        }
        break;
      case 'inner-top':
        if (Math.ceil((top + height) - clientHeight) > 0) {
          yValue = 'inner-bottom';
          recalculate = true;
        }
        break;
      case 'center':
        const bottom = Math.ceil((top + height) - clientHeight);
        if (top < 0) top = 0;
        else if (bottom > 0) top -= bottom;
        break;
    }

    switch(yValue) {
      case 'left':
        if (left < 0) {
          xValue = 'right';
          recalculate = true;
        }
        break;
      case 'inner-right':
        if (left < 0) {
          xValue = 'inner-right';
          recalculate = true;
        }
        break;
      case 'right':
        if (Math.ceil((left + width) - clientWidth) > 0) {
          xValue = 'left';
          recalculate = true;
        }
        break;
      case 'inner-left':
        if (Math.ceil((left + width) - clientWidth) > 0) {
          xValue = 'inner-right';
          recalculate = true;
        }
        break;
      case 'center':
        const right = Math.ceil((left + width) - clientWidth);
        if (left < 0) left = 0;
        else if (right > 0) left -= right;
        break;
    }

    // use count to prevent infinite looping
    //   This can be caused wehn the side of the panel is wider or taller than the screen
    if (recalculate === true && count < 3) return this._calculatePosition(xValue, yValue, count++);

    return { left, top };
  }

  resetPosition() {
    // this.style.top = '';
    // this.style.left = '';
    this.style[this.transformPropertyName] = '';
  }
});
