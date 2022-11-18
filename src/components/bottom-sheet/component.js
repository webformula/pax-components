import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import './component.css';
import util from '../../core/util.js';


// TODO look into other wars of preventing body from scrolling
//   There is some bugs on ios safari with bottom url bar
//   could try locking the scroll to the body. Right now it is scrolling on html. We want to see if we can maintain address bar behavior

customElements.define('mdw-bottom-sheet', class MDWBottomSheet extends HTMLElementExtended {
  useShadowRoot = false;
  
  #initialDragToScrollSwitch;
  #initialDragPosition;
  #drag = new Drag(this);
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragStart_bound = this.#onDragStart.bind(this);
  #onDragEnd_bound = this.#onDragEnd.bind(this);
  #transitionend_bound = this.#transitionend.bind(this);
  #onResize_bound = this.#onResize.bind(this);

  constructor() {
    super();

    this.insertAdjacentHTML('afterbegin', '<div class="mdw-drag-handle"></div>');

    this.#drag.onDrag(this.#onDrag_bound);
    this.#drag.onStart(this.#onDragStart_bound);
    this.#drag.onEnd(this.#onDragEnd_bound);

    this.style.bottom = `${this.#initialPosition}px`;
    this.style.overflowY = 'visible'; // used in drag events
    // window.addEventListener('resize', this.#onResize_bound);
  }

  get #styleBottomValue() {
    return parseFloat(getComputedStyle(this).getPropertyValue('bottom').replace('px', ''));
  }

  get #windowHeight() {
    return window.innerHeight;
  }

  get #initialPosition() {
    return -(this.offsetHeight - (this.#windowHeight * 0.4));
  }

  get #topPosition() {
    return -(this.offsetHeight - this.#windowHeight);
  }

  get #minimizedPosition() {
    return -(this.offsetHeight - 80);
  }

  connectedCallback() {
    this.#drag.enable();
  }

  #onResize() {
  }


  #onDragStart({ event }) {
    util.lockPageScroll();
    this.#cancelDragAnimation();

    this.#initialDragToScrollSwitch = false;
    this.#initialDragPosition = this.#styleBottomValue;
    if (this.#initialDragPosition !== this.#topPosition) event.preventDefault();
  }

  #onDrag({ distance, direction, event }) {
    let bottom = this.#initialDragPosition - distance.y;
    
    // TODO work out what is causing the spikes
    if (distance.y > 300 || distance.y < -300) {
      console.log('skip');
      return;
    }

    // this handles case when the overflowY property has been changed to scroll during the current drag event.
    // This is needed because the container will not be scrollable until the next touch start event
    if (this.#initialDragToScrollSwitch === true && this.scrollTop > 0) {
      this.scrollTop += Math.round(-distance.moveY);
      return;
    }

    // container is still scrolling
    if (this.scrollTop > 0) return;

    // container has been scrolled to zero and needs to be converted to drag
    if (this.scrollTop <= 0 && direction.y === 1 && this.style.overflowY !== 'visible') {
      this.style.overflowY = 'visible';
      this.style.height = '';
      this.style.bottom = `${this.#topPosition}px`;
      this.#initialDragPosition = this.#styleBottomValue;
      this.#drag.resetDistance();
      return;
    }

    // console.log(bottom, this.#topPosition, direction.y);
    // container has been drag to top and needs to be converted to scroll
    if (bottom >= this.#topPosition && direction.y === -1) {

      // switch to a scroll container when in top position
      if (this.style.overflowY !== 'scroll') {
        this.style.overflowY = 'scroll';
        this.style.height = '100%';
        this.style.bottom = '0';
        this.scrollTop = -distance.moveY;
        this.#initialDragToScrollSwitch = true;
      }
      
      // we do not want to change the bottom when using the scroll container
      return;
    }

    this.style.bottom = `${bottom}px`;
  }

  // TODO swipe close
  #onDragEnd({ direction, distance }) {
    if (this.style.overflowY === 'scroll') return;

    const bottom = this.#initialDragPosition - distance.y;
    if (direction.y === -1) {
      if (bottom > this.#initialPosition) return this.#animateToTop();
      return this.#animateToInitial();
    } else {
      if (bottom >= this.#initialPosition) return this.#animateToInitial();
      return this.#animateToMinimized();
    }
  }

  #animateToTop() {
    this.#animateToPosition(this.#topPosition);
  }

  #animateToInitial() {
    this.#animateToPosition(this.#initialPosition);
  }

  #animateToMinimized() {
    this.#animateToPosition(this.#minimizedPosition);
  }

  #animateToPosition(bottom) {
    this.classList.add('mdw-drag-animation');
    this.addEventListener('transitionend', this.#transitionend_bound);
    this.style.bottom = `${bottom}px`;
  }

  #transitionend() {
    this.#cancelDragAnimation();
    if (this.#styleBottomValue < 0) util.unlockPageScroll();
  }

  #cancelDragAnimation() {
    this.classList.remove('mdw-drag-animation');
    this.removeEventListener('transitionend', this.#transitionend_bound);
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
  //   this.addEventListener('transitionend', this.#transitionend_bound);

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
