import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import './draggable-header.js';

/* --- mdw-panel ---
 * The panel allows you to create positioned floating elements.
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
    this.bound_close = this.close.bind(this);
    this._clickOutsideCloseIgnorElement = [];
    this._autoPosition = false;
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
        this._position = newValue;
        break;
    }
  }

  set clickOutsideClose(value) {
    this._clickOutsideClose = value;
  }

  set setQuickOpen(value) {
    this._isQuickOpen = value;
  }

  get position() {
    return this._position;
  }

  fullscreen() {
    this.classList.add('mdw-fullscreen');
  }

  setPosition(value) {
    const split = value.split(' ');
    this._position = `${split[0] || 'top'} ${split[1] || 'left'}`;
    this.setAttribute('mdw-position', this._position);
    this._positionSet = true;
  }

  autoPosition() {
    this._autoPosition = true;
  }

  setAnimation(animationConfig) {
    this._animationConfig = animationConfig;
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
      this.prepareAnimation();

      this._animationRequestId = this._runNextAnimationFrame(() => {
        this.classList.add('mdw-open');
        if (this._isQuickOpen) this.notifyOpen();
        else {
          this._openAnimationEndTimerId = setTimeout(() => {
            this._openAnimationEndTimerId = 0;
            this.classList.remove('mdw-panel--animating-open');
            this.classList.remove('mdw-panel_animate-open-parent-child');
            this.notifyOpen();
          }, 150);
        }

        if (this._isHoisted) this.setHoisetedPosition();
        else this.setPositionStyle();
      });
    } else {
      this.classList.add('mdw-open');
      if (this._isHoisted) this.setHoisetedPosition();
      else this.setPositionStyle();
    }

    this.addBodyClickEvent_();
    this.addKeydownEvent_();
    this.addEventListener('MDWPanel:close', this.bound_close);
    this._isOpen = true;
  }


  prepareAnimation() {
    if (this._animationConfig) {
      console.log(this._animationConfig.target.offsetHeight)
      this.style.height = `${this._animationConfig.target.offsetHeight}px`;
      this.style.transform = `translateY(${this._animationConfig.target.offsetTop}px)`; // this is undone by positioning code
      this.classList.add('mdw-panel_animate-open-parent-child');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.style.height = '';
        });
      });
    } else {
      this.classList.add('mdw-panel--animating-open');
    }
  }


  // TODO FIX THE CLOSING ANIMATION
  close(event) {
    if (event) event.stopPropagation();

    this.removeEventListener('MDWPanel:close', this.bound_close);
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

  // TODO implement
  removeOnAnimationComplete() {
    this.remove();
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
    this.dispatchEvent(new Event('MDWPanel:opened'), this);
  }

  hoistToBody(target) {
    if (this._isHoisted) return;
    this._container = target || this.parentNode;
    document.body.appendChild(this);
    this.classList.add('mdw-panel-hoisted');
    this._isHoisted = true;
  }

  _autoPositionHoisted() {
    if (!this._autoPosition) return;

    const pageHeight = window.innerHeight;
    const panelRect = this.getBoundingClientRect();
    const panelHeight = this.offsetHeight;
    let panelY = this.offsetTop;

    // if panel is out of window y bounds
    if (panelY + panelHeight > pageHeight) {
      if (panelHeight <= pageHeight) {
        const maxTop = pageHeight - panelHeight;
        let offset = panelY - maxTop;

        // add padding to offset, this will prevent panel from butting up against bottom
        if (offset > 20) offset += 10;
        else offset /= 2;

        panelY -= offset;
      }
    }

    this.style.top = `${panelY}px`;
  }

  setHoisetedPosition() {
    const bounds = this._container.getBoundingClientRect();
    this.style.top = `${bounds.top}px`;
    this.style.left = `${bounds.left}px`;
    this.style[this.transformPropertyName] = 'scale(1)';

    if (!this._positionSet) {
      this._autoPositionHoisted();
    } else {
      let top = 0;
      let left = 0;

      this.style.top = `${top}px`;
      this.style.left = `${left}px`;

      setTimeout(() => {
        const { clientWidth, clientHeight } = document.documentElement;
        const height = this.offsetHeight;
        const width = this.offsetWidth;
        // no defaults
        const split = (this.position || ' ').split(' ');
        const aValue = split[0];
        const bValue = split[1];

        switch(aValue) {
          case 'top':
            top = 0;
            break;
          case 'inner-top':
            top = bounds.y + 12;
            break;
          case 'bottom':
            top = clientHeight;
            break;
          case 'center':
            top = (clientHeight / 2) - (height / 2);
            break;
          case 'inner-bottom':
            top = clientHeight - height - 12;
            break;
        }

        switch(bValue) {
          case 'left':
            left = 0;
            break;
          case 'inner-left':
            left = bounds.x + 12;
            break;
          case 'right':
            left = clientWidth;
            break;
          case 'inner-right':
            left = clientWidth - width - 12;
            break;
          case 'center':
            left = (clientWidth / 2) - (width / 2);
            break;
        }

        this.style.width = `${this.width}px`;
        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
      }, 0);
    }
  }


  setPositionStyle(parentOverride) {
    if (parentOverride) this._parentOverride = parentOverride;
    else if (this._parentOverride) parentOverride = this._parentOverride;

    const position = this.position;
    let parentWidth = 0;
    let parentHeight = 0;
    if (parentOverride) {
      parentWidth = parentOverride.offsetWidth;
      parentHeight = parentOverride.offsetHeight;
    } else {
      let parent = this.parentNode;
      if (parent.nodeName === 'MDW-SNACKBAR') parent = parent.parentNode;
      const parentRect = parent.getBoundingClientRect();
      parentWidth = parentRect.width;
      parentHeight = parentRect.height;
    }

    // use offset with and height to avoid problems due to transform: scale()
    // using getBoundingClientRect will return the adjusted width based on the scale factor
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    // no defaults
    const split = (this.position || ' ').split(' ');
    const aValue = split[0];
    const bValue = split[1];
    let top = 0;
    let left = 0;

    switch(aValue) {
      case 'top':
        top = -height;
        break;
      case 'bottom':
        top = parentHeight;
        break;
      case 'center':
        top = (parentHeight / 2) - (height / 2);
        break;
      case 'inner-bottom':
        top = parentHeight - height;
        break;
    }

    switch(bValue) {
      case 'left':
        left = -width;
        break;
      case 'right':
        left = parentWidth;
        break;
      case 'inner-right':
        left = parentWidth - width;
        break;
      case 'center':
        left = (parentWidth / 2) - (width / 2);
        break;
    }

    if (this._autoPosition) {
      const { clientWidth, clientHeight } = document.documentElement;
      const { x: globalX, y: globalY } = this.getBoundingClientRect();
      if ((globalY + height) > clientHeight) top = parentHeight - height;
      if ((globalX + width) > clientWidth) left = parentWidth - width;
    }

    this.style.top = `${parseInt(top)}px`;
    this.style.left = `${parseInt(left)}px`;
    this.style[this.transformPropertyName] = 'scale(1)';
  }

  resetPosition() {
    this.style.top = '';
    this.style.left = '';
    this.style[this.transformPropertyName] = '';
  }
});
