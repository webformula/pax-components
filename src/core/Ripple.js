class MDWRipple {
  constructor(config = {}) {
    this.RIPPLE_FADE_IN_DURATION = 200;
    this.RIPPLE_FADE_OUT_DURATION = 150;
    this.RIPPLE_STATE = {
      FADING_IN: 'FADING_IN',
      VISIBLE: 'VISIBLE',
      FADING_OUT: 'FADING_OUT',
      HIDDEN: 'HIDDEN'
    };

    if (!config.element) throw Error('requires config.element');
    if (!config.triggerElement) throw Error('requires config.triggerElement');

    this.element = config.element;
    this.triggerElement = [].concat(config.triggerElement).filter(el => !!el);
    this.centered = !!config.centered;
    this.speedFactor = config.speedFactor || 1;
    this.radius = config.radius;
    this.color = config.color || null;
    this.persistent = !!config.persistent;
    this.activeRipples = new Set();
    this.isMousedown = false;
    this.bound_mousesdown_ = this.mousesdown_.bind(this);
    this.bound_mouseup_ = this.mouseup_.bind(this);
    this.bound_mouseleave_ = this.mouseleave_.bind(this);

    this.triggerElement.forEach(el => {
      el.addEventListener('mousedown', this.bound_mousesdown_);
    });
  }

  destroy() {
    this.triggerElement.forEach(el => {
      el.removeEventListener('mousedown', this.bound_mousesdown_);
    });
  }

  mousesdown_(event) {
    this.isMousedown = true;
    this.triggerElement.forEach(el => {
      el.addEventListener('mouseup', this.bound_mouseup_);
      el.addEventListener('mouseleave', this.bound_mouseleave_);
    });
    this.fadeInRipple(event.pageX, event.pageY);
  }

  mouseup_(event) {
    this.isMousedown = false;
    // Fade-out all ripples that are completely visible and not persistent.
    this.activeRipples.forEach(ripple => {
      if (!ripple.config.persistent && ripple.state === this.RIPPLE_STATE.VISIBLE) ripple.fadeOut();
    });
    this.triggerElement.forEach(el => {
      el.removeEventListener('mouseup', this.bound_mouseup_);
      el.removeEventListener('mouseleave', this.bound_mouseleave_);
    });
  }

  mouseleave_() {
    if (this.isMousedown) this.mouseup_();
  }


  fadeInRipple(pageX, pageY) {
    const containerRect = this.element.getBoundingClientRect();

    if (this.centered) {
      pageX = containerRect.left + containerRect.width / 2;
      pageY = containerRect.top + containerRect.height / 2;
    } else {
      // Subtract scroll values from the coordinates because calculations below
      // are always relative to the viewport rectangle.
      const scrollPosition = this.getViewportScrollPosition();
      pageX -= scrollPosition.left;
      pageY -= scrollPosition.top;
    }

    const radius = this.radius || this.distanceToFurthestCorner(pageX, pageY, containerRect);
    const duration = this.RIPPLE_FADE_IN_DURATION * (1 / this.speedFactor);
    const offsetX = pageX - containerRect.left;
    const offsetY = pageY - containerRect.top;

    const ripple = document.createElement('div');
    ripple.classList.add('mdw-ripple-element');
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;

    // If the color is not set, the default CSS color will be used.
    ripple.style.backgroundColor = this.color;
    ripple.style.transitionDuration = `${duration}ms`;

    this.element.appendChild(ripple);

    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical because then the `scale` would not animate properly.
    this.enforceStyleRecalculation(ripple);

    ripple.style.transform = 'scale(1)';

    // Exposed reference to the ripple that will be returned.
    let rippleRef = {
      config: {
        centered: this.centered,
        tiggerElement: this.triggerElement,
        speedFactor: this.speedFactor,
        radius: radius,
        color: this.color,
        persistent: this.persistent,
        duration: duration
      },
      element: ripple,
      fadeOut: () => fadeOut(),
      state: this.RIPPLE_STATE.FADING_IN
    };
    const fadeOut = () => {
      this.fadeOutRipple(rippleRef)
    };

    // Add the ripple reference to the list of all active ripples.
    this.activeRipples.add(rippleRef);

    // Wait for the ripple element to be completely faded in.
    // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
    setTimeout(() => {
      rippleRef.state = this.RIPPLE_STATE.VISIBLE;
      if (!this.persistent && !this.isMousedown) rippleRef.fadeOut();
    }, duration);
  }

  fadeOutRipple(rippleRef) {
    // For ripples that are not active anymore, don't re-un the fade-out animation.
    if (!this.activeRipples.delete(rippleRef)) return;

    const rippleEl = rippleRef.element;

    rippleEl.style.transitionDuration = `${this.RIPPLE_FADE_OUT_DURATION}ms`;
    rippleEl.style.opacity = '0';
    rippleRef.state = this.RIPPLE_STATE.FADING_OUT;

    // Once the ripple faded out, the ripple can be safely removed from the DOM.
    setTimeout(() => {
      rippleRef.state = this.RIPPLE_STATE.HIDDEN;
      rippleEl.parentNode.removeChild(rippleEl);
    }, this.RIPPLE_FADE_OUT_DURATION);
  }

  distanceToFurthestCorner(x, y, rect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }

  getViewportScrollPosition() {
    const documentRect = document.documentElement.getBoundingClientRect();

    // The top-left-corner of the viewport is determined by the scroll position of the document
    // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
    // whether `document.body` or `document.documentElement` is the scrolled element, so reading
    // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
    // `document.documentElement` works consistently, where the `top` and `left` values will
    // equal negative the scroll position.
    const top = -documentRect.top || document.body.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
    const left = -documentRect.left || document.body.scrollLeft || window.scrollX || document.documentElement.scrollLeft || 0;

    return {top, left};
  }

  /** Enforces a style recalculation of a DOM element by computing its styles. */
  // TODO(devversion): Move into global utility function.
  enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
  }
};
