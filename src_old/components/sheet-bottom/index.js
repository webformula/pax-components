import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import './header.js';
import StandardHelper from './standard-helper.js';
import ModalHelper from './modal-helper.js';
import { addDragListener, removeDragListener } from '../../core/drag.js';
import MDWUtils from '../../core/Utils.js';

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
    return this.contentElement.offsetHeight;
  }

  get _isDraggable() {
    return this._helpers.isDraggable;
  }

  get _headerHeight() {
    return this._helpers.headerElement.offsetHeight;
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

  get _minimizedPosition() {
    return this._helpers.minimizedPosition;
  }

  get _isAnchored() {
    return this.hasAttribute('mdw-anchored');
  }

  disconnectedCallback() {
    // make sure we don't accidentally lock the page scroll for ever
    if (this.classList.contains('mdw-dragging')) {
      MDWUtils.unlockPageScroll();
      MDWUtils.disableUserSelect();
    }

    this._cancelTransitions();
  }

  open() {
    this._cancelTransitions();
    this.classList.add('mdw-show');

    this.style.height = `${this.contentHeight + this._headerHeight}px`;

    this._positionBottom();
    if (this._isAnchored) this._transitionToPosition(this._minimizedPosition);
    else this._transitionToPosition(this._initialPosition);
    this._helpers.addBackdrop();
    
    if (this._isDraggable) {
      addDragListener(this.contentElement, this.bound_onDrag);
      if (this._helpers.headerElement) addDragListener(this._helpers.headerElement, this.bound_onDrag);
    }

    this._notifyOpen();
  }

  async close() {
    return new Promise(resolve => {
      removeDragListener(this.contentElement, this.bound_onDrag);
      if (this._helpers.headerElement) removeDragListener(this._helpers.headerElement, this.bound_onDrag);
      this._cancelTransitions();
      this.classList.add('mdw-animating-close');
      this._positionBottom();
      this._helpers.removeBackdrop();

      // TODO fix closing animation
      this.addEventListener('transitionend', () => {
        this._cancelTransitions()
        this.classList.remove('mdw-show');
        resolve();
      }, { once: true });

      this._notifyClose();
    });
  }

  minimize() {
    this._cancelTransitions();
    this._transitionToPosition(this._minimizedPosition);
  }

  exitFullscreen() {
    this._cancelTransitions();
    if (this._isAnchored) this._transitionToPosition(this._minimizedPosition);
    else this._transitionToPosition(this._initialPosition);
  }

  toggle() {
    if (this.classList.contains('mdw-show')) this.close();
    else this.open();
  }

  _notifyClose() {
    this.dispatchEvent(new Event('MDWSheet:closed', this));
  }

  _notifyOpen() {
    this.dispatchEvent(new Event('MDWSheet:opened'), this);
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

  _positionMinimized() {
    this._setPosition(this._minimizedPosition);
  }

  // TODO fix whatever is continually calling this
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
    if (this._initialOffsetTop === this.offsetTop) {
      if (newPosition === this._minimizedPosition) return this._transitionToPosition(this._initialPosition);
      else return this._transitionToPosition(this._topPosition);
    }

    const halfWayPoint = (this._topPosition - this._initialPosition) / 2;
    if ((newPosition - this._initialPosition) >= halfWayPoint) this._transitionToPosition(this._topPosition);
    else this._transitionToPosition(this._initialPosition);
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
        MDWUtils.lockPageScroll();
        MDWUtils.disableUserSelect();
        // TODO figure out global hover disable
        break;

      case 'move':
        this._setPosition(this._startPosition - event.distance.y);
        break;

      case 'end':
        this.classList.add('mdw-animating-scroll');
        this._handleScrollEnd(event.velocity.y, event.direction.y);
        this.addEventListener('transitionend', this.bound_onTransitionEnd);
        this.classList.remove('mdw-dragging');
        MDWUtils.unlockPageScroll();
        MDWUtils.enableUserSelect();
        break;
    }
  }

  _handleScrollEnd(velocity, direction) {
    // open all the way on swipe up
    if (!this._isAtOrAboveTop && velocity < -1.1) this._positionTop();

    // close when swipe down from initial position
    else if (!this._isAtOrAboveTop && velocity > 1.6) {
      if (this.type === 'modal') return this.close();
      return this.minimize();
    }

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
