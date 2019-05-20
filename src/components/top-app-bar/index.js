customElements.define('mdw-top-app-bar', class extends HTMLElementExtended {
  constructor() {
    super();
    this.MAX_TOP_APP_BAR_HEIGHT = 128;
    this.isCurrentlyBeingResized = false;
    this.currentAppBarOffsetTop = 0;
    this.wasDocked = true;
    this.isDockedShowing = true;
    this.isCurrentlyBeingResized = false;
  }

  connectedCallback() {
    this.scrollTarget = this.getScrollTarget();
    this.lastScrollPosition = this.getViewportScrollY();
    this.topAppBarHeight = this.height;

    // add spacer to content area
    // TODO add another class based on prominent, dense
    if (this.hasContent && !this.scrollTarget.querySelector('.mdw-top-app-bar')) {
      const div = document.createElement('div');
      div.classList.add('mdw-top-app-bar');
      this.scrollTarget.prepend(div);
    }

    document.body.classList.add('mdw-top-app-bar');

    this.throttledScrollHandler = MDWUtils.rafThrottle(this.scrollHandler);
    this.throttledResizeHandler = MDWUtils.rafThrottle(this.resizeHandler);
    this.scrollTarget.addEventListener('scroll', this.throttledScrollHandler.bind(this));
    window.addEventListener('resize', this.throttledResizeHandler.bind(this));
  }

  disconnectedCallback() {
    this.scrollTarget.removeEventListener('scroll', this.throttledScrollHandler.bind(this));
    window.removeEventListener('resize', this.throttledResizeHandler.bind(this));
  }

  get fixed() {
    return this.classList.contains('mdw-fixed');
  }

  get height() {
    return this.clientHeight;
  }

  getScrollTarget() {
    if (this.parentNode.nodeName === 'MDW-PAGE') {
      const content = document.querySelector('mdw-content');
      if (content) {
        this.hasContent = true;
        return content;
      }
    }
    return window;
  }

  topAppBarScrollHandler() {
    const currentScrollPosition = Math.max(this.getViewportScrollY(), 0);
    const diff = currentScrollPosition - this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition;

    // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.
    if (!this.isCurrentlyBeingResized) {
      this.currentAppBarOffsetTop -= diff;

      if (this.currentAppBarOffsetTop > 0) {
        this.currentAppBarOffsetTop = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
        this.currentAppBarOffsetTop = -this.topAppBarHeight;
      }

      this.moveTopAppBar();
    }
  }

  moveTopAppBar() {
    if (this.checkForUpdate()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      let offset = this.currentAppBarOffsetTop;
      if (Math.abs(offset) >= this.topAppBarHeight) {
        offset = -this.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.style.top = offset + 'px';
    }
  }

  checkForUpdate() {
    const offscreenBoundaryTop = -this.topAppBarHeight;
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;

    // If it's partially showing, it can't be docked.
    if (partiallyShowing) {
      this.wasDocked = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked) {
        this.wasDocked = true;
        return true;
      } else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
        this.isDockedShowing = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }

  resizeHandler() {
    this.isCurrentlyBeingResized = true;
    const currentHeight = this.height;
    if (this.topAppBarHeight !== currentHeight) {
      this.wasDocked = false;

      // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.
      this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
      this.topAppBarHeight = currentHeight;
    }
    this.topAppBarScrollHandler();
    this.isCurrentlyBeingResized = false;
  }


  scrollHandler() {
    const currentScrollPosition = Math.max(this.getViewportScrollY(), 0);

    if (!this.fixed) {
      const diff = currentScrollPosition - this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;

      // If the window is being resized the lastScrollPosition_ needs to be updated but the
      // current scroll of the top app bar should stay in the same position.
      if (!this.isCurrentlyBeingResized) {
        this.currentAppBarOffsetTop -= diff;

        if (this.currentAppBarOffsetTop > 0) {
          this.currentAppBarOffsetTop = 0;
        } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
          this.currentAppBarOffsetTop = -this.topAppBarHeight;
        }

        this.moveTopAppBar();
      }
    } else {
      if (currentScrollPosition <= 0) {
        if (this.wasScrolled_) {
          this.classList.remove('mdw-scrolled');
          this.wasScrolled_ = false;
        }
      } else {
        if (!this.wasScrolled_) {
          this.classList.add('mdw-scrolled');
          this.wasScrolled_ = true;
        }
      }
    }
  }

  getViewportScrollY() {
    return this.scrollTarget[this.scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
  }
});
