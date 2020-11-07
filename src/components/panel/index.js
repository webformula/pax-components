import { HTMLElementExtended } from '@webformula/pax-core/index.js';
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
    this._autoPosition = true;
    this._animationConfig = {
      type: 'scale',
      opacity: true
    };

    this.bound_onOpenTransitionEnd = this.onOpenAnimationEnd.bind(this);
    this.bound_onScroll = this.onScroll.bind(this);
  }

  connectedCallback() {
    this.classList.add('mdw-upgraded');
    this.transformPropertyName = MDWUtils.transformPropertyName;
  }

  disconnectedCallback() {
    this._removeBodyClickEvent();
    this._removeKeydownEvent();
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

  set quickOpen(value) {
    this._isQuickOpen = value;
  }

  get position() {
    return this._position;
  }

  get scrollWidthPage() {
    return this.hasAttribute('mdw-scroll-with-page');
  }

  anchored() {
    this._anchored = true;
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
    if (this._isOpen) this._addBodyClickEvent();
  }

  scrollWithPage() {
    this._scrollWidthPage = true;
    this.setAttribute('mdw-scroll-with-page', 'true');
  }

  isOpen() {
    return this._isOpen;
  }

  onOpenAnimationEnd() {
    this.style.transition = '';
    // this.style.transformOrigin = '';
    this.style.overflow = '';
    this.style.maxHeight = '';
    this.classList.remove('mdw-panel--animating-open');
    this.removeEventListener('transitionend', this.bound_onOpenTransitionEnd);
    this.notifyOpen();
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

      if (this._isHoisted) this.setHoistedPosition();
      else this.setPositionStyle();

      this._animationRequestId = this._runNextAnimationFrame(() => {
        if (this._animationConfig.fullscreen) this.classList.add('mdw-fullscreen');
        this.prepareTransition();
        this.style.opacity = 1;
        this.addEventListener('transitionend', this.bound_onOpenTransitionEnd);
      });
    } else {
      this.classList.add('mdw-open');
      if (this._isHoisted) this.setHoistedPosition();
      else this.setPositionStyle();
    }

    this._addBodyClickEvent();
    this._addKeydownEvent();
    if (this.scrollWidthPage && !MDWUtils.isMobile) this.setupScrollWithPage();
    this.addEventListener('MDWPanel:close', this.bound_close);
    this._isOpen = true;
  }

  async close(event) {
    if (this.scrollWidthPage) this.teardownScrollWithPage();

    return new Promise(resolve => {
      if (event) event.stopPropagation();

      this.removeEventListener('MDWPanel:close', this.bound_close);

      if (!this._isQuickOpen) {
        this.prepareTransition();
        this._animationRequestId = this._runNextAnimationFrame(() => {
          this.prepareAnimation();
          this.style.opacity = '0';
          this._closeAnimationEndTimerId = setTimeout(() => {
            this.classList.remove('mdw-open');
            this.resetPosition();
            this.notifyClose();
            resolve();
          }, 75);
        });
      } else {
        this.classList.remove('mdw-open');
        this.resetPosition();
        this.notifyClose();
        resolve();
      }

      this._removeKeydownEvent();
      this._isOpen = false;
      const isRootFocused = this.isFocused();
      const childHasFocus = document.activeElement && this.contains(document.activeElement);
      if (isRootFocused || childHasFocus) this.restoreFocus();
    });
  }


  // this is used for open and close
  prepareTransition() {
    switch (this._animationConfig.type) {
      case 'height':
        this.style.transition = 'max-height .22s cubic-bezier(0,0,.2,1), transform .22s cubic-bezier(0,0,.2,1), opacity .22s linear';
        this.style.maxHeight = this.classList.contains('mdw-fullscreen') ? '100%' : `${this.scrollHeight}px`;
        this.style.transform = '';
        break;

      case 'scale':
      default:
        this.style.transition = 'transform .1s cubic-bezier(0,0,.2,1), opacity 0.1s linear';
        this.style.transform = '';
        break;
    }
  }
  
  // this is used for open and close
  prepareAnimation() {
    // default animation
    this.classList.add('mdw-open');
    this.classList.add('mdw-panel--animating-open');

    if (this._animationConfig.target && this._animationConfig.fullscreen) {
      this.style.width = '100%';
    }
    
    switch(this._animationConfig.type) {
      case 'height':
        this.style.overflow = 'hidden'
        this.style.maxHeight = this._animationConfig.target ? `${this._animationConfig.target.offsetHeight}px` : '0';

        switch (this._animationConfig.origin) {
          case 'center':
            let transformValue = this.classList.contains('mdw-fullscreen') ? window.innerHeight / 2 : this.scrollHeight / 2;
            if (this._animationConfig.target) transformValue = this._animationConfig.target.getBoundingClientRect().y;
            this.style.transform = `translateY(${transformValue}px)`;
            break;

          case 'top left':
            if (this._animationConfig.target) {
              this.style.transform = `translate(${this._animationConfig.target.offsetTop}px, ${this._animationConfig.target.offsetLeft}px)`;
            }
            break;

          case 'top':
          default:
            if (this._animationConfig.target) {
              transformValue = this._animationConfig.target.offsetTop;
              this.style.transform = `translateY(${transformValue}px)`;
            }
            break;
        }
        break;

      case 'scale':
        this.style.transform = 'scale(0.9)';
        this.style.transformOrigin = this._animationConfig.origin || 'center';
    }

    if (this._animationConfig.opacity) {
      this.style.opacity = 0;
    }
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

  _addBodyClickEvent() {
    if (!this._clickOutsideClose || this.hasBodyEvent) return;
    setTimeout(() => {
      this.hasBodyEvent = true;
      document.body.addEventListener('click', this._boundHandleBodyClick);
    }, 0);
  }

  _removeBodyClickEvent() {
    if (this.hasBodyEvent) document.body.removeEventListener('click', this._boundHandleBodyClick);
    this.hasBodyEvent = false;
  }

  _addKeydownEvent() {
    this.hasKeydownEvent = true;
    document.body.addEventListener('keydown', this._boundHandleKeydown);
  }

  _removeKeydownEvent() {
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
    this._removeBodyClickEvent();
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

    if (this._container.nodeName === 'MDW-DATE-PICKER') {
      this._container = this._container.parentNode;
    }
    
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

  setHoistedPosition() {
    if (this._anchored) {
      this.setAnchoredPosition();
      this._autoPositionHoisted();
      return;
    }

    const split = (this.position || 'inner-top inner-left').split(' ');
    const aValue = split[0];
    const bValue = split[1];
    let { top, left } = this._calculateHoistedPosition(aValue, bValue);
    let { aValue: a, bValue: b } = this._adjustAnchoredPositions(aValue, bValue, top, left);
    let { top: t, left: l } = this._calculateHoistedPosition(a, b);
    this.style.width = `${this.width}px`;
    this.style.top = `${t}px`;
    this.style.left = `${l}px`;

    this._autoPositionHoisted();
  }

  setAnchoredPosition() {
    const split = (this.position || 'inner-top inner-left').split(' ');
    let aValue = split[0];
    let bValue = split[1];
    let { top, left } = this._calculateAnchoredPosition(aValue, bValue);
    let { aValue: a, bValue: b } = this._adjustAnchoredPositions(aValue, bValue, top, left);
    let { top: t, left: l } = this._calculateAnchoredPosition(a, b);
    this.style.width = `${this.width}px`;
    this.style.top = `${t}px`;
    this.style.left = `${l}px`;
  }

  _adjustAnchoredPositions(aValue, bValue, top, left) {
    const { clientWidth, clientHeight } = document.documentElement;
    const height = this.offsetHeight;
    const width = this.offsetWidth;

    switch (aValue) {
      case 'top':
        if (top < 0) aValue = 'bottom';
        break;
      case 'inner-top':
        if (top < 0) aValue = 'inner-bottom';
        break;
      case 'bottom':
        if (((top + height) - clientHeight) > 0) aValue = 'top';
        break;
      case 'inner-bottom':
        if (((top + height) - clientHeight) > 0) aValue = 'inner-top';
        break;
    }

    switch (bValue) {
      case 'left':
        if ((left + width) > clientWidth) bValue = 'right';
        break;
      case 'inner-left':
        if ((left + width) > clientWidth) bValue = 'inner-right';
        break;
      case 'right':
        if (left < 0) bValue = 'left';
        break;
      case 'inner-right':
        if (left < 0) bValue = 'inner-left';
        break;
    }

    return { aValue, bValue };
  }

  _calculateAnchoredPosition(aValue, bValue) {
    const bounds = this._container.getBoundingClientRect();
    const height = this.offsetHeight;
    const width = this.offsetWidth;
    let top = 0;
    let left = 0;

    switch (aValue) {
      case 'top':
        top = bounds.y - height;
        break;
      case 'inner-top':
        top = bounds.y;
        break;
      case 'bottom':
        top = bounds.y + bounds.height;
        break;
      case 'center':
        top = (bounds.y + (bounds.height / 2)) - (height / 2);
        break;
      case 'inner-bottom':
        top = bounds.y + bounds.height - height;
        break;
    }

    switch (bValue) {
      case 'left':
        left = bounds.x - width;
        break;
      case 'inner-left':
        left = bounds.x;
        break;
      case 'right':
        left = bounds.x + bounds.width;
        break;
      case 'inner-right':
        left = bounds.x + bounds.width - width;
        break;
      case 'center':
        left = (bounds.x + (bounds.width / 2)) - (width / 2);
        break;
    }

    return { top, left };
  }

  _calculateHoistedPosition(aValue, bValue) {
    const bounds = this._container.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    const height = this.offsetHeight;
    const width = this.offsetWidth;
    let top = 0;
    let left = 0;

    switch (aValue) {
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

    switch (bValue) {
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

    return { top, left };
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
    // this.style[this.transformPropertyName] = 'scale(1)';
  }

  resetPosition() {
    this.style.top = '';
    this.style.left = '';
    // this.style[this.transformPropertyName] = '';
  }


  setupScrollWithPage() {
    if (this._scrollingSetup) return;
    this._scrollContainer = document.querySelector('mdw-scroll-container') || document.body;
    this._scrollContainer.addEventListener('scroll', this.bound_onScroll);
    this._initialScrollPosition = this._scrollContainer.scrollTop + parseInt(`${this.style.top || '0'}`.replace('px', ''));
    this._scrollingSetup = true;
  }

  teardownScrollWithPage() {
    if (!this._scrollingSetup) return;
    this._scrollContainer.removeEventListener('scroll', this.bound_onScroll);
    this._scrollingSetup = false;
  }

  onScroll(event) {
    this.style.top = `${this._initialScrollPosition - this._scrollContainer.scrollTop}px`;
  }
});
