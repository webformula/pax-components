import util from './util.js';

export default class Drag {
  #element;
  #lastDistance;
  #initialTouchPos;
  #lastTouchPos = { x: 0, y: 0 };
  #currentTouchPosition;
  #startTime;
  #isDragging = false;
  #includeMouseEvents = false;

  #onDragCallbacks = [];
  #onStartCallbacks = [];
  #onEndCallbacks = [];
  #initiated = false;
  #touchstart_bound = this.#touchstart.bind(this);
  #touchend_bound = this.#touchend.bind(this);
  #touchmove_throttled = util.rafThrottle(this.#touchmove.bind(this));

  constructor(element) {
    if (element) this.#element = element;
  }

  get element() {
    return this.#element;
  }
  set element(value) {
    if (this.#element) throw Error('element had already been set, cannot change.');
    if (!(value instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
    this.#element = value;
  }

  get includeMouseEvents() {
    return this.#includeMouseEvents;
  }
  set includeMouseEvents(value = false) {
    this.#includeMouseEvents = value;
  }

  get isDragging() {
    return this.#isDragging;
  }

  onDrag(callback = () => {}) {
    this.#onDragCallbacks.push(callback);
  }

  onStart(callback = () => { }) {
    this.#onStartCallbacks.push(callback);
  }

  onEnd(callback = () => { }) {
    this.#onEndCallbacks.push(callback);
  }

  enable() {
    if (this.#initiated === false) this.#initiate();
  }

  disable() {
    this.element.removeEventListener('touchstart', this.#touchstart_bound, false);
  }

  destroy() {
    this.disable();
    this.#element = undefined;
  }

  resetDistance() {
    this.#initialTouchPos = this.#currentTouchPosition;
  }

  #initiate() {
    this.#element.addEventListener('touchstart', this.#touchstart_bound, false);
    if (this.#includeMouseEvents === true) this.#element.addEventListener('mousedown', this.#touchstart_bound, false);
  }

  #touchstart(event) {
    this.#startTime = Date.now();
    this.#initialTouchPos = this.#getTouchPosition(event);
    this.#lastDistance = this.#getDistance(event);
    this.#onStartCallbacks.forEach(callback => callback({
      event
    }));

    // TODO try using window to fix ios issues
    this.#element.addEventListener('touchend', this.#touchend_bound, false);
    this.#element.addEventListener('touchmove', this.#touchmove_throttled, false);

    if (this.#includeMouseEvents === true) {
      window.addEventListener('mouseup', this.#touchend_bound, false);
      window.addEventListener('mousemove', this.#touchmove_throttled, false);
    }

    this.#isDragging = true;
  }

  #touchend(event) {
    this.#element.removeEventListener('touchend', this.#touchend_bound, false);
    this.#element.removeEventListener('touchmove', this.#touchmove_throttled, false);

    if (this.#includeMouseEvents === true) {
      window.removeEventListener('mouseup', this.#touchend_bound, false);
      window.removeEventListener('mousemove', this.#touchmove_throttled, false);
    }

    const distance = this.#getDistance(event);
    this.#onEndCallbacks.forEach(callback => callback({
      distance,
      direction: this.#getDirection({ x: 0, y: 0 }, distance),
      velocity: this.#getVelocity(distance, Date.now() - this.#startTime),
      event
    }));
  }

  #touchmove(event) {
    this.#currentTouchPosition = this.#getTouchPosition(event);
    const distance = this.#getDistance(event);

    this.#onDragCallbacks.forEach(callback => callback({
      distance,
      direction: this.#getDirection(this.#lastDistance, distance),
      event
    }));
    this.#lastDistance = distance;
    
    this.#isDragging = false;
  }

  #getDistance(event) {
    const xy = this.#getTouchPosition(event);
    const last = this.#lastTouchPos;
    this.#lastTouchPos = xy;
    return {
      x: xy.x - this.#initialTouchPos.x,
      y: xy.y - this.#initialTouchPos.y,
      moveX: xy.x - last.x,
      moveY: xy.y - last.y
    };
  }

  #getDirection(previous, current) {
    const x = current.x > previous.x ? 1 : current.x === previous.x ? 0 : -1;
    const y = current.y > previous.y ? 1 : current.y === previous.y ? 0 : -1;
    return {
      x, y,
      xDescription: x === 0 ? 'none' : x === 1 ? 'right' : 'left',
      yDescription: y === 0 ? 'none' : y === 1 ? 'down' : 'up'
    };
  }

  #getVelocity(distance, time) {
    return {
      x: distance.x / time,
      y: distance.y / time
    };
  }

  #getTouchPosition(event) {
    return {
      x: event.changedTouches ? event.changedTouches[0].clientX : event.clientX,
      y: event.changedTouches ? event.changedTouches[0].clientY : event.clientY,
    }
  }
}
