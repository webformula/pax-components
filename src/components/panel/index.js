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
    this.clickOutsideClose_ = true;
    this.boundHandleBodyClick_ = this.handleBodyClick_.bind(this);
    this.boundHandleKeydown_ = this.handleKeydown_.bind(this);
  }

  connectedCallback() {
    this.transformPropertyName = MDWUtils.transformPropertyName;
    const parentEl = this.parentElement;
    // might not ned anchor
    // this.anchorElement = parentEl && parentEl.classList.contains('mdw-panel__anchor') ? parentEl : null;
    // if (this.anchorElement) this.anchorElement = this.anchorElement.children[0];
  }

  disconnectedCallback() {
    this.removeBodyClickEvent_();
    this.removeKeydownEvent_();
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_);
    cancelAnimationFrame(this.animationRequestId_);
  }

  // get hasAnchor() {
  //   return !!this.anchorElement;
  // }

  // set anchor(value) {
  //   this.anchorElement = value;
  // }

  set clickOutsideClose(value) {
    this.clickOutsideClose_ = value;
  }

  set setQuickOpen(value) {
    this.isQuickOpen_ = value;
  }

  setPosition(value) {
    const split = value.split(' ');
    this.position_ = `${split[0] || 'top'} ${split[1] || 'left'}`;
    this.setAttribute('position', this.position_);
  }

  get position() {
    return this.position_;
  }

  isOpen() {
    return this.isOpen_;
  }

  open() {
    // handle focused element
    const focusableElements = this.querySelectorAll(this.FOCUSABLE_ELEMENTS);
    this.firstFocusableElement_ = focusableElements[0];
    this.lastFocusableElement_ = focusableElements[focusableElements.length - 1];
    this.saveFocus();

    // handle animation
    if (!this.isQuickOpen_) this.classList.add('mdw-panel--animating-open');
    this.animationRequestId_ = requestAnimationFrame(() => {
      this.setAttribute('open', 'open');
      if (this.isQuickOpen_) this.notifyOpen();
      else {
        this.openAnimationEndTimerId_ = setTimeout(() => {
          this.openAnimationEndTimerId_ = 0;
          this.classList.remove('mdw-panel--animating-open');
          this.notifyOpen();
        });
      }
    });

    this.addBodyClickEvent_();
    this.addKeydownEvent_();
    this.isOpen_ = true;
  }

  close() {
    if (!this.isQuickOpen_) this.classList.add('mdw-panel--animating-closed');
    this.removeBodyClickEvent_();
    this.animationRequestId_ = requestAnimationFrame(() => {
      this.removeAttribute('open');
      if (this.isQuickOpen_) this.notifyClose();
      else {
        this.closeAnimationEndTimerId_ = setTimeout(() => {
          this.closeAnimationEndTimerId_ = 0;
          this.classList.remove('mdw-panel--animating-closed');
          this.notifyClose();
        }, 75);
      }
    });

    this.removeKeydownEvent_();
    this.isOpen_ = false;
    const isRootFocused = this.isFocused();
    const childHasFocus = document.activeElement && this.contains(document.activeElement);
    if (isRootFocused || childHasFocus) this.restoreFocus();
  }

  // positionPanel_() {
  //   if (this.hasAnchor) return this.positionAnchor_();
  //   this.positionBounding_();
  // }
  //
  // positionBounding_() {
  //   const boundingBox = this.getParentDemensions_();
  //
  //   // x
  //   switch (this.xPos_) {
  //     case 'right':
  //       this.style.left = undefined;
  //       this.style.right = 0;
  //       break;
  //
  //     case 'center':
  //       this.style.left = (boundingBox.width / 2) - (this.offsetWidth / 2) + 'px';
  //       this.style.right = undefined;
  //       break;
  //
  //     default: // left
  //       this.style.left = 0;
  //       this.style.right = undefined;
  //       break;
  //   }
  //
  //   // y
  //   switch (this.yPos_) {
  //     case 'bottom':
  //       this.style.top = undefined;
  //       this.style.bottom = 0;
  //       break;
  //
  //     case 'center':
  //       this.style.top = (boundingBox.height / 2) - (this.offsetHeight / 2) + 'px';
  //       this.style.bottom = undefined;
  //       break;
  //
  //     default: // top
  //       this.style.top = 0;
  //       this.style.bottom = undefined;
  //       break;
  //   }
  // }
  //
  // positionAnchor_() {
  //   const boundingBox = this.getParentDemensions_();
  //   const anchorBox = this.getAnchorDimensions_();
  //
  //   // x
  //   switch (this.xPos_) {
  //     case 'right':
  //       this.style.left = ((anchorBox.x - boundingBox.x) + (anchorBox.width)) + 'px';
  //       break;
  //
  //     case 'inner_right':
  //       this.style.left = (anchorBox.x - boundingBox.x) + 'px';
  //       break;
  //
  //     case 'center':
  //       this.style.left = ((anchorBox.x - boundingBox.x) + (anchorBox.width / 2) - (this.offsetWidth / 2)) + 'px';
  //       break;
  //
  //     case 'inner_left':
  //       this.style.left = (anchorBox.x - boundingBox.x) + 'px';
  //       break;
  //
  //     default: // left
  //       this.style.left = ((anchorBox.x - boundingBox.x) - this.offsetWidth) + 'px';
  //       break;
  //   }
  //
  //   // y
  //   switch (this.yPos_) {
  //     case 'bottom':
  //       this.style.top = ((anchorBox.y - boundingBox.y) + anchorBox.height) + 'px';
  //       break;
  //
  //     case 'inner_bottom':
  //       this.style.top = ((anchorBox.y - boundingBox.y) + anchorBox.height - this.offsetHeight) + 'px';
  //       break;
  //
  //     case 'center':
  //       this.style.top = ((anchorBox.y - boundingBox.y) + (anchorBox.height / 2) - (this.offsetHeight / 2)) + 'px';
  //       break;
  //
  //     case 'inner_top':
  //       this.style.top = (anchorBox.x - boundingBox.x) + (anchorBox.width - this.offsetWidth) + 'px';
  //       break;
  //
  //     default: // top
  //       this.style.top = ((anchorBox.y - boundingBox.y) - this.offsetHeight) + 'px';
  //       break;
  //   }
  // }

  // getParentDemensions_() {
  //   if (this.isHoistedElement_) return { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
  //   return this.parentNode.getBoundingClientRect();
  // }
  //
  // getAnchorDimensions_() {
  //   return this.anchorElement ? this.anchorElement.getBoundingClientRect() : null;
  // }

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

  handleBodyClick_(event) {
    const el = event.target;
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
    this.dispatchEvent(new Event('MDWPanel:closed'));
  }

  notifyOpen() {
    this.dispatchEvent(new Event('MDWPanel:open'));
  }

  hoistToBody() {
    document.body.appendChild(this);
    this.setIsHoisted(true);
  }

  /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */
  setIsHoisted(value) {
    this.isHoistedElement_ = value;
  }

  // setAbsolutePosition(x, y) {
  //   this.position_.x = this.isFinite_(x) ? x : 0;
  //   this.position_.y = this.isFinite_(y) ? y : 0;
  //   this.setIsHoisted(true);
  // }
  //
  // isFinite_(num) {
  //   return typeof num === 'number' && isFinite(num);
  // }

  // setFixedPosition(isFixed) {
  //   if (isFixed) this.classList.add('mdw-panel--fixed');
  //   else this.classList.remove('mdw-panel--fixed');
  //   this.isFixedPosition_ = isFixed
  // }

  // getWindowDimensions() {
  //   return { width: window.innerWidth, height: window.innerHeight };
  // }

  // getBodyDimensions() {
  //   return { width: document.body.clientWidth, height: document.body.clientHeight };
  // }

  // isRtl() {
  //   return getComputedStyle(this).getPropertyValue('direction') === 'rtl';
  // }

  // setTransformOrigin(origin) {
  //   const propertyName = `${this.transformPropertyName}-origin`;
  //   this.style.setProperty(propertyName, origin);
  // }

  // setMaxHeight(height) {
  //   this.style.maxHeight = height;
  // }

});
