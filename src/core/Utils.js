import { isPhone, isPhoneAndTablet } from './mobile-info.js';

const MDWUtils = new class {
  constructor() {
    this._uid = 1;
    this._setupTransitionEvent();
    this._setTransformPropertyName();
    this.isPhone = isPhone;
    this.isPhoneAndTablet = isPhoneAndTablet;
    this.routeChangeCallbacks = new Set();
    // add class indecator for mobile

    this.onReady(() => {
      if (this.isMobile) document.body.classList.add('mdw-is-mobile');
      else document.body.classList.remove('mdw-is-mobile');

      window.addEventListener('hashchange', this.onRouteChange);
    });
  }

  onReady(callback) {
    if (!document.body) {
      setTimeout(() => {
        this.onReady(callback);
      }, 0);
      return;
    }
    callback();
  }

  uid(label = 'id') {
    return `${label}_${this._uid++}`;
  }

  get isMobile() {
    return this.isPhoneAndTablet;
  }

  lockPageScroll() {
    const scrollElement = document.querySelector('mdw-scroll-container > mdw-scroll-content') || document.body;
    scrollElement.style.overflow = 'hidden';
    this.scrollLocked = true;
  }

  unlockPageScroll() {
    const scrollElement = document.querySelector('mdw-scroll-container > mdw-scroll-content') || document.body;
    scrollElement.style.overflow = '';
    this.scrollLocked = false;
  }

  disableUserSelect() {
    document.body.classList.add('mdw-no-select');
  }

  enableUserSelect() {
    document.body.classList.remove('mdw-no-select');
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

  throttle(fn, limit) {
    let alreadyQueued;
    return function throttled() {
      const args = arguments;
      const context = this;
      if (!alreadyQueued) {
        alreadyQueued = true;
        fn.apply(context, args);
        setTimeout(() => {
          alreadyQueued = false;
        }, limit);
      }
    };
  }

  // throttle on request animation frameyy
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

  querySlotted(component, selector) {
    if (!component) throw Error('requires either component');
    if (!selector) throw Error('requires selector');
    if (!component.shadowRoot.querySelector('slot')) return null;
    return component.shadowRoot.querySelector('slot').assignedNodes().find(el => {
      if (!el.matches) return false;
      return el.matches(selector);
    });
  }

  querySlottedAll(component, selector) {
    if (!component) throw Error('requires either component');
    if (!selector) throw Error('requires selector');
    return component.shadowRoot.querySelector('slot').assignedNodes({ flatten: true }).reduce((a, el) => {
      if (!el.querySelectorAll) return a;
      return a.concat([...el.querySelectorAll(selector)]);
    }, []);
  }

  slottedChildren(component) {
    if (!component) throw Error('requires either component');
    return component.shadowRoot.querySelector('slot').assignedNodes();
  }

  get transitionEventName() {
    return this.transitionEventName_;
  }

  get transformPropertyName() {
    return this.transformPropertyName_;
  }

  addBackdrop(element, clickCallback, options = { sheet: false }) {
    const id = this.uid();
    element.insertAdjacentHTML('afterend', `<div id="${id}" class="mdw-backdrop"></div>`);
    const backdropElement = document.querySelector(`#${id}`);
    if (options.sheet === true) backdropElement.classList.add('mdw-sheet-backdrop');
    if (clickCallback) backdropElement.addEventListener('click', clickCallback);
    return {
      remove() {
        if (clickCallback) backdropElement.removeEventListener('click', clickCallback);
        backdropElement.remove();
      }
    };
  }

  get searchParamters() {
    return this._extractSearchParameters(this._clean(window.location.href)).split(',').filter(a => !!a).reduce((a, b) => {
      const split = b.split('=');
      a[split[0]] = split[1];
      return a;
    }, {});
  }

  setSearchParamter(name, value) {
    const parameters = this.searchParamters;
    if (value === undefined || value === null) delete parameters[name];
    else parameters[name] = value;
    let path = window.location.href.split('?')[0];
    if (Object.keys(parameters).length > 0) path += '?' + Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join(',');

    window.history.pushState({ path }, '', path);
  }

  removeSearchParamter(name) {
    this.setSearchParamter(name, undefined);
  }

  addOnRouteChange(callback) {
    this.routeChangeCallbacks.add(callback);
    return () => {
      this.routeChangeCallbacks.delete(callback);
    }
  }

  removeOnRouteChange(callback) {
    if (this.routeChangeCallbacks.has(callback)) this.routeChangeCallbacks.delete(callback);
  }

  _routeChange({ oldUrl, newURL } = { oldUrl: undefined, newURL: undefined }) {
    this.routeChangeCallbacks.forEach(cb => cb({ oldUrl, newURL }));
  }

  _clean(str) {
    if (str instanceof RegExp) return s;
    return str.replace(/\/+$/, '').replace(/^\/+/, '/');
  }

  _extractSearchParameters(url) {
    return url.split(/\?(.*)?$/).slice(1).join('');
  }

  _setupTransitionEvent() {
    const el = document.createElement('fakeelement');
    const transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };

    for (let t in transitions){
      if (el.style[t] !== undefined) this.transitionEventName_ = transitions[t];
    }
  }

  _setTransformPropertyName(forceRefresh = false) {
    if (this.transformPropertyName_ === undefined || forceRefresh) {
      const el = document.createElement('div');
      this.transformPropertyName_ = 'transform' in el.style ? 'transform' : 'webkitTransform';
    }
  }
}

window.MDWUtils = MDWUtils;

export default MDWUtils;
