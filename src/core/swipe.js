import { addDragListener, removeDragListener } from './drag.js';

const swipeInstancesByElementAndFunction = new Map();

class Swipe {
  constructor(element, callback) {
    this.bound_dragEvent = this.dragEvent.bind(this);

    this.element = element;
    this.callback = callback;
  }

  addEvents() {
    addDragListener(this.element, this.bound_dragEvent);
  }

  removeEvents() {
    removeDragListener(this.element, this.bound_dragEvent);
  }

  dragEvent(event) {
    if (event.state === 'end') {
      if (Math.abs(event.velocity.x) > 1.4 || Math.abs(event.velocity.y) > 1.4) this.callback(event);
    }
  }
}

export function addSwipeListener(element, callback) {
  const swipInstance = new Swipe(element, callback);
  swipInstance.addEvents();

  if (!swipeInstancesByElementAndFunction.get(element)) swipeInstancesByElementAndFunction.set(element, new Map());
  swipeInstancesByElementAndFunction.get(element).set(callback, swipInstance);
}

export function removeSwipeListener(element, callback) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');

  const swipeInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipeInstances) return;
  if (callback) {
    const el = swipeInstances.get(callback);
    if (el) el.removeEvents();
    swipeInstances.delete(callback);
  } else {
    swipeInstances.forEach(i => i.removeEvents());
    swipeInstancesByElementAndFunction.delete(element);
  }
}
