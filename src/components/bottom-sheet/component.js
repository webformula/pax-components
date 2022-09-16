import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import './component.css';
import util from '../../core/util.js';

customElements.define('mdw-bottom-sheet', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #initialDragPosition;
  #lastScrollTop;
  #defaultDragPositionOffset;
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

    this.#defaultDragPositionOffset = this.#styleTopValue / this.#windowHeight;

    // TODO change calculations to use bottom not top
    //  This will fix the issues with ios safari's auto collapsing address bar
    //  Cannot calculate the bottom values in css due to needing the offset height and window height
    //  remove css var, remove top from css
    //  containerHeight - ( windowHeight * percentOffsetFromBottom )
    // this.style.bottom = `-${this.offsetHeight - (this.#windowHeight * 0.4)}px`;

    window.addEventListener('resize', this.#onResize_bound);

    setTimeout(() => {
      console.log('-', window.innerHeight)
    }, 100)
  }

  #onResize() {
    // const difference = this.#lastWindowHeight - this.#windowHeight;
    // this.style.top = `${this.#lastStyleTopValue - difference}px`;
    // console.log(difference, this.#lastStyleTopValue, this.#styleTopValue)

    this.#defaultDragPositionOffset = this.#styleTopValue / this.#windowHeight;
  }

  get #styleTopValue() {
    return parseFloat(getComputedStyle(this).getPropertyValue('top').replace('px', ''));
  }

  get #windowHeight() {
    return window.innerHeight;
  }

  get #defaultPosition() {
    return this.#windowHeight * this.#defaultDragPositionOffset;
  }

  get #minimizedPosition() {
    return this.#windowHeight - 64;
  }

  connectedCallback() {
    this.#drag.enable();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.#onResize_bound);
  }

  #onDragStart({ event }) {
    this.#cancelDragAnimation();

    document.querySelector('html').style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.querySelector('html').style.touchAction = 'none';
    document.body.style.touchAction = 'none';

    this.#initialDragPosition = this.#styleTopValue;
    this.#lastScrollTop = 0;
    if (this.#initialDragPosition > 0) event.preventDefault();
  }

  #onDrag({ distance, direction }) {
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
      this.#initialDragPosition = this.#styleTopValue;
      this.#drag.resetDistance();
      return;
    }

    let top = this.#initialDragPosition + distance.y;

    if (top > -80 && direction.y === 1) {
      this.style.top = `${top}px`;
      this.style.overflow = 'visible';
      this.style.height = '';
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
      return;
    }
  }

  // TODO swipe close
  #onDragEnd({ direction, distance, velocity }) {
    const top = this.#initialDragPosition + distance.y;

    if (top >= 0 && this.scrollTop < 80) {
      // swipe up from default position
      if (top <= this.#defaultPosition && velocity.y < -1.1) return this.#positionTop();

      // return to default from top
      if (velocity.y > 1.6 && top <= this.#defaultPosition + 80) return this.#positionDefault();

      // minimize from default
      if (velocity.y > 1.6 && this.#initialDragPosition === this.#defaultPosition) return this.#positionMinimized();

      // default from minimized
      if (velocity.y < -0.7 && top > this.#defaultPosition - 80) return this.#positionDefault();

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
    console.log('animateToPosition')
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

    if (this.#styleTopValue > 0) {
      document.querySelector('html').style.overflowY = '';
      document.body.style.overflowY = '';
      document.querySelector('html').style.touchAction = '';
      document.body.style.touchAction = '';
    }
  }



  // old manual scrolling setup
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
});
