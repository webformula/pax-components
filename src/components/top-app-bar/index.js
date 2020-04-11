import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-top-app-bar', class extends HTMLElementExtended {
  constructor() {
    super();

    this._throttledScrollHandler = MDWUtils.rafThrottle(this._scrollHandler);
    this._throttledResizeHandler = MDWUtils.rafThrottle(this._resizeHandler);
    this.bound_throttledScrollHandler = this._throttledScrollHandler.bind(this);
    this.bound_throttledResizeHandler = this._throttledResizeHandler.bind(this);
  }

  connectedCallback() {
    this._isProminent = this.hasAttribute('mdw-prominent');
    this._isFixed = this.hasAttribute('mdw-fixed');
    this._isShrink = this.hasAttribute('mdw-shrink');

    if (this.parentNode && this.parentNode.nodeName === 'HEADER') {
      this.parentNode.classList.add('mdw-top-app-bar');
      if (this._isProminent) this.parentNode.classList.add('mdw-prominent');
      if (this._isFixed) this.parentNode.classList.add('mdw-fixed');
      if (this._isShrink) this.parentNode.classList.add('mdw-shrink');
    }

    if (this._isShrink) {
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

      this._scrollTarget = this._getScrollTarget();
      this._lastScrollPosition = this._getViewportScrollY();
      this._topAppBarHeight = this.clientHeight + 6;
      this._scrollHandler();
      this._createObserver();

      this._scrollTarget.addEventListener('scroll', this.bound_throttledScrollHandler);
      // window.addEventListener('resize', this.throttledResizeHandler.bind(this));
    }

    document.body.classList.add('mdw-top-app-bar');
  }

  disconnectedCallback() {
    if (this._observer) this._observer.destroy();
    if (this._scrollTarget) this._scrollTarget.removeEventListener('scroll', this.throttledScrollHandler.bind(this));
    // window.removeEventListener('resize', this.throttledResizeHandler.bind(this));
  }

  notContextual() {
    this.removeAttribute('mdw-contextual');
  }

  contextual() {
    this.setAttribute('mdw-contextual', '');
  }



  _getAllFixedSections() {
    return this.querySelectorAll('section[mdw-fixed]');
  }

  _getScrollTarget() {
    if (this.parentNode.nodeName === 'MDW-PAGE') {
      const content = document.querySelector('mdw-content');
      if (content) {
        this.hasContent = true;
        return content;
      }
    }
    return window;
  }

  _getViewportScrollY() {
    return this._scrollTarget[this._scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
  }

  _scrollHandler() {
    const currentScrollPosition = Math.max(this._getViewportScrollY(), 0);
    // const diff = currentScrollPosition - this._lastScrollPosition;
    // this._lastScrollPosition = currentScrollPosition;
    
    let position;
    if (this._isProminent) {
      const halfHeight = this._topAppBarHeight / 2;
      if (currentScrollPosition <= halfHeight) position = currentScrollPosition;
      else position = halfHeight;
    } else if (currentScrollPosition <= this._topAppBarHeight) position = currentScrollPosition;
    else position = this._topAppBarHeight;

    this.style.transform = `translateY(-${position}px)`;
    this._getAllFixedSections().forEach((element) => {
      element.style.transform = `translateY(${position}px)`
    });
  }

  _resizeHandler() {
    
  }

  _createObserver() {
    if (this._animationElements.length === 0) return;
    this._observer = new IntersectionObserver(this._handleIntersect.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: this._buildThresholdList()
    });
    this._observer.observe(this);
  }

  _buildThresholdList() {
    let thresholds = [];
    let numSteps = 68;

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }

    this._intersectionThresholds = thresholds;
    return this._intersectionThresholds;
  }

  _handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      let percent;
      if (this._isProminent) percent = -entry.boundingClientRect.top / (this._topAppBarHeight / 2);
      this._animationElements.forEach(v => this._animationValue(percent, v));
    });
  }

  _animationValue(percent, { element, property, valueWrapper, start, end, range}) {
    element.style[property] = valueWrapper.replace('#', start - (percent * range));
  }
});
