const node = document.createTextNode('');
let queue = [];
let observing = false;

const observeCallback = () => {
  while (queue.length) {
    queue.pop()();
  }
  observe.disconnect();
  observing = false;
};
const observe = new MutationObserver(observeCallback);



const mdwUtil = new class MDWUtil {
  #uidCounter = 0;
  #nodeData = 0;
  #textLengthDiv = document.createElement('div');
  #scrollTarget;
  #lastScrollTop;
  #scrollCallbacks = [];
  #scrollCurrentDirection;
  #scrollDistanceFromDirectionChange;
  #backdropElement;
  #backDropIsRemoving = false;
  #scrollHandler_bound = this.rafThrottle(this.#scrollHandler).bind(this);

  constructor() {
    this.#textLengthDiv.classList.add('mdw-text-length');
    document.body.insertAdjacentElement('beforeend', this.#textLengthDiv);
  }

  
  uid() {
    this.#uidCounter += 1;
    return this.#uidCounter;
  }

  async nextAnimationFrameAsync() {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        setTimeout(resolve, 0);
      });
    });
  }

  async animationendAsync(element) {
    return new Promise(resolve => {
      function onAnimationend() {
        element.removeEventListener('animationend', onAnimationend);
        resolve();
      }
      element.addEventListener('animationend', onAnimationend);
    });
  }

  async transitionendAsync(element) {
    return new Promise(resolve => {
      function onTransitionend() {
        element.removeEventListener('transitionend', onTransitionend);
        resolve();
      }
      element.addEventListener('transitionend', onTransitionend);
    });
  }
  
  // <div>one<div></div></div> === one
  getTextFromNode(element) {
    let nextNode;
    let hasHitTextNode = false;
    const textNodes = [...element.childNodes].filter(node => {
      const isTextNode = node.nodeType === 3;
      if (hasHitTextNode && !nextNode) nextNode = node;
      else if (isTextNode && !!node.textContent.trim()) hasHitTextNode = true;
      return isTextNode;
    });

    return textNodes
      .map(node => node.textContent.trim())
      .join('')
      .trim();
  }

  /** use observer to mimic process.nextTick behavior
   *    This triggers faster than using setTimeout and is more predictable
   */
  nextTick(callback) {
    queue.push(callback);
    if (observing === false) {
      observe.observe(node, { characterData: true });
      observing = true;
      node.data = this.#nodeData++;
    }
  }

  throttle(fn, ms = 200) {
    let alreadyQueued;
    return function throttled() {
      const args = arguments;
      const context = this;
      if (!alreadyQueued) {
        alreadyQueued = true;
        fn.apply(context, args);
        setTimeout(() => {
          alreadyQueued = false;
        }, ms);
      }
    };
  }

  debounce(fn, wait) {
    let timer;
    return function debounced() {
      const args = arguments;
      const context = this
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
        fn.apply(context, args);
      }, wait || 10);
    };
  }

  rafThrottle(fn) {
    let alreadyQueued;
    return function throttled() {
      const args = arguments;
      const context = this;
      if (!alreadyQueued) {
        alreadyQueued = true;
        fn.apply(context, args);
        requestAnimationFrame(() => {
          alreadyQueued = false;
        });
      }
    };
  }

  getTextLengthFromInput(inputElement) {
    if (!inputElement || inputElement.nodeName !== 'INPUT') throw Error('requires input element');

    const styles = window.getComputedStyle(inputElement);
    this.#textLengthDiv.style.fontSize = styles.getPropertyValue('font-size');
    this.#textLengthDiv.style.fontWeight = styles.getPropertyValue('font-weight');
    this.#textLengthDiv.style.linHeight = styles.getPropertyValue('line-height');
    this.#textLengthDiv.style.letterSpacing = styles.getPropertyValue('letter-spacing');
    this.#textLengthDiv.innerText = inputElement.value;
    return this.#textLengthDiv.offsetWidth;
  }

  trackPageScroll(callback = () => { }) {
    if (!this.#scrollTarget) this.#scrollTarget = document.body;
    if (this.#scrollCallbacks.length === 0) this.#scrollTarget.addEventListener('scroll', this.#scrollHandler_bound);
    this.#scrollCallbacks.push(callback);
  }

  untrackPageScroll(callback = () => { }) {
    this.#scrollCallbacks = this.#scrollCallbacks.filter(c => c !== callback);
    if (this.#scrollCallbacks.length === 0) this.#scrollTarget.removeEventListener('scroll', this.#scrollHandler_bound);
  }

  addBackdrop(element) {
    if (this.#backdropElement) return;

    this.#backdropElement = document.createElement('div');
    this.#backdropElement.classList.add('mdw-backdrop');
    element.insertAdjacentElement('beforebegin', this.#backdropElement);
    setTimeout(() => {
      this.#backdropElement.style.opacity = 1;
    }, 10);

    return this.#backdropElement;
  }

  async removeBackdrop() {
    if (!this.#backdropElement || this.#backDropIsRemoving === true) return;

    this.#backDropIsRemoving = true;
    this.#backdropElement.style.opacity = 0;

    await this.transitionendAsync(this.#backdropElement);

    this.#backdropElement.remove();
    this.#backdropElement = undefined;
    this.#backDropIsRemoving = false;
  }

  #scrollHandler(event) {
    const distance = this.#scrollTarget.scrollTop - this.#lastScrollTop;
    if (distance === 0) return;

    const direction = this.#scrollTarget.scrollTop >= this.#lastScrollTop ? -1 : 1;
    if (direction !== this.#scrollCurrentDirection) this.#scrollDistanceFromDirectionChange = 0;
    this.#scrollCurrentDirection = direction;

    this.#scrollDistanceFromDirectionChange += distance;
    this.#lastScrollTop = this.#scrollTarget.scrollTop;

    this.#scrollCallbacks.forEach(callback => callback({
      event,
      isScrolled: this.#scrollTarget.scrollTop > 0,
      direction,
      distance,
      distanceFromDirectionChange: this.#scrollDistanceFromDirectionChange || 0
    }));
  }
}

window.mdwUtil = mdwUtil;
export default mdwUtil;