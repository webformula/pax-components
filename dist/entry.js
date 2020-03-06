/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@webformula/pax-core/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@webformula/pax-core/index.js ***!
  \****************************************************/
/*! exports provided: Page, router, HTMLElementExtended */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_client_Page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/client/Page.js */ "./node_modules/@webformula/pax-core/src/client/Page.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return _src_client_Page_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_client_router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/client/router.js */ "./node_modules/@webformula/pax-core/src/client/router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "router", function() { return _src_client_router_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _src_client_HTMLElementExtended_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/client/HTMLElementExtended.js */ "./node_modules/@webformula/pax-core/src/client/HTMLElementExtended.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLElementExtended", function() { return _src_client_HTMLElementExtended_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });








/***/ }),

/***/ "./node_modules/@webformula/pax-core/src/client/HTMLElementExtended.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@webformula/pax-core/src/client/HTMLElementExtended.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLElementExtended; });
class HTMLElementExtended extends HTMLElement {
  constructor() {
    super();
  }

  get _templateId() {
    return `${this.nodeName.toLowerCase()}--template`;
  }

  /* Clone from pre built htmlTemplate
   *   - Rerender: replaces html but not styles. This is usefull for dynamic templates
   */
  cloneTemplate(rerender) {
    let template = document.getElementById(this._templateId);
    
    // create template on the fly
    if (!template) template = this._createTemplate();

    const templateContent = template.content;
    const shadowRoot = this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' });
    const clone = templateContent.cloneNode(true);

    if (rerender) {
      // this.__isBuildProcess is present during the build process and will be undefined in the browser
      if (!this.__isBuildProcess && this.beforeRender) this.beforeRender();
      clone.querySelector('render-block').innerHTML = this.template();
    }

    shadowRoot.appendChild(clone);
    if (!this.__isBuildProcess && this.afterRender) this.afterRender();

  }

  _createTemplate() {
    const templateElement = document.createElement('template');
    templateElement.setAttribute('id', this._templateId);
    templateElement.innerHTML = `
        <style>
          ${this.styles()}
        </style>
        <render-block>
          ${this.template()}
        </render-block>
    `;
    document.body.insertAdjacentElement('beforeend', templateElement);
    return templateElement;
  }

  connectedCallback() {
    // Detect super?
    if (!this.__isBuildProcess && this.addEvents) this.addEvents();
  }

  disconnectedCallback() {
    // Detect super?
    if (!this.__isBuildProcess && this.removeEvents) this.removeEvents();
  }

  render() {
    // this.__isBuildProcess is present during the build process and will be undefined in the browser
    if (this.__isBuildProcess) return;

    const renderBlock = this.shadowRoot.querySelector('render-block');
    if (!renderBlock) throw Error('Could not find <render-block>');

    if (this.removeEvents) this.removeEvents();
    if (this.beforeRender) this.beforeRender();
    renderBlock.innerHTML = this.template();
    if (this.afterRender) this.afterRender();
    if (this.addEvents) this.addEvents();
  }

  // Called before render(). placeholder, can be overidden
  // This does not include the initial cloneNode
  beforeRender() { }

  // Called after render(). placeholder, can be overidden
  // This does not include the initial cloneNode
  afterRender() { }

  // this is called when the component is connected
  // This is also called after render, events are first remoed before render so you dont have multiple events
  addEvents() { }

  // this is called when the component is disconnected
  // This is also called prior to render, after render addEvents is called. This will make sure you old elements dont retain events
  removeEvents() { }

  // add css that will be injected to the template
  styles() { }

  // add css to the document root
  externalStyles() { }

  // add html template, This will be used to create the template and direct render
  template() { }
}


/***/ }),

/***/ "./node_modules/@webformula/pax-core/src/client/Page.js":
/*!**************************************************************!*\
  !*** ./node_modules/@webformula/pax-core/src/client/Page.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
class Page {
    constructor() {
      this.global = typeof globalThis !== 'undefined' ? globalThis : window;
      if (this.global.displayPageContentOnly) this.displayPageContentOnly(true);
    }

    // called once page is renderd
    connectedCallback() {
      // Detect super?
      if (this.addEvents) this.addEvents();
    }

    // called once page is removed
    disconnectedCallback() {
      // Detect super?
      if (this.removeEvents) this.removeEvents();
    }

    static CreateAndSet() {
      const instance = new this();
      window.activePage = instance;

      const pageTitle = document.querySelector('title');
      if (pageTitle) pageTitle.innerText = instance.title;

      instance.render();
      // TODO use mutation observer
      setTimeout(() => {
        if (instance.connectedCallback) instance.connectedCallback();
      }, 0);

      return instance;
    }

    // render page html
    render() {
      if (this._disableRender === true) return;

      const renderBlock = document.querySelector('page-render-block:not(.previous)');
      if (!renderBlock) throw Error('Could not find <page-render-block>');

      if (this.removeEvents) this.removeEvents();
      if (this.beforeRender) this.beforeRender();
      renderBlock.innerHTML = `<style>${this.styles()}</style>${this.template()}`;
      if (this.afterRender) this.afterRender();
      if (this.addEvents) this.addEvents();
    }

    // hide any non immidiate elements above or on the same level ad the page content
    displayPageContentOnly(reverse = false) {
      const renderBlock = document.querySelector('page-render-block');
      const html = document.documentElement;
      let node = renderBlock;
      let sibling;
      let directPatent = renderBlock;

      while (node.parentNode && node.parentNode !== html) {
          node = node.parentNode;
          sibling = node.firstChild;
          while (sibling) {
              if (sibling.nodeType === 1 && sibling !== directPatent) {
                  if (reverse) sibling.classList.remove('hide-other-than-page-content');
                  else sibling.classList.add('hide-other-than-page-content');
              }
              sibling = sibling.nextSibling
          }
          directPatent = node;
      }

      this.global.displayPageContentOnly = !reverse;
    }

    // Called before render(). placeholder, can be overidden
    // This does not include the initial cloneNode
    beforeRender() { }

    // Called after render(). placeholder, can be overidden
    // This does not include the initial cloneNode
    afterRender() { }

    // add css that will be injected to the template
    styles() { }

    // add html template, This will be used to create the template and direct render
    template() { }
}


/***/ }),

/***/ "./node_modules/@webformula/pax-core/src/client/router.js":
/*!****************************************************************!*\
  !*** ./node_modules/@webformula/pax-core/src/client/router.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (new class {
  constructor() {
    this.routes = {};
    this.classReference = {};

    this.pageClassnameRegex = /class\s(.*)\sextends/;

    // regexes for parsing uri's
    this.PARAMETER_REGEXP = /([:*])(\w+)/g;
    this.WILDCARD_REGEXP = /\*/g;
    this.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
    this.REPLACE_WILDCARD = '(?:.*)';
    this.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
    this.MATCH_REGEXP_FLAGS = '';

    this._transitionPages = false;
    this.bound_onTransitionComplete = this._onTransitionComplete.bind(this);

    this.__mutationObserver = new MutationObserver(() => {
      if (window.activePage.connectedCallback) window.activePage.connectedCallback();
      this._stopWatchingForConnect();
    });
  }

  init() {
    // browser events for url changes
    window.addEventListener('hashchange', this._resolve.bind(this));
    window.addEventListener('DOMContentLoaded', () => {
      this._resolve(undefined, true);
    });
  }

  get transitionPages() {
    return this._transitionPages;
  }

  set transitionPages(value) {
    this._transitionPages = !!value;
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  get urlParameters() {
    const match = this._match(this.path);
    return match ? match.params : {};
  }

  get searchParamters() {
    return this._extractSearchParameters(this._clean(window.location.href)).split(',').filter(a => !!a).reduce((a, b) => {
      const split = b.split('=');
      a[split[0]] = split[1];
      return a;
    }, {});
  }

  addTransitionCSS() {
    document.body.insertAdjacentHTML('beforebegin', `<style>
      page-container {
        display: flex;
      }
      page-container.in-transition {
        overflow-x: hidden;
      }
      page-render-block {
        width: 100%;
        flex-shrink: 0;
        opacity: 1;
      }
      page-render-block.before-transition-page-out {
        pointer-events: none;
        user-select: none;
      }
      page-render-block.before-transition-page-in {
        transform: scale(0.9) translateX(-100%);
        opacity: 0;
      }
      page-render-block.transition-page-out {
        transform: scale(0.9);
        opacity: 0;
        transition: opacity .16s linear,
                    transform .26s cubic-bezier(0,0,.2,1);
      }
      page-render-block.transition-page-in {
        transform: scale(1) translateX(-100%);
        transform-origin: -50% 0;
        opacity: 1;
        transition: opacity .18s linear,
                    transform .26s cubic-bezier(0,0,.2,1);
      }
    </style>`);
  }
  
  // you can configure routes directly in the Page class
  addPageClass(Class, optionalPath) {
    const className = this.getClassName(Class, optionalPath);

    // handle optional path
    if (optionalPath) this.addPageClassPath(Class, optionalPath);

    // add routes from page class
    (Class.routes || []).forEach(path => {
      if (optionalPath === path) return;
      if (this.routes[path]) throw Error(`Path already exists: ${path}`);
      this.classReference[className] = Class;
      this.routes[path] = className;
    });
  }

  addPageClassPath(Class, path) {
    const className = this.getClassName(Class, path);
    if (this.routes[path]) throw Error(`Path already exists: ${optionalPath}`);
    this.classReference[className] = Class;
    this.routes[path] = className;
  }

  getClassName(Class, path) {
    const classMatch = this.pageClassnameRegex.exec(Class);
    return classMatch ? classMatch[1] : path.split('/').pop().replace('.js', '');
  }

  setRoot(className) {
    if (this.routes[className]) {
      const Class = this.classReference[this.routes[className]];
      this.addPageClassPath(Class, '/');
    } else {
      // className is actually class in this case
      this.addPageClassPath(className, '/');
    }
  }

  set404({ Class }) {
    if (Class) this._notFoundRouteClass = Class;
  }


  // --- private ---

  _resolve(event, initial = false) {
    // no change
    if (initial === false && event.oldURL !== undefined && event.oldURL === event.newURL) return;

    const path = this.path;
    const match = this._match(path);

    if (!match) {
      if (this._notFoundRouteClass) return this._changePage(this._notFoundRouteClass);
      else return console.warn('no page found and no default not found page setup');
    }

    let url = path;
    if (initial && this._pageIsPreRendered()) return;

    let GETParameters = this._extractSearchParameters(this._clean(window.location.href));
    if (GETParameters) url += `?${GETParameters}`;
    window.location.hash = url;

    // prevent page change when no difference exists
    // this will cover the case of adding the #/ to the url
    if (event && event.oldURL !== undefined) {
      const urlDiff = event.oldURL.length > event.newURL.length ? event.oldURL.replace(event.newURL, '') : event.newURL.replace(event.oldURL, '');
      if (urlDiff === '' || urlDiff === '#/') return
    }

    // prevent page from loading on initial render
    return this._changePage(match);
  }

  _watchForConnect() {
    const renderBlock = document.querySelector('page-render-block:not(.previous)');
    this.__mutationObserver.observe(renderBlock, { childList: true });
  }

  _stopWatchingForConnect() {
    this.__mutationObserver.disconnect();
  }

  _changePage({ Class }) {
    if (!Class) throw Error('no class found');

    const pageContainer = document.querySelector('page-container');
    if (!pageContainer) throw Error('<page-container> required for router to work');

    //
    this._stopWatchingForConnect();

    const renderBlock = document.querySelector('page-render-block');

    // --- inital page ---
    // A page can have no pre-rendered pages.
    // create render-block and render page immidiatly
    if (!renderBlock) {
      pageContainer.appendChild(document.createElement('page-render-block'));

      // create page class instance
      window.activePage = new Class();
      this._watchForConnect();
      window.activePage.render();
      document.documentElement.scrollTop = 0;
      return;
    }
    
    // --- no transiton ---
    // change page immideatly if transitions are not on
    if (!this._transitionPages) {
      window.activePage.disconnectedCallback();

      // create page class instance
      window.activePage = new Class();
      this._watchForConnect();
      window.activePage.render();
      document.documentElement.scrollTop = 0;
      return;
    }


    //--- transiton ---

    // prep for current page transition out
    renderBlock.classList.add('previous');
    renderBlock.classList.add('before-transition-page-out');
    window.activePage._disableRender = true;
    window.activePage.disconnectedCallback();

    // build next page and prep for transition
    const nextRenderBlock = document.createElement('page-render-block');
    nextRenderBlock.classList.add('before-transition-page-in');
    renderBlock.insertAdjacentElement('afterend', nextRenderBlock);

    const pageInstance = new Class();
    window.activePage = pageInstance;
    this._watchForConnect();
    pageInstance.render();

    const pageTitle = document.querySelector('title');
    if (pageTitle) pageTitle.innerText = pageInstance.title;

    // --- transition ---
    pageContainer.classList.add('in-transition');

    // CONTINUE
    renderBlock.classList.add('transition-page-out');
    nextRenderBlock.classList.add('transition-page-in');

    renderBlock.addEventListener('transitionend', this.bound_onTransitionComplete);
    nextRenderBlock.addEventListener('transitionend', this.bound_onTransitionComplete);
  }

  _onTransitionComplete({ target }) {
    target.removeEventListener('transitionend', this.bound_onTransitionComplete);
    // remove old page
    if (target.classList.contains('transition-page-out')) target.remove();
    // remove animation state from new page
    else {
      target.classList.remove('before-transition-page-in');
      target.classList.remove('transition-page-in');
    }

    // remove transition state from page container
    if (!document.querySelector('page-render-block.previous') && !document.querySelector('page-render-block.next')) {
      document.querySelector('page-container').classList.remove('in-transition');
    }
  }
  

  _pageIsPreRendered() {
    const renderBlock = document.querySelector('page-render-block');
    if (renderBlock && renderBlock.children.length > 0) return true;
    return false;
  }

  _clean(str) {
    if (str instanceof RegExp) return s;
    return str.replace(/\/+$/, '').replace(/^\/+/, '/');
  }

  _extractSearchParameters(url) {
    return url.split(/\?(.*)?$/).slice(1).join('');
  }



  // --- matching ---

  _match(path) {
    let matched = this._findMatchedRoutes(path);
    if (!matched.length) return false;
    else if (matched.length === 1) return matched[0];
    else {
      return matched.sort((a, b) => {
        if (b.params) return 1;
        return -1;
      })[0];
    }
  }

  _findMatchedRoutes(url) {
    return Object.keys(this.routes)
      .map(route => {
        const className = this.routes[route];
        const { regexp, paramNames } = this._replaceDynamicURLParts(this._clean(route));
        const match = url.replace(/^\/+/, '/').match(regexp);
        const params = this._regExpResultToParams(match, paramNames);
        const Class = this.classReference[className];

        return !match ? false : {
          match,
          route,
          params,
          className,
          Class
        };
      })
      .filter(m => m && m.match[0] !== '');
  }

  _replaceDynamicURLParts(route) {
    let paramNames = [];
    let regexp = '';

    if (route instanceof RegExp) {
      regexp = route;
    } else {
      regexp = new RegExp(
        this._clean(route)
          .replace(this.PARAMETER_REGEXP, (full, dots, name) => {
            paramNames.push(name);
            return this.REPLACE_VARIABLE_REGEXP;
          })
          .replace(this.WILDCARD_REGEXP, this.REPLACE_WILDCARD) + this.FOLLOWED_BY_SLASH_REGEXP, this.MATCH_REGEXP_FLAGS
      );
    }
    return { regexp, paramNames };
  }

  _regExpResultToParams(match, names) {
    if (names.length === 0) return null;
    if (!match) return null;
    return match
      .slice(1, match.length)
      .reduce((params, value, index) => {
        if (params === null) params = {};
        params[names[index]] = decodeURIComponent(value);
        return params;
      }, null);
  }
});


/***/ }),

/***/ "./src/components/banner/index.js":
/*!****************************************!*\
  !*** ./src/components/banner/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/banner/service.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-banner', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
  }

  connectedCallback() {
    this.style.marginBottom = `-${this.clientHeight + 1}px`;
  }

  show() {
    _service_js__WEBPACK_IMPORTED_MODULE_1__["default"].add(this);
  }

  dismiss() {
    _service_js__WEBPACK_IMPORTED_MODULE_1__["default"].remove(this);
  }

  accept() {
    _service_js__WEBPACK_IMPORTED_MODULE_1__["default"].accept(this);
  }

  _show() {
    this.classList.add('mdw-show');
  }

  _dissmiss() {
    const self = this;
    self.addEventListener(_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transitionEventName, function handler() {
      self.removeEventListener(_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transitionEventName, handler);
      self.remove();
    });
    this.classList.add('mdw-dismiss');
    this.dispatchClose();
  }

  dispatchClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }
});


/***/ }),

/***/ "./src/components/banner/service.js":
/*!******************************************!*\
  !*** ./src/components/banner/service.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");


const MDWBanner = new class {
  constructor() {
    this.queue = [];
  }

  add(el, resolver) {
    this.queue.push({el, resolver});
    this.handleQueue();
  }

  remove(el) {
    if (this.current && this.current.el === el) {
      this.current.resolver(false);
      el._dissmiss();
    } else this.queue = this.queue.filter(e => e.el !== el);
  }

  accept(el) {
    if (this.current && this.current.el === el) {
      this.current.resolver(true);
      el._dissmiss();
    } else this.queue = this.queue.filter(e => e.el !== el);
  }

  handleQueue() {
    if (this.queue.length === 0) return;

    if (!this.current) {
      this.current = this.queue.shift();
      this.current.el._show();
      this.current.el.addEventListener('close', () => {
        this.current = undefined;
        setTimeout(() => {
          this.handleQueue();
        }, 300);
      });
    }
  }

  create({ message, dismissLabel = "dismiss", acceptLabel = null, template, parent }) {
    if (!message && !template) throw Error('Either `message` or `template` is required');
    if (!template && !dismissLabel && !acceptLabel) throw Error('When not using a `template` you are required to provide either a `dismissLabel` or an `acceptLabel`');

    const uid = _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].uid();
    if (!template) template = this.template(message, dismissLabel, acceptLabel, uid);

    // try to find the correct parent if not passed in
    let parentElement = parent || document.querySelector('mdw-page > mdw-top-app-bar');
    if (!parentElement) parentElement = document.querySelector('mdw-page');
    if (!parentElement) parentElement = document.querySelector('body');

    let bannerElement = undefined;
    if (parentElement.nodeName === 'MDW-TOP-APP-BAR') {
      parentElement.insertAdjacentHTML('afterend', template);
      bannerElement = document.querySelector(`mdw-banner#${uid}`);
    } else {
      parentElement.insertAdjacentHTML('afterbegin', template);
      bannerElement = document.querySelector(`mdw-banner#${uid}`);
    }

    let resolver;
    const promise = new Promise(resolve => {
      resolver = resolve;
    });

    // NOTE may need timeout
    this.add(bannerElement, resolver);
    return promise;
  }

  template(message, dismissLabel, acceptLabel, uid) {
    return `
      <mdw-banner id="${uid}" class="mdw-elevation-1">
        <div>${message}</div>
        <div>
          ${dismissLabel ? `<mdw-button onclick="${uid}.dismiss()" class="mdw-secondary">${dismissLabel}</mdw-button>` : ''}
          ${acceptLabel ? `<mdw-button onclick="${uid}.accept()" class="mdw-secondary">${acceptLabel}</mdw-button>` : ''}
        </div>
      </mdw-banner>
    `;
  }
}

window.MDWBanner = MDWBanner;

/* harmony default export */ __webpack_exports__["default"] = (MDWBanner);


/***/ }),

/***/ "./src/components/bottom-navigation/index.js":
/*!***************************************************!*\
  !*** ./src/components/bottom-navigation/index.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-bottom-navigation', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
  }

  connectedCallback() {
    [...this.querySelectorAll('mdw-button')].forEach(el => {
      el.classList.add('mdw-bottom-navigation');
    });
  }
});


/***/ }),

/***/ "./src/components/button/index.js":
/*!****************************************!*\
  !*** ./src/components/button/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-button', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_asyncClick = this.asyncClick.bind(this);
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_checkHREFActive = this.checkHREFActive.bind(this);
    this.cloneTemplate();
    this.setupAsync();
    this.connectHREF();
  }

  connectedCallback() {
    this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
    this.removeEventListener('click', this.bound_asyncClick);
    this.removeEventListener('click', this.bound_hrefClick);
    window.removeEventListener('hashchange', this.bound_checkHREFActive);
  }

  get spinnerContainer() {
    if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.mdw-spinner-container');
    return this._spinnerContainer;
  }

  get pending() {
    return this.pending_;
  }

  setupAsync() {
    if (!this.hasAttribute('mdw-async')) return;
    this.addEventListener('click', this.bound_asyncClick);
  }

  resolve() {
    if (this.pending_ === false) return;
    this.pending_ = false;
    this.hideSpinner();
  }

  asyncClick(e) {
    if (this.pending_ === true) return;
    this.pending_ = true;
    this.showSpinner();
  }

  showSpinner() {
    this._showSpinner = true;
    this.classList.add('mdw-show-spinner');
    const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
    this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="24" class="${isWhite ? 'mdw-white' : 'mdw-grey'}" style="position: absolute; left: calc(50% - 12px); top: 6px;"></mdw-circular-progress>`;
  }

  hideSpinner() {
    this._showSpinner = false;
    this.classList.remove('mdw-show-spinner');
    this.spinnerContainer.innerHTML = '';
  }

  connectHREF() {
    if (!this.hasAttribute('href')) return;
    this.checkHREFActive();
    window.addEventListener('hashchange', this.bound_checkHREFActive);
    this.addEventListener('click', this.bound_hrefClick);
  }

  checkHREFActive() {
    if (!this.hasAttribute('href')) return;
    const href = document.location.href;
    const hash = document.location.hash;
    if (href === this.getAttribute('href') || href === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
    else if (hash === this.getAttribute('href') || hash === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
    else this.removeAttribute('active');
  }

  hrefClick() {
    // open in new tab / window
    if (this.getAttribute('target') === '_blank') {
      window.open(this.getAttribute('href'), '_blank');
      return;
    }

    document.location.href = this.getAttribute('href');
  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        user-select: none;
        align-items: center;
        border: none;
        box-sizing: border-box;
        display: inline-flex;
        font-family: Roboto, sans-serif;
        font-size: 1rem;
        font-weight: 500;
        justify-content: center;
        letter-spacing: 0.08929em;
        outline: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        text-transform: uppercase;
        vertical-align: middle;
        will-change: transform, opacity;
        margin: 0;
        background-color: transparent;

        border-radius: 4px;
        line-height: 2.25rem;
        padding: 0 8px 0 8px;
        height: 36px;
        min-width: 64px;

        color: var(--mdw-theme-on-primary);
      }

      :host(.mdw-full-height) {
        height: 48px;
      }

      :host(.mdw-full-width) {
        margin: 0;
        padding: 0;
        width: 100%;
        border-radius: 0;
      }

      :host::before,
      :host::after {
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        background-color: var(--mdw-theme-foreground);
      }

      :host::before {
        transition: opacity 15ms linear,
                    background-color 15ms linear;
        z-index: 1;
      }

      :host(:hover) {
        cursor: pointer;
      }

      :host([disabled]) {
        background-color: transparent !important;
        color: var(--mdw-theme-text-disabled-on-background);
        cursor: default;
        pointer-events: none;
      }
      :host::-moz-focus-inner {
        padding: 0;
        border: 0;
      }

      :host(:active) {
        outline: none;
      }

      :host(.mdw-raised),
      :host(.mdw-unelevated) {
        background-color: var(--mdw-theme-background);
        padding: 0 16px 0 16px;
      }

      :host(.mdw-raised)::before,
      :host(.mdw-unelevated)::before {
        opacity: 0.08;
      }
      :host(.mdw-raised) {
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(.mdw-raised:hover),
      :host(.mdw-raised:focus) {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-raised:active) {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-raised[disabled]) {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-outlined) {
        border-color: rgba(0, 0, 0, 0.37);
        line-height: inherit;
        border-style: solid;
        padding: 0 14px 0 14px;
        border-width: 2px;
      }

      :host(.mdw-shaped) {
        border-radius: 18px;
      }

      :host(.mdw-dense) {
        border-radius: 4px;
        height: 32px;
        font-size: .8125rem;
        line-height: inherit;
      }

      :host(.mdw-dense.mdw-shaped) {
        border-radius: 16px;
      }

      :host(.mdw-icon) {
        border-radius: 50%;
        min-width: 0;
        width: 48px;
        height: 48px;
        padding: 12px;
      }

      :host(.mdw-bottom-navigation) {
        border-radius: 50%;
        min-width: 0;
        max-width: 100px;
        width: 56px;
        height: 56px;
        padding: 28px;
      }

      :host(.mdw-icon) ::slotted(mdw-icon) {
        line-height: 36px;
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
      }

      /* mdw-icon */
      ::slotted(mdw-icon) {
        width: 18px;
        height: 18px;
        font-size: 18px;
        margin-left: -4px;
        margin-right: 2px;
        vertical-align: top;
        line-height: 36px;
      }

      :host ::slotted(svg.mdw-icon) {
        fill: currentColor;
      }


      /* primary */
      :host(.mdw-primary) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-primary.mdw-raised),
      :host(.mdw-primary.mdw-unelevated)  {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text-primary-on-background);
      }

      :host(.mdw-primary.mdw-outlined) {
        border-color: var(--mdw-theme-primary);
      }

      :host(.mdw-primary)::before,
      :host(.mdw-primary)::after {
        background-color: var(--mdw-theme-primary);
      }


      /* secondary */

      :host(.mdw-secondary) {
        color: var(--mdw-theme-secondary);
      }

      :host(.mdw-secondary.mdw-raised),
      :host(.mdw-secondary.mdw-unelevated) {
        background-color: var(--mdw-theme-secondary);
        color: var(--mdw-theme-text-primary-on-primary);
      }

      :host(.mdw-secondary.mdw-outlined) {
        border-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-secondary)::before,
      :host(.mdw-secondary)::after {
        background-color: var(--mdw-theme-secondary);
      }

      /* error */

      :host(.mdw-error) {
        color: var(--mdw-theme-error);
      }

      :host(.mdw-error.mdw-raised),
      :host(.mdw-error.mdw-unelevated) {
        background-color: var(--mdw-theme-error);
        color: var(--mdw-theme-text-primary-on-primary);
      }

      :host(.mdw-error.mdw-outlined) {
        border-color: var(--mdw-theme-error);
      }

      :host(.mdw-error)::before,
      :host(.mdw-error)::after {
        background-color: var(--mdw-theme-error);
      }

      :host(:not(.mdw-bottom-navigation):hover)::before {
        opacity: 0.04;
      }

      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }

      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-on-primary--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }

      .mdw-button-ripple,
      .mdw-button-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }


      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-primary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-primary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      :host(.mdw-secondary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-secondary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }

      :host(.error.mdw-raised) .mdw-ripple-element,
      :host(.error.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }


      /* bottom navigation */
      :host(.mdw-bottom-navigation) span.text {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        text-transform: none;
        line-height: 12px;
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/card/index.js":
/*!**************************************!*\
  !*** ./src/components/card/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-card', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.classList.add('mdw-elevation-1');
  }
});


/***/ }),

/***/ "./src/components/checkbox/index.js":
/*!******************************************!*\
  !*** ./src/components/checkbox/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-checkbox', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
   constructor() {
     super();
     this.bound_handleChange = this.handleChange.bind(this);
   }

   connectedCallback() {
     this.cloneTemplate();

     if (this.hasAttribute('indeterminate')) this.indeterminate = true;
     if (this.hasAttribute('checked')) this.checked = true;

     this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
       element: this.shadowRoot.querySelector('.mdw-ripple'),
       triggerElement: [this.input],
       radius: 20,
       centered: true
     });

     this.connected_ = true;
     this.input.addEventListener('change', this.bound_handleChange);
   }

   disconnectedCallback() {
     this.input.removeEventListener('change', this.bound_handleChange);
     this.ripple.destroy();
   }

   static get observedAttributes() {
     return ['checked', 'indeterminate', 'disabled'];
   }

   attributeChangedCallback(name, oldValue, newValue) {
     if (!this.connected_) return;
     this[name] = newValue;
   }

   get input() {
     if (!this.input_) this.input_ = this.shadowRoot.querySelector('input');
     return this.input_;
   }

   get checked() {
     return this.input.checked;
   }

   set checked(value) {
     if (value === '') value = true;
     this.input.checked = value;
     this.handleChange();
   }

   get indeterminate() {
     return this.input.indeterminate;
   }

   set indeterminate(value) {
     if (value === '') value = true;
     this.input.indeterminate = value;
   }

   set disabled(value) {
     value = !!value || value === '';
     if (value) this.input.setAttribute('disabled', 'disabled');
     else this.input.removeAttribute('disabled');
   }

   handleChange() {
     this.dispatchEvent(new CustomEvent('change', this));
   }

   toggle() {
     this.checked = !this.checked;
   }

   template() {
     return /* html */`
       <input type="checkbox">
       <div class="mdw-background">
         <div class="mdw-checkmark"></div>
         <div class="mdw-mixedmark"></div>
       </div>
       <div class="mdw-ripple mdw-checkbox-ripple"></div>
     `;
   }

   styles() {
     return /* css */`
      .mdw-background::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(0, 0);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        will-change: opacity, transform;
      }

      .mdw-background {
        left: 11px;
        right: initial;
        display: -ms-inline-flexbox;
        display: inline-flex;
        position: absolute;
        top: 11px;
        bottom: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 45%;
        height: 45%;
        transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border: 2px solid currentColor;
        border-radius: 2px;
        background-color: transparent;
        pointer-events: none;
        will-change: background-color, border-color;
      }

      :host([dir="rtl"]) .mdw-background {
        left: initial;
        right: 11px;
      }

      .mdw-checkmark {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
        color: #fff;
      }

      .mdw-checkmark:after {
        box-sizing: border-box;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        left: 4px;
        top: 0;
        display: table;
        width: 6.66667px;
        height: 13.33333px;
        border-width: 2px;
        border-style: solid;
        border-top: 0;
        border-left: 0;
        content: "";
      }

      input:indeterminate + .mdw-background .mdw-checkmark {
        transform: rotate(45deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
      }

      input:indeterminate + .mdw-background .mdw-mixedmark {
        width: 100%;
        height: 0;
        transform: scaleX(0) rotate(0deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border-width: 1px;
        border-style: solid;
        opacity: 0;
        border-color: #fff;
      }

      @media screen and (-ms-high-contrast: active) {
        .mixedmark {
          margin: 0 1px;
        }
      }

      path {
        transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        stroke: currentColor;
        stroke-width: 3.12px;
        stroke-dashoffset: 29.78334;
        stroke-dasharray: 29.78334;
      }



      /* --- input --- */

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        cursor: inherit;
      }

      input:enabled:not(:checked):not(:indeterminate) + .mdw-background {
        border-color: var(--mdw-theme-checkboxborder);
        background-color: transparent;
      }

      input:disabled:not(:checked):not(:indeterminate) + .mdw-background {
        border-color: var(--mdw-theme-checkboxborderdisabled);
      }

      input:disabled:checked + .mdw-background,
      input:disabled:indeterminate + .mdw-background {
        border-color: transparent;
        background-color: var(--mdw-theme-checkboxborderdisabled);
      }

      input:checked + .mdw-background,
      input:indeterminate + .mdw-background {
        transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);
      }

      input:checked + .mdw-background path,
      input:indeterminate + .mdw-background path {
        stroke-dashoffset: 0;
      }

      input:focus + .mdw-background::before {
        transform: scale(2.75, 2.75);
        transition: opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);
        opacity: 0.12;
      }

      input:disabled {
        cursor: default;
        pointer-events: none;
      }

      input:checked + .mdw-background .mdw-checkmark {
        transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
        opacity: 1;
      }

      input:checked + .mdw-background .mdw-mixedmark {
        transform: scaleX(1) rotate(-45deg);
      }

      input:indeterminate + .mdw-background .mdw-checkmark {
        transform: rotate(45deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
      }

      input:indeterminate + .mdw-background .mdw-mixedmark {
        transform: scaleX(1) rotate(0deg);
        opacity: 1;
      }

      input:enabled:checked ~ .mdw-background,
      input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-secondary);
        background-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-primary) input:enabled:checked ~ .mdw-background,
      :host(.mdw-primary) input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-primary);
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-error) input:enabled:checked ~ .mdw-background,
      :host(.mdw-error) input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-error);
        background-color: var(--mdw-theme-error);
      }



      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      .mdw-checkbox-ripple {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
      }

      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
    `;
   }
});


/***/ }),

/***/ "./src/components/circular-progress/index.js":
/*!***************************************************!*\
  !*** ./src/components/circular-progress/index.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-circular-progress', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.insertedDiameters = [];
    this.cloneTemplate();
  }

  connectedCallback() {
    this.diameter = this.getAttribute('mdw-diameter') || 100;
    this.render();
    this.style.width = this.style.height = this.diameter + 'px';
    if (this.value) this.value = this.value;
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get diameter() {
    return this._diameter;
  }
  set diameter(value) {
    this._diameter = parseInt((''+value).replace('px', ''));
    if (!this.insertedDiameters[this._diameter]) {
      this.insertedDiameters.push(this._diameter);
      this.shadowRoot.querySelector('style').sheet.insertRule(this._getAnimationText(), 0);
    }
  }

  get svg() {
    if (!this._svg) this._svg = this.shadowRoot.querySelector('svg');
    return this._svg;
  }

  get strokeWidth() {
    return this._strokeWidth || this.diameter / 10;
  }
  set strikeWidth(value) {
    this._strokeWidth = parseInt((''+value).replace('px', ''));
  }

  get value() {
    return this.getAttribute('value');
  }
  set value(value) {
    this._value = Math.max(0, Math.min(100, parseInt((''+value).replace('px', ''))));
    if (this.diameter === undefined) return;
    this.circle.style.strokeDashoffset = (this._strokeCircumference * (100 - this._value) / 100) + 'px';
  }

  get mode() {
    return this.getAttribute('mdw-mode') === 'determinate' ? 'determinate' : 'indeterminate';
  }

  get circle() {
    if (!this._circle) this._circle = this.shadowRoot.querySelector('circle');
    return this._circle;
  }

  get _circleRadius() {
    return (this.diameter - 10) / 2;
  }

  get _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }

  get _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius;
  }

  get INDETERMINATE_ANIMATION_TEMPLATE() {
    return `
     @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {
        0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
        12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
        12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
        25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }
        25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
        37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
        37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
        50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }
        50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
        62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
        62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
        75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }
        75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
        87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
        87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
        100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
      }
    `;
  }

  _getAnimationText() {
    return this.INDETERMINATE_ANIMATION_TEMPLATE
      .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
      .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
      .replace(/DIAMETER/g, `${this.diameter}`);
  }

  template() {
    return `
      <svg style="width: ${this.diameter}px; height: ${this.diameter}px;">
        <circle
          cx="50%"
          cy="50%"
          r="${this._circleRadius}"
          style="
            animation-name: mat-progress-spinner-stroke-rotate-${this.diameter};
            stroke-dasharray: ${this._strokeCircumference}px;
            stroke-width: ${this._circleStrokeWidth}%;
          "
          ></circle>
      </svg>
    `;
  }

  styles() {
    return /* css */`
      :host {
        display: block;
        position: relative;
      }

      svg {
        position: absolute;
        transform: rotate(-90deg);
        top: 0;
        left: 0;
        transform-origin: center;
        overflow: visible;
      }

      circle {
        fill: transparent;
        transform-origin: center;
        transition: stroke-dashoffset 225ms linear;
        stroke: var(--mdw-theme-primary);
      }

      :host(.mdw-white) circle {
        stroke: white;
      }

      :host(.mdw-grey) circle {
        stroke: grey;
      }

      :host(.mdw-secondary) circle {
        stroke: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) circle {
        stroke: var(--mdw-theme-error);
      }

      :host([mdw-mode='indeterminate']) {
        animation: mat-progress-spinner-linear-rotate 2000ms linear infinite;
      }

      :host([mdw-mode='indeterminate']) circle {
        transition-property: stroke;
        animation-duration: 4000ms;
        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
        animation-iteration-count: infinite;
      }

      @keyframes mat-progress-spinner-linear-rotate {
        0%       { transform: rotate(0deg); }
        100%     { transform: rotate(360deg); }
      }

      @keyframes mat-progress-spinner-stroke-rotate-100 {
        0% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(0);
        }
        12.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(0);
        }
        12.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(72.5deg);
        }
        25% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(72.5deg);
        }
        25.0001% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(270deg);
        }
        37.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(270deg);
        }
        37.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(161.5deg);
        }
        50% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(161.5deg);
        }
        50.0001% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(180deg);
        }
        62.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(180deg);
        }
        62.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(251.5deg);
        }
        75% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(251.5deg);
        }
        75.0001% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(90deg);
        }
        87.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(90deg);
        }
        87.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(341.5deg);
        }
        100% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(341.5deg);
        }
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/dialog/index.js":
/*!****************************************!*\
  !*** ./src/components/dialog/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/dialog/service.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-dialog', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.clickOutsideClose_ = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);

    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = undefined;
    }
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
    return this.panel_;
  }

  get position() {
    return this.position_ || 'center center';
  }

  set position(value) {
    this.position_ = value;
  }

  get clickOutsideClose() {
    return this.clickOutsideClose_;
  }

  set clickOutsideClose(value) {
    this.clickOutsideClose_ = value;
  }

  show() {
    this.panel.hoistToBody();
    this.panel.setPosition(this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.classList.add('mdw-show');
    // TODO find a better way to handle positioning against body.
    // this.panel.setPositionStyle(document.body);

    this.backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].addBackdrop(this.panel, () => {
      if (this.clickOutsideClose === true) this.close();
    });
    _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].lockPageScroll();
  }

  close(ok) {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].unlockPageScroll();
    this.backdrop.remove();
    this.backdrop = undefined;
    this.dispatchClose(ok);
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = undefined;
    }
  }

  dispatchClose(isOk = false) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        ok: isOk
      }
    }));
  }
});


/***/ }),

/***/ "./src/components/dialog/service.js":
/*!******************************************!*\
  !*** ./src/components/dialog/service.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const MDWDialog = new class {
  constructor() {
    this.currentDialog = null;
  }

  show({ title, message, okLabel, cancelLabel, position = 'center center', clickOutsideClose = false }) {
    return new Promise(resolve => {
      const id = this.uid();
      const template = this.template({ id, title, message, okLabel, cancelLabel, position });

      document.body.insertAdjacentHTML('beforeend', template);
      const el = document.querySelector(`#${id}`);
      const onclose = (e) => {
        resolve(e.detail.ok);
        el.removeEventListener('close', onclose);
        el.remove();
        this.currentDialog = null;
      };
      el.addEventListener('close', onclose);
      el.clickOutsideClose = clickOutsideClose;
      this.currentDialog = el;

      setTimeout(() => {
        el.show();
      }, 0);
    });
  }

  removeCurrent() {
    this.currentDialog.close();
  }

  uid() {
    return `dialog_${parseInt(Math.random() * 99999)}`;
  }

  template({ id, title, message, okLabel, cancelLabel, position }) {
    return `
      <mdw-dialog id="${id}">
        <mdw-panel mdw-position="${position}">
          <mdw-dialog-container>
            ${!!title ? `<mdw-dialog-title>${title}</mdw-dialog-title>` : ''}
            <mdw-dialog-content>${message}</mdw-dialog-content>
            <mdw-dialog-actions>
              ${!!cancelLabel ? `<mdw-button class="mdw-error" onclick="${id}.close(false)">${cancelLabel}</mdw-button>` : ''}
              ${!!okLabel ? `<mdw-button onclick="${id}.close(true)">${okLabel}</mdw-button>` : ''}
            </mdw-dialog-actions>
          </mdw-dialog-container>
        </mdw-panel>
      </mdw-dialog>
    `;
  }
}

window.MDWDialog = MDWDialog;

/* harmony default export */ __webpack_exports__["default"] = (MDWDialog);


/***/ }),

/***/ "./src/components/drawer/index.js":
/*!****************************************!*\
  !*** ./src/components/drawer/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



customElements.define('mdw-drawer', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_navigationChange = this.navigationChange.bind(this);
    this.isShowing = true;
    this.isRightAligned = this.hasAttribute('right-aligned');
    const fixedEl = this.fixedElement;
    if (fixedEl) fixedEl.style.width = `${this.offsetWidth}px`;

    // add spacing for scroll
    if (this.contentElement) this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop + 18}px)`;

    this.setupIconBar();

    this.lockBody();
    this.addCloseOnChange();
  }

  connectedCallback() {
    this.classList.add('mdw-active');
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) {
      this.style.position = 'absolute';
      if (!this.classList.contains('mdw-locked-open-mobile')) {
        this.unlockOpen();
        this.hide();
      }
    }
  }

  disconnectedCallback() {
    if (this.backdrop) this.backdrop.remove();
    window.removeEventListener('hashchange', this.bound_navigationChange);
  }

  get isLockedOpen() {
    return this.classList.contains('mdw-locked-open');
  }

  get headerElement() {
    return this.querySelector('mdw-drawer-header');
  }

  get contentElement() {
    return this.querySelector('mdw-drawer-content');
  }

  get iconBarElement() {
    return this.querySelector('mdw-drawer-icon-bar');
  }

  get fixedElement() {
    return this.querySelector('mdw-drawer-fixed');
  }

  addCloseOnChange() {
    window.addEventListener('hashchange', this.bound_navigationChange);
  }

  lockOpen() {
    this.classList.add('mdw-locked-open');
  }

  unlockOpen() {
    this.classList.remove('mdw-locked-open');
  }

  navigationChange() {
    if (!this.isLockedOpen) this.hide();
  }

  hide() {
    this.classList.add('mdw-closed');
    if (this.isLockedOpen) {
      this.classList.remove('mdw-locked-open');
      this.wasLockedOpen = true;
    }
    this.isShowing = false;
    if (this.backdrop) this.backdrop.remove();

    if (!this.iconBarElement) return;
    this.iconBarElement.classList.add('mdw-show');
    const that = this;
    this.addEventListener('transitionend', function handle() {
      that.removeEventListener('transitionend', handle);
      that.contentElement.classList.add('mdw-hide');
      that.headerElement.classList.add('mdw-hide');
    });
  }

  show() {
    this.classList.remove('mdw-closed');
    this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop}px)`;
    if (this.wasLockedOpen) this.classList.add('mdw-locked-open');
    else if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) this.addBackdrop();
    this.isShowing = true;

    // add spacing for scroll
    if (this.contentElement) this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop + 18}px)`;

    if (!this.iconBarElement) return;
    this.iconBarElement.classList.remove('mdw-show');
    this.contentElement.classList.remove('mdw-hide');
    this.headerElement.classList.remove('mdw-hide');
  }

  toggle() {
    if (!this.isShowing) this.show();
    else this.hide();
  }

  addBackdrop() {
    this.backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].addBackdrop(this, () => this.hide(), { drawer: true });
  }

  // this makes sure there are no scrolling issues if the drawer is locked open and you want it fixed
  lockBody() {
    if (
      this.isLockedOpen // is in correct position
      && this.fixedElement // should be fixed
      && this.parentNode === document.body // draw is directly in body
      && !_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile // only valid in non mobile
      && document.querySelector('mdw-page > mdw-content') // contains nessacary elements to make sure scrolling will still work
    ) document.body.classList.add('prevent-over-scroll');
  }


  // you can add an iconbar.
  // when the drawer is closed it will minimize to show the icon bar instead of completly hiding
  setupIconBar() {
    const iconBar = this.querySelector('mdw-drawer-icon-bar');
    if (!iconBar) return;

    this.classList.add('mdw-has-icon-bar');
    this.hasIconBar = true;
  }
});


/***/ }),

/***/ "./src/components/fab/index.js":
/*!*************************************!*\
  !*** ./src/components/fab/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-fab', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_asyncClick = this.asyncClick.bind(this);
    this.cloneTemplate();
    this.setupAsync();
  }

  connectedCallback() {
    this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
    this.removeEventListener('click', this.bound_asyncClick);

  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-fab-ripple"></div>
    `;
  }

  get dense() {
    return this.classList.contains('mdw-dense');
  }

  get spinnerContainer() {
    if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.mdw-spinner-container');
    return this._spinnerContainer;
  }

  set disabled(value) {
    if (!!value || value === '') this.setAttribute('disabled', 'disabled');
    else this.removeAttribute('disabled');
  }

  get pending() {
    return this.pending_;
  }

  setupAsync() {
    if (!this.hasAttribute('mdw-async')) return;
    this.addEventListener('click', this.bound_asyncClick);
  }

  resolve() {
    if (this.pending_ === false) return;
    this.pending_ = false;
    this.hideSpinner();
  }

  asyncClick(e) {
    if (this.pending_ === true) return;
    this.pending_ = true;
    this.showSpinner();
  }

  get spinnerStyle() {
    if (this.dense) return 'position: absolute; left: calc(50% - 12px); top: 8px;';
    return 'position: absolute; left: calc(50% - 16px); top: 12px;';
  }

  get spinnerDiameter() {
    if (this.dense) return 24;
    return 32;
  }

  showSpinner() {
    this._showSpinner = true;
    this.classList.add('mdw-show-spinner');
    const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
    this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="${this.spinnerDiameter}" class="${isWhite ? 'mdw-white' : 'mdw-grey'}" style="${this.spinnerStyle}"></mdw-circular-progress>`;
  }

  hideSpinner() {
    this._showSpinner = false;
    this.classList.remove('mdw-show-spinner');
    this.spinnerContainer.innerHTML = '';
  }

  styles() {
    return /* css */`
      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }

      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }

      .mdw-fab-ripple,
      .mdw-fab-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }


      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/icon/index.js":
/*!**************************************!*\
  !*** ./src/components/icon/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-icon', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.cloneTemplate();
    if (this.hasAttribute('mdw-src')) this.render();
  }

  get src() {
    return this.getAttribute('mdw-src');
  }

  styles() {
    return `
      :host {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        font-feature-settings: 'liga';
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }

      :host img {
        width: 24px;
        height: 24px;
      }


      :host(.mdw-primary) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-secondary) {
        color: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) {
        color: var(--mdw-theme-error);
      }
    `;
  }


  template() {
    const src = this.src;
    if (src) return `<img src="${src}"></img>`;
    return '<slot></slot>';
  }
});


/***/ }),

/***/ "./src/components/linear-progress/index.js":
/*!*************************************************!*\
  !*** ./src/components/linear-progress/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-linear-progress', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    if (this.percent === null) this.classList.add('mdw-query')
  }

  static get observedAttributes() {
    return ['mdw-percent'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch(name) {
      case 'mdw-percent':
        this.percent = newValue;
        break;
    }
  }

  get bar() {
    if (!this._bar) this._bar = this.shadowRoot.querySelector('.mdw-bar');
    return this._bar;
  }

  get percent() {
    return this.getAttribute('mdw-percent');
  }

  set percent(value) {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    this.bar.style.width = `${value}%`;
  }

  template() {
    return /* html */`
      <div class="mdw-bar"></div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 4px;
        padding-top: 0;
        margin-bottom: 0;
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.18);
      }

      .mdw-bar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-white) {
        background-color: rgba(255, 255, 255, 0.18);
      }

      :host(.mdw-white) .mdw-bar {
        background-color: white;
      }

      :host(.mdw-grey) {
        background-color: rgba(50, 50, 50, 0.18);
      }

      :host(.mdw-grey) .mdw-bar {
        background-color: grey;
      }

      :host(.mdw-secondary) {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.18);
      }

      :host(.mdw-secondary) .mdw-bar {
        background-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.18);
      }

      :host(.mdw-error) .mdw-bar {
        background-color: var(--mdw-theme-error);
      }


      :host(.mdw-query) .mdw-bar {
        transition: all 0.2s linear;
        animation: query .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);
      }

      @keyframes query {
        0% {
          opacity: 1;
          transform: translateX(35%) scale(.3, 1);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) scale(0, 1);
        }
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/list-item/index.js":
/*!*******************************************!*\
  !*** ./src/components/list-item/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-list-item', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_onSelect = this.onSelect.bind(this);
    this.bound_onclickSelect = this.onclickSelect.bind(this);
    this.bound_checkHREFActive = this.checkHREFActive.bind(this);
  }

  get list() {
    return this.parentNode;
  }

  isSelect() {
    return !!this.list.selectType;
  }

  selectOnclick() {
    return !!this.list.selectOnclick;
  }

  connectedCallback() {
    this.connectRipple();
    this.connectHREF();
    this.connectSelect();
  }

  disconnectedCallback() {
    if (this.ripple) this.ripple.destroy();
    this.removeEventListener('click', this.bound_hrefClick);
    if (this.selectEl_) this.selectEl_.removeEventListener('change', this.bound_onSelect);
    this.removeEventListener('click', this.bound_onclickSelect);
    window.removeEventListener('hashchange', this.bound_checkHREFActive);
  }

  connectRipple() {
    const element = this.querySelector('.mdw-ripple');
    if (!element) return;
    this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element,
      triggerElement: this
    });
    this.classList.add('mdw-has-ripple');
  }

  connectHREF() {
    if (!this.hasAttribute('href')) return;
    this.checkHREFActive();
    window.addEventListener('hashchange', this.bound_checkHREFActive);
    this.addEventListener('click', this.bound_hrefClick);
  }

  checkHREFActive() {
    if (!this.hasAttribute('href')) return;
    const href = document.location.href;
    const hash = document.location.hash;
    if (href === this.getAttribute('href') || href === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
    else if (hash === this.getAttribute('href') || hash === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
    else this.removeAttribute('active');
  }

  hrefClick() {
    // open in new tab / window
    if (this.getAttribute('target') === '_blank') {
      window.open(this.getAttribute('href'), '_blank');
      return;
    }

    document.location.href = this.getAttribute('href');
  }

  onSelect(e) {
    if (e.target.checked) this.list.itemSelected(this);
    else this.list.itemDeselected(this);
  }

  onclickSelect(e) {
    if (!this.selectOnclick()) return;
    if (e.target === this.selectEl_) return;
    this.selectEl_.checked = !this.selectEl_.checked;
  }

  connectSelect() {
    if (this.isSelect()) {
      this.selectEl_ = this.querySelector('mdw-checkbox');
      if (this.selectEl_) this.selectEl_.addEventListener('change', this.bound_onSelect);
      if (this.selectOnclick()) this.addEventListener('click', this.bound_onclickSelect);
    }
  }

  deselect() {
    this.selectEl_.checked = false;
  }
});


/***/ }),

/***/ "./src/components/list/index.js":
/*!**************************************!*\
  !*** ./src/components/list/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-list', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.selectedIndexes_ = [];
  }

  static get observedAttributes() {
    return ['mdw-select', 'mdw-select-onclick'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-select':
        this.selectType = newValue;
        break;
      case 'mdw-select-onclick':
        this.selectOnclick = newValue !== null;
        break;
    }
  }

  set selectOnclick(value) {
    this.selectOnclick_ = value;
  }

  get selectOnclick() {
    return this.selectOnclick_;
  }

  set selectType(value) {
    this.selectType_ = value;
  }

  get selectType() {
    return this.selectType_;
  }

  get selected() {
    return [].concat(this.selectedIndexes_);
  }

  deselectAll() {
    [...this.children].forEach(child => child.deselect());
    this.selectedIndexes_ = [];
  }

  itemSelected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    if (this.selectType_ === 'single') {
      const children = [...this.children];
      this.selectedIndexes_.forEach(i => children[i].deselect());
      this.selectedIndexes_ = [];
    }
    this.selectedIndexes_.push(index);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    this.selectedIndexes_.splice(this.selectedIndexes_.indexOf(index), 1);
    this.handleChange();
  }

  handleChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }
});


/***/ }),

/***/ "./src/components/menu/index.js":
/*!**************************************!*\
  !*** ./src/components/menu/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



customElements.define('mdw-menu', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);

    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile === true) this.createSheet();
    else this.createPanel();
  }

  connectedCallback() {
    this.button.addEventListener('click', this.bound_onClick);

    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile !== true) {
      this.classList.add('mdw-panel--container');
      this.panel.classList.add('mdw-menu');
    }
  }

  onClick() {
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile !== true) {
      this.panel.setPosition(this.panelPosition);
      this.panel.autoPosition();
      this.panel.clickBodyToClose();
      this.panel.open(true);
      this.panel.addEventListener('click', this.bound_onPanelClick);
    } else {
      this.sheet.open();
    }
  }

  onPanelClick() {
    this.panel.close();
  }

  set panelPosition(value) {
    // TODO validate
    this.panelPosition_ = value;
  }

  get panelPosition() {
    return this.panelPosition_ || 'inner-top inner-left';
  }

  get button() {
    return this.children[0];
  }

  get contentElement() {
    return this.querySelector('mdw-menu-content');
  }

  get panel() {
    return this.querySelector('mdw-panel');
  }

  get sheet() {
    return this.querySelector('mdw-sheet');
  }

  createSheet() {
    this.insertAdjacentHTML('beforeend', `
      <mdw-sheet mdw-modal>
        <mdw-sheet-content>
          ${this.contentElement.innerHTML}
        </mdw-sheet-content>
      </mdw-sheet>
    `);
    this.contentElement.remove();
  }

  createPanel() {
    if (!this.contentElement) return;
    this.insertAdjacentHTML('beforeend', `
      <mdw-panel>
        ${this.contentElement.innerHTML}
      </mdw-panel>
    `);
    this.contentElement.remove();
  }
});


/***/ }),

/***/ "./src/components/panel/index.js":
/*!***************************************!*\
  !*** ./src/components/panel/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



/* --- mdw-panel ---
 * The panel allows you to create positions floating elements.
 * mdw-panel is used for menu, dialog, tooltip
 */

 // TODO fix open and close animations
customElements.define('mdw-panel', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.FOCUSABLE_ELEMENTS = [
      'button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)',
      'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
    ].join(', ');
    this._clickOutsideClose = false;
    this._boundHandleBodyClick = this._handleBodyClick.bind(this);
    this._boundHandleKeydown = this._handleKeydown.bind(this);
    this._clickOutsideCloseIgnorElement = [];
    this._autoPosition = false;
  }

  connectedCallback() {
    this.classList.add('mdw-upgraded');
    this.transformPropertyName = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].transformPropertyName;
  }

  disconnectedCallback() {
    this.removeBodyClickEvent_();
    this.removeKeydownEvent_();
    clearTimeout(this._openAnimationEndTimerId);
    clearTimeout(this._closeAnimationEndTimerId);
    cancelAnimationFrame(this._animationRequestId);
  }

  static get observedAttributes() {
    return ['mdw-position'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-position':
        this._position = newValue;
        break;
    }
  }

  set clickOutsideClose(value) {
    this._clickOutsideClose = value;
  }

  set setQuickOpen(value) {
    this._isQuickOpen = value;
  }

  get position() {
    return this._position;
  }

  setPosition(value) {
    const split = value.split(' ');
    this._position = `${split[0] || 'top'} ${split[1] || 'left'}`;
    this.setAttribute('mdw-position', this._position);
    this._positionSet = true;
  }

  autoPosition() {
    this._autoPosition = true;
  }

  clickBodyToClose() {
    this._clickOutsideClose = true;
  }

  isOpen() {
    return this._isOpen;
  }

  open(clickBodyToClose) {
    if (clickBodyToClose !== undefined) this._clickOutsideClose = clickBodyToClose;
    // handle focused element
    const focusableElements = this.querySelectorAll(this.FOCUSABLE_ELEMENTS);
    this._firstFocusableElement = focusableElements[0];
    this._lastFocusableElement = focusableElements[focusableElements.length - 1];
    this.saveFocus();

    // handle animation
    if (!this._isQuickOpen) {
      this.classList.add('mdw-panel--animating-open');
      this._animationRequestId = this._runNextAnimationFrame(() => {
        this.classList.add('mdw-open');
        if (this._isQuickOpen) this.notifyOpen();
        else {
          this._openAnimationEndTimerId = setTimeout(() => {
            this._openAnimationEndTimerId = 0;
            this.classList.remove('mdw-panel--animating-open');
            this.notifyOpen();
          }, 150);
        }

        if (this._isHoisted) this.setHoisetedPosition();
        else this.setPositionStyle();
      });
    } else {
      this.classList.add('mdw-open');
      if (this._isHoisted) this.setHoisetedPosition();
      else this.setPositionStyle();
    }

    this.addBodyClickEvent_();
    this.addKeydownEvent_();
    this._isOpen = true;
  }

  // TODO FIX THE CLOSING ANIMATION
  close() {
    if (!this._isQuickOpen) {
      this.classList.add('mdw-panel--animating-closed');
      this.removeBodyClickEvent_();
      this._animationRequestId = this._runNextAnimationFrame(() => {
        this.classList.remove('mdw-open');
        if (this._isQuickOpen) this.notifyClose();
        else {
          this._closeAnimationEndTimerId = setTimeout(() => {
            this._closeAnimationEndTimerId = 0;
            this.classList.remove('mdw-panel--animating-closed');
            this.resetPosition();
            this.notifyClose();
          }, 75);
        }
      });
    } else {
      this.classList.remove('mdw-open');
      this.resetPosition();
    }

    this.removeKeydownEvent_();
    this._isOpen = false;
    const isRootFocused = this.isFocused();
    const childHasFocus = document.activeElement && this.contains(document.activeElement);
    if (isRootFocused || childHasFocus) this.restoreFocus();
  }

  _runNextAnimationFrame(callback) {
    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = requestAnimationFrame(() => {
      this._animationFrame = 0;
      clearTimeout(this._animationTimer);
      this._animationTimer = setTimeout(callback, 0);
    });
  }

  isFocused() {
    return document.activeElement === this;
  }

  saveFocus() {
    this._previousFocus = document.activeElement;
  }

  restoreFocus() {
    if (this.contains(document.activeElement) && this._previousFocus && this._previousFocus.focus) this._previousFocus.focus();
  }

  focusFirstElement() {
    if (this._firstFocusableElement && this._firstFocusableElement.focus) this._firstFocusableElement.focus()
  }

  focusLastElement() {
    if (this._lastFocusableElement && this._lastFocusableElement.focus) this._lastFocusableElement.focus()
  }

  isFirstElementFocused() {
    this._firstFocusableElement ? this._firstFocusableElement === document.activeElement : false;
  }

  isLastElementFocused() {
    this._lastFocusableElement ? this._lastFocusableElement === document.activeElement : false;
  }

  addBodyClickEvent_() {
    if (!this._clickOutsideClose) return;
    setTimeout(() => {
      this.hasBodyEvent = true;
      document.body.addEventListener('click', this._boundHandleBodyClick);
    }, 0);
  }

  removeBodyClickEvent_() {
    if (this.hasBodyEvent) document.body.removeEventListener('click', this._boundHandleBodyClick);
    this.hasBodyEvent = false;
  }

  addKeydownEvent_() {
    this.hasKeydownEvent = true;
    document.body.addEventListener('keydown', this._boundHandleKeydown);
  }

  removeKeydownEvent_() {
    if (this.hasKeydownEvent) document.body.removeEventListener('keydown', this._boundHandleKeydown);
    this.hasKeydownEvent = false;
  }

  ignoreElementOnClickToClose(el) {
    this._clickOutsideCloseIgnorElement.push(el);
  }

  _handleBodyClick(event) {
    const el = event.target;
    if (this._clickOutsideCloseIgnorElement.includes(el)) return;
    if (this.contains(el)) return;
    this.removeBodyClickEvent_();
    this.close();
  }

  _handleKeydown(event) {
    const { key, keyCode, shiftKey } = event;
    const isEscape = key === 'Escape' || keyCode === 27;
    const isTab = key === 'Tab' || keyCode === 9;

    if (isEscape) this.close();
    else if (isTab) {
      if (this.isLastElementFocused() && !shiftKey) {
        this.focusFirstElement();
        event.preventDefault();
      } else if (this.isFirstElementFocused() && shiftKey) {
        this.focusLastElement();
        event.preventDefault();
      }
    }
  }

  notifyClose() {
    this.dispatchEvent(new Event('MDWPanel:closed', this));
  }

  notifyOpen() {
    this.dispatchEvent(new Event('MDWPanel:open'), this);
  }

  hoistToBody(target) {
    if (this._isHoisted) return;
    this._container = target || this.parentNode;
    document.body.appendChild(this);
    this.classList.add('mdw-panel-hoisted');
    this._isHoisted = true;
  }

  _autoPositionHoisted() {
    if (!this._autoPosition) return;

    const pageHeight = window.innerHeight;
    const panelRect = this.getBoundingClientRect();
    const panelHeight = this.offsetHeight;
    let panelY = this.offsetTop;

    // if panel is out of window y bounds
    if (panelY + panelHeight > pageHeight) {
      if (panelHeight <= pageHeight) {
        const maxTop = pageHeight - panelHeight;
        let offset = panelY - maxTop;

        // add padding to offset, this will prevent panel from butting up against bottom
        if (offset > 20) offset += 10;
        else offset /= 2;

        panelY -= offset;
      }
    }

    this.style.top = `${panelY}px`;
  }

  setHoisetedPosition() {
    const bounds = this._container.getBoundingClientRect();
    this.style.top = `${bounds.top}px`;
    this.style.left = `${bounds.left}px`;
    this.style[this.transformPropertyName] = 'scale(1)';

    if (!this._positionSet) {
      this._autoPositionHoisted();
    } else {
      let top = 0;
      let left = 0;

      this.style.top = `${top}px`;
      this.style.left = `${left}px`;

      setTimeout(() => {
        const { clientWidth, clientHeight } = document.documentElement;
        const height = this.offsetHeight;
        const width = this.offsetWidth;
        const aValue = this.position.split(' ')[0];
        const bValue = this.position.split(' ')[1];

        switch(aValue) {
          case 'top':
            top = 0;
            break;
          case 'inner-top':
            top = bounds.y + 12;
            break;
          case 'bottom':
            top = clientHeight;
            break;
          case 'center':
            top = (clientHeight / 2) - (height / 2);
            break;
          case 'inner-bottom':
            top = clientHeight - height - 12;
            break;
        }

        switch(bValue) {
          case 'left':
            left = -width;
            break;
          case 'inner-left':
            left = bounds.x + 12;
            break;
          case 'right':
            left = clientWidth;
            break;
          case 'inner-right':
            left = clientWidth - width - 12;
            break;
          case 'center':
            left = (clientWidth / 2) - (width / 2);
            break;
        }

        this.style.width = `${this.width}px`;
        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
      }, 0);
    }
  }


  setPositionStyle(parentOverride) {
    if (parentOverride) this._parentOverride = parentOverride;
    else if (this._parentOverride) parentOverride = this._parentOverride;

    const position = this.position;
    let parentWidth = 0;
    let parentHeight = 0;
    if (parentOverride) {
      parentWidth = parentOverride.offsetWidth;
      parentHeight = parentOverride.offsetHeight;
    } else {
      let parent = this.parentNode;
      if (parent.nodeName === 'MDW-SNACKBAR') parent = parent.parentNode;
      const parentRect = parent.getBoundingClientRect();
      parentWidth = parentRect.width;
      parentHeight = parentRect.height;
    }

    // use offset with and height to avoid problems due to transform: scale()
    // using getBoundingClientRect will return the adjusted width based on the scale factor
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    const aValue = position.split(' ')[0];
    const bValue = position.split(' ')[1];
    let top = 0;
    let left = 0;

    switch(aValue) {
      case 'top':
        top = -height;
        break;
      case 'bottom':
        top = parentHeight;
        break;
      case 'center':
        top = (parentHeight / 2) - (height / 2);
        break;
      case 'inner-bottom':
        top = parentHeight - height;
        break;
    }

    switch(bValue) {
      case 'left':
        left = -width;
        break;
      case 'right':
        left = parentWidth;
        break;
      case 'inner-right':
        left = parentWidth - width;
        break;
      case 'center':
        left = (parentWidth / 2) - (width / 2);
        break;
    }

    if (this._autoPosition) {
      const { clientWidth, clientHeight } = document.documentElement;
      const { x: globalX, y: globalY } = this.getBoundingClientRect();
      if ((globalY + height) > clientHeight) top = parentHeight - height;
      if ((globalX + width) > clientWidth) left = parentWidth - width;
    }

    this.style.top = `${parseInt(top)}px`;
    this.style.left = `${parseInt(left)}px`;
    this.style[this.transformPropertyName] = 'scale(1)';
  }

  resetPosition() {
    this.style.top = '';
    this.style.left = '';
    this.style[this.transformPropertyName] = '';
  }
});


/***/ }),

/***/ "./src/components/radio-group/index.js":
/*!*********************************************!*\
  !*** ./src/components/radio-group/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-radio-group', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.initialValue = this.getAttribute('mdw-value');
    // this.bound_change = this.change.bind(this);
  }

  // connectedCallback() {
  //   this.radios.forEach(r => r.input.addEventListener('change', this.bound_change));
  // }
  //
  // disoconnectedCallback() {
  //   this.radios.forEach(r => r.input.removeEventListener('change', this.bound_change));
  // }
  //
  // change(e) {
  //   console.log(e);
  // }
  //
  // get radios() {
  //   return [...this.querySelectorAll('mdw-radio')];
  // }
});


/***/ }),

/***/ "./src/components/radio/index.js":
/*!***************************************!*\
  !*** ./src/components/radio/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-radio', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    // input radio will not work correctly in shadowroot
    this.insertAdjacentHTML('beforeend', this.rippleTemplate());
  }

  connectedCallback() {
    if (this.parentNode.initialValue === this.value) this.input.checked = true;
    if (!this.input.hasAttribute('type')) this.input.setAttribute('type', 'radio');
    if (!this.input.hasAttribute('name')) this.input.setAttribute('name', this.name);
    this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this.querySelector('.mdw-ripple'),
      triggerElement: [this.input],
      radius: 20,
      centered: true
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
  }

  get value() {
    return this.input.value;
  }

  get input() {
    return this.querySelector('input');
  }

  get name() {
    if (this.parentNode && this.parentNode.hasAttribute('name')) {
      this.name_ = this.parentNode.getAttribute('name');
    } else if (this.hasAttribute('name')) {
      this.name_ = this.getAttribute('name');
    }

    // create name if one was not provided
    // name is required for radio buttons to work
    if (!this.name_) {
      this.name_ = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].uid();
      if (this.parentNode) this.parentNode.setAttribute('name', this.name_);
      else this.setAttribute('name', this.name_);
    }
    return this.name_;
  }

  rippleTemplate() {
    return `
      <div class="mdw-radio-background">
        <div class="mdw-radio__outer-circle"></div>
        <div class="mdw-radio__inner-circle"></div>
      </div>
      <div class="mdw-ripple mdw-radio-ripple"></div>
    `;
  }
});


/***/ }),

/***/ "./src/components/select/index.js":
/*!****************************************!*\
  !*** ./src/components/select/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



// TODO implaent validity

customElements.define('mdw-select', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this.setupLabel_();
    if (this.isEnhanced_) this.prepareEnhance_();
    this.classList.add('mdw-no-animation');
    this.cloneTemplate(true);

    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onChange = this.onChange.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
    this.bound_onKeyDown = this.onKeyDown.bind(this);
  }

  connectedCallback() {
    if (this.isEnhanced_) {
      if (this.selected_) this.value = this.selected_.value;
      this.shadowRoot.querySelector('render-block').addEventListener('click', this.bound_onClick);
      document.body.addEventListener('keydown', this.bound_onKeyDown);
    } else {
      this.selectElement.addEventListener('focus', this.bound_onFocus);
      this.selectElement.addEventListener('blur', this.bound_onBlur);
      this.selectElement.addEventListener('change', this.bound_onChange);
    }

    // capture option selected attribute and float the label
    this.onChange();

    setTimeout(() => {
      this.classList.add('mdw-no-animation');

      if (this.isEnhanced_) {
        this.panel.style.minWidth = `${this.offsetWidth}px`;
      }
    }, 0);
  }

  disconnectedCallback() {
    if (this.isEnhanced_) {
      this.shadowRoot.querySelector('render-block').removeEventListener('click', this.bound_onClick);
      document.body.removeEventListener('keydown', this.bound_onKeyDown);
    } else {
      this.selectElement.removeEventListener('focus', this.bound_onFocus);
      this.selectElement.removeEventListener('blur', this.bound_onBlur);
      this.selectElement.removeEventListener('change', this.bound_onChange);
    }
  }

  get value() {
    if (this.isEnhanced_) return this.value_;
    return this.selectElement.value || this.value_;
  }

  set value(value) {
    this.value_ = value;
    this.onChange();
    this.dispatchEvent(new Event('change'));
  }

  get selectElement() {
    return _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].querySlotted(this, 'select');
  }

  get label() {
    return this.shadowRoot.querySelector('label');
  }

  get labelWidth() {
    return this.label.offsetWidth * 0.9;
  }


  get enhacedElementId() {
    if (!this.enhacedElementId_) this.enhacedElementId_ = `select-enhanced-${_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].uid()}`;
    return this.enhacedElementId_;
  }

  get panel() {
    return document.querySelector(`#${this.enhacedElementId}`);
  }

  get sheet() {
    return document.querySelector(`#${this.enhacedElementId}`);
  }

  get isEnhanced_() {
    return this.getAttribute('mdw-enhanced') !== null;
  }

  get outlined() {
    return [].slice.apply(this.classList || []).includes('mdw-outlined');
  }

  get notch() {
    if (!this._notch) this._notch = this.shadowRoot.querySelector('.mdw-outlined-notch');
    return this._notch;
  }

  setupLabel_() {
    const label = this.querySelector('label');
    if (label) {
      this.labelText_ = label.innerText;
      label.remove();
    }
  }

  prepareEnhance_() {
    this.optionsMap_ = [...this.querySelectorAll('option')].map(el => {
      return {
        text: el.innerText,
        value: el.value,
        selected: el.hasAttribute('selected')
      };
    });

    this.selected_ = (this.optionsMap_.filter(({ selected }) => selected === true)[0] || { text: '', value: '' });

    const selectElement = this.querySelector('select');
    if (selectElement) {
      const selectOnchange = selectElement.getAttribute('onchange');
      if (selectOnchange) this.setAttribute('onchange', selectOnchange);
      selectElement.remove();
    }

    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) this.prepareSheet_();
    else this.preparePanel_();
  }

  preparePanel_() {
    const panelHTML = `
      <mdw-panel id="${this.enhacedElementId}" mdw-position="bottom inner-left" class="mdw-panel-hoisted">
        <mdw-list>
          ${this.optionsMap_.map(({ text, value, selected }) => `
            <mdw-list-item value="${value}"${selected ? ' selected' : ''}>${text}</mdw-list-item>
          `).join('\n')}
        </mdw-list>
      </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    const panelEl = this.panel;
    if (panelEl.hoistToBody) panelEl.hoistToBody(this);
    panelEl.style.transform = 'scale(1)';
  }

  prepareSheet_() {
    const sheetHTML = `
      <mdw-sheet mdw-modal id=${this.enhacedElementId}>
        <mdw-sheet-content>
          <mdw-list>
            ${this.optionsMap_.map(({ text, value, selected }) => `
              <mdw-list-item value="${value}"${selected ? ' selected' : ''}>${text}</mdw-list-item>
            `).join('\n')}
          </mdw-list>
        </mdw-sheet-content>
      </mdw-sheet>
    `;

    document.body.insertAdjacentHTML('beforeend', sheetHTML);
  }

  onFocus() {
    this.classList.add('mdw-focused');
    if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
  }

  onBlur() {
    this.classList.remove('mdw-focused');
    this.classList.toggle('mdw-not-empty', this.value);

    if (this.isEnhanced_) {
      if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) {
        this.sheet.removeEventListener('MDWSheet:closed', this.bound_onBlur);
        this.sheet.removeEventListener('click', this.bound_onPanelClick);
      } else {
        this.panel.removeEventListener('MDWPanel:closed', this.bound_onBlur);
        this.panel.removeEventListener('click', this.bound_onPanelClick);
      }
    }

    _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].unlockPageScroll();
  }

  onChange() {
    if (this.value && this.label) {
      this.label.classList.add('mdw-select--float-above');
      this.label.classList.remove('mdw-empty-no-float');
      if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
    } else {
      this.label.classList.remove('mdw-select--float-above');
      this.label.classList.add('mdw-empty-no-float');
      if (this.outlined) this.notch.style.width = '0';
    }
  }

  onClick(event) {
    this._focusIndex === undefined;
    this.onFocus();

    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) {
      const sheetElement = this.sheet;
      sheetElement.open();
      sheetElement.addEventListener('MDWSheet:closed', this.bound_onBlur);
      sheetElement.addEventListener('click', this.bound_onPanelClick);
      const focusedElement = sheetElement.querySelector('.mdw-focused');
      if (focusedElement) focusedElement.classList.remove('mdw-focused');
      const selectedElement = sheetElement.querySelector('[selected]');
      if (selectedElement) selectedElement.classList.add('mdw-focused');
    } else {
      const panelElement = this.panel;
      panelElement.autoPosition();
      panelElement.open(true);
      panelElement.addEventListener('MDWPanel:closed', this.bound_onBlur);
      panelElement.addEventListener('click', this.bound_onPanelClick);
      const focusedElement = panelElement.querySelector('.mdw-focused');
      if (focusedElement) focusedElement.classList.remove('mdw-focused');
      const selectedElement = panelElement.querySelector('[selected]');
      if (selectedElement) selectedElement.classList.add('mdw-focused');
    }

    _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].lockPageScroll();
  }

  onPanelClick(event) {
    if (!event.target.hasAttribute('value')) return;
    this.value = event.target.getAttribute('value');
    this.setSelectedText(event.target.innerText);
    const currentSelected = this.panel.querySelector('[selected]');
    if (currentSelected) currentSelected.removeAttribute('selected');
    event.target.setAttribute('selected', '');
    this.panel.close();
  }

  setSelectedText(value) {
    this.shadowRoot.querySelector('.mdw-select__selected-text').innerText = value;
  }

  get internalStylesFile() {
    return './internal.css';
  }

  template() {
    return `
      <i class="mdw-select__icon"></i>
      ${!this.isEnhanced_ ? '<slot></slot>' : `
        <div class="mdw-select__selected-text">${this.selected_.text}</div>
      `}
      <label>${this.labelText_}</label>
      ${this.outlined ? '' : '<div class="mdw-line-ripple"></div>'}
      ${!this.outlined ? '' : `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `}
    `;
  }



  // --- key controls ---

  onKeyDown(e) {
    if (!this.panel.isOpen()) return

    switch (e.keyCode) {
      case 40: //down
      case 39: //right
        this.focusNext();
        e.preventDefault();
        break;

      case 38: //up
      case 37: //left
        this.focusPrevious();
        e.preventDefault();
        break;

      case 13: //enter
        this.selectFocused();
        e.preventDefault();
        break;

      default:
        if (e.keyCode >= 31 || e.keyCode <= 90) {
          const nodeIndex = this.keyboardSearchNodes(e.keyCode);
          if (nodeIndex !== undefined) this.selectNode(nodeIndex);
          e.stopPropagation();
          e.preventDefault();
        }
    }
  }

  // key searching
  //   if you press "s" then it will find the first item that starts with an "s"
  //   if you press "s" then "t" it will find the first item that starts with an "st"
  keyboardSearchNodes(keyCode) {
    if (this._clearSearchTimeout !== undefined) clearTimeout(this._clearSearchTimeout);
    this._clearSearchTimeout = setTimeout(() => {
      this._clearSearchTimeout = undefined;
      this._keyboardSearchStr = '';
      this._keyboardOptionNames = undefined;
    }, 300);
    if (this._keyboardSearchStr === undefined) this._keyboardSearchStr = '';
    this._keyboardSearchStr += String.fromCharCode(keyCode);
    const search = new RegExp('^' + this._keyboardSearchStr, 'i');

    if (!this._keyboardOptionNames) this._keyboardOptionNames = [...this.panel.querySelectorAll('mdw-list-item')].map(el => el.innerText);

    const length = this._keyboardOptionNames.length;
    let i = 0;
    while (i < length) {
      if (search.test(this._keyboardOptionNames[i])) {
        return i;
      }
      i += 1;
    }
  }

  selectNode(index) {
    const optionElements = [...this.panel.querySelectorAll('mdw-list-item')];
    this._focusIndex = index;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusNext() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.querySelectorAll('mdw-list-item')];
    if (this._focusIndex === undefined) {
      const index = optionElements.findIndex(el => el.classList.contains('mdw-focused'));
      if (index >= 0) this._focusedOption = optionElements[index];
      this._focusIndex = index <= 0 ? 1 : index + 1;
    } else this._focusIndex += 1;
    if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusPrevious() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.querySelectorAll('mdw-list-item')];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  selectFocused() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.querySelectorAll('mdw-list-item')];
    if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
    this.onPanelClick({ target: optionElements[this._focusIndex] });
  }

  styles() {
    return /* css */`
      ::slotted(label.mdw-empty-no-float) {
        transform: none;
      }

      :host(.mdw-focused) .mdw-select__icon {
        transform: rotate(180deg) translateY(-5px);
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }


      .mdw-select__icon {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        position: absolute;
        bottom: 23px;
        left: auto;
        right: 8px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--mdw-theme-on-secondary);
      }

      ::slotted(select:focus) .mdw-select__icon,
      :host(.mdw-focused:focus) .mdw-select__icon {
        transform: rotate(180deg) translateY(-5px);
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(:not(.mdw-select--disabled)) ::slotted(select),
      :host(:not(.mdw-select--disabled)) .mdw-select__selected-text {
        border-bottom-color: rgba(var(--mdw-theme-on-background--rgb), 0.54);
        color: var(--mdw-theme-on-primary);
      }

      :host(.mdw-focused:not(.mdw-select--disabled)) ::slotted(select),
      :host(.mdw-focused:not(.mdw-select--disabled)) .mdw-select__selected-text,
      :host(:not(.mdw-select--disabled)) ::slotted(select:focus),
      :host(.mdw-focused:focus:not(.mdw-select--disabled)) .mdw-select__selected-text {
        border-bottom: 2px solid;
        border-bottom-color: var(--mdw-theme-primary);
        height: calc(100% + 1px); /* add 1px to height so the text does not get pushed up by border size change */
      }

      :host(.mdw-outlined) ::slotted(select),
      :host(.mdw-outlined) .mdw-select__selected-text {
        border: none;
      }

      ::slotted(select),
      .mdw-select__selected-text {
        position: absolute;
        padding: 20px 52px 4px 16px;
        font-family: Roboto,sans-serif;
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 400;
        letter-spacing: .009375em;
        text-decoration: inherit;
        text-transform: inherit;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        border: none;
        border-bottom: 1px solid;
        outline: none;
        background-color: transparent;
        color: inherit;
        white-space: nowrap;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      /* outlined */
      :host(.mdw-outlined) ::slotted(select),
      :host(.mdw-outlined) .mdw-select__selected-text {
        padding: 12px 52px 12px 16px;
        display: flex;
        border: none;
        background-color: transparent;
        z-index: 1;
      }
      :host(.mdw-outlined) ::slotted(select) {
        border-radius: 4px;
      }

      ::slotted(select) {
        border-radius: 4px 4px 0 0;
      }

      :host([dir=rtl]) ::slotted(select),
      ::slotted(select[dir=rtl]),
      :host([dir=rtl]) .mdw-select__selected-text,
      .mdw-select__selected-text[dir=rtl] {
        padding-left: 52px;
        padding-right: 16px;
      }


      label {
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 400;
        letter-spacing: 0.009375em;
        text-decoration: inherit;
        text-transform: inherit;
        position: absolute;
        left: 0;
        transform-origin: left top;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        line-height: 1.15rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: text;
        overflow: hidden;
        will-change: transform;
        transform: none;
        pointer-events: none;
        color: rgba(var(--mdw-theme-on-background--rgb), .6);
        z-index: 1;

        left: 16px;
        right: initial;
        top: 21px;
      }

      :host(.mdw-focused) label {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-no-animation) label {
        transition: none;
      }

      label:not(.mdw-empty-no-float) {
        transform: translateY(-70%) scale(0.75);
      }

      ::slotted(select:focus) + label,
      label.mdw-select--float-above {
        transform: translateY(-70%) scale(0.75);
      }

      :host(.mdw-outlined.mdw-focused) label,
      :host(.mdw-outlined) label.mdw-select--float-above {
        transform: translateY(-132%) scale(0.75);
      }

      :host(.mdw-select--with-leading-icon) label {
        left: 48px;
        right: initial;
      }

      :host(.mdw-outlined) label {
        left: 15px;
        right: initial;
        top: 18px;
      }

      :host(.mdw-outlined.mdw-select--with-leading-icon) label {
        left: 36px;
        right: initial;
      }

      :host(.mdw-outlined.mdw-select--with-leading-icon) label.mdw-select--float-above {
        left: 36px;
        right: initial;
      }

      .mdw-outlined-border-container {
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        height: 100%;
        text-align: left;
        pointer-events: none;
      }

      .mdw-outlined-leading {
        border-radius: 4px 0 0 4px;
        border-left: 1px solid;
        border-right: none;
        width: 12px;
      }

      .mdw-outlined-notch {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: calc(100% - 12px * 2);
      }

      .mdw-outlined-trailing {
        border-left: none;
        border-right: 1px solid;
        border-radius: 0 4px 4px 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
      }

      .mdw-outlined-leading,
      .mdw-outlined-notch,
      .mdw-outlined-trailing {
        box-sizing: border-box;
        height: 100%;
        border-top: 1px solid;
        border-bottom: 1px solid;
        pointer-events: none;

        border-color: rgba(var(--mdw-theme-on-background--rgb), 0.54);
      }

      .mdw-outlined-notch {
        border-top: none;
      }

      :host(.mdw-focused) .mdw-outlined-leading,
      :host(.mdw-focused) .mdw-outlined-notch,
      :host(.mdw-focused) .mdw-outlined-trailing,
      ::slotted(select:focus) .mdw-outlined-leading,
      ::slotted(select:focus) .mdw-outlined-notch,
      ::slotted(select:focus) .mdw-outlined-trailing {
        border-width: 2px;
        border-color: var(--mdw-theme-primary);
      }

      :host(.invalid) .mdw-outlined-leading,
      :host(.invalid) .mdw-outlined-notch,
      :host(.invalid) .mdw-outlined-trailing {
        border-color: var(--mdw-theme-error);
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/sheet/header.js":
/*!****************************************!*\
  !*** ./src/components/sheet/header.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-sheet-header', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this.hasCollapsedHeader = (this.children || []).length !== 0;
    if (!this.hasCollapsedHeader) this.classList.add('mdw-hide-collapsed-header');
    if (this.parentNode.registerHeader) this.parentNode.registerHeader(this, this.hasCollapsedHeader);
    this.innerHTMLString = this.innerHTML;
    this.innerHTML = '';
    this.cloneTemplate(true);
    this.showingFullscreen = false;
    this.bound_close = this.close.bind(this);

    if (this.parentNode.classList.contains('mdw-shaped')) this.classList.add('mdw-shaped');
  }

  connectedCallback() {
    this.closeButton.addEventListener('click', this.bound_close);
  }

  disconnectedCallback() {
    this.closeButton.removeEventListener('click', this.bound_close);
  }

  get closeButton() {
    return this.shadowRoot.querySelector('#mdw-sheet-close-action');
  }

  get title() {
    return !!this.title_ ? this.title_ : this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  set title(value) {
    this.title_ = value;
  }

  get isModal() {
    if (!this.parentNode) return false;
    return this.parentNode.isModal || false;
  }

  close() {
    if (this.isModal) this.parentNode.close();
    else this.parentNode.collapse();
  }

  disableCollapsedHeader() {
    this.classList.add('mdw-sheet-disable-collapsed-header');
  }

  showFullscreen() {
    this.classList.add('mdw-show-fullscreen');
  }

  hideFullscreen() {
    this.classList.remove('mdw-show-fullscreen');
  }

  toggleFullscreen(value) {
    if (this.showingFullscreen && !value) {
      this.showingFullscreen = value;
      this.hideFullscreen();
    } else if (value) {
      this.showingFullscreen = value;
      this.showFullscreen();
    }
  }

  showDragIcon() {
    this.classList.add('mdw-sheet-header-draggable');
  }

  template() {
    return `
      <div class="mdw-sheet-header-drag-icon"></div>

      <div class="mdw-sheet-header-fullscreen">
        ${this.isModal ? `
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            <mdw-icon>close</mdw-icon>
          </mdw-button>
        ` :
        `
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            <mdw-icon>keyboard_arrow_down</mdw-icon>
          </mdw-button>
        `}
        ${this.title}
      </div>

      <div class="mdw-sheet-header-container">
        ${this.innerHTMLString}
      </div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        display: block;
        height: 56px;
        z-index: 1;
      }

      :host .mdw-sheet-header-fullscreen {
        opacity: 0;
        pointer-events: none;
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        z-index: 1;
        background-color: var(--mdw-theme-surface);
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                    0 4px 5px 0 rgba(0,0,0,.14),
                    0 1px 10px 0 rgba(0,0,0,.12);
      }

      :host(.mdw-show-fullscreen) .mdw-sheet-header-fullscreen {
        opacity: 1;
        pointer-events: all;
        position: relative;
      }

      .mdw-sheet-header-drag-icon {
        display: none;
        opacity: 1;
        width: 12%;
        height: 4px;
        border-radius: 2px;
        margin: 0 auto;
        position: relative;
        top: 62px;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        background-color: #DDD;
      }

      :host(.mdw-sheet-header-draggable) .mdw-sheet-header-drag-icon {
        display: block;
      }

      :host(.mdw-show-fullscreen.mdw-sheet-header-draggable) .mdw-sheet-header-drag-icon {
        opacity: 0;
      }



      /* collapsed header */

      .mdw-sheet-header-container {
        display: flex;
        opacity: 1;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        position: absolute;
        top: 0;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-on-primary);
      }

      :host(.mdw-shaped) .mdw-sheet-header-container {
        border-radius: 8px 8px 0 0;
      }

      :host(.mdw-sheet-disable-collapsed-header) .mdw-sheet-header-container {
        display: none;
      }

      :host(.mdw-show-fullscreen) .mdw-sheet-header-container {
        opacity: 0;
        pointer-events: none;
      }

      :host(.mdw-hide-collapsed-header) .mdw-sheet-header-container {
        display: none;
      }

      :host(.mdw-two-line) .mdw-sheet-header-fullscreen,
      :host(.mdw-two-line) .mdw-sheet-header-container {
        height: 72px;
      }

      :host(.mdw-three-line) .mdw-sheet-header-fullscreen,
      :host(.mdw-three-line) .mdw-sheet-header-container {
        height: 88px;
      }

      :host(.mdw-two-line.mdw-shaped) .mdw-sheet-header-fullscreen,
      :host(.mdw-two-line.mdw-shaped) .mdw-sheet-header-container {
        border-radius: 10px 10px 0 0;
      }

      :host(.mdw-three-line.mdw-shaped) .mdw-sheet-header-fullscreen,
      :host(.mdw-three-line.mdw-shaped) .mdw-sheet-header-container {
        border-radius: 12px 12px 0 0;
      }

      :host(.mdw-white) .mdw-sheet-header-container {
        background-color: white;
        color: var(--mdw-theme-on-primary);
        border-bottom: 1px solid var(--mdw-theme-checkboxborder);
      }

      /* sections */

      section {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        padding: 8px 12px;
        z-index: 1;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      section[align="start"] {
        align-items: flex-start;
        order: -1;
      }

      section + section,
      section[align="end"] {
        align-items: flex-end;
        order: 1;
      }


      /* text */
      section .mdw-title {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: .0125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
      }

      section .mdw-subtitle {
        font-size: 15px;
        letter-spacing: .0125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
      }

      section .mdw-detail-text {
        font-size: 12px;
        letter-spacing: .0125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/sheet/index.js":
/*!***************************************!*\
  !*** ./src/components/sheet/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.js */ "./src/components/sheet/header.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/drag.js */ "./src/core/drag.js");





customElements.define('mdw-sheet', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this.isOpen = false;
    this.classList.add('mdw-closed');
    this.currentDragPosition = -1;
    this.bound_onDrag = this.onDrag.bind(this);
    this.bound_onScroll = this.onScroll.bind(this);
    this.style[_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transformPropertyName] = 'translate3d(0, 100%, 0)';
    this.setupHeader();
  }

  disconnectedCallback() {
    Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_3__["removeDragListener"])(this.contentElement, this.bound_onDrag);
    this.removeEventListener('scroll', this.bound_onScroll);
    this.removeBackdrop();
  }

  get contentElement() {
    return this.querySelector('mdw-sheet-content');
  }

  get title() {
    return this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  get isModal() {
    return this.hasAttribute('mdw-modal');
  }

  registerHeader(element, hasCollaspedHeader) {
    this.headerElement = element;
    this.headerElement.title = this.title;
    if (hasCollaspedHeader) this.classList.add('mdw-has-collasped-header');
    if (this.isModal) element.disableCollapsedHeader();
  }

  setupHeader() {
    if (!this.querySelector('mdw-sheet-header')) {
      this.insertAdjacentHTML('afterbegin', `<mdw-sheet-header mdw-title="${this.title}"></mdw-sheet-header>`);
    }
  }

  addBackdrop() {
    if (this.isModal) {
      this.backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].addBackdrop(this, () => {
        this.close();
      });
    }
  }

  removeBackdrop() {
    if (this.backdrop) this.backdrop.remove();
    this.backdrop = undefined;
  }

  setInitalPositions() {
    // page height
    this.viewHeight = window.innerHeight;

    // half height for modal, quater hight for non modal
    this.clientCenter = this.isModal ? this.viewHeight / 2 : this.viewHeight / 4;
    this.contentHeight = this.contentElement.offsetHeight;
    this.intialHeight = Math.min(this.contentHeight, this.clientCenter);

    // user set inital height
    if (this.hasAttribute('mdw-collapsed-height')) this.intialHeight = parseInt(this.getAttribute('mdw-collapsed-height').replace('px', ''));

    // the transform: translateY postion for the top of the page
    this.scrollY = -(this.viewHeight - this.intialHeight - 56);
    this.isDraggable = this.contentHeight > this.clientCenter;
    this.style.top = `calc(100% - ${this.intialHeight + 56}px)`;
  }

  open() {
    // lear close timeout so we do not overlap on a fast open
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
    this.classList.remove('mdw-closed');
    this.addBackdrop();

    // animation in sheet
    setTimeout(() => {
      this.setInitalPositions();
      this.setPosition(0);
      if (this.isDraggable) Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_3__["addDragListener"])(this.contentElement, this.bound_onDrag);
      this.contentElement.addEventListener('scroll', this.bound_onScroll);
      this.notifyOpen();
    }, 0);
    if (this.isModal) _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].lockPageScroll();
  }

  close() {
    Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_3__["removeDragListener"])(this.contentElement, this.bound_onDrag);
    this.contentElement.removeEventListener('scroll', this.bound_onScroll);
    this.setPosition(this.intialHeight + this.headerElement.offsetHeight);
    this.closeTimeout = setTimeout(() => {
      this.classList.add('mdw-closed');
      this.headerElement.hideFullscreen();
    }, 600);
    this.isOpen = false;
    this.removeBackdrop();
    this.notifyClose();
  }

  notifyClose() {
    this.dispatchEvent(new Event('MDWSheet:closed', this));
  }

  notifyOpen() {
    this.dispatchEvent(new Event('MDWSheet:open'), this);
  }

  collapse() {
    if (this.isDraggable) Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_3__["addDragListener"])(this.contentElement, this.bound_onDrag);
    this.setPosition(0);
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  onDrag(event) {
    switch (event.state) {
      case 'start':
        this.startDragPosition = this.currentDragPosition;
        break;
      case 'move':
        this.setPosition(this.startDragPosition + event.distance.y);
        break;
      case 'end':
        this.snapPosition(event.velocity.y);
        break;
    }
  }

  setPosition(y) {
    // if the sheet is at top then setup scrolling
    if (y <= this.scrollY) {
      y = this.scrollY;
      this.style.touchAction = '';
      Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_3__["disableDragListenerForElement"])(this.contentElement);
    }
    if (this.currentDragPosition === y) return;
    this.style[_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transformPropertyName] = `translate3d(0, ${y}px, 0)`;
    this.currentDragPosition = y;

    // show header befor it hits the top
    if (y - this.scrollY < 80) {
      this.headerElement.showFullscreen();
      this.classList.add('mdw-sheet-fullscreen');
    } else {
      this.headerElement.hideFullscreen();
      this.classList.remove('mdw-sheet-fullscreen');
    }

    // if is draggable
    if (this.isDraggable) this.headerElement.showDragIcon();
  }

  snapPosition(velocity) {
    // snap based on velocity (swipe montion)
    if (velocity < -0.7) return this.setPosition(this.scrollY);
    if (this.startDragPosition === this.scrollY && velocity > 0.7) return this.setPosition(0);
    if (this.startDragPosition <= 0 && velocity > 0.7) return this.close();

    // snap based on position
    const split = Math.abs(this.scrollY) / 2;
    // half way between center and top
    if (this.currentDragPosition - this.scrollY < split) this.setPosition(this.scrollY);
    // half way between center and bottom
    else if (this.currentDragPosition > split) this.close();
    else this.setPosition(0);
  }

  onScroll() {
    if (this.contentElement.scrollTop === 0) {
      Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_3__["enableDragListenerForElement"])(this.contentElement);
    }
  }
});


/***/ }),

/***/ "./src/components/slider/index.js":
/*!****************************************!*\
  !*** ./src/components/slider/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/drag.js */ "./src/core/drag.js");




customElements.define('mdw-slider', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.cloneTemplate();
    this.bound_onMouseDown = this.onMouseDown.bind(this);
    this.bound_onMouseUp = this.onMouseUp.bind(this);
    this.bound_onMouseMove = this.onMouseMove.bind(this);
    this.bound_onMouseEnter = this.onMouseEnter.bind(this);
    this.bound_onMouseLeave = this.onMouseLeave.bind(this);
    this.bound_trackClick = this.trackClick.bind(this);
    this.bound_onDrag = this.onDrag.bind(this);
  }

  connectedCallback() {
    this.value = this.attrValue;
    this.thumbContainer.style.left = `${((this.attrValue - this.min) / this.range) * this.offsetWidth}px`;
    this.notchContainer.style.marginLeft = `-${this.offsetWidth - (((this.attrValue - this.min) / this.range) * this.offsetWidth)}px`;
    this.throttled_dispatchChange = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].rafThrottle(this.dispatchChange);
    // this.thumb.addEventListener('mousedown', this.bound_onMouseDown);
    // this.thumb.addEventListener('mouseenter', this.bound_onMouseEnter);
    // this.track.addEventListener('click', this.bound_trackClick);
    Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_2__["addDragListener"])(this.thumb, this.bound_onDrag);
  }

  disconnectedCallback() {
    // this.thumb.removeEventListener('mousedown', this.bound_onMouseDown);
    // this.thumb.removeEventListener('mouseenter', this.bound_onMouseEnter);
    // this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
    this.track.removeEventListener('click', this.bound_trackClick);
    // document.removeEventListener('mouseup', this.bound_onMouseUp);
    // document.removeEventListener('mousemove', this.bound_onMouseMove);
    Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_2__["removeDragListener"])(this.thumb, this.bound_onDrag);
  }

  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    if (['min', 'max', 'step'].includes(name)) this.render();
  }

  get min() {
    return this.min_ || 0;
  }

  set min(value) {
    this.min_ = parseFloat(value);
  }

  get max() {
    return this.max_ || 100;
  }

  set max(value) {
    this.max_ = parseFloat(value);
  }

  get range() {
    return this.max - this.min;
  }

  get step() {
    return this.step_;
  }

  set step(value) {
    this.step_ = parseFloat(value);
  }

  get stepCount() {
    return !this.step ? 0 : Math.floor(this.range / this.step);
  }

  get attrValue() {
    let value = parseFloat(this.getAttribute('value') || 0);
    if (value < this.min) value = this.min;
    return value;
  }

  get value() {
    const { width } = this.getBoundingClientRect();
    const x = (this.thumbContainer.style.left || '0px').replace('px', '');
    const percent = x / width;
    const range = this.range;
    this.value_ = this.min + (percent * range);
    // check if the step is a integer and then garentee the value is an int
    // becuase of how math works in javascript(floating point) this is not a garentee without parseInt
    if (!(''+this.step).includes('.')) this.value_ = parseInt(this.value_);
    return this.value_ || 0;
  }

  set value(value) {
    this.value_ = parseFloat(value);
  }

  get thumb() {
    return this.shadowRoot.querySelector('.mdw-slider__thumb-hover');
  }

  get thumbContainer() {
    if (!this.thumbContainer_) this.thumbContainer_ = this.shadowRoot.querySelector('.mdw-slider__thumb-container');
    return this.thumbContainer_;
  }

  get notchContainer() {
    if (!this.notchContainer_) this.notchContainer_ = this.shadowRoot.querySelector('.mdw-slider__notch-container');
    return this.notchContainer_;
  }

  get track() {
    return this.shadowRoot.querySelector('.mdw-slider__track-container');
  }

  trackClick(e) {
    const { left, width } = this.getBoundingClientRect();
    let x = e.layerX;
    if (e.clientX < left) x = 0;
    if (x > width) x = width;
    this.thumbContainer.style.left = `${this.snap(x, width)}px`;
    this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
    this.dispatchChange();
  }

  onDrag(e) {
    switch(e.state) {
      case 'start':
        this.classList.add('mdw-pressed');
        this.initialX_ = parseInt((this.thumbContainer.style.left || '0px').replace('px', ''));
        break;
      case 'move':
        const { left, width } = this.getBoundingClientRect();
        let x = e.distance.x + this.initialX_;
        if (x < 0) x = 0;
        if (x > width) x = width;
        this.thumbContainer.style.left = `${this.snap(x, width)}px`;
        this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
        this.throttled_dispatchChange();
        break;
      case 'end':
        this.classList.remove('mdw-pressed');
        break;
    }
  }

  onMouseDown(e) {
    this.classList.add('mdw-pressed');
    document.addEventListener('mouseup', this.bound_onMouseUp);
    document.addEventListener('mousemove', this.bound_onMouseMove);
  }

  onMouseUp(e) {
    this.classList.remove('mdw-pressed');
    document.removeEventListener('mouseup', this.bound_onMouseUp);
    document.removeEventListener('mousemove', this.bound_onMouseMove);
  }

  onMouseMove(e) {
    const { left, width } = this.getBoundingClientRect();
    let x = e.layerX;
    if (e.clientX < left) x = 0;
    if (x > width) x = width;
    this.thumbContainer.style.left = `${this.snap(x, width)}px`;
    this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
    this.throttled_dispatchChange();
  }

  onMouseEnter(e) {
    this.classList.add('mdw-hover');
    this.thumb.addEventListener('mouseleave', this.bound_onMouseLeave);
  }

  onMouseLeave(e) {
    this.classList.remove('mdw-hover');
    this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
  }

  snap(x, width) {
    if (!this.step) return x;
    const percent = x / width;
    const range = this.range;
    const convertedValue = percent * range;
    const snapedValue = convertedValue - (convertedValue % this.step);
    return (snapedValue / range) * width
  }

  dispatchChange() {
    this.dispatchEvent(new Event('change', this));
  }

  template() {
    return `
      <div class="mdw-slider__track-container">
        <div class="mdw-slider__track"></div>

        <div class="mdw-slider__notch-container">
          <div class="mdw-slider__notch-pre-container">
            ${[...new Array(this.stepCount)].map(i => `<div class="mdw-slider__notch"></div>`).join('\n')}
          </div>

          <div class="mdw-slider__notch-post-container">
            ${[...new Array(this.stepCount)].map(i => `<div class="mdw-slider__notch"></div>`).join('\n')}
          </div>
        </div>
      </div>
      <div class="mdw-slider__thumb-container">
        <div class="mdw-slider__thumb"></div>
        <div class="mdw-slider__thumb-hover"></div>
      </div>
    `;
  }

  styles() {
    return /* css */`
      .mdw-slider__track-container {
        position: absolute;
        top: 50%;
        width: 100%;
        height: 10px;
        margin-top: -6px;
        overflow: hidden;
        user-select: none;
      }

      .mdw-slider__track {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 50%;
        user-select: none;
        /* background-color: var(--mdw-theme-secondary); */
      }

      /* :host(.mdw-primary) .mdw-slider__track {
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-error) .mdw-slider__track {
        background-color: var(--mdw-theme-error);
      } */


      .mdw-slider__thumb-container {
        position: absolute;
        top: 50%;
        left: 0;
        user-select: none;
        z-index: 2;
      }

      .mdw-slider__thumb {
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-top: -50%;
        z-index: 2;
        background-color: var(--mdw-theme-secondary);
        cursor: pointer;
        user-select: none;
      }

      :host(.mdw-primary) .mdw-slider__thumb {
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-error) .mdw-slider__thumb {
        background-color: var(--mdw-theme-error);
      }

      .mdw-slider__thumb-hover {
        position: absolute;
        box-sizing: border-box;
        top: -12px;
        left: -6px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transform-origin: center center;
        transition: opacity .1s ease-out,fill .1s ease-out,
                    transform .1s ease-out,fill .1s ease-out;
        opacity: 0;
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
        cursor: pointer;
        user-select: none;
      }

      :host(.mdw-primary) .mdw-slider__thumb-hover {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-slider__thumb-hover {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }

      :host(.mdw-hover) .mdw-slider__thumb-hover {
        opacity: 1;
      }

      :host(.mdw-pressed) .mdw-slider__thumb-hover {
        transform: scale(1.8);
      }




      /* --- notches --- */

      .mdw-slider__notch-container {
        display: flex;
        width: 200%;
        user-select: none;
      }

      .mdw-slider__notch-pre-container {
        width: 100%;
        height: 2px;
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        overflow: hidden;
        z-index: 1;
        background-color: var(--mdw-theme-secondary);
        user-select: none;
      }

      :host(.mdw-primary) .mdw-slider__notch-pre-container {
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-error) .mdw-slider__notch-pre-container {
        background-color: var(--mdw-theme-error);
      }

      .mdw-slider__notch-pre-container .mdw-slider__notch {
        height: 2px;
        flex: 1;
        border-left: 3px solid rgba(255, 255, 255, 0.6);
      }

      .mdw-slider__notch-post-container {
        width: 100%;
        height: 2px;
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        overflow: hidden;
        z-index: 1;
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.5);
        user-select: none;
      }

      :host(.mdw-primary) .mdw-slider__notch-post-container {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.5);
      }

      :host(.mdw-error) .mdw-slider__notch-post-container {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.5);
      }

      .mdw-slider__notch-post-container .mdw-slider__notch {
        height: 2px;
        flex: 1;
        border-left: 3px solid rgba(0, 0, 0, 0.6);
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/snackbar/index.js":
/*!******************************************!*\
  !*** ./src/components/snackbar/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/snackbar/service.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-snackbar', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.panelId = `${this.getAttribute('id')}_panel`;
  }

  connectedCallback() {
    this.querySelector('mdw-panel').setAttribute('id', `${this.panelId}`);
    this.hasBckdrop = true;
    this.panel.clickOutsideClose = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get position() {
    return this.position_ || 'inner-bottom inner-left';
  }

  setPosition(value) {
    const split = value.split(' ');
    this.position_ = `${split[0] || 'top'} ${split[1] || 'left'}`;
    this.panel.setPosition(this.position);
  }

  show() {
    _service_js__WEBPACK_IMPORTED_MODULE_1__["default"].add(this);
  }

  close(ok) {
    _service_js__WEBPACK_IMPORTED_MODULE_1__["default"].remove(this, ok);
  }

  _open() {
    this.panel.hoistToBody(this.parentNode);
    this.panel.setPosition(this.position);
    this.panel.autoPosition();
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.autoCancelTimeout = setTimeout(() => {
      this.close();
    }, 3000);
  }

  _close(ok) {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.dispatchClose(ok);
    clearTimeout(this.autoCancelTimeout);

    // remove panel element
    setTimeout(() => {
      this.panel.remove();
    }, 200);
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  dispatchClose(isOk = false) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        ok: isOk
      }
    }));
  }
});


/***/ }),

/***/ "./src/components/snackbar/service.js":
/*!********************************************!*\
  !*** ./src/components/snackbar/service.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const MDWSnackbar = new class {
  constructor() {
    this.queue = [];
  }

  add(el) {
    this.queue.push({el});
    this.handleQueue();
  }

  remove(el, ok) {
    if (this.current && this.current.el === el) el._close(ok);
    else this.queue = this.queue.filter(e => e.el !== el);
  }

  handleQueue() {
    if (this.queue.length === 0) return;

    if (!this.current) {
      this.current = this.queue.shift();
      this.current.el._open();
      this.current.el.addEventListener('close', () => {
        this.current = undefined;
        setTimeout(() => {
          this.handleQueue();
        }, 300);
      });
    }
  }

  show({ message, actionLabel, position }) {
    return new Promise(resolve => {
      const id = this.uid();
      const template = this.template({ id, message, actionLabel });

      this.topLevelElement.insertAdjacentHTML('beforeend', template);
      const el = document.querySelector(`#${id}`);
      const onclose = (e) => {
        resolve(e.detail.ok);
        el.removeEventListener('close', onclose);
        el.remove();
      };
      el.addEventListener('close', onclose);
      if (position) el.setPosition(position);
      el.show();
    });
  }

  get topLevelElement() {
    let el = document.body.querySelector('mdw-content');
    if (el) return el;

    el = document.bodyquerySelector('mdw-body');
    if (el) return el;

    return document.body;
  }

  uid() {
    return `snackbar_${parseInt(Math.random() * 99999)}`;
  }

  template({ id, message, actionLabel }) {
    return `
      <mdw-snackbar id="${id}">
        <mdw-panel>
          <mdw-snackbar-container>
            <mdw-snackbar-content>${message}</mdw-snackbar-content>
            <mdw-snackbar-actions>
              ${!!actionLabel ? `<mdw-button class="mdw-action-button">${actionLabel}</mdw-button>` : ''}
              <mdw-button onclick="${id}.close(true)" class="mdw-close-button mdw-icon">
                <mdw-icon>close</mdw-icon>
              </mdw-button>
            </mdw-snackbar-actions>
          </mdw-snackbar-container>
        </mdw-panel>
      </mdw-snackbar>
    `;
  }
}

window.MDWSnackbar = MDWSnackbar;

/* harmony default export */ __webpack_exports__["default"] = (MDWSnackbar);


/***/ }),

/***/ "./src/components/switch/index.js":
/*!****************************************!*\
  !*** ./src/components/switch/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-switch', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_onInputChange = this.onInputChange.bind(this);
    this.cloneTemplate();
  }

  connectedCallback() {
    this.input.addEventListener('change', this.bound_onInputChange);
    this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: [this.input],
      radius: 20,
      centered: true
    });
  }

  disconnectedCallback() {
    this.input.addEventListener('click', this.bound_click);
    this.ripple.destroy();
  }

  static get observedAttributes() {
    return ['checked', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get input() {
    if (!this.input_) this.input_ = this.shadowRoot.querySelector('input');
    return this.input_;
  }

  get checked() {
    return this.input.checked;
  }

  set checked(value) {
    if (value === '') value = true;
    this.input.checked = value;
    this.updateCheckedClass();
  }

  set disabled(value) {
    value = !!value || value === '';
    if (value) this.input.setAttribute('disabled', 'disabled');
    else this.input.removeAttribute('disabled');
  }

  updateCheckedClass() {
    if (this.checked) this.classList.add('checked');
    else this.classList.remove('checked');
  }

  dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }

  onInputChange(e) {
    this.updateCheckedClass();
    this.dispatchChange();
  }

  template() {
    return /* html */`
      <div class="mdw-track"></div>
      <div class="mdw-thumb-underlay">
        <div class="mdw-thumb">
          <input type="checkbox" role="switch">
          <div class="mdw-ripple mdw-switch-ripple"></div>
        </div>
      </div>
    `;
  }

  styles() {
    return /* css */`
      .mdw-track {
        box-sizing: border-box;
        width: 32px;
        height: 14px;
        border: 1px solid;
        border-radius: 7px;
        opacity: .38;
        transition: opacity 90ms cubic-bezier(.4,0,.2,1),
                    background-color 90ms cubic-bezier(.4,0,.2,1),
                    border-color 90ms cubic-bezier(.4,0,.2,1);
      }

      :host(:not(.checked)) .mdw-track {
        background-color: rgba(var(--mdw-theme-on-background--rgb), 0.7);
        border-color: rgba(var(--mdw-theme-on-background--rgb), 0.7);
      }

      :host(.checked) .mdw-track {
        background-color: var(--mdw-theme-secondary);
        border-color: var(--mdw-theme-secondary);
        opacity: .54;
      }

      :host(.checked.mdw-primary) .mdw-track {
        background-color: var(--mdw-theme-primary);
        border-color: var(--mdw-theme-primary);
      }

      :host(.checked.mdw-error) .mdw-track {
        background-color: var(--mdw-theme-error);
        border-color: var(--mdw-theme-error);
      }



      /* --- thumb underlay --- */

      .mdw-thumb-underlay {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        display: flex;
        position: absolute;
        will-change: transform,opacity;
        left: -18px;
        right: auto;
        top: -17px;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        transform: translateX(0);
        transition: transform 90ms cubic-bezier(.4,0,.2,1),
                    background-color 90ms cubic-bezier(.4,0,.2,1),
                    border-color 90ms cubic-bezier(.4,0,.2,1);
      }

      :host(.checked) .mdw-thumb-underlay {
        transform: translateX(20px);
      }

      .mdw-thumb-underlay:after,
      .mdw-thumb-underlay:before {
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        background-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-primary) .mdw-thumb-underlay:after,
      :host(.mdw-primary) .mdw-thumb-underlay:before {
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-error) .mdw-thumb-underlay:after,
      :host(.mdw-error) .mdw-thumb-underlay:before {
        background-color: var(--mdw-theme-error);
      }

      .mdw-thumb-underlay:before {
        transition: opacity 15ms linear,background-color 15ms linear;
        z-index: 1;
      }



      /* --- thumb --- */

      .mdw-thumb {
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
                    0 2px 2px 0 rgba(0,0,0,.14),
                    0 1px 5px 0 rgba(0,0,0,.12);
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border: 10px solid;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      }

      :host(.checked) .mdw-thumb {
        background-color: var(--mdw-theme-secondary);
        border-color: var(--mdw-theme-secondary);
      }

      :host(.checked.mdw-primary) .mdw-thumb {
        background-color: var(--mdw-theme-primary);
        border-color: var(--mdw-theme-primary);
      }

      :host(.checked.mdw-error) .mdw-thumb {
        background-color: var(--mdw-theme-error);
        border-color: var(--mdw-theme-error);
      }

      :host(:not(.checked)) .mdw-thumb {
        background-color: #fff;
        border-color: #fff;
      }


      /* --- input --- */

      input {
        left: 0;
        right: auto;
        position: absolute;
        top: 0;
        width: 68px;
        height: 48px;
        margin: 0;
        opacity: 0;
        cursor: pointer;
        pointer-events: auto;
      }

      :host(.checked) input {
        transform: translateX(-20px);
      }



      /* --- ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }

      .mdw-switch-ripple {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/tabs/tab-body/index.js":
/*!***********************************************!*\
  !*** ./src/components/tabs/tab-body/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tab-body', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    this.parentNode.registerBody(this);
  }

  disconnectedCallback() {
    this.parentNode.unregisterBody(this);
  }

  addSlot() {
    this.shadowRoot.querySelector('mdw-tab-body-content').insertAdjacentHTML('beforeend', '<slot></slot>');
  }

  removeSlot() {
    this.shadowRoot.querySelector('slot').remove();
  }

  activate() {
    this.addSlot();
    this.classList.add('mdw-active');
  }

  deactivate() {
    this.removeSlot();
    this.classList.remove('mdw-active');
  }

  template() {
    return /* html */`
      <mdw-tab-body-content>
        <!-- slot is added dynamicly -->
      </mdw-tab-body-content>
    `;
  }

  styles() {
    return /* css */`
      mdw-tab-body-content {
        height: 100%;
        overflow: auto;
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/tabs/tab-button/index.js":
/*!*************************************************!*\
  !*** ./src/components/tabs/tab-button/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-tab-button', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_click = this.click.bind(this);
    this.cloneTemplate();
  }

  connectedCallback() {
    this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: this
    });
    this.parentNode.registerTab(this);
    this.addEventListener('click', this.bound_click);
  }

  disconnectedCallback() {
    this.ripple.destroy();
    this.parentNode.unregisterTab(this);
    this.removeEventListener('click', this.bound_click);
  }

  get indicator() {
    return this.shadowRoot.querySelector('.mdw-tab-button-indicator__content');
  }

  click(e) {
    this.parentNode.tabClick(this);
  }

  activate() {
    clearTimeout(this._animationTimer);
    this.indicator.style.transform = ``;
    this._runNextAnimationFrame(() => {
      this._animationTimer = setTimeout(() => {
        this.classList.add('mdw-active');
      }, 180);
    });
  }

  deactivate(moveX) {
    clearTimeout(this._animationTimer);
    this.indicator.style.transform = `translateX(${moveX.toString()}px)`;
    this._animationTimer = setTimeout(() => {
      this.classList.remove('mdw-active');
    }, 200);
  }

  _runNextAnimationFrame(callback) {
    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = requestAnimationFrame(() => {
      this._animationFrame = 0;
      clearTimeout(this._animationTimer);
      this._animationTimer = setTimeout(callback, 0);
    });
  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-tab-button-indicator">
        <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>
      </span>
      <div class="mdw-ripple mdw-tab-button-ripple"></div>
    `;
  }

  styles() {
    return /* css */`
      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }

      /* Add this to button or creat a new componenet mdw-tab */
      .mdw-tab-button-indicator {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      :host(.mdw-active) .mdw-tab-button-indicator .mdw-tab-button-indicator__content {
        transition: transform .2s cubic-bezier(.4,0,.2,1);
      }

      .mdw-tab-button-indicator__content {
        opacity: 0;
        transform-origin: left;
      }

      :host(.mdw-active) .mdw-tab-button-indicator__content {
        opacity: 1;
        transform: translateX(0);
      }

      .mdw-tab-button-indicator .mdw-tab-button-indicator__content--underline {
        align-self: flex-end;
        width: 100%;
        background-color: var(--mdw-theme-primary);
        height: 2px;
      }


      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }

      .mdw-tab-button-ripple,
      .mdw-tab-button-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }

      :host(.mdw-active) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/tabs/tabs-bar/index.js":
/*!***********************************************!*\
  !*** ./src/components/tabs/tabs-bar/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tabs-bar', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this._activeTab = 0;
    this.tabIdCounter = 0;
    this._contentElements = [];
    this.cloneTemplate();
  }

  // called from mdw-tab
  registerTab(el) {
    el.setAttribute('tab-id', this.tabIdCounter);
    if (this.tabIdCounter === 0) {
      this.activeTab = el;
      el.activate();
    }
    this.tabIdCounter++;
  }

  // called from mdw-tab
  unregisterTab(el) {
    // TODO handle if it is active
  }

  // called from mdw-tabs-content
  registerContent(el) {
    this._contentElements.push(el);
    el.changeTab(this.activeTab.getAttribute('tab-id'));
  }

  // called from mdw-tabs-content
  unregisterContent(el) {
    this._contentElements = this._contentElements.filter(e => e != el);
  }

  // called from mdw-tab
  tabClick(el) {
    const moveX = parseInt(el.getBoundingClientRect().x - this.activeTab.getBoundingClientRect().x);
    this.activeTab.deactivate(moveX);
    this.activeTab = el;
    this.activeTab.activate();
    this._contentElements.forEach(el => el.changeTab(this.activeTab.getAttribute('tab-id')));
  }

  get activeTab() {
    return this._activeTab;
  }

  set activeTab(el) {
    this._activeTab = el;
  }

  get internalStylesFile() {
    return './internal.css'
  }

  template() {
    return /* html */`
      <mdw-tabs-bar-scroller>
        <mdw-tabs-bar-scroller-area>
          <mdw-tabs-bar-scroller-content>
            <slot></slot>
          </mdw-tabs-bar-scroller-content>
        </mdw-tabs-bar-scroller-area>
      </mdw-tabs-bar-scroller>
    `;
  }

  styles() {
    return /* css */`
      mdw-tabs-bar-scroller {
        display: block;
        overflow-y: hidden;
      }

      mdw-tabs-bar-scroller-area {
        display: flex;
        /* overflow-x: scroll; */
      }

      mdw-tabs-bar-scroller-content {
        position: relative;
        display: flex;
        flex: 1 0 auto;
        transform: none;
        will-change: transform;
      }

      ::slotted(mdw-button) {
        flex: 1 0 auto;
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/tabs/tabs-content/index.js":
/*!***************************************************!*\
  !*** ./src/components/tabs/tabs-content/index.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tabs-content', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this._bodies = [];
  }

  connectedCallback() {
    this.tabsBar.registerContent(this);
  }

  disconnectedCallback() {
    this.tabsBar && this.tabsBar.unregisterContent(this);
  }

  get tabsBar() {
    return document.body.querySelector(`mdw-tabs-bar#${this.getAttribute('tabs-id')}`);
  }

  registerBody(el) {
    this._bodies.push(el);
    if (this._wiatForBodyActiveId  !== undefined && this._bodies.length === this._wiatForBodyActiveId + 1) {
      this._activeBody = el;
      el.activate();
      this._wiatForBodyActiveId = undefined;
    }
  }

  unregisterBody(el) {
    this._bodies = this._bodies.filter(i => i != el);
  }

  changeTab(tabId) {
    if (!this._bodies.length) {
      this._wiatForBodyActiveId = parseInt(tabId);
      return;
    }
    if (this._activeBody) this._activeBody.deactivate();
    this._activeBody = this._bodies[tabId];
    this._activeBody.activate();
  }
});


/***/ }),

/***/ "./src/components/text-field/index.js":
/*!********************************************!*\
  !*** ./src/components/text-field/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-textfield', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.classList.add('mdw-no-animation');
    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onInput = this.onInput.bind(this);
  }

  connectedCallback() {
    this.compose();
    this.checkForValue();

    setTimeout(() => {
      this.classList.remove('mdw-no-animation');
    }, 0);

    // add listeners
    this.input.addEventListener('focus', this.bound_onFocus);
    this.input.addEventListener('blur', this.bound_onBlur);
    this.input.addEventListener('input', this.bound_onInput);

    this.classList.toggle('mdw-invalid', !this.valid);
  }

  disconnectedCallback() {
    // remove listeners
    this.input.removeEventListener('focus', this.bound_onFocus);
    this.input.removeEventListener('blur', this.bound_onBlur);
    this.input.removeEventListener('input', this.bound_onInput);
  }

  compose() {
    /* For backwards compatability most of the features are built with css and the code is treated as an upgrade
     *  'mdw-upgraded' lets us know that the code is hooked up
     */
    this.classList.add('mdw-upgraded');

    /* textarea css marker
     *  test area mostly works without wc compatability. The only thing that does not work is some overlapping with the label
     */
    if (this.isTextarea()) this.classList.add('mdw-textarea');

    /* Add html for outlined
     *  outlined does not work without compatability
     */
    if (this.outlined) {
      this.insertAdjacentHTML('beforeend', this.outlinedHTML);
      this.setNotchWidth();
    }

    /* Add ripple html if it does not exist
     */
    if (!this.querySelector('.mdw-line-ripple')) this.insertAdjacentHTML('beforeend', this.lineRippleHTML);

    /* Fix layout for icons blaced before he input
     *  This is not handled in non compatable browsers
     */
    if (this.isTrailingIcon()) this.classList.add('mdw-trailing-icon');
  }

  checkForValue() {
    this.classList.toggle('not-empty', !!this.input.value.length);
  }

  onFocus() {
    this.setNotchWidth();
  }

  onBlur() {
    this.classList.toggle('not-empty', !!this.input.value.length);
    this.classList.toggle('mdw-invalid', !this.valid);
  }

  onInput() {
    this.classList.toggle('mdw-invalid', !this.valid);
  }

  setNotchWidth() {
    if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
  }

  /* Icons can be places at the begining ro end of a text field
   * there is some css that is hard to apply when the icon is at the begining, this helps
   */
  isTrailingIcon() {
    if (!this.iconElement) return false;
    return [...this.children].indexOf(this.iconElement) > 1;
  }

  isTextarea() {
    return !!this.querySelector('textarea');
  }

  get valid() {
    return this.input.validity.valid;
  }

  get outlined() {
    return [].slice.apply(this.classList || []).includes('mdw-outlined');
  }

  get input() {
    if (!this.inputType_) this.inputType_ = this.querySelector('input') ? 'input' : 'textarea';
    return this.querySelector(this.inputType_);
  }

  // this is the section where the labels sits when in outlined mode
  get notch() {
    return this.querySelector('.mdw-outlined-notch');
  }

  get label() {
    return this.querySelector('label');
  }

  // figure out a more acurate way or getting the width
  get labelWidth() {
    return this.label.offsetWidth * 0.95;
  }

  get helperTextElement() {
    return this.querySelector('mdw-textfield-helper');
  }

  get iconElement() {
    return this.querySelector('mdw-icon');
  }

  get outlinedHTML() {
    return `
      <div class="mdw-outlined-border-container">
        <div class="mdw-outlined-leading"></div>
        <div class="mdw-outlined-notch"></div>
        <div class="mdw-outlined-trailing"></div>
      </div>
    `;
  }

  get lineRippleHTML() {
    return '<div class="mdw-line-ripple"></div>';
  }
});


/***/ }),

/***/ "./src/components/top-app-bar/index.js":
/*!*********************************************!*\
  !*** ./src/components/top-app-bar/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



customElements.define('mdw-top-app-bar', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.MAX_TOP_APP_BAR_HEIGHT = 128;
    this.isCurrentlyBeingResized = false;
    this.currentAppBarOffsetTop = 0;
    this.wasDocked = true;
    this.isDockedShowing = true;
    this.isCurrentlyBeingResized = false;
  }

  connectedCallback() {
    this.scrollTarget = this.getScrollTarget();
    this.lastScrollPosition = this.getViewportScrollY();
    this.topAppBarHeight = this.height;

    // add spacer to content area
    // TODO add another class based on prominent, dense
    if (this.hasContent && !this.scrollTarget.querySelector('.mdw-top-app-bar')) {
      const div = document.createElement('div');
      div.classList.add('mdw-top-app-bar');
      this.scrollTarget.prepend(div);
    }

    document.body.classList.add('mdw-top-app-bar');

    this.throttledScrollHandler = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].rafThrottle(this.scrollHandler);
    this.throttledResizeHandler = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].rafThrottle(this.resizeHandler);
    this.scrollTarget.addEventListener('scroll', this.throttledScrollHandler.bind(this));
    window.addEventListener('resize', this.throttledResizeHandler.bind(this));
  }

  disconnectedCallback() {
    this.scrollTarget.removeEventListener('scroll', this.throttledScrollHandler.bind(this));
    window.removeEventListener('resize', this.throttledResizeHandler.bind(this));
  }

  get fixed() {
    return this.classList.contains('mdw-fixed');
  }

  get height() {
    return this.clientHeight;
  }

  getScrollTarget() {
    if (this.parentNode.nodeName === 'MDW-PAGE') {
      const content = document.querySelector('mdw-content');
      if (content) {
        this.hasContent = true;
        return content;
      }
    }
    return window;
  }

  topAppBarScrollHandler() {
    const currentScrollPosition = Math.max(this.getViewportScrollY(), 0);
    const diff = currentScrollPosition - this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition;

    // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.
    if (!this.isCurrentlyBeingResized) {
      this.currentAppBarOffsetTop -= diff;

      if (this.currentAppBarOffsetTop > 0) {
        this.currentAppBarOffsetTop = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
        this.currentAppBarOffsetTop = -this.topAppBarHeight;
      }

      this.moveTopAppBar();
    }
  }

  moveTopAppBar() {
    if (this.checkForUpdate()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      let offset = this.currentAppBarOffsetTop;
      if (Math.abs(offset) >= this.topAppBarHeight) {
        offset = -this.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.style.top = offset + 'px';
    }
  }

  checkForUpdate() {
    const offscreenBoundaryTop = -this.topAppBarHeight;
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;

    // If it's partially showing, it can't be docked.
    if (partiallyShowing) {
      this.wasDocked = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked) {
        this.wasDocked = true;
        return true;
      } else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
        this.isDockedShowing = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }

  resizeHandler() {
    this.isCurrentlyBeingResized = true;
    const currentHeight = this.height;
    if (this.topAppBarHeight !== currentHeight) {
      this.wasDocked = false;

      // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.
      this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
      this.topAppBarHeight = currentHeight;
    }
    this.topAppBarScrollHandler();
    this.isCurrentlyBeingResized = false;
  }


  scrollHandler() {
    const currentScrollPosition = Math.max(this.getViewportScrollY(), 0);

    if (!this.fixed) {
      const diff = currentScrollPosition - this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;

      // If the window is being resized the lastScrollPosition_ needs to be updated but the
      // current scroll of the top app bar should stay in the same position.
      if (!this.isCurrentlyBeingResized) {
        this.currentAppBarOffsetTop -= diff;

        if (this.currentAppBarOffsetTop > 0) {
          this.currentAppBarOffsetTop = 0;
        } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
          this.currentAppBarOffsetTop = -this.topAppBarHeight;
        }

        this.moveTopAppBar();
      }
    } else {
      if (currentScrollPosition <= 0) {
        if (this.wasScrolled_) {
          this.classList.remove('mdw-scrolled');
          this.wasScrolled_ = false;
        }
      } else {
        if (!this.wasScrolled_) {
          this.classList.add('mdw-scrolled');
          this.wasScrolled_ = true;
        }
      }
    }
  }

  getViewportScrollY() {
    return this.scrollTarget[this.scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
  }
});


/***/ }),

/***/ "./src/core/Ripple.js":
/*!****************************!*\
  !*** ./src/core/Ripple.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MDWRipple; });
class MDWRipple {
  constructor(config = {}) {
    this.RIPPLE_FADE_IN_DURATION = 200;
    this.RIPPLE_FADE_OUT_DURATION = 150;
    this.RIPPLE_STATE = {
      FADING_IN: 'FADING_IN',
      VISIBLE: 'VISIBLE',
      FADING_OUT: 'FADING_OUT',
      HIDDEN: 'HIDDEN'
    };

    if (!config.element) throw Error('requires config.element');
    if (!config.triggerElement) throw Error('requires config.triggerElement');

    this.element = config.element;
    this.triggerElement = [].concat(config.triggerElement).filter(el => !!el);
    this.centered = !!config.centered;
    this.speedFactor = config.speedFactor || 1;
    this.radius = config.radius;
    this.color = config.color || null;
    this.persistent = !!config.persistent;
    this.activeRipples = new Set();
    this.isMousedown = false;
    this.bound_mousesdown_ = this.mousesdown_.bind(this);
    this.bound_mouseup_ = this.mouseup_.bind(this);
    this.bound_mouseleave_ = this.mouseleave_.bind(this);

    this.triggerElement.forEach(el => {
      el.addEventListener('mousedown', this.bound_mousesdown_);
    });
  }

  destroy() {
    this.triggerElement.forEach(el => {
      el.removeEventListener('mousedown', this.bound_mousesdown_);
    });
  }

  mousesdown_(event) {
    this.isMousedown = true;
    this.triggerElement.forEach(el => {
      el.addEventListener('mouseup', this.bound_mouseup_);
      el.addEventListener('mouseleave', this.bound_mouseleave_);
    });
    this.fadeInRipple(event.pageX, event.pageY);
  }

  mouseup_(event) {
    this.isMousedown = false;
    // Fade-out all ripples that are completely visible and not persistent.
    this.activeRipples.forEach(ripple => {
      if (!ripple.config.persistent && ripple.state === this.RIPPLE_STATE.VISIBLE) ripple.fadeOut();
    });
    this.triggerElement.forEach(el => {
      el.removeEventListener('mouseup', this.bound_mouseup_);
      el.removeEventListener('mouseleave', this.bound_mouseleave_);
    });
  }

  mouseleave_() {
    if (this.isMousedown) this.mouseup_();
  }


  fadeInRipple(pageX, pageY) {
    const containerRect = this.element.getBoundingClientRect();

    if (this.centered) {
      pageX = containerRect.left + containerRect.width / 2;
      pageY = containerRect.top + containerRect.height / 2;
    } else {
      // Subtract scroll values from the coordinates because calculations below
      // are always relative to the viewport rectangle.
      const scrollPosition = this.getViewportScrollPosition();
      pageX -= scrollPosition.left;
      pageY -= scrollPosition.top;
    }

    const radius = this.radius || this.distanceToFurthestCorner(pageX, pageY, containerRect);
    const duration = this.RIPPLE_FADE_IN_DURATION * (1 / this.speedFactor);
    const offsetX = pageX - containerRect.left;
    const offsetY = pageY - containerRect.top;

    const ripple = document.createElement('div');
    ripple.classList.add('mdw-ripple-element');
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;

    // If the color is not set, the default CSS color will be used.
    ripple.style.backgroundColor = this.color;
    ripple.style.transitionDuration = `${duration}ms`;

    this.element.appendChild(ripple);

    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical because then the `scale` would not animate properly.
    this.enforceStyleRecalculation(ripple);

    ripple.style.transform = 'scale(1)';

    // Exposed reference to the ripple that will be returned.
    let rippleRef = {
      config: {
        centered: this.centered,
        tiggerElement: this.triggerElement,
        speedFactor: this.speedFactor,
        radius: radius,
        color: this.color,
        persistent: this.persistent,
        duration: duration
      },
      element: ripple,
      fadeOut: () => fadeOut(),
      state: this.RIPPLE_STATE.FADING_IN
    };
    const fadeOut = () => {
      this.fadeOutRipple(rippleRef)
    };

    // Add the ripple reference to the list of all active ripples.
    this.activeRipples.add(rippleRef);

    // Wait for the ripple element to be completely faded in.
    // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
    setTimeout(() => {
      rippleRef.state = this.RIPPLE_STATE.VISIBLE;
      if (!this.persistent && !this.isMousedown) rippleRef.fadeOut();
    }, duration);
  }

  fadeOutRipple(rippleRef) {
    // For ripples that are not active anymore, don't re-un the fade-out animation.
    if (!this.activeRipples.delete(rippleRef)) return;

    const rippleEl = rippleRef.element;

    rippleEl.style.transitionDuration = `${this.RIPPLE_FADE_OUT_DURATION}ms`;
    rippleEl.style.opacity = '0';
    rippleRef.state = this.RIPPLE_STATE.FADING_OUT;

    // Once the ripple faded out, the ripple can be safely removed from the DOM.
    setTimeout(() => {
      rippleRef.state = this.RIPPLE_STATE.HIDDEN;
      rippleEl.parentNode.removeChild(rippleEl);
    }, this.RIPPLE_FADE_OUT_DURATION);
  }

  distanceToFurthestCorner(x, y, rect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }

  getViewportScrollPosition() {
    const documentRect = document.documentElement.getBoundingClientRect();

    // The top-left-corner of the viewport is determined by the scroll position of the document
    // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
    // whether `document.body` or `document.documentElement` is the scrolled element, so reading
    // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
    // `document.documentElement` works consistently, where the `top` and `left` values will
    // equal negative the scroll position.
    const top = -documentRect.top || document.body.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
    const left = -documentRect.left || document.body.scrollLeft || window.scrollX || document.documentElement.scrollLeft || 0;

    return {top, left};
  }

  /** Enforces a style recalculation of a DOM element by computing its styles. */
  // TODO(devversion): Move into global utility function.
  enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
  }
};


/***/ }),

/***/ "./src/core/Theme.js":
/*!***************************!*\
  !*** ./src/core/Theme.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-theme.js */ "./src/core/base-theme.js");
// TODO get rid of jit theming
// This should be part of the build process
// This should also be exposed so users can it in there build process to generate a theme css file


class ThemeGenerator {
  constructor() {
    // this.paletteRegex = /(--mdw-theme-palette--)(\w*)(-(\w*))?(--(\w*))?$/;
    this.textRegex = /--mdw-theme-text-(\w*)?(-on-\w*)--(\w*)$/;
    this.onRegex = /(--mdw-theme-on-)(\w*)--(\w*)$/;
    this.themeRegex = /(--mdw-theme-)(\w*)--(\w*)$/;
    this.hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.rgbRegex = /rgb\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})\)/;
    this.rgbaRegex = /rgba\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})/;
  }

  generateThemeCss(str /*, theme = { primary: 'deeppurple', secondary: 'teal', error: 'red' } */) {
    const allVariables = this.getAllVariables(str);
    const categories = {
      // palette: { light: [], dark: [] },
      text: { light: [], dark: [] },
      on: { light: [], dark: [] },
      theme: { light: [], dark: [] },
      none: { light: [], dark: [] }
    };
    // const themeValues = Object.keys(theme);
    // const paletteColors = themeValues.map(k => theme[k]);
    allVariables.forEach(value => {
      const parsed = this.parseVariable(value /*, themeValues, paletteColors */);
      // // filter out non theme palettes
      // if (!parsed) return;
      categories[parsed.type][parsed.contrast].push(parsed);
    });
    
    const css = this.buildCss(categories);
    this.createThemeStyleElement(css);
    // allow css to be written to a file
  }

  getAllVariables(str) {
    return [...str.match(/(.*?):.*?;/g)].map(a => (
      a.split(':').map(v => v.trim().replace(';', ''))
    ));
  }

  parseVariable([name, value] /*, themeValues, paletteColors */) {
    // const paletteMatch = name.match(this.paletteRegex);
    // if (paletteMatch) {
    //   const color = paletteMatch[2];
    //   const colorIndex = paletteColors.indexOf(color);

    //   // filter out non theme palettes
    //   if (colorIndex === -1) return;

    //   const themePart = themeValues[colorIndex];
    //   return {
    //     name,
    //     nameNormalized: this.normalizeName(name).replace(color, themePart),
    //     value,
    //     rgbArrayString: this.convertToRGBArrayString(value),
    //     type: 'palette',
    //     contrast: paletteMatch[6] || 'light'
    //   };
    // }

    const textMatch = name.match(this.textRegex);
    if (textMatch) return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'text',
      contrast: textMatch[3]
    };

    const onMatch = name.match(this.onRegex);
    if (onMatch) return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'on',
      contrast: onMatch[3]
    };

    const themeMatch = name.match(this.themeRegex);
    if (themeMatch) return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'theme',
      contrast: themeMatch[3]
    };

    return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'none',
      contrast: name.indexOf('--dark') > 1 ? 'dark' : 'light'
    };
  }

  normalizeName(name) {
    return name.replace('--light', '').replace('--dark', '');
  }

  convertToRGBArrayString(value) {
    const hexMatch = value.trim().match(this.hexRegex);
    if (hexMatch) return `${parseInt(hexMatch[1], 16)}, ${parseInt(hexMatch[2], 16)}, ${parseInt(hexMatch[3], 16)}`;

    const rgbMatch = value.trim().match(this.rgbRegex);
    if (rgbMatch) return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;

    const rgbaMatch = value.trim().match(this.rgbaRegex);
    if (rgbaMatch) return `${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}`;

    return '';
  }

  createThemeStyleElement(str) {
    const styleNode = document.createElement('style');
    document.head.appendChild(styleNode);
    styleNode.type = 'text/css';
    styleNode.appendChild(document.createTextNode(str));
  }

  buildCss(categories) {
    return `:root {
  /* --- text variables --- */
${categories.text.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- on variables --- */
${categories.on.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- theme variables --- */
${categories.theme.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- other variablers --- */
${categories.none.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}
}

:root.mdw-theme-dark {
  /* --- text variables --- */
${categories.text.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- on variables --- */
${categories.on.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- theme variables --- */
${categories.theme.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- other variablers --- */
${categories.none.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}
}`;
  }
}

const themeGenerator = new ThemeGenerator();

themeGenerator.generateThemeCss(Object(_base_theme_js__WEBPACK_IMPORTED_MODULE_0__["default"])());





// const MDWTheme = new class {
//   constructor() {
//     this.hexREGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
//     this.paletteRegex = /(?<base>--mdw-theme-palette--)(?<color>\w*)-?(?<contrast>contrast)?-(?<hue>\w*)$/;
//     this.textRegex = /(?<base>--mdw-theme-text--)(?<on>on-\w*)?(?<state>\w*)--(?<contrast>\w*)$/;
//     this.contentWithContrastRegex = /(?<base>--mdw-theme-)(?<content>\w*)--(?<contrast>\w*)$/;
//     this.contrast_ = 'light';
//     this.palettes = {
//       primary: 'deeppurple',
//       secondary: 'teal',
//       error: 'red'
//     };

//     this.createBaseThemeStyleElement();
//     const initialConfig = Object.assign({ contrast: 'light' }, this.palettes, window.MDWThemeConfig);
//     this.setPalettes(initialConfig);
//     if (['light', 'dark'].indexOf(initialConfig.contrast) > -1) this.contrast = initialConfig.contrast;
//     this.categorize();
//     this.setThemeVars();
//     this.setOtherVars();
//   }

//   get contrast() {
//     return this.contrast_;
//   }

//   set contrast(value) {
//     if (value !== 'light' && value !== 'dark') throw Error('valid values are "light" and "dark"');
//     this.contrast_ = value;
//   }

//   changeTheme({ primary, secondary, error, contrast }) {
//     primary = primary || this.palettes.primary;
//     secondary = secondary || this.palettes.secondary;
//     error = error || this.palettes.error;
//     if (contrast) this.contrast = contrast;
//     this.setPalettes({ primary, secondary, error });
//     this.setThemeVars();
//     this.setOtherVars();
//   }

//   setPalettes({ primary, secondary, error } = {}) {
//     this.palettes = {
//       primary: primary || 'deeppurple',
//       secondary: secondary || 'teal',
//       error: error || 'red'
//     };
//   }

//   setThemeVars() {
//     Object.keys(this.palettes).forEach(key => {
//       const colorName = this.palettes[key];
//       const paletteVars = this.paletteVars(colorName);
//       paletteVars.forEach(palette => {
//         const name = `--mdw-theme-${key}${palette.contrast ? `-${palette.contrast}` : ''}${palette.default === false ? `-${palette.hue}` : ''}`;
//         const value = this.getVar(palette.var);
//         this.setVar(name, value);
//         this.setVar(`${name}--rgb`, this.convertToRGB(value));

//         if (palette.hue === this.contrast) {
//           const normalized = name.replace(`-${this.contrast}`, '');
//           this.setVar(normalized, value);
//           this.setVar(`${normalized}--rgb`, this.convertToRGB(value));
//         }
//       });
//     });
//   }

//   setOtherVars() {
//     this.otherVars().forEach(v => {
//       const value = this.getVar(v.var);
//       this.setVar(v.normalized, value);
//       this.setVar(`${v.normalized}--rgb`, this.convertToRGB(value));
//     });
//   }

//   paletteVars(colorName) {
//     const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith(`--mdw-theme-palette--${colorName}`));
//     return paletteVarNames.map(key => this.normalizedVars[key][0]);
//   }

//   otherVars() {
//     const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith('--mdw-theme') && !key.startsWith('--mdw-theme-palette'));
//     return paletteVarNames.map(key => this.pickVar(this.normalizedVars[key]));
//   }

//   setVars() {
//     Object.keys(this.normalizedVars).forEach(key => {
//       const picked = this.pickVar(this.normalizedVars[key]);
//       this.setVar(picked.normalized, this.getVar(picked.var));
//     });
//   }

//   setVar(name, value) {
//     document.documentElement.style.setProperty(name, value);
//   }

//   getVar(name) {
//     return getComputedStyle(document.documentElement).getPropertyValue(name);
//   }

//   pickVar(arr) {
//     let found = arr.find(item => {
//       if (item.default === true && this.contrast === item.contrast) return true;
//     });
//     if (!found) {
//       found = arr.find(item => {
//         if (this.contrast === item.contrast) return true;
//         if (item.default === true) return true;
//       });
//     }
//     return found || arr[0];
//   }

//   categorize() {
//     const parsed = this.getAllVars().map(v => this.parseVar(v));
//     const normalizedHash = parsed.reduce((a, b) => {
//       if (b.noMatch === true || !b.normalized) return a;

//       if (!a[b.normalized]) a[b.normalized] = [];
//       a[b.normalized].push(b);
//       return a;
//     }, {});

//     this.normalizedVars = normalizedHash;
//   }

//   // parse out variables in :root
//   getAllVars() {
//     // return [...baseTheme().matchAll(/(.*?):.*?;/g)].map(a => a[1].trim());
//     return [...baseTheme().match(/(.*?):.*?;/g)].map(a => a.split(':')[0].trim());
//   }

//   getUnmatched() {
//     const parsed = this.getAllVars().map(v => this.parseVar(v));
//     return parsed.filter(n => n.noMatch === true);
//   }

//   parseVar(varName) {
//     if (this.paletteRegex.test(varName)) {
//       const groups = varName.match(this.paletteRegex).groups;
//       const normalized = `${groups.base}${groups.color}${groups.contrast ? `-contrast` : ''}-${groups.hue}`;
//       return Object.assign({
//         var: varName,
//         type: 'palette',
//         default: varName.indexOf('default') > 0,
//         normalized
//       }, groups);
//     }
//     if (this.textRegex.test(varName)) {
//       const groups = varName.match(this.textRegex).groups;
//       const normalized = `${groups.base}${groups.state || ''}${groups.on || ''}`;
//       return Object.assign({
//         var: varName,
//         type: 'text',
//         default: varName.indexOf('default') > 0,
//         normalized
//       }, groups);
//     }
//     if (this.contentWithContrastRegex.test(varName)) {
//       const groups = varName.match(this.contentWithContrastRegex).groups;
//       const normalized = `${groups.base}${groups.content}`;
//       return Object.assign({
//         var: varName,
//         type: 'content',
//         default: varName.indexOf('default') > 0,
//         normalized
//       }, groups);
//     }

//     return {
//       var: varName,
//       noMatch: true
//     };
//   }

//   convertToRGB(hex) {
//     const result = this.hexREGEX.exec(hex.trim());
//     return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
//   }

//   createBaseThemeStyleElement() {
//     const styleNode = document.createElement('style');
//     document.head.appendChild(styleNode);
//     styleNode.type = 'text/css';
//     styleNode.appendChild(document.createTextNode(baseTheme()));
//   }
// };

// window.MDWTheme = MDWTheme;
// export default MDWTheme;


/***/ }),

/***/ "./src/core/Utils.js":
/*!***************************!*\
  !*** ./src/core/Utils.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mobile_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-info.js */ "./src/core/mobile-info.js");


const MDWUtils = new class {
  constructor() {
    this._uid = 1;
    this._setupTransitionEvent();
    this._setTransformPropertyName();
    this.isPhone = _mobile_info_js__WEBPACK_IMPORTED_MODULE_0__["isPhone"];
    this.isPhoneAndTablet = _mobile_info_js__WEBPACK_IMPORTED_MODULE_0__["isPhoneAndTablet"];
    // add class indecator for mobile
    
    this.onReady(() => {
      if (this.isMobile) document.body.classList.add('mdw-is-mobile');
      else document.body.classList.remove('mdw-is-mobile');
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

  uid() {
    return `id_${this._uid++}`;
  }

  get isMobile() {
    return this.isPhoneAndTablet;
  }

  lockPageScroll() {
    const scrollElement = document.body.classList.contains('prevent-over-scroll') ? document.querySelector('mdw-page > mdw-content') : document.body;
    scrollElement.style.overflow = 'hidden';
  }

  unlockPageScroll() {
    const scrollElement = document.body.classList.contains('prevent-over-scroll') ? document.querySelector('mdw-page > mdw-content') : document.body;
    scrollElement.style.overflow = '';
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

  addBackdrop(element, clickCallback, options = {}) {
    const id = this.uid();
    element.insertAdjacentHTML('afterend', `<div id="${id}" class="mdw-backdrop"></div>`);
    const backdropElement = document.querySelector(`#${id}`);
    if (options.drawer === true) backdropElement.classList.add('mdw-drawer-backdrop');
    if (clickCallback) backdropElement.addEventListener('click', clickCallback);
    return {
      remove() {
        if (clickCallback) backdropElement.removeEventListener('click', clickCallback);
        backdropElement.remove();
      }
    };
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

/* harmony default export */ __webpack_exports__["default"] = (MDWUtils);


/***/ }),

/***/ "./src/core/base-theme.js":
/*!********************************!*\
  !*** ./src/core/base-theme.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /* css */`
    :root {
      /* --- text variables --- */
      --mdw-theme-text-primary-on-background--light: #ffffff;
      --mdw-theme-text-secondary-on-background--light: rgba(255,255,255, .7);
      --mdw-theme-text-hint-on-background--light: rgba(255,255,255, .5);
      --mdw-theme-text-disabled-on-background--light: rgba(255,255,255, .5);
      --mdw-theme-text-icon-on-background--light: rgba(255,255,255, .5);

      --mdw-theme-text-primary-on-background--dark: rgba(0,0,0, .87);
      --mdw-theme-text-secondary-on-background--dark: rgba(0,0,0, .54);
      --mdw-theme-text-hint-on-background--dark: rgba(0,0,0, .38);
      --mdw-theme-text-disabled-on-background--dark: rgba(0,0,0, .38);
      --mdw-theme-text-icon-on-background--dark: rgba(0,0,0, .38);


      /* --- on variables --- */

      --mdw-theme-on-primary--light: #000000;
      --mdw-theme-on-secondary--light: #000000;
      --mdw-theme-on-error--light: #000000;
      --mdw-theme-on-background--light: #000000;

      --mdw-theme-on-primary--dark: #ffffff;
      --mdw-theme-on-secondary--dark: #ffffff;
      --mdw-theme-on-error--dark: #ffffff;
      --mdw-theme-on-background--dark: #ffffff;


      /* --- standard --- */

      --mdw-theme-primary--light: #6200ee;
      --mdw-theme-secondary--light: #018786;
      --mdw-theme-error--light: #b00020;
      --mdw-theme-background--light: #ffffff;
      --mdw-theme-surface--light: #ffffff;

      --mdw-theme-primary--dark: #b39ddb;
      --mdw-theme-secondary--dark: #80cbc4;
      --mdw-theme-error--dark: #ef9a9a;
      --mdw-theme-background--dark: #121212;
      --mdw-theme-surface--dark: #121212;


      /* --- other --- */

      --mdw-theme-checkboxborder--light: rgba(0,0,0, .54);
      --mdw-theme-checkboxborder--dark: rgba(255,255,255, .5);
      --mdw-theme-checkboxborderdisabled--light: rgba(0,0,0, .26);
      --mdw-theme-checkboxborderdisabled--dark: rgba(255,255,255, .24);

      --mdw-theme-list_item_focus--light: rgba(0,0,0,.06);
      --mdw-theme-list_item_focus--dark: rgba(100,100,100,.16);
    }
  `;
});


// /* --- text --- */
// --mdw-theme-text--primary--light: #ffffff;
// --mdw-theme-text--secondary--light: rgba(255,255,255, .7);
// --mdw-theme-text--error--light: rgba(255,255,255, .7);
// --mdw-theme-text--hint--light: rgba(255,255,255, .5);
// --mdw-theme-text--disabled--light: rgba(255,255,255, .5);
// --mdw-theme-text--icon--light: rgba(255,255,255, .5);

// --mdw-theme-text--primary--dark: rgba(0,0,0, .87);
// --mdw-theme-text--secondary--dark: rgba(0,0,0, .54);
// --mdw-theme-text--error--dark: rgba(0,0,0, .54);
// --mdw-theme-text--hint--dark: rgba(0,0,0, .38);
// --mdw-theme-text--disabled--dark: rgba(0,0,0, .38);
// --mdw-theme-text--icon--dark: rgba(0,0,0, .38);

// --mdw-theme-text--on-primary--light: #FFFFFF;
// --mdw-theme-text--on-secondary--light: #000000;
// --mdw-theme-text--on-error--light: #FFFFFF;
// --mdw-theme-text--on-background--light: #000000;
// --mdw-theme-text--on-surface--light: #000000;

// --mdw-theme-text--on-primary--dark: #000000;
// --mdw-theme-text--on-secondary--dark: #FFFFFF;
// --mdw-theme-text--on-error--dark: #000000;
// --mdw-theme-text--on-background--dark: #FFFFFF;
// --mdw-theme-text--on-surface--dark: #FFFFFF;

// --mdw-theme-text--heading--light: #212121;
// --mdw-theme-text--heading--dark: #ececec;

// --mdw-theme-text--body--light: #616161;
// --mdw-theme-text--body--dark: #b5b5b5;


// /* --- surfaces and backgrounds --- */
// --mdw-theme-background--light: #fafafa;
// --mdw-theme-background--dark: #121212;

// --mdw-theme-foreground--light: #121212;
// --mdw-theme-foreground--dark: #fafafa;

// --mdw-theme-surface--light: #fafafa;
// --mdw-theme-surface--dark: #121212;

// --mdw-theme-surface_elevation_1--light: #f6f6f6;
// --mdw-theme-surface_elevation_1--dark: #303030;

// --mdw-theme-divider--dark: rgba(0, 0, 0, 0.12);
// --mdw-theme-divider--light: rgba(255, 255, 255, 0.12);

// --mdw-theme-divider--on-background--dark: var(--mdw-theme-divider--light);
// --mdw-theme-divider--on-background--light: var(--mdw-theme-divider--dark);


// /* --- one offs for components --- */
// --mdw-theme-switchtrack--light: #000000;
// --mdw-theme-switchtrack--dark: rgba(255,255,255, .32);

// --mdw-theme-checkboxborder--light: rgba(0,0,0, .54);
// --mdw-theme-checkboxborder--dark: rgba(255,255,255, .5);

// --mdw-theme-checkboxborderdisabled--light: rgba(0,0,0, .26);
// --mdw-theme-checkboxborderdisabled--dark: rgba(255,255,255, .24);

// --mdw-theme-snackbarcontainer--light: var(--mdw-theme-background--dark);
// --mdw-theme-snackbarcontainer--dark: var(--mdw-theme-background--light);

// --mdw-theme-text--on-snackbar--light: var(--mdw-theme-text--secondary);
// --mdw-theme-text--on-snackbar--dark: #000000;

// --mdw-theme-list_item_focus--light: rgba(0,0,0,.06);
// --mdw-theme-list_item_focus--dark: rgba(100,100,100,.16);

// --mdw-theme-outline_border--light: rgba(0,0,0,.24);
// --mdw-theme-outline_border--dark: rgba(255,255,255,.24);

// --mdw-theme-textfield_background--light: #f5f5f5;
// --mdw-theme-textfield_background--dark: #303030;

/* --- palettes --- */
// /* By default, shades 500, 300 800 and A100 are used for primary and warn intentions, while A200, A100, A400 and A700 are used for accent */

// /* red */
// --mdw-theme-palette--red-50: #ffebee;
// --mdw-theme-palette--red-100: #ffcdd2;
// --mdw-theme-palette--red-200: #ef9a9a;
// --mdw-theme-palette--red-300: #e57373;
// --mdw-theme-palette--red-400: #ef5350;
// --mdw-theme-palette--red-500: #f44336;
// --mdw-theme-palette--red-600: #e53935;
// --mdw-theme-palette--red-700: #d32f2f;
// --mdw-theme-palette--red-800: #c62828;
// --mdw-theme-palette--red-900: #b71c1c;
// --mdw-theme-palette--red-A100: #ff8a80;
// --mdw-theme-palette--red-A200: #ff5252;
// --mdw-theme-palette--red-A400: #ff1744;
// --mdw-theme-palette--red-A700: #d50000;

// /* pink */
// --mdw-theme-palette--pink-50: #FCE4EC;
// --mdw-theme-palette--pink-100: #F8BBD0;
// --mdw-theme-palette--pink-200: #F48FB1;
// --mdw-theme-palette--pink-300: #F06292;
// --mdw-theme-palette--pink-400: #EC407A;
// --mdw-theme-palette--pink-500: #E91E63;
// --mdw-theme-palette--pink-600: #D81B60;
// --mdw-theme-palette--pink-700: #C2185B;
// --mdw-theme-palette--pink-800: #AD1457;
// --mdw-theme-palette--pink-900: #880E4F;
// --mdw-theme-palette--pink-A100: #FF80AB;
// --mdw-theme-palette--pink-A200: #FF4081;
// --mdw-theme-palette--pink-A400: #F50057;
// --mdw-theme-palette--pink-A700: #C51162;

// /* purple */
// --mdw-theme-palette--purple-50: #f3e5f5;
// --mdw-theme-palette--purple-100: #e1bee7;
// --mdw-theme-palette--purple-200: #ce93d8;
// --mdw-theme-palette--purple-300: #ba68c8;
// --mdw-theme-palette--purple-400: #ab47bc;
// --mdw-theme-palette--purple-500: #9c27b0;
// --mdw-theme-palette--purple-600: #8e24aa;
// --mdw-theme-palette--purple-700: #7b1fa2;
// --mdw-theme-palette--purple-800: #6a1b9a;
// --mdw-theme-palette--purple-900: #4a148c;
// --mdw-theme-palette--purple-A100: #ea80fc;
// --mdw-theme-palette--purple-A200: #e040fb;
// --mdw-theme-palette--purple-A400: #d500f9;
// --mdw-theme-palette--purple-A700: #aa00ff;

// /* deeppurple */
// --mdw-theme-palette--deeppurple-50: #ede7f6;
// --mdw-theme-palette--deeppurple-100: #d1c4e9;
// --mdw-theme-palette--deeppurple-200: #b39ddb;
// --mdw-theme-palette--deeppurple-300: #9575cd;
// --mdw-theme-palette--deeppurple-400: #7e57c2;
// --mdw-theme-palette--deeppurple-500: #673ab7; /* 6002ee */
// --mdw-theme-palette--deeppurple-600: #5e35b1;
// --mdw-theme-palette--deeppurple-700: #512da8;
// --mdw-theme-palette--deeppurple-800: #4527a0;
// --mdw-theme-palette--deeppurple-900: #311b92;
// --mdw-theme-palette--deeppurple-A100: #b388ff;
// --mdw-theme-palette--deeppurple-A200: #7c4dff;
// --mdw-theme-palette--deeppurple-A400: #651fff;
// --mdw-theme-palette--deeppurple-A700: #6200ea;

// /* Indigo */
// --mdw-theme-palette--indigo-50: #E8EAF6;
// --mdw-theme-palette--indigo-100: #C5CAE9;
// --mdw-theme-palette--indigo-200: #9FA8DA;
// --mdw-theme-palette--indigo-300: #7986CB;
// --mdw-theme-palette--indigo-400: #5C6BC0;
// --mdw-theme-palette--indigo-500: #3F51B5;
// --mdw-theme-palette--indigo-600: #3949AB;
// --mdw-theme-palette--indigo-700: #303F9F;
// --mdw-theme-palette--indigo-800: #283593;
// --mdw-theme-palette--indigo-900: #1A237E;
// --mdw-theme-palette--indigo-A100: #8C9EFF;
// --mdw-theme-palette--indigo-A200: #536DFE;
// --mdw-theme-palette--indigo-A400: #3D5AFE;
// --mdw-theme-palette--indigo-A700: #304FFE;

// /* blue */
// --mdw-theme-palette--blue-50: #e3f2fd;
// --mdw-theme-palette--blue-100: #bbdefb;
// --mdw-theme-palette--blue-200: #90caf9;
// --mdw-theme-palette--blue-300: #64b5f6;
// --mdw-theme-palette--blue-400: #42a5f5;
// --mdw-theme-palette--blue-500: #2196f3;
// --mdw-theme-palette--blue-600: #1e88e5;
// --mdw-theme-palette--blue-700: #1976d2;
// --mdw-theme-palette--blue-800: #1565c0;
// --mdw-theme-palette--blue-900: #0d47a1;
// --mdw-theme-palette--blue-A100: #82b1ff;
// --mdw-theme-palette--blue-A200: #448aff;
// --mdw-theme-palette--blue-A400: #2979ff;
// --mdw-theme-palette--blue-A700: #2962ff;

// /* Light blue */
// --mdw-theme-palette--lightblue-50: #E1F5FE;
// --mdw-theme-palette--lightblue-100: #B3E5FC;
// --mdw-theme-palette--lightblue-200: #81D4FA;
// --mdw-theme-palette--lightblue-300: #4FC3F7;
// --mdw-theme-palette--lightblue-400: #29B6F6;
// --mdw-theme-palette--lightblue-500: #03A9F4;
// --mdw-theme-palette--lightblue-600: #039BE5;
// --mdw-theme-palette--lightblue-700: #0288D1;
// --mdw-theme-palette--lightblue-800: #0277BD;
// --mdw-theme-palette--lightblue-900: #01579B;
// --mdw-theme-palette--lightblue-A100: #80D8FF;
// --mdw-theme-palette--lightblue-A200: #40C4FF;
// --mdw-theme-palette--lightblue-A400: #00B0FF;
// --mdw-theme-palette--lightblue-A700: #0091EA;

// /* Cyan */
// --mdw-theme-palette--cyan-50: #E0F7FA;
// --mdw-theme-palette--cyan-100: #B2EBF2;
// --mdw-theme-palette--cyan-200: #80DEEA;
// --mdw-theme-palette--cyan-300: #4DD0E1;
// --mdw-theme-palette--cyan-400: #26C6DA;
// --mdw-theme-palette--cyan-500: #00BCD4;
// --mdw-theme-palette--cyan-600: #00ACC1;
// --mdw-theme-palette--cyan-700: #0097A7;
// --mdw-theme-palette--cyan-800: #00838F;
// --mdw-theme-palette--cyan-900: #006064;
// --mdw-theme-palette--cyan-A100: #84FFFF;
// --mdw-theme-palette--cyan-A200: #18FFFF;
// --mdw-theme-palette--cyan-A400: #00E5FF;
// --mdw-theme-palette--cyan-A700: #00B8D4;

// /* teal */
// --mdw-theme-palette--teal-50: #e0f2f1;
// --mdw-theme-palette--teal-100: #b2dfdb;
// --mdw-theme-palette--teal-200: #80cbc4;
// --mdw-theme-palette--teal-300: #4db6ac;
// --mdw-theme-palette--teal-400: #26a69a;
// --mdw-theme-palette--teal-500: #009688;
// --mdw-theme-palette--teal-600: #00897b;
// --mdw-theme-palette--teal-700: #00796b;
// --mdw-theme-palette--teal-800: #00695c;
// --mdw-theme-palette--teal-900: #004d40;
// --mdw-theme-palette--teal-A100: #a7ffeb;
// --mdw-theme-palette--teal-A200: #64ffda;
// --mdw-theme-palette--teal-A400: #1de9b6;
// --mdw-theme-palette--teal-A700: #00bfa5;

// /* green */
// --mdw-theme-palette--green-50: #E8F5E9;
// --mdw-theme-palette--green-100: #C8E6C9;
// --mdw-theme-palette--green-200: #A5D6A7;
// --mdw-theme-palette--green-300: #81C784;
// --mdw-theme-palette--green-400: #66BB6A;
// --mdw-theme-palette--green-500: #4CAF50;
// --mdw-theme-palette--green-600: #43A047;
// --mdw-theme-palette--green-700: #388E3C;
// --mdw-theme-palette--green-800: #2E7D32;
// --mdw-theme-palette--green-900: #1B5E20;
// --mdw-theme-palette--green-A100: #B9F6CA;
// --mdw-theme-palette--green-A200: #69F0AE;
// --mdw-theme-palette--green-A400: #00E676;
// --mdw-theme-palette--green-A700: #00C853;

// /* lightgreen */
// --mdw-theme-palette--lightgreen-50: #F1F8E9;
// --mdw-theme-palette--lightgreen-100: #DCEDC8;
// --mdw-theme-palette--lightgreen-200: #C5E1A5;
// --mdw-theme-palette--lightgreen-300: #AED581;
// --mdw-theme-palette--lightgreen-400: #9CCC65;
// --mdw-theme-palette--lightgreen-500: #8BC34A;
// --mdw-theme-palette--lightgreen-600: #7CB342;
// --mdw-theme-palette--lightgreen-700: #689F38;
// --mdw-theme-palette--lightgreen-800: #558B2F;
// --mdw-theme-palette--lightgreen-900: #33691E;
// --mdw-theme-palette--lightgreen-A100: #CCFF90;
// --mdw-theme-palette--lightgreen-A200: #B2FF59;
// --mdw-theme-palette--lightgreen-A400: #76FF03;
// --mdw-theme-palette--lightgreen-A700: #64DD17;

// /* lime */
// --mdw-theme-palette--lime-50: #F9FBE7;
// --mdw-theme-palette--lime-100: #F0F4C3;
// --mdw-theme-palette--lime-200: #E6EE9C;
// --mdw-theme-palette--lime-300: #DCE775;
// --mdw-theme-palette--lime-400: #D4E157;
// --mdw-theme-palette--lime-500: #CDDC39;
// --mdw-theme-palette--lime-600: #C0CA33;
// --mdw-theme-palette--lime-700: #AFB42B;
// --mdw-theme-palette--lime-800: #9E9D24;
// --mdw-theme-palette--lime-900: #827717;
// --mdw-theme-palette--lime-A100: #F4FF81;
// --mdw-theme-palette--lime-A200: #EEFF41;
// --mdw-theme-palette--lime-A400: #C6FF00;
// --mdw-theme-palette--lime-A700: #AEEA00;

// /* yellow */
// --mdw-theme-palette--yellow-50: #FFFDE7;
// --mdw-theme-palette--yellow-100: #FFF9C4;
// --mdw-theme-palette--yellow-200: #FFF59D;
// --mdw-theme-palette--yellow-300: #FFF176;
// --mdw-theme-palette--yellow-400: #FFEE58;
// --mdw-theme-palette--yellow-500: #FFEB3B;
// --mdw-theme-palette--yellow-600: #FDD835;
// --mdw-theme-palette--yellow-700: #FBC02D;
// --mdw-theme-palette--yellow-800: #F9A825;
// --mdw-theme-palette--yellow-900: #F57F17;
// --mdw-theme-palette--yellow-A100: #FFFF8D;
// --mdw-theme-palette--yellow-A200: #FFFF00;
// --mdw-theme-palette--yellow-A400: #FFEA00;
// --mdw-theme-palette--yellow-A700: #FFD600;

// /* amber */
// --mdw-theme-palette--amber-50: #FFF8E1;
// --mdw-theme-palette--amber-100: #FFECB3;
// --mdw-theme-palette--amber-200: #FFE082;
// --mdw-theme-palette--amber-300: #FFD54F;
// --mdw-theme-palette--amber-400: #FFCA28;
// --mdw-theme-palette--amber-500: #FFC107;
// --mdw-theme-palette--amber-600: #FFB300;
// --mdw-theme-palette--amber-700: #FFA000;
// --mdw-theme-palette--amber-800: #FF8F00;
// --mdw-theme-palette--amber-900: #FF6F00;
// --mdw-theme-palette--amber-A100: #FFE57F;
// --mdw-theme-palette--amber-A200: #FFD740;
// --mdw-theme-palette--amber-A400: #FFC400;
// --mdw-theme-palette--amber-A700: #FFAB00;

// /* orange */
// --mdw-theme-palette--orange-50: #FFF3E0;
// --mdw-theme-palette--orange-100: #FFE0B2;
// --mdw-theme-palette--orange-200: #FFCC80;
// --mdw-theme-palette--orange-300: #FFB74D;
// --mdw-theme-palette--orange-400: #FFA726;
// --mdw-theme-palette--orange-500: #FF9800;
// --mdw-theme-palette--orange-600: #FB8C00;
// --mdw-theme-palette--orange-700: #F57C00;
// --mdw-theme-palette--orange-800: #EF6C00;
// --mdw-theme-palette--orange-900: #E65100;
// --mdw-theme-palette--orange-A100: #FFD180;
// --mdw-theme-palette--orange-A200: #FFAB40;
// --mdw-theme-palette--orange-A400: #FF9100;
// --mdw-theme-palette--orange-A700: #FF6D00;

// /* deeporange */
// --mdw-theme-palette--deeporange-50: #FBE9E7;
// --mdw-theme-palette--deeporange-100: #FFCCBC;
// --mdw-theme-palette--deeporange-200: #FFAB91;
// --mdw-theme-palette--deeporange-300: #FF8A65;
// --mdw-theme-palette--deeporange-400: #FF7043;
// --mdw-theme-palette--deeporange-500: #FF5722;
// --mdw-theme-palette--deeporange-600: #F4511E;
// --mdw-theme-palette--deeporange-700: #E64A19;
// --mdw-theme-palette--deeporange-800: #D84315;
// --mdw-theme-palette--deeporange-900: #BF360C;
// --mdw-theme-palette--deeporange-A100: #FF9E80;
// --mdw-theme-palette--deeporange-A200: #FF6E40;
// --mdw-theme-palette--deeporange-A400: #FF3D00;
// --mdw-theme-palette--deeporange-A700: #DD2C00;


/***/ }),

/***/ "./src/core/drag.js":
/*!**************************!*\
  !*** ./src/core/drag.js ***!
  \**************************/
/*! exports provided: addDragListener, removeDragListener, enableDragListenerForElement, disableDragListenerForElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDragListener", function() { return addDragListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDragListener", function() { return removeDragListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableDragListenerForElement", function() { return enableDragListenerForElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableDragListenerForElement", function() { return disableDragListenerForElement; });
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils.js */ "./src/core/Utils.js");


const swipeInstancesByElementAndFunction = new Map();

function addDragListener(element, callback) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  if (typeof callback !== 'function') throw Error('callback must be a function');

  const swipInstance = new Drag(element, callback);
  swipInstance.addEvents();

  if (!swipeInstancesByElementAndFunction.get(element)) swipeInstancesByElementAndFunction.set(element, new Map());
  swipeInstancesByElementAndFunction.get(element).set(callback, swipInstance);
};

// if you do not pass in callback then all the swipe events on an element will be removed
function removeDragListener(element, callback = undefined) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');

  const swipInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipInstances) return;
  if (callback) {
    const el = swipInstances.get(callback);
    if (el) el.removeEvents();
    swipInstances.delete(callback);
  } else {
    swipInstances.forEach(i => i.removeEvents());
    swipeInstancesByElementAndFunction.delete(element);
  }
};

function enableDragListenerForElement(element) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  const swipInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipInstances) return;
  swipInstances.forEach(i => i.enable());
}

function disableDragListenerForElement(element) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  const swipInstances = swipeInstancesByElementAndFunction.get(element);
  if (!swipInstances) return;
  swipInstances.forEach(i => i.disable());
}

class Drag {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;

    this.hasPointerEvent = !!window.PointerEvent;
    this.bound_handleGestureStart = this.handleGestureStart.bind(this);
    this.bound_handleGestureMove = this.handleGestureMove.bind(this);
    this.bound_handleGestureEnd = this.handleGestureEnd.bind(this);

    // callback throttler
    this.callbackThrottle = _Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].rafThrottle((event) => {
      event.distance = this.getDistance(event);
      event.direction = this.getDirection(this.lastDistance, event.distance);
      this.lastDistance = event.distance;
      this.callback(event);
    });
  }

  addEvents() {
    this.disableTouchEvents();

    if (_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile) {
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
    if (_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile) {
      this.element.removeEventListener('touchstart', this.bound_handleGestureStart);
      this.element.removeEventListener('touchmove', this.bound_handleGestureMove);
      this.element.removeEventListener('touchend', this.bound_handleGestureEnd);
      this.element.removeEventListener('touchcancel', this.bound_handleGestureEnd);
    } else {
      this.element.removeEventListener('mousedown', this.bound_handleGestureStart);
      window.removeEventListener('mousemove', this.bound_handleGestureMove);
      window.removeEventListener('mouseup', this.bound_handleGestureEnd);
    }
  }

  handleGestureStart(ev) {
    ev.state = 'start';

    if (_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile) {
      this.element.addEventListener('touchmove', this.bound_handleGestureMove, false);
      this.element.addEventListener('touchend', this.bound_handleGestureEnd, false);
      this.element.addEventListener('touchcancel', this.bound_handleGestureEnd, false);
    } else {
      window.addEventListener('mousemove', this.bound_handleGestureMove);
      window.addEventListener('mouseup', this.bound_handleGestureEnd);
    }

    this.startTime = Date.now();
    this.initialTouchPos = this.getClientXY(ev);
    this.lastDistance = this.getDistance(ev);
    ev.distance = this.lastDistance;
    ev.direction = this.getDirection(this.lastDistance, this.lastDistance);
    this.callback(ev);
    // ev.preventDefault();
  }

  handleGestureMove(ev) {
    ev.state = 'move';
    if (this.initialTouchPos) this.callbackThrottle(ev);
    // ev.preventDefault();
  }

  handleGestureEnd(ev) {
    ev.state = 'end';
    
    if (_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile) {
      this.element.removeEventListener('touchmove', this.bound_handleGestureMove);
      this.element.removeEventListener('touchend', this.bound_handleGestureEnd);
      this.element.removeEventListener('touchcancel', this.bound_handleGestureEnd);
    } else {
      window.removeEventListener('mousemove', this.bound_handleGestureMove);
      window.removeEventListener('mouseup', this.bound_handleGestureEnd);
    }

    this.endTime = Date.now();
    ev.runTime = this.endTime - this.startTime;
    ev.distance = this.getDistance(ev);
    ev.endDirection = this.getDirection({ x: 0, y: 0 }, ev.distance);
    ev.velocity = this.getVelocity(ev.distance, ev.runTime);

    if (ev.clientX === undefined) {
      const clientPos = this.getClientXY(ev);
      ev.clientX = clientPos.x;
      ev.clientY = clientPos.y;
    }
    this.callback(ev);
    // ev.preventDefault();
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


/***/ }),

/***/ "./src/core/mobile-info.js":
/*!*********************************!*\
  !*** ./src/core/mobile-info.js ***!
  \*********************************/
/*! exports provided: isPhone, isPhoneAndTablet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPhone", function() { return isPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPhoneAndTablet", function() { return isPhoneAndTablet; });
const isPhone = isPhoneCheck();
const isPhoneAndTablet = isPhoneAndTabletCheck();

function isPhoneAndTabletCheck() {
  if (typeof FORCE_MOBILE !=='undefined' && FORCE_MOBILE === 'true') return true;
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function isPhoneCheck() {
  if (typeof FORCE_MOBILE !=='undefined' && FORCE_MOBILE === 'true') return true;
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}


/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Theme.js */ "./src/core/Theme.js");
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/drag.js */ "./src/core/drag.js");
/* harmony import */ var _components_banner_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/banner/index.js */ "./src/components/banner/index.js");
/* harmony import */ var _components_bottom_navigation_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/bottom-navigation/index.js */ "./src/components/bottom-navigation/index.js");
/* harmony import */ var _components_button_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/button/index.js */ "./src/components/button/index.js");
/* harmony import */ var _components_card_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/card/index.js */ "./src/components/card/index.js");
/* harmony import */ var _components_checkbox_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/checkbox/index.js */ "./src/components/checkbox/index.js");
/* harmony import */ var _components_circular_progress_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/circular-progress/index.js */ "./src/components/circular-progress/index.js");
/* harmony import */ var _components_dialog_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/dialog/index.js */ "./src/components/dialog/index.js");
/* harmony import */ var _components_drawer_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/drawer/index.js */ "./src/components/drawer/index.js");
/* harmony import */ var _components_fab_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/fab/index.js */ "./src/components/fab/index.js");
/* harmony import */ var _components_icon_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/icon/index.js */ "./src/components/icon/index.js");
/* harmony import */ var _components_linear_progress_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/linear-progress/index.js */ "./src/components/linear-progress/index.js");
/* harmony import */ var _components_list_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/list/index.js */ "./src/components/list/index.js");
/* harmony import */ var _components_list_item_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/list-item/index.js */ "./src/components/list-item/index.js");
/* harmony import */ var _components_menu_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/menu/index.js */ "./src/components/menu/index.js");
/* harmony import */ var _components_panel_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/panel/index.js */ "./src/components/panel/index.js");
/* harmony import */ var _components_radio_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/radio/index.js */ "./src/components/radio/index.js");
/* harmony import */ var _components_radio_group_index_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/radio-group/index.js */ "./src/components/radio-group/index.js");
/* harmony import */ var _components_select_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/select/index.js */ "./src/components/select/index.js");
/* harmony import */ var _components_sheet_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/sheet/index.js */ "./src/components/sheet/index.js");
/* harmony import */ var _components_slider_index_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/slider/index.js */ "./src/components/slider/index.js");
/* harmony import */ var _components_snackbar_index_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/snackbar/index.js */ "./src/components/snackbar/index.js");
/* harmony import */ var _components_switch_index_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/switch/index.js */ "./src/components/switch/index.js");
/* harmony import */ var _components_tabs_tab_body_index_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/tabs/tab-body/index.js */ "./src/components/tabs/tab-body/index.js");
/* harmony import */ var _components_tabs_tab_button_index_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/tabs/tab-button/index.js */ "./src/components/tabs/tab-button/index.js");
/* harmony import */ var _components_tabs_tabs_bar_index_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/tabs/tabs-bar/index.js */ "./src/components/tabs/tabs-bar/index.js");
/* harmony import */ var _components_tabs_tabs_content_index_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/tabs/tabs-content/index.js */ "./src/components/tabs/tabs-content/index.js");
/* harmony import */ var _components_text_field_index_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/text-field/index.js */ "./src/components/text-field/index.js");
/* harmony import */ var _components_top_app_bar_index_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/top-app-bar/index.js */ "./src/components/top-app-bar/index.js");



// --- Components ---

// import './components/autocomplete/index.js';
// import './components/backdrop/index.js';








// // import './components/expander/index.js';



















// import './components/tooltip/index.js';



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2ViZm9ybXVsYS9wYXgtY29yZS9zcmMvY2xpZW50L0hUTUxFbGVtZW50RXh0ZW5kZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJmb3JtdWxhL3BheC1jb3JlL3NyYy9jbGllbnQvUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdlYmZvcm11bGEvcGF4LWNvcmUvc3JjL2NsaWVudC9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYmFubmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Jhbm5lci9zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JvdHRvbS1uYXZpZ2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NoZWNrYm94L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kcmF3ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZmFiL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QtaXRlbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFuZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NoZWV0L2hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaGVldC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zbGlkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc25hY2tiYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc25hY2tiYXIvc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zd2l0Y2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWItYm9keS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYi1idXR0b24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzLWJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnMtY29udGVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0LWZpZWxkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvcC1hcHAtYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1JpcHBsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9UaGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9iYXNlLXRoZW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2RyYWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbW9iaWxlLWluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDSTtB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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3JhRDtBQUFBO0FBQTJEOztBQUUzRCxnREFBZ0Qsd0VBQW1CO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7QUFBQTtBQUEyRDtBQUNkOztBQUU3QyxvREFBb0Qsd0VBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUIsdURBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDaEdEO0FBQUE7QUFBMkQ7O0FBRTNELGdEQUFnRCx3RUFBbUI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEVEO0FBQUE7QUFBQTtBQUEyRDtBQUNoQjs7QUFFM0MsZ0RBQWdELHdFQUFtQjtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsUUFBUSxzREFBUTtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsUUFBUSxzREFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsc0RBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwyQ0FBMkM7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3JtQkQ7QUFBQTtBQUEyRDs7QUFFM0Qsd0RBQXdELHdFQUFtQjtBQUMzRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDN1FEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3hRRDtBQUFBO0FBQTJEOztBQUUzRCxvREFBb0Qsd0VBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2xERDtBQUFBO0FBQUE7QUFBMkQ7QUFDWDs7QUFFaEQsc0RBQXNELHdFQUFtQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLHVEQUFTO0FBQy9CO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxtREFBbUQsaUJBQWlCO0FBQ3BFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDakpEO0FBQUE7QUFBMkQ7O0FBRTNELG9EQUFvRCx3RUFBbUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDL0ZEO0FBQUE7QUFBMkQ7O0FBRTNELHdEQUF3RCx3RUFBbUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVEQUF1RCw2QkFBNkI7QUFDcEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzFDRDtBQUFBO0FBQTJEOztBQUUzRCxxREFBcUQsd0VBQW1CO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2hKRDtBQUFBO0FBQUE7QUFBMkQ7QUFDaEI7O0FBRTNDLHVEQUF1RCx3RUFBbUI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtDQUFrQyxzREFBUTtBQUMxQyxrQ0FBa0Msc0RBQVE7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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Q0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM1lBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrQzs7QUFFbEM7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixpREFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLFFBQVEsaURBQVE7QUFDaEI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsaURBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVEsaURBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLGlEQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGFBQWE7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoTUE7QUFBQTtBQUFBO0FBQU87QUFDQTs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlCO0FBQ0Q7O0FBRXhCOztBQUVBO0FBQ0E7QUFDc0M7QUFDVztBQUNYO0FBQ0Y7QUFDSTtBQUNTO0FBQ1g7QUFDQTtBQUN0QztBQUNtQztBQUNDO0FBQ1c7QUFDWDtBQUNLO0FBQ0w7QUFDQztBQUNBO0FBQ007QUFDTDtBQUNEO0FBQ0M7QUFDRTtBQUNGO0FBQ087QUFDRTtBQUNGO0FBQ0k7QUFDUDtBQUMxQztBQUMyQyIsImZpbGUiOiJlbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2VudHJ5LmpzXCIpO1xuIiwiaW1wb3J0IFBhZ2UgZnJvbSAnLi9zcmMvY2xpZW50L1BhZ2UuanMnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3NyYy9jbGllbnQvcm91dGVyLmpzJztcbmltcG9ydCBIVE1MRWxlbWVudEV4dGVuZGVkIGZyb20gJy4vc3JjL2NsaWVudC9IVE1MRWxlbWVudEV4dGVuZGVkLmpzJztcblxuZXhwb3J0IHtcbiAgUGFnZSxcbiAgcm91dGVyLFxuICBIVE1MRWxlbWVudEV4dGVuZGVkXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MRWxlbWVudEV4dGVuZGVkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0IF90ZW1wbGF0ZUlkKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCl9LS10ZW1wbGF0ZWA7XG4gIH1cblxuICAvKiBDbG9uZSBmcm9tIHByZSBidWlsdCBodG1sVGVtcGxhdGVcbiAgICogICAtIFJlcmVuZGVyOiByZXBsYWNlcyBodG1sIGJ1dCBub3Qgc3R5bGVzLiBUaGlzIGlzIHVzZWZ1bGwgZm9yIGR5bmFtaWMgdGVtcGxhdGVzXG4gICAqL1xuICBjbG9uZVRlbXBsYXRlKHJlcmVuZGVyKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fdGVtcGxhdGVJZCk7XG4gICAgXG4gICAgLy8gY3JlYXRlIHRlbXBsYXRlIG9uIHRoZSBmbHlcbiAgICBpZiAoIXRlbXBsYXRlKSB0ZW1wbGF0ZSA9IHRoaXMuX2NyZWF0ZVRlbXBsYXRlKCk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLnNoYWRvd1Jvb3QgPyB0aGlzLnNoYWRvd1Jvb3QgOiB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBjbG9uZSA9IHRlbXBsYXRlQ29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICBpZiAocmVyZW5kZXIpIHtcbiAgICAgIC8vIHRoaXMuX19pc0J1aWxkUHJvY2VzcyBpcyBwcmVzZW50IGR1cmluZyB0aGUgYnVpbGQgcHJvY2VzcyBhbmQgd2lsbCBiZSB1bmRlZmluZWQgaW4gdGhlIGJyb3dzZXJcbiAgICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMuYmVmb3JlUmVuZGVyKSB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgY2xvbmUucXVlcnlTZWxlY3RvcigncmVuZGVyLWJsb2NrJykuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZSgpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMuYWZ0ZXJSZW5kZXIpIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcblxuICB9XG5cbiAgX2NyZWF0ZVRlbXBsYXRlKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdGVtcGxhdGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLl90ZW1wbGF0ZUlkKTtcbiAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgJHt0aGlzLnN0eWxlcygpfVxuICAgICAgICA8L3N0eWxlPlxuICAgICAgICA8cmVuZGVyLWJsb2NrPlxuICAgICAgICAgICR7dGhpcy50ZW1wbGF0ZSgpfVxuICAgICAgICA8L3JlbmRlci1ibG9jaz5cbiAgICBgO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgIHJldHVybiB0ZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBEZXRlY3Qgc3VwZXI/XG4gICAgaWYgKCF0aGlzLl9faXNCdWlsZFByb2Nlc3MgJiYgdGhpcy5hZGRFdmVudHMpIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBEZXRlY3Qgc3VwZXI/XG4gICAgaWYgKCF0aGlzLl9faXNCdWlsZFByb2Nlc3MgJiYgdGhpcy5yZW1vdmVFdmVudHMpIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gdGhpcy5fX2lzQnVpbGRQcm9jZXNzIGlzIHByZXNlbnQgZHVyaW5nIHRoZSBidWlsZCBwcm9jZXNzIGFuZCB3aWxsIGJlIHVuZGVmaW5lZCBpbiB0aGUgYnJvd3NlclxuICAgIGlmICh0aGlzLl9faXNCdWlsZFByb2Nlc3MpIHJldHVybjtcblxuICAgIGNvbnN0IHJlbmRlckJsb2NrID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3JlbmRlci1ibG9jaycpO1xuICAgIGlmICghcmVuZGVyQmxvY2spIHRocm93IEVycm9yKCdDb3VsZCBub3QgZmluZCA8cmVuZGVyLWJsb2NrPicpO1xuXG4gICAgaWYgKHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICAgIGlmICh0aGlzLmJlZm9yZVJlbmRlcikgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICByZW5kZXJCbG9jay5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKCk7XG4gICAgaWYgKHRoaXMuYWZ0ZXJSZW5kZXIpIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcbiAgICBpZiAodGhpcy5hZGRFdmVudHMpIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICAvLyBDYWxsZWQgYmVmb3JlIHJlbmRlcigpLiBwbGFjZWhvbGRlciwgY2FuIGJlIG92ZXJpZGRlblxuICAvLyBUaGlzIGRvZXMgbm90IGluY2x1ZGUgdGhlIGluaXRpYWwgY2xvbmVOb2RlXG4gIGJlZm9yZVJlbmRlcigpIHsgfVxuXG4gIC8vIENhbGxlZCBhZnRlciByZW5kZXIoKS4gcGxhY2Vob2xkZXIsIGNhbiBiZSBvdmVyaWRkZW5cbiAgLy8gVGhpcyBkb2VzIG5vdCBpbmNsdWRlIHRoZSBpbml0aWFsIGNsb25lTm9kZVxuICBhZnRlclJlbmRlcigpIHsgfVxuXG4gIC8vIHRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBjb25uZWN0ZWRcbiAgLy8gVGhpcyBpcyBhbHNvIGNhbGxlZCBhZnRlciByZW5kZXIsIGV2ZW50cyBhcmUgZmlyc3QgcmVtb2VkIGJlZm9yZSByZW5kZXIgc28geW91IGRvbnQgaGF2ZSBtdWx0aXBsZSBldmVudHNcbiAgYWRkRXZlbnRzKCkgeyB9XG5cbiAgLy8gdGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRpc2Nvbm5lY3RlZFxuICAvLyBUaGlzIGlzIGFsc28gY2FsbGVkIHByaW9yIHRvIHJlbmRlciwgYWZ0ZXIgcmVuZGVyIGFkZEV2ZW50cyBpcyBjYWxsZWQuIFRoaXMgd2lsbCBtYWtlIHN1cmUgeW91IG9sZCBlbGVtZW50cyBkb250IHJldGFpbiBldmVudHNcbiAgcmVtb3ZlRXZlbnRzKCkgeyB9XG5cbiAgLy8gYWRkIGNzcyB0aGF0IHdpbGwgYmUgaW5qZWN0ZWQgdG8gdGhlIHRlbXBsYXRlXG4gIHN0eWxlcygpIHsgfVxuXG4gIC8vIGFkZCBjc3MgdG8gdGhlIGRvY3VtZW50IHJvb3RcbiAgZXh0ZXJuYWxTdHlsZXMoKSB7IH1cblxuICAvLyBhZGQgaHRtbCB0ZW1wbGF0ZSwgVGhpcyB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIHRoZSB0ZW1wbGF0ZSBhbmQgZGlyZWN0IHJlbmRlclxuICB0ZW1wbGF0ZSgpIHsgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiB3aW5kb3c7XG4gICAgICBpZiAodGhpcy5nbG9iYWwuZGlzcGxheVBhZ2VDb250ZW50T25seSkgdGhpcy5kaXNwbGF5UGFnZUNvbnRlbnRPbmx5KHRydWUpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBvbmNlIHBhZ2UgaXMgcmVuZGVyZFxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgLy8gRGV0ZWN0IHN1cGVyP1xuICAgICAgaWYgKHRoaXMuYWRkRXZlbnRzKSB0aGlzLmFkZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBvbmNlIHBhZ2UgaXMgcmVtb3ZlZFxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgLy8gRGV0ZWN0IHN1cGVyP1xuICAgICAgaWYgKHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBDcmVhdGVBbmRTZXQoKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICB3aW5kb3cuYWN0aXZlUGFnZSA9IGluc3RhbmNlO1xuXG4gICAgICBjb25zdCBwYWdlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpO1xuICAgICAgaWYgKHBhZ2VUaXRsZSkgcGFnZVRpdGxlLmlubmVyVGV4dCA9IGluc3RhbmNlLnRpdGxlO1xuXG4gICAgICBpbnN0YW5jZS5yZW5kZXIoKTtcbiAgICAgIC8vIFRPRE8gdXNlIG11dGF0aW9uIG9ic2VydmVyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNvbm5lY3RlZENhbGxiYWNrKSBpbnN0YW5jZS5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgfSwgMCk7XG5cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvLyByZW5kZXIgcGFnZSBodG1sXG4gICAgcmVuZGVyKCkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVSZW5kZXIgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jazpub3QoLnByZXZpb3VzKScpO1xuICAgICAgaWYgKCFyZW5kZXJCbG9jaykgdGhyb3cgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIDxwYWdlLXJlbmRlci1ibG9jaz4nKTtcblxuICAgICAgaWYgKHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICAgICAgaWYgKHRoaXMuYmVmb3JlUmVuZGVyKSB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgcmVuZGVyQmxvY2suaW5uZXJIVE1MID0gYDxzdHlsZT4ke3RoaXMuc3R5bGVzKCl9PC9zdHlsZT4ke3RoaXMudGVtcGxhdGUoKX1gO1xuICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW5kZXIpIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcbiAgICAgIGlmICh0aGlzLmFkZEV2ZW50cykgdGhpcy5hZGRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBoaWRlIGFueSBub24gaW1taWRpYXRlIGVsZW1lbnRzIGFib3ZlIG9yIG9uIHRoZSBzYW1lIGxldmVsIGFkIHRoZSBwYWdlIGNvbnRlbnRcbiAgICBkaXNwbGF5UGFnZUNvbnRlbnRPbmx5KHJldmVyc2UgPSBmYWxzZSkge1xuICAgICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jaycpO1xuICAgICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGxldCBub2RlID0gcmVuZGVyQmxvY2s7XG4gICAgICBsZXQgc2libGluZztcbiAgICAgIGxldCBkaXJlY3RQYXRlbnQgPSByZW5kZXJCbG9jaztcblxuICAgICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSAmJiBub2RlLnBhcmVudE5vZGUgIT09IGh0bWwpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIHNpYmxpbmcgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgd2hpbGUgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDEgJiYgc2libGluZyAhPT0gZGlyZWN0UGF0ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmV2ZXJzZSkgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLW90aGVyLXRoYW4tcGFnZS1jb250ZW50Jyk7XG4gICAgICAgICAgICAgICAgICBlbHNlIHNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnaGlkZS1vdGhlci10aGFuLXBhZ2UtY29udGVudCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nXG4gICAgICAgICAgfVxuICAgICAgICAgIGRpcmVjdFBhdGVudCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ2xvYmFsLmRpc3BsYXlQYWdlQ29udGVudE9ubHkgPSAhcmV2ZXJzZTtcbiAgICB9XG5cbiAgICAvLyBDYWxsZWQgYmVmb3JlIHJlbmRlcigpLiBwbGFjZWhvbGRlciwgY2FuIGJlIG92ZXJpZGRlblxuICAgIC8vIFRoaXMgZG9lcyBub3QgaW5jbHVkZSB0aGUgaW5pdGlhbCBjbG9uZU5vZGVcbiAgICBiZWZvcmVSZW5kZXIoKSB7IH1cblxuICAgIC8vIENhbGxlZCBhZnRlciByZW5kZXIoKS4gcGxhY2Vob2xkZXIsIGNhbiBiZSBvdmVyaWRkZW5cbiAgICAvLyBUaGlzIGRvZXMgbm90IGluY2x1ZGUgdGhlIGluaXRpYWwgY2xvbmVOb2RlXG4gICAgYWZ0ZXJSZW5kZXIoKSB7IH1cblxuICAgIC8vIGFkZCBjc3MgdGhhdCB3aWxsIGJlIGluamVjdGVkIHRvIHRoZSB0ZW1wbGF0ZVxuICAgIHN0eWxlcygpIHsgfVxuXG4gICAgLy8gYWRkIGh0bWwgdGVtcGxhdGUsIFRoaXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgdGVtcGxhdGUgYW5kIGRpcmVjdCByZW5kZXJcbiAgICB0ZW1wbGF0ZSgpIHsgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgICB0aGlzLmNsYXNzUmVmZXJlbmNlID0ge307XG5cbiAgICB0aGlzLnBhZ2VDbGFzc25hbWVSZWdleCA9IC9jbGFzc1xccyguKilcXHNleHRlbmRzLztcblxuICAgIC8vIHJlZ2V4ZXMgZm9yIHBhcnNpbmcgdXJpJ3NcbiAgICB0aGlzLlBBUkFNRVRFUl9SRUdFWFAgPSAvKFs6Kl0pKFxcdyspL2c7XG4gICAgdGhpcy5XSUxEQ0FSRF9SRUdFWFAgPSAvXFwqL2c7XG4gICAgdGhpcy5SRVBMQUNFX1ZBUklBQkxFX1JFR0VYUCA9ICcoW15cXC9dKyknO1xuICAgIHRoaXMuUkVQTEFDRV9XSUxEQ0FSRCA9ICcoPzouKiknO1xuICAgIHRoaXMuRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQID0gJyg/OlxcLyR8JCknO1xuICAgIHRoaXMuTUFUQ0hfUkVHRVhQX0ZMQUdTID0gJyc7XG5cbiAgICB0aGlzLl90cmFuc2l0aW9uUGFnZXMgPSBmYWxzZTtcbiAgICB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkNvbXBsZXRlID0gdGhpcy5fb25UcmFuc2l0aW9uQ29tcGxldGUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX19tdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5hY3RpdmVQYWdlLmNvbm5lY3RlZENhbGxiYWNrKSB3aW5kb3cuYWN0aXZlUGFnZS5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgdGhpcy5fc3RvcFdhdGNoaW5nRm9yQ29ubmVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBicm93c2VyIGV2ZW50cyBmb3IgdXJsIGNoYW5nZXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX3Jlc29sdmUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9yZXNvbHZlKHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdHJhbnNpdGlvblBhZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2l0aW9uUGFnZXM7XG4gIH1cblxuICBzZXQgdHJhbnNpdGlvblBhZ2VzKHZhbHVlKSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvblBhZ2VzID0gISF2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYXRoKCkge1xuICAgIGxldCBwYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgvLiojLywgJycpO1xuICAgIGlmIChwYXRoLmluZGV4T2YoJz8nKSA+IC0xKSBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdO1xuICAgIGlmIChwYXRoLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRoID0gJy8nICsgcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldCB1cmxQYXJhbWV0ZXJzKCkge1xuICAgIGNvbnN0IG1hdGNoID0gdGhpcy5fbWF0Y2godGhpcy5wYXRoKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaC5wYXJhbXMgOiB7fTtcbiAgfVxuXG4gIGdldCBzZWFyY2hQYXJhbXRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V4dHJhY3RTZWFyY2hQYXJhbWV0ZXJzKHRoaXMuX2NsZWFuKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSkuc3BsaXQoJywnKS5maWx0ZXIoYSA9PiAhIWEpLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgY29uc3Qgc3BsaXQgPSBiLnNwbGl0KCc9Jyk7XG4gICAgICBhW3NwbGl0WzBdXSA9IHNwbGl0WzFdO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwge30pO1xuICB9XG5cbiAgYWRkVHJhbnNpdGlvbkNTUygpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBgPHN0eWxlPlxuICAgICAgcGFnZS1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuICAgICAgcGFnZS1jb250YWluZXIuaW4tdHJhbnNpdGlvbiB7XG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgIH1cbiAgICAgIHBhZ2UtcmVuZGVyLWJsb2NrIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgfVxuICAgICAgcGFnZS1yZW5kZXItYmxvY2suYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1vdXQge1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG4gICAgICBwYWdlLXJlbmRlci1ibG9jay5iZWZvcmUtdHJhbnNpdGlvbi1wYWdlLWluIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpIHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuICAgICAgcGFnZS1yZW5kZXItYmxvY2sudHJhbnNpdGlvbi1wYWdlLW91dCB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMTZzIGxpbmVhcixcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIC4yNnMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTtcbiAgICAgIH1cbiAgICAgIHBhZ2UtcmVuZGVyLWJsb2NrLnRyYW5zaXRpb24tcGFnZS1pbiB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IC01MCUgMDtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMThzIGxpbmVhcixcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIC4yNnMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTtcbiAgICAgIH1cbiAgICA8L3N0eWxlPmApO1xuICB9XG4gIFxuICAvLyB5b3UgY2FuIGNvbmZpZ3VyZSByb3V0ZXMgZGlyZWN0bHkgaW4gdGhlIFBhZ2UgY2xhc3NcbiAgYWRkUGFnZUNsYXNzKENsYXNzLCBvcHRpb25hbFBhdGgpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShDbGFzcywgb3B0aW9uYWxQYXRoKTtcblxuICAgIC8vIGhhbmRsZSBvcHRpb25hbCBwYXRoXG4gICAgaWYgKG9wdGlvbmFsUGF0aCkgdGhpcy5hZGRQYWdlQ2xhc3NQYXRoKENsYXNzLCBvcHRpb25hbFBhdGgpO1xuXG4gICAgLy8gYWRkIHJvdXRlcyBmcm9tIHBhZ2UgY2xhc3NcbiAgICAoQ2xhc3Mucm91dGVzIHx8IFtdKS5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgaWYgKG9wdGlvbmFsUGF0aCA9PT0gcGF0aCkgcmV0dXJuO1xuICAgICAgaWYgKHRoaXMucm91dGVzW3BhdGhdKSB0aHJvdyBFcnJvcihgUGF0aCBhbHJlYWR5IGV4aXN0czogJHtwYXRofWApO1xuICAgICAgdGhpcy5jbGFzc1JlZmVyZW5jZVtjbGFzc05hbWVdID0gQ2xhc3M7XG4gICAgICB0aGlzLnJvdXRlc1twYXRoXSA9IGNsYXNzTmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBhZ2VDbGFzc1BhdGgoQ2xhc3MsIHBhdGgpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShDbGFzcywgcGF0aCk7XG4gICAgaWYgKHRoaXMucm91dGVzW3BhdGhdKSB0aHJvdyBFcnJvcihgUGF0aCBhbHJlYWR5IGV4aXN0czogJHtvcHRpb25hbFBhdGh9YCk7XG4gICAgdGhpcy5jbGFzc1JlZmVyZW5jZVtjbGFzc05hbWVdID0gQ2xhc3M7XG4gICAgdGhpcy5yb3V0ZXNbcGF0aF0gPSBjbGFzc05hbWU7XG4gIH1cblxuICBnZXRDbGFzc05hbWUoQ2xhc3MsIHBhdGgpIHtcbiAgICBjb25zdCBjbGFzc01hdGNoID0gdGhpcy5wYWdlQ2xhc3NuYW1lUmVnZXguZXhlYyhDbGFzcyk7XG4gICAgcmV0dXJuIGNsYXNzTWF0Y2ggPyBjbGFzc01hdGNoWzFdIDogcGF0aC5zcGxpdCgnLycpLnBvcCgpLnJlcGxhY2UoJy5qcycsICcnKTtcbiAgfVxuXG4gIHNldFJvb3QoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHRoaXMucm91dGVzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGNvbnN0IENsYXNzID0gdGhpcy5jbGFzc1JlZmVyZW5jZVt0aGlzLnJvdXRlc1tjbGFzc05hbWVdXTtcbiAgICAgIHRoaXMuYWRkUGFnZUNsYXNzUGF0aChDbGFzcywgJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2xhc3NOYW1lIGlzIGFjdHVhbGx5IGNsYXNzIGluIHRoaXMgY2FzZVxuICAgICAgdGhpcy5hZGRQYWdlQ2xhc3NQYXRoKGNsYXNzTmFtZSwgJy8nKTtcbiAgICB9XG4gIH1cblxuICBzZXQ0MDQoeyBDbGFzcyB9KSB7XG4gICAgaWYgKENsYXNzKSB0aGlzLl9ub3RGb3VuZFJvdXRlQ2xhc3MgPSBDbGFzcztcbiAgfVxuXG5cbiAgLy8gLS0tIHByaXZhdGUgLS0tXG5cbiAgX3Jlc29sdmUoZXZlbnQsIGluaXRpYWwgPSBmYWxzZSkge1xuICAgIC8vIG5vIGNoYW5nZVxuICAgIGlmIChpbml0aWFsID09PSBmYWxzZSAmJiBldmVudC5vbGRVUkwgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vbGRVUkwgPT09IGV2ZW50Lm5ld1VSTCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGF0aCA9IHRoaXMucGF0aDtcbiAgICBjb25zdCBtYXRjaCA9IHRoaXMuX21hdGNoKHBhdGgpO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgaWYgKHRoaXMuX25vdEZvdW5kUm91dGVDbGFzcykgcmV0dXJuIHRoaXMuX2NoYW5nZVBhZ2UodGhpcy5fbm90Rm91bmRSb3V0ZUNsYXNzKTtcbiAgICAgIGVsc2UgcmV0dXJuIGNvbnNvbGUud2Fybignbm8gcGFnZSBmb3VuZCBhbmQgbm8gZGVmYXVsdCBub3QgZm91bmQgcGFnZSBzZXR1cCcpO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSBwYXRoO1xuICAgIGlmIChpbml0aWFsICYmIHRoaXMuX3BhZ2VJc1ByZVJlbmRlcmVkKCkpIHJldHVybjtcblxuICAgIGxldCBHRVRQYXJhbWV0ZXJzID0gdGhpcy5fZXh0cmFjdFNlYXJjaFBhcmFtZXRlcnModGhpcy5fY2xlYW4od2luZG93LmxvY2F0aW9uLmhyZWYpKTtcbiAgICBpZiAoR0VUUGFyYW1ldGVycykgdXJsICs9IGA/JHtHRVRQYXJhbWV0ZXJzfWA7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XG5cbiAgICAvLyBwcmV2ZW50IHBhZ2UgY2hhbmdlIHdoZW4gbm8gZGlmZmVyZW5jZSBleGlzdHNcbiAgICAvLyB0aGlzIHdpbGwgY292ZXIgdGhlIGNhc2Ugb2YgYWRkaW5nIHRoZSAjLyB0byB0aGUgdXJsXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50Lm9sZFVSTCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1cmxEaWZmID0gZXZlbnQub2xkVVJMLmxlbmd0aCA+IGV2ZW50Lm5ld1VSTC5sZW5ndGggPyBldmVudC5vbGRVUkwucmVwbGFjZShldmVudC5uZXdVUkwsICcnKSA6IGV2ZW50Lm5ld1VSTC5yZXBsYWNlKGV2ZW50Lm9sZFVSTCwgJycpO1xuICAgICAgaWYgKHVybERpZmYgPT09ICcnIHx8IHVybERpZmYgPT09ICcjLycpIHJldHVyblxuICAgIH1cblxuICAgIC8vIHByZXZlbnQgcGFnZSBmcm9tIGxvYWRpbmcgb24gaW5pdGlhbCByZW5kZXJcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlUGFnZShtYXRjaCk7XG4gIH1cblxuICBfd2F0Y2hGb3JDb25uZWN0KCkge1xuICAgIGNvbnN0IHJlbmRlckJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1yZW5kZXItYmxvY2s6bm90KC5wcmV2aW91cyknKTtcbiAgICB0aGlzLl9fbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHJlbmRlckJsb2NrLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgfVxuXG4gIF9zdG9wV2F0Y2hpbmdGb3JDb25uZWN0KCkge1xuICAgIHRoaXMuX19tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIF9jaGFuZ2VQYWdlKHsgQ2xhc3MgfSkge1xuICAgIGlmICghQ2xhc3MpIHRocm93IEVycm9yKCdubyBjbGFzcyBmb3VuZCcpO1xuXG4gICAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKCFwYWdlQ29udGFpbmVyKSB0aHJvdyBFcnJvcignPHBhZ2UtY29udGFpbmVyPiByZXF1aXJlZCBmb3Igcm91dGVyIHRvIHdvcmsnKTtcblxuICAgIC8vXG4gICAgdGhpcy5fc3RvcFdhdGNoaW5nRm9yQ29ubmVjdCgpO1xuXG4gICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jaycpO1xuXG4gICAgLy8gLS0tIGluaXRhbCBwYWdlIC0tLVxuICAgIC8vIEEgcGFnZSBjYW4gaGF2ZSBubyBwcmUtcmVuZGVyZWQgcGFnZXMuXG4gICAgLy8gY3JlYXRlIHJlbmRlci1ibG9jayBhbmQgcmVuZGVyIHBhZ2UgaW1taWRpYXRseVxuICAgIGlmICghcmVuZGVyQmxvY2spIHtcbiAgICAgIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFnZS1yZW5kZXItYmxvY2snKSk7XG5cbiAgICAgIC8vIGNyZWF0ZSBwYWdlIGNsYXNzIGluc3RhbmNlXG4gICAgICB3aW5kb3cuYWN0aXZlUGFnZSA9IG5ldyBDbGFzcygpO1xuICAgICAgdGhpcy5fd2F0Y2hGb3JDb25uZWN0KCk7XG4gICAgICB3aW5kb3cuYWN0aXZlUGFnZS5yZW5kZXIoKTtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICAvLyAtLS0gbm8gdHJhbnNpdG9uIC0tLVxuICAgIC8vIGNoYW5nZSBwYWdlIGltbWlkZWF0bHkgaWYgdHJhbnNpdGlvbnMgYXJlIG5vdCBvblxuICAgIGlmICghdGhpcy5fdHJhbnNpdGlvblBhZ2VzKSB7XG4gICAgICB3aW5kb3cuYWN0aXZlUGFnZS5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuXG4gICAgICAvLyBjcmVhdGUgcGFnZSBjbGFzcyBpbnN0YW5jZVxuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UgPSBuZXcgQ2xhc3MoKTtcbiAgICAgIHRoaXMuX3dhdGNoRm9yQ29ubmVjdCgpO1xuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UucmVuZGVyKCk7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vLS0tIHRyYW5zaXRvbiAtLS1cblxuICAgIC8vIHByZXAgZm9yIGN1cnJlbnQgcGFnZSB0cmFuc2l0aW9uIG91dFxuICAgIHJlbmRlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3ByZXZpb3VzJyk7XG4gICAgcmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgnYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1vdXQnKTtcbiAgICB3aW5kb3cuYWN0aXZlUGFnZS5fZGlzYWJsZVJlbmRlciA9IHRydWU7XG4gICAgd2luZG93LmFjdGl2ZVBhZ2UuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgIC8vIGJ1aWxkIG5leHQgcGFnZSBhbmQgcHJlcCBmb3IgdHJhbnNpdGlvblxuICAgIGNvbnN0IG5leHRSZW5kZXJCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhZ2UtcmVuZGVyLWJsb2NrJyk7XG4gICAgbmV4dFJlbmRlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ2JlZm9yZS10cmFuc2l0aW9uLXBhZ2UtaW4nKTtcbiAgICByZW5kZXJCbG9jay5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgbmV4dFJlbmRlckJsb2NrKTtcblxuICAgIGNvbnN0IHBhZ2VJbnN0YW5jZSA9IG5ldyBDbGFzcygpO1xuICAgIHdpbmRvdy5hY3RpdmVQYWdlID0gcGFnZUluc3RhbmNlO1xuICAgIHRoaXMuX3dhdGNoRm9yQ29ubmVjdCgpO1xuICAgIHBhZ2VJbnN0YW5jZS5yZW5kZXIoKTtcblxuICAgIGNvbnN0IHBhZ2VUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk7XG4gICAgaWYgKHBhZ2VUaXRsZSkgcGFnZVRpdGxlLmlubmVyVGV4dCA9IHBhZ2VJbnN0YW5jZS50aXRsZTtcblxuICAgIC8vIC0tLSB0cmFuc2l0aW9uIC0tLVxuICAgIHBhZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW4tdHJhbnNpdGlvbicpO1xuXG4gICAgLy8gQ09OVElOVUVcbiAgICByZW5kZXJCbG9jay5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uLXBhZ2Utb3V0Jyk7XG4gICAgbmV4dFJlbmRlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24tcGFnZS1pbicpO1xuXG4gICAgcmVuZGVyQmxvY2suYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuYm91bmRfb25UcmFuc2l0aW9uQ29tcGxldGUpO1xuICAgIG5leHRSZW5kZXJCbG9jay5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25Db21wbGV0ZSk7XG4gIH1cblxuICBfb25UcmFuc2l0aW9uQ29tcGxldGUoeyB0YXJnZXQgfSkge1xuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25Db21wbGV0ZSk7XG4gICAgLy8gcmVtb3ZlIG9sZCBwYWdlXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RyYW5zaXRpb24tcGFnZS1vdXQnKSkgdGFyZ2V0LnJlbW92ZSgpO1xuICAgIC8vIHJlbW92ZSBhbmltYXRpb24gc3RhdGUgZnJvbSBuZXcgcGFnZVxuICAgIGVsc2Uge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2JlZm9yZS10cmFuc2l0aW9uLXBhZ2UtaW4nKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCd0cmFuc2l0aW9uLXBhZ2UtaW4nKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgdHJhbnNpdGlvbiBzdGF0ZSBmcm9tIHBhZ2UgY29udGFpbmVyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jay5wcmV2aW91cycpICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jay5uZXh0JykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaW4tdHJhbnNpdGlvbicpO1xuICAgIH1cbiAgfVxuICBcblxuICBfcGFnZUlzUHJlUmVuZGVyZWQoKSB7XG4gICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jaycpO1xuICAgIGlmIChyZW5kZXJCbG9jayAmJiByZW5kZXJCbG9jay5jaGlsZHJlbi5sZW5ndGggPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfY2xlYW4oc3RyKSB7XG4gICAgaWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHM7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXC8rJC8sICcnKS5yZXBsYWNlKC9eXFwvKy8sICcvJyk7XG4gIH1cblxuICBfZXh0cmFjdFNlYXJjaFBhcmFtZXRlcnModXJsKSB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgvXFw/KC4qKT8kLykuc2xpY2UoMSkuam9pbignJyk7XG4gIH1cblxuXG5cbiAgLy8gLS0tIG1hdGNoaW5nIC0tLVxuXG4gIF9tYXRjaChwYXRoKSB7XG4gICAgbGV0IG1hdGNoZWQgPSB0aGlzLl9maW5kTWF0Y2hlZFJvdXRlcyhwYXRoKTtcbiAgICBpZiAoIW1hdGNoZWQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZWxzZSBpZiAobWF0Y2hlZC5sZW5ndGggPT09IDEpIHJldHVybiBtYXRjaGVkWzBdO1xuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIG1hdGNoZWQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYi5wYXJhbXMpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9KVswXTtcbiAgICB9XG4gIH1cblxuICBfZmluZE1hdGNoZWRSb3V0ZXModXJsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucm91dGVzKVxuICAgICAgLm1hcChyb3V0ZSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucm91dGVzW3JvdXRlXTtcbiAgICAgICAgY29uc3QgeyByZWdleHAsIHBhcmFtTmFtZXMgfSA9IHRoaXMuX3JlcGxhY2VEeW5hbWljVVJMUGFydHModGhpcy5fY2xlYW4ocm91dGUpKTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB1cmwucmVwbGFjZSgvXlxcLysvLCAnLycpLm1hdGNoKHJlZ2V4cCk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX3JlZ0V4cFJlc3VsdFRvUGFyYW1zKG1hdGNoLCBwYXJhbU5hbWVzKTtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSB0aGlzLmNsYXNzUmVmZXJlbmNlW2NsYXNzTmFtZV07XG5cbiAgICAgICAgcmV0dXJuICFtYXRjaCA/IGZhbHNlIDoge1xuICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgIHJvdXRlLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgQ2xhc3NcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKG0gPT4gbSAmJiBtLm1hdGNoWzBdICE9PSAnJyk7XG4gIH1cblxuICBfcmVwbGFjZUR5bmFtaWNVUkxQYXJ0cyhyb3V0ZSkge1xuICAgIGxldCBwYXJhbU5hbWVzID0gW107XG4gICAgbGV0IHJlZ2V4cCA9ICcnO1xuXG4gICAgaWYgKHJvdXRlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZWdleHAgPSByb3V0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICAgdGhpcy5fY2xlYW4ocm91dGUpXG4gICAgICAgICAgLnJlcGxhY2UodGhpcy5QQVJBTUVURVJfUkVHRVhQLCAoZnVsbCwgZG90cywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1OYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFA7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAucmVwbGFjZSh0aGlzLldJTERDQVJEX1JFR0VYUCwgdGhpcy5SRVBMQUNFX1dJTERDQVJEKSArIHRoaXMuRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQLCB0aGlzLk1BVENIX1JFR0VYUF9GTEFHU1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVnZXhwLCBwYXJhbU5hbWVzIH07XG4gIH1cblxuICBfcmVnRXhwUmVzdWx0VG9QYXJhbXMobWF0Y2gsIG5hbWVzKSB7XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG1hdGNoXG4gICAgICAuc2xpY2UoMSwgbWF0Y2gubGVuZ3RoKVxuICAgICAgLnJlZHVjZSgocGFyYW1zLCB2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCkgcGFyYW1zID0ge307XG4gICAgICAgIHBhcmFtc1tuYW1lc1tpbmRleF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH0sIG51bGwpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV0Jhbm5lciBmcm9tICcuL3NlcnZpY2UuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1iYW5uZXInLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBgLSR7dGhpcy5jbGllbnRIZWlnaHQgKyAxfXB4YDtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgTURXQmFubmVyLmFkZCh0aGlzKTtcbiAgfVxuXG4gIGRpc21pc3MoKSB7XG4gICAgTURXQmFubmVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIGFjY2VwdCgpIHtcbiAgICBNRFdCYW5uZXIuYWNjZXB0KHRoaXMpO1xuICB9XG5cbiAgX3Nob3coKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdycpO1xuICB9XG5cbiAgX2Rpc3NtaXNzKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihNRFdVdGlscy50cmFuc2l0aW9uRXZlbnROYW1lLCBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKE1EV1V0aWxzLnRyYW5zaXRpb25FdmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgc2VsZi5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1kaXNtaXNzJyk7XG4gICAgdGhpcy5kaXNwYXRjaENsb3NlKCk7XG4gIH1cblxuICBkaXNwYXRjaENsb3NlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Nsb3NlJykpO1xuICB9XG59KTtcbiIsImltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY29uc3QgTURXQmFubmVyID0gbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICB9XG5cbiAgYWRkKGVsLCByZXNvbHZlcikge1xuICAgIHRoaXMucXVldWUucHVzaCh7ZWwsIHJlc29sdmVyfSk7XG4gICAgdGhpcy5oYW5kbGVRdWV1ZSgpO1xuICB9XG5cbiAgcmVtb3ZlKGVsKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQuZWwgPT09IGVsKSB7XG4gICAgICB0aGlzLmN1cnJlbnQucmVzb2x2ZXIoZmFsc2UpO1xuICAgICAgZWwuX2Rpc3NtaXNzKCk7XG4gICAgfSBlbHNlIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihlID0+IGUuZWwgIT09IGVsKTtcbiAgfVxuXG4gIGFjY2VwdChlbCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmVsID09PSBlbCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJlc29sdmVyKHRydWUpO1xuICAgICAgZWwuX2Rpc3NtaXNzKCk7XG4gICAgfSBlbHNlIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihlID0+IGUuZWwgIT09IGVsKTtcbiAgfVxuXG4gIGhhbmRsZVF1ZXVlKCkge1xuICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgIHRoaXMuY3VycmVudC5lbC5fc2hvdygpO1xuICAgICAgdGhpcy5jdXJyZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlUXVldWUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZSh7IG1lc3NhZ2UsIGRpc21pc3NMYWJlbCA9IFwiZGlzbWlzc1wiLCBhY2NlcHRMYWJlbCA9IG51bGwsIHRlbXBsYXRlLCBwYXJlbnQgfSkge1xuICAgIGlmICghbWVzc2FnZSAmJiAhdGVtcGxhdGUpIHRocm93IEVycm9yKCdFaXRoZXIgYG1lc3NhZ2VgIG9yIGB0ZW1wbGF0ZWAgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoIXRlbXBsYXRlICYmICFkaXNtaXNzTGFiZWwgJiYgIWFjY2VwdExhYmVsKSB0aHJvdyBFcnJvcignV2hlbiBub3QgdXNpbmcgYSBgdGVtcGxhdGVgIHlvdSBhcmUgcmVxdWlyZWQgdG8gcHJvdmlkZSBlaXRoZXIgYSBgZGlzbWlzc0xhYmVsYCBvciBhbiBgYWNjZXB0TGFiZWxgJyk7XG5cbiAgICBjb25zdCB1aWQgPSBNRFdVdGlscy51aWQoKTtcbiAgICBpZiAoIXRlbXBsYXRlKSB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUobWVzc2FnZSwgZGlzbWlzc0xhYmVsLCBhY2NlcHRMYWJlbCwgdWlkKTtcblxuICAgIC8vIHRyeSB0byBmaW5kIHRoZSBjb3JyZWN0IHBhcmVudCBpZiBub3QgcGFzc2VkIGluXG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LXBhZ2UgPiBtZHctdG9wLWFwcC1iYXInKTtcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZScpO1xuICAgIGlmICghcGFyZW50RWxlbWVudCkgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIGxldCBiYW5uZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnRFbGVtZW50Lm5vZGVOYW1lID09PSAnTURXLVRPUC1BUFAtQkFSJykge1xuICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgdGVtcGxhdGUpO1xuICAgICAgYmFubmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1kdy1iYW5uZXIjJHt1aWR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgdGVtcGxhdGUpO1xuICAgICAgYmFubmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1kdy1iYW5uZXIjJHt1aWR9YCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVyO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHJlc29sdmVyID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIC8vIE5PVEUgbWF5IG5lZWQgdGltZW91dFxuICAgIHRoaXMuYWRkKGJhbm5lckVsZW1lbnQsIHJlc29sdmVyKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHRlbXBsYXRlKG1lc3NhZ2UsIGRpc21pc3NMYWJlbCwgYWNjZXB0TGFiZWwsIHVpZCkge1xuICAgIHJldHVybiBgXG4gICAgICA8bWR3LWJhbm5lciBpZD1cIiR7dWlkfVwiIGNsYXNzPVwibWR3LWVsZXZhdGlvbi0xXCI+XG4gICAgICAgIDxkaXY+JHttZXNzYWdlfTwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICR7ZGlzbWlzc0xhYmVsID8gYDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke3VpZH0uZGlzbWlzcygpXCIgY2xhc3M9XCJtZHctc2Vjb25kYXJ5XCI+JHtkaXNtaXNzTGFiZWx9PC9tZHctYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgICAke2FjY2VwdExhYmVsID8gYDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke3VpZH0uYWNjZXB0KClcIiBjbGFzcz1cIm1kdy1zZWNvbmRhcnlcIj4ke2FjY2VwdExhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tZHctYmFubmVyPlxuICAgIGA7XG4gIH1cbn1cblxud2luZG93Lk1EV0Jhbm5lciA9IE1EV0Jhbm5lcjtcblxuZXhwb3J0IGRlZmF1bHQgTURXQmFubmVyO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctYm90dG9tLW5hdmlnYXRpb24nLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgWy4uLnRoaXMucXVlcnlTZWxlY3RvckFsbCgnbWR3LWJ1dHRvbicpXS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21kdy1ib3R0b20tbmF2aWdhdGlvbicpO1xuICAgIH0pO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctYnV0dG9uJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2FzeW5jQ2xpY2sgPSB0aGlzLmFzeW5jQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2hyZWZDbGljayA9IHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9jaGVja0hSRUZBY3RpdmUgPSB0aGlzLmNoZWNrSFJFRkFjdGl2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICAgIHRoaXMuc2V0dXBBc3luYygpO1xuICAgIHRoaXMuY29ubmVjdEhSRUYoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaHJlZkNsaWNrKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfY2hlY2tIUkVGQWN0aXZlKTtcbiAgfVxuXG4gIGdldCBzcGlubmVyQ29udGFpbmVyKCkge1xuICAgIGlmICghdGhpcy5fc3Bpbm5lckNvbnRhaW5lcikgdGhpcy5fc3Bpbm5lckNvbnRhaW5lciA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNwaW5uZXItY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIHRoaXMuX3NwaW5uZXJDb250YWluZXI7XG4gIH1cblxuICBnZXQgcGVuZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nXztcbiAgfVxuXG4gIHNldHVwQXN5bmMoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LWFzeW5jJykpIHJldHVybjtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9hc3luY0NsaWNrKTtcbiAgfVxuXG4gIHJlc29sdmUoKSB7XG4gICAgaWYgKHRoaXMucGVuZGluZ18gPT09IGZhbHNlKSByZXR1cm47XG4gICAgdGhpcy5wZW5kaW5nXyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVNwaW5uZXIoKTtcbiAgfVxuXG4gIGFzeW5jQ2xpY2soZSkge1xuICAgIGlmICh0aGlzLnBlbmRpbmdfID09PSB0cnVlKSByZXR1cm47XG4gICAgdGhpcy5wZW5kaW5nXyA9IHRydWU7XG4gICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICB9XG5cbiAgc2hvd1NwaW5uZXIoKSB7XG4gICAgdGhpcy5fc2hvd1NwaW5uZXIgPSB0cnVlO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNob3ctc3Bpbm5lcicpO1xuICAgIGNvbnN0IGlzV2hpdGUgPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LXByaW1hcnknKSB8fCB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LXNlY29uZGFyeScpIHx8IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZXJyb3InKTtcbiAgICB0aGlzLnNwaW5uZXJDb250YWluZXIuaW5uZXJIVE1MID0gYDxtZHctY2lyY3VsYXItcHJvZ3Jlc3MgbWR3LW1vZGU9XCJpbmRldGVybWluYXRlXCIgbWR3LWRpYW1ldGVyPVwiMjRcIiBjbGFzcz1cIiR7aXNXaGl0ZSA/ICdtZHctd2hpdGUnIDogJ21kdy1ncmV5J31cIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTsgdG9wOiA2cHg7XCI+PC9tZHctY2lyY3VsYXItcHJvZ3Jlc3M+YDtcbiAgfVxuXG4gIGhpZGVTcGlubmVyKCkge1xuICAgIHRoaXMuX3Nob3dTcGlubmVyID0gZmFsc2U7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctc2hvdy1zcGlubmVyJyk7XG4gICAgdGhpcy5zcGlubmVyQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgY29ubmVjdEhSRUYoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSByZXR1cm47XG4gICAgdGhpcy5jaGVja0hSRUZBY3RpdmUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfY2hlY2tIUkVGQWN0aXZlKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9ocmVmQ2xpY2spO1xuICB9XG5cbiAgY2hlY2tIUkVGQWN0aXZlKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSkgcmV0dXJuO1xuICAgIGNvbnN0IGhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5sb2NhdGlvbi5oYXNoO1xuICAgIGlmIChocmVmID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8IGhyZWYgPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmLWFsdCcpKSB0aGlzLnNldEF0dHJpYnV0ZSgnYWN0aXZlJywgJ2FjdGl2ZScpO1xuICAgIGVsc2UgaWYgKGhhc2ggPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgaGFzaCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYtYWx0JykpIHRoaXMuc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAnYWN0aXZlJyk7XG4gICAgZWxzZSB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYWN0aXZlJyk7XG4gIH1cblxuICBocmVmQ2xpY2soKSB7XG4gICAgLy8gb3BlbiBpbiBuZXcgdGFiIC8gd2luZG93XG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSA9PT0gJ19ibGFuaycpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyksICdfYmxhbmsnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWR3LXNwaW5uZXItY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LWJ1dHRvbi1yaXBwbGVcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4wODkyOWVtO1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybSwgb3BhY2l0eTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjI1cmVtO1xuICAgICAgICBwYWRkaW5nOiAwIDhweCAwIDhweDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgICBtaW4td2lkdGg6IDY0cHg7XG5cbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1vbi1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1mdWxsLWhlaWdodCkge1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZnVsbC13aWR0aCkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdDo6YmVmb3JlLFxuICAgICAgOmhvc3Q6OmFmdGVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICB0b3A6IGNhbGMoNTAlIC0gMTAwJSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMTAwJSk7XG4gICAgICAgIHdpZHRoOiAyMDAlO1xuICAgICAgICBoZWlnaHQ6IDIwMCU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1mb3JlZ3JvdW5kKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3Q6OmJlZm9yZSB7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMTVtcyBsaW5lYXIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgMTVtcyBsaW5lYXI7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpob3Zlcikge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFtkaXNhYmxlZF0pIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS10ZXh0LWRpc2FibGVkLW9uLWJhY2tncm91bmQpO1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuICAgICAgOmhvc3Q6Oi1tb3otZm9jdXMtaW5uZXIge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDphY3RpdmUpIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWQpLFxuICAgICAgOmhvc3QoLm1kdy11bmVsZXZhdGVkKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kKTtcbiAgICAgICAgcGFkZGluZzogMCAxNnB4IDAgMTZweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWQpOjpiZWZvcmUsXG4gICAgICA6aG9zdCgubWR3LXVuZWxldmF0ZWQpOjpiZWZvcmUge1xuICAgICAgICBvcGFjaXR5OiAwLjA4O1xuICAgICAgfVxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWQpIHtcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCAycHggMnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXJhaXNlZDpob3ZlciksXG4gICAgICA6aG9zdCgubWR3LXJhaXNlZDpmb2N1cykge1xuICAgICAgICBib3gtc2hhZG93OiAwcHggMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDRweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWQ6YWN0aXZlKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWRbZGlzYWJsZWRdKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkge1xuICAgICAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zNyk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBwYWRkaW5nOiAwIDE0cHggMCAxNHB4O1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zaGFwZWQpIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1kZW5zZSkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZGVuc2UubWR3LXNoYXBlZCkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWljb24pIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYm90dG9tLW5hdmlnYXRpb24pIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIG1heC13aWR0aDogMTAwcHg7XG4gICAgICAgIHdpZHRoOiA1NnB4O1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgIHBhZGRpbmc6IDI4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctaWNvbikgOjpzbG90dGVkKG1kdy1pY29uKSB7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICAgIGRpcmVjdGlvbjogbHRyO1xuICAgICAgfVxuXG4gICAgICAvKiBtZHctaWNvbiAqL1xuICAgICAgOjpzbG90dGVkKG1kdy1pY29uKSB7XG4gICAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgICBoZWlnaHQ6IDE4cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC00cHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgICAgICBsaW5lLWhlaWdodDogMzZweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgOjpzbG90dGVkKHN2Zy5tZHctaWNvbikge1xuICAgICAgICBmaWxsOiBjdXJyZW50Q29sb3I7XG4gICAgICB9XG5cblxuICAgICAgLyogcHJpbWFyeSAqL1xuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctdW5lbGV2YXRlZCkgIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtcHJpbWFyeS1vbi1iYWNrZ3JvdW5kKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5Lm1kdy1vdXRsaW5lZCkge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KTo6YmVmb3JlLFxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KTo6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cblxuICAgICAgLyogc2Vjb25kYXJ5ICovXG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkubWR3LXJhaXNlZCksXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeS5tZHctdW5lbGV2YXRlZCkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS10ZXh0LXByaW1hcnktb24tcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5Lm1kdy1vdXRsaW5lZCkge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSk6OmJlZm9yZSxcbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KTo6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgLyogZXJyb3IgKi9cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvci5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctZXJyb3IubWR3LXVuZWxldmF0ZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS10ZXh0LXByaW1hcnktb24tcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IubWR3LW91dGxpbmVkKSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcik6OmJlZm9yZSxcbiAgICAgIDpob3N0KC5tZHctZXJyb3IpOjphZnRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpub3QoLm1kdy1ib3R0b20tbmF2aWdhdGlvbik6aG92ZXIpOjpiZWZvcmUge1xuICAgICAgICBvcGFjaXR5OiAwLjA0O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNob3ctc3Bpbm5lcikgc3Bhbi50ZXh0IHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgIH1cblxuICAgICAgLyogLS0tIFJpcHBsZSAtLS0gKi9cblxuICAgICAgLm1kdy1yaXBwbGUge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAubWR3LXJpcHBsZS5tZHctcmlwcGxlLXVuYm91bmRlZCB7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgfVxuXG4gICAgICAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtb24tcHJpbWFyeS0tcmdiKSwgMC4xNik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSwgdHJhbnNmb3JtIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1idXR0b24tcmlwcGxlLFxuICAgICAgLm1kdy1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cblxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1wcmltYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5Lm1kdy1yYWlzZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQsXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkubWR3LXVuZWxldmF0ZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeS5tZHctcmFpc2VkKSAubWR3LXJpcHBsZS1lbGVtZW50LFxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkubWR3LXVuZWxldmF0ZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguZXJyb3IubWR3LXJhaXNlZCkgLm1kdy1yaXBwbGUtZWxlbWVudCxcbiAgICAgIDpob3N0KC5lcnJvci5tZHctdW5lbGV2YXRlZCkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG5cbiAgICAgIC8qIGJvdHRvbSBuYXZpZ2F0aW9uICovXG4gICAgICA6aG9zdCgubWR3LWJvdHRvbS1uYXZpZ2F0aW9uKSBzcGFuLnRleHQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBsaW5lLWhlaWdodDogMTJweDtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWNhcmQnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWVsZXZhdGlvbi0xJyk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1jaGVja2JveCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgc3VwZXIoKTtcbiAgICAgdGhpcy5ib3VuZF9oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgfVxuXG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG5cbiAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbmRldGVybWluYXRlJykpIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpKSB0aGlzLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICAgZWxlbWVudDogdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICAgdHJpZ2dlckVsZW1lbnQ6IFt0aGlzLmlucHV0XSxcbiAgICAgICByYWRpdXM6IDIwLFxuICAgICAgIGNlbnRlcmVkOiB0cnVlXG4gICAgIH0pO1xuXG4gICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XG4gICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9oYW5kbGVDaGFuZ2UpO1xuICAgfVxuXG4gICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX2hhbmRsZUNoYW5nZSk7XG4gICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKTtcbiAgIH1cblxuICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgIHJldHVybiBbJ2NoZWNrZWQnLCAnaW5kZXRlcm1pbmF0ZScsICdkaXNhYmxlZCddO1xuICAgfVxuXG4gICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSByZXR1cm47XG4gICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgIH1cblxuICAgZ2V0IGlucHV0KCkge1xuICAgICBpZiAoIXRoaXMuaW5wdXRfKSB0aGlzLmlucHV0XyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgICByZXR1cm4gdGhpcy5pbnB1dF87XG4gICB9XG5cbiAgIGdldCBjaGVja2VkKCkge1xuICAgICByZXR1cm4gdGhpcy5pbnB1dC5jaGVja2VkO1xuICAgfVxuXG4gICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgICBpZiAodmFsdWUgPT09ICcnKSB2YWx1ZSA9IHRydWU7XG4gICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgICB0aGlzLmhhbmRsZUNoYW5nZSgpO1xuICAgfVxuXG4gICBnZXQgaW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgcmV0dXJuIHRoaXMuaW5wdXQuaW5kZXRlcm1pbmF0ZTtcbiAgIH1cblxuICAgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWUpIHtcbiAgICAgaWYgKHZhbHVlID09PSAnJykgdmFsdWUgPSB0cnVlO1xuICAgICB0aGlzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSB2YWx1ZTtcbiAgIH1cblxuICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgIHZhbHVlID0gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gJyc7XG4gICAgIGlmICh2YWx1ZSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgIGVsc2UgdGhpcy5pbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICB9XG5cbiAgIGhhbmRsZUNoYW5nZSgpIHtcbiAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICAgfVxuXG4gICB0b2dnbGUoKSB7XG4gICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICB9XG5cbiAgIHRlbXBsYXRlKCkge1xuICAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgPGRpdiBjbGFzcz1cIm1kdy1iYWNrZ3JvdW5kXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LWNoZWNrbWFya1wiPjwvZGl2PlxuICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1taXhlZG1hcmtcIj48L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXJpcHBsZSBtZHctY2hlY2tib3gtcmlwcGxlXCI+PC9kaXY+XG4gICAgIGA7XG4gICB9XG5cbiAgIHN0eWxlcygpIHtcbiAgICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIC5tZHctYmFja2dyb3VuZDo6YmVmb3JlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCwgMCk7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHdpbGwtY2hhbmdlOiBvcGFjaXR5LCB0cmFuc2Zvcm07XG4gICAgICB9XG5cbiAgICAgIC5tZHctYmFja2dyb3VuZCB7XG4gICAgICAgIGxlZnQ6IDExcHg7XG4gICAgICAgIHJpZ2h0OiBpbml0aWFsO1xuICAgICAgICBkaXNwbGF5OiAtbXMtaW5saW5lLWZsZXhib3g7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMTFweDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDQ1JTtcbiAgICAgICAgaGVpZ2h0OiA0NSU7XG4gICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yIDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSk7XG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFtkaXI9XCJydGxcIl0pIC5tZHctYmFja2dyb3VuZCB7XG4gICAgICAgIGxlZnQ6IGluaXRpYWw7XG4gICAgICAgIHJpZ2h0OiAxMXB4O1xuICAgICAgfVxuXG4gICAgICAubWR3LWNoZWNrbWFyayB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB9XG5cbiAgICAgIC5tZHctY2hlY2ttYXJrOmFmdGVyIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiA0cHg7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgZGlzcGxheTogdGFibGU7XG4gICAgICAgIHdpZHRoOiA2LjY2NjY3cHg7XG4gICAgICAgIGhlaWdodDogMTMuMzMzMzNweDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci10b3A6IDA7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAwO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgfVxuXG4gICAgICBpbnB1dDppbmRldGVybWluYXRlICsgLm1kdy1iYWNrZ3JvdW5kIC5tZHctY2hlY2ttYXJrIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA5MG1zIDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICBpbnB1dDppbmRldGVybWluYXRlICsgLm1kdy1iYWNrZ3JvdW5kIC5tZHctbWl4ZWRtYXJrIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMCkgcm90YXRlKDBkZWcpO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA5MG1zIDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpO1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjZmZmO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkge1xuICAgICAgICAubWl4ZWRtYXJrIHtcbiAgICAgICAgICBtYXJnaW46IDAgMXB4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBhdGgge1xuICAgICAgICB0cmFuc2l0aW9uOiBzdHJva2UtZGFzaG9mZnNldCAxODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XG4gICAgICAgIHN0cm9rZS13aWR0aDogMy4xMnB4O1xuICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjkuNzgzMzQ7XG4gICAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDI5Ljc4MzM0O1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIGlucHV0IC0tLSAqL1xuXG4gICAgICBpbnB1dCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIGN1cnNvcjogaW5oZXJpdDtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6ZW5hYmxlZDpub3QoOmNoZWNrZWQpOm5vdCg6aW5kZXRlcm1pbmF0ZSkgKyAubWR3LWJhY2tncm91bmQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlcik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuXG4gICAgICBpbnB1dDpkaXNhYmxlZDpub3QoOmNoZWNrZWQpOm5vdCg6aW5kZXRlcm1pbmF0ZSkgKyAubWR3LWJhY2tncm91bmQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlcmRpc2FibGVkKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6ZGlzYWJsZWQ6Y2hlY2tlZCArIC5tZHctYmFja2dyb3VuZCxcbiAgICAgIGlucHV0OmRpc2FibGVkOmluZGV0ZXJtaW5hdGUgKyAubWR3LWJhY2tncm91bmQge1xuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtY2hlY2tib3hib3JkZXJkaXNhYmxlZCk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0OmNoZWNrZWQgKyAubWR3LWJhY2tncm91bmQsXG4gICAgICBpbnB1dDppbmRldGVybWluYXRlICsgLm1kdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDkwbXMgMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yIDkwbXMgMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dDpjaGVja2VkICsgLm1kdy1iYWNrZ3JvdW5kIHBhdGgsXG4gICAgICBpbnB1dDppbmRldGVybWluYXRlICsgLm1kdy1iYWNrZ3JvdW5kIHBhdGgge1xuICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMDtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6Zm9jdXMgKyAubWR3LWJhY2tncm91bmQ6OmJlZm9yZSB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMi43NSwgMi43NSk7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA4MG1zIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbiAgICAgICAgb3BhY2l0eTogMC4xMjtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6ZGlzYWJsZWQge1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG4gICAgICBpbnB1dDpjaGVja2VkICsgLm1kdy1iYWNrZ3JvdW5kIC5tZHctY2hlY2ttYXJrIHtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSAxODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB9XG5cbiAgICAgIGlucHV0OmNoZWNrZWQgKyAubWR3LWJhY2tncm91bmQgLm1kdy1taXhlZG1hcmsge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCAubWR3LWNoZWNrbWFyayB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSA5MG1zIDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCAubWR3LW1peGVkbWFyayB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpIHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQ6ZW5hYmxlZDpjaGVja2VkIH4gLm1kdy1iYWNrZ3JvdW5kLFxuICAgICAgaW5wdXQ6ZW5hYmxlZDppbmRldGVybWluYXRlIH4gLm1kdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgaW5wdXQ6ZW5hYmxlZDpjaGVja2VkIH4gLm1kdy1iYWNrZ3JvdW5kLFxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSBpbnB1dDplbmFibGVkOmluZGV0ZXJtaW5hdGUgfiAubWR3LWJhY2tncm91bmQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSBpbnB1dDplbmFibGVkOmNoZWNrZWQgfiAubWR3LWJhY2tncm91bmQsXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSBpbnB1dDplbmFibGVkOmluZGV0ZXJtaW5hdGUgfiAubWR3LWJhY2tncm91bmQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cblxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctY2hlY2tib3gtcmlwcGxlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuICAgIGA7XG4gICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWNpcmN1bGFyLXByb2dyZXNzJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmluc2VydGVkRGlhbWV0ZXJzID0gW107XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmRpYW1ldGVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy1kaWFtZXRlcicpIHx8IDEwMDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuc3R5bGUud2lkdGggPSB0aGlzLnN0eWxlLmhlaWdodCA9IHRoaXMuZGlhbWV0ZXIgKyAncHgnO1xuICAgIGlmICh0aGlzLnZhbHVlKSB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3ZhbHVlJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IGRpYW1ldGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kaWFtZXRlcjtcbiAgfVxuICBzZXQgZGlhbWV0ZXIodmFsdWUpIHtcbiAgICB0aGlzLl9kaWFtZXRlciA9IHBhcnNlSW50KCgnJyt2YWx1ZSkucmVwbGFjZSgncHgnLCAnJykpO1xuICAgIGlmICghdGhpcy5pbnNlcnRlZERpYW1ldGVyc1t0aGlzLl9kaWFtZXRlcl0pIHtcbiAgICAgIHRoaXMuaW5zZXJ0ZWREaWFtZXRlcnMucHVzaCh0aGlzLl9kaWFtZXRlcik7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc3R5bGUnKS5zaGVldC5pbnNlcnRSdWxlKHRoaXMuX2dldEFuaW1hdGlvblRleHQoKSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN2ZygpIHtcbiAgICBpZiAoIXRoaXMuX3N2ZykgdGhpcy5fc3ZnID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgIHJldHVybiB0aGlzLl9zdmc7XG4gIH1cblxuICBnZXQgc3Ryb2tlV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cm9rZVdpZHRoIHx8IHRoaXMuZGlhbWV0ZXIgLyAxMDtcbiAgfVxuICBzZXQgc3RyaWtlV2lkdGgodmFsdWUpIHtcbiAgICB0aGlzLl9zdHJva2VXaWR0aCA9IHBhcnNlSW50KCgnJyt2YWx1ZSkucmVwbGFjZSgncHgnLCAnJykpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcGFyc2VJbnQoKCcnK3ZhbHVlKS5yZXBsYWNlKCdweCcsICcnKSkpKTtcbiAgICBpZiAodGhpcy5kaWFtZXRlciA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgdGhpcy5jaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9ICh0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlICogKDEwMCAtIHRoaXMuX3ZhbHVlKSAvIDEwMCkgKyAncHgnO1xuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctbW9kZScpID09PSAnZGV0ZXJtaW5hdGUnID8gJ2RldGVybWluYXRlJyA6ICdpbmRldGVybWluYXRlJztcbiAgfVxuXG4gIGdldCBjaXJjbGUoKSB7XG4gICAgaWYgKCF0aGlzLl9jaXJjbGUpIHRoaXMuX2NpcmNsZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdjaXJjbGUnKTtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlO1xuICB9XG5cbiAgZ2V0IF9jaXJjbGVSYWRpdXMoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRpYW1ldGVyIC0gMTApIC8gMjtcbiAgfVxuXG4gIGdldCBfY2lyY2xlU3Ryb2tlV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Ryb2tlV2lkdGggLyB0aGlzLmRpYW1ldGVyICogMTAwO1xuICB9XG5cbiAgZ2V0IF9zdHJva2VDaXJjdW1mZXJlbmNlKCkge1xuICAgIHJldHVybiAyICogTWF0aC5QSSAqIHRoaXMuX2NpcmNsZVJhZGl1cztcbiAgfVxuXG4gIGdldCBJTkRFVEVSTUlOQVRFX0FOSU1BVElPTl9URU1QTEFURSgpIHtcbiAgICByZXR1cm4gYFxuICAgICBAa2V5ZnJhbWVzIG1hdC1wcm9ncmVzcy1zcGlubmVyLXN0cm9rZS1yb3RhdGUtRElBTUVURVIge1xuICAgICAgICAwJSAgICAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGUoMCk7IH1cbiAgICAgICAgMTIuNSUgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlKDApOyB9XG4gICAgICAgIDEyLjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSg3Mi41ZGVnKTsgfVxuICAgICAgICAyNSUgICAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDcyLjVkZWcpOyB9XG4gICAgICAgIDI1LjAwMDElICAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpOyB9XG4gICAgICAgIDM3LjUlICAgeyBzdHJva2UtZGFzaG9mZnNldDogRU5EX1ZBTFVFOyAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpOyB9XG4gICAgICAgIDM3LjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7IH1cbiAgICAgICAgNTAlICAgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7IH1cbiAgICAgICAgNTAuMDAwMSUgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA2Mi41JSAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA2Mi41MDAxJSAgeyBzdHJva2UtZGFzaG9mZnNldDogRU5EX1ZBTFVFOyAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMjUxLjVkZWcpOyB9XG4gICAgICAgIDc1JSAgICAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMjUxLjVkZWcpOyB9XG4gICAgICAgIDc1LjAwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTsgfVxuICAgICAgICA4Ny41JSAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDg3LjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgzNDEuNWRlZyk7IH1cbiAgICAgICAgMTAwJSAgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgzNDEuNWRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgX2dldEFuaW1hdGlvblRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuSU5ERVRFUk1JTkFURV9BTklNQVRJT05fVEVNUExBVEVcbiAgICAgIC5yZXBsYWNlKC9TVEFSVF9WQUxVRS9nLCBgJHswLjk1ICogdGhpcy5fc3Ryb2tlQ2lyY3VtZmVyZW5jZX1gKVxuICAgICAgLnJlcGxhY2UoL0VORF9WQUxVRS9nLCBgJHswLjIgKiB0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlfWApXG4gICAgICAucmVwbGFjZSgvRElBTUVURVIvZywgYCR7dGhpcy5kaWFtZXRlcn1gKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3ZnIHN0eWxlPVwid2lkdGg6ICR7dGhpcy5kaWFtZXRlcn1weDsgaGVpZ2h0OiAke3RoaXMuZGlhbWV0ZXJ9cHg7XCI+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIjUwJVwiXG4gICAgICAgICAgY3k9XCI1MCVcIlxuICAgICAgICAgIHI9XCIke3RoaXMuX2NpcmNsZVJhZGl1c31cIlxuICAgICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgICBhbmltYXRpb24tbmFtZTogbWF0LXByb2dyZXNzLXNwaW5uZXItc3Ryb2tlLXJvdGF0ZS0ke3RoaXMuZGlhbWV0ZXJ9O1xuICAgICAgICAgICAgc3Ryb2tlLWRhc2hhcnJheTogJHt0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlfXB4O1xuICAgICAgICAgICAgc3Ryb2tlLXdpZHRoOiAke3RoaXMuX2NpcmNsZVN0cm9rZVdpZHRofSU7XG4gICAgICAgICAgXCJcbiAgICAgICAgICA+PC9jaXJjbGU+XG4gICAgICA8L3N2Zz5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIHN2ZyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgfVxuXG4gICAgICBjaXJjbGUge1xuICAgICAgICBmaWxsOiB0cmFuc3BhcmVudDtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiBzdHJva2UtZGFzaG9mZnNldCAyMjVtcyBsaW5lYXI7XG4gICAgICAgIHN0cm9rZTogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXdoaXRlKSBjaXJjbGUge1xuICAgICAgICBzdHJva2U6IHdoaXRlO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWdyZXkpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogZ3JleTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW21kdy1tb2RlPSdpbmRldGVybWluYXRlJ10pIHtcbiAgICAgICAgYW5pbWF0aW9uOiBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lci1saW5lYXItcm90YXRlIDIwMDBtcyBsaW5lYXIgaW5maW5pdGU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFttZHctbW9kZT0naW5kZXRlcm1pbmF0ZSddKSBjaXJjbGUge1xuICAgICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBzdHJva2U7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwMG1zO1xuICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSk7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG1hdC1wcm9ncmVzcy1zcGlubmVyLWxpbmVhci1yb3RhdGUge1xuICAgICAgICAwJSAgICAgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgICAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG1hdC1wcm9ncmVzcy1zcGlubmVyLXN0cm9rZS1yb3RhdGUtMTAwIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gICAgICAgIH1cbiAgICAgICAgMTIuNSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gICAgICAgIH1cbiAgICAgICAgMTIuNTAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDcyLjVkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDI1JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoNzIuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMjUuMDAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAzNy41JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDM3LjUwMDElIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjY4LjYwNjE3MTU3NXB4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNTAuMDAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA2Mi41JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDYyLjUwMDElIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgyNTEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjY4LjYwNjE3MTU3NXB4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgyNTEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNzUuMDAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDg3LjUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA4Ny41MDAxJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMzQxLjVkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDM0MS41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCAnLi9zZXJ2aWNlLmpzJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctZGlhbG9nJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSA9IHRoaXMub25QYW5lbENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbGlja091dHNpZGVDbG9zZV8gPSBmYWxzZTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuXG4gICAgaWYgKHRoaXMuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICB0aGlzLmJhY2tkcm9wID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwYW5lbCgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWxfKSB0aGlzLnBhbmVsXyA9IHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJyk7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxfO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uXyB8fCAnY2VudGVyIGNlbnRlcic7XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLnBvc2l0aW9uXyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNsaWNrT3V0c2lkZUNsb3NlKCkge1xuICAgIHJldHVybiB0aGlzLmNsaWNrT3V0c2lkZUNsb3NlXztcbiAgfVxuXG4gIHNldCBjbGlja091dHNpZGVDbG9zZSh2YWx1ZSkge1xuICAgIHRoaXMuY2xpY2tPdXRzaWRlQ2xvc2VfID0gdmFsdWU7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMucGFuZWwuaG9pc3RUb0JvZHkoKTtcbiAgICB0aGlzLnBhbmVsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIHRoaXMucGFuZWwub3BlbigpO1xuICAgIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNob3cnKTtcbiAgICAvLyBUT0RPIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGhhbmRsZSBwb3NpdGlvbmluZyBhZ2FpbnN0IGJvZHkuXG4gICAgLy8gdGhpcy5wYW5lbC5zZXRQb3NpdGlvblN0eWxlKGRvY3VtZW50LmJvZHkpO1xuXG4gICAgdGhpcy5iYWNrZHJvcCA9IE1EV1V0aWxzLmFkZEJhY2tkcm9wKHRoaXMucGFuZWwsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNsaWNrT3V0c2lkZUNsb3NlID09PSB0cnVlKSB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgTURXVXRpbHMubG9ja1BhZ2VTY3JvbGwoKTtcbiAgfVxuXG4gIGNsb3NlKG9rKSB7XG4gICAgdGhpcy5wYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgdGhpcy5wYW5lbC5jbG9zZSgpO1xuICAgIE1EV1V0aWxzLnVubG9ja1BhZ2VTY3JvbGwoKTtcbiAgICB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgIHRoaXMuYmFja2Ryb3AgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kaXNwYXRjaENsb3NlKG9rKTtcbiAgfVxuXG4gIG9uUGFuZWxDbG9zZSgpIHtcbiAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25QYW5lbENsb3NlKTtcbiAgICBpZiAodGhpcy5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5iYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2hDbG9zZShpc09rID0gZmFsc2UpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjbG9zZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBvazogaXNPa1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxufSk7XG4iLCJjb25zdCBNRFdEaWFsb2cgPSBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmN1cnJlbnREaWFsb2cgPSBudWxsO1xuICB9XG5cbiAgc2hvdyh7IHRpdGxlLCBtZXNzYWdlLCBva0xhYmVsLCBjYW5jZWxMYWJlbCwgcG9zaXRpb24gPSAnY2VudGVyIGNlbnRlcicsIGNsaWNrT3V0c2lkZUNsb3NlID0gZmFsc2UgfSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy51aWQoKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7IGlkLCB0aXRsZSwgbWVzc2FnZSwgb2tMYWJlbCwgY2FuY2VsTGFiZWwsIHBvc2l0aW9uIH0pO1xuXG4gICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGVtcGxhdGUpO1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcbiAgICAgIGNvbnN0IG9uY2xvc2UgPSAoZSkgPT4ge1xuICAgICAgICByZXNvbHZlKGUuZGV0YWlsLm9rKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICAgICAgZWwucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudERpYWxvZyA9IG51bGw7XG4gICAgICB9O1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICAgIGVsLmNsaWNrT3V0c2lkZUNsb3NlID0gY2xpY2tPdXRzaWRlQ2xvc2U7XG4gICAgICB0aGlzLmN1cnJlbnREaWFsb2cgPSBlbDtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsLnNob3coKTtcbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ3VycmVudCgpIHtcbiAgICB0aGlzLmN1cnJlbnREaWFsb2cuY2xvc2UoKTtcbiAgfVxuXG4gIHVpZCgpIHtcbiAgICByZXR1cm4gYGRpYWxvZ18ke3BhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA5OTk5OSl9YDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgaWQsIHRpdGxlLCBtZXNzYWdlLCBva0xhYmVsLCBjYW5jZWxMYWJlbCwgcG9zaXRpb24gfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8bWR3LWRpYWxvZyBpZD1cIiR7aWR9XCI+XG4gICAgICAgIDxtZHctcGFuZWwgbWR3LXBvc2l0aW9uPVwiJHtwb3NpdGlvbn1cIj5cbiAgICAgICAgICA8bWR3LWRpYWxvZy1jb250YWluZXI+XG4gICAgICAgICAgICAkeyEhdGl0bGUgPyBgPG1kdy1kaWFsb2ctdGl0bGU+JHt0aXRsZX08L21kdy1kaWFsb2ctdGl0bGU+YCA6ICcnfVxuICAgICAgICAgICAgPG1kdy1kaWFsb2ctY29udGVudD4ke21lc3NhZ2V9PC9tZHctZGlhbG9nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bWR3LWRpYWxvZy1hY3Rpb25zPlxuICAgICAgICAgICAgICAkeyEhY2FuY2VsTGFiZWwgPyBgPG1kdy1idXR0b24gY2xhc3M9XCJtZHctZXJyb3JcIiBvbmNsaWNrPVwiJHtpZH0uY2xvc2UoZmFsc2UpXCI+JHtjYW5jZWxMYWJlbH08L21kdy1idXR0b24+YCA6ICcnfVxuICAgICAgICAgICAgICAkeyEhb2tMYWJlbCA/IGA8bWR3LWJ1dHRvbiBvbmNsaWNrPVwiJHtpZH0uY2xvc2UodHJ1ZSlcIj4ke29rTGFiZWx9PC9tZHctYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgICAgIDwvbWR3LWRpYWxvZy1hY3Rpb25zPlxuICAgICAgICAgIDwvbWR3LWRpYWxvZy1jb250YWluZXI+XG4gICAgICAgIDwvbWR3LXBhbmVsPlxuICAgICAgPC9tZHctZGlhbG9nPlxuICAgIGA7XG4gIH1cbn1cblxud2luZG93Lk1EV0RpYWxvZyA9IE1EV0RpYWxvZztcblxuZXhwb3J0IGRlZmF1bHQgTURXRGlhbG9nO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctZHJhd2VyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX25hdmlnYXRpb25DaGFuZ2UgPSB0aGlzLm5hdmlnYXRpb25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmlzU2hvd2luZyA9IHRydWU7XG4gICAgdGhpcy5pc1JpZ2h0QWxpZ25lZCA9IHRoaXMuaGFzQXR0cmlidXRlKCdyaWdodC1hbGlnbmVkJyk7XG4gICAgY29uc3QgZml4ZWRFbCA9IHRoaXMuZml4ZWRFbGVtZW50O1xuICAgIGlmIChmaXhlZEVsKSBmaXhlZEVsLnN0eWxlLndpZHRoID0gYCR7dGhpcy5vZmZzZXRXaWR0aH1weGA7XG5cbiAgICAvLyBhZGQgc3BhY2luZyBmb3Igc2Nyb2xsXG4gICAgaWYgKHRoaXMuY29udGVudEVsZW1lbnQpIHRoaXMuY29udGVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoMTAwJSAtICR7dGhpcy5jb250ZW50RWxlbWVudC5vZmZzZXRUb3AgKyAxOH1weClgO1xuXG4gICAgdGhpcy5zZXR1cEljb25CYXIoKTtcblxuICAgIHRoaXMubG9ja0JvZHkoKTtcbiAgICB0aGlzLmFkZENsb3NlT25DaGFuZ2UoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWFjdGl2ZScpO1xuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgdGhpcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctbG9ja2VkLW9wZW4tbW9iaWxlJykpIHtcbiAgICAgICAgdGhpcy51bmxvY2tPcGVuKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9uYXZpZ2F0aW9uQ2hhbmdlKTtcbiAgfVxuXG4gIGdldCBpc0xvY2tlZE9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctbG9ja2VkLW9wZW4nKTtcbiAgfVxuXG4gIGdldCBoZWFkZXJFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1kcmF3ZXItaGVhZGVyJyk7XG4gIH1cblxuICBnZXQgY29udGVudEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWRyYXdlci1jb250ZW50Jyk7XG4gIH1cblxuICBnZXQgaWNvbkJhckVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWRyYXdlci1pY29uLWJhcicpO1xuICB9XG5cbiAgZ2V0IGZpeGVkRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctZHJhd2VyLWZpeGVkJyk7XG4gIH1cblxuICBhZGRDbG9zZU9uQ2hhbmdlKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9uYXZpZ2F0aW9uQ2hhbmdlKTtcbiAgfVxuXG4gIGxvY2tPcGVuKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gIH1cblxuICB1bmxvY2tPcGVuKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gIH1cblxuICBuYXZpZ2F0aW9uQ2hhbmdlKCkge1xuICAgIGlmICghdGhpcy5pc0xvY2tlZE9wZW4pIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1jbG9zZWQnKTtcbiAgICBpZiAodGhpcy5pc0xvY2tlZE9wZW4pIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gICAgICB0aGlzLndhc0xvY2tlZE9wZW4gPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuXG4gICAgaWYgKCF0aGlzLmljb25CYXJFbGVtZW50KSByZXR1cm47XG4gICAgdGhpcy5pY29uQmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdycpO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcbiAgICAgIHRoYXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZSk7XG4gICAgICB0aGF0LmNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21kdy1oaWRlJyk7XG4gICAgICB0aGF0LmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWhpZGUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctY2xvc2VkJyk7XG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgY2FsYygxMDAlIC0gJHt0aGlzLmNvbnRlbnRFbGVtZW50Lm9mZnNldFRvcH1weClgO1xuICAgIGlmICh0aGlzLndhc0xvY2tlZE9wZW4pIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gICAgZWxzZSBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHRoaXMuYWRkQmFja2Ryb3AoKTtcbiAgICB0aGlzLmlzU2hvd2luZyA9IHRydWU7XG5cbiAgICAvLyBhZGQgc3BhY2luZyBmb3Igc2Nyb2xsXG4gICAgaWYgKHRoaXMuY29udGVudEVsZW1lbnQpIHRoaXMuY29udGVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoMTAwJSAtICR7dGhpcy5jb250ZW50RWxlbWVudC5vZmZzZXRUb3AgKyAxOH1weClgO1xuXG4gICAgaWYgKCF0aGlzLmljb25CYXJFbGVtZW50KSByZXR1cm47XG4gICAgdGhpcy5pY29uQmFyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctc2hvdycpO1xuICAgIHRoaXMuY29udGVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWhpZGUnKTtcbiAgICB0aGlzLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWhpZGUnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTaG93aW5nKSB0aGlzLnNob3coKTtcbiAgICBlbHNlIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgYWRkQmFja2Ryb3AoKSB7XG4gICAgdGhpcy5iYWNrZHJvcCA9IE1EV1V0aWxzLmFkZEJhY2tkcm9wKHRoaXMsICgpID0+IHRoaXMuaGlkZSgpLCB7IGRyYXdlcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIC8vIHRoaXMgbWFrZXMgc3VyZSB0aGVyZSBhcmUgbm8gc2Nyb2xsaW5nIGlzc3VlcyBpZiB0aGUgZHJhd2VyIGlzIGxvY2tlZCBvcGVuIGFuZCB5b3Ugd2FudCBpdCBmaXhlZFxuICBsb2NrQm9keSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmlzTG9ja2VkT3BlbiAvLyBpcyBpbiBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAmJiB0aGlzLmZpeGVkRWxlbWVudCAvLyBzaG91bGQgYmUgZml4ZWRcbiAgICAgICYmIHRoaXMucGFyZW50Tm9kZSA9PT0gZG9jdW1lbnQuYm9keSAvLyBkcmF3IGlzIGRpcmVjdGx5IGluIGJvZHlcbiAgICAgICYmICFNRFdVdGlscy5pc01vYmlsZSAvLyBvbmx5IHZhbGlkIGluIG5vbiBtb2JpbGVcbiAgICAgICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlID4gbWR3LWNvbnRlbnQnKSAvLyBjb250YWlucyBuZXNzYWNhcnkgZWxlbWVudHMgdG8gbWFrZSBzdXJlIHNjcm9sbGluZyB3aWxsIHN0aWxsIHdvcmtcbiAgICApIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncHJldmVudC1vdmVyLXNjcm9sbCcpO1xuICB9XG5cblxuICAvLyB5b3UgY2FuIGFkZCBhbiBpY29uYmFyLlxuICAvLyB3aGVuIHRoZSBkcmF3ZXIgaXMgY2xvc2VkIGl0IHdpbGwgbWluaW1pemUgdG8gc2hvdyB0aGUgaWNvbiBiYXIgaW5zdGVhZCBvZiBjb21wbGV0bHkgaGlkaW5nXG4gIHNldHVwSWNvbkJhcigpIHtcbiAgICBjb25zdCBpY29uQmFyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctZHJhd2VyLWljb24tYmFyJyk7XG4gICAgaWYgKCFpY29uQmFyKSByZXR1cm47XG5cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1oYXMtaWNvbi1iYXInKTtcbiAgICB0aGlzLmhhc0ljb25CYXIgPSB0cnVlO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctZmFiJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2FzeW5jQ2xpY2sgPSB0aGlzLmFzeW5jQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICB0aGlzLnNldHVwQXN5bmMoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG5cbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWR3LXNwaW5uZXItY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LWZhYi1yaXBwbGVcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgZ2V0IGRlbnNlKCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWRlbnNlJyk7XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMuX3NwaW5uZXJDb250YWluZXIpIHRoaXMuX3NwaW5uZXJDb250YWluZXIgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zcGlubmVyLWNvbnRhaW5lcicpO1xuICAgIHJldHVybiB0aGlzLl9zcGlubmVyQ29udGFpbmVyO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgaWYgKCEhdmFsdWUgfHwgdmFsdWUgPT09ICcnKSB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IHBlbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ187XG4gIH1cblxuICBzZXR1cEFzeW5jKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1hc3luYycpKSByZXR1cm47XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG4gIH1cblxuICByZXNvbHZlKCkge1xuICAgIGlmICh0aGlzLnBlbmRpbmdfID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVTcGlubmVyKCk7XG4gIH1cblxuICBhc3luY0NsaWNrKGUpIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nXyA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSB0cnVlO1xuICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgfVxuXG4gIGdldCBzcGlubmVyU3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiAncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKDUwJSAtIDEycHgpOyB0b3A6IDhweDsnO1xuICAgIHJldHVybiAncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKDUwJSAtIDE2cHgpOyB0b3A6IDEycHg7JztcbiAgfVxuXG4gIGdldCBzcGlubmVyRGlhbWV0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiAyNDtcbiAgICByZXR1cm4gMzI7XG4gIH1cblxuICBzaG93U3Bpbm5lcigpIHtcbiAgICB0aGlzLl9zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdy1zcGlubmVyJyk7XG4gICAgY29uc3QgaXNXaGl0ZSA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctcHJpbWFyeScpIHx8IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctc2Vjb25kYXJ5JykgfHwgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1lcnJvcicpO1xuICAgIHRoaXMuc3Bpbm5lckNvbnRhaW5lci5pbm5lckhUTUwgPSBgPG1kdy1jaXJjdWxhci1wcm9ncmVzcyBtZHctbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBtZHctZGlhbWV0ZXI9XCIke3RoaXMuc3Bpbm5lckRpYW1ldGVyfVwiIGNsYXNzPVwiJHtpc1doaXRlID8gJ21kdy13aGl0ZScgOiAnbWR3LWdyZXknfVwiIHN0eWxlPVwiJHt0aGlzLnNwaW5uZXJTdHlsZX1cIj48L21kdy1jaXJjdWxhci1wcm9ncmVzcz5gO1xuICB9XG5cbiAgaGlkZVNwaW5uZXIoKSB7XG4gICAgdGhpcy5fc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zaG93LXNwaW5uZXInKTtcbiAgICB0aGlzLnNwaW5uZXJDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0KC5tZHctc2hvdy1zcGlubmVyKSBzcGFuLnRleHQge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LWZhYi1yaXBwbGUsXG4gICAgICAubWR3LWZhYi1mb2N1cy1vdmVybGF5IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtYmFja2dyb3VuZC0tcmdiKSwgMC4xNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1pY29uJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1zcmMnKSkgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBzcmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctc3JjJyk7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdNYXRlcmlhbCBJY29ucyc7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICAgIGRpcmVjdGlvbjogbHRyO1xuICAgICAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcbiAgICAgICAgLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcbiAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IGltZyB7XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG5cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICBjb25zdCBzcmMgPSB0aGlzLnNyYztcbiAgICBpZiAoc3JjKSByZXR1cm4gYDxpbWcgc3JjPVwiJHtzcmN9XCI+PC9pbWc+YDtcbiAgICByZXR1cm4gJzxzbG90Pjwvc2xvdD4nO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWxpbmVhci1wcm9ncmVzcycsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5wZXJjZW50ID09PSBudWxsKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1xdWVyeScpXG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydtZHctcGVyY2VudCddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBzd2l0Y2gobmFtZSkge1xuICAgICAgY2FzZSAnbWR3LXBlcmNlbnQnOlxuICAgICAgICB0aGlzLnBlcmNlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhcigpIHtcbiAgICBpZiAoIXRoaXMuX2JhcikgdGhpcy5fYmFyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctYmFyJyk7XG4gICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgfVxuXG4gIGdldCBwZXJjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LXBlcmNlbnQnKTtcbiAgfVxuXG4gIHNldCBwZXJjZW50KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xuICAgIGlmICh2YWx1ZSA+IDEwMCkgdmFsdWUgPSAxMDA7XG4gICAgdGhpcy5iYXIuc3R5bGUud2lkdGggPSBgJHt2YWx1ZX0lYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1iYXJcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICAubWR3LWJhciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXdoaXRlKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xOCk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctd2hpdGUpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZ3JleSkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUwLCA1MCwgNTAsIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWdyZXkpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1yZ2IpLCAwLjE4KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LWJhciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3QoLm1kdy1xdWVyeSkgLm1kdy1iYXIge1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XG4gICAgICAgIGFuaW1hdGlvbjogcXVlcnkgLjhzIGluZmluaXRlIGN1YmljLWJlemllcigwLjM5MCwgMC41NzUsIDAuNTY1LCAxLjAwMCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcXVlcnkge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzUlKSBzY2FsZSguMywgMSk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgc2NhbGUoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctbGlzdC1pdGVtJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2hyZWZDbGljayA9IHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vblNlbGVjdCA9IHRoaXMub25TZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QgPSB0aGlzLm9uY2xpY2tTZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2NoZWNrSFJFRkFjdGl2ZSA9IHRoaXMuY2hlY2tIUkVGQWN0aXZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXQgbGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlO1xuICB9XG5cbiAgaXNTZWxlY3QoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5saXN0LnNlbGVjdFR5cGU7XG4gIH1cblxuICBzZWxlY3RPbmNsaWNrKCkge1xuICAgIHJldHVybiAhIXRoaXMubGlzdC5zZWxlY3RPbmNsaWNrO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5jb25uZWN0UmlwcGxlKCk7XG4gICAgdGhpcy5jb25uZWN0SFJFRigpO1xuICAgIHRoaXMuY29ubmVjdFNlbGVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMucmlwcGxlKSB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaHJlZkNsaWNrKTtcbiAgICBpZiAodGhpcy5zZWxlY3RFbF8pIHRoaXMuc2VsZWN0RWxfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfb25TZWxlY3QpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9jaGVja0hSRUZBY3RpdmUpO1xuICB9XG5cbiAgY29ubmVjdFJpcHBsZSgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWR3LXJpcHBsZScpO1xuICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50LFxuICAgICAgdHJpZ2dlckVsZW1lbnQ6IHRoaXNcbiAgICB9KTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1oYXMtcmlwcGxlJyk7XG4gIH1cblxuICBjb25uZWN0SFJFRigpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdocmVmJykpIHJldHVybjtcbiAgICB0aGlzLmNoZWNrSFJFRkFjdGl2ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9jaGVja0hSRUZBY3RpdmUpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2hyZWZDbGljayk7XG4gIH1cblxuICBjaGVja0hSRUZBY3RpdmUoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSByZXR1cm47XG4gICAgY29uc3QgaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gICAgY29uc3QgaGFzaCA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2g7XG4gICAgaWYgKGhyZWYgPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgaHJlZiA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYtYWx0JykpIHRoaXMuc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAnYWN0aXZlJyk7XG4gICAgZWxzZSBpZiAoaGFzaCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBoYXNoID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZi1hbHQnKSkgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FjdGl2ZScsICdhY3RpdmUnKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhY3RpdmUnKTtcbiAgfVxuXG4gIGhyZWZDbGljaygpIHtcbiAgICAvLyBvcGVuIGluIG5ldyB0YWIgLyB3aW5kb3dcbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpID09PSAnX2JsYW5rJykge1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSwgJ19ibGFuaycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICB9XG5cbiAgb25TZWxlY3QoZSkge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB0aGlzLmxpc3QuaXRlbVNlbGVjdGVkKHRoaXMpO1xuICAgIGVsc2UgdGhpcy5saXN0Lml0ZW1EZXNlbGVjdGVkKHRoaXMpO1xuICB9XG5cbiAgb25jbGlja1NlbGVjdChlKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE9uY2xpY2soKSkgcmV0dXJuO1xuICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5zZWxlY3RFbF8pIHJldHVybjtcbiAgICB0aGlzLnNlbGVjdEVsXy5jaGVja2VkID0gIXRoaXMuc2VsZWN0RWxfLmNoZWNrZWQ7XG4gIH1cblxuICBjb25uZWN0U2VsZWN0KCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0RWxfID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctY2hlY2tib3gnKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdEVsXykgdGhpcy5zZWxlY3RFbF8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vblNlbGVjdCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RPbmNsaWNrKCkpIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VsZWN0KCkge1xuICAgIHRoaXMuc2VsZWN0RWxfLmNoZWNrZWQgPSBmYWxzZTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1saXN0JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhlc18gPSBbXTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21kdy1zZWxlY3QnLCAnbWR3LXNlbGVjdC1vbmNsaWNrJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgc3dpdGNoKG5hbWUpIHtcbiAgICAgIGNhc2UgJ21kdy1zZWxlY3QnOlxuICAgICAgICB0aGlzLnNlbGVjdFR5cGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtZHctc2VsZWN0LW9uY2xpY2snOlxuICAgICAgICB0aGlzLnNlbGVjdE9uY2xpY2sgPSBuZXdWYWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0IHNlbGVjdE9uY2xpY2sodmFsdWUpIHtcbiAgICB0aGlzLnNlbGVjdE9uY2xpY2tfID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc2VsZWN0T25jbGljaygpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RPbmNsaWNrXztcbiAgfVxuXG4gIHNldCBzZWxlY3RUeXBlKHZhbHVlKSB7XG4gICAgdGhpcy5zZWxlY3RUeXBlXyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHNlbGVjdFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0VHlwZV87XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCh0aGlzLnNlbGVjdGVkSW5kZXhlc18pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgWy4uLnRoaXMuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuZGVzZWxlY3QoKSk7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfID0gW107XG4gIH1cblxuICBpdGVtU2VsZWN0ZWQobGlzdEl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5jaGlsZHJlbiwgbGlzdEl0ZW0pO1xuICAgIGlmICh0aGlzLnNlbGVjdFR5cGVfID09PSAnc2luZ2xlJykge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbLi4udGhpcy5jaGlsZHJlbl07XG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXhlc18uZm9yRWFjaChpID0+IGNoaWxkcmVuW2ldLmRlc2VsZWN0KCkpO1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfID0gW107XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzXy5wdXNoKGluZGV4KTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSgpO1xuICB9XG5cbiAgaXRlbURlc2VsZWN0ZWQobGlzdEl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5jaGlsZHJlbiwgbGlzdEl0ZW0pO1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzXy5zcGxpY2UodGhpcy5zZWxlY3RlZEluZGV4ZXNfLmluZGV4T2YoaW5kZXgpLCAxKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSgpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHRoaXMpKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1tZW51JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYm91bmRfb25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25QYW5lbENsaWNrID0gdGhpcy5vblBhbmVsQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSA9PT0gdHJ1ZSkgdGhpcy5jcmVhdGVTaGVldCgpO1xuICAgIGVsc2UgdGhpcy5jcmVhdGVQYW5lbCgpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uQ2xpY2spO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wYW5lbC0tY29udGFpbmVyJyk7XG4gICAgICB0aGlzLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ21kdy1tZW51Jyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGljaygpIHtcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIHRoaXMucGFuZWwuc2V0UG9zaXRpb24odGhpcy5wYW5lbFBvc2l0aW9uKTtcbiAgICAgIHRoaXMucGFuZWwuYXV0b1Bvc2l0aW9uKCk7XG4gICAgICB0aGlzLnBhbmVsLmNsaWNrQm9keVRvQ2xvc2UoKTtcbiAgICAgIHRoaXMucGFuZWwub3Blbih0cnVlKTtcbiAgICAgIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hlZXQub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFuZWxDbGljaygpIHtcbiAgICB0aGlzLnBhbmVsLmNsb3NlKCk7XG4gIH1cblxuICBzZXQgcGFuZWxQb3NpdGlvbih2YWx1ZSkge1xuICAgIC8vIFRPRE8gdmFsaWRhdGVcbiAgICB0aGlzLnBhbmVsUG9zaXRpb25fID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGFuZWxQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbFBvc2l0aW9uXyB8fCAnaW5uZXItdG9wIGlubmVyLWxlZnQnO1xuICB9XG5cbiAgZ2V0IGJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXTtcbiAgfVxuXG4gIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctbWVudS1jb250ZW50Jyk7XG4gIH1cblxuICBnZXQgcGFuZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJyk7XG4gIH1cblxuICBnZXQgc2hlZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXNoZWV0Jyk7XG4gIH1cblxuICBjcmVhdGVTaGVldCgpIHtcbiAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgPG1kdy1zaGVldCBtZHctbW9kYWw+XG4gICAgICAgIDxtZHctc2hlZXQtY29udGVudD5cbiAgICAgICAgICAke3RoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MfVxuICAgICAgICA8L21kdy1zaGVldC1jb250ZW50PlxuICAgICAgPC9tZHctc2hlZXQ+XG4gICAgYCk7XG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgfVxuXG4gIGNyZWF0ZVBhbmVsKCkge1xuICAgIGlmICghdGhpcy5jb250ZW50RWxlbWVudCkgcmV0dXJuO1xuICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICA8bWR3LXBhbmVsPlxuICAgICAgICAke3RoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MfVxuICAgICAgPC9tZHctcGFuZWw+XG4gICAgYCk7XG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG4vKiAtLS0gbWR3LXBhbmVsIC0tLVxuICogVGhlIHBhbmVsIGFsbG93cyB5b3UgdG8gY3JlYXRlIHBvc2l0aW9ucyBmbG9hdGluZyBlbGVtZW50cy5cbiAqIG1kdy1wYW5lbCBpcyB1c2VkIGZvciBtZW51LCBkaWFsb2csIHRvb2x0aXBcbiAqL1xuXG4gLy8gVE9ETyBmaXggb3BlbiBhbmQgY2xvc2UgYW5pbWF0aW9uc1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctcGFuZWwnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuRk9DVVNBQkxFX0VMRU1FTlRTID0gW1xuICAgICAgJ2J1dHRvbjpub3QoOmRpc2FibGVkKScsICdbaHJlZl06bm90KFthcmlhLWRpc2FibGVkPVwidHJ1ZVwiXSknLCAnaW5wdXQ6bm90KDpkaXNhYmxlZCknLFxuICAgICAgJ3NlbGVjdDpub3QoOmRpc2FibGVkKScsICd0ZXh0YXJlYTpub3QoOmRpc2FibGVkKScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSk6bm90KFthcmlhLWRpc2FibGVkPVwidHJ1ZVwiXSknLFxuICAgIF0uam9pbignLCAnKTtcbiAgICB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMuX2JvdW5kSGFuZGxlQm9keUNsaWNrID0gdGhpcy5faGFuZGxlQm9keUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fYm91bmRIYW5kbGVLZXlkb3duID0gdGhpcy5faGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2NsaWNrT3V0c2lkZUNsb3NlSWdub3JFbGVtZW50ID0gW107XG4gICAgdGhpcy5fYXV0b1Bvc2l0aW9uID0gZmFsc2U7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy11cGdyYWRlZCcpO1xuICAgIHRoaXMudHJhbnNmb3JtUHJvcGVydHlOYW1lID0gTURXVXRpbHMudHJhbnNmb3JtUHJvcGVydHlOYW1lO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVCb2R5Q2xpY2tFdmVudF8oKTtcbiAgICB0aGlzLnJlbW92ZUtleWRvd25FdmVudF8oKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fb3BlbkFuaW1hdGlvbkVuZFRpbWVySWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWQpO1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvblJlcXVlc3RJZCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydtZHctcG9zaXRpb24nXTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBzd2l0Y2gobmFtZSkge1xuICAgICAgY2FzZSAnbWR3LXBvc2l0aW9uJzpcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0IGNsaWNrT3V0c2lkZUNsb3NlKHZhbHVlKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldCBzZXRRdWlja09wZW4odmFsdWUpIHtcbiAgICB0aGlzLl9pc1F1aWNrT3BlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlKSB7XG4gICAgY29uc3Qgc3BsaXQgPSB2YWx1ZS5zcGxpdCgnICcpO1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gYCR7c3BsaXRbMF0gfHwgJ3RvcCd9ICR7c3BsaXRbMV0gfHwgJ2xlZnQnfWA7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21kdy1wb3NpdGlvbicsIHRoaXMuX3Bvc2l0aW9uKTtcbiAgICB0aGlzLl9wb3NpdGlvblNldCA9IHRydWU7XG4gIH1cblxuICBhdXRvUG9zaXRpb24oKSB7XG4gICAgdGhpcy5fYXV0b1Bvc2l0aW9uID0gdHJ1ZTtcbiAgfVxuXG4gIGNsaWNrQm9keVRvQ2xvc2UoKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2UgPSB0cnVlO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gIH1cblxuICBvcGVuKGNsaWNrQm9keVRvQ2xvc2UpIHtcbiAgICBpZiAoY2xpY2tCb2R5VG9DbG9zZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IGNsaWNrQm9keVRvQ2xvc2U7XG4gICAgLy8gaGFuZGxlIGZvY3VzZWQgZWxlbWVudFxuICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuRk9DVVNBQkxFX0VMRU1FTlRTKTtcbiAgICB0aGlzLl9maXJzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIHRoaXMuc2F2ZUZvY3VzKCk7XG5cbiAgICAvLyBoYW5kbGUgYW5pbWF0aW9uXG4gICAgaWYgKCF0aGlzLl9pc1F1aWNrT3Blbikge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctcGFuZWwtLWFuaW1hdGluZy1vcGVuJyk7XG4gICAgICB0aGlzLl9hbmltYXRpb25SZXF1ZXN0SWQgPSB0aGlzLl9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1vcGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl9pc1F1aWNrT3BlbikgdGhpcy5ub3RpZnlPcGVuKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuX29wZW5BbmltYXRpb25FbmRUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuQW5pbWF0aW9uRW5kVGltZXJJZCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1wYW5lbC0tYW5pbWF0aW5nLW9wZW4nKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5T3BlbigpO1xuICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNIb2lzdGVkKSB0aGlzLnNldEhvaXNldGVkUG9zaXRpb24oKTtcbiAgICAgICAgZWxzZSB0aGlzLnNldFBvc2l0aW9uU3R5bGUoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1vcGVuJyk7XG4gICAgICBpZiAodGhpcy5faXNIb2lzdGVkKSB0aGlzLnNldEhvaXNldGVkUG9zaXRpb24oKTtcbiAgICAgIGVsc2UgdGhpcy5zZXRQb3NpdGlvblN0eWxlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRCb2R5Q2xpY2tFdmVudF8oKTtcbiAgICB0aGlzLmFkZEtleWRvd25FdmVudF8oKTtcbiAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xuICB9XG5cbiAgLy8gVE9ETyBGSVggVEhFIENMT1NJTkcgQU5JTUFUSU9OXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5faXNRdWlja09wZW4pIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXBhbmVsLS1hbmltYXRpbmctY2xvc2VkJyk7XG4gICAgICB0aGlzLnJlbW92ZUJvZHlDbGlja0V2ZW50XygpO1xuICAgICAgdGhpcy5fYW5pbWF0aW9uUmVxdWVzdElkID0gdGhpcy5fcnVuTmV4dEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctb3BlbicpO1xuICAgICAgICBpZiAodGhpcy5faXNRdWlja09wZW4pIHRoaXMubm90aWZ5Q2xvc2UoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2VBbmltYXRpb25FbmRUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctcGFuZWwtLWFuaW1hdGluZy1jbG9zZWQnKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlDbG9zZSgpO1xuICAgICAgICAgIH0sIDc1KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LW9wZW4nKTtcbiAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlS2V5ZG93bkV2ZW50XygpO1xuICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUm9vdEZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgIGNvbnN0IGNoaWxkSGFzRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHRoaXMuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgaWYgKGlzUm9vdEZvY3VzZWQgfHwgY2hpbGRIYXNGb2N1cykgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgfVxuXG4gIF9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZSk7XG4gICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfSk7XG4gIH1cblxuICBpc0ZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXM7XG4gIH1cblxuICBzYXZlRm9jdXMoKSB7XG4gICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICByZXN0b3JlRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiYgdGhpcy5fcHJldmlvdXNGb2N1cyAmJiB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKSB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKCk7XG4gIH1cblxuICBmb2N1c0ZpcnN0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ICYmIHRoaXMuX2ZpcnN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cykgdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKClcbiAgfVxuXG4gIGZvY3VzTGFzdEVsZW1lbnQoKSB7XG4gICAgaWYgKHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50ICYmIHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKSB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpXG4gIH1cblxuICBpc0ZpcnN0RWxlbWVudEZvY3VzZWQoKSB7XG4gICAgdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ID8gdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogZmFsc2U7XG4gIH1cblxuICBpc0xhc3RFbGVtZW50Rm9jdXNlZCgpIHtcbiAgICB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudCA/IHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogZmFsc2U7XG4gIH1cblxuICBhZGRCb2R5Q2xpY2tFdmVudF8oKSB7XG4gICAgaWYgKCF0aGlzLl9jbGlja091dHNpZGVDbG9zZSkgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oYXNCb2R5RXZlbnQgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2JvdW5kSGFuZGxlQm9keUNsaWNrKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHJlbW92ZUJvZHlDbGlja0V2ZW50XygpIHtcbiAgICBpZiAodGhpcy5oYXNCb2R5RXZlbnQpIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9ib3VuZEhhbmRsZUJvZHlDbGljayk7XG4gICAgdGhpcy5oYXNCb2R5RXZlbnQgPSBmYWxzZTtcbiAgfVxuXG4gIGFkZEtleWRvd25FdmVudF8oKSB7XG4gICAgdGhpcy5oYXNLZXlkb3duRXZlbnQgPSB0cnVlO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2JvdW5kSGFuZGxlS2V5ZG93bik7XG4gIH1cblxuICByZW1vdmVLZXlkb3duRXZlbnRfKCkge1xuICAgIGlmICh0aGlzLmhhc0tleWRvd25FdmVudCkgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fYm91bmRIYW5kbGVLZXlkb3duKTtcbiAgICB0aGlzLmhhc0tleWRvd25FdmVudCA9IGZhbHNlO1xuICB9XG5cbiAgaWdub3JlRWxlbWVudE9uQ2xpY2tUb0Nsb3NlKGVsKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2VJZ25vckVsZW1lbnQucHVzaChlbCk7XG4gIH1cblxuICBfaGFuZGxlQm9keUNsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgZWwgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKHRoaXMuX2NsaWNrT3V0c2lkZUNsb3NlSWdub3JFbGVtZW50LmluY2x1ZGVzKGVsKSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmNvbnRhaW5zKGVsKSkgcmV0dXJuO1xuICAgIHRoaXMucmVtb3ZlQm9keUNsaWNrRXZlbnRfKCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQpIHtcbiAgICBjb25zdCB7IGtleSwga2V5Q29kZSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcbiAgICBjb25zdCBpc1RhYiA9IGtleSA9PT0gJ1RhYicgfHwga2V5Q29kZSA9PT0gOTtcblxuICAgIGlmIChpc0VzY2FwZSkgdGhpcy5jbG9zZSgpO1xuICAgIGVsc2UgaWYgKGlzVGFiKSB7XG4gICAgICBpZiAodGhpcy5pc0xhc3RFbGVtZW50Rm9jdXNlZCgpICYmICFzaGlmdEtleSkge1xuICAgICAgICB0aGlzLmZvY3VzRmlyc3RFbGVtZW50KCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNGaXJzdEVsZW1lbnRGb2N1c2VkKCkgJiYgc2hpZnRLZXkpIHtcbiAgICAgICAgdGhpcy5mb2N1c0xhc3RFbGVtZW50KCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5Q2xvc2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnTURXUGFuZWw6Y2xvc2VkJywgdGhpcykpO1xuICB9XG5cbiAgbm90aWZ5T3BlbigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdNRFdQYW5lbDpvcGVuJyksIHRoaXMpO1xuICB9XG5cbiAgaG9pc3RUb0JvZHkodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuX2lzSG9pc3RlZCkgcmV0dXJuO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IHRhcmdldCB8fCB0aGlzLnBhcmVudE5vZGU7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wYW5lbC1ob2lzdGVkJyk7XG4gICAgdGhpcy5faXNIb2lzdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9hdXRvUG9zaXRpb25Ib2lzdGVkKCkge1xuICAgIGlmICghdGhpcy5fYXV0b1Bvc2l0aW9uKSByZXR1cm47XG5cbiAgICBjb25zdCBwYWdlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcGFuZWxIZWlnaHQgPSB0aGlzLm9mZnNldEhlaWdodDtcbiAgICBsZXQgcGFuZWxZID0gdGhpcy5vZmZzZXRUb3A7XG5cbiAgICAvLyBpZiBwYW5lbCBpcyBvdXQgb2Ygd2luZG93IHkgYm91bmRzXG4gICAgaWYgKHBhbmVsWSArIHBhbmVsSGVpZ2h0ID4gcGFnZUhlaWdodCkge1xuICAgICAgaWYgKHBhbmVsSGVpZ2h0IDw9IHBhZ2VIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgbWF4VG9wID0gcGFnZUhlaWdodCAtIHBhbmVsSGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0ID0gcGFuZWxZIC0gbWF4VG9wO1xuXG4gICAgICAgIC8vIGFkZCBwYWRkaW5nIHRvIG9mZnNldCwgdGhpcyB3aWxsIHByZXZlbnQgcGFuZWwgZnJvbSBidXR0aW5nIHVwIGFnYWluc3QgYm90dG9tXG4gICAgICAgIGlmIChvZmZzZXQgPiAyMCkgb2Zmc2V0ICs9IDEwO1xuICAgICAgICBlbHNlIG9mZnNldCAvPSAyO1xuXG4gICAgICAgIHBhbmVsWSAtPSBvZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZS50b3AgPSBgJHtwYW5lbFl9cHhgO1xuICB9XG5cbiAgc2V0SG9pc2V0ZWRQb3NpdGlvbigpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLl9jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zdHlsZS50b3AgPSBgJHtib3VuZHMudG9wfXB4YDtcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHtib3VuZHMubGVmdH1weGA7XG4gICAgdGhpcy5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSAnc2NhbGUoMSknO1xuXG4gICAgaWYgKCF0aGlzLl9wb3NpdGlvblNldCkge1xuICAgICAgdGhpcy5fYXV0b1Bvc2l0aW9uSG9pc3RlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG9wID0gMDtcbiAgICAgIGxldCBsZWZ0ID0gMDtcblxuICAgICAgdGhpcy5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xuICAgICAgdGhpcy5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgYVZhbHVlID0gdGhpcy5wb3NpdGlvbi5zcGxpdCgnICcpWzBdO1xuICAgICAgICBjb25zdCBiVmFsdWUgPSB0aGlzLnBvc2l0aW9uLnNwbGl0KCcgJylbMV07XG5cbiAgICAgICAgc3dpdGNoKGFWYWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0b3AgPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaW5uZXItdG9wJzpcbiAgICAgICAgICAgIHRvcCA9IGJvdW5kcy55ICsgMTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdG9wID0gY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIHRvcCA9IChjbGllbnRIZWlnaHQgLyAyKSAtIChoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2lubmVyLWJvdHRvbSc6XG4gICAgICAgICAgICB0b3AgPSBjbGllbnRIZWlnaHQgLSBoZWlnaHQgLSAxMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGJWYWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgbGVmdCA9IC13aWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2lubmVyLWxlZnQnOlxuICAgICAgICAgICAgbGVmdCA9IGJvdW5kcy54ICsgMTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICBsZWZ0ID0gY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdpbm5lci1yaWdodCc6XG4gICAgICAgICAgICBsZWZ0ID0gY2xpZW50V2lkdGggLSB3aWR0aCAtIDEyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIGxlZnQgPSAoY2xpZW50V2lkdGggLyAyKSAtICh3aWR0aCAvIDIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0eWxlLndpZHRoID0gYCR7dGhpcy53aWR0aH1weGA7XG4gICAgICAgIHRoaXMuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcbiAgICAgICAgdGhpcy5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuXG4gIHNldFBvc2l0aW9uU3R5bGUocGFyZW50T3ZlcnJpZGUpIHtcbiAgICBpZiAocGFyZW50T3ZlcnJpZGUpIHRoaXMuX3BhcmVudE92ZXJyaWRlID0gcGFyZW50T3ZlcnJpZGU7XG4gICAgZWxzZSBpZiAodGhpcy5fcGFyZW50T3ZlcnJpZGUpIHBhcmVudE92ZXJyaWRlID0gdGhpcy5fcGFyZW50T3ZlcnJpZGU7XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgbGV0IHBhcmVudFdpZHRoID0gMDtcbiAgICBsZXQgcGFyZW50SGVpZ2h0ID0gMDtcbiAgICBpZiAocGFyZW50T3ZlcnJpZGUpIHtcbiAgICAgIHBhcmVudFdpZHRoID0gcGFyZW50T3ZlcnJpZGUub2Zmc2V0V2lkdGg7XG4gICAgICBwYXJlbnRIZWlnaHQgPSBwYXJlbnRPdmVycmlkZS5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Lm5vZGVOYW1lID09PSAnTURXLVNOQUNLQkFSJykgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICBjb25zdCBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcGFyZW50V2lkdGggPSBwYXJlbnRSZWN0LndpZHRoO1xuICAgICAgcGFyZW50SGVpZ2h0ID0gcGFyZW50UmVjdC5oZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gdXNlIG9mZnNldCB3aXRoIGFuZCBoZWlnaHQgdG8gYXZvaWQgcHJvYmxlbXMgZHVlIHRvIHRyYW5zZm9ybTogc2NhbGUoKVxuICAgIC8vIHVzaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCB3aWxsIHJldHVybiB0aGUgYWRqdXN0ZWQgd2lkdGggYmFzZWQgb24gdGhlIHNjYWxlIGZhY3RvclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBhVmFsdWUgPSBwb3NpdGlvbi5zcGxpdCgnICcpWzBdO1xuICAgIGNvbnN0IGJWYWx1ZSA9IHBvc2l0aW9uLnNwbGl0KCcgJylbMV07XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgc3dpdGNoKGFWYWx1ZSkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wID0gLWhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0b3AgPSBwYXJlbnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgdG9wID0gKHBhcmVudEhlaWdodCAvIDIpIC0gKGhlaWdodCAvIDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lubmVyLWJvdHRvbSc6XG4gICAgICAgIHRvcCA9IHBhcmVudEhlaWdodCAtIGhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoKGJWYWx1ZSkge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGxlZnQgPSAtd2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBsZWZ0ID0gcGFyZW50V2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5uZXItcmlnaHQnOlxuICAgICAgICBsZWZ0ID0gcGFyZW50V2lkdGggLSB3aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBsZWZ0ID0gKHBhcmVudFdpZHRoIC8gMikgLSAod2lkdGggLyAyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2F1dG9Qb3NpdGlvbikge1xuICAgICAgY29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBjb25zdCB7IHg6IGdsb2JhbFgsIHk6IGdsb2JhbFkgfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoKGdsb2JhbFkgKyBoZWlnaHQpID4gY2xpZW50SGVpZ2h0KSB0b3AgPSBwYXJlbnRIZWlnaHQgLSBoZWlnaHQ7XG4gICAgICBpZiAoKGdsb2JhbFggKyB3aWR0aCkgPiBjbGllbnRXaWR0aCkgbGVmdCA9IHBhcmVudFdpZHRoIC0gd2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh0b3ApfXB4YDtcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludChsZWZ0KX1weGA7XG4gICAgdGhpcy5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSAnc2NhbGUoMSknO1xuICB9XG5cbiAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnRvcCA9ICcnO1xuICAgIHRoaXMuc3R5bGUubGVmdCA9ICcnO1xuICAgIHRoaXMuc3R5bGVbdGhpcy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWVdID0gJyc7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctcmFkaW8tZ3JvdXAnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy12YWx1ZScpO1xuICAgIC8vIHRoaXMuYm91bmRfY2hhbmdlID0gdGhpcy5jaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAvLyAgIHRoaXMucmFkaW9zLmZvckVhY2gociA9PiByLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfY2hhbmdlKSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gZGlzb2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAvLyAgIHRoaXMucmFkaW9zLmZvckVhY2gociA9PiByLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfY2hhbmdlKSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gY2hhbmdlKGUpIHtcbiAgLy8gICBjb25zb2xlLmxvZyhlKTtcbiAgLy8gfVxuICAvL1xuICAvLyBnZXQgcmFkaW9zKCkge1xuICAvLyAgIHJldHVybiBbLi4udGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdtZHctcmFkaW8nKV07XG4gIC8vIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1yYWRpbycsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gaW5wdXQgcmFkaW8gd2lsbCBub3Qgd29yayBjb3JyZWN0bHkgaW4gc2hhZG93cm9vdFxuICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLnJpcHBsZVRlbXBsYXRlKCkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZS5pbml0aWFsVmFsdWUgPT09IHRoaXMudmFsdWUpIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gICAgaWYgKCF0aGlzLmlucHV0Lmhhc0F0dHJpYnV0ZSgndHlwZScpKSB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYWRpbycpO1xuICAgIGlmICghdGhpcy5pbnB1dC5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICB0cmlnZ2VyRWxlbWVudDogW3RoaXMuaW5wdXRdLFxuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIGNlbnRlcmVkOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XG4gICAgICB0aGlzLm5hbWVfID0gdGhpcy5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkge1xuICAgICAgdGhpcy5uYW1lXyA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG5hbWUgaWYgb25lIHdhcyBub3QgcHJvdmlkZWRcbiAgICAvLyBuYW1lIGlzIHJlcXVpcmVkIGZvciByYWRpbyBidXR0b25zIHRvIHdvcmtcbiAgICBpZiAoIXRoaXMubmFtZV8pIHtcbiAgICAgIHRoaXMubmFtZV8gPSBNRFdVdGlscy51aWQoKTtcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHRoaXMucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLm5hbWVfKTtcbiAgICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLm5hbWVfKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmFtZV87XG4gIH1cblxuICByaXBwbGVUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yYWRpby1iYWNrZ3JvdW5kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmFkaW9fX291dGVyLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXJhZGlvX19pbm5lci1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LXJhZGlvLXJpcHBsZVwiPjwvZGl2PlxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuLy8gVE9ETyBpbXBsYWVudCB2YWxpZGl0eVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zZWxlY3QnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zZXR1cExhYmVsXygpO1xuICAgIGlmICh0aGlzLmlzRW5oYW5jZWRfKSB0aGlzLnByZXBhcmVFbmhhbmNlXygpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LW5vLWFuaW1hdGlvbicpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSh0cnVlKTtcblxuICAgIHRoaXMuYm91bmRfb25Gb2N1cyA9IHRoaXMub25Gb2N1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25CbHVyID0gdGhpcy5vbkJsdXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25QYW5lbENsaWNrID0gdGhpcy5vblBhbmVsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRfKSB0aGlzLnZhbHVlID0gdGhpcy5zZWxlY3RlZF8udmFsdWU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcigncmVuZGVyLWJsb2NrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uQ2xpY2spO1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZF9vbktleURvd24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmJvdW5kX29uRm9jdXMpO1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJvdW5kX29uQmx1cik7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vbkNoYW5nZSk7XG4gICAgfVxuXG4gICAgLy8gY2FwdHVyZSBvcHRpb24gc2VsZWN0ZWQgYXR0cmlidXRlIGFuZCBmbG9hdCB0aGUgbGFiZWxcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LW5vLWFuaW1hdGlvbicpO1xuXG4gICAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykge1xuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLm1pbldpZHRoID0gYCR7dGhpcy5vZmZzZXRXaWR0aH1weGA7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykge1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3JlbmRlci1ibG9jaycpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vbkNsaWNrKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRfb25LZXlEb3duKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5ib3VuZF9vbkZvY3VzKTtcbiAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdEVsZW1lbnQudmFsdWUgfHwgdGhpcy52YWx1ZV87XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gIH1cblxuICBnZXQgc2VsZWN0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gTURXVXRpbHMucXVlcnlTbG90dGVkKHRoaXMsICdzZWxlY3QnKTtcbiAgfVxuXG4gIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk7XG4gIH1cblxuICBnZXQgbGFiZWxXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbC5vZmZzZXRXaWR0aCAqIDAuOTtcbiAgfVxuXG5cbiAgZ2V0IGVuaGFjZWRFbGVtZW50SWQoKSB7XG4gICAgaWYgKCF0aGlzLmVuaGFjZWRFbGVtZW50SWRfKSB0aGlzLmVuaGFjZWRFbGVtZW50SWRfID0gYHNlbGVjdC1lbmhhbmNlZC0ke01EV1V0aWxzLnVpZCgpfWA7XG4gICAgcmV0dXJuIHRoaXMuZW5oYWNlZEVsZW1lbnRJZF87XG4gIH1cblxuICBnZXQgcGFuZWwoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuZW5oYWNlZEVsZW1lbnRJZH1gKTtcbiAgfVxuXG4gIGdldCBzaGVldCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5lbmhhY2VkRWxlbWVudElkfWApO1xuICB9XG5cbiAgZ2V0IGlzRW5oYW5jZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LWVuaGFuY2VkJykgIT09IG51bGw7XG4gIH1cblxuICBnZXQgb3V0bGluZWQoKSB7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmFwcGx5KHRoaXMuY2xhc3NMaXN0IHx8IFtdKS5pbmNsdWRlcygnbWR3LW91dGxpbmVkJyk7XG4gIH1cblxuICBnZXQgbm90Y2goKSB7XG4gICAgaWYgKCF0aGlzLl9ub3RjaCkgdGhpcy5fbm90Y2ggPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1vdXRsaW5lZC1ub3RjaCcpO1xuICAgIHJldHVybiB0aGlzLl9ub3RjaDtcbiAgfVxuXG4gIHNldHVwTGFiZWxfKCkge1xuICAgIGNvbnN0IGxhYmVsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpO1xuICAgIGlmIChsYWJlbCkge1xuICAgICAgdGhpcy5sYWJlbFRleHRfID0gbGFiZWwuaW5uZXJUZXh0O1xuICAgICAgbGFiZWwucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJlcGFyZUVuaGFuY2VfKCkge1xuICAgIHRoaXMub3B0aW9uc01hcF8gPSBbLi4udGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKV0ubWFwKGVsID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQ6IGVsLmlubmVyVGV4dCxcbiAgICAgICAgdmFsdWU6IGVsLnZhbHVlLFxuICAgICAgICBzZWxlY3RlZDogZWwuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RlZF8gPSAodGhpcy5vcHRpb25zTWFwXy5maWx0ZXIoKHsgc2VsZWN0ZWQgfSkgPT4gc2VsZWN0ZWQgPT09IHRydWUpWzBdIHx8IHsgdGV4dDogJycsIHZhbHVlOiAnJyB9KTtcblxuICAgIGNvbnN0IHNlbGVjdEVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIGlmIChzZWxlY3RFbGVtZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RPbmNoYW5nZSA9IHNlbGVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdvbmNoYW5nZScpO1xuICAgICAgaWYgKHNlbGVjdE9uY2hhbmdlKSB0aGlzLnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCBzZWxlY3RPbmNoYW5nZSk7XG4gICAgICBzZWxlY3RFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkgdGhpcy5wcmVwYXJlU2hlZXRfKCk7XG4gICAgZWxzZSB0aGlzLnByZXBhcmVQYW5lbF8oKTtcbiAgfVxuXG4gIHByZXBhcmVQYW5lbF8oKSB7XG4gICAgY29uc3QgcGFuZWxIVE1MID0gYFxuICAgICAgPG1kdy1wYW5lbCBpZD1cIiR7dGhpcy5lbmhhY2VkRWxlbWVudElkfVwiIG1kdy1wb3NpdGlvbj1cImJvdHRvbSBpbm5lci1sZWZ0XCIgY2xhc3M9XCJtZHctcGFuZWwtaG9pc3RlZFwiPlxuICAgICAgICA8bWR3LWxpc3Q+XG4gICAgICAgICAgJHt0aGlzLm9wdGlvbnNNYXBfLm1hcCgoeyB0ZXh0LCB2YWx1ZSwgc2VsZWN0ZWQgfSkgPT4gYFxuICAgICAgICAgICAgPG1kdy1saXN0LWl0ZW0gdmFsdWU9XCIke3ZhbHVlfVwiJHtzZWxlY3RlZCA/ICcgc2VsZWN0ZWQnIDogJyd9PiR7dGV4dH08L21kdy1saXN0LWl0ZW0+XG4gICAgICAgICAgYCkuam9pbignXFxuJyl9XG4gICAgICAgIDwvbWR3LWxpc3Q+XG4gICAgICA8L21kdy1wYW5lbD5cbiAgICBgO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBwYW5lbEhUTUwpO1xuICAgIGNvbnN0IHBhbmVsRWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmIChwYW5lbEVsLmhvaXN0VG9Cb2R5KSBwYW5lbEVsLmhvaXN0VG9Cb2R5KHRoaXMpO1xuICAgIHBhbmVsRWwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgfVxuXG4gIHByZXBhcmVTaGVldF8oKSB7XG4gICAgY29uc3Qgc2hlZXRIVE1MID0gYFxuICAgICAgPG1kdy1zaGVldCBtZHctbW9kYWwgaWQ9JHt0aGlzLmVuaGFjZWRFbGVtZW50SWR9PlxuICAgICAgICA8bWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICAgICAgPG1kdy1saXN0PlxuICAgICAgICAgICAgJHt0aGlzLm9wdGlvbnNNYXBfLm1hcCgoeyB0ZXh0LCB2YWx1ZSwgc2VsZWN0ZWQgfSkgPT4gYFxuICAgICAgICAgICAgICA8bWR3LWxpc3QtaXRlbSB2YWx1ZT1cIiR7dmFsdWV9XCIke3NlbGVjdGVkID8gJyBzZWxlY3RlZCcgOiAnJ30+JHt0ZXh0fTwvbWR3LWxpc3QtaXRlbT5cbiAgICAgICAgICAgIGApLmpvaW4oJ1xcbicpfVxuICAgICAgICAgIDwvbWR3LWxpc3Q+XG4gICAgICAgIDwvbWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICA8L21kdy1zaGVldD5cbiAgICBgO1xuXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHNoZWV0SFRNTCk7XG4gIH1cblxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9IHRoaXMubGFiZWxXaWR0aCArICdweCc7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LW5vdC1lbXB0eScsIHRoaXMudmFsdWUpO1xuXG4gICAgaWYgKHRoaXMuaXNFbmhhbmNlZF8pIHtcbiAgICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgICB0aGlzLnNoZWV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1NoZWV0OmNsb3NlZCcsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgICAgdGhpcy5zaGVldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgICAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xpY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIE1EV1V0aWxzLnVubG9ja1BhZ2VTY3JvbGwoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWVtcHR5LW5vLWZsb2F0Jyk7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9IHRoaXMubGFiZWxXaWR0aCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbWR3LWVtcHR5LW5vLWZsb2F0Jyk7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9ICcwJztcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9PT0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25Gb2N1cygpO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICBjb25zdCBzaGVldEVsZW1lbnQgPSB0aGlzLnNoZWV0O1xuICAgICAgc2hlZXRFbGVtZW50Lm9wZW4oKTtcbiAgICAgIHNoZWV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdNRFdTaGVldDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uQmx1cik7XG4gICAgICBzaGVldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IHNoZWV0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWR3LWZvY3VzZWQnKTtcbiAgICAgIGlmIChmb2N1c2VkRWxlbWVudCkgZm9jdXNlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWZvY3VzZWQnKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IHNoZWV0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbc2VsZWN0ZWRdJyk7XG4gICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSBzZWxlY3RlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFuZWxFbGVtZW50ID0gdGhpcy5wYW5lbDtcbiAgICAgIHBhbmVsRWxlbWVudC5hdXRvUG9zaXRpb24oKTtcbiAgICAgIHBhbmVsRWxlbWVudC5vcGVuKHRydWUpO1xuICAgICAgcGFuZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgIHBhbmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gcGFuZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZHctZm9jdXNlZCcpO1xuICAgICAgaWYgKGZvY3VzZWRFbGVtZW50KSBmb2N1c2VkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRFbGVtZW50ID0gcGFuZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKTtcbiAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHNlbGVjdGVkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctZm9jdXNlZCcpO1xuICAgIH1cblxuICAgIE1EV1V0aWxzLmxvY2tQYWdlU2Nyb2xsKCk7XG4gIH1cblxuICBvblBhbmVsQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICB0aGlzLnNldFNlbGVjdGVkVGV4dChldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWQgPSB0aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKTtcbiAgICBpZiAoY3VycmVudFNlbGVjdGVkKSBjdXJyZW50U2VsZWN0ZWQucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgIHRoaXMucGFuZWwuY2xvc2UoKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkVGV4dCh2YWx1ZSkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCcpLmlubmVyVGV4dCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGludGVybmFsU3R5bGVzRmlsZSgpIHtcbiAgICByZXR1cm4gJy4vaW50ZXJuYWwuY3NzJztcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8aSBjbGFzcz1cIm1kdy1zZWxlY3RfX2ljb25cIj48L2k+XG4gICAgICAkeyF0aGlzLmlzRW5oYW5jZWRfID8gJzxzbG90Pjwvc2xvdD4nIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dFwiPiR7dGhpcy5zZWxlY3RlZF8udGV4dH08L2Rpdj5cbiAgICAgIGB9XG4gICAgICA8bGFiZWw+JHt0aGlzLmxhYmVsVGV4dF99PC9sYWJlbD5cbiAgICAgICR7dGhpcy5vdXRsaW5lZCA/ICcnIDogJzxkaXYgY2xhc3M9XCJtZHctbGluZS1yaXBwbGVcIj48L2Rpdj4nfVxuICAgICAgJHshdGhpcy5vdXRsaW5lZCA/ICcnIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWJvcmRlci1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWxlYWRpbmdcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLW5vdGNoXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC10cmFpbGluZ1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGB9XG4gICAgYDtcbiAgfVxuXG5cblxuICAvLyAtLS0ga2V5IGNvbnRyb2xzIC0tLVxuXG4gIG9uS2V5RG93bihlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSByZXR1cm5cblxuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDQwOiAvL2Rvd25cbiAgICAgIGNhc2UgMzk6IC8vcmlnaHRcbiAgICAgICAgdGhpcy5mb2N1c05leHQoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODogLy91cFxuICAgICAgY2FzZSAzNzogLy9sZWZ0XG4gICAgICAgIHRoaXMuZm9jdXNQcmV2aW91cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNlZCgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoZS5rZXlDb2RlID49IDMxIHx8IGUua2V5Q29kZSA8PSA5MCkge1xuICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IHRoaXMua2V5Ym9hcmRTZWFyY2hOb2RlcyhlLmtleUNvZGUpO1xuICAgICAgICAgIGlmIChub2RlSW5kZXggIT09IHVuZGVmaW5lZCkgdGhpcy5zZWxlY3ROb2RlKG5vZGVJbmRleCk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBrZXkgc2VhcmNoaW5nXG4gIC8vICAgaWYgeW91IHByZXNzIFwic1wiIHRoZW4gaXQgd2lsbCBmaW5kIHRoZSBmaXJzdCBpdGVtIHRoYXQgc3RhcnRzIHdpdGggYW4gXCJzXCJcbiAgLy8gICBpZiB5b3UgcHJlc3MgXCJzXCIgdGhlbiBcInRcIiBpdCB3aWxsIGZpbmQgdGhlIGZpcnN0IGl0ZW0gdGhhdCBzdGFydHMgd2l0aCBhbiBcInN0XCJcbiAga2V5Ym9hcmRTZWFyY2hOb2RlcyhrZXlDb2RlKSB7XG4gICAgaWYgKHRoaXMuX2NsZWFyU2VhcmNoVGltZW91dCAhPT0gdW5kZWZpbmVkKSBjbGVhclRpbWVvdXQodGhpcy5fY2xlYXJTZWFyY2hUaW1lb3V0KTtcbiAgICB0aGlzLl9jbGVhclNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2NsZWFyU2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID0gJyc7XG4gICAgICB0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzID0gdW5kZWZpbmVkO1xuICAgIH0sIDMwMCk7XG4gICAgaWYgKHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID09PSB1bmRlZmluZWQpIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID0gJyc7XG4gICAgdGhpcy5fa2V5Ym9hcmRTZWFyY2hTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcbiAgICBjb25zdCBzZWFyY2ggPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyLCAnaScpO1xuXG4gICAgaWYgKCF0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzKSB0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXS5tYXAoZWwgPT4gZWwuaW5uZXJUZXh0KTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2tleWJvYXJkT3B0aW9uTmFtZXMubGVuZ3RoO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaWYgKHNlYXJjaC50ZXN0KHRoaXMuX2tleWJvYXJkT3B0aW9uTmFtZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgaSArPSAxO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE5vZGUoaW5kZXgpIHtcbiAgICBjb25zdCBvcHRpb25FbGVtZW50cyA9IFsuLi50aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1saXN0LWl0ZW0nKV07XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9IGluZGV4O1xuICAgIGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uKSB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1mb2N1c2VkJyk7XG4gICAgdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbkVsZW1lbnRzW3RoaXMuX2ZvY3VzSW5kZXhdO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24uY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgfVxuXG4gIGZvY3VzTmV4dCgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwuaXNPcGVuKCkpIHJldHVybjtcbiAgICBjb25zdCBvcHRpb25FbGVtZW50cyA9IFsuLi50aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1saXN0LWl0ZW0nKV07XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaW5kZXggPSBvcHRpb25FbGVtZW50cy5maW5kSW5kZXgoZWwgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZm9jdXNlZCcpKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gb3B0aW9uRWxlbWVudHNbaW5kZXhdO1xuICAgICAgdGhpcy5fZm9jdXNJbmRleCA9IGluZGV4IDw9IDAgPyAxIDogaW5kZXggKyAxO1xuICAgIH0gZWxzZSB0aGlzLl9mb2N1c0luZGV4ICs9IDE7XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPiBvcHRpb25FbGVtZW50cy5sZW5ndGggLSAxKSB0aGlzLl9mb2N1c0luZGV4ID0gb3B0aW9uRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBmb2N1c1ByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA9PT0gdW5kZWZpbmVkKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBlbHNlIHRoaXMuX2ZvY3VzSW5kZXggLT0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA8PSAwKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBzZWxlY3RGb2N1c2VkKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA9PSB1bmRlZmluZWQgfHwgdGhpcy5fZm9jdXNJbmRleCA+IG9wdGlvbkVsZW1lbnRzLmxlbmd0aCAtIDEpIHRoaXMuX2ZvY3VzSW5kZXggPSAwO1xuICAgIHRoaXMub25QYW5lbENsaWNrKHsgdGFyZ2V0OiBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XSB9KTtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgOjpzbG90dGVkKGxhYmVsLm1kdy1lbXB0eS1uby1mbG9hdCkge1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgLm1kdy1zZWxlY3RfX2ljb24ge1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpIHRyYW5zbGF0ZVkoLTVweCk7XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgfVxuXG5cbiAgICAgIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogMjNweDtcbiAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgcmlnaHQ6IDhweDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCB2YXIoLS1tZHctdGhlbWUtb24tc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1zZWxlY3RfX2ljb24sXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQ6Zm9jdXMpIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSB0cmFuc2xhdGVZKC01cHgpO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDpob3N0KDpub3QoLm1kdy1zZWxlY3QtLWRpc2FibGVkKSkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjU0KTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1vbi1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZDpub3QoLm1kdy1zZWxlY3QtLWRpc2FibGVkKSkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQsXG4gICAgICA6aG9zdCg6bm90KC5tZHctc2VsZWN0LS1kaXNhYmxlZCkpIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkOmZvY3VzOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwJSArIDFweCk7IC8qIGFkZCAxcHggdG8gaGVpZ2h0IHNvIHRoZSB0ZXh0IGRvZXMgbm90IGdldCBwdXNoZWQgdXAgYnkgYm9yZGVyIHNpemUgY2hhbmdlICovXG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIDo6c2xvdHRlZChzZWxlY3QpLFxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDo6c2xvdHRlZChzZWxlY3QpLFxuICAgICAgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggNTJweCA0cHggMTZweDtcbiAgICAgICAgZm9udC1mYW1pbHk6IFJvYm90byxzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjc1cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogLjAwOTM3NWVtO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgfVxuXG4gICAgICAvKiBvdXRsaW5lZCAqL1xuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgOjpzbG90dGVkKHNlbGVjdCksXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIHBhZGRpbmc6IDEycHggNTJweCAxMnB4IDE2cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSA6OnNsb3R0ZWQoc2VsZWN0KSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIH1cblxuICAgICAgOjpzbG90dGVkKHNlbGVjdCkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW2Rpcj1ydGxdKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDo6c2xvdHRlZChzZWxlY3RbZGlyPXJ0bF0pLFxuICAgICAgOmhvc3QoW2Rpcj1ydGxdKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCxcbiAgICAgIC5tZHctc2VsZWN0X19zZWxlY3RlZC10ZXh0W2Rpcj1ydGxdIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1MnB4O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuICAgICAgfVxuXG5cbiAgICAgIGxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS43NXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDA5Mzc1ZW07XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCBjb2xvciAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgICBsaW5lLWhlaWdodDogMS4xNXJlbTtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIGN1cnNvcjogdGV4dDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLW9uLWJhY2tncm91bmQtLXJnYiksIC42KTtcbiAgICAgICAgei1pbmRleDogMTtcblxuICAgICAgICBsZWZ0OiAxNnB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgICAgdG9wOiAyMXB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQpIGxhYmVsIHtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1uby1hbmltYXRpb24pIGxhYmVsIHtcbiAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgIH1cblxuICAgICAgbGFiZWw6bm90KC5tZHctZW1wdHktbm8tZmxvYXQpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MCUpIHNjYWxlKDAuNzUpO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQoc2VsZWN0OmZvY3VzKSArIGxhYmVsLFxuICAgICAgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSkgc2NhbGUoMC43NSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQubWR3LWZvY3VzZWQpIGxhYmVsLFxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEzMiUpIHNjYWxlKDAuNzUpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlbGVjdC0td2l0aC1sZWFkaW5nLWljb24pIGxhYmVsIHtcbiAgICAgICAgbGVmdDogNDhweDtcbiAgICAgICAgcmlnaHQ6IGluaXRpYWw7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIGxhYmVsIHtcbiAgICAgICAgbGVmdDogMTVweDtcbiAgICAgICAgcmlnaHQ6IGluaXRpYWw7XG4gICAgICAgIHRvcDogMThweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZC5tZHctc2VsZWN0LS13aXRoLWxlYWRpbmctaWNvbikgbGFiZWwge1xuICAgICAgICBsZWZ0OiAzNnB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZC5tZHctc2VsZWN0LS13aXRoLWxlYWRpbmctaWNvbikgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICBsZWZ0OiAzNnB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1ib3JkZXItY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG4gICAgICAubWR3LW91dGxpbmVkLWxlYWRpbmcge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1ub3RjaCB7XG4gICAgICAgIC1tcy1mbGV4OiAwIDAgYXV0bztcbiAgICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDEycHggKiAyKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC10cmFpbGluZyB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7XG4gICAgICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICB9XG5cbiAgICAgIC5tZHctb3V0bGluZWQtbGVhZGluZyxcbiAgICAgIC5tZHctb3V0bGluZWQtbm90Y2gsXG4gICAgICAubWR3LW91dGxpbmVkLXRyYWlsaW5nIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjU0KTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1ub3RjaCB7XG4gICAgICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgLm1kdy1vdXRsaW5lZC1sZWFkaW5nLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkKSAubWR3LW91dGxpbmVkLW5vdGNoLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkKSAubWR3LW91dGxpbmVkLXRyYWlsaW5nLFxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1vdXRsaW5lZC1sZWFkaW5nLFxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1vdXRsaW5lZC1ub3RjaCxcbiAgICAgIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpIC5tZHctb3V0bGluZWQtdHJhaWxpbmcge1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5pbnZhbGlkKSAubWR3LW91dGxpbmVkLWxlYWRpbmcsXG4gICAgICA6aG9zdCguaW52YWxpZCkgLm1kdy1vdXRsaW5lZC1ub3RjaCxcbiAgICAgIDpob3N0KC5pbnZhbGlkKSAubWR3LW91dGxpbmVkLXRyYWlsaW5nIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctc2hlZXQtaGVhZGVyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGFzQ29sbGFwc2VkSGVhZGVyID0gKHRoaXMuY2hpbGRyZW4gfHwgW10pLmxlbmd0aCAhPT0gMDtcbiAgICBpZiAoIXRoaXMuaGFzQ29sbGFwc2VkSGVhZGVyKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1oaWRlLWNvbGxhcHNlZC1oZWFkZXInKTtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlLnJlZ2lzdGVySGVhZGVyKSB0aGlzLnBhcmVudE5vZGUucmVnaXN0ZXJIZWFkZXIodGhpcywgdGhpcy5oYXNDb2xsYXBzZWRIZWFkZXIpO1xuICAgIHRoaXMuaW5uZXJIVE1MU3RyaW5nID0gdGhpcy5pbm5lckhUTUw7XG4gICAgdGhpcy5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUodHJ1ZSk7XG4gICAgdGhpcy5zaG93aW5nRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIHRoaXMuYm91bmRfY2xvc2UgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG5cbiAgICBpZiAodGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnbWR3LXNoYXBlZCcpKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zaGFwZWQnKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2Nsb3NlKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2Nsb3NlKTtcbiAgfVxuXG4gIGdldCBjbG9zZUJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNtZHctc2hlZXQtY2xvc2UtYWN0aW9uJyk7XG4gIH1cblxuICBnZXQgdGl0bGUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy50aXRsZV8gPyB0aGlzLnRpdGxlXyA6IHRoaXMuaGFzQXR0cmlidXRlKCdtZHctdGl0bGUnKSA/IHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctdGl0bGUnKSA6ICcnO1xuICB9XG5cbiAgc2V0IHRpdGxlKHZhbHVlKSB7XG4gICAgdGhpcy50aXRsZV8gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpc01vZGFsKCkge1xuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc01vZGFsIHx8IGZhbHNlO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNNb2RhbCkgdGhpcy5wYXJlbnROb2RlLmNsb3NlKCk7XG4gICAgZWxzZSB0aGlzLnBhcmVudE5vZGUuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGRpc2FibGVDb2xsYXBzZWRIZWFkZXIoKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hlZXQtZGlzYWJsZS1jb2xsYXBzZWQtaGVhZGVyJyk7XG4gIH1cblxuICBzaG93RnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zaG93LWZ1bGxzY3JlZW4nKTtcbiAgfVxuXG4gIGhpZGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNob3ctZnVsbHNjcmVlbicpO1xuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbih2YWx1ZSkge1xuICAgIGlmICh0aGlzLnNob3dpbmdGdWxsc2NyZWVuICYmICF2YWx1ZSkge1xuICAgICAgdGhpcy5zaG93aW5nRnVsbHNjcmVlbiA9IHZhbHVlO1xuICAgICAgdGhpcy5oaWRlRnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvd2luZ0Z1bGxzY3JlZW4gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2hvd0Z1bGxzY3JlZW4oKTtcbiAgICB9XG4gIH1cblxuICBzaG93RHJhZ0ljb24oKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hlZXQtaGVhZGVyLWRyYWdnYWJsZScpO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2hlZXQtaGVhZGVyLWRyYWctaWNvblwiPjwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXNoZWV0LWhlYWRlci1mdWxsc2NyZWVuXCI+XG4gICAgICAgICR7dGhpcy5pc01vZGFsID8gYFxuICAgICAgICAgIDxtZHctYnV0dG9uIGlkPVwibWR3LXNoZWV0LWNsb3NlLWFjdGlvblwiIGNsYXNzPVwibWR3LWljb25cIj5cbiAgICAgICAgICAgIDxtZHctaWNvbj5jbG9zZTwvbWR3LWljb24+XG4gICAgICAgICAgPC9tZHctYnV0dG9uPlxuICAgICAgICBgIDpcbiAgICAgICAgYFxuICAgICAgICAgIDxtZHctYnV0dG9uIGlkPVwibWR3LXNoZWV0LWNsb3NlLWFjdGlvblwiIGNsYXNzPVwibWR3LWljb25cIj5cbiAgICAgICAgICAgIDxtZHctaWNvbj5rZXlib2FyZF9hcnJvd19kb3duPC9tZHctaWNvbj5cbiAgICAgICAgICA8L21kdy1idXR0b24+XG4gICAgICAgIGB9XG4gICAgICAgICR7dGhpcy50aXRsZX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXNoZWV0LWhlYWRlci1jb250YWluZXJcIj5cbiAgICAgICAgJHt0aGlzLmlubmVySFRNTFN0cmluZ31cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogNTZweDtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbiB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zdXJmYWNlKTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSxcbiAgICAgICAgICAgICAgICAgICAgMCA0cHggNXB4IDAgcmdiYSgwLDAsMCwuMTQpLFxuICAgICAgICAgICAgICAgICAgICAwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNob3ctZnVsbHNjcmVlbikgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbiB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zaGVldC1oZWFkZXItZHJhZy1pY29uIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgd2lkdGg6IDEyJTtcbiAgICAgICAgaGVpZ2h0OiA0cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiA2MnB4O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNEREQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2hlZXQtaGVhZGVyLWRyYWdnYWJsZSkgLm1kdy1zaGVldC1oZWFkZXItZHJhZy1pY29uIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2hvdy1mdWxsc2NyZWVuLm1kdy1zaGVldC1oZWFkZXItZHJhZ2dhYmxlKSAubWR3LXNoZWV0LWhlYWRlci1kcmFnLWljb24ge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogY29sbGFwc2VkIGhlYWRlciAqL1xuXG4gICAgICAubWR3LXNoZWV0LWhlYWRlci1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1vbi1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zaGFwZWQpIC5tZHctc2hlZXQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMCAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNoZWV0LWRpc2FibGUtY29sbGFwc2VkLWhlYWRlcikgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zaG93LWZ1bGxzY3JlZW4pIC5tZHctc2hlZXQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWhpZGUtY29sbGFwc2VkLWhlYWRlcikgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy10d28tbGluZSkgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbixcbiAgICAgIDpob3N0KC5tZHctdHdvLWxpbmUpIC5tZHctc2hlZXQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogNzJweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy10aHJlZS1saW5lKSAubWR3LXNoZWV0LWhlYWRlci1mdWxsc2NyZWVuLFxuICAgICAgOmhvc3QoLm1kdy10aHJlZS1saW5lKSAubWR3LXNoZWV0LWhlYWRlci1jb250YWluZXIge1xuICAgICAgICBoZWlnaHQ6IDg4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctdHdvLWxpbmUubWR3LXNoYXBlZCkgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbixcbiAgICAgIDpob3N0KC5tZHctdHdvLWxpbmUubWR3LXNoYXBlZCkgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDAgMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy10aHJlZS1saW5lLm1kdy1zaGFwZWQpIC5tZHctc2hlZXQtaGVhZGVyLWZ1bGxzY3JlZW4sXG4gICAgICA6aG9zdCgubWR3LXRocmVlLWxpbmUubWR3LXNoYXBlZCkgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweCAxMnB4IDAgMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy13aGl0ZSkgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtb24tcHJpbWFyeSk7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1tZHctdGhlbWUtY2hlY2tib3hib3JkZXIpO1xuICAgICAgfVxuXG4gICAgICAvKiBzZWN0aW9ucyAqL1xuXG4gICAgICBzZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgICB6LWluZGV4OiAxO1xuXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9uW2FsaWduPVwic3RhcnRcIl0ge1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgb3JkZXI6IC0xO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9uICsgc2VjdGlvbixcbiAgICAgIHNlY3Rpb25bYWxpZ249XCJlbmRcIl0ge1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgIG9yZGVyOiAxO1xuICAgICAgfVxuXG5cbiAgICAgIC8qIHRleHQgKi9cbiAgICAgIHNlY3Rpb24gLm1kdy10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IC4wMTI1ZW07XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9uIC5tZHctc3VidGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAuMDEyNWVtO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgIH1cblxuICAgICAgc2VjdGlvbiAubWR3LWRldGFpbC10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogLjAxMjVlbTtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0ICcuL2hlYWRlci5qcyc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5pbXBvcnQgeyBhZGREcmFnTGlzdGVuZXIsIHJlbW92ZURyYWdMaXN0ZW5lciwgZGlzYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQsIGVuYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2RyYWcuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zaGVldCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWNsb3NlZCcpO1xuICAgIHRoaXMuY3VycmVudERyYWdQb3NpdGlvbiA9IC0xO1xuICAgIHRoaXMuYm91bmRfb25EcmFnID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uU2Nyb2xsID0gdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3R5bGVbTURXVXRpbHMudHJhbnNmb3JtUHJvcGVydHlOYW1lXSA9ICd0cmFuc2xhdGUzZCgwLCAxMDAlLCAwKSc7XG4gICAgdGhpcy5zZXR1cEhlYWRlcigpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgcmVtb3ZlRHJhZ0xpc3RlbmVyKHRoaXMuY29udGVudEVsZW1lbnQsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm91bmRfb25TY3JvbGwpO1xuICAgIHRoaXMucmVtb3ZlQmFja2Ryb3AoKTtcbiAgfVxuXG4gIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctc2hlZXQtY29udGVudCcpO1xuICB9XG5cbiAgZ2V0IHRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LXRpdGxlJykgPyB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LXRpdGxlJykgOiAnJztcbiAgfVxuXG4gIGdldCBpc01vZGFsKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LW1vZGFsJyk7XG4gIH1cblxuICByZWdpc3RlckhlYWRlcihlbGVtZW50LCBoYXNDb2xsYXNwZWRIZWFkZXIpIHtcbiAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaGVhZGVyRWxlbWVudC50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgaWYgKGhhc0NvbGxhc3BlZEhlYWRlcikgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctaGFzLWNvbGxhc3BlZC1oZWFkZXInKTtcbiAgICBpZiAodGhpcy5pc01vZGFsKSBlbGVtZW50LmRpc2FibGVDb2xsYXBzZWRIZWFkZXIoKTtcbiAgfVxuXG4gIHNldHVwSGVhZGVyKCkge1xuICAgIGlmICghdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctc2hlZXQtaGVhZGVyJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYDxtZHctc2hlZXQtaGVhZGVyIG1kdy10aXRsZT1cIiR7dGhpcy50aXRsZX1cIj48L21kdy1zaGVldC1oZWFkZXI+YCk7XG4gICAgfVxuICB9XG5cbiAgYWRkQmFja2Ryb3AoKSB7XG4gICAgaWYgKHRoaXMuaXNNb2RhbCkge1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IE1EV1V0aWxzLmFkZEJhY2tkcm9wKHRoaXMsICgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQmFja2Ryb3AoKSB7XG4gICAgaWYgKHRoaXMuYmFja2Ryb3ApIHRoaXMuYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgdGhpcy5iYWNrZHJvcCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHNldEluaXRhbFBvc2l0aW9ucygpIHtcbiAgICAvLyBwYWdlIGhlaWdodFxuICAgIHRoaXMudmlld0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIC8vIGhhbGYgaGVpZ2h0IGZvciBtb2RhbCwgcXVhdGVyIGhpZ2h0IGZvciBub24gbW9kYWxcbiAgICB0aGlzLmNsaWVudENlbnRlciA9IHRoaXMuaXNNb2RhbCA/IHRoaXMudmlld0hlaWdodCAvIDIgOiB0aGlzLnZpZXdIZWlnaHQgLyA0O1xuICAgIHRoaXMuY29udGVudEhlaWdodCA9IHRoaXMuY29udGVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIHRoaXMuaW50aWFsSGVpZ2h0ID0gTWF0aC5taW4odGhpcy5jb250ZW50SGVpZ2h0LCB0aGlzLmNsaWVudENlbnRlcik7XG5cbiAgICAvLyB1c2VyIHNldCBpbml0YWwgaGVpZ2h0XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdtZHctY29sbGFwc2VkLWhlaWdodCcpKSB0aGlzLmludGlhbEhlaWdodCA9IHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctY29sbGFwc2VkLWhlaWdodCcpLnJlcGxhY2UoJ3B4JywgJycpKTtcblxuICAgIC8vIHRoZSB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkgcG9zdGlvbiBmb3IgdGhlIHRvcCBvZiB0aGUgcGFnZVxuICAgIHRoaXMuc2Nyb2xsWSA9IC0odGhpcy52aWV3SGVpZ2h0IC0gdGhpcy5pbnRpYWxIZWlnaHQgLSA1Nik7XG4gICAgdGhpcy5pc0RyYWdnYWJsZSA9IHRoaXMuY29udGVudEhlaWdodCA+IHRoaXMuY2xpZW50Q2VudGVyO1xuICAgIHRoaXMuc3R5bGUudG9wID0gYGNhbGMoMTAwJSAtICR7dGhpcy5pbnRpYWxIZWlnaHQgKyA1Nn1weClgO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICAvLyBsZWFyIGNsb3NlIHRpbWVvdXQgc28gd2UgZG8gbm90IG92ZXJsYXAgb24gYSBmYXN0IG9wZW5cbiAgICBpZiAodGhpcy5jbG9zZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZW91dCk7XG4gICAgICB0aGlzLmNsb3NlVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctY2xvc2VkJyk7XG4gICAgdGhpcy5hZGRCYWNrZHJvcCgpO1xuXG4gICAgLy8gYW5pbWF0aW9uIGluIHNoZWV0XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldEluaXRhbFBvc2l0aW9ucygpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbigwKTtcbiAgICAgIGlmICh0aGlzLmlzRHJhZ2dhYmxlKSBhZGREcmFnTGlzdGVuZXIodGhpcy5jb250ZW50RWxlbWVudCwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvdW5kX29uU2Nyb2xsKTtcbiAgICAgIHRoaXMubm90aWZ5T3BlbigpO1xuICAgIH0sIDApO1xuICAgIGlmICh0aGlzLmlzTW9kYWwpIE1EV1V0aWxzLmxvY2tQYWdlU2Nyb2xsKCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICByZW1vdmVEcmFnTGlzdGVuZXIodGhpcy5jb250ZW50RWxlbWVudCwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICAgIHRoaXMuY29udGVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib3VuZF9vblNjcm9sbCk7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmludGlhbEhlaWdodCArIHRoaXMuaGVhZGVyRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1jbG9zZWQnKTtcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5oaWRlRnVsbHNjcmVlbigpO1xuICAgIH0sIDYwMCk7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKCk7XG4gICAgdGhpcy5ub3RpZnlDbG9zZSgpO1xuICB9XG5cbiAgbm90aWZ5Q2xvc2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnTURXU2hlZXQ6Y2xvc2VkJywgdGhpcykpO1xuICB9XG5cbiAgbm90aWZ5T3BlbigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdNRFdTaGVldDpvcGVuJyksIHRoaXMpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNEcmFnZ2FibGUpIGFkZERyYWdMaXN0ZW5lcih0aGlzLmNvbnRlbnRFbGVtZW50LCB0aGlzLmJvdW5kX29uRHJhZyk7XG4gICAgdGhpcy5zZXRQb3NpdGlvbigwKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHRoaXMuY2xvc2UoKTtcbiAgICBlbHNlIHRoaXMub3BlbigpO1xuICB9XG5cbiAgb25EcmFnKGV2ZW50KSB7XG4gICAgc3dpdGNoIChldmVudC5zdGF0ZSkge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICB0aGlzLnN0YXJ0RHJhZ1Bvc2l0aW9uID0gdGhpcy5jdXJyZW50RHJhZ1Bvc2l0aW9uO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc3RhcnREcmFnUG9zaXRpb24gKyBldmVudC5kaXN0YW5jZS55KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLnNuYXBQb3NpdGlvbihldmVudC52ZWxvY2l0eS55KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0UG9zaXRpb24oeSkge1xuICAgIC8vIGlmIHRoZSBzaGVldCBpcyBhdCB0b3AgdGhlbiBzZXR1cCBzY3JvbGxpbmdcbiAgICBpZiAoeSA8PSB0aGlzLnNjcm9sbFkpIHtcbiAgICAgIHkgPSB0aGlzLnNjcm9sbFk7XG4gICAgICB0aGlzLnN0eWxlLnRvdWNoQWN0aW9uID0gJyc7XG4gICAgICBkaXNhYmxlRHJhZ0xpc3RlbmVyRm9yRWxlbWVudCh0aGlzLmNvbnRlbnRFbGVtZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VycmVudERyYWdQb3NpdGlvbiA9PT0geSkgcmV0dXJuO1xuICAgIHRoaXMuc3R5bGVbTURXVXRpbHMudHJhbnNmb3JtUHJvcGVydHlOYW1lXSA9IGB0cmFuc2xhdGUzZCgwLCAke3l9cHgsIDApYDtcbiAgICB0aGlzLmN1cnJlbnREcmFnUG9zaXRpb24gPSB5O1xuXG4gICAgLy8gc2hvdyBoZWFkZXIgYmVmb3IgaXQgaGl0cyB0aGUgdG9wXG4gICAgaWYgKHkgLSB0aGlzLnNjcm9sbFkgPCA4MCkge1xuICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnNob3dGdWxsc2NyZWVuKCk7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zaGVldC1mdWxsc2NyZWVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5oaWRlRnVsbHNjcmVlbigpO1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctc2hlZXQtZnVsbHNjcmVlbicpO1xuICAgIH1cblxuICAgIC8vIGlmIGlzIGRyYWdnYWJsZVxuICAgIGlmICh0aGlzLmlzRHJhZ2dhYmxlKSB0aGlzLmhlYWRlckVsZW1lbnQuc2hvd0RyYWdJY29uKCk7XG4gIH1cblxuICBzbmFwUG9zaXRpb24odmVsb2NpdHkpIHtcbiAgICAvLyBzbmFwIGJhc2VkIG9uIHZlbG9jaXR5IChzd2lwZSBtb250aW9uKVxuICAgIGlmICh2ZWxvY2l0eSA8IC0wLjcpIHJldHVybiB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc2Nyb2xsWSk7XG4gICAgaWYgKHRoaXMuc3RhcnREcmFnUG9zaXRpb24gPT09IHRoaXMuc2Nyb2xsWSAmJiB2ZWxvY2l0eSA+IDAuNykgcmV0dXJuIHRoaXMuc2V0UG9zaXRpb24oMCk7XG4gICAgaWYgKHRoaXMuc3RhcnREcmFnUG9zaXRpb24gPD0gMCAmJiB2ZWxvY2l0eSA+IDAuNykgcmV0dXJuIHRoaXMuY2xvc2UoKTtcblxuICAgIC8vIHNuYXAgYmFzZWQgb24gcG9zaXRpb25cbiAgICBjb25zdCBzcGxpdCA9IE1hdGguYWJzKHRoaXMuc2Nyb2xsWSkgLyAyO1xuICAgIC8vIGhhbGYgd2F5IGJldHdlZW4gY2VudGVyIGFuZCB0b3BcbiAgICBpZiAodGhpcy5jdXJyZW50RHJhZ1Bvc2l0aW9uIC0gdGhpcy5zY3JvbGxZIDwgc3BsaXQpIHRoaXMuc2V0UG9zaXRpb24odGhpcy5zY3JvbGxZKTtcbiAgICAvLyBoYWxmIHdheSBiZXR3ZWVuIGNlbnRlciBhbmQgYm90dG9tXG4gICAgZWxzZSBpZiAodGhpcy5jdXJyZW50RHJhZ1Bvc2l0aW9uID4gc3BsaXQpIHRoaXMuY2xvc2UoKTtcbiAgICBlbHNlIHRoaXMuc2V0UG9zaXRpb24oMCk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAodGhpcy5jb250ZW50RWxlbWVudC5zY3JvbGxUb3AgPT09IDApIHtcbiAgICAgIGVuYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQodGhpcy5jb250ZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5pbXBvcnQgeyBhZGREcmFnTGlzdGVuZXIsIHJlbW92ZURyYWdMaXN0ZW5lciB9IGZyb20gJy4uLy4uL2NvcmUvZHJhZy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNsaWRlcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uTW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uTW91c2VFbnRlciA9IHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlTGVhdmUgPSB0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfdHJhY2tDbGljayA9IHRoaXMudHJhY2tDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25EcmFnID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmF0dHJWYWx1ZTtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHsoKHRoaXMuYXR0clZhbHVlIC0gdGhpcy5taW4pIC8gdGhpcy5yYW5nZSkgKiB0aGlzLm9mZnNldFdpZHRofXB4YDtcbiAgICB0aGlzLm5vdGNoQ29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBgLSR7dGhpcy5vZmZzZXRXaWR0aCAtICgoKHRoaXMuYXR0clZhbHVlIC0gdGhpcy5taW4pIC8gdGhpcy5yYW5nZSkgKiB0aGlzLm9mZnNldFdpZHRoKX1weGA7XG4gICAgdGhpcy50aHJvdHRsZWRfZGlzcGF0Y2hDaGFuZ2UgPSBNRFdVdGlscy5yYWZUaHJvdHRsZSh0aGlzLmRpc3BhdGNoQ2hhbmdlKTtcbiAgICAvLyB0aGlzLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfb25Nb3VzZURvd24pO1xuICAgIC8vIHRoaXMudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuYm91bmRfb25Nb3VzZUVudGVyKTtcbiAgICAvLyB0aGlzLnRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF90cmFja0NsaWNrKTtcbiAgICBhZGREcmFnTGlzdGVuZXIodGhpcy50aHVtYiwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gdGhpcy50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX29uTW91c2VEb3duKTtcbiAgICAvLyB0aGlzLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLmJvdW5kX29uTW91c2VFbnRlcik7XG4gICAgLy8gdGhpcy50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTGVhdmUpO1xuICAgIHRoaXMudHJhY2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX3RyYWNrQ2xpY2spO1xuICAgIC8vIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX29uTW91c2VVcCk7XG4gICAgLy8gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSk7XG4gICAgcmVtb3ZlRHJhZ0xpc3RlbmVyKHRoaXMudGh1bWIsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3ZhbHVlJywgJ21pbicsICdtYXgnLCAnc3RlcCddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICBpZiAoWydtaW4nLCAnbWF4JywgJ3N0ZXAnXS5pbmNsdWRlcyhuYW1lKSkgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubWluXyB8fCAwO1xuICB9XG5cbiAgc2V0IG1pbih2YWx1ZSkge1xuICAgIHRoaXMubWluXyA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IG1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXhfIHx8IDEwMDtcbiAgfVxuXG4gIHNldCBtYXgodmFsdWUpIHtcbiAgICB0aGlzLm1heF8gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCByYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgfVxuXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLnN0ZXBfO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWUpIHtcbiAgICB0aGlzLnN0ZXBfID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgc3RlcENvdW50KCkge1xuICAgIHJldHVybiAhdGhpcy5zdGVwID8gMCA6IE1hdGguZmxvb3IodGhpcy5yYW5nZSAvIHRoaXMuc3RlcCk7XG4gIH1cblxuICBnZXQgYXR0clZhbHVlKCkge1xuICAgIGxldCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgfHwgMCk7XG4gICAgaWYgKHZhbHVlIDwgdGhpcy5taW4pIHZhbHVlID0gdGhpcy5taW47XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGNvbnN0IHsgd2lkdGggfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9ICh0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgfHwgJzBweCcpLnJlcGxhY2UoJ3B4JywgJycpO1xuICAgIGNvbnN0IHBlcmNlbnQgPSB4IC8gd2lkdGg7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJhbmdlO1xuICAgIHRoaXMudmFsdWVfID0gdGhpcy5taW4gKyAocGVyY2VudCAqIHJhbmdlKTtcbiAgICAvLyBjaGVjayBpZiB0aGUgc3RlcCBpcyBhIGludGVnZXIgYW5kIHRoZW4gZ2FyZW50ZWUgdGhlIHZhbHVlIGlzIGFuIGludFxuICAgIC8vIGJlY3Vhc2Ugb2YgaG93IG1hdGggd29ya3MgaW4gamF2YXNjcmlwdChmbG9hdGluZyBwb2ludCkgdGhpcyBpcyBub3QgYSBnYXJlbnRlZSB3aXRob3V0IHBhcnNlSW50XG4gICAgaWYgKCEoJycrdGhpcy5zdGVwKS5pbmNsdWRlcygnLicpKSB0aGlzLnZhbHVlXyA9IHBhcnNlSW50KHRoaXMudmFsdWVfKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZV8gfHwgMDtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWVfID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgdGh1bWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fdGh1bWItaG92ZXInKTtcbiAgfVxuXG4gIGdldCB0aHVtYkNvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMudGh1bWJDb250YWluZXJfKSB0aGlzLnRodW1iQ29udGFpbmVyXyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fdGh1bWItY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJDb250YWluZXJfO1xuICB9XG5cbiAgZ2V0IG5vdGNoQ29udGFpbmVyKCkge1xuICAgIGlmICghdGhpcy5ub3RjaENvbnRhaW5lcl8pIHRoaXMubm90Y2hDb250YWluZXJfID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctc2xpZGVyX19ub3RjaC1jb250YWluZXInKTtcbiAgICByZXR1cm4gdGhpcy5ub3RjaENvbnRhaW5lcl87XG4gIH1cblxuICBnZXQgdHJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fdHJhY2stY29udGFpbmVyJyk7XG4gIH1cblxuICB0cmFja0NsaWNrKGUpIHtcbiAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB4ID0gZS5sYXllclg7XG4gICAgaWYgKGUuY2xpZW50WCA8IGxlZnQpIHggPSAwO1xuICAgIGlmICh4ID4gd2lkdGgpIHggPSB3aWR0aDtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICB0aGlzLm5vdGNoQ29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBgLSR7dGhpcy5vZmZzZXRXaWR0aCAtIHRoaXMuc25hcCh4LCB3aWR0aCl9cHhgO1xuICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uRHJhZyhlKSB7XG4gICAgc3dpdGNoKGUuc3RhdGUpIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctcHJlc3NlZCcpO1xuICAgICAgICB0aGlzLmluaXRpYWxYXyA9IHBhcnNlSW50KCh0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgfHwgJzBweCcpLnJlcGxhY2UoJ3B4JywgJycpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHggPSBlLmRpc3RhbmNlLnggKyB0aGlzLmluaXRpYWxYXztcbiAgICAgICAgaWYgKHggPCAwKSB4ID0gMDtcbiAgICAgICAgaWYgKHggPiB3aWR0aCkgeCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICAgICAgdGhpcy5ub3RjaENvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYC0ke3RoaXMub2Zmc2V0V2lkdGggLSB0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICAgICAgdGhpcy50aHJvdHRsZWRfZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1wcmVzc2VkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VEb3duKGUpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wcmVzc2VkJyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfb25Nb3VzZVVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kX29uTW91c2VNb3ZlKTtcbiAgfVxuXG4gIG9uTW91c2VVcChlKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctcHJlc3NlZCcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX29uTW91c2VVcCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgeCA9IGUubGF5ZXJYO1xuICAgIGlmIChlLmNsaWVudFggPCBsZWZ0KSB4ID0gMDtcbiAgICBpZiAoeCA+IHdpZHRoKSB4ID0gd2lkdGg7XG4gICAgdGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5zbmFwKHgsIHdpZHRoKX1weGA7XG4gICAgdGhpcy5ub3RjaENvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYC0ke3RoaXMub2Zmc2V0V2lkdGggLSB0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICB0aGlzLnRocm90dGxlZF9kaXNwYXRjaENoYW5nZSgpO1xuICB9XG5cbiAgb25Nb3VzZUVudGVyKGUpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1ob3ZlcicpO1xuICAgIHRoaXMudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuYm91bmRfb25Nb3VzZUxlYXZlKTtcbiAgfVxuXG4gIG9uTW91c2VMZWF2ZShlKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctaG92ZXInKTtcbiAgICB0aGlzLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmJvdW5kX29uTW91c2VMZWF2ZSk7XG4gIH1cblxuICBzbmFwKHgsIHdpZHRoKSB7XG4gICAgaWYgKCF0aGlzLnN0ZXApIHJldHVybiB4O1xuICAgIGNvbnN0IHBlcmNlbnQgPSB4IC8gd2lkdGg7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJhbmdlO1xuICAgIGNvbnN0IGNvbnZlcnRlZFZhbHVlID0gcGVyY2VudCAqIHJhbmdlO1xuICAgIGNvbnN0IHNuYXBlZFZhbHVlID0gY29udmVydGVkVmFsdWUgLSAoY29udmVydGVkVmFsdWUgJSB0aGlzLnN0ZXApO1xuICAgIHJldHVybiAoc25hcGVkVmFsdWUgLyByYW5nZSkgKiB3aWR0aFxuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190cmFjay1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX3RyYWNrXCI+PC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX25vdGNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAke1suLi5uZXcgQXJyYXkodGhpcy5zdGVwQ291bnQpXS5tYXAoaSA9PiBgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX25vdGNoXCI+PC9kaXY+YCkuam9pbignXFxuJyl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fbm90Y2gtcG9zdC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICR7Wy4uLm5ldyBBcnJheSh0aGlzLnN0ZXBDb3VudCldLm1hcChpID0+IGA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fbm90Y2hcIj48L2Rpdj5gKS5qb2luKCdcXG4nKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190aHVtYi1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX3RodW1iXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190aHVtYi1ob3ZlclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgLm1kdy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIG1hcmdpbi10b3A6IC02cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICAubWR3LXNsaWRlcl9fdHJhY2sge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTsgKi9cbiAgICAgIH1cblxuICAgICAgLyogOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXNsaWRlcl9fdHJhY2sge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctc2xpZGVyX190cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9ICovXG5cblxuICAgICAgLm1kdy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgfVxuXG4gICAgICAubWR3LXNsaWRlcl9fdGh1bWIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgICAgaGVpZ2h0OiAxMnB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIG1hcmdpbi10b3A6IC01MCU7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX190aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1zbGlkZXJfX3RodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX3RodW1iLWhvdmVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB0b3A6IC0xMnB4O1xuICAgICAgICBsZWZ0OiAtNnB4O1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjFzIGVhc2Utb3V0LGZpbGwgLjFzIGVhc2Utb3V0LFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gLjFzIGVhc2Utb3V0LGZpbGwgLjFzIGVhc2Utb3V0O1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnktLXJnYiksIDAuMTYpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX190aHVtYi1ob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXNsaWRlcl9fdGh1bWItaG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1lcnJvci0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctaG92ZXIpIC5tZHctc2xpZGVyX190aHVtYi1ob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJlc3NlZCkgLm1kdy1zbGlkZXJfX3RodW1iLWhvdmVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xuICAgICAgfVxuXG5cblxuXG4gICAgICAvKiAtLS0gbm90Y2hlcyAtLS0gKi9cblxuICAgICAgLm1kdy1zbGlkZXJfX25vdGNoLWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHdpZHRoOiAyMDAlO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX25vdGNoLXByZS1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXNsaWRlcl9fbm90Y2gtcHJlLWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyIC5tZHctc2xpZGVyX19ub3RjaCB7XG4gICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC41KTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtcHJpbWFyeS0tcmdiKSwgMC41KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuNSk7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1wb3N0LWNvbnRhaW5lciAubWR3LXNsaWRlcl9fbm90Y2gge1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1NuYWNrYmFyIGZyb20gJy4vc2VydmljZS5qcyc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNuYWNrYmFyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSA9IHRoaXMub25QYW5lbENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wYW5lbElkID0gYCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJyl9X3BhbmVsYDtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJykuc2V0QXR0cmlidXRlKCdpZCcsIGAke3RoaXMucGFuZWxJZH1gKTtcbiAgICB0aGlzLmhhc0Jja2Ryb3AgPSB0cnVlO1xuICAgIHRoaXMucGFuZWwuY2xpY2tPdXRzaWRlQ2xvc2UgPSBmYWxzZTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICB9XG5cbiAgZ2V0IHBhbmVsKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLnBhbmVsSWR9YCk7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25fIHx8ICdpbm5lci1ib3R0b20gaW5uZXItbGVmdCc7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZSkge1xuICAgIGNvbnN0IHNwbGl0ID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICB0aGlzLnBvc2l0aW9uXyA9IGAke3NwbGl0WzBdIHx8ICd0b3AnfSAke3NwbGl0WzFdIHx8ICdsZWZ0J31gO1xuICAgIHRoaXMucGFuZWwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICBzaG93KCkge1xuICAgIE1EV1NuYWNrYmFyLmFkZCh0aGlzKTtcbiAgfVxuXG4gIGNsb3NlKG9rKSB7XG4gICAgTURXU25hY2tiYXIucmVtb3ZlKHRoaXMsIG9rKTtcbiAgfVxuXG4gIF9vcGVuKCkge1xuICAgIHRoaXMucGFuZWwuaG9pc3RUb0JvZHkodGhpcy5wYXJlbnROb2RlKTtcbiAgICB0aGlzLnBhbmVsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIHRoaXMucGFuZWwuYXV0b1Bvc2l0aW9uKCk7XG4gICAgdGhpcy5wYW5lbC5vcGVuKCk7XG4gICAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgdGhpcy5hdXRvQ2FuY2VsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgX2Nsb3NlKG9rKSB7XG4gICAgdGhpcy5wYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgdGhpcy5wYW5lbC5jbG9zZSgpO1xuICAgIHRoaXMuZGlzcGF0Y2hDbG9zZShvayk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYXV0b0NhbmNlbFRpbWVvdXQpO1xuXG4gICAgLy8gcmVtb3ZlIHBhbmVsIGVsZW1lbnRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucGFuZWwucmVtb3ZlKCk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG9uUGFuZWxDbG9zZSgpIHtcbiAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25QYW5lbENsb3NlKTtcbiAgfVxuXG4gIGRpc3BhdGNoQ2xvc2UoaXNPayA9IGZhbHNlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2xvc2UnLCB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgb2s6IGlzT2tcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cbn0pO1xuIiwiY29uc3QgTURXU25hY2tiYXIgPSBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gIH1cblxuICBhZGQoZWwpIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goe2VsfSk7XG4gICAgdGhpcy5oYW5kbGVRdWV1ZSgpO1xuICB9XG5cbiAgcmVtb3ZlKGVsLCBvaykge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmVsID09PSBlbCkgZWwuX2Nsb3NlKG9rKTtcbiAgICBlbHNlIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihlID0+IGUuZWwgIT09IGVsKTtcbiAgfVxuXG4gIGhhbmRsZVF1ZXVlKCkge1xuICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgIHRoaXMuY3VycmVudC5lbC5fb3BlbigpO1xuICAgICAgdGhpcy5jdXJyZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlUXVldWUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNob3coeyBtZXNzYWdlLCBhY3Rpb25MYWJlbCwgcG9zaXRpb24gfSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy51aWQoKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7IGlkLCBtZXNzYWdlLCBhY3Rpb25MYWJlbCB9KTtcblxuICAgICAgdGhpcy50b3BMZXZlbEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuICAgICAgY29uc3Qgb25jbG9zZSA9IChlKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZS5kZXRhaWwub2spO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgIH07XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgaWYgKHBvc2l0aW9uKSBlbC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICBlbC5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdG9wTGV2ZWxFbGVtZW50KCkge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignbWR3LWNvbnRlbnQnKTtcbiAgICBpZiAoZWwpIHJldHVybiBlbDtcblxuICAgIGVsID0gZG9jdW1lbnQuYm9keXF1ZXJ5U2VsZWN0b3IoJ21kdy1ib2R5Jyk7XG4gICAgaWYgKGVsKSByZXR1cm4gZWw7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIHVpZCgpIHtcbiAgICByZXR1cm4gYHNuYWNrYmFyXyR7cGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDk5OTk5KX1gO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBpZCwgbWVzc2FnZSwgYWN0aW9uTGFiZWwgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8bWR3LXNuYWNrYmFyIGlkPVwiJHtpZH1cIj5cbiAgICAgICAgPG1kdy1wYW5lbD5cbiAgICAgICAgICA8bWR3LXNuYWNrYmFyLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxtZHctc25hY2tiYXItY29udGVudD4ke21lc3NhZ2V9PC9tZHctc25hY2tiYXItY29udGVudD5cbiAgICAgICAgICAgIDxtZHctc25hY2tiYXItYWN0aW9ucz5cbiAgICAgICAgICAgICAgJHshIWFjdGlvbkxhYmVsID8gYDxtZHctYnV0dG9uIGNsYXNzPVwibWR3LWFjdGlvbi1idXR0b25cIj4ke2FjdGlvbkxhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgICAgICAgIDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke2lkfS5jbG9zZSh0cnVlKVwiIGNsYXNzPVwibWR3LWNsb3NlLWJ1dHRvbiBtZHctaWNvblwiPlxuICAgICAgICAgICAgICAgIDxtZHctaWNvbj5jbG9zZTwvbWR3LWljb24+XG4gICAgICAgICAgICAgIDwvbWR3LWJ1dHRvbj5cbiAgICAgICAgICAgIDwvbWR3LXNuYWNrYmFyLWFjdGlvbnM+XG4gICAgICAgICAgPC9tZHctc25hY2tiYXItY29udGFpbmVyPlxuICAgICAgICA8L21kdy1wYW5lbD5cbiAgICAgIDwvbWR3LXNuYWNrYmFyPlxuICAgIGA7XG4gIH1cbn1cblxud2luZG93Lk1EV1NuYWNrYmFyID0gTURXU25hY2tiYXI7XG5cbmV4cG9ydCBkZWZhdWx0IE1EV1NuYWNrYmFyO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zd2l0Y2gnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfb25JbnB1dENoYW5nZSA9IHRoaXMub25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX29uSW5wdXRDaGFuZ2UpO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiBbdGhpcy5pbnB1dF0sXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgY2VudGVyZWQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2NsaWNrKTtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydjaGVja2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IGlucHV0KCkge1xuICAgIGlmICghdGhpcy5pbnB1dF8pIHRoaXMuaW5wdXRfID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRfO1xuICB9XG5cbiAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tlZDtcbiAgfVxuXG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAnJykgdmFsdWUgPSB0cnVlO1xuICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlQ2hlY2tlZENsYXNzKCk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICAgIGlmICh2YWx1ZSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgZWxzZSB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZUNoZWNrZWRDbGFzcygpIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ2NoZWNrZWQnKTtcbiAgICBlbHNlIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICB9XG5cbiAgb25JbnB1dENoYW5nZShlKSB7XG4gICAgdGhpcy51cGRhdGVDaGVja2VkQ2xhc3MoKTtcbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctdHJhY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctdGh1bWItdW5kZXJsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy10aHVtYlwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByb2xlPVwic3dpdGNoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LXN3aXRjaC1yaXBwbGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICAubWR3LXRyYWNrIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGhlaWdodDogMTRweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAgICAgb3BhY2l0eTogLjM4O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSksXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yIDkwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpub3QoLmNoZWNrZWQpKSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtb24tYmFja2dyb3VuZC0tcmdiKSwgMC43KTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjcpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguY2hlY2tlZCkgLm1kdy10cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBvcGFjaXR5OiAuNTQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkLm1kdy1wcmltYXJ5KSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQubWR3LWVycm9yKSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIHRodW1iIHVuZGVybGF5IC0tLSAqL1xuXG4gICAgICAubWR3LXRodW1iLXVuZGVybGF5IHtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsMCwwLDApO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm0sb3BhY2l0eTtcbiAgICAgICAgbGVmdDogLTE4cHg7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICB0b3A6IC0xN3B4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvciA5MG1zIGN1YmljLWJlemllciguNCwwLC4yLDEpLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXItY29sb3IgOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQpIC5tZHctdGh1bWItdW5kZXJsYXkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG4gICAgICB9XG5cbiAgICAgIC5tZHctdGh1bWItdW5kZXJsYXk6YWZ0ZXIsXG4gICAgICAubWR3LXRodW1iLXVuZGVybGF5OmJlZm9yZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy10aHVtYi11bmRlcmxheTphZnRlcixcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy10aHVtYi11bmRlcmxheTpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctdGh1bWItdW5kZXJsYXk6YWZ0ZXIsXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXRodW1iLXVuZGVybGF5OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctdGh1bWItdW5kZXJsYXk6YmVmb3JlIHtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNW1zIGxpbmVhcixiYWNrZ3JvdW5kLWNvbG9yIDE1bXMgbGluZWFyO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIHRodW1iIC0tLSAqL1xuXG4gICAgICAubWR3LXRodW1iIHtcbiAgICAgICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksXG4gICAgICAgICAgICAgICAgICAgIDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSxcbiAgICAgICAgICAgICAgICAgICAgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICBib3JkZXI6IDEwcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkKSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkLm1kdy1wcmltYXJ5KSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQubWR3LWVycm9yKSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCg6bm90KC5jaGVja2VkKSkgLm1kdy10aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgIGJvcmRlci1jb2xvcjogI2ZmZjtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gaW5wdXQgLS0tICovXG5cbiAgICAgIGlucHV0IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogNjhweDtcbiAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkKSBpbnB1dCB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XG4gICAgICB9XG5cblxuXG4gICAgICAvKiAtLS0gcmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICAubWR3LXN3aXRjaC1yaXBwbGUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYi1ib2R5JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlckJvZHkodGhpcyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUudW5yZWdpc3RlckJvZHkodGhpcyk7XG4gIH1cblxuICBhZGRTbG90KCkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdtZHctdGFiLWJvZHktY29udGVudCcpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgJzxzbG90Pjwvc2xvdD4nKTtcbiAgfVxuXG4gIHJlbW92ZVNsb3QoKSB7XG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRkU2xvdCgpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWFjdGl2ZScpO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnJlbW92ZVNsb3QoKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1hY3RpdmUnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy10YWItYm9keS1jb250ZW50PlxuICAgICAgICA8IS0tIHNsb3QgaXMgYWRkZWQgZHluYW1pY2x5IC0tPlxuICAgICAgPC9tZHctdGFiLWJvZHktY29udGVudD5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICBtZHctdGFiLWJvZHktY29udGVudCB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1JpcHBsZSBmcm9tICcuLi8uLi8uLi9jb3JlL1JpcHBsZS5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYi1idXR0b24nLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfY2xpY2sgPSB0aGlzLmNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBNRFdSaXBwbGUoe1xuICAgICAgZWxlbWVudDogdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpc1xuICAgIH0pO1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlclRhYih0aGlzKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9jbGljayk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnVucmVnaXN0ZXJUYWIodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfY2xpY2spO1xuICB9XG5cbiAgZ2V0IGluZGljYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQnKTtcbiAgfVxuXG4gIGNsaWNrKGUpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUudGFiQ2xpY2sodGhpcyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fYW5pbWF0aW9uVGltZXIpO1xuICAgIHRoaXMuaW5kaWNhdG9yLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgIHRoaXMuX3J1bk5leHRBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1hY3RpdmUnKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlKG1vdmVYKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICB0aGlzLmluZGljYXRvci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke21vdmVYLnRvU3RyaW5nKCl9cHgpYDtcbiAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctYWN0aXZlJyk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIF9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZSk7XG4gICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfSk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPjxzbG90Pjwvc2xvdD48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kdy10YWItYnV0dG9uLWluZGljYXRvclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1kdy10YWItYnV0dG9uLWluZGljYXRvcl9fY29udGVudCBtZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZVwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmlwcGxlIG1kdy10YWItYnV0dG9uLXJpcHBsZVwiPjwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0KC5tZHctc2hvdy1zcGlubmVyKSBzcGFuLnRleHQge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGhpcyB0byBidXR0b24gb3IgY3JlYXQgYSBuZXcgY29tcG9uZW5ldCBtZHctdGFiICovXG4gICAgICAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWFjdGl2ZSkgLm1kdy10YWItYnV0dG9uLWluZGljYXRvciAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yX19jb250ZW50IHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4ycyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy10YWItYnV0dG9uLWluZGljYXRvcl9fY29udGVudCB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYWN0aXZlKSAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yX19jb250ZW50IHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yIC5tZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LXRhYi1idXR0b24tcmlwcGxlLFxuICAgICAgLm1kdy10YWItYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYWN0aXZlKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtcHJpbWFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy10YWJzLWJhcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWN0aXZlVGFiID0gMDtcbiAgICB0aGlzLnRhYklkQ291bnRlciA9IDA7XG4gICAgdGhpcy5fY29udGVudEVsZW1lbnRzID0gW107XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICAvLyBjYWxsZWQgZnJvbSBtZHctdGFiXG4gIHJlZ2lzdGVyVGFiKGVsKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKCd0YWItaWQnLCB0aGlzLnRhYklkQ291bnRlcik7XG4gICAgaWYgKHRoaXMudGFiSWRDb3VudGVyID09PSAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IGVsO1xuICAgICAgZWwuYWN0aXZhdGUoKTtcbiAgICB9XG4gICAgdGhpcy50YWJJZENvdW50ZXIrKztcbiAgfVxuXG4gIC8vIGNhbGxlZCBmcm9tIG1kdy10YWJcbiAgdW5yZWdpc3RlclRhYihlbCkge1xuICAgIC8vIFRPRE8gaGFuZGxlIGlmIGl0IGlzIGFjdGl2ZVxuICB9XG5cbiAgLy8gY2FsbGVkIGZyb20gbWR3LXRhYnMtY29udGVudFxuICByZWdpc3RlckNvbnRlbnQoZWwpIHtcbiAgICB0aGlzLl9jb250ZW50RWxlbWVudHMucHVzaChlbCk7XG4gICAgZWwuY2hhbmdlVGFiKHRoaXMuYWN0aXZlVGFiLmdldEF0dHJpYnV0ZSgndGFiLWlkJykpO1xuICB9XG5cbiAgLy8gY2FsbGVkIGZyb20gbWR3LXRhYnMtY29udGVudFxuICB1bnJlZ2lzdGVyQ29udGVudChlbCkge1xuICAgIHRoaXMuX2NvbnRlbnRFbGVtZW50cyA9IHRoaXMuX2NvbnRlbnRFbGVtZW50cy5maWx0ZXIoZSA9PiBlICE9IGVsKTtcbiAgfVxuXG4gIC8vIGNhbGxlZCBmcm9tIG1kdy10YWJcbiAgdGFiQ2xpY2soZWwpIHtcbiAgICBjb25zdCBtb3ZlWCA9IHBhcnNlSW50KGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnggLSB0aGlzLmFjdGl2ZVRhYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54KTtcbiAgICB0aGlzLmFjdGl2ZVRhYi5kZWFjdGl2YXRlKG1vdmVYKTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGVsO1xuICAgIHRoaXMuYWN0aXZlVGFiLmFjdGl2YXRlKCk7XG4gICAgdGhpcy5fY29udGVudEVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWwuY2hhbmdlVGFiKHRoaXMuYWN0aXZlVGFiLmdldEF0dHJpYnV0ZSgndGFiLWlkJykpKTtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIHNldCBhY3RpdmVUYWIoZWwpIHtcbiAgICB0aGlzLl9hY3RpdmVUYWIgPSBlbDtcbiAgfVxuXG4gIGdldCBpbnRlcm5hbFN0eWxlc0ZpbGUoKSB7XG4gICAgcmV0dXJuICcuL2ludGVybmFsLmNzcydcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy10YWJzLWJhci1zY3JvbGxlcj5cbiAgICAgICAgPG1kdy10YWJzLWJhci1zY3JvbGxlci1hcmVhPlxuICAgICAgICAgIDxtZHctdGFicy1iYXItc2Nyb2xsZXItY29udGVudD5cbiAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgICA8L21kdy10YWJzLWJhci1zY3JvbGxlci1jb250ZW50PlxuICAgICAgICA8L21kdy10YWJzLWJhci1zY3JvbGxlci1hcmVhPlxuICAgICAgPC9tZHctdGFicy1iYXItc2Nyb2xsZXI+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgbWR3LXRhYnMtYmFyLXNjcm9sbGVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgIH1cblxuICAgICAgbWR3LXRhYnMtYmFyLXNjcm9sbGVyLWFyZWEge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAvKiBvdmVyZmxvdy14OiBzY3JvbGw7ICovXG4gICAgICB9XG5cbiAgICAgIG1kdy10YWJzLWJhci1zY3JvbGxlci1jb250ZW50IHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQobWR3LWJ1dHRvbikge1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYnMtY29udGVudCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYm9kaWVzID0gW107XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnRhYnNCYXIucmVnaXN0ZXJDb250ZW50KHRoaXMpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy50YWJzQmFyICYmIHRoaXMudGFic0Jhci51bnJlZ2lzdGVyQ29udGVudCh0aGlzKTtcbiAgfVxuXG4gIGdldCB0YWJzQmFyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYG1kdy10YWJzLWJhciMke3RoaXMuZ2V0QXR0cmlidXRlKCd0YWJzLWlkJyl9YCk7XG4gIH1cblxuICByZWdpc3RlckJvZHkoZWwpIHtcbiAgICB0aGlzLl9ib2RpZXMucHVzaChlbCk7XG4gICAgaWYgKHRoaXMuX3dpYXRGb3JCb2R5QWN0aXZlSWQgICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fYm9kaWVzLmxlbmd0aCA9PT0gdGhpcy5fd2lhdEZvckJvZHlBY3RpdmVJZCArIDEpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZUJvZHkgPSBlbDtcbiAgICAgIGVsLmFjdGl2YXRlKCk7XG4gICAgICB0aGlzLl93aWF0Rm9yQm9keUFjdGl2ZUlkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHVucmVnaXN0ZXJCb2R5KGVsKSB7XG4gICAgdGhpcy5fYm9kaWVzID0gdGhpcy5fYm9kaWVzLmZpbHRlcihpID0+IGkgIT0gZWwpO1xuICB9XG5cbiAgY2hhbmdlVGFiKHRhYklkKSB7XG4gICAgaWYgKCF0aGlzLl9ib2RpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl93aWF0Rm9yQm9keUFjdGl2ZUlkID0gcGFyc2VJbnQodGFiSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWN0aXZlQm9keSkgdGhpcy5fYWN0aXZlQm9keS5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5fYWN0aXZlQm9keSA9IHRoaXMuX2JvZGllc1t0YWJJZF07XG4gICAgdGhpcy5fYWN0aXZlQm9keS5hY3RpdmF0ZSgpO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRleHRmaWVsZCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctbm8tYW5pbWF0aW9uJyk7XG4gICAgdGhpcy5ib3VuZF9vbkZvY3VzID0gdGhpcy5vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbkJsdXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25JbnB1dCA9IHRoaXMub25JbnB1dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5jb21wb3NlKCk7XG4gICAgdGhpcy5jaGVja0ZvclZhbHVlKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LW5vLWFuaW1hdGlvbicpO1xuICAgIH0sIDApO1xuXG4gICAgLy8gYWRkIGxpc3RlbmVyc1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmJvdW5kX29uRm9jdXMpO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZF9vbklucHV0KTtcblxuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LWludmFsaWQnLCAhdGhpcy52YWxpZCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyByZW1vdmUgbGlzdGVuZXJzXG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuYm91bmRfb25Gb2N1cyk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kX29uSW5wdXQpO1xuICB9XG5cbiAgY29tcG9zZSgpIHtcbiAgICAvKiBGb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgbW9zdCBvZiB0aGUgZmVhdHVyZXMgYXJlIGJ1aWx0IHdpdGggY3NzIGFuZCB0aGUgY29kZSBpcyB0cmVhdGVkIGFzIGFuIHVwZ3JhZGVcbiAgICAgKiAgJ21kdy11cGdyYWRlZCcgbGV0cyB1cyBrbm93IHRoYXQgdGhlIGNvZGUgaXMgaG9va2VkIHVwXG4gICAgICovXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctdXBncmFkZWQnKTtcblxuICAgIC8qIHRleHRhcmVhIGNzcyBtYXJrZXJcbiAgICAgKiAgdGVzdCBhcmVhIG1vc3RseSB3b3JrcyB3aXRob3V0IHdjIGNvbXBhdGFiaWxpdHkuIFRoZSBvbmx5IHRoaW5nIHRoYXQgZG9lcyBub3Qgd29yayBpcyBzb21lIG92ZXJsYXBwaW5nIHdpdGggdGhlIGxhYmVsXG4gICAgICovXG4gICAgaWYgKHRoaXMuaXNUZXh0YXJlYSgpKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy10ZXh0YXJlYScpO1xuXG4gICAgLyogQWRkIGh0bWwgZm9yIG91dGxpbmVkXG4gICAgICogIG91dGxpbmVkIGRvZXMgbm90IHdvcmsgd2l0aG91dCBjb21wYXRhYmlsaXR5XG4gICAgICovXG4gICAgaWYgKHRoaXMub3V0bGluZWQpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLm91dGxpbmVkSFRNTCk7XG4gICAgICB0aGlzLnNldE5vdGNoV2lkdGgoKTtcbiAgICB9XG5cbiAgICAvKiBBZGQgcmlwcGxlIGh0bWwgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKi9cbiAgICBpZiAoIXRoaXMucXVlcnlTZWxlY3RvcignLm1kdy1saW5lLXJpcHBsZScpKSB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5saW5lUmlwcGxlSFRNTCk7XG5cbiAgICAvKiBGaXggbGF5b3V0IGZvciBpY29ucyBibGFjZWQgYmVmb3JlIGhlIGlucHV0XG4gICAgICogIFRoaXMgaXMgbm90IGhhbmRsZWQgaW4gbm9uIGNvbXBhdGFibGUgYnJvd3NlcnNcbiAgICAgKi9cbiAgICBpZiAodGhpcy5pc1RyYWlsaW5nSWNvbigpKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy10cmFpbGluZy1pY29uJyk7XG4gIH1cblxuICBjaGVja0ZvclZhbHVlKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbm90LWVtcHR5JywgISF0aGlzLmlucHV0LnZhbHVlLmxlbmd0aCk7XG4gIH1cblxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuc2V0Tm90Y2hXaWR0aCgpO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbm90LWVtcHR5JywgISF0aGlzLmlucHV0LnZhbHVlLmxlbmd0aCk7XG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdtZHctaW52YWxpZCcsICF0aGlzLnZhbGlkKTtcbiAgfVxuXG4gIG9uSW5wdXQoKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdtZHctaW52YWxpZCcsICF0aGlzLnZhbGlkKTtcbiAgfVxuXG4gIHNldE5vdGNoV2lkdGgoKSB7XG4gICAgaWYgKHRoaXMub3V0bGluZWQpIHRoaXMubm90Y2guc3R5bGUud2lkdGggPSB0aGlzLmxhYmVsV2lkdGggKyAncHgnO1xuICB9XG5cbiAgLyogSWNvbnMgY2FuIGJlIHBsYWNlcyBhdCB0aGUgYmVnaW5pbmcgcm8gZW5kIG9mIGEgdGV4dCBmaWVsZFxuICAgKiB0aGVyZSBpcyBzb21lIGNzcyB0aGF0IGlzIGhhcmQgdG8gYXBwbHkgd2hlbiB0aGUgaWNvbiBpcyBhdCB0aGUgYmVnaW5pbmcsIHRoaXMgaGVscHNcbiAgICovXG4gIGlzVHJhaWxpbmdJY29uKCkge1xuICAgIGlmICghdGhpcy5pY29uRWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBbLi4udGhpcy5jaGlsZHJlbl0uaW5kZXhPZih0aGlzLmljb25FbGVtZW50KSA+IDE7XG4gIH1cblxuICBpc1RleHRhcmVhKCkge1xuICAgIHJldHVybiAhIXRoaXMucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKTtcbiAgfVxuXG4gIGdldCB2YWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC52YWxpZGl0eS52YWxpZDtcbiAgfVxuXG4gIGdldCBvdXRsaW5lZCgpIHtcbiAgICByZXR1cm4gW10uc2xpY2UuYXBwbHkodGhpcy5jbGFzc0xpc3QgfHwgW10pLmluY2x1ZGVzKCdtZHctb3V0bGluZWQnKTtcbiAgfVxuXG4gIGdldCBpbnB1dCgpIHtcbiAgICBpZiAoIXRoaXMuaW5wdXRUeXBlXykgdGhpcy5pbnB1dFR5cGVfID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpID8gJ2lucHV0JyA6ICd0ZXh0YXJlYSc7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmlucHV0VHlwZV8pO1xuICB9XG5cbiAgLy8gdGhpcyBpcyB0aGUgc2VjdGlvbiB3aGVyZSB0aGUgbGFiZWxzIHNpdHMgd2hlbiBpbiBvdXRsaW5lZCBtb2RlXG4gIGdldCBub3RjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWR3LW91dGxpbmVkLW5vdGNoJyk7XG4gIH1cblxuICBnZXQgbGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgYSBtb3JlIGFjdXJhdGUgd2F5IG9yIGdldHRpbmcgdGhlIHdpZHRoXG4gIGdldCBsYWJlbFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmxhYmVsLm9mZnNldFdpZHRoICogMC45NTtcbiAgfVxuXG4gIGdldCBoZWxwZXJUZXh0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctdGV4dGZpZWxkLWhlbHBlcicpO1xuICB9XG5cbiAgZ2V0IGljb25FbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1pY29uJyk7XG4gIH1cblxuICBnZXQgb3V0bGluZWRIVE1MKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWJvcmRlci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC1sZWFkaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctb3V0bGluZWQtbm90Y2hcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC10cmFpbGluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIGdldCBsaW5lUmlwcGxlSFRNTCgpIHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJtZHctbGluZS1yaXBwbGVcIj48L2Rpdj4nO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRvcC1hcHAtYmFyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLk1BWF9UT1BfQVBQX0JBUl9IRUlHSFQgPSAxMjg7XG4gICAgdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA9IDA7XG4gICAgdGhpcy53YXNEb2NrZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNEb2NrZWRTaG93aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ3VycmVudGx5QmVpbmdSZXNpemVkID0gZmFsc2U7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNjcm9sbFRhcmdldCA9IHRoaXMuZ2V0U2Nyb2xsVGFyZ2V0KCk7XG4gICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xuICAgIHRoaXMudG9wQXBwQmFySGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAvLyBhZGQgc3BhY2VyIHRvIGNvbnRlbnQgYXJlYVxuICAgIC8vIFRPRE8gYWRkIGFub3RoZXIgY2xhc3MgYmFzZWQgb24gcHJvbWluZW50LCBkZW5zZVxuICAgIGlmICh0aGlzLmhhc0NvbnRlbnQgJiYgIXRoaXMuc2Nyb2xsVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5tZHctdG9wLWFwcC1iYXInKSkge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbWR3LXRvcC1hcHAtYmFyJyk7XG4gICAgICB0aGlzLnNjcm9sbFRhcmdldC5wcmVwZW5kKGRpdik7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtZHctdG9wLWFwcC1iYXInKTtcblxuICAgIHRoaXMudGhyb3R0bGVkU2Nyb2xsSGFuZGxlciA9IE1EV1V0aWxzLnJhZlRocm90dGxlKHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgdGhpcy50aHJvdHRsZWRSZXNpemVIYW5kbGVyID0gTURXVXRpbHMucmFmVGhyb3R0bGUodGhpcy5yZXNpemVIYW5kbGVyKTtcbiAgICB0aGlzLnNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnRocm90dGxlZFNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudGhyb3R0bGVkUmVzaXplSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMudGhyb3R0bGVkU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy50aHJvdHRsZWRSZXNpemVIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0IGZpeGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWZpeGVkJyk7XG4gIH1cblxuICBnZXQgaGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIGdldFNjcm9sbFRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnTURXLVBBR0UnKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LWNvbnRlbnQnKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMuaGFzQ29udGVudCA9IHRydWU7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgdG9wQXBwQmFyU2Nyb2xsSGFuZGxlcigpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLmdldFZpZXdwb3J0U2Nyb2xsWSgpLCAwKTtcbiAgICBjb25zdCBkaWZmID0gY3VycmVudFNjcm9sbFBvc2l0aW9uIC0gdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb247XG4gICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IGlzIGJlaW5nIHJlc2l6ZWQgdGhlIGxhc3RTY3JvbGxQb3NpdGlvbl8gbmVlZHMgdG8gYmUgdXBkYXRlZCBidXQgdGhlXG4gICAgLy8gY3VycmVudCBzY3JvbGwgb2YgdGhlIHRvcCBhcHAgYmFyIHNob3VsZCBzdGF5IGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgIGlmICghdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZCkge1xuICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wIC09IGRpZmY7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCkgPiB0aGlzLnRvcEFwcEJhckhlaWdodCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgPSAtdGhpcy50b3BBcHBCYXJIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW92ZVRvcEFwcEJhcigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVUb3BBcHBCYXIoKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JVcGRhdGUoKSkge1xuICAgICAgLy8gT25jZSB0aGUgdG9wIGFwcCBiYXIgaXMgZnVsbHkgaGlkZGVuIHdlIHVzZSB0aGUgbWF4IHBvdGVudGlhbCB0b3AgYXBwIGJhciBoZWlnaHQgYXMgb3VyIG9mZnNldFxuICAgICAgLy8gc28gdGhlIHRvcCBhcHAgYmFyIGRvZXNuJ3Qgc2hvdyBpZiB0aGUgd2luZG93IHJlc2l6ZXMgYW5kIHRoZSBuZXcgaGVpZ2h0ID4gdGhlIG9sZCBoZWlnaHQuXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wO1xuICAgICAgaWYgKE1hdGguYWJzKG9mZnNldCkgPj0gdGhpcy50b3BBcHBCYXJIZWlnaHQpIHtcbiAgICAgICAgb2Zmc2V0ID0gLXRoaXMuTUFYX1RPUF9BUFBfQkFSX0hFSUdIVDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdHlsZS50b3AgPSBvZmZzZXQgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRm9yVXBkYXRlKCkge1xuICAgIGNvbnN0IG9mZnNjcmVlbkJvdW5kYXJ5VG9wID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0O1xuICAgIGNvbnN0IGhhc0FueVBpeGVsc09mZnNjcmVlbiA9IHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA8IDA7XG4gICAgY29uc3QgaGFzQW55UGl4ZWxzT25zY3JlZW4gPSB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgPiBvZmZzY3JlZW5Cb3VuZGFyeVRvcDtcbiAgICBjb25zdCBwYXJ0aWFsbHlTaG93aW5nID0gaGFzQW55UGl4ZWxzT2Zmc2NyZWVuICYmIGhhc0FueVBpeGVsc09uc2NyZWVuO1xuXG4gICAgLy8gSWYgaXQncyBwYXJ0aWFsbHkgc2hvd2luZywgaXQgY2FuJ3QgYmUgZG9ja2VkLlxuICAgIGlmIChwYXJ0aWFsbHlTaG93aW5nKSB7XG4gICAgICB0aGlzLndhc0RvY2tlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3QgcHJldmlvdXNseSBkb2NrZWQgYW5kIG5vdCBwYXJ0aWFsbHkgc2hvd2luZywgaXQncyBub3cgZG9ja2VkLlxuICAgICAgaWYgKCF0aGlzLndhc0RvY2tlZCkge1xuICAgICAgICB0aGlzLndhc0RvY2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRG9ja2VkU2hvd2luZyAhPT0gaGFzQW55UGl4ZWxzT25zY3JlZW4pIHtcbiAgICAgICAgdGhpcy5pc0RvY2tlZFNob3dpbmcgPSBoYXNBbnlQaXhlbHNPbnNjcmVlbjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRpYWxseVNob3dpbmc7XG4gIH1cblxuICByZXNpemVIYW5kbGVyKCkge1xuICAgIHRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICBpZiAodGhpcy50b3BBcHBCYXJIZWlnaHQgIT09IGN1cnJlbnRIZWlnaHQpIHtcbiAgICAgIHRoaXMud2FzRG9ja2VkID0gZmFsc2U7XG5cbiAgICAgIC8vIFNpbmNlIHRoZSB0b3AgYXBwIGJhciBoYXMgYSBkaWZmZXJlbnQgaGVpZ2h0IGRlcGVuZGluZyBvbiB0aGUgc2NyZWVuIHdpZHRoLCB0aGlzXG4gICAgICAvLyB3aWxsIGVuc3VyZSB0aGF0IHRoZSB0b3AgYXBwIGJhciByZW1haW5zIGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uIGlmXG4gICAgICAvLyBjb21wbGV0ZWx5IGhpZGRlbiBhbmQgYSByZXNpemUgbWFrZXMgdGhlIHRvcCBhcHAgYmFyIGEgZGlmZmVyZW50IGhlaWdodC5cbiAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCAtPSB0aGlzLnRvcEFwcEJhckhlaWdodCAtIGN1cnJlbnRIZWlnaHQ7XG4gICAgICB0aGlzLnRvcEFwcEJhckhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMudG9wQXBwQmFyU2Nyb2xsSGFuZGxlcigpO1xuICAgIHRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWQgPSBmYWxzZTtcbiAgfVxuXG5cbiAgc2Nyb2xsSGFuZGxlcigpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLmdldFZpZXdwb3J0U2Nyb2xsWSgpLCAwKTtcblxuICAgIGlmICghdGhpcy5maXhlZCkge1xuICAgICAgY29uc3QgZGlmZiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiAtIHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uO1xuICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAgIC8vIElmIHRoZSB3aW5kb3cgaXMgYmVpbmcgcmVzaXplZCB0aGUgbGFzdFNjcm9sbFBvc2l0aW9uXyBuZWVkcyB0byBiZSB1cGRhdGVkIGJ1dCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgc2Nyb2xsIG9mIHRoZSB0b3AgYXBwIGJhciBzaG91bGQgc3RheSBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgLT0gZGlmZjtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wID4gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnModGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wKSA+IHRoaXMudG9wQXBwQmFySGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlVG9wQXBwQmFyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPD0gMCkge1xuICAgICAgICBpZiAodGhpcy53YXNTY3JvbGxlZF8pIHtcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zY3JvbGxlZCcpO1xuICAgICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy53YXNTY3JvbGxlZF8pIHtcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zY3JvbGxlZCcpO1xuICAgICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFZpZXdwb3J0U2Nyb2xsWSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxUYXJnZXRbdGhpcy5zY3JvbGxUYXJnZXQgPT09IHdpbmRvdyA/ICdwYWdlWU9mZnNldCcgOiAnc2Nyb2xsVG9wJ107XG4gIH1cbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURXUmlwcGxlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcbiAgICB0aGlzLlJJUFBMRV9GQURFX0lOX0RVUkFUSU9OID0gMjAwO1xuICAgIHRoaXMuUklQUExFX0ZBREVfT1VUX0RVUkFUSU9OID0gMTUwO1xuICAgIHRoaXMuUklQUExFX1NUQVRFID0ge1xuICAgICAgRkFESU5HX0lOOiAnRkFESU5HX0lOJyxcbiAgICAgIFZJU0lCTEU6ICdWSVNJQkxFJyxcbiAgICAgIEZBRElOR19PVVQ6ICdGQURJTkdfT1VUJyxcbiAgICAgIEhJRERFTjogJ0hJRERFTidcbiAgICB9O1xuXG4gICAgaWYgKCFjb25maWcuZWxlbWVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGNvbmZpZy5lbGVtZW50Jyk7XG4gICAgaWYgKCFjb25maWcudHJpZ2dlckVsZW1lbnQpIHRocm93IEVycm9yKCdyZXF1aXJlcyBjb25maWcudHJpZ2dlckVsZW1lbnQnKTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGNvbmZpZy5lbGVtZW50O1xuICAgIHRoaXMudHJpZ2dlckVsZW1lbnQgPSBbXS5jb25jYXQoY29uZmlnLnRyaWdnZXJFbGVtZW50KS5maWx0ZXIoZWwgPT4gISFlbCk7XG4gICAgdGhpcy5jZW50ZXJlZCA9ICEhY29uZmlnLmNlbnRlcmVkO1xuICAgIHRoaXMuc3BlZWRGYWN0b3IgPSBjb25maWcuc3BlZWRGYWN0b3IgfHwgMTtcbiAgICB0aGlzLnJhZGl1cyA9IGNvbmZpZy5yYWRpdXM7XG4gICAgdGhpcy5jb2xvciA9IGNvbmZpZy5jb2xvciB8fCBudWxsO1xuICAgIHRoaXMucGVyc2lzdGVudCA9ICEhY29uZmlnLnBlcnNpc3RlbnQ7XG4gICAgdGhpcy5hY3RpdmVSaXBwbGVzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuaXNNb3VzZWRvd24gPSBmYWxzZTtcbiAgICB0aGlzLmJvdW5kX21vdXNlc2Rvd25fID0gdGhpcy5tb3VzZXNkb3duXy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfbW91c2V1cF8gPSB0aGlzLm1vdXNldXBfLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9tb3VzZWxlYXZlXyA9IHRoaXMubW91c2VsZWF2ZV8uYmluZCh0aGlzKTtcblxuICAgIHRoaXMudHJpZ2dlckVsZW1lbnQuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX21vdXNlc2Rvd25fKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy50cmlnZ2VyRWxlbWVudC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfbW91c2VzZG93bl8pO1xuICAgIH0pO1xuICB9XG5cbiAgbW91c2VzZG93bl8oZXZlbnQpIHtcbiAgICB0aGlzLmlzTW91c2Vkb3duID0gdHJ1ZTtcbiAgICB0aGlzLnRyaWdnZXJFbGVtZW50LmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfbW91c2V1cF8pO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuYm91bmRfbW91c2VsZWF2ZV8pO1xuICAgIH0pO1xuICAgIHRoaXMuZmFkZUluUmlwcGxlKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG4gIH1cblxuICBtb3VzZXVwXyhldmVudCkge1xuICAgIHRoaXMuaXNNb3VzZWRvd24gPSBmYWxzZTtcbiAgICAvLyBGYWRlLW91dCBhbGwgcmlwcGxlcyB0aGF0IGFyZSBjb21wbGV0ZWx5IHZpc2libGUgYW5kIG5vdCBwZXJzaXN0ZW50LlxuICAgIHRoaXMuYWN0aXZlUmlwcGxlcy5mb3JFYWNoKHJpcHBsZSA9PiB7XG4gICAgICBpZiAoIXJpcHBsZS5jb25maWcucGVyc2lzdGVudCAmJiByaXBwbGUuc3RhdGUgPT09IHRoaXMuUklQUExFX1NUQVRFLlZJU0lCTEUpIHJpcHBsZS5mYWRlT3V0KCk7XG4gICAgfSk7XG4gICAgdGhpcy50cmlnZ2VyRWxlbWVudC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX21vdXNldXBfKTtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmJvdW5kX21vdXNlbGVhdmVfKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdXNlbGVhdmVfKCkge1xuICAgIGlmICh0aGlzLmlzTW91c2Vkb3duKSB0aGlzLm1vdXNldXBfKCk7XG4gIH1cblxuXG4gIGZhZGVJblJpcHBsZShwYWdlWCwgcGFnZVkpIHtcbiAgICBjb25zdCBjb250YWluZXJSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKHRoaXMuY2VudGVyZWQpIHtcbiAgICAgIHBhZ2VYID0gY29udGFpbmVyUmVjdC5sZWZ0ICsgY29udGFpbmVyUmVjdC53aWR0aCAvIDI7XG4gICAgICBwYWdlWSA9IGNvbnRhaW5lclJlY3QudG9wICsgY29udGFpbmVyUmVjdC5oZWlnaHQgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdWJ0cmFjdCBzY3JvbGwgdmFsdWVzIGZyb20gdGhlIGNvb3JkaW5hdGVzIGJlY2F1c2UgY2FsY3VsYXRpb25zIGJlbG93XG4gICAgICAvLyBhcmUgYWx3YXlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydCByZWN0YW5nbGUuXG4gICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgcGFnZVggLT0gc2Nyb2xsUG9zaXRpb24ubGVmdDtcbiAgICAgIHBhZ2VZIC09IHNjcm9sbFBvc2l0aW9uLnRvcDtcbiAgICB9XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLnJhZGl1cyB8fCB0aGlzLmRpc3RhbmNlVG9GdXJ0aGVzdENvcm5lcihwYWdlWCwgcGFnZVksIGNvbnRhaW5lclJlY3QpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5SSVBQTEVfRkFERV9JTl9EVVJBVElPTiAqICgxIC8gdGhpcy5zcGVlZEZhY3Rvcik7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IHBhZ2VYIC0gY29udGFpbmVyUmVjdC5sZWZ0O1xuICAgIGNvbnN0IG9mZnNldFkgPSBwYWdlWSAtIGNvbnRhaW5lclJlY3QudG9wO1xuXG4gICAgY29uc3QgcmlwcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoJ21kdy1yaXBwbGUtZWxlbWVudCcpO1xuICAgIHJpcHBsZS5zdHlsZS5sZWZ0ID0gYCR7b2Zmc2V0WCAtIHJhZGl1c31weGA7XG4gICAgcmlwcGxlLnN0eWxlLnRvcCA9IGAke29mZnNldFkgLSByYWRpdXN9cHhgO1xuICAgIHJpcHBsZS5zdHlsZS5oZWlnaHQgPSBgJHtyYWRpdXMgKiAyfXB4YDtcbiAgICByaXBwbGUuc3R5bGUud2lkdGggPSBgJHtyYWRpdXMgKiAyfXB4YDtcblxuICAgIC8vIElmIHRoZSBjb2xvciBpcyBub3Qgc2V0LCB0aGUgZGVmYXVsdCBDU1MgY29sb3Igd2lsbCBiZSB1c2VkLlxuICAgIHJpcHBsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9yO1xuICAgIHJpcHBsZS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocmlwcGxlKTtcblxuICAgIC8vIEJ5IGRlZmF1bHQgdGhlIGJyb3dzZXIgZG9lcyBub3QgcmVjYWxjdWxhdGUgdGhlIHN0eWxlcyBvZiBkeW5hbWljYWxseSBjcmVhdGVkXG4gICAgLy8gcmlwcGxlIGVsZW1lbnRzLiBUaGlzIGlzIGNyaXRpY2FsIGJlY2F1c2UgdGhlbiB0aGUgYHNjYWxlYCB3b3VsZCBub3QgYW5pbWF0ZSBwcm9wZXJseS5cbiAgICB0aGlzLmVuZm9yY2VTdHlsZVJlY2FsY3VsYXRpb24ocmlwcGxlKTtcblxuICAgIHJpcHBsZS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuXG4gICAgLy8gRXhwb3NlZCByZWZlcmVuY2UgdG8gdGhlIHJpcHBsZSB0aGF0IHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgbGV0IHJpcHBsZVJlZiA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjZW50ZXJlZDogdGhpcy5jZW50ZXJlZCxcbiAgICAgICAgdGlnZ2VyRWxlbWVudDogdGhpcy50cmlnZ2VyRWxlbWVudCxcbiAgICAgICAgc3BlZWRGYWN0b3I6IHRoaXMuc3BlZWRGYWN0b3IsXG4gICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgcGVyc2lzdGVudDogdGhpcy5wZXJzaXN0ZW50LFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgIH0sXG4gICAgICBlbGVtZW50OiByaXBwbGUsXG4gICAgICBmYWRlT3V0OiAoKSA9PiBmYWRlT3V0KCksXG4gICAgICBzdGF0ZTogdGhpcy5SSVBQTEVfU1RBVEUuRkFESU5HX0lOXG4gICAgfTtcbiAgICBjb25zdCBmYWRlT3V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5mYWRlT3V0UmlwcGxlKHJpcHBsZVJlZilcbiAgICB9O1xuXG4gICAgLy8gQWRkIHRoZSByaXBwbGUgcmVmZXJlbmNlIHRvIHRoZSBsaXN0IG9mIGFsbCBhY3RpdmUgcmlwcGxlcy5cbiAgICB0aGlzLmFjdGl2ZVJpcHBsZXMuYWRkKHJpcHBsZVJlZik7XG5cbiAgICAvLyBXYWl0IGZvciB0aGUgcmlwcGxlIGVsZW1lbnQgdG8gYmUgY29tcGxldGVseSBmYWRlZCBpbi5cbiAgICAvLyBPbmNlIGl0J3MgZmFkZWQgaW4sIHRoZSByaXBwbGUgY2FuIGJlIGhpZGRlbiBpbW1lZGlhdGVseSBpZiB0aGUgbW91c2UgaXMgcmVsZWFzZWQuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByaXBwbGVSZWYuc3RhdGUgPSB0aGlzLlJJUFBMRV9TVEFURS5WSVNJQkxFO1xuICAgICAgaWYgKCF0aGlzLnBlcnNpc3RlbnQgJiYgIXRoaXMuaXNNb3VzZWRvd24pIHJpcHBsZVJlZi5mYWRlT3V0KCk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG5cbiAgZmFkZU91dFJpcHBsZShyaXBwbGVSZWYpIHtcbiAgICAvLyBGb3IgcmlwcGxlcyB0aGF0IGFyZSBub3QgYWN0aXZlIGFueW1vcmUsIGRvbid0IHJlLXVuIHRoZSBmYWRlLW91dCBhbmltYXRpb24uXG4gICAgaWYgKCF0aGlzLmFjdGl2ZVJpcHBsZXMuZGVsZXRlKHJpcHBsZVJlZikpIHJldHVybjtcblxuICAgIGNvbnN0IHJpcHBsZUVsID0gcmlwcGxlUmVmLmVsZW1lbnQ7XG5cbiAgICByaXBwbGVFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHt0aGlzLlJJUFBMRV9GQURFX09VVF9EVVJBVElPTn1tc2A7XG4gICAgcmlwcGxlRWwuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICByaXBwbGVSZWYuc3RhdGUgPSB0aGlzLlJJUFBMRV9TVEFURS5GQURJTkdfT1VUO1xuXG4gICAgLy8gT25jZSB0aGUgcmlwcGxlIGZhZGVkIG91dCwgdGhlIHJpcHBsZSBjYW4gYmUgc2FmZWx5IHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmlwcGxlUmVmLnN0YXRlID0gdGhpcy5SSVBQTEVfU1RBVEUuSElEREVOO1xuICAgICAgcmlwcGxlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyaXBwbGVFbCk7XG4gICAgfSwgdGhpcy5SSVBQTEVfRkFERV9PVVRfRFVSQVRJT04pO1xuICB9XG5cbiAgZGlzdGFuY2VUb0Z1cnRoZXN0Q29ybmVyKHgsIHksIHJlY3QpIHtcbiAgICBjb25zdCBkaXN0WCA9IE1hdGgubWF4KE1hdGguYWJzKHggLSByZWN0LmxlZnQpLCBNYXRoLmFicyh4IC0gcmVjdC5yaWdodCkpO1xuICAgIGNvbnN0IGRpc3RZID0gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHJlY3QudG9wKSwgTWF0aC5hYnMoeSAtIHJlY3QuYm90dG9tKSk7XG4gICAgcmV0dXJuIE1hdGguc3FydChkaXN0WCAqIGRpc3RYICsgZGlzdFkgKiBkaXN0WSk7XG4gIH1cblxuICBnZXRWaWV3cG9ydFNjcm9sbFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IGRvY3VtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFRoZSB0b3AtbGVmdC1jb3JuZXIgb2YgdGhlIHZpZXdwb3J0IGlzIGRldGVybWluZWQgYnkgdGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgZG9jdW1lbnRcbiAgICAvLyBib2R5LCBub3JtYWxseSBqdXN0IChzY3JvbGxMZWZ0LCBzY3JvbGxUb3ApLiBIb3dldmVyLCBDaHJvbWUgYW5kIEZpcmVmb3ggZGlzYWdyZWUgYWJvdXRcbiAgICAvLyB3aGV0aGVyIGBkb2N1bWVudC5ib2R5YCBvciBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50YCBpcyB0aGUgc2Nyb2xsZWQgZWxlbWVudCwgc28gcmVhZGluZ1xuICAgIC8vIGBzY3JvbGxUb3BgIGFuZCBgc2Nyb2xsTGVmdGAgaXMgaW5jb25zaXN0ZW50LiBIb3dldmVyLCB1c2luZyB0aGUgYm91bmRpbmcgcmVjdCBvZlxuICAgIC8vIGBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRgIHdvcmtzIGNvbnNpc3RlbnRseSwgd2hlcmUgdGhlIGB0b3BgIGFuZCBgbGVmdGAgdmFsdWVzIHdpbGxcbiAgICAvLyBlcXVhbCBuZWdhdGl2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgIGNvbnN0IHRvcCA9IC1kb2N1bWVudFJlY3QudG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgMDtcbiAgICBjb25zdCBsZWZ0ID0gLWRvY3VtZW50UmVjdC5sZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCAwO1xuXG4gICAgcmV0dXJuIHt0b3AsIGxlZnR9O1xuICB9XG5cbiAgLyoqIEVuZm9yY2VzIGEgc3R5bGUgcmVjYWxjdWxhdGlvbiBvZiBhIERPTSBlbGVtZW50IGJ5IGNvbXB1dGluZyBpdHMgc3R5bGVzLiAqL1xuICAvLyBUT0RPKGRldnZlcnNpb24pOiBNb3ZlIGludG8gZ2xvYmFsIHV0aWxpdHkgZnVuY3Rpb24uXG4gIGVuZm9yY2VTdHlsZVJlY2FsY3VsYXRpb24oZWxlbWVudCkge1xuICAgIC8vIEVuZm9yY2UgYSBzdHlsZSByZWNhbGN1bGF0aW9uIGJ5IGNhbGxpbmcgYGdldENvbXB1dGVkU3R5bGVgIGFuZCBhY2Nlc3NpbmcgYW55IHByb3BlcnR5LlxuICAgIC8vIENhbGxpbmcgYGdldFByb3BlcnR5VmFsdWVgIGlzIGltcG9ydGFudCB0byBsZXQgb3B0aW1pemVycyBrbm93IHRoYXQgdGhpcyBpcyBub3QgYSBub29wLlxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzVkNTJmYjA4MWIzNTcwYzgxZTNhXG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnb3BhY2l0eScpO1xuICB9XG59O1xuIiwiLy8gVE9ETyBnZXQgcmlkIG9mIGppdCB0aGVtaW5nXG4vLyBUaGlzIHNob3VsZCBiZSBwYXJ0IG9mIHRoZSBidWlsZCBwcm9jZXNzXG4vLyBUaGlzIHNob3VsZCBhbHNvIGJlIGV4cG9zZWQgc28gdXNlcnMgY2FuIGl0IGluIHRoZXJlIGJ1aWxkIHByb2Nlc3MgdG8gZ2VuZXJhdGUgYSB0aGVtZSBjc3MgZmlsZVxuaW1wb3J0IGJhc2VUaGVtZSBmcm9tICcuL2Jhc2UtdGhlbWUuanMnO1xuXG5jbGFzcyBUaGVtZUdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMucGFsZXR0ZVJlZ2V4ID0gLygtLW1kdy10aGVtZS1wYWxldHRlLS0pKFxcdyopKC0oXFx3KikpPygtLShcXHcqKSk/JC87XG4gICAgdGhpcy50ZXh0UmVnZXggPSAvLS1tZHctdGhlbWUtdGV4dC0oXFx3Kik/KC1vbi1cXHcqKS0tKFxcdyopJC87XG4gICAgdGhpcy5vblJlZ2V4ID0gLygtLW1kdy10aGVtZS1vbi0pKFxcdyopLS0oXFx3KikkLztcbiAgICB0aGlzLnRoZW1lUmVnZXggPSAvKC0tbWR3LXRoZW1lLSkoXFx3KiktLShcXHcqKSQvO1xuICAgIHRoaXMuaGV4UmVnZXggPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pO1xuICAgIHRoaXMucmdiUmVnZXggPSAvcmdiXFwoKFxcZHsxLDN9KVxccz8sXFxzPyhcXGR7MSwzfSlcXHM/LFxccz8oXFxkezEsM30pXFwpLztcbiAgICB0aGlzLnJnYmFSZWdleCA9IC9yZ2JhXFwoKFxcZHsxLDN9KVxccz8sXFxzPyhcXGR7MSwzfSlcXHM/LFxccz8oXFxkezEsM30pLztcbiAgfVxuXG4gIGdlbmVyYXRlVGhlbWVDc3Moc3RyIC8qLCB0aGVtZSA9IHsgcHJpbWFyeTogJ2RlZXBwdXJwbGUnLCBzZWNvbmRhcnk6ICd0ZWFsJywgZXJyb3I6ICdyZWQnIH0gKi8pIHtcbiAgICBjb25zdCBhbGxWYXJpYWJsZXMgPSB0aGlzLmdldEFsbFZhcmlhYmxlcyhzdHIpO1xuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB7XG4gICAgICAvLyBwYWxldHRlOiB7IGxpZ2h0OiBbXSwgZGFyazogW10gfSxcbiAgICAgIHRleHQ6IHsgbGlnaHQ6IFtdLCBkYXJrOiBbXSB9LFxuICAgICAgb246IHsgbGlnaHQ6IFtdLCBkYXJrOiBbXSB9LFxuICAgICAgdGhlbWU6IHsgbGlnaHQ6IFtdLCBkYXJrOiBbXSB9LFxuICAgICAgbm9uZTogeyBsaWdodDogW10sIGRhcms6IFtdIH1cbiAgICB9O1xuICAgIC8vIGNvbnN0IHRoZW1lVmFsdWVzID0gT2JqZWN0LmtleXModGhlbWUpO1xuICAgIC8vIGNvbnN0IHBhbGV0dGVDb2xvcnMgPSB0aGVtZVZhbHVlcy5tYXAoayA9PiB0aGVtZVtrXSk7XG4gICAgYWxsVmFyaWFibGVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5wYXJzZVZhcmlhYmxlKHZhbHVlIC8qLCB0aGVtZVZhbHVlcywgcGFsZXR0ZUNvbG9ycyAqLyk7XG4gICAgICAvLyAvLyBmaWx0ZXIgb3V0IG5vbiB0aGVtZSBwYWxldHRlc1xuICAgICAgLy8gaWYgKCFwYXJzZWQpIHJldHVybjtcbiAgICAgIGNhdGVnb3JpZXNbcGFyc2VkLnR5cGVdW3BhcnNlZC5jb250cmFzdF0ucHVzaChwYXJzZWQpO1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGNzcyA9IHRoaXMuYnVpbGRDc3MoY2F0ZWdvcmllcyk7XG4gICAgdGhpcy5jcmVhdGVUaGVtZVN0eWxlRWxlbWVudChjc3MpO1xuICAgIC8vIGFsbG93IGNzcyB0byBiZSB3cml0dGVuIHRvIGEgZmlsZVxuICB9XG5cbiAgZ2V0QWxsVmFyaWFibGVzKHN0cikge1xuICAgIHJldHVybiBbLi4uc3RyLm1hdGNoKC8oLio/KTouKj87L2cpXS5tYXAoYSA9PiAoXG4gICAgICBhLnNwbGl0KCc6JykubWFwKHYgPT4gdi50cmltKCkucmVwbGFjZSgnOycsICcnKSlcbiAgICApKTtcbiAgfVxuXG4gIHBhcnNlVmFyaWFibGUoW25hbWUsIHZhbHVlXSAvKiwgdGhlbWVWYWx1ZXMsIHBhbGV0dGVDb2xvcnMgKi8pIHtcbiAgICAvLyBjb25zdCBwYWxldHRlTWF0Y2ggPSBuYW1lLm1hdGNoKHRoaXMucGFsZXR0ZVJlZ2V4KTtcbiAgICAvLyBpZiAocGFsZXR0ZU1hdGNoKSB7XG4gICAgLy8gICBjb25zdCBjb2xvciA9IHBhbGV0dGVNYXRjaFsyXTtcbiAgICAvLyAgIGNvbnN0IGNvbG9ySW5kZXggPSBwYWxldHRlQ29sb3JzLmluZGV4T2YoY29sb3IpO1xuXG4gICAgLy8gICAvLyBmaWx0ZXIgb3V0IG5vbiB0aGVtZSBwYWxldHRlc1xuICAgIC8vICAgaWYgKGNvbG9ySW5kZXggPT09IC0xKSByZXR1cm47XG5cbiAgICAvLyAgIGNvbnN0IHRoZW1lUGFydCA9IHRoZW1lVmFsdWVzW2NvbG9ySW5kZXhdO1xuICAgIC8vICAgcmV0dXJuIHtcbiAgICAvLyAgICAgbmFtZSxcbiAgICAvLyAgICAgbmFtZU5vcm1hbGl6ZWQ6IHRoaXMubm9ybWFsaXplTmFtZShuYW1lKS5yZXBsYWNlKGNvbG9yLCB0aGVtZVBhcnQpLFxuICAgIC8vICAgICB2YWx1ZSxcbiAgICAvLyAgICAgcmdiQXJyYXlTdHJpbmc6IHRoaXMuY29udmVydFRvUkdCQXJyYXlTdHJpbmcodmFsdWUpLFxuICAgIC8vICAgICB0eXBlOiAncGFsZXR0ZScsXG4gICAgLy8gICAgIGNvbnRyYXN0OiBwYWxldHRlTWF0Y2hbNl0gfHwgJ2xpZ2h0J1xuICAgIC8vICAgfTtcbiAgICAvLyB9XG5cbiAgICBjb25zdCB0ZXh0TWF0Y2ggPSBuYW1lLm1hdGNoKHRoaXMudGV4dFJlZ2V4KTtcbiAgICBpZiAodGV4dE1hdGNoKSByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5hbWVOb3JtYWxpemVkOiB0aGlzLm5vcm1hbGl6ZU5hbWUobmFtZSksXG4gICAgICB2YWx1ZSxcbiAgICAgIHJnYkFycmF5U3RyaW5nOiB0aGlzLmNvbnZlcnRUb1JHQkFycmF5U3RyaW5nKHZhbHVlKSxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIGNvbnRyYXN0OiB0ZXh0TWF0Y2hbM11cbiAgICB9O1xuXG4gICAgY29uc3Qgb25NYXRjaCA9IG5hbWUubWF0Y2godGhpcy5vblJlZ2V4KTtcbiAgICBpZiAob25NYXRjaCkgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuYW1lTm9ybWFsaXplZDogdGhpcy5ub3JtYWxpemVOYW1lKG5hbWUpLFxuICAgICAgdmFsdWUsXG4gICAgICByZ2JBcnJheVN0cmluZzogdGhpcy5jb252ZXJ0VG9SR0JBcnJheVN0cmluZyh2YWx1ZSksXG4gICAgICB0eXBlOiAnb24nLFxuICAgICAgY29udHJhc3Q6IG9uTWF0Y2hbM11cbiAgICB9O1xuXG4gICAgY29uc3QgdGhlbWVNYXRjaCA9IG5hbWUubWF0Y2godGhpcy50aGVtZVJlZ2V4KTtcbiAgICBpZiAodGhlbWVNYXRjaCkgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuYW1lTm9ybWFsaXplZDogdGhpcy5ub3JtYWxpemVOYW1lKG5hbWUpLFxuICAgICAgdmFsdWUsXG4gICAgICByZ2JBcnJheVN0cmluZzogdGhpcy5jb252ZXJ0VG9SR0JBcnJheVN0cmluZyh2YWx1ZSksXG4gICAgICB0eXBlOiAndGhlbWUnLFxuICAgICAgY29udHJhc3Q6IHRoZW1lTWF0Y2hbM11cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuYW1lTm9ybWFsaXplZDogdGhpcy5ub3JtYWxpemVOYW1lKG5hbWUpLFxuICAgICAgdmFsdWUsXG4gICAgICByZ2JBcnJheVN0cmluZzogdGhpcy5jb252ZXJ0VG9SR0JBcnJheVN0cmluZyh2YWx1ZSksXG4gICAgICB0eXBlOiAnbm9uZScsXG4gICAgICBjb250cmFzdDogbmFtZS5pbmRleE9mKCctLWRhcmsnKSA+IDEgPyAnZGFyaycgOiAnbGlnaHQnXG4gICAgfTtcbiAgfVxuXG4gIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoJy0tbGlnaHQnLCAnJykucmVwbGFjZSgnLS1kYXJrJywgJycpO1xuICB9XG5cbiAgY29udmVydFRvUkdCQXJyYXlTdHJpbmcodmFsdWUpIHtcbiAgICBjb25zdCBoZXhNYXRjaCA9IHZhbHVlLnRyaW0oKS5tYXRjaCh0aGlzLmhleFJlZ2V4KTtcbiAgICBpZiAoaGV4TWF0Y2gpIHJldHVybiBgJHtwYXJzZUludChoZXhNYXRjaFsxXSwgMTYpfSwgJHtwYXJzZUludChoZXhNYXRjaFsyXSwgMTYpfSwgJHtwYXJzZUludChoZXhNYXRjaFszXSwgMTYpfWA7XG5cbiAgICBjb25zdCByZ2JNYXRjaCA9IHZhbHVlLnRyaW0oKS5tYXRjaCh0aGlzLnJnYlJlZ2V4KTtcbiAgICBpZiAocmdiTWF0Y2gpIHJldHVybiBgJHtyZ2JNYXRjaFsxXX0sICR7cmdiTWF0Y2hbMl19LCAke3JnYk1hdGNoWzNdfWA7XG5cbiAgICBjb25zdCByZ2JhTWF0Y2ggPSB2YWx1ZS50cmltKCkubWF0Y2godGhpcy5yZ2JhUmVnZXgpO1xuICAgIGlmIChyZ2JhTWF0Y2gpIHJldHVybiBgJHtyZ2JhTWF0Y2hbMV19LCAke3JnYmFNYXRjaFsyXX0sICR7cmdiYU1hdGNoWzNdfWA7XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjcmVhdGVUaGVtZVN0eWxlRWxlbWVudChzdHIpIHtcbiAgICBjb25zdCBzdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcbiAgICBzdHlsZU5vZGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVOb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xuICB9XG5cbiAgYnVpbGRDc3MoY2F0ZWdvcmllcykge1xuICAgIHJldHVybiBgOnJvb3Qge1xuICAvKiAtLS0gdGV4dCB2YXJpYWJsZXMgLS0tICovXG4ke2NhdGVnb3JpZXMudGV4dC5saWdodC5tYXAodiA9PiBgICAke3YubmFtZU5vcm1hbGl6ZWR9OiAke3YudmFsdWV9O1xcbiAgJHt2Lm5hbWVOb3JtYWxpemVkfS0tcmdiOiAke3YucmdiQXJyYXlTdHJpbmd9O2ApLmpvaW4oJ1xcbicpfVxuXG5cbiAgLyogLS0tIG9uIHZhcmlhYmxlcyAtLS0gKi9cbiR7Y2F0ZWdvcmllcy5vbi5saWdodC5tYXAodiA9PiBgICAke3YubmFtZU5vcm1hbGl6ZWR9OiAke3YudmFsdWV9O1xcbiAgJHt2Lm5hbWVOb3JtYWxpemVkfS0tcmdiOiAke3YucmdiQXJyYXlTdHJpbmd9O2ApLmpvaW4oJ1xcbicpfVxuXG5cbiAgLyogLS0tIHRoZW1lIHZhcmlhYmxlcyAtLS0gKi9cbiR7Y2F0ZWdvcmllcy50aGVtZS5saWdodC5tYXAodiA9PiBgICAke3YubmFtZU5vcm1hbGl6ZWR9OiAke3YudmFsdWV9O1xcbiAgJHt2Lm5hbWVOb3JtYWxpemVkfS0tcmdiOiAke3YucmdiQXJyYXlTdHJpbmd9O2ApLmpvaW4oJ1xcbicpfVxuXG5cbiAgLyogLS0tIG90aGVyIHZhcmlhYmxlcnMgLS0tICovXG4ke2NhdGVnb3JpZXMubm9uZS5saWdodC5tYXAodiA9PiBgICAke3YubmFtZU5vcm1hbGl6ZWR9OiAke3YudmFsdWV9O1xcbiAgJHt2Lm5hbWVOb3JtYWxpemVkfS0tcmdiOiAke3YucmdiQXJyYXlTdHJpbmd9O2ApLmpvaW4oJ1xcbicpfVxufVxuXG46cm9vdC5tZHctdGhlbWUtZGFyayB7XG4gIC8qIC0tLSB0ZXh0IHZhcmlhYmxlcyAtLS0gKi9cbiR7Y2F0ZWdvcmllcy50ZXh0LmRhcmsubWFwKHYgPT4gYCAgJHt2Lm5hbWVOb3JtYWxpemVkfTogJHt2LnZhbHVlfTtcXG4gICR7di5uYW1lTm9ybWFsaXplZH0tLXJnYjogJHt2LnJnYkFycmF5U3RyaW5nfTtgKS5qb2luKCdcXG4nKX1cblxuXG4gIC8qIC0tLSBvbiB2YXJpYWJsZXMgLS0tICovXG4ke2NhdGVnb3JpZXMub24uZGFyay5tYXAodiA9PiBgICAke3YubmFtZU5vcm1hbGl6ZWR9OiAke3YudmFsdWV9O1xcbiAgJHt2Lm5hbWVOb3JtYWxpemVkfS0tcmdiOiAke3YucmdiQXJyYXlTdHJpbmd9O2ApLmpvaW4oJ1xcbicpfVxuXG5cbiAgLyogLS0tIHRoZW1lIHZhcmlhYmxlcyAtLS0gKi9cbiR7Y2F0ZWdvcmllcy50aGVtZS5kYXJrLm1hcCh2ID0+IGAgICR7di5uYW1lTm9ybWFsaXplZH06ICR7di52YWx1ZX07XFxuICAke3YubmFtZU5vcm1hbGl6ZWR9LS1yZ2I6ICR7di5yZ2JBcnJheVN0cmluZ307YCkuam9pbignXFxuJyl9XG5cblxuICAvKiAtLS0gb3RoZXIgdmFyaWFibGVycyAtLS0gKi9cbiR7Y2F0ZWdvcmllcy5ub25lLmRhcmsubWFwKHYgPT4gYCAgJHt2Lm5hbWVOb3JtYWxpemVkfTogJHt2LnZhbHVlfTtcXG4gICR7di5uYW1lTm9ybWFsaXplZH0tLXJnYjogJHt2LnJnYkFycmF5U3RyaW5nfTtgKS5qb2luKCdcXG4nKX1cbn1gO1xuICB9XG59XG5cbmNvbnN0IHRoZW1lR2VuZXJhdG9yID0gbmV3IFRoZW1lR2VuZXJhdG9yKCk7XG5cbnRoZW1lR2VuZXJhdG9yLmdlbmVyYXRlVGhlbWVDc3MoYmFzZVRoZW1lKCkpO1xuXG5cblxuXG5cbi8vIGNvbnN0IE1EV1RoZW1lID0gbmV3IGNsYXNzIHtcbi8vICAgY29uc3RydWN0b3IoKSB7XG4vLyAgICAgdGhpcy5oZXhSRUdFWCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2k7XG4vLyAgICAgdGhpcy5wYWxldHRlUmVnZXggPSAvKD88YmFzZT4tLW1kdy10aGVtZS1wYWxldHRlLS0pKD88Y29sb3I+XFx3KiktPyg/PGNvbnRyYXN0PmNvbnRyYXN0KT8tKD88aHVlPlxcdyopJC87XG4vLyAgICAgdGhpcy50ZXh0UmVnZXggPSAvKD88YmFzZT4tLW1kdy10aGVtZS10ZXh0LS0pKD88b24+b24tXFx3Kik/KD88c3RhdGU+XFx3KiktLSg/PGNvbnRyYXN0PlxcdyopJC87XG4vLyAgICAgdGhpcy5jb250ZW50V2l0aENvbnRyYXN0UmVnZXggPSAvKD88YmFzZT4tLW1kdy10aGVtZS0pKD88Y29udGVudD5cXHcqKS0tKD88Y29udHJhc3Q+XFx3KikkLztcbi8vICAgICB0aGlzLmNvbnRyYXN0XyA9ICdsaWdodCc7XG4vLyAgICAgdGhpcy5wYWxldHRlcyA9IHtcbi8vICAgICAgIHByaW1hcnk6ICdkZWVwcHVycGxlJyxcbi8vICAgICAgIHNlY29uZGFyeTogJ3RlYWwnLFxuLy8gICAgICAgZXJyb3I6ICdyZWQnXG4vLyAgICAgfTtcblxuLy8gICAgIHRoaXMuY3JlYXRlQmFzZVRoZW1lU3R5bGVFbGVtZW50KCk7XG4vLyAgICAgY29uc3QgaW5pdGlhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBjb250cmFzdDogJ2xpZ2h0JyB9LCB0aGlzLnBhbGV0dGVzLCB3aW5kb3cuTURXVGhlbWVDb25maWcpO1xuLy8gICAgIHRoaXMuc2V0UGFsZXR0ZXMoaW5pdGlhbENvbmZpZyk7XG4vLyAgICAgaWYgKFsnbGlnaHQnLCAnZGFyayddLmluZGV4T2YoaW5pdGlhbENvbmZpZy5jb250cmFzdCkgPiAtMSkgdGhpcy5jb250cmFzdCA9IGluaXRpYWxDb25maWcuY29udHJhc3Q7XG4vLyAgICAgdGhpcy5jYXRlZ29yaXplKCk7XG4vLyAgICAgdGhpcy5zZXRUaGVtZVZhcnMoKTtcbi8vICAgICB0aGlzLnNldE90aGVyVmFycygpO1xuLy8gICB9XG5cbi8vICAgZ2V0IGNvbnRyYXN0KCkge1xuLy8gICAgIHJldHVybiB0aGlzLmNvbnRyYXN0Xztcbi8vICAgfVxuXG4vLyAgIHNldCBjb250cmFzdCh2YWx1ZSkge1xuLy8gICAgIGlmICh2YWx1ZSAhPT0gJ2xpZ2h0JyAmJiB2YWx1ZSAhPT0gJ2RhcmsnKSB0aHJvdyBFcnJvcigndmFsaWQgdmFsdWVzIGFyZSBcImxpZ2h0XCIgYW5kIFwiZGFya1wiJyk7XG4vLyAgICAgdGhpcy5jb250cmFzdF8gPSB2YWx1ZTtcbi8vICAgfVxuXG4vLyAgIGNoYW5nZVRoZW1lKHsgcHJpbWFyeSwgc2Vjb25kYXJ5LCBlcnJvciwgY29udHJhc3QgfSkge1xuLy8gICAgIHByaW1hcnkgPSBwcmltYXJ5IHx8IHRoaXMucGFsZXR0ZXMucHJpbWFyeTtcbi8vICAgICBzZWNvbmRhcnkgPSBzZWNvbmRhcnkgfHwgdGhpcy5wYWxldHRlcy5zZWNvbmRhcnk7XG4vLyAgICAgZXJyb3IgPSBlcnJvciB8fCB0aGlzLnBhbGV0dGVzLmVycm9yO1xuLy8gICAgIGlmIChjb250cmFzdCkgdGhpcy5jb250cmFzdCA9IGNvbnRyYXN0O1xuLy8gICAgIHRoaXMuc2V0UGFsZXR0ZXMoeyBwcmltYXJ5LCBzZWNvbmRhcnksIGVycm9yIH0pO1xuLy8gICAgIHRoaXMuc2V0VGhlbWVWYXJzKCk7XG4vLyAgICAgdGhpcy5zZXRPdGhlclZhcnMoKTtcbi8vICAgfVxuXG4vLyAgIHNldFBhbGV0dGVzKHsgcHJpbWFyeSwgc2Vjb25kYXJ5LCBlcnJvciB9ID0ge30pIHtcbi8vICAgICB0aGlzLnBhbGV0dGVzID0ge1xuLy8gICAgICAgcHJpbWFyeTogcHJpbWFyeSB8fCAnZGVlcHB1cnBsZScsXG4vLyAgICAgICBzZWNvbmRhcnk6IHNlY29uZGFyeSB8fCAndGVhbCcsXG4vLyAgICAgICBlcnJvcjogZXJyb3IgfHwgJ3JlZCdcbi8vICAgICB9O1xuLy8gICB9XG5cbi8vICAgc2V0VGhlbWVWYXJzKCkge1xuLy8gICAgIE9iamVjdC5rZXlzKHRoaXMucGFsZXR0ZXMpLmZvckVhY2goa2V5ID0+IHtcbi8vICAgICAgIGNvbnN0IGNvbG9yTmFtZSA9IHRoaXMucGFsZXR0ZXNba2V5XTtcbi8vICAgICAgIGNvbnN0IHBhbGV0dGVWYXJzID0gdGhpcy5wYWxldHRlVmFycyhjb2xvck5hbWUpO1xuLy8gICAgICAgcGFsZXR0ZVZhcnMuZm9yRWFjaChwYWxldHRlID0+IHtcbi8vICAgICAgICAgY29uc3QgbmFtZSA9IGAtLW1kdy10aGVtZS0ke2tleX0ke3BhbGV0dGUuY29udHJhc3QgPyBgLSR7cGFsZXR0ZS5jb250cmFzdH1gIDogJyd9JHtwYWxldHRlLmRlZmF1bHQgPT09IGZhbHNlID8gYC0ke3BhbGV0dGUuaHVlfWAgOiAnJ31gO1xuLy8gICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFyKHBhbGV0dGUudmFyKTtcbi8vICAgICAgICAgdGhpcy5zZXRWYXIobmFtZSwgdmFsdWUpO1xuLy8gICAgICAgICB0aGlzLnNldFZhcihgJHtuYW1lfS0tcmdiYCwgdGhpcy5jb252ZXJ0VG9SR0IodmFsdWUpKTtcblxuLy8gICAgICAgICBpZiAocGFsZXR0ZS5odWUgPT09IHRoaXMuY29udHJhc3QpIHtcbi8vICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gbmFtZS5yZXBsYWNlKGAtJHt0aGlzLmNvbnRyYXN0fWAsICcnKTtcbi8vICAgICAgICAgICB0aGlzLnNldFZhcihub3JtYWxpemVkLCB2YWx1ZSk7XG4vLyAgICAgICAgICAgdGhpcy5zZXRWYXIoYCR7bm9ybWFsaXplZH0tLXJnYmAsIHRoaXMuY29udmVydFRvUkdCKHZhbHVlKSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICAgIH0pO1xuLy8gICB9XG5cbi8vICAgc2V0T3RoZXJWYXJzKCkge1xuLy8gICAgIHRoaXMub3RoZXJWYXJzKCkuZm9yRWFjaCh2ID0+IHtcbi8vICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYXIodi52YXIpO1xuLy8gICAgICAgdGhpcy5zZXRWYXIodi5ub3JtYWxpemVkLCB2YWx1ZSk7XG4vLyAgICAgICB0aGlzLnNldFZhcihgJHt2Lm5vcm1hbGl6ZWR9LS1yZ2JgLCB0aGlzLmNvbnZlcnRUb1JHQih2YWx1ZSkpO1xuLy8gICAgIH0pO1xuLy8gICB9XG5cbi8vICAgcGFsZXR0ZVZhcnMoY29sb3JOYW1lKSB7XG4vLyAgICAgY29uc3QgcGFsZXR0ZVZhck5hbWVzID0gT2JqZWN0LmtleXModGhpcy5ub3JtYWxpemVkVmFycykuZmlsdGVyKGtleSA9PiBrZXkuc3RhcnRzV2l0aChgLS1tZHctdGhlbWUtcGFsZXR0ZS0tJHtjb2xvck5hbWV9YCkpO1xuLy8gICAgIHJldHVybiBwYWxldHRlVmFyTmFtZXMubWFwKGtleSA9PiB0aGlzLm5vcm1hbGl6ZWRWYXJzW2tleV1bMF0pO1xuLy8gICB9XG5cbi8vICAgb3RoZXJWYXJzKCkge1xuLy8gICAgIGNvbnN0IHBhbGV0dGVWYXJOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMubm9ybWFsaXplZFZhcnMpLmZpbHRlcihrZXkgPT4ga2V5LnN0YXJ0c1dpdGgoJy0tbWR3LXRoZW1lJykgJiYgIWtleS5zdGFydHNXaXRoKCctLW1kdy10aGVtZS1wYWxldHRlJykpO1xuLy8gICAgIHJldHVybiBwYWxldHRlVmFyTmFtZXMubWFwKGtleSA9PiB0aGlzLnBpY2tWYXIodGhpcy5ub3JtYWxpemVkVmFyc1trZXldKSk7XG4vLyAgIH1cblxuLy8gICBzZXRWYXJzKCkge1xuLy8gICAgIE9iamVjdC5rZXlzKHRoaXMubm9ybWFsaXplZFZhcnMpLmZvckVhY2goa2V5ID0+IHtcbi8vICAgICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMucGlja1Zhcih0aGlzLm5vcm1hbGl6ZWRWYXJzW2tleV0pO1xuLy8gICAgICAgdGhpcy5zZXRWYXIocGlja2VkLm5vcm1hbGl6ZWQsIHRoaXMuZ2V0VmFyKHBpY2tlZC52YXIpKTtcbi8vICAgICB9KTtcbi8vICAgfVxuXG4vLyAgIHNldFZhcihuYW1lLCB2YWx1ZSkge1xuLy8gICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4vLyAgIH1cblxuLy8gICBnZXRWYXIobmFtZSkge1xuLy8gICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTtcbi8vICAgfVxuXG4vLyAgIHBpY2tWYXIoYXJyKSB7XG4vLyAgICAgbGV0IGZvdW5kID0gYXJyLmZpbmQoaXRlbSA9PiB7XG4vLyAgICAgICBpZiAoaXRlbS5kZWZhdWx0ID09PSB0cnVlICYmIHRoaXMuY29udHJhc3QgPT09IGl0ZW0uY29udHJhc3QpIHJldHVybiB0cnVlO1xuLy8gICAgIH0pO1xuLy8gICAgIGlmICghZm91bmQpIHtcbi8vICAgICAgIGZvdW5kID0gYXJyLmZpbmQoaXRlbSA9PiB7XG4vLyAgICAgICAgIGlmICh0aGlzLmNvbnRyYXN0ID09PSBpdGVtLmNvbnRyYXN0KSByZXR1cm4gdHJ1ZTtcbi8vICAgICAgICAgaWYgKGl0ZW0uZGVmYXVsdCA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4vLyAgICAgICB9KTtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIGZvdW5kIHx8IGFyclswXTtcbi8vICAgfVxuXG4vLyAgIGNhdGVnb3JpemUoKSB7XG4vLyAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5nZXRBbGxWYXJzKCkubWFwKHYgPT4gdGhpcy5wYXJzZVZhcih2KSk7XG4vLyAgICAgY29uc3Qgbm9ybWFsaXplZEhhc2ggPSBwYXJzZWQucmVkdWNlKChhLCBiKSA9PiB7XG4vLyAgICAgICBpZiAoYi5ub01hdGNoID09PSB0cnVlIHx8ICFiLm5vcm1hbGl6ZWQpIHJldHVybiBhO1xuXG4vLyAgICAgICBpZiAoIWFbYi5ub3JtYWxpemVkXSkgYVtiLm5vcm1hbGl6ZWRdID0gW107XG4vLyAgICAgICBhW2Iubm9ybWFsaXplZF0ucHVzaChiKTtcbi8vICAgICAgIHJldHVybiBhO1xuLy8gICAgIH0sIHt9KTtcblxuLy8gICAgIHRoaXMubm9ybWFsaXplZFZhcnMgPSBub3JtYWxpemVkSGFzaDtcbi8vICAgfVxuXG4vLyAgIC8vIHBhcnNlIG91dCB2YXJpYWJsZXMgaW4gOnJvb3Rcbi8vICAgZ2V0QWxsVmFycygpIHtcbi8vICAgICAvLyByZXR1cm4gWy4uLmJhc2VUaGVtZSgpLm1hdGNoQWxsKC8oLio/KTouKj87L2cpXS5tYXAoYSA9PiBhWzFdLnRyaW0oKSk7XG4vLyAgICAgcmV0dXJuIFsuLi5iYXNlVGhlbWUoKS5tYXRjaCgvKC4qPyk6Lio/Oy9nKV0ubWFwKGEgPT4gYS5zcGxpdCgnOicpWzBdLnRyaW0oKSk7XG4vLyAgIH1cblxuLy8gICBnZXRVbm1hdGNoZWQoKSB7XG4vLyAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5nZXRBbGxWYXJzKCkubWFwKHYgPT4gdGhpcy5wYXJzZVZhcih2KSk7XG4vLyAgICAgcmV0dXJuIHBhcnNlZC5maWx0ZXIobiA9PiBuLm5vTWF0Y2ggPT09IHRydWUpO1xuLy8gICB9XG5cbi8vICAgcGFyc2VWYXIodmFyTmFtZSkge1xuLy8gICAgIGlmICh0aGlzLnBhbGV0dGVSZWdleC50ZXN0KHZhck5hbWUpKSB7XG4vLyAgICAgICBjb25zdCBncm91cHMgPSB2YXJOYW1lLm1hdGNoKHRoaXMucGFsZXR0ZVJlZ2V4KS5ncm91cHM7XG4vLyAgICAgICBjb25zdCBub3JtYWxpemVkID0gYCR7Z3JvdXBzLmJhc2V9JHtncm91cHMuY29sb3J9JHtncm91cHMuY29udHJhc3QgPyBgLWNvbnRyYXN0YCA6ICcnfS0ke2dyb3Vwcy5odWV9YDtcbi8vICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbi8vICAgICAgICAgdmFyOiB2YXJOYW1lLFxuLy8gICAgICAgICB0eXBlOiAncGFsZXR0ZScsXG4vLyAgICAgICAgIGRlZmF1bHQ6IHZhck5hbWUuaW5kZXhPZignZGVmYXVsdCcpID4gMCxcbi8vICAgICAgICAgbm9ybWFsaXplZFxuLy8gICAgICAgfSwgZ3JvdXBzKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKHRoaXMudGV4dFJlZ2V4LnRlc3QodmFyTmFtZSkpIHtcbi8vICAgICAgIGNvbnN0IGdyb3VwcyA9IHZhck5hbWUubWF0Y2godGhpcy50ZXh0UmVnZXgpLmdyb3Vwcztcbi8vICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBgJHtncm91cHMuYmFzZX0ke2dyb3Vwcy5zdGF0ZSB8fCAnJ30ke2dyb3Vwcy5vbiB8fCAnJ31gO1xuLy8gICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuLy8gICAgICAgICB2YXI6IHZhck5hbWUsXG4vLyAgICAgICAgIHR5cGU6ICd0ZXh0Jyxcbi8vICAgICAgICAgZGVmYXVsdDogdmFyTmFtZS5pbmRleE9mKCdkZWZhdWx0JykgPiAwLFxuLy8gICAgICAgICBub3JtYWxpemVkXG4vLyAgICAgICB9LCBncm91cHMpO1xuLy8gICAgIH1cbi8vICAgICBpZiAodGhpcy5jb250ZW50V2l0aENvbnRyYXN0UmVnZXgudGVzdCh2YXJOYW1lKSkge1xuLy8gICAgICAgY29uc3QgZ3JvdXBzID0gdmFyTmFtZS5tYXRjaCh0aGlzLmNvbnRlbnRXaXRoQ29udHJhc3RSZWdleCkuZ3JvdXBzO1xuLy8gICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGAke2dyb3Vwcy5iYXNlfSR7Z3JvdXBzLmNvbnRlbnR9YDtcbi8vICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbi8vICAgICAgICAgdmFyOiB2YXJOYW1lLFxuLy8gICAgICAgICB0eXBlOiAnY29udGVudCcsXG4vLyAgICAgICAgIGRlZmF1bHQ6IHZhck5hbWUuaW5kZXhPZignZGVmYXVsdCcpID4gMCxcbi8vICAgICAgICAgbm9ybWFsaXplZFxuLy8gICAgICAgfSwgZ3JvdXBzKTtcbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgdmFyOiB2YXJOYW1lLFxuLy8gICAgICAgbm9NYXRjaDogdHJ1ZVxuLy8gICAgIH07XG4vLyAgIH1cblxuLy8gICBjb252ZXJ0VG9SR0IoaGV4KSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5oZXhSRUdFWC5leGVjKGhleC50cmltKCkpO1xuLy8gICAgIHJldHVybiByZXN1bHQgPyBgJHtwYXJzZUludChyZXN1bHRbMV0sIDE2KX0sICR7cGFyc2VJbnQocmVzdWx0WzJdLCAxNil9LCAke3BhcnNlSW50KHJlc3VsdFszXSwgMTYpfWAgOiBudWxsO1xuLy8gICB9XG5cbi8vICAgY3JlYXRlQmFzZVRoZW1lU3R5bGVFbGVtZW50KCkge1xuLy8gICAgIGNvbnN0IHN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4vLyAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZU5vZGUpO1xuLy8gICAgIHN0eWxlTm9kZS50eXBlID0gJ3RleHQvY3NzJztcbi8vICAgICBzdHlsZU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYmFzZVRoZW1lKCkpKTtcbi8vICAgfVxuLy8gfTtcblxuLy8gd2luZG93Lk1EV1RoZW1lID0gTURXVGhlbWU7XG4vLyBleHBvcnQgZGVmYXVsdCBNRFdUaGVtZTtcbiIsImltcG9ydCB7IGlzUGhvbmUsIGlzUGhvbmVBbmRUYWJsZXQgfSBmcm9tICcuL21vYmlsZS1pbmZvLmpzJztcblxuY29uc3QgTURXVXRpbHMgPSBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl91aWQgPSAxO1xuICAgIHRoaXMuX3NldHVwVHJhbnNpdGlvbkV2ZW50KCk7XG4gICAgdGhpcy5fc2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKCk7XG4gICAgdGhpcy5pc1Bob25lID0gaXNQaG9uZTtcbiAgICB0aGlzLmlzUGhvbmVBbmRUYWJsZXQgPSBpc1Bob25lQW5kVGFibGV0O1xuICAgIC8vIGFkZCBjbGFzcyBpbmRlY2F0b3IgZm9yIG1vYmlsZVxuICAgIFxuICAgIHRoaXMub25SZWFkeSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc01vYmlsZSkgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtZHctaXMtbW9iaWxlJyk7XG4gICAgICBlbHNlIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWlzLW1vYmlsZScpO1xuICAgIH0pO1xuICB9XG5cbiAgb25SZWFkeShjYWxsYmFjaykge1xuICAgIGlmICghZG9jdW1lbnQuYm9keSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub25SZWFkeShjYWxsYmFjayk7XG4gICAgICB9LCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHVpZCgpIHtcbiAgICByZXR1cm4gYGlkXyR7dGhpcy5fdWlkKyt9YDtcbiAgfVxuXG4gIGdldCBpc01vYmlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Bob25lQW5kVGFibGV0O1xuICB9XG5cbiAgbG9ja1BhZ2VTY3JvbGwoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2ZW50LW92ZXItc2Nyb2xsJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZSA+IG1kdy1jb250ZW50JykgOiBkb2N1bWVudC5ib2R5O1xuICAgIHNjcm9sbEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgfVxuXG4gIHVubG9ja1BhZ2VTY3JvbGwoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2ZW50LW92ZXItc2Nyb2xsJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZSA+IG1kdy1jb250ZW50JykgOiBkb2N1bWVudC5ib2R5O1xuICAgIHNjcm9sbEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgfVxuXG4gIGRlYm91bmNlKGZuLCB3YWl0KSB7XG4gICAgbGV0IHRpbWVyO1xuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9LCB3YWl0IHx8IDEwKTtcbiAgICB9O1xuICB9XG5cbiAgdGhyb3R0bGUoZm4sIGxpbWl0KSB7XG4gICAgbGV0IGFscmVhZHlRdWV1ZWQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgIGlmICghYWxyZWFkeVF1ZXVlZCkge1xuICAgICAgICBhbHJlYWR5UXVldWVkID0gdHJ1ZTtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFscmVhZHlRdWV1ZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgbGltaXQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyB0aHJvdHRsZSBvbiByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZXl5XG4gIHJhZlRocm90dGxlKGZuKSB7XG4gICAgbGV0IGFscmVhZHlRdWV1ZWQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgIGlmICghYWxyZWFkeVF1ZXVlZCkge1xuICAgICAgICBhbHJlYWR5UXVldWVkID0gdHJ1ZTtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgYWxyZWFkeVF1ZXVlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcXVlcnlTbG90dGVkKGNvbXBvbmVudCwgc2VsZWN0b3IpIHtcbiAgICBpZiAoIWNvbXBvbmVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGVpdGhlciBjb21wb25lbnQnKTtcbiAgICBpZiAoIXNlbGVjdG9yKSB0aHJvdyBFcnJvcigncmVxdWlyZXMgc2VsZWN0b3InKTtcbiAgICBpZiAoIWNvbXBvbmVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5hc3NpZ25lZE5vZGVzKCkuZmluZChlbCA9PiB7XG4gICAgICBpZiAoIWVsLm1hdGNoZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHF1ZXJ5U2xvdHRlZEFsbChjb21wb25lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKCFjb21wb25lbnQpIHRocm93IEVycm9yKCdyZXF1aXJlcyBlaXRoZXIgY29tcG9uZW50Jyk7XG4gICAgaWYgKCFzZWxlY3RvcikgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIHNlbGVjdG9yJyk7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5hc3NpZ25lZE5vZGVzKHsgZmxhdHRlbjogdHJ1ZSB9KS5yZWR1Y2UoKGEsIGVsKSA9PiB7XG4gICAgICBpZiAoIWVsLnF1ZXJ5U2VsZWN0b3JBbGwpIHJldHVybiBhO1xuICAgICAgcmV0dXJuIGEuY29uY2F0KFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV0pO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHNsb3R0ZWRDaGlsZHJlbihjb21wb25lbnQpIHtcbiAgICBpZiAoIWNvbXBvbmVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGVpdGhlciBjb21wb25lbnQnKTtcbiAgICByZXR1cm4gY29tcG9uZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdCcpLmFzc2lnbmVkTm9kZXMoKTtcbiAgfVxuXG4gIGdldCB0cmFuc2l0aW9uRXZlbnROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb25FdmVudE5hbWVfO1xuICB9XG5cbiAgZ2V0IHRyYW5zZm9ybVByb3BlcnR5TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xuICB9XG5cbiAgYWRkQmFja2Ryb3AoZWxlbWVudCwgY2xpY2tDYWxsYmFjaywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLnVpZCgpO1xuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGlkPVwiJHtpZH1cIiBjbGFzcz1cIm1kdy1iYWNrZHJvcFwiPjwvZGl2PmApO1xuICAgIGNvbnN0IGJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuICAgIGlmIChvcHRpb25zLmRyYXdlciA9PT0gdHJ1ZSkgYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21kdy1kcmF3ZXItYmFja2Ryb3AnKTtcbiAgICBpZiAoY2xpY2tDYWxsYmFjaykgYmFja2Ryb3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYWxsYmFjayk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKGNsaWNrQ2FsbGJhY2spIGJhY2tkcm9wRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FsbGJhY2spO1xuICAgICAgICBiYWNrZHJvcEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIF9zZXR1cFRyYW5zaXRpb25FdmVudCgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB7XG4gICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgIH07XG5cbiAgICBmb3IgKGxldCB0IGluIHRyYW5zaXRpb25zKXtcbiAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB0aGlzLnRyYW5zaXRpb25FdmVudE5hbWVfID0gdHJhbnNpdGlvbnNbdF07XG4gICAgfVxuICB9XG5cbiAgX3NldFRyYW5zZm9ybVByb3BlcnR5TmFtZShmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSAndHJhbnNmb3JtJyBpbiBlbC5zdHlsZSA/ICd0cmFuc2Zvcm0nIDogJ3dlYmtpdFRyYW5zZm9ybSc7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5NRFdVdGlscyA9IE1EV1V0aWxzO1xuXG5leHBvcnQgZGVmYXVsdCBNRFdVdGlscztcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICA6cm9vdCB7XG4gICAgICAvKiAtLS0gdGV4dCB2YXJpYWJsZXMgLS0tICovXG4gICAgICAtLW1kdy10aGVtZS10ZXh0LXByaW1hcnktb24tYmFja2dyb3VuZC0tbGlnaHQ6ICNmZmZmZmY7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LXNlY29uZGFyeS1vbi1iYWNrZ3JvdW5kLS1saWdodDogcmdiYSgyNTUsMjU1LDI1NSwgLjcpO1xuICAgICAgLS1tZHctdGhlbWUtdGV4dC1oaW50LW9uLWJhY2tncm91bmQtLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNSk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LWRpc2FibGVkLW9uLWJhY2tncm91bmQtLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNSk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LWljb24tb24tYmFja2dyb3VuZC0tbGlnaHQ6IHJnYmEoMjU1LDI1NSwyNTUsIC41KTtcblxuICAgICAgLS1tZHctdGhlbWUtdGV4dC1wcmltYXJ5LW9uLWJhY2tncm91bmQtLWRhcms6IHJnYmEoMCwwLDAsIC44Nyk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LXNlY29uZGFyeS1vbi1iYWNrZ3JvdW5kLS1kYXJrOiByZ2JhKDAsMCwwLCAuNTQpO1xuICAgICAgLS1tZHctdGhlbWUtdGV4dC1oaW50LW9uLWJhY2tncm91bmQtLWRhcms6IHJnYmEoMCwwLDAsIC4zOCk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LWRpc2FibGVkLW9uLWJhY2tncm91bmQtLWRhcms6IHJnYmEoMCwwLDAsIC4zOCk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LWljb24tb24tYmFja2dyb3VuZC0tZGFyazogcmdiYSgwLDAsMCwgLjM4KTtcblxuXG4gICAgICAvKiAtLS0gb24gdmFyaWFibGVzIC0tLSAqL1xuXG4gICAgICAtLW1kdy10aGVtZS1vbi1wcmltYXJ5LS1saWdodDogIzAwMDAwMDtcbiAgICAgIC0tbWR3LXRoZW1lLW9uLXNlY29uZGFyeS0tbGlnaHQ6ICMwMDAwMDA7XG4gICAgICAtLW1kdy10aGVtZS1vbi1lcnJvci0tbGlnaHQ6ICMwMDAwMDA7XG4gICAgICAtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1saWdodDogIzAwMDAwMDtcblxuICAgICAgLS1tZHctdGhlbWUtb24tcHJpbWFyeS0tZGFyazogI2ZmZmZmZjtcbiAgICAgIC0tbWR3LXRoZW1lLW9uLXNlY29uZGFyeS0tZGFyazogI2ZmZmZmZjtcbiAgICAgIC0tbWR3LXRoZW1lLW9uLWVycm9yLS1kYXJrOiAjZmZmZmZmO1xuICAgICAgLS1tZHctdGhlbWUtb24tYmFja2dyb3VuZC0tZGFyazogI2ZmZmZmZjtcblxuXG4gICAgICAvKiAtLS0gc3RhbmRhcmQgLS0tICovXG5cbiAgICAgIC0tbWR3LXRoZW1lLXByaW1hcnktLWxpZ2h0OiAjNjIwMGVlO1xuICAgICAgLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1saWdodDogIzAxODc4NjtcbiAgICAgIC0tbWR3LXRoZW1lLWVycm9yLS1saWdodDogI2IwMDAyMDtcbiAgICAgIC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLWxpZ2h0OiAjZmZmZmZmO1xuICAgICAgLS1tZHctdGhlbWUtc3VyZmFjZS0tbGlnaHQ6ICNmZmZmZmY7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXByaW1hcnktLWRhcms6ICNiMzlkZGI7XG4gICAgICAtLW1kdy10aGVtZS1zZWNvbmRhcnktLWRhcms6ICM4MGNiYzQ7XG4gICAgICAtLW1kdy10aGVtZS1lcnJvci0tZGFyazogI2VmOWE5YTtcbiAgICAgIC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLWRhcms6ICMxMjEyMTI7XG4gICAgICAtLW1kdy10aGVtZS1zdXJmYWNlLS1kYXJrOiAjMTIxMjEyO1xuXG5cbiAgICAgIC8qIC0tLSBvdGhlciAtLS0gKi9cblxuICAgICAgLS1tZHctdGhlbWUtY2hlY2tib3hib3JkZXItLWxpZ2h0OiByZ2JhKDAsMCwwLCAuNTQpO1xuICAgICAgLS1tZHctdGhlbWUtY2hlY2tib3hib3JkZXItLWRhcms6IHJnYmEoMjU1LDI1NSwyNTUsIC41KTtcbiAgICAgIC0tbWR3LXRoZW1lLWNoZWNrYm94Ym9yZGVyZGlzYWJsZWQtLWxpZ2h0OiByZ2JhKDAsMCwwLCAuMjYpO1xuICAgICAgLS1tZHctdGhlbWUtY2hlY2tib3hib3JkZXJkaXNhYmxlZC0tZGFyazogcmdiYSgyNTUsMjU1LDI1NSwgLjI0KTtcblxuICAgICAgLS1tZHctdGhlbWUtbGlzdF9pdGVtX2ZvY3VzLS1saWdodDogcmdiYSgwLDAsMCwuMDYpO1xuICAgICAgLS1tZHctdGhlbWUtbGlzdF9pdGVtX2ZvY3VzLS1kYXJrOiByZ2JhKDEwMCwxMDAsMTAwLC4xNik7XG4gICAgfVxuICBgO1xufVxuXG5cbi8vIC8qIC0tLSB0ZXh0IC0tLSAqL1xuLy8gLS1tZHctdGhlbWUtdGV4dC0tcHJpbWFyeS0tbGlnaHQ6ICNmZmZmZmY7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1zZWNvbmRhcnktLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNyk7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1lcnJvci0tbGlnaHQ6IHJnYmEoMjU1LDI1NSwyNTUsIC43KTtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLWhpbnQtLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNSk7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1kaXNhYmxlZC0tbGlnaHQ6IHJnYmEoMjU1LDI1NSwyNTUsIC41KTtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLWljb24tLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNSk7XG5cbi8vIC0tbWR3LXRoZW1lLXRleHQtLXByaW1hcnktLWRhcms6IHJnYmEoMCwwLDAsIC44Nyk7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1zZWNvbmRhcnktLWRhcms6IHJnYmEoMCwwLDAsIC41NCk7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1lcnJvci0tZGFyazogcmdiYSgwLDAsMCwgLjU0KTtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLWhpbnQtLWRhcms6IHJnYmEoMCwwLDAsIC4zOCk7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1kaXNhYmxlZC0tZGFyazogcmdiYSgwLDAsMCwgLjM4KTtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLWljb24tLWRhcms6IHJnYmEoMCwwLDAsIC4zOCk7XG5cbi8vIC0tbWR3LXRoZW1lLXRleHQtLW9uLXByaW1hcnktLWxpZ2h0OiAjRkZGRkZGO1xuLy8gLS1tZHctdGhlbWUtdGV4dC0tb24tc2Vjb25kYXJ5LS1saWdodDogIzAwMDAwMDtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLW9uLWVycm9yLS1saWdodDogI0ZGRkZGRjtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLW9uLWJhY2tncm91bmQtLWxpZ2h0OiAjMDAwMDAwO1xuLy8gLS1tZHctdGhlbWUtdGV4dC0tb24tc3VyZmFjZS0tbGlnaHQ6ICMwMDAwMDA7XG5cbi8vIC0tbWR3LXRoZW1lLXRleHQtLW9uLXByaW1hcnktLWRhcms6ICMwMDAwMDA7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1vbi1zZWNvbmRhcnktLWRhcms6ICNGRkZGRkY7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1vbi1lcnJvci0tZGFyazogIzAwMDAwMDtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLW9uLWJhY2tncm91bmQtLWRhcms6ICNGRkZGRkY7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1vbi1zdXJmYWNlLS1kYXJrOiAjRkZGRkZGO1xuXG4vLyAtLW1kdy10aGVtZS10ZXh0LS1oZWFkaW5nLS1saWdodDogIzIxMjEyMTtcbi8vIC0tbWR3LXRoZW1lLXRleHQtLWhlYWRpbmctLWRhcms6ICNlY2VjZWM7XG5cbi8vIC0tbWR3LXRoZW1lLXRleHQtLWJvZHktLWxpZ2h0OiAjNjE2MTYxO1xuLy8gLS1tZHctdGhlbWUtdGV4dC0tYm9keS0tZGFyazogI2I1YjViNTtcblxuXG4vLyAvKiAtLS0gc3VyZmFjZXMgYW5kIGJhY2tncm91bmRzIC0tLSAqL1xuLy8gLS1tZHctdGhlbWUtYmFja2dyb3VuZC0tbGlnaHQ6ICNmYWZhZmE7XG4vLyAtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1kYXJrOiAjMTIxMjEyO1xuXG4vLyAtLW1kdy10aGVtZS1mb3JlZ3JvdW5kLS1saWdodDogIzEyMTIxMjtcbi8vIC0tbWR3LXRoZW1lLWZvcmVncm91bmQtLWRhcms6ICNmYWZhZmE7XG5cbi8vIC0tbWR3LXRoZW1lLXN1cmZhY2UtLWxpZ2h0OiAjZmFmYWZhO1xuLy8gLS1tZHctdGhlbWUtc3VyZmFjZS0tZGFyazogIzEyMTIxMjtcblxuLy8gLS1tZHctdGhlbWUtc3VyZmFjZV9lbGV2YXRpb25fMS0tbGlnaHQ6ICNmNmY2ZjY7XG4vLyAtLW1kdy10aGVtZS1zdXJmYWNlX2VsZXZhdGlvbl8xLS1kYXJrOiAjMzAzMDMwO1xuXG4vLyAtLW1kdy10aGVtZS1kaXZpZGVyLS1kYXJrOiByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuLy8gLS1tZHctdGhlbWUtZGl2aWRlci0tbGlnaHQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xMik7XG5cbi8vIC0tbWR3LXRoZW1lLWRpdmlkZXItLW9uLWJhY2tncm91bmQtLWRhcms6IHZhcigtLW1kdy10aGVtZS1kaXZpZGVyLS1saWdodCk7XG4vLyAtLW1kdy10aGVtZS1kaXZpZGVyLS1vbi1iYWNrZ3JvdW5kLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLWRpdmlkZXItLWRhcmspO1xuXG5cbi8vIC8qIC0tLSBvbmUgb2ZmcyBmb3IgY29tcG9uZW50cyAtLS0gKi9cbi8vIC0tbWR3LXRoZW1lLXN3aXRjaHRyYWNrLS1saWdodDogIzAwMDAwMDtcbi8vIC0tbWR3LXRoZW1lLXN3aXRjaHRyYWNrLS1kYXJrOiByZ2JhKDI1NSwyNTUsMjU1LCAuMzIpO1xuXG4vLyAtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlci0tbGlnaHQ6IHJnYmEoMCwwLDAsIC41NCk7XG4vLyAtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlci0tZGFyazogcmdiYSgyNTUsMjU1LDI1NSwgLjUpO1xuXG4vLyAtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlcmRpc2FibGVkLS1saWdodDogcmdiYSgwLDAsMCwgLjI2KTtcbi8vIC0tbWR3LXRoZW1lLWNoZWNrYm94Ym9yZGVyZGlzYWJsZWQtLWRhcms6IHJnYmEoMjU1LDI1NSwyNTUsIC4yNCk7XG5cbi8vIC0tbWR3LXRoZW1lLXNuYWNrYmFyY29udGFpbmVyLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLWRhcmspO1xuLy8gLS1tZHctdGhlbWUtc25hY2tiYXJjb250YWluZXItLWRhcms6IHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1saWdodCk7XG5cbi8vIC0tbWR3LXRoZW1lLXRleHQtLW9uLXNuYWNrYmFyLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXRleHQtLXNlY29uZGFyeSk7XG4vLyAtLW1kdy10aGVtZS10ZXh0LS1vbi1zbmFja2Jhci0tZGFyazogIzAwMDAwMDtcblxuLy8gLS1tZHctdGhlbWUtbGlzdF9pdGVtX2ZvY3VzLS1saWdodDogcmdiYSgwLDAsMCwuMDYpO1xuLy8gLS1tZHctdGhlbWUtbGlzdF9pdGVtX2ZvY3VzLS1kYXJrOiByZ2JhKDEwMCwxMDAsMTAwLC4xNik7XG5cbi8vIC0tbWR3LXRoZW1lLW91dGxpbmVfYm9yZGVyLS1saWdodDogcmdiYSgwLDAsMCwuMjQpO1xuLy8gLS1tZHctdGhlbWUtb3V0bGluZV9ib3JkZXItLWRhcms6IHJnYmEoMjU1LDI1NSwyNTUsLjI0KTtcblxuLy8gLS1tZHctdGhlbWUtdGV4dGZpZWxkX2JhY2tncm91bmQtLWxpZ2h0OiAjZjVmNWY1O1xuLy8gLS1tZHctdGhlbWUtdGV4dGZpZWxkX2JhY2tncm91bmQtLWRhcms6ICMzMDMwMzA7XG5cbi8qIC0tLSBwYWxldHRlcyAtLS0gKi9cbi8vIC8qIEJ5IGRlZmF1bHQsIHNoYWRlcyA1MDAsIDMwMCA4MDAgYW5kIEExMDAgYXJlIHVzZWQgZm9yIHByaW1hcnkgYW5kIHdhcm4gaW50ZW50aW9ucywgd2hpbGUgQTIwMCwgQTEwMCwgQTQwMCBhbmQgQTcwMCBhcmUgdXNlZCBmb3IgYWNjZW50ICovXG5cbi8vIC8qIHJlZCAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTUwOiAjZmZlYmVlO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTEwMDogI2ZmY2RkMjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC0yMDA6ICNlZjlhOWE7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtMzAwOiAjZTU3MzczO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTQwMDogI2VmNTM1MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC01MDA6ICNmNDQzMzY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtNjAwOiAjZTUzOTM1O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTcwMDogI2QzMmYyZjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC04MDA6ICNjNjI4Mjg7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtOTAwOiAjYjcxYzFjO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLUExMDA6ICNmZjhhODA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtQTIwMDogI2ZmNTI1Mjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC1BNDAwOiAjZmYxNzQ0O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLUE3MDA6ICNkNTAwMDA7XG5cbi8vIC8qIHBpbmsgKi9cbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstNTA6ICNGQ0U0RUM7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTEwMDogI0Y4QkJEMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstMjAwOiAjRjQ4RkIxO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay0zMDA6ICNGMDYyOTI7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTQwMDogI0VDNDA3QTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstNTAwOiAjRTkxRTYzO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay02MDA6ICNEODFCNjA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTcwMDogI0MyMTg1Qjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstODAwOiAjQUQxNDU3O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay05MDA6ICM4ODBFNEY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLUExMDA6ICNGRjgwQUI7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLUEyMDA6ICNGRjQwODE7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLUE0MDA6ICNGNTAwNTc7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLUE3MDA6ICNDNTExNjI7XG5cbi8vIC8qIHB1cnBsZSAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTUwOiAjZjNlNWY1O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTEwMDogI2UxYmVlNztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS0yMDA6ICNjZTkzZDg7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtMzAwOiAjYmE2OGM4O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTQwMDogI2FiNDdiYztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS01MDA6ICM5YzI3YjA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtNjAwOiAjOGUyNGFhO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTcwMDogIzdiMWZhMjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS04MDA6ICM2YTFiOWE7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtOTAwOiAjNGExNDhjO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLUExMDA6ICNlYTgwZmM7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtQTIwMDogI2UwNDBmYjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS1BNDAwOiAjZDUwMGY5O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLUE3MDA6ICNhYTAwZmY7XG5cbi8vIC8qIGRlZXBwdXJwbGUgKi9cbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtNTA6ICNlZGU3ZjY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTEwMDogI2QxYzRlOTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtMjAwOiAjYjM5ZGRiO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS0zMDA6ICM5NTc1Y2Q7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTQwMDogIzdlNTdjMjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtNTAwOiAjNjczYWI3OyAvKiA2MDAyZWUgKi9cbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtNjAwOiAjNWUzNWIxO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS03MDA6ICM1MTJkYTg7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTgwMDogIzQ1MjdhMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtOTAwOiAjMzExYjkyO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS1BMTAwOiAjYjM4OGZmO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS1BMjAwOiAjN2M0ZGZmO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS1BNDAwOiAjNjUxZmZmO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS1BNzAwOiAjNjIwMGVhO1xuXG4vLyAvKiBJbmRpZ28gKi9cbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby01MDogI0U4RUFGNjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby0xMDA6ICNDNUNBRTk7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tMjAwOiAjOUZBOERBO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTMwMDogIzc5ODZDQjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby00MDA6ICM1QzZCQzA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tNTAwOiAjM0Y1MUI1O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTYwMDogIzM5NDlBQjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby03MDA6ICMzMDNGOUY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tODAwOiAjMjgzNTkzO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTkwMDogIzFBMjM3RTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby1BMTAwOiAjOEM5RUZGO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLUEyMDA6ICM1MzZERkU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tQTQwMDogIzNENUFGRTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby1BNzAwOiAjMzA0RkZFO1xuXG4vLyAvKiBibHVlICovXG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTUwOiAjZTNmMmZkO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS0xMDA6ICNiYmRlZmI7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTIwMDogIzkwY2FmOTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtMzAwOiAjNjRiNWY2O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS00MDA6ICM0MmE1ZjU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTUwMDogIzIxOTZmMztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtNjAwOiAjMWU4OGU1O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS03MDA6ICMxOTc2ZDI7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTgwMDogIzE1NjVjMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtOTAwOiAjMGQ0N2ExO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS1BMTAwOiAjODJiMWZmO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS1BMjAwOiAjNDQ4YWZmO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS1BNDAwOiAjMjk3OWZmO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS1BNzAwOiAjMjk2MmZmO1xuXG4vLyAvKiBMaWdodCBibHVlICovXG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtNTA6ICNFMUY1RkU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtMTAwOiAjQjNFNUZDO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTIwMDogIzgxRDRGQTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS0zMDA6ICM0RkMzRjc7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtNDAwOiAjMjlCNkY2O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTUwMDogIzAzQTlGNDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS02MDA6ICMwMzlCRTU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtNzAwOiAjMDI4OEQxO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTgwMDogIzAyNzdCRDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS05MDA6ICMwMTU3OUI7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtQTEwMDogIzgwRDhGRjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS1BMjAwOiAjNDBDNEZGO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLUE0MDA6ICMwMEIwRkY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtQTcwMDogIzAwOTFFQTtcblxuLy8gLyogQ3lhbiAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi01MDogI0UwRjdGQTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tMTAwOiAjQjJFQkYyO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi0yMDA6ICM4MERFRUE7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1jeWFuLTMwMDogIzRERDBFMTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tNDAwOiAjMjZDNkRBO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi01MDA6ICMwMEJDRDQ7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1jeWFuLTYwMDogIzAwQUNDMTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tNzAwOiAjMDA5N0E3O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi04MDA6ICMwMDgzOEY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1jeWFuLTkwMDogIzAwNjA2NDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTEwMDogIzg0RkZGRjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTIwMDogIzE4RkZGRjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTQwMDogIzAwRTVGRjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTcwMDogIzAwQjhENDtcblxuLy8gLyogdGVhbCAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC01MDogI2UwZjJmMTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtMTAwOiAjYjJkZmRiO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC0yMDA6ICM4MGNiYzQ7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS10ZWFsLTMwMDogIzRkYjZhYztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtNDAwOiAjMjZhNjlhO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC01MDA6ICMwMDk2ODg7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS10ZWFsLTYwMDogIzAwODk3Yjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtNzAwOiAjMDA3OTZiO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC04MDA6ICMwMDY5NWM7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS10ZWFsLTkwMDogIzAwNGQ0MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTEwMDogI2E3ZmZlYjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTIwMDogIzY0ZmZkYTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTQwMDogIzFkZTliNjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTcwMDogIzAwYmZhNTtcblxuLy8gLyogZ3JlZW4gKi9cbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLTUwOiAjRThGNUU5O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tMTAwOiAjQzhFNkM5O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tMjAwOiAjQTVENkE3O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tMzAwOiAjODFDNzg0O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNDAwOiAjNjZCQjZBO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNTAwOiAjNENBRjUwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNjAwOiAjNDNBMDQ3O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNzAwOiAjMzg4RTNDO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tODAwOiAjMkU3RDMyO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tOTAwOiAjMUI1RTIwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tQTEwMDogI0I5RjZDQTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLUEyMDA6ICM2OUYwQUU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1ncmVlbi1BNDAwOiAjMDBFNjc2O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tQTcwMDogIzAwQzg1MztcblxuLy8gLyogbGlnaHRncmVlbiAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi01MDogI0YxRjhFOTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tMTAwOiAjRENFREM4O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi0yMDA6ICNDNUUxQTU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTMwMDogI0FFRDU4MTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tNDAwOiAjOUNDQzY1O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi01MDA6ICM4QkMzNEE7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTYwMDogIzdDQjM0Mjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tNzAwOiAjNjg5RjM4O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi04MDA6ICM1NThCMkY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTkwMDogIzMzNjkxRTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tQTEwMDogI0NDRkY5MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tQTIwMDogI0IyRkY1OTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tQTQwMDogIzc2RkYwMztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tQTcwMDogIzY0REQxNztcblxuLy8gLyogbGltZSAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS01MDogI0Y5RkJFNztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtMTAwOiAjRjBGNEMzO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS0yMDA6ICNFNkVFOUM7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTMwMDogI0RDRTc3NTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtNDAwOiAjRDRFMTU3O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS01MDA6ICNDRERDMzk7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTYwMDogI0MwQ0EzMztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtNzAwOiAjQUZCNDJCO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS04MDA6ICM5RTlEMjQ7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTkwMDogIzgyNzcxNztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtQTEwMDogI0Y0RkY4MTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtQTIwMDogI0VFRkY0MTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtQTQwMDogI0M2RkYwMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtQTcwMDogI0FFRUEwMDtcblxuLy8gLyogeWVsbG93ICovXG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctNTA6ICNGRkZERTc7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctMTAwOiAjRkZGOUM0O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTIwMDogI0ZGRjU5RDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy0zMDA6ICNGRkYxNzY7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctNDAwOiAjRkZFRTU4O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTUwMDogI0ZGRUIzQjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy02MDA6ICNGREQ4MzU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctNzAwOiAjRkJDMDJEO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTgwMDogI0Y5QTgyNTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy05MDA6ICNGNTdGMTc7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctQTEwMDogI0ZGRkY4RDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy1BMjAwOiAjRkZGRjAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LUE0MDA6ICNGRkVBMDA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctQTcwMDogI0ZGRDYwMDtcblxuLy8gLyogYW1iZXIgKi9cbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLTUwOiAjRkZGOEUxO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItMTAwOiAjRkZFQ0IzO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItMjAwOiAjRkZFMDgyO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItMzAwOiAjRkZENTRGO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNDAwOiAjRkZDQTI4O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNTAwOiAjRkZDMTA3O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNjAwOiAjRkZCMzAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNzAwOiAjRkZBMDAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItODAwOiAjRkY4RjAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItOTAwOiAjRkY2RjAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItQTEwMDogI0ZGRTU3Rjtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLUEyMDA6ICNGRkQ3NDA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1hbWJlci1BNDAwOiAjRkZDNDAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItQTcwMDogI0ZGQUIwMDtcblxuLy8gLyogb3JhbmdlICovXG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtNTA6ICNGRkYzRTA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtMTAwOiAjRkZFMEIyO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTIwMDogI0ZGQ0M4MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS0zMDA6ICNGRkI3NEQ7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtNDAwOiAjRkZBNzI2O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTUwMDogI0ZGOTgwMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS02MDA6ICNGQjhDMDA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtNzAwOiAjRjU3QzAwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTgwMDogI0VGNkMwMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS05MDA6ICNFNjUxMDA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtQTEwMDogI0ZGRDE4MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS1BMjAwOiAjRkZBQjQwO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLUE0MDA6ICNGRjkxMDA7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtQTcwMDogI0ZGNkQwMDtcblxuLy8gLyogZGVlcG9yYW5nZSAqL1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS01MDogI0ZCRTlFNztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtMTAwOiAjRkZDQ0JDO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS0yMDA6ICNGRkFCOTE7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwb3JhbmdlLTMwMDogI0ZGOEE2NTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtNDAwOiAjRkY3MDQzO1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS01MDA6ICNGRjU3MjI7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwb3JhbmdlLTYwMDogI0Y0NTExRTtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtNzAwOiAjRTY0QTE5O1xuLy8gLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS04MDA6ICNEODQzMTU7XG4vLyAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwb3JhbmdlLTkwMDogI0JGMzYwQztcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTEwMDogI0ZGOUU4MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTIwMDogI0ZGNkU0MDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTQwMDogI0ZGM0QwMDtcbi8vIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTcwMDogI0REMkMwMDtcbiIsImltcG9ydCBNRFdVdGlscyBmcm9tICcuL1V0aWxzLmpzJztcblxuY29uc3Qgc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERyYWdMaXN0ZW5lcihlbGVtZW50LCBjYWxsYmFjaykge1xuICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB0aHJvdyBFcnJvcignZWxlbWVudCBtdXN0IGJlIGFuIGluc3RhbmNlIEhUTUxFbGVtZW50Jyk7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHRocm93IEVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBjb25zdCBzd2lwSW5zdGFuY2UgPSBuZXcgRHJhZyhlbGVtZW50LCBjYWxsYmFjayk7XG4gIHN3aXBJbnN0YW5jZS5hZGRFdmVudHMoKTtcblxuICBpZiAoIXN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpKSBzd2lwZUluc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLnNldChlbGVtZW50LCBuZXcgTWFwKCkpO1xuICBzd2lwZUluc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLmdldChlbGVtZW50KS5zZXQoY2FsbGJhY2ssIHN3aXBJbnN0YW5jZSk7XG59O1xuXG4vLyBpZiB5b3UgZG8gbm90IHBhc3MgaW4gY2FsbGJhY2sgdGhlbiBhbGwgdGhlIHN3aXBlIGV2ZW50cyBvbiBhbiBlbGVtZW50IHdpbGwgYmUgcmVtb3ZlZFxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURyYWdMaXN0ZW5lcihlbGVtZW50LCBjYWxsYmFjayA9IHVuZGVmaW5lZCkge1xuICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB0aHJvdyBFcnJvcignZWxlbWVudCBtdXN0IGJlIGFuIGluc3RhbmNlIEhUTUxFbGVtZW50Jyk7XG5cbiAgY29uc3Qgc3dpcEluc3RhbmNlcyA9IHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpO1xuICBpZiAoIXN3aXBJbnN0YW5jZXMpIHJldHVybjtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZWwgPSBzd2lwSW5zdGFuY2VzLmdldChjYWxsYmFjayk7XG4gICAgaWYgKGVsKSBlbC5yZW1vdmVFdmVudHMoKTtcbiAgICBzd2lwSW5zdGFuY2VzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgc3dpcEluc3RhbmNlcy5mb3JFYWNoKGkgPT4gaS5yZW1vdmVFdmVudHMoKSk7XG4gICAgc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5kZWxldGUoZWxlbWVudCk7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVEcmFnTGlzdGVuZXJGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgRXJyb3IoJ2VsZW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBIVE1MRWxlbWVudCcpO1xuICBjb25zdCBzd2lwSW5zdGFuY2VzID0gc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5nZXQoZWxlbWVudCk7XG4gIGlmICghc3dpcEluc3RhbmNlcykgcmV0dXJuO1xuICBzd2lwSW5zdGFuY2VzLmZvckVhY2goaSA9PiBpLmVuYWJsZSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVEcmFnTGlzdGVuZXJGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgRXJyb3IoJ2VsZW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBIVE1MRWxlbWVudCcpO1xuICBjb25zdCBzd2lwSW5zdGFuY2VzID0gc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5nZXQoZWxlbWVudCk7XG4gIGlmICghc3dpcEluc3RhbmNlcykgcmV0dXJuO1xuICBzd2lwSW5zdGFuY2VzLmZvckVhY2goaSA9PiBpLmRpc2FibGUoKSk7XG59XG5cbmNsYXNzIERyYWcge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgdGhpcy5oYXNQb2ludGVyRXZlbnQgPSAhIXdpbmRvdy5Qb2ludGVyRXZlbnQ7XG4gICAgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlU3RhcnQgPSB0aGlzLmhhbmRsZUdlc3R1cmVTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUgPSB0aGlzLmhhbmRsZUdlc3R1cmVNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kID0gdGhpcy5oYW5kbGVHZXN0dXJlRW5kLmJpbmQodGhpcyk7XG5cbiAgICAvLyBjYWxsYmFjayB0aHJvdHRsZXJcbiAgICB0aGlzLmNhbGxiYWNrVGhyb3R0bGUgPSBNRFdVdGlscy5yYWZUaHJvdHRsZSgoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LmRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZShldmVudCk7XG4gICAgICBldmVudC5kaXJlY3Rpb24gPSB0aGlzLmdldERpcmVjdGlvbih0aGlzLmxhc3REaXN0YW5jZSwgZXZlbnQuZGlzdGFuY2UpO1xuICAgICAgdGhpcy5sYXN0RGlzdGFuY2UgPSBldmVudC5kaXN0YW5jZTtcbiAgICAgIHRoaXMuY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkRXZlbnRzKCkge1xuICAgIHRoaXMuZGlzYWJsZVRvdWNoRXZlbnRzKCk7XG5cbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlU3RhcnQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZVN0YXJ0KTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gIH1cblxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgfVxuXG4gIGVuYWJsZVRvdWNoRXZlbnRzKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZVsndG91Y2gtYWN0aW9uJ10gPSAnJztcbiAgfVxuXG4gIGRpc2FibGVUb3VjaEV2ZW50cygpIHtcbiAgICAvLyB0aGlzIGRpc2FibGVkIHRoZSBicm93c2VycyBhdXRvIGhhbmRsaW5nIG9mIHRoZSB0b3VjaCBldmVudHMuXG4gICAgLy8gSWYgdGhpcyBpcyBub3Qgc2V0IHRvIG5vbmUsIHRoZW4gdGhlIGJyb3dzZXIgd2lsbCBpbW1pZGlhdGVseSBjYW5jZWwgdGhlIHRvYWNoIGV2bmV0c1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZVsndG91Y2gtYWN0aW9uJ10gPSAnbm9uZSc7XG4gIH1cblxuICByZW1vdmVFdmVudHMoKSB7XG4gICAgdGhpcy5lbmFibGVUb3VjaEV2ZW50cygpO1xuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVTdGFydCk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZVN0YXJ0KTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVNb3ZlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVHZXN0dXJlU3RhcnQoZXYpIHtcbiAgICBldi5zdGF0ZSA9ICdzdGFydCc7XG5cbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVNb3ZlLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuaW5pdGlhbFRvdWNoUG9zID0gdGhpcy5nZXRDbGllbnRYWShldik7XG4gICAgdGhpcy5sYXN0RGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlKGV2KTtcbiAgICBldi5kaXN0YW5jZSA9IHRoaXMubGFzdERpc3RhbmNlO1xuICAgIGV2LmRpcmVjdGlvbiA9IHRoaXMuZ2V0RGlyZWN0aW9uKHRoaXMubGFzdERpc3RhbmNlLCB0aGlzLmxhc3REaXN0YW5jZSk7XG4gICAgdGhpcy5jYWxsYmFjayhldik7XG4gICAgLy8gZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGhhbmRsZUdlc3R1cmVNb3ZlKGV2KSB7XG4gICAgZXYuc3RhdGUgPSAnbW92ZSc7XG4gICAgaWYgKHRoaXMuaW5pdGlhbFRvdWNoUG9zKSB0aGlzLmNhbGxiYWNrVGhyb3R0bGUoZXYpO1xuICAgIC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBoYW5kbGVHZXN0dXJlRW5kKGV2KSB7XG4gICAgZXYuc3RhdGUgPSAnZW5kJztcbiAgICBcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVNb3ZlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBldi5ydW5UaW1lID0gdGhpcy5lbmRUaW1lIC0gdGhpcy5zdGFydFRpbWU7XG4gICAgZXYuZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlKGV2KTtcbiAgICBldi5lbmREaXJlY3Rpb24gPSB0aGlzLmdldERpcmVjdGlvbih7IHg6IDAsIHk6IDAgfSwgZXYuZGlzdGFuY2UpO1xuICAgIGV2LnZlbG9jaXR5ID0gdGhpcy5nZXRWZWxvY2l0eShldi5kaXN0YW5jZSwgZXYucnVuVGltZSk7XG5cbiAgICBpZiAoZXYuY2xpZW50WCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjbGllbnRQb3MgPSB0aGlzLmdldENsaWVudFhZKGV2KTtcbiAgICAgIGV2LmNsaWVudFggPSBjbGllbnRQb3MueDtcbiAgICAgIGV2LmNsaWVudFkgPSBjbGllbnRQb3MueTtcbiAgICB9XG4gICAgdGhpcy5jYWxsYmFjayhldik7XG4gICAgLy8gZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGdldERpc3RhbmNlKGV2ZW50KSB7XG4gICAgY29uc3QgeHkgPSB0aGlzLmdldENsaWVudFhZKGV2ZW50KTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeHkueCAtIHRoaXMuaW5pdGlhbFRvdWNoUG9zLngsXG4gICAgICB5OiB4eS55IC0gdGhpcy5pbml0aWFsVG91Y2hQb3MueVxuICAgIH07XG4gIH1cblxuICBnZXREaXJlY3Rpb24oYSwgYikge1xuICAgIGNvbnN0IHggPSBiLnggPiBhLnggPyAxIDogYi54ID09PSBhLnggPyAwIDogLTE7XG4gICAgY29uc3QgeSA9IGIueSA+IGEueSA/IDEgOiBiLnkgPT09IGEueSA/IDAgOiAtMTtcbiAgICByZXR1cm4ge1xuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB4RGVzY3JpcHRpb246IHggPT09IDAgPyAnbm9uZScgOiB4ID09PSAxID8gJ3JpZ2h0JyA6ICdsZWZ0JyxcbiAgICAgIHlEZXNjcmlwdGlvbjogeSA9PT0gMCA/ICdub25lJyA6IHkgPT09IDEgPyAnZG93bicgOiAndXAnXG4gICAgfTtcbiAgfVxuXG4gIGdldENsaWVudFhZKGV2ZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGV2ZW50LnRhcmdldFRvdWNoZXMgJiYgZXZlbnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBldmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFggOiBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQuY2xpZW50WCxcbiAgICAgIHk6IGV2ZW50LnRhcmdldFRvdWNoZXMgJiYgZXZlbnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBldmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkgOiBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIDogZXZlbnQuY2xpZW50WVxuICAgIH1cbiAgfVxuXG4gIGdldFZlbG9jaXR5KGRpc3RhbmNlLCB0aW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGRpc3RhbmNlLnggLyB0aW1lLFxuICAgICAgeTogZGlzdGFuY2UueSAvIHRpbWVcbiAgICB9O1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgaXNQaG9uZSA9IGlzUGhvbmVDaGVjaygpO1xuZXhwb3J0IGNvbnN0IGlzUGhvbmVBbmRUYWJsZXQgPSBpc1Bob25lQW5kVGFibGV0Q2hlY2soKTtcblxuZnVuY3Rpb24gaXNQaG9uZUFuZFRhYmxldENoZWNrKCkge1xuICBpZiAodHlwZW9mIEZPUkNFX01PQklMRSAhPT0ndW5kZWZpbmVkJyAmJiBGT1JDRV9NT0JJTEUgPT09ICd0cnVlJykgcmV0dXJuIHRydWU7XG4gIHZhciBjaGVjayA9IGZhbHNlO1xuICAoZnVuY3Rpb24gKGEpIHtcbiAgICBpZiAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIGNoZWNrID0gdHJ1ZTtcbiAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG4gIHJldHVybiBjaGVjaztcbn1cblxuZnVuY3Rpb24gaXNQaG9uZUNoZWNrKCkge1xuICBpZiAodHlwZW9mIEZPUkNFX01PQklMRSAhPT0ndW5kZWZpbmVkJyAmJiBGT1JDRV9NT0JJTEUgPT09ICd0cnVlJykgcmV0dXJuIHRydWU7XG4gIHZhciBjaGVjayA9IGZhbHNlO1xuICAoZnVuY3Rpb24gKGEpIHtcbiAgICBpZiAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIGNoZWNrID0gdHJ1ZTtcbiAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG4gIHJldHVybiBjaGVjaztcbn1cbiIsImltcG9ydCAnLi9jb3JlL1RoZW1lLmpzJztcbmltcG9ydCAnLi9jb3JlL2RyYWcuanMnO1xuXG4vLyAtLS0gQ29tcG9uZW50cyAtLS1cblxuLy8gaW1wb3J0ICcuL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2luZGV4LmpzJztcbi8vIGltcG9ydCAnLi9jb21wb25lbnRzL2JhY2tkcm9wL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2Jhbm5lci9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9ib3R0b20tbmF2aWdhdGlvbi9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9idXR0b24vaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvY2FyZC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9jaXJjdWxhci1wcm9ncmVzcy9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9kaWFsb2cvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzJztcbi8vIC8vIGltcG9ydCAnLi9jb21wb25lbnRzL2V4cGFuZGVyL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2ZhYi9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9pY29uL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2xpbmVhci1wcm9ncmVzcy9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9saXN0L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2xpc3QtaXRlbS9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tZW51L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3BhbmVsL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3JhZGlvL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3JhZGlvLWdyb3VwL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3NlbGVjdC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9zaGVldC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9zbGlkZXIvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvc25hY2tiYXIvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvc3dpdGNoL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RhYnMvdGFiLWJvZHkvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdGFicy90YWItYnV0dG9uL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RhYnMvdGFicy1iYXIvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdGFicy90YWJzLWNvbnRlbnQvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdGV4dC1maWVsZC9pbmRleC5qcyc7XG4vLyBpbXBvcnQgJy4vY29tcG9uZW50cy90b29sdGlwL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RvcC1hcHAtYmFyL2luZGV4LmpzJztcbiJdLCJzb3VyY2VSb290IjoiIn0=