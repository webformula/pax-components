import { HTMLElementExtended } from '@webformula/pax-core';
import './top-bar.js';
import MDWUtils from '../../core/Utils.js';
import { addDragListener, removeDragListener, disableDragListenerForElement, enableDragListenerForElement } from '../../core/drag.js';

customElements.define('mdw-sheet-bottom', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onTransitionEnd = this._onTransitionEnd.bind(this);
    this.throttle_whileTransitionRun = MDWUtils.rafThrottle(this._whileTransitionRun.bind(this));
    this.bound_onTransitionEndClose = this._onTransitionEndClose.bind(this);
    this.bound_onDrag = this._onDrag.bind(this);
    this._setupTopBar();

    this._currentPosition = 0;
  }

  get title() {
    return this.getAttribute('mdw-title');
  }

  get isModal() {
    return this.hasAttribute('mdw-modal');
  }

  get contentElement() {
    return this.querySelector('mdw-content');
  }

  // half height for modal, quarter hight for non modal
  get _clientPosition() {
    const viewHeight = window.innerHeight;
    return this.isModal ? viewHeight / 2 : viewHeight / 4
  }

  get _isDraggable() {
    return this.contentElement.offsetHeight > this._clientPosition;
  }

  get _topPosition() {
    const viewHeight = window.innerHeight;
    const contentHeight = this.contentElement.offsetHeight;
    return viewHeight - (contentHeight >= viewHeight - 56 ? 0 : viewHeight - 56 - contentHeight);
  }

  get _maxScroll() {
    return this.contentElement.offsetHeight + 56;
  }

  get _scrollDistanceRemaining() {
    return this._maxScroll - this._currentPosition;
  }


  disconnectedCallback() {
    this._removeBackdrop();
  }

  show() {
    this._cancelTransitions();
    this.classList.add('mdw-show');

    this._calculateInitialPosition();
    this._positionBottom();
    this._animateToInitialPosition();
    this._addBackdrop();

    if (this._isDraggable) addDragListener(this.contentElement, this.bound_onDrag);
  }

  hide() {
    removeDragListener(this.contentElement, this.bound_onDrag);
    this._cancelTransitions();
    this.classList.add('mdw-animating-close');

    requestAnimationFrame(() => {
      this._positionBottom();
      this._transitioning = true;
      this._transitionRunInterval = setInterval(this.throttle_whileTransitionRun, 10);
      this.addEventListener('transitionend', this.bound_onTransitionEndClose);
    });
  }

  toggle() {
    if (this.classList.contains('mdw-show')) this.hide();
    else this.show();
  }
  

  _registerTopBar(element) {
    this._headerElement = element;
    this._headerElement.title = this.title;
  }

  _setupTopBar() {
    if (this.isModal) this.insertAdjacentHTML('afterbegin', `<mdw-sheet-top-bar mdw-title="${this.title}"></mdw-sheet-top-bar>`);
  }

  _showTopBar() {
    if (this._headerElement) this._headerElement.show();
  }

  _hideTopBar() {
    if (this._headerElement) this._headerElement.hide();
  }

  _addBackdrop() {
    if (this.isModal) {
      this._backdrop = MDWUtils.addBackdrop(this, () => {
        this.hide();
      });
    }
  }

  _removeBackdrop() {
    if (this._backdrop) this._backdrop.remove();
    this._backdrop = undefined;
  }

  _calculateInitialPosition() {
    const clientPosition = this._clientPosition;
    const contentHeight = this.contentElement.offsetHeight;

    // set position for center of the page unless the modal is not that tall
    this._initialPosition = Math.min(contentHeight, clientPosition);
  }

  _positionTop() {
    this._setPosition(this._topPosition);
  }

  _positionInitial() {
    this._setPosition(this._initialPosition);
  }

  _positionBottom() {
    this._currentPosition = 0;
    this.style.top = '100%';
  }

  _setPosition(y) {
    const maxScroll = this._maxScroll;
    if (y > maxScroll) y = maxScroll;

    this._isAtOrAboveTop = y >= window.innerHeight;
    this._currentPosition = y;
    this.style.top = `calc(100% - ${y}px)`;
  }

  _animateToPosition(y) {
    this.classList.add('mdw-animating-open');

    requestAnimationFrame(() => {
      this._setPosition(y);
      this._transitioning = true;
      this.addEventListener('transitionend', this.bound_onTransitionEnd);
    });
  }

  _animateToInitialPosition() {
    this.classList.add('mdw-animating-open');

    requestAnimationFrame(() => {
      this._positionInitial();
      this._transitioning = true;
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
    this._cancelTransitions();
  }

  _onTransitionEndClose() {
    this._cancelTransitions()
    this.classList.remove('mdw-show');
    this._removeBackdrop();
  }

  _whileTransitionRun() {
    // show / hide top bar
    if (this.getBoundingClientRect().y <= 20) this._showTopBar();
    else this._hideTopBar();
  }

  _onDrag(event) {
    switch (event.state) {
      case 'start':
        this._cancelTransitions();
        this._startPosition = this._currentPosition;
        this._statedAtOrAboveTop = this._isAtOrAboveTop;
        break;

      case 'move':
        this._setPosition(this._startPosition - event.distance.y);
        break;

      case 'end':
        this._handleScroll(event.velocity.y);
        break;
    }
  }

  _handleScroll(velocity) {
    this._transitioning = true;
    this.classList.add('mdw-animating-scroll');

    // snap based on velocity (swipe motion)

    // open all the way on swipe up
    if (!this._isAtOrAboveTop && velocity < -1.1) this._positionTop();

    //swipe back to initial position
    // if (this._statedAtOrAboveTop && velocity > 1.1) return this._positionInitial();

    // swipe away from initial position
    else if (!this._isAtOrAboveTop && velocity > 0.7) return this.hide();

    else {
      const direction = velocity > 0 ? 1 : -1;
      let distanceToMove = this._scrollDistanceRemaining * (Math.abs(velocity) / 3) * -direction;
      if (distanceToMove > this._scrollDistanceRemaining) distanceToMove = this._scrollDistanceRemaining;
      const newPosition = distanceToMove + this._currentPosition;

      // snap to top
      if (newPosition < this._topPosition + 80 && newPosition > this._topPosition - 80) this._positionTop();
      // snap to initial
      else if (newPosition < this._topPosition - 80) this._positionInitial();
      else {
        this.style.transitionDuration = `${((Math.abs(velocity) / 3) * 0.5) + 0.5}s`;
        this._setPosition(newPosition);
      }
    }

    this._transitionRunInterval = setInterval(this.throttle_whileTransitionRun, 10);
    this.addEventListener('transitionend', this.bound_onTransitionEnd);
  }
});
