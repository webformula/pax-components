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
    this.clickOutsideClose_ = false;
    this.boundHandleBodyClick_ = this.handleBodyClick_.bind(this);
    this.boundHandleKeydown_ = this.handleKeydown_.bind(this);
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
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_);
    cancelAnimationFrame(this.animationRequestId_);
  }

  static get observedAttributes() {
    return ['mdw-position'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-position':
        this.position_ = newValue;
        break;
    }
  }

  set clickOutsideClose(value) {
    this.clickOutsideClose_ = value;
  }

  set setQuickOpen(value) {
    this.isQuickOpen_ = value;
  }

  get position() {
    return this.position_;
  }

  setPosition(value) {
    const split = value.split(' ');
    this.position_ = `${split[0] || 'top'} ${split[1] || 'left'}`;
    this.setAttribute('mdw-position', this.position_);
  }

  autoPosition() {
    this._autoPosition = true;
  }

  isOpen() {
    return this.isOpen_;
  }

  open(clickBodyToClose) {
    if (clickBodyToClose !== undefined) this.clickOutsideClose_ = clickBodyToClose
    // handle focused element
    const focusableElements = this.querySelectorAll(this.FOCUSABLE_ELEMENTS);
    this.firstFocusableElement_ = focusableElements[0];
    this.lastFocusableElement_ = focusableElements[focusableElements.length - 1];
    this.saveFocus();

    // handle animation
    if (!this.isQuickOpen_) {
      this.classList.add('mdw-panel--animating-open');
      this.animationRequestId_ = this._runNextAnimationFrame(() => {
        this.classList.add('mdw-open');
        if (this.isQuickOpen_) this.notifyOpen();
        else {
          this.openAnimationEndTimerId_ = setTimeout(() => {
            this.openAnimationEndTimerId_ = 0;
            this.classList.remove('mdw-panel--animating-open');
            if (this.isHoisted_) this.setHoisetedPosition();
            else this.setPositionStyle();
            this.notifyOpen();
          }, 150);
        }
        if (this.isHoisted_) this.setHoisetedPosition();
        else this.setPositionStyle();
      });
    } else {
      this.classList.add('mdw-open');
    }

    this.addBodyClickEvent_();
    this.addKeydownEvent_();
    this.isOpen_ = true;
  }

  // TODO FIX THE CLOSING ANIMATION
  close() {
    if (!this.isQuickOpen_) {
      this.classList.add('mdw-panel--animating-closed');
      this.removeBodyClickEvent_();
      this.animationRequestId_ = this._runNextAnimationFrame(() => {
        this.classList.remove('mdw-open');
        if (this.isQuickOpen_) this.notifyClose();
        else {
          this.closeAnimationEndTimerId_ = setTimeout(() => {
            this.closeAnimationEndTimerId_ = 0;
            this.classList.remove('mdw-panel--animating-closed');
            this.notifyClose();
          }, 75);
        }
      });
    } else {
      this.classList.remove('mdw-open');
    }

    this.removeKeydownEvent_();
    this.isOpen_ = false;
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
    this.previousFocus_ = document.activeElement;
  }

  restoreFocus() {
    if (this.contains(document.activeElement) && this.previousFocus_ && this.previousFocus_.focus) this.previousFocus_.focus();
  }

  focusFirstElement() {
    if (this.firstFocusableElement_ && this.firstFocusableElement_.focus) this.firstFocusableElement_.focus()
  }

  focusLastElement() {
    if (this.lastFocusableElement_ && this.lastFocusableElement_.focus) this.lastFocusableElement_.focus()
  }

  isFirstElementFocused() {
    this.firstFocusableElement_ ? this.firstFocusableElement_ === document.activeElement : false;
  }

  isLastElementFocused() {
    this.lastFocusableElement_ ? this.lastFocusableElement_ === document.activeElement : false;
  }

  addBodyClickEvent_() {
    if (!this.clickOutsideClose_) return;
    setTimeout(() => {
      this.hasBodyEvent = true;
      document.body.addEventListener('click', this.boundHandleBodyClick_);
    }, 0);
  }

  removeBodyClickEvent_() {
    if (this.hasBodyEvent) document.body.removeEventListener('click', this.boundHandleBodyClick_);
    this.hasBodyEvent = false;
  }

  addKeydownEvent_() {
    this.hasKeydownEvent = true;
    document.body.addEventListener('keydown', this.boundHandleKeydown_);
  }

  removeKeydownEvent_() {
    if (this.hasKeydownEvent) document.body.removeEventListener('keydown', this.boundHandleKeydown_);
    this.hasKeydownEvent = false;
  }

  ignoreElementOnClickToClose(el) {
    this._clickOutsideCloseIgnorElement.push(el);
  }

  handleBodyClick_(event) {
    const el = event.target;
    if (this._clickOutsideCloseIgnorElement.includes(el)) return;
    if (this.contains(el)) return;
    this.removeBodyClickEvent_();
    this.close();
  }

  handleKeydown_(event) {
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

  hoistToBody(target) {
    this.container_ = target || this.parentNode;
    document.body.appendChild(this);
    this.classList.add('mdw-panel-hoisted');
    this.isHoisted_ = true;
  }

  setHoisetedPosition() {
    const bounds = this.container_.getBoundingClientRect();
    this.style.top = `${bounds.top}px`;
    this.style.left = `${bounds.left}px`;
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
    const aValue = position.split(' ')[0];
    const bValue = position.split(' ')[1];
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
      const { clientWidth, clientHeight } = document.body;
      const { x: globalX, y: globalY } = this.getBoundingClientRect();
      if ((globalY + height) > clientHeight) top = parentHeight - height;
      if ((globalX + width) > clientWidth) left = parentWidth - width;
    }

    this.style.top = `${parseInt(top)}px`;
    this.style.left = `${parseInt(left)}px`;
    this.style.transform = 'scale(1)';
  }
});
