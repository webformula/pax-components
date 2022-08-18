import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-top-app-bar', class extends HTMLElementExtended {
  constructor() {
    super();

    this._throttledShrinkScrollHandler = MDWUtils.rafThrottle(this._shrinkScrollHandler);
    this.bound_throttledShrinkScrollHandler = this._throttledShrinkScrollHandler.bind(this);

    this._throttledScrollHandler = MDWUtils.rafThrottle(this._scrollHandler);
    this.bound_throttledScrollHandler = this._throttledScrollHandler.bind(this);

    document.body.classList.add('mdw-has-top-app-bar');
  }

  connectedCallback() {
    this._isShrink = this.hasAttribute('mdw-shrink');
    this._isFixed = this.hasAttribute('mdw-fixed');
    if (this._isShrink || this._isFixed) this._observeWidth();

    /* request animation is required because connect callback does not guarantee elements exists
     * As far as i can tell the main problem is the script executes before the index.html file <body> is parsed fully;
     * One fix for this is place the scrips at the bottom of <body>
     * this other fix is to wait a frame. 
     * https://github.com/w3c/webcomponents/issues/551
     */
    requestAnimationFrame(() => {
      // This line is what is affected when requestAnimationFrame is not used
      this._scrollTarget = document.querySelector('mdw-scroll-container') || window;

      if (this._isShrink) this._setupShrink();
      if (this._isShrink || this._isFixed) this._scrollTarget.addEventListener('scroll', this.bound_throttledScrollHandler);
    });
  }

  disconnectedCallback() {
    if (this._widthObserver) {
      this._widthObserver.unobserve(this);
      this._widthObserver.disconnect();
      this._widthObserver = undefined;
    }
    if (this._isShrink) this._scrollTarget.removeEventListener('scroll', this.bound_throttledShrinkScrollHandler);
    if (this._isShrink || this._isFixed) this._scrollTarget.removeEventListener('scroll', this.bound_throttledScrollHandler);
  }

  get contentElement() {
    return this.querySelector('mdw-content');
  }

  notContextual() {
    this.removeAttribute('mdw-contextual');
  }

  contextual() {
    this.setAttribute('mdw-contextual', '');
  }

  // observe width and update content. This solves issues with position: fixed;
  _observeWidth() {
    this._widthObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width !== this._oldWidth) {
          this._oldWidth = entry.contentRect.width;
          this.querySelector('mdw-content').style.width = `${this._oldWidth}px`;
        }
      }
    });
    this._widthObserver.observe(this);
  }

  _setupShrink() {
    this._topAppBarHalfHeight = this.clientHeight / 2;
    this._animationElements = [...(this.querySelectorAll('[mdw-animation-property]') || [])].map(element => {
      const start = parseFloat(element.getAttribute('mdw-animation-start') || 0);
      const end = parseFloat(element.getAttribute('mdw-animation-end') || 0);
      const rawProperty = element.getAttribute('mdw-animation-property').split(':');
      return {
        element,
        property: rawProperty[0],
        valueWrapper: rawProperty[1] || '',
        start,
        end,
        range: Math.abs(start - end)
      };
    });
    this._scrollTarget.addEventListener('scroll', this.bound_throttledShrinkScrollHandler);
    this.bound_throttledShrinkScrollHandler();
  }

  _shrinkScrollHandler() {
    const currentScrollPosition = Math.max(this._getViewportScrollY(), 0);

    let position;
    if (currentScrollPosition <= this._topAppBarHalfHeight) position = currentScrollPosition;
    else position = this._topAppBarHalfHeight;

    if (this._lastShrinkPosition === position) return;
    this._lastShrinkPosition = position;

    // keep elements marked fixed from moving
    this.contentElement.style.transform = `translateY(-${position}px)`;
    this.querySelectorAll('section[mdw-fixed]').forEach((element) => {
      element.style.transform = `translateY(${position}px)`
    });

    // apply animation changes to elements based on animation properties
    const percent = position / this._topAppBarHalfHeight;
    this._animationElements.forEach(({ element, property, valueWrapper, start, range }) => (
      element.style[property] = valueWrapper.replace('#', start - (percent * range))
    ));
  }

  _getViewportScrollY() {
    return this._scrollTarget[this._scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
  }


  // this handles any non shrink related scroll activities (shadow, ...)
  _scrollHandler() {
    const currentScrollPosition = Math.max(this._getViewportScrollY(), 0);
    if (this._isShrink) this.classList.toggle('mdw-scrolled', currentScrollPosition > this._topAppBarHalfHeight);
    else this.classList.toggle('mdw-scrolled', currentScrollPosition > 0);
  }
});
