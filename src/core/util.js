import device from './device.js';

const MDWUtil = new class MDWUtil {
  #uidCounter = 0;
  #pageScrollIsLocked = false;
  #textLengthDiv = document.createElement('div');
  #pageScrollLockHTMLScrollTop;
  #scrollTarget;
  #lastScrollTop;
  #currentDirection;
  #distanceFromDirectionChange;
  #scrollCallbacks = [];
  #scrollHandler_bound = this.rafThrottle(this.#scrollHandler).bind(this);

  isMobile = device.isMobile;
  isSmallViewport = device.isSmallViewport;
  isFullscreenCutoff = device.isFullscreenCutoff;
  isMobileOrSmallViewport = device.isMobileOrSmallViewport;

  constructor() {
    this.#textLengthDiv.classList.add('mdw-text-length');
    document.body.insertAdjacentElement('beforeend', this.#textLengthDiv);
  }

  get isSmallViewport() {
    return isSmallViewport();
  }

  toggleColorScheme() {
    const themePreferenceDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const html = document.querySelector('html');
    const htmlColorScheme = getComputedStyle(html).colorScheme;

    if ((themePreferenceDark === false && htmlColorScheme === 'normal') || htmlColorScheme === 'light') {
      html.style.colorScheme = 'dark';
      return 'dark';
    } else if ((themePreferenceDark === true && htmlColorScheme === 'normal') || htmlColorScheme === 'dark') {
      html.style.colorScheme = 'light';
      return 'light';
    }
  }

  getUID() {
    this.#uidCounter += 1;
    return this.#uidCounter;
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

  async nextAnimationFrameAsync() {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        setTimeout(resolve, 0);
      });
    });
  }

  async wait(ms = 100) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
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

  async animationendAsync(element) {
    return new Promise(resolve => {
      function onAnimationend() {
        element.removeEventListener('animationend', onAnimationend);
        resolve();
      }
      element.addEventListener('animationend', onAnimationend);
    });
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

  lockPageScroll() {
    if (this.#pageScrollIsLocked === true) return;
    this.#pageScrollIsLocked = true;

    const htmlElement = document.querySelector('html');
    this.#pageScrollLockHTMLScrollTop = htmlElement.scrollTop;
    htmlElement.style.overflow = 'hidden';
    htmlElement.style.position = 'relative';
    htmlElement.style.touchAction = 'none';
    // htmlElement.style.bottom = '0';
    // htmlElement.style.height = 'unset';
    // htmlElement.style.top = `-${this.#pageScrollLockHTMLScrollTop}px`;

    const bodyElement = document.body;
    bodyElement.style.overflow = 'hidden';
    bodyElement.style.position = 'absolute';
    bodyElement.style.touchAction = 'none';
    bodyElement.style.bottom = '0';
    bodyElement.style.height = 'unset';
    bodyElement.style.top = `-${this.#pageScrollLockHTMLScrollTop}px`;

    // return offset
    // Locking page can
    return this.#pageScrollLockHTMLScrollTop;
  }

  unlockPageScroll() {
    if (this.#pageScrollIsLocked === false) return;
    this.#pageScrollIsLocked = false;

    const htmlElement = document.querySelector('html');
    htmlElement.style.overflow = '';
    htmlElement.style.position = '';
    htmlElement.style.touchAction = '';
    htmlElement.style.top = '';
    htmlElement.style.bottom = '';
    htmlElement.style.height = '';
    htmlElement.scrollTop = this.#pageScrollLockHTMLScrollTop;

    const bodyElement = document.body;
    bodyElement.style.overflow = '';
    bodyElement.style.position = '';
    bodyElement.style.touchAction = '';
    bodyElement.style.top = '';
    bodyElement.style.bottom = '';
    bodyElement.style.height = '';
  }

  trackPageScroll(callback = () => {}) {
    if (!this.#scrollTarget) this.#scrollTarget = document.body;
    if (this.#scrollCallbacks.length === 0) this.#scrollTarget.addEventListener('scroll', this.#scrollHandler_bound);
    this.#scrollCallbacks.push(callback);
  }

  untrackPageScroll(callback = () => { }) {
    this.#scrollCallbacks = this.#scrollCallbacks.filter(c => c !== callback);
    if (this.#scrollCallbacks.length === 0) this.#scrollTarget.removeEventListener('scroll', this.#scrollHandler_bound);
  }

  // 00:00 or 00:00:00
  getInputTimeDifference(timeA, timeB) {
    const timeAHour = parseInt(timeA.split(':')[0]);
    const timeAMinute = parseInt(timeA.split(':')[1]);
    const timeASecond = parseInt(timeA.split(':')[2] || 0);
    const timeBHour = parseInt(timeB.split(':')[0]);
    const timeBMinute = parseInt(timeB.split(':')[1]);
    const timeBSecond = parseInt(timeB.split(':')[2] || 0);
    const hour = timeAHour - timeBHour;
    const minute = timeAMinute - timeBMinute;
    const second = timeASecond - timeBSecond;
    return {
      hour,
      minute,
      second
    };
  }

  // -1, 0, 1
  compareInputTimeDifference(timeA, timeB) {
    const timeAHour = parseInt(timeA.split(':')[0]);
    const timeAMinute = parseInt(timeA.split(':')[1]);
    const timeASecond = parseInt(timeA.split(':')[2] || 0);
    const timeBHour = parseInt(timeB.split(':')[0]);
    const timeBMinute = parseInt(timeB.split(':')[1]);
    const timeBSecond = parseInt(timeB.split(':')[2] || 0);

    if (timeAHour < timeBHour) return -1;
    if (timeAHour > timeBHour) return 1;
    if (timeAMinute < timeBMinute) return -1;
    if (timeAMinute > timeBMinute) return 1;
    if (timeASecond < timeBSecond) return -1
    if (timeASecond > timeBSecond) return 1;
    return 0;
  }

  // parseCSSUnit(value) {
  //   value = `${value}`;
  //   return {
  //     value: parseFloat(value),
  //     unit: (value.match(/\D/g) || []).join('').trim()
  //   };
  // }

  // getCSSVariableValue(variableName) {
  //   const variable = window.MDWCSSVariables.find(({ name }) => name === variableName);
  //   if (variable) return variable.value;
  // }

  // can use array of strings ['one', 'two']
  // can also use array of objects with label property [{ label: 'one' }, { label: 'two' }]
  fuzzySearch(searchTerm, items = [], distanceCap = 2) {  
    items = items.filter(v => !!v);
    if (items.length === 0) return [];
    const type = typeof items[0];
    if (!['string', 'object'].includes(type)) throw Error('Incorrect items array');
    if (type === 'object') {
      if (typeof items[0].label !== 'string') throw Error('Items array with objects must contain a label property that is a string');
    }

    searchTerm = searchTerm.toLowerCase().trim();
    const filterArr = items.map(item => {
      let label;
      if (type == 'object') label = item.label;
      else label = item;

      return {
        label,
        distance: this.#calculateDistance(searchTerm, label.toLowerCase().trim()),
        item
      };
    });

    return filterArr
      .filter(({ distance }) => distance <= distanceCap)
      .sort((a, b) => a.distance - b.distance)
      .map(({ item }) => item);
  }

  #calculateDistance(searchTerm, target) {
    const regex = new RegExp(`^${searchTerm}`, 'i');
    const matchesStart = target.match(regex) !== null;
    const levenshtein = this.#levenshteinDistance(searchTerm, target);

    if (matchesStart) return levenshtein - 2; // make sure these are first in sort
    return levenshtein;
  }

  #levenshteinDistance(searchTerm, target) {
    if (!searchTerm.length) return target.length;
    if (!target.length) return searchTerm.length;
    const arr = [];
    for (let i = 0; i <= target.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= searchTerm.length; j++) {
        arr[i][j] =
          i === 0
            ? j
            : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (searchTerm[j - 1] === target[i - 1] ? 0 : 1)
            );
      }
    }
    return arr[target.length][searchTerm.length];
  }

  #scrollHandler(event) {
    const distance = this.#scrollTarget.scrollTop - this.#lastScrollTop;
    if (distance === 0) return;

    const direction = this.#scrollTarget.scrollTop >= this.#lastScrollTop ? -1 : 1;
    if (direction !== this.#currentDirection) this.#distanceFromDirectionChange = 0;
    this.#currentDirection = direction;

    this.#distanceFromDirectionChange += distance;
    this.#lastScrollTop = this.#scrollTarget.scrollTop;

    this.#scrollCallbacks.forEach(callback => callback({
      event,
      isScrolled: this.#scrollTarget.scrollTop > 0,
      direction,
      distance,
      distanceFromDirectionChange: this.#distanceFromDirectionChange || 0
    }));
  }
}

window.MDWUtil = MDWUtil;
export default MDWUtil;
