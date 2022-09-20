import { isMobile, isSmallScreen, isMobileOrSmallScreen } from './device.js';

const MDWUtil = new class MDWUtil {
  #uidCounter = 0;
  #pageScrollIsLocked = false;
  #pageScrollLockHTMLScrollTop;
  #pageScrollLockBodyScrollTop;

  isMobile = isMobile;
  isSmallScreen = isSmallScreen;
  isMobileOrSmallScreen = isMobileOrSmallScreen;

  constructor() {
    if (isMobile) document.body.classList.add('mdw-mobile');
    if (isSmallScreen()) document.body.classList.add('mdw-small-screen');

    window.addEventListener('resize', () => {
      if (isSmallScreen()) {
        document.body.classList.add('mdw-small-screen');
        window.dispatchEvent(new Event('mdw:screen-small'));
      } else {
        document.body.classList.remove('mdw-small-screen');
        window.dispatchEvent(new Event('mdw:screen-normal'));
      }
    });
  }

  get isSmallScreen() {
    return isSmallScreen();
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

  lockPageScroll() {
    if (this.#pageScrollIsLocked === true) return;
    this.#pageScrollIsLocked = true;

    const htmlElement = document.querySelector('html');
    console.log('lock', htmlElement.scrollTop);
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
    console.log('un', bodyElement.style.top);
    bodyElement.style.overflow = '';
    bodyElement.style.position = '';
    bodyElement.style.touchAction = '';
    bodyElement.style.top = '';
    bodyElement.style.bottom = '';
    bodyElement.style.height = '';
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
        distance: this.#levenshteinDistance(searchTerm, label.toLowerCase().trim()),
        item
      };
    });

    return filterArr
      .filter(({ distance }) => distance <= distanceCap)
      .sort((a, b) => a.distance - b.distance)
      .map(({ item }) => item);
  }

  #levenshteinDistance(s, t) {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] =
          i === 0
            ? j
            : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
      }
    }
    return arr[t.length][s.length];
  };
}

window.MDWUtil = MDWUtil;
export default MDWUtil;
