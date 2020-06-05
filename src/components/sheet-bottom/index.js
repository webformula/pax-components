import { HTMLElementExtended } from '@webformula/pax-core';
import './header.js';
import StandardHelper from './standard.js';
import ModalHelper from './modal.js';
import MDWUtils from '../../core/Utils.js';
import { addDragListener, removeDragListener } from '../../core/drag.js';

customElements.define('mdw-sheet-bottom', class extends HTMLElementExtended {
  constructor() {
    super();

    switch (this.type) {
      case 'modal':
        this._helpers = new ModalHelper(this);
        break;

      default:
        this._helpers = new StandardHelper(this);
        break;
    }

    this.bound_onTransitionEnd = this._onTransitionEnd.bind(this);
    this.bound_onTransitionEndClose = this._onTransitionEndClose.bind(this);
    this.bound_onDrag = this._onDrag.bind(this);

    this._helpers.setupHeader();
    this._setupOverScroll();
  }

  get title() {
    return this.getAttribute('mdw-title');
  }

  get type() {
    if (this.hasAttribute('mdw-modal')) return 'modal';
    return 'standard';
  }

  get contentElement() {
    return this.querySelector('mdw-content');
  }

  get contentHeight() {
    return this.contentElement.scrollHeight;
  }

  get _isDraggable() {
    return this._helpers.isDraggable;
  }

  get _headerHeight() {
    return this._helpers.headerElement.scrollHeight;
  }

  get _maxScroll() {
    return this.contentHeight + this._headerHeight;
  }

  get _topPosition() {
    const viewHeight = window.innerHeight;
    const contentHeight = this.contentHeight;
    const headerHeight = this._headerHeight;

    if (this.type === 'standard') return viewHeight - (55 - headerHeight);
    return viewHeight - (contentHeight >= viewHeight - headerHeight ? 55 - headerHeight : viewHeight - headerHeight - contentHeight);
  }

  get _scrollDistanceRemaining() {
    return this._maxScroll - this._currentPosition;
  }

  get _initialPosition() {
    return this._helpers.initialPosition;
  }

  show() {
    this._cancelTransitions();
    this.classList.add('mdw-show');

    this.style.height = `${this.contentHeight + this._headerHeight}px`;

    this._positionBottom();
    this._transitionToInitialPosition();
    this._helpers.addBackdrop();

    if (this._isDraggable) {
      addDragListener(this.contentElement, this.bound_onDrag);
      if (this._helpers.headerElement) addDragListener(this._helpers.headerElement, this.bound_onDrag);
    }
  }

  hide() {
    removeDragListener(this.contentElement, this.bound_onDrag);
    if (this._helpers.headerElement) removeDragListener(this._helpers.headerElement, this.bound_onDrag);
    this._cancelTransitions();
    this.classList.add('mdw-animating-close');
    this._positionBottom();
    this.addEventListener('transitionend', this.bound_onTransitionEndClose);
  }

  minimize() {
    if (this.type === 'modal') this.hide();
    else {
      this._cancelTransitions();
      this._transitionToPosition(this._initialPosition);
    }
  }

  toggle() {
    if (this.classList.contains('mdw-show')) this.hide();
    else this.show();
  }

  _registerHeader(element) {
    this._helpers.registerHeader(element);
  }

  _positionTop() {
    this._setPosition(this._topPosition);
  }

  _positionBottom() {
    this._currentPosition = 0;
    this.style.top = '100%';
  }

  _positionInitial() {
    this._setPosition(this._initialPosition);
  }

  _setPosition(y) {
    const maxScroll = this._maxScroll;
    let overScroll = 0;
    if (y > maxScroll) {
      const scale = 100;
      overScroll = scale * Math.log((y - maxScroll) + scale) - scale * Math.log(scale);
      y = maxScroll;
    }

    const isAtTopHeight = window.innerHeight + (this._headerHeight - 55);
    this._isAtTop = y === isAtTopHeight;
    this._isAboveTop = y > isAtTopHeight;
    this._isAtOrAboveTop = this._isAtTop || this._isAboveTop;
    this._currentPosition = y;
    this.style.top = `calc(100% - ${y + overScroll}px)`;

    const initialToTopDistance = window.innerHeight - this._initialPosition;
    const targetingTop = !this._isAtOrAboveTop && (y - this._initialPosition) >= initialToTopDistance / 2;
    const targetingInitial = !this._isAtOrAboveTop && (y - this._initialPosition) < initialToTopDistance / 2;
    this._helpers.handleOnMove({
      position: y,
      isAtTop: this._isAtTop,
      isAboveTop: this._isAboveTop,
      targetingTop,
      targetingInitial
    });
  }

  // if resting at initial position then positionTop
  _transitionToNearestPosition() {
    const newPosition = this._currentPosition;

    // if is at initial position based on offsetTop
    if (this._initialOffsetTop === this.offsetTop) return this._transitionToTopPosition();

    const halfWayPoint = (this._topPosition - this._initialPosition) / 2;
    if ((newPosition - this._initialPosition) >= halfWayPoint) this._transitionToTopPosition();
    else this._transitionToInitialPosition();
  }

  _transitionToTopPosition() {
    this._transitionToPosition(this._topPosition);
  }

  _transitionToInitialPosition() {
    this._transitionToPosition(this._initialPosition);
  }

  _transitionToPosition(y) {
    this.classList.add('mdw-animating-open');

    requestAnimationFrame(() => {
      this._setPosition(y);
      this.addEventListener('transitionend', this.bound_onTransitionEnd);
    });
  }

  _cancelTransitions() {
    this.classList.remove('mdw-animating-open');
    this.classList.remove('mdw-animating-close');
    this.classList.remove('mdw-animating-scroll');
    this.style.transitionDuration = '';
    this.removeEventListener('transitionend', this.bound_onTransitionEnd);
    this.removeEventListener('transitionend', this.bound_onTransitionEndClose);

    if (this._transitionRunInterval) {
      clearInterval(this._transitionRunInterval);
      this._transitionRunInterval = undefined;
    }
  }

  _onTransitionEnd() {
    this._initialOffsetTop = this.offsetTop;
    this._cancelTransitions();
  }

  _onTransitionEndClose() {
    this._cancelTransitions()
    this.classList.remove('mdw-show');
    this._helpers.removeBackdrop();
  }

  // --- drag / swipe
  _onDrag(event) {
    switch (event.state) {
      case 'start':
        this._cancelTransitions();
        this._startPosition = this._currentPosition;
        this.classList.add('mdw-dragging');
        break;

      case 'move':
        this._setPosition(this._startPosition - event.distance.y);
        break;

      case 'end':
        this.classList.add('mdw-animating-scroll');
        this._handleScrollEnd(event.velocity.y, event.direction.y);
        // this._transitionRunInterval = setInterval(this.throttle_whileTransitionRun, 10);
        this.addEventListener('transitionend', this.bound_onTransitionEnd);
        this.classList.remove('mdw-dragging');
        break;
    }
  }

  _handleScrollEnd(velocity, direction) {
    // open all the way on swipe up
    if (!this._isAtOrAboveTop && velocity < -1.1) this._positionTop();

    // close when swipe down from initial position
    else if (!this._isAtOrAboveTop && velocity > 0.7) return this.minimize();

    // scrolling and snapping
    else {
      const multiplier = Math.abs(velocity) / 3;
      let distanceToMove = this._scrollDistanceRemaining * multiplier * -direction;
      if (distanceToMove > this._scrollDistanceRemaining) distanceToMove = this._scrollDistanceRemaining;
      const newPosition = distanceToMove + this._currentPosition;

      if (this._isAtOrAboveTop) {
        if (newPosition < this._topPosition + 80) this._positionTop();
        else {
          this.style.transitionDuration = `${(multiplier * 0.5) + 0.3}s`;
          this._setPosition(newPosition);
        }

      // snap to either top or initial. Do not allow arbitrary positioning below top
      } else {
        const halfWayPoint = (this._topPosition - this._initialPosition) / 2;
        if ((newPosition - this._initialPosition) >= halfWayPoint) this._positionTop();
        else this._positionInitial();
      }
    }
  }

  _setupOverScroll() {
    this.insertAdjacentHTML('beforeend', '<div class="mdw-sheet-bottom-over-scroll"></div>');
  }
});
