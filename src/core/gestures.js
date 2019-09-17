import MDWUtils from './Utils.js';

const swipeInstancesByElementAndFunction = new Map();

export function addSwipeListener(element, callback) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  if (typeof callback !== 'function') throw Error('callback must be a function');

  const swipInstance = new Swipe(element, callback);
  swipInstance.addEvents();

  if (!swipeInstancesByElementAndFunction.get(element)) swipeInstancesByElementAndFunction.set(element, new Map());
  swipeInstancesByElementAndFunction.get(element).set(callback, swipInstance);
};

// if you do not pass in callback then all the swipe events on an element will be removed
export function removeSwipeListener(element, callback = undefined) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');

  const swipInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipInstances) return;
  if (callback) {
    swipInstances.get(callback).removeEvents();
    swipInstances.delete(callback);
  } else {
    swipInstances.forEach(i => i.removeEvents());
    swipeInstancesByElementAndFunction.delete(element);
  }
};

class Swipe {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;

    this.hasPointerEvent = !!window.PointerEvent;
    this.bound_handleGestureStart = this.handleGestureStart.bind(this);
    this.bound_handleGestureMove = this.handleGestureMove.bind(this);
    this.bound_handleGestureEnd = this.handleGestureEnd.bind(this);

    // callback throttler
    this.callbackThrottle = MDWUtils.rafThrottle((event) => {
      event.distance = this.getDistance(event);
      event.direction = this.getDirection(this.lastDistance, event.distance);
      this.lastDistance = event.distance;
      this.callback(event);
    });
  }

  addEvents() {
    // this disabled the browsers auto handling of the touch events.
    // If this is not set to none, then the browser will immidiately cancel the toach evnets
    this.element.style['touch-action'] = 'none';

    if (this.hasPointerEvent) {
      // Add Pointer Event Listener
      this.element.addEventListener('pointerdown', this.bound_handleGestureStart, true);
      this.element.addEventListener('pointermove', this.bound_handleGestureMove, true);
      this.element.addEventListener('pointerup', this.bound_handleGestureEnd, true);
      this.element.addEventListener('pointercancel', this.bound_handleGestureEnd, true);
    } else {
      // Add Touch Listener
      this.element.addEventListener('touchstart', this.bound_handleGestureStart, true);
      this.element.addEventListener('touchmove', this.bound_handleGestureMove, true);
      this.element.addEventListener('touchend', this.bound_handleGestureEnd, true);
      this.element.addEventListener('touchcancel', this.bound_handleGestureEnd, true);

      // Add Mouse Listener
      this.element.addEventListener('mousedown', this.bound_handleGestureStart, true);
    }
  }

  removeEvents() {
    // re enable browsers touch events
    this.element.style['touch-action'] = '';

    if (this.hasPointerEvent) {
      // Add Pointer Event Listener
      this.element.removeEventListener('pointerdown', this.bound_handleGestureStart, true);
      this.element.removeEventListener('pointermove', this.bound_handleGestureMove, true);
      this.element.removeEventListener('pointerup', this.bound_handleGestureEnd, true);
      this.element.removeEventListener('pointercancel', this.bound_handleGestureEnd, true);
    } else {
      // Add Touch Listener
      this.element.removeEventListener('touchstart', this.bound_handleGestureStart, true);
      this.element.removeEventListener('touchmove', this.bound_handleGestureMove, true);
      this.element.removeEventListener('touchend', this.bound_handleGestureEnd, true);
      this.element.removeEventListener('touchcancel', this.bound_handleGestureEnd, true);

      // Add Mouse Listener
      this.element.removeEventListener('mousedown', this.bound_handleGestureStart, true);

      document.removeEventListener('mousemove', this.bound_handleGestureMove, true);
      document.removeEventListener('mouseup', this.bound_handleGestureEnd, true);
    }
  }

  handleGestureStart(event) {
    event.preventDefault();
    event.state = 'start';

    // Add the move and end listeners
    if (this.hasPointerEvent) event.target.setPointerCapture(event.pointerId);
    else {
      // Add Mouse Listeners
      document.addEventListener('mousemove', this.bound_handleGestureMove, true);
      document.addEventListener('mouseup', this.bound_handleGestureEnd, true);
    }
    this.initialTouchPos = this.getGesturePointFromEvent(event);
    this.lastDistance = this.getDistance(event);
    event.distance = this.lastDistance;
    event.direction = this.getDirection(this.lastDistance, this.lastDistance);
    this.callback(event);
  }

  handleGestureMove(event) {
    event.preventDefault();
    event.state = 'move';

    if (!this.initialTouchPos) return;
    this.callbackThrottle(event);
  }

  handleGestureEnd(event) {
    event.preventDefault();
    event.state = 'end';

    // Add the move and end listeners
    if (this.hasPointerEvent) event.target.releasePointerCapture(event.pointerId);
    else {
      // Add Mouse Listeners
      document.removeEventListener('mousemove', this.bound_handleGestureMove, true);
      document.removeEventListener('mouseup', this.bound_handleGestureEnd, true);
    }

    event.distance = this.getDistance(event);
    event.endDirection = this.getDirection({ x: 0, y: 0 }, event.distance);
    this.callback(event);
  }

  getGesturePointFromEvent(event) {
    return {
      x: event.targetTouches ? event.targetTouches[0].clientX : event.clientX,
      y: event.targetTouches ? event.targetTouches[0].clientY : event.clientY
    };
  }

  getDistance(event) {
    return {
      x: event.x - this.initialTouchPos.x,
      y: event.y - this.initialTouchPos.y
    };
  }

  getDirection(a, b) {
    const x = b.x > a.x ? 1 : b.x === a.x ? 0 : -1;
    const y = b.y > a.y ? 1 : b.y === a.y ? 0 : -1;
    return {
      x,
      y,
      xDescription: x === 0 ? 'none' : x === 1 ? 'right' : 'left',
      yDescription: y === 0 ? 'none' : y === 1 ? 'down' : 'up'
    };
  }
}
