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
      this._rendered = false;
      this.global = typeof globalThis !== 'undefined' ? globalThis : window;
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

      if (this.removeEvents && this._rendered) this.removeEvents();
      if (this.beforeRender && this._rendered) this.beforeRender();
      renderBlock.innerHTML = `<style>${this.styles()}</style>${this.template()}`;
      if (this.afterRender) this.afterRender();
      if (this.addEvents) this.addEvents();

      this._rendered = true;
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
    this.intercepter = undefined;

    this.pageClassnameRegex = /class\s(.*)\sextends/;
    this.bound_resolve = this._resolve.bind(this);

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
    window.addEventListener('hashchange', this.bound_resolve);
    window.addEventListener('DOMContentLoaded', () => {
      this._resolve(undefined, true);
    });
  }

  // allow intercepting of route changes
  // return false to prevent route change
  // return true to allow route change
  interceptRouteChange(callback) {
    if (typeof callback === 'function') this.intercepter = callback;
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

  set hash(value) {
    window.location = `#/${value}`;
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

  addTransitionCSS() {
    if (this._addTransitionCSSAdded) return;
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
    this._addTransitionCSSAdded = true;
  }

  addPageHideCSS() {
    if (this._addPageHideCSSAdded) return;
    document.body.insertAdjacentHTML('beforebegin', `<style>
      .mdw-hide-non-page-container {
        display: none;
      }
    </style>`);
    this._addPageHideCSSAdded = true;
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

  /* Hide all top level elements except for the page-container
   */
  showPageOnly() {
    const pageContainer = document.querySelector('page-container');
    const html = document.documentElement;
    let node = pageContainer;
    let sibling;
    let directPatent = pageContainer;

    while (node.parentNode && node.parentNode !== html) {
      node = node.parentNode;
      sibling = node.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== directPatent) {
          sibling.classList.add('mdw-hide-non-page-container');
        }
        sibling = sibling.nextSibling
      }
      directPatent = node;
    }
    this.addPageHideCSS();
    this._isShowingPageOnly = true;
  }

  /* un-hide non page-container elements
   */
  undoShowPageOnly() {
    if (this._isShowingPageOnly === true) {
      [...document.querySelectorAll('.mdw-hide-non-page-container') || []].forEach(el => el.classList.remove('mdw-hide-non-page-container'));
      this._isShowingPageOnly = false;
    }
  }

  // --- private ---

  _resolve(event, initial = false) {
    const { oldURL, newURL } = event || {};

    // no change
    if (initial === false && oldURL !== undefined && oldURL === newURL) return;

    const intercepterValue = this.intercepter ? this.intercepter(newURL, oldURL) : undefined;
    if (intercepterValue && intercepterValue.then && typeof intercepterValue.then === 'function') console.error('you cannot return a Promise to the router.intercepter callback. Expecting either true or false');
    if (intercepterValue === false) {
      window.history.go();
      return;
    }

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

    // prevent page change when no difference exists
    // this will cover the case of adding the #/ to the url
    if (oldURL !== undefined) {
      const urlDiff = oldURL.length > newURL.length ? oldURL.replace(newURL, '') : newURL.replace(oldURL, '');
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

  // check all possible scroll elements and reset them
  resetPageScroll() {
    const pageContent = document.querySelector('mdw-page mdw-page-content');
    if (pageContent && pageContent.scrollTop > 0) return pageContent.scrollTop = 0;

    const content = document.querySelector('mdw-page mdw-content');
    if (content && content.scrollTop > 0) return content.scrollTop= 0;

    const page = document.querySelector('mdw-page');
    if (page && page.scrollTop > 0) return page.scrollTop = 0;

    const body = document.querySelector('body');
    if (body.scrollTop > 0) return body.scrollTop = 0;

    const documentElement = document.documentElement;
    if (documentElement.scrollTop > 0) return documentElement.scrollTop = 0;
  }

  _changePage({ Class }) {
    if (!Class) throw Error('no class found');

    const pageContainer = document.querySelector('page-container');
    if (!pageContainer) throw Error('<page-container> required for router to work');

    //
    this._stopWatchingForConnect();
    this.undoShowPageOnly();

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
      this.resetPageScroll();
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
      this.resetPageScroll();
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/banner/service.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-banner', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_mobile_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/mobile-info.js */ "./src/core/mobile-info.js");



customElements.define('mdw-bottom-navigation', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    if (!_core_mobile_info_js__WEBPACK_IMPORTED_MODULE_1__["isPhoneAndTablet"] && this.hasAttribute('mdw-mobile-only')) {
      this.style.display = 'none';
      this.style.pointerEvents = 'none';
    } else {
      this.bound_routeChange = this.routeChange.bind(this);
      document.body.classList.add('mdw-has-bottom-navigation');
    }
  }

  connectedCallback() {
    window.addEventListener('hashchange', this.bound_routeChange);
    window.addEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.bound_routeChange);
    window.removeEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  routeChange() {
    // remove current links
    const currentLinks = this.querySelectorAll('.mdw-current-link');
    currentLinks.forEach(el => el.classList.remove('mdw-current-link'));

    // add current links
    let matchingLinks = this.querySelectorAll(`[href="#${this.path}"]`);
    if (!matchingLinks || matchingLinks.length === 0) matchingLinks = this.querySelectorAll(`[alt-href="#${this.path}"]`);
    matchingLinks.forEach(el => el.classList.add('mdw-current-link'));
  }
});


/***/ }),

/***/ "./src/components/bound-property/index.js":
/*!************************************************!*\
  !*** ./src/components/bound-property/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-bound-property', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this._property = this.innerHTML;
    this.innerHTML = '';
  }

  connectedCallback() {
    const that = this;
    this._value = window.activePage[this._property];
    Object.defineProperty(window.activePage, this._property, {
      configurable: true,
      enumerable: true,
      
      get() {
        return that._value;
      },

      set(value) {
        that._value = value;
        that.innerHTML = value;
      }
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-button', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
    return this._pending;
  }

  setupAsync() {
    if (!this.hasAttribute('mdw-async')) return;
    this.addEventListener('click', this.bound_asyncClick);
  }

  resolve() {
    if (this._pending === false) return;
    this._pending = false;
    this.hideSpinner();
  }

  asyncClick(e) {
    if (this._pending === true) return;
    this._pending = true;
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
        -webkit-user-select: none;
        align-items: center;
        border: none;
        box-sizing: border-box;
        display: inline-flex;
        font-size: 0.875rem;
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
        white-space: nowrap;

        border-radius: 4px;
        line-height: 2.25rem;
        padding: 0 8px 0 8px;
        height: 36px;
        min-width: 64px;

        color: var(--mdw-theme-on-primary);
      }

      :host-context(.mdw-density-comfortable),
      :host(.mdw-density-comfortable) {
        height: 28px;
        margin-top: 0;
        margin-bottom: 0;
        padding: 0 8px 0 8px;
      }

      :host-context(.mdw-density-compact),
      :host(.mdw-density-compact) {
        height: 24px;
        margin-top: 0;
        margin-bottom: 0;
        padding: 0 4px 0 4px;
      }

      :host(.mdw-icon):host-context(.mdw-density-comfortable),
      :host(.mdw-density-comfortable.mdw-icon) {
        height: 28px;
        width: 28px;
        margin-top: 0;
        margin-bottom: 0;
      }

      :host(.mdw-icon):host-context(.mdw-density-compact),
      :host(.mdw-density-compact.mdw-icon) {
        height: 24px;
        width: 24px;
        margin-top: 0;
        margin-bottom: 0;
      }

      :host-context(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress,
      :host(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress {
        top: 2px !important;
      }

      :host-context(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress,
      :host(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress {
        top: 0 !important;
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
        z-index: 1;
        transition: opacity 15ms linear,
                    background-color 15ms linear;
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

      :host(.mdw-contained),
      :host(.mdw-raised),
      :host(.mdw-unelevated) {
        background-color: var(--mdw-theme-background);
        padding: 0 16px 0 16px;
      }

      :host(.mdw-contained)::before,
      :host(.mdw-raised)::before,
      :host(.mdw-unelevated)::before {
        opacity: 0.08;
      }

      :host(.mdw-contained),
      :host(.mdw-raised) {
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(.mdw-contained:hover),
      :host(.mdw-contained:focus),
      :host(.mdw-raised:hover),
      :host(.mdw-raised:focus) {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-contained:active),
      :host(.mdw-raised:active) {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-contained[disabled]),
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
        border-radius: var(--mdw-theme--button-shape-radius, 18px);
      }

      :host(.mdw-icon) {
        border-radius: 50%;
        min-width: 0;
        width: 48px;
        height: 48px;
        padding: 12px;
        line-height: 19px;
      }
      
      :host(.mdw-icon) span.text {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.75rem;
        text-transform: none;
      }

      :host(.mdw-bottom-navigation) {
        border-radius: 50%;
        min-width: 0;
        max-width: 100px;
        width: 56px;
        height: 56px;
        padding: 28px;
      }

      :host(:not(.mdw-icon)) .text ::slotted(mdw-icon) {
        display: inline-block;
        height: 28px;
        vertical-align: middle;
      }

      /*
      :host(.mdw-icon) ::slotted(mdw-icon) {
        line-height: 19px;
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
      }

      ::slotted(mdw-icon) {
        width: 18px;
        height: 18px;
        font-size: 18px;
        margin-left: -4px;
        margin-right: 2px;
        vertical-align: top;
        line-height: 36px;
      }
      */

      :host ::slotted(svg.mdw-icon) {
        fill: currentColor;
      }


      /* primary */
      :host(.mdw-primary) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-primary.mdw-contained),
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

      :host(.mdw-secondary.mdw-contained),
      :host(.mdw-secondary.mdw-raised),
      :host(.mdw-secondary.mdw-unelevated) {
        background-color: var(--mdw-theme-secondary);
        color: var(--mdw-theme-text-primary-on-background);
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

      :host(.mdw-error.mdw-contained),
      :host(.mdw-error.mdw-raised),
      :host(.mdw-error.mdw-unelevated) {
        background-color: var(--mdw-theme-error);
        color: var(--mdw-theme-text-primary-on-background);
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

      :host(.mdw-primary.mdw-contained) .mdw-ripple-element,
      :host(.mdw-primary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-primary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      :host(.mdw-secondary.mdw-contained) .mdw-ripple-element,
      :host(.mdw-secondary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-secondary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }

      :host(.error.mdw-contained) .mdw-ripple-element,
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-card', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-checkbox', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    
    this.bound_handleClick = this.handleClick.bind(this);
    this.cloneTemplate();
    this._defaultIcons();

    this.state = 'unchecked';
  }

  connectedCallback() {
    if (this.hasAttribute('indeterminate')) this.indeterminate = true;
    if (this.hasAttribute('checked')) this.checked = true;

    if (!this.hasAttribute('mdw-no-ripple')) this.ripple = new _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: [this],
      centered: true
    });

    this.addEventListener('click', this.bound_handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.bound_handleClick);
    this.ripple.destroy();
  }

  static get observedAttributes() {
    return ['checked', 'indeterminate'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (!['checked', 'unchecked', 'indeterminate'].includes(value)) console.error(`ivalid state fro checkbox "${value}". Only excepts "checked", "unchecked", "indeterminate"`);
    this.setAttribute('mdw-state', value);
    const stateChange = this._state !== value;
    this._state = value;

    if (stateChange === true) this.dispatchEvent(new Event('change'));
  }

  get checked() {
    return this.state === 'checked';
  }

  set checked(value) {
    if (value === '') value = true;
    if (value === true) this.state = 'checked';
    else this.state = 'unchecked';
  }

  get indeterminate() {
    return this.input.indeterminate;
  }

  set indeterminate(value) {
    if (value === '') value = true;
    if (value === true) this.state = 'indeterminate';
  }

  toggle() {
    this.checked = !this.checked;
  }


  handleClick() {
    let stateChange = false;
    switch (this.state) {
      case 'indeterminate':
        // TODO what is the correct action to take here?
        this.state = 'checked';
        stateChange = true;
        break;
      case 'checked':
        this.state = 'unchecked';
        stateChange = true;
        break;
      case 'unchecked':
        this.state = 'checked';
        stateChange = true;
        break;
    }

    // if (stateChange === true) this.dispatchEvent(new Event('change'));
  }
  

  // add default icons if none are provided
  _defaultIcons() {
    if (this.children.length === 0) {
      this.insertAdjacentHTML('afterbegin', `
        <mdw-icon mdw-checked>check_box</mdw-icon>
        <mdw-icon mdw-unchecked>check_box_outline_blank</mdw-icon>
        <mdw-icon mdw-indeterminate>indeterminate_check_box</mdw-icon>
      `);
    }
  }

  template() {
    return /* html */`
      <slot></slot>
      <div class="mdw-ripple mdw-checkbox-ripple"></div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        --mdw-checkbox-size: 24px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        cursor: pointer;
        display: inline-block;
        position: relative;
        vertical-align: bottom;
        white-space: nowrap;
        cursor: pointer;

        width: var(--mdw-checkbox-size);
        height: var(--mdw-checkbox-size);
        line-height: 0;
        padding: 8px 0;
      }

      :host(.mdw-no-padding) {
        padding: 0;
      }

      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }

      :host-context(.mdw-density-comfortable),
      :host(.mdw-density-comfortable) {
        padding: 9px;
        margin: 0;
      }

      :host-context(.mdw-density-compact),
      :host(.mdw-density-compact) {
        padding: 5px;
        margin: 0;
      }

      ::slotted(mdw-icon) {
        position: absolute;
        user-select: none;
        outline: none;
        font-size: var(--mdw-checkbox-size);
      }

      :host(.mdw-large) {
        --mdw-checkbox-size: 48px;
      }

      :host(.mdw-primary) ::slotted(mdw-icon) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-secondary) ::slotted(mdw-icon) {
        color: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) ::slotted(mdw-icon) {
        color: var(--mdw-theme-error);
      }
      

      /* --- state: checked --- */
      :host([mdw-state="checked"]) ::slotted(mdw-icon[mdw-unchecked]),
      :host([mdw-state="checked"]) ::slotted(mdw-icon[mdw-indeterminate]) {
        display: none;
      }

      /* --- state: unchecked --- */
      :host([mdw-state="unchecked"]) ::slotted(mdw-icon[mdw-checked]),
      :host([mdw-state="unchecked"]) ::slotted(mdw-icon[mdw-indeterminate]) {
        display: none;
      }

      /* --- state: indeterminate --- */
      :host([mdw-state="indeterminate"]) ::slotted(mdw-icon[mdw-checked]),
      :host([mdw-state="indeterminate"]) ::slotted(mdw-icon[mdw-unchecked]) {
        display: none;
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
        background-color: rgba(var(--mdw-theme-on-background--rgb), 0.16);
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
        overflow: visible;
      }

      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-circular-progress', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/dialog/service.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-dialog', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.clickOutsideClose_ = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.remove();
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = undefined;
    }
  }

  get panel() {
    if (!this._panel) this._panel = this.querySelector('mdw-panel');
    return this._panel;
  }

  get position() {
    return this._position || 'center center';
  }

  set position(value) {
    this._position = value;
  }

  get clickOutsideClose() {
    return this.clickOutsideClose_;
  }

  set clickOutsideClose(value) {
    this.clickOutsideClose_ = value;
  }

  open(fromService = false) {
    this._fromService = fromService;
    this.panel.hoistToBody();
    this.panel.setPosition(this.position);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);

    this.backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].addBackdrop(this.panel, () => {
      if (this.clickOutsideClose === true) this.close();
    });

    requestAnimationFrame(() => {
      this.panel.open();
    });
  }

  close(ok) {
    this.panel.close();
    this.dispatchClose(ok);
  }

  onPanelClose() {
    // don't remove if we are closing a template
    if (!this._fromService) {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
      if (this.backdrop) {
        this.backdrop.remove();
        this.backdrop = undefined;
      }
      return;
    }
    this.remove();
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
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");


const MDWDialog = new class {
  constructor() {
    this.currentDialog = null;
  }

  open({ title, message, okLabel, cancelLabel, position = 'center center', clickOutsideClose = false }) {
    return new Promise(resolve => {
      const id = _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].uid('dialog');
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

      requestAnimationFrame(() => {
        el.open();
      });
    });
  }

  removeCurrent() {
    this.currentDialog.close();
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

/***/ "./src/components/fab/index.js":
/*!*************************************!*\
  !*** ./src/components/fab/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-fab', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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

      :host-context(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress {
        top: 3px !important;
      }

      :host-context(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress {
        top: 0 !important;
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-icon', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-linear-progress', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-list-item', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_onSelect = this.onSelect.bind(this);
    this.bound_onclickSelect = this.onclickSelect.bind(this);
    this.bound_checkHREFCurrent = this.checkHREFCurrent.bind(this);
  }

  get list() {
    return this.parentNode;
  }

  get expanded() {
    return this.querySelector('mdw-list-item-expanded');
  }

  get key() {
    return this.getAttribute('mdw-key');
  }

  isSelect() {
    return ['single', 'multiple'].includes(this.list.selectType);
  }

  selectOnclick() {
    return !!this.list.selectOnclick;
  }

  connectedCallback() {
    this.connectRipple();
    this.connectHREF();
    this.connectSelect();

    const expanded = this.expanded;
    if (expanded) {
      requestAnimationFrame(() => {
        expanded.listItem = this;
      });
    }
  }

  disconnectedCallback() {
    if (this.ripple) this.ripple.destroy();
    this.removeEventListener('click', this.bound_hrefClick);
    if (this._selectEl) this._selectEl.removeEventListener('change', this.bound_onSelect);
    this.removeEventListener('click', this.bound_onclickSelect);
    window.removeEventListener('hashchange', this.bound_checkHREFCurrent);
  }

  expand() {
    const expandElement = this.expanded;
    if (expandElement) {
      expandElement.open();
    }
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
    this.checkHREFCurrent();
    window.addEventListener('hashchange', this.bound_checkHREFCurrent);
    this.addEventListener('click', this.bound_hrefClick);
  }

  checkHREFCurrent() {
    if (!this.hasAttribute('href')) return;
    const href = document.location.href;
    const hash = document.location.hash;
    if (href === this.getAttribute('href') || href === this.getAttribute('href-alt')) this.classList.add('mdw-current-link');
    else if (hash === this.getAttribute('href') || hash === this.getAttribute('href-alt')) this.classList.add('mdw-current-link');
    else this.classList.remove('mdw-current-link');
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
    if (e.target === this._selectEl) return;
    this._selectEl.checked = !this._selectEl.checked;
  }

  connectSelect() {
    if (this.isSelect()) {
      this._selectEl = this.querySelector('mdw-checkbox');
      if (this._selectEl) this._selectEl.addEventListener('change', this.bound_onSelect);
      if (this.selectOnclick()) this.addEventListener('click', this.bound_onclickSelect);
    }
  }

  deselect() {
    this._selectEl.checked = false;
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-list', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
    if (!['single', 'multiple'].includes(value)) console.warn('mdw-list[mdw-select] attribute - only accepts "single" or "multiple"');
    this.selectType_ = value;
  }

  get selectType() {
    return this.selectType_;
  }

  get selected() {
    return [].concat(this.selectedIndexes_);
  }

  deselectAll() {
    [...this.querySelectorAll('mdw-list-item')].forEach(child => child.deselect());
    this.selectedIndexes_ = [];
  }

  itemSelected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem) - 1;
    if (this.selectType_ === 'single') {
      const children = [...this.children];
      this.selectedIndexes_.forEach(i => children[i].deselect());
      this.selectedIndexes_ = [];
    }
    this.selectedIndexes_.push(index);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem) - 1;
    this.selectedIndexes_.splice(this.selectedIndexes_.indexOf(index), 1);
    this.handleChange();
  }

  handleChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }

  closeExpanded() {
    this.dispatchEvent(new CustomEvent('MDWList:closeExpanded', this));
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



customElements.define('mdw-menu', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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

/***/ "./src/components/navigation-rail/index.js":
/*!*************************************************!*\
  !*** ./src/components/navigation-rail/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_mobile_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/mobile-info.js */ "./src/core/mobile-info.js");



customElements.define('mdw-navigation-rail', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    if (_core_mobile_info_js__WEBPACK_IMPORTED_MODULE_1__["isPhoneAndTablet"] && this.hasAttribute('mdw-desktop-only')) {
      this.style.display = 'none';
      this.style.pointerEvents = 'none';
    } else {
      this.bound_routeChange = this.routeChange.bind(this);
      document.body.classList.add('mdw-has-navigation-rail');
    }
  }

  connectedCallback() {
    window.addEventListener('hashchange', this.bound_routeChange);
    window.addEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.bound_routeChange);
    window.removeEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  routeChange() {
    // remove current links
    const currentLinks = this.querySelectorAll('.mdw-current-link');
    currentLinks.forEach(el => el.classList.remove('mdw-current-link'));

    // add current links
    let matchingLinks = this.querySelectorAll(`[href="#${this.path}"]`);
    if (!matchingLinks || matchingLinks.length === 0) matchingLinks = this.querySelectorAll(`[alt-href="#${this.path}"]`);
    matchingLinks.forEach(el => el.classList.add('mdw-current-link'));
  }
});


/***/ }),

/***/ "./src/components/panel/draggable-header.js":
/*!**************************************************!*\
  !*** ./src/components/panel/draggable-header.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/drag.js */ "./src/core/drag.js");



/*
 * add dragable heaer to panel
 */
customElements.define('mdw-panel-draggable-header', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.bound_onDrag = this.onDrag.bind(this);
    this.cloneTemplate();
  }

  get draggableElement() {
    return this.shadowRoot.querySelector('.mdw-panel-draggable-header');
  }

  get panel() {
    return this.parentNode;
  }

  connectedCallback() {
    Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_1__["addDragListener"])(this.draggableElement, this.bound_onDrag);
  }

  disconnectedCallback() {
    Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_1__["removeDragListener"])(this.draggableElement, this.bound_onDrag);
  }

  onDrag(event) {
    switch (event.state) {
      case _core_drag_js__WEBPACK_IMPORTED_MODULE_1__["states"].start:
        this._initialLeft = parseInt((this.panel.style.left || '0').replace('px', ''));
        this._initialTop = parseInt((this.panel.style.top || '0').replace('px', ''));
        break;
      
      case _core_drag_js__WEBPACK_IMPORTED_MODULE_1__["states"].move:
        const panel = this.panel;
        panel.style.left = `${this._initialLeft + event.distance.x}px`;
        panel.style.top = `${this._initialTop + event.distance.y}px`;
        break;
    }
  }

  template() {
    return /* html */ `
      <div class="mdw-panel-draggable-header">
        <slot></slot>
        <mdw-icon>close</mdw-icon>
      </div>
    `;
  }

  styles() {
    return /* css */ `
      .mdw-panel-draggable-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: move;
        padding: 12px;
        user-select: none;
        -webkit-user-select: none;
      }
      mdw-icon {
        cursor: pointer;
      }
    `;
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _draggable_header_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draggable-header.js */ "./src/components/panel/draggable-header.js");




/* --- mdw-panel ---
 * The panel allows you to create positioned floating elements.
 * mdw-panel is used for menu, dialog, tooltip
 */

 // TODO fix open and close animations
customElements.define('mdw-panel', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this.FOCUSABLE_ELEMENTS = [
      'button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)',
      'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
    ].join(', ');
    this._clickOutsideClose = false;
    this._boundHandleBodyClick = this._handleBodyClick.bind(this);
    this._boundHandleKeydown = this._handleKeydown.bind(this);
    this.bound_close = this.close.bind(this);
    this._clickOutsideCloseIgnorElement = [];
    this._autoPosition = false;
    this._animationConfig = {
      type: 'scale',
      opacity: true
    };

    this.bound_onOpenTransitionEnd = this.onOpenAnimationEnd.bind(this);
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

  fullscreen() {
    this.classList.add('mdw-fullscreen');
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

  setAnimation(animationConfig) {
    this._animationConfig = animationConfig;
  }

  clickBodyToClose() {
    this._clickOutsideClose = true;
  }

  isOpen() {
    return this._isOpen;
  }

  onOpenAnimationEnd() {
    this.style.transition = '';
    this.style.transformOrigin = '';
    this.style.overflow = '';
    this.style.maxHeight = '';
    this.classList.remove('mdw-panel--animating-open');
    this.removeEventListener('transitionend', this.bound_onOpenTransitionEnd);
    this.notifyOpen();
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
      this.prepareAnimation();

      if (this._isHoisted) this.setHoistedPosition();
      else this.setPositionStyle();

      this._animationRequestId = this._runNextAnimationFrame(() => {
        if (this._animationConfig.fullscreen) this.classList.add('mdw-fullscreen');

        switch (this._animationConfig.type) {
          case 'height':
            this.style.transition = 'max-height .22s cubic-bezier(0,0,.2,1), transform .22s cubic-bezier(0,0,.2,1), opacity .22s linear';
            this.style.maxHeight = this.classList.contains('mdw-fullscreen') ? '100%' : `${this.scrollHeight}px`;
            this.style.transform = '';
            break;

          case 'scale':
          default:
            this.style.transition = 'transform .1s cubic-bezier(0,0,.2,1), opacity 0.1s linear';
            this.style.transform = '';
            break;
        }

        this.style.opacity = 1;
        this.addEventListener('transitionend', this.bound_onOpenTransitionEnd);
      });
    } else {
      this.classList.add('mdw-open');
      if (this._isHoisted) this.setHoistedPosition();
      else this.setPositionStyle();
    }

    this._addBodyClickEvent();
    this._addKeydownEvent();
    this.addEventListener('MDWPanel:close', this.bound_close);
    this._isOpen = true;
  }


  prepareAnimation() {
    // default animation
    this.classList.add('mdw-open');
    this.classList.add('mdw-panel--animating-open');

    if (this._animationConfig.target && this._animationConfig.fullscreen) {
      this.style.width = '100%';
    }
    
    switch(this._animationConfig.type) {
      case 'height':
        this.style.overflow = 'hidden'
        this.style.maxHeight = this._animationConfig.target ? `${this._animationConfig.target.offsetHeight}px` : '0';

        switch (this._animationConfig.origin) {
          case 'center':
            let transformValue = this.classList.contains('mdw-fullscreen') ? window.innerHeight / 2 : this.scrollHeight / 2;
            if (this._animationConfig.target) transformValue = this._animationConfig.target.getBoundingClientRect().y;
            this.style.transform = `translateY(${transformValue}px)`;
            break;

          case 'top':
          default:
            if (this._animationConfig.target) {
              transformValue = this._animationConfig.target.offsetTop;
              this.style.transform = `translateY(${transformValue}px)`;
            }
            break;
        }
        break;

      case 'scale':
      default:
        this.style.transform = 'scale(0.9)';
        this.style.transformOrigin = this._animationConfig.origin || 'center';
        break;
    }

    if (this._animationConfig.opacity) {
      this.style.opacity = 0;
    }
  }


  // TODO FIX THE CLOSING ANIMATION
  async close(event) {
    return new Promise(resolve => {
      if (event) event.stopPropagation();

      this.removeEventListener('MDWPanel:close', this.bound_close);
      if (!this._isQuickOpen) {
        this.classList.add('mdw-panel--animating-closed');
        this.removeBodyClickEvent_();
        this._animationRequestId = this._runNextAnimationFrame(() => {
          this.classList.remove('mdw-open');
          this._closeAnimationEndTimerId = setTimeout(() => {
            this._closeAnimationEndTimerId = 0;
            this.classList.remove('mdw-panel--animating-closed');
            this.resetPosition();
            this.notifyClose();
            resolve();
          }, 75);
        });
      } else {
        this.classList.remove('mdw-open');
        this.resetPosition();
        resolve();
      }

      this.removeKeydownEvent_();
      this._isOpen = false;
      const isRootFocused = this.isFocused();
      const childHasFocus = document.activeElement && this.contains(document.activeElement);
      if (isRootFocused || childHasFocus) this.restoreFocus();
    });
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

  _addBodyClickEvent() {
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

  _addKeydownEvent() {
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
    this.dispatchEvent(new Event('MDWPanel:opened'), this);
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

  setHoistedPosition() {
    const bounds = this._container.getBoundingClientRect();
    this.style.top = `${bounds.top}px`;
    this.style.left = `${bounds.left}px`;
    // this.style[this.transformPropertyName] = 'scale(1)';

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
        // no defaults
        const split = (this.position || ' ').split(' ');
        const aValue = split[0];
        const bValue = split[1];

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
            left = 0;
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
    // no defaults
    const split = (this.position || ' ').split(' ');
    const aValue = split[0];
    const bValue = split[1];
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
    // this.style[this.transformPropertyName] = 'scale(1)';
  }

  resetPosition() {
    this.style.top = '';
    this.style.left = '';
    // this.style[this.transformPropertyName] = '';
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-radio-group', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-radio', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



// TODO implaent validity

customElements.define('mdw-select', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this.setupLabel_();
    if (this._isEnhanced) this.prepareEnhance_();
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
    if (this._isEnhanced) {
      if (this._selected) this.value = this._selected.value;
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
      this.classList.remove('mdw-no-animation');

      if (this._isEnhanced) {
        this.panel.style.minWidth = `${this.offsetWidth}px`;
      }
    }, 0);
  }

  disconnectedCallback() {
    if (this._isEnhanced) {
      this.shadowRoot.querySelector('render-block').removeEventListener('click', this.bound_onClick);
      document.body.removeEventListener('keydown', this.bound_onKeyDown);
    } else {
      this.selectElement.removeEventListener('focus', this.bound_onFocus);
      this.selectElement.removeEventListener('blur', this.bound_onBlur);
      this.selectElement.removeEventListener('change', this.bound_onChange);
    }
  }

  get value() {
    if (this._isEnhanced) return this._value;
    return this.selectElement.value || this._value;
  }

  set value(value) {
    this._value = value;
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
    if (!this._enhacedElementId) this._enhacedElementId = `select-enhanced-${_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].uid()}`;
    return this._enhacedElementId;
  }

  get panel() {
    return document.querySelector(`#${this.enhacedElementId}`);
  }

  get sheet() {
    return document.querySelector(`#${this.enhacedElementId}`);
  }

  get _isEnhanced() {
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
      this._labelText = label.innerText;
      label.remove();
    }
  }

  prepareEnhance_() {
    this._optionsMap = [...this.querySelectorAll('option')].map(el => {
      return {
        text: el.innerText,
        value: el.value,
        selected: el.hasAttribute('selected')
      };
    });

    this._selected = (this._optionsMap.filter(({ selected }) => selected === true)[0] || { text: '', value: '' });

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
          ${this._optionsMap.map(({ text, value, selected }) => `
            <mdw-list-item value="${value}"${selected ? ' selected' : ''}>${text}</mdw-list-item>
          `).join('\n')}
        </mdw-list>
      </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    const panelEl = this.panel;
    panelEl.setAnimation({
      target: this.querySelector('select'),
      type: 'scale',
      origin: 'top',
      opacity: true
    });
    panelEl.hoistToBody(this);
  }

  prepareSheet_() {
    const sheetHTML = `
      <mdw-sheet mdw-modal id=${this.enhacedElementId}>
        <mdw-sheet-content>
          <mdw-list>
            ${this._optionsMap.map(({ text, value, selected }) => `
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

    if (this._isEnhanced) {
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
      ${!this._isEnhanced ? '<slot></slot>' : `
        <div class="mdw-select__selected-text">${this._selected.text}</div>
      `}
      <label>${this._labelText}</label>
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
      :host-context(.mdw-density-comfortable) .mdw-select__icon {
        bottom: 15px;
      }

      :host-context(.mdw-density-comfortable) .mdw-select__selected-text {
        height: 48px;
        padding-top: 16px;
      }

      :host(.mdw-outlined):host-context(.mdw-density-comfortable) .mdw-select__icon {
        bottom: 20px;
      }
      
      :host(.mdw-outlined):host-context(.mdw-density-comfortable) label {
        top: 18px;
      }

      :host-context(.mdw-density-compact) .mdw-select__icon {
        bottom: 12px;
      }

      :host(.mdw-outlined):host-context(.mdw-density-compact) .mdw-select__icon {
        top: 18px;
      }

      :host(.mdw-outlined):host-context(.mdw-density-compact) label {
        top: 12px;
      }

      :host-context(.mdw-density-compact) .mdw-select__selected-text {
        height: 40px;
        line-height: 1.1rem;
      }

      :host-context(.mdw-density-compact) ::slotted(select) {
        height: 40px;
        padding-top: 12px;
      }

      :host-context(.mdw-density-compact) label {
        top: 16px;
      }

      :host(.mdw-outlined.mdw-focused):host-context(.mdw-density-compact) label,
      :host(.mdw-outlined):host-context(.mdw-density-compact) label.mdw-select--float-above {
        transform: translateY(-100%) scale(0.75);
      }

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

/***/ "./src/components/sheet-bottom/header.js":
/*!***********************************************!*\
  !*** ./src/components/sheet-bottom/header.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-sheet-bottom-header', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    if (this.parentNode._registerHeader) this.parentNode._registerHeader(this);
    this.sheetInstance = this.parentNode;
    this.bound_close = this.close.bind(this);
    this.bound_toTop = this.toTop.bind(this);
    this.innerHTML = this.template(this.isModal, this.title, this.innerHTML);

    const mdwHeader = this.querySelector('mdw-header');
    if (mdwHeader) {
      this.classList.add('has-standard-header');
      mdwHeader.setAttribute('class', this.classList.toString());
    }
  }

  connectedCallback() {
    this.closeButton && this.closeButton.addEventListener('click', this.bound_close);
    if (this._hasMdwHeader) this.mdwHeader.addEventListener('click', this.bound_toTop);
  }

  disconnectedCallback() {
    this.closeButton && this.closeButton.removeEventListener('click', this.bound_close);
    if (this._hasMdwHeader) this.mdwHeader.removeEventListener('click', this.bound_toTop);
  }

  get closeButton() {
    return this.querySelector('#mdw-sheet-close-action');
  }

  get mdwHeader() {
    return this.querySelector('mdw-header');
  }


  get isModal() {
    return this.parentNode.type === 'modal';
  }

  get title() {
    return !!this._title ? this._title : this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  set title(value) {
    this._title = value;
  }

  close() {
    if (this.isModal) return this.parentNode.close();
    this.parentNode.exitFullscreen();
  }

  disable() {
    this.classList.add('mdw-disabled');
  }

  show() {
    this.classList.add('mdw-show');
    this.isShowing = true;
  }

  hide() {
    this.classList.remove('mdw-show');
    this.isShowing = false;
  }

  toTop() {
    console.log('to top')
    this.parentNode._transitionToNearestPosition();
  }

  template(isModal, title, headerInnerHTML) {
    const doc = new DOMParser().parseFromString(headerInnerHTML, 'text/html');
    const topBar = doc.querySelector('mdw-sheet-top-bar');
    if (topBar) headerInnerHTML = headerInnerHTML.replace(topBar.outerHTML, '');
    if (headerInnerHTML) this._hasMdwHeader = true;
    
    return `
      ${topBar ? topBar.outerHTML : `
        <mdw-sheet-top-bar>
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            ${!isModal ? '<mdw-icon>keyboard_arrow_down</mdw-icon>' : '<mdw-icon>close</mdw-icon>'}
          </mdw-button>
          ${title}
        </mdw-sheet-top-bar>
      `}

      ${headerInnerHTML &&
        `<mdw-header>

          ${headerInnerHTML}
        </mdw-header>`
      }
    `;
  }
});


/***/ }),

/***/ "./src/components/sheet-bottom/index.js":
/*!**********************************************!*\
  !*** ./src/components/sheet-bottom/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.js */ "./src/components/sheet-bottom/header.js");
/* harmony import */ var _standard_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./standard-helper.js */ "./src/components/sheet-bottom/standard-helper.js");
/* harmony import */ var _modal_helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal-helper.js */ "./src/components/sheet-bottom/modal-helper.js");
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/drag.js */ "./src/core/drag.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");







customElements.define('mdw-sheet-bottom', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    switch (this.type) {
      case 'modal':
        this._helpers = new _modal_helper_js__WEBPACK_IMPORTED_MODULE_3__["default"](this);
        break;

      default:
        this._helpers = new _standard_helper_js__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        break;
    }

    this.bound_onTransitionEnd = this._onTransitionEnd.bind(this);
    this.bound_onTransitionEndClose = this._onTransitionEndClose.bind(this);
    this.bound_onDrag = this._onDrag.bind(this);

    this._helpers.setupHeader();
    this._setupOverScroll();
  }

  get title() {
    return this.getAttribute('mdw-title');
  }

  get type() {
    if (this.hasAttribute('mdw-modal')) return 'modal';
    return 'standard';
  }

  get contentElement() {
    return this.querySelector('mdw-content');
  }

  get contentHeight() {
    return this.contentElement.offsetHeight;
  }

  get _isDraggable() {
    return this._helpers.isDraggable;
  }

  get _headerHeight() {
    return this._helpers.headerElement.offsetHeight;
  }

  get _maxScroll() {
    return this.contentHeight + this._headerHeight;
  }

  get _topPosition() {
    const viewHeight = window.innerHeight;
    const contentHeight = this.contentHeight;
    const headerHeight = this._headerHeight;

    if (this.type === 'standard') return viewHeight - (55 - headerHeight);
    return viewHeight - (contentHeight >= viewHeight - headerHeight ? 55 - headerHeight : viewHeight - headerHeight - contentHeight);
  }

  get _scrollDistanceRemaining() {
    return this._maxScroll - this._currentPosition;
  }

  get _initialPosition() {
    return this._helpers.initialPosition;
  }

  get _minimizedPosition() {
    return this._helpers.minimizedPosition;
  }

  get _isAnchored() {
    return this.hasAttribute('mdw-anchored');
  }

  disconnectedCallback() {
    // make sure we don't accidentally lock the page scroll for ever
    if (this.classList.contains('mdw-dragging')) {
      _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].unlockPageScroll();
      _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].disableUserSelect();
    }

    this._cancelTransitions();
  }

  open() {
    this._cancelTransitions();
    this.classList.add('mdw-show');

    this.style.height = `${this.contentHeight + this._headerHeight}px`;

    this._positionBottom();
    if (this._isAnchored) this._transitionToPosition(this._minimizedPosition);
    else this._transitionToPosition(this._initialPosition);
    this._helpers.addBackdrop();

    if (this._isDraggable) {
      Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_4__["addDragListener"])(this.contentElement, this.bound_onDrag);
      if (this._helpers.headerElement) Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_4__["addDragListener"])(this._helpers.headerElement, this.bound_onDrag);
    }
  }

  async close() {
    return new Promise(resolve => {
      Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_4__["removeDragListener"])(this.contentElement, this.bound_onDrag);
      if (this._helpers.headerElement) Object(_core_drag_js__WEBPACK_IMPORTED_MODULE_4__["removeDragListener"])(this._helpers.headerElement, this.bound_onDrag);
      this._cancelTransitions();
      this.classList.add('mdw-animating-close');
      this._positionBottom();
      this.addEventListener('transitionend', () => {
        this._cancelTransitions()
        this.classList.remove('mdw-show');
        this._helpers.removeBackdrop();
        resolve();
      }, { once: true });
    });
  }

  minimize() {
    this._cancelTransitions();
    this._transitionToPosition(this._minimizedPosition);
  }

  exitFullscreen() {
    this._cancelTransitions();
    if (this._isAnchored) this._transitionToPosition(this._minimizedPosition);
    else this._transitionToPosition(this._initialPosition);
  }

  toggle() {
    if (this.classList.contains('mdw-show')) this.close();
    else this.open();
  }

  _registerHeader(element) {
    this._helpers.registerHeader(element);
  }

  _positionTop() {
    this._setPosition(this._topPosition);
  }

  _positionBottom() {
    this._currentPosition = 0;
    this.style.top = '100%';
  }

  _positionInitial() {
    this._setPosition(this._initialPosition);
  }

  _positionMinimized() {
    this._setPosition(this._minimizedPosition);
  }

  // TODO fix whater is continuasly calling this
  _setPosition(y) {
    const maxScroll = this._maxScroll;
    let overScroll = 0;
    if (y > maxScroll) {
      const scale = 100;
      overScroll = scale * Math.log((y - maxScroll) + scale) - scale * Math.log(scale);
      y = maxScroll;
    }

    const isAtTopHeight = window.innerHeight + (this._headerHeight - 55);
    this._isAtTop = y === isAtTopHeight;
    this._isAboveTop = y > isAtTopHeight;
    this._isAtOrAboveTop = this._isAtTop || this._isAboveTop;
    this._currentPosition = y;
    this.style.top = `calc(100% - ${y + overScroll}px)`;

    const initialToTopDistance = window.innerHeight - this._initialPosition;
    const targetingTop = !this._isAtOrAboveTop && (y - this._initialPosition) >= initialToTopDistance / 2;
    const targetingInitial = !this._isAtOrAboveTop && (y - this._initialPosition) < initialToTopDistance / 2;
    this._helpers.handleOnMove({
      position: y,
      isAtTop: this._isAtTop,
      isAboveTop: this._isAboveTop,
      targetingTop,
      targetingInitial
    });
  }

  // if resting at initial position then positionTop
  _transitionToNearestPosition() {
    const newPosition = this._currentPosition;

    // if is at initial position based on offsetTop
    if (this._initialOffsetTop === this.offsetTop) {
      if (newPosition === this._minimizedPosition) return this._transitionToPosition(this._initialPosition);
      else return this._transitionToPosition(this._topPosition);
    }

    const halfWayPoint = (this._topPosition - this._initialPosition) / 2;
    if ((newPosition - this._initialPosition) >= halfWayPoint) this._transitionToPosition(this._topPosition);
    else this._transitionToPosition(this._initialPosition);
  }

  _transitionToPosition(y) {
    this.classList.add('mdw-animating-open');

    requestAnimationFrame(() => {
      this._setPosition(y);
      this.addEventListener('transitionend', this.bound_onTransitionEnd);
    });
  }

  _cancelTransitions() {
    this.classList.remove('mdw-animating-open');
    this.classList.remove('mdw-animating-close');
    this.classList.remove('mdw-animating-scroll');
    this.style.transitionDuration = '';
    this.removeEventListener('transitionend', this.bound_onTransitionEnd);
    this.removeEventListener('transitionend', this.bound_onTransitionEndClose);
  }

  _onTransitionEnd() {
    this._initialOffsetTop = this.offsetTop;
    this._cancelTransitions();
  }

  _onTransitionEndClose() {
    this._cancelTransitions()
    this.classList.remove('mdw-show');
    this._helpers.removeBackdrop();
  }

  // --- drag / swipe
  _onDrag(event) {
    switch (event.state) {
      case 'start':
        this._cancelTransitions();
        this._startPosition = this._currentPosition;
        this.classList.add('mdw-dragging');
        _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].lockPageScroll();
        _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].disableUserSelect();
        // TODO figure out global hover disable
        break;

      case 'move':
        this._setPosition(this._startPosition - event.distance.y);
        break;

      case 'end':
        this.classList.add('mdw-animating-scroll');
        this._handleScrollEnd(event.velocity.y, event.direction.y);
        this.addEventListener('transitionend', this.bound_onTransitionEnd);
        this.classList.remove('mdw-dragging');
        _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].unlockPageScroll();
        _core_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].enableUserSelect();
        break;
    }
  }

  _handleScrollEnd(velocity, direction) {
    // open all the way on swipe up
    if (!this._isAtOrAboveTop && velocity < -1.1) this._positionTop();

    // close when swipe down from initial position
    else if (!this._isAtOrAboveTop && velocity > 0.7) {
      if (this.type === 'modal') return this.close();
      return this.minimize();
    }

    // scrolling and snapping
    else {
      const multiplier = Math.abs(velocity) / 3;
      let distanceToMove = this._scrollDistanceRemaining * multiplier * -direction;
      if (distanceToMove > this._scrollDistanceRemaining) distanceToMove = this._scrollDistanceRemaining;
      const newPosition = distanceToMove + this._currentPosition;

      if (this._isAtOrAboveTop) {
        if (newPosition < this._topPosition + 80) this._positionTop();
        else {
          this.style.transitionDuration = `${(multiplier * 0.5) + 0.3}s`;
          this._setPosition(newPosition);
        }

      // snap to either top or initial. Do not allow arbitrary positioning below top
      } else {
        const halfWayPoint = (this._topPosition - this._initialPosition) / 2;
        if ((newPosition - this._initialPosition) >= halfWayPoint) this._positionTop();
        else this._positionInitial();
      }
    }
  }

  _setupOverScroll() {
    this.insertAdjacentHTML('beforeend', '<div class="mdw-sheet-bottom-over-scroll"></div>');
  }
});


/***/ }),

/***/ "./src/components/sheet-bottom/modal-helper.js":
/*!*****************************************************!*\
  !*** ./src/components/sheet-bottom/modal-helper.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ModalHelper; });
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");


class ModalHelper {
  constructor(componentElement) {
    this.componentElement = componentElement;
  }

  get initialPosition() {
    return this.minimizedPosition;
  }

  get minimizedPosition() {
    const contentHeight = this.componentElement.contentHeight;
    return Math.min(contentHeight, this.clientPosition);
  }

  get clientPosition() {
    return window.innerHeight / 2;
  }

  get isDraggable() {
    return this.componentElement.contentHeight > this.clientPosition;
  }

  registerHeader(element) {
    this.headerElement = element;
    this.headerElement.title = this.title;
  }

  setupHeader() {
    this.componentElement.insertAdjacentHTML('afterbegin', `<mdw-sheet-bottom-header mdw-title="${this.componentElement.title}"></mdw-sheet-bottom-header>`);
  }

  addBackdrop() {
    this.backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].addBackdrop(this.componentElement, () => {
      this.componentElement.close();
    });
  }

  removeBackdrop() {
    if (this.backdrop) this.backdrop.remove();
    this.backdrop = undefined;
  }

  handleOnMove({ position, isAtTop, isAboveTop, targetingTop, targetingInitial }) {
    if (targetingTop || isAtTop || isAboveTop) this.headerElement.show();
    else this.headerElement.hide();

    if (isAtTop || isAboveTop) this.headerElement.classList.add('mdw-fullscreen');
    else this.headerElement.classList.remove('mdw-fullscreen');

    if (isAboveTop) this.headerElement.classList.add('mdw-is-above-top');
    else this.headerElement.classList.remove('mdw-is-above-top');
  }
}


/***/ }),

/***/ "./src/components/sheet-bottom/standard-helper.js":
/*!********************************************************!*\
  !*** ./src/components/sheet-bottom/standard-helper.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StandardHelper; });
class StandardHelper {
  constructor(componentElement) {
    this.componentElement = componentElement;
    this.isAnchored = componentElement.hasAttribute('mdw-anchored');
  }

  get initialPosition() {
    return this.componentElement._headerHeight + (window.innerHeight / 4);
  }

  get minimizedPosition() {
    return this.componentElement._headerHeight;
  }

  get clientPosition() {
    return window.innerHeight / 4;
  }

  get isDraggable() {
    return this.componentElement.contentHeight > this.clientPosition;
  }

  registerHeader(element) {
    this.headerElement = element;
    this.headerElement.title = this.title;
  }

  setupHeader() {
    const header = this.componentElement.querySelector('mdw-header');
    this.componentElement.insertAdjacentHTML('afterbegin', `<mdw-sheet-bottom-header mdw-title="${this.componentElement.title}" class="${header.classList.toString()}">${header && header.innerHTML}</mdw-sheet-bottom-header>`);
    if (header) header.remove();
  }

  addBackdrop() {

  }

  removeBackdrop() {
    
  }

  handleOnMove({ position, isAtTop, isAboveTop, targetingTop, targetingInitial }) {
    if (targetingTop || isAtTop || isAboveTop) this.headerElement.show();
    else this.headerElement.hide();

    if (isAtTop || isAboveTop) this.headerElement.classList.add('mdw-fullscreen');
    else this.headerElement.classList.remove('mdw-fullscreen');

    if (isAboveTop) this.headerElement.classList.add('mdw-is-above-top');
    else this.headerElement.classList.remove('mdw-is-above-top');
  }
}
 

/***/ }),

/***/ "./src/components/sheet-side/index.js":
/*!********************************************!*\
  !*** ./src/components/sheet-side/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _core_swipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/swipe.js */ "./src/core/swipe.js");




customElements.define('mdw-sheet-side', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this._useBackdrop = !this.hasAttribute('mdw-no-backdrop');

    this.bound_onSwipe = this.onSwipe.bind(this);
    this.bound_routeChange = this.routeChange.bind(this);
  }

  connectedCallback() {
    this._isNavigationDrawer = this.classList.contains('mdw-navigation-drawer');
    if (this._isNavigationDrawer) document.body.classList.add('mdw-has-navigation-drawer');

    // auto add modal for mobile
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) this.setAttribute('mdw-modal', '');

    // the use can add the modal class manually so we don't want to use the same isMobile check
    if (this._isNavigationDrawer && this.isModal) {
      document.body.classList.add('mdw-navigation-drawer-modal');
    }

    // auto hide if modal and navigation
    if (this.isModal && this._isNavigationDrawer && !this.isHidden && !this.classList.contains('mdw-show')) this.classList.add('mdw-hide');
    else if (this._isNavigationDrawer) document.body.classList.add('mdw-navigation-drawer-open');
    else if (this.isModal && !this.isHidden) {
      if (this._useBackdrop) this._backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].addBackdrop(this, () => this.close(), { sheet: true });
    }

     // browser events for url changes. only use this for navigation
    if (this._isNavigationDrawer) {
      window.addEventListener('hashchange', this.bound_routeChange);
      window.addEventListener('DOMContentLoaded', this.bound_routeChange);
    }
  }

  disconnectedCallback() {
    if (this._backdrop) this._backdrop.remove();
    Object(_core_swipe_js__WEBPACK_IMPORTED_MODULE_2__["removeSwipeListener"])(document.body, this.bound_onSwipe);

    if (this._isNavigationDrawer) {
      window.removeEventListener('hashchange', this.bound_routeChange);
      window.removeEventListener('DOMContentLoaded', this.bound_routeChange);
    }
  }

  get isModal() {
    return this.hasAttribute('mdw-modal');
  }

  get isHidden() {
    return this.classList.contains('mdw-hide');
  }

  get isLeft() {
    return this.classList.contains('mdw-left') || this.classList.contains('mdw-navigation-drawer');
  }

  set useBackdrop(value) {
    this._useBackdrop = !!value;
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  routeChange() {
    // remove current links
    const currentLinks = this.querySelectorAll('.mdw-current-link');
    currentLinks.forEach(el => el.classList.remove('mdw-current-link'));

    // add current links
    let matchingLinks = this.querySelectorAll(`[href="#${this.path}"]`);
    if (!matchingLinks || matchingLinks.length === 0) matchingLinks = this.querySelectorAll(`[alt-href="#${this.path}"]`);
    matchingLinks.forEach(el => el.classList.add('mdw-current-link'));
  }

  open() {
    console.log(this.classList.contains('mdw-hide'));
    setTimeout(() => {
      this.classList.remove('mdw-hide');
      this.classList.add('mdw-show');
      if (this.isModal) {
        Object(_core_swipe_js__WEBPACK_IMPORTED_MODULE_2__["addSwipeListener"])(document.body, this.bound_onSwipe);
        if (this._useBackdrop) this._backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].addBackdrop(this, () => this.close(), { sheet: true });
      }

      if (this._isNavigationDrawer) document.body.classList.add('mdw-navigation-drawer-open');
    }, 10); // this is a temporary fix
  }

  async close() {
    return new Promise(resolve => {
      this.classList.remove('mdw-show');
      this.classList.add('mdw-hide');
      if (this._backdrop) this._backdrop.remove();
      Object(_core_swipe_js__WEBPACK_IMPORTED_MODULE_2__["removeSwipeListener"])(document.body, this.bound_onSwipe);

      if (this._isNavigationDrawer) document.body.classList.remove('mdw-navigation-drawer-open');

      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  toggle() {
    if (this.isHidden) this.open();
    else this.close();
  }

  onSwipe(event) {
    if (this.isLeft) {
      if (event.direction.x === -1 && event.velocity.x < -0.8) this.close();
    } else {
      if (event.direction.x === 1 && event.velocity.x > 0.8) this.close();
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/drag.js */ "./src/core/drag.js");




customElements.define('mdw-slider', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
        -webkit-user-select: none;
      }

      .mdw-slider__track {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 50%;
        user-select: none;
        -webkit-user-select: none;
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
        -webkit-user-select: none;
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
        -webkit-user-select: none;
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
        -webkit-user-select: none;
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
        -webkit-user-select: none;
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
        -webkit-user-select: none;
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/snackbar/service.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");




customElements.define('mdw-snackbar', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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

    el = document.body.querySelector('mdw-body');
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

/***/ "./src/components/surface/service.js":
/*!*******************************************!*\
  !*** ./src/components/surface/service.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _templates_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates/service.js */ "./src/components/templates/service.js");



const templateTypes = [
  'panel',
  'sheetBottom',
  'sheetSide'
];

const animationTypes = [
  'scale',
  'height'
];

const animationOrigin = [
  'top',
  'center'
];

class MDWSurfaceInstance {
  constructor({ id, component, template, animation }) {
    this._id = id;
    this._component = component;
    this._template = template;
    this._animation = animation;
  }

  get id() {
    return this._id;
  }

  get component() {
    return this._component;
  }

  get element() {
    return this._element;
  }

  // TODO figure out open.close - open/close - add/remove
  async open() {
    const page = document.querySelector('mdw-page');
    if (page) page.insertAdjacentHTML('afterEnd', this._template);
    else document.body.insertAdjacentHTML('beforeend', this._template);
    this._element = document.querySelector(`#${this.id}`);

    switch (this.component) {
      case 'panel':
        this._element.setAnimation(this._animation);
        this.element.open();
        break;

      case 'sheetBottom':
        this.element.open();
        break;

      case 'sheetSide':
        this.element.open();
        break;
    }

    if (window._activeSurface) await window._activeSurface.close();

    window._activeSurface = this;
  }

  async close() {
    switch (this.component) {
      case 'panel':
        await this.element.close();
        break;

      case 'sheetBottom':
        await this.element.close();
        break;

      case 'sheetSide':
        await this.element.close();
        break;
    }

    this.element.remove();
    window._activeSurface = undefined;
  }
}


const MDWSurface = new class {
  constructor() {
    this._defaultMobileComponent = 'panel';
    this._defaultDesktopComponent = 'sheetSide';
  }

  setDefaultMobileComponent(component) {
    this._validateComponent(component);
    this._defaultMobileComponent = component;
  }

  setDefaultDesktopComponent(component) {
    this._validateComponent(component);
    this._defaultDesktopComponent = component;
  }


  async open({ template, templateData, animation, animationTarget, component, mobileComponent, desktopComponent }) {
    const instance = await this.create({ template, templateData, animation, animationTarget, component, mobileComponent, desktopComponent });
    instance.open();
  }

  async create({ template, templateData, animation, animationTarget, component, mobileComponent, desktopComponent }) {
    if (!component) component = this._autoSelectComponent(mobileComponent, desktopComponent);
    this._validateComponent(component);
    if (component === 'panel') {
      if (!animation) animation = this._autoSelectAnimation(animationTarget);
      this._validateAnimation(animation);
    }

    const id = _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].uid('surface');
    const templateString = _templates_service_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(template) ? template : await _templates_service_js__WEBPACK_IMPORTED_MODULE_1__["default"].get(template, templateData);

    let surfaceTemplate;
    switch (component) {
      case 'panel':
        surfaceTemplate = this._buildPanel({ id, animation, templateString });
        break;

      case 'sheetBottom':
        surfaceTemplate = this._buildSheetBottom({ id, templateString });
        break;

      case 'sheetSide':
        surfaceTemplate = this._buildSheetSide({ id, templateString });
        break;
    }

    return new MDWSurfaceInstance({
      id,
      component,
      template: surfaceTemplate,
      animation
    });
  }

  close() {
    if (window._activeSurface) window._activeSurface.close();
  }


  _autoSelectComponent(mobileComponent, desktopComponent) {
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile) return mobileComponent || this._defaultMobileComponent;
    return desktopComponent || this._defaultDesktopComponent;
  }

  _validateComponent(type) {
    if (!templateTypes.includes(type)) throw Error(`type must be one of these: ${templateTypes.join(', ')}`);
  }

  _autoSelectAnimation(target) {
    return {
      type: 'height',
      origin: 'center',
      fullscreen: true,
      target
    };
  }

  _validateAnimation(animation) {
    if (!animationTypes.includes(animation.type)) throw Error(`animation.type must be one of these: ${animationTypes.join(', ')}`);
    if (animation.origin && !animationOrigin.includes(animation.origin)) throw Error(`animation.type must be one of these: ${animationOrigin.join(', ')} or not defined`);
  }

  _buildPanel({ id, templateString }) {
    return /* html */`
      <mdw-panel id="${id}">
        ${templateString}
      </mdw-panel>
    `
  }

  _buildSheetBottom({ id, templateString }) {
    return /* html */`
      <mdw-sheet-bottom id="${id}">
        ${templateString}
      </mdw-sheet-bottom>
    `;
  }

  _buildSheetSide({ id, templateString }) {
    return /* html */`
      <mdw-sheet-side id="${id}" class="mdw-hide" mdw-modal mdw-no-backdrop>
        ${templateString}
      </mdw-sheet-side>
    `;
  }
};

window.MDWSurface = MDWSurface;

/* harmony default export */ __webpack_exports__["default"] = (MDWSurface);


/***/ }),

/***/ "./src/components/switch/index.js":
/*!****************************************!*\
  !*** ./src/components/switch/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-switch', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
    this.dispatchEvent(new Event('change'));
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tab-body', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/Ripple.js */ "./src/core/Ripple.js");



customElements.define('mdw-tab-button', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tabs-bar', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tabs-content', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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

/***/ "./src/components/templates/index.js":
/*!*******************************************!*\
  !*** ./src/components/templates/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.js */ "./src/components/templates/service.js");



customElements.define('mdw-template', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    const templateId = this.templateId;
    if (templateId) _service_js__WEBPACK_IMPORTED_MODULE_1__["default"]
      .get(templateId)
      .then(htmlSting => {
        this.insertAdjacentHTML('beforeend', htmlSting)
      })
    
    const templateUrl = this.templateUrl;
    if (templateUrl) {
      _service_js__WEBPACK_IMPORTED_MODULE_1__["default"]
        .loadHtml(templateUrl)
        .then(htmlSting => {
          this.insertAdjacentHTML('beforeend', htmlSting)
        })
    }
  }

  get templateId() {
    return this.getAttribute('template-id')
  }

  get templateUrl() {
    return this.getAttribute('template-url')
  }

  async show(templateId) {
    const htmlSting = await _service_js__WEBPACK_IMPORTED_MODULE_1__["default"].get(templateId)
    this.innerHTML = htmlSting;
  }
})


/***/ }),

/***/ "./src/components/templates/service.js":
/*!*********************************************!*\
  !*** ./src/components/templates/service.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const MDWTemplate = new class {
  constructor() {
    this._templates = {};
    this._loadedTemplates = {};
  }

  // ALLOW A TEMPLTE TO BE RGISTERED MORE THAN ONCE WITHOUT THROWING AN ERROR
  registerOnce(id, template) {
    if (this._templates[id]) return;
    this.register(id, template);
  }

  async registerAndLoad(id, templateUrl) {
    if (this._templates[id]) return;
    this.register(id, templateUrl);
    if (templateUrl.includes('.html')) await this.loadHtml(templateUrl);
  }

  register(id, templateString) {
    if (!id) throw Error('requires id');
    if (!templateString) throw Error('requires templateString');
    if (this._templates[id]) throw Error(`id "${id}" already taken`);
    this._templates[id] = templateString;
  }

  unregister(id) {
    this._templates[id] = undefined;
  }

  isString(template) {
    if (typeof template !== 'string') return false;
    if (template.includes('.html')) return false;
    return template.includes('<');
  }

  async get(id, data) {
    if (!this._templates[id]) throw Error(`no template found with id: ${id}`);
    const template = this._templates[id];
    if (typeof template === 'function') return template(data);
    if (template.includes('.html')) return await this.loadHtml(template);
    return template;
  }

  async loadHtml(url) {
    if (this._loadedTemplates[url]) return this._loadedTemplates[url];

    const response = await fetch(url);
    const template = await response.text();
    this._loadedTemplates[url] = template;
    return template;
  }
}

window.MDWTemplate = MDWTemplate;

/* harmony default export */ __webpack_exports__["default"] = (MDWTemplate);


/***/ }),

/***/ "./src/components/text-field/index.js":
/*!********************************************!*\
  !*** ./src/components/text-field/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-textfield', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
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

    requestAnimationFrame(() => {
      this.classList.remove('mdw-no-animation');
    });

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
     *  TODO evealuate the benefit of this feature
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

  clear() {
    this.input.value = '';
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
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core/index.js */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



customElements.define('mdw-top-app-bar', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();

    this._throttledScrollHandler = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].rafThrottle(this._scrollHandler);
    this._throttledResizeHandler = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].rafThrottle(this._resizeHandler);
    this.bound_throttledScrollHandler = this._throttledScrollHandler.bind(this);
    this.bound_throttledResizeHandler = this._throttledResizeHandler.bind(this);

    document.body.classList.add('mdw-has-top-app-bar');
  }

  connectedCallback() {
    this._isProminent = this.hasAttribute('mdw-prominent');
    this._isFixed = this.hasAttribute('mdw-fixed');
    this._isShrink = this.hasAttribute('mdw-shrink');

    if (this.parentNode && this.parentNode.nodeName === 'HEADER') {
      this.parentNode.classList.add('mdw-top-app-bar');
      if (this._isProminent) this.parentNode.classList.add('mdw-prominent');
      if (this._isShrink) this.parentNode.classList.add('mdw-shrink');
      if (this._isFixed) this.parentNode.classList.add('mdw-fixed');
    }

    if (this._isShrink) {
      this._animationElements = [...(this.querySelectorAll('[mdw-animation-property]') || [])].map(element => {
        const start = parseFloat(element.getAttribute('mdw-animation-start') || 0);
        const end = parseFloat(element.getAttribute('mdw-animation-end') || 0);
        const rawProperty = element.getAttribute('mdw-animation-property').split(':');
        return {
          element,
          property: rawProperty[0],
          valueWrapper: rawProperty[1] || '',
          start,
          end,
          range: Math.abs(start - end)
        };
      });

      this._scrollTarget = this._getScrollTarget();
      this._lastScrollPosition = this._getViewportScrollY();
      this._topAppBarHeight = this.clientHeight + 6;
      this._scrollHandler();
      this._createObserver();

      this._scrollTarget.addEventListener('scroll', this.bound_throttledScrollHandler);
    }

    if (this._isFixed || this._isShrink) {
      this._page = document.querySelector('mdw-page');
      if (this._page) this.style.width = `${this._page.offsetWidth}px`;
    }
    window.addEventListener('resize', this.bound_throttledResizeHandler);
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.unobserve(this);
      this._observer.disconnect();
      this._observer = undefined;
    }
    if (this._scrollTarget) this._scrollTarget.removeEventListener('scroll', this.bound_throttledScrollHandler);
    window.removeEventListener('resize', this.throttledResizeHandler);
  }

  notContextual() {
    this.removeAttribute('mdw-contextual');
  }

  contextual() {
    this.setAttribute('mdw-contextual', '');
  }

  _getAllFixedSections() {
    return this.querySelectorAll('section[mdw-fixed]');
  }

  _getScrollTarget() {
    // get sibling mdw-content
    if (this.parentNode.nodeName === 'HEADER') {
      const contentSibling = this.parentNode.parentNode.querySelector('header + mdw-content:not([mdw-no-scroll])');
      if (contentSibling) return contentSibling;
    }

    // get page container
    const pageContent = document.querySelector('mdw-page-content');
    if (pageContent && pageContent.contains(this)) return pageContent;

    // get wrapping content
    const content = document.querySelector('mdw-content');
    if (content && content.contains(this)) return content;

    // default to window
    return window;
  }

  _getViewportScrollY() {
    return this._scrollTarget[this._scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
  }

  _scrollHandler() {
    const currentScrollPosition = Math.max(this._getViewportScrollY(), 0);
    // const diff = currentScrollPosition - this._lastScrollPosition;
    // this._lastScrollPosition = currentScrollPosition;
    
    let position;
    if (this._isProminent) {
      const halfHeight = this._topAppBarHeight / 2;
      if (currentScrollPosition <= halfHeight) position = currentScrollPosition;
      else position = halfHeight;
    } else if (currentScrollPosition <= this._topAppBarHeight) position = currentScrollPosition;
    else position = this._topAppBarHeight;

    this.style.transform = `translateY(-${position}px)`;
    this._getAllFixedSections().forEach((element) => {
      element.style.transform = `translateY(${position}px)`
    });
  }

  _resizeHandler() {
    if (this._isFixed || this._isShrink) {
      this._page = document.querySelector('mdw-page');
      if (this._page) this.style.width = `${this._page.offsetWidth}px`;
    }
  }

  _createObserver() {
    if (this._animationElements.length === 0) return;
    this._observer = new IntersectionObserver(this._handleIntersect.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: this._buildThresholdList()
    });
    this._observer.observe(this);
  }

  _buildThresholdList() {
    let thresholds = [];
    let numSteps = 68;

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }

    this._intersectionThresholds = thresholds;
    return this._intersectionThresholds;
  }

  _handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      let percent;
      if (this._isProminent) percent = -entry.boundingClientRect.top / (this._topAppBarHeight / 2);
      this._animationElements.forEach(v => this._animationValue(percent, v));
    });
  }

  _animationValue(percent, { element, property, valueWrapper, start, end, range}) {
    element.style[property] = valueWrapper.replace('#', start - (percent * range));
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
    const scrollElement = document.body.classList.contains('prevent-over-scroll') ? document.querySelector('mdw-page > mdw-content') : document.body;
    scrollElement.style.overflow = 'hidden';
  }

  unlockPageScroll() {
    const scrollElement = document.body.classList.contains('prevent-over-scroll') ? document.querySelector('mdw-page > mdw-content') : document.body;
    scrollElement.style.overflow = '';
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

/* harmony default export */ __webpack_exports__["default"] = (MDWUtils);


/***/ }),

/***/ "./src/core/drag.js":
/*!**************************!*\
  !*** ./src/core/drag.js ***!
  \**************************/
/*! exports provided: states, addDragListener, removeDragListener, enableDragListenerForElement, disableDragListenerForElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "states", function() { return states; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDragListener", function() { return addDragListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDragListener", function() { return removeDragListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableDragListenerForElement", function() { return enableDragListenerForElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableDragListenerForElement", function() { return disableDragListenerForElement; });
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils.js */ "./src/core/Utils.js");


const dragInstancesByElementAndFunction = new Map();

const states = {
  start: 'start',
  move: 'move',
  end: 'end'
};

function addDragListener(element, callback) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  if (typeof callback !== 'function') throw Error('callback must be a function');

  const dragInstance = new Drag(element, callback);
  dragInstance.addEvents();

  if (!dragInstancesByElementAndFunction.get(element)) dragInstancesByElementAndFunction.set(element, new Map());
  dragInstancesByElementAndFunction.get(element).set(callback, dragInstance);
};

// if you do not pass in callback then all the drag events on an element will be removed
function removeDragListener(element, callback = undefined) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');

  const dragInstances = dragInstancesByElementAndFunction.get(element);
  if (!dragInstances) return;
  if (callback) {
    const el = dragInstances.get(callback);
    if (el) el.removeEvents();
    dragInstances.delete(callback);
  } else {
    dragInstances.forEach(i => i.removeEvents());
    dragInstancesByElementAndFunction.delete(element);
  }
};

function enableDragListenerForElement(element) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  const dragInstances = dragInstancesByElementAndFunction.get(element);
  if (!dragInstances) return;
  dragInstances.forEach(i => i.enable());
}

function disableDragListenerForElement(element) {
  if (!(element instanceof HTMLElement)) throw Error('element must be an instance HTMLElement');
  const dragInstances = dragInstancesByElementAndFunction.get(element);
  if (!dragInstances) return;
  dragInstances.forEach(i => i.disable());
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
    if (ev.type === 'mousedown' && ev.button !== 0) return;
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
    this.moved = false;
  }

  handleGestureMove(ev) {
    ev.state = this.moved ? 'move' : 'start';
    this.moved = true;
    if (this.initialTouchPos) this.callbackThrottle(ev);
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

    // no drag took place
    if (this.moved === false) return;

    this.endTime = Date.now();
    ev.runTime = this.endTime - this.startTime;
    ev.distance = this.getDistance(ev);
    ev.direction = this.getDirection({ x: 0, y: 0 }, ev.distance);
    ev.velocity = this.getVelocity(ev.distance, ev.runTime);

    if (ev.clientX === undefined) {
      const clientPos = this.getClientXY(ev);
      ev.clientX = clientPos.x;
      ev.clientY = clientPos.y;
    }
    this.callback(ev);
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

window.MDWDrag = {
  states,
  addDragListener,
  removeDragListener,
  enableDragListenerForElement,
  disableDragListenerForElement
};


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

/***/ "./src/core/swipe.js":
/*!***************************!*\
  !*** ./src/core/swipe.js ***!
  \***************************/
/*! exports provided: addSwipeListener, removeSwipeListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSwipeListener", function() { return addSwipeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSwipeListener", function() { return removeSwipeListener; });
/* harmony import */ var _drag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag.js */ "./src/core/drag.js");


const swipeInstancesByElementAndFunction = new Map();

class Swipe {
  constructor(element, callback) {
    this.bound_dragEvent = this.dragEvent.bind(this);

    this.element = element;
    this.callback = callback;
  }

  addEvents() {
    Object(_drag_js__WEBPACK_IMPORTED_MODULE_0__["addDragListener"])(this.element, this.bound_dragEvent);
  }

  removeEvents() {
    Object(_drag_js__WEBPACK_IMPORTED_MODULE_0__["removeDragListener"])(this.element, this.bound_dragEvent);
  }

  dragEvent(event) {
    if (event.state === 'end') {
      if (Math.abs(event.velocity.x) > 1.4 || Math.abs(event.velocity.y) > 1.4) this.callback(event);
    }
  }
}

function addSwipeListener(element, callback) {
  const swipInstance = new Swipe(element, callback);
  swipInstance.addEvents();

  if (!swipeInstancesByElementAndFunction.get(element)) swipeInstancesByElementAndFunction.set(element, new Map());
  swipeInstancesByElementAndFunction.get(element).set(callback, swipInstance);
}

function removeSwipeListener(element, callback) {
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


window.MDWSwipe = {
  addSwipeListener,
  removeSwipeListener
};


/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! exports provided: MDWDialog, MDWSnackbar, MDWTemplate, MDWSurface, MDWDrag, MDWSwipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_drag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/drag.js */ "./src/core/drag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDWDrag", function() { return _core_drag_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _core_swipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/swipe.js */ "./src/core/swipe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDWSwipe", function() { return _core_swipe_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _components_banner_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/banner/index.js */ "./src/components/banner/index.js");
/* harmony import */ var _components_bottom_navigation_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/bottom-navigation/index.js */ "./src/components/bottom-navigation/index.js");
/* harmony import */ var _components_button_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/button/index.js */ "./src/components/button/index.js");
/* harmony import */ var _components_card_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/card/index.js */ "./src/components/card/index.js");
/* harmony import */ var _components_checkbox_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/checkbox/index.js */ "./src/components/checkbox/index.js");
/* harmony import */ var _components_circular_progress_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/circular-progress/index.js */ "./src/components/circular-progress/index.js");
/* harmony import */ var _components_dialog_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/dialog/index.js */ "./src/components/dialog/index.js");
/* harmony import */ var _components_fab_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/fab/index.js */ "./src/components/fab/index.js");
/* harmony import */ var _components_icon_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/icon/index.js */ "./src/components/icon/index.js");
/* harmony import */ var _components_linear_progress_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/linear-progress/index.js */ "./src/components/linear-progress/index.js");
/* harmony import */ var _components_list_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/list/index.js */ "./src/components/list/index.js");
/* harmony import */ var _components_list_item_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/list-item/index.js */ "./src/components/list-item/index.js");
/* harmony import */ var _components_menu_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/menu/index.js */ "./src/components/menu/index.js");
/* harmony import */ var _components_navigation_rail_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/navigation-rail/index.js */ "./src/components/navigation-rail/index.js");
/* harmony import */ var _components_panel_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/panel/index.js */ "./src/components/panel/index.js");
/* harmony import */ var _components_radio_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/radio/index.js */ "./src/components/radio/index.js");
/* harmony import */ var _components_radio_group_index_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/radio-group/index.js */ "./src/components/radio-group/index.js");
/* harmony import */ var _components_select_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/select/index.js */ "./src/components/select/index.js");
/* harmony import */ var _components_sheet_bottom_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/sheet-bottom/index.js */ "./src/components/sheet-bottom/index.js");
/* harmony import */ var _components_sheet_side_index_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/sheet-side/index.js */ "./src/components/sheet-side/index.js");
/* harmony import */ var _components_slider_index_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/slider/index.js */ "./src/components/slider/index.js");
/* harmony import */ var _components_snackbar_index_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/snackbar/index.js */ "./src/components/snackbar/index.js");
/* harmony import */ var _components_switch_index_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/switch/index.js */ "./src/components/switch/index.js");
/* harmony import */ var _components_tabs_tab_body_index_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/tabs/tab-body/index.js */ "./src/components/tabs/tab-body/index.js");
/* harmony import */ var _components_tabs_tab_button_index_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/tabs/tab-button/index.js */ "./src/components/tabs/tab-button/index.js");
/* harmony import */ var _components_tabs_tabs_bar_index_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/tabs/tabs-bar/index.js */ "./src/components/tabs/tabs-bar/index.js");
/* harmony import */ var _components_tabs_tabs_content_index_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/tabs/tabs-content/index.js */ "./src/components/tabs/tabs-content/index.js");
/* harmony import */ var _components_text_field_index_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/text-field/index.js */ "./src/components/text-field/index.js");
/* harmony import */ var _components_top_app_bar_index_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/top-app-bar/index.js */ "./src/components/top-app-bar/index.js");
/* harmony import */ var _components_bound_property_index_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/bound-property/index.js */ "./src/components/bound-property/index.js");
/* harmony import */ var _components_templates_index_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/templates/index.js */ "./src/components/templates/index.js");
/* harmony import */ var _components_dialog_service_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/dialog/service.js */ "./src/components/dialog/service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDWDialog", function() { return _components_dialog_service_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _components_snackbar_service_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/snackbar/service.js */ "./src/components/snackbar/service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDWSnackbar", function() { return _components_snackbar_service_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _components_templates_service_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/templates/service.js */ "./src/components/templates/service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDWTemplate", function() { return _components_templates_service_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _components_surface_service_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/surface/service.js */ "./src/components/surface/service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDWSurface", function() { return _components_surface_service_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });




// --- Components ---

// import './components/autocomplete/index.js';
// import './components/backdrop/index.js';







// // import './components/expander/index.js';





















// import './components/tooltip/index.js';













/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2ViZm9ybXVsYS9wYXgtY29yZS9zcmMvY2xpZW50L0hUTUxFbGVtZW50RXh0ZW5kZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJmb3JtdWxhL3BheC1jb3JlL3NyYy9jbGllbnQvUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdlYmZvcm11bGEvcGF4LWNvcmUvc3JjL2NsaWVudC9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYmFubmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Jhbm5lci9zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JvdHRvbS1uYXZpZ2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JvdW5kLXByb3BlcnR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NoZWNrYm94L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9mYWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saW5lYXItcHJvZ3Jlc3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC1pdGVtL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWVudS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLXJhaWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFuZWwvZHJhZ2dhYmxlLWhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYW5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yYWRpby1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yYWRpby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2hlZXQtYm90dG9tL2hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaGVldC1ib3R0b20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2hlZXQtYm90dG9tL21vZGFsLWhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaGVldC1ib3R0b20vc3RhbmRhcmQtaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NoZWV0LXNpZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2xpZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NuYWNrYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NuYWNrYmFyL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3VyZmFjZS9zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3N3aXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYi1ib2R5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFiLWJ1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnMtYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFicy1jb250ZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0LWZpZWxkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvcC1hcHAtYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1JpcHBsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9kcmFnLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL21vYmlsZS1pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3N3aXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFF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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsS0FBSztBQUN0RTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSwrREFBK0QsYUFBYTtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxXQUFXLGlCQUFpQjs7QUFFNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLGNBQWM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRCxrQkFBa0I7QUFDcEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4ZEQ7QUFBQTtBQUFvRTs7QUFFcEUsZ0RBQWdELGlGQUFtQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNQRDtBQUFBO0FBQUE7QUFBb0U7QUFDdkI7O0FBRTdDLG9EQUFvRCxpRkFBbUI7QUFDdkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQStELHVEQUFTO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdIQUFnSCxNQUFNO0FBQ3RIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkNBQTJDO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6cEJEO0FBQUE7QUFBb0U7O0FBRXBFLCtEQUErRCxpRkFBbUI7QUFDbEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0Es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O0FDdE0xQjtBQUFBO0FBQUE7QUFBb0U7QUFDdkI7O0FBRTdDLGtEQUFrRCxpRkFBbUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLHVEQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3hRRDtBQUFBO0FBQW9FOztBQUVwRSxvREFBb0QsaUZBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2xERDtBQUFBO0FBQUE7QUFBb0U7QUFDcEI7O0FBRWhELHNEQUFzRCxpRkFBbUI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQix1REFBUztBQUMvQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELGlCQUFpQjtBQUNwRTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2pKRDtBQUFBO0FBQW9FOztBQUVwRSxvREFBb0QsaUZBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQy9GRDtBQUFBO0FBQW9FOztBQUVwRSx3REFBd0QsaUZBQW1CO0FBQzNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQsNkJBQTZCO0FBQ3BGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMxQ0Q7QUFBQTtBQUFBO0FBQW9FO0FBQzdCOztBQUV2QyxvREFBb0QsaUZBQW1CO0FBQ3ZFO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbURBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsTUFBTSxtREFBVztBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLG1EQUFXO0FBQ3ZDO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcENEO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEdBQUc7QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RSxHQUFHO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsMEVBQVcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3ZEM0I7QUFBQTtBQUFvRTs7QUFFcEUscURBQXFELGlGQUFtQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNySkQ7QUFBQTtBQUFBO0FBQW9FO0FBQ3pCOztBQUUzQyx1REFBdUQsaUZBQW1CO0FBQzFFO0FBQ0E7O0FBRUEsbUNBQW1DLHNEQUFRO0FBQzNDLG1DQUFtQyxzREFBUTtBQUMzQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qyx1QkFBdUI7QUFD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QUFDQTtBQUNzQztBQUNXO0FBQ1g7QUFDRjtBQUNJO0FBQ1M7QUFDWDtBQUN0QztBQUNtQztBQUNDO0FBQ1c7QUFDWDtBQUNLO0FBQ0w7QUFDVztBQUNWO0FBQ0E7QUFDTTtBQUNMO0FBQ007QUFDRjtBQUNKO0FBQ0U7QUFDRjtBQUNPO0FBQ0U7QUFDRjtBQUNJO0FBQ1A7QUFDMUM7QUFDMkM7QUFDRztBQUNMOzs7QUFHYztBQUNJO0FBQ0M7QUFDSDs7QUFTeEQiLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lbnRyeS5qc1wiKTtcbiIsImltcG9ydCBQYWdlIGZyb20gJy4vc3JjL2NsaWVudC9QYWdlLmpzJztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9zcmMvY2xpZW50L3JvdXRlci5qcyc7XG5pbXBvcnQgSFRNTEVsZW1lbnRFeHRlbmRlZCBmcm9tICcuL3NyYy9jbGllbnQvSFRNTEVsZW1lbnRFeHRlbmRlZC5qcyc7XG5cbmV4cG9ydCB7XG4gIFBhZ2UsXG4gIHJvdXRlcixcbiAgSFRNTEVsZW1lbnRFeHRlbmRlZFxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTEVsZW1lbnRFeHRlbmRlZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldCBfdGVtcGxhdGVJZCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfS0tdGVtcGxhdGVgO1xuICB9XG5cbiAgLyogQ2xvbmUgZnJvbSBwcmUgYnVpbHQgaHRtbFRlbXBsYXRlXG4gICAqICAgLSBSZXJlbmRlcjogcmVwbGFjZXMgaHRtbCBidXQgbm90IHN0eWxlcy4gVGhpcyBpcyB1c2VmdWxsIGZvciBkeW5hbWljIHRlbXBsYXRlc1xuICAgKi9cbiAgY2xvbmVUZW1wbGF0ZShyZXJlbmRlcikge1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX3RlbXBsYXRlSWQpO1xuICAgIFxuICAgIC8vIGNyZWF0ZSB0ZW1wbGF0ZSBvbiB0aGUgZmx5XG4gICAgaWYgKCF0ZW1wbGF0ZSkgdGVtcGxhdGUgPSB0aGlzLl9jcmVhdGVUZW1wbGF0ZSgpO1xuXG4gICAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGUuY29udGVudDtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5zaGFkb3dSb290ID8gdGhpcy5zaGFkb3dSb290IDogdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgY2xvbmUgPSB0ZW1wbGF0ZUNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgaWYgKHJlcmVuZGVyKSB7XG4gICAgICAvLyB0aGlzLl9faXNCdWlsZFByb2Nlc3MgaXMgcHJlc2VudCBkdXJpbmcgdGhlIGJ1aWxkIHByb2Nlc3MgYW5kIHdpbGwgYmUgdW5kZWZpbmVkIGluIHRoZSBicm93c2VyXG4gICAgICBpZiAoIXRoaXMuX19pc0J1aWxkUHJvY2VzcyAmJiB0aGlzLmJlZm9yZVJlbmRlcikgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgIGNsb25lLnF1ZXJ5U2VsZWN0b3IoJ3JlbmRlci1ibG9jaycpLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoKTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICBpZiAoIXRoaXMuX19pc0J1aWxkUHJvY2VzcyAmJiB0aGlzLmFmdGVyUmVuZGVyKSB0aGlzLmFmdGVyUmVuZGVyKCk7XG5cbiAgfVxuXG4gIF9jcmVhdGVUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHRlbXBsYXRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5fdGVtcGxhdGVJZCk7XG4gICAgdGVtcGxhdGVFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICR7dGhpcy5zdHlsZXMoKX1cbiAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgPHJlbmRlci1ibG9jaz5cbiAgICAgICAgICAke3RoaXMudGVtcGxhdGUoKX1cbiAgICAgICAgPC9yZW5kZXItYmxvY2s+XG4gICAgYDtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgdGVtcGxhdGVFbGVtZW50KTtcbiAgICByZXR1cm4gdGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gRGV0ZWN0IHN1cGVyP1xuICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMuYWRkRXZlbnRzKSB0aGlzLmFkZEV2ZW50cygpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gRGV0ZWN0IHN1cGVyP1xuICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIHRoaXMuX19pc0J1aWxkUHJvY2VzcyBpcyBwcmVzZW50IGR1cmluZyB0aGUgYnVpbGQgcHJvY2VzcyBhbmQgd2lsbCBiZSB1bmRlZmluZWQgaW4gdGhlIGJyb3dzZXJcbiAgICBpZiAodGhpcy5fX2lzQnVpbGRQcm9jZXNzKSByZXR1cm47XG5cbiAgICBjb25zdCByZW5kZXJCbG9jayA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdyZW5kZXItYmxvY2snKTtcbiAgICBpZiAoIXJlbmRlckJsb2NrKSB0aHJvdyBFcnJvcignQ291bGQgbm90IGZpbmQgPHJlbmRlci1ibG9jaz4nKTtcblxuICAgIGlmICh0aGlzLnJlbW92ZUV2ZW50cykgdGhpcy5yZW1vdmVFdmVudHMoKTtcbiAgICBpZiAodGhpcy5iZWZvcmVSZW5kZXIpIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgcmVuZGVyQmxvY2suaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZSgpO1xuICAgIGlmICh0aGlzLmFmdGVyUmVuZGVyKSB0aGlzLmFmdGVyUmVuZGVyKCk7XG4gICAgaWYgKHRoaXMuYWRkRXZlbnRzKSB0aGlzLmFkZEV2ZW50cygpO1xuICB9XG5cbiAgLy8gQ2FsbGVkIGJlZm9yZSByZW5kZXIoKS4gcGxhY2Vob2xkZXIsIGNhbiBiZSBvdmVyaWRkZW5cbiAgLy8gVGhpcyBkb2VzIG5vdCBpbmNsdWRlIHRoZSBpbml0aWFsIGNsb25lTm9kZVxuICBiZWZvcmVSZW5kZXIoKSB7IH1cblxuICAvLyBDYWxsZWQgYWZ0ZXIgcmVuZGVyKCkuIHBsYWNlaG9sZGVyLCBjYW4gYmUgb3ZlcmlkZGVuXG4gIC8vIFRoaXMgZG9lcyBub3QgaW5jbHVkZSB0aGUgaW5pdGlhbCBjbG9uZU5vZGVcbiAgYWZ0ZXJSZW5kZXIoKSB7IH1cblxuICAvLyB0aGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgY29ubmVjdGVkXG4gIC8vIFRoaXMgaXMgYWxzbyBjYWxsZWQgYWZ0ZXIgcmVuZGVyLCBldmVudHMgYXJlIGZpcnN0IHJlbW9lZCBiZWZvcmUgcmVuZGVyIHNvIHlvdSBkb250IGhhdmUgbXVsdGlwbGUgZXZlbnRzXG4gIGFkZEV2ZW50cygpIHsgfVxuXG4gIC8vIHRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkaXNjb25uZWN0ZWRcbiAgLy8gVGhpcyBpcyBhbHNvIGNhbGxlZCBwcmlvciB0byByZW5kZXIsIGFmdGVyIHJlbmRlciBhZGRFdmVudHMgaXMgY2FsbGVkLiBUaGlzIHdpbGwgbWFrZSBzdXJlIHlvdSBvbGQgZWxlbWVudHMgZG9udCByZXRhaW4gZXZlbnRzXG4gIHJlbW92ZUV2ZW50cygpIHsgfVxuXG4gIC8vIGFkZCBjc3MgdGhhdCB3aWxsIGJlIGluamVjdGVkIHRvIHRoZSB0ZW1wbGF0ZVxuICBzdHlsZXMoKSB7IH1cblxuICAvLyBhZGQgY3NzIHRvIHRoZSBkb2N1bWVudCByb290XG4gIGV4dGVybmFsU3R5bGVzKCkgeyB9XG5cbiAgLy8gYWRkIGh0bWwgdGVtcGxhdGUsIFRoaXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgdGVtcGxhdGUgYW5kIGRpcmVjdCByZW5kZXJcbiAgdGVtcGxhdGUoKSB7IH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5fcmVuZGVyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IHdpbmRvdztcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgb25jZSBwYWdlIGlzIHJlbmRlcmRcbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIC8vIERldGVjdCBzdXBlcj9cbiAgICAgIGlmICh0aGlzLmFkZEV2ZW50cykgdGhpcy5hZGRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgb25jZSBwYWdlIGlzIHJlbW92ZWRcbiAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIC8vIERldGVjdCBzdXBlcj9cbiAgICAgIGlmICh0aGlzLnJlbW92ZUV2ZW50cykgdGhpcy5yZW1vdmVFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgQ3JlYXRlQW5kU2V0KCkge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UgPSBpbnN0YW5jZTtcblxuICAgICAgY29uc3QgcGFnZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGl0bGUnKTtcbiAgICAgIGlmIChwYWdlVGl0bGUpIHBhZ2VUaXRsZS5pbm5lclRleHQgPSBpbnN0YW5jZS50aXRsZTtcblxuICAgICAgaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgICAvLyBUT0RPIHVzZSBtdXRhdGlvbiBvYnNlcnZlclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5jb25uZWN0ZWRDYWxsYmFjaykgaW5zdGFuY2UuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgIH0sIDApO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLy8gcmVuZGVyIHBhZ2UgaHRtbFxuICAgIHJlbmRlcigpIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUmVuZGVyID09PSB0cnVlKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHJlbmRlckJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1yZW5kZXItYmxvY2s6bm90KC5wcmV2aW91cyknKTtcbiAgICAgIGlmICghcmVuZGVyQmxvY2spIHRocm93IEVycm9yKCdDb3VsZCBub3QgZmluZCA8cGFnZS1yZW5kZXItYmxvY2s+Jyk7XG5cbiAgICAgIGlmICh0aGlzLnJlbW92ZUV2ZW50cyAmJiB0aGlzLl9yZW5kZXJlZCkgdGhpcy5yZW1vdmVFdmVudHMoKTtcbiAgICAgIGlmICh0aGlzLmJlZm9yZVJlbmRlciAmJiB0aGlzLl9yZW5kZXJlZCkgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICAgIHJlbmRlckJsb2NrLmlubmVySFRNTCA9IGA8c3R5bGU+JHt0aGlzLnN0eWxlcygpfTwvc3R5bGU+JHt0aGlzLnRlbXBsYXRlKCl9YDtcbiAgICAgIGlmICh0aGlzLmFmdGVyUmVuZGVyKSB0aGlzLmFmdGVyUmVuZGVyKCk7XG4gICAgICBpZiAodGhpcy5hZGRFdmVudHMpIHRoaXMuYWRkRXZlbnRzKCk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBDYWxsZWQgYmVmb3JlIHJlbmRlcigpLiBwbGFjZWhvbGRlciwgY2FuIGJlIG92ZXJpZGRlblxuICAgIC8vIFRoaXMgZG9lcyBub3QgaW5jbHVkZSB0aGUgaW5pdGlhbCBjbG9uZU5vZGVcbiAgICBiZWZvcmVSZW5kZXIoKSB7IH1cblxuICAgIC8vIENhbGxlZCBhZnRlciByZW5kZXIoKS4gcGxhY2Vob2xkZXIsIGNhbiBiZSBvdmVyaWRkZW5cbiAgICAvLyBUaGlzIGRvZXMgbm90IGluY2x1ZGUgdGhlIGluaXRpYWwgY2xvbmVOb2RlXG4gICAgYWZ0ZXJSZW5kZXIoKSB7IH1cblxuICAgIC8vIGFkZCBjc3MgdGhhdCB3aWxsIGJlIGluamVjdGVkIHRvIHRoZSB0ZW1wbGF0ZVxuICAgIHN0eWxlcygpIHsgfVxuXG4gICAgLy8gYWRkIGh0bWwgdGVtcGxhdGUsIFRoaXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgdGVtcGxhdGUgYW5kIGRpcmVjdCByZW5kZXJcbiAgICB0ZW1wbGF0ZSgpIHsgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgICB0aGlzLmNsYXNzUmVmZXJlbmNlID0ge307XG4gICAgdGhpcy5pbnRlcmNlcHRlciA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMucGFnZUNsYXNzbmFtZVJlZ2V4ID0gL2NsYXNzXFxzKC4qKVxcc2V4dGVuZHMvO1xuICAgIHRoaXMuYm91bmRfcmVzb2x2ZSA9IHRoaXMuX3Jlc29sdmUuYmluZCh0aGlzKTtcblxuICAgIC8vIHJlZ2V4ZXMgZm9yIHBhcnNpbmcgdXJpJ3NcbiAgICB0aGlzLlBBUkFNRVRFUl9SRUdFWFAgPSAvKFs6Kl0pKFxcdyspL2c7XG4gICAgdGhpcy5XSUxEQ0FSRF9SRUdFWFAgPSAvXFwqL2c7XG4gICAgdGhpcy5SRVBMQUNFX1ZBUklBQkxFX1JFR0VYUCA9ICcoW15cXC9dKyknO1xuICAgIHRoaXMuUkVQTEFDRV9XSUxEQ0FSRCA9ICcoPzouKiknO1xuICAgIHRoaXMuRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQID0gJyg/OlxcLyR8JCknO1xuICAgIHRoaXMuTUFUQ0hfUkVHRVhQX0ZMQUdTID0gJyc7XG5cbiAgICB0aGlzLl90cmFuc2l0aW9uUGFnZXMgPSBmYWxzZTtcbiAgICB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkNvbXBsZXRlID0gdGhpcy5fb25UcmFuc2l0aW9uQ29tcGxldGUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX19tdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5hY3RpdmVQYWdlLmNvbm5lY3RlZENhbGxiYWNrKSB3aW5kb3cuYWN0aXZlUGFnZS5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgdGhpcy5fc3RvcFdhdGNoaW5nRm9yQ29ubmVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBicm93c2VyIGV2ZW50cyBmb3IgdXJsIGNoYW5nZXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfcmVzb2x2ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9yZXNvbHZlKHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBhbGxvdyBpbnRlcmNlcHRpbmcgb2Ygcm91dGUgY2hhbmdlc1xuICAvLyByZXR1cm4gZmFsc2UgdG8gcHJldmVudCByb3V0ZSBjaGFuZ2VcbiAgLy8gcmV0dXJuIHRydWUgdG8gYWxsb3cgcm91dGUgY2hhbmdlXG4gIGludGVyY2VwdFJvdXRlQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5pbnRlcmNlcHRlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgZ2V0IHRyYW5zaXRpb25QYWdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNpdGlvblBhZ2VzO1xuICB9XG5cbiAgc2V0IHRyYW5zaXRpb25QYWdlcyh2YWx1ZSkge1xuICAgIHRoaXMuX3RyYW5zaXRpb25QYWdlcyA9ICEhdmFsdWU7XG4gIH1cblxuICBnZXQgcGF0aCgpIHtcbiAgICBsZXQgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoLy4qIy8sICcnKTtcbiAgICBpZiAocGF0aC5pbmRleE9mKCc/JykgPiAtMSkgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXTtcbiAgICBpZiAocGF0aC5jaGFyQXQoMCkgIT09ICcvJykgcGF0aCA9ICcvJyArIHBhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXQgdXJsUGFyYW1ldGVycygpIHtcbiAgICBjb25zdCBtYXRjaCA9IHRoaXMuX21hdGNoKHRoaXMucGF0aCk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2gucGFyYW1zIDoge307XG4gIH1cblxuICBnZXQgc2VhcmNoUGFyYW10ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9leHRyYWN0U2VhcmNoUGFyYW1ldGVycyh0aGlzLl9jbGVhbih3aW5kb3cubG9jYXRpb24uaHJlZikpLnNwbGl0KCcsJykuZmlsdGVyKGEgPT4gISFhKS5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHNwbGl0ID0gYi5zcGxpdCgnPScpO1xuICAgICAgYVtzcGxpdFswXV0gPSBzcGxpdFsxXTtcbiAgICAgIHJldHVybiBhO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHNldCBoYXNoKHZhbHVlKSB7XG4gICAgd2luZG93LmxvY2F0aW9uID0gYCMvJHt2YWx1ZX1gO1xuICB9XG4gIFxuICBzZXRTZWFyY2hQYXJhbXRlcihuYW1lLCB2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB0aGlzLnNlYXJjaFBhcmFtdGVycztcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgZGVsZXRlIHBhcmFtZXRlcnNbbmFtZV07XG4gICAgZWxzZSBwYXJhbWV0ZXJzW25hbWVdID0gdmFsdWU7XG4gICAgbGV0IHBhdGggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdO1xuICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5sZW5ndGggPiAwKSBwYXRoICs9ICc/JyArIE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLm1hcChrZXkgPT4gYCR7a2V5fT0ke3BhcmFtZXRlcnNba2V5XX1gKS5qb2luKCcsJyk7XG5cbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBwYXRoIH0sICcnLCBwYXRoKTtcbiAgfVxuXG4gIHJlbW92ZVNlYXJjaFBhcmFtdGVyKG5hbWUpIHtcbiAgICB0aGlzLnNldFNlYXJjaFBhcmFtdGVyKG5hbWUsIHVuZGVmaW5lZCk7XG4gIH1cblxuICBhZGRUcmFuc2l0aW9uQ1NTKCkge1xuICAgIGlmICh0aGlzLl9hZGRUcmFuc2l0aW9uQ1NTQWRkZWQpIHJldHVybjtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBgPHN0eWxlPlxuICAgICAgcGFnZS1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuICAgICAgcGFnZS1jb250YWluZXIuaW4tdHJhbnNpdGlvbiB7XG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgIH1cbiAgICAgIHBhZ2UtcmVuZGVyLWJsb2NrIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgfVxuICAgICAgcGFnZS1yZW5kZXItYmxvY2suYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1vdXQge1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG4gICAgICBwYWdlLXJlbmRlci1ibG9jay5iZWZvcmUtdHJhbnNpdGlvbi1wYWdlLWluIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpIHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuICAgICAgcGFnZS1yZW5kZXItYmxvY2sudHJhbnNpdGlvbi1wYWdlLW91dCB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMTZzIGxpbmVhcixcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIC4yNnMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTtcbiAgICAgIH1cbiAgICAgIHBhZ2UtcmVuZGVyLWJsb2NrLnRyYW5zaXRpb24tcGFnZS1pbiB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IC01MCUgMDtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMThzIGxpbmVhcixcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIC4yNnMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTtcbiAgICAgIH1cbiAgICA8L3N0eWxlPmApO1xuICAgIHRoaXMuX2FkZFRyYW5zaXRpb25DU1NBZGRlZCA9IHRydWU7XG4gIH1cblxuICBhZGRQYWdlSGlkZUNTUygpIHtcbiAgICBpZiAodGhpcy5fYWRkUGFnZUhpZGVDU1NBZGRlZCkgcmV0dXJuO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGA8c3R5bGU+XG4gICAgICAubWR3LWhpZGUtbm9uLXBhZ2UtY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICA8L3N0eWxlPmApO1xuICAgIHRoaXMuX2FkZFBhZ2VIaWRlQ1NTQWRkZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8geW91IGNhbiBjb25maWd1cmUgcm91dGVzIGRpcmVjdGx5IGluIHRoZSBQYWdlIGNsYXNzXG4gIGFkZFBhZ2VDbGFzcyhDbGFzcywgb3B0aW9uYWxQYXRoKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoQ2xhc3MsIG9wdGlvbmFsUGF0aCk7XG5cbiAgICAvLyBoYW5kbGUgb3B0aW9uYWwgcGF0aFxuICAgIGlmIChvcHRpb25hbFBhdGgpIHRoaXMuYWRkUGFnZUNsYXNzUGF0aChDbGFzcywgb3B0aW9uYWxQYXRoKTtcblxuICAgIC8vIGFkZCByb3V0ZXMgZnJvbSBwYWdlIGNsYXNzXG4gICAgKENsYXNzLnJvdXRlcyB8fCBbXSkuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgIGlmIChvcHRpb25hbFBhdGggPT09IHBhdGgpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLnJvdXRlc1twYXRoXSkgdGhyb3cgRXJyb3IoYFBhdGggYWxyZWFkeSBleGlzdHM6ICR7cGF0aH1gKTtcbiAgICAgIHRoaXMuY2xhc3NSZWZlcmVuY2VbY2xhc3NOYW1lXSA9IENsYXNzO1xuICAgICAgdGhpcy5yb3V0ZXNbcGF0aF0gPSBjbGFzc05hbWU7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQYWdlQ2xhc3NQYXRoKENsYXNzLCBwYXRoKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoQ2xhc3MsIHBhdGgpO1xuICAgIGlmICh0aGlzLnJvdXRlc1twYXRoXSkgdGhyb3cgRXJyb3IoYFBhdGggYWxyZWFkeSBleGlzdHM6ICR7b3B0aW9uYWxQYXRofWApO1xuICAgIHRoaXMuY2xhc3NSZWZlcmVuY2VbY2xhc3NOYW1lXSA9IENsYXNzO1xuICAgIHRoaXMucm91dGVzW3BhdGhdID0gY2xhc3NOYW1lO1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lKENsYXNzLCBwYXRoKSB7XG4gICAgY29uc3QgY2xhc3NNYXRjaCA9IHRoaXMucGFnZUNsYXNzbmFtZVJlZ2V4LmV4ZWMoQ2xhc3MpO1xuICAgIHJldHVybiBjbGFzc01hdGNoID8gY2xhc3NNYXRjaFsxXSA6IHBhdGguc3BsaXQoJy8nKS5wb3AoKS5yZXBsYWNlKCcuanMnLCAnJyk7XG4gIH1cblxuICBzZXRSb290KGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLnJvdXRlc1tjbGFzc05hbWVdKSB7XG4gICAgICBjb25zdCBDbGFzcyA9IHRoaXMuY2xhc3NSZWZlcmVuY2VbdGhpcy5yb3V0ZXNbY2xhc3NOYW1lXV07XG4gICAgICB0aGlzLmFkZFBhZ2VDbGFzc1BhdGgoQ2xhc3MsICcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNsYXNzTmFtZSBpcyBhY3R1YWxseSBjbGFzcyBpbiB0aGlzIGNhc2VcbiAgICAgIHRoaXMuYWRkUGFnZUNsYXNzUGF0aChjbGFzc05hbWUsICcvJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0NDA0KHsgQ2xhc3MgfSkge1xuICAgIGlmIChDbGFzcykgdGhpcy5fbm90Rm91bmRSb3V0ZUNsYXNzID0gQ2xhc3M7XG4gIH1cblxuICAvKiBIaWRlIGFsbCB0b3AgbGV2ZWwgZWxlbWVudHMgZXhjZXB0IGZvciB0aGUgcGFnZS1jb250YWluZXJcbiAgICovXG4gIHNob3dQYWdlT25seSgpIHtcbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1jb250YWluZXInKTtcbiAgICBjb25zdCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGxldCBub2RlID0gcGFnZUNvbnRhaW5lcjtcbiAgICBsZXQgc2libGluZztcbiAgICBsZXQgZGlyZWN0UGF0ZW50ID0gcGFnZUNvbnRhaW5lcjtcblxuICAgIHdoaWxlIChub2RlLnBhcmVudE5vZGUgJiYgbm9kZS5wYXJlbnROb2RlICE9PSBodG1sKSB7XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgc2libGluZyA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgIHdoaWxlIChzaWJsaW5nKSB7XG4gICAgICAgIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSAxICYmIHNpYmxpbmcgIT09IGRpcmVjdFBhdGVudCkge1xuICAgICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnbWR3LWhpZGUtbm9uLXBhZ2UtY29udGFpbmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmdcbiAgICAgIH1cbiAgICAgIGRpcmVjdFBhdGVudCA9IG5vZGU7XG4gICAgfVxuICAgIHRoaXMuYWRkUGFnZUhpZGVDU1MoKTtcbiAgICB0aGlzLl9pc1Nob3dpbmdQYWdlT25seSA9IHRydWU7XG4gIH1cblxuICAvKiB1bi1oaWRlIG5vbiBwYWdlLWNvbnRhaW5lciBlbGVtZW50c1xuICAgKi9cbiAgdW5kb1Nob3dQYWdlT25seSgpIHtcbiAgICBpZiAodGhpcy5faXNTaG93aW5nUGFnZU9ubHkgPT09IHRydWUpIHtcbiAgICAgIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWR3LWhpZGUtbm9uLXBhZ2UtY29udGFpbmVyJykgfHwgW11dLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWhpZGUtbm9uLXBhZ2UtY29udGFpbmVyJykpO1xuICAgICAgdGhpcy5faXNTaG93aW5nUGFnZU9ubHkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0gcHJpdmF0ZSAtLS1cblxuICBfcmVzb2x2ZShldmVudCwgaW5pdGlhbCA9IGZhbHNlKSB7XG4gICAgY29uc3QgeyBvbGRVUkwsIG5ld1VSTCB9ID0gZXZlbnQgfHwge307XG5cbiAgICAvLyBubyBjaGFuZ2VcbiAgICBpZiAoaW5pdGlhbCA9PT0gZmFsc2UgJiYgb2xkVVJMICE9PSB1bmRlZmluZWQgJiYgb2xkVVJMID09PSBuZXdVUkwpIHJldHVybjtcblxuICAgIGNvbnN0IGludGVyY2VwdGVyVmFsdWUgPSB0aGlzLmludGVyY2VwdGVyID8gdGhpcy5pbnRlcmNlcHRlcihuZXdVUkwsIG9sZFVSTCkgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGludGVyY2VwdGVyVmFsdWUgJiYgaW50ZXJjZXB0ZXJWYWx1ZS50aGVuICYmIHR5cGVvZiBpbnRlcmNlcHRlclZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIGNvbnNvbGUuZXJyb3IoJ3lvdSBjYW5ub3QgcmV0dXJuIGEgUHJvbWlzZSB0byB0aGUgcm91dGVyLmludGVyY2VwdGVyIGNhbGxiYWNrLiBFeHBlY3RpbmcgZWl0aGVyIHRydWUgb3IgZmFsc2UnKTtcbiAgICBpZiAoaW50ZXJjZXB0ZXJWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmdvKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGF0aCA9IHRoaXMucGF0aDtcbiAgICBjb25zdCBtYXRjaCA9IHRoaXMuX21hdGNoKHBhdGgpO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgaWYgKHRoaXMuX25vdEZvdW5kUm91dGVDbGFzcykgcmV0dXJuIHRoaXMuX2NoYW5nZVBhZ2UodGhpcy5fbm90Rm91bmRSb3V0ZUNsYXNzKTtcbiAgICAgIGVsc2UgcmV0dXJuIGNvbnNvbGUud2Fybignbm8gcGFnZSBmb3VuZCBhbmQgbm8gZGVmYXVsdCBub3QgZm91bmQgcGFnZSBzZXR1cCcpO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSBwYXRoO1xuICAgIGlmIChpbml0aWFsICYmIHRoaXMuX3BhZ2VJc1ByZVJlbmRlcmVkKCkpIHJldHVybjtcblxuICAgIGxldCBHRVRQYXJhbWV0ZXJzID0gdGhpcy5fZXh0cmFjdFNlYXJjaFBhcmFtZXRlcnModGhpcy5fY2xlYW4od2luZG93LmxvY2F0aW9uLmhyZWYpKTtcbiAgICBpZiAoR0VUUGFyYW1ldGVycykgdXJsICs9IGA/JHtHRVRQYXJhbWV0ZXJzfWA7XG5cbiAgICAvLyBwcmV2ZW50IHBhZ2UgY2hhbmdlIHdoZW4gbm8gZGlmZmVyZW5jZSBleGlzdHNcbiAgICAvLyB0aGlzIHdpbGwgY292ZXIgdGhlIGNhc2Ugb2YgYWRkaW5nIHRoZSAjLyB0byB0aGUgdXJsXG4gICAgaWYgKG9sZFVSTCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1cmxEaWZmID0gb2xkVVJMLmxlbmd0aCA+IG5ld1VSTC5sZW5ndGggPyBvbGRVUkwucmVwbGFjZShuZXdVUkwsICcnKSA6IG5ld1VSTC5yZXBsYWNlKG9sZFVSTCwgJycpO1xuICAgICAgaWYgKHVybERpZmYgPT09ICcnIHx8IHVybERpZmYgPT09ICcjLycpIHJldHVyblxuICAgIH1cblxuICAgIC8vIHByZXZlbnQgcGFnZSBmcm9tIGxvYWRpbmcgb24gaW5pdGlhbCByZW5kZXJcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlUGFnZShtYXRjaCk7XG4gIH1cblxuICBfd2F0Y2hGb3JDb25uZWN0KCkge1xuICAgIGNvbnN0IHJlbmRlckJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1yZW5kZXItYmxvY2s6bm90KC5wcmV2aW91cyknKTtcbiAgICB0aGlzLl9fbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHJlbmRlckJsb2NrLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgfVxuXG4gIF9zdG9wV2F0Y2hpbmdGb3JDb25uZWN0KCkge1xuICAgIHRoaXMuX19tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIC8vIGNoZWNrIGFsbCBwb3NzaWJsZSBzY3JvbGwgZWxlbWVudHMgYW5kIHJlc2V0IHRoZW1cbiAgcmVzZXRQYWdlU2Nyb2xsKCkge1xuICAgIGNvbnN0IHBhZ2VDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LXBhZ2UgbWR3LXBhZ2UtY29udGVudCcpO1xuICAgIGlmIChwYWdlQ29udGVudCAmJiBwYWdlQ29udGVudC5zY3JvbGxUb3AgPiAwKSByZXR1cm4gcGFnZUNvbnRlbnQuc2Nyb2xsVG9wID0gMDtcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZSBtZHctY29udGVudCcpO1xuICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuc2Nyb2xsVG9wID4gMCkgcmV0dXJuIGNvbnRlbnQuc2Nyb2xsVG9wPSAwO1xuXG4gICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlJyk7XG4gICAgaWYgKHBhZ2UgJiYgcGFnZS5zY3JvbGxUb3AgPiAwKSByZXR1cm4gcGFnZS5zY3JvbGxUb3AgPSAwO1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBpZiAoYm9keS5zY3JvbGxUb3AgPiAwKSByZXR1cm4gYm9keS5zY3JvbGxUb3AgPSAwO1xuXG4gICAgY29uc3QgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGlmIChkb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMCkgcmV0dXJuIGRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG5cbiAgX2NoYW5nZVBhZ2UoeyBDbGFzcyB9KSB7XG4gICAgaWYgKCFDbGFzcykgdGhyb3cgRXJyb3IoJ25vIGNsYXNzIGZvdW5kJyk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1jb250YWluZXInKTtcbiAgICBpZiAoIXBhZ2VDb250YWluZXIpIHRocm93IEVycm9yKCc8cGFnZS1jb250YWluZXI+IHJlcXVpcmVkIGZvciByb3V0ZXIgdG8gd29yaycpO1xuXG4gICAgLy9cbiAgICB0aGlzLl9zdG9wV2F0Y2hpbmdGb3JDb25uZWN0KCk7XG4gICAgdGhpcy51bmRvU2hvd1BhZ2VPbmx5KCk7XG5cbiAgICBjb25zdCByZW5kZXJCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrJyk7XG5cbiAgICAvLyAtLS0gaW5pdGFsIHBhZ2UgLS0tXG4gICAgLy8gQSBwYWdlIGNhbiBoYXZlIG5vIHByZS1yZW5kZXJlZCBwYWdlcy5cbiAgICAvLyBjcmVhdGUgcmVuZGVyLWJsb2NrIGFuZCByZW5kZXIgcGFnZSBpbW1pZGlhdGx5XG4gICAgaWYgKCFyZW5kZXJCbG9jaykge1xuICAgICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYWdlLXJlbmRlci1ibG9jaycpKTtcblxuICAgICAgLy8gY3JlYXRlIHBhZ2UgY2xhc3MgaW5zdGFuY2VcbiAgICAgIHdpbmRvdy5hY3RpdmVQYWdlID0gbmV3IENsYXNzKCk7XG4gICAgICB0aGlzLl93YXRjaEZvckNvbm5lY3QoKTtcbiAgICAgIHdpbmRvdy5hY3RpdmVQYWdlLnJlbmRlcigpO1xuICAgICAgdGhpcy5yZXNldFBhZ2VTY3JvbGwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyAtLS0gbm8gdHJhbnNpdG9uIC0tLVxuICAgIC8vIGNoYW5nZSBwYWdlIGltbWlkZWF0bHkgaWYgdHJhbnNpdGlvbnMgYXJlIG5vdCBvblxuICAgIGlmICghdGhpcy5fdHJhbnNpdGlvblBhZ2VzKSB7XG4gICAgICB3aW5kb3cuYWN0aXZlUGFnZS5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuXG4gICAgICAvLyBjcmVhdGUgcGFnZSBjbGFzcyBpbnN0YW5jZVxuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UgPSBuZXcgQ2xhc3MoKTtcbiAgICAgIHRoaXMuX3dhdGNoRm9yQ29ubmVjdCgpO1xuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UucmVuZGVyKCk7XG4gICAgICB0aGlzLnJlc2V0UGFnZVNjcm9sbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8tLS0gdHJhbnNpdG9uIC0tLVxuXG4gICAgLy8gcHJlcCBmb3IgY3VycmVudCBwYWdlIHRyYW5zaXRpb24gb3V0XG4gICAgcmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgncHJldmlvdXMnKTtcbiAgICByZW5kZXJCbG9jay5jbGFzc0xpc3QuYWRkKCdiZWZvcmUtdHJhbnNpdGlvbi1wYWdlLW91dCcpO1xuICAgIHdpbmRvdy5hY3RpdmVQYWdlLl9kaXNhYmxlUmVuZGVyID0gdHJ1ZTtcbiAgICB3aW5kb3cuYWN0aXZlUGFnZS5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuXG4gICAgLy8gYnVpbGQgbmV4dCBwYWdlIGFuZCBwcmVwIGZvciB0cmFuc2l0aW9uXG4gICAgY29uc3QgbmV4dFJlbmRlckJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFnZS1yZW5kZXItYmxvY2snKTtcbiAgICBuZXh0UmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgnYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1pbicpO1xuICAgIHJlbmRlckJsb2NrLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBuZXh0UmVuZGVyQmxvY2spO1xuXG4gICAgY29uc3QgcGFnZUluc3RhbmNlID0gbmV3IENsYXNzKCk7XG4gICAgd2luZG93LmFjdGl2ZVBhZ2UgPSBwYWdlSW5zdGFuY2U7XG4gICAgdGhpcy5fd2F0Y2hGb3JDb25uZWN0KCk7XG4gICAgcGFnZUluc3RhbmNlLnJlbmRlcigpO1xuXG4gICAgY29uc3QgcGFnZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGl0bGUnKTtcbiAgICBpZiAocGFnZVRpdGxlKSBwYWdlVGl0bGUuaW5uZXJUZXh0ID0gcGFnZUluc3RhbmNlLnRpdGxlO1xuXG4gICAgLy8gLS0tIHRyYW5zaXRpb24gLS0tXG4gICAgcGFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbi10cmFuc2l0aW9uJyk7XG5cbiAgICAvLyBDT05USU5VRVxuICAgIHJlbmRlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24tcGFnZS1vdXQnKTtcbiAgICBuZXh0UmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbi1wYWdlLWluJyk7XG5cbiAgICByZW5kZXJCbG9jay5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25Db21wbGV0ZSk7XG4gICAgbmV4dFJlbmRlckJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkNvbXBsZXRlKTtcbiAgfVxuXG4gIF9vblRyYW5zaXRpb25Db21wbGV0ZSh7IHRhcmdldCB9KSB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkNvbXBsZXRlKTtcbiAgICAvLyByZW1vdmUgb2xkIHBhZ2VcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndHJhbnNpdGlvbi1wYWdlLW91dCcpKSB0YXJnZXQucmVtb3ZlKCk7XG4gICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBzdGF0ZSBmcm9tIG5ldyBwYWdlXG4gICAgZWxzZSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1pbicpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb24tcGFnZS1pbicpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB0cmFuc2l0aW9uIHN0YXRlIGZyb20gcGFnZSBjb250YWluZXJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrLnByZXZpb3VzJykgJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrLm5leHQnKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdpbi10cmFuc2l0aW9uJyk7XG4gICAgfVxuICB9XG5cblxuICBfcGFnZUlzUHJlUmVuZGVyZWQoKSB7XG4gICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jaycpO1xuICAgIGlmIChyZW5kZXJCbG9jayAmJiByZW5kZXJCbG9jay5jaGlsZHJlbi5sZW5ndGggPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfY2xlYW4oc3RyKSB7XG4gICAgaWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHM7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXC8rJC8sICcnKS5yZXBsYWNlKC9eXFwvKy8sICcvJyk7XG4gIH1cblxuICBfZXh0cmFjdFNlYXJjaFBhcmFtZXRlcnModXJsKSB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgvXFw/KC4qKT8kLykuc2xpY2UoMSkuam9pbignJyk7XG4gIH1cblxuXG5cbiAgLy8gLS0tIG1hdGNoaW5nIC0tLVxuXG4gIF9tYXRjaChwYXRoKSB7XG4gICAgbGV0IG1hdGNoZWQgPSB0aGlzLl9maW5kTWF0Y2hlZFJvdXRlcyhwYXRoKTtcbiAgICBpZiAoIW1hdGNoZWQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZWxzZSBpZiAobWF0Y2hlZC5sZW5ndGggPT09IDEpIHJldHVybiBtYXRjaGVkWzBdO1xuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIG1hdGNoZWQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYi5wYXJhbXMpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9KVswXTtcbiAgICB9XG4gIH1cblxuICBfZmluZE1hdGNoZWRSb3V0ZXModXJsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucm91dGVzKVxuICAgICAgLm1hcChyb3V0ZSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucm91dGVzW3JvdXRlXTtcbiAgICAgICAgY29uc3QgeyByZWdleHAsIHBhcmFtTmFtZXMgfSA9IHRoaXMuX3JlcGxhY2VEeW5hbWljVVJMUGFydHModGhpcy5fY2xlYW4ocm91dGUpKTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB1cmwucmVwbGFjZSgvXlxcLysvLCAnLycpLm1hdGNoKHJlZ2V4cCk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX3JlZ0V4cFJlc3VsdFRvUGFyYW1zKG1hdGNoLCBwYXJhbU5hbWVzKTtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSB0aGlzLmNsYXNzUmVmZXJlbmNlW2NsYXNzTmFtZV07XG5cbiAgICAgICAgcmV0dXJuICFtYXRjaCA/IGZhbHNlIDoge1xuICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgIHJvdXRlLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgQ2xhc3NcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKG0gPT4gbSAmJiBtLm1hdGNoWzBdICE9PSAnJyk7XG4gIH1cblxuICBfcmVwbGFjZUR5bmFtaWNVUkxQYXJ0cyhyb3V0ZSkge1xuICAgIGxldCBwYXJhbU5hbWVzID0gW107XG4gICAgbGV0IHJlZ2V4cCA9ICcnO1xuXG4gICAgaWYgKHJvdXRlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZWdleHAgPSByb3V0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICAgdGhpcy5fY2xlYW4ocm91dGUpXG4gICAgICAgICAgLnJlcGxhY2UodGhpcy5QQVJBTUVURVJfUkVHRVhQLCAoZnVsbCwgZG90cywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1OYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFA7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAucmVwbGFjZSh0aGlzLldJTERDQVJEX1JFR0VYUCwgdGhpcy5SRVBMQUNFX1dJTERDQVJEKSArIHRoaXMuRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQLCB0aGlzLk1BVENIX1JFR0VYUF9GTEFHU1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVnZXhwLCBwYXJhbU5hbWVzIH07XG4gIH1cblxuICBfcmVnRXhwUmVzdWx0VG9QYXJhbXMobWF0Y2gsIG5hbWVzKSB7XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG1hdGNoXG4gICAgICAuc2xpY2UoMSwgbWF0Y2gubGVuZ3RoKVxuICAgICAgLnJlZHVjZSgocGFyYW1zLCB2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCkgcGFyYW1zID0ge307XG4gICAgICAgIHBhcmFtc1tuYW1lc1tpbmRleF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH0sIG51bGwpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV0Jhbm5lciBmcm9tICcuL3NlcnZpY2UuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1iYW5uZXInLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBgLSR7dGhpcy5jbGllbnRIZWlnaHQgKyAxfXB4YDtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgTURXQmFubmVyLmFkZCh0aGlzKTtcbiAgfVxuXG4gIGRpc21pc3MoKSB7XG4gICAgTURXQmFubmVyLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIGFjY2VwdCgpIHtcbiAgICBNRFdCYW5uZXIuYWNjZXB0KHRoaXMpO1xuICB9XG5cbiAgX3Nob3coKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdycpO1xuICB9XG5cbiAgX2Rpc3NtaXNzKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihNRFdVdGlscy50cmFuc2l0aW9uRXZlbnROYW1lLCBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKE1EV1V0aWxzLnRyYW5zaXRpb25FdmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgc2VsZi5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1kaXNtaXNzJyk7XG4gICAgdGhpcy5kaXNwYXRjaENsb3NlKCk7XG4gIH1cblxuICBkaXNwYXRjaENsb3NlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Nsb3NlJykpO1xuICB9XG59KTtcbiIsImltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY29uc3QgTURXQmFubmVyID0gbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICB9XG5cbiAgYWRkKGVsLCByZXNvbHZlcikge1xuICAgIHRoaXMucXVldWUucHVzaCh7ZWwsIHJlc29sdmVyfSk7XG4gICAgdGhpcy5oYW5kbGVRdWV1ZSgpO1xuICB9XG5cbiAgcmVtb3ZlKGVsKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQuZWwgPT09IGVsKSB7XG4gICAgICB0aGlzLmN1cnJlbnQucmVzb2x2ZXIoZmFsc2UpO1xuICAgICAgZWwuX2Rpc3NtaXNzKCk7XG4gICAgfSBlbHNlIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihlID0+IGUuZWwgIT09IGVsKTtcbiAgfVxuXG4gIGFjY2VwdChlbCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmVsID09PSBlbCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJlc29sdmVyKHRydWUpO1xuICAgICAgZWwuX2Rpc3NtaXNzKCk7XG4gICAgfSBlbHNlIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihlID0+IGUuZWwgIT09IGVsKTtcbiAgfVxuXG4gIGhhbmRsZVF1ZXVlKCkge1xuICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgIHRoaXMuY3VycmVudC5lbC5fc2hvdygpO1xuICAgICAgdGhpcy5jdXJyZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlUXVldWUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZSh7IG1lc3NhZ2UsIGRpc21pc3NMYWJlbCA9IFwiZGlzbWlzc1wiLCBhY2NlcHRMYWJlbCA9IG51bGwsIHRlbXBsYXRlLCBwYXJlbnQgfSkge1xuICAgIGlmICghbWVzc2FnZSAmJiAhdGVtcGxhdGUpIHRocm93IEVycm9yKCdFaXRoZXIgYG1lc3NhZ2VgIG9yIGB0ZW1wbGF0ZWAgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoIXRlbXBsYXRlICYmICFkaXNtaXNzTGFiZWwgJiYgIWFjY2VwdExhYmVsKSB0aHJvdyBFcnJvcignV2hlbiBub3QgdXNpbmcgYSBgdGVtcGxhdGVgIHlvdSBhcmUgcmVxdWlyZWQgdG8gcHJvdmlkZSBlaXRoZXIgYSBgZGlzbWlzc0xhYmVsYCBvciBhbiBgYWNjZXB0TGFiZWxgJyk7XG5cbiAgICBjb25zdCB1aWQgPSBNRFdVdGlscy51aWQoKTtcbiAgICBpZiAoIXRlbXBsYXRlKSB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUobWVzc2FnZSwgZGlzbWlzc0xhYmVsLCBhY2NlcHRMYWJlbCwgdWlkKTtcblxuICAgIC8vIHRyeSB0byBmaW5kIHRoZSBjb3JyZWN0IHBhcmVudCBpZiBub3QgcGFzc2VkIGluXG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LXBhZ2UgPiBtZHctdG9wLWFwcC1iYXInKTtcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZScpO1xuICAgIGlmICghcGFyZW50RWxlbWVudCkgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIGxldCBiYW5uZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnRFbGVtZW50Lm5vZGVOYW1lID09PSAnTURXLVRPUC1BUFAtQkFSJykge1xuICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgdGVtcGxhdGUpO1xuICAgICAgYmFubmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1kdy1iYW5uZXIjJHt1aWR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgdGVtcGxhdGUpO1xuICAgICAgYmFubmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1kdy1iYW5uZXIjJHt1aWR9YCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVyO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHJlc29sdmVyID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIC8vIE5PVEUgbWF5IG5lZWQgdGltZW91dFxuICAgIHRoaXMuYWRkKGJhbm5lckVsZW1lbnQsIHJlc29sdmVyKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHRlbXBsYXRlKG1lc3NhZ2UsIGRpc21pc3NMYWJlbCwgYWNjZXB0TGFiZWwsIHVpZCkge1xuICAgIHJldHVybiBgXG4gICAgICA8bWR3LWJhbm5lciBpZD1cIiR7dWlkfVwiIGNsYXNzPVwibWR3LWVsZXZhdGlvbi0xXCI+XG4gICAgICAgIDxkaXY+JHttZXNzYWdlfTwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICR7ZGlzbWlzc0xhYmVsID8gYDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke3VpZH0uZGlzbWlzcygpXCIgY2xhc3M9XCJtZHctc2Vjb25kYXJ5XCI+JHtkaXNtaXNzTGFiZWx9PC9tZHctYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgICAke2FjY2VwdExhYmVsID8gYDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke3VpZH0uYWNjZXB0KClcIiBjbGFzcz1cIm1kdy1zZWNvbmRhcnlcIj4ke2FjY2VwdExhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tZHctYmFubmVyPlxuICAgIGA7XG4gIH1cbn1cblxud2luZG93Lk1EV0Jhbm5lciA9IE1EV0Jhbm5lcjtcblxuZXhwb3J0IGRlZmF1bHQgTURXQmFubmVyO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCB7IGlzUGhvbmVBbmRUYWJsZXQgfSBmcm9tICcuLi8uLi9jb3JlL21vYmlsZS1pbmZvLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctYm90dG9tLW5hdmlnYXRpb24nLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghaXNQaG9uZUFuZFRhYmxldCAmJiB0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LW1vYmlsZS1vbmx5JykpIHtcbiAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSA9IHRoaXMucm91dGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWR3LWhhcy1ib3R0b20tbmF2aWdhdGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmJvdW5kX3JvdXRlQ2hhbmdlKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmJvdW5kX3JvdXRlQ2hhbmdlKTtcbiAgfVxuXG4gIGdldCBwYXRoKCkge1xuICAgIGxldCBwYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgvLiojLywgJycpO1xuICAgIGlmIChwYXRoLmluZGV4T2YoJz8nKSA+IC0xKSBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdO1xuICAgIGlmIChwYXRoLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRoID0gJy8nICsgcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHJvdXRlQ2hhbmdlKCkge1xuICAgIC8vIHJlbW92ZSBjdXJyZW50IGxpbmtzXG4gICAgY29uc3QgY3VycmVudExpbmtzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCcubWR3LWN1cnJlbnQtbGluaycpO1xuICAgIGN1cnJlbnRMaW5rcy5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1jdXJyZW50LWxpbmsnKSk7XG5cbiAgICAvLyBhZGQgY3VycmVudCBsaW5rc1xuICAgIGxldCBtYXRjaGluZ0xpbmtzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKGBbaHJlZj1cIiMke3RoaXMucGF0aH1cIl1gKTtcbiAgICBpZiAoIW1hdGNoaW5nTGlua3MgfHwgbWF0Y2hpbmdMaW5rcy5sZW5ndGggPT09IDApIG1hdGNoaW5nTGlua3MgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoYFthbHQtaHJlZj1cIiMke3RoaXMucGF0aH1cIl1gKTtcbiAgICBtYXRjaGluZ0xpbmtzLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCgnbWR3LWN1cnJlbnQtbGluaycpKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1ib3VuZC1wcm9wZXJ0eScsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9wcm9wZXJ0eSA9IHRoaXMuaW5uZXJIVE1MO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLl92YWx1ZSA9IHdpbmRvdy5hY3RpdmVQYWdlW3RoaXMuX3Byb3BlcnR5XTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LmFjdGl2ZVBhZ2UsIHRoaXMuX3Byb3BlcnR5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgXG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGF0Ll92YWx1ZTtcbiAgICAgIH0sXG5cbiAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICB0aGF0Ll92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGF0LmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctYnV0dG9uJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2FzeW5jQ2xpY2sgPSB0aGlzLmFzeW5jQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2hyZWZDbGljayA9IHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9jaGVja0hSRUZBY3RpdmUgPSB0aGlzLmNoZWNrSFJFRkFjdGl2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICAgIHRoaXMuc2V0dXBBc3luYygpO1xuICAgIHRoaXMuY29ubmVjdEhSRUYoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaHJlZkNsaWNrKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfY2hlY2tIUkVGQWN0aXZlKTtcbiAgfVxuXG4gIGdldCBzcGlubmVyQ29udGFpbmVyKCkge1xuICAgIGlmICghdGhpcy5fc3Bpbm5lckNvbnRhaW5lcikgdGhpcy5fc3Bpbm5lckNvbnRhaW5lciA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNwaW5uZXItY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIHRoaXMuX3NwaW5uZXJDb250YWluZXI7XG4gIH1cblxuICBnZXQgcGVuZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZztcbiAgfVxuXG4gIHNldHVwQXN5bmMoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LWFzeW5jJykpIHJldHVybjtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9hc3luY0NsaWNrKTtcbiAgfVxuXG4gIHJlc29sdmUoKSB7XG4gICAgaWYgKHRoaXMuX3BlbmRpbmcgPT09IGZhbHNlKSByZXR1cm47XG4gICAgdGhpcy5fcGVuZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVNwaW5uZXIoKTtcbiAgfVxuXG4gIGFzeW5jQ2xpY2soZSkge1xuICAgIGlmICh0aGlzLl9wZW5kaW5nID09PSB0cnVlKSByZXR1cm47XG4gICAgdGhpcy5fcGVuZGluZyA9IHRydWU7XG4gICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICB9XG5cbiAgc2hvd1NwaW5uZXIoKSB7XG4gICAgdGhpcy5fc2hvd1NwaW5uZXIgPSB0cnVlO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNob3ctc3Bpbm5lcicpO1xuICAgIGNvbnN0IGlzV2hpdGUgPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LXByaW1hcnknKSB8fCB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LXNlY29uZGFyeScpIHx8IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZXJyb3InKTtcbiAgICB0aGlzLnNwaW5uZXJDb250YWluZXIuaW5uZXJIVE1MID0gYDxtZHctY2lyY3VsYXItcHJvZ3Jlc3MgbWR3LW1vZGU9XCJpbmRldGVybWluYXRlXCIgbWR3LWRpYW1ldGVyPVwiMjRcIiBjbGFzcz1cIiR7aXNXaGl0ZSA/ICdtZHctd2hpdGUnIDogJ21kdy1ncmV5J31cIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTsgdG9wOiA2cHg7XCI+PC9tZHctY2lyY3VsYXItcHJvZ3Jlc3M+YDtcbiAgfVxuXG4gIGhpZGVTcGlubmVyKCkge1xuICAgIHRoaXMuX3Nob3dTcGlubmVyID0gZmFsc2U7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctc2hvdy1zcGlubmVyJyk7XG4gICAgdGhpcy5zcGlubmVyQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgY29ubmVjdEhSRUYoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSByZXR1cm47XG4gICAgdGhpcy5jaGVja0hSRUZBY3RpdmUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfY2hlY2tIUkVGQWN0aXZlKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9ocmVmQ2xpY2spO1xuICB9XG5cbiAgY2hlY2tIUkVGQWN0aXZlKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSkgcmV0dXJuO1xuICAgIGNvbnN0IGhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5sb2NhdGlvbi5oYXNoO1xuICAgIGlmIChocmVmID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8IGhyZWYgPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmLWFsdCcpKSB0aGlzLnNldEF0dHJpYnV0ZSgnYWN0aXZlJywgJ2FjdGl2ZScpO1xuICAgIGVsc2UgaWYgKGhhc2ggPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgaGFzaCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYtYWx0JykpIHRoaXMuc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAnYWN0aXZlJyk7XG4gICAgZWxzZSB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYWN0aXZlJyk7XG4gIH1cblxuICBocmVmQ2xpY2soKSB7XG4gICAgLy8gb3BlbiBpbiBuZXcgdGFiIC8gd2luZG93XG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSA9PT0gJ19ibGFuaycpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyksICdfYmxhbmsnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWR3LXNwaW5uZXItY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LWJ1dHRvbi1yaXBwbGVcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDg5MjllbTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm0sIG9wYWNpdHk7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMi4yNXJlbTtcbiAgICAgICAgcGFkZGluZzogMCA4cHggMCA4cHg7XG4gICAgICAgIGhlaWdodDogMzZweDtcbiAgICAgICAgbWluLXdpZHRoOiA2NHB4O1xuXG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtb24tcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbWZvcnRhYmxlKSxcbiAgICAgIDpob3N0KC5tZHctZGVuc2l0eS1jb21mb3J0YWJsZSkge1xuICAgICAgICBoZWlnaHQ6IDI4cHg7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIHBhZGRpbmc6IDAgOHB4IDAgOHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21wYWN0KSxcbiAgICAgIDpob3N0KC5tZHctZGVuc2l0eS1jb21wYWN0KSB7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgcGFkZGluZzogMCA0cHggMCA0cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctaWNvbik6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21mb3J0YWJsZSksXG4gICAgICA6aG9zdCgubWR3LWRlbnNpdHktY29tZm9ydGFibGUubWR3LWljb24pIHtcbiAgICAgICAgaGVpZ2h0OiAyOHB4O1xuICAgICAgICB3aWR0aDogMjhweDtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1pY29uKTpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbXBhY3QpLFxuICAgICAgOmhvc3QoLm1kdy1kZW5zaXR5LWNvbXBhY3QubWR3LWljb24pIHtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QtY29udGV4dCgubWR3LWRlbnNpdHktY29tZm9ydGFibGUpIC5tZHctc3Bpbm5lci1jb250YWluZXIgbWR3LWNpcmN1bGFyLXByb2dyZXNzLFxuICAgICAgOmhvc3QoLm1kdy1kZW5zaXR5LWNvbWZvcnRhYmxlKSAubWR3LXNwaW5uZXItY29udGFpbmVyIG1kdy1jaXJjdWxhci1wcm9ncmVzcyB7XG4gICAgICAgIHRvcDogMnB4ICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbXBhY3QpIC5tZHctc3Bpbm5lci1jb250YWluZXIgbWR3LWNpcmN1bGFyLXByb2dyZXNzLFxuICAgICAgOmhvc3QoLm1kdy1kZW5zaXR5LWNvbXBhY3QpIC5tZHctc3Bpbm5lci1jb250YWluZXIgbWR3LWNpcmN1bGFyLXByb2dyZXNzIHtcbiAgICAgICAgdG9wOiAwICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3Q6OmJlZm9yZSxcbiAgICAgIDpob3N0OjphZnRlciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgdG9wOiBjYWxjKDUwJSAtIDEwMCUpO1xuICAgICAgICBsZWZ0OiBjYWxjKDUwJSAtIDEwMCUpO1xuICAgICAgICB3aWR0aDogMjAwJTtcbiAgICAgICAgaGVpZ2h0OiAyMDAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZm9yZWdyb3VuZCk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0OjpiZWZvcmUge1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE1bXMgbGluZWFyLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yIDE1bXMgbGluZWFyO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCg6aG92ZXIpIHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuXG4gICAgICA6aG9zdChbZGlzYWJsZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtdGV4dC1kaXNhYmxlZC1vbi1iYWNrZ3JvdW5kKTtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cbiAgICAgIDpob3N0OjotbW96LWZvY3VzLWlubmVyIHtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCg6YWN0aXZlKSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctY29udGFpbmVkKSxcbiAgICAgIDpob3N0KC5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctdW5lbGV2YXRlZCkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtYmFja2dyb3VuZCk7XG4gICAgICAgIHBhZGRpbmc6IDAgMTZweCAwIDE2cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctY29udGFpbmVkKTo6YmVmb3JlLFxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWQpOjpiZWZvcmUsXG4gICAgICA6aG9zdCgubWR3LXVuZWxldmF0ZWQpOjpiZWZvcmUge1xuICAgICAgICBvcGFjaXR5OiAwLjA4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWNvbnRhaW5lZCksXG4gICAgICA6aG9zdCgubWR3LXJhaXNlZCkge1xuICAgICAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDJweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctY29udGFpbmVkOmhvdmVyKSxcbiAgICAgIDpob3N0KC5tZHctY29udGFpbmVkOmZvY3VzKSxcbiAgICAgIDpob3N0KC5tZHctcmFpc2VkOmhvdmVyKSxcbiAgICAgIDpob3N0KC5tZHctcmFpc2VkOmZvY3VzKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggNHB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDFweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWNvbnRhaW5lZDphY3RpdmUpLFxuICAgICAgOmhvc3QoLm1kdy1yYWlzZWQ6YWN0aXZlKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1jb250YWluZWRbZGlzYWJsZWRdKSxcbiAgICAgIDpob3N0KC5tZHctcmFpc2VkW2Rpc2FibGVkXSkge1xuICAgICAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDBweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzcpO1xuICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgcGFkZGluZzogMCAxNHB4IDAgMTRweDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2hhcGVkKSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLW1kdy10aGVtZS0tYnV0dG9uLXNoYXBlLXJhZGl1cywgMThweCk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctaWNvbikge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgcGFkZGluZzogMTJweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE5cHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIDpob3N0KC5tZHctaWNvbikgc3Bhbi50ZXh0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1ib3R0b20tbmF2aWdhdGlvbikge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDBweDtcbiAgICAgICAgd2lkdGg6IDU2cHg7XG4gICAgICAgIGhlaWdodDogNTZweDtcbiAgICAgICAgcGFkZGluZzogMjhweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOm5vdCgubWR3LWljb24pKSAudGV4dCA6OnNsb3R0ZWQobWR3LWljb24pIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6IDI4cHg7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICA6aG9zdCgubWR3LWljb24pIDo6c2xvdHRlZChtZHctaWNvbikge1xuICAgICAgICBsaW5lLWhlaWdodDogMTlweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIHdvcmQtd3JhcDogbm9ybWFsO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQobWR3LWljb24pIHtcbiAgICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICAgIGhlaWdodDogMThweDtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBtYXJnaW4tbGVmdDogLTRweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHg7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgICAgfVxuICAgICAgKi9cblxuICAgICAgOmhvc3QgOjpzbG90dGVkKHN2Zy5tZHctaWNvbikge1xuICAgICAgICBmaWxsOiBjdXJyZW50Q29sb3I7XG4gICAgICB9XG5cblxuICAgICAgLyogcHJpbWFyeSAqL1xuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctY29udGFpbmVkKSxcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctdW5lbGV2YXRlZCkgIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtcHJpbWFyeS1vbi1iYWNrZ3JvdW5kKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5Lm1kdy1vdXRsaW5lZCkge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KTo6YmVmb3JlLFxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KTo6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cblxuICAgICAgLyogc2Vjb25kYXJ5ICovXG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkubWR3LWNvbnRhaW5lZCksXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeS5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5Lm1kdy11bmVsZXZhdGVkKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtcHJpbWFyeS1vbi1iYWNrZ3JvdW5kKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkubWR3LW91dGxpbmVkKSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KTo6YmVmb3JlLFxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpOjphZnRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICAvKiBlcnJvciAqL1xuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yLm1kdy1jb250YWluZWQpLFxuICAgICAgOmhvc3QoLm1kdy1lcnJvci5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctZXJyb3IubWR3LXVuZWxldmF0ZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS10ZXh0LXByaW1hcnktb24tYmFja2dyb3VuZCk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IubWR3LW91dGxpbmVkKSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcik6OmJlZm9yZSxcbiAgICAgIDpob3N0KC5tZHctZXJyb3IpOjphZnRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpub3QoLm1kdy1ib3R0b20tbmF2aWdhdGlvbik6aG92ZXIpOjpiZWZvcmUge1xuICAgICAgICBvcGFjaXR5OiAwLjA0O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNob3ctc3Bpbm5lcikgc3Bhbi50ZXh0IHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgIH1cblxuICAgICAgLyogLS0tIFJpcHBsZSAtLS0gKi9cblxuICAgICAgLm1kdy1yaXBwbGUge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAubWR3LXJpcHBsZS5tZHctcmlwcGxlLXVuYm91bmRlZCB7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgfVxuXG4gICAgICAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtb24tcHJpbWFyeS0tcmdiKSwgMC4xNik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSwgdHJhbnNmb3JtIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1idXR0b24tcmlwcGxlLFxuICAgICAgLm1kdy1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cblxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1wcmltYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5Lm1kdy1jb250YWluZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQsXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkubWR3LXJhaXNlZCkgLm1kdy1yaXBwbGUtZWxlbWVudCxcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctdW5lbGV2YXRlZCkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5Lm1kdy1jb250YWluZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQsXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeS5tZHctcmFpc2VkKSAubWR3LXJpcHBsZS1lbGVtZW50LFxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkubWR3LXVuZWxldmF0ZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguZXJyb3IubWR3LWNvbnRhaW5lZCkgLm1kdy1yaXBwbGUtZWxlbWVudCxcbiAgICAgIDpob3N0KC5lcnJvci5tZHctcmFpc2VkKSAubWR3LXJpcHBsZS1lbGVtZW50LFxuICAgICAgOmhvc3QoLmVycm9yLm1kdy11bmVsZXZhdGVkKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtYmFja2dyb3VuZC0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cblxuICAgICAgLyogYm90dG9tIG5hdmlnYXRpb24gKi9cbiAgICAgIDpob3N0KC5tZHctYm90dG9tLW5hdmlnYXRpb24pIHNwYW4udGV4dCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xuICAgICAgfVxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctY2FyZCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctZWxldmF0aW9uLTEnKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1JpcHBsZSBmcm9tICcuLi8uLi9jb3JlL1JpcHBsZS5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWNoZWNrYm94JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBcbiAgICB0aGlzLmJvdW5kX2hhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICAgIHRoaXMuX2RlZmF1bHRJY29ucygpO1xuXG4gICAgdGhpcy5zdGF0ZSA9ICd1bmNoZWNrZWQnO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbmRldGVybWluYXRlJykpIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdjaGVja2VkJykpIHRoaXMuY2hlY2tlZCA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdtZHctbm8tcmlwcGxlJykpIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiBbdGhpc10sXG4gICAgICBjZW50ZXJlZDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaGFuZGxlQ2xpY2spO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaGFuZGxlQ2xpY2spO1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2NoZWNrZWQnLCAnaW5kZXRlcm1pbmF0ZSddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICBzZXQgc3RhdGUodmFsdWUpIHtcbiAgICBpZiAoIVsnY2hlY2tlZCcsICd1bmNoZWNrZWQnLCAnaW5kZXRlcm1pbmF0ZSddLmluY2x1ZGVzKHZhbHVlKSkgY29uc29sZS5lcnJvcihgaXZhbGlkIHN0YXRlIGZybyBjaGVja2JveCBcIiR7dmFsdWV9XCIuIE9ubHkgZXhjZXB0cyBcImNoZWNrZWRcIiwgXCJ1bmNoZWNrZWRcIiwgXCJpbmRldGVybWluYXRlXCJgKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbWR3LXN0YXRlJywgdmFsdWUpO1xuICAgIGNvbnN0IHN0YXRlQ2hhbmdlID0gdGhpcy5fc3RhdGUgIT09IHZhbHVlO1xuICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XG5cbiAgICBpZiAoc3RhdGVDaGFuZ2UgPT09IHRydWUpIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcbiAgfVxuXG4gIGdldCBjaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlID09PSAnY2hlY2tlZCc7XG4gIH1cblxuICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gJycpIHZhbHVlID0gdHJ1ZTtcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHRoaXMuc3RhdGUgPSAnY2hlY2tlZCc7XG4gICAgZWxzZSB0aGlzLnN0YXRlID0gJ3VuY2hlY2tlZCc7XG4gIH1cblxuICBnZXQgaW5kZXRlcm1pbmF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC5pbmRldGVybWluYXRlO1xuICB9XG5cbiAgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09ICcnKSB2YWx1ZSA9IHRydWU7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB0aGlzLnN0YXRlID0gJ2luZGV0ZXJtaW5hdGUnO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gIH1cblxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIGxldCBzdGF0ZUNoYW5nZSA9IGZhbHNlO1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgY2FzZSAnaW5kZXRlcm1pbmF0ZSc6XG4gICAgICAgIC8vIFRPRE8gd2hhdCBpcyB0aGUgY29ycmVjdCBhY3Rpb24gdG8gdGFrZSBoZXJlP1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2NoZWNrZWQnO1xuICAgICAgICBzdGF0ZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hlY2tlZCc6XG4gICAgICAgIHRoaXMuc3RhdGUgPSAndW5jaGVja2VkJztcbiAgICAgICAgc3RhdGVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VuY2hlY2tlZCc6XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnY2hlY2tlZCc7XG4gICAgICAgIHN0YXRlQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gaWYgKHN0YXRlQ2hhbmdlID09PSB0cnVlKSB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gIH1cbiAgXG5cbiAgLy8gYWRkIGRlZmF1bHQgaWNvbnMgaWYgbm9uZSBhcmUgcHJvdmlkZWRcbiAgX2RlZmF1bHRJY29ucygpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYFxuICAgICAgICA8bWR3LWljb24gbWR3LWNoZWNrZWQ+Y2hlY2tfYm94PC9tZHctaWNvbj5cbiAgICAgICAgPG1kdy1pY29uIG1kdy11bmNoZWNrZWQ+Y2hlY2tfYm94X291dGxpbmVfYmxhbms8L21kdy1pY29uPlxuICAgICAgICA8bWR3LWljb24gbWR3LWluZGV0ZXJtaW5hdGU+aW5kZXRlcm1pbmF0ZV9jaGVja19ib3g8L21kdy1pY29uPlxuICAgICAgYCk7XG4gICAgfVxuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIC8qIGh0bWwgKi9gXG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXJpcHBsZSBtZHctY2hlY2tib3gtcmlwcGxlXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgOmhvc3Qge1xuICAgICAgICAtLW1kdy1jaGVja2JveC1zaXplOiAyNHB4O1xuICAgICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgICAgIC13ZWJraXQtYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgd2lkdGg6IHZhcigtLW1kdy1jaGVja2JveC1zaXplKTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1tZHctY2hlY2tib3gtc2l6ZSk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgICAgICBwYWRkaW5nOiA4cHggMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1uby1wYWRkaW5nKSB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFtkaXNhYmxlZF0pIHtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QtY29udGV4dCgubWR3LWRlbnNpdHktY29tZm9ydGFibGUpLFxuICAgICAgOmhvc3QoLm1kdy1kZW5zaXR5LWNvbWZvcnRhYmxlKSB7XG4gICAgICAgIHBhZGRpbmc6IDlweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21wYWN0KSxcbiAgICAgIDpob3N0KC5tZHctZGVuc2l0eS1jb21wYWN0KSB7XG4gICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQobWR3LWljb24pIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgZm9udC1zaXplOiB2YXIoLS1tZHctY2hlY2tib3gtc2l6ZSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctbGFyZ2UpIHtcbiAgICAgICAgLS1tZHctY2hlY2tib3gtc2l6ZTogNDhweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSA6OnNsb3R0ZWQobWR3LWljb24pIHtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIDo6c2xvdHRlZChtZHctaWNvbikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIDo6c2xvdHRlZChtZHctaWNvbikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cbiAgICAgIFxuXG4gICAgICAvKiAtLS0gc3RhdGU6IGNoZWNrZWQgLS0tICovXG4gICAgICA6aG9zdChbbWR3LXN0YXRlPVwiY2hlY2tlZFwiXSkgOjpzbG90dGVkKG1kdy1pY29uW21kdy11bmNoZWNrZWRdKSxcbiAgICAgIDpob3N0KFttZHctc3RhdGU9XCJjaGVja2VkXCJdKSA6OnNsb3R0ZWQobWR3LWljb25bbWR3LWluZGV0ZXJtaW5hdGVdKSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC8qIC0tLSBzdGF0ZTogdW5jaGVja2VkIC0tLSAqL1xuICAgICAgOmhvc3QoW21kdy1zdGF0ZT1cInVuY2hlY2tlZFwiXSkgOjpzbG90dGVkKG1kdy1pY29uW21kdy1jaGVja2VkXSksXG4gICAgICA6aG9zdChbbWR3LXN0YXRlPVwidW5jaGVja2VkXCJdKSA6OnNsb3R0ZWQobWR3LWljb25bbWR3LWluZGV0ZXJtaW5hdGVdKSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC8qIC0tLSBzdGF0ZTogaW5kZXRlcm1pbmF0ZSAtLS0gKi9cbiAgICAgIDpob3N0KFttZHctc3RhdGU9XCJpbmRldGVybWluYXRlXCJdKSA6OnNsb3R0ZWQobWR3LWljb25bbWR3LWNoZWNrZWRdKSxcbiAgICAgIDpob3N0KFttZHctc3RhdGU9XCJpbmRldGVybWluYXRlXCJdKSA6OnNsb3R0ZWQobWR3LWljb25bbWR3LXVuY2hlY2tlZF0pIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLW9uLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICAubWR3LWNoZWNrYm94LXJpcHBsZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtcHJpbWFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWVycm9yLS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWNpcmN1bGFyLXByb2dyZXNzJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmluc2VydGVkRGlhbWV0ZXJzID0gW107XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmRpYW1ldGVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy1kaWFtZXRlcicpIHx8IDEwMDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuc3R5bGUud2lkdGggPSB0aGlzLnN0eWxlLmhlaWdodCA9IHRoaXMuZGlhbWV0ZXIgKyAncHgnO1xuICAgIGlmICh0aGlzLnZhbHVlKSB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3ZhbHVlJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IGRpYW1ldGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kaWFtZXRlcjtcbiAgfVxuICBzZXQgZGlhbWV0ZXIodmFsdWUpIHtcbiAgICB0aGlzLl9kaWFtZXRlciA9IHBhcnNlSW50KCgnJyt2YWx1ZSkucmVwbGFjZSgncHgnLCAnJykpO1xuICAgIGlmICghdGhpcy5pbnNlcnRlZERpYW1ldGVyc1t0aGlzLl9kaWFtZXRlcl0pIHtcbiAgICAgIHRoaXMuaW5zZXJ0ZWREaWFtZXRlcnMucHVzaCh0aGlzLl9kaWFtZXRlcik7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc3R5bGUnKS5zaGVldC5pbnNlcnRSdWxlKHRoaXMuX2dldEFuaW1hdGlvblRleHQoKSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN2ZygpIHtcbiAgICBpZiAoIXRoaXMuX3N2ZykgdGhpcy5fc3ZnID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgIHJldHVybiB0aGlzLl9zdmc7XG4gIH1cblxuICBnZXQgc3Ryb2tlV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cm9rZVdpZHRoIHx8IHRoaXMuZGlhbWV0ZXIgLyAxMDtcbiAgfVxuICBzZXQgc3RyaWtlV2lkdGgodmFsdWUpIHtcbiAgICB0aGlzLl9zdHJva2VXaWR0aCA9IHBhcnNlSW50KCgnJyt2YWx1ZSkucmVwbGFjZSgncHgnLCAnJykpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcGFyc2VJbnQoKCcnK3ZhbHVlKS5yZXBsYWNlKCdweCcsICcnKSkpKTtcbiAgICBpZiAodGhpcy5kaWFtZXRlciA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgdGhpcy5jaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9ICh0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlICogKDEwMCAtIHRoaXMuX3ZhbHVlKSAvIDEwMCkgKyAncHgnO1xuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctbW9kZScpID09PSAnZGV0ZXJtaW5hdGUnID8gJ2RldGVybWluYXRlJyA6ICdpbmRldGVybWluYXRlJztcbiAgfVxuXG4gIGdldCBjaXJjbGUoKSB7XG4gICAgaWYgKCF0aGlzLl9jaXJjbGUpIHRoaXMuX2NpcmNsZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdjaXJjbGUnKTtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlO1xuICB9XG5cbiAgZ2V0IF9jaXJjbGVSYWRpdXMoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRpYW1ldGVyIC0gMTApIC8gMjtcbiAgfVxuXG4gIGdldCBfY2lyY2xlU3Ryb2tlV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Ryb2tlV2lkdGggLyB0aGlzLmRpYW1ldGVyICogMTAwO1xuICB9XG5cbiAgZ2V0IF9zdHJva2VDaXJjdW1mZXJlbmNlKCkge1xuICAgIHJldHVybiAyICogTWF0aC5QSSAqIHRoaXMuX2NpcmNsZVJhZGl1cztcbiAgfVxuXG4gIGdldCBJTkRFVEVSTUlOQVRFX0FOSU1BVElPTl9URU1QTEFURSgpIHtcbiAgICByZXR1cm4gYFxuICAgICBAa2V5ZnJhbWVzIG1hdC1wcm9ncmVzcy1zcGlubmVyLXN0cm9rZS1yb3RhdGUtRElBTUVURVIge1xuICAgICAgICAwJSAgICAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGUoMCk7IH1cbiAgICAgICAgMTIuNSUgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlKDApOyB9XG4gICAgICAgIDEyLjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSg3Mi41ZGVnKTsgfVxuICAgICAgICAyNSUgICAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDcyLjVkZWcpOyB9XG4gICAgICAgIDI1LjAwMDElICAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpOyB9XG4gICAgICAgIDM3LjUlICAgeyBzdHJva2UtZGFzaG9mZnNldDogRU5EX1ZBTFVFOyAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpOyB9XG4gICAgICAgIDM3LjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7IH1cbiAgICAgICAgNTAlICAgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7IH1cbiAgICAgICAgNTAuMDAwMSUgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA2Mi41JSAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA2Mi41MDAxJSAgeyBzdHJva2UtZGFzaG9mZnNldDogRU5EX1ZBTFVFOyAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMjUxLjVkZWcpOyB9XG4gICAgICAgIDc1JSAgICAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMjUxLjVkZWcpOyB9XG4gICAgICAgIDc1LjAwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTsgfVxuICAgICAgICA4Ny41JSAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDg3LjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgzNDEuNWRlZyk7IH1cbiAgICAgICAgMTAwJSAgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgzNDEuNWRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgX2dldEFuaW1hdGlvblRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuSU5ERVRFUk1JTkFURV9BTklNQVRJT05fVEVNUExBVEVcbiAgICAgIC5yZXBsYWNlKC9TVEFSVF9WQUxVRS9nLCBgJHswLjk1ICogdGhpcy5fc3Ryb2tlQ2lyY3VtZmVyZW5jZX1gKVxuICAgICAgLnJlcGxhY2UoL0VORF9WQUxVRS9nLCBgJHswLjIgKiB0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlfWApXG4gICAgICAucmVwbGFjZSgvRElBTUVURVIvZywgYCR7dGhpcy5kaWFtZXRlcn1gKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3ZnIHN0eWxlPVwid2lkdGg6ICR7dGhpcy5kaWFtZXRlcn1weDsgaGVpZ2h0OiAke3RoaXMuZGlhbWV0ZXJ9cHg7XCI+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIjUwJVwiXG4gICAgICAgICAgY3k9XCI1MCVcIlxuICAgICAgICAgIHI9XCIke3RoaXMuX2NpcmNsZVJhZGl1c31cIlxuICAgICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgICBhbmltYXRpb24tbmFtZTogbWF0LXByb2dyZXNzLXNwaW5uZXItc3Ryb2tlLXJvdGF0ZS0ke3RoaXMuZGlhbWV0ZXJ9O1xuICAgICAgICAgICAgc3Ryb2tlLWRhc2hhcnJheTogJHt0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlfXB4O1xuICAgICAgICAgICAgc3Ryb2tlLXdpZHRoOiAke3RoaXMuX2NpcmNsZVN0cm9rZVdpZHRofSU7XG4gICAgICAgICAgXCJcbiAgICAgICAgICA+PC9jaXJjbGU+XG4gICAgICA8L3N2Zz5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIHN2ZyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgfVxuXG4gICAgICBjaXJjbGUge1xuICAgICAgICBmaWxsOiB0cmFuc3BhcmVudDtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiBzdHJva2UtZGFzaG9mZnNldCAyMjVtcyBsaW5lYXI7XG4gICAgICAgIHN0cm9rZTogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXdoaXRlKSBjaXJjbGUge1xuICAgICAgICBzdHJva2U6IHdoaXRlO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWdyZXkpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogZ3JleTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW21kdy1tb2RlPSdpbmRldGVybWluYXRlJ10pIHtcbiAgICAgICAgYW5pbWF0aW9uOiBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lci1saW5lYXItcm90YXRlIDIwMDBtcyBsaW5lYXIgaW5maW5pdGU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFttZHctbW9kZT0naW5kZXRlcm1pbmF0ZSddKSBjaXJjbGUge1xuICAgICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBzdHJva2U7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwMG1zO1xuICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSk7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG1hdC1wcm9ncmVzcy1zcGlubmVyLWxpbmVhci1yb3RhdGUge1xuICAgICAgICAwJSAgICAgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgICAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG1hdC1wcm9ncmVzcy1zcGlubmVyLXN0cm9rZS1yb3RhdGUtMTAwIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gICAgICAgIH1cbiAgICAgICAgMTIuNSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gICAgICAgIH1cbiAgICAgICAgMTIuNTAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDcyLjVkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDI1JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoNzIuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMjUuMDAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAzNy41JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDM3LjUwMDElIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjY4LjYwNjE3MTU3NXB4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgxNjEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNTAuMDAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA2Mi41JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDYyLjUwMDElIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgyNTEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjY4LjYwNjE3MTU3NXB4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgyNTEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNzUuMDAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDg3LjUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA4Ny41MDAxJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMzQxLjVkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDM0MS41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCAnLi9zZXJ2aWNlLmpzJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctZGlhbG9nJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSA9IHRoaXMub25QYW5lbENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbGlja091dHNpZGVDbG9zZV8gPSBmYWxzZTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICAgIHRoaXMucGFuZWwucmVtb3ZlKCk7XG4gICAgaWYgKHRoaXMuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICB0aGlzLmJhY2tkcm9wID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwYW5lbCgpIHtcbiAgICBpZiAoIXRoaXMuX3BhbmVsKSB0aGlzLl9wYW5lbCA9IHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJyk7XG4gICAgcmV0dXJuIHRoaXMuX3BhbmVsO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbiB8fCAnY2VudGVyIGNlbnRlcic7XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNsaWNrT3V0c2lkZUNsb3NlKCkge1xuICAgIHJldHVybiB0aGlzLmNsaWNrT3V0c2lkZUNsb3NlXztcbiAgfVxuXG4gIHNldCBjbGlja091dHNpZGVDbG9zZSh2YWx1ZSkge1xuICAgIHRoaXMuY2xpY2tPdXRzaWRlQ2xvc2VfID0gdmFsdWU7XG4gIH1cblxuICBvcGVuKGZyb21TZXJ2aWNlID0gZmFsc2UpIHtcbiAgICB0aGlzLl9mcm9tU2VydmljZSA9IGZyb21TZXJ2aWNlO1xuICAgIHRoaXMucGFuZWwuaG9pc3RUb0JvZHkoKTtcbiAgICB0aGlzLnBhbmVsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuXG4gICAgdGhpcy5iYWNrZHJvcCA9IE1EV1V0aWxzLmFkZEJhY2tkcm9wKHRoaXMucGFuZWwsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNsaWNrT3V0c2lkZUNsb3NlID09PSB0cnVlKSB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5wYW5lbC5vcGVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZShvaykge1xuICAgIHRoaXMucGFuZWwuY2xvc2UoKTtcbiAgICB0aGlzLmRpc3BhdGNoQ2xvc2Uob2spO1xuICB9XG5cbiAgb25QYW5lbENsb3NlKCkge1xuICAgIC8vIGRvbid0IHJlbW92ZSBpZiB3ZSBhcmUgY2xvc2luZyBhIHRlbXBsYXRlXG4gICAgaWYgKCF0aGlzLl9mcm9tU2VydmljZSkge1xuICAgICAgdGhpcy5wYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgICBpZiAodGhpcy5iYWNrZHJvcCkge1xuICAgICAgICB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZSgpO1xuICB9XG5cbiAgZGlzcGF0Y2hDbG9zZShpc09rID0gZmFsc2UpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjbG9zZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBvazogaXNPa1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmNvbnN0IE1EV0RpYWxvZyA9IG5ldyBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudERpYWxvZyA9IG51bGw7XG4gIH1cblxuICBvcGVuKHsgdGl0bGUsIG1lc3NhZ2UsIG9rTGFiZWwsIGNhbmNlbExhYmVsLCBwb3NpdGlvbiA9ICdjZW50ZXIgY2VudGVyJywgY2xpY2tPdXRzaWRlQ2xvc2UgPSBmYWxzZSB9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaWQgPSBNRFdVdGlscy51aWQoJ2RpYWxvZycpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHsgaWQsIHRpdGxlLCBtZXNzYWdlLCBva0xhYmVsLCBjYW5jZWxMYWJlbCwgcG9zaXRpb24gfSk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuICAgICAgY29uc3Qgb25jbG9zZSA9IChlKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZS5kZXRhaWwub2spO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGlhbG9nID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgZWwuY2xpY2tPdXRzaWRlQ2xvc2UgPSBjbGlja091dHNpZGVDbG9zZTtcbiAgICAgIHRoaXMuY3VycmVudERpYWxvZyA9IGVsO1xuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBlbC5vcGVuKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUN1cnJlbnQoKSB7XG4gICAgdGhpcy5jdXJyZW50RGlhbG9nLmNsb3NlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGlkLCB0aXRsZSwgbWVzc2FnZSwgb2tMYWJlbCwgY2FuY2VsTGFiZWwsIHBvc2l0aW9uIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPG1kdy1kaWFsb2cgaWQ9XCIke2lkfVwiPlxuICAgICAgICA8bWR3LXBhbmVsIG1kdy1wb3NpdGlvbj1cIiR7cG9zaXRpb259XCI+XG4gICAgICAgICAgPG1kdy1kaWFsb2ctY29udGFpbmVyPlxuICAgICAgICAgICAgJHshIXRpdGxlID8gYDxtZHctZGlhbG9nLXRpdGxlPiR7dGl0bGV9PC9tZHctZGlhbG9nLXRpdGxlPmAgOiAnJ31cbiAgICAgICAgICAgIDxtZHctZGlhbG9nLWNvbnRlbnQ+JHttZXNzYWdlfTwvbWR3LWRpYWxvZy1jb250ZW50PlxuICAgICAgICAgICAgPG1kdy1kaWFsb2ctYWN0aW9ucz5cbiAgICAgICAgICAgICAgJHshIWNhbmNlbExhYmVsID8gYDxtZHctYnV0dG9uIGNsYXNzPVwibWR3LWVycm9yXCIgb25jbGljaz1cIiR7aWR9LmNsb3NlKGZhbHNlKVwiPiR7Y2FuY2VsTGFiZWx9PC9tZHctYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgICAgICAgJHshIW9rTGFiZWwgPyBgPG1kdy1idXR0b24gb25jbGljaz1cIiR7aWR9LmNsb3NlKHRydWUpXCI+JHtva0xhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgICAgICA8L21kdy1kaWFsb2ctYWN0aW9ucz5cbiAgICAgICAgICA8L21kdy1kaWFsb2ctY29udGFpbmVyPlxuICAgICAgICA8L21kdy1wYW5lbD5cbiAgICAgIDwvbWR3LWRpYWxvZz5cbiAgICBgO1xuICB9XG59XG5cbndpbmRvdy5NRFdEaWFsb2cgPSBNRFdEaWFsb2c7XG5cbmV4cG9ydCBkZWZhdWx0IE1EV0RpYWxvZztcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctZmFiJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2FzeW5jQ2xpY2sgPSB0aGlzLmFzeW5jQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICB0aGlzLnNldHVwQXN5bmMoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG5cbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWR3LXNwaW5uZXItY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LWZhYi1yaXBwbGVcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgZ2V0IGRlbnNlKCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWRlbnNlJyk7XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMuX3NwaW5uZXJDb250YWluZXIpIHRoaXMuX3NwaW5uZXJDb250YWluZXIgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zcGlubmVyLWNvbnRhaW5lcicpO1xuICAgIHJldHVybiB0aGlzLl9zcGlubmVyQ29udGFpbmVyO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgaWYgKCEhdmFsdWUgfHwgdmFsdWUgPT09ICcnKSB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IHBlbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ187XG4gIH1cblxuICBzZXR1cEFzeW5jKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1hc3luYycpKSByZXR1cm47XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG4gIH1cblxuICByZXNvbHZlKCkge1xuICAgIGlmICh0aGlzLnBlbmRpbmdfID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVTcGlubmVyKCk7XG4gIH1cblxuICBhc3luY0NsaWNrKGUpIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nXyA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSB0cnVlO1xuICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgfVxuXG4gIGdldCBzcGlubmVyU3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiAncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKDUwJSAtIDEycHgpOyB0b3A6IDhweDsnO1xuICAgIHJldHVybiAncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKDUwJSAtIDE2cHgpOyB0b3A6IDEycHg7JztcbiAgfVxuXG4gIGdldCBzcGlubmVyRGlhbWV0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiAyNDtcbiAgICByZXR1cm4gMzI7XG4gIH1cblxuICBzaG93U3Bpbm5lcigpIHtcbiAgICB0aGlzLl9zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdy1zcGlubmVyJyk7XG4gICAgY29uc3QgaXNXaGl0ZSA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctcHJpbWFyeScpIHx8IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctc2Vjb25kYXJ5JykgfHwgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1lcnJvcicpO1xuICAgIHRoaXMuc3Bpbm5lckNvbnRhaW5lci5pbm5lckhUTUwgPSBgPG1kdy1jaXJjdWxhci1wcm9ncmVzcyBtZHctbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBtZHctZGlhbWV0ZXI9XCIke3RoaXMuc3Bpbm5lckRpYW1ldGVyfVwiIGNsYXNzPVwiJHtpc1doaXRlID8gJ21kdy13aGl0ZScgOiAnbWR3LWdyZXknfVwiIHN0eWxlPVwiJHt0aGlzLnNwaW5uZXJTdHlsZX1cIj48L21kdy1jaXJjdWxhci1wcm9ncmVzcz5gO1xuICB9XG5cbiAgaGlkZVNwaW5uZXIoKSB7XG4gICAgdGhpcy5fc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zaG93LXNwaW5uZXInKTtcbiAgICB0aGlzLnNwaW5uZXJDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0KC5tZHctc2hvdy1zcGlubmVyKSBzcGFuLnRleHQge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21mb3J0YWJsZSkgLm1kdy1zcGlubmVyLWNvbnRhaW5lciBtZHctY2lyY3VsYXItcHJvZ3Jlc3Mge1xuICAgICAgICB0b3A6IDNweCAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21wYWN0KSAubWR3LXNwaW5uZXItY29udGFpbmVyIG1kdy1jaXJjdWxhci1wcm9ncmVzcyB7XG4gICAgICAgIHRvcDogMCAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LWZhYi1yaXBwbGUsXG4gICAgICAubWR3LWZhYi1mb2N1cy1vdmVybGF5IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtYmFja2dyb3VuZC0tcmdiKSwgMC4xNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1pY29uJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1zcmMnKSkgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBzcmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctc3JjJyk7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdNYXRlcmlhbCBJY29ucyc7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICAgIGRpcmVjdGlvbjogbHRyO1xuICAgICAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcbiAgICAgICAgLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcbiAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IGltZyB7XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG5cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICBjb25zdCBzcmMgPSB0aGlzLnNyYztcbiAgICBpZiAoc3JjKSByZXR1cm4gYDxpbWcgc3JjPVwiJHtzcmN9XCI+PC9pbWc+YDtcbiAgICByZXR1cm4gJzxzbG90Pjwvc2xvdD4nO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWxpbmVhci1wcm9ncmVzcycsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5wZXJjZW50ID09PSBudWxsKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1xdWVyeScpXG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydtZHctcGVyY2VudCddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBzd2l0Y2gobmFtZSkge1xuICAgICAgY2FzZSAnbWR3LXBlcmNlbnQnOlxuICAgICAgICB0aGlzLnBlcmNlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhcigpIHtcbiAgICBpZiAoIXRoaXMuX2JhcikgdGhpcy5fYmFyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctYmFyJyk7XG4gICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgfVxuXG4gIGdldCBwZXJjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LXBlcmNlbnQnKTtcbiAgfVxuXG4gIHNldCBwZXJjZW50KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xuICAgIGlmICh2YWx1ZSA+IDEwMCkgdmFsdWUgPSAxMDA7XG4gICAgdGhpcy5iYXIuc3R5bGUud2lkdGggPSBgJHt2YWx1ZX0lYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1iYXJcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICAubWR3LWJhciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXdoaXRlKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xOCk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctd2hpdGUpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZ3JleSkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUwLCA1MCwgNTAsIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWdyZXkpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1yZ2IpLCAwLjE4KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LWJhciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3QoLm1kdy1xdWVyeSkgLm1kdy1iYXIge1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XG4gICAgICAgIGFuaW1hdGlvbjogcXVlcnkgLjhzIGluZmluaXRlIGN1YmljLWJlemllcigwLjM5MCwgMC41NzUsIDAuNTY1LCAxLjAwMCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcXVlcnkge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzUlKSBzY2FsZSguMywgMSk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgc2NhbGUoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctbGlzdC1pdGVtJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2hyZWZDbGljayA9IHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vblNlbGVjdCA9IHRoaXMub25TZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QgPSB0aGlzLm9uY2xpY2tTZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2NoZWNrSFJFRkN1cnJlbnQgPSB0aGlzLmNoZWNrSFJFRkN1cnJlbnQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGdldCBsaXN0KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGU7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWxpc3QtaXRlbS1leHBhbmRlZCcpO1xuICB9XG5cbiAgZ2V0IGtleSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy1rZXknKTtcbiAgfVxuXG4gIGlzU2VsZWN0KCkge1xuICAgIHJldHVybiBbJ3NpbmdsZScsICdtdWx0aXBsZSddLmluY2x1ZGVzKHRoaXMubGlzdC5zZWxlY3RUeXBlKTtcbiAgfVxuXG4gIHNlbGVjdE9uY2xpY2soKSB7XG4gICAgcmV0dXJuICEhdGhpcy5saXN0LnNlbGVjdE9uY2xpY2s7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNvbm5lY3RSaXBwbGUoKTtcbiAgICB0aGlzLmNvbm5lY3RIUkVGKCk7XG4gICAgdGhpcy5jb25uZWN0U2VsZWN0KCk7XG5cbiAgICBjb25zdCBleHBhbmRlZCA9IHRoaXMuZXhwYW5kZWQ7XG4gICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBleHBhbmRlZC5saXN0SXRlbSA9IHRoaXM7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5yaXBwbGUpIHRoaXMucmlwcGxlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9ocmVmQ2xpY2spO1xuICAgIGlmICh0aGlzLl9zZWxlY3RFbCkgdGhpcy5fc2VsZWN0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vblNlbGVjdCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25jbGlja1NlbGVjdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmJvdW5kX2NoZWNrSFJFRkN1cnJlbnQpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIGNvbnN0IGV4cGFuZEVsZW1lbnQgPSB0aGlzLmV4cGFuZGVkO1xuICAgIGlmIChleHBhbmRFbGVtZW50KSB7XG4gICAgICBleHBhbmRFbGVtZW50Lm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0UmlwcGxlKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyk7XG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgTURXUmlwcGxlKHtcbiAgICAgIGVsZW1lbnQsXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpc1xuICAgIH0pO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWhhcy1yaXBwbGUnKTtcbiAgfVxuXG4gIGNvbm5lY3RIUkVGKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSkgcmV0dXJuO1xuICAgIHRoaXMuY2hlY2tIUkVGQ3VycmVudCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9jaGVja0hSRUZDdXJyZW50KTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9ocmVmQ2xpY2spO1xuICB9XG5cbiAgY2hlY2tIUkVGQ3VycmVudCgpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdocmVmJykpIHJldHVybjtcbiAgICBjb25zdCBocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaDtcbiAgICBpZiAoaHJlZiA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBocmVmID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZi1hbHQnKSkgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctY3VycmVudC1saW5rJyk7XG4gICAgZWxzZSBpZiAoaGFzaCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBoYXNoID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZi1hbHQnKSkgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctY3VycmVudC1saW5rJyk7XG4gICAgZWxzZSB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1jdXJyZW50LWxpbmsnKTtcbiAgfVxuXG4gIGhyZWZDbGljaygpIHtcbiAgICAvLyBvcGVuIGluIG5ldyB0YWIgLyB3aW5kb3dcbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpID09PSAnX2JsYW5rJykge1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSwgJ19ibGFuaycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICB9XG5cbiAgb25TZWxlY3QoZSkge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB0aGlzLmxpc3QuaXRlbVNlbGVjdGVkKHRoaXMpO1xuICAgIGVsc2UgdGhpcy5saXN0Lml0ZW1EZXNlbGVjdGVkKHRoaXMpO1xuICB9XG5cbiAgb25jbGlja1NlbGVjdChlKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE9uY2xpY2soKSkgcmV0dXJuO1xuICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5fc2VsZWN0RWwpIHJldHVybjtcbiAgICB0aGlzLl9zZWxlY3RFbC5jaGVja2VkID0gIXRoaXMuX3NlbGVjdEVsLmNoZWNrZWQ7XG4gIH1cblxuICBjb25uZWN0U2VsZWN0KCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdEVsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctY2hlY2tib3gnKTtcbiAgICAgIGlmICh0aGlzLl9zZWxlY3RFbCkgdGhpcy5fc2VsZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vblNlbGVjdCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RPbmNsaWNrKCkpIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VsZWN0KCkge1xuICAgIHRoaXMuX3NlbGVjdEVsLmNoZWNrZWQgPSBmYWxzZTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1saXN0JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhlc18gPSBbXTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21kdy1zZWxlY3QnLCAnbWR3LXNlbGVjdC1vbmNsaWNrJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgc3dpdGNoKG5hbWUpIHtcbiAgICAgIGNhc2UgJ21kdy1zZWxlY3QnOlxuICAgICAgICB0aGlzLnNlbGVjdFR5cGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtZHctc2VsZWN0LW9uY2xpY2snOlxuICAgICAgICB0aGlzLnNlbGVjdE9uY2xpY2sgPSBuZXdWYWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0IHNlbGVjdE9uY2xpY2sodmFsdWUpIHtcbiAgICB0aGlzLnNlbGVjdE9uY2xpY2tfID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc2VsZWN0T25jbGljaygpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RPbmNsaWNrXztcbiAgfVxuXG4gIHNldCBzZWxlY3RUeXBlKHZhbHVlKSB7XG4gICAgaWYgKCFbJ3NpbmdsZScsICdtdWx0aXBsZSddLmluY2x1ZGVzKHZhbHVlKSkgY29uc29sZS53YXJuKCdtZHctbGlzdFttZHctc2VsZWN0XSBhdHRyaWJ1dGUgLSBvbmx5IGFjY2VwdHMgXCJzaW5nbGVcIiBvciBcIm11bHRpcGxlXCInKTtcbiAgICB0aGlzLnNlbGVjdFR5cGVfID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc2VsZWN0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RUeXBlXztcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KHRoaXMuc2VsZWN0ZWRJbmRleGVzXyk7XG4gIH1cblxuICBkZXNlbGVjdEFsbCgpIHtcbiAgICBbLi4udGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdtZHctbGlzdC1pdGVtJyldLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuZGVzZWxlY3QoKSk7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfID0gW107XG4gIH1cblxuICBpdGVtU2VsZWN0ZWQobGlzdEl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5jaGlsZHJlbiwgbGlzdEl0ZW0pIC0gMTtcbiAgICBpZiAodGhpcy5zZWxlY3RUeXBlXyA9PT0gJ3NpbmdsZScpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gWy4uLnRoaXMuY2hpbGRyZW5dO1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfLmZvckVhY2goaSA9PiBjaGlsZHJlbltpXS5kZXNlbGVjdCgpKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzXyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhlc18ucHVzaChpbmRleCk7XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGl0ZW1EZXNlbGVjdGVkKGxpc3RJdGVtKSB7XG4gICAgY29uc3QgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuY2hpbGRyZW4sIGxpc3RJdGVtKSAtIDE7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfLnNwbGljZSh0aGlzLnNlbGVjdGVkSW5kZXhlc18uaW5kZXhPZihpbmRleCksIDEpO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlKCk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICB9XG5cbiAgY2xvc2VFeHBhbmRlZCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdNRFdMaXN0OmNsb3NlRXhwYW5kZWQnLCB0aGlzKSk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctbWVudScsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJvdW5kX29uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uUGFuZWxDbGljayA9IHRoaXMub25QYW5lbENsaWNrLmJpbmQodGhpcyk7XG5cbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUgPT09IHRydWUpIHRoaXMuY3JlYXRlU2hlZXQoKTtcbiAgICBlbHNlIHRoaXMuY3JlYXRlUGFuZWwoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vbkNsaWNrKTtcblxuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctcGFuZWwtLWNvbnRhaW5lcicpO1xuICAgICAgdGhpcy5wYW5lbC5jbGFzc0xpc3QuYWRkKCdtZHctbWVudScpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLnBhbmVsLnNldFBvc2l0aW9uKHRoaXMucGFuZWxQb3NpdGlvbik7XG4gICAgICB0aGlzLnBhbmVsLmF1dG9Qb3NpdGlvbigpO1xuICAgICAgdGhpcy5wYW5lbC5jbGlja0JvZHlUb0Nsb3NlKCk7XG4gICAgICB0aGlzLnBhbmVsLm9wZW4odHJ1ZSk7XG4gICAgICB0aGlzLnBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xpY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNoZWV0Lm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBvblBhbmVsQ2xpY2soKSB7XG4gICAgdGhpcy5wYW5lbC5jbG9zZSgpO1xuICB9XG5cbiAgc2V0IHBhbmVsUG9zaXRpb24odmFsdWUpIHtcbiAgICAvLyBUT0RPIHZhbGlkYXRlXG4gICAgdGhpcy5wYW5lbFBvc2l0aW9uXyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBhbmVsUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxQb3NpdGlvbl8gfHwgJ2lubmVyLXRvcCBpbm5lci1sZWZ0JztcbiAgfVxuXG4gIGdldCBidXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF07XG4gIH1cblxuICBnZXQgY29udGVudEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LW1lbnUtY29udGVudCcpO1xuICB9XG5cbiAgZ2V0IHBhbmVsKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYW5lbCcpO1xuICB9XG5cbiAgZ2V0IHNoZWV0KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1zaGVldCcpO1xuICB9XG5cbiAgY3JlYXRlU2hlZXQoKSB7XG4gICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgIDxtZHctc2hlZXQgbWR3LW1vZGFsPlxuICAgICAgICA8bWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICAgICAgJHt0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTH1cbiAgICAgICAgPC9tZHctc2hlZXQtY29udGVudD5cbiAgICAgIDwvbWR3LXNoZWV0PlxuICAgIGApO1xuICAgIHRoaXMuY29udGVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cblxuICBjcmVhdGVQYW5lbCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGVudEVsZW1lbnQpIHJldHVybjtcbiAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgPG1kdy1wYW5lbD5cbiAgICAgICAgJHt0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTH1cbiAgICAgIDwvbWR3LXBhbmVsPlxuICAgIGApO1xuICAgIHRoaXMuY29udGVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCB7IGlzUGhvbmVBbmRUYWJsZXQgfSBmcm9tICcuLi8uLi9jb3JlL21vYmlsZS1pbmZvLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctbmF2aWdhdGlvbi1yYWlsJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpc1Bob25lQW5kVGFibGV0ICYmIHRoaXMuaGFzQXR0cmlidXRlKCdtZHctZGVza3RvcC1vbmx5JykpIHtcbiAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSA9IHRoaXMucm91dGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWR3LWhhcy1uYXZpZ2F0aW9uLXJhaWwnKTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfcm91dGVDaGFuZ2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfcm91dGVDaGFuZ2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSk7XG4gIH1cblxuICBnZXQgcGF0aCgpIHtcbiAgICBsZXQgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoLy4qIy8sICcnKTtcbiAgICBpZiAocGF0aC5pbmRleE9mKCc/JykgPiAtMSkgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXTtcbiAgICBpZiAocGF0aC5jaGFyQXQoMCkgIT09ICcvJykgcGF0aCA9ICcvJyArIHBhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICByb3V0ZUNoYW5nZSgpIHtcbiAgICAvLyByZW1vdmUgY3VycmVudCBsaW5rc1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnLm1kdy1jdXJyZW50LWxpbmsnKTtcbiAgICBjdXJyZW50TGlua3MuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctY3VycmVudC1saW5rJykpO1xuXG4gICAgLy8gYWRkIGN1cnJlbnQgbGlua3NcbiAgICBsZXQgbWF0Y2hpbmdMaW5rcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbChgW2hyZWY9XCIjJHt0aGlzLnBhdGh9XCJdYCk7XG4gICAgaWYgKCFtYXRjaGluZ0xpbmtzIHx8IG1hdGNoaW5nTGlua3MubGVuZ3RoID09PSAwKSBtYXRjaGluZ0xpbmtzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKGBbYWx0LWhyZWY9XCIjJHt0aGlzLnBhdGh9XCJdYCk7XG4gICAgbWF0Y2hpbmdMaW5rcy5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ21kdy1jdXJyZW50LWxpbmsnKSk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCB7IGFkZERyYWdMaXN0ZW5lciwgcmVtb3ZlRHJhZ0xpc3RlbmVyLCBzdGF0ZXMgfSBmcm9tICcuLi8uLi9jb3JlL2RyYWcuanMnO1xuXG4vKlxuICogYWRkIGRyYWdhYmxlIGhlYWVyIHRvIHBhbmVsXG4gKi9cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXBhbmVsLWRyYWdnYWJsZS1oZWFkZXInLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfb25EcmFnID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgfVxuXG4gIGdldCBkcmFnZ2FibGVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1wYW5lbC1kcmFnZ2FibGUtaGVhZGVyJyk7XG4gIH1cblxuICBnZXQgcGFuZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGFkZERyYWdMaXN0ZW5lcih0aGlzLmRyYWdnYWJsZUVsZW1lbnQsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHJlbW92ZURyYWdMaXN0ZW5lcih0aGlzLmRyYWdnYWJsZUVsZW1lbnQsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgfVxuXG4gIG9uRHJhZyhldmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQuc3RhdGUpIHtcbiAgICAgIGNhc2Ugc3RhdGVzLnN0YXJ0OlxuICAgICAgICB0aGlzLl9pbml0aWFsTGVmdCA9IHBhcnNlSW50KCh0aGlzLnBhbmVsLnN0eWxlLmxlZnQgfHwgJzAnKS5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxUb3AgPSBwYXJzZUludCgodGhpcy5wYW5lbC5zdHlsZS50b3AgfHwgJzAnKS5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgXG4gICAgICBjYXNlIHN0YXRlcy5tb3ZlOlxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgICAgIHBhbmVsLnN0eWxlLmxlZnQgPSBgJHt0aGlzLl9pbml0aWFsTGVmdCArIGV2ZW50LmRpc3RhbmNlLnh9cHhgO1xuICAgICAgICBwYW5lbC5zdHlsZS50b3AgPSBgJHt0aGlzLl9pbml0aWFsVG9wICsgZXZlbnQuZGlzdGFuY2UueX1weGA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctcGFuZWwtZHJhZ2dhYmxlLWhlYWRlclwiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICAgIDxtZHctaWNvbj5jbG9zZTwvbWR3LWljb24+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi8gYFxuICAgICAgLm1kdy1wYW5lbC1kcmFnZ2FibGUtaGVhZGVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgbWR3LWljb24ge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuaW1wb3J0ICcuL2RyYWdnYWJsZS1oZWFkZXIuanMnO1xuXG4vKiAtLS0gbWR3LXBhbmVsIC0tLVxuICogVGhlIHBhbmVsIGFsbG93cyB5b3UgdG8gY3JlYXRlIHBvc2l0aW9uZWQgZmxvYXRpbmcgZWxlbWVudHMuXG4gKiBtZHctcGFuZWwgaXMgdXNlZCBmb3IgbWVudSwgZGlhbG9nLCB0b29sdGlwXG4gKi9cblxuIC8vIFRPRE8gZml4IG9wZW4gYW5kIGNsb3NlIGFuaW1hdGlvbnNcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXBhbmVsJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLkZPQ1VTQUJMRV9FTEVNRU5UUyA9IFtcbiAgICAgICdidXR0b246bm90KDpkaXNhYmxlZCknLCAnW2hyZWZdOm5vdChbYXJpYS1kaXNhYmxlZD1cInRydWVcIl0pJywgJ2lucHV0Om5vdCg6ZGlzYWJsZWQpJyxcbiAgICAgICdzZWxlY3Q6bm90KDpkaXNhYmxlZCknLCAndGV4dGFyZWE6bm90KDpkaXNhYmxlZCknLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pOm5vdChbYXJpYS1kaXNhYmxlZD1cInRydWVcIl0pJyxcbiAgICBdLmpvaW4oJywgJyk7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2UgPSBmYWxzZTtcbiAgICB0aGlzLl9ib3VuZEhhbmRsZUJvZHlDbGljayA9IHRoaXMuX2hhbmRsZUJvZHlDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2JvdW5kSGFuZGxlS2V5ZG93biA9IHRoaXMuX2hhbmRsZUtleWRvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2Nsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2NsaWNrT3V0c2lkZUNsb3NlSWdub3JFbGVtZW50ID0gW107XG4gICAgdGhpcy5fYXV0b1Bvc2l0aW9uID0gZmFsc2U7XG4gICAgdGhpcy5fYW5pbWF0aW9uQ29uZmlnID0ge1xuICAgICAgdHlwZTogJ3NjYWxlJyxcbiAgICAgIG9wYWNpdHk6IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5ib3VuZF9vbk9wZW5UcmFuc2l0aW9uRW5kID0gdGhpcy5vbk9wZW5BbmltYXRpb25FbmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXVwZ3JhZGVkJyk7XG4gICAgdGhpcy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWUgPSBNRFdVdGlscy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWU7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUJvZHlDbGlja0V2ZW50XygpO1xuICAgIHRoaXMucmVtb3ZlS2V5ZG93bkV2ZW50XygpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9vcGVuQW5pbWF0aW9uRW5kVGltZXJJZCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Nsb3NlQW5pbWF0aW9uRW5kVGltZXJJZCk7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0aW9uUmVxdWVzdElkKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21kdy1wb3NpdGlvbiddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHN3aXRjaChuYW1lKSB7XG4gICAgICBjYXNlICdtZHctcG9zaXRpb24nOlxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG5ld1ZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXQgY2xpY2tPdXRzaWRlQ2xvc2UodmFsdWUpIHtcbiAgICB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0IHNldFF1aWNrT3Blbih2YWx1ZSkge1xuICAgIHRoaXMuX2lzUXVpY2tPcGVuID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgZnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1mdWxsc2NyZWVuJyk7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZSkge1xuICAgIGNvbnN0IHNwbGl0ID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IGAke3NwbGl0WzBdIHx8ICd0b3AnfSAke3NwbGl0WzFdIHx8ICdsZWZ0J31gO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtZHctcG9zaXRpb24nLCB0aGlzLl9wb3NpdGlvbik7XG4gICAgdGhpcy5fcG9zaXRpb25TZXQgPSB0cnVlO1xuICB9XG5cbiAgYXV0b1Bvc2l0aW9uKCkge1xuICAgIHRoaXMuX2F1dG9Qb3NpdGlvbiA9IHRydWU7XG4gIH1cblxuICBzZXRBbmltYXRpb24oYW5pbWF0aW9uQ29uZmlnKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uQ29uZmlnID0gYW5pbWF0aW9uQ29uZmlnO1xuICB9XG5cbiAgY2xpY2tCb2R5VG9DbG9zZSgpIHtcbiAgICB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IHRydWU7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuXG4gIG9uT3BlbkFuaW1hdGlvbkVuZCgpIHtcbiAgICB0aGlzLnN0eWxlLnRyYW5zaXRpb24gPSAnJztcbiAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICcnO1xuICAgIHRoaXMuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICB0aGlzLnN0eWxlLm1heEhlaWdodCA9ICcnO1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXBhbmVsLS1hbmltYXRpbmctb3BlbicpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuYm91bmRfb25PcGVuVHJhbnNpdGlvbkVuZCk7XG4gICAgdGhpcy5ub3RpZnlPcGVuKCk7XG4gIH1cblxuICBvcGVuKGNsaWNrQm9keVRvQ2xvc2UpIHtcbiAgICBpZiAoY2xpY2tCb2R5VG9DbG9zZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IGNsaWNrQm9keVRvQ2xvc2U7XG4gICAgLy8gaGFuZGxlIGZvY3VzZWQgZWxlbWVudFxuICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuRk9DVVNBQkxFX0VMRU1FTlRTKTtcbiAgICB0aGlzLl9maXJzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIHRoaXMuc2F2ZUZvY3VzKCk7XG5cbiAgICAvLyBoYW5kbGUgYW5pbWF0aW9uXG4gICAgaWYgKCF0aGlzLl9pc1F1aWNrT3Blbikge1xuICAgICAgdGhpcy5wcmVwYXJlQW5pbWF0aW9uKCk7XG5cbiAgICAgIGlmICh0aGlzLl9pc0hvaXN0ZWQpIHRoaXMuc2V0SG9pc3RlZFBvc2l0aW9uKCk7XG4gICAgICBlbHNlIHRoaXMuc2V0UG9zaXRpb25TdHlsZSgpO1xuXG4gICAgICB0aGlzLl9hbmltYXRpb25SZXF1ZXN0SWQgPSB0aGlzLl9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uQ29uZmlnLmZ1bGxzY3JlZW4pIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWZ1bGxzY3JlZW4nKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2FuaW1hdGlvbkNvbmZpZy50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnaGVpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNpdGlvbiA9ICdtYXgtaGVpZ2h0IC4yMnMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKSwgdHJhbnNmb3JtIC4yMnMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKSwgb3BhY2l0eSAuMjJzIGxpbmVhcic7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLm1heEhlaWdodCA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZnVsbHNjcmVlbicpID8gJzEwMCUnIDogYCR7dGhpcy5zY3JvbGxIZWlnaHR9cHhgO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnc2NhbGUnOlxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLCBvcGFjaXR5IDAuMXMgbGluZWFyJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuYm91bmRfb25PcGVuVHJhbnNpdGlvbkVuZCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctb3BlbicpO1xuICAgICAgaWYgKHRoaXMuX2lzSG9pc3RlZCkgdGhpcy5zZXRIb2lzdGVkUG9zaXRpb24oKTtcbiAgICAgIGVsc2UgdGhpcy5zZXRQb3NpdGlvblN0eWxlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYWRkQm9keUNsaWNrRXZlbnQoKTtcbiAgICB0aGlzLl9hZGRLZXlkb3duRXZlbnQoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlJywgdGhpcy5ib3VuZF9jbG9zZSk7XG4gICAgdGhpcy5faXNPcGVuID0gdHJ1ZTtcbiAgfVxuXG5cbiAgcHJlcGFyZUFuaW1hdGlvbigpIHtcbiAgICAvLyBkZWZhdWx0IGFuaW1hdGlvblxuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LW9wZW4nKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wYW5lbC0tYW5pbWF0aW5nLW9wZW4nKTtcblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25Db25maWcudGFyZ2V0ICYmIHRoaXMuX2FuaW1hdGlvbkNvbmZpZy5mdWxsc2NyZWVuKSB7XG4gICAgICB0aGlzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIH1cbiAgICBcbiAgICBzd2l0Y2godGhpcy5fYW5pbWF0aW9uQ29uZmlnLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgICAgIHRoaXMuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB0aGlzLnN0eWxlLm1heEhlaWdodCA9IHRoaXMuX2FuaW1hdGlvbkNvbmZpZy50YXJnZXQgPyBgJHt0aGlzLl9hbmltYXRpb25Db25maWcudGFyZ2V0Lm9mZnNldEhlaWdodH1weGAgOiAnMCc7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLl9hbmltYXRpb25Db25maWcub3JpZ2luKSB7XG4gICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1WYWx1ZSA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZnVsbHNjcmVlbicpID8gd2luZG93LmlubmVySGVpZ2h0IC8gMiA6IHRoaXMuc2Nyb2xsSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25Db25maWcudGFyZ2V0KSB0cmFuc2Zvcm1WYWx1ZSA9IHRoaXMuX2FuaW1hdGlvbkNvbmZpZy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHt0cmFuc2Zvcm1WYWx1ZX1weClgO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uQ29uZmlnLnRhcmdldCkge1xuICAgICAgICAgICAgICB0cmFuc2Zvcm1WYWx1ZSA9IHRoaXMuX2FuaW1hdGlvbkNvbmZpZy50YXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dHJhbnNmb3JtVmFsdWV9cHgpYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzY2FsZSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwLjkpJztcbiAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSB0aGlzLl9hbmltYXRpb25Db25maWcub3JpZ2luIHx8ICdjZW50ZXInO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uQ29uZmlnLm9wYWNpdHkpIHtcbiAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfVxuICB9XG5cblxuICAvLyBUT0RPIEZJWCBUSEUgQ0xPU0lORyBBTklNQVRJT05cbiAgYXN5bmMgY2xvc2UoZXZlbnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoZXZlbnQpIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlJywgdGhpcy5ib3VuZF9jbG9zZSk7XG4gICAgICBpZiAoIXRoaXMuX2lzUXVpY2tPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXBhbmVsLS1hbmltYXRpbmctY2xvc2VkJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlQm9keUNsaWNrRXZlbnRfKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblJlcXVlc3RJZCA9IHRoaXMuX3J1bk5leHRBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctb3BlbicpO1xuICAgICAgICAgIHRoaXMuX2Nsb3NlQW5pbWF0aW9uRW5kVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2xvc2VBbmltYXRpb25FbmRUaW1lcklkID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXBhbmVsLS1hbmltYXRpbmctY2xvc2VkJyk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q2xvc2UoKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9LCA3NSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctb3BlbicpO1xuICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbW92ZUtleWRvd25FdmVudF8oKTtcbiAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgY29uc3QgaXNSb290Rm9jdXNlZCA9IHRoaXMuaXNGb2N1c2VkKCk7XG4gICAgICBjb25zdCBjaGlsZEhhc0ZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB0aGlzLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGlzUm9vdEZvY3VzZWQgfHwgY2hpbGRIYXNGb2N1cykgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZSk7XG4gICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfSk7XG4gIH1cblxuICBpc0ZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXM7XG4gIH1cblxuICBzYXZlRm9jdXMoKSB7XG4gICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICByZXN0b3JlRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiYgdGhpcy5fcHJldmlvdXNGb2N1cyAmJiB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKSB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKCk7XG4gIH1cblxuICBmb2N1c0ZpcnN0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ICYmIHRoaXMuX2ZpcnN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cykgdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKClcbiAgfVxuXG4gIGZvY3VzTGFzdEVsZW1lbnQoKSB7XG4gICAgaWYgKHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50ICYmIHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKSB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpXG4gIH1cblxuICBpc0ZpcnN0RWxlbWVudEZvY3VzZWQoKSB7XG4gICAgdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ID8gdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogZmFsc2U7XG4gIH1cblxuICBpc0xhc3RFbGVtZW50Rm9jdXNlZCgpIHtcbiAgICB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudCA/IHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogZmFsc2U7XG4gIH1cblxuICBfYWRkQm9keUNsaWNrRXZlbnQoKSB7XG4gICAgaWYgKCF0aGlzLl9jbGlja091dHNpZGVDbG9zZSkgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oYXNCb2R5RXZlbnQgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2JvdW5kSGFuZGxlQm9keUNsaWNrKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHJlbW92ZUJvZHlDbGlja0V2ZW50XygpIHtcbiAgICBpZiAodGhpcy5oYXNCb2R5RXZlbnQpIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9ib3VuZEhhbmRsZUJvZHlDbGljayk7XG4gICAgdGhpcy5oYXNCb2R5RXZlbnQgPSBmYWxzZTtcbiAgfVxuXG4gIF9hZGRLZXlkb3duRXZlbnQoKSB7XG4gICAgdGhpcy5oYXNLZXlkb3duRXZlbnQgPSB0cnVlO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2JvdW5kSGFuZGxlS2V5ZG93bik7XG4gIH1cblxuICByZW1vdmVLZXlkb3duRXZlbnRfKCkge1xuICAgIGlmICh0aGlzLmhhc0tleWRvd25FdmVudCkgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fYm91bmRIYW5kbGVLZXlkb3duKTtcbiAgICB0aGlzLmhhc0tleWRvd25FdmVudCA9IGZhbHNlO1xuICB9XG5cbiAgaWdub3JlRWxlbWVudE9uQ2xpY2tUb0Nsb3NlKGVsKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2VJZ25vckVsZW1lbnQucHVzaChlbCk7XG4gIH1cblxuICBfaGFuZGxlQm9keUNsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgZWwgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKHRoaXMuX2NsaWNrT3V0c2lkZUNsb3NlSWdub3JFbGVtZW50LmluY2x1ZGVzKGVsKSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmNvbnRhaW5zKGVsKSkgcmV0dXJuO1xuICAgIHRoaXMucmVtb3ZlQm9keUNsaWNrRXZlbnRfKCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQpIHtcbiAgICBjb25zdCB7IGtleSwga2V5Q29kZSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcbiAgICBjb25zdCBpc1RhYiA9IGtleSA9PT0gJ1RhYicgfHwga2V5Q29kZSA9PT0gOTtcblxuICAgIGlmIChpc0VzY2FwZSkgdGhpcy5jbG9zZSgpO1xuICAgIGVsc2UgaWYgKGlzVGFiKSB7XG4gICAgICBpZiAodGhpcy5pc0xhc3RFbGVtZW50Rm9jdXNlZCgpICYmICFzaGlmdEtleSkge1xuICAgICAgICB0aGlzLmZvY3VzRmlyc3RFbGVtZW50KCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNGaXJzdEVsZW1lbnRGb2N1c2VkKCkgJiYgc2hpZnRLZXkpIHtcbiAgICAgICAgdGhpcy5mb2N1c0xhc3RFbGVtZW50KCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5Q2xvc2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnTURXUGFuZWw6Y2xvc2VkJywgdGhpcykpO1xuICB9XG5cbiAgbm90aWZ5T3BlbigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdNRFdQYW5lbDpvcGVuZWQnKSwgdGhpcyk7XG4gIH1cblxuICBob2lzdFRvQm9keSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5faXNIb2lzdGVkKSByZXR1cm47XG4gICAgdGhpcy5fY29udGFpbmVyID0gdGFyZ2V0IHx8IHRoaXMucGFyZW50Tm9kZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXBhbmVsLWhvaXN0ZWQnKTtcbiAgICB0aGlzLl9pc0hvaXN0ZWQgPSB0cnVlO1xuICB9XG5cbiAgX2F1dG9Qb3NpdGlvbkhvaXN0ZWQoKSB7XG4gICAgaWYgKCF0aGlzLl9hdXRvUG9zaXRpb24pIHJldHVybjtcblxuICAgIGNvbnN0IHBhZ2VIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3QgcGFuZWxSZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwYW5lbEhlaWdodCA9IHRoaXMub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBwYW5lbFkgPSB0aGlzLm9mZnNldFRvcDtcblxuICAgIC8vIGlmIHBhbmVsIGlzIG91dCBvZiB3aW5kb3cgeSBib3VuZHNcbiAgICBpZiAocGFuZWxZICsgcGFuZWxIZWlnaHQgPiBwYWdlSGVpZ2h0KSB7XG4gICAgICBpZiAocGFuZWxIZWlnaHQgPD0gcGFnZUhlaWdodCkge1xuICAgICAgICBjb25zdCBtYXhUb3AgPSBwYWdlSGVpZ2h0IC0gcGFuZWxIZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXQgPSBwYW5lbFkgLSBtYXhUb3A7XG5cbiAgICAgICAgLy8gYWRkIHBhZGRpbmcgdG8gb2Zmc2V0LCB0aGlzIHdpbGwgcHJldmVudCBwYW5lbCBmcm9tIGJ1dHRpbmcgdXAgYWdhaW5zdCBib3R0b21cbiAgICAgICAgaWYgKG9mZnNldCA+IDIwKSBvZmZzZXQgKz0gMTA7XG4gICAgICAgIGVsc2Ugb2Zmc2V0IC89IDI7XG5cbiAgICAgICAgcGFuZWxZIC09IG9mZnNldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN0eWxlLnRvcCA9IGAke3BhbmVsWX1weGA7XG4gIH1cblxuICBzZXRIb2lzdGVkUG9zaXRpb24oKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5fY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuc3R5bGUudG9wID0gYCR7Ym91bmRzLnRvcH1weGA7XG4gICAgdGhpcy5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRzLmxlZnR9cHhgO1xuICAgIC8vIHRoaXMuc3R5bGVbdGhpcy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWVdID0gJ3NjYWxlKDEpJztcblxuICAgIGlmICghdGhpcy5fcG9zaXRpb25TZXQpIHtcbiAgICAgIHRoaXMuX2F1dG9Qb3NpdGlvbkhvaXN0ZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICAgIHRoaXMuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcbiAgICAgIHRoaXMuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIC8vIG5vIGRlZmF1bHRzXG4gICAgICAgIGNvbnN0IHNwbGl0ID0gKHRoaXMucG9zaXRpb24gfHwgJyAnKS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBhVmFsdWUgPSBzcGxpdFswXTtcbiAgICAgICAgY29uc3QgYlZhbHVlID0gc3BsaXRbMV07XG5cbiAgICAgICAgc3dpdGNoKGFWYWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0b3AgPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaW5uZXItdG9wJzpcbiAgICAgICAgICAgIHRvcCA9IGJvdW5kcy55ICsgMTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdG9wID0gY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIHRvcCA9IChjbGllbnRIZWlnaHQgLyAyKSAtIChoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2lubmVyLWJvdHRvbSc6XG4gICAgICAgICAgICB0b3AgPSBjbGllbnRIZWlnaHQgLSBoZWlnaHQgLSAxMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGJWYWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdpbm5lci1sZWZ0JzpcbiAgICAgICAgICAgIGxlZnQgPSBib3VuZHMueCArIDEyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgbGVmdCA9IGNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaW5uZXItcmlnaHQnOlxuICAgICAgICAgICAgbGVmdCA9IGNsaWVudFdpZHRoIC0gd2lkdGggLSAxMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICBsZWZ0ID0gKGNsaWVudFdpZHRoIC8gMikgLSAod2lkdGggLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdHlsZS53aWR0aCA9IGAke3RoaXMud2lkdGh9cHhgO1xuICAgICAgICB0aGlzLnN0eWxlLnRvcCA9IGAke3RvcH1weGA7XG4gICAgICAgIHRoaXMuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cblxuICBzZXRQb3NpdGlvblN0eWxlKHBhcmVudE92ZXJyaWRlKSB7XG4gICAgaWYgKHBhcmVudE92ZXJyaWRlKSB0aGlzLl9wYXJlbnRPdmVycmlkZSA9IHBhcmVudE92ZXJyaWRlO1xuICAgIGVsc2UgaWYgKHRoaXMuX3BhcmVudE92ZXJyaWRlKSBwYXJlbnRPdmVycmlkZSA9IHRoaXMuX3BhcmVudE92ZXJyaWRlO1xuXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgIGxldCBwYXJlbnRXaWR0aCA9IDA7XG4gICAgbGV0IHBhcmVudEhlaWdodCA9IDA7XG4gICAgaWYgKHBhcmVudE92ZXJyaWRlKSB7XG4gICAgICBwYXJlbnRXaWR0aCA9IHBhcmVudE92ZXJyaWRlLm9mZnNldFdpZHRoO1xuICAgICAgcGFyZW50SGVpZ2h0ID0gcGFyZW50T3ZlcnJpZGUub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgaWYgKHBhcmVudC5ub2RlTmFtZSA9PT0gJ01EVy1TTkFDS0JBUicpIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgY29uc3QgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHBhcmVudFdpZHRoID0gcGFyZW50UmVjdC53aWR0aDtcbiAgICAgIHBhcmVudEhlaWdodCA9IHBhcmVudFJlY3QuaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIHVzZSBvZmZzZXQgd2l0aCBhbmQgaGVpZ2h0IHRvIGF2b2lkIHByb2JsZW1zIGR1ZSB0byB0cmFuc2Zvcm06IHNjYWxlKClcbiAgICAvLyB1c2luZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgd2lsbCByZXR1cm4gdGhlIGFkanVzdGVkIHdpZHRoIGJhc2VkIG9uIHRoZSBzY2FsZSBmYWN0b3JcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gbm8gZGVmYXVsdHNcbiAgICBjb25zdCBzcGxpdCA9ICh0aGlzLnBvc2l0aW9uIHx8ICcgJykuc3BsaXQoJyAnKTtcbiAgICBjb25zdCBhVmFsdWUgPSBzcGxpdFswXTtcbiAgICBjb25zdCBiVmFsdWUgPSBzcGxpdFsxXTtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBzd2l0Y2goYVZhbHVlKSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0b3AgPSAtaGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHRvcCA9IHBhcmVudEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICB0b3AgPSAocGFyZW50SGVpZ2h0IC8gMikgLSAoaGVpZ2h0IC8gMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5uZXItYm90dG9tJzpcbiAgICAgICAgdG9wID0gcGFyZW50SGVpZ2h0IC0gaGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2goYlZhbHVlKSB7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgbGVmdCA9IC13aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGxlZnQgPSBwYXJlbnRXaWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbm5lci1yaWdodCc6XG4gICAgICAgIGxlZnQgPSBwYXJlbnRXaWR0aCAtIHdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIGxlZnQgPSAocGFyZW50V2lkdGggLyAyKSAtICh3aWR0aCAvIDIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYXV0b1Bvc2l0aW9uKSB7XG4gICAgICBjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHsgeDogZ2xvYmFsWCwgeTogZ2xvYmFsWSB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICgoZ2xvYmFsWSArIGhlaWdodCkgPiBjbGllbnRIZWlnaHQpIHRvcCA9IHBhcmVudEhlaWdodCAtIGhlaWdodDtcbiAgICAgIGlmICgoZ2xvYmFsWCArIHdpZHRoKSA+IGNsaWVudFdpZHRoKSBsZWZ0ID0gcGFyZW50V2lkdGggLSB3aWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHRvcCl9cHhgO1xuICAgIHRoaXMuc3R5bGUubGVmdCA9IGAke3BhcnNlSW50KGxlZnQpfXB4YDtcbiAgICAvLyB0aGlzLnN0eWxlW3RoaXMudHJhbnNmb3JtUHJvcGVydHlOYW1lXSA9ICdzY2FsZSgxKSc7XG4gIH1cblxuICByZXNldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUudG9wID0gJyc7XG4gICAgdGhpcy5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgLy8gdGhpcy5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSAnJztcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1yYWRpby1ncm91cCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LXZhbHVlJyk7XG4gICAgLy8gdGhpcy5ib3VuZF9jaGFuZ2UgPSB0aGlzLmNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLy8gY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gIC8vICAgdGhpcy5yYWRpb3MuZm9yRWFjaChyID0+IHIuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9jaGFuZ2UpKTtcbiAgLy8gfVxuICAvL1xuICAvLyBkaXNvY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gIC8vICAgdGhpcy5yYWRpb3MuZm9yRWFjaChyID0+IHIuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9jaGFuZ2UpKTtcbiAgLy8gfVxuICAvL1xuICAvLyBjaGFuZ2UoZSkge1xuICAvLyAgIGNvbnNvbGUubG9nKGUpO1xuICAvLyB9XG4gIC8vXG4gIC8vIGdldCByYWRpb3MoKSB7XG4gIC8vICAgcmV0dXJuIFsuLi50aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1yYWRpbycpXTtcbiAgLy8gfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1JpcHBsZSBmcm9tICcuLi8uLi9jb3JlL1JpcHBsZS5qcyc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXJhZGlvJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvLyBpbnB1dCByYWRpbyB3aWxsIG5vdCB3b3JrIGNvcnJlY3RseSBpbiBzaGFkb3dyb290XG4gICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMucmlwcGxlVGVtcGxhdGUoKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlLmluaXRpYWxWYWx1ZSA9PT0gdGhpcy52YWx1ZSkgdGhpcy5pbnB1dC5jaGVja2VkID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuaW5wdXQuaGFzQXR0cmlidXRlKCd0eXBlJykpIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3JhZGlvJyk7XG4gICAgaWYgKCF0aGlzLmlucHV0Lmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgTURXUmlwcGxlKHtcbiAgICAgIGVsZW1lbnQ6IHRoaXMucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiBbdGhpcy5pbnB1dF0sXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgY2VudGVyZWQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC52YWx1ZTtcbiAgfVxuXG4gIGdldCBpbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcbiAgICAgIHRoaXMubmFtZV8gPSB0aGlzLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XG4gICAgICB0aGlzLm5hbWVfID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgbmFtZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZFxuICAgIC8vIG5hbWUgaXMgcmVxdWlyZWQgZm9yIHJhZGlvIGJ1dHRvbnMgdG8gd29ya1xuICAgIGlmICghdGhpcy5uYW1lXykge1xuICAgICAgdGhpcy5uYW1lXyA9IE1EV1V0aWxzLnVpZCgpO1xuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkgdGhpcy5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsIHRoaXMubmFtZV8pO1xuICAgICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZSgnbmFtZScsIHRoaXMubmFtZV8pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYW1lXztcbiAgfVxuXG4gIHJpcHBsZVRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXJhZGlvLWJhY2tncm91bmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yYWRpb19fb3V0ZXItY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmFkaW9fX2lubmVyLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXJpcHBsZSBtZHctcmFkaW8tcmlwcGxlXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG4vLyBUT0RPIGltcGxhZW50IHZhbGlkaXR5XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNlbGVjdCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNldHVwTGFiZWxfKCk7XG4gICAgaWYgKHRoaXMuX2lzRW5oYW5jZWQpIHRoaXMucHJlcGFyZUVuaGFuY2VfKCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctbm8tYW5pbWF0aW9uJyk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKHRydWUpO1xuXG4gICAgdGhpcy5ib3VuZF9vbkZvY3VzID0gdGhpcy5vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbkJsdXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vblBhbmVsQ2xpY2sgPSB0aGlzLm9uUGFuZWxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25LZXlEb3duID0gdGhpcy5vbktleURvd24uYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLl9pc0VuaGFuY2VkKSB7XG4gICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHRoaXMudmFsdWUgPSB0aGlzLl9zZWxlY3RlZC52YWx1ZTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdyZW5kZXItYmxvY2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25DbGljayk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kX29uS2V5RG93bik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuYm91bmRfb25Gb2N1cyk7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX29uQ2hhbmdlKTtcbiAgICB9XG5cbiAgICAvLyBjYXB0dXJlIG9wdGlvbiBzZWxlY3RlZCBhdHRyaWJ1dGUgYW5kIGZsb2F0IHRoZSBsYWJlbFxuICAgIHRoaXMub25DaGFuZ2UoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctbm8tYW5pbWF0aW9uJyk7XG5cbiAgICAgIGlmICh0aGlzLl9pc0VuaGFuY2VkKSB7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUubWluV2lkdGggPSBgJHt0aGlzLm9mZnNldFdpZHRofXB4YDtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLl9pc0VuaGFuY2VkKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcigncmVuZGVyLWJsb2NrJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uQ2xpY2spO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZF9vbktleURvd24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmJvdW5kX29uRm9jdXMpO1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJvdW5kX29uQmx1cik7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vbkNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGlmICh0aGlzLl9pc0VuaGFuY2VkKSByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0RWxlbWVudC52YWx1ZSB8fCB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RFbGVtZW50KCkge1xuICAgIHJldHVybiBNRFdVdGlscy5xdWVyeVNsb3R0ZWQodGhpcywgJ3NlbGVjdCcpO1xuICB9XG5cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcbiAgfVxuXG4gIGdldCBsYWJlbFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmxhYmVsLm9mZnNldFdpZHRoICogMC45O1xuICB9XG5cblxuICBnZXQgZW5oYWNlZEVsZW1lbnRJZCgpIHtcbiAgICBpZiAoIXRoaXMuX2VuaGFjZWRFbGVtZW50SWQpIHRoaXMuX2VuaGFjZWRFbGVtZW50SWQgPSBgc2VsZWN0LWVuaGFuY2VkLSR7TURXVXRpbHMudWlkKCl9YDtcbiAgICByZXR1cm4gdGhpcy5fZW5oYWNlZEVsZW1lbnRJZDtcbiAgfVxuXG4gIGdldCBwYW5lbCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5lbmhhY2VkRWxlbWVudElkfWApO1xuICB9XG5cbiAgZ2V0IHNoZWV0KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLmVuaGFjZWRFbGVtZW50SWR9YCk7XG4gIH1cblxuICBnZXQgX2lzRW5oYW5jZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctZW5oYW5jZWQnKSAhPT0gbnVsbDtcbiAgfVxuXG4gIGdldCBvdXRsaW5lZCgpIHtcbiAgICByZXR1cm4gW10uc2xpY2UuYXBwbHkodGhpcy5jbGFzc0xpc3QgfHwgW10pLmluY2x1ZGVzKCdtZHctb3V0bGluZWQnKTtcbiAgfVxuXG4gIGdldCBub3RjaCgpIHtcbiAgICBpZiAoIXRoaXMuX25vdGNoKSB0aGlzLl9ub3RjaCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LW91dGxpbmVkLW5vdGNoJyk7XG4gICAgcmV0dXJuIHRoaXMuX25vdGNoO1xuICB9XG5cbiAgc2V0dXBMYWJlbF8oKSB7XG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk7XG4gICAgaWYgKGxhYmVsKSB7XG4gICAgICB0aGlzLl9sYWJlbFRleHQgPSBsYWJlbC5pbm5lclRleHQ7XG4gICAgICBsYWJlbC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBwcmVwYXJlRW5oYW5jZV8oKSB7XG4gICAgdGhpcy5fb3B0aW9uc01hcCA9IFsuLi50aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpXS5tYXAoZWwgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogZWwuaW5uZXJUZXh0LFxuICAgICAgICB2YWx1ZTogZWwudmFsdWUsXG4gICAgICAgIHNlbGVjdGVkOiBlbC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJylcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zZWxlY3RlZCA9ICh0aGlzLl9vcHRpb25zTWFwLmZpbHRlcigoeyBzZWxlY3RlZCB9KSA9PiBzZWxlY3RlZCA9PT0gdHJ1ZSlbMF0gfHwgeyB0ZXh0OiAnJywgdmFsdWU6ICcnIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0RWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgaWYgKHNlbGVjdEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdE9uY2hhbmdlID0gc2VsZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJyk7XG4gICAgICBpZiAoc2VsZWN0T25jaGFuZ2UpIHRoaXMuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsIHNlbGVjdE9uY2hhbmdlKTtcbiAgICAgIHNlbGVjdEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB0aGlzLnByZXBhcmVTaGVldF8oKTtcbiAgICBlbHNlIHRoaXMucHJlcGFyZVBhbmVsXygpO1xuICB9XG5cbiAgcHJlcGFyZVBhbmVsXygpIHtcbiAgICBjb25zdCBwYW5lbEhUTUwgPSBgXG4gICAgICA8bWR3LXBhbmVsIGlkPVwiJHt0aGlzLmVuaGFjZWRFbGVtZW50SWR9XCIgbWR3LXBvc2l0aW9uPVwiYm90dG9tIGlubmVyLWxlZnRcIiBjbGFzcz1cIm1kdy1wYW5lbC1ob2lzdGVkXCI+XG4gICAgICAgIDxtZHctbGlzdD5cbiAgICAgICAgICAke3RoaXMuX29wdGlvbnNNYXAubWFwKCh7IHRleHQsIHZhbHVlLCBzZWxlY3RlZCB9KSA9PiBgXG4gICAgICAgICAgICA8bWR3LWxpc3QtaXRlbSB2YWx1ZT1cIiR7dmFsdWV9XCIke3NlbGVjdGVkID8gJyBzZWxlY3RlZCcgOiAnJ30+JHt0ZXh0fTwvbWR3LWxpc3QtaXRlbT5cbiAgICAgICAgICBgKS5qb2luKCdcXG4nKX1cbiAgICAgICAgPC9tZHctbGlzdD5cbiAgICAgIDwvbWR3LXBhbmVsPlxuICAgIGA7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHBhbmVsSFRNTCk7XG4gICAgY29uc3QgcGFuZWxFbCA9IHRoaXMucGFuZWw7XG4gICAgcGFuZWxFbC5zZXRBbmltYXRpb24oe1xuICAgICAgdGFyZ2V0OiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLFxuICAgICAgdHlwZTogJ3NjYWxlJyxcbiAgICAgIG9yaWdpbjogJ3RvcCcsXG4gICAgICBvcGFjaXR5OiB0cnVlXG4gICAgfSk7XG4gICAgcGFuZWxFbC5ob2lzdFRvQm9keSh0aGlzKTtcbiAgfVxuXG4gIHByZXBhcmVTaGVldF8oKSB7XG4gICAgY29uc3Qgc2hlZXRIVE1MID0gYFxuICAgICAgPG1kdy1zaGVldCBtZHctbW9kYWwgaWQ9JHt0aGlzLmVuaGFjZWRFbGVtZW50SWR9PlxuICAgICAgICA8bWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICAgICAgPG1kdy1saXN0PlxuICAgICAgICAgICAgJHt0aGlzLl9vcHRpb25zTWFwLm1hcCgoeyB0ZXh0LCB2YWx1ZSwgc2VsZWN0ZWQgfSkgPT4gYFxuICAgICAgICAgICAgICA8bWR3LWxpc3QtaXRlbSB2YWx1ZT1cIiR7dmFsdWV9XCIke3NlbGVjdGVkID8gJyBzZWxlY3RlZCcgOiAnJ30+JHt0ZXh0fTwvbWR3LWxpc3QtaXRlbT5cbiAgICAgICAgICAgIGApLmpvaW4oJ1xcbicpfVxuICAgICAgICAgIDwvbWR3LWxpc3Q+XG4gICAgICAgIDwvbWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICA8L21kdy1zaGVldD5cbiAgICBgO1xuXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHNoZWV0SFRNTCk7XG4gIH1cblxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9IHRoaXMubGFiZWxXaWR0aCArICdweCc7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LW5vdC1lbXB0eScsIHRoaXMudmFsdWUpO1xuXG4gICAgaWYgKHRoaXMuX2lzRW5oYW5jZWQpIHtcbiAgICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgICB0aGlzLnNoZWV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1NoZWV0OmNsb3NlZCcsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgICAgdGhpcy5zaGVldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgICAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xpY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIE1EV1V0aWxzLnVubG9ja1BhZ2VTY3JvbGwoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWVtcHR5LW5vLWZsb2F0Jyk7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9IHRoaXMubGFiZWxXaWR0aCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbWR3LWVtcHR5LW5vLWZsb2F0Jyk7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9ICcwJztcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9PT0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25Gb2N1cygpO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICBjb25zdCBzaGVldEVsZW1lbnQgPSB0aGlzLnNoZWV0O1xuICAgICAgc2hlZXRFbGVtZW50Lm9wZW4oKTtcbiAgICAgIHNoZWV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdNRFdTaGVldDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uQmx1cik7XG4gICAgICBzaGVldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IHNoZWV0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWR3LWZvY3VzZWQnKTtcbiAgICAgIGlmIChmb2N1c2VkRWxlbWVudCkgZm9jdXNlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWZvY3VzZWQnKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IHNoZWV0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbc2VsZWN0ZWRdJyk7XG4gICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSBzZWxlY3RlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFuZWxFbGVtZW50ID0gdGhpcy5wYW5lbDtcbiAgICAgIHBhbmVsRWxlbWVudC5hdXRvUG9zaXRpb24oKTtcbiAgICAgIHBhbmVsRWxlbWVudC5vcGVuKHRydWUpO1xuICAgICAgcGFuZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgIHBhbmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gcGFuZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZHctZm9jdXNlZCcpO1xuICAgICAgaWYgKGZvY3VzZWRFbGVtZW50KSBmb2N1c2VkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRFbGVtZW50ID0gcGFuZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKTtcbiAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHNlbGVjdGVkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctZm9jdXNlZCcpO1xuICAgIH1cblxuICAgIE1EV1V0aWxzLmxvY2tQYWdlU2Nyb2xsKCk7XG4gIH1cblxuICBvblBhbmVsQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICB0aGlzLnNldFNlbGVjdGVkVGV4dChldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWQgPSB0aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKTtcbiAgICBpZiAoY3VycmVudFNlbGVjdGVkKSBjdXJyZW50U2VsZWN0ZWQucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgIHRoaXMucGFuZWwuY2xvc2UoKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkVGV4dCh2YWx1ZSkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCcpLmlubmVyVGV4dCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGludGVybmFsU3R5bGVzRmlsZSgpIHtcbiAgICByZXR1cm4gJy4vaW50ZXJuYWwuY3NzJztcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8aSBjbGFzcz1cIm1kdy1zZWxlY3RfX2ljb25cIj48L2k+XG4gICAgICAkeyF0aGlzLl9pc0VuaGFuY2VkID8gJzxzbG90Pjwvc2xvdD4nIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dFwiPiR7dGhpcy5fc2VsZWN0ZWQudGV4dH08L2Rpdj5cbiAgICAgIGB9XG4gICAgICA8bGFiZWw+JHt0aGlzLl9sYWJlbFRleHR9PC9sYWJlbD5cbiAgICAgICR7dGhpcy5vdXRsaW5lZCA/ICcnIDogJzxkaXYgY2xhc3M9XCJtZHctbGluZS1yaXBwbGVcIj48L2Rpdj4nfVxuICAgICAgJHshdGhpcy5vdXRsaW5lZCA/ICcnIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWJvcmRlci1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWxlYWRpbmdcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLW5vdGNoXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC10cmFpbGluZ1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGB9XG4gICAgYDtcbiAgfVxuXG5cblxuICAvLyAtLS0ga2V5IGNvbnRyb2xzIC0tLVxuXG4gIG9uS2V5RG93bihlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSByZXR1cm5cblxuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDQwOiAvL2Rvd25cbiAgICAgIGNhc2UgMzk6IC8vcmlnaHRcbiAgICAgICAgdGhpcy5mb2N1c05leHQoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODogLy91cFxuICAgICAgY2FzZSAzNzogLy9sZWZ0XG4gICAgICAgIHRoaXMuZm9jdXNQcmV2aW91cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNlZCgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoZS5rZXlDb2RlID49IDMxIHx8IGUua2V5Q29kZSA8PSA5MCkge1xuICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IHRoaXMua2V5Ym9hcmRTZWFyY2hOb2RlcyhlLmtleUNvZGUpO1xuICAgICAgICAgIGlmIChub2RlSW5kZXggIT09IHVuZGVmaW5lZCkgdGhpcy5zZWxlY3ROb2RlKG5vZGVJbmRleCk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBrZXkgc2VhcmNoaW5nXG4gIC8vICAgaWYgeW91IHByZXNzIFwic1wiIHRoZW4gaXQgd2lsbCBmaW5kIHRoZSBmaXJzdCBpdGVtIHRoYXQgc3RhcnRzIHdpdGggYW4gXCJzXCJcbiAgLy8gICBpZiB5b3UgcHJlc3MgXCJzXCIgdGhlbiBcInRcIiBpdCB3aWxsIGZpbmQgdGhlIGZpcnN0IGl0ZW0gdGhhdCBzdGFydHMgd2l0aCBhbiBcInN0XCJcbiAga2V5Ym9hcmRTZWFyY2hOb2RlcyhrZXlDb2RlKSB7XG4gICAgaWYgKHRoaXMuX2NsZWFyU2VhcmNoVGltZW91dCAhPT0gdW5kZWZpbmVkKSBjbGVhclRpbWVvdXQodGhpcy5fY2xlYXJTZWFyY2hUaW1lb3V0KTtcbiAgICB0aGlzLl9jbGVhclNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2NsZWFyU2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID0gJyc7XG4gICAgICB0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzID0gdW5kZWZpbmVkO1xuICAgIH0sIDMwMCk7XG4gICAgaWYgKHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID09PSB1bmRlZmluZWQpIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID0gJyc7XG4gICAgdGhpcy5fa2V5Ym9hcmRTZWFyY2hTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcbiAgICBjb25zdCBzZWFyY2ggPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyLCAnaScpO1xuXG4gICAgaWYgKCF0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzKSB0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXS5tYXAoZWwgPT4gZWwuaW5uZXJUZXh0KTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2tleWJvYXJkT3B0aW9uTmFtZXMubGVuZ3RoO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaWYgKHNlYXJjaC50ZXN0KHRoaXMuX2tleWJvYXJkT3B0aW9uTmFtZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgaSArPSAxO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE5vZGUoaW5kZXgpIHtcbiAgICBjb25zdCBvcHRpb25FbGVtZW50cyA9IFsuLi50aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1saXN0LWl0ZW0nKV07XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9IGluZGV4O1xuICAgIGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uKSB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1mb2N1c2VkJyk7XG4gICAgdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbkVsZW1lbnRzW3RoaXMuX2ZvY3VzSW5kZXhdO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24uY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgfVxuXG4gIGZvY3VzTmV4dCgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwuaXNPcGVuKCkpIHJldHVybjtcbiAgICBjb25zdCBvcHRpb25FbGVtZW50cyA9IFsuLi50aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1saXN0LWl0ZW0nKV07XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaW5kZXggPSBvcHRpb25FbGVtZW50cy5maW5kSW5kZXgoZWwgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZm9jdXNlZCcpKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gb3B0aW9uRWxlbWVudHNbaW5kZXhdO1xuICAgICAgdGhpcy5fZm9jdXNJbmRleCA9IGluZGV4IDw9IDAgPyAxIDogaW5kZXggKyAxO1xuICAgIH0gZWxzZSB0aGlzLl9mb2N1c0luZGV4ICs9IDE7XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPiBvcHRpb25FbGVtZW50cy5sZW5ndGggLSAxKSB0aGlzLl9mb2N1c0luZGV4ID0gb3B0aW9uRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBmb2N1c1ByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA9PT0gdW5kZWZpbmVkKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBlbHNlIHRoaXMuX2ZvY3VzSW5kZXggLT0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA8PSAwKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBzZWxlY3RGb2N1c2VkKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA9PSB1bmRlZmluZWQgfHwgdGhpcy5fZm9jdXNJbmRleCA+IG9wdGlvbkVsZW1lbnRzLmxlbmd0aCAtIDEpIHRoaXMuX2ZvY3VzSW5kZXggPSAwO1xuICAgIHRoaXMub25QYW5lbENsaWNrKHsgdGFyZ2V0OiBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XSB9KTtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgOmhvc3QtY29udGV4dCgubWR3LWRlbnNpdHktY29tZm9ydGFibGUpIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgYm90dG9tOiAxNXB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21mb3J0YWJsZSkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgIHBhZGRpbmctdG9wOiAxNnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKTpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbWZvcnRhYmxlKSAubWR3LXNlbGVjdF9faWNvbiB7XG4gICAgICAgIGJvdHRvbTogMjBweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCk6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21mb3J0YWJsZSkgbGFiZWwge1xuICAgICAgICB0b3A6IDE4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbXBhY3QpIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgYm90dG9tOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKTpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbXBhY3QpIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdG9wOiAxOHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKTpob3N0LWNvbnRleHQoLm1kdy1kZW5zaXR5LWNvbXBhY3QpIGxhYmVsIHtcbiAgICAgICAgdG9wOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21wYWN0KSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuMXJlbTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QtY29udGV4dCgubWR3LWRlbnNpdHktY29tcGFjdCkgOjpzbG90dGVkKHNlbGVjdCkge1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIHBhZGRpbmctdG9wOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21wYWN0KSBsYWJlbCB7XG4gICAgICAgIHRvcDogMTZweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZC5tZHctZm9jdXNlZCk6aG9zdC1jb250ZXh0KC5tZHctZGVuc2l0eS1jb21wYWN0KSBsYWJlbCxcbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpOmhvc3QtY29udGV4dCgubWR3LWRlbnNpdHktY29tcGFjdCkgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpIHNjYWxlKDAuNzUpO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQobGFiZWwubWR3LWVtcHR5LW5vLWZsb2F0KSB7XG4gICAgICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkKSAubWR3LXNlbGVjdF9faWNvbiB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZykgdHJhbnNsYXRlWSgtNXB4KTtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogMjNweDtcbiAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgcmlnaHQ6IDhweDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCB2YXIoLS1tZHctdGhlbWUtb24tc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1zZWxlY3RfX2ljb24sXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQ6Zm9jdXMpIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSB0cmFuc2xhdGVZKC01cHgpO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDpob3N0KDpub3QoLm1kdy1zZWxlY3QtLWRpc2FibGVkKSkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjU0KTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1vbi1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZDpub3QoLm1kdy1zZWxlY3QtLWRpc2FibGVkKSkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQsXG4gICAgICA6aG9zdCg6bm90KC5tZHctc2VsZWN0LS1kaXNhYmxlZCkpIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkOmZvY3VzOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwJSArIDFweCk7IC8qIGFkZCAxcHggdG8gaGVpZ2h0IHNvIHRoZSB0ZXh0IGRvZXMgbm90IGdldCBwdXNoZWQgdXAgYnkgYm9yZGVyIHNpemUgY2hhbmdlICovXG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIDo6c2xvdHRlZChzZWxlY3QpLFxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDo6c2xvdHRlZChzZWxlY3QpLFxuICAgICAgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggNTJweCA0cHggMTZweDtcbiAgICAgICAgZm9udC1mYW1pbHk6IFJvYm90byxzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjc1cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogLjAwOTM3NWVtO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgfVxuXG4gICAgICAvKiBvdXRsaW5lZCAqL1xuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgOjpzbG90dGVkKHNlbGVjdCksXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIHBhZGRpbmc6IDEycHggNTJweCAxMnB4IDE2cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSA6OnNsb3R0ZWQoc2VsZWN0KSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIH1cblxuICAgICAgOjpzbG90dGVkKHNlbGVjdCkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW2Rpcj1ydGxdKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDo6c2xvdHRlZChzZWxlY3RbZGlyPXJ0bF0pLFxuICAgICAgOmhvc3QoW2Rpcj1ydGxdKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCxcbiAgICAgIC5tZHctc2VsZWN0X19zZWxlY3RlZC10ZXh0W2Rpcj1ydGxdIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1MnB4O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuICAgICAgfVxuXG5cbiAgICAgIGxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS43NXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDA5Mzc1ZW07XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCBjb2xvciAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgICBsaW5lLWhlaWdodDogMS4xNXJlbTtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIGN1cnNvcjogdGV4dDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLW9uLWJhY2tncm91bmQtLXJnYiksIC42KTtcbiAgICAgICAgei1pbmRleDogMTtcblxuICAgICAgICBsZWZ0OiAxNnB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgICAgdG9wOiAyMXB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQpIGxhYmVsIHtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1uby1hbmltYXRpb24pIGxhYmVsIHtcbiAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgIH1cblxuICAgICAgbGFiZWw6bm90KC5tZHctZW1wdHktbm8tZmxvYXQpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MCUpIHNjYWxlKDAuNzUpO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQoc2VsZWN0OmZvY3VzKSArIGxhYmVsLFxuICAgICAgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSkgc2NhbGUoMC43NSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQubWR3LWZvY3VzZWQpIGxhYmVsLFxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEzMiUpIHNjYWxlKDAuNzUpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlbGVjdC0td2l0aC1sZWFkaW5nLWljb24pIGxhYmVsIHtcbiAgICAgICAgbGVmdDogNDhweDtcbiAgICAgICAgcmlnaHQ6IGluaXRpYWw7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIGxhYmVsIHtcbiAgICAgICAgbGVmdDogMTVweDtcbiAgICAgICAgcmlnaHQ6IGluaXRpYWw7XG4gICAgICAgIHRvcDogMThweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZC5tZHctc2VsZWN0LS13aXRoLWxlYWRpbmctaWNvbikgbGFiZWwge1xuICAgICAgICBsZWZ0OiAzNnB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZC5tZHctc2VsZWN0LS13aXRoLWxlYWRpbmctaWNvbikgbGFiZWwubWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUge1xuICAgICAgICBsZWZ0OiAzNnB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1ib3JkZXItY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG4gICAgICAubWR3LW91dGxpbmVkLWxlYWRpbmcge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1ub3RjaCB7XG4gICAgICAgIC1tcy1mbGV4OiAwIDAgYXV0bztcbiAgICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDEycHggKiAyKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC10cmFpbGluZyB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7XG4gICAgICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICB9XG5cbiAgICAgIC5tZHctb3V0bGluZWQtbGVhZGluZyxcbiAgICAgIC5tZHctb3V0bGluZWQtbm90Y2gsXG4gICAgICAubWR3LW91dGxpbmVkLXRyYWlsaW5nIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjU0KTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1ub3RjaCB7XG4gICAgICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgLm1kdy1vdXRsaW5lZC1sZWFkaW5nLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkKSAubWR3LW91dGxpbmVkLW5vdGNoLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkKSAubWR3LW91dGxpbmVkLXRyYWlsaW5nLFxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1vdXRsaW5lZC1sZWFkaW5nLFxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1vdXRsaW5lZC1ub3RjaCxcbiAgICAgIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpIC5tZHctb3V0bGluZWQtdHJhaWxpbmcge1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5pbnZhbGlkKSAubWR3LW91dGxpbmVkLWxlYWRpbmcsXG4gICAgICA6aG9zdCguaW52YWxpZCkgLm1kdy1vdXRsaW5lZC1ub3RjaCxcbiAgICAgIDpob3N0KC5pbnZhbGlkKSAubWR3LW91dGxpbmVkLXRyYWlsaW5nIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctc2hlZXQtYm90dG9tLWhlYWRlcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAodGhpcy5wYXJlbnROb2RlLl9yZWdpc3RlckhlYWRlcikgdGhpcy5wYXJlbnROb2RlLl9yZWdpc3RlckhlYWRlcih0aGlzKTtcbiAgICB0aGlzLnNoZWV0SW5zdGFuY2UgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgdGhpcy5ib3VuZF9jbG9zZSA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX3RvVG9wID0gdGhpcy50b1RvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZSh0aGlzLmlzTW9kYWwsIHRoaXMudGl0bGUsIHRoaXMuaW5uZXJIVE1MKTtcblxuICAgIGNvbnN0IG1kd0hlYWRlciA9IHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWhlYWRlcicpO1xuICAgIGlmIChtZHdIZWFkZXIpIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaGFzLXN0YW5kYXJkLWhlYWRlcicpO1xuICAgICAgbWR3SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCB0aGlzLmNsYXNzTGlzdC50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsb3NlQnV0dG9uICYmIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2Nsb3NlKTtcbiAgICBpZiAodGhpcy5faGFzTWR3SGVhZGVyKSB0aGlzLm1kd0hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfdG9Ub3ApO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiAmJiB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9jbG9zZSk7XG4gICAgaWYgKHRoaXMuX2hhc01kd0hlYWRlcikgdGhpcy5tZHdIZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX3RvVG9wKTtcbiAgfVxuXG4gIGdldCBjbG9zZUJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCcjbWR3LXNoZWV0LWNsb3NlLWFjdGlvbicpO1xuICB9XG5cbiAgZ2V0IG1kd0hlYWRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctaGVhZGVyJyk7XG4gIH1cblxuXG4gIGdldCBpc01vZGFsKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUudHlwZSA9PT0gJ21vZGFsJztcbiAgfVxuXG4gIGdldCB0aXRsZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLl90aXRsZSA/IHRoaXMuX3RpdGxlIDogdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy10aXRsZScpID8gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy10aXRsZScpIDogJyc7XG4gIH1cblxuICBzZXQgdGl0bGUodmFsdWUpIHtcbiAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNNb2RhbCkgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5jbG9zZSgpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5leGl0RnVsbHNjcmVlbigpO1xuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1kaXNhYmxlZCcpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zaG93Jyk7XG4gICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zaG93Jyk7XG4gICAgdGhpcy5pc1Nob3dpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHRvVG9wKCkge1xuICAgIGNvbnNvbGUubG9nKCd0byB0b3AnKVxuICAgIHRoaXMucGFyZW50Tm9kZS5fdHJhbnNpdGlvblRvTmVhcmVzdFBvc2l0aW9uKCk7XG4gIH1cblxuICB0ZW1wbGF0ZShpc01vZGFsLCB0aXRsZSwgaGVhZGVySW5uZXJIVE1MKSB7XG4gICAgY29uc3QgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhoZWFkZXJJbm5lckhUTUwsICd0ZXh0L2h0bWwnKTtcbiAgICBjb25zdCB0b3BCYXIgPSBkb2MucXVlcnlTZWxlY3RvcignbWR3LXNoZWV0LXRvcC1iYXInKTtcbiAgICBpZiAodG9wQmFyKSBoZWFkZXJJbm5lckhUTUwgPSBoZWFkZXJJbm5lckhUTUwucmVwbGFjZSh0b3BCYXIub3V0ZXJIVE1MLCAnJyk7XG4gICAgaWYgKGhlYWRlcklubmVySFRNTCkgdGhpcy5faGFzTWR3SGVhZGVyID0gdHJ1ZTtcbiAgICBcbiAgICByZXR1cm4gYFxuICAgICAgJHt0b3BCYXIgPyB0b3BCYXIub3V0ZXJIVE1MIDogYFxuICAgICAgICA8bWR3LXNoZWV0LXRvcC1iYXI+XG4gICAgICAgICAgPG1kdy1idXR0b24gaWQ9XCJtZHctc2hlZXQtY2xvc2UtYWN0aW9uXCIgY2xhc3M9XCJtZHctaWNvblwiPlxuICAgICAgICAgICAgJHshaXNNb2RhbCA/ICc8bWR3LWljb24+a2V5Ym9hcmRfYXJyb3dfZG93bjwvbWR3LWljb24+JyA6ICc8bWR3LWljb24+Y2xvc2U8L21kdy1pY29uPid9XG4gICAgICAgICAgPC9tZHctYnV0dG9uPlxuICAgICAgICAgICR7dGl0bGV9XG4gICAgICAgIDwvbWR3LXNoZWV0LXRvcC1iYXI+XG4gICAgICBgfVxuXG4gICAgICAke2hlYWRlcklubmVySFRNTCAmJlxuICAgICAgICBgPG1kdy1oZWFkZXI+XG5cbiAgICAgICAgICAke2hlYWRlcklubmVySFRNTH1cbiAgICAgICAgPC9tZHctaGVhZGVyPmBcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5pbXBvcnQgJy4vaGVhZGVyLmpzJztcbmltcG9ydCBTdGFuZGFyZEhlbHBlciBmcm9tICcuL3N0YW5kYXJkLWhlbHBlci5qcyc7XG5pbXBvcnQgTW9kYWxIZWxwZXIgZnJvbSAnLi9tb2RhbC1oZWxwZXIuanMnO1xuaW1wb3J0IHsgYWRkRHJhZ0xpc3RlbmVyLCByZW1vdmVEcmFnTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9jb3JlL2RyYWcuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zaGVldC1ib3R0b20nLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgJ21vZGFsJzpcbiAgICAgICAgdGhpcy5faGVscGVycyA9IG5ldyBNb2RhbEhlbHBlcih0aGlzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2hlbHBlcnMgPSBuZXcgU3RhbmRhcmRIZWxwZXIodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYm91bmRfb25UcmFuc2l0aW9uRW5kID0gdGhpcy5fb25UcmFuc2l0aW9uRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25FbmRDbG9zZSA9IHRoaXMuX29uVHJhbnNpdGlvbkVuZENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbkRyYWcgPSB0aGlzLl9vbkRyYWcuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX2hlbHBlcnMuc2V0dXBIZWFkZXIoKTtcbiAgICB0aGlzLl9zZXR1cE92ZXJTY3JvbGwoKTtcbiAgfVxuXG4gIGdldCB0aXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy10aXRsZScpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdtZHctbW9kYWwnKSkgcmV0dXJuICdtb2RhbCc7XG4gICAgcmV0dXJuICdzdGFuZGFyZCc7XG4gIH1cblxuICBnZXQgY29udGVudEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWNvbnRlbnQnKTtcbiAgfVxuXG4gIGdldCBjb250ZW50SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIGdldCBfaXNEcmFnZ2FibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlbHBlcnMuaXNEcmFnZ2FibGU7XG4gIH1cblxuICBnZXQgX2hlYWRlckhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5faGVscGVycy5oZWFkZXJFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIGdldCBfbWF4U2Nyb2xsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRIZWlnaHQgKyB0aGlzLl9oZWFkZXJIZWlnaHQ7XG4gIH1cblxuICBnZXQgX3RvcFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHZpZXdIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuY29udGVudEhlaWdodDtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSB0aGlzLl9oZWFkZXJIZWlnaHQ7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSByZXR1cm4gdmlld0hlaWdodCAtICg1NSAtIGhlYWRlckhlaWdodCk7XG4gICAgcmV0dXJuIHZpZXdIZWlnaHQgLSAoY29udGVudEhlaWdodCA+PSB2aWV3SGVpZ2h0IC0gaGVhZGVySGVpZ2h0ID8gNTUgLSBoZWFkZXJIZWlnaHQgOiB2aWV3SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gY29udGVudEhlaWdodCk7XG4gIH1cblxuICBnZXQgX3Njcm9sbERpc3RhbmNlUmVtYWluaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXhTY3JvbGwgLSB0aGlzLl9jdXJyZW50UG9zaXRpb247XG4gIH1cblxuICBnZXQgX2luaXRpYWxQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faGVscGVycy5pbml0aWFsUG9zaXRpb247XG4gIH1cblxuICBnZXQgX21pbmltaXplZFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9oZWxwZXJzLm1pbmltaXplZFBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0IF9pc0FuY2hvcmVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LWFuY2hvcmVkJyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBtYWtlIHN1cmUgd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IGxvY2sgdGhlIHBhZ2Ugc2Nyb2xsIGZvciBldmVyXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZHJhZ2dpbmcnKSkge1xuICAgICAgTURXVXRpbHMudW5sb2NrUGFnZVNjcm9sbCgpO1xuICAgICAgTURXVXRpbHMuZGlzYWJsZVVzZXJTZWxlY3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYW5jZWxUcmFuc2l0aW9ucygpO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9jYW5jZWxUcmFuc2l0aW9ucygpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNob3cnKTtcblxuICAgIHRoaXMuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5jb250ZW50SGVpZ2h0ICsgdGhpcy5faGVhZGVySGVpZ2h0fXB4YDtcblxuICAgIHRoaXMuX3Bvc2l0aW9uQm90dG9tKCk7XG4gICAgaWYgKHRoaXMuX2lzQW5jaG9yZWQpIHRoaXMuX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuX21pbmltaXplZFBvc2l0aW9uKTtcbiAgICBlbHNlIHRoaXMuX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuX2luaXRpYWxQb3NpdGlvbik7XG4gICAgdGhpcy5faGVscGVycy5hZGRCYWNrZHJvcCgpO1xuXG4gICAgaWYgKHRoaXMuX2lzRHJhZ2dhYmxlKSB7XG4gICAgICBhZGREcmFnTGlzdGVuZXIodGhpcy5jb250ZW50RWxlbWVudCwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICAgICAgaWYgKHRoaXMuX2hlbHBlcnMuaGVhZGVyRWxlbWVudCkgYWRkRHJhZ0xpc3RlbmVyKHRoaXMuX2hlbHBlcnMuaGVhZGVyRWxlbWVudCwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsb3NlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHJlbW92ZURyYWdMaXN0ZW5lcih0aGlzLmNvbnRlbnRFbGVtZW50LCB0aGlzLmJvdW5kX29uRHJhZyk7XG4gICAgICBpZiAodGhpcy5faGVscGVycy5oZWFkZXJFbGVtZW50KSByZW1vdmVEcmFnTGlzdGVuZXIodGhpcy5faGVscGVycy5oZWFkZXJFbGVtZW50LCB0aGlzLmJvdW5kX29uRHJhZyk7XG4gICAgICB0aGlzLl9jYW5jZWxUcmFuc2l0aW9ucygpO1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctYW5pbWF0aW5nLWNsb3NlJyk7XG4gICAgICB0aGlzLl9wb3NpdGlvbkJvdHRvbSgpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jYW5jZWxUcmFuc2l0aW9ucygpXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNob3cnKTtcbiAgICAgICAgdGhpcy5faGVscGVycy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtaW5pbWl6ZSgpIHtcbiAgICB0aGlzLl9jYW5jZWxUcmFuc2l0aW9ucygpO1xuICAgIHRoaXMuX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuX21pbmltaXplZFBvc2l0aW9uKTtcbiAgfVxuXG4gIGV4aXRGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMuX2NhbmNlbFRyYW5zaXRpb25zKCk7XG4gICAgaWYgKHRoaXMuX2lzQW5jaG9yZWQpIHRoaXMuX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuX21pbmltaXplZFBvc2l0aW9uKTtcbiAgICBlbHNlIHRoaXMuX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuX2luaXRpYWxQb3NpdGlvbik7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctc2hvdycpKSB0aGlzLmNsb3NlKCk7XG4gICAgZWxzZSB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIF9yZWdpc3RlckhlYWRlcihlbGVtZW50KSB7XG4gICAgdGhpcy5faGVscGVycy5yZWdpc3RlckhlYWRlcihlbGVtZW50KTtcbiAgfVxuXG4gIF9wb3NpdGlvblRvcCgpIHtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbih0aGlzLl90b3BQb3NpdGlvbik7XG4gIH1cblxuICBfcG9zaXRpb25Cb3R0b20oKSB7XG4gICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLnN0eWxlLnRvcCA9ICcxMDAlJztcbiAgfVxuXG4gIF9wb3NpdGlvbkluaXRpYWwoKSB7XG4gICAgdGhpcy5fc2V0UG9zaXRpb24odGhpcy5faW5pdGlhbFBvc2l0aW9uKTtcbiAgfVxuXG4gIF9wb3NpdGlvbk1pbmltaXplZCgpIHtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbih0aGlzLl9taW5pbWl6ZWRQb3NpdGlvbik7XG4gIH1cblxuICAvLyBUT0RPIGZpeCB3aGF0ZXIgaXMgY29udGludWFzbHkgY2FsbGluZyB0aGlzXG4gIF9zZXRQb3NpdGlvbih5KSB7XG4gICAgY29uc3QgbWF4U2Nyb2xsID0gdGhpcy5fbWF4U2Nyb2xsO1xuICAgIGxldCBvdmVyU2Nyb2xsID0gMDtcbiAgICBpZiAoeSA+IG1heFNjcm9sbCkge1xuICAgICAgY29uc3Qgc2NhbGUgPSAxMDA7XG4gICAgICBvdmVyU2Nyb2xsID0gc2NhbGUgKiBNYXRoLmxvZygoeSAtIG1heFNjcm9sbCkgKyBzY2FsZSkgLSBzY2FsZSAqIE1hdGgubG9nKHNjYWxlKTtcbiAgICAgIHkgPSBtYXhTY3JvbGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNBdFRvcEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICh0aGlzLl9oZWFkZXJIZWlnaHQgLSA1NSk7XG4gICAgdGhpcy5faXNBdFRvcCA9IHkgPT09IGlzQXRUb3BIZWlnaHQ7XG4gICAgdGhpcy5faXNBYm92ZVRvcCA9IHkgPiBpc0F0VG9wSGVpZ2h0O1xuICAgIHRoaXMuX2lzQXRPckFib3ZlVG9wID0gdGhpcy5faXNBdFRvcCB8fCB0aGlzLl9pc0Fib3ZlVG9wO1xuICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IHk7XG4gICAgdGhpcy5zdHlsZS50b3AgPSBgY2FsYygxMDAlIC0gJHt5ICsgb3ZlclNjcm9sbH1weClgO1xuXG4gICAgY29uc3QgaW5pdGlhbFRvVG9wRGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLl9pbml0aWFsUG9zaXRpb247XG4gICAgY29uc3QgdGFyZ2V0aW5nVG9wID0gIXRoaXMuX2lzQXRPckFib3ZlVG9wICYmICh5IC0gdGhpcy5faW5pdGlhbFBvc2l0aW9uKSA+PSBpbml0aWFsVG9Ub3BEaXN0YW5jZSAvIDI7XG4gICAgY29uc3QgdGFyZ2V0aW5nSW5pdGlhbCA9ICF0aGlzLl9pc0F0T3JBYm92ZVRvcCAmJiAoeSAtIHRoaXMuX2luaXRpYWxQb3NpdGlvbikgPCBpbml0aWFsVG9Ub3BEaXN0YW5jZSAvIDI7XG4gICAgdGhpcy5faGVscGVycy5oYW5kbGVPbk1vdmUoe1xuICAgICAgcG9zaXRpb246IHksXG4gICAgICBpc0F0VG9wOiB0aGlzLl9pc0F0VG9wLFxuICAgICAgaXNBYm92ZVRvcDogdGhpcy5faXNBYm92ZVRvcCxcbiAgICAgIHRhcmdldGluZ1RvcCxcbiAgICAgIHRhcmdldGluZ0luaXRpYWxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGlmIHJlc3RpbmcgYXQgaW5pdGlhbCBwb3NpdGlvbiB0aGVuIHBvc2l0aW9uVG9wXG4gIF90cmFuc2l0aW9uVG9OZWFyZXN0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSB0aGlzLl9jdXJyZW50UG9zaXRpb247XG5cbiAgICAvLyBpZiBpcyBhdCBpbml0aWFsIHBvc2l0aW9uIGJhc2VkIG9uIG9mZnNldFRvcFxuICAgIGlmICh0aGlzLl9pbml0aWFsT2Zmc2V0VG9wID09PSB0aGlzLm9mZnNldFRvcCkge1xuICAgICAgaWYgKG5ld1Bvc2l0aW9uID09PSB0aGlzLl9taW5pbWl6ZWRQb3NpdGlvbikgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuX2luaXRpYWxQb3NpdGlvbik7XG4gICAgICBlbHNlIHJldHVybiB0aGlzLl90cmFuc2l0aW9uVG9Qb3NpdGlvbih0aGlzLl90b3BQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgY29uc3QgaGFsZldheVBvaW50ID0gKHRoaXMuX3RvcFBvc2l0aW9uIC0gdGhpcy5faW5pdGlhbFBvc2l0aW9uKSAvIDI7XG4gICAgaWYgKChuZXdQb3NpdGlvbiAtIHRoaXMuX2luaXRpYWxQb3NpdGlvbikgPj0gaGFsZldheVBvaW50KSB0aGlzLl90cmFuc2l0aW9uVG9Qb3NpdGlvbih0aGlzLl90b3BQb3NpdGlvbik7XG4gICAgZWxzZSB0aGlzLl90cmFuc2l0aW9uVG9Qb3NpdGlvbih0aGlzLl9pbml0aWFsUG9zaXRpb24pO1xuICB9XG5cbiAgX3RyYW5zaXRpb25Ub1Bvc2l0aW9uKHkpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1hbmltYXRpbmctb3BlbicpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuX3NldFBvc2l0aW9uKHkpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25FbmQpO1xuICAgIH0pO1xuICB9XG5cbiAgX2NhbmNlbFRyYW5zaXRpb25zKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWFuaW1hdGluZy1vcGVuJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctYW5pbWF0aW5nLWNsb3NlJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctYW5pbWF0aW5nLXNjcm9sbCcpO1xuICAgIHRoaXMuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJyc7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25FbmQpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuYm91bmRfb25UcmFuc2l0aW9uRW5kQ2xvc2UpO1xuICB9XG5cbiAgX29uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICB0aGlzLl9pbml0aWFsT2Zmc2V0VG9wID0gdGhpcy5vZmZzZXRUb3A7XG4gICAgdGhpcy5fY2FuY2VsVHJhbnNpdGlvbnMoKTtcbiAgfVxuXG4gIF9vblRyYW5zaXRpb25FbmRDbG9zZSgpIHtcbiAgICB0aGlzLl9jYW5jZWxUcmFuc2l0aW9ucygpXG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctc2hvdycpO1xuICAgIHRoaXMuX2hlbHBlcnMucmVtb3ZlQmFja2Ryb3AoKTtcbiAgfVxuXG4gIC8vIC0tLSBkcmFnIC8gc3dpcGVcbiAgX29uRHJhZyhldmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQuc3RhdGUpIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5fY2FuY2VsVHJhbnNpdGlvbnMoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctZHJhZ2dpbmcnKTtcbiAgICAgICAgTURXVXRpbHMubG9ja1BhZ2VTY3JvbGwoKTtcbiAgICAgICAgTURXVXRpbHMuZGlzYWJsZVVzZXJTZWxlY3QoKTtcbiAgICAgICAgLy8gVE9ETyBmaWd1cmUgb3V0IGdsb2JhbCBob3ZlciBkaXNhYmxlXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgdGhpcy5fc2V0UG9zaXRpb24odGhpcy5fc3RhcnRQb3NpdGlvbiAtIGV2ZW50LmRpc3RhbmNlLnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctYW5pbWF0aW5nLXNjcm9sbCcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGxFbmQoZXZlbnQudmVsb2NpdHkueSwgZXZlbnQuZGlyZWN0aW9uLnkpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWRyYWdnaW5nJyk7XG4gICAgICAgIE1EV1V0aWxzLnVubG9ja1BhZ2VTY3JvbGwoKTtcbiAgICAgICAgTURXVXRpbHMuZW5hYmxlVXNlclNlbGVjdCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlU2Nyb2xsRW5kKHZlbG9jaXR5LCBkaXJlY3Rpb24pIHtcbiAgICAvLyBvcGVuIGFsbCB0aGUgd2F5IG9uIHN3aXBlIHVwXG4gICAgaWYgKCF0aGlzLl9pc0F0T3JBYm92ZVRvcCAmJiB2ZWxvY2l0eSA8IC0xLjEpIHRoaXMuX3Bvc2l0aW9uVG9wKCk7XG5cbiAgICAvLyBjbG9zZSB3aGVuIHN3aXBlIGRvd24gZnJvbSBpbml0aWFsIHBvc2l0aW9uXG4gICAgZWxzZSBpZiAoIXRoaXMuX2lzQXRPckFib3ZlVG9wICYmIHZlbG9jaXR5ID4gMC43KSB7XG4gICAgICBpZiAodGhpcy50eXBlID09PSAnbW9kYWwnKSByZXR1cm4gdGhpcy5jbG9zZSgpO1xuICAgICAgcmV0dXJuIHRoaXMubWluaW1pemUoKTtcbiAgICB9XG5cbiAgICAvLyBzY3JvbGxpbmcgYW5kIHNuYXBwaW5nXG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5hYnModmVsb2NpdHkpIC8gMztcbiAgICAgIGxldCBkaXN0YW5jZVRvTW92ZSA9IHRoaXMuX3Njcm9sbERpc3RhbmNlUmVtYWluaW5nICogbXVsdGlwbGllciAqIC1kaXJlY3Rpb247XG4gICAgICBpZiAoZGlzdGFuY2VUb01vdmUgPiB0aGlzLl9zY3JvbGxEaXN0YW5jZVJlbWFpbmluZykgZGlzdGFuY2VUb01vdmUgPSB0aGlzLl9zY3JvbGxEaXN0YW5jZVJlbWFpbmluZztcbiAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gZGlzdGFuY2VUb01vdmUgKyB0aGlzLl9jdXJyZW50UG9zaXRpb247XG5cbiAgICAgIGlmICh0aGlzLl9pc0F0T3JBYm92ZVRvcCkge1xuICAgICAgICBpZiAobmV3UG9zaXRpb24gPCB0aGlzLl90b3BQb3NpdGlvbiArIDgwKSB0aGlzLl9wb3NpdGlvblRvcCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAkeyhtdWx0aXBsaWVyICogMC41KSArIDAuM31zYDtcbiAgICAgICAgICB0aGlzLl9zZXRQb3NpdGlvbihuZXdQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgLy8gc25hcCB0byBlaXRoZXIgdG9wIG9yIGluaXRpYWwuIERvIG5vdCBhbGxvdyBhcmJpdHJhcnkgcG9zaXRpb25pbmcgYmVsb3cgdG9wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBoYWxmV2F5UG9pbnQgPSAodGhpcy5fdG9wUG9zaXRpb24gLSB0aGlzLl9pbml0aWFsUG9zaXRpb24pIC8gMjtcbiAgICAgICAgaWYgKChuZXdQb3NpdGlvbiAtIHRoaXMuX2luaXRpYWxQb3NpdGlvbikgPj0gaGFsZldheVBvaW50KSB0aGlzLl9wb3NpdGlvblRvcCgpO1xuICAgICAgICBlbHNlIHRoaXMuX3Bvc2l0aW9uSW5pdGlhbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9zZXR1cE92ZXJTY3JvbGwoKSB7XG4gICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8ZGl2IGNsYXNzPVwibWR3LXNoZWV0LWJvdHRvbS1vdmVyLXNjcm9sbFwiPjwvZGl2PicpO1xuICB9XG59KTtcbiIsImltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWxIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihjb21wb25lbnRFbGVtZW50KSB7XG4gICAgdGhpcy5jb21wb25lbnRFbGVtZW50ID0gY29tcG9uZW50RWxlbWVudDtcbiAgfVxuXG4gIGdldCBpbml0aWFsUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWluaW1pemVkUG9zaXRpb247XG4gIH1cblxuICBnZXQgbWluaW1pemVkUG9zaXRpb24oKSB7XG4gICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuY29tcG9uZW50RWxlbWVudC5jb250ZW50SGVpZ2h0O1xuICAgIHJldHVybiBNYXRoLm1pbihjb250ZW50SGVpZ2h0LCB0aGlzLmNsaWVudFBvc2l0aW9uKTtcbiAgfVxuXG4gIGdldCBjbGllbnRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgfVxuXG4gIGdldCBpc0RyYWdnYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRFbGVtZW50LmNvbnRlbnRIZWlnaHQgPiB0aGlzLmNsaWVudFBvc2l0aW9uO1xuICB9XG5cbiAgcmVnaXN0ZXJIZWFkZXIoZWxlbWVudCkge1xuICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5oZWFkZXJFbGVtZW50LnRpdGxlID0gdGhpcy50aXRsZTtcbiAgfVxuXG4gIHNldHVwSGVhZGVyKCkge1xuICAgIHRoaXMuY29tcG9uZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgPG1kdy1zaGVldC1ib3R0b20taGVhZGVyIG1kdy10aXRsZT1cIiR7dGhpcy5jb21wb25lbnRFbGVtZW50LnRpdGxlfVwiPjwvbWR3LXNoZWV0LWJvdHRvbS1oZWFkZXI+YCk7XG4gIH1cblxuICBhZGRCYWNrZHJvcCgpIHtcbiAgICB0aGlzLmJhY2tkcm9wID0gTURXVXRpbHMuYWRkQmFja2Ryb3AodGhpcy5jb21wb25lbnRFbGVtZW50LCAoKSA9PiB7XG4gICAgICB0aGlzLmNvbXBvbmVudEVsZW1lbnQuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUJhY2tkcm9wKCkge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgIHRoaXMuYmFja2Ryb3AgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBoYW5kbGVPbk1vdmUoeyBwb3NpdGlvbiwgaXNBdFRvcCwgaXNBYm92ZVRvcCwgdGFyZ2V0aW5nVG9wLCB0YXJnZXRpbmdJbml0aWFsIH0pIHtcbiAgICBpZiAodGFyZ2V0aW5nVG9wIHx8IGlzQXRUb3AgfHwgaXNBYm92ZVRvcCkgdGhpcy5oZWFkZXJFbGVtZW50LnNob3coKTtcbiAgICBlbHNlIHRoaXMuaGVhZGVyRWxlbWVudC5oaWRlKCk7XG5cbiAgICBpZiAoaXNBdFRvcCB8fCBpc0Fib3ZlVG9wKSB0aGlzLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWZ1bGxzY3JlZW4nKTtcbiAgICBlbHNlIHRoaXMuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZnVsbHNjcmVlbicpO1xuXG4gICAgaWYgKGlzQWJvdmVUb3ApIHRoaXMuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctaXMtYWJvdmUtdG9wJyk7XG4gICAgZWxzZSB0aGlzLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWlzLWFib3ZlLXRvcCcpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGFyZEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbXBvbmVudEVsZW1lbnQgPSBjb21wb25lbnRFbGVtZW50O1xuICAgIHRoaXMuaXNBbmNob3JlZCA9IGNvbXBvbmVudEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtZHctYW5jaG9yZWQnKTtcbiAgfVxuXG4gIGdldCBpbml0aWFsUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50RWxlbWVudC5faGVhZGVySGVpZ2h0ICsgKHdpbmRvdy5pbm5lckhlaWdodCAvIDQpO1xuICB9XG5cbiAgZ2V0IG1pbmltaXplZFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudEVsZW1lbnQuX2hlYWRlckhlaWdodDtcbiAgfVxuXG4gIGdldCBjbGllbnRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IC8gNDtcbiAgfVxuXG4gIGdldCBpc0RyYWdnYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRFbGVtZW50LmNvbnRlbnRIZWlnaHQgPiB0aGlzLmNsaWVudFBvc2l0aW9uO1xuICB9XG5cbiAgcmVnaXN0ZXJIZWFkZXIoZWxlbWVudCkge1xuICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5oZWFkZXJFbGVtZW50LnRpdGxlID0gdGhpcy50aXRsZTtcbiAgfVxuXG4gIHNldHVwSGVhZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY29tcG9uZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdtZHctaGVhZGVyJyk7XG4gICAgdGhpcy5jb21wb25lbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8bWR3LXNoZWV0LWJvdHRvbS1oZWFkZXIgbWR3LXRpdGxlPVwiJHt0aGlzLmNvbXBvbmVudEVsZW1lbnQudGl0bGV9XCIgY2xhc3M9XCIke2hlYWRlci5jbGFzc0xpc3QudG9TdHJpbmcoKX1cIj4ke2hlYWRlciAmJiBoZWFkZXIuaW5uZXJIVE1MfTwvbWR3LXNoZWV0LWJvdHRvbS1oZWFkZXI+YCk7XG4gICAgaWYgKGhlYWRlcikgaGVhZGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkQmFja2Ryb3AoKSB7XG5cbiAgfVxuXG4gIHJlbW92ZUJhY2tkcm9wKCkge1xuICAgIFxuICB9XG5cbiAgaGFuZGxlT25Nb3ZlKHsgcG9zaXRpb24sIGlzQXRUb3AsIGlzQWJvdmVUb3AsIHRhcmdldGluZ1RvcCwgdGFyZ2V0aW5nSW5pdGlhbCB9KSB7XG4gICAgaWYgKHRhcmdldGluZ1RvcCB8fCBpc0F0VG9wIHx8IGlzQWJvdmVUb3ApIHRoaXMuaGVhZGVyRWxlbWVudC5zaG93KCk7XG4gICAgZWxzZSB0aGlzLmhlYWRlckVsZW1lbnQuaGlkZSgpO1xuXG4gICAgaWYgKGlzQXRUb3AgfHwgaXNBYm92ZVRvcCkgdGhpcy5oZWFkZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21kdy1mdWxsc2NyZWVuJyk7XG4gICAgZWxzZSB0aGlzLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWZ1bGxzY3JlZW4nKTtcblxuICAgIGlmIChpc0Fib3ZlVG9wKSB0aGlzLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWlzLWFib3ZlLXRvcCcpO1xuICAgIGVsc2UgdGhpcy5oZWFkZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1pcy1hYm92ZS10b3AnKTtcbiAgfVxufVxuICIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5pbXBvcnQgeyBhZGRTd2lwZUxpc3RlbmVyLCByZW1vdmVTd2lwZUxpc3RlbmVyIH0gZnJvbSAnLi4vLi4vY29yZS9zd2lwZS5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNoZWV0LXNpZGUnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fdXNlQmFja2Ryb3AgPSAhdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1uby1iYWNrZHJvcCcpO1xuXG4gICAgdGhpcy5ib3VuZF9vblN3aXBlID0gdGhpcy5vblN3aXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSA9IHRoaXMucm91dGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX2lzTmF2aWdhdGlvbkRyYXdlciA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctbmF2aWdhdGlvbi1kcmF3ZXInKTtcbiAgICBpZiAodGhpcy5faXNOYXZpZ2F0aW9uRHJhd2VyKSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21kdy1oYXMtbmF2aWdhdGlvbi1kcmF3ZXInKTtcblxuICAgIC8vIGF1dG8gYWRkIG1vZGFsIGZvciBtb2JpbGVcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHRoaXMuc2V0QXR0cmlidXRlKCdtZHctbW9kYWwnLCAnJyk7XG5cbiAgICAvLyB0aGUgdXNlIGNhbiBhZGQgdGhlIG1vZGFsIGNsYXNzIG1hbnVhbGx5IHNvIHdlIGRvbid0IHdhbnQgdG8gdXNlIHRoZSBzYW1lIGlzTW9iaWxlIGNoZWNrXG4gICAgaWYgKHRoaXMuX2lzTmF2aWdhdGlvbkRyYXdlciAmJiB0aGlzLmlzTW9kYWwpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWR3LW5hdmlnYXRpb24tZHJhd2VyLW1vZGFsJyk7XG4gICAgfVxuXG4gICAgLy8gYXV0byBoaWRlIGlmIG1vZGFsIGFuZCBuYXZpZ2F0aW9uXG4gICAgaWYgKHRoaXMuaXNNb2RhbCAmJiB0aGlzLl9pc05hdmlnYXRpb25EcmF3ZXIgJiYgIXRoaXMuaXNIaWRkZW4gJiYgIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctc2hvdycpKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1oaWRlJyk7XG4gICAgZWxzZSBpZiAodGhpcy5faXNOYXZpZ2F0aW9uRHJhd2VyKSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21kdy1uYXZpZ2F0aW9uLWRyYXdlci1vcGVuJyk7XG4gICAgZWxzZSBpZiAodGhpcy5pc01vZGFsICYmICF0aGlzLmlzSGlkZGVuKSB7XG4gICAgICBpZiAodGhpcy5fdXNlQmFja2Ryb3ApIHRoaXMuX2JhY2tkcm9wID0gTURXVXRpbHMuYWRkQmFja2Ryb3AodGhpcywgKCkgPT4gdGhpcy5jbG9zZSgpLCB7IHNoZWV0OiB0cnVlIH0pO1xuICAgIH1cblxuICAgICAvLyBicm93c2VyIGV2ZW50cyBmb3IgdXJsIGNoYW5nZXMuIG9ubHkgdXNlIHRoaXMgZm9yIG5hdmlnYXRpb25cbiAgICBpZiAodGhpcy5faXNOYXZpZ2F0aW9uRHJhd2VyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuYm91bmRfcm91dGVDaGFuZ2UpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmJvdW5kX3JvdXRlQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5fYmFja2Ryb3ApIHRoaXMuX2JhY2tkcm9wLnJlbW92ZSgpO1xuICAgIHJlbW92ZVN3aXBlTGlzdGVuZXIoZG9jdW1lbnQuYm9keSwgdGhpcy5ib3VuZF9vblN3aXBlKTtcblxuICAgIGlmICh0aGlzLl9pc05hdmlnYXRpb25EcmF3ZXIpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9yb3V0ZUNoYW5nZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHRoaXMuYm91bmRfcm91dGVDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc01vZGFsKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LW1vZGFsJyk7XG4gIH1cblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctaGlkZScpO1xuICB9XG5cbiAgZ2V0IGlzTGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1sZWZ0JykgfHwgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1uYXZpZ2F0aW9uLWRyYXdlcicpO1xuICB9XG5cbiAgc2V0IHVzZUJhY2tkcm9wKHZhbHVlKSB7XG4gICAgdGhpcy5fdXNlQmFja2Ryb3AgPSAhIXZhbHVlO1xuICB9XG5cbiAgZ2V0IHBhdGgoKSB7XG4gICAgbGV0IHBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC8uKiMvLCAnJyk7XG4gICAgaWYgKHBhdGguaW5kZXhPZignPycpID4gLTEpIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF07XG4gICAgaWYgKHBhdGguY2hhckF0KDApICE9PSAnLycpIHBhdGggPSAnLycgKyBwYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgcm91dGVDaGFuZ2UoKSB7XG4gICAgLy8gcmVtb3ZlIGN1cnJlbnQgbGlua3NcbiAgICBjb25zdCBjdXJyZW50TGlua3MgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZHctY3VycmVudC1saW5rJyk7XG4gICAgY3VycmVudExpbmtzLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWN1cnJlbnQtbGluaycpKTtcblxuICAgIC8vIGFkZCBjdXJyZW50IGxpbmtzXG4gICAgbGV0IG1hdGNoaW5nTGlua3MgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoYFtocmVmPVwiIyR7dGhpcy5wYXRofVwiXWApO1xuICAgIGlmICghbWF0Y2hpbmdMaW5rcyB8fCBtYXRjaGluZ0xpbmtzLmxlbmd0aCA9PT0gMCkgbWF0Y2hpbmdMaW5rcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbChgW2FsdC1ocmVmPVwiIyR7dGhpcy5wYXRofVwiXWApO1xuICAgIG1hdGNoaW5nTGlua3MuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QuYWRkKCdtZHctY3VycmVudC1saW5rJykpO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWhpZGUnKSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1oaWRlJyk7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zaG93Jyk7XG4gICAgICBpZiAodGhpcy5pc01vZGFsKSB7XG4gICAgICAgIGFkZFN3aXBlTGlzdGVuZXIoZG9jdW1lbnQuYm9keSwgdGhpcy5ib3VuZF9vblN3aXBlKTtcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJhY2tkcm9wKSB0aGlzLl9iYWNrZHJvcCA9IE1EV1V0aWxzLmFkZEJhY2tkcm9wKHRoaXMsICgpID0+IHRoaXMuY2xvc2UoKSwgeyBzaGVldDogdHJ1ZSB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzTmF2aWdhdGlvbkRyYXdlcikgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtZHctbmF2aWdhdGlvbi1kcmF3ZXItb3BlbicpO1xuICAgIH0sIDEwKTsgLy8gdGhpcyBpcyBhIHRlbXBvcmFyeSBmaXhcbiAgfVxuXG4gIGFzeW5jIGNsb3NlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNob3cnKTtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWhpZGUnKTtcbiAgICAgIGlmICh0aGlzLl9iYWNrZHJvcCkgdGhpcy5fYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgICByZW1vdmVTd2lwZUxpc3RlbmVyKGRvY3VtZW50LmJvZHksIHRoaXMuYm91bmRfb25Td2lwZSk7XG5cbiAgICAgIGlmICh0aGlzLl9pc05hdmlnYXRpb25EcmF3ZXIpIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LW5hdmlnYXRpb24tZHJhd2VyLW9wZW4nKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNIaWRkZW4pIHRoaXMub3BlbigpO1xuICAgIGVsc2UgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgb25Td2lwZShldmVudCkge1xuICAgIGlmICh0aGlzLmlzTGVmdCkge1xuICAgICAgaWYgKGV2ZW50LmRpcmVjdGlvbi54ID09PSAtMSAmJiBldmVudC52ZWxvY2l0eS54IDwgLTAuOCkgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZXZlbnQuZGlyZWN0aW9uLnggPT09IDEgJiYgZXZlbnQudmVsb2NpdHkueCA+IDAuOCkgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuaW1wb3J0IHsgYWRkRHJhZ0xpc3RlbmVyLCByZW1vdmVEcmFnTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9jb3JlL2RyYWcuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zbGlkZXInLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICAgIHRoaXMuYm91bmRfb25Nb3VzZURvd24gPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlVXAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlRW50ZXIgPSB0aGlzLm9uTW91c2VFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25Nb3VzZUxlYXZlID0gdGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX3RyYWNrQ2xpY2sgPSB0aGlzLnRyYWNrQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5hdHRyVmFsdWU7XG4gICAgdGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7KCh0aGlzLmF0dHJWYWx1ZSAtIHRoaXMubWluKSAvIHRoaXMucmFuZ2UpICogdGhpcy5vZmZzZXRXaWR0aH1weGA7XG4gICAgdGhpcy5ub3RjaENvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYC0ke3RoaXMub2Zmc2V0V2lkdGggLSAoKCh0aGlzLmF0dHJWYWx1ZSAtIHRoaXMubWluKSAvIHRoaXMucmFuZ2UpICogdGhpcy5vZmZzZXRXaWR0aCl9cHhgO1xuICAgIHRoaXMudGhyb3R0bGVkX2Rpc3BhdGNoQ2hhbmdlID0gTURXVXRpbHMucmFmVGhyb3R0bGUodGhpcy5kaXNwYXRjaENoYW5nZSk7XG4gICAgLy8gdGhpcy50aHVtYi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX29uTW91c2VEb3duKTtcbiAgICAvLyB0aGlzLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLmJvdW5kX29uTW91c2VFbnRlcik7XG4gICAgLy8gdGhpcy50cmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfdHJhY2tDbGljayk7XG4gICAgYWRkRHJhZ0xpc3RlbmVyKHRoaXMudGh1bWIsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIHRoaXMudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5ib3VuZF9vbk1vdXNlRG93bik7XG4gICAgLy8gdGhpcy50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5ib3VuZF9vbk1vdXNlRW50ZXIpO1xuICAgIC8vIHRoaXMudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuYm91bmRfb25Nb3VzZUxlYXZlKTtcbiAgICB0aGlzLnRyYWNrLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF90cmFja0NsaWNrKTtcbiAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZF9vbk1vdXNlVXApO1xuICAgIC8vIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRfb25Nb3VzZU1vdmUpO1xuICAgIHJlbW92ZURyYWdMaXN0ZW5lcih0aGlzLnRodW1iLCB0aGlzLmJvdW5kX29uRHJhZyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWyd2YWx1ZScsICdtaW4nLCAnbWF4JywgJ3N0ZXAnXTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgaWYgKFsnbWluJywgJ21heCcsICdzdGVwJ10uaW5jbHVkZXMobmFtZSkpIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgbWluKCkge1xuICAgIHJldHVybiB0aGlzLm1pbl8gfHwgMDtcbiAgfVxuXG4gIHNldCBtaW4odmFsdWUpIHtcbiAgICB0aGlzLm1pbl8gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBtYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4XyB8fCAxMDA7XG4gIH1cblxuICBzZXQgbWF4KHZhbHVlKSB7XG4gICAgdGhpcy5tYXhfID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgcmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4IC0gdGhpcy5taW47XG4gIH1cblxuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwXztcbiAgfVxuXG4gIHNldCBzdGVwKHZhbHVlKSB7XG4gICAgdGhpcy5zdGVwXyA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHN0ZXBDb3VudCgpIHtcbiAgICByZXR1cm4gIXRoaXMuc3RlcCA/IDAgOiBNYXRoLmZsb29yKHRoaXMucmFuZ2UgLyB0aGlzLnN0ZXApO1xuICB9XG5cbiAgZ2V0IGF0dHJWYWx1ZSgpIHtcbiAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpIHx8IDApO1xuICAgIGlmICh2YWx1ZSA8IHRoaXMubWluKSB2YWx1ZSA9IHRoaXMubWluO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBjb25zdCB7IHdpZHRoIH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHggPSAodGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0IHx8ICcwcHgnKS5yZXBsYWNlKCdweCcsICcnKTtcbiAgICBjb25zdCBwZXJjZW50ID0geCAvIHdpZHRoO1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5yYW5nZTtcbiAgICB0aGlzLnZhbHVlXyA9IHRoaXMubWluICsgKHBlcmNlbnQgKiByYW5nZSk7XG4gICAgLy8gY2hlY2sgaWYgdGhlIHN0ZXAgaXMgYSBpbnRlZ2VyIGFuZCB0aGVuIGdhcmVudGVlIHRoZSB2YWx1ZSBpcyBhbiBpbnRcbiAgICAvLyBiZWN1YXNlIG9mIGhvdyBtYXRoIHdvcmtzIGluIGphdmFzY3JpcHQoZmxvYXRpbmcgcG9pbnQpIHRoaXMgaXMgbm90IGEgZ2FyZW50ZWUgd2l0aG91dCBwYXJzZUludFxuICAgIGlmICghKCcnK3RoaXMuc3RlcCkuaW5jbHVkZXMoJy4nKSkgdGhpcy52YWx1ZV8gPSBwYXJzZUludCh0aGlzLnZhbHVlXyk7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVfIHx8IDA7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlXyA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHRodW1iKCkge1xuICAgIHJldHVybiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zbGlkZXJfX3RodW1iLWhvdmVyJyk7XG4gIH1cblxuICBnZXQgdGh1bWJDb250YWluZXIoKSB7XG4gICAgaWYgKCF0aGlzLnRodW1iQ29udGFpbmVyXykgdGhpcy50aHVtYkNvbnRhaW5lcl8gPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lcicpO1xuICAgIHJldHVybiB0aGlzLnRodW1iQ29udGFpbmVyXztcbiAgfVxuXG4gIGdldCBub3RjaENvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMubm90Y2hDb250YWluZXJfKSB0aGlzLm5vdGNoQ29udGFpbmVyXyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fbm90Y2gtY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIHRoaXMubm90Y2hDb250YWluZXJfO1xuICB9XG5cbiAgZ2V0IHRyYWNrKCkge1xuICAgIHJldHVybiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lcicpO1xuICB9XG5cbiAgdHJhY2tDbGljayhlKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgeCA9IGUubGF5ZXJYO1xuICAgIGlmIChlLmNsaWVudFggPCBsZWZ0KSB4ID0gMDtcbiAgICBpZiAoeCA+IHdpZHRoKSB4ID0gd2lkdGg7XG4gICAgdGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5zbmFwKHgsIHdpZHRoKX1weGA7XG4gICAgdGhpcy5ub3RjaENvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYC0ke3RoaXMub2Zmc2V0V2lkdGggLSB0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gIH1cblxuICBvbkRyYWcoZSkge1xuICAgIHN3aXRjaChlLnN0YXRlKSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXByZXNzZWQnKTtcbiAgICAgICAgdGhpcy5pbml0aWFsWF8gPSBwYXJzZUludCgodGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0IHx8ICcwcHgnKS5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW92ZSc6XG4gICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCB4ID0gZS5kaXN0YW5jZS54ICsgdGhpcy5pbml0aWFsWF87XG4gICAgICAgIGlmICh4IDwgMCkgeCA9IDA7XG4gICAgICAgIGlmICh4ID4gd2lkdGgpIHggPSB3aWR0aDtcbiAgICAgICAgdGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5zbmFwKHgsIHdpZHRoKX1weGA7XG4gICAgICAgIHRoaXMubm90Y2hDb250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9IGAtJHt0aGlzLm9mZnNldFdpZHRoIC0gdGhpcy5zbmFwKHgsIHdpZHRoKX1weGA7XG4gICAgICAgIHRoaXMudGhyb3R0bGVkX2Rpc3BhdGNoQ2hhbmdlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctcHJlc3NlZCcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRG93bihlKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctcHJlc3NlZCcpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX29uTW91c2VVcCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSk7XG4gIH1cblxuICBvbk1vdXNlVXAoZSkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXByZXNzZWQnKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZF9vbk1vdXNlVXApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRfb25Nb3VzZU1vdmUpO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZSkge1xuICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IHggPSBlLmxheWVyWDtcbiAgICBpZiAoZS5jbGllbnRYIDwgbGVmdCkgeCA9IDA7XG4gICAgaWYgKHggPiB3aWR0aCkgeCA9IHdpZHRoO1xuICAgIHRoaXMudGh1bWJDb250YWluZXIuc3R5bGUubGVmdCA9IGAke3RoaXMuc25hcCh4LCB3aWR0aCl9cHhgO1xuICAgIHRoaXMubm90Y2hDb250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9IGAtJHt0aGlzLm9mZnNldFdpZHRoIC0gdGhpcy5zbmFwKHgsIHdpZHRoKX1weGA7XG4gICAgdGhpcy50aHJvdHRsZWRfZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uTW91c2VFbnRlcihlKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctaG92ZXInKTtcbiAgICB0aGlzLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmJvdW5kX29uTW91c2VMZWF2ZSk7XG4gIH1cblxuICBvbk1vdXNlTGVhdmUoZSkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWhvdmVyJyk7XG4gICAgdGhpcy50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTGVhdmUpO1xuICB9XG5cbiAgc25hcCh4LCB3aWR0aCkge1xuICAgIGlmICghdGhpcy5zdGVwKSByZXR1cm4geDtcbiAgICBjb25zdCBwZXJjZW50ID0geCAvIHdpZHRoO1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5yYW5nZTtcbiAgICBjb25zdCBjb252ZXJ0ZWRWYWx1ZSA9IHBlcmNlbnQgKiByYW5nZTtcbiAgICBjb25zdCBzbmFwZWRWYWx1ZSA9IGNvbnZlcnRlZFZhbHVlIC0gKGNvbnZlcnRlZFZhbHVlICUgdGhpcy5zdGVwKTtcbiAgICByZXR1cm4gKHNuYXBlZFZhbHVlIC8gcmFuZ2UpICogd2lkdGhcbiAgfVxuXG4gIGRpc3BhdGNoQ2hhbmdlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHRoaXMpKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fdHJhY2stY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190cmFja1wiPjwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX19ub3RjaC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fbm90Y2gtcHJlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgJHtbLi4ubmV3IEFycmF5KHRoaXMuc3RlcENvdW50KV0ubWFwKGkgPT4gYDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX19ub3RjaFwiPjwvZGl2PmApLmpvaW4oJ1xcbicpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAke1suLi5uZXcgQXJyYXkodGhpcy5zdGVwQ291bnQpXS5tYXAoaSA9PiBgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX25vdGNoXCI+PC9kaXY+YCkuam9pbignXFxuJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fdGh1bWItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190aHVtYlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fdGh1bWItaG92ZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIC5tZHctc2xpZGVyX190cmFjay1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBtYXJnaW4tdG9wOiAtNnB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX3RyYWNrIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7ICovXG4gICAgICB9XG5cbiAgICAgIC8qIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1zbGlkZXJfX3RyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXNsaWRlcl9fdHJhY2sge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfSAqL1xuXG5cbiAgICAgIC5tZHctc2xpZGVyX190aHVtYi1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX3RodW1iIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBtYXJnaW4tdG9wOiAtNTAlO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXNsaWRlcl9fdGh1bWIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctc2xpZGVyX190aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX190aHVtYi1ob3ZlciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgdG9wOiAtMTJweDtcbiAgICAgICAgbGVmdDogLTZweDtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4xcyBlYXNlLW91dCxmaWxsIC4xcyBlYXNlLW91dCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIC4xcyBlYXNlLW91dCxmaWxsIC4xcyBlYXNlLW91dDtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXNsaWRlcl9fdGh1bWItaG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1wcmltYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1zbGlkZXJfX3RodW1iLWhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWhvdmVyKSAubWR3LXNsaWRlcl9fdGh1bWItaG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByZXNzZWQpIC5tZHctc2xpZGVyX190aHVtYi1ob3ZlciB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcbiAgICAgIH1cblxuXG5cblxuICAgICAgLyogLS0tIG5vdGNoZXMgLS0tICovXG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogMjAwJTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXNsaWRlcl9fbm90Y2gtcHJlLWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1zbGlkZXJfX25vdGNoLXByZS1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICAubWR3LXNsaWRlcl9fbm90Y2gtcHJlLWNvbnRhaW5lciAubWR3LXNsaWRlcl9fbm90Y2gge1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1wb3N0LWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnktLXJnYiksIDAuNSk7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX19ub3RjaC1wb3N0LWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuNSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctc2xpZGVyX19ub3RjaC1wb3N0LWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWVycm9yLS1yZ2IpLCAwLjUpO1xuICAgICAgfVxuXG4gICAgICAubWR3LXNsaWRlcl9fbm90Y2gtcG9zdC1jb250YWluZXIgLm1kdy1zbGlkZXJfX25vdGNoIHtcbiAgICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjYpO1xuICAgICAgfVxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCBNRFdTbmFja2JhciBmcm9tICcuL3NlcnZpY2UuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zbmFja2JhcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UgPSB0aGlzLm9uUGFuZWxDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGFuZWxJZCA9IGAke3RoaXMuZ2V0QXR0cmlidXRlKCdpZCcpfV9wYW5lbGA7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYW5lbCcpLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHt0aGlzLnBhbmVsSWR9YCk7XG4gICAgdGhpcy5oYXNCY2tkcm9wID0gdHJ1ZTtcbiAgICB0aGlzLnBhbmVsLmNsaWNrT3V0c2lkZUNsb3NlID0gZmFsc2U7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25QYW5lbENsb3NlKTtcbiAgfVxuXG4gIGdldCBwYW5lbCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5wYW5lbElkfWApO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uXyB8fCAnaW5uZXItYm90dG9tIGlubmVyLWxlZnQnO1xuICB9XG5cbiAgc2V0UG9zaXRpb24odmFsdWUpIHtcbiAgICBjb25zdCBzcGxpdCA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gICAgdGhpcy5wb3NpdGlvbl8gPSBgJHtzcGxpdFswXSB8fCAndG9wJ30gJHtzcGxpdFsxXSB8fCAnbGVmdCd9YDtcbiAgICB0aGlzLnBhbmVsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICBNRFdTbmFja2Jhci5hZGQodGhpcyk7XG4gIH1cblxuICBjbG9zZShvaykge1xuICAgIE1EV1NuYWNrYmFyLnJlbW92ZSh0aGlzLCBvayk7XG4gIH1cblxuICBfb3BlbigpIHtcbiAgICB0aGlzLnBhbmVsLmhvaXN0VG9Cb2R5KHRoaXMucGFyZW50Tm9kZSk7XG4gICAgdGhpcy5wYW5lbC5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcbiAgICB0aGlzLnBhbmVsLmF1dG9Qb3NpdGlvbigpO1xuICAgIHRoaXMucGFuZWwub3BlbigpO1xuICAgIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICAgIHRoaXMuYXV0b0NhbmNlbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIF9jbG9zZShvaykge1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICAgIHRoaXMucGFuZWwuY2xvc2UoKTtcbiAgICB0aGlzLmRpc3BhdGNoQ2xvc2Uob2spO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmF1dG9DYW5jZWxUaW1lb3V0KTtcblxuICAgIC8vIHJlbW92ZSBwYW5lbCBlbGVtZW50XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnBhbmVsLnJlbW92ZSgpO1xuICAgIH0sIDIwMCk7XG4gIH1cblxuICBvblBhbmVsQ2xvc2UoKSB7XG4gICAgdGhpcy5wYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gIH1cblxuICBkaXNwYXRjaENsb3NlKGlzT2sgPSBmYWxzZSkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Nsb3NlJywge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIG9rOiBpc09rXG4gICAgICB9XG4gICAgfSkpO1xuICB9XG59KTtcbiIsImNvbnN0IE1EV1NuYWNrYmFyID0gbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICB9XG5cbiAgYWRkKGVsKSB7XG4gICAgdGhpcy5xdWV1ZS5wdXNoKHtlbH0pO1xuICAgIHRoaXMuaGFuZGxlUXVldWUoKTtcbiAgfVxuXG4gIHJlbW92ZShlbCwgb2spIHtcbiAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC5lbCA9PT0gZWwpIGVsLl9jbG9zZShvayk7XG4gICAgZWxzZSB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS5maWx0ZXIoZSA9PiBlLmVsICE9PSBlbCk7XG4gIH1cblxuICBoYW5kbGVRdWV1ZSgpIHtcbiAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGlmICghdGhpcy5jdXJyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICB0aGlzLmN1cnJlbnQuZWwuX29wZW4oKTtcbiAgICAgIHRoaXMuY3VycmVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1ZXVlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaG93KHsgbWVzc2FnZSwgYWN0aW9uTGFiZWwsIHBvc2l0aW9uIH0pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMudWlkKCk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoeyBpZCwgbWVzc2FnZSwgYWN0aW9uTGFiZWwgfSk7XG5cbiAgICAgIHRoaXMudG9wTGV2ZWxFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGVtcGxhdGUpO1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcbiAgICAgIGNvbnN0IG9uY2xvc2UgPSAoZSkgPT4ge1xuICAgICAgICByZXNvbHZlKGUuZGV0YWlsLm9rKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICAgICAgZWwucmVtb3ZlKCk7XG4gICAgICB9O1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICAgIGlmIChwb3NpdGlvbikgZWwuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgZWwuc2hvdygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHRvcExldmVsRWxlbWVudCgpIHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJ21kdy1jb250ZW50Jyk7XG4gICAgaWYgKGVsKSByZXR1cm4gZWw7XG5cbiAgICBlbCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignbWR3LWJvZHknKTtcbiAgICBpZiAoZWwpIHJldHVybiBlbDtcblxuICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgdWlkKCkge1xuICAgIHJldHVybiBgc25hY2tiYXJfJHtwYXJzZUludChNYXRoLnJhbmRvbSgpICogOTk5OTkpfWA7XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGlkLCBtZXNzYWdlLCBhY3Rpb25MYWJlbCB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxtZHctc25hY2tiYXIgaWQ9XCIke2lkfVwiPlxuICAgICAgICA8bWR3LXBhbmVsPlxuICAgICAgICAgIDxtZHctc25hY2tiYXItY29udGFpbmVyPlxuICAgICAgICAgICAgPG1kdy1zbmFja2Jhci1jb250ZW50PiR7bWVzc2FnZX08L21kdy1zbmFja2Jhci1jb250ZW50PlxuICAgICAgICAgICAgPG1kdy1zbmFja2Jhci1hY3Rpb25zPlxuICAgICAgICAgICAgICAkeyEhYWN0aW9uTGFiZWwgPyBgPG1kdy1idXR0b24gY2xhc3M9XCJtZHctYWN0aW9uLWJ1dHRvblwiPiR7YWN0aW9uTGFiZWx9PC9tZHctYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgICAgICAgPG1kdy1idXR0b24gb25jbGljaz1cIiR7aWR9LmNsb3NlKHRydWUpXCIgY2xhc3M9XCJtZHctY2xvc2UtYnV0dG9uIG1kdy1pY29uXCI+XG4gICAgICAgICAgICAgICAgPG1kdy1pY29uPmNsb3NlPC9tZHctaWNvbj5cbiAgICAgICAgICAgICAgPC9tZHctYnV0dG9uPlxuICAgICAgICAgICAgPC9tZHctc25hY2tiYXItYWN0aW9ucz5cbiAgICAgICAgICA8L21kdy1zbmFja2Jhci1jb250YWluZXI+XG4gICAgICAgIDwvbWR3LXBhbmVsPlxuICAgICAgPC9tZHctc25hY2tiYXI+XG4gICAgYDtcbiAgfVxufVxuXG53aW5kb3cuTURXU25hY2tiYXIgPSBNRFdTbmFja2JhcjtcblxuZXhwb3J0IGRlZmF1bHQgTURXU25hY2tiYXI7XG4iLCJpbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5pbXBvcnQgTURXVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3NlcnZpY2UuanMnO1xuXG5jb25zdCB0ZW1wbGF0ZVR5cGVzID0gW1xuICAncGFuZWwnLFxuICAnc2hlZXRCb3R0b20nLFxuICAnc2hlZXRTaWRlJ1xuXTtcblxuY29uc3QgYW5pbWF0aW9uVHlwZXMgPSBbXG4gICdzY2FsZScsXG4gICdoZWlnaHQnXG5dO1xuXG5jb25zdCBhbmltYXRpb25PcmlnaW4gPSBbXG4gICd0b3AnLFxuICAnY2VudGVyJ1xuXTtcblxuY2xhc3MgTURXU3VyZmFjZUluc3RhbmNlIHtcbiAgY29uc3RydWN0b3IoeyBpZCwgY29tcG9uZW50LCB0ZW1wbGF0ZSwgYW5pbWF0aW9uIH0pIHtcbiAgICB0aGlzLl9pZCA9IGlkO1xuICAgIHRoaXMuX2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICB0aGlzLl90ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMuX2FuaW1hdGlvbiA9IGFuaW1hdGlvbjtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBnZXQgY29tcG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wb25lbnQ7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIC8vIFRPRE8gZmlndXJlIG91dCBvcGVuLmNsb3NlIC0gb3Blbi9jbG9zZSAtIGFkZC9yZW1vdmVcbiAgYXN5bmMgb3BlbigpIHtcbiAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LXBhZ2UnKTtcbiAgICBpZiAocGFnZSkgcGFnZS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyRW5kJywgdGhpcy5fdGVtcGxhdGUpO1xuICAgIGVsc2UgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMuX3RlbXBsYXRlKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5pZH1gKTtcblxuICAgIHN3aXRjaCAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIGNhc2UgJ3BhbmVsJzpcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBbmltYXRpb24odGhpcy5fYW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm9wZW4oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NoZWV0Qm90dG9tJzpcbiAgICAgICAgdGhpcy5lbGVtZW50Lm9wZW4oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NoZWV0U2lkZSc6XG4gICAgICAgIHRoaXMuZWxlbWVudC5vcGVuKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuX2FjdGl2ZVN1cmZhY2UpIGF3YWl0IHdpbmRvdy5fYWN0aXZlU3VyZmFjZS5jbG9zZSgpO1xuXG4gICAgd2luZG93Ll9hY3RpdmVTdXJmYWNlID0gdGhpcztcbiAgfVxuXG4gIGFzeW5jIGNsb3NlKCkge1xuICAgIHN3aXRjaCAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIGNhc2UgJ3BhbmVsJzpcbiAgICAgICAgYXdhaXQgdGhpcy5lbGVtZW50LmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzaGVldEJvdHRvbSc6XG4gICAgICAgIGF3YWl0IHRoaXMuZWxlbWVudC5jbG9zZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnc2hlZXRTaWRlJzpcbiAgICAgICAgYXdhaXQgdGhpcy5lbGVtZW50LmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgICB3aW5kb3cuX2FjdGl2ZVN1cmZhY2UgPSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuXG5jb25zdCBNRFdTdXJmYWNlID0gbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZGVmYXVsdE1vYmlsZUNvbXBvbmVudCA9ICdwYW5lbCc7XG4gICAgdGhpcy5fZGVmYXVsdERlc2t0b3BDb21wb25lbnQgPSAnc2hlZXRTaWRlJztcbiAgfVxuXG4gIHNldERlZmF1bHRNb2JpbGVDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgdGhpcy5fdmFsaWRhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB0aGlzLl9kZWZhdWx0TW9iaWxlQ29tcG9uZW50ID0gY29tcG9uZW50O1xuICB9XG5cbiAgc2V0RGVmYXVsdERlc2t0b3BDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgdGhpcy5fdmFsaWRhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB0aGlzLl9kZWZhdWx0RGVza3RvcENvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgfVxuXG5cbiAgYXN5bmMgb3Blbih7IHRlbXBsYXRlLCB0ZW1wbGF0ZURhdGEsIGFuaW1hdGlvbiwgYW5pbWF0aW9uVGFyZ2V0LCBjb21wb25lbnQsIG1vYmlsZUNvbXBvbmVudCwgZGVza3RvcENvbXBvbmVudCB9KSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmNyZWF0ZSh7IHRlbXBsYXRlLCB0ZW1wbGF0ZURhdGEsIGFuaW1hdGlvbiwgYW5pbWF0aW9uVGFyZ2V0LCBjb21wb25lbnQsIG1vYmlsZUNvbXBvbmVudCwgZGVza3RvcENvbXBvbmVudCB9KTtcbiAgICBpbnN0YW5jZS5vcGVuKCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoeyB0ZW1wbGF0ZSwgdGVtcGxhdGVEYXRhLCBhbmltYXRpb24sIGFuaW1hdGlvblRhcmdldCwgY29tcG9uZW50LCBtb2JpbGVDb21wb25lbnQsIGRlc2t0b3BDb21wb25lbnQgfSkge1xuICAgIGlmICghY29tcG9uZW50KSBjb21wb25lbnQgPSB0aGlzLl9hdXRvU2VsZWN0Q29tcG9uZW50KG1vYmlsZUNvbXBvbmVudCwgZGVza3RvcENvbXBvbmVudCk7XG4gICAgdGhpcy5fdmFsaWRhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICBpZiAoY29tcG9uZW50ID09PSAncGFuZWwnKSB7XG4gICAgICBpZiAoIWFuaW1hdGlvbikgYW5pbWF0aW9uID0gdGhpcy5fYXV0b1NlbGVjdEFuaW1hdGlvbihhbmltYXRpb25UYXJnZXQpO1xuICAgICAgdGhpcy5fdmFsaWRhdGVBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IE1EV1V0aWxzLnVpZCgnc3VyZmFjZScpO1xuICAgIGNvbnN0IHRlbXBsYXRlU3RyaW5nID0gTURXVGVtcGxhdGUuaXNTdHJpbmcodGVtcGxhdGUpID8gdGVtcGxhdGUgOiBhd2FpdCBNRFdUZW1wbGF0ZS5nZXQodGVtcGxhdGUsIHRlbXBsYXRlRGF0YSk7XG5cbiAgICBsZXQgc3VyZmFjZVRlbXBsYXRlO1xuICAgIHN3aXRjaCAoY29tcG9uZW50KSB7XG4gICAgICBjYXNlICdwYW5lbCc6XG4gICAgICAgIHN1cmZhY2VUZW1wbGF0ZSA9IHRoaXMuX2J1aWxkUGFuZWwoeyBpZCwgYW5pbWF0aW9uLCB0ZW1wbGF0ZVN0cmluZyB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NoZWV0Qm90dG9tJzpcbiAgICAgICAgc3VyZmFjZVRlbXBsYXRlID0gdGhpcy5fYnVpbGRTaGVldEJvdHRvbSh7IGlkLCB0ZW1wbGF0ZVN0cmluZyB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NoZWV0U2lkZSc6XG4gICAgICAgIHN1cmZhY2VUZW1wbGF0ZSA9IHRoaXMuX2J1aWxkU2hlZXRTaWRlKHsgaWQsIHRlbXBsYXRlU3RyaW5nIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1EV1N1cmZhY2VJbnN0YW5jZSh7XG4gICAgICBpZCxcbiAgICAgIGNvbXBvbmVudCxcbiAgICAgIHRlbXBsYXRlOiBzdXJmYWNlVGVtcGxhdGUsXG4gICAgICBhbmltYXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICh3aW5kb3cuX2FjdGl2ZVN1cmZhY2UpIHdpbmRvdy5fYWN0aXZlU3VyZmFjZS5jbG9zZSgpO1xuICB9XG5cblxuICBfYXV0b1NlbGVjdENvbXBvbmVudChtb2JpbGVDb21wb25lbnQsIGRlc2t0b3BDb21wb25lbnQpIHtcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHJldHVybiBtb2JpbGVDb21wb25lbnQgfHwgdGhpcy5fZGVmYXVsdE1vYmlsZUNvbXBvbmVudDtcbiAgICByZXR1cm4gZGVza3RvcENvbXBvbmVudCB8fCB0aGlzLl9kZWZhdWx0RGVza3RvcENvbXBvbmVudDtcbiAgfVxuXG4gIF92YWxpZGF0ZUNvbXBvbmVudCh0eXBlKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZVR5cGVzLmluY2x1ZGVzKHR5cGUpKSB0aHJvdyBFcnJvcihgdHlwZSBtdXN0IGJlIG9uZSBvZiB0aGVzZTogJHt0ZW1wbGF0ZVR5cGVzLmpvaW4oJywgJyl9YCk7XG4gIH1cblxuICBfYXV0b1NlbGVjdEFuaW1hdGlvbih0YXJnZXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2hlaWdodCcsXG4gICAgICBvcmlnaW46ICdjZW50ZXInLFxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgIHRhcmdldFxuICAgIH07XG4gIH1cblxuICBfdmFsaWRhdGVBbmltYXRpb24oYW5pbWF0aW9uKSB7XG4gICAgaWYgKCFhbmltYXRpb25UeXBlcy5pbmNsdWRlcyhhbmltYXRpb24udHlwZSkpIHRocm93IEVycm9yKGBhbmltYXRpb24udHlwZSBtdXN0IGJlIG9uZSBvZiB0aGVzZTogJHthbmltYXRpb25UeXBlcy5qb2luKCcsICcpfWApO1xuICAgIGlmIChhbmltYXRpb24ub3JpZ2luICYmICFhbmltYXRpb25PcmlnaW4uaW5jbHVkZXMoYW5pbWF0aW9uLm9yaWdpbikpIHRocm93IEVycm9yKGBhbmltYXRpb24udHlwZSBtdXN0IGJlIG9uZSBvZiB0aGVzZTogJHthbmltYXRpb25PcmlnaW4uam9pbignLCAnKX0gb3Igbm90IGRlZmluZWRgKTtcbiAgfVxuXG4gIF9idWlsZFBhbmVsKHsgaWQsIHRlbXBsYXRlU3RyaW5nIH0pIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxtZHctcGFuZWwgaWQ9XCIke2lkfVwiPlxuICAgICAgICAke3RlbXBsYXRlU3RyaW5nfVxuICAgICAgPC9tZHctcGFuZWw+XG4gICAgYFxuICB9XG5cbiAgX2J1aWxkU2hlZXRCb3R0b20oeyBpZCwgdGVtcGxhdGVTdHJpbmcgfSkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy1zaGVldC1ib3R0b20gaWQ9XCIke2lkfVwiPlxuICAgICAgICAke3RlbXBsYXRlU3RyaW5nfVxuICAgICAgPC9tZHctc2hlZXQtYm90dG9tPlxuICAgIGA7XG4gIH1cblxuICBfYnVpbGRTaGVldFNpZGUoeyBpZCwgdGVtcGxhdGVTdHJpbmcgfSkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy1zaGVldC1zaWRlIGlkPVwiJHtpZH1cIiBjbGFzcz1cIm1kdy1oaWRlXCIgbWR3LW1vZGFsIG1kdy1uby1iYWNrZHJvcD5cbiAgICAgICAgJHt0ZW1wbGF0ZVN0cmluZ31cbiAgICAgIDwvbWR3LXNoZWV0LXNpZGU+XG4gICAgYDtcbiAgfVxufTtcblxud2luZG93Lk1EV1N1cmZhY2UgPSBNRFdTdXJmYWNlO1xuXG5leHBvcnQgZGVmYXVsdCBNRFdTdXJmYWNlO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zd2l0Y2gnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfb25JbnB1dENoYW5nZSA9IHRoaXMub25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX29uSW5wdXRDaGFuZ2UpO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiBbdGhpcy5pbnB1dF0sXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgY2VudGVyZWQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2NsaWNrKTtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydjaGVja2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IGlucHV0KCkge1xuICAgIGlmICghdGhpcy5pbnB1dF8pIHRoaXMuaW5wdXRfID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRfO1xuICB9XG5cbiAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tlZDtcbiAgfVxuXG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAnJykgdmFsdWUgPSB0cnVlO1xuICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlQ2hlY2tlZENsYXNzKCk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICAgIGlmICh2YWx1ZSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgZWxzZSB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZUNoZWNrZWRDbGFzcygpIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ2NoZWNrZWQnKTtcbiAgICBlbHNlIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xuICB9XG5cbiAgb25JbnB1dENoYW5nZShlKSB7XG4gICAgdGhpcy51cGRhdGVDaGVja2VkQ2xhc3MoKTtcbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctdHJhY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctdGh1bWItdW5kZXJsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy10aHVtYlwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByb2xlPVwic3dpdGNoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LXN3aXRjaC1yaXBwbGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICAubWR3LXRyYWNrIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGhlaWdodDogMTRweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAgICAgb3BhY2l0eTogLjM4O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSksXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yIDkwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpub3QoLmNoZWNrZWQpKSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtb24tYmFja2dyb3VuZC0tcmdiKSwgMC43KTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1vbi1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjcpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguY2hlY2tlZCkgLm1kdy10cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBvcGFjaXR5OiAuNTQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkLm1kdy1wcmltYXJ5KSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQubWR3LWVycm9yKSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIHRodW1iIHVuZGVybGF5IC0tLSAqL1xuXG4gICAgICAubWR3LXRodW1iLXVuZGVybGF5IHtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsMCwwLDApO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm0sb3BhY2l0eTtcbiAgICAgICAgbGVmdDogLTE4cHg7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICB0b3A6IC0xN3B4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvciA5MG1zIGN1YmljLWJlemllciguNCwwLC4yLDEpLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXItY29sb3IgOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQpIC5tZHctdGh1bWItdW5kZXJsYXkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG4gICAgICB9XG5cbiAgICAgIC5tZHctdGh1bWItdW5kZXJsYXk6YWZ0ZXIsXG4gICAgICAubWR3LXRodW1iLXVuZGVybGF5OmJlZm9yZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy10aHVtYi11bmRlcmxheTphZnRlcixcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy10aHVtYi11bmRlcmxheTpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctdGh1bWItdW5kZXJsYXk6YWZ0ZXIsXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXRodW1iLXVuZGVybGF5OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctdGh1bWItdW5kZXJsYXk6YmVmb3JlIHtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNW1zIGxpbmVhcixiYWNrZ3JvdW5kLWNvbG9yIDE1bXMgbGluZWFyO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIHRodW1iIC0tLSAqL1xuXG4gICAgICAubWR3LXRodW1iIHtcbiAgICAgICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksXG4gICAgICAgICAgICAgICAgICAgIDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSxcbiAgICAgICAgICAgICAgICAgICAgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICBib3JkZXI6IDEwcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkKSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkLm1kdy1wcmltYXJ5KSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQubWR3LWVycm9yKSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCg6bm90KC5jaGVja2VkKSkgLm1kdy10aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgIGJvcmRlci1jb2xvcjogI2ZmZjtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gaW5wdXQgLS0tICovXG5cbiAgICAgIGlucHV0IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogNjhweDtcbiAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkKSBpbnB1dCB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XG4gICAgICB9XG5cblxuXG4gICAgICAvKiAtLS0gcmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICAubWR3LXN3aXRjaC1yaXBwbGUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYi1ib2R5JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlckJvZHkodGhpcyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUudW5yZWdpc3RlckJvZHkodGhpcyk7XG4gIH1cblxuICBhZGRTbG90KCkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdtZHctdGFiLWJvZHktY29udGVudCcpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgJzxzbG90Pjwvc2xvdD4nKTtcbiAgfVxuXG4gIHJlbW92ZVNsb3QoKSB7XG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRkU2xvdCgpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWFjdGl2ZScpO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnJlbW92ZVNsb3QoKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1hY3RpdmUnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy10YWItYm9keS1jb250ZW50PlxuICAgICAgICA8IS0tIHNsb3QgaXMgYWRkZWQgZHluYW1pY2x5IC0tPlxuICAgICAgPC9tZHctdGFiLWJvZHktY29udGVudD5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICBtZHctdGFiLWJvZHktY29udGVudCB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1JpcHBsZSBmcm9tICcuLi8uLi8uLi9jb3JlL1JpcHBsZS5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYi1idXR0b24nLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfY2xpY2sgPSB0aGlzLmNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBNRFdSaXBwbGUoe1xuICAgICAgZWxlbWVudDogdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpc1xuICAgIH0pO1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlclRhYih0aGlzKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9jbGljayk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnVucmVnaXN0ZXJUYWIodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfY2xpY2spO1xuICB9XG5cbiAgZ2V0IGluZGljYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQnKTtcbiAgfVxuXG4gIGNsaWNrKGUpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUudGFiQ2xpY2sodGhpcyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fYW5pbWF0aW9uVGltZXIpO1xuICAgIHRoaXMuaW5kaWNhdG9yLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgIHRoaXMuX3J1bk5leHRBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1hY3RpdmUnKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlKG1vdmVYKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICB0aGlzLmluZGljYXRvci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke21vdmVYLnRvU3RyaW5nKCl9cHgpYDtcbiAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctYWN0aXZlJyk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIF9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZSk7XG4gICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfSk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPjxzbG90Pjwvc2xvdD48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kdy10YWItYnV0dG9uLWluZGljYXRvclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1kdy10YWItYnV0dG9uLWluZGljYXRvcl9fY29udGVudCBtZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZVwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmlwcGxlIG1kdy10YWItYnV0dG9uLXJpcHBsZVwiPjwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0KC5tZHctc2hvdy1zcGlubmVyKSBzcGFuLnRleHQge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGhpcyB0byBidXR0b24gb3IgY3JlYXQgYSBuZXcgY29tcG9uZW5ldCBtZHctdGFiICovXG4gICAgICAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWFjdGl2ZSkgLm1kdy10YWItYnV0dG9uLWluZGljYXRvciAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yX19jb250ZW50IHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4ycyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy10YWItYnV0dG9uLWluZGljYXRvcl9fY29udGVudCB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYWN0aXZlKSAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yX19jb250ZW50IHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yIC5tZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LXRhYi1idXR0b24tcmlwcGxlLFxuICAgICAgLm1kdy10YWItYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYWN0aXZlKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtcHJpbWFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy10YWJzLWJhcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWN0aXZlVGFiID0gMDtcbiAgICB0aGlzLnRhYklkQ291bnRlciA9IDA7XG4gICAgdGhpcy5fY29udGVudEVsZW1lbnRzID0gW107XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICAvLyBjYWxsZWQgZnJvbSBtZHctdGFiXG4gIHJlZ2lzdGVyVGFiKGVsKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKCd0YWItaWQnLCB0aGlzLnRhYklkQ291bnRlcik7XG4gICAgaWYgKHRoaXMudGFiSWRDb3VudGVyID09PSAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IGVsO1xuICAgICAgZWwuYWN0aXZhdGUoKTtcbiAgICB9XG4gICAgdGhpcy50YWJJZENvdW50ZXIrKztcbiAgfVxuXG4gIC8vIGNhbGxlZCBmcm9tIG1kdy10YWJcbiAgdW5yZWdpc3RlclRhYihlbCkge1xuICAgIC8vIFRPRE8gaGFuZGxlIGlmIGl0IGlzIGFjdGl2ZVxuICB9XG5cbiAgLy8gY2FsbGVkIGZyb20gbWR3LXRhYnMtY29udGVudFxuICByZWdpc3RlckNvbnRlbnQoZWwpIHtcbiAgICB0aGlzLl9jb250ZW50RWxlbWVudHMucHVzaChlbCk7XG4gICAgZWwuY2hhbmdlVGFiKHRoaXMuYWN0aXZlVGFiLmdldEF0dHJpYnV0ZSgndGFiLWlkJykpO1xuICB9XG5cbiAgLy8gY2FsbGVkIGZyb20gbWR3LXRhYnMtY29udGVudFxuICB1bnJlZ2lzdGVyQ29udGVudChlbCkge1xuICAgIHRoaXMuX2NvbnRlbnRFbGVtZW50cyA9IHRoaXMuX2NvbnRlbnRFbGVtZW50cy5maWx0ZXIoZSA9PiBlICE9IGVsKTtcbiAgfVxuXG4gIC8vIGNhbGxlZCBmcm9tIG1kdy10YWJcbiAgdGFiQ2xpY2soZWwpIHtcbiAgICBjb25zdCBtb3ZlWCA9IHBhcnNlSW50KGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnggLSB0aGlzLmFjdGl2ZVRhYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54KTtcbiAgICB0aGlzLmFjdGl2ZVRhYi5kZWFjdGl2YXRlKG1vdmVYKTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGVsO1xuICAgIHRoaXMuYWN0aXZlVGFiLmFjdGl2YXRlKCk7XG4gICAgdGhpcy5fY29udGVudEVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWwuY2hhbmdlVGFiKHRoaXMuYWN0aXZlVGFiLmdldEF0dHJpYnV0ZSgndGFiLWlkJykpKTtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIHNldCBhY3RpdmVUYWIoZWwpIHtcbiAgICB0aGlzLl9hY3RpdmVUYWIgPSBlbDtcbiAgfVxuXG4gIGdldCBpbnRlcm5hbFN0eWxlc0ZpbGUoKSB7XG4gICAgcmV0dXJuICcuL2ludGVybmFsLmNzcydcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy10YWJzLWJhci1zY3JvbGxlcj5cbiAgICAgICAgPG1kdy10YWJzLWJhci1zY3JvbGxlci1hcmVhPlxuICAgICAgICAgIDxtZHctdGFicy1iYXItc2Nyb2xsZXItY29udGVudD5cbiAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgICA8L21kdy10YWJzLWJhci1zY3JvbGxlci1jb250ZW50PlxuICAgICAgICA8L21kdy10YWJzLWJhci1zY3JvbGxlci1hcmVhPlxuICAgICAgPC9tZHctdGFicy1iYXItc2Nyb2xsZXI+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgbWR3LXRhYnMtYmFyLXNjcm9sbGVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgIH1cblxuICAgICAgbWR3LXRhYnMtYmFyLXNjcm9sbGVyLWFyZWEge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAvKiBvdmVyZmxvdy14OiBzY3JvbGw7ICovXG4gICAgICB9XG5cbiAgICAgIG1kdy10YWJzLWJhci1zY3JvbGxlci1jb250ZW50IHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQobWR3LWJ1dHRvbikge1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYnMtY29udGVudCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYm9kaWVzID0gW107XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnRhYnNCYXIucmVnaXN0ZXJDb250ZW50KHRoaXMpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy50YWJzQmFyICYmIHRoaXMudGFic0Jhci51bnJlZ2lzdGVyQ29udGVudCh0aGlzKTtcbiAgfVxuXG4gIGdldCB0YWJzQmFyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYG1kdy10YWJzLWJhciMke3RoaXMuZ2V0QXR0cmlidXRlKCd0YWJzLWlkJyl9YCk7XG4gIH1cblxuICByZWdpc3RlckJvZHkoZWwpIHtcbiAgICB0aGlzLl9ib2RpZXMucHVzaChlbCk7XG4gICAgaWYgKHRoaXMuX3dpYXRGb3JCb2R5QWN0aXZlSWQgICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fYm9kaWVzLmxlbmd0aCA9PT0gdGhpcy5fd2lhdEZvckJvZHlBY3RpdmVJZCArIDEpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZUJvZHkgPSBlbDtcbiAgICAgIGVsLmFjdGl2YXRlKCk7XG4gICAgICB0aGlzLl93aWF0Rm9yQm9keUFjdGl2ZUlkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHVucmVnaXN0ZXJCb2R5KGVsKSB7XG4gICAgdGhpcy5fYm9kaWVzID0gdGhpcy5fYm9kaWVzLmZpbHRlcihpID0+IGkgIT0gZWwpO1xuICB9XG5cbiAgY2hhbmdlVGFiKHRhYklkKSB7XG4gICAgaWYgKCF0aGlzLl9ib2RpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl93aWF0Rm9yQm9keUFjdGl2ZUlkID0gcGFyc2VJbnQodGFiSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWN0aXZlQm9keSkgdGhpcy5fYWN0aXZlQm9keS5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5fYWN0aXZlQm9keSA9IHRoaXMuX2JvZGllc1t0YWJJZF07XG4gICAgdGhpcy5fYWN0aXZlQm9keS5hY3RpdmF0ZSgpO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZS9pbmRleC5qcyc7XG5pbXBvcnQgTURXVGVtcGxhdGUgZnJvbSAnLi9zZXJ2aWNlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctdGVtcGxhdGUnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgdGVtcGxhdGVJZCA9IHRoaXMudGVtcGxhdGVJZDtcbiAgICBpZiAodGVtcGxhdGVJZCkgTURXVGVtcGxhdGVcbiAgICAgIC5nZXQodGVtcGxhdGVJZClcbiAgICAgIC50aGVuKGh0bWxTdGluZyA9PiB7XG4gICAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sU3RpbmcpXG4gICAgICB9KVxuICAgIFxuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gdGhpcy50ZW1wbGF0ZVVybDtcbiAgICBpZiAodGVtcGxhdGVVcmwpIHtcbiAgICAgIE1EV1RlbXBsYXRlXG4gICAgICAgIC5sb2FkSHRtbCh0ZW1wbGF0ZVVybClcbiAgICAgICAgLnRoZW4oaHRtbFN0aW5nID0+IHtcbiAgICAgICAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbFN0aW5nKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZUlkKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGVtcGxhdGUtaWQnKVxuICB9XG5cbiAgZ2V0IHRlbXBsYXRlVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGVtcGxhdGUtdXJsJylcbiAgfVxuXG4gIGFzeW5jIHNob3codGVtcGxhdGVJZCkge1xuICAgIGNvbnN0IGh0bWxTdGluZyA9IGF3YWl0IE1EV1RlbXBsYXRlLmdldCh0ZW1wbGF0ZUlkKVxuICAgIHRoaXMuaW5uZXJIVE1MID0gaHRtbFN0aW5nO1xuICB9XG59KVxuIiwiY29uc3QgTURXVGVtcGxhdGUgPSBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl90ZW1wbGF0ZXMgPSB7fTtcbiAgICB0aGlzLl9sb2FkZWRUZW1wbGF0ZXMgPSB7fTtcbiAgfVxuXG4gIC8vIEFMTE9XIEEgVEVNUExURSBUTyBCRSBSR0lTVEVSRUQgTU9SRSBUSEFOIE9OQ0UgV0lUSE9VVCBUSFJPV0lORyBBTiBFUlJPUlxuICByZWdpc3Rlck9uY2UoaWQsIHRlbXBsYXRlKSB7XG4gICAgaWYgKHRoaXMuX3RlbXBsYXRlc1tpZF0pIHJldHVybjtcbiAgICB0aGlzLnJlZ2lzdGVyKGlkLCB0ZW1wbGF0ZSk7XG4gIH1cblxuICBhc3luYyByZWdpc3RlckFuZExvYWQoaWQsIHRlbXBsYXRlVXJsKSB7XG4gICAgaWYgKHRoaXMuX3RlbXBsYXRlc1tpZF0pIHJldHVybjtcbiAgICB0aGlzLnJlZ2lzdGVyKGlkLCB0ZW1wbGF0ZVVybCk7XG4gICAgaWYgKHRlbXBsYXRlVXJsLmluY2x1ZGVzKCcuaHRtbCcpKSBhd2FpdCB0aGlzLmxvYWRIdG1sKHRlbXBsYXRlVXJsKTtcbiAgfVxuXG4gIHJlZ2lzdGVyKGlkLCB0ZW1wbGF0ZVN0cmluZykge1xuICAgIGlmICghaWQpIHRocm93IEVycm9yKCdyZXF1aXJlcyBpZCcpO1xuICAgIGlmICghdGVtcGxhdGVTdHJpbmcpIHRocm93IEVycm9yKCdyZXF1aXJlcyB0ZW1wbGF0ZVN0cmluZycpO1xuICAgIGlmICh0aGlzLl90ZW1wbGF0ZXNbaWRdKSB0aHJvdyBFcnJvcihgaWQgXCIke2lkfVwiIGFscmVhZHkgdGFrZW5gKTtcbiAgICB0aGlzLl90ZW1wbGF0ZXNbaWRdID0gdGVtcGxhdGVTdHJpbmc7XG4gIH1cblxuICB1bnJlZ2lzdGVyKGlkKSB7XG4gICAgdGhpcy5fdGVtcGxhdGVzW2lkXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlzU3RyaW5nKHRlbXBsYXRlKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGVtcGxhdGUuaW5jbHVkZXMoJy5odG1sJykpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGVtcGxhdGUuaW5jbHVkZXMoJzwnKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpZCwgZGF0YSkge1xuICAgIGlmICghdGhpcy5fdGVtcGxhdGVzW2lkXSkgdGhyb3cgRXJyb3IoYG5vIHRlbXBsYXRlIGZvdW5kIHdpdGggaWQ6ICR7aWR9YCk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLl90ZW1wbGF0ZXNbaWRdO1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdmdW5jdGlvbicpIHJldHVybiB0ZW1wbGF0ZShkYXRhKTtcbiAgICBpZiAodGVtcGxhdGUuaW5jbHVkZXMoJy5odG1sJykpIHJldHVybiBhd2FpdCB0aGlzLmxvYWRIdG1sKHRlbXBsYXRlKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBhc3luYyBsb2FkSHRtbCh1cmwpIHtcbiAgICBpZiAodGhpcy5fbG9hZGVkVGVtcGxhdGVzW3VybF0pIHJldHVybiB0aGlzLl9sb2FkZWRUZW1wbGF0ZXNbdXJsXTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICB0aGlzLl9sb2FkZWRUZW1wbGF0ZXNbdXJsXSA9IHRlbXBsYXRlO1xuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfVxufVxuXG53aW5kb3cuTURXVGVtcGxhdGUgPSBNRFdUZW1wbGF0ZTtcblxuZXhwb3J0IGRlZmF1bHQgTURXVGVtcGxhdGU7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy10ZXh0ZmllbGQnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LW5vLWFuaW1hdGlvbicpO1xuICAgIHRoaXMuYm91bmRfb25Gb2N1cyA9IHRoaXMub25Gb2N1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25CbHVyID0gdGhpcy5vbkJsdXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uSW5wdXQgPSB0aGlzLm9uSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuY29tcG9zZSgpO1xuICAgIHRoaXMuY2hlY2tGb3JWYWx1ZSgpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LW5vLWFuaW1hdGlvbicpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGxpc3RlbmVyc1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmJvdW5kX29uRm9jdXMpO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZF9vbklucHV0KTtcblxuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LWludmFsaWQnLCAhdGhpcy52YWxpZCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyByZW1vdmUgbGlzdGVuZXJzXG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuYm91bmRfb25Gb2N1cyk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kX29uSW5wdXQpO1xuICB9XG5cbiAgY29tcG9zZSgpIHtcbiAgICAvKiBGb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgbW9zdCBvZiB0aGUgZmVhdHVyZXMgYXJlIGJ1aWx0IHdpdGggY3NzIGFuZCB0aGUgY29kZSBpcyB0cmVhdGVkIGFzIGFuIHVwZ3JhZGVcbiAgICAgKiAgJ21kdy11cGdyYWRlZCcgbGV0cyB1cyBrbm93IHRoYXQgdGhlIGNvZGUgaXMgaG9va2VkIHVwXG4gICAgICogIFRPRE8gZXZlYWx1YXRlIHRoZSBiZW5lZml0IG9mIHRoaXMgZmVhdHVyZVxuICAgICAqL1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXVwZ3JhZGVkJyk7XG5cbiAgICAvKiB0ZXh0YXJlYSBjc3MgbWFya2VyXG4gICAgICogIHRlc3QgYXJlYSBtb3N0bHkgd29ya3Mgd2l0aG91dCB3YyBjb21wYXRhYmlsaXR5LiBUaGUgb25seSB0aGluZyB0aGF0IGRvZXMgbm90IHdvcmsgaXMgc29tZSBvdmVybGFwcGluZyB3aXRoIHRoZSBsYWJlbFxuICAgICAqL1xuICAgIGlmICh0aGlzLmlzVGV4dGFyZWEoKSkgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctdGV4dGFyZWEnKTtcblxuICAgIC8qIEFkZCBodG1sIGZvciBvdXRsaW5lZFxuICAgICAqICBvdXRsaW5lZCBkb2VzIG5vdCB3b3JrIHdpdGhvdXQgY29tcGF0YWJpbGl0eVxuICAgICAqL1xuICAgIGlmICh0aGlzLm91dGxpbmVkKSB7XG4gICAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5vdXRsaW5lZEhUTUwpO1xuICAgICAgdGhpcy5zZXROb3RjaFdpZHRoKCk7XG4gICAgfVxuXG4gICAgLyogQWRkIHJpcHBsZSBodG1sIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICovXG4gICAgaWYgKCF0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tZHctbGluZS1yaXBwbGUnKSkgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMubGluZVJpcHBsZUhUTUwpO1xuXG4gICAgLyogRml4IGxheW91dCBmb3IgaWNvbnMgYmxhY2VkIGJlZm9yZSBoZSBpbnB1dFxuICAgICAqICBUaGlzIGlzIG5vdCBoYW5kbGVkIGluIG5vbiBjb21wYXRhYmxlIGJyb3dzZXJzXG4gICAgICovXG4gICAgaWYgKHRoaXMuaXNUcmFpbGluZ0ljb24oKSkgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctdHJhaWxpbmctaWNvbicpO1xuICB9XG5cbiAgY2hlY2tGb3JWYWx1ZSgpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ25vdC1lbXB0eScsICEhdGhpcy5pbnB1dC52YWx1ZS5sZW5ndGgpO1xuICB9XG5cbiAgb25Gb2N1cygpIHtcbiAgICB0aGlzLnNldE5vdGNoV2lkdGgoKTtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ25vdC1lbXB0eScsICEhdGhpcy5pbnB1dC52YWx1ZS5sZW5ndGgpO1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LWludmFsaWQnLCAhdGhpcy52YWxpZCk7XG4gIH1cblxuICBvbklucHV0KCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LWludmFsaWQnLCAhdGhpcy52YWxpZCk7XG4gIH1cblxuICBzZXROb3RjaFdpZHRoKCkge1xuICAgIGlmICh0aGlzLm91dGxpbmVkKSB0aGlzLm5vdGNoLnN0eWxlLndpZHRoID0gdGhpcy5sYWJlbFdpZHRoICsgJ3B4JztcbiAgfVxuXG4gIC8qIEljb25zIGNhbiBiZSBwbGFjZXMgYXQgdGhlIGJlZ2luaW5nIHJvIGVuZCBvZiBhIHRleHQgZmllbGRcbiAgICogdGhlcmUgaXMgc29tZSBjc3MgdGhhdCBpcyBoYXJkIHRvIGFwcGx5IHdoZW4gdGhlIGljb24gaXMgYXQgdGhlIGJlZ2luaW5nLCB0aGlzIGhlbHBzXG4gICAqL1xuICBpc1RyYWlsaW5nSWNvbigpIHtcbiAgICBpZiAoIXRoaXMuaWNvbkVsZW1lbnQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gWy4uLnRoaXMuY2hpbGRyZW5dLmluZGV4T2YodGhpcy5pY29uRWxlbWVudCkgPiAxO1xuICB9XG5cbiAgaXNUZXh0YXJlYSgpIHtcbiAgICByZXR1cm4gISF0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJyk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XG4gIH1cblxuICBnZXQgdmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQudmFsaWRpdHkudmFsaWQ7XG4gIH1cblxuICBnZXQgb3V0bGluZWQoKSB7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmFwcGx5KHRoaXMuY2xhc3NMaXN0IHx8IFtdKS5pbmNsdWRlcygnbWR3LW91dGxpbmVkJyk7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgaWYgKCF0aGlzLmlucHV0VHlwZV8pIHRoaXMuaW5wdXRUeXBlXyA9IHRoaXMucXVlcnlTZWxlY3RvcignaW5wdXQnKSA/ICdpbnB1dCcgOiAndGV4dGFyZWEnO1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5pbnB1dFR5cGVfKTtcbiAgfVxuXG4gIC8vIHRoaXMgaXMgdGhlIHNlY3Rpb24gd2hlcmUgdGhlIGxhYmVscyBzaXRzIHdoZW4gaW4gb3V0bGluZWQgbW9kZVxuICBnZXQgbm90Y2goKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignLm1kdy1vdXRsaW5lZC1ub3RjaCcpO1xuICB9XG5cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGEgbW9yZSBhY3VyYXRlIHdheSBvciBnZXR0aW5nIHRoZSB3aWR0aFxuICBnZXQgbGFiZWxXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbC5vZmZzZXRXaWR0aCAqIDAuOTU7XG4gIH1cblxuICBnZXQgaGVscGVyVGV4dEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXRleHRmaWVsZC1oZWxwZXInKTtcbiAgfVxuXG4gIGdldCBpY29uRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctaWNvbicpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVkSFRNTCgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC1ib3JkZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctb3V0bGluZWQtbGVhZGluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLW5vdGNoXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctb3V0bGluZWQtdHJhaWxpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBnZXQgbGluZVJpcHBsZUhUTUwoKSB7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwibWR3LWxpbmUtcmlwcGxlXCI+PC9kaXY+JztcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUvaW5kZXguanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy10b3AtYXBwLWJhcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl90aHJvdHRsZWRTY3JvbGxIYW5kbGVyID0gTURXVXRpbHMucmFmVGhyb3R0bGUodGhpcy5fc2Nyb2xsSGFuZGxlcik7XG4gICAgdGhpcy5fdGhyb3R0bGVkUmVzaXplSGFuZGxlciA9IE1EV1V0aWxzLnJhZlRocm90dGxlKHRoaXMuX3Jlc2l6ZUhhbmRsZXIpO1xuICAgIHRoaXMuYm91bmRfdGhyb3R0bGVkU2Nyb2xsSGFuZGxlciA9IHRoaXMuX3Rocm90dGxlZFNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX3Rocm90dGxlZFJlc2l6ZUhhbmRsZXIgPSB0aGlzLl90aHJvdHRsZWRSZXNpemVIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21kdy1oYXMtdG9wLWFwcC1iYXInKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX2lzUHJvbWluZW50ID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1wcm9taW5lbnQnKTtcbiAgICB0aGlzLl9pc0ZpeGVkID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1maXhlZCcpO1xuICAgIHRoaXMuX2lzU2hyaW5rID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1zaHJpbmsnKTtcblxuICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnSEVBREVSJykge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ21kdy10b3AtYXBwLWJhcicpO1xuICAgICAgaWYgKHRoaXMuX2lzUHJvbWluZW50KSB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnbWR3LXByb21pbmVudCcpO1xuICAgICAgaWYgKHRoaXMuX2lzU2hyaW5rKSB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnbWR3LXNocmluaycpO1xuICAgICAgaWYgKHRoaXMuX2lzRml4ZWQpIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdtZHctZml4ZWQnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNTaHJpbmspIHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvbkVsZW1lbnRzID0gWy4uLih0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1ttZHctYW5pbWF0aW9uLXByb3BlcnR5XScpIHx8IFtdKV0ubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHBhcnNlRmxvYXQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ21kdy1hbmltYXRpb24tc3RhcnQnKSB8fCAwKTtcbiAgICAgICAgY29uc3QgZW5kID0gcGFyc2VGbG9hdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWR3LWFuaW1hdGlvbi1lbmQnKSB8fCAwKTtcbiAgICAgICAgY29uc3QgcmF3UHJvcGVydHkgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWR3LWFuaW1hdGlvbi1wcm9wZXJ0eScpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICBwcm9wZXJ0eTogcmF3UHJvcGVydHlbMF0sXG4gICAgICAgICAgdmFsdWVXcmFwcGVyOiByYXdQcm9wZXJ0eVsxXSB8fCAnJyxcbiAgICAgICAgICBzdGFydCxcbiAgICAgICAgICBlbmQsXG4gICAgICAgICAgcmFuZ2U6IE1hdGguYWJzKHN0YXJ0IC0gZW5kKVxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3Njcm9sbFRhcmdldCA9IHRoaXMuX2dldFNjcm9sbFRhcmdldCgpO1xuICAgICAgdGhpcy5fbGFzdFNjcm9sbFBvc2l0aW9uID0gdGhpcy5fZ2V0Vmlld3BvcnRTY3JvbGxZKCk7XG4gICAgICB0aGlzLl90b3BBcHBCYXJIZWlnaHQgPSB0aGlzLmNsaWVudEhlaWdodCArIDY7XG4gICAgICB0aGlzLl9zY3JvbGxIYW5kbGVyKCk7XG4gICAgICB0aGlzLl9jcmVhdGVPYnNlcnZlcigpO1xuXG4gICAgICB0aGlzLl9zY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib3VuZF90aHJvdHRsZWRTY3JvbGxIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNGaXhlZCB8fCB0aGlzLl9pc1Nocmluaykge1xuICAgICAgdGhpcy5fcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlJyk7XG4gICAgICBpZiAodGhpcy5fcGFnZSkgdGhpcy5zdHlsZS53aWR0aCA9IGAke3RoaXMuX3BhZ2Uub2Zmc2V0V2lkdGh9cHhgO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ib3VuZF90aHJvdHRsZWRSZXNpemVIYW5kbGVyKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLl9vYnNlcnZlcikge1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMpO1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zY3JvbGxUYXJnZXQpIHRoaXMuX3Njcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvdW5kX3Rocm90dGxlZFNjcm9sbEhhbmRsZXIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnRocm90dGxlZFJlc2l6ZUhhbmRsZXIpO1xuICB9XG5cbiAgbm90Q29udGV4dHVhbCgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbWR3LWNvbnRleHR1YWwnKTtcbiAgfVxuXG4gIGNvbnRleHR1YWwoKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21kdy1jb250ZXh0dWFsJywgJycpO1xuICB9XG5cbiAgX2dldEFsbEZpeGVkU2VjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvckFsbCgnc2VjdGlvblttZHctZml4ZWRdJyk7XG4gIH1cblxuICBfZ2V0U2Nyb2xsVGFyZ2V0KCkge1xuICAgIC8vIGdldCBzaWJsaW5nIG1kdy1jb250ZW50XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ0hFQURFUicpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRTaWJsaW5nID0gdGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaGVhZGVyICsgbWR3LWNvbnRlbnQ6bm90KFttZHctbm8tc2Nyb2xsXSknKTtcbiAgICAgIGlmIChjb250ZW50U2libGluZykgcmV0dXJuIGNvbnRlbnRTaWJsaW5nO1xuICAgIH1cblxuICAgIC8vIGdldCBwYWdlIGNvbnRhaW5lclxuICAgIGNvbnN0IHBhZ2VDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LXBhZ2UtY29udGVudCcpO1xuICAgIGlmIChwYWdlQ29udGVudCAmJiBwYWdlQ29udGVudC5jb250YWlucyh0aGlzKSkgcmV0dXJuIHBhZ2VDb250ZW50O1xuXG4gICAgLy8gZ2V0IHdyYXBwaW5nIGNvbnRlbnRcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LWNvbnRlbnQnKTtcbiAgICBpZiAoY29udGVudCAmJiBjb250ZW50LmNvbnRhaW5zKHRoaXMpKSByZXR1cm4gY29udGVudDtcblxuICAgIC8vIGRlZmF1bHQgdG8gd2luZG93XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIF9nZXRWaWV3cG9ydFNjcm9sbFkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbFRhcmdldFt0aGlzLl9zY3JvbGxUYXJnZXQgPT09IHdpbmRvdyA/ICdwYWdlWU9mZnNldCcgOiAnc2Nyb2xsVG9wJ107XG4gIH1cblxuICBfc2Nyb2xsSGFuZGxlcigpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLl9nZXRWaWV3cG9ydFNjcm9sbFkoKSwgMCk7XG4gICAgLy8gY29uc3QgZGlmZiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiAtIHRoaXMuX2xhc3RTY3JvbGxQb3NpdGlvbjtcbiAgICAvLyB0aGlzLl9sYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgXG4gICAgbGV0IHBvc2l0aW9uO1xuICAgIGlmICh0aGlzLl9pc1Byb21pbmVudCkge1xuICAgICAgY29uc3QgaGFsZkhlaWdodCA9IHRoaXMuX3RvcEFwcEJhckhlaWdodCAvIDI7XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uIDw9IGhhbGZIZWlnaHQpIHBvc2l0aW9uID0gY3VycmVudFNjcm9sbFBvc2l0aW9uO1xuICAgICAgZWxzZSBwb3NpdGlvbiA9IGhhbGZIZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPD0gdGhpcy5fdG9wQXBwQmFySGVpZ2h0KSBwb3NpdGlvbiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbiAgICBlbHNlIHBvc2l0aW9uID0gdGhpcy5fdG9wQXBwQmFySGVpZ2h0O1xuXG4gICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtwb3NpdGlvbn1weClgO1xuICAgIHRoaXMuX2dldEFsbEZpeGVkU2VjdGlvbnMoKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7cG9zaXRpb259cHgpYFxuICAgIH0pO1xuICB9XG5cbiAgX3Jlc2l6ZUhhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMuX2lzRml4ZWQgfHwgdGhpcy5faXNTaHJpbmspIHtcbiAgICAgIHRoaXMuX3BhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZScpO1xuICAgICAgaWYgKHRoaXMuX3BhZ2UpIHRoaXMuc3R5bGUud2lkdGggPSBgJHt0aGlzLl9wYWdlLm9mZnNldFdpZHRofXB4YDtcbiAgICB9XG4gIH1cblxuICBfY3JlYXRlT2JzZXJ2ZXIoKSB7XG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbkVsZW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIHRoaXMuX29ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuX2hhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogXCIwcHhcIixcbiAgICAgIHRocmVzaG9sZDogdGhpcy5fYnVpbGRUaHJlc2hvbGRMaXN0KClcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMpO1xuICB9XG5cbiAgX2J1aWxkVGhyZXNob2xkTGlzdCgpIHtcbiAgICBsZXQgdGhyZXNob2xkcyA9IFtdO1xuICAgIGxldCBudW1TdGVwcyA9IDY4O1xuXG4gICAgZm9yIChsZXQgaSA9IDEuMDsgaSA8PSBudW1TdGVwczsgaSsrKSB7XG4gICAgICBsZXQgcmF0aW8gPSBpIC8gbnVtU3RlcHM7XG4gICAgICB0aHJlc2hvbGRzLnB1c2gocmF0aW8pO1xuICAgIH1cblxuICAgIHRoaXMuX2ludGVyc2VjdGlvblRocmVzaG9sZHMgPSB0aHJlc2hvbGRzO1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnNlY3Rpb25UaHJlc2hvbGRzO1xuICB9XG5cbiAgX2hhbmRsZUludGVyc2VjdChlbnRyaWVzLCBvYnNlcnZlcikge1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGxldCBwZXJjZW50O1xuICAgICAgaWYgKHRoaXMuX2lzUHJvbWluZW50KSBwZXJjZW50ID0gLWVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdC50b3AgLyAodGhpcy5fdG9wQXBwQmFySGVpZ2h0IC8gMik7XG4gICAgICB0aGlzLl9hbmltYXRpb25FbGVtZW50cy5mb3JFYWNoKHYgPT4gdGhpcy5fYW5pbWF0aW9uVmFsdWUocGVyY2VudCwgdikpO1xuICAgIH0pO1xuICB9XG5cbiAgX2FuaW1hdGlvblZhbHVlKHBlcmNlbnQsIHsgZWxlbWVudCwgcHJvcGVydHksIHZhbHVlV3JhcHBlciwgc3RhcnQsIGVuZCwgcmFuZ2V9KSB7XG4gICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZVdyYXBwZXIucmVwbGFjZSgnIycsIHN0YXJ0IC0gKHBlcmNlbnQgKiByYW5nZSkpO1xuICB9XG59KTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EV1JpcHBsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgdGhpcy5SSVBQTEVfRkFERV9JTl9EVVJBVElPTiA9IDIwMDtcbiAgICB0aGlzLlJJUFBMRV9GQURFX09VVF9EVVJBVElPTiA9IDE1MDtcbiAgICB0aGlzLlJJUFBMRV9TVEFURSA9IHtcbiAgICAgIEZBRElOR19JTjogJ0ZBRElOR19JTicsXG4gICAgICBWSVNJQkxFOiAnVklTSUJMRScsXG4gICAgICBGQURJTkdfT1VUOiAnRkFESU5HX09VVCcsXG4gICAgICBISURERU46ICdISURERU4nXG4gICAgfTtcblxuICAgIGlmICghY29uZmlnLmVsZW1lbnQpIHRocm93IEVycm9yKCdyZXF1aXJlcyBjb25maWcuZWxlbWVudCcpO1xuICAgIGlmICghY29uZmlnLnRyaWdnZXJFbGVtZW50KSB0aHJvdyBFcnJvcigncmVxdWlyZXMgY29uZmlnLnRyaWdnZXJFbGVtZW50Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBjb25maWcuZWxlbWVudDtcbiAgICB0aGlzLnRyaWdnZXJFbGVtZW50ID0gW10uY29uY2F0KGNvbmZpZy50cmlnZ2VyRWxlbWVudCkuZmlsdGVyKGVsID0+ICEhZWwpO1xuICAgIHRoaXMuY2VudGVyZWQgPSAhIWNvbmZpZy5jZW50ZXJlZDtcbiAgICB0aGlzLnNwZWVkRmFjdG9yID0gY29uZmlnLnNwZWVkRmFjdG9yIHx8IDE7XG4gICAgdGhpcy5yYWRpdXMgPSBjb25maWcucmFkaXVzO1xuICAgIHRoaXMuY29sb3IgPSBjb25maWcuY29sb3IgfHwgbnVsbDtcbiAgICB0aGlzLnBlcnNpc3RlbnQgPSAhIWNvbmZpZy5wZXJzaXN0ZW50O1xuICAgIHRoaXMuYWN0aXZlUmlwcGxlcyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmlzTW91c2Vkb3duID0gZmFsc2U7XG4gICAgdGhpcy5ib3VuZF9tb3VzZXNkb3duXyA9IHRoaXMubW91c2VzZG93bl8uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX21vdXNldXBfID0gdGhpcy5tb3VzZXVwXy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfbW91c2VsZWF2ZV8gPSB0aGlzLm1vdXNlbGVhdmVfLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnRyaWdnZXJFbGVtZW50LmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5ib3VuZF9tb3VzZXNkb3duXyk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudHJpZ2dlckVsZW1lbnQuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX21vdXNlc2Rvd25fKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdXNlc2Rvd25fKGV2ZW50KSB7XG4gICAgdGhpcy5pc01vdXNlZG93biA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyRWxlbWVudC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX21vdXNldXBfKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmJvdW5kX21vdXNlbGVhdmVfKTtcbiAgICB9KTtcbiAgICB0aGlzLmZhZGVJblJpcHBsZShldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xuICB9XG5cbiAgbW91c2V1cF8oZXZlbnQpIHtcbiAgICB0aGlzLmlzTW91c2Vkb3duID0gZmFsc2U7XG4gICAgLy8gRmFkZS1vdXQgYWxsIHJpcHBsZXMgdGhhdCBhcmUgY29tcGxldGVseSB2aXNpYmxlIGFuZCBub3QgcGVyc2lzdGVudC5cbiAgICB0aGlzLmFjdGl2ZVJpcHBsZXMuZm9yRWFjaChyaXBwbGUgPT4ge1xuICAgICAgaWYgKCFyaXBwbGUuY29uZmlnLnBlcnNpc3RlbnQgJiYgcmlwcGxlLnN0YXRlID09PSB0aGlzLlJJUFBMRV9TVEFURS5WSVNJQkxFKSByaXBwbGUuZmFkZU91dCgpO1xuICAgIH0pO1xuICAgIHRoaXMudHJpZ2dlckVsZW1lbnQuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZF9tb3VzZXVwXyk7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5ib3VuZF9tb3VzZWxlYXZlXyk7XG4gICAgfSk7XG4gIH1cblxuICBtb3VzZWxlYXZlXygpIHtcbiAgICBpZiAodGhpcy5pc01vdXNlZG93bikgdGhpcy5tb3VzZXVwXygpO1xuICB9XG5cblxuICBmYWRlSW5SaXBwbGUocGFnZVgsIHBhZ2VZKSB7XG4gICAgY29uc3QgY29udGFpbmVyUmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmICh0aGlzLmNlbnRlcmVkKSB7XG4gICAgICBwYWdlWCA9IGNvbnRhaW5lclJlY3QubGVmdCArIGNvbnRhaW5lclJlY3Qud2lkdGggLyAyO1xuICAgICAgcGFnZVkgPSBjb250YWluZXJSZWN0LnRvcCArIGNvbnRhaW5lclJlY3QuaGVpZ2h0IC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3VidHJhY3Qgc2Nyb2xsIHZhbHVlcyBmcm9tIHRoZSBjb29yZGluYXRlcyBiZWNhdXNlIGNhbGN1bGF0aW9ucyBiZWxvd1xuICAgICAgLy8gYXJlIGFsd2F5cyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnQgcmVjdGFuZ2xlLlxuICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgIHBhZ2VYIC09IHNjcm9sbFBvc2l0aW9uLmxlZnQ7XG4gICAgICBwYWdlWSAtPSBzY3JvbGxQb3NpdGlvbi50b3A7XG4gICAgfVxuXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5yYWRpdXMgfHwgdGhpcy5kaXN0YW5jZVRvRnVydGhlc3RDb3JuZXIocGFnZVgsIHBhZ2VZLCBjb250YWluZXJSZWN0KTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuUklQUExFX0ZBREVfSU5fRFVSQVRJT04gKiAoMSAvIHRoaXMuc3BlZWRGYWN0b3IpO1xuICAgIGNvbnN0IG9mZnNldFggPSBwYWdlWCAtIGNvbnRhaW5lclJlY3QubGVmdDtcbiAgICBjb25zdCBvZmZzZXRZID0gcGFnZVkgLSBjb250YWluZXJSZWN0LnRvcDtcblxuICAgIGNvbnN0IHJpcHBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJpcHBsZS5jbGFzc0xpc3QuYWRkKCdtZHctcmlwcGxlLWVsZW1lbnQnKTtcbiAgICByaXBwbGUuc3R5bGUubGVmdCA9IGAke29mZnNldFggLSByYWRpdXN9cHhgO1xuICAgIHJpcHBsZS5zdHlsZS50b3AgPSBgJHtvZmZzZXRZIC0gcmFkaXVzfXB4YDtcbiAgICByaXBwbGUuc3R5bGUuaGVpZ2h0ID0gYCR7cmFkaXVzICogMn1weGA7XG4gICAgcmlwcGxlLnN0eWxlLndpZHRoID0gYCR7cmFkaXVzICogMn1weGA7XG5cbiAgICAvLyBJZiB0aGUgY29sb3IgaXMgbm90IHNldCwgdGhlIGRlZmF1bHQgQ1NTIGNvbG9yIHdpbGwgYmUgdXNlZC5cbiAgICByaXBwbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcjtcbiAgICByaXBwbGUuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHJpcHBsZSk7XG5cbiAgICAvLyBCeSBkZWZhdWx0IHRoZSBicm93c2VyIGRvZXMgbm90IHJlY2FsY3VsYXRlIHRoZSBzdHlsZXMgb2YgZHluYW1pY2FsbHkgY3JlYXRlZFxuICAgIC8vIHJpcHBsZSBlbGVtZW50cy4gVGhpcyBpcyBjcml0aWNhbCBiZWNhdXNlIHRoZW4gdGhlIGBzY2FsZWAgd291bGQgbm90IGFuaW1hdGUgcHJvcGVybHkuXG4gICAgdGhpcy5lbmZvcmNlU3R5bGVSZWNhbGN1bGF0aW9uKHJpcHBsZSk7XG5cbiAgICByaXBwbGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcblxuICAgIC8vIEV4cG9zZWQgcmVmZXJlbmNlIHRvIHRoZSByaXBwbGUgdGhhdCB3aWxsIGJlIHJldHVybmVkLlxuICAgIGxldCByaXBwbGVSZWYgPSB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY2VudGVyZWQ6IHRoaXMuY2VudGVyZWQsXG4gICAgICAgIHRpZ2dlckVsZW1lbnQ6IHRoaXMudHJpZ2dlckVsZW1lbnQsXG4gICAgICAgIHNwZWVkRmFjdG9yOiB0aGlzLnNwZWVkRmFjdG9yLFxuICAgICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIHBlcnNpc3RlbnQ6IHRoaXMucGVyc2lzdGVudCxcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICB9LFxuICAgICAgZWxlbWVudDogcmlwcGxlLFxuICAgICAgZmFkZU91dDogKCkgPT4gZmFkZU91dCgpLFxuICAgICAgc3RhdGU6IHRoaXMuUklQUExFX1NUQVRFLkZBRElOR19JTlxuICAgIH07XG4gICAgY29uc3QgZmFkZU91dCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmFkZU91dFJpcHBsZShyaXBwbGVSZWYpXG4gICAgfTtcblxuICAgIC8vIEFkZCB0aGUgcmlwcGxlIHJlZmVyZW5jZSB0byB0aGUgbGlzdCBvZiBhbGwgYWN0aXZlIHJpcHBsZXMuXG4gICAgdGhpcy5hY3RpdmVSaXBwbGVzLmFkZChyaXBwbGVSZWYpO1xuXG4gICAgLy8gV2FpdCBmb3IgdGhlIHJpcHBsZSBlbGVtZW50IHRvIGJlIGNvbXBsZXRlbHkgZmFkZWQgaW4uXG4gICAgLy8gT25jZSBpdCdzIGZhZGVkIGluLCB0aGUgcmlwcGxlIGNhbiBiZSBoaWRkZW4gaW1tZWRpYXRlbHkgaWYgdGhlIG1vdXNlIGlzIHJlbGVhc2VkLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmlwcGxlUmVmLnN0YXRlID0gdGhpcy5SSVBQTEVfU1RBVEUuVklTSUJMRTtcbiAgICAgIGlmICghdGhpcy5wZXJzaXN0ZW50ICYmICF0aGlzLmlzTW91c2Vkb3duKSByaXBwbGVSZWYuZmFkZU91dCgpO1xuICAgIH0sIGR1cmF0aW9uKTtcbiAgfVxuXG4gIGZhZGVPdXRSaXBwbGUocmlwcGxlUmVmKSB7XG4gICAgLy8gRm9yIHJpcHBsZXMgdGhhdCBhcmUgbm90IGFjdGl2ZSBhbnltb3JlLCBkb24ndCByZS11biB0aGUgZmFkZS1vdXQgYW5pbWF0aW9uLlxuICAgIGlmICghdGhpcy5hY3RpdmVSaXBwbGVzLmRlbGV0ZShyaXBwbGVSZWYpKSByZXR1cm47XG5cbiAgICBjb25zdCByaXBwbGVFbCA9IHJpcHBsZVJlZi5lbGVtZW50O1xuXG4gICAgcmlwcGxlRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7dGhpcy5SSVBQTEVfRkFERV9PVVRfRFVSQVRJT059bXNgO1xuICAgIHJpcHBsZUVsLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgcmlwcGxlUmVmLnN0YXRlID0gdGhpcy5SSVBQTEVfU1RBVEUuRkFESU5HX09VVDtcblxuICAgIC8vIE9uY2UgdGhlIHJpcHBsZSBmYWRlZCBvdXQsIHRoZSByaXBwbGUgY2FuIGJlIHNhZmVseSByZW1vdmVkIGZyb20gdGhlIERPTS5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJpcHBsZVJlZi5zdGF0ZSA9IHRoaXMuUklQUExFX1NUQVRFLkhJRERFTjtcbiAgICAgIHJpcHBsZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmlwcGxlRWwpO1xuICAgIH0sIHRoaXMuUklQUExFX0ZBREVfT1VUX0RVUkFUSU9OKTtcbiAgfVxuXG4gIGRpc3RhbmNlVG9GdXJ0aGVzdENvcm5lcih4LCB5LCByZWN0KSB7XG4gICAgY29uc3QgZGlzdFggPSBNYXRoLm1heChNYXRoLmFicyh4IC0gcmVjdC5sZWZ0KSwgTWF0aC5hYnMoeCAtIHJlY3QucmlnaHQpKTtcbiAgICBjb25zdCBkaXN0WSA9IE1hdGgubWF4KE1hdGguYWJzKHkgLSByZWN0LnRvcCksIE1hdGguYWJzKHkgLSByZWN0LmJvdHRvbSkpO1xuICAgIHJldHVybiBNYXRoLnNxcnQoZGlzdFggKiBkaXN0WCArIGRpc3RZICogZGlzdFkpO1xuICB9XG5cbiAgZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbigpIHtcbiAgICBjb25zdCBkb2N1bWVudFJlY3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBUaGUgdG9wLWxlZnQtY29ybmVyIG9mIHRoZSB2aWV3cG9ydCBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIGRvY3VtZW50XG4gICAgLy8gYm9keSwgbm9ybWFsbHkganVzdCAoc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wKS4gSG93ZXZlciwgQ2hyb21lIGFuZCBGaXJlZm94IGRpc2FncmVlIGFib3V0XG4gICAgLy8gd2hldGhlciBgZG9jdW1lbnQuYm9keWAgb3IgYGRvY3VtZW50LmRvY3VtZW50RWxlbWVudGAgaXMgdGhlIHNjcm9sbGVkIGVsZW1lbnQsIHNvIHJlYWRpbmdcbiAgICAvLyBgc2Nyb2xsVG9wYCBhbmQgYHNjcm9sbExlZnRgIGlzIGluY29uc2lzdGVudC4gSG93ZXZlciwgdXNpbmcgdGhlIGJvdW5kaW5nIHJlY3Qgb2ZcbiAgICAvLyBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50YCB3b3JrcyBjb25zaXN0ZW50bHksIHdoZXJlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHZhbHVlcyB3aWxsXG4gICAgLy8gZXF1YWwgbmVnYXRpdmUgdGhlIHNjcm9sbCBwb3NpdGlvbi5cbiAgICBjb25zdCB0b3AgPSAtZG9jdW1lbnRSZWN0LnRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IDA7XG4gICAgY29uc3QgbGVmdCA9IC1kb2N1bWVudFJlY3QubGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHwgMDtcblxuICAgIHJldHVybiB7dG9wLCBsZWZ0fTtcbiAgfVxuXG4gIC8qKiBFbmZvcmNlcyBhIHN0eWxlIHJlY2FsY3VsYXRpb24gb2YgYSBET00gZWxlbWVudCBieSBjb21wdXRpbmcgaXRzIHN0eWxlcy4gKi9cbiAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogTW92ZSBpbnRvIGdsb2JhbCB1dGlsaXR5IGZ1bmN0aW9uLlxuICBlbmZvcmNlU3R5bGVSZWNhbGN1bGF0aW9uKGVsZW1lbnQpIHtcbiAgICAvLyBFbmZvcmNlIGEgc3R5bGUgcmVjYWxjdWxhdGlvbiBieSBjYWxsaW5nIGBnZXRDb21wdXRlZFN0eWxlYCBhbmQgYWNjZXNzaW5nIGFueSBwcm9wZXJ0eS5cbiAgICAvLyBDYWxsaW5nIGBnZXRQcm9wZXJ0eVZhbHVlYCBpcyBpbXBvcnRhbnQgdG8gbGV0IG9wdGltaXplcnMga25vdyB0aGF0IHRoaXMgaXMgbm90IGEgbm9vcC5cbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC81ZDUyZmIwODFiMzU3MGM4MWUzYVxuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ29wYWNpdHknKTtcbiAgfVxufTtcbiIsImltcG9ydCB7IGlzUGhvbmUsIGlzUGhvbmVBbmRUYWJsZXQgfSBmcm9tICcuL21vYmlsZS1pbmZvLmpzJztcblxuY29uc3QgTURXVXRpbHMgPSBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl91aWQgPSAxO1xuICAgIHRoaXMuX3NldHVwVHJhbnNpdGlvbkV2ZW50KCk7XG4gICAgdGhpcy5fc2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKCk7XG4gICAgdGhpcy5pc1Bob25lID0gaXNQaG9uZTtcbiAgICB0aGlzLmlzUGhvbmVBbmRUYWJsZXQgPSBpc1Bob25lQW5kVGFibGV0O1xuICAgIHRoaXMucm91dGVDaGFuZ2VDYWxsYmFja3MgPSBuZXcgU2V0KCk7XG4gICAgLy8gYWRkIGNsYXNzIGluZGVjYXRvciBmb3IgbW9iaWxlXG5cbiAgICB0aGlzLm9uUmVhZHkoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWR3LWlzLW1vYmlsZScpO1xuICAgICAgZWxzZSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1pcy1tb2JpbGUnKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLm9uUm91dGVDaGFuZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgb25SZWFkeShjYWxsYmFjaykge1xuICAgIGlmICghZG9jdW1lbnQuYm9keSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub25SZWFkeShjYWxsYmFjayk7XG4gICAgICB9LCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHVpZChsYWJlbCA9ICdpZCcpIHtcbiAgICByZXR1cm4gYCR7bGFiZWx9XyR7dGhpcy5fdWlkKyt9YDtcbiAgfVxuXG4gIGdldCBpc01vYmlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Bob25lQW5kVGFibGV0O1xuICB9XG5cbiAgbG9ja1BhZ2VTY3JvbGwoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2ZW50LW92ZXItc2Nyb2xsJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZSA+IG1kdy1jb250ZW50JykgOiBkb2N1bWVudC5ib2R5O1xuICAgIHNjcm9sbEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgfVxuXG4gIHVubG9ja1BhZ2VTY3JvbGwoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2ZW50LW92ZXItc2Nyb2xsJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZHctcGFnZSA+IG1kdy1jb250ZW50JykgOiBkb2N1bWVudC5ib2R5O1xuICAgIHNjcm9sbEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgfVxuXG4gIGRpc2FibGVVc2VyU2VsZWN0KCkge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWR3LW5vLXNlbGVjdCcpO1xuICB9XG5cbiAgZW5hYmxlVXNlclNlbGVjdCgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1uby1zZWxlY3QnKTtcbiAgfVxuXG4gIGRlYm91bmNlKGZuLCB3YWl0KSB7XG4gICAgbGV0IHRpbWVyO1xuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9LCB3YWl0IHx8IDEwKTtcbiAgICB9O1xuICB9XG5cbiAgdGhyb3R0bGUoZm4sIGxpbWl0KSB7XG4gICAgbGV0IGFscmVhZHlRdWV1ZWQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgIGlmICghYWxyZWFkeVF1ZXVlZCkge1xuICAgICAgICBhbHJlYWR5UXVldWVkID0gdHJ1ZTtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFscmVhZHlRdWV1ZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgbGltaXQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyB0aHJvdHRsZSBvbiByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZXl5XG4gIHJhZlRocm90dGxlKGZuKSB7XG4gICAgbGV0IGFscmVhZHlRdWV1ZWQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgIGlmICghYWxyZWFkeVF1ZXVlZCkge1xuICAgICAgICBhbHJlYWR5UXVldWVkID0gdHJ1ZTtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgYWxyZWFkeVF1ZXVlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcXVlcnlTbG90dGVkKGNvbXBvbmVudCwgc2VsZWN0b3IpIHtcbiAgICBpZiAoIWNvbXBvbmVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGVpdGhlciBjb21wb25lbnQnKTtcbiAgICBpZiAoIXNlbGVjdG9yKSB0aHJvdyBFcnJvcigncmVxdWlyZXMgc2VsZWN0b3InKTtcbiAgICBpZiAoIWNvbXBvbmVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5hc3NpZ25lZE5vZGVzKCkuZmluZChlbCA9PiB7XG4gICAgICBpZiAoIWVsLm1hdGNoZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHF1ZXJ5U2xvdHRlZEFsbChjb21wb25lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKCFjb21wb25lbnQpIHRocm93IEVycm9yKCdyZXF1aXJlcyBlaXRoZXIgY29tcG9uZW50Jyk7XG4gICAgaWYgKCFzZWxlY3RvcikgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIHNlbGVjdG9yJyk7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5hc3NpZ25lZE5vZGVzKHsgZmxhdHRlbjogdHJ1ZSB9KS5yZWR1Y2UoKGEsIGVsKSA9PiB7XG4gICAgICBpZiAoIWVsLnF1ZXJ5U2VsZWN0b3JBbGwpIHJldHVybiBhO1xuICAgICAgcmV0dXJuIGEuY29uY2F0KFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV0pO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHNsb3R0ZWRDaGlsZHJlbihjb21wb25lbnQpIHtcbiAgICBpZiAoIWNvbXBvbmVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGVpdGhlciBjb21wb25lbnQnKTtcbiAgICByZXR1cm4gY29tcG9uZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdCcpLmFzc2lnbmVkTm9kZXMoKTtcbiAgfVxuXG4gIGdldCB0cmFuc2l0aW9uRXZlbnROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb25FdmVudE5hbWVfO1xuICB9XG5cbiAgZ2V0IHRyYW5zZm9ybVByb3BlcnR5TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xuICB9XG5cbiAgYWRkQmFja2Ryb3AoZWxlbWVudCwgY2xpY2tDYWxsYmFjaywgb3B0aW9ucyA9IHsgc2hlZXQ6IGZhbHNlIH0pIHtcbiAgICBjb25zdCBpZCA9IHRoaXMudWlkKCk7XG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgaWQ9XCIke2lkfVwiIGNsYXNzPVwibWR3LWJhY2tkcm9wXCI+PC9kaXY+YCk7XG4gICAgY29uc3QgYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XG4gICAgaWYgKG9wdGlvbnMuc2hlZXQgPT09IHRydWUpIGJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctc2hlZXQtYmFja2Ryb3AnKTtcbiAgICBpZiAoY2xpY2tDYWxsYmFjaykgYmFja2Ryb3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYWxsYmFjayk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKGNsaWNrQ2FsbGJhY2spIGJhY2tkcm9wRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FsbGJhY2spO1xuICAgICAgICBiYWNrZHJvcEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBzZWFyY2hQYXJhbXRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V4dHJhY3RTZWFyY2hQYXJhbWV0ZXJzKHRoaXMuX2NsZWFuKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSkuc3BsaXQoJywnKS5maWx0ZXIoYSA9PiAhIWEpLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgY29uc3Qgc3BsaXQgPSBiLnNwbGl0KCc9Jyk7XG4gICAgICBhW3NwbGl0WzBdXSA9IHNwbGl0WzFdO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwge30pO1xuICB9XG5cbiAgc2V0U2VhcmNoUGFyYW10ZXIobmFtZSwgdmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gdGhpcy5zZWFyY2hQYXJhbXRlcnM7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIGRlbGV0ZSBwYXJhbWV0ZXJzW25hbWVdO1xuICAgIGVsc2UgcGFyYW1ldGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgIGxldCBwYXRoID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXTtcbiAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1ldGVycykubGVuZ3RoID4gMCkgcGF0aCArPSAnPycgKyBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5tYXAoa2V5ID0+IGAke2tleX09JHtwYXJhbWV0ZXJzW2tleV19YCkuam9pbignLCcpO1xuXG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgcGF0aCB9LCAnJywgcGF0aCk7XG4gIH1cblxuICByZW1vdmVTZWFyY2hQYXJhbXRlcihuYW1lKSB7XG4gICAgdGhpcy5zZXRTZWFyY2hQYXJhbXRlcihuYW1lLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgYWRkT25Sb3V0ZUNoYW5nZShjYWxsYmFjaykge1xuICAgIHRoaXMucm91dGVDaGFuZ2VDYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5yb3V0ZUNoYW5nZUNhbGxiYWNrcy5kZWxldGUoY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU9uUm91dGVDaGFuZ2UoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5yb3V0ZUNoYW5nZUNhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB0aGlzLnJvdXRlQ2hhbmdlQ2FsbGJhY2tzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH1cblxuICBfcm91dGVDaGFuZ2UoeyBvbGRVcmwsIG5ld1VSTCB9ID0geyBvbGRVcmw6IHVuZGVmaW5lZCwgbmV3VVJMOiB1bmRlZmluZWQgfSkge1xuICAgIHRoaXMucm91dGVDaGFuZ2VDYWxsYmFja3MuZm9yRWFjaChjYiA9PiBjYih7IG9sZFVybCwgbmV3VVJMIH0pKTtcbiAgfVxuXG4gIF9jbGVhbihzdHIpIHtcbiAgICBpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gcztcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcLyskLywgJycpLnJlcGxhY2UoL15cXC8rLywgJy8nKTtcbiAgfVxuXG4gIF9leHRyYWN0U2VhcmNoUGFyYW1ldGVycyh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KC9cXD8oLiopPyQvKS5zbGljZSgxKS5qb2luKCcnKTtcbiAgfVxuXG4gIF9zZXR1cFRyYW5zaXRpb25FdmVudCgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB7XG4gICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgIH07XG5cbiAgICBmb3IgKGxldCB0IGluIHRyYW5zaXRpb25zKXtcbiAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB0aGlzLnRyYW5zaXRpb25FdmVudE5hbWVfID0gdHJhbnNpdGlvbnNbdF07XG4gICAgfVxuICB9XG5cbiAgX3NldFRyYW5zZm9ybVByb3BlcnR5TmFtZShmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSAndHJhbnNmb3JtJyBpbiBlbC5zdHlsZSA/ICd0cmFuc2Zvcm0nIDogJ3dlYmtpdFRyYW5zZm9ybSc7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5NRFdVdGlscyA9IE1EV1V0aWxzO1xuXG5leHBvcnQgZGVmYXVsdCBNRFdVdGlscztcbiIsImltcG9ydCBNRFdVdGlscyBmcm9tICcuL1V0aWxzLmpzJztcblxuY29uc3QgZHJhZ0luc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3Qgc3RhdGVzID0ge1xuICBzdGFydDogJ3N0YXJ0JyxcbiAgbW92ZTogJ21vdmUnLFxuICBlbmQ6ICdlbmQnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRHJhZ0xpc3RlbmVyKGVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHRocm93IEVycm9yKCdlbGVtZW50IG11c3QgYmUgYW4gaW5zdGFuY2UgSFRNTEVsZW1lbnQnKTtcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGNvbnN0IGRyYWdJbnN0YW5jZSA9IG5ldyBEcmFnKGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgZHJhZ0luc3RhbmNlLmFkZEV2ZW50cygpO1xuXG4gIGlmICghZHJhZ0luc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLmdldChlbGVtZW50KSkgZHJhZ0luc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLnNldChlbGVtZW50LCBuZXcgTWFwKCkpO1xuICBkcmFnSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpLnNldChjYWxsYmFjaywgZHJhZ0luc3RhbmNlKTtcbn07XG5cbi8vIGlmIHlvdSBkbyBub3QgcGFzcyBpbiBjYWxsYmFjayB0aGVuIGFsbCB0aGUgZHJhZyBldmVudHMgb24gYW4gZWxlbWVudCB3aWxsIGJlIHJlbW92ZWRcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEcmFnTGlzdGVuZXIoZWxlbWVudCwgY2FsbGJhY2sgPSB1bmRlZmluZWQpIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgRXJyb3IoJ2VsZW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBIVE1MRWxlbWVudCcpO1xuXG4gIGNvbnN0IGRyYWdJbnN0YW5jZXMgPSBkcmFnSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpO1xuICBpZiAoIWRyYWdJbnN0YW5jZXMpIHJldHVybjtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZWwgPSBkcmFnSW5zdGFuY2VzLmdldChjYWxsYmFjayk7XG4gICAgaWYgKGVsKSBlbC5yZW1vdmVFdmVudHMoKTtcbiAgICBkcmFnSW5zdGFuY2VzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgZHJhZ0luc3RhbmNlcy5mb3JFYWNoKGkgPT4gaS5yZW1vdmVFdmVudHMoKSk7XG4gICAgZHJhZ0luc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLmRlbGV0ZShlbGVtZW50KTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQoZWxlbWVudCkge1xuICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB0aHJvdyBFcnJvcignZWxlbWVudCBtdXN0IGJlIGFuIGluc3RhbmNlIEhUTUxFbGVtZW50Jyk7XG4gIGNvbnN0IGRyYWdJbnN0YW5jZXMgPSBkcmFnSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpO1xuICBpZiAoIWRyYWdJbnN0YW5jZXMpIHJldHVybjtcbiAgZHJhZ0luc3RhbmNlcy5mb3JFYWNoKGkgPT4gaS5lbmFibGUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlRHJhZ0xpc3RlbmVyRm9yRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHRocm93IEVycm9yKCdlbGVtZW50IG11c3QgYmUgYW4gaW5zdGFuY2UgSFRNTEVsZW1lbnQnKTtcbiAgY29uc3QgZHJhZ0luc3RhbmNlcyA9IGRyYWdJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5nZXQoZWxlbWVudCk7XG4gIGlmICghZHJhZ0luc3RhbmNlcykgcmV0dXJuO1xuICBkcmFnSW5zdGFuY2VzLmZvckVhY2goaSA9PiBpLmRpc2FibGUoKSk7XG59XG5cbmNsYXNzIERyYWcge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgdGhpcy5oYXNQb2ludGVyRXZlbnQgPSAhIXdpbmRvdy5Qb2ludGVyRXZlbnQ7XG4gICAgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlU3RhcnQgPSB0aGlzLmhhbmRsZUdlc3R1cmVTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUgPSB0aGlzLmhhbmRsZUdlc3R1cmVNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kID0gdGhpcy5oYW5kbGVHZXN0dXJlRW5kLmJpbmQodGhpcyk7XG5cbiAgICAvLyBjYWxsYmFjayB0aHJvdHRsZXJcbiAgICB0aGlzLmNhbGxiYWNrVGhyb3R0bGUgPSBNRFdVdGlscy5yYWZUaHJvdHRsZSgoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LmRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZShldmVudCk7XG4gICAgICBldmVudC5kaXJlY3Rpb24gPSB0aGlzLmdldERpcmVjdGlvbih0aGlzLmxhc3REaXN0YW5jZSwgZXZlbnQuZGlzdGFuY2UpO1xuICAgICAgdGhpcy5sYXN0RGlzdGFuY2UgPSBldmVudC5kaXN0YW5jZTtcbiAgICAgIHRoaXMuY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkRXZlbnRzKCkge1xuICAgIHRoaXMuZGlzYWJsZVRvdWNoRXZlbnRzKCk7XG5cbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlU3RhcnQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZVN0YXJ0KTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gIH1cblxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgfVxuXG4gIGVuYWJsZVRvdWNoRXZlbnRzKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZVsndG91Y2gtYWN0aW9uJ10gPSAnJztcbiAgfVxuXG4gIGRpc2FibGVUb3VjaEV2ZW50cygpIHtcbiAgICAvLyB0aGlzIGRpc2FibGVkIHRoZSBicm93c2VycyBhdXRvIGhhbmRsaW5nIG9mIHRoZSB0b3VjaCBldmVudHMuXG4gICAgLy8gSWYgdGhpcyBpcyBub3Qgc2V0IHRvIG5vbmUsIHRoZW4gdGhlIGJyb3dzZXIgd2lsbCBpbW1pZGlhdGVseSBjYW5jZWwgdGhlIHRvYWNoIGV2bmV0c1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZVsndG91Y2gtYWN0aW9uJ10gPSAnbm9uZSc7XG4gIH1cblxuICByZW1vdmVFdmVudHMoKSB7XG4gICAgdGhpcy5lbmFibGVUb3VjaEV2ZW50cygpO1xuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVTdGFydCk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZVN0YXJ0KTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVNb3ZlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVHZXN0dXJlU3RhcnQoZXYpIHtcbiAgICBpZiAoZXYudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXYuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgZXYuc3RhdGUgPSAnc3RhcnQnO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmluaXRpYWxUb3VjaFBvcyA9IHRoaXMuZ2V0Q2xpZW50WFkoZXYpO1xuICAgIHRoaXMubGFzdERpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZShldik7XG4gICAgdGhpcy5tb3ZlZCA9IGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlR2VzdHVyZU1vdmUoZXYpIHtcbiAgICBldi5zdGF0ZSA9IHRoaXMubW92ZWQgPyAnbW92ZScgOiAnc3RhcnQnO1xuICAgIHRoaXMubW92ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmluaXRpYWxUb3VjaFBvcykgdGhpcy5jYWxsYmFja1Rocm90dGxlKGV2KTtcbiAgfVxuXG4gIGhhbmRsZUdlc3R1cmVFbmQoZXYpIHtcbiAgICBldi5zdGF0ZSA9ICdlbmQnO1xuICAgIFxuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVNb3ZlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICB9XG5cbiAgICAvLyBubyBkcmFnIHRvb2sgcGxhY2VcbiAgICBpZiAodGhpcy5tb3ZlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIHRoaXMuZW5kVGltZSA9IERhdGUubm93KCk7XG4gICAgZXYucnVuVGltZSA9IHRoaXMuZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIGV2LmRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZShldik7XG4gICAgZXYuZGlyZWN0aW9uID0gdGhpcy5nZXREaXJlY3Rpb24oeyB4OiAwLCB5OiAwIH0sIGV2LmRpc3RhbmNlKTtcbiAgICBldi52ZWxvY2l0eSA9IHRoaXMuZ2V0VmVsb2NpdHkoZXYuZGlzdGFuY2UsIGV2LnJ1blRpbWUpO1xuXG4gICAgaWYgKGV2LmNsaWVudFggPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2xpZW50UG9zID0gdGhpcy5nZXRDbGllbnRYWShldik7XG4gICAgICBldi5jbGllbnRYID0gY2xpZW50UG9zLng7XG4gICAgICBldi5jbGllbnRZID0gY2xpZW50UG9zLnk7XG4gICAgfVxuICAgIHRoaXMuY2FsbGJhY2soZXYpO1xuICB9XG5cbiAgZ2V0RGlzdGFuY2UoZXZlbnQpIHtcbiAgICBjb25zdCB4eSA9IHRoaXMuZ2V0Q2xpZW50WFkoZXZlbnQpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiB4eS54IC0gdGhpcy5pbml0aWFsVG91Y2hQb3MueCxcbiAgICAgIHk6IHh5LnkgLSB0aGlzLmluaXRpYWxUb3VjaFBvcy55XG4gICAgfTtcbiAgfVxuXG4gIGdldERpcmVjdGlvbihhLCBiKSB7XG4gICAgY29uc3QgeCA9IGIueCA+IGEueCA/IDEgOiBiLnggPT09IGEueCA/IDAgOiAtMTtcbiAgICBjb25zdCB5ID0gYi55ID4gYS55ID8gMSA6IGIueSA9PT0gYS55ID8gMCA6IC0xO1xuICAgIHJldHVybiB7XG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIHhEZXNjcmlwdGlvbjogeCA9PT0gMCA/ICdub25lJyA6IHggPT09IDEgPyAncmlnaHQnIDogJ2xlZnQnLFxuICAgICAgeURlc2NyaXB0aW9uOiB5ID09PSAwID8gJ25vbmUnIDogeSA9PT0gMSA/ICdkb3duJyA6ICd1cCdcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q2xpZW50WFkoZXZlbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogZXZlbnQudGFyZ2V0VG91Y2hlcyAmJiBldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA/IGV2ZW50LnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggOiBldmVudC5jbGllbnRYLFxuICAgICAgeTogZXZlbnQudGFyZ2V0VG91Y2hlcyAmJiBldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA/IGV2ZW50LnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBldmVudC5jbGllbnRZXG4gICAgfVxuICB9XG5cbiAgZ2V0VmVsb2NpdHkoZGlzdGFuY2UsIHRpbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogZGlzdGFuY2UueCAvIHRpbWUsXG4gICAgICB5OiBkaXN0YW5jZS55IC8gdGltZVxuICAgIH07XG4gIH1cbn1cblxud2luZG93Lk1EV0RyYWcgPSB7XG4gIHN0YXRlcyxcbiAgYWRkRHJhZ0xpc3RlbmVyLFxuICByZW1vdmVEcmFnTGlzdGVuZXIsXG4gIGVuYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQsXG4gIGRpc2FibGVEcmFnTGlzdGVuZXJGb3JFbGVtZW50XG59O1xuIiwiZXhwb3J0IGNvbnN0IGlzUGhvbmUgPSBpc1Bob25lQ2hlY2soKTtcbmV4cG9ydCBjb25zdCBpc1Bob25lQW5kVGFibGV0ID0gaXNQaG9uZUFuZFRhYmxldENoZWNrKCk7XG5cbmZ1bmN0aW9uIGlzUGhvbmVBbmRUYWJsZXRDaGVjaygpIHtcbiAgaWYgKHR5cGVvZiBGT1JDRV9NT0JJTEUgIT09J3VuZGVmaW5lZCcgJiYgRk9SQ0VfTU9CSUxFID09PSAndHJ1ZScpIHJldHVybiB0cnVlO1xuICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uIChhKSB7XG4gICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7XG4gIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICByZXR1cm4gY2hlY2s7XG59XG5cbmZ1bmN0aW9uIGlzUGhvbmVDaGVjaygpIHtcbiAgaWYgKHR5cGVvZiBGT1JDRV9NT0JJTEUgIT09J3VuZGVmaW5lZCcgJiYgRk9SQ0VfTU9CSUxFID09PSAndHJ1ZScpIHJldHVybiB0cnVlO1xuICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uIChhKSB7XG4gICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7XG4gIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICByZXR1cm4gY2hlY2s7XG59XG4iLCJpbXBvcnQgeyBhZGREcmFnTGlzdGVuZXIsIHJlbW92ZURyYWdMaXN0ZW5lciB9IGZyb20gJy4vZHJhZy5qcyc7XG5cbmNvbnN0IHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24gPSBuZXcgTWFwKCk7XG5cbmNsYXNzIFN3aXBlIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmJvdW5kX2RyYWdFdmVudCA9IHRoaXMuZHJhZ0V2ZW50LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGFkZEV2ZW50cygpIHtcbiAgICBhZGREcmFnTGlzdGVuZXIodGhpcy5lbGVtZW50LCB0aGlzLmJvdW5kX2RyYWdFdmVudCk7XG4gIH1cblxuICByZW1vdmVFdmVudHMoKSB7XG4gICAgcmVtb3ZlRHJhZ0xpc3RlbmVyKHRoaXMuZWxlbWVudCwgdGhpcy5ib3VuZF9kcmFnRXZlbnQpO1xuICB9XG5cbiAgZHJhZ0V2ZW50KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnN0YXRlID09PSAnZW5kJykge1xuICAgICAgaWYgKE1hdGguYWJzKGV2ZW50LnZlbG9jaXR5LngpID4gMS40IHx8IE1hdGguYWJzKGV2ZW50LnZlbG9jaXR5LnkpID4gMS40KSB0aGlzLmNhbGxiYWNrKGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN3aXBlTGlzdGVuZXIoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgY29uc3Qgc3dpcEluc3RhbmNlID0gbmV3IFN3aXBlKGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgc3dpcEluc3RhbmNlLmFkZEV2ZW50cygpO1xuXG4gIGlmICghc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5nZXQoZWxlbWVudCkpIHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uc2V0KGVsZW1lbnQsIG5ldyBNYXAoKSk7XG4gIHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpLnNldChjYWxsYmFjaywgc3dpcEluc3RhbmNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVN3aXBlTGlzdGVuZXIoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgRXJyb3IoJ2VsZW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBIVE1MRWxlbWVudCcpO1xuXG4gIGNvbnN0IHN3aXBlSW5zdGFuY2VzID0gc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5nZXQoZWxlbWVudCk7XG4gIGlmICghc3dpcGVJbnN0YW5jZXMpIHJldHVybjtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZWwgPSBzd2lwZUluc3RhbmNlcy5nZXQoY2FsbGJhY2spO1xuICAgIGlmIChlbCkgZWwucmVtb3ZlRXZlbnRzKCk7XG4gICAgc3dpcGVJbnN0YW5jZXMuZGVsZXRlKGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZUluc3RhbmNlcy5mb3JFYWNoKGkgPT4gaS5yZW1vdmVFdmVudHMoKSk7XG4gICAgc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5kZWxldGUoZWxlbWVudCk7XG4gIH1cbn1cblxuXG53aW5kb3cuTURXU3dpcGUgPSB7XG4gIGFkZFN3aXBlTGlzdGVuZXIsXG4gIHJlbW92ZVN3aXBlTGlzdGVuZXJcbn07XG4iLCJpbXBvcnQgTURXRHJhZyBmcm9tICcuL2NvcmUvZHJhZy5qcyc7XG5pbXBvcnQgTURXU3dpcGUgZnJvbSAnLi9jb3JlL3N3aXBlLmpzJztcblxuLy8gLS0tIENvbXBvbmVudHMgLS0tXG5cbi8vIGltcG9ydCAnLi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9pbmRleC5qcyc7XG4vLyBpbXBvcnQgJy4vY29tcG9uZW50cy9iYWNrZHJvcC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9iYW5uZXIvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvYm90dG9tLW5hdmlnYXRpb24vaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2NhcmQvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvY2hlY2tib3gvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvY2lyY3VsYXItcHJvZ3Jlc3MvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvZGlhbG9nL2luZGV4LmpzJztcbi8vIC8vIGltcG9ydCAnLi9jb21wb25lbnRzL2V4cGFuZGVyL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2ZhYi9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9pY29uL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2xpbmVhci1wcm9ncmVzcy9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9saXN0L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2xpc3QtaXRlbS9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tZW51L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL25hdmlnYXRpb24tcmFpbC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9wYW5lbC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9yYWRpby9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9yYWRpby1ncm91cC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvc2hlZXQtYm90dG9tL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3NoZWV0LXNpZGUvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvc2xpZGVyL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3NuYWNrYmFyL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3N3aXRjaC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90YWJzL3RhYi1ib2R5L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RhYnMvdGFiLWJ1dHRvbi9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90YWJzL3RhYnMtYmFyL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RhYnMvdGFicy1jb250ZW50L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RleHQtZmllbGQvaW5kZXguanMnO1xuLy8gaW1wb3J0ICcuL2NvbXBvbmVudHMvdG9vbHRpcC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90b3AtYXBwLWJhci9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9ib3VuZC1wcm9wZXJ0eS9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90ZW1wbGF0ZXMvaW5kZXguanMnO1xuXG5cbmltcG9ydCBNRFdEaWFsb2cgZnJvbSAnLi9jb21wb25lbnRzL2RpYWxvZy9zZXJ2aWNlLmpzJztcbmltcG9ydCBNRFdTbmFja2JhciBmcm9tICcuL2NvbXBvbmVudHMvc25hY2tiYXIvc2VydmljZS5qcyc7XG5pbXBvcnQgTURXVGVtcGxhdGUgZnJvbSAnLi9jb21wb25lbnRzL3RlbXBsYXRlcy9zZXJ2aWNlLmpzJztcbmltcG9ydCBNRFdTdXJmYWNlIGZyb20gJy4vY29tcG9uZW50cy9zdXJmYWNlL3NlcnZpY2UuanMnO1xuXG5leHBvcnQge1xuICBNRFdEaWFsb2csXG4gIE1EV1NuYWNrYmFyLFxuICBNRFdUZW1wbGF0ZSxcbiAgTURXU3VyZmFjZSxcbiAgTURXRHJhZyxcbiAgTURXU3dpcGVcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=