const node = document.createTextNode('');
let queue = [];
let observing = false;

const observeCallback = () => {
  queue = queue.filter(fn => {
    fn();
    return false;
  });
  observe.disconnect();
  observing = false;
};
const observe = new MutationObserver(observeCallback);



const MDWUtil = new class MDWUtil {
  #uidCounter = 0;
  #nodeData = 0;
  #textLengthDiv = document.createElement('div');

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
}

window.MDWUtil = MDWUtil;
export default MDWUtil;
