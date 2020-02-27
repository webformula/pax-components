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
      if (globalThis.displayPageContentOnly) this.displayPageContentOnly(true);
    }

    // called once page is renderd
    connectedCallback() {
      // Detect super?
      if (!this.__isBuildProcess && this.addEvents) this.addEvents();
    }

    // called once page is removed
    disconnectedCallback() {
      // Detect super?
      if (!this.__isBuildProcess && this.removeEvents) this.removeEvents();
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

      globalThis.displayPageContentOnly = !reverse;
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
    if (path.includes('?')) path = path.split('?')[0];
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
    if (initial === false && event.oldURL === event.newURL) return;

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
    if (event) {
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
    return Object.entries(this.routes)
      .map(([route, className]) => {
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

/***/ "./src/components/autocomplete/index.js":
/*!**********************************************!*\
  !*** ./src/components/autocomplete/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Utils.js */ "./src/core/Utils.js");



customElements.define('mdw-autocomplete', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
    this._hasFilter = this.hasAttribute('filter');
  }

  connectedCallback() {
    const target = this.targetInput;
    target.setAttribute('autocomplete', 'off');

    this._innerHTML = this.innerHTML;
    this._optionsData = [...this.children].reduce((a, el) => {
      a[el.innerText] = el.getAttribute('value');
      return a;
    }, {});
    this.innerHTML = '';
    this.insertAdjacentHTML('beforeend', this.panelHTML);
    this.panel.innerHTML = this._innerHTML;
    this.panel.style.minWidth = `${this.targetInput.offsetWidth}px`;
    this.panel.style.transform = 'scale(1)';
    this.panel.style.top = `${this.targetInput.offsetHeight + 12}px`;
    this.panel.ignoreElementOnClickToClose(target);

    this.bound_onTargetFocus = this.onTargetFocus.bind(this);
    this.bound_onTargetBlur = this.onTargetBlur.bind(this);
    this.bound_onTargetChange = this.onTargetChange.bind(this);
    this.bound_onTargetInput = this.onTargetInput.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onKeyDown = this.onKeyDown.bind(this);
    this.debounce_filter = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].debounce(this.filter.bind(this), 100);

    target.addEventListener('focus', this.bound_onTargetFocus);
    target.addEventListener('blur', this.bound_onTargetBlur);
    target.addEventListener('input', this.bound_onTargetInput);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    document.body.addEventListener('keydown', this.bound_onKeyDown);
  }

  disconnectedCallback() {
    const target = this.targetInput;
    if (target) {
      target.removeEventListener('focus', this.bound_onTargetFocus);
      target.removeEventListener('blur', this.bound_onTargetBlur);
      target.removeEventListener('change', this.bound_onTargetChange);
      target.removeEventListener('input', this.bound_onTargetInput);
    }
    this.panel.close();
    this.panel.removeEventListener('click', this.bound_onPanelClick);
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    document.body.removeEventListener('keydown', this.bound_onKeyDown);
  }

  get targetInput() {
    return document.body.querySelector(`input[name=${this.getAttribute('for')}]`);
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
    return this.panel_;
  }

  get panelHTML() {
    return '<mdw-panel mdw-position="bottom inner-left"></mdw-panel>';
  }

  onPanelClose(e) {
    const target = this.targetInput;
    this.panel.removeEventListener('click', this.bound_onPanelClick);
    target.removeEventListener('change', this.bound_onTargetChange);
  }

  openPanel() {
    const target = this.targetInput;
    this._focusIndex = undefined;
    this.panel.open(true);
    this.panel.addEventListener('click', this.bound_onPanelClick);
    target.addEventListener('change', this.bound_onTargetChange);
  }

  onKeyDown(e) {
    if (!this.panel.isOpen()) {
      if (!this._isInputFocused) return;
      if (e.keyCode !== 27) this.openPanel();
      return;
    }

    switch (e.keyCode) {
      case 40: //down
      case 39: //right
        this.focusNext();
        break;

      case 38: //up
      case 37: //left
        this.focusPrevious();
        break;

      case 13: //enter
        this.selectFocused();
        break;
    }
  }

  onTargetFocus(e) {
    this._isInputFocused = true;
    this.openPanel();
  }

  onTargetBlur(e) {
    this._isInputFocused = false;
    this.panel.close();
    this.panel.removeEventListener('click', this.bound_onPanelClick);
  }

  onTargetChange(e) {
    // console.log('change');
  }

  onTargetInput(e) {
    if (!this.panel.isOpen()) {
      this.openPanel();
      return;
    }
    if (this._hasFilter) this.debounce_filter(e.target.value);
  }

  onPanelClick(e) {
    if (e.target.hasAttribute('value')) {
      const value = e.target.getAttribute('value');
      // TODO text field should do this when value is set
      this.targetInput.parentNode.classList.add('not-empty');
      this.targetInput.value = value;
      this.panel.close();
    }
  }

  filter(value) {
    if (!this.panel.isOpen()) return;
    value = value.toLowerCase();
    const vlen = value.length;
    const filtered = Object.keys(this._optionsData).filter(h => {
      const hlen = h.length;
      if (vlen > hlen) return false;
      if (vlen === hlen) return value === h;
      if (h.toLowerCase().includes(value)) return true
      return false;
      // TODO implement char matching
      // let i = 0;
      // let j;
      // for (; i < vlen; i += 1) {
      //
      // }
    });

    this.panel.innerHTML = this.renderOptions(filtered);
  }

  renderOptions(optionKeys) {
    return `${optionKeys.map(k => `
      <option value="${this._optionsData[k]}">${k}</option>
    `).join('\n')}`;
  }

  focusNext() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex += 1;
    if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusPrevious() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  selectFocused() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.children];
    if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
    const value =  optionElements[this._focusIndex].getAttribute('value');
    // TODO text field should do this when value is set
    this.targetInput.parentNode.classList.add('not-empty');
    this.targetInput.value = value;
    this.panel.close();
  }
});


/***/ }),

/***/ "./src/components/backdrop/index.js":
/*!******************************************!*\
  !*** ./src/components/backdrop/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-backdrop', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
  }

  connectedCallback() {
    // this.frontElement.classList.add('mdw-elevation-1--shadow');
  }

  get frontElement() {
    if (!this.frontElement_) this.frontElement_ = this.querySelector('mdw-backdrop-front');
    return this.frontElement_;
  }

  get backContentElement() {
    if (!this.backContentElement_) this.backContentElement_ = this.querySelector('mdw-backdrop-back mdw-backdrop-content');
    return this.backContentElement_;
  }

  get backContenHeight() {
    const children = this.backContentElement.children;
    const lastChild = children[children.length - 1];
    const childBounds = lastChild.getBoundingClientRect();
    return this.backContentElement.getBoundingClientRect().y + childBounds.y + childBounds.height;
  }

  get expanded() {
    return this.expanded_;
  }

  toggle() {
    if (this.expanded_ === true) this.contract();
    else this.expand();
  }

  expand() {
    this.frontElement.style.top = `${this.backContenHeight - 56}px`;
    this.expanded_ = true;
  }

  contract() {
    this.frontElement.style.top = '56px';
    this.expanded_ = false;
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
        border-radius: 4px;
        box-sizing: border-box;
        display: inline-flex;
        font-family: Roboto, sans-serif;
        font-size: 1rem;
        font-weight: 500;
        height: 36px;
        justify-content: center;
        letter-spacing: 0.08929em;
        line-height: 2.25rem;
        min-width: 64px;
        outline: none;
        overflow: hidden;
        padding: 0 8px 0 8px;
        position: relative;
        text-decoration: none;
        text-transform: uppercase;
        vertical-align: middle;
        will-change: transform, opacity;
        margin: 0;
        color: var(--mdw-theme-text--on-surface);
        background-color: transparent;
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
        color: rgba(var(--mdw-theme-text--on-surface--rgb), 0.37);
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
        background-color: white;
        color: #000000;
        padding: 0 16px 0 16px;
      }

      :host(.mdw-raised)::before,
      :host(.mdw-unelevated)::before {
        opacity: 0.08;
      }

      :host(.mdw-raised) {
        -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        -webkit-transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        -o-transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(.mdw-raised:hover),
      :host(.mdw-raised:focus) {
        -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
                box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-raised:active) {
        -webkit-box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
                box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-raised[disabled]) {
        -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
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
        color: var(--mdw-theme-text--on-primary);
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
        color: var(--mdw-theme-text--on-secondary);
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
        color: var(--mdw-theme-text--on-error);
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
        background-color: rgba(var(--mdw-theme-foreground--rgb), 0.16);
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
    this.classList.add('mdw-active');
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile && !this.classList.contains('mdw-locked-open-mobile')) {
      this.unlockOpen();
      this.hide();
    }

    const fixedEl = this.fixedElement;
    if (fixedEl) fixedEl.style.width = `${this.offsetWidth}px`;

    // add spacing for scroll
    if (this.contentElement) this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop + 18}px)`;

    this.setupIconBar();

    this.lockBody();
    this.addCloseOnChange();
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
        background-color: rgba(var(--mdw-theme-foreground--rgb), 0.16);
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
        border-top: 5px solid var(--mdw-theme-text--on-secondary);
      }

      ::slotted(select:focus) .mdw-select__icon,
      :host(.mdw-focused:focus) .mdw-select__icon {
        transform: rotate(180deg) translateY(-5px);
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(:not(.mdw-select--disabled)) ::slotted(select),
      :host(:not(.mdw-select--disabled)) .mdw-select__selected-text {
        border-bottom-color: var(--mdw-theme-outline_border);
        color: var(--mdw-theme-text--on-background);
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
        color: var(--mdw-theme-text--on-background);
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

        border-color: var(--mdw-theme-outline_border);
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
    return /* cs */`
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
        background-color: var(--mdw-theme-surface_elevation_1);
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
        color: var(--mdw-theme-text--primary);
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
        color: var(--mdw-theme-text--primary--on);
        border-bottom: 1px solid var(--mdw-theme-divider--dark);
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
/* harmony import */ var _core_gestures_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/gestures.js */ "./src/core/gestures.js");





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
    Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_3__["removeDragListener"])(this.contentElement, this.bound_onDrag);
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
      if (this.isDraggable) Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_3__["addDragListener"])(this.contentElement, this.bound_onDrag);
      this.contentElement.addEventListener('scroll', this.bound_onScroll);
      this.notifyOpen();
    }, 0);
    if (this.isModal) _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].lockPageScroll();
  }

  close() {
    Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_3__["removeDragListener"])(this.contentElement, this.bound_onDrag);
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
    if (this.isDraggable) Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_3__["addDragListener"])(this.contentElement, this.bound_onDrag);
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
      Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_3__["disableDragListenerForElement"])(this.contentElement);
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
      Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_3__["enableDragListenerForElement"])(this.contentElement);
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
/* harmony import */ var _core_gestures_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/gestures.js */ "./src/core/gestures.js");




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
    Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["addDragListener"])(this.thumb, this.bound_onDrag);
  }

  disconnectedCallback() {
    // this.thumb.removeEventListener('mousedown', this.bound_onMouseDown);
    // this.thumb.removeEventListener('mouseenter', this.bound_onMouseEnter);
    // this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
    this.track.removeEventListener('click', this.bound_trackClick);
    // document.removeEventListener('mouseup', this.bound_onMouseUp);
    // document.removeEventListener('mousemove', this.bound_onMouseMove);
    Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["removeDragListener"])(this.thumb, this.bound_onDrag);
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
        background-color: var(--mdw-theme-switchtrack);
        border-color: var(--mdw-theme-switchtrack);
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
        background-color: rgba(var(--mdw-theme-foreground--rgb), 0.16);
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

/***/ "./src/components/tooltip/index.js":
/*!*****************************************!*\
  !*** ./src/components/tooltip/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webformula/pax-core */ "./node_modules/@webformula/pax-core/index.js");


customElements.define('mdw-tooltip', class extends _webformula_pax_core__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtended"] {
  constructor() {
    super();
  }

  template() {
    return /* html */`
      <div class="tooltip">
        <slot></slot>
      </div>
    `;
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-theme.js */ "./src/core/base-theme.js");
// TODO enable configuration of theme on load


const MDWTheme = new class {
  constructor() {
    this.hexREGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.paletteRegex = /(?<base>--mdw-theme-palette--)(?<color>\w*)-?(?<contrast>contrast)?-(?<hue>\w*)$/;
    this.textRegex = /(?<base>--mdw-theme-text--)(?<on>on-\w*)?(?<state>\w*)--(?<contrast>\w*)$/;
    this.contentWithContrastRegex = /(?<base>--mdw-theme-)(?<content>\w*)--(?<contrast>\w*)$/;
    this.contrast_ = 'light';
    this.palettes = {
      primary: 'deeppurple',
      secondary: 'teal',
      error: 'red'
    };

    this.createBaseThemeStyleElement();
    const initialConfig = Object.assign({ contrast: 'light' }, this.palettes, window.MDWThemeConfig);
    this.setPalettes(initialConfig);
    if (['light', 'dark'].indexOf(initialConfig.contrast) > -1) this.contrast = initialConfig.contrast;
    this.categorize();
    this.setThemeVars();
    this.setOtherVars();
  }

  get contrast() {
    return this.contrast_;
  }

  set contrast(value) {
    if (value !== 'light' && value !== 'dark') throw Error('valid values are "light" and "dark"');
    this.contrast_ = value;
  }

  changeTheme({ primary, secondary, error, contrast }) {
    primary = primary || this.palettes.primary;
    secondary = secondary || this.palettes.secondary;
    error = error || this.palettes.error;
    if (contrast) this.contrast = contrast;
    this.setPalettes({ primary, secondary, error });
    this.setThemeVars();
    this.setOtherVars();
  }

  setPalettes({ primary, secondary, error } = {}) {
    this.palettes = {
      primary: primary || 'deeppurple',
      secondary: secondary || 'teal',
      error: error || 'red'
    };
  }

  setThemeVars() {
    Object.keys(this.palettes).forEach(key => {
      const colorName = this.palettes[key];
      const paletteVars = this.paletteVars(colorName);
      paletteVars.forEach(palette => {
        const name = `--mdw-theme-${key}${palette.contrast ? `-${palette.contrast}` : ''}${palette.default === false ? `-${palette.hue}` : ''}`;
        const value = this.getVar(palette.var);
        this.setVar(name, value);
        this.setVar(`${name}--rgb`, this.convertToRGB(value));

        if (palette.hue === this.contrast) {
          const normalized = name.replace(`-${this.contrast}`, '');
          this.setVar(normalized, value);
          this.setVar(`${normalized}--rgb`, this.convertToRGB(value));
        }
      });
    });
  }

  setOtherVars() {
    this.otherVars().forEach(v => {
      const value = this.getVar(v.var);
      this.setVar(v.normalized, value);
      this.setVar(`${v.normalized}--rgb`, this.convertToRGB(value));
    });
  }

  paletteVars(colorName) {
    const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith(`--mdw-theme-palette--${colorName}`));
    return paletteVarNames.map(key => this.normalizedVars[key][0]);
  }

  otherVars() {
    const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith('--mdw-theme') && !key.startsWith('--mdw-theme-palette'));
    return paletteVarNames.map(key => this.pickVar(this.normalizedVars[key]));
  }

  setVars() {
    Object.keys(this.normalizedVars).forEach(key => {
      const picked = this.pickVar(this.normalizedVars[key]);
      this.setVar(picked.normalized, this.getVar(picked.var));
    });
  }

  setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }

  pickVar(arr) {
    let found = arr.find(item => {
      if (item.default === true && this.contrast === item.contrast) return true;
    });
    if (!found) {
      found = arr.find(item => {
        if (this.contrast === item.contrast) return true;
        if (item.default === true) return true;
      });
    }
    return found || arr[0];
  }

  categorize() {
    const parsed = this.getAllVars().map(v => this.parseVar(v));
    const normalizedHash = parsed.reduce((a, b) => {
      if (b.noMatch === true || !b.normalized) return a;

      if (!a[b.normalized]) a[b.normalized] = [];
      a[b.normalized].push(b);
      return a;
    }, {});

    this.normalizedVars = normalizedHash;
  }

  // parse out variables in :root
  getAllVars() {
    return [...Object(_base_theme_js__WEBPACK_IMPORTED_MODULE_0__["default"])().matchAll(/(.*?):.*?;/g)].map(a => a[1].trim());
  }

  getUnmatched() {
    const parsed = this.getAllVars().map(v => this.parseVar(v));
    return parsed.filter(n => n.noMatch === true);
  }

  parseVar(varName) {
    if (this.paletteRegex.test(varName)) {
      const groups = varName.match(this.paletteRegex).groups;
      const normalized = `${groups.base}${groups.color}${groups.contrast ? `-contrast` : ''}-${groups.hue}`;
      return Object.assign({
        var: varName,
        type: 'palette',
        default: varName.indexOf('default') > 0,
        normalized
      }, groups);
    }
    if (this.textRegex.test(varName)) {
      const groups = varName.match(this.textRegex).groups;
      const normalized = `${groups.base}${groups.state || ''}${groups.on || ''}`;
      return Object.assign({
        var: varName,
        type: 'text',
        default: varName.indexOf('default') > 0,
        normalized
      }, groups);
    }
    if (this.contentWithContrastRegex.test(varName)) {
      const groups = varName.match(this.contentWithContrastRegex).groups;
      const normalized = `${groups.base}${groups.content}`;
      return Object.assign({
        var: varName,
        type: 'content',
        default: varName.indexOf('default') > 0,
        normalized
      }, groups);
    }

    return {
      var: varName,
      noMatch: true
    };
  }

  convertToRGB(hex) {
    const result = this.hexREGEX.exec(hex.trim());
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  }

  createBaseThemeStyleElement() {
    const styleNode = document.createElement('style');
    document.head.appendChild(styleNode);
    styleNode.type = 'text/css';
    styleNode.appendChild(document.createTextNode(Object(_base_theme_js__WEBPACK_IMPORTED_MODULE_0__["default"])()));
  }
};

window.MDWTheme = MDWTheme;

/* harmony default export */ __webpack_exports__["default"] = (MDWTheme);


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
      /* --- text --- */
      --mdw-theme-text--primary--light: #ffffff;
      --mdw-theme-text--secondary--light: rgba(255,255,255, .7);
      --mdw-theme-text--error--light: rgba(255,255,255, .7);
      --mdw-theme-text--hint--light: rgba(255,255,255, .5);
      --mdw-theme-text--disabled--light: rgba(255,255,255, .5);
      --mdw-theme-text--icon--light: rgba(255,255,255, .5);

      --mdw-theme-text--primary--dark: rgba(0,0,0, .87);
      --mdw-theme-text--secondary--dark: rgba(0,0,0, .54);
      --mdw-theme-text--error--dark: rgba(0,0,0, .54);
      --mdw-theme-text--hint--dark: rgba(0,0,0, .38);
      --mdw-theme-text--disabled--dark: rgba(0,0,0, .38);
      --mdw-theme-text--icon--dark: rgba(0,0,0, .38);

      --mdw-theme-text--on-primary--light: #FFFFFF;
      --mdw-theme-text--on-secondary--light: #000000;
      --mdw-theme-text--on-error--light: #FFFFFF;
      --mdw-theme-text--on-background--light: #000000;
      --mdw-theme-text--on-surface--light: #000000;

      --mdw-theme-text--on-primary--dark: #000000;
      --mdw-theme-text--on-secondary--dark: #FFFFFF;
      --mdw-theme-text--on-error--dark: #000000;
      --mdw-theme-text--on-background--dark: #FFFFFF;
      --mdw-theme-text--on-surface--dark: #FFFFFF;

      --mdw-theme-text--heading--light: #212121;
      --mdw-theme-text--heading--dark: #ececec;

      --mdw-theme-text--body--light: #616161;
      --mdw-theme-text--body--dark: #b5b5b5;


      /* --- surfaces and backgrounds --- */
      --mdw-theme-background--light: #fafafa;
      --mdw-theme-background--dark: #121212;

      --mdw-theme-foreground--light: #121212;
      --mdw-theme-foreground--dark: #fafafa;

      --mdw-theme-surface--light: #fafafa;
      --mdw-theme-surface--dark: #121212;

      --mdw-theme-surface_elevation_1--light: #f6f6f6;
      --mdw-theme-surface_elevation_1--dark: #303030;

      --mdw-theme-divider--dark: rgba(0, 0, 0, 0.12);
      --mdw-theme-divider--light: rgba(255, 255, 255, 0.12);

      --mdw-theme-divider--on-background--dark: var(--mdw-theme-divider--light);
      --mdw-theme-divider--on-background--light: var(--mdw-theme-divider--dark);


      /* --- one offs for components --- */
      --mdw-theme-switchtrack--light: #000000;
      --mdw-theme-switchtrack--dark: rgba(255,255,255, .32);

      --mdw-theme-checkboxborder--light: rgba(0,0,0, .54);
      --mdw-theme-checkboxborder--dark: rgba(255,255,255, .5);

      --mdw-theme-checkboxborderdisabled--light: rgba(0,0,0, .26);
      --mdw-theme-checkboxborderdisabled--dark: rgba(255,255,255, .24);

      --mdw-theme-snackbarcontainer--light: var(--mdw-theme-background--dark);
      --mdw-theme-snackbarcontainer--dark: var(--mdw-theme-background--light);

      --mdw-theme-text--on-snackbar--light: var(--mdw-theme-text--secondary);
      --mdw-theme-text--on-snackbar--dark: #000000;

      --mdw-theme-list_item_focus--light: rgba(0,0,0,.06);
      --mdw-theme-list_item_focus--dark: rgba(100,100,100,.16);

      --mdw-theme-outline_border--light: rgba(0,0,0,.24);
      --mdw-theme-outline_border--dark: rgba(255,255,255,.24);

      --mdw-theme-textfield_background--light: #f5f5f5;
      --mdw-theme-textfield_background--dark: #303030;


      /* --- palettes --- */
      /* By default, shades 500, 300 800 and A100 are used for primary and warn intentions, while A200, A100, A400 and A700 are used for accent */

      /* red */
      --mdw-theme-palette--red-50: #ffebee;
      --mdw-theme-palette--red-100: #ffcdd2;
      --mdw-theme-palette--red-200: #ef9a9a;
      --mdw-theme-palette--red-300: #e57373;
      --mdw-theme-palette--red-400: #ef5350;
      --mdw-theme-palette--red-500: #f44336;
      --mdw-theme-palette--red-600: #e53935;
      --mdw-theme-palette--red-700: #d32f2f;
      --mdw-theme-palette--red-800: #c62828;
      --mdw-theme-palette--red-900: #b71c1c;
      --mdw-theme-palette--red-A100: #ff8a80;
      --mdw-theme-palette--red-A200: #ff5252;
      --mdw-theme-palette--red-A400: #ff1744;
      --mdw-theme-palette--red-A700: #d50000;
      --mdw-theme-palette--red--light: var(--mdw-theme-palette--red-500);
      --mdw-theme-palette--red--dark: var(--mdw-theme-palette--red-200);

      /* pink */
      --mdw-theme-palette--pink-50: #FCE4EC;
      --mdw-theme-palette--pink-100: #F8BBD0;
      --mdw-theme-palette--pink-200: #F48FB1;
      --mdw-theme-palette--pink-300: #F06292;
      --mdw-theme-palette--pink-400: #EC407A;
      --mdw-theme-palette--pink-500: #E91E63;
      --mdw-theme-palette--pink-600: #D81B60;
      --mdw-theme-palette--pink-700: #C2185B;
      --mdw-theme-palette--pink-800: #AD1457;
      --mdw-theme-palette--pink-900: #880E4F;
      --mdw-theme-palette--pink-A100: #FF80AB;
      --mdw-theme-palette--pink-A200: #FF4081;
      --mdw-theme-palette--pink-A400: #F50057;
      --mdw-theme-palette--pink-A700: #C51162;
      --mdw-theme-palette--pink--light: var(--mdw-theme-palette--pink-500);
      --mdw-theme-palette--pink--dark: var(--mdw-theme-palette--pink-200);

      /* purple */
      --mdw-theme-palette--purple-50: #f3e5f5;
      --mdw-theme-palette--purple-100: #e1bee7;
      --mdw-theme-palette--purple-200: #ce93d8;
      --mdw-theme-palette--purple-300: #ba68c8;
      --mdw-theme-palette--purple-400: #ab47bc;
      --mdw-theme-palette--purple-500: #9c27b0;
      --mdw-theme-palette--purple-600: #8e24aa;
      --mdw-theme-palette--purple-700: #7b1fa2;
      --mdw-theme-palette--purple-800: #6a1b9a;
      --mdw-theme-palette--purple-900: #4a148c;
      --mdw-theme-palette--purple-A100: #ea80fc;
      --mdw-theme-palette--purple-A200: #e040fb;
      --mdw-theme-palette--purple-A400: #d500f9;
      --mdw-theme-palette--purple-A700: #aa00ff;
      --mdw-theme-palette--purple--light: var(--mdw-theme-palette--purple-500);
      --mdw-theme-palette--purple--dark: var(--mdw-theme-palette--purple-200);

      /* deeppurple */
      --mdw-theme-palette--deeppurple-50: #ede7f6;
      --mdw-theme-palette--deeppurple-100: #d1c4e9;
      --mdw-theme-palette--deeppurple-200: #b39ddb;
      --mdw-theme-palette--deeppurple-300: #9575cd;
      --mdw-theme-palette--deeppurple-400: #7e57c2;
      --mdw-theme-palette--deeppurple-500: #673ab7;
      --mdw-theme-palette--deeppurple-600: #5e35b1;
      --mdw-theme-palette--deeppurple-700: #512da8;
      --mdw-theme-palette--deeppurple-800: #4527a0;
      --mdw-theme-palette--deeppurple-900: #311b92;
      --mdw-theme-palette--deeppurple-A100: #b388ff;
      --mdw-theme-palette--deeppurple-A200: #7c4dff;
      --mdw-theme-palette--deeppurple-A400: #651fff;
      --mdw-theme-palette--deeppurple-A700: #6200ea;
      --mdw-theme-palette--deeppurple--light: #6002ee;
      --mdw-theme-palette--deeppurple--dark: var(--mdw-theme-palette--deeppurple-200);

      /* Indigo */
      --mdw-theme-palette--indigo-50: #E8EAF6;
      --mdw-theme-palette--indigo-100: #C5CAE9;
      --mdw-theme-palette--indigo-200: #9FA8DA;
      --mdw-theme-palette--indigo-300: #7986CB;
      --mdw-theme-palette--indigo-400: #5C6BC0;
      --mdw-theme-palette--indigo-500: #3F51B5;
      --mdw-theme-palette--indigo-600: #3949AB;
      --mdw-theme-palette--indigo-700: #303F9F;
      --mdw-theme-palette--indigo-800: #283593;
      --mdw-theme-palette--indigo-900: #1A237E;
      --mdw-theme-palette--indigo-A100: #8C9EFF;
      --mdw-theme-palette--indigo-A200: #536DFE;
      --mdw-theme-palette--indigo-A400: #3D5AFE;
      --mdw-theme-palette--indigo-A700: #304FFE;
      --mdw-theme-palette--indigo--light: var(--mdw-theme-palette--indigo-500);
      --mdw-theme-palette--indigo--dark: var(--mdw-theme-palette--indigo-200);

      /* blue */
      --mdw-theme-palette--blue-50: #e3f2fd;
      --mdw-theme-palette--blue-100: #bbdefb;
      --mdw-theme-palette--blue-200: #90caf9;
      --mdw-theme-palette--blue-300: #64b5f6;
      --mdw-theme-palette--blue-400: #42a5f5;
      --mdw-theme-palette--blue-500: #2196f3;
      --mdw-theme-palette--blue-600: #1e88e5;
      --mdw-theme-palette--blue-700: #1976d2;
      --mdw-theme-palette--blue-800: #1565c0;
      --mdw-theme-palette--blue-900: #0d47a1;
      --mdw-theme-palette--blue-A100: #82b1ff;
      --mdw-theme-palette--blue-A200: #448aff;
      --mdw-theme-palette--blue-A400: #2979ff;
      --mdw-theme-palette--blue-A700: #2962ff;
      --mdw-theme-palette--blue--light: var(--mdw-theme-palette--blue-500);
      --mdw-theme-palette--blue--dark: var(--mdw-theme-palette--blue-200);

      /* Light blue */
      --mdw-theme-palette--lightblue-50: #E1F5FE;
      --mdw-theme-palette--lightblue-100: #B3E5FC;
      --mdw-theme-palette--lightblue-200: #81D4FA;
      --mdw-theme-palette--lightblue-300: #4FC3F7;
      --mdw-theme-palette--lightblue-400: #29B6F6;
      --mdw-theme-palette--lightblue-500: #03A9F4;
      --mdw-theme-palette--lightblue-600: #039BE5;
      --mdw-theme-palette--lightblue-700: #0288D1;
      --mdw-theme-palette--lightblue-800: #0277BD;
      --mdw-theme-palette--lightblue-900: #01579B;
      --mdw-theme-palette--lightblue-A100: #80D8FF;
      --mdw-theme-palette--lightblue-A200: #40C4FF;
      --mdw-theme-palette--lightblue-A400: #00B0FF;
      --mdw-theme-palette--lightblue-A700: #0091EA;
      --mdw-theme-palette--lightblue--light: var(--mdw-theme-palette--lightblue-500);
      --mdw-theme-palette--lightblue--dark: var(--mdw-theme-palette--lightblue-200);

      /* Cyan */
      --mdw-theme-palette--cyan-50: #E0F7FA;
      --mdw-theme-palette--cyan-100: #B2EBF2;
      --mdw-theme-palette--cyan-200: #80DEEA;
      --mdw-theme-palette--cyan-300: #4DD0E1;
      --mdw-theme-palette--cyan-400: #26C6DA;
      --mdw-theme-palette--cyan-500: #00BCD4;
      --mdw-theme-palette--cyan-600: #00ACC1;
      --mdw-theme-palette--cyan-700: #0097A7;
      --mdw-theme-palette--cyan-800: #00838F;
      --mdw-theme-palette--cyan-900: #006064;
      --mdw-theme-palette--cyan-A100: #84FFFF;
      --mdw-theme-palette--cyan-A200: #18FFFF;
      --mdw-theme-palette--cyan-A400: #00E5FF;
      --mdw-theme-palette--cyan-A700: #00B8D4;
      --mdw-theme-palette--cyan--light: var(--mdw-theme-palette--cyan-500);
      --mdw-theme-palette--cyan--dark: var(--mdw-theme-palette--cyan-200);

      /* teal */
      --mdw-theme-palette--teal-50: #e0f2f1;
      --mdw-theme-palette--teal-100: #b2dfdb;
      --mdw-theme-palette--teal-200: #80cbc4;
      --mdw-theme-palette--teal-300: #4db6ac;
      --mdw-theme-palette--teal-400: #26a69a;
      --mdw-theme-palette--teal-500: #009688;
      --mdw-theme-palette--teal-600: #00897b;
      --mdw-theme-palette--teal-700: #00796b;
      --mdw-theme-palette--teal-800: #00695c;
      --mdw-theme-palette--teal-900: #004d40;
      --mdw-theme-palette--teal-A100: #a7ffeb;
      --mdw-theme-palette--teal-A200: #64ffda;
      --mdw-theme-palette--teal-A400: #1de9b6;
      --mdw-theme-palette--teal-A700: #00bfa5;
      --mdw-theme-palette--teal--light: var(--mdw-theme-palette--teal-500);
      --mdw-theme-palette--teal--dark: var(--mdw-theme-palette--teal-200);

      /* green */
      --mdw-theme-palette--green-50: #E8F5E9;
      --mdw-theme-palette--green-100: #C8E6C9;
      --mdw-theme-palette--green-200: #A5D6A7;
      --mdw-theme-palette--green-300: #81C784;
      --mdw-theme-palette--green-400: #66BB6A;
      --mdw-theme-palette--green-500: #4CAF50;
      --mdw-theme-palette--green-600: #43A047;
      --mdw-theme-palette--green-700: #388E3C;
      --mdw-theme-palette--green-800: #2E7D32;
      --mdw-theme-palette--green-900: #1B5E20;
      --mdw-theme-palette--green-A100: #B9F6CA;
      --mdw-theme-palette--green-A200: #69F0AE;
      --mdw-theme-palette--green-A400: #00E676;
      --mdw-theme-palette--green-A700: #00C853;
      --mdw-theme-palette--green--light: var(--mdw-theme-palette--green-500);
      --mdw-theme-palette--green--dark: var(--mdw-theme-palette--green-200);

      /* lightgreen */
      --mdw-theme-palette--lightgreen-50: #F1F8E9;
      --mdw-theme-palette--lightgreen-100: #DCEDC8;
      --mdw-theme-palette--lightgreen-200: #C5E1A5;
      --mdw-theme-palette--lightgreen-300: #AED581;
      --mdw-theme-palette--lightgreen-400: #9CCC65;
      --mdw-theme-palette--lightgreen-500: #8BC34A;
      --mdw-theme-palette--lightgreen-600: #7CB342;
      --mdw-theme-palette--lightgreen-700: #689F38;
      --mdw-theme-palette--lightgreen-800: #558B2F;
      --mdw-theme-palette--lightgreen-900: #33691E;
      --mdw-theme-palette--lightgreen-A100: #CCFF90;
      --mdw-theme-palette--lightgreen-A200: #B2FF59;
      --mdw-theme-palette--lightgreen-A400: #76FF03;
      --mdw-theme-palette--lightgreen-A700: #64DD17;
      --mdw-theme-palette--lightgreen--light: var(--mdw-theme-palette--lightgreen-500);
      --mdw-theme-palette--lightgreen--dark: var(--mdw-theme-palette--lightgreen-200);

      /* lime */
      --mdw-theme-palette--lime-50: #F9FBE7;
      --mdw-theme-palette--lime-100: #F0F4C3;
      --mdw-theme-palette--lime-200: #E6EE9C;
      --mdw-theme-palette--lime-300: #DCE775;
      --mdw-theme-palette--lime-400: #D4E157;
      --mdw-theme-palette--lime-500: #CDDC39;
      --mdw-theme-palette--lime-600: #C0CA33;
      --mdw-theme-palette--lime-700: #AFB42B;
      --mdw-theme-palette--lime-800: #9E9D24;
      --mdw-theme-palette--lime-900: #827717;
      --mdw-theme-palette--lime-A100: #F4FF81;
      --mdw-theme-palette--lime-A200: #EEFF41;
      --mdw-theme-palette--lime-A400: #C6FF00;
      --mdw-theme-palette--lime-A700: #AEEA00;
      --mdw-theme-palette--lime--light: var(--mdw-theme-palette--lime-500);
      --mdw-theme-palette--lime--dark: var(--mdw-theme-palette--lime-200);

      /* yellow */
      --mdw-theme-palette--yellow-50: #FFFDE7;
      --mdw-theme-palette--yellow-100: #FFF9C4;
      --mdw-theme-palette--yellow-200: #FFF59D;
      --mdw-theme-palette--yellow-300: #FFF176;
      --mdw-theme-palette--yellow-400: #FFEE58;
      --mdw-theme-palette--yellow-500: #FFEB3B;
      --mdw-theme-palette--yellow-600: #FDD835;
      --mdw-theme-palette--yellow-700: #FBC02D;
      --mdw-theme-palette--yellow-800: #F9A825;
      --mdw-theme-palette--yellow-900: #F57F17;
      --mdw-theme-palette--yellow-A100: #FFFF8D;
      --mdw-theme-palette--yellow-A200: #FFFF00;
      --mdw-theme-palette--yellow-A400: #FFEA00;
      --mdw-theme-palette--yellow-A700: #FFD600;
      --mdw-theme-palette--yellow--light: var(--mdw-theme-palette--yellow-500);
      --mdw-theme-palette--yellow--dark: var(--mdw-theme-palette--yellow-200);

      /* amber */
      --mdw-theme-palette--amber-50: #FFF8E1;
      --mdw-theme-palette--amber-100: #FFECB3;
      --mdw-theme-palette--amber-200: #FFE082;
      --mdw-theme-palette--amber-300: #FFD54F;
      --mdw-theme-palette--amber-400: #FFCA28;
      --mdw-theme-palette--amber-500: #FFC107;
      --mdw-theme-palette--amber-600: #FFB300;
      --mdw-theme-palette--amber-700: #FFA000;
      --mdw-theme-palette--amber-800: #FF8F00;
      --mdw-theme-palette--amber-900: #FF6F00;
      --mdw-theme-palette--amber-A100: #FFE57F;
      --mdw-theme-palette--amber-A200: #FFD740;
      --mdw-theme-palette--amber-A400: #FFC400;
      --mdw-theme-palette--amber-A700: #FFAB00;
      --mdw-theme-palette--amber--light: var(--mdw-theme-palette--amber-500);
      --mdw-theme-palette--amber--dark: var(--mdw-theme-palette--amber-200);

      /* orange */
      --mdw-theme-palette--orange-50: #FFF3E0;
      --mdw-theme-palette--orange-100: #FFE0B2;
      --mdw-theme-palette--orange-200: #FFCC80;
      --mdw-theme-palette--orange-300: #FFB74D;
      --mdw-theme-palette--orange-400: #FFA726;
      --mdw-theme-palette--orange-500: #FF9800;
      --mdw-theme-palette--orange-600: #FB8C00;
      --mdw-theme-palette--orange-700: #F57C00;
      --mdw-theme-palette--orange-800: #EF6C00;
      --mdw-theme-palette--orange-900: #E65100;
      --mdw-theme-palette--orange-A100: #FFD180;
      --mdw-theme-palette--orange-A200: #FFAB40;
      --mdw-theme-palette--orange-A400: #FF9100;
      --mdw-theme-palette--orange-A700: #FF6D00;
      --mdw-theme-palette--orange--light: var(--mdw-theme-palette--orange-500);
      --mdw-theme-palette--orange--dark: var(--mdw-theme-palette--orange-200);

      /* deeporange */
      --mdw-theme-palette--deeporange-50: #FBE9E7;
      --mdw-theme-palette--deeporange-100: #FFCCBC;
      --mdw-theme-palette--deeporange-200: #FFAB91;
      --mdw-theme-palette--deeporange-300: #FF8A65;
      --mdw-theme-palette--deeporange-400: #FF7043;
      --mdw-theme-palette--deeporange-500: #FF5722;
      --mdw-theme-palette--deeporange-600: #F4511E;
      --mdw-theme-palette--deeporange-700: #E64A19;
      --mdw-theme-palette--deeporange-800: #D84315;
      --mdw-theme-palette--deeporange-900: #BF360C;
      --mdw-theme-palette--deeporange-A100: #FF9E80;
      --mdw-theme-palette--deeporange-A200: #FF6E40;
      --mdw-theme-palette--deeporange-A400: #FF3D00;
      --mdw-theme-palette--deeporange-A700: #DD2C00;
      --mdw-theme-palette--deeporange--light: var(--mdw-theme-palette--deeporange-500);
      --mdw-theme-palette--deeporange--dark: var(--mdw-theme-palette--deeporange-200);
    }
  `;
});


/***/ }),

/***/ "./src/core/gestures.js":
/*!******************************!*\
  !*** ./src/core/gestures.js ***!
  \******************************/
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
/* harmony import */ var _core_gestures_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/gestures.js */ "./src/core/gestures.js");
/* harmony import */ var _components_autocomplete_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/autocomplete/index.js */ "./src/components/autocomplete/index.js");
/* harmony import */ var _components_backdrop_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/backdrop/index.js */ "./src/components/backdrop/index.js");
/* harmony import */ var _components_banner_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/banner/index.js */ "./src/components/banner/index.js");
/* harmony import */ var _components_bottom_navigation_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/bottom-navigation/index.js */ "./src/components/bottom-navigation/index.js");
/* harmony import */ var _components_button_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/button/index.js */ "./src/components/button/index.js");
/* harmony import */ var _components_card_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/card/index.js */ "./src/components/card/index.js");
/* harmony import */ var _components_checkbox_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/checkbox/index.js */ "./src/components/checkbox/index.js");
/* harmony import */ var _components_circular_progress_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/circular-progress/index.js */ "./src/components/circular-progress/index.js");
/* harmony import */ var _components_dialog_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/dialog/index.js */ "./src/components/dialog/index.js");
/* harmony import */ var _components_drawer_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/drawer/index.js */ "./src/components/drawer/index.js");
/* harmony import */ var _components_fab_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/fab/index.js */ "./src/components/fab/index.js");
/* harmony import */ var _components_icon_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/icon/index.js */ "./src/components/icon/index.js");
/* harmony import */ var _components_linear_progress_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/linear-progress/index.js */ "./src/components/linear-progress/index.js");
/* harmony import */ var _components_list_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/list/index.js */ "./src/components/list/index.js");
/* harmony import */ var _components_list_item_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/list-item/index.js */ "./src/components/list-item/index.js");
/* harmony import */ var _components_menu_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/menu/index.js */ "./src/components/menu/index.js");
/* harmony import */ var _components_panel_index_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/panel/index.js */ "./src/components/panel/index.js");
/* harmony import */ var _components_radio_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/radio/index.js */ "./src/components/radio/index.js");
/* harmony import */ var _components_radio_group_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/radio-group/index.js */ "./src/components/radio-group/index.js");
/* harmony import */ var _components_select_index_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/select/index.js */ "./src/components/select/index.js");
/* harmony import */ var _components_sheet_index_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/sheet/index.js */ "./src/components/sheet/index.js");
/* harmony import */ var _components_slider_index_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/slider/index.js */ "./src/components/slider/index.js");
/* harmony import */ var _components_snackbar_index_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/snackbar/index.js */ "./src/components/snackbar/index.js");
/* harmony import */ var _components_switch_index_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/switch/index.js */ "./src/components/switch/index.js");
/* harmony import */ var _components_tabs_tab_body_index_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/tabs/tab-body/index.js */ "./src/components/tabs/tab-body/index.js");
/* harmony import */ var _components_tabs_tab_button_index_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/tabs/tab-button/index.js */ "./src/components/tabs/tab-button/index.js");
/* harmony import */ var _components_tabs_tabs_bar_index_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/tabs/tabs-bar/index.js */ "./src/components/tabs/tabs-bar/index.js");
/* harmony import */ var _components_tabs_tabs_content_index_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/tabs/tabs-content/index.js */ "./src/components/tabs/tabs-content/index.js");
/* harmony import */ var _components_text_field_index_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/text-field/index.js */ "./src/components/text-field/index.js");
/* harmony import */ var _components_tooltip_index_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/tooltip/index.js */ "./src/components/tooltip/index.js");
/* harmony import */ var _components_top_app_bar_index_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/top-app-bar/index.js */ "./src/components/top-app-bar/index.js");



// --- Components ---











// import './components/expander/index.js';























/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJmb3JtdWxhL3BheC1jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2ViZm9ybXVsYS9wYXgtY29yZS9zcmMvY2xpZW50L0hUTUxFbGVtZW50RXh0ZW5kZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJmb3JtdWxhL3BheC1jb3JlL3NyYy9jbGllbnQvUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdlYmZvcm11bGEvcGF4LWNvcmUvc3JjL2NsaWVudC9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2JhY2tkcm9wL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Jhbm5lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9iYW5uZXIvc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ib3R0b20tbmF2aWdhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaXJjdWxhci1wcm9ncmVzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ZhYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xpbmVhci1wcm9ncmVzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9saXN0LWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZW51L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhbmVsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JhZGlvLWdyb3VwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JhZGlvL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaGVldC9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2hlZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2xpZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NuYWNrYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NuYWNrYmFyL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3dpdGNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFiLWJvZHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWItYnV0dG9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFicy1iYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzLWNvbnRlbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGV4dC1maWVsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b29sdGlwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvcC1hcHAtYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1JpcHBsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9UaGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9iYXNlLXRoZW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2dlc3R1cmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL21vYmlsZS1pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxp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QVUsUUFBUTtBQUNsQjtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtELGtCQUFrQjtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixTQUFTO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtIQUFrSCxtQ0FBbUMsNEJBQTRCLHdCQUF3QixVQUFVO0FBQ25OOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMvYUQ7QUFBQTtBQUEyRDs7QUFFM0QsZ0RBQWdELHdFQUFtQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNQRDtBQUFBO0FBQUE7QUFBMkQ7QUFDZDs7QUFFN0Msb0RBQW9ELHdFQUFtQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLHVEQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzdVRDtBQUFBO0FBQTJEOztBQUUzRCw2REFBNkQsd0VBQW1CO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM1SUQ7QUFBQTtBQUEyRDs7QUFFM0QsZ0RBQWdELHdFQUFtQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGlDQUFpQyxJQUFJO0FBQ3JDO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDMUREO0FBQUE7QUFBMkQ7O0FBRTNELDJEQUEyRCx3RUFBbUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLE1BQU07QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDckhEO0FBQUE7QUFBQTtBQUEyRDtBQUNkOztBQUU3QyxxREFBcUQsd0VBQW1CO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVEQUFTO0FBQy9CO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNoR0Q7QUFBQTtBQUEyRDs7QUFFM0QsZ0RBQWdELHdFQUFtQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwRUQ7QUFBQTtBQUFBO0FBQTJEO0FBQ2hCOztBQUUzQyxnREFBZ0Qsd0VBQW1CO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLHNEQUFRO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLHNEQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxzREFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BGRDtBQUFBO0FBQUE7QUFBMkQ7QUFDaEI7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHdFQUFtQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxzREFBUTtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0IsR0FBRyxtQkFBbUI7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyx5QkFBeUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsT0FBTztBQUMvQjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkMseUJBQXlCLFlBQVk7QUFDckM7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLDBCQUEwQixJQUFJO0FBQzlCLDJCQUEyQixLQUFLOztBQUVoQztBQUNBLGVBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsV0FBVztBQUN6Qyw0QkFBNEIsSUFBSTtBQUNoQyw2QkFBNkIsS0FBSztBQUNsQyxPQUFPO0FBQ1A7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLGNBQWM7QUFDdEMseUJBQXlCLGVBQWU7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzlaRDtBQUFBO0FBQTJEOztBQUUzRCx1REFBdUQsd0VBQW1CO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3hCRDtBQUFBO0FBQUE7QUFBQTtBQUEyRDtBQUNkO0FBQ0Y7O0FBRTNDLGlEQUFpRCx3RUFBbUI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1REFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDN0REO0FBQUE7QUFBQTtBQUEyRDtBQUNoQjs7QUFFM0M7O0FBRUEsa0RBQWtELHdFQUFtQjtBQUNyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLGlCQUFpQjtBQUN4RDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHNEQUFRO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNkVBQTZFLHNEQUFRLE9BQU87QUFDNUY7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7O0FBRUE7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGdEQUFnRCxXQUFXLCtCQUErQixzQkFBc0I7O0FBRWhIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHNEQUFRO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQSxZQUFZLHVCQUF1Qix3QkFBd0I7QUFDM0Qsb0NBQW9DLE1BQU0sR0FBRyw0QkFBNEIsR0FBRyxLQUFLO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0EsY0FBYyx1QkFBdUIsd0JBQXdCO0FBQzdELHNDQUFzQyxNQUFNLEdBQUcsNEJBQTRCLEdBQUcsS0FBSztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxzREFBUTtBQUNsQjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksc0RBQVE7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0RBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHNEQUFRO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLGlEQUFpRCxvQkFBb0I7QUFDckU7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQixRQUFRO0FBQ1IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDJDQUEyQztBQUNsRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcm1CRDtBQUFBO0FBQTJEOztBQUUzRCx3REFBd0Qsd0VBQW1CO0FBQzNFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOzs7QUFHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7OztBQUtBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BYRDtBQUFBO0FBQUE7QUFBQTtBQUEyRDtBQUNwQjtBQUNJOztBQUUzQyxvREFBb0Qsd0VBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7O0FBRUE7QUFDQSwwREFBMEQsYUFBYTtBQUN2RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLGFBQWE7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCLEdBQUcsbUJBQW1CO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLG1EQUFXO0FBQ2Y7O0FBRUE7QUFDQSxJQUFJLG1EQUFXO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM3RUQ7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixHQUFHO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTs7QUFFQSxRQUFRLGlDQUFpQztBQUN6QztBQUNBO0FBQ0Esc0NBQXNDLDJCQUEyQjs7QUFFakU7QUFDQSw0Q0FBNEMsR0FBRztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsZ0NBQWdDO0FBQ3ZEOztBQUVBLFlBQVksMkJBQTJCO0FBQ3ZDO0FBQ0EsMEJBQTBCLEdBQUc7QUFDN0I7QUFDQTtBQUNBLG9DQUFvQyxRQUFRO0FBQzVDO0FBQ0EsZ0JBQWdCLHlEQUF5RCxZQUFZO0FBQ3JGLHFDQUFxQyxHQUFHO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSwwRUFBVyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDbkYzQjtBQUFBO0FBQUE7QUFBMkQ7QUFDZDs7QUFFN0Msa0RBQWtELHdFQUFtQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsdURBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDeFFEO0FBQUE7QUFBMkQ7O0FBRTNELG9EQUFvRCx3RUFBbUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbEREO0FBQUE7QUFBQTtBQUEyRDtBQUNYOztBQUVoRCxzREFBc0Qsd0VBQW1CO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsdURBQVM7QUFDL0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxpQkFBaUI7QUFDcEU7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNqSkQ7QUFBQTtBQUEyRDs7QUFFM0Qsb0RBQW9ELHdFQUFtQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMvRkQ7QUFBQTtBQUEyRDs7QUFFM0Qsd0RBQXdELHdFQUFtQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdURBQXVELDZCQUE2QjtBQUNwRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDMUNEO0FBQUE7QUFBMkQ7O0FBRTNELHFEQUFxRCx3RUFBbUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDaEpEO0FBQUE7QUFBMkQ7O0FBRTNELG1EQUFtRCx3RUFBbUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2REO0FBQUE7QUFBQTtBQUEyRDtBQUNoQjs7QUFFM0MsdURBQXVELHdFQUFtQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0NBQWtDLHNEQUFRO0FBQzFDLGtDQUFrQyxzREFBUTtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN2WEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtDOztBQUVsQzs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLGlEQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsUUFBUSxpREFBUTtBQUNoQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxpREFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsUUFBUSxpREFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVEsaURBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsYUFBYTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hNQTtBQUFBO0FBQUE7QUFBTztBQUNBOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUI7QUFDRzs7QUFFNUI7O0FBRTRDO0FBQ0o7QUFDRjtBQUNXO0FBQ1g7QUFDRjtBQUNJO0FBQ1M7QUFDWDtBQUNBO0FBQ3RDO0FBQ21DO0FBQ0M7QUFDVztBQUNYO0FBQ0s7QUFDTDtBQUNDO0FBQ0E7QUFDTTtBQUNMO0FBQ0Q7QUFDQztBQUNFO0FBQ0Y7QUFDTztBQUNFO0FBQ0Y7QUFDSTtBQUNQO0FBQ0g7QUFDSSIsImZpbGUiOiJlbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2VudHJ5LmpzXCIpO1xuIiwiaW1wb3J0IFBhZ2UgZnJvbSAnLi9zcmMvY2xpZW50L1BhZ2UuanMnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3NyYy9jbGllbnQvcm91dGVyLmpzJztcbmltcG9ydCBIVE1MRWxlbWVudEV4dGVuZGVkIGZyb20gJy4vc3JjL2NsaWVudC9IVE1MRWxlbWVudEV4dGVuZGVkLmpzJztcblxuZXhwb3J0IHtcbiAgUGFnZSxcbiAgcm91dGVyLFxuICBIVE1MRWxlbWVudEV4dGVuZGVkXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MRWxlbWVudEV4dGVuZGVkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0IF90ZW1wbGF0ZUlkKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCl9LS10ZW1wbGF0ZWA7XG4gIH1cblxuICAvKiBDbG9uZSBmcm9tIHByZSBidWlsdCBodG1sVGVtcGxhdGVcbiAgICogICAtIFJlcmVuZGVyOiByZXBsYWNlcyBodG1sIGJ1dCBub3Qgc3R5bGVzLiBUaGlzIGlzIHVzZWZ1bGwgZm9yIGR5bmFtaWMgdGVtcGxhdGVzXG4gICAqL1xuICBjbG9uZVRlbXBsYXRlKHJlcmVuZGVyKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fdGVtcGxhdGVJZCk7XG4gICAgXG4gICAgLy8gY3JlYXRlIHRlbXBsYXRlIG9uIHRoZSBmbHlcbiAgICBpZiAoIXRlbXBsYXRlKSB0ZW1wbGF0ZSA9IHRoaXMuX2NyZWF0ZVRlbXBsYXRlKCk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLnNoYWRvd1Jvb3QgPyB0aGlzLnNoYWRvd1Jvb3QgOiB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBjbG9uZSA9IHRlbXBsYXRlQ29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICBpZiAocmVyZW5kZXIpIHtcbiAgICAgIC8vIHRoaXMuX19pc0J1aWxkUHJvY2VzcyBpcyBwcmVzZW50IGR1cmluZyB0aGUgYnVpbGQgcHJvY2VzcyBhbmQgd2lsbCBiZSB1bmRlZmluZWQgaW4gdGhlIGJyb3dzZXJcbiAgICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMuYmVmb3JlUmVuZGVyKSB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgY2xvbmUucXVlcnlTZWxlY3RvcigncmVuZGVyLWJsb2NrJykuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZSgpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMuYWZ0ZXJSZW5kZXIpIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcblxuICB9XG5cbiAgX2NyZWF0ZVRlbXBsYXRlKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdGVtcGxhdGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLl90ZW1wbGF0ZUlkKTtcbiAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgJHt0aGlzLnN0eWxlcygpfVxuICAgICAgICA8L3N0eWxlPlxuICAgICAgICA8cmVuZGVyLWJsb2NrPlxuICAgICAgICAgICR7dGhpcy50ZW1wbGF0ZSgpfVxuICAgICAgICA8L3JlbmRlci1ibG9jaz5cbiAgICBgO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgIHJldHVybiB0ZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBEZXRlY3Qgc3VwZXI/XG4gICAgaWYgKCF0aGlzLl9faXNCdWlsZFByb2Nlc3MgJiYgdGhpcy5hZGRFdmVudHMpIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBEZXRlY3Qgc3VwZXI/XG4gICAgaWYgKCF0aGlzLl9faXNCdWlsZFByb2Nlc3MgJiYgdGhpcy5yZW1vdmVFdmVudHMpIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gdGhpcy5fX2lzQnVpbGRQcm9jZXNzIGlzIHByZXNlbnQgZHVyaW5nIHRoZSBidWlsZCBwcm9jZXNzIGFuZCB3aWxsIGJlIHVuZGVmaW5lZCBpbiB0aGUgYnJvd3NlclxuICAgIGlmICh0aGlzLl9faXNCdWlsZFByb2Nlc3MpIHJldHVybjtcblxuICAgIGNvbnN0IHJlbmRlckJsb2NrID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3JlbmRlci1ibG9jaycpO1xuICAgIGlmICghcmVuZGVyQmxvY2spIHRocm93IEVycm9yKCdDb3VsZCBub3QgZmluZCA8cmVuZGVyLWJsb2NrPicpO1xuXG4gICAgaWYgKHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICAgIGlmICh0aGlzLmJlZm9yZVJlbmRlcikgdGhpcy5iZWZvcmVSZW5kZXIoKTtcbiAgICByZW5kZXJCbG9jay5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKCk7XG4gICAgaWYgKHRoaXMuYWZ0ZXJSZW5kZXIpIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcbiAgICBpZiAodGhpcy5hZGRFdmVudHMpIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICAvLyBDYWxsZWQgYmVmb3JlIHJlbmRlcigpLiBwbGFjZWhvbGRlciwgY2FuIGJlIG92ZXJpZGRlblxuICAvLyBUaGlzIGRvZXMgbm90IGluY2x1ZGUgdGhlIGluaXRpYWwgY2xvbmVOb2RlXG4gIGJlZm9yZVJlbmRlcigpIHsgfVxuXG4gIC8vIENhbGxlZCBhZnRlciByZW5kZXIoKS4gcGxhY2Vob2xkZXIsIGNhbiBiZSBvdmVyaWRkZW5cbiAgLy8gVGhpcyBkb2VzIG5vdCBpbmNsdWRlIHRoZSBpbml0aWFsIGNsb25lTm9kZVxuICBhZnRlclJlbmRlcigpIHsgfVxuXG4gIC8vIHRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBjb25uZWN0ZWRcbiAgLy8gVGhpcyBpcyBhbHNvIGNhbGxlZCBhZnRlciByZW5kZXIsIGV2ZW50cyBhcmUgZmlyc3QgcmVtb2VkIGJlZm9yZSByZW5kZXIgc28geW91IGRvbnQgaGF2ZSBtdWx0aXBsZSBldmVudHNcbiAgYWRkRXZlbnRzKCkgeyB9XG5cbiAgLy8gdGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRpc2Nvbm5lY3RlZFxuICAvLyBUaGlzIGlzIGFsc28gY2FsbGVkIHByaW9yIHRvIHJlbmRlciwgYWZ0ZXIgcmVuZGVyIGFkZEV2ZW50cyBpcyBjYWxsZWQuIFRoaXMgd2lsbCBtYWtlIHN1cmUgeW91IG9sZCBlbGVtZW50cyBkb250IHJldGFpbiBldmVudHNcbiAgcmVtb3ZlRXZlbnRzKCkgeyB9XG5cbiAgLy8gYWRkIGNzcyB0aGF0IHdpbGwgYmUgaW5qZWN0ZWQgdG8gdGhlIHRlbXBsYXRlXG4gIHN0eWxlcygpIHsgfVxuXG4gIC8vIGFkZCBjc3MgdG8gdGhlIGRvY3VtZW50IHJvb3RcbiAgZXh0ZXJuYWxTdHlsZXMoKSB7IH1cblxuICAvLyBhZGQgaHRtbCB0ZW1wbGF0ZSwgVGhpcyB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIHRoZSB0ZW1wbGF0ZSBhbmQgZGlyZWN0IHJlbmRlclxuICB0ZW1wbGF0ZSgpIHsgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBpZiAoZ2xvYmFsVGhpcy5kaXNwbGF5UGFnZUNvbnRlbnRPbmx5KSB0aGlzLmRpc3BsYXlQYWdlQ29udGVudE9ubHkodHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIG9uY2UgcGFnZSBpcyByZW5kZXJkXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAvLyBEZXRlY3Qgc3VwZXI/XG4gICAgICBpZiAoIXRoaXMuX19pc0J1aWxkUHJvY2VzcyAmJiB0aGlzLmFkZEV2ZW50cykgdGhpcy5hZGRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgb25jZSBwYWdlIGlzIHJlbW92ZWRcbiAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIC8vIERldGVjdCBzdXBlcj9cbiAgICAgIGlmICghdGhpcy5fX2lzQnVpbGRQcm9jZXNzICYmIHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBDcmVhdGVBbmRTZXQoKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICB3aW5kb3cuYWN0aXZlUGFnZSA9IGluc3RhbmNlO1xuXG4gICAgICBjb25zdCBwYWdlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpO1xuICAgICAgaWYgKHBhZ2VUaXRsZSkgcGFnZVRpdGxlLmlubmVyVGV4dCA9IGluc3RhbmNlLnRpdGxlO1xuXG4gICAgICBpbnN0YW5jZS5yZW5kZXIoKTtcbiAgICAgIC8vIFRPRE8gdXNlIG11dGF0aW9uIG9ic2VydmVyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNvbm5lY3RlZENhbGxiYWNrKSBpbnN0YW5jZS5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgfSwgMCk7XG5cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvLyByZW5kZXIgcGFnZSBodG1sXG4gICAgcmVuZGVyKCkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVSZW5kZXIgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jazpub3QoLnByZXZpb3VzKScpO1xuICAgICAgaWYgKCFyZW5kZXJCbG9jaykgdGhyb3cgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIDxwYWdlLXJlbmRlci1ibG9jaz4nKTtcblxuICAgICAgaWYgKHRoaXMucmVtb3ZlRXZlbnRzKSB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICAgICAgaWYgKHRoaXMuYmVmb3JlUmVuZGVyKSB0aGlzLmJlZm9yZVJlbmRlcigpO1xuICAgICAgcmVuZGVyQmxvY2suaW5uZXJIVE1MID0gYDxzdHlsZT4ke3RoaXMuc3R5bGVzKCl9PC9zdHlsZT4ke3RoaXMudGVtcGxhdGUoKX1gO1xuICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW5kZXIpIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcbiAgICAgIGlmICh0aGlzLmFkZEV2ZW50cykgdGhpcy5hZGRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBoaWRlIGFueSBub24gaW1taWRpYXRlIGVsZW1lbnRzIGFib3ZlIG9yIG9uIHRoZSBzYW1lIGxldmVsIGFkIHRoZSBwYWdlIGNvbnRlbnRcbiAgICBkaXNwbGF5UGFnZUNvbnRlbnRPbmx5KHJldmVyc2UgPSBmYWxzZSkge1xuICAgICAgY29uc3QgcmVuZGVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJlbmRlci1ibG9jaycpO1xuICAgICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGxldCBub2RlID0gcmVuZGVyQmxvY2s7XG4gICAgICBsZXQgc2libGluZztcbiAgICAgIGxldCBkaXJlY3RQYXRlbnQgPSByZW5kZXJCbG9jaztcblxuICAgICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSAmJiBub2RlLnBhcmVudE5vZGUgIT09IGh0bWwpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIHNpYmxpbmcgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgd2hpbGUgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDEgJiYgc2libGluZyAhPT0gZGlyZWN0UGF0ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmV2ZXJzZSkgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLW90aGVyLXRoYW4tcGFnZS1jb250ZW50Jyk7XG4gICAgICAgICAgICAgICAgICBlbHNlIHNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnaGlkZS1vdGhlci10aGFuLXBhZ2UtY29udGVudCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nXG4gICAgICAgICAgfVxuICAgICAgICAgIGRpcmVjdFBhdGVudCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIGdsb2JhbFRoaXMuZGlzcGxheVBhZ2VDb250ZW50T25seSA9ICFyZXZlcnNlO1xuICAgIH1cblxuICAgIC8vIENhbGxlZCBiZWZvcmUgcmVuZGVyKCkuIHBsYWNlaG9sZGVyLCBjYW4gYmUgb3ZlcmlkZGVuXG4gICAgLy8gVGhpcyBkb2VzIG5vdCBpbmNsdWRlIHRoZSBpbml0aWFsIGNsb25lTm9kZVxuICAgIGJlZm9yZVJlbmRlcigpIHsgfVxuXG4gICAgLy8gQ2FsbGVkIGFmdGVyIHJlbmRlcigpLiBwbGFjZWhvbGRlciwgY2FuIGJlIG92ZXJpZGRlblxuICAgIC8vIFRoaXMgZG9lcyBub3QgaW5jbHVkZSB0aGUgaW5pdGlhbCBjbG9uZU5vZGVcbiAgICBhZnRlclJlbmRlcigpIHsgfVxuXG4gICAgLy8gYWRkIGNzcyB0aGF0IHdpbGwgYmUgaW5qZWN0ZWQgdG8gdGhlIHRlbXBsYXRlXG4gICAgc3R5bGVzKCkgeyB9XG5cbiAgICAvLyBhZGQgaHRtbCB0ZW1wbGF0ZSwgVGhpcyB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIHRoZSB0ZW1wbGF0ZSBhbmQgZGlyZWN0IHJlbmRlclxuICAgIHRlbXBsYXRlKCkgeyB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJvdXRlcyA9IHt9O1xuICAgIHRoaXMuY2xhc3NSZWZlcmVuY2UgPSB7fTtcblxuICAgIHRoaXMucGFnZUNsYXNzbmFtZVJlZ2V4ID0gL2NsYXNzXFxzKC4qKVxcc2V4dGVuZHMvO1xuXG4gICAgLy8gcmVnZXhlcyBmb3IgcGFyc2luZyB1cmknc1xuICAgIHRoaXMuUEFSQU1FVEVSX1JFR0VYUCA9IC8oWzoqXSkoXFx3KykvZztcbiAgICB0aGlzLldJTERDQVJEX1JFR0VYUCA9IC9cXCovZztcbiAgICB0aGlzLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQID0gJyhbXlxcL10rKSc7XG4gICAgdGhpcy5SRVBMQUNFX1dJTERDQVJEID0gJyg/Oi4qKSc7XG4gICAgdGhpcy5GT0xMT1dFRF9CWV9TTEFTSF9SRUdFWFAgPSAnKD86XFwvJHwkKSc7XG4gICAgdGhpcy5NQVRDSF9SRUdFWFBfRkxBR1MgPSAnJztcblxuICAgIHRoaXMuX3RyYW5zaXRpb25QYWdlcyA9IGZhbHNlO1xuICAgIHRoaXMuYm91bmRfb25UcmFuc2l0aW9uQ29tcGxldGUgPSB0aGlzLl9vblRyYW5zaXRpb25Db21wbGV0ZS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fX211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmFjdGl2ZVBhZ2UuY29ubmVjdGVkQ2FsbGJhY2spIHdpbmRvdy5hY3RpdmVQYWdlLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgICB0aGlzLl9zdG9wV2F0Y2hpbmdGb3JDb25uZWN0KCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIGJyb3dzZXIgZXZlbnRzIGZvciB1cmwgY2hhbmdlc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5fcmVzb2x2ZS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIHRoaXMuX3Jlc29sdmUodW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCB0cmFuc2l0aW9uUGFnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25QYWdlcztcbiAgfVxuXG4gIHNldCB0cmFuc2l0aW9uUGFnZXModmFsdWUpIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uUGFnZXMgPSAhIXZhbHVlO1xuICB9XG5cbiAgZ2V0IHBhdGgoKSB7XG4gICAgbGV0IHBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC8uKiMvLCAnJyk7XG4gICAgaWYgKHBhdGguaW5jbHVkZXMoJz8nKSkgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXTtcbiAgICBpZiAocGF0aC5jaGFyQXQoMCkgIT09ICcvJykgcGF0aCA9ICcvJyArIHBhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXQgdXJsUGFyYW1ldGVycygpIHtcbiAgICBjb25zdCBtYXRjaCA9IHRoaXMuX21hdGNoKHRoaXMucGF0aCk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2gucGFyYW1zIDoge307XG4gIH1cblxuICBnZXQgc2VhcmNoUGFyYW10ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9leHRyYWN0U2VhcmNoUGFyYW1ldGVycyh0aGlzLl9jbGVhbih3aW5kb3cubG9jYXRpb24uaHJlZikpLnNwbGl0KCcsJykuZmlsdGVyKGEgPT4gISFhKS5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHNwbGl0ID0gYi5zcGxpdCgnPScpO1xuICAgICAgYVtzcGxpdFswXV0gPSBzcGxpdFsxXTtcbiAgICAgIHJldHVybiBhO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGFkZFRyYW5zaXRpb25DU1MoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgYDxzdHlsZT5cbiAgICAgIHBhZ2UtY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cbiAgICAgIHBhZ2UtY29udGFpbmVyLmluLXRyYW5zaXRpb24ge1xuICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgICB9XG4gICAgICBwYWdlLXJlbmRlci1ibG9jayB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgIH1cbiAgICAgIHBhZ2UtcmVuZGVyLWJsb2NrLmJlZm9yZS10cmFuc2l0aW9uLXBhZ2Utb3V0IHtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuICAgICAgcGFnZS1yZW5kZXItYmxvY2suYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1pbiB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgIH1cbiAgICAgIHBhZ2UtcmVuZGVyLWJsb2NrLnRyYW5zaXRpb24tcGFnZS1vdXQge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOSk7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjE2cyBsaW5lYXIsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSAuMjZzIGN1YmljLWJlemllcigwLDAsLjIsMSk7XG4gICAgICB9XG4gICAgICBwYWdlLXJlbmRlci1ibG9jay50cmFuc2l0aW9uLXBhZ2UtaW4ge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAtNTAlIDA7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjE4cyBsaW5lYXIsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSAuMjZzIGN1YmljLWJlemllcigwLDAsLjIsMSk7XG4gICAgICB9XG4gICAgPC9zdHlsZT5gKTtcbiAgfVxuICBcbiAgLy8geW91IGNhbiBjb25maWd1cmUgcm91dGVzIGRpcmVjdGx5IGluIHRoZSBQYWdlIGNsYXNzXG4gIGFkZFBhZ2VDbGFzcyhDbGFzcywgb3B0aW9uYWxQYXRoKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoQ2xhc3MsIG9wdGlvbmFsUGF0aCk7XG5cbiAgICAvLyBoYW5kbGUgb3B0aW9uYWwgcGF0aFxuICAgIGlmIChvcHRpb25hbFBhdGgpIHRoaXMuYWRkUGFnZUNsYXNzUGF0aChDbGFzcywgb3B0aW9uYWxQYXRoKTtcblxuICAgIC8vIGFkZCByb3V0ZXMgZnJvbSBwYWdlIGNsYXNzXG4gICAgKENsYXNzLnJvdXRlcyB8fCBbXSkuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgIGlmIChvcHRpb25hbFBhdGggPT09IHBhdGgpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLnJvdXRlc1twYXRoXSkgdGhyb3cgRXJyb3IoYFBhdGggYWxyZWFkeSBleGlzdHM6ICR7cGF0aH1gKTtcbiAgICAgIHRoaXMuY2xhc3NSZWZlcmVuY2VbY2xhc3NOYW1lXSA9IENsYXNzO1xuICAgICAgdGhpcy5yb3V0ZXNbcGF0aF0gPSBjbGFzc05hbWU7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQYWdlQ2xhc3NQYXRoKENsYXNzLCBwYXRoKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoQ2xhc3MsIHBhdGgpO1xuICAgIGlmICh0aGlzLnJvdXRlc1twYXRoXSkgdGhyb3cgRXJyb3IoYFBhdGggYWxyZWFkeSBleGlzdHM6ICR7b3B0aW9uYWxQYXRofWApO1xuICAgIHRoaXMuY2xhc3NSZWZlcmVuY2VbY2xhc3NOYW1lXSA9IENsYXNzO1xuICAgIHRoaXMucm91dGVzW3BhdGhdID0gY2xhc3NOYW1lO1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lKENsYXNzLCBwYXRoKSB7XG4gICAgY29uc3QgY2xhc3NNYXRjaCA9IHRoaXMucGFnZUNsYXNzbmFtZVJlZ2V4LmV4ZWMoQ2xhc3MpO1xuICAgIHJldHVybiBjbGFzc01hdGNoID8gY2xhc3NNYXRjaFsxXSA6IHBhdGguc3BsaXQoJy8nKS5wb3AoKS5yZXBsYWNlKCcuanMnLCAnJyk7XG4gIH1cblxuICBzZXRSb290KGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLnJvdXRlc1tjbGFzc05hbWVdKSB7XG4gICAgICBjb25zdCBDbGFzcyA9IHRoaXMuY2xhc3NSZWZlcmVuY2VbdGhpcy5yb3V0ZXNbY2xhc3NOYW1lXV07XG4gICAgICB0aGlzLmFkZFBhZ2VDbGFzc1BhdGgoQ2xhc3MsICcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNsYXNzTmFtZSBpcyBhY3R1YWxseSBjbGFzcyBpbiB0aGlzIGNhc2VcbiAgICAgIHRoaXMuYWRkUGFnZUNsYXNzUGF0aChjbGFzc05hbWUsICcvJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0NDA0KHsgQ2xhc3MgfSkge1xuICAgIGlmIChDbGFzcykgdGhpcy5fbm90Rm91bmRSb3V0ZUNsYXNzID0gQ2xhc3M7XG4gIH1cblxuXG4gIC8vIC0tLSBwcml2YXRlIC0tLVxuXG4gIF9yZXNvbHZlKGV2ZW50LCBpbml0aWFsID0gZmFsc2UpIHtcbiAgICAvLyBubyBjaGFuZ2VcbiAgICBpZiAoaW5pdGlhbCA9PT0gZmFsc2UgJiYgZXZlbnQub2xkVVJMID09PSBldmVudC5uZXdVUkwpIHJldHVybjtcblxuICAgIGNvbnN0IHBhdGggPSB0aGlzLnBhdGg7XG4gICAgY29uc3QgbWF0Y2ggPSB0aGlzLl9tYXRjaChwYXRoKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIGlmICh0aGlzLl9ub3RGb3VuZFJvdXRlQ2xhc3MpIHJldHVybiB0aGlzLl9jaGFuZ2VQYWdlKHRoaXMuX25vdEZvdW5kUm91dGVDbGFzcyk7XG4gICAgICBlbHNlIHJldHVybiBjb25zb2xlLndhcm4oJ25vIHBhZ2UgZm91bmQgYW5kIG5vIGRlZmF1bHQgbm90IGZvdW5kIHBhZ2Ugc2V0dXAnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsID0gcGF0aDtcbiAgICBpZiAoaW5pdGlhbCAmJiB0aGlzLl9wYWdlSXNQcmVSZW5kZXJlZCgpKSByZXR1cm47XG5cbiAgICBsZXQgR0VUUGFyYW1ldGVycyA9IHRoaXMuX2V4dHJhY3RTZWFyY2hQYXJhbWV0ZXJzKHRoaXMuX2NsZWFuKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSk7XG4gICAgaWYgKEdFVFBhcmFtZXRlcnMpIHVybCArPSBgPyR7R0VUUGFyYW1ldGVyc31gO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdXJsO1xuXG4gICAgLy8gcHJldmVudCBwYWdlIGNoYW5nZSB3aGVuIG5vIGRpZmZlcmVuY2UgZXhpc3RzXG4gICAgLy8gdGhpcyB3aWxsIGNvdmVyIHRoZSBjYXNlIG9mIGFkZGluZyB0aGUgIy8gdG8gdGhlIHVybFxuICAgIGlmIChldmVudCkge1xuICAgICAgY29uc3QgdXJsRGlmZiA9IGV2ZW50Lm9sZFVSTC5sZW5ndGggPiBldmVudC5uZXdVUkwubGVuZ3RoID8gZXZlbnQub2xkVVJMLnJlcGxhY2UoZXZlbnQubmV3VVJMLCAnJykgOiBldmVudC5uZXdVUkwucmVwbGFjZShldmVudC5vbGRVUkwsICcnKTtcbiAgICAgIGlmICh1cmxEaWZmID09PSAnJyB8fCB1cmxEaWZmID09PSAnIy8nKSByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IHBhZ2UgZnJvbSBsb2FkaW5nIG9uIGluaXRpYWwgcmVuZGVyXG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZVBhZ2UobWF0Y2gpO1xuICB9XG5cbiAgX3dhdGNoRm9yQ29ubmVjdCgpIHtcbiAgICBjb25zdCByZW5kZXJCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrOm5vdCgucHJldmlvdXMpJyk7XG4gICAgdGhpcy5fX211dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShyZW5kZXJCbG9jaywgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG4gIH1cblxuICBfc3RvcFdhdGNoaW5nRm9yQ29ubmVjdCgpIHtcbiAgICB0aGlzLl9fbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBfY2hhbmdlUGFnZSh7IENsYXNzIH0pIHtcbiAgICBpZiAoIUNsYXNzKSB0aHJvdyBFcnJvcignbm8gY2xhc3MgZm91bmQnKTtcblxuICAgIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLWNvbnRhaW5lcicpO1xuICAgIGlmICghcGFnZUNvbnRhaW5lcikgdGhyb3cgRXJyb3IoJzxwYWdlLWNvbnRhaW5lcj4gcmVxdWlyZWQgZm9yIHJvdXRlciB0byB3b3JrJyk7XG5cbiAgICAvL1xuICAgIHRoaXMuX3N0b3BXYXRjaGluZ0ZvckNvbm5lY3QoKTtcblxuICAgIGNvbnN0IHJlbmRlckJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1yZW5kZXItYmxvY2snKTtcblxuICAgIC8vIC0tLSBpbml0YWwgcGFnZSAtLS1cbiAgICAvLyBBIHBhZ2UgY2FuIGhhdmUgbm8gcHJlLXJlbmRlcmVkIHBhZ2VzLlxuICAgIC8vIGNyZWF0ZSByZW5kZXItYmxvY2sgYW5kIHJlbmRlciBwYWdlIGltbWlkaWF0bHlcbiAgICBpZiAoIXJlbmRlckJsb2NrKSB7XG4gICAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhZ2UtcmVuZGVyLWJsb2NrJykpO1xuXG4gICAgICAvLyBjcmVhdGUgcGFnZSBjbGFzcyBpbnN0YW5jZVxuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UgPSBuZXcgQ2xhc3MoKTtcbiAgICAgIHRoaXMuX3dhdGNoRm9yQ29ubmVjdCgpO1xuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UucmVuZGVyKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgLy8gLS0tIG5vIHRyYW5zaXRvbiAtLS1cbiAgICAvLyBjaGFuZ2UgcGFnZSBpbW1pZGVhdGx5IGlmIHRyYW5zaXRpb25zIGFyZSBub3Qgb25cbiAgICBpZiAoIXRoaXMuX3RyYW5zaXRpb25QYWdlcykge1xuICAgICAgd2luZG93LmFjdGl2ZVBhZ2UuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgICAgLy8gY3JlYXRlIHBhZ2UgY2xhc3MgaW5zdGFuY2VcbiAgICAgIHdpbmRvdy5hY3RpdmVQYWdlID0gbmV3IENsYXNzKCk7XG4gICAgICB0aGlzLl93YXRjaEZvckNvbm5lY3QoKTtcbiAgICAgIHdpbmRvdy5hY3RpdmVQYWdlLnJlbmRlcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8tLS0gdHJhbnNpdG9uIC0tLVxuXG4gICAgLy8gcHJlcCBmb3IgY3VycmVudCBwYWdlIHRyYW5zaXRpb24gb3V0XG4gICAgcmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgncHJldmlvdXMnKTtcbiAgICByZW5kZXJCbG9jay5jbGFzc0xpc3QuYWRkKCdiZWZvcmUtdHJhbnNpdGlvbi1wYWdlLW91dCcpO1xuICAgIHdpbmRvdy5hY3RpdmVQYWdlLl9kaXNhYmxlUmVuZGVyID0gdHJ1ZTtcbiAgICB3aW5kb3cuYWN0aXZlUGFnZS5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuXG4gICAgLy8gYnVpbGQgbmV4dCBwYWdlIGFuZCBwcmVwIGZvciB0cmFuc2l0aW9uXG4gICAgY29uc3QgbmV4dFJlbmRlckJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFnZS1yZW5kZXItYmxvY2snKTtcbiAgICBuZXh0UmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgnYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1pbicpO1xuICAgIHJlbmRlckJsb2NrLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBuZXh0UmVuZGVyQmxvY2spO1xuXG4gICAgY29uc3QgcGFnZUluc3RhbmNlID0gbmV3IENsYXNzKCk7XG4gICAgd2luZG93LmFjdGl2ZVBhZ2UgPSBwYWdlSW5zdGFuY2U7XG4gICAgdGhpcy5fd2F0Y2hGb3JDb25uZWN0KCk7XG4gICAgcGFnZUluc3RhbmNlLnJlbmRlcigpO1xuXG4gICAgY29uc3QgcGFnZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGl0bGUnKTtcbiAgICBpZiAocGFnZVRpdGxlKSBwYWdlVGl0bGUuaW5uZXJUZXh0ID0gcGFnZUluc3RhbmNlLnRpdGxlO1xuXG4gICAgLy8gLS0tIHRyYW5zaXRpb24gLS0tXG4gICAgcGFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbi10cmFuc2l0aW9uJyk7XG5cbiAgICAvLyBDT05USU5VRVxuICAgIHJlbmRlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24tcGFnZS1vdXQnKTtcbiAgICBuZXh0UmVuZGVyQmxvY2suY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbi1wYWdlLWluJyk7XG5cbiAgICByZW5kZXJCbG9jay5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5ib3VuZF9vblRyYW5zaXRpb25Db21wbGV0ZSk7XG4gICAgbmV4dFJlbmRlckJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkNvbXBsZXRlKTtcbiAgfVxuXG4gIF9vblRyYW5zaXRpb25Db21wbGV0ZSh7IHRhcmdldCB9KSB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmJvdW5kX29uVHJhbnNpdGlvbkNvbXBsZXRlKTtcbiAgICAvLyByZW1vdmUgb2xkIHBhZ2VcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndHJhbnNpdGlvbi1wYWdlLW91dCcpKSB0YXJnZXQucmVtb3ZlKCk7XG4gICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBzdGF0ZSBmcm9tIG5ldyBwYWdlXG4gICAgZWxzZSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYmVmb3JlLXRyYW5zaXRpb24tcGFnZS1pbicpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb24tcGFnZS1pbicpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB0cmFuc2l0aW9uIHN0YXRlIGZyb20gcGFnZSBjb250YWluZXJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrLnByZXZpb3VzJykgJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrLm5leHQnKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdpbi10cmFuc2l0aW9uJyk7XG4gICAgfVxuICB9XG4gIFxuXG4gIF9wYWdlSXNQcmVSZW5kZXJlZCgpIHtcbiAgICBjb25zdCByZW5kZXJCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtcmVuZGVyLWJsb2NrJyk7XG4gICAgaWYgKHJlbmRlckJsb2NrICYmIHJlbmRlckJsb2NrLmNoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIF9jbGVhbihzdHIpIHtcbiAgICBpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gcztcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcLyskLywgJycpLnJlcGxhY2UoL15cXC8rLywgJy8nKTtcbiAgfVxuXG4gIF9leHRyYWN0U2VhcmNoUGFyYW1ldGVycyh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KC9cXD8oLiopPyQvKS5zbGljZSgxKS5qb2luKCcnKTtcbiAgfVxuXG5cblxuICAvLyAtLS0gbWF0Y2hpbmcgLS0tXG5cbiAgX21hdGNoKHBhdGgpIHtcbiAgICBsZXQgbWF0Y2hlZCA9IHRoaXMuX2ZpbmRNYXRjaGVkUm91dGVzKHBhdGgpO1xuICAgIGlmICghbWF0Y2hlZC5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBlbHNlIGlmIChtYXRjaGVkLmxlbmd0aCA9PT0gMSkgcmV0dXJuIG1hdGNoZWRbMF07XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbWF0Y2hlZC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChiLnBhcmFtcykgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0pWzBdO1xuICAgIH1cbiAgfVxuXG4gIF9maW5kTWF0Y2hlZFJvdXRlcyh1cmwpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5yb3V0ZXMpXG4gICAgICAubWFwKChbcm91dGUsIGNsYXNzTmFtZV0pID0+IHtcbiAgICAgICAgY29uc3QgeyByZWdleHAsIHBhcmFtTmFtZXMgfSA9IHRoaXMuX3JlcGxhY2VEeW5hbWljVVJMUGFydHModGhpcy5fY2xlYW4ocm91dGUpKTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB1cmwucmVwbGFjZSgvXlxcLysvLCAnLycpLm1hdGNoKHJlZ2V4cCk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX3JlZ0V4cFJlc3VsdFRvUGFyYW1zKG1hdGNoLCBwYXJhbU5hbWVzKTtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSB0aGlzLmNsYXNzUmVmZXJlbmNlW2NsYXNzTmFtZV07XG5cbiAgICAgICAgcmV0dXJuICFtYXRjaCA/IGZhbHNlIDoge1xuICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgIHJvdXRlLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgQ2xhc3NcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKG0gPT4gbSAmJiBtLm1hdGNoWzBdICE9PSAnJyk7XG4gIH1cblxuICBfcmVwbGFjZUR5bmFtaWNVUkxQYXJ0cyhyb3V0ZSkge1xuICAgIGxldCBwYXJhbU5hbWVzID0gW107XG4gICAgbGV0IHJlZ2V4cCA9ICcnO1xuXG4gICAgaWYgKHJvdXRlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZWdleHAgPSByb3V0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICAgdGhpcy5fY2xlYW4ocm91dGUpXG4gICAgICAgICAgLnJlcGxhY2UodGhpcy5QQVJBTUVURVJfUkVHRVhQLCAoZnVsbCwgZG90cywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1OYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFA7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAucmVwbGFjZSh0aGlzLldJTERDQVJEX1JFR0VYUCwgdGhpcy5SRVBMQUNFX1dJTERDQVJEKSArIHRoaXMuRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQLCB0aGlzLk1BVENIX1JFR0VYUF9GTEFHU1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVnZXhwLCBwYXJhbU5hbWVzIH07XG4gIH1cblxuICBfcmVnRXhwUmVzdWx0VG9QYXJhbXMobWF0Y2gsIG5hbWVzKSB7XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG1hdGNoXG4gICAgICAuc2xpY2UoMSwgbWF0Y2gubGVuZ3RoKVxuICAgICAgLnJlZHVjZSgocGFyYW1zLCB2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCkgcGFyYW1zID0ge307XG4gICAgICAgIHBhcmFtc1tuYW1lc1tpbmRleF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH0sIG51bGwpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1hdXRvY29tcGxldGUnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2hhc0ZpbHRlciA9IHRoaXMuaGFzQXR0cmlidXRlKCdmaWx0ZXInKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0SW5wdXQ7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuXG4gICAgdGhpcy5faW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XG4gICAgdGhpcy5fb3B0aW9uc0RhdGEgPSBbLi4udGhpcy5jaGlsZHJlbl0ucmVkdWNlKChhLCBlbCkgPT4ge1xuICAgICAgYVtlbC5pbm5lclRleHRdID0gZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwge30pO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMucGFuZWxIVE1MKTtcbiAgICB0aGlzLnBhbmVsLmlubmVySFRNTCA9IHRoaXMuX2lubmVySFRNTDtcbiAgICB0aGlzLnBhbmVsLnN0eWxlLm1pbldpZHRoID0gYCR7dGhpcy50YXJnZXRJbnB1dC5vZmZzZXRXaWR0aH1weGA7XG4gICAgdGhpcy5wYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gYCR7dGhpcy50YXJnZXRJbnB1dC5vZmZzZXRIZWlnaHQgKyAxMn1weGA7XG4gICAgdGhpcy5wYW5lbC5pZ25vcmVFbGVtZW50T25DbGlja1RvQ2xvc2UodGFyZ2V0KTtcblxuICAgIHRoaXMuYm91bmRfb25UYXJnZXRGb2N1cyA9IHRoaXMub25UYXJnZXRGb2N1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25UYXJnZXRCbHVyID0gdGhpcy5vblRhcmdldEJsdXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uVGFyZ2V0Q2hhbmdlID0gdGhpcy5vblRhcmdldENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25UYXJnZXRJbnB1dCA9IHRoaXMub25UYXJnZXRJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25QYW5lbENsaWNrID0gdGhpcy5vblBhbmVsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSA9IHRoaXMub25QYW5lbENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbktleURvd24gPSB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZGVib3VuY2VfZmlsdGVyID0gTURXVXRpbHMuZGVib3VuY2UodGhpcy5maWx0ZXIuYmluZCh0aGlzKSwgMTAwKTtcblxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuYm91bmRfb25UYXJnZXRGb2N1cyk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJvdW5kX29uVGFyZ2V0Qmx1cik7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZF9vblRhcmdldElucHV0KTtcbiAgICB0aGlzLnBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25QYW5lbENsb3NlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kX29uS2V5RG93bik7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldElucHV0O1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuYm91bmRfb25UYXJnZXRGb2N1cyk7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuYm91bmRfb25UYXJnZXRCbHVyKTtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX29uVGFyZ2V0Q2hhbmdlKTtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuYm91bmRfb25UYXJnZXRJbnB1dCk7XG4gICAgfVxuICAgIHRoaXMucGFuZWwuY2xvc2UoKTtcbiAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xpY2spO1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRfb25LZXlEb3duKTtcbiAgfVxuXG4gIGdldCB0YXJnZXRJbnB1dCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2ZvcicpfV1gKTtcbiAgfVxuXG4gIGdldCBwYW5lbCgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWxfKSB0aGlzLnBhbmVsXyA9IHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJyk7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxfO1xuICB9XG5cbiAgZ2V0IHBhbmVsSFRNTCgpIHtcbiAgICByZXR1cm4gJzxtZHctcGFuZWwgbWR3LXBvc2l0aW9uPVwiYm90dG9tIGlubmVyLWxlZnRcIj48L21kdy1wYW5lbD4nO1xuICB9XG5cbiAgb25QYW5lbENsb3NlKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldElucHV0O1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfb25UYXJnZXRDaGFuZ2UpO1xuICB9XG5cbiAgb3BlblBhbmVsKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0SW5wdXQ7XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhbmVsLm9wZW4odHJ1ZSk7XG4gICAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vblRhcmdldENoYW5nZSk7XG4gIH1cblxuICBvbktleURvd24oZSkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkge1xuICAgICAgaWYgKCF0aGlzLl9pc0lucHV0Rm9jdXNlZCkgcmV0dXJuO1xuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMjcpIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgNDA6IC8vZG93blxuICAgICAgY2FzZSAzOTogLy9yaWdodFxuICAgICAgICB0aGlzLmZvY3VzTmV4dCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODogLy91cFxuICAgICAgY2FzZSAzNzogLy9sZWZ0XG4gICAgICAgIHRoaXMuZm9jdXNQcmV2aW91cygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAxMzogLy9lbnRlclxuICAgICAgICB0aGlzLnNlbGVjdEZvY3VzZWQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgb25UYXJnZXRGb2N1cyhlKSB7XG4gICAgdGhpcy5faXNJbnB1dEZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMub3BlblBhbmVsKCk7XG4gIH1cblxuICBvblRhcmdldEJsdXIoZSkge1xuICAgIHRoaXMuX2lzSW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5wYW5lbC5jbG9zZSgpO1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gIH1cblxuICBvblRhcmdldENoYW5nZShlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2NoYW5nZScpO1xuICB9XG5cbiAgb25UYXJnZXRJbnB1dChlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzRmlsdGVyKSB0aGlzLmRlYm91bmNlX2ZpbHRlcihlLnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBvblBhbmVsQ2xpY2soZSkge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgLy8gVE9ETyB0ZXh0IGZpZWxkIHNob3VsZCBkbyB0aGlzIHdoZW4gdmFsdWUgaXMgc2V0XG4gICAgICB0aGlzLnRhcmdldElucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnbm90LWVtcHR5Jyk7XG4gICAgICB0aGlzLnRhcmdldElucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnBhbmVsLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSByZXR1cm47XG4gICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHZsZW4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgY29uc3QgZmlsdGVyZWQgPSBPYmplY3Qua2V5cyh0aGlzLl9vcHRpb25zRGF0YSkuZmlsdGVyKGggPT4ge1xuICAgICAgY29uc3QgaGxlbiA9IGgubGVuZ3RoO1xuICAgICAgaWYgKHZsZW4gPiBobGVuKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodmxlbiA9PT0gaGxlbikgcmV0dXJuIHZhbHVlID09PSBoO1xuICAgICAgaWYgKGgudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZSkpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyBUT0RPIGltcGxlbWVudCBjaGFyIG1hdGNoaW5nXG4gICAgICAvLyBsZXQgaSA9IDA7XG4gICAgICAvLyBsZXQgajtcbiAgICAgIC8vIGZvciAoOyBpIDwgdmxlbjsgaSArPSAxKSB7XG4gICAgICAvL1xuICAgICAgLy8gfVxuICAgIH0pO1xuXG4gICAgdGhpcy5wYW5lbC5pbm5lckhUTUwgPSB0aGlzLnJlbmRlck9wdGlvbnMoZmlsdGVyZWQpO1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyhvcHRpb25LZXlzKSB7XG4gICAgcmV0dXJuIGAke29wdGlvbktleXMubWFwKGsgPT4gYFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7dGhpcy5fb3B0aW9uc0RhdGFba119XCI+JHtrfTwvb3B0aW9uPlxuICAgIGApLmpvaW4oJ1xcbicpfWA7XG4gIH1cblxuICBmb2N1c05leHQoKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSByZXR1cm47XG4gICAgY29uc3Qgb3B0aW9uRWxlbWVudHMgPSBbLi4udGhpcy5wYW5lbC5jaGlsZHJlbl07XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPT09IHVuZGVmaW5lZCkgdGhpcy5fZm9jdXNJbmRleCA9IDA7XG4gICAgZWxzZSB0aGlzLl9mb2N1c0luZGV4ICs9IDE7XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPiBvcHRpb25FbGVtZW50cy5sZW5ndGggLSAxKSB0aGlzLl9mb2N1c0luZGV4ID0gb3B0aW9uRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBmb2N1c1ByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwuY2hpbGRyZW5dO1xuICAgIGlmICh0aGlzLl9mb2N1c0luZGV4ID09PSB1bmRlZmluZWQpIHRoaXMuX2ZvY3VzSW5kZXggPSAwO1xuICAgIGVsc2UgdGhpcy5fZm9jdXNJbmRleCAtPSAxO1xuICAgIGlmICh0aGlzLl9mb2N1c0luZGV4IDw9IDApIHRoaXMuX2ZvY3VzSW5kZXggPSAwO1xuICAgIGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uKSB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1mb2N1c2VkJyk7XG4gICAgdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbkVsZW1lbnRzW3RoaXMuX2ZvY3VzSW5kZXhdO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24uY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgfVxuXG4gIHNlbGVjdEZvY3VzZWQoKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSByZXR1cm47XG4gICAgY29uc3Qgb3B0aW9uRWxlbWVudHMgPSBbLi4udGhpcy5wYW5lbC5jaGlsZHJlbl07XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPT0gdW5kZWZpbmVkIHx8IHRoaXMuX2ZvY3VzSW5kZXggPiBvcHRpb25FbGVtZW50cy5sZW5ndGggLSAxKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBjb25zdCB2YWx1ZSA9ICBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgLy8gVE9ETyB0ZXh0IGZpZWxkIHNob3VsZCBkbyB0aGlzIHdoZW4gdmFsdWUgaXMgc2V0XG4gICAgdGhpcy50YXJnZXRJbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ25vdC1lbXB0eScpO1xuICAgIHRoaXMudGFyZ2V0SW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnBhbmVsLmNsb3NlKCk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctYmFja2Ryb3AnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gdGhpcy5mcm9udEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWVsZXZhdGlvbi0xLS1zaGFkb3cnKTtcbiAgfVxuXG4gIGdldCBmcm9udEVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmZyb250RWxlbWVudF8pIHRoaXMuZnJvbnRFbGVtZW50XyA9IHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWJhY2tkcm9wLWZyb250Jyk7XG4gICAgcmV0dXJuIHRoaXMuZnJvbnRFbGVtZW50XztcbiAgfVxuXG4gIGdldCBiYWNrQ29udGVudEVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmJhY2tDb250ZW50RWxlbWVudF8pIHRoaXMuYmFja0NvbnRlbnRFbGVtZW50XyA9IHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWJhY2tkcm9wLWJhY2sgbWR3LWJhY2tkcm9wLWNvbnRlbnQnKTtcbiAgICByZXR1cm4gdGhpcy5iYWNrQ29udGVudEVsZW1lbnRfO1xuICB9XG5cbiAgZ2V0IGJhY2tDb250ZW5IZWlnaHQoKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmJhY2tDb250ZW50RWxlbWVudC5jaGlsZHJlbjtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBjaGlsZEJvdW5kcyA9IGxhc3RDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gdGhpcy5iYWNrQ29udGVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSArIGNoaWxkQm91bmRzLnkgKyBjaGlsZEJvdW5kcy5oZWlnaHQ7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kZWRfO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmV4cGFuZGVkXyA9PT0gdHJ1ZSkgdGhpcy5jb250cmFjdCgpO1xuICAgIGVsc2UgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLmZyb250RWxlbWVudC5zdHlsZS50b3AgPSBgJHt0aGlzLmJhY2tDb250ZW5IZWlnaHQgLSA1Nn1weGA7XG4gICAgdGhpcy5leHBhbmRlZF8gPSB0cnVlO1xuICB9XG5cbiAgY29udHJhY3QoKSB7XG4gICAgdGhpcy5mcm9udEVsZW1lbnQuc3R5bGUudG9wID0gJzU2cHgnO1xuICAgIHRoaXMuZXhwYW5kZWRfID0gZmFsc2U7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdCYW5uZXIgZnJvbSAnLi9zZXJ2aWNlLmpzJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctYmFubmVyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc3R5bGUubWFyZ2luQm90dG9tID0gYC0ke3RoaXMuY2xpZW50SGVpZ2h0ICsgMX1weGA7XG4gIH1cblxuICBzaG93KCkge1xuICAgIE1EV0Jhbm5lci5hZGQodGhpcyk7XG4gIH1cblxuICBkaXNtaXNzKCkge1xuICAgIE1EV0Jhbm5lci5yZW1vdmUodGhpcyk7XG4gIH1cblxuICBhY2NlcHQoKSB7XG4gICAgTURXQmFubmVyLmFjY2VwdCh0aGlzKTtcbiAgfVxuXG4gIF9zaG93KCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNob3cnKTtcbiAgfVxuXG4gIF9kaXNzbWlzcygpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoTURXVXRpbHMudHJhbnNpdGlvbkV2ZW50TmFtZSwgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihNRFdVdGlscy50cmFuc2l0aW9uRXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctZGlzbWlzcycpO1xuICAgIHRoaXMuZGlzcGF0Y2hDbG9zZSgpO1xuICB9XG5cbiAgZGlzcGF0Y2hDbG9zZSgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjbG9zZScpKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmNvbnN0IE1EV0Jhbm5lciA9IG5ldyBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgfVxuXG4gIGFkZChlbCwgcmVzb2x2ZXIpIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goe2VsLCByZXNvbHZlcn0pO1xuICAgIHRoaXMuaGFuZGxlUXVldWUoKTtcbiAgfVxuXG4gIHJlbW92ZShlbCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmVsID09PSBlbCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJlc29sdmVyKGZhbHNlKTtcbiAgICAgIGVsLl9kaXNzbWlzcygpO1xuICAgIH0gZWxzZSB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS5maWx0ZXIoZSA9PiBlLmVsICE9PSBlbCk7XG4gIH1cblxuICBhY2NlcHQoZWwpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC5lbCA9PT0gZWwpIHtcbiAgICAgIHRoaXMuY3VycmVudC5yZXNvbHZlcih0cnVlKTtcbiAgICAgIGVsLl9kaXNzbWlzcygpO1xuICAgIH0gZWxzZSB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS5maWx0ZXIoZSA9PiBlLmVsICE9PSBlbCk7XG4gIH1cblxuICBoYW5kbGVRdWV1ZSgpIHtcbiAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGlmICghdGhpcy5jdXJyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICB0aGlzLmN1cnJlbnQuZWwuX3Nob3coKTtcbiAgICAgIHRoaXMuY3VycmVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1ZXVlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGUoeyBtZXNzYWdlLCBkaXNtaXNzTGFiZWwgPSBcImRpc21pc3NcIiwgYWNjZXB0TGFiZWwgPSBudWxsLCB0ZW1wbGF0ZSwgcGFyZW50IH0pIHtcbiAgICBpZiAoIW1lc3NhZ2UgJiYgIXRlbXBsYXRlKSB0aHJvdyBFcnJvcignRWl0aGVyIGBtZXNzYWdlYCBvciBgdGVtcGxhdGVgIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKCF0ZW1wbGF0ZSAmJiAhZGlzbWlzc0xhYmVsICYmICFhY2NlcHRMYWJlbCkgdGhyb3cgRXJyb3IoJ1doZW4gbm90IHVzaW5nIGEgYHRlbXBsYXRlYCB5b3UgYXJlIHJlcXVpcmVkIHRvIHByb3ZpZGUgZWl0aGVyIGEgYGRpc21pc3NMYWJlbGAgb3IgYW4gYGFjY2VwdExhYmVsYCcpO1xuXG4gICAgY29uc3QgdWlkID0gTURXVXRpbHMudWlkKCk7XG4gICAgaWYgKCF0ZW1wbGF0ZSkgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKG1lc3NhZ2UsIGRpc21pc3NMYWJlbCwgYWNjZXB0TGFiZWwsIHVpZCk7XG5cbiAgICAvLyB0cnkgdG8gZmluZCB0aGUgY29ycmVjdCBwYXJlbnQgaWYgbm90IHBhc3NlZCBpblxuICAgIGxldCBwYXJlbnRFbGVtZW50ID0gcGFyZW50IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlID4gbWR3LXRvcC1hcHAtYmFyJyk7XG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LXBhZ2UnKTtcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICBsZXQgYmFubmVyRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gJ01EVy1UT1AtQVBQLUJBUicpIHtcbiAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIHRlbXBsYXRlKTtcbiAgICAgIGJhbm5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBtZHctYmFubmVyIyR7dWlkfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRlbXBsYXRlKTtcbiAgICAgIGJhbm5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBtZHctYmFubmVyIyR7dWlkfWApO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlcjtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICByZXNvbHZlciA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICAvLyBOT1RFIG1heSBuZWVkIHRpbWVvdXRcbiAgICB0aGlzLmFkZChiYW5uZXJFbGVtZW50LCByZXNvbHZlcik7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICB0ZW1wbGF0ZShtZXNzYWdlLCBkaXNtaXNzTGFiZWwsIGFjY2VwdExhYmVsLCB1aWQpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPG1kdy1iYW5uZXIgaWQ9XCIke3VpZH1cIiBjbGFzcz1cIm1kdy1lbGV2YXRpb24tMVwiPlxuICAgICAgICA8ZGl2PiR7bWVzc2FnZX08L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAke2Rpc21pc3NMYWJlbCA/IGA8bWR3LWJ1dHRvbiBvbmNsaWNrPVwiJHt1aWR9LmRpc21pc3MoKVwiIGNsYXNzPVwibWR3LXNlY29uZGFyeVwiPiR7ZGlzbWlzc0xhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgICAgJHthY2NlcHRMYWJlbCA/IGA8bWR3LWJ1dHRvbiBvbmNsaWNrPVwiJHt1aWR9LmFjY2VwdCgpXCIgY2xhc3M9XCJtZHctc2Vjb25kYXJ5XCI+JHthY2NlcHRMYWJlbH08L21kdy1idXR0b24+YCA6ICcnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWR3LWJhbm5lcj5cbiAgICBgO1xuICB9XG59XG5cbndpbmRvdy5NRFdCYW5uZXIgPSBNRFdCYW5uZXI7XG5cbmV4cG9ydCBkZWZhdWx0IE1EV0Jhbm5lcjtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWJvdHRvbS1uYXZpZ2F0aW9uJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIFsuLi50aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1idXR0b24nKV0uZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdtZHctYm90dG9tLW5hdmlnYXRpb24nKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1JpcHBsZSBmcm9tICcuLi8uLi9jb3JlL1JpcHBsZS5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWJ1dHRvbicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ib3VuZF9hc3luY0NsaWNrID0gdGhpcy5hc3luY0NsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9ocmVmQ2xpY2sgPSB0aGlzLmhyZWZDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfY2hlY2tIUkVGQWN0aXZlID0gdGhpcy5jaGVja0hSRUZBY3RpdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICB0aGlzLnNldHVwQXN5bmMoKTtcbiAgICB0aGlzLmNvbm5lY3RIUkVGKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBNRFdSaXBwbGUoe1xuICAgICAgZWxlbWVudDogdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpc1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2FzeW5jQ2xpY2spO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2hyZWZDbGljayk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmJvdW5kX2NoZWNrSFJFRkFjdGl2ZSk7XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMuX3NwaW5uZXJDb250YWluZXIpIHRoaXMuX3NwaW5uZXJDb250YWluZXIgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zcGlubmVyLWNvbnRhaW5lcicpO1xuICAgIHJldHVybiB0aGlzLl9zcGlubmVyQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IHBlbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ187XG4gIH1cblxuICBzZXR1cEFzeW5jKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1hc3luYycpKSByZXR1cm47XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG4gIH1cblxuICByZXNvbHZlKCkge1xuICAgIGlmICh0aGlzLnBlbmRpbmdfID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVTcGlubmVyKCk7XG4gIH1cblxuICBhc3luY0NsaWNrKGUpIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nXyA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSB0cnVlO1xuICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgfVxuXG4gIHNob3dTcGlubmVyKCkge1xuICAgIHRoaXMuX3Nob3dTcGlubmVyID0gdHJ1ZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zaG93LXNwaW5uZXInKTtcbiAgICBjb25zdCBpc1doaXRlID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1wcmltYXJ5JykgfHwgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1zZWNvbmRhcnknKSB8fCB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWVycm9yJyk7XG4gICAgdGhpcy5zcGlubmVyQ29udGFpbmVyLmlubmVySFRNTCA9IGA8bWR3LWNpcmN1bGFyLXByb2dyZXNzIG1kdy1tb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIG1kdy1kaWFtZXRlcj1cIjI0XCIgY2xhc3M9XCIke2lzV2hpdGUgPyAnbWR3LXdoaXRlJyA6ICdtZHctZ3JleSd9XCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IGNhbGMoNTAlIC0gMTJweCk7IHRvcDogNnB4O1wiPjwvbWR3LWNpcmN1bGFyLXByb2dyZXNzPmA7XG4gIH1cblxuICBoaWRlU3Bpbm5lcigpIHtcbiAgICB0aGlzLl9zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNob3ctc3Bpbm5lcicpO1xuICAgIHRoaXMuc3Bpbm5lckNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIGNvbm5lY3RIUkVGKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSkgcmV0dXJuO1xuICAgIHRoaXMuY2hlY2tIUkVGQWN0aXZlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmJvdW5kX2NoZWNrSFJFRkFjdGl2ZSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaHJlZkNsaWNrKTtcbiAgfVxuXG4gIGNoZWNrSFJFRkFjdGl2ZSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdocmVmJykpIHJldHVybjtcbiAgICBjb25zdCBocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaDtcbiAgICBpZiAoaHJlZiA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBocmVmID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZi1hbHQnKSkgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FjdGl2ZScsICdhY3RpdmUnKTtcbiAgICBlbHNlIGlmIChoYXNoID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8IGhhc2ggPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmLWFsdCcpKSB0aGlzLnNldEF0dHJpYnV0ZSgnYWN0aXZlJywgJ2FjdGl2ZScpO1xuICAgIGVsc2UgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2FjdGl2ZScpO1xuICB9XG5cbiAgaHJlZkNsaWNrKCkge1xuICAgIC8vIG9wZW4gaW4gbmV3IHRhYiAvIHdpbmRvd1xuICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0JykgPT09ICdfYmxhbmsnKSB7XG4gICAgICB3aW5kb3cub3Blbih0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpLCAnX2JsYW5rJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPjxzbG90Pjwvc2xvdD48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kdy1zcGlubmVyLWNvbnRhaW5lclwiPjwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmlwcGxlIG1kdy1idXR0b24tcmlwcGxlXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgOmhvc3Qge1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGhlaWdodDogMzZweDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA4OTI5ZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjI1cmVtO1xuICAgICAgICBtaW4td2lkdGg6IDY0cHg7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDAgOHB4IDAgOHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybSwgb3BhY2l0eTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtLW9uLXN1cmZhY2UpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1mdWxsLWhlaWdodCkge1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZnVsbC13aWR0aCkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdDo6YmVmb3JlLFxuICAgICAgOmhvc3Q6OmFmdGVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICB0b3A6IGNhbGMoNTAlIC0gMTAwJSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMTAwJSk7XG4gICAgICAgIHdpZHRoOiAyMDAlO1xuICAgICAgICBoZWlnaHQ6IDIwMCU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1mb3JlZ3JvdW5kKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3Q6OmJlZm9yZSB7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMTVtcyBsaW5lYXIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgMTVtcyBsaW5lYXI7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpob3Zlcikge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFtkaXNhYmxlZF0pIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXRleHQtLW9uLXN1cmZhY2UtLXJnYiksIDAuMzcpO1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdDo6LW1vei1mb2N1cy1pbm5lciB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOmFjdGl2ZSkge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXJhaXNlZCksXG4gICAgICA6aG9zdCgubWR3LXVuZWxldmF0ZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgICBwYWRkaW5nOiAwIDE2cHggMCAxNnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXJhaXNlZCk6OmJlZm9yZSxcbiAgICAgIDpob3N0KC5tZHctdW5lbGV2YXRlZCk6OmJlZm9yZSB7XG4gICAgICAgIG9wYWNpdHk6IDAuMDg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcmFpc2VkKSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCAycHggMnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDJweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2l0aW9uOiAtd2Via2l0LWJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgICAgICAgLW8tdHJhbnNpdGlvbjogYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC1ib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcmFpc2VkOmhvdmVyKSxcbiAgICAgIDpob3N0KC5tZHctcmFpc2VkOmZvY3VzKSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCA0cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCA0cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcmFpc2VkOmFjdGl2ZSkge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcmFpc2VkW2Rpc2FibGVkXSkge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDBweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzcpO1xuICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgcGFkZGluZzogMCAxNHB4IDAgMTRweDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2hhcGVkKSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZGVuc2UpIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICAgIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWRlbnNlLm1kdy1zaGFwZWQpIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1pY29uKSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICB3aWR0aDogNDhweDtcbiAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICBwYWRkaW5nOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWJvdHRvbS1uYXZpZ2F0aW9uKSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBtYXgtd2lkdGg6IDEwMHB4O1xuICAgICAgICB3aWR0aDogNTZweDtcbiAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgICBwYWRkaW5nOiAyOHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWljb24pIDo6c2xvdHRlZChtZHctaWNvbikge1xuICAgICAgICBsaW5lLWhlaWdodDogMzZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIHdvcmQtd3JhcDogbm9ybWFsO1xuICAgICAgICBkaXJlY3Rpb246IGx0cjtcbiAgICAgIH1cblxuICAgICAgLyogbWR3LWljb24gKi9cbiAgICAgIDo6c2xvdHRlZChtZHctaWNvbikge1xuICAgICAgICB3aWR0aDogMThweDtcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDJweDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IDo6c2xvdHRlZChzdmcubWR3LWljb24pIHtcbiAgICAgICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgICAgfVxuXG5cbiAgICAgIC8qIHByaW1hcnkgKi9cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeS5tZHctdW5lbGV2YXRlZCkgIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtLW9uLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkubWR3LW91dGxpbmVkKSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpOjpiZWZvcmUsXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpOjphZnRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuXG4gICAgICAvKiBzZWNvbmRhcnkgKi9cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIHtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeS5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5Lm1kdy11bmVsZXZhdGVkKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtLW9uLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5Lm1kdy1vdXRsaW5lZCkge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSk6OmJlZm9yZSxcbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KTo6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgLyogZXJyb3IgKi9cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvci5tZHctcmFpc2VkKSxcbiAgICAgIDpob3N0KC5tZHctZXJyb3IubWR3LXVuZWxldmF0ZWQpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS10ZXh0LS1vbi1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IubWR3LW91dGxpbmVkKSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcik6OmJlZm9yZSxcbiAgICAgIDpob3N0KC5tZHctZXJyb3IpOjphZnRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpub3QoLm1kdy1ib3R0b20tbmF2aWdhdGlvbik6aG92ZXIpOjpiZWZvcmUge1xuICAgICAgICBvcGFjaXR5OiAwLjA0O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNob3ctc3Bpbm5lcikgc3Bhbi50ZXh0IHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgIH1cblxuICAgICAgLyogLS0tIFJpcHBsZSAtLS0gKi9cblxuICAgICAgLm1kdy1yaXBwbGUge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAubWR3LXJpcHBsZS5tZHctcmlwcGxlLXVuYm91bmRlZCB7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgfVxuXG4gICAgICAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZm9yZWdyb3VuZC0tcmdiKSwgMC4xNik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSwgdHJhbnNmb3JtIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1idXR0b24tcmlwcGxlLFxuICAgICAgLm1kdy1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cblxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1wcmltYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5Lm1kdy1yYWlzZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQsXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkubWR3LXVuZWxldmF0ZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeS5tZHctcmFpc2VkKSAubWR3LXJpcHBsZS1lbGVtZW50LFxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkubWR3LXVuZWxldmF0ZWQpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguZXJyb3IubWR3LXJhaXNlZCkgLm1kdy1yaXBwbGUtZWxlbWVudCxcbiAgICAgIDpob3N0KC5lcnJvci5tZHctdW5lbGV2YXRlZCkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG5cbiAgICAgIC8qIGJvdHRvbSBuYXZpZ2F0aW9uICovXG4gICAgICA6aG9zdCgubWR3LWJvdHRvbS1uYXZpZ2F0aW9uKSBzcGFuLnRleHQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBsaW5lLWhlaWdodDogMTJweDtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWNhcmQnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWVsZXZhdGlvbi0xJyk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1jaGVja2JveCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgc3VwZXIoKTtcbiAgICAgdGhpcy5ib3VuZF9oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgfVxuXG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG5cbiAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbmRldGVybWluYXRlJykpIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpKSB0aGlzLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICAgZWxlbWVudDogdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICAgdHJpZ2dlckVsZW1lbnQ6IFt0aGlzLmlucHV0XSxcbiAgICAgICByYWRpdXM6IDIwLFxuICAgICAgIGNlbnRlcmVkOiB0cnVlXG4gICAgIH0pO1xuXG4gICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XG4gICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9oYW5kbGVDaGFuZ2UpO1xuICAgfVxuXG4gICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX2hhbmRsZUNoYW5nZSk7XG4gICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKTtcbiAgIH1cblxuICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgIHJldHVybiBbJ2NoZWNrZWQnLCAnaW5kZXRlcm1pbmF0ZScsICdkaXNhYmxlZCddO1xuICAgfVxuXG4gICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSByZXR1cm47XG4gICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgIH1cblxuICAgZ2V0IGlucHV0KCkge1xuICAgICBpZiAoIXRoaXMuaW5wdXRfKSB0aGlzLmlucHV0XyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgICByZXR1cm4gdGhpcy5pbnB1dF87XG4gICB9XG5cbiAgIGdldCBjaGVja2VkKCkge1xuICAgICByZXR1cm4gdGhpcy5pbnB1dC5jaGVja2VkO1xuICAgfVxuXG4gICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgICBpZiAodmFsdWUgPT09ICcnKSB2YWx1ZSA9IHRydWU7XG4gICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgICB0aGlzLmhhbmRsZUNoYW5nZSgpO1xuICAgfVxuXG4gICBnZXQgaW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgcmV0dXJuIHRoaXMuaW5wdXQuaW5kZXRlcm1pbmF0ZTtcbiAgIH1cblxuICAgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWUpIHtcbiAgICAgaWYgKHZhbHVlID09PSAnJykgdmFsdWUgPSB0cnVlO1xuICAgICB0aGlzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSB2YWx1ZTtcbiAgIH1cblxuICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgIHZhbHVlID0gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gJyc7XG4gICAgIGlmICh2YWx1ZSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgIGVsc2UgdGhpcy5pbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICB9XG5cbiAgIGhhbmRsZUNoYW5nZSgpIHtcbiAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICAgfVxuXG4gICB0b2dnbGUoKSB7XG4gICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICB9XG5cbiAgIHRlbXBsYXRlKCkge1xuICAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgPGRpdiBjbGFzcz1cIm1kdy1iYWNrZ3JvdW5kXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LWNoZWNrbWFya1wiPjwvZGl2PlxuICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1taXhlZG1hcmtcIj48L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXJpcHBsZSBtZHctY2hlY2tib3gtcmlwcGxlXCI+PC9kaXY+XG4gICAgIGA7XG4gICB9XG5cbiAgIHN0eWxlcygpIHtcbiAgICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgICAubWR3LWJhY2tncm91bmQ6OmJlZm9yZSB7XG4gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICB0b3A6IDA7XG4gICAgICAgICByaWdodDogMDtcbiAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCwgMCk7XG4gICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSksXG4gICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgICB3aWxsLWNoYW5nZTogb3BhY2l0eSwgdHJhbnNmb3JtO1xuICAgICAgIH1cblxuICAgICAgIC5tZHctYmFja2dyb3VuZCB7XG4gICAgICAgICBsZWZ0OiAxMXB4O1xuICAgICAgICAgcmlnaHQ6IGluaXRpYWw7XG4gICAgICAgICBkaXNwbGF5OiAtbXMtaW5saW5lLWZsZXhib3g7XG4gICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgIHRvcDogMTFweDtcbiAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICB3aWR0aDogNDUlO1xuICAgICAgICAgaGVpZ2h0OiA0NSU7XG4gICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSksXG4gICAgICAgICAgICAgICAgICAgICBib3JkZXItY29sb3IgOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICB3aWxsLWNoYW5nZTogYmFja2dyb3VuZC1jb2xvciwgYm9yZGVyLWNvbG9yO1xuICAgICAgIH1cblxuICAgICAgIDpob3N0KFtkaXI9XCJydGxcIl0pIC5tZHctYmFja2dyb3VuZCB7XG4gICAgICAgICBsZWZ0OiBpbml0aWFsO1xuICAgICAgICAgcmlnaHQ6IDExcHg7XG4gICAgICAgfVxuXG4gICAgICAgLm1kdy1jaGVja21hcmsge1xuICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICBib3R0b206IDA7XG4gICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE4MG1zIDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpO1xuICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgIH1cblxuICAgICAgIC5tZHctY2hlY2ttYXJrOmFmdGVyIHtcbiAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgIGxlZnQ6IDRweDtcbiAgICAgICAgIHRvcDogMDtcbiAgICAgICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgICAgICAgd2lkdGg6IDYuNjY2NjdweDtcbiAgICAgICAgIGhlaWdodDogMTMuMzMzMzNweDtcbiAgICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgIGJvcmRlci10b3A6IDA7XG4gICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCAubWR3LWNoZWNrbWFyayB7XG4gICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSksXG4gICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCAubWR3LW1peGVkbWFyayB7XG4gICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDApIHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKSxcbiAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA5MG1zIDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpO1xuICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgIGJvcmRlci1jb2xvcjogI2ZmZjtcbiAgICAgICB9XG5cbiAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkge1xuICAgICAgICAgLm1peGVkbWFyayB7XG4gICAgICAgICAgIG1hcmdpbjogMCAxcHg7XG4gICAgICAgICB9XG4gICAgICAgfVxuXG4gICAgICAgcGF0aCB7XG4gICAgICAgICB0cmFuc2l0aW9uOiBzdHJva2UtZGFzaG9mZnNldCAxODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgIHN0cm9rZTogY3VycmVudENvbG9yO1xuICAgICAgICAgc3Ryb2tlLXdpZHRoOiAzLjEycHg7XG4gICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjkuNzgzMzQ7XG4gICAgICAgICBzdHJva2UtZGFzaGFycmF5OiAyOS43ODMzNDtcbiAgICAgICB9XG5cblxuXG4gICAgICAgLyogLS0tIGlucHV0IC0tLSAqL1xuXG4gICAgICAgaW5wdXQge1xuICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICBjdXJzb3I6IGluaGVyaXQ7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6ZW5hYmxlZDpub3QoOmNoZWNrZWQpOm5vdCg6aW5kZXRlcm1pbmF0ZSkgKyAubWR3LWJhY2tncm91bmQge1xuICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtY2hlY2tib3hib3JkZXIpO1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6ZGlzYWJsZWQ6bm90KDpjaGVja2VkKTpub3QoOmluZGV0ZXJtaW5hdGUpICsgLm1kdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWNoZWNrYm94Ym9yZGVyZGlzYWJsZWQpO1xuICAgICAgIH1cblxuICAgICAgIGlucHV0OmRpc2FibGVkOmNoZWNrZWQgKyAubWR3LWJhY2tncm91bmQsXG4gICAgICAgaW5wdXQ6ZGlzYWJsZWQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCB7XG4gICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWNoZWNrYm94Ym9yZGVyZGlzYWJsZWQpO1xuICAgICAgIH1cblxuICAgICAgIGlucHV0OmNoZWNrZWQgKyAubWR3LWJhY2tncm91bmQsXG4gICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCB7XG4gICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSksXG4gICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yIDkwbXMgMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgIH1cblxuICAgICAgIGlucHV0OmNoZWNrZWQgKyAubWR3LWJhY2tncm91bmQgcGF0aCxcbiAgICAgICBpbnB1dDppbmRldGVybWluYXRlICsgLm1kdy1iYWNrZ3JvdW5kIHBhdGgge1xuICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6Zm9jdXMgKyAubWR3LWJhY2tncm91bmQ6OmJlZm9yZSB7XG4gICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDIuNzUsIDIuNzUpO1xuICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSA4MG1zIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA4MG1zIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbiAgICAgICAgIG9wYWNpdHk6IDAuMTI7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6ZGlzYWJsZWQge1xuICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6Y2hlY2tlZCArIC5tZHctYmFja2dyb3VuZCAubWR3LWNoZWNrbWFyayB7XG4gICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE4MG1zIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSAxODBtcyAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgIH1cblxuICAgICAgIGlucHV0OmNoZWNrZWQgKyAubWR3LWJhY2tncm91bmQgLm1kdy1taXhlZG1hcmsge1xuICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMSkgcm90YXRlKC00NWRlZyk7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCAubWR3LWNoZWNrbWFyayB7XG4gICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSksXG4gICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gOTBtcyAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKTtcbiAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgfVxuXG4gICAgICAgaW5wdXQ6aW5kZXRlcm1pbmF0ZSArIC5tZHctYmFja2dyb3VuZCAubWR3LW1peGVkbWFyayB7XG4gICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKSByb3RhdGUoMGRlZyk7XG4gICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgIH1cblxuICAgICAgIGlucHV0OmVuYWJsZWQ6Y2hlY2tlZCB+IC5tZHctYmFja2dyb3VuZCxcbiAgICAgICBpbnB1dDplbmFibGVkOmluZGV0ZXJtaW5hdGUgfiAubWR3LWJhY2tncm91bmQge1xuICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgIH1cblxuICAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgaW5wdXQ6ZW5hYmxlZDpjaGVja2VkIH4gLm1kdy1iYWNrZ3JvdW5kLFxuICAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgaW5wdXQ6ZW5hYmxlZDppbmRldGVybWluYXRlIH4gLm1kdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgIH1cblxuICAgICAgIDpob3N0KC5tZHctZXJyb3IpIGlucHV0OmVuYWJsZWQ6Y2hlY2tlZCB+IC5tZHctYmFja2dyb3VuZCxcbiAgICAgICA6aG9zdCgubWR3LWVycm9yKSBpbnB1dDplbmFibGVkOmluZGV0ZXJtaW5hdGUgfiAubWR3LWJhY2tncm91bmQge1xuICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICB9XG5cblxuXG4gICAgICAgLyogLS0tIFJpcHBsZSAtLS0gKi9cblxuICAgICAgIC5tZHctcmlwcGxlIHtcbiAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgfVxuXG4gICAgICAgLm1kdy1yaXBwbGUubWR3LXJpcHBsZS11bmJvdW5kZWQge1xuICAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICAgfVxuXG4gICAgICAgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1yZ2IpLCAwLjE2KTtcbiAgICAgICB9XG5cbiAgICAgICAubWR3LWNoZWNrYm94LXJpcHBsZSB7XG4gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICBib3R0b206IDA7XG4gICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgfVxuXG4gICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgIH1cblxuICAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgIH1cbiAgICAgYDtcbiAgIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctY2lyY3VsYXItcHJvZ3Jlc3MnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5zZXJ0ZWREaWFtZXRlcnMgPSBbXTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuZGlhbWV0ZXIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LWRpYW1ldGVyJykgfHwgMTAwO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5zdHlsZS53aWR0aCA9IHRoaXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5kaWFtZXRlciArICdweCc7XG4gICAgaWYgKHRoaXMudmFsdWUpIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsndmFsdWUnXTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gIH1cblxuICBnZXQgZGlhbWV0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyO1xuICB9XG4gIHNldCBkaWFtZXRlcih2YWx1ZSkge1xuICAgIHRoaXMuX2RpYW1ldGVyID0gcGFyc2VJbnQoKCcnK3ZhbHVlKS5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgaWYgKCF0aGlzLmluc2VydGVkRGlhbWV0ZXJzW3RoaXMuX2RpYW1ldGVyXSkge1xuICAgICAgdGhpcy5pbnNlcnRlZERpYW1ldGVycy5wdXNoKHRoaXMuX2RpYW1ldGVyKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzdHlsZScpLnNoZWV0Lmluc2VydFJ1bGUodGhpcy5fZ2V0QW5pbWF0aW9uVGV4dCgpLCAwKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3ZnKCkge1xuICAgIGlmICghdGhpcy5fc3ZnKSB0aGlzLl9zdmcgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG4gICAgcmV0dXJuIHRoaXMuX3N2ZztcbiAgfVxuXG4gIGdldCBzdHJva2VXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3Ryb2tlV2lkdGggfHwgdGhpcy5kaWFtZXRlciAvIDEwO1xuICB9XG4gIHNldCBzdHJpa2VXaWR0aCh2YWx1ZSkge1xuICAgIHRoaXMuX3N0cm9rZVdpZHRoID0gcGFyc2VJbnQoKCcnK3ZhbHVlKS5yZXBsYWNlKCdweCcsICcnKSk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCBwYXJzZUludCgoJycrdmFsdWUpLnJlcGxhY2UoJ3B4JywgJycpKSkpO1xuICAgIGlmICh0aGlzLmRpYW1ldGVyID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICB0aGlzLmNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gKHRoaXMuX3N0cm9rZUNpcmN1bWZlcmVuY2UgKiAoMTAwIC0gdGhpcy5fdmFsdWUpIC8gMTAwKSArICdweCc7XG4gIH1cblxuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy1tb2RlJykgPT09ICdkZXRlcm1pbmF0ZScgPyAnZGV0ZXJtaW5hdGUnIDogJ2luZGV0ZXJtaW5hdGUnO1xuICB9XG5cbiAgZ2V0IGNpcmNsZSgpIHtcbiAgICBpZiAoIXRoaXMuX2NpcmNsZSkgdGhpcy5fY2lyY2xlID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2NpcmNsZScpO1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGU7XG4gIH1cblxuICBnZXQgX2NpcmNsZVJhZGl1cygpIHtcbiAgICByZXR1cm4gKHRoaXMuZGlhbWV0ZXIgLSAxMCkgLyAyO1xuICB9XG5cbiAgZ2V0IF9jaXJjbGVTdHJva2VXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJva2VXaWR0aCAvIHRoaXMuZGlhbWV0ZXIgKiAxMDA7XG4gIH1cblxuICBnZXQgX3N0cm9rZUNpcmN1bWZlcmVuY2UoKSB7XG4gICAgcmV0dXJuIDIgKiBNYXRoLlBJICogdGhpcy5fY2lyY2xlUmFkaXVzO1xuICB9XG5cbiAgZ2V0IElOREVURVJNSU5BVEVfQU5JTUFUSU9OX1RFTVBMQVRFKCkge1xuICAgIHJldHVybiBgXG4gICAgIEBrZXlmcmFtZXMgbWF0LXByb2dyZXNzLXNwaW5uZXItc3Ryb2tlLXJvdGF0ZS1ESUFNRVRFUiB7XG4gICAgICAgIDAlICAgICAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTsgfVxuICAgICAgICAxMi41JSAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7IH1cbiAgICAgICAgMTIuNTAwMSUgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDcyLjVkZWcpOyB9XG4gICAgICAgIDI1JSAgICAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoNzIuNWRlZyk7IH1cbiAgICAgICAgMjUuMDAwMSUgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7IH1cbiAgICAgICAgMzcuNSUgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7IH1cbiAgICAgICAgMzcuNTAwMSUgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDE2MS41ZGVnKTsgfVxuICAgICAgICA1MCUgICAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDE2MS41ZGVnKTsgfVxuICAgICAgICA1MC4wMDAxJSAgeyBzdHJva2UtZGFzaG9mZnNldDogU1RBUlRfVkFMVUU7ICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDYyLjUlICAgeyBzdHJva2UtZGFzaG9mZnNldDogRU5EX1ZBTFVFOyAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDYyLjUwMDElICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBFTkRfVkFMVUU7ICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgyNTEuNWRlZyk7IH1cbiAgICAgICAgNzUlICAgICB7IHN0cm9rZS1kYXNob2Zmc2V0OiBTVEFSVF9WQUxVRTsgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgyNTEuNWRlZyk7IH1cbiAgICAgICAgNzUuMDAwMSUgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDg3LjUlICAgeyBzdHJva2UtZGFzaG9mZnNldDogRU5EX1ZBTFVFOyAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7IH1cbiAgICAgICAgODcuNTAwMSUgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IEVORF9WQUxVRTsgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDM0MS41ZGVnKTsgfVxuICAgICAgICAxMDAlICAgIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IFNUQVJUX1ZBTFVFOyAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDM0MS41ZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICBfZ2V0QW5pbWF0aW9uVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5JTkRFVEVSTUlOQVRFX0FOSU1BVElPTl9URU1QTEFURVxuICAgICAgLnJlcGxhY2UoL1NUQVJUX1ZBTFVFL2csIGAkezAuOTUgKiB0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlfWApXG4gICAgICAucmVwbGFjZSgvRU5EX1ZBTFVFL2csIGAkezAuMiAqIHRoaXMuX3N0cm9rZUNpcmN1bWZlcmVuY2V9YClcbiAgICAgIC5yZXBsYWNlKC9ESUFNRVRFUi9nLCBgJHt0aGlzLmRpYW1ldGVyfWApO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDogJHt0aGlzLmRpYW1ldGVyfXB4OyBoZWlnaHQ6ICR7dGhpcy5kaWFtZXRlcn1weDtcIj5cbiAgICAgICAgPGNpcmNsZVxuICAgICAgICAgIGN4PVwiNTAlXCJcbiAgICAgICAgICBjeT1cIjUwJVwiXG4gICAgICAgICAgcj1cIiR7dGhpcy5fY2lyY2xlUmFkaXVzfVwiXG4gICAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lci1zdHJva2Utcm90YXRlLSR7dGhpcy5kaWFtZXRlcn07XG4gICAgICAgICAgICBzdHJva2UtZGFzaGFycmF5OiAke3RoaXMuX3N0cm9rZUNpcmN1bWZlcmVuY2V9cHg7XG4gICAgICAgICAgICBzdHJva2Utd2lkdGg6ICR7dGhpcy5fY2lyY2xlU3Ryb2tlV2lkdGh9JTtcbiAgICAgICAgICBcIlxuICAgICAgICAgID48L2NpcmNsZT5cbiAgICAgIDwvc3ZnPlxuICAgIGA7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgc3ZnIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIGNpcmNsZSB7XG4gICAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IHN0cm9rZS1kYXNob2Zmc2V0IDIyNW1zIGxpbmVhcjtcbiAgICAgICAgc3Ryb2tlOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctd2hpdGUpIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZTogd2hpdGU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZ3JleSkgY2lyY2xlIHtcbiAgICAgICAgc3Ryb2tlOiBncmV5O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSkgY2lyY2xlIHtcbiAgICAgICAgc3Ryb2tlOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgY2lyY2xlIHtcbiAgICAgICAgc3Ryb2tlOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdChbbWR3LW1vZGU9J2luZGV0ZXJtaW5hdGUnXSkge1xuICAgICAgICBhbmltYXRpb246IG1hdC1wcm9ncmVzcy1zcGlubmVyLWxpbmVhci1yb3RhdGUgMjAwMG1zIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoW21kdy1tb2RlPSdpbmRldGVybWluYXRlJ10pIGNpcmNsZSB7XG4gICAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IHN0cm9rZTtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MDAwbXM7XG4gICAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgbWF0LXByb2dyZXNzLXNwaW5uZXItbGluZWFyLXJvdGF0ZSB7XG4gICAgICAgIDAlICAgICAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgMTAwJSAgICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgbWF0LXByb2dyZXNzLXNwaW5uZXItc3Ryb2tlLXJvdGF0ZS0xMDAge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcbiAgICAgICAgfVxuICAgICAgICAxMi41JSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcbiAgICAgICAgfVxuICAgICAgICAxMi41MDAxJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDU2LjU0ODY2NzdweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoNzIuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMjUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMjY4LjYwNjE3MTU3NXB4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSg3Mi41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAyNS4wMDAxJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDM3LjUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMzcuNTAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDE2MS41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDE2MS41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA1MC4wMDAxJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgNjIuNTAwMSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDI1MS41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA3NSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAyNjguNjA2MTcxNTc1cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlKDI1MS41ZGVnKTtcbiAgICAgICAgfVxuICAgICAgICA3NS4wMDAxJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgODcuNSUge1xuICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA1Ni41NDg2Njc3cHg7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDg3LjUwMDElIHtcbiAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNTYuNTQ4NjY3N3B4O1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZSgzNDEuNWRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI2OC42MDYxNzE1NzVweDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGUoMzQxLjVkZWcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV0RpYWxvZyBmcm9tICcuL3NlcnZpY2UuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1kaWFsb2cnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfb25QYW5lbENsb3NlID0gdGhpcy5vblBhbmVsQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsaWNrT3V0c2lkZUNsb3NlXyA9IGZhbHNlO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5wYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG5cbiAgICBpZiAodGhpcy5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5iYWNrZHJvcC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHBhbmVsKCkge1xuICAgIGlmICghdGhpcy5wYW5lbF8pIHRoaXMucGFuZWxfID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctcGFuZWwnKTtcbiAgICByZXR1cm4gdGhpcy5wYW5lbF87XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25fIHx8ICdjZW50ZXIgY2VudGVyJztcbiAgfVxuXG4gIHNldCBwb3NpdGlvbih2YWx1ZSkge1xuICAgIHRoaXMucG9zaXRpb25fID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY2xpY2tPdXRzaWRlQ2xvc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpY2tPdXRzaWRlQ2xvc2VfO1xuICB9XG5cbiAgc2V0IGNsaWNrT3V0c2lkZUNsb3NlKHZhbHVlKSB7XG4gICAgdGhpcy5jbGlja091dHNpZGVDbG9zZV8gPSB2YWx1ZTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5wYW5lbC5ob2lzdFRvQm9keSgpO1xuICAgIHRoaXMucGFuZWwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gICAgdGhpcy5wYW5lbC5vcGVuKCk7XG4gICAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdycpO1xuICAgIC8vIFRPRE8gZmluZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHBvc2l0aW9uaW5nIGFnYWluc3QgYm9keS5cbiAgICAvLyB0aGlzLnBhbmVsLnNldFBvc2l0aW9uU3R5bGUoZG9jdW1lbnQuYm9keSk7XG5cbiAgICB0aGlzLmJhY2tkcm9wID0gTURXVXRpbHMuYWRkQmFja2Ryb3AodGhpcy5wYW5lbCwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tPdXRzaWRlQ2xvc2UgPT09IHRydWUpIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgICBNRFdVdGlscy5sb2NrUGFnZVNjcm9sbCgpO1xuICB9XG5cbiAgY2xvc2Uob2spIHtcbiAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25QYW5lbENsb3NlKTtcbiAgICB0aGlzLnBhbmVsLmNsb3NlKCk7XG4gICAgTURXVXRpbHMudW5sb2NrUGFnZVNjcm9sbCgpO1xuICAgIHRoaXMuYmFja2Ryb3AucmVtb3ZlKCk7XG4gICAgdGhpcy5iYWNrZHJvcCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpc3BhdGNoQ2xvc2Uob2spO1xuICB9XG5cbiAgb25QYW5lbENsb3NlKCkge1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaENsb3NlKGlzT2sgPSBmYWxzZSkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Nsb3NlJywge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIG9rOiBpc09rXG4gICAgICB9XG4gICAgfSkpO1xuICB9XG59KTtcbiIsImNvbnN0IE1EV0RpYWxvZyA9IG5ldyBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudERpYWxvZyA9IG51bGw7XG4gIH1cblxuICBzaG93KHsgdGl0bGUsIG1lc3NhZ2UsIG9rTGFiZWwsIGNhbmNlbExhYmVsLCBwb3NpdGlvbiA9ICdjZW50ZXIgY2VudGVyJywgY2xpY2tPdXRzaWRlQ2xvc2UgPSBmYWxzZSB9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLnVpZCgpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHsgaWQsIHRpdGxlLCBtZXNzYWdlLCBva0xhYmVsLCBjYW5jZWxMYWJlbCwgcG9zaXRpb24gfSk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuICAgICAgY29uc3Qgb25jbG9zZSA9IChlKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZS5kZXRhaWwub2spO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGlhbG9nID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgZWwuY2xpY2tPdXRzaWRlQ2xvc2UgPSBjbGlja091dHNpZGVDbG9zZTtcbiAgICAgIHRoaXMuY3VycmVudERpYWxvZyA9IGVsO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWwuc2hvdygpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDdXJyZW50KCkge1xuICAgIHRoaXMuY3VycmVudERpYWxvZy5jbG9zZSgpO1xuICB9XG5cbiAgdWlkKCkge1xuICAgIHJldHVybiBgZGlhbG9nXyR7cGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDk5OTk5KX1gO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBpZCwgdGl0bGUsIG1lc3NhZ2UsIG9rTGFiZWwsIGNhbmNlbExhYmVsLCBwb3NpdGlvbiB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxtZHctZGlhbG9nIGlkPVwiJHtpZH1cIj5cbiAgICAgICAgPG1kdy1wYW5lbCBtZHctcG9zaXRpb249XCIke3Bvc2l0aW9ufVwiPlxuICAgICAgICAgIDxtZHctZGlhbG9nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICR7ISF0aXRsZSA/IGA8bWR3LWRpYWxvZy10aXRsZT4ke3RpdGxlfTwvbWR3LWRpYWxvZy10aXRsZT5gIDogJyd9XG4gICAgICAgICAgICA8bWR3LWRpYWxvZy1jb250ZW50PiR7bWVzc2FnZX08L21kdy1kaWFsb2ctY29udGVudD5cbiAgICAgICAgICAgIDxtZHctZGlhbG9nLWFjdGlvbnM+XG4gICAgICAgICAgICAgICR7ISFjYW5jZWxMYWJlbCA/IGA8bWR3LWJ1dHRvbiBjbGFzcz1cIm1kdy1lcnJvclwiIG9uY2xpY2s9XCIke2lkfS5jbG9zZShmYWxzZSlcIj4ke2NhbmNlbExhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgICAgICAgICR7ISFva0xhYmVsID8gYDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke2lkfS5jbG9zZSh0cnVlKVwiPiR7b2tMYWJlbH08L21kdy1idXR0b24+YCA6ICcnfVxuICAgICAgICAgICAgPC9tZHctZGlhbG9nLWFjdGlvbnM+XG4gICAgICAgICAgPC9tZHctZGlhbG9nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZHctcGFuZWw+XG4gICAgICA8L21kdy1kaWFsb2c+XG4gICAgYDtcbiAgfVxufVxuXG53aW5kb3cuTURXRGlhbG9nID0gTURXRGlhbG9nO1xuXG5leHBvcnQgZGVmYXVsdCBNRFdEaWFsb2c7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1kcmF3ZXInLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfbmF2aWdhdGlvbkNoYW5nZSA9IHRoaXMubmF2aWdhdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaXNTaG93aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmlnaHRBbGlnbmVkID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ3JpZ2h0LWFsaWduZWQnKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1hY3RpdmUnKTtcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUgJiYgIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctbG9ja2VkLW9wZW4tbW9iaWxlJykpIHtcbiAgICAgIHRoaXMudW5sb2NrT3BlbigpO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZml4ZWRFbCA9IHRoaXMuZml4ZWRFbGVtZW50O1xuICAgIGlmIChmaXhlZEVsKSBmaXhlZEVsLnN0eWxlLndpZHRoID0gYCR7dGhpcy5vZmZzZXRXaWR0aH1weGA7XG5cbiAgICAvLyBhZGQgc3BhY2luZyBmb3Igc2Nyb2xsXG4gICAgaWYgKHRoaXMuY29udGVudEVsZW1lbnQpIHRoaXMuY29udGVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoMTAwJSAtICR7dGhpcy5jb250ZW50RWxlbWVudC5vZmZzZXRUb3AgKyAxOH1weClgO1xuXG4gICAgdGhpcy5zZXR1cEljb25CYXIoKTtcblxuICAgIHRoaXMubG9ja0JvZHkoKTtcbiAgICB0aGlzLmFkZENsb3NlT25DaGFuZ2UoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9uYXZpZ2F0aW9uQ2hhbmdlKTtcbiAgfVxuXG4gIGdldCBpc0xvY2tlZE9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctbG9ja2VkLW9wZW4nKTtcbiAgfVxuXG4gIGdldCBoZWFkZXJFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1kcmF3ZXItaGVhZGVyJyk7XG4gIH1cblxuICBnZXQgY29udGVudEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWRyYXdlci1jb250ZW50Jyk7XG4gIH1cblxuICBnZXQgaWNvbkJhckVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LWRyYXdlci1pY29uLWJhcicpO1xuICB9XG5cbiAgZ2V0IGZpeGVkRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctZHJhd2VyLWZpeGVkJyk7XG4gIH1cblxuICBhZGRDbG9zZU9uQ2hhbmdlKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9uYXZpZ2F0aW9uQ2hhbmdlKTtcbiAgfVxuXG4gIGxvY2tPcGVuKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gIH1cblxuICB1bmxvY2tPcGVuKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gIH1cblxuICBuYXZpZ2F0aW9uQ2hhbmdlKCkge1xuICAgIGlmICghdGhpcy5pc0xvY2tlZE9wZW4pIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1jbG9zZWQnKTtcbiAgICBpZiAodGhpcy5pc0xvY2tlZE9wZW4pIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gICAgICB0aGlzLndhc0xvY2tlZE9wZW4gPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuXG4gICAgaWYgKCF0aGlzLmljb25CYXJFbGVtZW50KSByZXR1cm47XG4gICAgdGhpcy5pY29uQmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdycpO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcbiAgICAgIHRoYXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZSk7XG4gICAgICB0aGF0LmNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21kdy1oaWRlJyk7XG4gICAgICB0aGF0LmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWhpZGUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctY2xvc2VkJyk7XG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgY2FsYygxMDAlIC0gJHt0aGlzLmNvbnRlbnRFbGVtZW50Lm9mZnNldFRvcH1weClgO1xuICAgIGlmICh0aGlzLndhc0xvY2tlZE9wZW4pIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWxvY2tlZC1vcGVuJyk7XG4gICAgZWxzZSBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHRoaXMuYWRkQmFja2Ryb3AoKTtcbiAgICB0aGlzLmlzU2hvd2luZyA9IHRydWU7XG5cbiAgICAvLyBhZGQgc3BhY2luZyBmb3Igc2Nyb2xsXG4gICAgaWYgKHRoaXMuY29udGVudEVsZW1lbnQpIHRoaXMuY29udGVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoMTAwJSAtICR7dGhpcy5jb250ZW50RWxlbWVudC5vZmZzZXRUb3AgKyAxOH1weClgO1xuXG4gICAgaWYgKCF0aGlzLmljb25CYXJFbGVtZW50KSByZXR1cm47XG4gICAgdGhpcy5pY29uQmFyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctc2hvdycpO1xuICAgIHRoaXMuY29udGVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWhpZGUnKTtcbiAgICB0aGlzLmhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWhpZGUnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTaG93aW5nKSB0aGlzLnNob3coKTtcbiAgICBlbHNlIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgYWRkQmFja2Ryb3AoKSB7XG4gICAgdGhpcy5iYWNrZHJvcCA9IE1EV1V0aWxzLmFkZEJhY2tkcm9wKHRoaXMsICgpID0+IHRoaXMuaGlkZSgpLCB7IGRyYXdlcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIC8vIHRoaXMgbWFrZXMgc3VyZSB0aGVyZSBhcmUgbm8gc2Nyb2xsaW5nIGlzc3VlcyBpZiB0aGUgZHJhd2VyIGlzIGxvY2tlZCBvcGVuIGFuZCB5b3Ugd2FudCBpdCBmaXhlZFxuICBsb2NrQm9keSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmlzTG9ja2VkT3BlbiAvLyBpcyBpbiBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAmJiB0aGlzLmZpeGVkRWxlbWVudCAvLyBzaG91bGQgYmUgZml4ZWRcbiAgICAgICYmIHRoaXMucGFyZW50Tm9kZSA9PT0gZG9jdW1lbnQuYm9keSAvLyBkcmF3IGlzIGRpcmVjdGx5IGluIGJvZHlcbiAgICAgICYmICFNRFdVdGlscy5pc01vYmlsZSAvLyBvbmx5IHZhbGlkIGluIG5vbiBtb2JpbGVcbiAgICAgICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlID4gbWR3LWNvbnRlbnQnKSAvLyBjb250YWlucyBuZXNzYWNhcnkgZWxlbWVudHMgdG8gbWFrZSBzdXJlIHNjcm9sbGluZyB3aWxsIHN0aWxsIHdvcmtcbiAgICApIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncHJldmVudC1vdmVyLXNjcm9sbCcpO1xuICB9XG5cblxuICAvLyB5b3UgY2FuIGFkZCBhbiBpY29uYmFyLlxuICAvLyB3aGVuIHRoZSBkcmF3ZXIgaXMgY2xvc2VkIGl0IHdpbGwgbWluaW1pemUgdG8gc2hvdyB0aGUgaWNvbiBiYXIgaW5zdGVhZCBvZiBjb21wbGV0bHkgaGlkaW5nXG4gIHNldHVwSWNvbkJhcigpIHtcbiAgICBjb25zdCBpY29uQmFyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctZHJhd2VyLWljb24tYmFyJyk7XG4gICAgaWYgKCFpY29uQmFyKSByZXR1cm47XG5cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1oYXMtaWNvbi1iYXInKTtcbiAgICB0aGlzLmhhc0ljb25CYXIgPSB0cnVlO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctZmFiJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2FzeW5jQ2xpY2sgPSB0aGlzLmFzeW5jQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICB0aGlzLnNldHVwQXN5bmMoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG5cbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWR3LXNwaW5uZXItY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LWZhYi1yaXBwbGVcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgZ2V0IGRlbnNlKCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWRlbnNlJyk7XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMuX3NwaW5uZXJDb250YWluZXIpIHRoaXMuX3NwaW5uZXJDb250YWluZXIgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1zcGlubmVyLWNvbnRhaW5lcicpO1xuICAgIHJldHVybiB0aGlzLl9zcGlubmVyQ29udGFpbmVyO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgaWYgKCEhdmFsdWUgfHwgdmFsdWUgPT09ICcnKSB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IHBlbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ187XG4gIH1cblxuICBzZXR1cEFzeW5jKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1hc3luYycpKSByZXR1cm47XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfYXN5bmNDbGljayk7XG4gIH1cblxuICByZXNvbHZlKCkge1xuICAgIGlmICh0aGlzLnBlbmRpbmdfID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVTcGlubmVyKCk7XG4gIH1cblxuICBhc3luY0NsaWNrKGUpIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nXyA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIHRoaXMucGVuZGluZ18gPSB0cnVlO1xuICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgfVxuXG4gIGdldCBzcGlubmVyU3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiAncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKDUwJSAtIDEycHgpOyB0b3A6IDhweDsnO1xuICAgIHJldHVybiAncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKDUwJSAtIDE2cHgpOyB0b3A6IDEycHg7JztcbiAgfVxuXG4gIGdldCBzcGlubmVyRGlhbWV0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiAyNDtcbiAgICByZXR1cm4gMzI7XG4gIH1cblxuICBzaG93U3Bpbm5lcigpIHtcbiAgICB0aGlzLl9zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdy1zcGlubmVyJyk7XG4gICAgY29uc3QgaXNXaGl0ZSA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctcHJpbWFyeScpIHx8IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctc2Vjb25kYXJ5JykgfHwgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1lcnJvcicpO1xuICAgIHRoaXMuc3Bpbm5lckNvbnRhaW5lci5pbm5lckhUTUwgPSBgPG1kdy1jaXJjdWxhci1wcm9ncmVzcyBtZHctbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBtZHctZGlhbWV0ZXI9XCIke3RoaXMuc3Bpbm5lckRpYW1ldGVyfVwiIGNsYXNzPVwiJHtpc1doaXRlID8gJ21kdy13aGl0ZScgOiAnbWR3LWdyZXknfVwiIHN0eWxlPVwiJHt0aGlzLnNwaW5uZXJTdHlsZX1cIj48L21kdy1jaXJjdWxhci1wcm9ncmVzcz5gO1xuICB9XG5cbiAgaGlkZVNwaW5uZXIoKSB7XG4gICAgdGhpcy5fc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zaG93LXNwaW5uZXInKTtcbiAgICB0aGlzLnNwaW5uZXJDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0KC5tZHctc2hvdy1zcGlubmVyKSBzcGFuLnRleHQge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1mb3JlZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LWZhYi1yaXBwbGUsXG4gICAgICAubWR3LWZhYi1mb2N1cy1vdmVybGF5IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNlY29uZGFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtYmFja2dyb3VuZC0tcmdiKSwgMC4xNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1pY29uJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1zcmMnKSkgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBzcmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZHctc3JjJyk7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdNYXRlcmlhbCBJY29ucyc7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICAgIGRpcmVjdGlvbjogbHRyO1xuICAgICAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcbiAgICAgICAgLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcbiAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IGltZyB7XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3QoLm1kdy1wcmltYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG5cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICBjb25zdCBzcmMgPSB0aGlzLnNyYztcbiAgICBpZiAoc3JjKSByZXR1cm4gYDxpbWcgc3JjPVwiJHtzcmN9XCI+PC9pbWc+YDtcbiAgICByZXR1cm4gJzxzbG90Pjwvc2xvdD4nO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LWxpbmVhci1wcm9ncmVzcycsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5wZXJjZW50ID09PSBudWxsKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1xdWVyeScpXG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydtZHctcGVyY2VudCddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBzd2l0Y2gobmFtZSkge1xuICAgICAgY2FzZSAnbWR3LXBlcmNlbnQnOlxuICAgICAgICB0aGlzLnBlcmNlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhcigpIHtcbiAgICBpZiAoIXRoaXMuX2JhcikgdGhpcy5fYmFyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctYmFyJyk7XG4gICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgfVxuXG4gIGdldCBwZXJjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LXBlcmNlbnQnKTtcbiAgfVxuXG4gIHNldCBwZXJjZW50KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xuICAgIGlmICh2YWx1ZSA+IDEwMCkgdmFsdWUgPSAxMDA7XG4gICAgdGhpcy5iYXIuc3R5bGUud2lkdGggPSBgJHt2YWx1ZX0lYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1iYXJcIj48L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICAubWR3LWJhciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDRweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXdoaXRlKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xOCk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctd2hpdGUpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZ3JleSkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUwLCA1MCwgNTAsIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWdyZXkpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5LS1yZ2IpLCAwLjE4KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zZWNvbmRhcnkpIC5tZHctYmFyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTgpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LWJhciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cblxuICAgICAgOmhvc3QoLm1kdy1xdWVyeSkgLm1kdy1iYXIge1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XG4gICAgICAgIGFuaW1hdGlvbjogcXVlcnkgLjhzIGluZmluaXRlIGN1YmljLWJlemllcigwLjM5MCwgMC41NzUsIDAuNTY1LCAxLjAwMCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcXVlcnkge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzUlKSBzY2FsZSguMywgMSk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgc2NhbGUoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXUmlwcGxlIGZyb20gJy4uLy4uL2NvcmUvUmlwcGxlLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctbGlzdC1pdGVtJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX2hyZWZDbGljayA9IHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vblNlbGVjdCA9IHRoaXMub25TZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QgPSB0aGlzLm9uY2xpY2tTZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2NoZWNrSFJFRkFjdGl2ZSA9IHRoaXMuY2hlY2tIUkVGQWN0aXZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXQgbGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlO1xuICB9XG5cbiAgaXNTZWxlY3QoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5saXN0LnNlbGVjdFR5cGU7XG4gIH1cblxuICBzZWxlY3RPbmNsaWNrKCkge1xuICAgIHJldHVybiAhIXRoaXMubGlzdC5zZWxlY3RPbmNsaWNrO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5jb25uZWN0UmlwcGxlKCk7XG4gICAgdGhpcy5jb25uZWN0SFJFRigpO1xuICAgIHRoaXMuY29ubmVjdFNlbGVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMucmlwcGxlKSB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfaHJlZkNsaWNrKTtcbiAgICBpZiAodGhpcy5zZWxlY3RFbF8pIHRoaXMuc2VsZWN0RWxfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfb25TZWxlY3QpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9jaGVja0hSRUZBY3RpdmUpO1xuICB9XG5cbiAgY29ubmVjdFJpcHBsZSgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWR3LXJpcHBsZScpO1xuICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50LFxuICAgICAgdHJpZ2dlckVsZW1lbnQ6IHRoaXNcbiAgICB9KTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1oYXMtcmlwcGxlJyk7XG4gIH1cblxuICBjb25uZWN0SFJFRigpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdocmVmJykpIHJldHVybjtcbiAgICB0aGlzLmNoZWNrSFJFRkFjdGl2ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZF9jaGVja0hSRUZBY3RpdmUpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2hyZWZDbGljayk7XG4gIH1cblxuICBjaGVja0hSRUZBY3RpdmUoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSByZXR1cm47XG4gICAgY29uc3QgaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gICAgY29uc3QgaGFzaCA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2g7XG4gICAgaWYgKGhyZWYgPT09IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgaHJlZiA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYtYWx0JykpIHRoaXMuc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAnYWN0aXZlJyk7XG4gICAgZWxzZSBpZiAoaGFzaCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBoYXNoID09PSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZi1hbHQnKSkgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FjdGl2ZScsICdhY3RpdmUnKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhY3RpdmUnKTtcbiAgfVxuXG4gIGhyZWZDbGljaygpIHtcbiAgICAvLyBvcGVuIGluIG5ldyB0YWIgLyB3aW5kb3dcbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpID09PSAnX2JsYW5rJykge1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSwgJ19ibGFuaycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICB9XG5cbiAgb25TZWxlY3QoZSkge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB0aGlzLmxpc3QuaXRlbVNlbGVjdGVkKHRoaXMpO1xuICAgIGVsc2UgdGhpcy5saXN0Lml0ZW1EZXNlbGVjdGVkKHRoaXMpO1xuICB9XG5cbiAgb25jbGlja1NlbGVjdChlKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdE9uY2xpY2soKSkgcmV0dXJuO1xuICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5zZWxlY3RFbF8pIHJldHVybjtcbiAgICB0aGlzLnNlbGVjdEVsXy5jaGVja2VkID0gIXRoaXMuc2VsZWN0RWxfLmNoZWNrZWQ7XG4gIH1cblxuICBjb25uZWN0U2VsZWN0KCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0RWxfID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctY2hlY2tib3gnKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdEVsXykgdGhpcy5zZWxlY3RFbF8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vblNlbGVjdCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RPbmNsaWNrKCkpIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uY2xpY2tTZWxlY3QpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VsZWN0KCkge1xuICAgIHRoaXMuc2VsZWN0RWxfLmNoZWNrZWQgPSBmYWxzZTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1saXN0JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhlc18gPSBbXTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21kdy1zZWxlY3QnLCAnbWR3LXNlbGVjdC1vbmNsaWNrJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgc3dpdGNoKG5hbWUpIHtcbiAgICAgIGNhc2UgJ21kdy1zZWxlY3QnOlxuICAgICAgICB0aGlzLnNlbGVjdFR5cGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtZHctc2VsZWN0LW9uY2xpY2snOlxuICAgICAgICB0aGlzLnNlbGVjdE9uY2xpY2sgPSBuZXdWYWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0IHNlbGVjdE9uY2xpY2sodmFsdWUpIHtcbiAgICB0aGlzLnNlbGVjdE9uY2xpY2tfID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc2VsZWN0T25jbGljaygpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RPbmNsaWNrXztcbiAgfVxuXG4gIHNldCBzZWxlY3RUeXBlKHZhbHVlKSB7XG4gICAgdGhpcy5zZWxlY3RUeXBlXyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHNlbGVjdFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0VHlwZV87XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCh0aGlzLnNlbGVjdGVkSW5kZXhlc18pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgWy4uLnRoaXMuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuZGVzZWxlY3QoKSk7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfID0gW107XG4gIH1cblxuICBpdGVtU2VsZWN0ZWQobGlzdEl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5jaGlsZHJlbiwgbGlzdEl0ZW0pO1xuICAgIGlmICh0aGlzLnNlbGVjdFR5cGVfID09PSAnc2luZ2xlJykge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbLi4udGhpcy5jaGlsZHJlbl07XG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXhlc18uZm9yRWFjaChpID0+IGNoaWxkcmVuW2ldLmRlc2VsZWN0KCkpO1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXNfID0gW107XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzXy5wdXNoKGluZGV4KTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSgpO1xuICB9XG5cbiAgaXRlbURlc2VsZWN0ZWQobGlzdEl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5jaGlsZHJlbiwgbGlzdEl0ZW0pO1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzXy5zcGxpY2UodGhpcy5zZWxlY3RlZEluZGV4ZXNfLmluZGV4T2YoaW5kZXgpLCAxKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSgpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHRoaXMpKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1tZW51JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYm91bmRfb25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25QYW5lbENsaWNrID0gdGhpcy5vblBhbmVsQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSA9PT0gdHJ1ZSkgdGhpcy5jcmVhdGVTaGVldCgpO1xuICAgIGVsc2UgdGhpcy5jcmVhdGVQYW5lbCgpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uQ2xpY2spO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wYW5lbC0tY29udGFpbmVyJyk7XG4gICAgICB0aGlzLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ21kdy1tZW51Jyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGljaygpIHtcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIHRoaXMucGFuZWwuc2V0UG9zaXRpb24odGhpcy5wYW5lbFBvc2l0aW9uKTtcbiAgICAgIHRoaXMucGFuZWwuYXV0b1Bvc2l0aW9uKCk7XG4gICAgICB0aGlzLnBhbmVsLmNsaWNrQm9keVRvQ2xvc2UoKTtcbiAgICAgIHRoaXMucGFuZWwub3Blbih0cnVlKTtcbiAgICAgIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hlZXQub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFuZWxDbGljaygpIHtcbiAgICB0aGlzLnBhbmVsLmNsb3NlKCk7XG4gIH1cblxuICBzZXQgcGFuZWxQb3NpdGlvbih2YWx1ZSkge1xuICAgIC8vIFRPRE8gdmFsaWRhdGVcbiAgICB0aGlzLnBhbmVsUG9zaXRpb25fID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGFuZWxQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbFBvc2l0aW9uXyB8fCAnaW5uZXItdG9wIGlubmVyLWxlZnQnO1xuICB9XG5cbiAgZ2V0IGJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXTtcbiAgfVxuXG4gIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctbWVudS1jb250ZW50Jyk7XG4gIH1cblxuICBnZXQgcGFuZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJyk7XG4gIH1cblxuICBnZXQgc2hlZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXNoZWV0Jyk7XG4gIH1cblxuICBjcmVhdGVTaGVldCgpIHtcbiAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgPG1kdy1zaGVldCBtZHctbW9kYWw+XG4gICAgICAgIDxtZHctc2hlZXQtY29udGVudD5cbiAgICAgICAgICAke3RoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MfVxuICAgICAgICA8L21kdy1zaGVldC1jb250ZW50PlxuICAgICAgPC9tZHctc2hlZXQ+XG4gICAgYCk7XG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgfVxuXG4gIGNyZWF0ZVBhbmVsKCkge1xuICAgIGlmICghdGhpcy5jb250ZW50RWxlbWVudCkgcmV0dXJuO1xuICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICA8bWR3LXBhbmVsPlxuICAgICAgICAke3RoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MfVxuICAgICAgPC9tZHctcGFuZWw+XG4gICAgYCk7XG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG4vKiAtLS0gbWR3LXBhbmVsIC0tLVxuICogVGhlIHBhbmVsIGFsbG93cyB5b3UgdG8gY3JlYXRlIHBvc2l0aW9ucyBmbG9hdGluZyBlbGVtZW50cy5cbiAqIG1kdy1wYW5lbCBpcyB1c2VkIGZvciBtZW51LCBkaWFsb2csIHRvb2x0aXBcbiAqL1xuXG4gLy8gVE9ETyBmaXggb3BlbiBhbmQgY2xvc2UgYW5pbWF0aW9uc1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctcGFuZWwnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuRk9DVVNBQkxFX0VMRU1FTlRTID0gW1xuICAgICAgJ2J1dHRvbjpub3QoOmRpc2FibGVkKScsICdbaHJlZl06bm90KFthcmlhLWRpc2FibGVkPVwidHJ1ZVwiXSknLCAnaW5wdXQ6bm90KDpkaXNhYmxlZCknLFxuICAgICAgJ3NlbGVjdDpub3QoOmRpc2FibGVkKScsICd0ZXh0YXJlYTpub3QoOmRpc2FibGVkKScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSk6bm90KFthcmlhLWRpc2FibGVkPVwidHJ1ZVwiXSknLFxuICAgIF0uam9pbignLCAnKTtcbiAgICB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMuX2JvdW5kSGFuZGxlQm9keUNsaWNrID0gdGhpcy5faGFuZGxlQm9keUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fYm91bmRIYW5kbGVLZXlkb3duID0gdGhpcy5faGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2NsaWNrT3V0c2lkZUNsb3NlSWdub3JFbGVtZW50ID0gW107XG4gICAgdGhpcy5fYXV0b1Bvc2l0aW9uID0gZmFsc2U7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy11cGdyYWRlZCcpO1xuICAgIHRoaXMudHJhbnNmb3JtUHJvcGVydHlOYW1lID0gTURXVXRpbHMudHJhbnNmb3JtUHJvcGVydHlOYW1lO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVCb2R5Q2xpY2tFdmVudF8oKTtcbiAgICB0aGlzLnJlbW92ZUtleWRvd25FdmVudF8oKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fb3BlbkFuaW1hdGlvbkVuZFRpbWVySWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWQpO1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvblJlcXVlc3RJZCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydtZHctcG9zaXRpb24nXTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBzd2l0Y2gobmFtZSkge1xuICAgICAgY2FzZSAnbWR3LXBvc2l0aW9uJzpcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBuZXdWYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0IGNsaWNrT3V0c2lkZUNsb3NlKHZhbHVlKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldCBzZXRRdWlja09wZW4odmFsdWUpIHtcbiAgICB0aGlzLl9pc1F1aWNrT3BlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlKSB7XG4gICAgY29uc3Qgc3BsaXQgPSB2YWx1ZS5zcGxpdCgnICcpO1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gYCR7c3BsaXRbMF0gfHwgJ3RvcCd9ICR7c3BsaXRbMV0gfHwgJ2xlZnQnfWA7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21kdy1wb3NpdGlvbicsIHRoaXMuX3Bvc2l0aW9uKTtcbiAgICB0aGlzLl9wb3NpdGlvblNldCA9IHRydWU7XG4gIH1cblxuICBhdXRvUG9zaXRpb24oKSB7XG4gICAgdGhpcy5fYXV0b1Bvc2l0aW9uID0gdHJ1ZTtcbiAgfVxuXG4gIGNsaWNrQm9keVRvQ2xvc2UoKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2UgPSB0cnVlO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gIH1cblxuICBvcGVuKGNsaWNrQm9keVRvQ2xvc2UpIHtcbiAgICBpZiAoY2xpY2tCb2R5VG9DbG9zZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9jbGlja091dHNpZGVDbG9zZSA9IGNsaWNrQm9keVRvQ2xvc2U7XG4gICAgLy8gaGFuZGxlIGZvY3VzZWQgZWxlbWVudFxuICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuRk9DVVNBQkxFX0VMRU1FTlRTKTtcbiAgICB0aGlzLl9maXJzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIHRoaXMuc2F2ZUZvY3VzKCk7XG5cbiAgICAvLyBoYW5kbGUgYW5pbWF0aW9uXG4gICAgaWYgKCF0aGlzLl9pc1F1aWNrT3Blbikge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctcGFuZWwtLWFuaW1hdGluZy1vcGVuJyk7XG4gICAgICB0aGlzLl9hbmltYXRpb25SZXF1ZXN0SWQgPSB0aGlzLl9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1vcGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl9pc1F1aWNrT3BlbikgdGhpcy5ub3RpZnlPcGVuKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuX29wZW5BbmltYXRpb25FbmRUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuQW5pbWF0aW9uRW5kVGltZXJJZCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1wYW5lbC0tYW5pbWF0aW5nLW9wZW4nKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5T3BlbigpO1xuICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNIb2lzdGVkKSB0aGlzLnNldEhvaXNldGVkUG9zaXRpb24oKTtcbiAgICAgICAgZWxzZSB0aGlzLnNldFBvc2l0aW9uU3R5bGUoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1vcGVuJyk7XG4gICAgICBpZiAodGhpcy5faXNIb2lzdGVkKSB0aGlzLnNldEhvaXNldGVkUG9zaXRpb24oKTtcbiAgICAgIGVsc2UgdGhpcy5zZXRQb3NpdGlvblN0eWxlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRCb2R5Q2xpY2tFdmVudF8oKTtcbiAgICB0aGlzLmFkZEtleWRvd25FdmVudF8oKTtcbiAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xuICB9XG5cbiAgLy8gVE9ETyBGSVggVEhFIENMT1NJTkcgQU5JTUFUSU9OXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5faXNRdWlja09wZW4pIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXBhbmVsLS1hbmltYXRpbmctY2xvc2VkJyk7XG4gICAgICB0aGlzLnJlbW92ZUJvZHlDbGlja0V2ZW50XygpO1xuICAgICAgdGhpcy5fYW5pbWF0aW9uUmVxdWVzdElkID0gdGhpcy5fcnVuTmV4dEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctb3BlbicpO1xuICAgICAgICBpZiAodGhpcy5faXNRdWlja09wZW4pIHRoaXMubm90aWZ5Q2xvc2UoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2VBbmltYXRpb25FbmRUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctcGFuZWwtLWFuaW1hdGluZy1jbG9zZWQnKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlDbG9zZSgpO1xuICAgICAgICAgIH0sIDc1KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LW9wZW4nKTtcbiAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlS2V5ZG93bkV2ZW50XygpO1xuICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUm9vdEZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgIGNvbnN0IGNoaWxkSGFzRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHRoaXMuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgaWYgKGlzUm9vdEZvY3VzZWQgfHwgY2hpbGRIYXNGb2N1cykgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgfVxuXG4gIF9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZSk7XG4gICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfSk7XG4gIH1cblxuICBpc0ZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXM7XG4gIH1cblxuICBzYXZlRm9jdXMoKSB7XG4gICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICByZXN0b3JlRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiYgdGhpcy5fcHJldmlvdXNGb2N1cyAmJiB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKSB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKCk7XG4gIH1cblxuICBmb2N1c0ZpcnN0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ICYmIHRoaXMuX2ZpcnN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cykgdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKClcbiAgfVxuXG4gIGZvY3VzTGFzdEVsZW1lbnQoKSB7XG4gICAgaWYgKHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50ICYmIHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKSB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpXG4gIH1cblxuICBpc0ZpcnN0RWxlbWVudEZvY3VzZWQoKSB7XG4gICAgdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ID8gdGhpcy5fZmlyc3RGb2N1c2FibGVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogZmFsc2U7XG4gIH1cblxuICBpc0xhc3RFbGVtZW50Rm9jdXNlZCgpIHtcbiAgICB0aGlzLl9sYXN0Rm9jdXNhYmxlRWxlbWVudCA/IHRoaXMuX2xhc3RGb2N1c2FibGVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogZmFsc2U7XG4gIH1cblxuICBhZGRCb2R5Q2xpY2tFdmVudF8oKSB7XG4gICAgaWYgKCF0aGlzLl9jbGlja091dHNpZGVDbG9zZSkgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oYXNCb2R5RXZlbnQgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2JvdW5kSGFuZGxlQm9keUNsaWNrKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHJlbW92ZUJvZHlDbGlja0V2ZW50XygpIHtcbiAgICBpZiAodGhpcy5oYXNCb2R5RXZlbnQpIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9ib3VuZEhhbmRsZUJvZHlDbGljayk7XG4gICAgdGhpcy5oYXNCb2R5RXZlbnQgPSBmYWxzZTtcbiAgfVxuXG4gIGFkZEtleWRvd25FdmVudF8oKSB7XG4gICAgdGhpcy5oYXNLZXlkb3duRXZlbnQgPSB0cnVlO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2JvdW5kSGFuZGxlS2V5ZG93bik7XG4gIH1cblxuICByZW1vdmVLZXlkb3duRXZlbnRfKCkge1xuICAgIGlmICh0aGlzLmhhc0tleWRvd25FdmVudCkgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fYm91bmRIYW5kbGVLZXlkb3duKTtcbiAgICB0aGlzLmhhc0tleWRvd25FdmVudCA9IGZhbHNlO1xuICB9XG5cbiAgaWdub3JlRWxlbWVudE9uQ2xpY2tUb0Nsb3NlKGVsKSB7XG4gICAgdGhpcy5fY2xpY2tPdXRzaWRlQ2xvc2VJZ25vckVsZW1lbnQucHVzaChlbCk7XG4gIH1cblxuICBfaGFuZGxlQm9keUNsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgZWwgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKHRoaXMuX2NsaWNrT3V0c2lkZUNsb3NlSWdub3JFbGVtZW50LmluY2x1ZGVzKGVsKSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmNvbnRhaW5zKGVsKSkgcmV0dXJuO1xuICAgIHRoaXMucmVtb3ZlQm9keUNsaWNrRXZlbnRfKCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQpIHtcbiAgICBjb25zdCB7IGtleSwga2V5Q29kZSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcbiAgICBjb25zdCBpc1RhYiA9IGtleSA9PT0gJ1RhYicgfHwga2V5Q29kZSA9PT0gOTtcblxuICAgIGlmIChpc0VzY2FwZSkgdGhpcy5jbG9zZSgpO1xuICAgIGVsc2UgaWYgKGlzVGFiKSB7XG4gICAgICBpZiAodGhpcy5pc0xhc3RFbGVtZW50Rm9jdXNlZCgpICYmICFzaGlmdEtleSkge1xuICAgICAgICB0aGlzLmZvY3VzRmlyc3RFbGVtZW50KCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNGaXJzdEVsZW1lbnRGb2N1c2VkKCkgJiYgc2hpZnRLZXkpIHtcbiAgICAgICAgdGhpcy5mb2N1c0xhc3RFbGVtZW50KCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5Q2xvc2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnTURXUGFuZWw6Y2xvc2VkJywgdGhpcykpO1xuICB9XG5cbiAgbm90aWZ5T3BlbigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdNRFdQYW5lbDpvcGVuJyksIHRoaXMpO1xuICB9XG5cbiAgaG9pc3RUb0JvZHkodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuX2lzSG9pc3RlZCkgcmV0dXJuO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IHRhcmdldCB8fCB0aGlzLnBhcmVudE5vZGU7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wYW5lbC1ob2lzdGVkJyk7XG4gICAgdGhpcy5faXNIb2lzdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9hdXRvUG9zaXRpb25Ib2lzdGVkKCkge1xuICAgIGlmICghdGhpcy5fYXV0b1Bvc2l0aW9uKSByZXR1cm47XG5cbiAgICBjb25zdCBwYWdlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcGFuZWxIZWlnaHQgPSB0aGlzLm9mZnNldEhlaWdodDtcbiAgICBsZXQgcGFuZWxZID0gdGhpcy5vZmZzZXRUb3A7XG5cbiAgICAvLyBpZiBwYW5lbCBpcyBvdXQgb2Ygd2luZG93IHkgYm91bmRzXG4gICAgaWYgKHBhbmVsWSArIHBhbmVsSGVpZ2h0ID4gcGFnZUhlaWdodCkge1xuICAgICAgaWYgKHBhbmVsSGVpZ2h0IDw9IHBhZ2VIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgbWF4VG9wID0gcGFnZUhlaWdodCAtIHBhbmVsSGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0ID0gcGFuZWxZIC0gbWF4VG9wO1xuXG4gICAgICAgIC8vIGFkZCBwYWRkaW5nIHRvIG9mZnNldCwgdGhpcyB3aWxsIHByZXZlbnQgcGFuZWwgZnJvbSBidXR0aW5nIHVwIGFnYWluc3QgYm90dG9tXG4gICAgICAgIGlmIChvZmZzZXQgPiAyMCkgb2Zmc2V0ICs9IDEwO1xuICAgICAgICBlbHNlIG9mZnNldCAvPSAyO1xuXG4gICAgICAgIHBhbmVsWSAtPSBvZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZS50b3AgPSBgJHtwYW5lbFl9cHhgO1xuICB9XG5cbiAgc2V0SG9pc2V0ZWRQb3NpdGlvbigpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLl9jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zdHlsZS50b3AgPSBgJHtib3VuZHMudG9wfXB4YDtcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHtib3VuZHMubGVmdH1weGA7XG4gICAgdGhpcy5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSAnc2NhbGUoMSknO1xuXG4gICAgaWYgKCF0aGlzLl9wb3NpdGlvblNldCkge1xuICAgICAgdGhpcy5fYXV0b1Bvc2l0aW9uSG9pc3RlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG9wID0gMDtcbiAgICAgIGxldCBsZWZ0ID0gMDtcblxuICAgICAgdGhpcy5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xuICAgICAgdGhpcy5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgYVZhbHVlID0gdGhpcy5wb3NpdGlvbi5zcGxpdCgnICcpWzBdO1xuICAgICAgICBjb25zdCBiVmFsdWUgPSB0aGlzLnBvc2l0aW9uLnNwbGl0KCcgJylbMV07XG5cbiAgICAgICAgc3dpdGNoKGFWYWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0b3AgPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaW5uZXItdG9wJzpcbiAgICAgICAgICAgIHRvcCA9IGJvdW5kcy55ICsgMTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdG9wID0gY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIHRvcCA9IChjbGllbnRIZWlnaHQgLyAyKSAtIChoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2lubmVyLWJvdHRvbSc6XG4gICAgICAgICAgICB0b3AgPSBjbGllbnRIZWlnaHQgLSBoZWlnaHQgLSAxMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGJWYWx1ZSkge1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgbGVmdCA9IC13aWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2lubmVyLWxlZnQnOlxuICAgICAgICAgICAgbGVmdCA9IGJvdW5kcy54ICsgMTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICBsZWZ0ID0gY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdpbm5lci1yaWdodCc6XG4gICAgICAgICAgICBsZWZ0ID0gY2xpZW50V2lkdGggLSB3aWR0aCAtIDEyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIGxlZnQgPSAoY2xpZW50V2lkdGggLyAyKSAtICh3aWR0aCAvIDIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0eWxlLndpZHRoID0gYCR7dGhpcy53aWR0aH1weGA7XG4gICAgICAgIHRoaXMuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcbiAgICAgICAgdGhpcy5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuXG4gIHNldFBvc2l0aW9uU3R5bGUocGFyZW50T3ZlcnJpZGUpIHtcbiAgICBpZiAocGFyZW50T3ZlcnJpZGUpIHRoaXMuX3BhcmVudE92ZXJyaWRlID0gcGFyZW50T3ZlcnJpZGU7XG4gICAgZWxzZSBpZiAodGhpcy5fcGFyZW50T3ZlcnJpZGUpIHBhcmVudE92ZXJyaWRlID0gdGhpcy5fcGFyZW50T3ZlcnJpZGU7XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgbGV0IHBhcmVudFdpZHRoID0gMDtcbiAgICBsZXQgcGFyZW50SGVpZ2h0ID0gMDtcbiAgICBpZiAocGFyZW50T3ZlcnJpZGUpIHtcbiAgICAgIHBhcmVudFdpZHRoID0gcGFyZW50T3ZlcnJpZGUub2Zmc2V0V2lkdGg7XG4gICAgICBwYXJlbnRIZWlnaHQgPSBwYXJlbnRPdmVycmlkZS5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Lm5vZGVOYW1lID09PSAnTURXLVNOQUNLQkFSJykgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICBjb25zdCBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcGFyZW50V2lkdGggPSBwYXJlbnRSZWN0LndpZHRoO1xuICAgICAgcGFyZW50SGVpZ2h0ID0gcGFyZW50UmVjdC5oZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gdXNlIG9mZnNldCB3aXRoIGFuZCBoZWlnaHQgdG8gYXZvaWQgcHJvYmxlbXMgZHVlIHRvIHRyYW5zZm9ybTogc2NhbGUoKVxuICAgIC8vIHVzaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCB3aWxsIHJldHVybiB0aGUgYWRqdXN0ZWQgd2lkdGggYmFzZWQgb24gdGhlIHNjYWxlIGZhY3RvclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBhVmFsdWUgPSBwb3NpdGlvbi5zcGxpdCgnICcpWzBdO1xuICAgIGNvbnN0IGJWYWx1ZSA9IHBvc2l0aW9uLnNwbGl0KCcgJylbMV07XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgc3dpdGNoKGFWYWx1ZSkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wID0gLWhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0b3AgPSBwYXJlbnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgdG9wID0gKHBhcmVudEhlaWdodCAvIDIpIC0gKGhlaWdodCAvIDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lubmVyLWJvdHRvbSc6XG4gICAgICAgIHRvcCA9IHBhcmVudEhlaWdodCAtIGhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoKGJWYWx1ZSkge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGxlZnQgPSAtd2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBsZWZ0ID0gcGFyZW50V2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5uZXItcmlnaHQnOlxuICAgICAgICBsZWZ0ID0gcGFyZW50V2lkdGggLSB3aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBsZWZ0ID0gKHBhcmVudFdpZHRoIC8gMikgLSAod2lkdGggLyAyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2F1dG9Qb3NpdGlvbikge1xuICAgICAgY29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBjb25zdCB7IHg6IGdsb2JhbFgsIHk6IGdsb2JhbFkgfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoKGdsb2JhbFkgKyBoZWlnaHQpID4gY2xpZW50SGVpZ2h0KSB0b3AgPSBwYXJlbnRIZWlnaHQgLSBoZWlnaHQ7XG4gICAgICBpZiAoKGdsb2JhbFggKyB3aWR0aCkgPiBjbGllbnRXaWR0aCkgbGVmdCA9IHBhcmVudFdpZHRoIC0gd2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh0b3ApfXB4YDtcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludChsZWZ0KX1weGA7XG4gICAgdGhpcy5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSAnc2NhbGUoMSknO1xuICB9XG5cbiAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnRvcCA9ICcnO1xuICAgIHRoaXMuc3R5bGUubGVmdCA9ICcnO1xuICAgIHRoaXMuc3R5bGVbdGhpcy50cmFuc2Zvcm1Qcm9wZXJ0eU5hbWVdID0gJyc7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctcmFkaW8tZ3JvdXAnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy12YWx1ZScpO1xuICAgIC8vIHRoaXMuYm91bmRfY2hhbmdlID0gdGhpcy5jaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAvLyAgIHRoaXMucmFkaW9zLmZvckVhY2gociA9PiByLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfY2hhbmdlKSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gZGlzb2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAvLyAgIHRoaXMucmFkaW9zLmZvckVhY2gociA9PiByLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfY2hhbmdlKSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gY2hhbmdlKGUpIHtcbiAgLy8gICBjb25zb2xlLmxvZyhlKTtcbiAgLy8gfVxuICAvL1xuICAvLyBnZXQgcmFkaW9zKCkge1xuICAvLyAgIHJldHVybiBbLi4udGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdtZHctcmFkaW8nKV07XG4gIC8vIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1yYWRpbycsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gaW5wdXQgcmFkaW8gd2lsbCBub3Qgd29yayBjb3JyZWN0bHkgaW4gc2hhZG93cm9vdFxuICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLnJpcHBsZVRlbXBsYXRlKCkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZS5pbml0aWFsVmFsdWUgPT09IHRoaXMudmFsdWUpIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gICAgaWYgKCF0aGlzLmlucHV0Lmhhc0F0dHJpYnV0ZSgndHlwZScpKSB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYWRpbycpO1xuICAgIGlmICghdGhpcy5pbnB1dC5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICB0cmlnZ2VyRWxlbWVudDogW3RoaXMuaW5wdXRdLFxuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIGNlbnRlcmVkOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XG4gICAgICB0aGlzLm5hbWVfID0gdGhpcy5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkge1xuICAgICAgdGhpcy5uYW1lXyA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG5hbWUgaWYgb25lIHdhcyBub3QgcHJvdmlkZWRcbiAgICAvLyBuYW1lIGlzIHJlcXVpcmVkIGZvciByYWRpbyBidXR0b25zIHRvIHdvcmtcbiAgICBpZiAoIXRoaXMubmFtZV8pIHtcbiAgICAgIHRoaXMubmFtZV8gPSBNRFdVdGlscy51aWQoKTtcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHRoaXMucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLm5hbWVfKTtcbiAgICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLm5hbWVfKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmFtZV87XG4gIH1cblxuICByaXBwbGVUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yYWRpby1iYWNrZ3JvdW5kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmFkaW9fX291dGVyLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXJhZGlvX19pbm5lci1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LXJhZGlvLXJpcHBsZVwiPjwvZGl2PlxuICAgIGA7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdVdGlscyBmcm9tICcuLi8uLi9jb3JlL1V0aWxzLmpzJztcblxuLy8gVE9ETyBpbXBsYWVudCB2YWxpZGl0eVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zZWxlY3QnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zZXR1cExhYmVsXygpO1xuICAgIGlmICh0aGlzLmlzRW5oYW5jZWRfKSB0aGlzLnByZXBhcmVFbmhhbmNlXygpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LW5vLWFuaW1hdGlvbicpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSh0cnVlKTtcblxuICAgIHRoaXMuYm91bmRfb25Gb2N1cyA9IHRoaXMub25Gb2N1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25CbHVyID0gdGhpcy5vbkJsdXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25QYW5lbENsaWNrID0gdGhpcy5vblBhbmVsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRfKSB0aGlzLnZhbHVlID0gdGhpcy5zZWxlY3RlZF8udmFsdWU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcigncmVuZGVyLWJsb2NrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uQ2xpY2spO1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZF9vbktleURvd24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmJvdW5kX29uRm9jdXMpO1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJvdW5kX29uQmx1cik7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZF9vbkNoYW5nZSk7XG4gICAgfVxuXG4gICAgLy8gY2FwdHVyZSBvcHRpb24gc2VsZWN0ZWQgYXR0cmlidXRlIGFuZCBmbG9hdCB0aGUgbGFiZWxcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LW5vLWFuaW1hdGlvbicpO1xuXG4gICAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykge1xuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLm1pbldpZHRoID0gYCR7dGhpcy5vZmZzZXRXaWR0aH1weGA7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykge1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3JlbmRlci1ibG9jaycpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vbkNsaWNrKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRfb25LZXlEb3duKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5ib3VuZF9vbkZvY3VzKTtcbiAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRfb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBpZiAodGhpcy5pc0VuaGFuY2VkXykgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdEVsZW1lbnQudmFsdWUgfHwgdGhpcy52YWx1ZV87XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gIH1cblxuICBnZXQgc2VsZWN0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gTURXVXRpbHMucXVlcnlTbG90dGVkKHRoaXMsICdzZWxlY3QnKTtcbiAgfVxuXG4gIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk7XG4gIH1cblxuICBnZXQgbGFiZWxXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbC5vZmZzZXRXaWR0aCAqIDAuOTtcbiAgfVxuXG5cbiAgZ2V0IGVuaGFjZWRFbGVtZW50SWQoKSB7XG4gICAgaWYgKCF0aGlzLmVuaGFjZWRFbGVtZW50SWRfKSB0aGlzLmVuaGFjZWRFbGVtZW50SWRfID0gYHNlbGVjdC1lbmhhbmNlZC0ke01EV1V0aWxzLnVpZCgpfWA7XG4gICAgcmV0dXJuIHRoaXMuZW5oYWNlZEVsZW1lbnRJZF87XG4gIH1cblxuICBnZXQgcGFuZWwoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuZW5oYWNlZEVsZW1lbnRJZH1gKTtcbiAgfVxuXG4gIGdldCBzaGVldCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5lbmhhY2VkRWxlbWVudElkfWApO1xuICB9XG5cbiAgZ2V0IGlzRW5oYW5jZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LWVuaGFuY2VkJykgIT09IG51bGw7XG4gIH1cblxuICBnZXQgb3V0bGluZWQoKSB7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmFwcGx5KHRoaXMuY2xhc3NMaXN0IHx8IFtdKS5pbmNsdWRlcygnbWR3LW91dGxpbmVkJyk7XG4gIH1cblxuICBnZXQgbm90Y2goKSB7XG4gICAgaWYgKCF0aGlzLl9ub3RjaCkgdGhpcy5fbm90Y2ggPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1vdXRsaW5lZC1ub3RjaCcpO1xuICAgIHJldHVybiB0aGlzLl9ub3RjaDtcbiAgfVxuXG4gIHNldHVwTGFiZWxfKCkge1xuICAgIGNvbnN0IGxhYmVsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpO1xuICAgIGlmIChsYWJlbCkge1xuICAgICAgdGhpcy5sYWJlbFRleHRfID0gbGFiZWwuaW5uZXJUZXh0O1xuICAgICAgbGFiZWwucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJlcGFyZUVuaGFuY2VfKCkge1xuICAgIHRoaXMub3B0aW9uc01hcF8gPSBbLi4udGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKV0ubWFwKGVsID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQ6IGVsLmlubmVyVGV4dCxcbiAgICAgICAgdmFsdWU6IGVsLnZhbHVlLFxuICAgICAgICBzZWxlY3RlZDogZWwuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RlZF8gPSAodGhpcy5vcHRpb25zTWFwXy5maWx0ZXIoKHsgc2VsZWN0ZWQgfSkgPT4gc2VsZWN0ZWQgPT09IHRydWUpWzBdIHx8IHsgdGV4dDogJycsIHZhbHVlOiAnJyB9KTtcblxuICAgIGNvbnN0IHNlbGVjdEVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIGlmIChzZWxlY3RFbGVtZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RPbmNoYW5nZSA9IHNlbGVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdvbmNoYW5nZScpO1xuICAgICAgaWYgKHNlbGVjdE9uY2hhbmdlKSB0aGlzLnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCBzZWxlY3RPbmNoYW5nZSk7XG4gICAgICBzZWxlY3RFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkgdGhpcy5wcmVwYXJlU2hlZXRfKCk7XG4gICAgZWxzZSB0aGlzLnByZXBhcmVQYW5lbF8oKTtcbiAgfVxuXG4gIHByZXBhcmVQYW5lbF8oKSB7XG4gICAgY29uc3QgcGFuZWxIVE1MID0gYFxuICAgICAgPG1kdy1wYW5lbCBpZD1cIiR7dGhpcy5lbmhhY2VkRWxlbWVudElkfVwiIG1kdy1wb3NpdGlvbj1cImJvdHRvbSBpbm5lci1sZWZ0XCIgY2xhc3M9XCJtZHctcGFuZWwtaG9pc3RlZFwiPlxuICAgICAgICA8bWR3LWxpc3Q+XG4gICAgICAgICAgJHt0aGlzLm9wdGlvbnNNYXBfLm1hcCgoeyB0ZXh0LCB2YWx1ZSwgc2VsZWN0ZWQgfSkgPT4gYFxuICAgICAgICAgICAgPG1kdy1saXN0LWl0ZW0gdmFsdWU9XCIke3ZhbHVlfVwiJHtzZWxlY3RlZCA/ICcgc2VsZWN0ZWQnIDogJyd9PiR7dGV4dH08L21kdy1saXN0LWl0ZW0+XG4gICAgICAgICAgYCkuam9pbignXFxuJyl9XG4gICAgICAgIDwvbWR3LWxpc3Q+XG4gICAgICA8L21kdy1wYW5lbD5cbiAgICBgO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBwYW5lbEhUTUwpO1xuICAgIGNvbnN0IHBhbmVsRWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmIChwYW5lbEVsLmhvaXN0VG9Cb2R5KSBwYW5lbEVsLmhvaXN0VG9Cb2R5KHRoaXMpO1xuICAgIHBhbmVsRWwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgfVxuXG4gIHByZXBhcmVTaGVldF8oKSB7XG4gICAgY29uc3Qgc2hlZXRIVE1MID0gYFxuICAgICAgPG1kdy1zaGVldCBtZHctbW9kYWwgaWQ9JHt0aGlzLmVuaGFjZWRFbGVtZW50SWR9PlxuICAgICAgICA8bWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICAgICAgPG1kdy1saXN0PlxuICAgICAgICAgICAgJHt0aGlzLm9wdGlvbnNNYXBfLm1hcCgoeyB0ZXh0LCB2YWx1ZSwgc2VsZWN0ZWQgfSkgPT4gYFxuICAgICAgICAgICAgICA8bWR3LWxpc3QtaXRlbSB2YWx1ZT1cIiR7dmFsdWV9XCIke3NlbGVjdGVkID8gJyBzZWxlY3RlZCcgOiAnJ30+JHt0ZXh0fTwvbWR3LWxpc3QtaXRlbT5cbiAgICAgICAgICAgIGApLmpvaW4oJ1xcbicpfVxuICAgICAgICAgIDwvbWR3LWxpc3Q+XG4gICAgICAgIDwvbWR3LXNoZWV0LWNvbnRlbnQ+XG4gICAgICA8L21kdy1zaGVldD5cbiAgICBgO1xuXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHNoZWV0SFRNTCk7XG4gIH1cblxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9IHRoaXMubGFiZWxXaWR0aCArICdweCc7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LW5vdC1lbXB0eScsIHRoaXMudmFsdWUpO1xuXG4gICAgaWYgKHRoaXMuaXNFbmhhbmNlZF8pIHtcbiAgICAgIGlmIChNRFdVdGlscy5pc01vYmlsZSkge1xuICAgICAgICB0aGlzLnNoZWV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1NoZWV0OmNsb3NlZCcsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgICAgdGhpcy5zaGVldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgICAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xpY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIE1EV1V0aWxzLnVubG9ja1BhZ2VTY3JvbGwoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWVtcHR5LW5vLWZsb2F0Jyk7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9IHRoaXMubGFiZWxXaWR0aCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNlbGVjdC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbWR3LWVtcHR5LW5vLWZsb2F0Jyk7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lZCkgdGhpcy5ub3RjaC5zdHlsZS53aWR0aCA9ICcwJztcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9PT0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25Gb2N1cygpO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICBjb25zdCBzaGVldEVsZW1lbnQgPSB0aGlzLnNoZWV0O1xuICAgICAgc2hlZXRFbGVtZW50Lm9wZW4oKTtcbiAgICAgIHNoZWV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdNRFdTaGVldDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uQmx1cik7XG4gICAgICBzaGVldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX29uUGFuZWxDbGljayk7XG4gICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IHNoZWV0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWR3LWZvY3VzZWQnKTtcbiAgICAgIGlmIChmb2N1c2VkRWxlbWVudCkgZm9jdXNlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWZvY3VzZWQnKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IHNoZWV0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbc2VsZWN0ZWRdJyk7XG4gICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSBzZWxlY3RlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFuZWxFbGVtZW50ID0gdGhpcy5wYW5lbDtcbiAgICAgIHBhbmVsRWxlbWVudC5hdXRvUG9zaXRpb24oKTtcbiAgICAgIHBhbmVsRWxlbWVudC5vcGVuKHRydWUpO1xuICAgICAgcGFuZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICAgIHBhbmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfb25QYW5lbENsaWNrKTtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gcGFuZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZHctZm9jdXNlZCcpO1xuICAgICAgaWYgKGZvY3VzZWRFbGVtZW50KSBmb2N1c2VkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRFbGVtZW50ID0gcGFuZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKTtcbiAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHNlbGVjdGVkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZHctZm9jdXNlZCcpO1xuICAgIH1cblxuICAgIE1EV1V0aWxzLmxvY2tQYWdlU2Nyb2xsKCk7XG4gIH1cblxuICBvblBhbmVsQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICB0aGlzLnNldFNlbGVjdGVkVGV4dChldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWQgPSB0aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKTtcbiAgICBpZiAoY3VycmVudFNlbGVjdGVkKSBjdXJyZW50U2VsZWN0ZWQucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgIHRoaXMucGFuZWwuY2xvc2UoKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkVGV4dCh2YWx1ZSkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCcpLmlubmVyVGV4dCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGludGVybmFsU3R5bGVzRmlsZSgpIHtcbiAgICByZXR1cm4gJy4vaW50ZXJuYWwuY3NzJztcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8aSBjbGFzcz1cIm1kdy1zZWxlY3RfX2ljb25cIj48L2k+XG4gICAgICAkeyF0aGlzLmlzRW5oYW5jZWRfID8gJzxzbG90Pjwvc2xvdD4nIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dFwiPiR7dGhpcy5zZWxlY3RlZF8udGV4dH08L2Rpdj5cbiAgICAgIGB9XG4gICAgICA8bGFiZWw+JHt0aGlzLmxhYmVsVGV4dF99PC9sYWJlbD5cbiAgICAgICR7dGhpcy5vdXRsaW5lZCA/ICcnIDogJzxkaXYgY2xhc3M9XCJtZHctbGluZS1yaXBwbGVcIj48L2Rpdj4nfVxuICAgICAgJHshdGhpcy5vdXRsaW5lZCA/ICcnIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWJvcmRlci1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWxlYWRpbmdcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLW5vdGNoXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC10cmFpbGluZ1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGB9XG4gICAgYDtcbiAgfVxuXG5cblxuICAvLyAtLS0ga2V5IGNvbnRyb2xzIC0tLVxuXG4gIG9uS2V5RG93bihlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsLmlzT3BlbigpKSByZXR1cm5cblxuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDQwOiAvL2Rvd25cbiAgICAgIGNhc2UgMzk6IC8vcmlnaHRcbiAgICAgICAgdGhpcy5mb2N1c05leHQoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODogLy91cFxuICAgICAgY2FzZSAzNzogLy9sZWZ0XG4gICAgICAgIHRoaXMuZm9jdXNQcmV2aW91cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNlZCgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoZS5rZXlDb2RlID49IDMxIHx8IGUua2V5Q29kZSA8PSA5MCkge1xuICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IHRoaXMua2V5Ym9hcmRTZWFyY2hOb2RlcyhlLmtleUNvZGUpO1xuICAgICAgICAgIGlmIChub2RlSW5kZXggIT09IHVuZGVmaW5lZCkgdGhpcy5zZWxlY3ROb2RlKG5vZGVJbmRleCk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBrZXkgc2VhcmNoaW5nXG4gIC8vICAgaWYgeW91IHByZXNzIFwic1wiIHRoZW4gaXQgd2lsbCBmaW5kIHRoZSBmaXJzdCBpdGVtIHRoYXQgc3RhcnRzIHdpdGggYW4gXCJzXCJcbiAgLy8gICBpZiB5b3UgcHJlc3MgXCJzXCIgdGhlbiBcInRcIiBpdCB3aWxsIGZpbmQgdGhlIGZpcnN0IGl0ZW0gdGhhdCBzdGFydHMgd2l0aCBhbiBcInN0XCJcbiAga2V5Ym9hcmRTZWFyY2hOb2RlcyhrZXlDb2RlKSB7XG4gICAgaWYgKHRoaXMuX2NsZWFyU2VhcmNoVGltZW91dCAhPT0gdW5kZWZpbmVkKSBjbGVhclRpbWVvdXQodGhpcy5fY2xlYXJTZWFyY2hUaW1lb3V0KTtcbiAgICB0aGlzLl9jbGVhclNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2NsZWFyU2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID0gJyc7XG4gICAgICB0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzID0gdW5kZWZpbmVkO1xuICAgIH0sIDMwMCk7XG4gICAgaWYgKHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID09PSB1bmRlZmluZWQpIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyID0gJyc7XG4gICAgdGhpcy5fa2V5Ym9hcmRTZWFyY2hTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcbiAgICBjb25zdCBzZWFyY2ggPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMuX2tleWJvYXJkU2VhcmNoU3RyLCAnaScpO1xuXG4gICAgaWYgKCF0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzKSB0aGlzLl9rZXlib2FyZE9wdGlvbk5hbWVzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXS5tYXAoZWwgPT4gZWwuaW5uZXJUZXh0KTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2tleWJvYXJkT3B0aW9uTmFtZXMubGVuZ3RoO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaWYgKHNlYXJjaC50ZXN0KHRoaXMuX2tleWJvYXJkT3B0aW9uTmFtZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgaSArPSAxO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE5vZGUoaW5kZXgpIHtcbiAgICBjb25zdCBvcHRpb25FbGVtZW50cyA9IFsuLi50aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1saXN0LWl0ZW0nKV07XG4gICAgdGhpcy5fZm9jdXNJbmRleCA9IGluZGV4O1xuICAgIGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uKSB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1mb2N1c2VkJyk7XG4gICAgdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbkVsZW1lbnRzW3RoaXMuX2ZvY3VzSW5kZXhdO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24uY2xhc3NMaXN0LmFkZCgnbWR3LWZvY3VzZWQnKTtcbiAgfVxuXG4gIGZvY3VzTmV4dCgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwuaXNPcGVuKCkpIHJldHVybjtcbiAgICBjb25zdCBvcHRpb25FbGVtZW50cyA9IFsuLi50aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ21kdy1saXN0LWl0ZW0nKV07XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaW5kZXggPSBvcHRpb25FbGVtZW50cy5maW5kSW5kZXgoZWwgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZHctZm9jdXNlZCcpKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gb3B0aW9uRWxlbWVudHNbaW5kZXhdO1xuICAgICAgdGhpcy5fZm9jdXNJbmRleCA9IGluZGV4IDw9IDAgPyAxIDogaW5kZXggKyAxO1xuICAgIH0gZWxzZSB0aGlzLl9mb2N1c0luZGV4ICs9IDE7XG4gICAgaWYgKHRoaXMuX2ZvY3VzSW5kZXggPiBvcHRpb25FbGVtZW50cy5sZW5ndGggLSAxKSB0aGlzLl9mb2N1c0luZGV4ID0gb3B0aW9uRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBmb2N1c1ByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA9PT0gdW5kZWZpbmVkKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBlbHNlIHRoaXMuX2ZvY3VzSW5kZXggLT0gMTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA8PSAwKSB0aGlzLl9mb2N1c0luZGV4ID0gMDtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikgdGhpcy5fZm9jdXNlZE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdtZHctZm9jdXNlZCcpO1xuICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ21kdy1mb2N1c2VkJyk7XG4gIH1cblxuICBzZWxlY3RGb2N1c2VkKCkge1xuICAgIGlmICghdGhpcy5wYW5lbC5pc09wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG9wdGlvbkVsZW1lbnRzID0gWy4uLnRoaXMucGFuZWwucXVlcnlTZWxlY3RvckFsbCgnbWR3LWxpc3QtaXRlbScpXTtcbiAgICBpZiAodGhpcy5fZm9jdXNJbmRleCA9PSB1bmRlZmluZWQgfHwgdGhpcy5fZm9jdXNJbmRleCA+IG9wdGlvbkVsZW1lbnRzLmxlbmd0aCAtIDEpIHRoaXMuX2ZvY3VzSW5kZXggPSAwO1xuICAgIHRoaXMub25QYW5lbENsaWNrKHsgdGFyZ2V0OiBvcHRpb25FbGVtZW50c1t0aGlzLl9mb2N1c0luZGV4XSB9KTtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgOjpzbG90dGVkKGxhYmVsLm1kdy1lbXB0eS1uby1mbG9hdCkge1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgLm1kdy1zZWxlY3RfX2ljb24ge1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpIHRyYW5zbGF0ZVkoLTVweCk7XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgfVxuXG5cbiAgICAgIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogMjNweDtcbiAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgcmlnaHQ6IDhweDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCB2YXIoLS1tZHctdGhlbWUtdGV4dC0tb24tc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOjpzbG90dGVkKHNlbGVjdDpmb2N1cykgLm1kdy1zZWxlY3RfX2ljb24sXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQ6Zm9jdXMpIC5tZHctc2VsZWN0X19pY29uIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSB0cmFuc2xhdGVZKC01cHgpO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDpob3N0KDpub3QoLm1kdy1zZWxlY3QtLWRpc2FibGVkKSkgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHQge1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtb3V0bGluZV9ib3JkZXIpO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtLW9uLWJhY2tncm91bmQpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQ6bm90KC5tZHctc2VsZWN0LS1kaXNhYmxlZCkpIDo6c2xvdHRlZChzZWxlY3QpLFxuICAgICAgOmhvc3QoLm1kdy1mb2N1c2VkOm5vdCgubWR3LXNlbGVjdC0tZGlzYWJsZWQpKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCxcbiAgICAgIDpob3N0KDpub3QoLm1kdy1zZWxlY3QtLWRpc2FibGVkKSkgOjpzbG90dGVkKHNlbGVjdDpmb2N1cyksXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQ6Zm9jdXM6bm90KC5tZHctc2VsZWN0LS1kaXNhYmxlZCkpIC5tZHctc2VsZWN0X19zZWxlY3RlZC10ZXh0IHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICAgIGhlaWdodDogY2FsYygxMDAlICsgMXB4KTsgLyogYWRkIDFweCB0byBoZWlnaHQgc28gdGhlIHRleHQgZG9lcyBub3QgZ2V0IHB1c2hlZCB1cCBieSBib3JkZXIgc2l6ZSBjaGFuZ2UgKi9cbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgOjpzbG90dGVkKHNlbGVjdCksXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOjpzbG90dGVkKHNlbGVjdCksXG4gICAgICAubWR3LXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcGFkZGluZzogMjBweCA1MnB4IDRweCAxNnB4O1xuICAgICAgICBmb250LWZhbWlseTogUm9ib3RvLHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNzVyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAuMDA5Mzc1ZW07XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkO1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC8qIG91dGxpbmVkICovXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSA6OnNsb3R0ZWQoc2VsZWN0KSxcbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIC5tZHctc2VsZWN0X19zZWxlY3RlZC10ZXh0IHtcbiAgICAgICAgcGFkZGluZzogMTJweCA1MnB4IDEycHggMTZweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgIH1cbiAgICAgIDpob3N0KC5tZHctb3V0bGluZWQpIDo6c2xvdHRlZChzZWxlY3QpIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQoc2VsZWN0KSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdChbZGlyPXJ0bF0pIDo6c2xvdHRlZChzZWxlY3QpLFxuICAgICAgOjpzbG90dGVkKHNlbGVjdFtkaXI9cnRsXSksXG4gICAgICA6aG9zdChbZGlyPXJ0bF0pIC5tZHctc2VsZWN0X19zZWxlY3RlZC10ZXh0LFxuICAgICAgLm1kdy1zZWxlY3RfX3NlbGVjdGVkLXRleHRbZGlyPXJ0bF0ge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDUycHg7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDE2cHg7XG4gICAgICB9XG5cblxuICAgICAgbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjc1cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4wMDkzNzVlbTtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogaW5oZXJpdDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSksIGNvbG9yIDE1MG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1cmVtO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgY3Vyc29yOiB0ZXh0O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXRleHQtLW9uLWJhY2tncm91bmQpO1xuICAgICAgICB6LWluZGV4OiAxO1xuXG4gICAgICAgIGxlZnQ6IDE2cHg7XG4gICAgICAgIHJpZ2h0OiBpbml0aWFsO1xuICAgICAgICB0b3A6IDIxcHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgbGFiZWwge1xuICAgICAgICBjb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LW5vLWFuaW1hdGlvbikgbGFiZWwge1xuICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xuICAgICAgfVxuXG4gICAgICBsYWJlbDpub3QoLm1kdy1lbXB0eS1uby1mbG9hdCkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSkgc2NhbGUoMC43NSk7XG4gICAgICB9XG5cbiAgICAgIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpICsgbGFiZWwsXG4gICAgICBsYWJlbC5tZHctc2VsZWN0LS1mbG9hdC1hYm92ZSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAlKSBzY2FsZSgwLjc1KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZC5tZHctZm9jdXNlZCkgbGFiZWwsXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkKSBsYWJlbC5tZHctc2VsZWN0LS1mbG9hdC1hYm92ZSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTMyJSkgc2NhbGUoMC43NSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2VsZWN0LS13aXRoLWxlYWRpbmctaWNvbikgbGFiZWwge1xuICAgICAgICBsZWZ0OiA0OHB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1vdXRsaW5lZCkgbGFiZWwge1xuICAgICAgICBsZWZ0OiAxNXB4O1xuICAgICAgICByaWdodDogaW5pdGlhbDtcbiAgICAgICAgdG9wOiAxOHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkLm1kdy1zZWxlY3QtLXdpdGgtbGVhZGluZy1pY29uKSBsYWJlbCB7XG4gICAgICAgIGxlZnQ6IDM2cHg7XG4gICAgICAgIHJpZ2h0OiBpbml0aWFsO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LW91dGxpbmVkLm1kdy1zZWxlY3QtLXdpdGgtbGVhZGluZy1pY29uKSBsYWJlbC5tZHctc2VsZWN0LS1mbG9hdC1hYm92ZSB7XG4gICAgICAgIGxlZnQ6IDM2cHg7XG4gICAgICAgIHJpZ2h0OiBpbml0aWFsO1xuICAgICAgfVxuXG4gICAgICAubWR3LW91dGxpbmVkLWJvcmRlci1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctb3V0bGluZWQtbGVhZGluZyB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4O1xuICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkO1xuICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgICAgIHdpZHRoOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICAubWR3LW91dGxpbmVkLW5vdGNoIHtcbiAgICAgICAgLW1zLWZsZXg6IDAgMCBhdXRvO1xuICAgICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gMTJweCAqIDIpO1xuICAgICAgfVxuXG4gICAgICAubWR3LW91dGxpbmVkLXRyYWlsaW5nIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDtcbiAgICAgICAgLW1zLWZsZXgtcG9zaXRpdmU6IDE7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1vdXRsaW5lZC1sZWFkaW5nLFxuICAgICAgLm1kdy1vdXRsaW5lZC1ub3RjaCxcbiAgICAgIC5tZHctb3V0bGluZWQtdHJhaWxpbmcge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1vdXRsaW5lX2JvcmRlcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctb3V0bGluZWQtbm90Y2gge1xuICAgICAgICBib3JkZXItdG9wOiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWZvY3VzZWQpIC5tZHctb3V0bGluZWQtbGVhZGluZyxcbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgLm1kdy1vdXRsaW5lZC1ub3RjaCxcbiAgICAgIDpob3N0KC5tZHctZm9jdXNlZCkgLm1kdy1vdXRsaW5lZC10cmFpbGluZyxcbiAgICAgIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpIC5tZHctb3V0bGluZWQtbGVhZGluZyxcbiAgICAgIDo6c2xvdHRlZChzZWxlY3Q6Zm9jdXMpIC5tZHctb3V0bGluZWQtbm90Y2gsXG4gICAgICA6OnNsb3R0ZWQoc2VsZWN0OmZvY3VzKSAubWR3LW91dGxpbmVkLXRyYWlsaW5nIHtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguaW52YWxpZCkgLm1kdy1vdXRsaW5lZC1sZWFkaW5nLFxuICAgICAgOmhvc3QoLmludmFsaWQpIC5tZHctb3V0bGluZWQtbm90Y2gsXG4gICAgICA6aG9zdCguaW52YWxpZCkgLm1kdy1vdXRsaW5lZC10cmFpbGluZyB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNoZWV0LWhlYWRlcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmhhc0NvbGxhcHNlZEhlYWRlciA9ICh0aGlzLmNoaWxkcmVuIHx8IFtdKS5sZW5ndGggIT09IDA7XG4gICAgaWYgKCF0aGlzLmhhc0NvbGxhcHNlZEhlYWRlcikgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctaGlkZS1jb2xsYXBzZWQtaGVhZGVyJyk7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlckhlYWRlcikgdGhpcy5wYXJlbnROb2RlLnJlZ2lzdGVySGVhZGVyKHRoaXMsIHRoaXMuaGFzQ29sbGFwc2VkSGVhZGVyKTtcbiAgICB0aGlzLmlubmVySFRNTFN0cmluZyA9IHRoaXMuaW5uZXJIVE1MO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKHRydWUpO1xuICAgIHRoaXMuc2hvd2luZ0Z1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICB0aGlzLmJvdW5kX2Nsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ21kdy1zaGFwZWQnKSkgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hhcGVkJyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9jbG9zZSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9jbG9zZSk7XG4gIH1cblxuICBnZXQgY2xvc2VCdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjbWR3LXNoZWV0LWNsb3NlLWFjdGlvbicpO1xuICB9XG5cbiAgZ2V0IHRpdGxlKCkge1xuICAgIHJldHVybiAhIXRoaXMudGl0bGVfID8gdGhpcy50aXRsZV8gOiB0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LXRpdGxlJykgPyB0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LXRpdGxlJykgOiAnJztcbiAgfVxuXG4gIHNldCB0aXRsZSh2YWx1ZSkge1xuICAgIHRoaXMudGl0bGVfID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaXNNb2RhbCgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUuaXNNb2RhbCB8fCBmYWxzZTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmlzTW9kYWwpIHRoaXMucGFyZW50Tm9kZS5jbG9zZSgpO1xuICAgIGVsc2UgdGhpcy5wYXJlbnROb2RlLmNvbGxhcHNlKCk7XG4gIH1cblxuICBkaXNhYmxlQ29sbGFwc2VkSGVhZGVyKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNoZWV0LWRpc2FibGUtY29sbGFwc2VkLWhlYWRlcicpO1xuICB9XG5cbiAgc2hvd0Z1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hvdy1mdWxsc2NyZWVuJyk7XG4gIH1cblxuICBoaWRlRnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zaG93LWZ1bGxzY3JlZW4nKTtcbiAgfVxuXG4gIHRvZ2dsZUZ1bGxzY3JlZW4odmFsdWUpIHtcbiAgICBpZiAodGhpcy5zaG93aW5nRnVsbHNjcmVlbiAmJiAhdmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvd2luZ0Z1bGxzY3JlZW4gPSB2YWx1ZTtcbiAgICAgIHRoaXMuaGlkZUZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dpbmdGdWxsc2NyZWVuID0gdmFsdWU7XG4gICAgICB0aGlzLnNob3dGdWxsc2NyZWVuKCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd0RyYWdJY29uKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LXNoZWV0LWhlYWRlci1kcmFnZ2FibGUnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LXNoZWV0LWhlYWRlci1kcmFnLWljb25cIj48L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlblwiPlxuICAgICAgICAke3RoaXMuaXNNb2RhbCA/IGBcbiAgICAgICAgICA8bWR3LWJ1dHRvbiBpZD1cIm1kdy1zaGVldC1jbG9zZS1hY3Rpb25cIiBjbGFzcz1cIm1kdy1pY29uXCI+XG4gICAgICAgICAgICA8bWR3LWljb24+Y2xvc2U8L21kdy1pY29uPlxuICAgICAgICAgIDwvbWR3LWJ1dHRvbj5cbiAgICAgICAgYCA6XG4gICAgICAgIGBcbiAgICAgICAgICA8bWR3LWJ1dHRvbiBpZD1cIm1kdy1zaGVldC1jbG9zZS1hY3Rpb25cIiBjbGFzcz1cIm1kdy1pY29uXCI+XG4gICAgICAgICAgICA8bWR3LWljb24+a2V5Ym9hcmRfYXJyb3dfZG93bjwvbWR3LWljb24+XG4gICAgICAgICAgPC9tZHctYnV0dG9uPlxuICAgICAgICBgfVxuICAgICAgICAke3RoaXMudGl0bGV9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyXCI+XG4gICAgICAgICR7dGhpcy5pbm5lckhUTUxTdHJpbmd9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjcyAqL2BcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogNTZweDtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbiB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zdXJmYWNlX2VsZXZhdGlvbl8xKTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSxcbiAgICAgICAgICAgICAgICAgICAgMCA0cHggNXB4IDAgcmdiYSgwLDAsMCwuMTQpLFxuICAgICAgICAgICAgICAgICAgICAwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNob3ctZnVsbHNjcmVlbikgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbiB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zaGVldC1oZWFkZXItZHJhZy1pY29uIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgd2lkdGg6IDEyJTtcbiAgICAgICAgaGVpZ2h0OiA0cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiA2MnB4O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNEREQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2hlZXQtaGVhZGVyLWRyYWdnYWJsZSkgLm1kdy1zaGVldC1oZWFkZXItZHJhZy1pY29uIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctc2hvdy1mdWxsc2NyZWVuLm1kdy1zaGVldC1oZWFkZXItZHJhZ2dhYmxlKSAubWR3LXNoZWV0LWhlYWRlci1kcmFnLWljb24ge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogY29sbGFwc2VkIGhlYWRlciAqL1xuXG4gICAgICAubWR3LXNoZWV0LWhlYWRlci1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgICAgY29sb3I6IHZhcigtLW1kdy10aGVtZS10ZXh0LS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zaGFwZWQpIC5tZHctc2hlZXQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMCAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXNoZWV0LWRpc2FibGUtY29sbGFwc2VkLWhlYWRlcikgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1zaG93LWZ1bGxzY3JlZW4pIC5tZHctc2hlZXQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWhpZGUtY29sbGFwc2VkLWhlYWRlcikgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy10d28tbGluZSkgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbixcbiAgICAgIDpob3N0KC5tZHctdHdvLWxpbmUpIC5tZHctc2hlZXQtaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogNzJweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy10aHJlZS1saW5lKSAubWR3LXNoZWV0LWhlYWRlci1mdWxsc2NyZWVuLFxuICAgICAgOmhvc3QoLm1kdy10aHJlZS1saW5lKSAubWR3LXNoZWV0LWhlYWRlci1jb250YWluZXIge1xuICAgICAgICBoZWlnaHQ6IDg4cHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctdHdvLWxpbmUubWR3LXNoYXBlZCkgLm1kdy1zaGVldC1oZWFkZXItZnVsbHNjcmVlbixcbiAgICAgIDpob3N0KC5tZHctdHdvLWxpbmUubWR3LXNoYXBlZCkgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDAgMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy10aHJlZS1saW5lLm1kdy1zaGFwZWQpIC5tZHctc2hlZXQtaGVhZGVyLWZ1bGxzY3JlZW4sXG4gICAgICA6aG9zdCgubWR3LXRocmVlLWxpbmUubWR3LXNoYXBlZCkgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweCAxMnB4IDAgMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy13aGl0ZSkgLm1kdy1zaGVldC1oZWFkZXItY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tZHctdGhlbWUtdGV4dC0tcHJpbWFyeS0tb24pO1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbWR3LXRoZW1lLWRpdmlkZXItLWRhcmspO1xuICAgICAgfVxuXG4gICAgICAvKiBzZWN0aW9ucyAqL1xuXG4gICAgICBzZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgICB6LWluZGV4OiAxO1xuXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9uW2FsaWduPVwic3RhcnRcIl0ge1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgb3JkZXI6IC0xO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9uICsgc2VjdGlvbixcbiAgICAgIHNlY3Rpb25bYWxpZ249XCJlbmRcIl0ge1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgIG9yZGVyOiAxO1xuICAgICAgfVxuXG5cbiAgICAgIC8qIHRleHQgKi9cbiAgICAgIHNlY3Rpb24gLm1kdy10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IC4wMTI1ZW07XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9uIC5tZHctc3VidGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAuMDEyNWVtO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgIH1cblxuICAgICAgc2VjdGlvbiAubWR3LWRldGFpbC10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogLjAxMjVlbTtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0ICcuL2hlYWRlci5qcyc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5pbXBvcnQgeyBhZGREcmFnTGlzdGVuZXIsIHJlbW92ZURyYWdMaXN0ZW5lciwgZGlzYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQsIGVuYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2dlc3R1cmVzLmpzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZHctc2hlZXQnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1jbG9zZWQnKTtcbiAgICB0aGlzLmN1cnJlbnREcmFnUG9zaXRpb24gPSAtMTtcbiAgICB0aGlzLmJvdW5kX29uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0eWxlW01EV1V0aWxzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSAndHJhbnNsYXRlM2QoMCwgMTAwJSwgMCknO1xuICAgIHRoaXMuc2V0dXBIZWFkZXIoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHJlbW92ZURyYWdMaXN0ZW5lcih0aGlzLmNvbnRlbnRFbGVtZW50LCB0aGlzLmJvdW5kX29uRHJhZyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvdW5kX29uU2Nyb2xsKTtcbiAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKCk7XG4gIH1cblxuICBnZXQgY29udGVudEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXNoZWV0LWNvbnRlbnQnKTtcbiAgfVxuXG4gIGdldCB0aXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy10aXRsZScpID8gdGhpcy5nZXRBdHRyaWJ1dGUoJ21kdy10aXRsZScpIDogJyc7XG4gIH1cblxuICBnZXQgaXNNb2RhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ21kdy1tb2RhbCcpO1xuICB9XG5cbiAgcmVnaXN0ZXJIZWFkZXIoZWxlbWVudCwgaGFzQ29sbGFzcGVkSGVhZGVyKSB7XG4gICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmhlYWRlckVsZW1lbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xuICAgIGlmIChoYXNDb2xsYXNwZWRIZWFkZXIpIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWhhcy1jb2xsYXNwZWQtaGVhZGVyJyk7XG4gICAgaWYgKHRoaXMuaXNNb2RhbCkgZWxlbWVudC5kaXNhYmxlQ29sbGFwc2VkSGVhZGVyKCk7XG4gIH1cblxuICBzZXR1cEhlYWRlcigpIHtcbiAgICBpZiAoIXRoaXMucXVlcnlTZWxlY3RvcignbWR3LXNoZWV0LWhlYWRlcicpKSB7XG4gICAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8bWR3LXNoZWV0LWhlYWRlciBtZHctdGl0bGU9XCIke3RoaXMudGl0bGV9XCI+PC9tZHctc2hlZXQtaGVhZGVyPmApO1xuICAgIH1cbiAgfVxuXG4gIGFkZEJhY2tkcm9wKCkge1xuICAgIGlmICh0aGlzLmlzTW9kYWwpIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSBNRFdVdGlscy5hZGRCYWNrZHJvcCh0aGlzLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUJhY2tkcm9wKCkge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wKSB0aGlzLmJhY2tkcm9wLnJlbW92ZSgpO1xuICAgIHRoaXMuYmFja2Ryb3AgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXRJbml0YWxQb3NpdGlvbnMoKSB7XG4gICAgLy8gcGFnZSBoZWlnaHRcbiAgICB0aGlzLnZpZXdIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvLyBoYWxmIGhlaWdodCBmb3IgbW9kYWwsIHF1YXRlciBoaWdodCBmb3Igbm9uIG1vZGFsXG4gICAgdGhpcy5jbGllbnRDZW50ZXIgPSB0aGlzLmlzTW9kYWwgPyB0aGlzLnZpZXdIZWlnaHQgLyAyIDogdGhpcy52aWV3SGVpZ2h0IC8gNDtcbiAgICB0aGlzLmNvbnRlbnRIZWlnaHQgPSB0aGlzLmNvbnRlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB0aGlzLmludGlhbEhlaWdodCA9IE1hdGgubWluKHRoaXMuY29udGVudEhlaWdodCwgdGhpcy5jbGllbnRDZW50ZXIpO1xuXG4gICAgLy8gdXNlciBzZXQgaW5pdGFsIGhlaWdodFxuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnbWR3LWNvbGxhcHNlZC1oZWlnaHQnKSkgdGhpcy5pbnRpYWxIZWlnaHQgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnbWR3LWNvbGxhcHNlZC1oZWlnaHQnKS5yZXBsYWNlKCdweCcsICcnKSk7XG5cbiAgICAvLyB0aGUgdHJhbnNmb3JtOiB0cmFuc2xhdGVZIHBvc3Rpb24gZm9yIHRoZSB0b3Agb2YgdGhlIHBhZ2VcbiAgICB0aGlzLnNjcm9sbFkgPSAtKHRoaXMudmlld0hlaWdodCAtIHRoaXMuaW50aWFsSGVpZ2h0IC0gNTYpO1xuICAgIHRoaXMuaXNEcmFnZ2FibGUgPSB0aGlzLmNvbnRlbnRIZWlnaHQgPiB0aGlzLmNsaWVudENlbnRlcjtcbiAgICB0aGlzLnN0eWxlLnRvcCA9IGBjYWxjKDEwMCUgLSAke3RoaXMuaW50aWFsSGVpZ2h0ICsgNTZ9cHgpYDtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgLy8gbGVhciBjbG9zZSB0aW1lb3V0IHNvIHdlIGRvIG5vdCBvdmVybGFwIG9uIGEgZmFzdCBvcGVuXG4gICAgaWYgKHRoaXMuY2xvc2VUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVvdXQpO1xuICAgICAgdGhpcy5jbG9zZVRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LWNsb3NlZCcpO1xuICAgIHRoaXMuYWRkQmFja2Ryb3AoKTtcblxuICAgIC8vIGFuaW1hdGlvbiBpbiBzaGVldFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRJbml0YWxQb3NpdGlvbnMoKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24oMCk7XG4gICAgICBpZiAodGhpcy5pc0RyYWdnYWJsZSkgYWRkRHJhZ0xpc3RlbmVyKHRoaXMuY29udGVudEVsZW1lbnQsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib3VuZF9vblNjcm9sbCk7XG4gICAgICB0aGlzLm5vdGlmeU9wZW4oKTtcbiAgICB9LCAwKTtcbiAgICBpZiAodGhpcy5pc01vZGFsKSBNRFdVdGlscy5sb2NrUGFnZVNjcm9sbCgpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgcmVtb3ZlRHJhZ0xpc3RlbmVyKHRoaXMuY29udGVudEVsZW1lbnQsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm91bmRfb25TY3JvbGwpO1xuICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5pbnRpYWxIZWlnaHQgKyB0aGlzLmhlYWRlckVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICB0aGlzLmNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctY2xvc2VkJyk7XG4gICAgICB0aGlzLmhlYWRlckVsZW1lbnQuaGlkZUZ1bGxzY3JlZW4oKTtcbiAgICB9LCA2MDApO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgIHRoaXMubm90aWZ5Q2xvc2UoKTtcbiAgfVxuXG4gIG5vdGlmeUNsb3NlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ01EV1NoZWV0OmNsb3NlZCcsIHRoaXMpKTtcbiAgfVxuXG4gIG5vdGlmeU9wZW4oKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnTURXU2hlZXQ6b3BlbicpLCB0aGlzKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIGlmICh0aGlzLmlzRHJhZ2dhYmxlKSBhZGREcmFnTGlzdGVuZXIodGhpcy5jb250ZW50RWxlbWVudCwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICAgIHRoaXMuc2V0UG9zaXRpb24oMCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB0aGlzLmNsb3NlKCk7XG4gICAgZWxzZSB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIG9uRHJhZyhldmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQuc3RhdGUpIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5zdGFydERyYWdQb3NpdGlvbiA9IHRoaXMuY3VycmVudERyYWdQb3NpdGlvbjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLnN0YXJ0RHJhZ1Bvc2l0aW9uICsgZXZlbnQuZGlzdGFuY2UueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgdGhpcy5zbmFwUG9zaXRpb24oZXZlbnQudmVsb2NpdHkueSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNldFBvc2l0aW9uKHkpIHtcbiAgICAvLyBpZiB0aGUgc2hlZXQgaXMgYXQgdG9wIHRoZW4gc2V0dXAgc2Nyb2xsaW5nXG4gICAgaWYgKHkgPD0gdGhpcy5zY3JvbGxZKSB7XG4gICAgICB5ID0gdGhpcy5zY3JvbGxZO1xuICAgICAgdGhpcy5zdHlsZS50b3VjaEFjdGlvbiA9ICcnO1xuICAgICAgZGlzYWJsZURyYWdMaXN0ZW5lckZvckVsZW1lbnQodGhpcy5jb250ZW50RWxlbWVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1cnJlbnREcmFnUG9zaXRpb24gPT09IHkpIHJldHVybjtcbiAgICB0aGlzLnN0eWxlW01EV1V0aWxzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV0gPSBgdHJhbnNsYXRlM2QoMCwgJHt5fXB4LCAwKWA7XG4gICAgdGhpcy5jdXJyZW50RHJhZ1Bvc2l0aW9uID0geTtcblxuICAgIC8vIHNob3cgaGVhZGVyIGJlZm9yIGl0IGhpdHMgdGhlIHRvcFxuICAgIGlmICh5IC0gdGhpcy5zY3JvbGxZIDwgODApIHtcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5zaG93RnVsbHNjcmVlbigpO1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctc2hlZXQtZnVsbHNjcmVlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlYWRlckVsZW1lbnQuaGlkZUZ1bGxzY3JlZW4oKTtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LXNoZWV0LWZ1bGxzY3JlZW4nKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpcyBkcmFnZ2FibGVcbiAgICBpZiAodGhpcy5pc0RyYWdnYWJsZSkgdGhpcy5oZWFkZXJFbGVtZW50LnNob3dEcmFnSWNvbigpO1xuICB9XG5cbiAgc25hcFBvc2l0aW9uKHZlbG9jaXR5KSB7XG4gICAgLy8gc25hcCBiYXNlZCBvbiB2ZWxvY2l0eSAoc3dpcGUgbW9udGlvbilcbiAgICBpZiAodmVsb2NpdHkgPCAtMC43KSByZXR1cm4gdGhpcy5zZXRQb3NpdGlvbih0aGlzLnNjcm9sbFkpO1xuICAgIGlmICh0aGlzLnN0YXJ0RHJhZ1Bvc2l0aW9uID09PSB0aGlzLnNjcm9sbFkgJiYgdmVsb2NpdHkgPiAwLjcpIHJldHVybiB0aGlzLnNldFBvc2l0aW9uKDApO1xuICAgIGlmICh0aGlzLnN0YXJ0RHJhZ1Bvc2l0aW9uIDw9IDAgJiYgdmVsb2NpdHkgPiAwLjcpIHJldHVybiB0aGlzLmNsb3NlKCk7XG5cbiAgICAvLyBzbmFwIGJhc2VkIG9uIHBvc2l0aW9uXG4gICAgY29uc3Qgc3BsaXQgPSBNYXRoLmFicyh0aGlzLnNjcm9sbFkpIC8gMjtcbiAgICAvLyBoYWxmIHdheSBiZXR3ZWVuIGNlbnRlciBhbmQgdG9wXG4gICAgaWYgKHRoaXMuY3VycmVudERyYWdQb3NpdGlvbiAtIHRoaXMuc2Nyb2xsWSA8IHNwbGl0KSB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc2Nyb2xsWSk7XG4gICAgLy8gaGFsZiB3YXkgYmV0d2VlbiBjZW50ZXIgYW5kIGJvdHRvbVxuICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudERyYWdQb3NpdGlvbiA+IHNwbGl0KSB0aGlzLmNsb3NlKCk7XG4gICAgZWxzZSB0aGlzLnNldFBvc2l0aW9uKDApO1xuICB9XG5cbiAgb25TY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuY29udGVudEVsZW1lbnQuc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICBlbmFibGVEcmFnTGlzdGVuZXJGb3JFbGVtZW50KHRoaXMuY29udGVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1V0aWxzIGZyb20gJy4uLy4uL2NvcmUvVXRpbHMuanMnO1xuaW1wb3J0IHsgYWRkRHJhZ0xpc3RlbmVyLCByZW1vdmVEcmFnTGlzdGVuZXIsIGRpc2FibGVEcmFnTGlzdGVuZXJGb3JFbGVtZW50LCBlbmFibGVEcmFnTGlzdGVuZXJGb3JFbGVtZW50IH0gZnJvbSAnLi4vLi4vY29yZS9nZXN0dXJlcy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNsaWRlcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uTW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX29uTW91c2VFbnRlciA9IHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbk1vdXNlTGVhdmUgPSB0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfdHJhY2tDbGljayA9IHRoaXMudHJhY2tDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25EcmFnID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmF0dHJWYWx1ZTtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHsoKHRoaXMuYXR0clZhbHVlIC0gdGhpcy5taW4pIC8gdGhpcy5yYW5nZSkgKiB0aGlzLm9mZnNldFdpZHRofXB4YDtcbiAgICB0aGlzLm5vdGNoQ29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBgLSR7dGhpcy5vZmZzZXRXaWR0aCAtICgoKHRoaXMuYXR0clZhbHVlIC0gdGhpcy5taW4pIC8gdGhpcy5yYW5nZSkgKiB0aGlzLm9mZnNldFdpZHRoKX1weGA7XG4gICAgdGhpcy50aHJvdHRsZWRfZGlzcGF0Y2hDaGFuZ2UgPSBNRFdVdGlscy5yYWZUaHJvdHRsZSh0aGlzLmRpc3BhdGNoQ2hhbmdlKTtcbiAgICAvLyB0aGlzLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfb25Nb3VzZURvd24pO1xuICAgIC8vIHRoaXMudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuYm91bmRfb25Nb3VzZUVudGVyKTtcbiAgICAvLyB0aGlzLnRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF90cmFja0NsaWNrKTtcbiAgICBhZGREcmFnTGlzdGVuZXIodGhpcy50aHVtYiwgdGhpcy5ib3VuZF9vbkRyYWcpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gdGhpcy50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX29uTW91c2VEb3duKTtcbiAgICAvLyB0aGlzLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLmJvdW5kX29uTW91c2VFbnRlcik7XG4gICAgLy8gdGhpcy50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTGVhdmUpO1xuICAgIHRoaXMudHJhY2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX3RyYWNrQ2xpY2spO1xuICAgIC8vIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX29uTW91c2VVcCk7XG4gICAgLy8gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSk7XG4gICAgcmVtb3ZlRHJhZ0xpc3RlbmVyKHRoaXMudGh1bWIsIHRoaXMuYm91bmRfb25EcmFnKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3ZhbHVlJywgJ21pbicsICdtYXgnLCAnc3RlcCddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICBpZiAoWydtaW4nLCAnbWF4JywgJ3N0ZXAnXS5pbmNsdWRlcyhuYW1lKSkgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubWluXyB8fCAwO1xuICB9XG5cbiAgc2V0IG1pbih2YWx1ZSkge1xuICAgIHRoaXMubWluXyA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IG1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXhfIHx8IDEwMDtcbiAgfVxuXG4gIHNldCBtYXgodmFsdWUpIHtcbiAgICB0aGlzLm1heF8gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCByYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgfVxuXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLnN0ZXBfO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWUpIHtcbiAgICB0aGlzLnN0ZXBfID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgc3RlcENvdW50KCkge1xuICAgIHJldHVybiAhdGhpcy5zdGVwID8gMCA6IE1hdGguZmxvb3IodGhpcy5yYW5nZSAvIHRoaXMuc3RlcCk7XG4gIH1cblxuICBnZXQgYXR0clZhbHVlKCkge1xuICAgIGxldCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgfHwgMCk7XG4gICAgaWYgKHZhbHVlIDwgdGhpcy5taW4pIHZhbHVlID0gdGhpcy5taW47XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGNvbnN0IHsgd2lkdGggfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9ICh0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgfHwgJzBweCcpLnJlcGxhY2UoJ3B4JywgJycpO1xuICAgIGNvbnN0IHBlcmNlbnQgPSB4IC8gd2lkdGg7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJhbmdlO1xuICAgIHRoaXMudmFsdWVfID0gdGhpcy5taW4gKyAocGVyY2VudCAqIHJhbmdlKTtcbiAgICAvLyBjaGVjayBpZiB0aGUgc3RlcCBpcyBhIGludGVnZXIgYW5kIHRoZW4gZ2FyZW50ZWUgdGhlIHZhbHVlIGlzIGFuIGludFxuICAgIC8vIGJlY3Vhc2Ugb2YgaG93IG1hdGggd29ya3MgaW4gamF2YXNjcmlwdChmbG9hdGluZyBwb2ludCkgdGhpcyBpcyBub3QgYSBnYXJlbnRlZSB3aXRob3V0IHBhcnNlSW50XG4gICAgaWYgKCEoJycrdGhpcy5zdGVwKS5pbmNsdWRlcygnLicpKSB0aGlzLnZhbHVlXyA9IHBhcnNlSW50KHRoaXMudmFsdWVfKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZV8gfHwgMDtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWVfID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgdGh1bWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fdGh1bWItaG92ZXInKTtcbiAgfVxuXG4gIGdldCB0aHVtYkNvbnRhaW5lcigpIHtcbiAgICBpZiAoIXRoaXMudGh1bWJDb250YWluZXJfKSB0aGlzLnRodW1iQ29udGFpbmVyXyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fdGh1bWItY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJDb250YWluZXJfO1xuICB9XG5cbiAgZ2V0IG5vdGNoQ29udGFpbmVyKCkge1xuICAgIGlmICghdGhpcy5ub3RjaENvbnRhaW5lcl8pIHRoaXMubm90Y2hDb250YWluZXJfID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctc2xpZGVyX19ub3RjaC1jb250YWluZXInKTtcbiAgICByZXR1cm4gdGhpcy5ub3RjaENvbnRhaW5lcl87XG4gIH1cblxuICBnZXQgdHJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubWR3LXNsaWRlcl9fdHJhY2stY29udGFpbmVyJyk7XG4gIH1cblxuICB0cmFja0NsaWNrKGUpIHtcbiAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB4ID0gZS5sYXllclg7XG4gICAgaWYgKGUuY2xpZW50WCA8IGxlZnQpIHggPSAwO1xuICAgIGlmICh4ID4gd2lkdGgpIHggPSB3aWR0aDtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICB0aGlzLm5vdGNoQ29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBgLSR7dGhpcy5vZmZzZXRXaWR0aCAtIHRoaXMuc25hcCh4LCB3aWR0aCl9cHhgO1xuICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uRHJhZyhlKSB7XG4gICAgc3dpdGNoKGUuc3RhdGUpIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctcHJlc3NlZCcpO1xuICAgICAgICB0aGlzLmluaXRpYWxYXyA9IHBhcnNlSW50KCh0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgfHwgJzBweCcpLnJlcGxhY2UoJ3B4JywgJycpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHggPSBlLmRpc3RhbmNlLnggKyB0aGlzLmluaXRpYWxYXztcbiAgICAgICAgaWYgKHggPCAwKSB4ID0gMDtcbiAgICAgICAgaWYgKHggPiB3aWR0aCkgeCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnRodW1iQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICAgICAgdGhpcy5ub3RjaENvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYC0ke3RoaXMub2Zmc2V0V2lkdGggLSB0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICAgICAgdGhpcy50aHJvdHRsZWRfZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1wcmVzc2VkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VEb3duKGUpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1wcmVzc2VkJyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfb25Nb3VzZVVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kX29uTW91c2VNb3ZlKTtcbiAgfVxuXG4gIG9uTW91c2VVcChlKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctcHJlc3NlZCcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX29uTW91c2VVcCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9vbk1vdXNlTW92ZSk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgeCA9IGUubGF5ZXJYO1xuICAgIGlmIChlLmNsaWVudFggPCBsZWZ0KSB4ID0gMDtcbiAgICBpZiAoeCA+IHdpZHRoKSB4ID0gd2lkdGg7XG4gICAgdGhpcy50aHVtYkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5zbmFwKHgsIHdpZHRoKX1weGA7XG4gICAgdGhpcy5ub3RjaENvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYC0ke3RoaXMub2Zmc2V0V2lkdGggLSB0aGlzLnNuYXAoeCwgd2lkdGgpfXB4YDtcbiAgICB0aGlzLnRocm90dGxlZF9kaXNwYXRjaENoYW5nZSgpO1xuICB9XG5cbiAgb25Nb3VzZUVudGVyKGUpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1ob3ZlcicpO1xuICAgIHRoaXMudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuYm91bmRfb25Nb3VzZUxlYXZlKTtcbiAgfVxuXG4gIG9uTW91c2VMZWF2ZShlKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctaG92ZXInKTtcbiAgICB0aGlzLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmJvdW5kX29uTW91c2VMZWF2ZSk7XG4gIH1cblxuICBzbmFwKHgsIHdpZHRoKSB7XG4gICAgaWYgKCF0aGlzLnN0ZXApIHJldHVybiB4O1xuICAgIGNvbnN0IHBlcmNlbnQgPSB4IC8gd2lkdGg7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJhbmdlO1xuICAgIGNvbnN0IGNvbnZlcnRlZFZhbHVlID0gcGVyY2VudCAqIHJhbmdlO1xuICAgIGNvbnN0IHNuYXBlZFZhbHVlID0gY29udmVydGVkVmFsdWUgLSAoY29udmVydGVkVmFsdWUgJSB0aGlzLnN0ZXApO1xuICAgIHJldHVybiAoc25hcGVkVmFsdWUgLyByYW5nZSkgKiB3aWR0aFxuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190cmFjay1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX3RyYWNrXCI+PC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX25vdGNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAke1suLi5uZXcgQXJyYXkodGhpcy5zdGVwQ291bnQpXS5tYXAoaSA9PiBgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX25vdGNoXCI+PC9kaXY+YCkuam9pbignXFxuJyl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fbm90Y2gtcG9zdC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICR7Wy4uLm5ldyBBcnJheSh0aGlzLnN0ZXBDb3VudCldLm1hcChpID0+IGA8ZGl2IGNsYXNzPVwibWR3LXNsaWRlcl9fbm90Y2hcIj48L2Rpdj5gKS5qb2luKCdcXG4nKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190aHVtYi1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1zbGlkZXJfX3RodW1iXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctc2xpZGVyX190aHVtYi1ob3ZlclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgLm1kdy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIG1hcmdpbi10b3A6IC02cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICAubWR3LXNsaWRlcl9fdHJhY2sge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc2Vjb25kYXJ5KTsgKi9cbiAgICAgIH1cblxuICAgICAgLyogOmhvc3QoLm1kdy1wcmltYXJ5KSAubWR3LXNsaWRlcl9fdHJhY2sge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctc2xpZGVyX190cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9ICovXG5cblxuICAgICAgLm1kdy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgfVxuXG4gICAgICAubWR3LXNsaWRlcl9fdGh1bWIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgICAgaGVpZ2h0OiAxMnB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIG1hcmdpbi10b3A6IC01MCU7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX190aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1zbGlkZXJfX3RodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX3RodW1iLWhvdmVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB0b3A6IC0xMnB4O1xuICAgICAgICBsZWZ0OiAtNnB4O1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjFzIGVhc2Utb3V0LGZpbGwgLjFzIGVhc2Utb3V0LFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gLjFzIGVhc2Utb3V0LGZpbGwgLjFzIGVhc2Utb3V0O1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnktLXJnYiksIDAuMTYpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX190aHVtYi1ob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXNsaWRlcl9fdGh1bWItaG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1lcnJvci0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctaG92ZXIpIC5tZHctc2xpZGVyX190aHVtYi1ob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJlc3NlZCkgLm1kdy1zbGlkZXJfX3RodW1iLWhvdmVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xuICAgICAgfVxuXG5cblxuXG4gICAgICAvKiAtLS0gbm90Y2hlcyAtLS0gKi9cblxuICAgICAgLm1kdy1zbGlkZXJfX25vdGNoLWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHdpZHRoOiAyMDAlO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX25vdGNoLXByZS1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LXByaW1hcnkpIC5tZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXNsaWRlcl9fbm90Y2gtcHJlLWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1wcmUtY29udGFpbmVyIC5tZHctc2xpZGVyX19ub3RjaCB7XG4gICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICAgIH1cblxuICAgICAgLm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMnB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC41KTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtcHJpbWFyeS0tcmdiKSwgMC41KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLm1kdy1lcnJvcikgLm1kdy1zbGlkZXJfX25vdGNoLXBvc3QtY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuNSk7XG4gICAgICB9XG5cbiAgICAgIC5tZHctc2xpZGVyX19ub3RjaC1wb3N0LWNvbnRhaW5lciAubWR3LXNsaWRlcl9fbm90Y2gge1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1NuYWNrYmFyIGZyb20gJy4vc2VydmljZS5qcyc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXNuYWNrYmFyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSA9IHRoaXMub25QYW5lbENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wYW5lbElkID0gYCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJyl9X3BhbmVsYDtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucXVlcnlTZWxlY3RvcignbWR3LXBhbmVsJykuc2V0QXR0cmlidXRlKCdpZCcsIGAke3RoaXMucGFuZWxJZH1gKTtcbiAgICB0aGlzLmhhc0Jja2Ryb3AgPSB0cnVlO1xuICAgIHRoaXMucGFuZWwuY2xpY2tPdXRzaWRlQ2xvc2UgPSBmYWxzZTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignTURXUGFuZWw6Y2xvc2VkJywgdGhpcy5ib3VuZF9vblBhbmVsQ2xvc2UpO1xuICB9XG5cbiAgZ2V0IHBhbmVsKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLnBhbmVsSWR9YCk7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25fIHx8ICdpbm5lci1ib3R0b20gaW5uZXItbGVmdCc7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZSkge1xuICAgIGNvbnN0IHNwbGl0ID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICB0aGlzLnBvc2l0aW9uXyA9IGAke3NwbGl0WzBdIHx8ICd0b3AnfSAke3NwbGl0WzFdIHx8ICdsZWZ0J31gO1xuICAgIHRoaXMucGFuZWwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICBzaG93KCkge1xuICAgIE1EV1NuYWNrYmFyLmFkZCh0aGlzKTtcbiAgfVxuXG4gIGNsb3NlKG9rKSB7XG4gICAgTURXU25hY2tiYXIucmVtb3ZlKHRoaXMsIG9rKTtcbiAgfVxuXG4gIF9vcGVuKCkge1xuICAgIHRoaXMucGFuZWwuaG9pc3RUb0JvZHkodGhpcy5wYXJlbnROb2RlKTtcbiAgICB0aGlzLnBhbmVsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIHRoaXMucGFuZWwuYXV0b1Bvc2l0aW9uKCk7XG4gICAgdGhpcy5wYW5lbC5vcGVuKCk7XG4gICAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgdGhpcy5hdXRvQ2FuY2VsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgX2Nsb3NlKG9rKSB7XG4gICAgdGhpcy5wYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNRFdQYW5lbDpjbG9zZWQnLCB0aGlzLmJvdW5kX29uUGFuZWxDbG9zZSk7XG4gICAgdGhpcy5wYW5lbC5jbG9zZSgpO1xuICAgIHRoaXMuZGlzcGF0Y2hDbG9zZShvayk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYXV0b0NhbmNlbFRpbWVvdXQpO1xuXG4gICAgLy8gcmVtb3ZlIHBhbmVsIGVsZW1lbnRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucGFuZWwucmVtb3ZlKCk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG9uUGFuZWxDbG9zZSgpIHtcbiAgICB0aGlzLnBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ01EV1BhbmVsOmNsb3NlZCcsIHRoaXMuYm91bmRfb25QYW5lbENsb3NlKTtcbiAgfVxuXG4gIGRpc3BhdGNoQ2xvc2UoaXNPayA9IGZhbHNlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2xvc2UnLCB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgb2s6IGlzT2tcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cbn0pO1xuIiwiY29uc3QgTURXU25hY2tiYXIgPSBuZXcgY2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gIH1cblxuICBhZGQoZWwpIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goe2VsfSk7XG4gICAgdGhpcy5oYW5kbGVRdWV1ZSgpO1xuICB9XG5cbiAgcmVtb3ZlKGVsLCBvaykge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmVsID09PSBlbCkgZWwuX2Nsb3NlKG9rKTtcbiAgICBlbHNlIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihlID0+IGUuZWwgIT09IGVsKTtcbiAgfVxuXG4gIGhhbmRsZVF1ZXVlKCkge1xuICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgIHRoaXMuY3VycmVudC5lbC5fb3BlbigpO1xuICAgICAgdGhpcy5jdXJyZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlUXVldWUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNob3coeyBtZXNzYWdlLCBhY3Rpb25MYWJlbCwgcG9zaXRpb24gfSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy51aWQoKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7IGlkLCBtZXNzYWdlLCBhY3Rpb25MYWJlbCB9KTtcblxuICAgICAgdGhpcy50b3BMZXZlbEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuICAgICAgY29uc3Qgb25jbG9zZSA9IChlKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZS5kZXRhaWwub2spO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgIH07XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgaWYgKHBvc2l0aW9uKSBlbC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICBlbC5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdG9wTGV2ZWxFbGVtZW50KCkge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignbWR3LWNvbnRlbnQnKTtcbiAgICBpZiAoZWwpIHJldHVybiBlbDtcblxuICAgIGVsID0gZG9jdW1lbnQuYm9keXF1ZXJ5U2VsZWN0b3IoJ21kdy1ib2R5Jyk7XG4gICAgaWYgKGVsKSByZXR1cm4gZWw7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIHVpZCgpIHtcbiAgICByZXR1cm4gYHNuYWNrYmFyXyR7cGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDk5OTk5KX1gO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBpZCwgbWVzc2FnZSwgYWN0aW9uTGFiZWwgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8bWR3LXNuYWNrYmFyIGlkPVwiJHtpZH1cIj5cbiAgICAgICAgPG1kdy1wYW5lbD5cbiAgICAgICAgICA8bWR3LXNuYWNrYmFyLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxtZHctc25hY2tiYXItY29udGVudD4ke21lc3NhZ2V9PC9tZHctc25hY2tiYXItY29udGVudD5cbiAgICAgICAgICAgIDxtZHctc25hY2tiYXItYWN0aW9ucz5cbiAgICAgICAgICAgICAgJHshIWFjdGlvbkxhYmVsID8gYDxtZHctYnV0dG9uIGNsYXNzPVwibWR3LWFjdGlvbi1idXR0b25cIj4ke2FjdGlvbkxhYmVsfTwvbWR3LWJ1dHRvbj5gIDogJyd9XG4gICAgICAgICAgICAgIDxtZHctYnV0dG9uIG9uY2xpY2s9XCIke2lkfS5jbG9zZSh0cnVlKVwiIGNsYXNzPVwibWR3LWNsb3NlLWJ1dHRvbiBtZHctaWNvblwiPlxuICAgICAgICAgICAgICAgIDxtZHctaWNvbj5jbG9zZTwvbWR3LWljb24+XG4gICAgICAgICAgICAgIDwvbWR3LWJ1dHRvbj5cbiAgICAgICAgICAgIDwvbWR3LXNuYWNrYmFyLWFjdGlvbnM+XG4gICAgICAgICAgPC9tZHctc25hY2tiYXItY29udGFpbmVyPlxuICAgICAgICA8L21kdy1wYW5lbD5cbiAgICAgIDwvbWR3LXNuYWNrYmFyPlxuICAgIGA7XG4gIH1cbn1cblxud2luZG93Lk1EV1NuYWNrYmFyID0gTURXU25hY2tiYXI7XG5cbmV4cG9ydCBkZWZhdWx0IE1EV1NuYWNrYmFyO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRFeHRlbmRlZCB9IGZyb20gJ0B3ZWJmb3JtdWxhL3BheC1jb3JlJztcbmltcG9ydCBNRFdSaXBwbGUgZnJvbSAnLi4vLi4vY29yZS9SaXBwbGUuanMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy1zd2l0Y2gnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfb25JbnB1dENoYW5nZSA9IHRoaXMub25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvbmVUZW1wbGF0ZSgpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kX29uSW5wdXRDaGFuZ2UpO1xuICAgIHRoaXMucmlwcGxlID0gbmV3IE1EV1JpcHBsZSh7XG4gICAgICBlbGVtZW50OiB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1kdy1yaXBwbGUnKSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiBbdGhpcy5pbnB1dF0sXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgY2VudGVyZWQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kX2NsaWNrKTtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydjaGVja2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IGlucHV0KCkge1xuICAgIGlmICghdGhpcy5pbnB1dF8pIHRoaXMuaW5wdXRfID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRfO1xuICB9XG5cbiAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tlZDtcbiAgfVxuXG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAnJykgdmFsdWUgPSB0cnVlO1xuICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlQ2hlY2tlZENsYXNzKCk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICAgIGlmICh2YWx1ZSkgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgZWxzZSB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZUNoZWNrZWRDbGFzcygpIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ2NoZWNrZWQnKTtcbiAgICBlbHNlIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgdGhpcykpO1xuICB9XG5cbiAgb25JbnB1dENoYW5nZShlKSB7XG4gICAgdGhpcy51cGRhdGVDaGVja2VkQ2xhc3MoKTtcbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctdHJhY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctdGh1bWItdW5kZXJsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy10aHVtYlwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByb2xlPVwic3dpdGNoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1yaXBwbGUgbWR3LXN3aXRjaC1yaXBwbGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICAubWR3LXRyYWNrIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGhlaWdodDogMTRweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAgICAgb3BhY2l0eTogLjM4O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDkwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSksXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yIDkwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KDpub3QoLmNoZWNrZWQpKSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXN3aXRjaHRyYWNrKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtc3dpdGNodHJhY2spO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCguY2hlY2tlZCkgLm1kdy10cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1zZWNvbmRhcnkpO1xuICAgICAgICBvcGFjaXR5OiAuNTQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkLm1kdy1wcmltYXJ5KSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQubWR3LWVycm9yKSAubWR3LXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIHRodW1iIHVuZGVybGF5IC0tLSAqL1xuXG4gICAgICAubWR3LXRodW1iLXVuZGVybGF5IHtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsMCwwLDApO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm0sb3BhY2l0eTtcbiAgICAgICAgbGVmdDogLTE4cHg7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICB0b3A6IC0xN3B4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvciA5MG1zIGN1YmljLWJlemllciguNCwwLC4yLDEpLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXItY29sb3IgOTBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQpIC5tZHctdGh1bWItdW5kZXJsYXkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG4gICAgICB9XG5cbiAgICAgIC5tZHctdGh1bWItdW5kZXJsYXk6YWZ0ZXIsXG4gICAgICAubWR3LXRodW1iLXVuZGVybGF5OmJlZm9yZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy10aHVtYi11bmRlcmxheTphZnRlcixcbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy10aHVtYi11bmRlcmxheTpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctZXJyb3IpIC5tZHctdGh1bWItdW5kZXJsYXk6YWZ0ZXIsXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXRodW1iLXVuZGVybGF5OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kdy10aGVtZS1lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC5tZHctdGh1bWItdW5kZXJsYXk6YmVmb3JlIHtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNW1zIGxpbmVhcixiYWNrZ3JvdW5kLWNvbG9yIDE1bXMgbGluZWFyO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG5cblxuICAgICAgLyogLS0tIHRodW1iIC0tLSAqL1xuXG4gICAgICAubWR3LXRodW1iIHtcbiAgICAgICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksXG4gICAgICAgICAgICAgICAgICAgIDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSxcbiAgICAgICAgICAgICAgICAgICAgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICBib3JkZXI6IDEwcHggc29saWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkKSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkLm1kdy1wcmltYXJ5KSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLW1kdy10aGVtZS1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoLmNoZWNrZWQubWR3LWVycm9yKSAubWR3LXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLWVycm9yKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tZHctdGhlbWUtZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCg6bm90KC5jaGVja2VkKSkgLm1kdy10aHVtYiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgIGJvcmRlci1jb2xvcjogI2ZmZjtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gaW5wdXQgLS0tICovXG5cbiAgICAgIGlucHV0IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogNjhweDtcbiAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5jaGVja2VkKSBpbnB1dCB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XG4gICAgICB9XG5cblxuXG4gICAgICAvKiAtLS0gcmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXNlY29uZGFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctcHJpbWFyeSkgLm1kdy1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0tbWR3LXRoZW1lLXByaW1hcnktLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWVycm9yKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtZXJyb3ItLXJnYiksIDAuMTYpO1xuICAgICAgfVxuXG4gICAgICAubWR3LXN3aXRjaC1yaXBwbGUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYi1ib2R5JywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsb25lVGVtcGxhdGUoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlckJvZHkodGhpcyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUudW5yZWdpc3RlckJvZHkodGhpcyk7XG4gIH1cblxuICBhZGRTbG90KCkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdtZHctdGFiLWJvZHktY29udGVudCcpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgJzxzbG90Pjwvc2xvdD4nKTtcbiAgfVxuXG4gIHJlbW92ZVNsb3QoKSB7XG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3QnKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRkU2xvdCgpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbWR3LWFjdGl2ZScpO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnJlbW92ZVNsb3QoKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1hY3RpdmUnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy10YWItYm9keS1jb250ZW50PlxuICAgICAgICA8IS0tIHNsb3QgaXMgYWRkZWQgZHluYW1pY2x5IC0tPlxuICAgICAgPC9tZHctdGFiLWJvZHktY29udGVudD5cbiAgICBgO1xuICB9XG5cbiAgc3R5bGVzKCkge1xuICAgIHJldHVybiAvKiBjc3MgKi9gXG4gICAgICBtZHctdGFiLWJvZHktY29udGVudCB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuaW1wb3J0IE1EV1JpcHBsZSBmcm9tICcuLi8uLi8uLi9jb3JlL1JpcHBsZS5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYi1idXR0b24nLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYm91bmRfY2xpY2sgPSB0aGlzLmNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBNRFdSaXBwbGUoe1xuICAgICAgZWxlbWVudDogdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctcmlwcGxlJyksXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpc1xuICAgIH0pO1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZWdpc3RlclRhYih0aGlzKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZF9jbGljayk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnVucmVnaXN0ZXJUYWIodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRfY2xpY2spO1xuICB9XG5cbiAgZ2V0IGluZGljYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5tZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQnKTtcbiAgfVxuXG4gIGNsaWNrKGUpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUudGFiQ2xpY2sodGhpcyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fYW5pbWF0aW9uVGltZXIpO1xuICAgIHRoaXMuaW5kaWNhdG9yLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgIHRoaXMuX3J1bk5leHRBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1hY3RpdmUnKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlKG1vdmVYKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICB0aGlzLmluZGljYXRvci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke21vdmVYLnRvU3RyaW5nKCl9cHgpYDtcbiAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdtZHctYWN0aXZlJyk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIF9ydW5OZXh0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25GcmFtZSk7XG4gICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgfSk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqL2BcbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPjxzbG90Pjwvc2xvdD48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kdy10YWItYnV0dG9uLWluZGljYXRvclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1kdy10YWItYnV0dG9uLWluZGljYXRvcl9fY29udGVudCBtZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZVwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZHctcmlwcGxlIG1kdy10YWItYnV0dG9uLXJpcHBsZVwiPjwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIC8qIGNzcyAqL2BcbiAgICAgIDpob3N0KC5tZHctc2hvdy1zcGlubmVyKSBzcGFuLnRleHQge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGhpcyB0byBidXR0b24gb3IgY3JlYXQgYSBuZXcgY29tcG9uZW5ldCBtZHctdGFiICovXG4gICAgICAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCgubWR3LWFjdGl2ZSkgLm1kdy10YWItYnV0dG9uLWluZGljYXRvciAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yX19jb250ZW50IHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4ycyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICAgIH1cblxuICAgICAgLm1kdy10YWItYnV0dG9uLWluZGljYXRvcl9fY29udGVudCB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQ7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYWN0aXZlKSAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yX19jb250ZW50IHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LXRhYi1idXR0b24taW5kaWNhdG9yIC5tZHctdGFiLWJ1dHRvbi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWR3LXRoZW1lLXByaW1hcnkpO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgIH1cblxuXG4gICAgICAvKiAtLS0gUmlwcGxlIC0tLSAqL1xuXG4gICAgICAubWR3LXJpcHBsZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLm1kdy1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5tZHctcmlwcGxlLWVsZW1lbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLW1kdy10aGVtZS1mb3JlZ3JvdW5kLS1yZ2IpLCAwLjE2KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgfVxuXG4gICAgICAubWR3LXRhYi1idXR0b24tcmlwcGxlLFxuICAgICAgLm1kdy10YWItYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgICAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KC5tZHctYWN0aXZlKSAubWR3LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1tZHctdGhlbWUtcHJpbWFyeS0tcmdiKSwgMC4xNik7XG4gICAgICB9XG4gICAgYDtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudEV4dGVuZGVkIH0gZnJvbSAnQHdlYmZvcm11bGEvcGF4LWNvcmUnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21kdy10YWJzLWJhcicsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWN0aXZlVGFiID0gMDtcbiAgICB0aGlzLnRhYklkQ291bnRlciA9IDA7XG4gICAgdGhpcy5fY29udGVudEVsZW1lbnRzID0gW107XG4gICAgdGhpcy5jbG9uZVRlbXBsYXRlKCk7XG4gIH1cblxuICAvLyBjYWxsZWQgZnJvbSBtZHctdGFiXG4gIHJlZ2lzdGVyVGFiKGVsKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKCd0YWItaWQnLCB0aGlzLnRhYklkQ291bnRlcik7XG4gICAgaWYgKHRoaXMudGFiSWRDb3VudGVyID09PSAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IGVsO1xuICAgICAgZWwuYWN0aXZhdGUoKTtcbiAgICB9XG4gICAgdGhpcy50YWJJZENvdW50ZXIrKztcbiAgfVxuXG4gIC8vIGNhbGxlZCBmcm9tIG1kdy10YWJcbiAgdW5yZWdpc3RlclRhYihlbCkge1xuICAgIC8vIFRPRE8gaGFuZGxlIGlmIGl0IGlzIGFjdGl2ZVxuICB9XG5cbiAgLy8gY2FsbGVkIGZyb20gbWR3LXRhYnMtY29udGVudFxuICByZWdpc3RlckNvbnRlbnQoZWwpIHtcbiAgICB0aGlzLl9jb250ZW50RWxlbWVudHMucHVzaChlbCk7XG4gICAgZWwuY2hhbmdlVGFiKHRoaXMuYWN0aXZlVGFiLmdldEF0dHJpYnV0ZSgndGFiLWlkJykpO1xuICB9XG5cbiAgLy8gY2FsbGVkIGZyb20gbWR3LXRhYnMtY29udGVudFxuICB1bnJlZ2lzdGVyQ29udGVudChlbCkge1xuICAgIHRoaXMuX2NvbnRlbnRFbGVtZW50cyA9IHRoaXMuX2NvbnRlbnRFbGVtZW50cy5maWx0ZXIoZSA9PiBlICE9IGVsKTtcbiAgfVxuXG4gIC8vIGNhbGxlZCBmcm9tIG1kdy10YWJcbiAgdGFiQ2xpY2soZWwpIHtcbiAgICBjb25zdCBtb3ZlWCA9IHBhcnNlSW50KGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnggLSB0aGlzLmFjdGl2ZVRhYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54KTtcbiAgICB0aGlzLmFjdGl2ZVRhYi5kZWFjdGl2YXRlKG1vdmVYKTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGVsO1xuICAgIHRoaXMuYWN0aXZlVGFiLmFjdGl2YXRlKCk7XG4gICAgdGhpcy5fY29udGVudEVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWwuY2hhbmdlVGFiKHRoaXMuYWN0aXZlVGFiLmdldEF0dHJpYnV0ZSgndGFiLWlkJykpKTtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIHNldCBhY3RpdmVUYWIoZWwpIHtcbiAgICB0aGlzLl9hY3RpdmVUYWIgPSBlbDtcbiAgfVxuXG4gIGdldCBpbnRlcm5hbFN0eWxlc0ZpbGUoKSB7XG4gICAgcmV0dXJuICcuL2ludGVybmFsLmNzcydcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiAvKiBodG1sICovYFxuICAgICAgPG1kdy10YWJzLWJhci1zY3JvbGxlcj5cbiAgICAgICAgPG1kdy10YWJzLWJhci1zY3JvbGxlci1hcmVhPlxuICAgICAgICAgIDxtZHctdGFicy1iYXItc2Nyb2xsZXItY29udGVudD5cbiAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgICA8L21kdy10YWJzLWJhci1zY3JvbGxlci1jb250ZW50PlxuICAgICAgICA8L21kdy10YWJzLWJhci1zY3JvbGxlci1hcmVhPlxuICAgICAgPC9tZHctdGFicy1iYXItc2Nyb2xsZXI+XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlcygpIHtcbiAgICByZXR1cm4gLyogY3NzICovYFxuICAgICAgbWR3LXRhYnMtYmFyLXNjcm9sbGVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgIH1cblxuICAgICAgbWR3LXRhYnMtYmFyLXNjcm9sbGVyLWFyZWEge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAvKiBvdmVyZmxvdy14OiBzY3JvbGw7ICovXG4gICAgICB9XG5cbiAgICAgIG1kdy10YWJzLWJhci1zY3JvbGxlci1jb250ZW50IHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICAgICAgfVxuXG4gICAgICA6OnNsb3R0ZWQobWR3LWJ1dHRvbikge1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgIH1cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRhYnMtY29udGVudCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYm9kaWVzID0gW107XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnRhYnNCYXIucmVnaXN0ZXJDb250ZW50KHRoaXMpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy50YWJzQmFyICYmIHRoaXMudGFic0Jhci51bnJlZ2lzdGVyQ29udGVudCh0aGlzKTtcbiAgfVxuXG4gIGdldCB0YWJzQmFyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYG1kdy10YWJzLWJhciMke3RoaXMuZ2V0QXR0cmlidXRlKCd0YWJzLWlkJyl9YCk7XG4gIH1cblxuICByZWdpc3RlckJvZHkoZWwpIHtcbiAgICB0aGlzLl9ib2RpZXMucHVzaChlbCk7XG4gICAgaWYgKHRoaXMuX3dpYXRGb3JCb2R5QWN0aXZlSWQgICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fYm9kaWVzLmxlbmd0aCA9PT0gdGhpcy5fd2lhdEZvckJvZHlBY3RpdmVJZCArIDEpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZUJvZHkgPSBlbDtcbiAgICAgIGVsLmFjdGl2YXRlKCk7XG4gICAgICB0aGlzLl93aWF0Rm9yQm9keUFjdGl2ZUlkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHVucmVnaXN0ZXJCb2R5KGVsKSB7XG4gICAgdGhpcy5fYm9kaWVzID0gdGhpcy5fYm9kaWVzLmZpbHRlcihpID0+IGkgIT0gZWwpO1xuICB9XG5cbiAgY2hhbmdlVGFiKHRhYklkKSB7XG4gICAgaWYgKCF0aGlzLl9ib2RpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl93aWF0Rm9yQm9keUFjdGl2ZUlkID0gcGFyc2VJbnQodGFiSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWN0aXZlQm9keSkgdGhpcy5fYWN0aXZlQm9keS5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5fYWN0aXZlQm9keSA9IHRoaXMuX2JvZGllc1t0YWJJZF07XG4gICAgdGhpcy5fYWN0aXZlQm9keS5hY3RpdmF0ZSgpO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRleHRmaWVsZCcsIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnRFeHRlbmRlZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctbm8tYW5pbWF0aW9uJyk7XG4gICAgdGhpcy5ib3VuZF9vbkZvY3VzID0gdGhpcy5vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9vbkJsdXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfb25JbnB1dCA9IHRoaXMub25JbnB1dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5jb21wb3NlKCk7XG4gICAgdGhpcy5jaGVja0ZvclZhbHVlKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbWR3LW5vLWFuaW1hdGlvbicpO1xuICAgIH0sIDApO1xuXG4gICAgLy8gYWRkIGxpc3RlbmVyc1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmJvdW5kX29uRm9jdXMpO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuYm91bmRfb25CbHVyKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZF9vbklucHV0KTtcblxuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWR3LWludmFsaWQnLCAhdGhpcy52YWxpZCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyByZW1vdmUgbGlzdGVuZXJzXG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuYm91bmRfb25Gb2N1cyk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ib3VuZF9vbkJsdXIpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kX29uSW5wdXQpO1xuICB9XG5cbiAgY29tcG9zZSgpIHtcbiAgICAvKiBGb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgbW9zdCBvZiB0aGUgZmVhdHVyZXMgYXJlIGJ1aWx0IHdpdGggY3NzIGFuZCB0aGUgY29kZSBpcyB0cmVhdGVkIGFzIGFuIHVwZ3JhZGVcbiAgICAgKiAgJ21kdy11cGdyYWRlZCcgbGV0cyB1cyBrbm93IHRoYXQgdGhlIGNvZGUgaXMgaG9va2VkIHVwXG4gICAgICovXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdtZHctdXBncmFkZWQnKTtcblxuICAgIC8qIHRleHRhcmVhIGNzcyBtYXJrZXJcbiAgICAgKiAgdGVzdCBhcmVhIG1vc3RseSB3b3JrcyB3aXRob3V0IHdjIGNvbXBhdGFiaWxpdHkuIFRoZSBvbmx5IHRoaW5nIHRoYXQgZG9lcyBub3Qgd29yayBpcyBzb21lIG92ZXJsYXBwaW5nIHdpdGggdGhlIGxhYmVsXG4gICAgICovXG4gICAgaWYgKHRoaXMuaXNUZXh0YXJlYSgpKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy10ZXh0YXJlYScpO1xuXG4gICAgLyogQWRkIGh0bWwgZm9yIG91dGxpbmVkXG4gICAgICogIG91dGxpbmVkIGRvZXMgbm90IHdvcmsgd2l0aG91dCBjb21wYXRhYmlsaXR5XG4gICAgICovXG4gICAgaWYgKHRoaXMub3V0bGluZWQpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLm91dGxpbmVkSFRNTCk7XG4gICAgICB0aGlzLnNldE5vdGNoV2lkdGgoKTtcbiAgICB9XG5cbiAgICAvKiBBZGQgcmlwcGxlIGh0bWwgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKi9cbiAgICBpZiAoIXRoaXMucXVlcnlTZWxlY3RvcignLm1kdy1saW5lLXJpcHBsZScpKSB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5saW5lUmlwcGxlSFRNTCk7XG5cbiAgICAvKiBGaXggbGF5b3V0IGZvciBpY29ucyBibGFjZWQgYmVmb3JlIGhlIGlucHV0XG4gICAgICogIFRoaXMgaXMgbm90IGhhbmRsZWQgaW4gbm9uIGNvbXBhdGFibGUgYnJvd3NlcnNcbiAgICAgKi9cbiAgICBpZiAodGhpcy5pc1RyYWlsaW5nSWNvbigpKSB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy10cmFpbGluZy1pY29uJyk7XG4gIH1cblxuICBjaGVja0ZvclZhbHVlKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbm90LWVtcHR5JywgISF0aGlzLmlucHV0LnZhbHVlLmxlbmd0aCk7XG4gIH1cblxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuc2V0Tm90Y2hXaWR0aCgpO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbm90LWVtcHR5JywgISF0aGlzLmlucHV0LnZhbHVlLmxlbmd0aCk7XG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdtZHctaW52YWxpZCcsICF0aGlzLnZhbGlkKTtcbiAgfVxuXG4gIG9uSW5wdXQoKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdtZHctaW52YWxpZCcsICF0aGlzLnZhbGlkKTtcbiAgfVxuXG4gIHNldE5vdGNoV2lkdGgoKSB7XG4gICAgaWYgKHRoaXMub3V0bGluZWQpIHRoaXMubm90Y2guc3R5bGUud2lkdGggPSB0aGlzLmxhYmVsV2lkdGggKyAncHgnO1xuICB9XG5cbiAgLyogSWNvbnMgY2FuIGJlIHBsYWNlcyBhdCB0aGUgYmVnaW5pbmcgcm8gZW5kIG9mIGEgdGV4dCBmaWVsZFxuICAgKiB0aGVyZSBpcyBzb21lIGNzcyB0aGF0IGlzIGhhcmQgdG8gYXBwbHkgd2hlbiB0aGUgaWNvbiBpcyBhdCB0aGUgYmVnaW5pbmcsIHRoaXMgaGVscHNcbiAgICovXG4gIGlzVHJhaWxpbmdJY29uKCkge1xuICAgIGlmICghdGhpcy5pY29uRWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBbLi4udGhpcy5jaGlsZHJlbl0uaW5kZXhPZih0aGlzLmljb25FbGVtZW50KSA+IDE7XG4gIH1cblxuICBpc1RleHRhcmVhKCkge1xuICAgIHJldHVybiAhIXRoaXMucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKTtcbiAgfVxuXG4gIGdldCB2YWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC52YWxpZGl0eS52YWxpZDtcbiAgfVxuXG4gIGdldCBvdXRsaW5lZCgpIHtcbiAgICByZXR1cm4gW10uc2xpY2UuYXBwbHkodGhpcy5jbGFzc0xpc3QgfHwgW10pLmluY2x1ZGVzKCdtZHctb3V0bGluZWQnKTtcbiAgfVxuXG4gIGdldCBpbnB1dCgpIHtcbiAgICBpZiAoIXRoaXMuaW5wdXRUeXBlXykgdGhpcy5pbnB1dFR5cGVfID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpID8gJ2lucHV0JyA6ICd0ZXh0YXJlYSc7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmlucHV0VHlwZV8pO1xuICB9XG5cbiAgLy8gdGhpcyBpcyB0aGUgc2VjdGlvbiB3aGVyZSB0aGUgbGFiZWxzIHNpdHMgd2hlbiBpbiBvdXRsaW5lZCBtb2RlXG4gIGdldCBub3RjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWR3LW91dGxpbmVkLW5vdGNoJyk7XG4gIH1cblxuICBnZXQgbGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgYSBtb3JlIGFjdXJhdGUgd2F5IG9yIGdldHRpbmcgdGhlIHdpZHRoXG4gIGdldCBsYWJlbFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmxhYmVsLm9mZnNldFdpZHRoICogMC45NTtcbiAgfVxuXG4gIGdldCBoZWxwZXJUZXh0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdtZHctdGV4dGZpZWxkLWhlbHBlcicpO1xuICB9XG5cbiAgZ2V0IGljb25FbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ21kdy1pY29uJyk7XG4gIH1cblxuICBnZXQgb3V0bGluZWRIVE1MKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWR3LW91dGxpbmVkLWJvcmRlci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC1sZWFkaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZHctb3V0bGluZWQtbm90Y2hcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kdy1vdXRsaW5lZC10cmFpbGluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIGdldCBsaW5lUmlwcGxlSFRNTCgpIHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJtZHctbGluZS1yaXBwbGVcIj48L2Rpdj4nO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRvb2x0aXAnLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50RXh0ZW5kZWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIC8qIGh0bWwgKi9gXG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcFwiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59KTtcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50RXh0ZW5kZWQgfSBmcm9tICdAd2ViZm9ybXVsYS9wYXgtY29yZSc7XG5pbXBvcnQgTURXVXRpbHMgZnJvbSAnLi4vLi4vY29yZS9VdGlscy5qcyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbWR3LXRvcC1hcHAtYmFyJywgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudEV4dGVuZGVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLk1BWF9UT1BfQVBQX0JBUl9IRUlHSFQgPSAxMjg7XG4gICAgdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA9IDA7XG4gICAgdGhpcy53YXNEb2NrZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNEb2NrZWRTaG93aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ3VycmVudGx5QmVpbmdSZXNpemVkID0gZmFsc2U7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNjcm9sbFRhcmdldCA9IHRoaXMuZ2V0U2Nyb2xsVGFyZ2V0KCk7XG4gICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xuICAgIHRoaXMudG9wQXBwQmFySGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAvLyBhZGQgc3BhY2VyIHRvIGNvbnRlbnQgYXJlYVxuICAgIC8vIFRPRE8gYWRkIGFub3RoZXIgY2xhc3MgYmFzZWQgb24gcHJvbWluZW50LCBkZW5zZVxuICAgIGlmICh0aGlzLmhhc0NvbnRlbnQgJiYgIXRoaXMuc2Nyb2xsVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5tZHctdG9wLWFwcC1iYXInKSkge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbWR3LXRvcC1hcHAtYmFyJyk7XG4gICAgICB0aGlzLnNjcm9sbFRhcmdldC5wcmVwZW5kKGRpdik7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtZHctdG9wLWFwcC1iYXInKTtcblxuICAgIHRoaXMudGhyb3R0bGVkU2Nyb2xsSGFuZGxlciA9IE1EV1V0aWxzLnJhZlRocm90dGxlKHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgdGhpcy50aHJvdHRsZWRSZXNpemVIYW5kbGVyID0gTURXVXRpbHMucmFmVGhyb3R0bGUodGhpcy5yZXNpemVIYW5kbGVyKTtcbiAgICB0aGlzLnNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnRocm90dGxlZFNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudGhyb3R0bGVkUmVzaXplSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMudGhyb3R0bGVkU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy50aHJvdHRsZWRSZXNpemVIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0IGZpeGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWR3LWZpeGVkJyk7XG4gIH1cblxuICBnZXQgaGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIGdldFNjcm9sbFRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnTURXLVBBR0UnKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWR3LWNvbnRlbnQnKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMuaGFzQ29udGVudCA9IHRydWU7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgdG9wQXBwQmFyU2Nyb2xsSGFuZGxlcigpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLmdldFZpZXdwb3J0U2Nyb2xsWSgpLCAwKTtcbiAgICBjb25zdCBkaWZmID0gY3VycmVudFNjcm9sbFBvc2l0aW9uIC0gdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb247XG4gICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IGlzIGJlaW5nIHJlc2l6ZWQgdGhlIGxhc3RTY3JvbGxQb3NpdGlvbl8gbmVlZHMgdG8gYmUgdXBkYXRlZCBidXQgdGhlXG4gICAgLy8gY3VycmVudCBzY3JvbGwgb2YgdGhlIHRvcCBhcHAgYmFyIHNob3VsZCBzdGF5IGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgIGlmICghdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZCkge1xuICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wIC09IGRpZmY7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCkgPiB0aGlzLnRvcEFwcEJhckhlaWdodCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgPSAtdGhpcy50b3BBcHBCYXJIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW92ZVRvcEFwcEJhcigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVUb3BBcHBCYXIoKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JVcGRhdGUoKSkge1xuICAgICAgLy8gT25jZSB0aGUgdG9wIGFwcCBiYXIgaXMgZnVsbHkgaGlkZGVuIHdlIHVzZSB0aGUgbWF4IHBvdGVudGlhbCB0b3AgYXBwIGJhciBoZWlnaHQgYXMgb3VyIG9mZnNldFxuICAgICAgLy8gc28gdGhlIHRvcCBhcHAgYmFyIGRvZXNuJ3Qgc2hvdyBpZiB0aGUgd2luZG93IHJlc2l6ZXMgYW5kIHRoZSBuZXcgaGVpZ2h0ID4gdGhlIG9sZCBoZWlnaHQuXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wO1xuICAgICAgaWYgKE1hdGguYWJzKG9mZnNldCkgPj0gdGhpcy50b3BBcHBCYXJIZWlnaHQpIHtcbiAgICAgICAgb2Zmc2V0ID0gLXRoaXMuTUFYX1RPUF9BUFBfQkFSX0hFSUdIVDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdHlsZS50b3AgPSBvZmZzZXQgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRm9yVXBkYXRlKCkge1xuICAgIGNvbnN0IG9mZnNjcmVlbkJvdW5kYXJ5VG9wID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0O1xuICAgIGNvbnN0IGhhc0FueVBpeGVsc09mZnNjcmVlbiA9IHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA8IDA7XG4gICAgY29uc3QgaGFzQW55UGl4ZWxzT25zY3JlZW4gPSB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgPiBvZmZzY3JlZW5Cb3VuZGFyeVRvcDtcbiAgICBjb25zdCBwYXJ0aWFsbHlTaG93aW5nID0gaGFzQW55UGl4ZWxzT2Zmc2NyZWVuICYmIGhhc0FueVBpeGVsc09uc2NyZWVuO1xuXG4gICAgLy8gSWYgaXQncyBwYXJ0aWFsbHkgc2hvd2luZywgaXQgY2FuJ3QgYmUgZG9ja2VkLlxuICAgIGlmIChwYXJ0aWFsbHlTaG93aW5nKSB7XG4gICAgICB0aGlzLndhc0RvY2tlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3QgcHJldmlvdXNseSBkb2NrZWQgYW5kIG5vdCBwYXJ0aWFsbHkgc2hvd2luZywgaXQncyBub3cgZG9ja2VkLlxuICAgICAgaWYgKCF0aGlzLndhc0RvY2tlZCkge1xuICAgICAgICB0aGlzLndhc0RvY2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRG9ja2VkU2hvd2luZyAhPT0gaGFzQW55UGl4ZWxzT25zY3JlZW4pIHtcbiAgICAgICAgdGhpcy5pc0RvY2tlZFNob3dpbmcgPSBoYXNBbnlQaXhlbHNPbnNjcmVlbjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRpYWxseVNob3dpbmc7XG4gIH1cblxuICByZXNpemVIYW5kbGVyKCkge1xuICAgIHRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICBpZiAodGhpcy50b3BBcHBCYXJIZWlnaHQgIT09IGN1cnJlbnRIZWlnaHQpIHtcbiAgICAgIHRoaXMud2FzRG9ja2VkID0gZmFsc2U7XG5cbiAgICAgIC8vIFNpbmNlIHRoZSB0b3AgYXBwIGJhciBoYXMgYSBkaWZmZXJlbnQgaGVpZ2h0IGRlcGVuZGluZyBvbiB0aGUgc2NyZWVuIHdpZHRoLCB0aGlzXG4gICAgICAvLyB3aWxsIGVuc3VyZSB0aGF0IHRoZSB0b3AgYXBwIGJhciByZW1haW5zIGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uIGlmXG4gICAgICAvLyBjb21wbGV0ZWx5IGhpZGRlbiBhbmQgYSByZXNpemUgbWFrZXMgdGhlIHRvcCBhcHAgYmFyIGEgZGlmZmVyZW50IGhlaWdodC5cbiAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCAtPSB0aGlzLnRvcEFwcEJhckhlaWdodCAtIGN1cnJlbnRIZWlnaHQ7XG4gICAgICB0aGlzLnRvcEFwcEJhckhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMudG9wQXBwQmFyU2Nyb2xsSGFuZGxlcigpO1xuICAgIHRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWQgPSBmYWxzZTtcbiAgfVxuXG5cbiAgc2Nyb2xsSGFuZGxlcigpIHtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLmdldFZpZXdwb3J0U2Nyb2xsWSgpLCAwKTtcblxuICAgIGlmICghdGhpcy5maXhlZCkge1xuICAgICAgY29uc3QgZGlmZiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiAtIHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uO1xuICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAgIC8vIElmIHRoZSB3aW5kb3cgaXMgYmVpbmcgcmVzaXplZCB0aGUgbGFzdFNjcm9sbFBvc2l0aW9uXyBuZWVkcyB0byBiZSB1cGRhdGVkIGJ1dCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgc2Nyb2xsIG9mIHRoZSB0b3AgYXBwIGJhciBzaG91bGQgc3RheSBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3AgLT0gZGlmZjtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wID4gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnModGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wKSA+IHRoaXMudG9wQXBwQmFySGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlVG9wQXBwQmFyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPD0gMCkge1xuICAgICAgICBpZiAodGhpcy53YXNTY3JvbGxlZF8pIHtcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ21kdy1zY3JvbGxlZCcpO1xuICAgICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy53YXNTY3JvbGxlZF8pIHtcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ21kdy1zY3JvbGxlZCcpO1xuICAgICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFZpZXdwb3J0U2Nyb2xsWSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxUYXJnZXRbdGhpcy5zY3JvbGxUYXJnZXQgPT09IHdpbmRvdyA/ICdwYWdlWU9mZnNldCcgOiAnc2Nyb2xsVG9wJ107XG4gIH1cbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURXUmlwcGxlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcbiAgICB0aGlzLlJJUFBMRV9GQURFX0lOX0RVUkFUSU9OID0gMjAwO1xuICAgIHRoaXMuUklQUExFX0ZBREVfT1VUX0RVUkFUSU9OID0gMTUwO1xuICAgIHRoaXMuUklQUExFX1NUQVRFID0ge1xuICAgICAgRkFESU5HX0lOOiAnRkFESU5HX0lOJyxcbiAgICAgIFZJU0lCTEU6ICdWSVNJQkxFJyxcbiAgICAgIEZBRElOR19PVVQ6ICdGQURJTkdfT1VUJyxcbiAgICAgIEhJRERFTjogJ0hJRERFTidcbiAgICB9O1xuXG4gICAgaWYgKCFjb25maWcuZWxlbWVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGNvbmZpZy5lbGVtZW50Jyk7XG4gICAgaWYgKCFjb25maWcudHJpZ2dlckVsZW1lbnQpIHRocm93IEVycm9yKCdyZXF1aXJlcyBjb25maWcudHJpZ2dlckVsZW1lbnQnKTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGNvbmZpZy5lbGVtZW50O1xuICAgIHRoaXMudHJpZ2dlckVsZW1lbnQgPSBbXS5jb25jYXQoY29uZmlnLnRyaWdnZXJFbGVtZW50KS5maWx0ZXIoZWwgPT4gISFlbCk7XG4gICAgdGhpcy5jZW50ZXJlZCA9ICEhY29uZmlnLmNlbnRlcmVkO1xuICAgIHRoaXMuc3BlZWRGYWN0b3IgPSBjb25maWcuc3BlZWRGYWN0b3IgfHwgMTtcbiAgICB0aGlzLnJhZGl1cyA9IGNvbmZpZy5yYWRpdXM7XG4gICAgdGhpcy5jb2xvciA9IGNvbmZpZy5jb2xvciB8fCBudWxsO1xuICAgIHRoaXMucGVyc2lzdGVudCA9ICEhY29uZmlnLnBlcnNpc3RlbnQ7XG4gICAgdGhpcy5hY3RpdmVSaXBwbGVzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuaXNNb3VzZWRvd24gPSBmYWxzZTtcbiAgICB0aGlzLmJvdW5kX21vdXNlc2Rvd25fID0gdGhpcy5tb3VzZXNkb3duXy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfbW91c2V1cF8gPSB0aGlzLm1vdXNldXBfLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZF9tb3VzZWxlYXZlXyA9IHRoaXMubW91c2VsZWF2ZV8uYmluZCh0aGlzKTtcblxuICAgIHRoaXMudHJpZ2dlckVsZW1lbnQuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX21vdXNlc2Rvd25fKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy50cmlnZ2VyRWxlbWVudC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuYm91bmRfbW91c2VzZG93bl8pO1xuICAgIH0pO1xuICB9XG5cbiAgbW91c2VzZG93bl8oZXZlbnQpIHtcbiAgICB0aGlzLmlzTW91c2Vkb3duID0gdHJ1ZTtcbiAgICB0aGlzLnRyaWdnZXJFbGVtZW50LmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfbW91c2V1cF8pO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuYm91bmRfbW91c2VsZWF2ZV8pO1xuICAgIH0pO1xuICAgIHRoaXMuZmFkZUluUmlwcGxlKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG4gIH1cblxuICBtb3VzZXVwXyhldmVudCkge1xuICAgIHRoaXMuaXNNb3VzZWRvd24gPSBmYWxzZTtcbiAgICAvLyBGYWRlLW91dCBhbGwgcmlwcGxlcyB0aGF0IGFyZSBjb21wbGV0ZWx5IHZpc2libGUgYW5kIG5vdCBwZXJzaXN0ZW50LlxuICAgIHRoaXMuYWN0aXZlUmlwcGxlcy5mb3JFYWNoKHJpcHBsZSA9PiB7XG4gICAgICBpZiAoIXJpcHBsZS5jb25maWcucGVyc2lzdGVudCAmJiByaXBwbGUuc3RhdGUgPT09IHRoaXMuUklQUExFX1NUQVRFLlZJU0lCTEUpIHJpcHBsZS5mYWRlT3V0KCk7XG4gICAgfSk7XG4gICAgdGhpcy50cmlnZ2VyRWxlbWVudC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX21vdXNldXBfKTtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmJvdW5kX21vdXNlbGVhdmVfKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdXNlbGVhdmVfKCkge1xuICAgIGlmICh0aGlzLmlzTW91c2Vkb3duKSB0aGlzLm1vdXNldXBfKCk7XG4gIH1cblxuXG4gIGZhZGVJblJpcHBsZShwYWdlWCwgcGFnZVkpIHtcbiAgICBjb25zdCBjb250YWluZXJSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKHRoaXMuY2VudGVyZWQpIHtcbiAgICAgIHBhZ2VYID0gY29udGFpbmVyUmVjdC5sZWZ0ICsgY29udGFpbmVyUmVjdC53aWR0aCAvIDI7XG4gICAgICBwYWdlWSA9IGNvbnRhaW5lclJlY3QudG9wICsgY29udGFpbmVyUmVjdC5oZWlnaHQgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdWJ0cmFjdCBzY3JvbGwgdmFsdWVzIGZyb20gdGhlIGNvb3JkaW5hdGVzIGJlY2F1c2UgY2FsY3VsYXRpb25zIGJlbG93XG4gICAgICAvLyBhcmUgYWx3YXlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydCByZWN0YW5nbGUuXG4gICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgcGFnZVggLT0gc2Nyb2xsUG9zaXRpb24ubGVmdDtcbiAgICAgIHBhZ2VZIC09IHNjcm9sbFBvc2l0aW9uLnRvcDtcbiAgICB9XG5cbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLnJhZGl1cyB8fCB0aGlzLmRpc3RhbmNlVG9GdXJ0aGVzdENvcm5lcihwYWdlWCwgcGFnZVksIGNvbnRhaW5lclJlY3QpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5SSVBQTEVfRkFERV9JTl9EVVJBVElPTiAqICgxIC8gdGhpcy5zcGVlZEZhY3Rvcik7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IHBhZ2VYIC0gY29udGFpbmVyUmVjdC5sZWZ0O1xuICAgIGNvbnN0IG9mZnNldFkgPSBwYWdlWSAtIGNvbnRhaW5lclJlY3QudG9wO1xuXG4gICAgY29uc3QgcmlwcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoJ21kdy1yaXBwbGUtZWxlbWVudCcpO1xuICAgIHJpcHBsZS5zdHlsZS5sZWZ0ID0gYCR7b2Zmc2V0WCAtIHJhZGl1c31weGA7XG4gICAgcmlwcGxlLnN0eWxlLnRvcCA9IGAke29mZnNldFkgLSByYWRpdXN9cHhgO1xuICAgIHJpcHBsZS5zdHlsZS5oZWlnaHQgPSBgJHtyYWRpdXMgKiAyfXB4YDtcbiAgICByaXBwbGUuc3R5bGUud2lkdGggPSBgJHtyYWRpdXMgKiAyfXB4YDtcblxuICAgIC8vIElmIHRoZSBjb2xvciBpcyBub3Qgc2V0LCB0aGUgZGVmYXVsdCBDU1MgY29sb3Igd2lsbCBiZSB1c2VkLlxuICAgIHJpcHBsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9yO1xuICAgIHJpcHBsZS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocmlwcGxlKTtcblxuICAgIC8vIEJ5IGRlZmF1bHQgdGhlIGJyb3dzZXIgZG9lcyBub3QgcmVjYWxjdWxhdGUgdGhlIHN0eWxlcyBvZiBkeW5hbWljYWxseSBjcmVhdGVkXG4gICAgLy8gcmlwcGxlIGVsZW1lbnRzLiBUaGlzIGlzIGNyaXRpY2FsIGJlY2F1c2UgdGhlbiB0aGUgYHNjYWxlYCB3b3VsZCBub3QgYW5pbWF0ZSBwcm9wZXJseS5cbiAgICB0aGlzLmVuZm9yY2VTdHlsZVJlY2FsY3VsYXRpb24ocmlwcGxlKTtcblxuICAgIHJpcHBsZS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuXG4gICAgLy8gRXhwb3NlZCByZWZlcmVuY2UgdG8gdGhlIHJpcHBsZSB0aGF0IHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgbGV0IHJpcHBsZVJlZiA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjZW50ZXJlZDogdGhpcy5jZW50ZXJlZCxcbiAgICAgICAgdGlnZ2VyRWxlbWVudDogdGhpcy50cmlnZ2VyRWxlbWVudCxcbiAgICAgICAgc3BlZWRGYWN0b3I6IHRoaXMuc3BlZWRGYWN0b3IsXG4gICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgcGVyc2lzdGVudDogdGhpcy5wZXJzaXN0ZW50LFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgIH0sXG4gICAgICBlbGVtZW50OiByaXBwbGUsXG4gICAgICBmYWRlT3V0OiAoKSA9PiBmYWRlT3V0KCksXG4gICAgICBzdGF0ZTogdGhpcy5SSVBQTEVfU1RBVEUuRkFESU5HX0lOXG4gICAgfTtcbiAgICBjb25zdCBmYWRlT3V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5mYWRlT3V0UmlwcGxlKHJpcHBsZVJlZilcbiAgICB9O1xuXG4gICAgLy8gQWRkIHRoZSByaXBwbGUgcmVmZXJlbmNlIHRvIHRoZSBsaXN0IG9mIGFsbCBhY3RpdmUgcmlwcGxlcy5cbiAgICB0aGlzLmFjdGl2ZVJpcHBsZXMuYWRkKHJpcHBsZVJlZik7XG5cbiAgICAvLyBXYWl0IGZvciB0aGUgcmlwcGxlIGVsZW1lbnQgdG8gYmUgY29tcGxldGVseSBmYWRlZCBpbi5cbiAgICAvLyBPbmNlIGl0J3MgZmFkZWQgaW4sIHRoZSByaXBwbGUgY2FuIGJlIGhpZGRlbiBpbW1lZGlhdGVseSBpZiB0aGUgbW91c2UgaXMgcmVsZWFzZWQuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByaXBwbGVSZWYuc3RhdGUgPSB0aGlzLlJJUFBMRV9TVEFURS5WSVNJQkxFO1xuICAgICAgaWYgKCF0aGlzLnBlcnNpc3RlbnQgJiYgIXRoaXMuaXNNb3VzZWRvd24pIHJpcHBsZVJlZi5mYWRlT3V0KCk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG5cbiAgZmFkZU91dFJpcHBsZShyaXBwbGVSZWYpIHtcbiAgICAvLyBGb3IgcmlwcGxlcyB0aGF0IGFyZSBub3QgYWN0aXZlIGFueW1vcmUsIGRvbid0IHJlLXVuIHRoZSBmYWRlLW91dCBhbmltYXRpb24uXG4gICAgaWYgKCF0aGlzLmFjdGl2ZVJpcHBsZXMuZGVsZXRlKHJpcHBsZVJlZikpIHJldHVybjtcblxuICAgIGNvbnN0IHJpcHBsZUVsID0gcmlwcGxlUmVmLmVsZW1lbnQ7XG5cbiAgICByaXBwbGVFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHt0aGlzLlJJUFBMRV9GQURFX09VVF9EVVJBVElPTn1tc2A7XG4gICAgcmlwcGxlRWwuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICByaXBwbGVSZWYuc3RhdGUgPSB0aGlzLlJJUFBMRV9TVEFURS5GQURJTkdfT1VUO1xuXG4gICAgLy8gT25jZSB0aGUgcmlwcGxlIGZhZGVkIG91dCwgdGhlIHJpcHBsZSBjYW4gYmUgc2FmZWx5IHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmlwcGxlUmVmLnN0YXRlID0gdGhpcy5SSVBQTEVfU1RBVEUuSElEREVOO1xuICAgICAgcmlwcGxlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyaXBwbGVFbCk7XG4gICAgfSwgdGhpcy5SSVBQTEVfRkFERV9PVVRfRFVSQVRJT04pO1xuICB9XG5cbiAgZGlzdGFuY2VUb0Z1cnRoZXN0Q29ybmVyKHgsIHksIHJlY3QpIHtcbiAgICBjb25zdCBkaXN0WCA9IE1hdGgubWF4KE1hdGguYWJzKHggLSByZWN0LmxlZnQpLCBNYXRoLmFicyh4IC0gcmVjdC5yaWdodCkpO1xuICAgIGNvbnN0IGRpc3RZID0gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHJlY3QudG9wKSwgTWF0aC5hYnMoeSAtIHJlY3QuYm90dG9tKSk7XG4gICAgcmV0dXJuIE1hdGguc3FydChkaXN0WCAqIGRpc3RYICsgZGlzdFkgKiBkaXN0WSk7XG4gIH1cblxuICBnZXRWaWV3cG9ydFNjcm9sbFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IGRvY3VtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFRoZSB0b3AtbGVmdC1jb3JuZXIgb2YgdGhlIHZpZXdwb3J0IGlzIGRldGVybWluZWQgYnkgdGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgZG9jdW1lbnRcbiAgICAvLyBib2R5LCBub3JtYWxseSBqdXN0IChzY3JvbGxMZWZ0LCBzY3JvbGxUb3ApLiBIb3dldmVyLCBDaHJvbWUgYW5kIEZpcmVmb3ggZGlzYWdyZWUgYWJvdXRcbiAgICAvLyB3aGV0aGVyIGBkb2N1bWVudC5ib2R5YCBvciBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50YCBpcyB0aGUgc2Nyb2xsZWQgZWxlbWVudCwgc28gcmVhZGluZ1xuICAgIC8vIGBzY3JvbGxUb3BgIGFuZCBgc2Nyb2xsTGVmdGAgaXMgaW5jb25zaXN0ZW50LiBIb3dldmVyLCB1c2luZyB0aGUgYm91bmRpbmcgcmVjdCBvZlxuICAgIC8vIGBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRgIHdvcmtzIGNvbnNpc3RlbnRseSwgd2hlcmUgdGhlIGB0b3BgIGFuZCBgbGVmdGAgdmFsdWVzIHdpbGxcbiAgICAvLyBlcXVhbCBuZWdhdGl2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgIGNvbnN0IHRvcCA9IC1kb2N1bWVudFJlY3QudG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgMDtcbiAgICBjb25zdCBsZWZ0ID0gLWRvY3VtZW50UmVjdC5sZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCAwO1xuXG4gICAgcmV0dXJuIHt0b3AsIGxlZnR9O1xuICB9XG5cbiAgLyoqIEVuZm9yY2VzIGEgc3R5bGUgcmVjYWxjdWxhdGlvbiBvZiBhIERPTSBlbGVtZW50IGJ5IGNvbXB1dGluZyBpdHMgc3R5bGVzLiAqL1xuICAvLyBUT0RPKGRldnZlcnNpb24pOiBNb3ZlIGludG8gZ2xvYmFsIHV0aWxpdHkgZnVuY3Rpb24uXG4gIGVuZm9yY2VTdHlsZVJlY2FsY3VsYXRpb24oZWxlbWVudCkge1xuICAgIC8vIEVuZm9yY2UgYSBzdHlsZSByZWNhbGN1bGF0aW9uIGJ5IGNhbGxpbmcgYGdldENvbXB1dGVkU3R5bGVgIGFuZCBhY2Nlc3NpbmcgYW55IHByb3BlcnR5LlxuICAgIC8vIENhbGxpbmcgYGdldFByb3BlcnR5VmFsdWVgIGlzIGltcG9ydGFudCB0byBsZXQgb3B0aW1pemVycyBrbm93IHRoYXQgdGhpcyBpcyBub3QgYSBub29wLlxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzVkNTJmYjA4MWIzNTcwYzgxZTNhXG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnb3BhY2l0eScpO1xuICB9XG59O1xuIiwiLy8gVE9ETyBlbmFibGUgY29uZmlndXJhdGlvbiBvZiB0aGVtZSBvbiBsb2FkXG5pbXBvcnQgYmFzZVRoZW1lIGZyb20gJy4vYmFzZS10aGVtZS5qcyc7XG5cbmNvbnN0IE1EV1RoZW1lID0gbmV3IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZXhSRUdFWCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2k7XG4gICAgdGhpcy5wYWxldHRlUmVnZXggPSAvKD88YmFzZT4tLW1kdy10aGVtZS1wYWxldHRlLS0pKD88Y29sb3I+XFx3KiktPyg/PGNvbnRyYXN0PmNvbnRyYXN0KT8tKD88aHVlPlxcdyopJC87XG4gICAgdGhpcy50ZXh0UmVnZXggPSAvKD88YmFzZT4tLW1kdy10aGVtZS10ZXh0LS0pKD88b24+b24tXFx3Kik/KD88c3RhdGU+XFx3KiktLSg/PGNvbnRyYXN0PlxcdyopJC87XG4gICAgdGhpcy5jb250ZW50V2l0aENvbnRyYXN0UmVnZXggPSAvKD88YmFzZT4tLW1kdy10aGVtZS0pKD88Y29udGVudD5cXHcqKS0tKD88Y29udHJhc3Q+XFx3KikkLztcbiAgICB0aGlzLmNvbnRyYXN0XyA9ICdsaWdodCc7XG4gICAgdGhpcy5wYWxldHRlcyA9IHtcbiAgICAgIHByaW1hcnk6ICdkZWVwcHVycGxlJyxcbiAgICAgIHNlY29uZGFyeTogJ3RlYWwnLFxuICAgICAgZXJyb3I6ICdyZWQnXG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlQmFzZVRoZW1lU3R5bGVFbGVtZW50KCk7XG4gICAgY29uc3QgaW5pdGlhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBjb250cmFzdDogJ2xpZ2h0JyB9LCB0aGlzLnBhbGV0dGVzLCB3aW5kb3cuTURXVGhlbWVDb25maWcpO1xuICAgIHRoaXMuc2V0UGFsZXR0ZXMoaW5pdGlhbENvbmZpZyk7XG4gICAgaWYgKFsnbGlnaHQnLCAnZGFyayddLmluZGV4T2YoaW5pdGlhbENvbmZpZy5jb250cmFzdCkgPiAtMSkgdGhpcy5jb250cmFzdCA9IGluaXRpYWxDb25maWcuY29udHJhc3Q7XG4gICAgdGhpcy5jYXRlZ29yaXplKCk7XG4gICAgdGhpcy5zZXRUaGVtZVZhcnMoKTtcbiAgICB0aGlzLnNldE90aGVyVmFycygpO1xuICB9XG5cbiAgZ2V0IGNvbnRyYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyYXN0XztcbiAgfVxuXG4gIHNldCBjb250cmFzdCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gJ2xpZ2h0JyAmJiB2YWx1ZSAhPT0gJ2RhcmsnKSB0aHJvdyBFcnJvcigndmFsaWQgdmFsdWVzIGFyZSBcImxpZ2h0XCIgYW5kIFwiZGFya1wiJyk7XG4gICAgdGhpcy5jb250cmFzdF8gPSB2YWx1ZTtcbiAgfVxuXG4gIGNoYW5nZVRoZW1lKHsgcHJpbWFyeSwgc2Vjb25kYXJ5LCBlcnJvciwgY29udHJhc3QgfSkge1xuICAgIHByaW1hcnkgPSBwcmltYXJ5IHx8IHRoaXMucGFsZXR0ZXMucHJpbWFyeTtcbiAgICBzZWNvbmRhcnkgPSBzZWNvbmRhcnkgfHwgdGhpcy5wYWxldHRlcy5zZWNvbmRhcnk7XG4gICAgZXJyb3IgPSBlcnJvciB8fCB0aGlzLnBhbGV0dGVzLmVycm9yO1xuICAgIGlmIChjb250cmFzdCkgdGhpcy5jb250cmFzdCA9IGNvbnRyYXN0O1xuICAgIHRoaXMuc2V0UGFsZXR0ZXMoeyBwcmltYXJ5LCBzZWNvbmRhcnksIGVycm9yIH0pO1xuICAgIHRoaXMuc2V0VGhlbWVWYXJzKCk7XG4gICAgdGhpcy5zZXRPdGhlclZhcnMoKTtcbiAgfVxuXG4gIHNldFBhbGV0dGVzKHsgcHJpbWFyeSwgc2Vjb25kYXJ5LCBlcnJvciB9ID0ge30pIHtcbiAgICB0aGlzLnBhbGV0dGVzID0ge1xuICAgICAgcHJpbWFyeTogcHJpbWFyeSB8fCAnZGVlcHB1cnBsZScsXG4gICAgICBzZWNvbmRhcnk6IHNlY29uZGFyeSB8fCAndGVhbCcsXG4gICAgICBlcnJvcjogZXJyb3IgfHwgJ3JlZCdcbiAgICB9O1xuICB9XG5cbiAgc2V0VGhlbWVWYXJzKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMucGFsZXR0ZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IGNvbG9yTmFtZSA9IHRoaXMucGFsZXR0ZXNba2V5XTtcbiAgICAgIGNvbnN0IHBhbGV0dGVWYXJzID0gdGhpcy5wYWxldHRlVmFycyhjb2xvck5hbWUpO1xuICAgICAgcGFsZXR0ZVZhcnMuZm9yRWFjaChwYWxldHRlID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGAtLW1kdy10aGVtZS0ke2tleX0ke3BhbGV0dGUuY29udHJhc3QgPyBgLSR7cGFsZXR0ZS5jb250cmFzdH1gIDogJyd9JHtwYWxldHRlLmRlZmF1bHQgPT09IGZhbHNlID8gYC0ke3BhbGV0dGUuaHVlfWAgOiAnJ31gO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFyKHBhbGV0dGUudmFyKTtcbiAgICAgICAgdGhpcy5zZXRWYXIobmFtZSwgdmFsdWUpO1xuICAgICAgICB0aGlzLnNldFZhcihgJHtuYW1lfS0tcmdiYCwgdGhpcy5jb252ZXJ0VG9SR0IodmFsdWUpKTtcblxuICAgICAgICBpZiAocGFsZXR0ZS5odWUgPT09IHRoaXMuY29udHJhc3QpIHtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gbmFtZS5yZXBsYWNlKGAtJHt0aGlzLmNvbnRyYXN0fWAsICcnKTtcbiAgICAgICAgICB0aGlzLnNldFZhcihub3JtYWxpemVkLCB2YWx1ZSk7XG4gICAgICAgICAgdGhpcy5zZXRWYXIoYCR7bm9ybWFsaXplZH0tLXJnYmAsIHRoaXMuY29udmVydFRvUkdCKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0T3RoZXJWYXJzKCkge1xuICAgIHRoaXMub3RoZXJWYXJzKCkuZm9yRWFjaCh2ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYXIodi52YXIpO1xuICAgICAgdGhpcy5zZXRWYXIodi5ub3JtYWxpemVkLCB2YWx1ZSk7XG4gICAgICB0aGlzLnNldFZhcihgJHt2Lm5vcm1hbGl6ZWR9LS1yZ2JgLCB0aGlzLmNvbnZlcnRUb1JHQih2YWx1ZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgcGFsZXR0ZVZhcnMoY29sb3JOYW1lKSB7XG4gICAgY29uc3QgcGFsZXR0ZVZhck5hbWVzID0gT2JqZWN0LmtleXModGhpcy5ub3JtYWxpemVkVmFycykuZmlsdGVyKGtleSA9PiBrZXkuc3RhcnRzV2l0aChgLS1tZHctdGhlbWUtcGFsZXR0ZS0tJHtjb2xvck5hbWV9YCkpO1xuICAgIHJldHVybiBwYWxldHRlVmFyTmFtZXMubWFwKGtleSA9PiB0aGlzLm5vcm1hbGl6ZWRWYXJzW2tleV1bMF0pO1xuICB9XG5cbiAgb3RoZXJWYXJzKCkge1xuICAgIGNvbnN0IHBhbGV0dGVWYXJOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMubm9ybWFsaXplZFZhcnMpLmZpbHRlcihrZXkgPT4ga2V5LnN0YXJ0c1dpdGgoJy0tbWR3LXRoZW1lJykgJiYgIWtleS5zdGFydHNXaXRoKCctLW1kdy10aGVtZS1wYWxldHRlJykpO1xuICAgIHJldHVybiBwYWxldHRlVmFyTmFtZXMubWFwKGtleSA9PiB0aGlzLnBpY2tWYXIodGhpcy5ub3JtYWxpemVkVmFyc1trZXldKSk7XG4gIH1cblxuICBzZXRWYXJzKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMubm9ybWFsaXplZFZhcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMucGlja1Zhcih0aGlzLm5vcm1hbGl6ZWRWYXJzW2tleV0pO1xuICAgICAgdGhpcy5zZXRWYXIocGlja2VkLm5vcm1hbGl6ZWQsIHRoaXMuZ2V0VmFyKHBpY2tlZC52YXIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhcihuYW1lLCB2YWx1ZSkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBnZXRWYXIobmFtZSkge1xuICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTtcbiAgfVxuXG4gIHBpY2tWYXIoYXJyKSB7XG4gICAgbGV0IGZvdW5kID0gYXJyLmZpbmQoaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5kZWZhdWx0ID09PSB0cnVlICYmIHRoaXMuY29udHJhc3QgPT09IGl0ZW0uY29udHJhc3QpIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvdW5kID0gYXJyLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyYXN0ID09PSBpdGVtLmNvbnRyYXN0KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKGl0ZW0uZGVmYXVsdCA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kIHx8IGFyclswXTtcbiAgfVxuXG4gIGNhdGVnb3JpemUoKSB7XG4gICAgY29uc3QgcGFyc2VkID0gdGhpcy5nZXRBbGxWYXJzKCkubWFwKHYgPT4gdGhpcy5wYXJzZVZhcih2KSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEhhc2ggPSBwYXJzZWQucmVkdWNlKChhLCBiKSA9PiB7XG4gICAgICBpZiAoYi5ub01hdGNoID09PSB0cnVlIHx8ICFiLm5vcm1hbGl6ZWQpIHJldHVybiBhO1xuXG4gICAgICBpZiAoIWFbYi5ub3JtYWxpemVkXSkgYVtiLm5vcm1hbGl6ZWRdID0gW107XG4gICAgICBhW2Iubm9ybWFsaXplZF0ucHVzaChiKTtcbiAgICAgIHJldHVybiBhO1xuICAgIH0sIHt9KTtcblxuICAgIHRoaXMubm9ybWFsaXplZFZhcnMgPSBub3JtYWxpemVkSGFzaDtcbiAgfVxuXG4gIC8vIHBhcnNlIG91dCB2YXJpYWJsZXMgaW4gOnJvb3RcbiAgZ2V0QWxsVmFycygpIHtcbiAgICByZXR1cm4gWy4uLmJhc2VUaGVtZSgpLm1hdGNoQWxsKC8oLio/KTouKj87L2cpXS5tYXAoYSA9PiBhWzFdLnRyaW0oKSk7XG4gIH1cblxuICBnZXRVbm1hdGNoZWQoKSB7XG4gICAgY29uc3QgcGFyc2VkID0gdGhpcy5nZXRBbGxWYXJzKCkubWFwKHYgPT4gdGhpcy5wYXJzZVZhcih2KSk7XG4gICAgcmV0dXJuIHBhcnNlZC5maWx0ZXIobiA9PiBuLm5vTWF0Y2ggPT09IHRydWUpO1xuICB9XG5cbiAgcGFyc2VWYXIodmFyTmFtZSkge1xuICAgIGlmICh0aGlzLnBhbGV0dGVSZWdleC50ZXN0KHZhck5hbWUpKSB7XG4gICAgICBjb25zdCBncm91cHMgPSB2YXJOYW1lLm1hdGNoKHRoaXMucGFsZXR0ZVJlZ2V4KS5ncm91cHM7XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gYCR7Z3JvdXBzLmJhc2V9JHtncm91cHMuY29sb3J9JHtncm91cHMuY29udHJhc3QgPyBgLWNvbnRyYXN0YCA6ICcnfS0ke2dyb3Vwcy5odWV9YDtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgdmFyOiB2YXJOYW1lLFxuICAgICAgICB0eXBlOiAncGFsZXR0ZScsXG4gICAgICAgIGRlZmF1bHQ6IHZhck5hbWUuaW5kZXhPZignZGVmYXVsdCcpID4gMCxcbiAgICAgICAgbm9ybWFsaXplZFxuICAgICAgfSwgZ3JvdXBzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudGV4dFJlZ2V4LnRlc3QodmFyTmFtZSkpIHtcbiAgICAgIGNvbnN0IGdyb3VwcyA9IHZhck5hbWUubWF0Y2godGhpcy50ZXh0UmVnZXgpLmdyb3VwcztcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBgJHtncm91cHMuYmFzZX0ke2dyb3Vwcy5zdGF0ZSB8fCAnJ30ke2dyb3Vwcy5vbiB8fCAnJ31gO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB2YXI6IHZhck5hbWUsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgZGVmYXVsdDogdmFyTmFtZS5pbmRleE9mKCdkZWZhdWx0JykgPiAwLFxuICAgICAgICBub3JtYWxpemVkXG4gICAgICB9LCBncm91cHMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb250ZW50V2l0aENvbnRyYXN0UmVnZXgudGVzdCh2YXJOYW1lKSkge1xuICAgICAgY29uc3QgZ3JvdXBzID0gdmFyTmFtZS5tYXRjaCh0aGlzLmNvbnRlbnRXaXRoQ29udHJhc3RSZWdleCkuZ3JvdXBzO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGAke2dyb3Vwcy5iYXNlfSR7Z3JvdXBzLmNvbnRlbnR9YDtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgdmFyOiB2YXJOYW1lLFxuICAgICAgICB0eXBlOiAnY29udGVudCcsXG4gICAgICAgIGRlZmF1bHQ6IHZhck5hbWUuaW5kZXhPZignZGVmYXVsdCcpID4gMCxcbiAgICAgICAgbm9ybWFsaXplZFxuICAgICAgfSwgZ3JvdXBzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFyOiB2YXJOYW1lLFxuICAgICAgbm9NYXRjaDogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBjb252ZXJ0VG9SR0IoaGV4KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5oZXhSRUdFWC5leGVjKGhleC50cmltKCkpO1xuICAgIHJldHVybiByZXN1bHQgPyBgJHtwYXJzZUludChyZXN1bHRbMV0sIDE2KX0sICR7cGFyc2VJbnQocmVzdWx0WzJdLCAxNil9LCAke3BhcnNlSW50KHJlc3VsdFszXSwgMTYpfWAgOiBudWxsO1xuICB9XG5cbiAgY3JlYXRlQmFzZVRoZW1lU3R5bGVFbGVtZW50KCkge1xuICAgIGNvbnN0IHN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZU5vZGUpO1xuICAgIHN0eWxlTm9kZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYmFzZVRoZW1lKCkpKTtcbiAgfVxufTtcblxud2luZG93Lk1EV1RoZW1lID0gTURXVGhlbWU7XG5cbmV4cG9ydCBkZWZhdWx0IE1EV1RoZW1lO1xuIiwiaW1wb3J0IHsgaXNQaG9uZSwgaXNQaG9uZUFuZFRhYmxldCB9IGZyb20gJy4vbW9iaWxlLWluZm8uanMnO1xuXG5jb25zdCBNRFdVdGlscyA9IG5ldyBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3VpZCA9IDE7XG4gICAgdGhpcy5fc2V0dXBUcmFuc2l0aW9uRXZlbnQoKTtcbiAgICB0aGlzLl9zZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUoKTtcbiAgICB0aGlzLmlzUGhvbmUgPSBpc1Bob25lO1xuICAgIHRoaXMuaXNQaG9uZUFuZFRhYmxldCA9IGlzUGhvbmVBbmRUYWJsZXQ7XG4gICAgLy8gYWRkIGNsYXNzIGluZGVjYXRvciBmb3IgbW9iaWxlXG4gICAgXG4gICAgdGhpcy5vblJlYWR5KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21kdy1pcy1tb2JpbGUnKTtcbiAgICAgIGVsc2UgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtZHctaXMtbW9iaWxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBvblJlYWR5KGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vblJlYWR5KGNhbGxiYWNrKTtcbiAgICAgIH0sIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgdWlkKCkge1xuICAgIHJldHVybiBgaWRfJHt0aGlzLl91aWQrK31gO1xuICB9XG5cbiAgZ2V0IGlzTW9iaWxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzUGhvbmVBbmRUYWJsZXQ7XG4gIH1cblxuICBsb2NrUGFnZVNjcm9sbCgpIHtcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXZlbnQtb3Zlci1zY3JvbGwnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlID4gbWR3LWNvbnRlbnQnKSA6IGRvY3VtZW50LmJvZHk7XG4gICAgc2Nyb2xsRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICB9XG5cbiAgdW5sb2NrUGFnZVNjcm9sbCgpIHtcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXZlbnQtb3Zlci1zY3JvbGwnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21kdy1wYWdlID4gbWR3LWNvbnRlbnQnKSA6IGRvY3VtZW50LmJvZHk7XG4gICAgc2Nyb2xsRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICB9XG5cbiAgZGVib3VuY2UoZm4sIHdhaXQpIHtcbiAgICBsZXQgdGltZXI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpc1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH0sIHdhaXQgfHwgMTApO1xuICAgIH07XG4gIH1cblxuICB0aHJvdHRsZShmbiwgbGltaXQpIHtcbiAgICBsZXQgYWxyZWFkeVF1ZXVlZDtcbiAgICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgaWYgKCFhbHJlYWR5UXVldWVkKSB7XG4gICAgICAgIGFscmVhZHlRdWV1ZWQgPSB0cnVlO1xuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgYWxyZWFkeVF1ZXVlZCA9IGZhbHNlO1xuICAgICAgICB9LCBsaW1pdCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIHRocm90dGxlIG9uIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1leXlcbiAgcmFmVGhyb3R0bGUoZm4pIHtcbiAgICBsZXQgYWxyZWFkeVF1ZXVlZDtcbiAgICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgaWYgKCFhbHJlYWR5UXVldWVkKSB7XG4gICAgICAgIGFscmVhZHlRdWV1ZWQgPSB0cnVlO1xuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBhbHJlYWR5UXVldWVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBxdWVyeVNsb3R0ZWQoY29tcG9uZW50LCBzZWxlY3Rvcikge1xuICAgIGlmICghY29tcG9uZW50KSB0aHJvdyBFcnJvcigncmVxdWlyZXMgZWl0aGVyIGNvbXBvbmVudCcpO1xuICAgIGlmICghc2VsZWN0b3IpIHRocm93IEVycm9yKCdyZXF1aXJlcyBzZWxlY3RvcicpO1xuICAgIGlmICghY29tcG9uZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdCcpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29tcG9uZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdCcpLmFzc2lnbmVkTm9kZXMoKS5maW5kKGVsID0+IHtcbiAgICAgIGlmICghZWwubWF0Y2hlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgIH0pO1xuICB9XG5cbiAgcXVlcnlTbG90dGVkQWxsKGNvbXBvbmVudCwgc2VsZWN0b3IpIHtcbiAgICBpZiAoIWNvbXBvbmVudCkgdGhyb3cgRXJyb3IoJ3JlcXVpcmVzIGVpdGhlciBjb21wb25lbnQnKTtcbiAgICBpZiAoIXNlbGVjdG9yKSB0aHJvdyBFcnJvcigncmVxdWlyZXMgc2VsZWN0b3InKTtcbiAgICByZXR1cm4gY29tcG9uZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdCcpLmFzc2lnbmVkTm9kZXMoeyBmbGF0dGVuOiB0cnVlIH0pLnJlZHVjZSgoYSwgZWwpID0+IHtcbiAgICAgIGlmICghZWwucXVlcnlTZWxlY3RvckFsbCkgcmV0dXJuIGE7XG4gICAgICByZXR1cm4gYS5jb25jYXQoWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXSk7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgc2xvdHRlZENoaWxkcmVuKGNvbXBvbmVudCkge1xuICAgIGlmICghY29tcG9uZW50KSB0aHJvdyBFcnJvcigncmVxdWlyZXMgZWl0aGVyIGNvbXBvbmVudCcpO1xuICAgIHJldHVybiBjb21wb25lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzbG90JykuYXNzaWduZWROb2RlcygpO1xuICB9XG5cbiAgZ2V0IHRyYW5zaXRpb25FdmVudE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbkV2ZW50TmFtZV87XG4gIH1cblxuICBnZXQgdHJhbnNmb3JtUHJvcGVydHlOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybVByb3BlcnR5TmFtZV87XG4gIH1cblxuICBhZGRCYWNrZHJvcChlbGVtZW50LCBjbGlja0NhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBpZCA9IHRoaXMudWlkKCk7XG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgaWQ9XCIke2lkfVwiIGNsYXNzPVwibWR3LWJhY2tkcm9wXCI+PC9kaXY+YCk7XG4gICAgY29uc3QgYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XG4gICAgaWYgKG9wdGlvbnMuZHJhd2VyID09PSB0cnVlKSBiYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWR3LWRyYXdlci1iYWNrZHJvcCcpO1xuICAgIGlmIChjbGlja0NhbGxiYWNrKSBiYWNrZHJvcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhbGxiYWNrKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVtb3ZlKCkge1xuICAgICAgICBpZiAoY2xpY2tDYWxsYmFjaykgYmFja2Ryb3BFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYWxsYmFjayk7XG4gICAgICAgIGJhY2tkcm9wRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgX3NldHVwVHJhbnNpdGlvbkV2ZW50KCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHtcbiAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIE9UcmFuc2l0aW9uOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnXG4gICAgfTtcblxuICAgIGZvciAobGV0IHQgaW4gdHJhbnNpdGlvbnMpe1xuICAgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHRoaXMudHJhbnNpdGlvbkV2ZW50TmFtZV8gPSB0cmFuc2l0aW9uc1t0XTtcbiAgICB9XG4gIH1cblxuICBfc2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMudHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9ICd0cmFuc2Zvcm0nIGluIGVsLnN0eWxlID8gJ3RyYW5zZm9ybScgOiAnd2Via2l0VHJhbnNmb3JtJztcbiAgICB9XG4gIH1cbn1cblxud2luZG93Lk1EV1V0aWxzID0gTURXVXRpbHM7XG5cbmV4cG9ydCBkZWZhdWx0IE1EV1V0aWxzO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gLyogY3NzICovYFxuICAgIDpyb290IHtcbiAgICAgIC8qIC0tLSB0ZXh0IC0tLSAqL1xuICAgICAgLS1tZHctdGhlbWUtdGV4dC0tcHJpbWFyeS0tbGlnaHQ6ICNmZmZmZmY7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1zZWNvbmRhcnktLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNyk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1lcnJvci0tbGlnaHQ6IHJnYmEoMjU1LDI1NSwyNTUsIC43KTtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLWhpbnQtLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNSk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1kaXNhYmxlZC0tbGlnaHQ6IHJnYmEoMjU1LDI1NSwyNTUsIC41KTtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLWljb24tLWxpZ2h0OiByZ2JhKDI1NSwyNTUsMjU1LCAuNSk7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLXByaW1hcnktLWRhcms6IHJnYmEoMCwwLDAsIC44Nyk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1zZWNvbmRhcnktLWRhcms6IHJnYmEoMCwwLDAsIC41NCk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1lcnJvci0tZGFyazogcmdiYSgwLDAsMCwgLjU0KTtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLWhpbnQtLWRhcms6IHJnYmEoMCwwLDAsIC4zOCk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1kaXNhYmxlZC0tZGFyazogcmdiYSgwLDAsMCwgLjM4KTtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLWljb24tLWRhcms6IHJnYmEoMCwwLDAsIC4zOCk7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLW9uLXByaW1hcnktLWxpZ2h0OiAjRkZGRkZGO1xuICAgICAgLS1tZHctdGhlbWUtdGV4dC0tb24tc2Vjb25kYXJ5LS1saWdodDogIzAwMDAwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLW9uLWVycm9yLS1saWdodDogI0ZGRkZGRjtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLW9uLWJhY2tncm91bmQtLWxpZ2h0OiAjMDAwMDAwO1xuICAgICAgLS1tZHctdGhlbWUtdGV4dC0tb24tc3VyZmFjZS0tbGlnaHQ6ICMwMDAwMDA7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLW9uLXByaW1hcnktLWRhcms6ICMwMDAwMDA7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1vbi1zZWNvbmRhcnktLWRhcms6ICNGRkZGRkY7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1vbi1lcnJvci0tZGFyazogIzAwMDAwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLW9uLWJhY2tncm91bmQtLWRhcms6ICNGRkZGRkY7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1vbi1zdXJmYWNlLS1kYXJrOiAjRkZGRkZGO1xuXG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1oZWFkaW5nLS1saWdodDogIzIxMjEyMTtcbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLWhlYWRpbmctLWRhcms6ICNlY2VjZWM7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLWJvZHktLWxpZ2h0OiAjNjE2MTYxO1xuICAgICAgLS1tZHctdGhlbWUtdGV4dC0tYm9keS0tZGFyazogI2I1YjViNTtcblxuXG4gICAgICAvKiAtLS0gc3VyZmFjZXMgYW5kIGJhY2tncm91bmRzIC0tLSAqL1xuICAgICAgLS1tZHctdGhlbWUtYmFja2dyb3VuZC0tbGlnaHQ6ICNmYWZhZmE7XG4gICAgICAtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1kYXJrOiAjMTIxMjEyO1xuXG4gICAgICAtLW1kdy10aGVtZS1mb3JlZ3JvdW5kLS1saWdodDogIzEyMTIxMjtcbiAgICAgIC0tbWR3LXRoZW1lLWZvcmVncm91bmQtLWRhcms6ICNmYWZhZmE7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXN1cmZhY2UtLWxpZ2h0OiAjZmFmYWZhO1xuICAgICAgLS1tZHctdGhlbWUtc3VyZmFjZS0tZGFyazogIzEyMTIxMjtcblxuICAgICAgLS1tZHctdGhlbWUtc3VyZmFjZV9lbGV2YXRpb25fMS0tbGlnaHQ6ICNmNmY2ZjY7XG4gICAgICAtLW1kdy10aGVtZS1zdXJmYWNlX2VsZXZhdGlvbl8xLS1kYXJrOiAjMzAzMDMwO1xuXG4gICAgICAtLW1kdy10aGVtZS1kaXZpZGVyLS1kYXJrOiByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICAgICAgLS1tZHctdGhlbWUtZGl2aWRlci0tbGlnaHQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xMik7XG5cbiAgICAgIC0tbWR3LXRoZW1lLWRpdmlkZXItLW9uLWJhY2tncm91bmQtLWRhcms6IHZhcigtLW1kdy10aGVtZS1kaXZpZGVyLS1saWdodCk7XG4gICAgICAtLW1kdy10aGVtZS1kaXZpZGVyLS1vbi1iYWNrZ3JvdW5kLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLWRpdmlkZXItLWRhcmspO1xuXG5cbiAgICAgIC8qIC0tLSBvbmUgb2ZmcyBmb3IgY29tcG9uZW50cyAtLS0gKi9cbiAgICAgIC0tbWR3LXRoZW1lLXN3aXRjaHRyYWNrLS1saWdodDogIzAwMDAwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXN3aXRjaHRyYWNrLS1kYXJrOiByZ2JhKDI1NSwyNTUsMjU1LCAuMzIpO1xuXG4gICAgICAtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlci0tbGlnaHQ6IHJnYmEoMCwwLDAsIC41NCk7XG4gICAgICAtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlci0tZGFyazogcmdiYSgyNTUsMjU1LDI1NSwgLjUpO1xuXG4gICAgICAtLW1kdy10aGVtZS1jaGVja2JveGJvcmRlcmRpc2FibGVkLS1saWdodDogcmdiYSgwLDAsMCwgLjI2KTtcbiAgICAgIC0tbWR3LXRoZW1lLWNoZWNrYm94Ym9yZGVyZGlzYWJsZWQtLWRhcms6IHJnYmEoMjU1LDI1NSwyNTUsIC4yNCk7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXNuYWNrYmFyY29udGFpbmVyLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLWJhY2tncm91bmQtLWRhcmspO1xuICAgICAgLS1tZHctdGhlbWUtc25hY2tiYXJjb250YWluZXItLWRhcms6IHZhcigtLW1kdy10aGVtZS1iYWNrZ3JvdW5kLS1saWdodCk7XG5cbiAgICAgIC0tbWR3LXRoZW1lLXRleHQtLW9uLXNuYWNrYmFyLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXRleHQtLXNlY29uZGFyeSk7XG4gICAgICAtLW1kdy10aGVtZS10ZXh0LS1vbi1zbmFja2Jhci0tZGFyazogIzAwMDAwMDtcblxuICAgICAgLS1tZHctdGhlbWUtbGlzdF9pdGVtX2ZvY3VzLS1saWdodDogcmdiYSgwLDAsMCwuMDYpO1xuICAgICAgLS1tZHctdGhlbWUtbGlzdF9pdGVtX2ZvY3VzLS1kYXJrOiByZ2JhKDEwMCwxMDAsMTAwLC4xNik7XG5cbiAgICAgIC0tbWR3LXRoZW1lLW91dGxpbmVfYm9yZGVyLS1saWdodDogcmdiYSgwLDAsMCwuMjQpO1xuICAgICAgLS1tZHctdGhlbWUtb3V0bGluZV9ib3JkZXItLWRhcms6IHJnYmEoMjU1LDI1NSwyNTUsLjI0KTtcblxuICAgICAgLS1tZHctdGhlbWUtdGV4dGZpZWxkX2JhY2tncm91bmQtLWxpZ2h0OiAjZjVmNWY1O1xuICAgICAgLS1tZHctdGhlbWUtdGV4dGZpZWxkX2JhY2tncm91bmQtLWRhcms6ICMzMDMwMzA7XG5cblxuICAgICAgLyogLS0tIHBhbGV0dGVzIC0tLSAqL1xuICAgICAgLyogQnkgZGVmYXVsdCwgc2hhZGVzIDUwMCwgMzAwIDgwMCBhbmQgQTEwMCBhcmUgdXNlZCBmb3IgcHJpbWFyeSBhbmQgd2FybiBpbnRlbnRpb25zLCB3aGlsZSBBMjAwLCBBMTAwLCBBNDAwIGFuZCBBNzAwIGFyZSB1c2VkIGZvciBhY2NlbnQgKi9cblxuICAgICAgLyogcmVkICovXG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtNTA6ICNmZmViZWU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtMTAwOiAjZmZjZGQyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTIwMDogI2VmOWE5YTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC0zMDA6ICNlNTczNzM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtNDAwOiAjZWY1MzUwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTUwMDogI2Y0NDMzNjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC02MDA6ICNlNTM5MzU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtNzAwOiAjZDMyZjJmO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLTgwMDogI2M2MjgyODtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC05MDA6ICNiNzFjMWM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtQTEwMDogI2ZmOGE4MDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC1BMjAwOiAjZmY1MjUyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcmVkLUE0MDA6ICNmZjE3NDQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtQTcwMDogI2Q1MDAwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC0tbGlnaHQ6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1yZWQtNTAwKTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLXJlZC0yMDApO1xuXG4gICAgICAvKiBwaW5rICovXG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTUwOiAjRkNFNEVDO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay0xMDA6ICNGOEJCRDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTIwMDogI0Y0OEZCMTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstMzAwOiAjRjA2MjkyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay00MDA6ICNFQzQwN0E7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTUwMDogI0U5MUU2MztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstNjAwOiAjRDgxQjYwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay03MDA6ICNDMjE4NUI7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTgwMDogI0FEMTQ1NztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXBpbmstOTAwOiAjODgwRTRGO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay1BMTAwOiAjRkY4MEFCO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay1BMjAwOiAjRkY0MDgxO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay1BNDAwOiAjRjUwMDU3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay1BNzAwOiAjQzUxMTYyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay0tbGlnaHQ6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1waW5rLS1kYXJrOiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tcGluay0yMDApO1xuXG4gICAgICAvKiBwdXJwbGUgKi9cbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS01MDogI2YzZTVmNTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS0xMDA6ICNlMWJlZTc7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtMjAwOiAjY2U5M2Q4O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTMwMDogI2JhNjhjODtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS00MDA6ICNhYjQ3YmM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtNTAwOiAjOWMyN2IwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTYwMDogIzhlMjRhYTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS03MDA6ICM3YjFmYTI7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtODAwOiAjNmExYjlhO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTkwMDogIzRhMTQ4YztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS1BMTAwOiAjZWE4MGZjO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLUEyMDA6ICNlMDQwZmI7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1wdXJwbGUtQTQwMDogI2Q1MDBmOTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS1BNzAwOiAjYWEwMGZmO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLXB1cnBsZS01MDApO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLS1kYXJrOiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tcHVycGxlLTIwMCk7XG5cbiAgICAgIC8qIGRlZXBwdXJwbGUgKi9cbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtNTA6ICNlZGU3ZjY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTEwMDogI2QxYzRlOTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtMjAwOiAjYjM5ZGRiO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS0zMDA6ICM5NTc1Y2Q7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTQwMDogIzdlNTdjMjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtNTAwOiAjNjczYWI3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS02MDA6ICM1ZTM1YjE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTcwMDogIzUxMmRhODtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtODAwOiAjNDUyN2EwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcHB1cnBsZS05MDA6ICMzMTFiOTI7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLUExMDA6ICNiMzg4ZmY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLUEyMDA6ICM3YzRkZmY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLUE0MDA6ICM2NTFmZmY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLUE3MDA6ICM2MjAwZWE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLS1saWdodDogIzYwMDJlZTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBwdXJwbGUtLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwcHVycGxlLTIwMCk7XG5cbiAgICAgIC8qIEluZGlnbyAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTUwOiAjRThFQUY2O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTEwMDogI0M1Q0FFOTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby0yMDA6ICM5RkE4REE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tMzAwOiAjNzk4NkNCO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTQwMDogIzVDNkJDMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby01MDA6ICMzRjUxQjU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tNjAwOiAjMzk0OUFCO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTcwMDogIzMwM0Y5RjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby04MDA6ICMyODM1OTM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tOTAwOiAjMUEyMzdFO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLUExMDA6ICM4QzlFRkY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tQTIwMDogIzUzNkRGRTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWluZGlnby1BNDAwOiAjM0Q1QUZFO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLUE3MDA6ICMzMDRGRkU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0taW5kaWdvLTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1pbmRpZ28tMjAwKTtcblxuICAgICAgLyogYmx1ZSAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS01MDogI2UzZjJmZDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtMTAwOiAjYmJkZWZiO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS0yMDA6ICM5MGNhZjk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTMwMDogIzY0YjVmNjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtNDAwOiAjNDJhNWY1O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS01MDA6ICMyMTk2ZjM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTYwMDogIzFlODhlNTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtNzAwOiAjMTk3NmQyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS04MDA6ICMxNTY1YzA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1ibHVlLTkwMDogIzBkNDdhMTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtQTEwMDogIzgyYjFmZjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtQTIwMDogIzQ0OGFmZjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtQTQwMDogIzI5NzlmZjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtQTcwMDogIzI5NjJmZjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS01MDApO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYmx1ZS0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWJsdWUtMjAwKTtcblxuICAgICAgLyogTGlnaHQgYmx1ZSAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTUwOiAjRTFGNUZFO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTEwMDogI0IzRTVGQztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS0yMDA6ICM4MUQ0RkE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtMzAwOiAjNEZDM0Y3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTQwMDogIzI5QjZGNjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS01MDA6ICMwM0E5RjQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtNjAwOiAjMDM5QkU1O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTcwMDogIzAyODhEMTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS04MDA6ICMwMjc3QkQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtOTAwOiAjMDE1NzlCO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLUExMDA6ICM4MEQ4RkY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtQTIwMDogIzQwQzRGRjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Ymx1ZS1BNDAwOiAjMDBCMEZGO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLUE3MDA6ICMwMDkxRUE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRibHVlLTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGJsdWUtMjAwKTtcblxuICAgICAgLyogQ3lhbiAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi01MDogI0UwRjdGQTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tMTAwOiAjQjJFQkYyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi0yMDA6ICM4MERFRUE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1jeWFuLTMwMDogIzRERDBFMTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tNDAwOiAjMjZDNkRBO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi01MDA6ICMwMEJDRDQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1jeWFuLTYwMDogIzAwQUNDMTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tNzAwOiAjMDA5N0E3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi04MDA6ICMwMDgzOEY7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1jeWFuLTkwMDogIzAwNjA2NDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTEwMDogIzg0RkZGRjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTIwMDogIzE4RkZGRjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTQwMDogIzAwRTVGRjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tQTcwMDogIzAwQjhENDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi01MDApO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tY3lhbi0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWN5YW4tMjAwKTtcblxuICAgICAgLyogdGVhbCAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC01MDogI2UwZjJmMTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtMTAwOiAjYjJkZmRiO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC0yMDA6ICM4MGNiYzQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS10ZWFsLTMwMDogIzRkYjZhYztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtNDAwOiAjMjZhNjlhO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC01MDA6ICMwMDk2ODg7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS10ZWFsLTYwMDogIzAwODk3YjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtNzAwOiAjMDA3OTZiO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC04MDA6ICMwMDY5NWM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS10ZWFsLTkwMDogIzAwNGQ0MDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTEwMDogI2E3ZmZlYjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTIwMDogIzY0ZmZkYTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTQwMDogIzFkZTliNjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtQTcwMDogIzAwYmZhNTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC01MDApO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tdGVhbC0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLXRlYWwtMjAwKTtcblxuICAgICAgLyogZ3JlZW4gKi9cbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLTUwOiAjRThGNUU5O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tMTAwOiAjQzhFNkM5O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tMjAwOiAjQTVENkE3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tMzAwOiAjODFDNzg0O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNDAwOiAjNjZCQjZBO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNTAwOiAjNENBRjUwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNjAwOiAjNDNBMDQ3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tNzAwOiAjMzg4RTNDO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tODAwOiAjMkU3RDMyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tOTAwOiAjMUI1RTIwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tQTEwMDogI0I5RjZDQTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLUEyMDA6ICM2OUYwQUU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1ncmVlbi1BNDAwOiAjMDBFNjc2O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZ3JlZW4tQTcwMDogIzAwQzg1MztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1ncmVlbi0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWdyZWVuLTIwMCk7XG5cbiAgICAgIC8qIGxpZ2h0Z3JlZW4gKi9cbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tNTA6ICNGMUY4RTk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTEwMDogI0RDRURDODtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tMjAwOiAjQzVFMUE1O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi0zMDA6ICNBRUQ1ODE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTQwMDogIzlDQ0M2NTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tNTAwOiAjOEJDMzRBO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi02MDA6ICM3Q0IzNDI7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTcwMDogIzY4OUYzODtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tODAwOiAjNTU4QjJGO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGlnaHRncmVlbi05MDA6ICMzMzY5MUU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLUExMDA6ICNDQ0ZGOTA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLUEyMDA6ICNCMkZGNTk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLUE0MDA6ICM3NkZGMDM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLUE3MDA6ICM2NEREMTc7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tNTAwKTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpZ2h0Z3JlZW4tLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1saWdodGdyZWVuLTIwMCk7XG5cbiAgICAgIC8qIGxpbWUgKi9cbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtNTA6ICNGOUZCRTc7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTEwMDogI0YwRjRDMztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtMjAwOiAjRTZFRTlDO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS0zMDA6ICNEQ0U3NzU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTQwMDogI0Q0RTE1NztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtNTAwOiAjQ0REQzM5O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS02MDA6ICNDMENBMzM7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTcwMDogI0FGQjQyQjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtODAwOiAjOUU5RDI0O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tbGltZS05MDA6ICM4Mjc3MTc7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLUExMDA6ICNGNEZGODE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLUEyMDA6ICNFRUZGNDE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLUE0MDA6ICNDNkZGMDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLUE3MDA6ICNBRUVBMDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtNTAwKTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWxpbWUtLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1saW1lLTIwMCk7XG5cbiAgICAgIC8qIHllbGxvdyAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTUwOiAjRkZGREU3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTEwMDogI0ZGRjlDNDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy0yMDA6ICNGRkY1OUQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctMzAwOiAjRkZGMTc2O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTQwMDogI0ZGRUU1ODtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy01MDA6ICNGRkVCM0I7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctNjAwOiAjRkREODM1O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTcwMDogI0ZCQzAyRDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy04MDA6ICNGOUE4MjU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctOTAwOiAjRjU3RjE3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LUExMDA6ICNGRkZGOEQ7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctQTIwMDogI0ZGRkYwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLXllbGxvdy1BNDAwOiAjRkZFQTAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LUE3MDA6ICNGRkQ2MDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0teWVsbG93LTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS15ZWxsb3ctMjAwKTtcblxuICAgICAgLyogYW1iZXIgKi9cbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLTUwOiAjRkZGOEUxO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItMTAwOiAjRkZFQ0IzO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItMjAwOiAjRkZFMDgyO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItMzAwOiAjRkZENTRGO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNDAwOiAjRkZDQTI4O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNTAwOiAjRkZDMTA3O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNjAwOiAjRkZCMzAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItNzAwOiAjRkZBMDAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItODAwOiAjRkY4RjAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItOTAwOiAjRkY2RjAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItQTEwMDogI0ZGRTU3RjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLUEyMDA6ICNGRkQ3NDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1hbWJlci1BNDAwOiAjRkZDNDAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tYW1iZXItQTcwMDogI0ZGQUIwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLS1saWdodDogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1hbWJlci0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWFtYmVyLTIwMCk7XG5cbiAgICAgIC8qIG9yYW5nZSAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTUwOiAjRkZGM0UwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTEwMDogI0ZGRTBCMjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS0yMDA6ICNGRkNDODA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtMzAwOiAjRkZCNzREO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTQwMDogI0ZGQTcyNjtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS01MDA6ICNGRjk4MDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtNjAwOiAjRkI4QzAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTcwMDogI0Y1N0MwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS04MDA6ICNFRjZDMDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtOTAwOiAjRTY1MTAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLUExMDA6ICNGRkQxODA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtQTIwMDogI0ZGQUI0MDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLW9yYW5nZS1BNDAwOiAjRkY5MTAwO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLUE3MDA6ICNGRjZEMDA7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tb3JhbmdlLTUwMCk7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtLWRhcms6IHZhcigtLW1kdy10aGVtZS1wYWxldHRlLS1vcmFuZ2UtMjAwKTtcblxuICAgICAgLyogZGVlcG9yYW5nZSAqL1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS01MDogI0ZCRTlFNztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtMTAwOiAjRkZDQ0JDO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS0yMDA6ICNGRkFCOTE7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwb3JhbmdlLTMwMDogI0ZGOEE2NTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtNDAwOiAjRkY3MDQzO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS01MDA6ICNGRjU3MjI7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwb3JhbmdlLTYwMDogI0Y0NTExRTtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtNzAwOiAjRTY0QTE5O1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS04MDA6ICNEODQzMTU7XG4gICAgICAtLW1kdy10aGVtZS1wYWxldHRlLS1kZWVwb3JhbmdlLTkwMDogI0JGMzYwQztcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTEwMDogI0ZGOUU4MDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTIwMDogI0ZGNkU0MDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTQwMDogI0ZGM0QwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtQTcwMDogI0REMkMwMDtcbiAgICAgIC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtLWxpZ2h0OiB2YXIoLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS01MDApO1xuICAgICAgLS1tZHctdGhlbWUtcGFsZXR0ZS0tZGVlcG9yYW5nZS0tZGFyazogdmFyKC0tbWR3LXRoZW1lLXBhbGV0dGUtLWRlZXBvcmFuZ2UtMjAwKTtcbiAgICB9XG4gIGA7XG59XG4iLCJpbXBvcnQgTURXVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XG5cbmNvbnN0IHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGREcmFnTGlzdGVuZXIoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgRXJyb3IoJ2VsZW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBIVE1MRWxlbWVudCcpO1xuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgY29uc3Qgc3dpcEluc3RhbmNlID0gbmV3IERyYWcoZWxlbWVudCwgY2FsbGJhY2spO1xuICBzd2lwSW5zdGFuY2UuYWRkRXZlbnRzKCk7XG5cbiAgaWYgKCFzd2lwZUluc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLmdldChlbGVtZW50KSkgc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5zZXQoZWxlbWVudCwgbmV3IE1hcCgpKTtcbiAgc3dpcGVJbnN0YW5jZXNCeUVsZW1lbnRBbmRGdW5jdGlvbi5nZXQoZWxlbWVudCkuc2V0KGNhbGxiYWNrLCBzd2lwSW5zdGFuY2UpO1xufTtcblxuLy8gaWYgeW91IGRvIG5vdCBwYXNzIGluIGNhbGxiYWNrIHRoZW4gYWxsIHRoZSBzd2lwZSBldmVudHMgb24gYW4gZWxlbWVudCB3aWxsIGJlIHJlbW92ZWRcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEcmFnTGlzdGVuZXIoZWxlbWVudCwgY2FsbGJhY2sgPSB1bmRlZmluZWQpIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgRXJyb3IoJ2VsZW1lbnQgbXVzdCBiZSBhbiBpbnN0YW5jZSBIVE1MRWxlbWVudCcpO1xuXG4gIGNvbnN0IHN3aXBJbnN0YW5jZXMgPSBzd2lwZUluc3RhbmNlc0J5RWxlbWVudEFuZEZ1bmN0aW9uLmdldChlbGVtZW50KTtcbiAgaWYgKCFzd2lwSW5zdGFuY2VzKSByZXR1cm47XG4gIGlmIChjYWxsYmFjaykge1xuICAgIGNvbnN0IGVsID0gc3dpcEluc3RhbmNlcy5nZXQoY2FsbGJhY2spO1xuICAgIGlmIChlbCkgZWwucmVtb3ZlRXZlbnRzKCk7XG4gICAgc3dpcEluc3RhbmNlcy5kZWxldGUoY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIHN3aXBJbnN0YW5jZXMuZm9yRWFjaChpID0+IGkucmVtb3ZlRXZlbnRzKCkpO1xuICAgIHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZGVsZXRlKGVsZW1lbnQpO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRHJhZ0xpc3RlbmVyRm9yRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHRocm93IEVycm9yKCdlbGVtZW50IG11c3QgYmUgYW4gaW5zdGFuY2UgSFRNTEVsZW1lbnQnKTtcbiAgY29uc3Qgc3dpcEluc3RhbmNlcyA9IHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpO1xuICBpZiAoIXN3aXBJbnN0YW5jZXMpIHJldHVybjtcbiAgc3dpcEluc3RhbmNlcy5mb3JFYWNoKGkgPT4gaS5lbmFibGUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlRHJhZ0xpc3RlbmVyRm9yRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHRocm93IEVycm9yKCdlbGVtZW50IG11c3QgYmUgYW4gaW5zdGFuY2UgSFRNTEVsZW1lbnQnKTtcbiAgY29uc3Qgc3dpcEluc3RhbmNlcyA9IHN3aXBlSW5zdGFuY2VzQnlFbGVtZW50QW5kRnVuY3Rpb24uZ2V0KGVsZW1lbnQpO1xuICBpZiAoIXN3aXBJbnN0YW5jZXMpIHJldHVybjtcbiAgc3dpcEluc3RhbmNlcy5mb3JFYWNoKGkgPT4gaS5kaXNhYmxlKCkpO1xufVxuXG5jbGFzcyBEcmFnIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgIHRoaXMuaGFzUG9pbnRlckV2ZW50ID0gISF3aW5kb3cuUG9pbnRlckV2ZW50O1xuICAgIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZVN0YXJ0ID0gdGhpcy5oYW5kbGVHZXN0dXJlU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVNb3ZlID0gdGhpcy5oYW5kbGVHZXN0dXJlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCA9IHRoaXMuaGFuZGxlR2VzdHVyZUVuZC5iaW5kKHRoaXMpO1xuXG4gICAgLy8gY2FsbGJhY2sgdGhyb3R0bGVyXG4gICAgdGhpcy5jYWxsYmFja1Rocm90dGxlID0gTURXVXRpbHMucmFmVGhyb3R0bGUoKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5kaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2UoZXZlbnQpO1xuICAgICAgZXZlbnQuZGlyZWN0aW9uID0gdGhpcy5nZXREaXJlY3Rpb24odGhpcy5sYXN0RGlzdGFuY2UsIGV2ZW50LmRpc3RhbmNlKTtcbiAgICAgIHRoaXMubGFzdERpc3RhbmNlID0gZXZlbnQuZGlzdGFuY2U7XG4gICAgICB0aGlzLmNhbGxiYWNrKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEV2ZW50cygpIHtcbiAgICB0aGlzLmRpc2FibGVUb3VjaEV2ZW50cygpO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZVN0YXJ0LCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVTdGFydCk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50cygpO1xuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICBlbmFibGVUb3VjaEV2ZW50cygpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGVbJ3RvdWNoLWFjdGlvbiddID0gJyc7XG4gIH1cblxuICBkaXNhYmxlVG91Y2hFdmVudHMoKSB7XG4gICAgLy8gdGhpcyBkaXNhYmxlZCB0aGUgYnJvd3NlcnMgYXV0byBoYW5kbGluZyBvZiB0aGUgdG91Y2ggZXZlbnRzLlxuICAgIC8vIElmIHRoaXMgaXMgbm90IHNldCB0byBub25lLCB0aGVuIHRoZSBicm93c2VyIHdpbGwgaW1taWRpYXRlbHkgY2FuY2VsIHRoZSB0b2FjaCBldm5ldHNcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGVbJ3RvdWNoLWFjdGlvbiddID0gJ25vbmUnO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRzKCkge1xuICAgIHRoaXMuZW5hYmxlVG91Y2hFdmVudHMoKTtcbiAgICBpZiAoTURXVXRpbHMuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlU3RhcnQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVTdGFydCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZUVuZCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlR2VzdHVyZVN0YXJ0KGV2KSB7XG4gICAgZXYuc3RhdGUgPSAnc3RhcnQnO1xuXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmluaXRpYWxUb3VjaFBvcyA9IHRoaXMuZ2V0Q2xpZW50WFkoZXYpO1xuICAgIHRoaXMubGFzdERpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZShldik7XG4gICAgZXYuZGlzdGFuY2UgPSB0aGlzLmxhc3REaXN0YW5jZTtcbiAgICBldi5kaXJlY3Rpb24gPSB0aGlzLmdldERpcmVjdGlvbih0aGlzLmxhc3REaXN0YW5jZSwgdGhpcy5sYXN0RGlzdGFuY2UpO1xuICAgIHRoaXMuY2FsbGJhY2soZXYpO1xuICAgIC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBoYW5kbGVHZXN0dXJlTW92ZShldikge1xuICAgIGV2LnN0YXRlID0gJ21vdmUnO1xuICAgIGlmICh0aGlzLmluaXRpYWxUb3VjaFBvcykgdGhpcy5jYWxsYmFja1Rocm90dGxlKGV2KTtcbiAgICAvLyBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgaGFuZGxlR2VzdHVyZUVuZChldikge1xuICAgIGV2LnN0YXRlID0gJ2VuZCc7XG4gICAgXG4gICAgaWYgKE1EV1V0aWxzLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlTW92ZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5ib3VuZF9oYW5kbGVHZXN0dXJlRW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRfaGFuZGxlR2VzdHVyZU1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kX2hhbmRsZUdlc3R1cmVFbmQpO1xuICAgIH1cblxuICAgIHRoaXMuZW5kVGltZSA9IERhdGUubm93KCk7XG4gICAgZXYucnVuVGltZSA9IHRoaXMuZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIGV2LmRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZShldik7XG4gICAgZXYuZW5kRGlyZWN0aW9uID0gdGhpcy5nZXREaXJlY3Rpb24oeyB4OiAwLCB5OiAwIH0sIGV2LmRpc3RhbmNlKTtcbiAgICBldi52ZWxvY2l0eSA9IHRoaXMuZ2V0VmVsb2NpdHkoZXYuZGlzdGFuY2UsIGV2LnJ1blRpbWUpO1xuXG4gICAgaWYgKGV2LmNsaWVudFggPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2xpZW50UG9zID0gdGhpcy5nZXRDbGllbnRYWShldik7XG4gICAgICBldi5jbGllbnRYID0gY2xpZW50UG9zLng7XG4gICAgICBldi5jbGllbnRZID0gY2xpZW50UG9zLnk7XG4gICAgfVxuICAgIHRoaXMuY2FsbGJhY2soZXYpO1xuICAgIC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBnZXREaXN0YW5jZShldmVudCkge1xuICAgIGNvbnN0IHh5ID0gdGhpcy5nZXRDbGllbnRYWShldmVudCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHh5LnggLSB0aGlzLmluaXRpYWxUb3VjaFBvcy54LFxuICAgICAgeTogeHkueSAtIHRoaXMuaW5pdGlhbFRvdWNoUG9zLnlcbiAgICB9O1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKGEsIGIpIHtcbiAgICBjb25zdCB4ID0gYi54ID4gYS54ID8gMSA6IGIueCA9PT0gYS54ID8gMCA6IC0xO1xuICAgIGNvbnN0IHkgPSBiLnkgPiBhLnkgPyAxIDogYi55ID09PSBhLnkgPyAwIDogLTE7XG4gICAgcmV0dXJuIHtcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgeERlc2NyaXB0aW9uOiB4ID09PSAwID8gJ25vbmUnIDogeCA9PT0gMSA/ICdyaWdodCcgOiAnbGVmdCcsXG4gICAgICB5RGVzY3JpcHRpb246IHkgPT09IDAgPyAnbm9uZScgOiB5ID09PSAxID8gJ2Rvd24nIDogJ3VwJ1xuICAgIH07XG4gIH1cblxuICBnZXRDbGllbnRYWShldmVudCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBldmVudC50YXJnZXRUb3VjaGVzICYmIGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID8gZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LmNsaWVudFgsXG4gICAgICB5OiBldmVudC50YXJnZXRUb3VjaGVzICYmIGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID8gZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSA6IGV2ZW50LmNsaWVudFlcbiAgICB9XG4gIH1cblxuICBnZXRWZWxvY2l0eShkaXN0YW5jZSwgdGltZSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBkaXN0YW5jZS54IC8gdGltZSxcbiAgICAgIHk6IGRpc3RhbmNlLnkgLyB0aW1lXG4gICAgfTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGlzUGhvbmUgPSBpc1Bob25lQ2hlY2soKTtcbmV4cG9ydCBjb25zdCBpc1Bob25lQW5kVGFibGV0ID0gaXNQaG9uZUFuZFRhYmxldENoZWNrKCk7XG5cbmZ1bmN0aW9uIGlzUGhvbmVBbmRUYWJsZXRDaGVjaygpIHtcbiAgaWYgKHR5cGVvZiBGT1JDRV9NT0JJTEUgIT09J3VuZGVmaW5lZCcgJiYgRk9SQ0VfTU9CSUxFID09PSAndHJ1ZScpIHJldHVybiB0cnVlO1xuICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uIChhKSB7XG4gICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7XG4gIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICByZXR1cm4gY2hlY2s7XG59XG5cbmZ1bmN0aW9uIGlzUGhvbmVDaGVjaygpIHtcbiAgaWYgKHR5cGVvZiBGT1JDRV9NT0JJTEUgIT09J3VuZGVmaW5lZCcgJiYgRk9SQ0VfTU9CSUxFID09PSAndHJ1ZScpIHJldHVybiB0cnVlO1xuICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uIChhKSB7XG4gICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7XG4gIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICByZXR1cm4gY2hlY2s7XG59XG4iLCJpbXBvcnQgJy4vY29yZS9UaGVtZS5qcyc7XG5pbXBvcnQgJy4vY29yZS9nZXN0dXJlcy5qcyc7XG5cbi8vIC0tLSBDb21wb25lbnRzIC0tLVxuXG5pbXBvcnQgJy4vY29tcG9uZW50cy9hdXRvY29tcGxldGUvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvYmFja2Ryb3AvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvYmFubmVyL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2JvdHRvbS1uYXZpZ2F0aW9uL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9jYXJkL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2NoZWNrYm94L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2RpYWxvZy9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9kcmF3ZXIvaW5kZXguanMnO1xuLy8gaW1wb3J0ICcuL2NvbXBvbmVudHMvZXhwYW5kZXIvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvZmFiL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2ljb24vaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2xpc3QvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvbGlzdC1pdGVtL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21lbnUvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvcGFuZWwvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvc2VsZWN0L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3NoZWV0L2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3NsaWRlci9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9zbmFja2Jhci9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9zd2l0Y2gvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdGFicy90YWItYm9keS9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90YWJzL3RhYi1idXR0b24vaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdGFicy90YWJzLWJhci9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90YWJzL3RhYnMtY29udGVudC9pbmRleC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90ZXh0LWZpZWxkL2luZGV4LmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3Rvb2x0aXAvaW5kZXguanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdG9wLWFwcC1iYXIvaW5kZXguanMnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==