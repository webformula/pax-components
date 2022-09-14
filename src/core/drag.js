import util from './util.js';

export default class Drag {
  #element;
  #lastDistance;
  #initialTouchPos;

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

  #initiate() {
    this.#element.addEventListener('touchstart', this.#touchstart_bound, false);
  }

  #touchstart(event) {
    this.#initialTouchPos = this.#getClientXY(event);
    this.#lastDistance = this.#getDistance(event);

    this.#onStartCallbacks.forEach(callback => callback({
      event
    }));

    this.#element.addEventListener('touchend', this.#touchend_bound, false);
    this.#element.addEventListener('touchmove', this.#touchmove_throttled, false);
  }

  #touchend(event) {
    this.#element.removeEventListener('touchend', this.#touchend_bound, false);
    this.#element.removeEventListener('touchmove', this.#touchmove_throttled, false);

    const distance = this.#getDistance(event);
    this.#onEndCallbacks.forEach(callback => callback({
      distance,
      direction: this.#getDirection({ x: 0, y: 0 }, event),
      velocity: this.#getVelocity(distance, event.runTime),
      event
    }));
  }

  #touchmove(event) {
    const distance = this.#getDistance(event);
    this.#onDragCallbacks.forEach(callback => callback({
      distance,
      direction: this.#getDirection(this.#lastDistance, event),
      velocity: this.#getVelocity(distance, event.runTime),
      event
    }));
    this.#lastDistance = distance;
  }

  #getDistance(event) {
    const xy = this.#getClientXY(event);
    return {
      x: xy.x - this.#initialTouchPos.x,
      y: xy.y - this.#initialTouchPos.y
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

  #getClientXY(event) {
    return {
      x: event.targetTouches && event.targetTouches.length ? event.targetTouches[0].clientX : event.changedTouches && event.changedTouches.length ? event.changedTouches[0].clientX : event.clientX,
      y: event.targetTouches && event.targetTouches.length ? event.targetTouches[0].clientY : event.changedTouches && event.changedTouches.length ? event.changedTouches[0].clientY : event.clientY
    }
  }
}
