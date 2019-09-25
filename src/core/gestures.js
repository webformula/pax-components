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

export function enableSwipeListenerForElement(element) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  const swipInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipInstances) return;
  swipInstances.forEach(i => i.enable());
}

export function disableSwipeListenerForElement(element) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  const swipInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipInstances) return;
  swipInstances.forEach(i => i.disable());
}

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
    this.disableTouchEvents();

    if (MDWUtils.isMobile) {
      this.element.addEventListener('touchstart', this.bound_handleGestureStart, false);
    } else {
      this.element.addEventListener('mousedown', this.bound_handleGestureStart);
    }
  }

  disable() {
    this.removeEvents();
  }

  enable() {
    this.addEvents();
  }

  enableTouchEvents() {
    this.element.style['touch-action'] = '';
  }

  disableTouchEvents() {
    // this disabled the browsers auto handling of the touch events.
    // If this is not set to none, then the browser will immidiately cancel the toach evnets
    this.element.style['touch-action'] = 'none';
  }

  removeEvents() {
    this.enableTouchEvents();
    if (MDWUtils.isMobile) {
      this.element.removeEventListener('touchstart', this.bound_handleGestureStart);
      this.element.removeEventListener('touchmove', this.bound_handleGestureMove);
      this.element.removeEventListener('touchend', this.bound_handleGestureEnd);
      this.element.removeEventListener('touchcancel', this.bound_handleGestureEnd);
    } else {
      this.element.removeEventListener('mousedown', this.bound_handleGestureStart);
      this.element.removeEventListener('mousemove', this.bound_handleGestureMove);
      this.element.removeEventListener('mouseup', this.bound_handleGestureEnd);
    }
  }

  handleGestureStart(ev) {
    ev.state = 'start';

    if (MDWUtils.isMobile) {
      this.element.addEventListener('touchmove', this.bound_handleGestureMove, false);
      this.element.addEventListener('touchend', this.bound_handleGestureEnd, false);
      this.element.addEventListener('touchcancel', this.bound_handleGestureEnd, false);
    } else {
      this.element.addEventListener('mousemove', this.bound_handleGestureMove);
      this.element.addEventListener('mouseup', this.bound_handleGestureEnd);
    }

    this.startTime = Date.now();
    this.initialTouchPos = this.getClientXY(ev);
    this.lastDistance = this.getDistance(ev);
    ev.distance = this.lastDistance;
    ev.direction = this.getDirection(this.lastDistance, this.lastDistance);
    this.callback(ev);
    ev.preventDefault();
  }

  handleGestureMove(ev) {
    ev.state = 'move';
    if (this.initialTouchPos) this.callbackThrottle(ev);
    ev.preventDefault();
  }

  handleGestureEnd(ev) {
    ev.state = 'end';

    if (!MDWUtils.isMobile) {
      this.element.removeEventListener('touchmove', this.bound_handleGestureMove);
      this.element.removeEventListener('touchend', this.bound_handleGestureEnd);
      this.element.removeEventListener('touchcancel', this.bound_handleGestureEnd);
    } else {
      this.element.removeEventListener('mousemove', this.bound_handleGestureMove);
      this.element.removeEventListener('mouseup', this.bound_handleGestureEnd);
    }

    this.endTime = Date.now();
    ev.runTime = this.endTime - this.startTime;
    ev.distance = this.getDistance(ev);
    ev.endDirection = this.getDirection({ x: 0, y: 0 }, ev.distance);
    ev.velocity = this.getVelocity(ev.distance, ev.runTime);
    this.callback(ev);
    ev.preventDefault();
  }

  getDistance(event) {
    const xy = this.getClientXY(event);
    return {
      x: xy.x - this.initialTouchPos.x,
      y: xy.y - this.initialTouchPos.y
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

  getClientXY(event) {
    return {
      x: event.targetTouches && event.targetTouches.length ? event.targetTouches[0].clientX : event.changedTouches && event.changedTouches.length ? event.changedTouches[0].clientX : event.clientX,
      y: event.targetTouches && event.targetTouches.length ? event.targetTouches[0].clientY : event.changedTouches && event.changedTouches.length ? event.changedTouches[0].clientY : event.clientY
    }
  }

  getVelocity(distance, time) {
    return {
      x: distance.x / time,
      y: distance.y / time
    };
  }
}
