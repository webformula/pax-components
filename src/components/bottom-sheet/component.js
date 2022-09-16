import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import './component.css';

customElements.define('mdw-bottom-sheet', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #initialDragPosition;
  #initialScrollPosition;
  #lastScrollTop;
  #overScrollScale = 50;
  #drag = new Drag(this);
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragStart_bound = this.#onDragStart.bind(this);
  #onDragEnd_bound = this.#onDragEnd.bind(this);
  #cancelDragAnimation_bound = this.#cancelDragAnimation.bind(this);
  #onResize_bound = this.#onResize.bind(this);

  constructor() {
    super();

    this.insertAdjacentHTML('afterbegin', '<div class="mdw-drag-handle"></div>');

    this.#drag.onDrag(this.#onDrag_bound);
    this.#drag.onStart(this.#onDragStart_bound);
    this.#drag.onEnd(this.#onDragEnd_bound);
  }

  get #windowHeight() {
    return window.innerHeight;
  }

  get #defaultPosition() {
    return this.#windowHeight - 220;
  }

  get #minimizedPosition() {
    return this.#windowHeight - 64;
  }

  // get #minimizeTopLimit() {
  //   return this.#windowHeight - 56;
  // }

  // get #positionLimit() {
  //   return this.#windowHeight - this.offsetHeight;
  // }

  connectedCallback() {
    this.#drag.enable();
  }

  #onDragStart() {
    this.#cancelDragAnimation();
    this.#initialDragPosition = parseInt(getComputedStyle(this).getPropertyValue('top').replace('px', ''));
    this.#initialScrollPosition = this.scrollTop;
    this.#lastScrollTop = 0;

    // window.addEventListener('resize', this.#onResize_bound);
  }

  #onDrag({ distance, direction, event }) {
    if (this.scrollTop === this.#lastScrollTop && direction.y === -1 && this.style.overflow === 'scroll') {
      this.scrollTop += Math.round(-distance.moveY);
      this.#lastScrollTop = this.scrollTop;
      return;
    }

    if (this.scrollTop > 80) return;
    if (this.scrollTop > 0 && direction.y === -1) return;

    if (this.scrollTop > 0 && direction.y === 1) {
      this.style.top = `-${this.scrollTop}px`;
      this.scrollTop = 0;
      this.style.overflow = 'visible';
      this.style.height = '';
      this.#initialDragPosition = parseInt(getComputedStyle(this).getPropertyValue('top').replace('px', ''));
      this.#drag.resetDistance();
      return;
    }


    let top = this.#initialDragPosition + distance.y;
    // if (top >= this.#minimizeTopLimit) top = this.#minimizeTopLimit;

    if (top > -80 && direction.y === 1) {
      this.style.top = `${top}px`;
      this.style.overflow = 'visible';
      this.style.height = '';
      // event.preventDefault();
      return;
    }

    if (top < 0 && direction.y === -1) {
      this.style.top = '0';
      this.style.overflow = 'scroll';
      this.style.height = '100%';
      return;
    }

    if (top > 0 && direction.y === -1) {
      this.style.top = `${top}px`;
      // event.preventDefault();
      return;
    }
  }

  // TODO swipe close
  #onDragEnd({ direction, distance, velocity }) {
    // window.removeEventListener('resize', this.#onResize_bound);

    const top = this.#initialDragPosition + distance.y;
    if (top >= 0 && this.scrollTop < 80) {
      // swipe up from default position
      if (top <= this.#defaultPosition && velocity.y < -1.1) return this.#positionTop();

      // return to default from top
      if (velocity.y > 1.6 && top <= this.#defaultPosition + 80) return this.#positionDefault();

      // minimize from default
      if (velocity.y > 1.6 && this.#initialDragPosition === this.#defaultPosition) return this.#positionMinimized();

      // scroll and snap
      const multiplier = Math.abs(velocity.y) / 3;
      const scrollDistanceRemaining = this.offsetHeight - this.#windowHeight + top;
      let distanceToMove = scrollDistanceRemaining * multiplier * -direction.y;
      if (distanceToMove > scrollDistanceRemaining) distanceToMove = scrollDistanceRemaining;
      const newTopPosition = top - distanceToMove;

      if (direction.y === -1) {
        if (newTopPosition < 0) return this.#animateToPosition(newTopPosition, multiplier);
        if (newTopPosition < this.#defaultPosition - 80) return this.#positionTop();
        if (newTopPosition >= this.#defaultPosition + 80) return this.#positionMinimized();
        return this.#positionDefault();
      } else {
        if (newTopPosition < -180) return this.#animateToPosition(newTopPosition, multiplier);
        if (newTopPosition < 180) return this.#positionTop();
        if (newTopPosition < this.#defaultPosition + 80) return this.#positionDefault();
        if (newTopPosition >= this.#defaultPosition + 80) return this.#positionMinimized();
      }
    }
  }

  #animateToPosition(top, multiplier) {
    if (this.scrollTop !== 0) {
      this.style.top = `-${this.scrollTop}px`;
      this.scrollTop = 0;
      this.style.overflow = 'visible';
      this.style.height = '';
    }

    this.classList.add('mdw-drag-animation');
    this.addEventListener('transitionend', this.#cancelDragAnimation_bound);

    if (multiplier) this.style.transitionDuration = `${(multiplier * 0.5) + 0.3}s`;
    else this.style.transitionDuration = '';
    this.style.top = `${top}px`;
  }

  #onResize() {
    this.#windowHeight = window.innerHeight;
  }


  // #onDragStart() {
  //   this.#cancelDragAnimation();
  //   this.#defaultPosition = window.innerHeight - 220;
  //   this.#minimizedPosition = window.innerHeight - 64;
  //   this.#minimizeTopLimit = window.innerHeight - 56;
  //   this.#positionLimit = window.innerHeight - this.offsetHeight;
  //   this.#initialDragPosition = parseInt(getComputedStyle(this).getPropertyValue('top').replace('px', ''));
  // }

  // #onDrag({ distance }) {
  //   let top = this.#initialDragPosition + distance.y;
  //   if (top >= this.#minimizeTopLimit) top = this.#minimizeTopLimit;
  //   this.classList.remove('mdw-over-scroll');

  //   let overScroll = 0;
  //   if (top < this.#positionLimit) {
  //     this.classList.add('mdw-over-scroll');
  //     overScroll = this.#overScrollScale * Math.log(this.#positionLimit - top + this.#overScrollScale) - this.#overScrollScale * Math.log(this.#overScrollScale);
  //     top = this.#positionLimit;
  //   }

  //   this.style.top = `${top - overScroll}px`;
  // }

  // // TODO swipe close
  // #onDragEnd({ direction, distance, velocity }) {
  //   this.classList.add('mdw-drag-animation');
  //   this.addEventListener('transitionend', this.#cancelDragAnimation_bound);

  //   const top = this.#initialDragPosition + distance.y;

  //   // swipes
  //   if (top >= 0) {
  //     // swipe up from default position
  //     if (top <= this.#defaultPosition && velocity.y < -1.1) return this.#positionTop();

  //     // return to default from top
  //     if (velocity.y > 1.6 && top <= this.#defaultPosition + 80) return this.#positionDefault();

  //     // minimize from default
  //     if (velocity.y > 1.6 && this.#initialDragPosition === this.#defaultPosition) return this.#positionMinimized();
  //   }


  //   // scroll and snap
  //   const multiplier = Math.abs(velocity.y) / 3;
  //   const scrollDistanceRemaining = this.offsetHeight - window.innerHeight + top;
  //   let distanceToMove = scrollDistanceRemaining * multiplier * -direction.y;
  //   if (distanceToMove > scrollDistanceRemaining) distanceToMove = scrollDistanceRemaining;
  //   const newTopPosition = top - distanceToMove;

  //   if (direction.y === -1) {
  //     if (newTopPosition < 0) return this.#animateToPosition(newTopPosition, multiplier);
  //     if (newTopPosition < this.#defaultPosition - 80) return this.#positionTop();
  //     if (newTopPosition >= this.#defaultPosition + 80) return this.#positionMinimized();
  //     return this.#positionDefault();
  //   } else {
  //     if (newTopPosition < -180) return this.#animateToPosition(newTopPosition, multiplier);
  //     if (newTopPosition < 180) return this.#positionTop();
  //     if (newTopPosition < this.#defaultPosition + 80) return this.#positionDefault();
  //     if (newTopPosition >= this.#defaultPosition + 80) return this.#positionMinimized();
  //   }
  // }

  // #animateToPosition(top, multiplier) {
  //   if (multiplier) this.style.transitionDuration = `${(multiplier * 0.5) + 0.3}s`;
  //   else this.style.transitionDuration = '';
  //   this.style.top = `${top}px`;
  // }


  #positionTop() {
    this.#animateToPosition(0);
  }

  #positionDefault() {
    this.#animateToPosition(this.#defaultPosition);
  }

  #positionMinimized() {
    this.#animateToPosition(this.#minimizedPosition);
  }

  #cancelDragAnimation() {
    this.classList.remove('mdw-drag-animation');
    this.style.transitionDuration = '';
    this.removeEventListener('transitionend', this.#cancelDragAnimation_bound);
  }
});
