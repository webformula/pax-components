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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony import */ var _HTMLElementExtendedPaxComponents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLElementExtendedPaxComponents", function() { return _HTMLElementExtendedPaxComponents_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _tags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);

    

    const { html, css } = _tags_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    
  

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mobile_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


const MDWUtils = new class {
  constructor() {
    this._uid = 1;
    this._setupTransitionEvent();
    this._setTransformPropertyName();
    this.isPhone = _mobile_info_js__WEBPACK_IMPORTED_MODULE_0__["isPhone"];
    this.isPhoneAndTablet = _mobile_info_js__WEBPACK_IMPORTED_MODULE_0__["isPhoneAndTablet"];
    // add class indecator for mobile
    if (this.isMobile) document.body.classList.add('mdw-is-mobile');
    else document.body.classList.remove('mdw-is-mobile');
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
      this.transformPropertyName_ = 'transform' in el.style ? 'transform' : '-webkit-transform';
    }
  }
}

window.MDWUtils = MDWUtils;

/* harmony default export */ __webpack_exports__["default"] = (MDWUtils);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// NOTE Months start at 1 not 0

const MDWDateUtil = new class {
  constructor() {
    this.yearMonthDayRegex = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?!\S)/;
  }

  // Sets the local (en-us).
  // leaving this undeifend will use the browser default
  get local() {
    return this._locale;
  }

  set local(value) {
    this._locale = value;
  }

  // Sets the timezone used.
  // leaving this undeifend will use the browser default
  get timezone() {
    return this._timezone;
  }

  set timezone(value) {
    this._timezone = value;
  }

  parse(value) {
    // this will return an invalid date abject
    if (['null', 'undefined', 'Invalid Date'].includes(value)) return new Date('');

    if (typeof value === 'number') return new Date(value);

    // format used for inputs yyyy-mm-dd
    if (typeof value === 'string') {
      const inputDateMatch = value.match(this.yearMonthDayRegex);
      if (inputDateMatch) {
        const [_, year, month, day] = inputDateMatch;
        return this.buildFromParts({
          year,
          month,
          day
        });
      }
    }

    return new Date(Date.parse(value));
  }

  // Month starts at 1
  buildFromParts({ year, month, day}) {
    return new Date(year, month - 1, day);
  }

  adjustDate(date, { add = undefined , set = undefined }) {
    let { year, month, day } = this.getParts(date);

    if (set) {
      if (set.year) year = set.year;
      if (set.month) month = set.month;
      if (set.day) day = set.day;
    }

    if (add) {
      if (add.year) year += add.year;
      if (add.month) month += add.month;
      if (add.day) day += add.day;
    }

    return this.buildFromParts({ year, month, day });
  }

  defaultYearRange(startYear = MDWDateUtil.getYear(new Date()) - 50, range = 100) {
    return [...new Array(range)].map((_, i) => startYear + i);
  }

  getMonthsSurroundingYear(date = this.today(), yearRange = 2) {
    const firstYear = this.parse(date).getFullYear() - yearRange;
    const years = yearRange * 2;
    // add 12 dates for each month for each year
    return [...new Array(years)].flatMap((_, i) => [...new Array(12)].map((_, j) => new Date(firstYear + i, j, 1)));
  }

  getParts(date) {
    return {
      year: this.getYear(date),
      month: this.getMonth(date),
      day: this.getMonthDay(date)
    };
  }

  getYear(date) {
    return date.getFullYear();
  }

  getMonth(date) {
    return date.getMonth() + 1;
  }

  getWeekDay(date) {
    return date.getDay();
  }

  getMonthDay(date) {
    return date.getDate();
  }

  // style = 'long' | 'short' | 'narrow'
  getMonthNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
    return this.range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
  }

  // getDateNames() {
  //   const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
  //   return this.range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
  // }

  // style = 'long' | 'short' | 'narrow'
  getDayOfWeekNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
    return this.range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
  }

  getYearName(date) {
    const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
    return this._stripDirectionalityCharacters(this._format(dtf, date));
  }

  getFirstDateOfMonth(date) {
    return new Date(this.getYear(date), this.getMonth(date) - 1, 1);
  }

  getLastDateOfMonth(date) {
    return new Date(this.getYear(date), this.getMonth(date) - 1, 0);
  }

  getNumDaysInMonth(date) {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }

  getMonthDayArray(date, { fillInMonth = false, minDate = undefined, maxDate = undefined }) {
    const firstDay = this.getWeekDay(this.getFirstDateOfMonth(date));
    const lastday = this.getWeekDay(this.getLastDateOfMonth(date));
    const targetYear = this.getYear(date);
    const targetMonth = this.getMonth(date);
    const todayParts = this.getParts(this.today());

    // start on sunday
    let currentDate = this.adjustDate(date, {
      set: { day: 1 },
      add: { day: -firstDay }
    });

    if (minDate && !this.isValid(minDate)) minDate = undefined;
    if (maxDate && !this.isValid(maxDate)) maxDate = undefined;

    // 6 rows of 7 days
    const monthDays = [...Array(6 * 7)].map((_, i) => {
      const date = currentDate;
      const year = this.getYear(date);
      const month = this.getMonth(date);
      const day = this.getMonthDay(date);
      // -1, 0, 1
      const targetMonthOffset = year < targetYear ? -1 : year > targetYear ? 1 : month < targetMonth ? -1 : month === targetMonth ? 0 : 1;
      const display = (fillInMonth && targetMonthOffset > 0) || targetMonthOffset === 0 ? day : '';

      const currentMonth = month === targetMonth;
      const beforeMinDate = minDate ? currentDate < minDate : false;
      const afterMaxDate = maxDate ? currentDate > maxDate : false;
      const interactable = !beforeMinDate && !afterMaxDate && display !== '';
      const isToday = todayParts.year === year && todayParts.month === month && todayParts.day === day
      currentDate = this.adjustDate(currentDate, { add: { day: 1 } });

      return {
        display,
        date,
        interactable,
        currentMonth,
        beforeMinDate,
        afterMaxDate,
        isToday
      };
    });

    // split into week rows
    const res = [];
    while (monthDays.length) {
      res.push(monthDays.splice(0, 7));
    }

    return res;
  }

  isSameYear(date1, date2) {
    if (!date1 || !date2) return false;
    return this.getYear(date1) === this.getYear(date2);
  }

  isSameMonth(date1, date2) {
    if (!date1 || !date2) return false;
    return this.getMonth(date1) === this.getMonth(date2);
  }

  clone(date) {
    return new Date(date.getTime());
  }

  today() {
    return new Date();
  }

  // --- format date ---

  identity(x) {
    return x;
  }

  tokenize(intlFormatter, date) {
    return intlFormatter.formatToParts(date).filter(token => token.type !== 'literal');
  }

  normalize(parts) {
    // Chrome <= 71 incorrectly case `dayperiod` (#4)
    parts.dayPeriod = parts.dayPeriod || parts.dayperiod;
    return parts;
  }


  // format dates
  //   date: js date object
  //   formatPattern:
  //      ddd, MMM DD = Thu, Dec 12
  //      YYYY - MMMM - dddd = 2019 - Dmonth - wednesday
  //      YY - MMM - ddd = 19 - 10 - 21
  format(date, formatPattern) {
    if (!this.isValid(date)) return;

    const intlFormattersOptions = [
      {
        weekday: 'long', // dddd
        year: 'numeric', // YYYY
        month: '2-digit', // MM
        day: '2-digit', // DD
        hour: '2-digit', // hh
        minute: '2-digit', // mm
        second: '2-digit' // ss
      },
      {
        month: 'long',
        hour: '2-digit',
        hour12: false
      }
    ];
    const [intlFormatter, intlFormatterLong] = intlFormattersOptions.map(
      intlFormatterOptions =>
        new Intl.DateTimeFormat(this.locale, {
          ...intlFormatterOptions,
          timeZone: this.timezone
        })
    );
    const tokens = this.tokenize(intlFormatter, date);
    const longTokens = this.tokenize(intlFormatterLong, date).map(token => {
      return token.type !== 'literal' ? { type: `l${token.type}`, value: token.value } : token;
    });
    const allTokens = [...tokens, ...longTokens];
    const parts = allTokens.reduce((parts, token) => {
      parts[token.type] = token.value;
      return parts;
    }, {});
    const patternRegexp = new RegExp(`[YMDdAaHhms]+`, 'g');
    const formatters = {
      YYYY: parts => parts.year, // 2019
      YY: parts => parts.year.slice(-2), // 19
      MMMM: parts => parts.lmonth, // December
      MMM: parts => parts.lmonth.slice(0, 3), // Dec
      MM: parts => parts.month, // 12
      DD: parts => parts.day, // 21
      dd: parts => parts.day, // 21
      dddd: parts => parts.weekday, // Saturday
      ddd: parts => parts.weekday.slice(0, 3), // Sat
      A: parts => parts.dayPeriod, // AM / PM
      a: parts => parts.dayPeriod.toLowerCase(), // am / pm
      HH: parts => parts.lhour, // 00
      hh: parts => parts.hour, // 12
      mm: parts => parts.minute, // 23
      ss: parts => parts.second // 54
    };
    const allFormatters = { ...formatters };
    return formatPattern.replace(patternRegexp, mask => (allFormatters[mask] || this.identity)(parts, date));
  }

  toIso8601(date) {
    return [
      date.getUTCFullYear(),
      this._2digit(date.getUTCMonth() + 1),
      this._2digit(date.getUTCDate())
    ].join('-');
  }

  isValid(date) {
    return !isNaN(date.getTime());
  }

  _stripDirectionalityCharacters(str) {
    return str.replace(/[\u200e\u200f]/g, '');
  }

  _format(dtf, date) {
    const d = new Date(Date.UTC(
        date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
        date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    return dtf.format(d);
  }

  range(length, valueFunction) {
    const valuesArray = Array(length);
    let i = 0;
    for (i; i < length; i += 1) {
      valuesArray[i] = valueFunction(i);
    }

    return valuesArray;
  }
}

window.MDWDateUtil = MDWDateUtil;

/* harmony default export */ __webpack_exports__["default"] = (MDWDateUtil);


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDragListener", function() { return addDragListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDragListener", function() { return removeDragListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableDragListenerForElement", function() { return enableDragListenerForElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableDragListenerForElement", function() { return disableDragListenerForElement; });
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPhone", function() { return isPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPhoneAndTablet", function() { return isPhoneAndTablet; });
const isPhone = isPhoneCheck();
const isPhoneAndTablet = isPhoneAndTabletCheck();

function isPhoneAndTabletCheck() {
  if (false) {}
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function isPhoneCheck() {
  if (false) {}
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["css"]`
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

      --mdw-theme-background_white--light: #ffffff;
      --mdw-theme-background_white--dark: #121212;


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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLElementExtendedPaxComponents; });
class HTMLElementExtendedPaxComponents extends HTMLElement {
  constructor() {
    super();
  }

  /* Clone from pre built htmlTemplate
   *   - Rerender: replaces html but not styles. This is usefull for dynamic templates
   */
  cloneTemplate(rerender) {
    const template = document.getElementById(`${this.nodeName.toLowerCase()}--template`);
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

  connectedCallback() {
    if (!this.__isBuildProcess && this.addEvents) this.addEvents();
  }

  disconnectedCallback() {
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
function html(strs, ...ev) {
  let f = '';
  let i = 0;
  const len = strs.length;
  for(; i < len; i += 1) {
    if (i > 0) f += ev[i - 1];
    f += strs[i];
  }
  return f;
}

const css = html;
const tags = {
  html,
  css
};

/* harmony default export */ __webpack_exports__["default"] = (tags);



/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
__webpack_require__(0);
__webpack_require__(10);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(5);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(11);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(7);
__webpack_require__(51);
__webpack_require__(52);
__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(8);
__webpack_require__(2);
__webpack_require__(4);
__webpack_require__(6);
__webpack_require__(3);
__webpack_require__(59);
__webpack_require__(1);
module.exports = __webpack_require__(60);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// create custom element templates
window.addEventListener('DOMContentLoaded', function () {
  
  
  
  
  var mdwbutton = document.createElement('template');
  mdwbutton.setAttribute('id','mdw-button--template');
  mdwbutton.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwbutton);
  
  var mdwcheckbox = document.createElement('template');
  mdwcheckbox.setAttribute('id','mdw-checkbox--template');
  mdwcheckbox.innerHTML= `
    <style>
      
      /* --- background ---  */
      
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
      
    </style>
    <render-block>
      <input type="checkbox">
      <div class="mdw-background">
        <div class="mdw-checkmark"></div>
        <div class="mdw-mixedmark"></div>
      </div>
      <div class="mdw-ripple mdw-checkbox-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwcheckbox);
  var mdwcircularprogress = document.createElement('template');
  mdwcircularprogress.setAttribute('id','mdw-circular-progress--template');
  mdwcircularprogress.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      
            <svg style="width: undefinedpx; height: undefinedpx;">
              <circle
                cx="50%"
                cy="50%"
                r="NaN"
                style="
                  animation-name: mat-progress-spinner-stroke-rotate-undefined;
                  stroke-dasharray: NaNpx;
                  stroke-width: NaN%;
                "
                ></circle>
            </svg>
          
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwcircularprogress);
  
  
  var mdwdatepickerdesktop = document.createElement('template');
  mdwdatepickerdesktop.setAttribute('id','mdw-date-picker--desktop--template');
  mdwdatepickerdesktop.innerHTML= `
    <style>
      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .mdw-date-picker--month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        padding: 8px 16px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }
      
      .mdw-date-picker--months-container {
        overflow: hidden;
        position: relative;
        height: 184px;
        width: 280px;
      }
      
      mdw-date-picker--month-days {
        position: absolute;
        transform: translateX(0);
        opacity: 0;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      
      .mdw-active-month {
        opacity: 1;
      }
    </style>
    <render-block>
      <div class="mdw-date-picker--controls-container">
        <mdw-date-picker--year-view-button mdw-display-date=""></mdw-date-picker--year-view-button>
        <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
      </div>
      
      <div class="mdw-date-picker--views">
        <div class="mdw-date-picker--month-day-header">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
        
        <div class="mdw-date-picker--months-container">
          <mdw-date-picker--month-days class="mdw-active-month"
            mdw-fill-month
            mdw-display-date=""
            mdw-selected-date=""
            mdw-min-date=""
            mdw-max-date=""
            ></mdw-date-picker--month-days>
          <mdw-date-picker--month-days
            mdw-fill-month
            mdw-display-date=""
            mdw-min-date=""
            mdw-max-date=""
            ></mdw-date-picker--month-days>
        </div>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickerdesktop);
  var mdwdatepickermobile = document.createElement('template');
  mdwdatepickermobile.setAttribute('id','mdw-date-picker--mobile--template');
  mdwdatepickermobile.innerHTML= `
    <style>
      
            :host {
              width: 328px;
            }
      
            .header {
              width: calc(100% - 48px);
              padding: 28px 24px 20px 24px;
              background-color: var(--mdw-theme-primary);
              color: var(--mdw-theme-text--on-primary);
            }
      
            .header-title {
              font-size: 14px;
              padding-bottom: 32px;
            }
      
            .header-date {
              font-size: 36px;
            }
      
            .header-date-edit {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
      
            .mdw-date-picker--month-day-header {
              color: var(--mdw-theme-text--body);
              font-size: 12px;
              padding: 8px 16px;
              flex: 1;
              display: flex;
              justify-content: space-around;
            }
      
            .mdw-date-picker--views {
              display: flex;
              overflow: hidden;
              width: 100%;
            }
      
            .mdw-date-picker--scroll-container {
              display: flex;
              width: 100%;
              transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
      
            .mdw-date-picker--controls-container {
              flex-direction: row;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 4px;
              padding-top: 4px;
            }
      
            .single-month {
              width: 100%;
              flex-shrink: 0;
            }
      
            .bottom-controls {
              flex-direction: row;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              padding: 8px;
            }
          
    </style>
    <render-block>
      
            <div class="header">
              <div class="header-title">Select date</div>
      
              <div class="header-date-edit">
                <div class="header-date">Select date</div>
                <mdw-icon>edit</mdw-icon>
              </div>
            </div>
      
            <div class="mdw-date-picker--views">
              <div class="mdw-date-picker--scroll-container" style="-webkit-transform: translateX(-100%); transition: none;">
                
                  <div class="single-month">
                    <div class="mdw-date-picker--controls-container">
                      <mdw-date-picker--year-view-button mdw-display-date="Mon Jan 06 2020 00:00:00 GMT-0500 (Eastern Standard Time)"></mdw-date-picker--year-view-button>
                      <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
                    </div>
      
                    <div class="mdw-date-picker--month-day-header">
                      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
                    </div>
      
                    <mdw-date-picker--month-days class=""
                      mdw-fill-month
                      mdw-display-date="Mon Jan 06 2020 00:00:00 GMT-0500 (Eastern Standard Time)"
                      mdw-selected-date=""
                      mdw-min-date="undefined"
                      mdw-max-date="undefined"
                      ></mdw-date-picker--month-days>
                  </div>
                
      
                  <div class="single-month">
                    <div class="mdw-date-picker--controls-container">
                      <mdw-date-picker--year-view-button mdw-display-date="Thu Feb 06 2020 20:03:00 GMT-0500 (Eastern Standard Time)"></mdw-date-picker--year-view-button>
                      <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
                    </div>
      
                    <div class="mdw-date-picker--month-day-header">
                      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
                    </div>
      
                    <mdw-date-picker--month-days class="mdw-active-month"
                      mdw-fill-month
                      mdw-display-date="Thu Feb 06 2020 20:03:00 GMT-0500 (Eastern Standard Time)"
                      mdw-selected-date=""
                      mdw-min-date="undefined"
                      mdw-max-date="undefined"
                      ></mdw-date-picker--month-days>
                  </div>
                
      
                  <div class="single-month">
                    <div class="mdw-date-picker--controls-container">
                      <mdw-date-picker--year-view-button mdw-display-date="Fri Mar 06 2020 00:00:00 GMT-0500 (Eastern Standard Time)"></mdw-date-picker--year-view-button>
                      <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
                    </div>
      
                    <div class="mdw-date-picker--month-day-header">
                      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
                    </div>
      
                    <mdw-date-picker--month-days class=""
                      mdw-fill-month
                      mdw-display-date="Fri Mar 06 2020 00:00:00 GMT-0500 (Eastern Standard Time)"
                      mdw-selected-date=""
                      mdw-min-date="undefined"
                      mdw-max-date="undefined"
                      ></mdw-date-picker--month-days>
                  </div>
                
              </div>
            </div>
      
            <div class="bottom-controls">
              <mdw-button id="cancel-button" class="mdw-primary">cancel</mdw-button>
              <mdw-button id="ok-button" class="mdw-primary">ok</mdw-button>
            </div>
          
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickermobile);
  var mdwdatepickermonthdays = document.createElement('template');
  mdwdatepickermonthdays.setAttribute('id','mdw-date-picker--month-days--template');
  mdwdatepickermonthdays.innerHTML= `
    <style>
      :host {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        pointer-events: none;
      }
      
      :host(.mdw-active-month) {
        pointer-events: auto;
      }
      
      .container {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 28px);
        grid-column-gap: 4px;
        grid-row-gap: 0px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
      }
      
      :host(.mdw-mobile) .container {
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(6, 36px);
        grid-column-gap: 4px;
        padding: 0 12px;
      }
      
      .mdw-date-picker--day {
        font-size: 13px;
        color: var(--mdw-theme-text--heading);
        user-select: none;
        box-sizing: border-box;
        cursor: pointer;
        pointer-events: none;
        position: relative;
        text-align: center;
        padding: 6px;
      }
      
      .mdw-date-picker--day::before {
        content: "";
        width: 28px;
        height: 28px;
        position: absolute;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
        border-radius: 50%;
        z-index: -1;
      }
      
      .mdw-date-picker--day.mdw-interactable {
        cursor: pointer;
        pointer-events: auto;
      }
      
      .mdw-date-picker--day.mdw-out-of-range {
        color: rgb(140,120,120);
        pointer-events: none;
        cursor: auto;
      }
      
      .mdw-date-picker--day.mdw-next-month {
        color: rgb(140,140,140);
      }
      
      .mdw-date-picker--day.mdw-next-month.mdw-out-of-range {
        color: rgb(140,120,120);
      }
      
      .mdw-date-picker--day.mdw-selected {
        color: var(--mdw-theme-text--on-primary);
      }
      
      .mdw-date-picker--day.mdw-selected::before {
        background-color: var(--mdw-theme-primary);
      }
      
      .mdw-date-picker--day.mdw-today::before {
        border: 1px solid var(--mdw-theme-foreground);
      }
    </style>
    <render-block>
      <div class="container">
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div><div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div><div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div><div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div><div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div><div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
        <div class="mdw-date-picker--day mdw-next-month" mdw-date=""></div>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickermonthdays);
  var mdwdatepickermonthnavigationbuttons = document.createElement('template');
  mdwdatepickermonthnavigationbuttons.setAttribute('id','mdw-date-picker--month-navigation-buttons--template');
  mdwdatepickermonthnavigationbuttons.innerHTML= `
    <style>
      :host {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
        height: 48px;
      }
      
      mdw-button {
        color: var(--mdw-theme-text--body);
      }
      
      :host(.hide) mdw-button {
        display: none;
      }
    </style>
    <render-block>
      <mdw-button class="mdw-icon left">
        <mdw-icon>keyboard_arrow_left</mdw-icon>
      </mdw-button>
      
      <mdw-button class="mdw-icon right">
        <mdw-icon>keyboard_arrow_right</mdw-icon>
      </mdw-button>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickermonthnavigationbuttons);
  var mdwdatepickerviewmonth = document.createElement('template');
  mdwdatepickerviewmonth.setAttribute('id','mdw-date-picker--view-month--template');
  mdwdatepickerviewmonth.innerHTML= `
    <style>
      
    </style>
    <render-block>
      <mdw-date-picker--view-month--desktop
                    mdw-month-view
                    mdw-display-date=""
                    mdw-display-date=""
                    mdw-min-date=""
                    mdw-max-date=""
                    ></mdw-date-picker--view-month--desktop>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickerviewmonth);
  var mdwdatepickeryearviewbutton = document.createElement('template');
  mdwdatepickeryearviewbutton.setAttribute('id','mdw-date-picker--year-view-button--template');
  mdwdatepickeryearviewbutton.innerHTML= `
    <style>
      :host {
        margin-left: 24px;
        position: relative;
        padding-right: 28px;
        cursor: pointer;
        color: var(--mdw-theme-text--body);
        display: flex;
        justify-content: space-between;
      }
      
      .month {
        display: inline-block;
        line-height: 13px;
        overflow: hidden;
        transition: width 110ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .icon {
        right: 8px;
        top: 7px;
        width: 0;
        height: 0;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--mdw-theme-text--body);
      }
      
      :host(.mdw-open) .icon {
        transform: rotate(180deg) translateY(-5px);
        transform-origin: top;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    </style>
    <render-block>
      <div>
        <span class="month" style="width: 64px">February</span>
        <span class="year">2020</span>
      </div>
      <i class="icon"></i>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickeryearviewbutton);
  var mdwdatepickeryear = document.createElement('template');
  mdwdatepickeryear.setAttribute('id','mdw-date-picker--year--template');
  mdwdatepickeryear.innerHTML= `
    <style>
      :host {
        display: block;
        overflow-y: scroll;
        height: 214px;
      }
      
      .mdw-date-picker--year-list-grid {
        display: grid;
        grid-template-columns: repeat(4, 52px);
        grid-column-gap: 7px;
        grid-row-gap: 4px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
        padding-right: 20px;
      }
      
      .mdw-date-picker--year-item {
        font-size: 15px;
        width: 100%;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
        cursor: pointer;
        color: var(--mdw-theme-text--heading);
      }
      
      .mdw-date-picker--year-item.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }
    </style>
    <render-block>
      <div class="mdw-date-picker--year-list-grid">
        <div class="mdw-date-picker--year-item" mdw-year="1970">1970</div>
        <div class="mdw-date-picker--year-item" mdw-year="1971">1971</div>
        <div class="mdw-date-picker--year-item" mdw-year="1972">1972</div>
        <div class="mdw-date-picker--year-item" mdw-year="1973">1973</div>
        <div class="mdw-date-picker--year-item" mdw-year="1974">1974</div>
        <div class="mdw-date-picker--year-item" mdw-year="1975">1975</div>
        <div class="mdw-date-picker--year-item" mdw-year="1976">1976</div>
        <div class="mdw-date-picker--year-item" mdw-year="1977">1977</div>
        <div class="mdw-date-picker--year-item" mdw-year="1978">1978</div>
        <div class="mdw-date-picker--year-item" mdw-year="1979">1979</div>
        <div class="mdw-date-picker--year-item" mdw-year="1980">1980</div>
        <div class="mdw-date-picker--year-item" mdw-year="1981">1981</div>
        <div class="mdw-date-picker--year-item" mdw-year="1982">1982</div>
        <div class="mdw-date-picker--year-item" mdw-year="1983">1983</div>
        <div class="mdw-date-picker--year-item" mdw-year="1984">1984</div>
        <div class="mdw-date-picker--year-item" mdw-year="1985">1985</div>
        <div class="mdw-date-picker--year-item" mdw-year="1986">1986</div>
        <div class="mdw-date-picker--year-item" mdw-year="1987">1987</div>
        <div class="mdw-date-picker--year-item" mdw-year="1988">1988</div>
        <div class="mdw-date-picker--year-item" mdw-year="1989">1989</div>
        <div class="mdw-date-picker--year-item" mdw-year="1990">1990</div>
        <div class="mdw-date-picker--year-item" mdw-year="1991">1991</div>
        <div class="mdw-date-picker--year-item" mdw-year="1992">1992</div>
        <div class="mdw-date-picker--year-item" mdw-year="1993">1993</div>
        <div class="mdw-date-picker--year-item" mdw-year="1994">1994</div>
        <div class="mdw-date-picker--year-item" mdw-year="1995">1995</div>
        <div class="mdw-date-picker--year-item" mdw-year="1996">1996</div>
        <div class="mdw-date-picker--year-item" mdw-year="1997">1997</div>
        <div class="mdw-date-picker--year-item" mdw-year="1998">1998</div>
        <div class="mdw-date-picker--year-item" mdw-year="1999">1999</div>
        <div class="mdw-date-picker--year-item" mdw-year="2000">2000</div>
        <div class="mdw-date-picker--year-item" mdw-year="2001">2001</div>
        <div class="mdw-date-picker--year-item" mdw-year="2002">2002</div>
        <div class="mdw-date-picker--year-item" mdw-year="2003">2003</div>
        <div class="mdw-date-picker--year-item" mdw-year="2004">2004</div>
        <div class="mdw-date-picker--year-item" mdw-year="2005">2005</div>
        <div class="mdw-date-picker--year-item" mdw-year="2006">2006</div>
        <div class="mdw-date-picker--year-item" mdw-year="2007">2007</div>
        <div class="mdw-date-picker--year-item" mdw-year="2008">2008</div>
        <div class="mdw-date-picker--year-item" mdw-year="2009">2009</div>
        <div class="mdw-date-picker--year-item" mdw-year="2010">2010</div>
        <div class="mdw-date-picker--year-item" mdw-year="2011">2011</div>
        <div class="mdw-date-picker--year-item" mdw-year="2012">2012</div>
        <div class="mdw-date-picker--year-item" mdw-year="2013">2013</div>
        <div class="mdw-date-picker--year-item" mdw-year="2014">2014</div>
        <div class="mdw-date-picker--year-item" mdw-year="2015">2015</div>
        <div class="mdw-date-picker--year-item" mdw-year="2016">2016</div>
        <div class="mdw-date-picker--year-item" mdw-year="2017">2017</div>
        <div class="mdw-date-picker--year-item" mdw-year="2018">2018</div>
        <div class="mdw-date-picker--year-item" mdw-year="2019">2019</div>
        <div class="mdw-date-picker--year-item" mdw-year="2020">2020</div>
        <div class="mdw-date-picker--year-item" mdw-year="2021">2021</div>
        <div class="mdw-date-picker--year-item" mdw-year="2022">2022</div>
        <div class="mdw-date-picker--year-item" mdw-year="2023">2023</div>
        <div class="mdw-date-picker--year-item" mdw-year="2024">2024</div>
        <div class="mdw-date-picker--year-item" mdw-year="2025">2025</div>
        <div class="mdw-date-picker--year-item" mdw-year="2026">2026</div>
        <div class="mdw-date-picker--year-item" mdw-year="2027">2027</div>
        <div class="mdw-date-picker--year-item" mdw-year="2028">2028</div>
        <div class="mdw-date-picker--year-item" mdw-year="2029">2029</div>
        <div class="mdw-date-picker--year-item" mdw-year="2030">2030</div>
        <div class="mdw-date-picker--year-item" mdw-year="2031">2031</div>
        <div class="mdw-date-picker--year-item" mdw-year="2032">2032</div>
        <div class="mdw-date-picker--year-item" mdw-year="2033">2033</div>
        <div class="mdw-date-picker--year-item" mdw-year="2034">2034</div>
        <div class="mdw-date-picker--year-item" mdw-year="2035">2035</div>
        <div class="mdw-date-picker--year-item" mdw-year="2036">2036</div>
        <div class="mdw-date-picker--year-item" mdw-year="2037">2037</div>
        <div class="mdw-date-picker--year-item" mdw-year="2038">2038</div>
        <div class="mdw-date-picker--year-item" mdw-year="2039">2039</div>
        <div class="mdw-date-picker--year-item" mdw-year="2040">2040</div>
        <div class="mdw-date-picker--year-item" mdw-year="2041">2041</div>
        <div class="mdw-date-picker--year-item" mdw-year="2042">2042</div>
        <div class="mdw-date-picker--year-item" mdw-year="2043">2043</div>
        <div class="mdw-date-picker--year-item" mdw-year="2044">2044</div>
        <div class="mdw-date-picker--year-item" mdw-year="2045">2045</div>
        <div class="mdw-date-picker--year-item" mdw-year="2046">2046</div>
        <div class="mdw-date-picker--year-item" mdw-year="2047">2047</div>
        <div class="mdw-date-picker--year-item" mdw-year="2048">2048</div>
        <div class="mdw-date-picker--year-item" mdw-year="2049">2049</div>
        <div class="mdw-date-picker--year-item" mdw-year="2050">2050</div>
        <div class="mdw-date-picker--year-item" mdw-year="2051">2051</div>
        <div class="mdw-date-picker--year-item" mdw-year="2052">2052</div>
        <div class="mdw-date-picker--year-item" mdw-year="2053">2053</div>
        <div class="mdw-date-picker--year-item" mdw-year="2054">2054</div>
        <div class="mdw-date-picker--year-item" mdw-year="2055">2055</div>
        <div class="mdw-date-picker--year-item" mdw-year="2056">2056</div>
        <div class="mdw-date-picker--year-item" mdw-year="2057">2057</div>
        <div class="mdw-date-picker--year-item" mdw-year="2058">2058</div>
        <div class="mdw-date-picker--year-item" mdw-year="2059">2059</div>
        <div class="mdw-date-picker--year-item" mdw-year="2060">2060</div>
        <div class="mdw-date-picker--year-item" mdw-year="2061">2061</div>
        <div class="mdw-date-picker--year-item" mdw-year="2062">2062</div>
        <div class="mdw-date-picker--year-item" mdw-year="2063">2063</div>
        <div class="mdw-date-picker--year-item" mdw-year="2064">2064</div>
        <div class="mdw-date-picker--year-item" mdw-year="2065">2065</div>
        <div class="mdw-date-picker--year-item" mdw-year="2066">2066</div>
        <div class="mdw-date-picker--year-item" mdw-year="2067">2067</div>
        <div class="mdw-date-picker--year-item" mdw-year="2068">2068</div>
        <div class="mdw-date-picker--year-item" mdw-year="2069">2069</div>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwdatepickeryear);
  
  
  
  
  var mdwexpandercontent = document.createElement('template');
  mdwexpandercontent.setAttribute('id','mdw-expander-content--template');
  mdwexpandercontent.innerHTML= `
    <style>
      
    </style>
    <render-block>
      <slot></slot>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwexpandercontent);
  
  var mdwfab = document.createElement('template');
  mdwfab.setAttribute('id','mdw-fab--template');
  mdwfab.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-fab-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwfab);
  var mdwicon = document.createElement('template');
  mdwicon.setAttribute('id','mdw-icon--template');
  mdwicon.innerHTML= `
    <style>
      
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
          
    </style>
    <render-block>
      <slot></slot>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwicon);
  var mdwlinearprogress = document.createElement('template');
  mdwlinearprogress.setAttribute('id','mdw-linear-progress--template');
  mdwlinearprogress.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      <div class="mdw-bar"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwlinearprogress);
  
  
  
  
  
  
  var mdwselect = document.createElement('template');
  mdwselect.setAttribute('id','mdw-select--template');
  mdwselect.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      
            <i class="mdw-select__icon"></i>
            
              <div class="mdw-select__selected-text"></div>
            
            <label>undefined</label>
            <div class="mdw-line-ripple"></div>
            
          
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwselect);
  var mdwsheetheader = document.createElement('template');
  mdwsheetheader.setAttribute('id','mdw-sheet-header--template');
  mdwsheetheader.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      
            <div class="mdw-sheet-header-drag-icon"></div>
      
            <div class="mdw-sheet-header-fullscreen">
              
                <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
                  <mdw-icon>keyboard_arrow_down</mdw-icon>
                </mdw-button>
              
              
            </div>
      
            <div class="mdw-sheet-header-container">
              undefined
            </div>
          
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwsheetheader);
  
  var mdwslider = document.createElement('template');
  mdwslider.setAttribute('id','mdw-slider--template');
  mdwslider.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      
            <div class="mdw-slider__track-container">
              <div class="mdw-slider__track"></div>
      
              <div class="mdw-slider__notch-container">
                <div class="mdw-slider__notch-pre-container">
                  
                </div>
      
                <div class="mdw-slider__notch-post-container">
                  
                </div>
              </div>
            </div>
            <div class="mdw-slider__thumb-container">
              <div class="mdw-slider__thumb"></div>
              <div class="mdw-slider__thumb-hover"></div>
            </div>
          
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwslider);
  
  var mdwswitch = document.createElement('template');
  mdwswitch.setAttribute('id','mdw-switch--template');
  mdwswitch.innerHTML= `
    <style>
      
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
      
    </style>
    <render-block>
      <div class="mdw-track"></div>
      <div class="mdw-thumb-underlay">
        <div class="mdw-thumb">
          <input type="checkbox" role="switch">
          <div class="mdw-ripple mdw-switch-ripple"></div>
        </div>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwswitch);
  var mdwtabbody = document.createElement('template');
  mdwtabbody.setAttribute('id','mdw-tab-body--template');
  mdwtabbody.innerHTML= `
    <style>
      mdw-tab-body-content {
        height: 100%;
        overflow: auto;
      }
      
    </style>
    <render-block>
      <mdw-tab-body-content>
        <!-- slot is added dynamicly -->
      </mdw-tab-body-content>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtabbody);
  var mdwtabbutton = document.createElement('template');
  mdwtabbutton.setAttribute('id','mdw-tab-button--template');
  mdwtabbutton.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      <span class="text"><slot></slot></span>
      <span class="mdw-tab-button-indicator">
        <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>
      </span>
      <div class="mdw-ripple mdw-tab-button-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtabbutton);
  var mdwtabsbar = document.createElement('template');
  mdwtabsbar.setAttribute('id','mdw-tabs-bar--template');
  mdwtabsbar.innerHTML= `
    <style>
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
      
    </style>
    <render-block>
      <mdw-tabs-bar-scroller>
        <mdw-tabs-bar-scroller-area>
          <mdw-tabs-bar-scroller-content>
            <slot></slot>
          </mdw-tabs-bar-scroller-content>
        </mdw-tabs-bar-scroller-area>
      </mdw-tabs-bar-scroller>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtabsbar);
  
  
  var mdwtooltip = document.createElement('template');
  mdwtooltip.setAttribute('id','mdw-tooltip--template');
  mdwtooltip.innerHTML= `
    <style>
      
    </style>
    <render-block>
      <div class="tooltip">
        <slot></slot>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtooltip);
  
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-autocomplete', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-backdrop', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
  }

  get frontElement() {
    return this.querySelector('mdw-backdrop-front');
  }

  get backContentElement() {
    return this.querySelector('mdw-backdrop-back mdw-backdrop-content');
  }

  get backContenHeight() {
    const children = this.backContentElement.children;
    const lastChild = children[children.length - 1];
    const childBounds = lastChild.getBoundingClientRect();
    return this.backContentElement.getBoundingClientRect().y + childBounds.y + childBounds.height;
  }

  get expanded() {
    return this._expanded;
  }

  toggle() {
    if (this._expanded === true) this.contract();
    else this.expand();
  }

  expand() {
    this.frontElement.style.top = `${this.backContenHeight - 56}px`;
    this._expanded = true;
  }

  contract() {
    this.frontElement.style.top = '56px';
    this._expanded = false;
  }
});

});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-banner', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-bottom-navigation', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
  }

  connectedCallback() {
    [...this.querySelectorAll('mdw-button')].forEach(el => {
      el.classList.add('mdw-bottom-navigation');
    });
  }
});

});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-button', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return this.shadowRoot.querySelector('.mdw-spinner-container');
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
    return html`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>
    `;
  }

  get internalStylesFile() {
    return './internal.css'
  }
});

});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-card', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
    this.classList.add('mdw-elevation-1');
  }
});

});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-checkbox', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

     this._connected = true;
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
     if (!this._connected) return;
     this[name] = newValue;
   }

   get input() {
     return this.shadowRoot.querySelector('input');
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

   get internalStylesFile() {
     return './internal.css'
   }

   template() {
     return html`
       <input type="checkbox">
       <div class="mdw-background">
         <div class="mdw-checkmark"></div>
         <div class="mdw-mixedmark"></div>
       </div>
       <div class="mdw-ripple mdw-checkbox-ripple"></div>
     `;
   }
});

});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-circular-progress', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

  get internalStylesFile() {
    return './internal.css'
  }
});

});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--old', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this._currentView = 'month';
    this.panelId = `mdw-date-picker_${_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].uid()}`;
    this.displayDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.getAttribute('mdw-date') || _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today());

    this.bound_monthChange = this.monthChange.bind(this);
    this.bound_yearChange = this.yearChange.bind(this);
    this.bound_dayChange = this.dayChange.bind(this);
    this.bound_open = this.open.bind(this);
    this.bound_onCancel = this.onCancel.bind(this);
    this.bound_onOk = this.onOk.bind(this);
    this.bound_inputChange = this.inputChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onShowYearView = () => setTimeout(() => this.changeView('year'), 0);

    this._checkForTextField();
    this._buildPanel();
  }

  static get observedAttributes() {
    return ['mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-min-date':
        this.currentComponent.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        this.currentComponent.setAttribute('mdw-max-date', newValue);
        break;
    }
  }

  connectedCallback() {
    this._setupPanel();
    if (this.cancelButton) this.cancelButton.addEventListener('click', this.bound_onCancel);
    if (this.okButton) this.okButton.addEventListener('click', this.bound_onOk);
    this.changeView('month');
  }

  disconnectedCallback() {
    if (this._attachedInput) {
      this._attachedInput.removeEventListener('click', this.bound_open);
      this._attachedInput.removeEventListener('input', this.bound_inputChange);
    }

    this.panel.querySelector('.mdw-date-picker--body-year-view-button').removeEventListener('click', this.bound_yearClick);
    if (this.cancelButton) this.cancelButton.removeEventListener('click', this.bound_onCancel);
    if (this.okButton) this.okButton.removeEventListener('click', this.bound_onOk);
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.remove();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get viewContainer() {
    return this.panel && this.panel.querySelector('.mdw-date-picker--body-views');
  }

  get cancelButton() {
    return this.panel.querySelector('#cancel-button');
  }

  get okButton() {
    return this.panel.querySelector('#ok-button');
  }

  get yearComponent() {
    return this.viewContainer && this.viewContainer.querySelector('mdw-date-picker--view-year');
  }

  get monthComponent() {
    return this.viewContainer && this.viewContainer.querySelector('mdw-date-picker--view-month');
  }

  get currentComponent() {
    return this.monthComponent || this.yearComponent
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date') || '';
  }


  _checkForTextField() {
    if (this.parentNode.nodeName === 'MDW-TEXTFIELD') {
      this._attachedInput = this.parentNode.querySelector('input');
      // TODO add down arrow to open
      this._attachedInput.addEventListener('click', this.bound_open);
      this._attachedInput.addEventListener('input', this.bound_inputChange);
      this._attachedInput.classList.add('mdw-hide-date-prompt');

      if (this._attachedInput.hasAttribute('min')) this.setAttribute('mdw-min-date', this._attachedInput.getAttribute('min'));
      if (this._attachedInput.hasAttribute('max')) this.setAttribute('mdw-max-date', this._attachedInput.getAttribute('max'));
    }
  }

  updateDisplayDate(dateParts) {
    this.displayDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildFromParts(dateParts);
    this.updateDisplay();
  }

  updateDisplay() {
    // update views
    const monthEl = this.monthComponent;
    if (monthEl) monthEl.setAttribute('mdw-display-date', this.displayDate);
    const yearEl = this.yearComponent;
    if (yearEl) yearEl.setAttribute('mdw-year', this.displayDate.getFullYear);
  }

  setDate(preventInputUpdate = false) {
    this.selectedDate = this.displayDate;

    // update this components displays
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) this.panel.querySelector('.mdw-date-picker--header-date').innerHTML = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(this.selectedDate, 'ddd, MMM DD');

    // update views
    const monthEl = this.monthComponent;
    if (monthEl) monthEl.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._attachedInput) {
      this._attachedInput.value = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(this.selectedDate, 'YYYY-MM-dd');
    }
  }

  unsetDate(preventInputUpdate = false) {
    this.selectedDate = undefined;

    // update views
    const monthEl = this.monthComponent;
    if (monthEl) monthEl.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._attachedInput) {
      this._attachedInput.value = '';
    }
  }

  inputChange(event) {
    const value = event.target.value.split('-');
    const day = parseInt(value.pop());
    const month = parseInt(value.pop() - 1);
    const year = parseInt(value.pop());
    this.updateDisplayDate({
      year,
      month,
      day
    });
    this.setDate(true);
  }

  onCancel() {
    // revet date back
    if (this._openingDate) {
      this.updateDisplayDate({
        year: this._openingDate.getFullYear(),
        month: this._openingDate.getMonth(),
        day: this._openingDate.getDate()
      });
      this.setDate();

    // unset date
    } else {
      this.displayDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today();
      this.updateDisplay();
      this.unsetDate();
    }
    this.close();
  }

  onOk() {
    this.close();
  }

  changeView(value) {
    switch(value) {
      case 'year':
        this._currentView = 'year';
        this.attachYearView();
        break;
      case 'month':
        this._currentView = 'month';
        this.attachMonthView();
        break;
    }
  }

  open() {
    if (this.panel._isOpen) return;
    this._openingDate = this.selectedDate;

    this.displayDate = this.selectedDate || _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today();
    this.updateDisplay();

    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) this._backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].addBackdrop(this.panel);
    _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].lockPageScroll();
  }

  close() {
    this.panel.close();
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].unlockPageScroll();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  yearChange({ detail }) {
    this.updateDisplayDate(detail);

    // prevent click from falling through when element is removed and casing the panel to close
    setTimeout(() => {
      this.changeView('month');
    }, 0);
  }

  monthChange({ detail }) {
    this.updateDisplayDate(detail);
  }

  dayChange({ detail }) {
    this.updateDisplayDate(detail);
    this.setDate();
    if (!_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) this.close();
  }

  _buildPanel() {
    const layout = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile ? 'center center' : 'inner-left inner-top';
    const panelHTML = `
    <mdw-panel id="${this.panelId}" mdw-position="${layout}" mdw-flex-position="center center" class="mdw-date-picker-panel">
      <div class="mdw-date-picker--container ${_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile ? 'mdw-mobile' : ''}">
        ${!_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile ? '' : `
          <div class="mdw-date-picker--header">
            <div class="mdw-date-picker--header-title">Select date</div>

            <div mdw-row mdw-flex-position="center space-between">
              <div class="mdw-date-picker--header-date">${this.selectedDate ? _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(this.selectedDate, 'ddd, MMM DD') : 'Select date'}</div>
              <mdw-icon>edit</mdw-icon>
            </div>
          </div>
        `}

        <div class="mdw-date-picker--body">
          <!-- year, month, day, schedule? -->
          <div mdw-column class="mdw-date-picker--body-views">
            ${
              this._currentView === 'month'
              ? `<mdw-date-picker--view-month
                  mdw-display-date="${this.displayDate}"
                  mdw-selected-date="${this.selectedDate}"
                  mdw-min-date="${this.minDate}"
                  mdw-max-date="${this.maxDate}"
                  ></mdw-date-picker--view-month>`
              : `<mdw-date-picker--view-year
                  mdw-year="${this.displayDate.getFullYear()}"
                  mdw-min-date="${this.minDate}"
                  mdw-max-date="${this.maxDate}"
                  ></mdw-date-picker--view-year>`
            }
          </div>

          ${!_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile ? '' : `
            <div mdw-row mdw-flex-position="center right" style="padding: 8px;">
              <mdw-button id="cancel-button" class="mdw-primary">cancel</mdw-button>
              <mdw-button id="ok-button" class="mdw-primary">ok</mdw-button>
            </div>
          `}
        </div>
      </div>
    </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    this._setupPanel();
  }

  _setupPanel() {
    const panelEl = this.panel;
    if (!panelEl.isReady) return;

    panelEl.hoistToBody();
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) {
      panelEl.setClickOutsideClose(false);
      panelEl.fixPosition();
      panelEl.setTarget('body');
    } else {
      panelEl.setClickOutsideClose(true);
      this.panel.setTarget(this.getAttribute('mdw-target') || this.parentNode);

      if (this.panel._target.nodeName === 'MDW-TEXTFIELD' || this.panel._target.nodeName === 'input') {
        this.panel.setAttribute('mdw-position', 'inner-left bottom');
        if (this.panel._target.nodeName === 'MDW-TEXTFIELD') this.panel.ignoreElementOnClickToClose(this.panel._target.querySelector('input'));
      }
    }
  }

  attachYearView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-year mdw-year="${this.displayDate.getFullYear()}"></mdw-date-picker--view-year>`;
    const yearEl = this.yearComponent;
    yearEl.addEventListener('MDWDatePicker:yearChange', this.bound_yearChange);

    const monthEl = this.monthComponent;
    if (monthEl) {
      monthEl.removeEventListener('MDWDatePicker:dayChange', this.bound_dayChange);
      monthEl.removeEventListener('MDWDatePicker:monthChange', this.bound_monthChange);
      monthEl.removeEventListener('MDWDatePicker:showYearView', this.bound_onShowYearView);
    }
  }

  attachMonthView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-month
                                      mdw-display-date="${this.displayDate}"
                                      mdw-selected-date="${this.selectedDate}"
                                      mdw-min-date="${this.minDate}"
                                      mdw-max-date="${this.maxDate}"
                                      ></mdw-date-picker--view-month>`;
    const monthEl = this.monthComponent;
    monthEl.addEventListener('MDWDatePicker:dayChange', this.bound_dayChange);
    monthEl.addEventListener('MDWDatePicker:monthChange', this.bound_monthChange);
    monthEl.addEventListener('MDWDatePicker:showYearView', this.bound_onShowYearView);

    const yearEl = this.yearComponent;
    if (yearEl) yearEl.removeEventListener('MDWDatePicker:yearChange', this.bound_yearChange);
  }
});

});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




// TODO update change (month, day year) events to be updateDate and selectDate

window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.bound_onInputChange = this.onInputChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onYearChange = this.onYearChange.bind(this);
    this.bound_onMonthChange = this.onMonthChange.bind(this);
    this.bound_onDayChange = this.onDayChange.bind(this);
    this.bound_open = this.open.bind(this);
    this.bound_close = this.close.bind(this);

    this.displayDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.getAttribute('mdw-date') || _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today());
    this.selectedDate = this.getAttribute('mdw-selected-date') || '';
    this.panelId = `mdw-date-picker_${_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].uid()}`;

    this._checkForTextField();
    this._buildPanel();
  }

  connectedCallback() {
    // this is need to ensure removeEvents() is called on connect
    super.connectedCallback();

    this._setupPanel();
  }

  disconnectedCallback() {
    // this is need to ensure removeEvents() is called on disconnect
    super.disconnectedCallback();

    if (this._attachedInput) {
      this._attachedInput.removeEventListener('click', this.bound_open);
      this._attachedInput.removeEventListener('input', this.bound_onInputChange);
    }

    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.remove();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  addEvents() {
    this.pickerElement.addEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    this.pickerElement.addEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.addEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    this.pickerElement.addEventListener('MDWDatePicker:close', this.bound_close);
  }

  removeEvents() {
    this.pickerElement.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    this.pickerElement.removeEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.removeEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    this.pickerElement.removeEventListener('MDWDatePicker:close', this.bound_close);
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get pickerElement() {
    if (!this.panel) return null;

    const desktopElement = this.panel.querySelector('mdw-date-picker--desktop');
    if (desktopElement) return desktopElement;

    // mobile
    const mobileElement = this.panel.querySelector('mdw-date-picker--mobile');
    if (mobileElement) return mobileElement;
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date') || '';
  }

  open() {
    if (this.panel._isOpen) return;

    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) this._backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].addBackdrop(this.panel);
    _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].lockPageScroll();
  }

  close() {
    this.panel.close();
  }

  updateDisplayDate({ year, month, day }) {
    this.displayDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildFromParts({ year, month, day });
    this.pickerElement.setAttribute('mdw-display-date', this.displayDate);
  }

  setDate(preventInputUpdate = false) {
    this.selectedDate = this.displayDate;
    this.pickerElement.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._attachedInput) {
      this._attachedInput.value = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(this.selectedDate, 'YYYY-MM-dd');
    }
  }

  onInputChange(event) {
    const date = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(event.target.value);
    if (!_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].isValid(date)) return;

    this.updateDisplayDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(date));
    this.setDate(true);
  }

  onYearChange({ detail }) {
    const dateParts = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate), { set: { year: detail.year} }));
    this.updateDisplayDate(dateParts);
  }

  onMonthChange({ detail }) {
    this.updateDisplayDate(detail);
  }

  onDayChange({ detail }) {
    this.updateDisplayDate(detail);
    this.setDate();
    if (!_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) this.close();
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].unlockPageScroll();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  _setupPanel() {
    const panelEl = this.panel;
    if (!panelEl.isReady) return;

    panelEl.hoistToBody();
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) {
      panelEl.setClickOutsideClose(false);
      panelEl.fixPosition();
      panelEl.setTarget('body');
    } else {
      panelEl.setClickOutsideClose(true);
      this.panel.setTarget(this.getAttribute('mdw-target') || this.parentNode);

      if (this.panel._target.nodeName === 'MDW-TEXTFIELD' || this.panel._target.nodeName === 'input') {
        this.panel.setAttribute('mdw-position', 'inner-left bottom');
        if (this.panel._target.nodeName === 'MDW-TEXTFIELD') this.panel.ignoreElementOnClickToClose(this.panel._target.querySelector('input'));
      }
    }
  }

  _checkForTextField() {
    if (this.parentNode.nodeName === 'MDW-TEXTFIELD') {
      this._attachedInput = this.parentNode.querySelector('input');
      // TODO add down arrow to open
      this._attachedInput.addEventListener('click', this.bound_open);
      this._attachedInput.addEventListener('input', this.bound_onInputChange);
      this._attachedInput.classList.add('mdw-hide-date-prompt');

      if (this._attachedInput.hasAttribute('min')) this.setAttribute('mdw-min-date', this._attachedInput.getAttribute('min'));
      if (this._attachedInput.hasAttribute('max')) this.setAttribute('mdw-max-date', this._attachedInput.getAttribute('max'));
    }
  }

  _buildPanel() {
    const layout = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile ? 'center center' : 'inner-left inner-top';
    const template = _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <mdw-panel id="${this.panelId}" mdw-position="${layout}" class="mdw-date-picker--panel">
        ${!_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile ? this._desktopTemplate() : this._mobileTemplate()}
      </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
  }

  _desktopTemplate() {
    return /*html*/`
      <mdw-date-picker--desktop
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--desktop>
    `;
  }

  _mobileTemplate() {
    return /*html*/`
      <mdw-date-picker--mobile
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--mobile>
    `;
  }
});

});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



// TODO update change (month, day year) events to be updateDate and selectDate

/* TODO
 *  add year view cahnge animation
 *  add selected bg animation (circle moving from day to day)
 *  look into what should happen on disabled date? icon, cursor, color
 */
window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--desktop', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);
    this.bound_toggleYearView = this.toggleYearView.bind(this);
    this.bound_onYearChange = this.onYearChange.bind(this);

    this.today = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today();
    this.dayOfWeekNames = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDayOfWeekNames('narrow');
    this.yearList = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].defaultYearRange();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.navButtons.addEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
    this.navButtons.addEventListener('MDWDatePicker:prevMonth', this.bound_prevMonth);
    this.yearButton.addEventListener('click', this.bound_toggleYearView);
  }

  removeEvents() {
    this.navButtons.removeEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
    this.navButtons.removeEventListener('MDWDatePicker:prevMonth', this.bound_prevMonth);
    this.yearButton.removeEventListener('click', this.bound_toggleYearView);
    this.yearView && this.yearView.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.updateDisplayDate(newValue);
        break;

      case 'mdw-selected-date':
        this.updateSelectedDate(newValue);
        break;

      case 'mdw-min-date':
        this.activeMonth.setAttribute('mdw-min-date', newValue);
        this.nonActiveMonth.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        this.activeMonth.setAttribute('mdw-max-date', newValue);
        this.nonActiveMonth.setAttribute('mdw-max-date', newValue);
        break;
    }
  }

  updateDisplayDate(dateString) {
    switch(this._currentView) {
      case 'month':
        this.activeMonth.setAttribute('mdw-display-date', dateString);
        break;

      case 'year':
        this.yearView.setAttribute('mdw-display-date', dateString);
        break;
    }

    // update year button
    this.yearButton.setAttribute('mdw-display-date', dateString);
  }

  updateSelectedDate(dateString) {
    switch(this._currentView) {
      case 'month':
        this.activeMonth.setAttribute('mdw-selected-date', dateString);
        break;

      case 'year':
        this.yearView.setAttribute('mdw-selected-date', dateString);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  get activeMonth() {
    return this.shadowRoot.querySelector('mdw-date-picker--month-days.mdw-active-month');
  }

  get nonActiveMonth() {
    return this.shadowRoot.querySelector('mdw-date-picker--month-days:not(.mdw-active-month)');
  }

  get yearView() {
    return this.shadowRoot.querySelector('mdw-date-picker--year');
  }

  get navButtons() {
    return this.shadowRoot.querySelector('mdw-date-picker--month-navigation-buttons');
  }

  get yearButton() {
    return this.shadowRoot.querySelector('mdw-date-picker--year-view-button');
  }

  get viewContainer() {
    return this.shadowRoot.querySelector('.mdw-date-picker--views');
  }

  onYearChange() {
    setTimeout(() => {
      this.showMonthView();
    }, 0);
  }

  toggleYearView() {
    switch(this._currentView) {
      case 'month':
        this.showYearView();
        break;

      case 'year':
        this.showMonthView();
        break;
    }
  }

  showYearView() {
    this.yearButton.classList.add('mdw-open');
    this.viewContainer.innerHTML = this._yearTemplate();
    this.yearView.addEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
  }

  showMonthView() {
    this.yearButton.classList.remove('mdw-open');
    this.yearView && this.yearView.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    this.viewContainer.innerHTML = this._monthTemplate();
  }

  nextMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--month-days.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--month-days:not(.mdw-active-month)');
    const nextDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(active.displayDate), { add: { month: 1 } });

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(16px)';

    notActive.setAttribute('mdw-display-date', nextDate);
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');
    notActive.style.display = '';

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(-16px)';
      active.style.opacity = '0';

      notActive.style.transition = '';
      notActive.style[MDWUtils.transformPropertyName] = '';
      notActive.style.opacity = '1';

      active.addEventListener(MDWUtils.transitionEventName, function handler() {
        active.style.display = 'none';
        active.removeEventListener(MDWUtils.transitionEventName, handler);
      });
    }, 42);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      composed: true,
      detail: _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(nextDate)
    }));
  }

  prevMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--month-days.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--month-days:not(.mdw-active-month)');
    const prevDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(active.displayDate), { add: { month: -1 } });

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(-16px)';

    notActive.setAttribute('mdw-display-date', prevDate);
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');
    notActive.style.display = '';

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(16px)';
      active.style.opacity = '0';

      notActive.style.transition = '';
      notActive.style[MDWUtils.transformPropertyName] = '';
      notActive.style.opacity = '1';

      active.addEventListener(MDWUtils.transitionEventName, function handler() {
        active.style.display = 'none';
        active.removeEventListener(MDWUtils.transitionEventName, handler);
      });
    }, 42);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      composed: true,
      detail: _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(prevDate)
    }));
  }

  template() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div class="mdw-date-picker--controls-container">
        <mdw-date-picker--year-view-button mdw-display-date="${this.displayDate}"></mdw-date-picker--year-view-button>
        <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
      </div>

      <div class="mdw-date-picker--views">
        ${this._monthTemplate()}
      </div>
    `;
  }

  _monthTemplate() {
    this._currentView = 'month';

    const navButton = this.navButtons;
    if(navButton) navButton.classList.remove('hide');

    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div class="mdw-date-picker--month-day-header">
        ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <div class="mdw-date-picker--months-container">
        <mdw-date-picker--month-days class="mdw-active-month"
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
          ></mdw-date-picker--month-days>
        <mdw-date-picker--month-days
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
          ></mdw-date-picker--month-days>
      </div>
    `;
  }

  _yearTemplate() {
    this._currentView = 'year';

    const navButton = this.navButtons;
    if(navButton) navButton.classList.add('hide');

    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <mdw-date-picker--year
        mdw-display-date="${this.displayDate}"
        mdw-selected-date="${this.selectedDate}"
        mdw-min-date="${this.minDate}"
        mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--year>
    `;
  }

  styles() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["css"]`
      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .mdw-date-picker--month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        padding: 8px 16px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }

      .mdw-date-picker--months-container {
        overflow: hidden;
        position: relative;
        height: 184px;
        width: 280px;
      }

      mdw-date-picker--month-days {
        position: absolute;
        transform: translateX(0);
        opacity: 0;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .mdw-active-month {
        opacity: 1;
      }
    `;
  }
});

});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




// TODO update change (month, day year) events to be updateDate and selectDate
// TODO year view

window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--mobile', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);
    this.bound_onCancel = this.onCancel.bind(this);
    this.bound_onOk = this.onOk.bind(this);

    this.dayOfWeekNames = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDayOfWeekNames('narrow');
    this._openingDate = this.selectedDate;

    this.cloneTemplate(true);
  }

  addEvents() {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--month-navigation-buttons')].forEach(el => {
      el.addEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
      el.addEventListener('MDWDatePicker:prevMonth', this.bound_prevMonth);
    });

    this.cancelButton.addEventListener('click', this.bound_onCancel);
    this.okButton.addEventListener('click', this.bound_onOk);
  }

  removeEvents() {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--month-navigation-buttons')].forEach(el => {
      el.removeEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
      el.removeEventListener('MDWDatePicker:prevMonth', this.bound_prevMonth);
    });

    this.cancelButton.addEventListener('click', this.bound_onCancel);
    this.okButton.addEventListener('click', this.bound_onOk);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    const activeMonth = this.activeMonth;
    switch(name) {
      case 'mdw-display-date':
        this.render();
        break;

      case 'mdw-selected-date':
        const selectedDateFormatted = newValue ? _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(newValue), 'ddd, MMM DD') : 'Select date';
        this.headerDate.innerHTML = selectedDateFormatted;
        if (activeMonth) activeMonth.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-min-date':
        if (activeMonth) activeMonth.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        if (activeMonth) activeMonth.setAttribute('mdw-max-date', newValue);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date') || '';
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date') || '';
  }

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  get monthsScroller() {
    return this.shadowRoot.querySelector('.mdw-date-picker--scroll-container');
  }

  get headerDate() {
    return this.shadowRoot.querySelector('.header-date');
  }

  get activeMonth() {
    return this.shadowRoot.querySelector('.mdw-active-month');
  }

  get cancelButton() {
    return this.shadowRoot.querySelector('#cancel-button');
  }

  get okButton() {
    return this.shadowRoot.querySelector('#ok-button');
  }

  onCancel() {
    // revet date back
    if (this._openingDate) {
      this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
        composed: true,
        detail: _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this._openingDate))
      }));
    } else {
      const today = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today();
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(today)
      }));
    }
    this.dispatchEvent(new CustomEvent('MDWDatePicker:close', {
      composed: true
    }));
  }

  onOk() {
    this._openingDate = this.selectedDate;
    this.dispatchEvent(new CustomEvent('MDWDatePicker:close', {
      composed: true
    }));
  }

  nextMonth() {
    if (this._isMoving) return;
    this._isMoving = true;

    this.monthsScroller.style.transition = '';
    this.monthsScroller.style[_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transformPropertyName] = `translateX(-200%)`;
    this.onChangeComplete(() => {
      const { month, year, day } = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate), { add: { month: 1 } }));
      // this event will cause a render
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: {
          year,
          month,
          day
        }
      }));
      this._isMoving = false;
    });
  }

  prevMonth() {
    if (this._isMoving) return;
    this._isMoving = true;

    this.monthsScroller.style.transition = '';
    this.monthsScroller.style[_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transformPropertyName] = `translateX(0)`;
    this.onChangeComplete(() => {
      const { month, year, day } = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate), { add: { month: -1 } }));
      // this event will cause a render
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: {
          year,
          month,
          day
        }
      }));
      this._isMoving = false;
    });
  }

  onChangeComplete(callback) {
    const monthsScroller = this.monthsScroller;
    monthsScroller.addEventListener(_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transitionEventName, function handler() {
      monthsScroller.removeEventListener(_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transitionEventName, handler);
      callback();
    });
  }

  template() {
    const displayDateObj = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate || _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today());
    const prevDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(displayDateObj, { add: { month: -1 } });
    const postDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(displayDateObj, { add: { month: 1 } });
    const dates = [prevDate, displayDateObj, postDate];
    const selectedDate = this.selectedDate;
    const selectedDateFormatted = selectedDate ? _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(selectedDate), 'ddd, MMM DD') : 'Select date';
    return /*html*/`
      <div class="header">
        <div class="header-title">Select date</div>

        <div class="header-date-edit">
          <div class="header-date">${selectedDateFormatted}</div>
          <mdw-icon>edit</mdw-icon>
        </div>
      </div>

      <div class="mdw-date-picker--views">
        <div class="mdw-date-picker--scroll-container" style="${_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].transformPropertyName}: translateX(-100%); transition: none;">
          ${dates.map((date, i) => /*html*/`
            <div class="single-month">
              <div class="mdw-date-picker--controls-container">
                <mdw-date-picker--year-view-button mdw-display-date="${date}"></mdw-date-picker--year-view-button>
                <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
              </div>

              <div class="mdw-date-picker--month-day-header">
                ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
              </div>

              <mdw-date-picker--month-days class="${i === 1 ? 'mdw-active-month' : ''}"
                mdw-fill-month
                mdw-display-date="${date}"
                mdw-selected-date="${this.selectedDate}"
                mdw-min-date="${this.minDate}"
                mdw-max-date="${this.maxDate}"
                ></mdw-date-picker--month-days>
            </div>
          `).join('\n')}
        </div>
      </div>

      <div class="bottom-controls">
        <mdw-button id="cancel-button" class="mdw-primary">cancel</mdw-button>
        <mdw-button id="ok-button" class="mdw-primary">ok</mdw-button>
      </div>
    `;
  }

  styles() {
    return /*css*/`
      :host {
        width: 328px;
      }

      .header {
        width: calc(100% - 48px);
        padding: 28px 24px 20px 24px;
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }

      .header-title {
        font-size: 14px;
        padding-bottom: 32px;
      }

      .header-date {
        font-size: 36px;
      }

      .header-date-edit {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .mdw-date-picker--month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        padding: 8px 16px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }

      .mdw-date-picker--views {
        display: flex;
        overflow: hidden;
        width: 100%;
      }

      .mdw-date-picker--scroll-container {
        display: flex;
        width: 100%;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 4px;
        padding-top: 4px;
      }

      .single-month {
        width: 100%;
        flex-shrink: 0;
      }

      .bottom-controls {
        flex-direction: row;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px;
      }
    `;
  }
});

});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




// TODO update change (month, day year) events to be updateDate and selectDate

window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--month-days', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile) this.classList.add('mdw-mobile');
    this.bound_onClick = this.onClick.bind(this);
    this.today = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today();
    this._setupDate();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  removeEvents() {
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-min-date':
      case 'mdw-max-date':
      case 'mdw-display-date':
        this._setupDate();
        this.render();
        break;

      case 'mdw-selected-date':
        this._selectDate(newValue);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  get shouldFillMonth() {
    return this.hasAttribute('mdw-fill-month');
  }

  _setupDate() {
    this.monthDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate);
    this.monthDays = this.monthDate ? _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getMonthDayArray(this.monthDate, {
      fillInMonth: this.shouldFillMonth,
      minDate: _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.minDate),
      maxDate: _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.maxDate)
    }) : [];
  }

  _selectDate(dateString) {
    const date = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(dateString);
    // TODO do i need to deselect on ivalid dates?
    if (!_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].isValid(date)) return;

    this.deselect();
    // date does not match month and year
    if (_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getYear(date) !== _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getYear(this.monthDate) || _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getMonth(date) !== _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getMonth(this.monthDate)) return;

    const selectedElement = this.shadowRoot.querySelector(`[mdw-date="${_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(date, 'YYYY-MM-dd')}"]`);
    if (selectedElement) selectedElement.classList.add('mdw-selected');
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  onClick(event) {
    if (!event.target.classList.contains('mdw-date-picker--day') || !event.target.classList.contains('mdw-interactable') || event.target.classList.contains('mdw-out-of-range')) return;

    this.deselect();
    const { year, month, day } = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(event.target.getAttribute('mdw-date')));
    this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
      composed: true,
      detail: { year, month, day }
    }));
  }

  template() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div class="container">
        ${this.monthDays.map(week => _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
          ${week.map(({ display, date, currentMonth, interactable, beforeMinDate, afterMaxDate, isToday }) => {
            let classes = 'mdw-date-picker--day';
            if (beforeMinDate) classes += ' mdw-before-min-date';
            if (afterMaxDate) classes += ' mdw-after-max-date';
            if (interactable) classes += ' mdw-interactable';
            if (beforeMinDate || afterMaxDate) classes += ' mdw-out-of-range';
            if (isToday && display !== '') classes += ' mdw-today';
            if (!currentMonth) classes += ' mdw-next-month';

            return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`<div class="${classes}" mdw-date="${_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(date, 'YYYY-MM-dd')}">${display}</div>`;
          }).join('\n')}
        `).join('')}
      </div>
    `;
  }

  styles() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["css"]`
      :host {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        pointer-events: none;
      }

      :host(.mdw-active-month) {
        pointer-events: auto;
      }

      .container {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 28px);
        grid-column-gap: 4px;
        grid-row-gap: 0px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
      }

      :host(.mdw-mobile) .container {
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(6, 36px);
        grid-column-gap: 4px;
        padding: 0 12px;
      }

      .mdw-date-picker--day {
        font-size: 13px;
        color: var(--mdw-theme-text--heading);
        user-select: none;
        box-sizing: border-box;
        cursor: pointer;
        pointer-events: none;
        position: relative;
        text-align: center;
        padding: 6px;
      }

      .mdw-date-picker--day::before {
        content: "";
        width: 28px;
        height: 28px;
        position: absolute;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
        border-radius: 50%;
        z-index: -1;
      }

      .mdw-date-picker--day.mdw-interactable {
        cursor: pointer;
        pointer-events: auto;
      }

      .mdw-date-picker--day.mdw-out-of-range {
        color: rgb(140,120,120);
        pointer-events: none;
        cursor: auto;
      }

      .mdw-date-picker--day.mdw-next-month {
        color: rgb(140,140,140);
      }

      .mdw-date-picker--day.mdw-next-month.mdw-out-of-range {
        color: rgb(140,120,120);
      }

      .mdw-date-picker--day.mdw-selected {
        color: var(--mdw-theme-text--on-primary);
      }

      .mdw-date-picker--day.mdw-selected::before {
        background-color: var(--mdw-theme-primary);
      }

      .mdw-date-picker--day.mdw-today::before {
        border: 1px solid var(--mdw-theme-foreground);
      }
    `;
  }
});

});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--month-navigation-buttons', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.bound_dispatchLeft = this.dispatchLeft.bind(this);
    this.bound_dispatchRight = this.dispatchRight.bind(this);

    this.cloneTemplate();
  }

  addEvents() {
    this.leftButton.addEventListener('click', this.bound_dispatchLeft);
    this.rightButton.addEventListener('click', this.bound_dispatchRight);
  }

  removeEvents() {
    this.leftButton.removeEventListener('click', this.bound_dispatchLeft);
    this.rightButton.removeEventListener('click', this.bound_dispatchRight);
  }

  get leftButton() {
    return this.shadowRoot.querySelector('.left');
  }

  get rightButton() {
    return this.shadowRoot.querySelector('.right');
  }

  dispatchLeft() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:prevMonth', {
      composed: true
    }));
  }

  dispatchRight() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:nextMonth', {
      composed: true
    }));
  }

  template() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <mdw-button class="mdw-icon left">
        <mdw-icon>keyboard_arrow_left</mdw-icon>
      </mdw-button>

      <mdw-button class="mdw-icon right">
        <mdw-icon>keyboard_arrow_right</mdw-icon>
      </mdw-button>
    `;
  }

  styles() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["css"]`
      :host {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
        height: 48px;
      }

      mdw-button {
        color: var(--mdw-theme-text--body);
      }

      :host(.hide) mdw-button {
        display: none;
      }
    `;
  }
});

});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--view-month', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.cloneTemplate(true);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.monthElement.setAttribute('mdw-display-date', newValue);
        break;

      case 'mdw-selected-date':
        this.monthElement.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-min-date':
        this.monthElement.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        this.monthElement.setAttribute('mdw-max-date', newValue);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date') || '';
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date') || '';
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date') || '';
  }

  get monthElement() {
    return this.shadowRoot.querySelector('[mdw-month-view]');
  }

  template() {
    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isMobile)return `<mdw-date-picker--view-month--mobile
                                    mdw-month-view
                                    mdw-display-date="${this.displayDate}"
                                    mdw-display-date="${this.selectedDate}"
                                    mdw-min-date="${this.minDate}"
                                    mdw-max-date="${this.maxDate}"
                                    ></mdw-date-picker--view-month--mobile>`;

    return `<mdw-date-picker--view-month--desktop
              mdw-month-view
              mdw-display-date="${this.displayDate}"
              mdw-display-date="${this.selectedDate}"
              mdw-min-date="${this.minDate}"
              mdw-max-date="${this.maxDate}"
              ></mdw-date-picker--view-month--desktop>`;
  }
});

});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--year-view-button', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
    this.dateObj = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate || _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today()));

    this.cloneTemplate(true);
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get month() {
    return _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].format(this.dateObj, 'MMMM')
  }

  get year() {
    return _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getYear(this.dateObj);
  }

  static get observedAttributes() {
    return ['mdw-display-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.dateObj = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(newValue);
        this.updateDisplay();
        break;
    }
  }

  updateDisplay() {
    const month = this.month;
    const monthElement = this.shadowRoot.querySelector('.month');
    monthElement.style.width = `${this.getMonthWidth(month)}px`;
    monthElement.innerHTML = month;
    this.shadowRoot.querySelector('.year').innerHTML = this.year;
  }

  getMonthWidth(month) {
    switch(month.toLowerCase()) {
      case 'january':
        return 59;
      case 'february':
        return 64;
      case 'march':
        return 48;
      case 'april':
        return 36;
      case 'may':
        return 33;
      case 'june':
        return 38;
      case 'july':
        return 33;
      case 'august':
        return 54;
      case 'september':
        return 81;
      case 'october':
        return 60;
      case 'november':
        return 76;
      case 'december':
        return 76;
    }
  }

  template() {
    const month = this.month;
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div>
        <span class="month" style="width: ${this.getMonthWidth(month)}px">${month}</span>
        <span class="year">${this.year}</span>
      </div>
      <i class="icon"></i>
    `;
  }

  styles() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["css"]`
      :host {
        margin-left: 24px;
        position: relative;
        padding-right: 28px;
        cursor: pointer;
        color: var(--mdw-theme-text--body);
        display: flex;
        justify-content: space-between;
      }

      .month {
        display: inline-block;
        line-height: 13px;
        overflow: hidden;
        transition: width 110ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .icon {
        right: 8px;
        top: 7px;
        width: 0;
        height: 0;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--mdw-theme-text--body);
      }

      :host(.mdw-open) .icon {
        transform: rotate(180deg) translateY(-5px);
        transform-origin: top;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
  }
});

});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-date-picker--year', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.bound_onYearClick = this.onYearClick.bind(this);

    this.today = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].today();
    // TODO allow range to be set
    this.yearList = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].defaultYearRange();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.shadowRoot.querySelector('.mdw-date-picker--year-list-grid').addEventListener('click', this.bound_onYearClick);
  }

  removeEvents() {
    this.shadowRoot.querySelector('.mdw-date-picker--year-list-grid').removeEventListener('click', this.bound_onYearClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this._scrollYearIntoView();
        break;

      case 'mdw-selected-date':
        this._selectDate(newValue);
        break;

      case 'mdw-min-date':
        break;

      case 'mdw-max-date':
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get year() {
    return _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getParts(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate)).year;
  }

  get displayYearElement() {
    return this.shadowRoot.querySelector(`[mdw-year="${this.year}"]`);
  }

  _scrollYearIntoView() {
    this.displayYearElement && this.displayYearElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  _selectDate(dateString) {
    const date = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(dateString);
    // TODO do i need to deselect on ivalid dates?
    if (!_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].isValid(date)) return;
    this.deselect();

    const selectedElement = this.shadowRoot.querySelector(`[mdw-year="${_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].getYear(date)}"]`);
    if (selectedElement) selectedElement.classList.add('mdw-selected');
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  // get year() {
  //   return this._selectedYear;
  // }
  //
  // get selectedElement() {
  //   let selected = this.shadowRoot.querySelector('.mdw-selected');
  //   if (!selected) selected = this.shadowRoot.querySelector(`[mdw-year="${this.today.getFullYear()}"]`);
  //   return selected;
  // }
  //
  // updateDisplay() {
  //   this.deslecet();
  //   const el = this.shadowRoot.querySelector(`[mdw-year="${this.year}"]`);
  //   if (el) el.classList.add('mdw-selected');
  // }
  //
  // deslecet() {
  //   const selected = this.shadowRoot.querySelector(`.mdw-selected`);
  //   if (selected) selected.classList.remove('mdw-selected');
  // }
  //
  // scrollToSelectedYear() {
  //   this.selectedElement.scrollIntoView({
  //     behavior: 'auto',
  //     block: 'center',
  //     inline: 'center'
  //   });
  // }
  //
  // click(event) {
  //   this.deslecet();
  //   event.target.classList.add('mdw-selected');
  //   this.dispatchEvent(new CustomEvent('MDWDatePicker:yearChange', {
  //     detail: {
  //       year: parseInt(event.target.getAttribute('mdw-year'))
  //     }
  //   }));
  // }'

  onYearClick({ target }) {
    if (!target.hasAttribute('mdw-year')) return;

    const year = parseInt(target.getAttribute('mdw-year'));
    const newDate = _core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].adjustDate(_core_DateUtil_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(this.displayDate), { set: { year } });
    this.dispatchEvent(new CustomEvent('MDWDatePicker:yearChange', {
      composed: true,
      detail: { year }
    }));
  }

  template() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div class="mdw-date-picker--year-list-grid">
        ${this.yearList.map(y => _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["html"]`
          <div class="mdw-date-picker--year-item" mdw-year="${y}">${y}</div>
        `).join('\n')}
      </div>
    `;
  }

  styles() {
    return _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["css"]`
      :host {
        display: block;
        overflow-y: scroll;
        height: 214px;
      }

      .mdw-date-picker--year-list-grid {
        display: grid;
        grid-template-columns: repeat(4, 52px);
        grid-column-gap: 7px;
        grid-row-gap: 4px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
        padding-right: 20px;
      }

      .mdw-date-picker--year-item {
        font-size: 15px;
        width: 100%;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
        cursor: pointer;
        color: var(--mdw-theme-text--heading);
      }

      .mdw-date-picker--year-item.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }
    `;
  }
});

});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-dialog', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this._clickOutsideClose = false;
  }

  connectedCallback() {
    console.log('bottom');
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
    // hold a reference becuase we are hoisting the panel out of this component
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
    return this._clickOutsideClose;
  }

  set clickOutsideClose(value) {
    this._clickOutsideClose = value;
  }

  show() {
    this.panel.hoistToBody();
    // this.setAutoPosition(false);
    this.panel.setTarget('body');
    this.panel.setAttribute('mdw-position', this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.classList.add('mdw-show');

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

});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-drawer', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

  get contentElement() {
    return this.querySelector('mdw-drawer-content');
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
  }

  show() {
    this.classList.remove('mdw-closed');
    this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop}px)`;
    if (this.wasLockedOpen) this.classList.add('mdw-locked-open');
    else if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) this.addBackdrop();
    this.isShowing = true;

    // add spacing for scroll
    if (this.contentElement) this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop + 18}px)`;
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
});

});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-expander-arrow', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
  }

  connectedCallback() {
    this.parentNode.registerArrow(this);
  }

  open() {
    this.classList.add('open');
  }

  close() {
    this.classList.remove('open');
  }
});

});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-expander-container', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
  }

  disconnectedCallback() {
    if (this.header) this.header.removeEventListener('click', () => this.toggle);
  }

  registerHeader(header) {
    this.header = header;
    this.header.addEventListener('click', () => this.toggle());
  }

  registerContent(contentElement) {
    this.contentElement = contentElement;
  }

  toggle() {
    // do nothing if there is no content
    if (!this.contentElement) return;
    const open = this.classList.contains('open');
    if (open) {
      this.classList.remove('open');
      this.contentElement.close();
      this.header.close();
    } else {
      this.classList.add('open');
      this.contentElement.open();
      this.header.open();
    }
  }
})

});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-expander-content', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    if (this.hasAttribute('height')) this.height = this.getAttribute('height').replace('px', '');
    this.parentNode.registerContent(this);
  }

  static get observedAttributes() {
    return ['height'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get height() {
    return this._height || this.scrollHeight;
  }

  set height(value) {
    this._height = value;
  }

  open() {
    this.style.display= 'block';
    this.classList.add('show');
    this.style.maxHeight = `${this.height}px`;
    this.style.opacity = 1;
  }

  close() {
    this.classList.remove('show');
    this.style.maxHeight = 0;
    this.style.opacity = 0;
    this.onHideComplete();
  }

  onHideComplete() {
    const self = this;
    self.addEventListener(_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].transitionEventName, function handler() {
      self.style.display= 'none';
      self.removeEventListener(_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].transitionEventName, handler);
    });
  }

  css() {
    return cssStr`
      :host {
        display: block;
        overflow: hidden;
        opacity: 0;
        max-height: 0;
        transition: max-height 0.12s cubic-bezier(0.25, 0.8, 0.25, 1),
                    opacity 0.12s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      :host(.show) {
        display: block;
      }
    `;
  }

  template() {
    return html`
      <slot></slot>
    `;
  }
});

});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-expander-header', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    this.parentNode.registerHeader(this);
  }

  registerArrow(arrow) {
    this.arrow = arrow;
  }

  open() {
    if (this.arrow) this.arrow.open();
  }

  close() {
    if (this.arrow) this.arrow.close();
  }

  htmtemplatel() {
    return html`
      <slot></slot>
    `;
  }
});

});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-fab', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return html`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-fab-ripple"></div>
    `;
  }

  get dense() {
    return this.classList.contains('mdw-dense');
  }

  get spinnerContainer() {
    return this.shadowRoot.querySelector('.mdw-spinner-container');
  }

  set disabled(value) {
    if (!!value || value === '') this.setAttribute('disabled', 'disabled');
    else this.removeAttribute('disabled');
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

  get internalStylesFile() {
    return './internal.css'
  }
});

});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-icon', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-linear-progress', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return this.shadowRoot.querySelector('.mdw-bar');
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
    return html`
      <div class="mdw-bar"></div>
    `;
  }

  get internalStylesFile() {
    return './internal.css'
  }
});

});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-list-item', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    if (this._selectEl) this._selectEl.removeEventListener('change', this.bound_onSelect);
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

});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-list', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
    this._selectedIndexes = [];
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
    this._selectOnclick = value;
  }

  get selectOnclick() {
    return this._selectOnclick;
  }

  set selectType(value) {
    this._selectType = value;
  }

  get selectType() {
    return this._selectType;
  }

  get selected() {
    return [].concat(this._selectedIndexes);
  }

  deselectAll() {
    [...this.children].forEach(child => child.deselect());
    this._selectedIndexes = [];
  }

  itemSelected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    if (this._selectType === 'single') {
      const children = [...this.children];
      this._selectedIndexes.forEach(i => children[i].deselect());
      this._selectedIndexes = [];
    }
    this._selectedIndexes.push(index);
    this.handleChange();
  }

  itemDeselected(listItem) {
    const index = Array.prototype.indexOf.call(this.children, listItem);
    this._selectedIndexes.splice(this._selectedIndexes.indexOf(index), 1);
    this.handleChange();
  }

  handleChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }
});

});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-menu', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
      this.panel.setAttribute('mdw-position', this.panelPosition);
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
    this._panelPosition = value;
  }

  get panelPosition() {
    return this._panelPosition || 'inner-left inner-top';
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

});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



/* --- mdw-panel ---
 * The panel allows you to create positions floating elements.
 * mdw-panel is used for menu, dialog, tooltip
 */

 // TODO fix open and close animations
window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-panel', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    this._autoPosition = true;
    this.isReady = true;
    this.setTarget(this.getAttribute('mdw-target') || this.parentNode);
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
        const split = newValue.split(' ');
        this._position = `${split[0] || 'left'} ${split[1] || 'top'}`;
        this._setPosition();
        break;
    }
  }

  get target() {
    return this._target;
  }

  setTarget(value) {
    // convert css selector to node
    if (value && typeof value === 'string') {
      const orig = value;
      value = document.querySelector(value);
      if (value === null) throw Error(`invalid css selector or elemnt does not exits for target value ${orig}`);
    }
    this._target = value;
  }

  setClickOutsideClose(value) {
    this._clickOutsideClose = !!value;
  }

  setQuickOpen(value) {
    this._isQuickOpen = !!value;
  }

  setAutoPosition(value) {
    this._autoPosition = !!value;
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
        this._openAnimationEndTimerId = setTimeout(() => {
          this._openAnimationEndTimerId = 0;
          this.classList.remove('mdw-panel--animating-open');
          this.notifyOpen();
        }, 150);

        this._setPosition();
      });
    } else {
      this.classList.add('mdw-open');
      this._setPosition();
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

  hoistToBody() {
    if (this._isHoisted) return;
    document.body.appendChild(this);
    this._isHoisted = true;
  }

  fixPosition(value = true) {
    this._isFixed = !!value;
    this.classList.toggle('mdw-fixed', this._isFixed);
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

  _setPosition() {
    if (!this.isOpen()) return;

    // use offset with and height to avoid problems due to transform: scale()
    // getBoundingClientRect will return the adjusted width based on the scale factor
    const position = this._position.split(' ');
    let aValue = position[0];
    let bValue = position[1];
    // auto correct swapped values
    if (['top', 'bottom', 'inner-bottom', 'inner-top'].includes(aValue) || ['left', 'right', 'inner-left', 'inner-right'].includes(bValue)) {
      aValue = position[1];
      bValue = position[0];
    }

    const { left, top } = this._calculatePosition(aValue, bValue);

    this.style.top = `${parseInt(top)}px`;
    this.style.left = `${parseInt(left)}px`;
    this.style[this.transformPropertyName] = 'scale(1)';
    this.style[`${this.transformPropertyName}-origin`] = `${this._scaleOriginX} ${this._scaleOriginY}`;
  }

  _calculatePosition(xValue, yValue, count = 0) {
    const target = this.target;
    const offsetParent = this.offsetParent;
    let targetRect = target.getBoundingClientRect();
    if (this._isFixed) targetRect = {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    const offsetParentRect = offsetParent ? offsetParent.getBoundingClientRect() : { x: 0, y:0 };
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    let top = 0;
    let left = 0;

    switch(xValue) {
      case 'left':
        left = targetRect.x - width - offsetParentRect.x;
        this._scaleOriginX = 'right';
        break;
      case 'right':
        left = targetRect.x + targetRect.width - offsetParentRect.x;
        this._scaleOriginX = 'left';
        break;
      case 'center':
        left = targetRect.x + (targetRect.width / 2) - (width / 2) - offsetParentRect.x;
        this._scaleOriginX = 'center';
        break;
      case 'inner-left':
        left = targetRect.x - offsetParentRect.x;
        this._scaleOriginX = 'left';
        break;
      case 'inner-right':
        left = targetRect.x + targetRect.width - width - offsetParentRect.x;
        this._scaleOriginX = 'right';
        break;
    }

    switch(yValue) {
      case 'top':
        top = targetRect.y - height - offsetParentRect.y;
        this._scaleOriginY = 'bottom';
        break;
      case 'bottom':
        top = targetRect.y + targetRect.height - offsetParentRect.y;
        this._scaleOriginY = 'top';
        break;
      case 'center':
        top = targetRect.y + (targetRect.height / 2) - (height / 2) - offsetParentRect.y;
        this._scaleOriginY = 'center';
        break;
      case 'inner-top':
        top = targetRect.y - offsetParentRect.y;
        this._scaleOriginY = 'top';
        break;
      case 'inner-bottom':
        top = targetRect.y + targetRect.height - height - offsetParentRect.y;
        this._scaleOriginY = 'bottom';
        break;
    }

    return this._adjustOutOfBoundsPosition(xValue, yValue, left, top, count);
  }

  _adjustOutOfBoundsPosition(xValue, yValue, left, top, count) {
    if (this._isFixed || !this._autoPosition) return { left, top };

    const width = this.offsetWidth;
    const height = this.offsetHeight;
    const { clientWidth, clientHeight } = document.documentElement;
    let recalculate = false;

    switch(yValue) {
      case 'top':
        if (top < 0) {
          yValue = 'bottom';
          recalculate = true;
        }
      case 'inner-bottom':
        if (top < 0) {
          yValue = 'inner-top';
          recalculate = true;
        }
        break;
      case 'bottom':
        if (Math.ceil((top + height) - clientHeight) > 0) {
          yValue = 'top';
          recalculate = true;
        }
        break;
      case 'inner-top':
        if (Math.ceil((top + height) - clientHeight) > 0) {
          yValue = 'inner-bottom';
          recalculate = true;
        }
        break;
      case 'center':
        const bottom = Math.ceil((top + height) - clientHeight);
        if (top < 0) top = 0;
        else if (bottom > 0) top -= bottom;
        break;
    }

    switch(yValue) {
      case 'left':
        if (left < 0) {
          xValue = 'right';
          recalculate = true;
        }
        break;
      case 'inner-right':
        if (left < 0) {
          xValue = 'inner-right';
          recalculate = true;
        }
        break;
      case 'right':
        if (Math.ceil((left + width) - clientWidth) > 0) {
          xValue = 'left';
          recalculate = true;
        }
        break;
      case 'inner-left':
        if (Math.ceil((left + width) - clientWidth) > 0) {
          xValue = 'inner-right';
          recalculate = true;
        }
        break;
      case 'center':
        const right = Math.ceil((left + width) - clientWidth);
        if (left < 0) left = 0;
        else if (right > 0) left -= right;
        break;
    }

    // use count to prevent infinite looping
    //   This can be caused wehn the side of the panel is wider or taller than the screen
    if (recalculate === true && count < 3) return this._calculatePosition(xValue, yValue, count++);

    return { left, top };
  }

  resetPosition() {
    // this.style.top = '';
    // this.style.left = '';
    this.style[this.transformPropertyName] = '';
  }
});

});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-radio-group', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-radio', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
      this._name = this.parentNode.getAttribute('name');
    } else if (this.hasAttribute('name')) {
      this._name = this.getAttribute('name');
    }

    // create name if one was not provided
    // name is required for radio buttons to work
    if (!this._name) {
      this._name = _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].uid();
      if (this.parentNode) this.parentNode.setAttribute('name', this._name);
      else this.setAttribute('name', this._name);
    }
    return this._name;
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

});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



// TODO implaent validity

window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-select', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this._setupLabel();
    if (this._isEnhanced) this._prepareEnhance();
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
      this.classList.add('mdw-no-animation');
      if (this._isEnhanced) {
        if (this.panel) this.panel.style.minWidth = `${this.offsetWidth}px`;
      }
    }, 0);
  }

  disconnectedCallback() {
    // console.log(this.enhacedElementId);
    if (this._isEnhanced) {
      this.shadowRoot.querySelector('render-block').removeEventListener('click', this.bound_onClick);
      document.body.removeEventListener('keydown', this.bound_onKeyDown);
    } else {
      this.selectElement.removeEventListener('focus', this.bound_onFocus);
      this.selectElement.removeEventListener('blur', this.bound_onBlur);
      this.selectElement.removeEventListener('change', this.bound_onChange);
    }

    if (this.panel) this.panel.remove();
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

  _setupLabel() {
    const label = this.querySelector('label');
    if (label) {
      this._labelText = label.innerText;
      label.remove();
    }
  }

  _prepareEnhance() {
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

    if (_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) this._prepareSheet();
    else this._preparePanel();
  }

  _preparePanel() {
    const panelHTML = `
      <mdw-panel id="${this.enhacedElementId}" mdw-position="inner-top center" mdw-flex-position="inner-left bottom" class="mdw-panel-hoisted">
        <mdw-list>
          ${this._optionsMap.map(({ text, value, selected }) => `
            <mdw-list-item value="${value}"${selected ? ' selected' : ''}>${text}</mdw-list-item>
          `).join('\n')}
        </mdw-list>
      </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    const panelEl = this.panel;
    if (panelEl.hoistToBody) {
      panelEl.setTarget(this);
      panelEl.hoistToBody(this);
    }
  }

  _prepareSheet() {
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

  onClick() {
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
});

});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-sheet-header', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return !!this._title ? this._title : this.hasAttribute('mdw-title') ? this.getAttribute('mdw-title') : '';
  }

  set title(value) {
    this._title = value;
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

  get internalStylesFile() {
    return './header-internal.css';
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
});

});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _core_gestures_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-sheet', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();

    this.isOpen = false;
    this.classList.add('mdw-closed');
    this.currentDragPosition = -1;
    this.bound_onDrag = this.onDrag.bind(this);
    this.bound_onScroll = this.onScroll.bind(this);
    this.style[_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].transformPropertyName] = 'translate3d(0, 100%, 0)';
    this.setupHeader();
  }

  disconnectedCallback() {
    Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["removeDragListener"])(this.contentElement, this.bound_onDrag);
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
      this.backdrop = _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].addBackdrop(this, () => {
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
      if (this.isDraggable) Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["addDragListener"])(this.contentElement, this.bound_onDrag);
      this.contentElement.addEventListener('scroll', this.bound_onScroll);
      this.notifyOpen();
    }, 0);
    if (this.isModal) _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].lockPageScroll();
  }

  close() {
    Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["removeDragListener"])(this.contentElement, this.bound_onDrag);
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
    if (this.isDraggable) Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["addDragListener"])(this.contentElement, this.bound_onDrag);
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
      Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["disableDragListenerForElement"])(this.contentElement);
    }
    if (this.currentDragPosition === y) return;
    this.style[_core_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].transformPropertyName] = `translate3d(0, ${y}px, 0)`;
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
      Object(_core_gestures_js__WEBPACK_IMPORTED_MODULE_2__["enableDragListenerForElement"])(this.contentElement);
    }
  }
});

});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _core_gestures_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-slider', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return this._min || 0;
  }

  set min(value) {
    this._min = parseFloat(value);
  }

  get max() {
    return this._max || 100;
  }

  set max(value) {
    this._max = parseFloat(value);
  }

  get range() {
    return this.max - this.min;
  }

  get step() {
    return this._step;
  }

  set step(value) {
    this._step = parseFloat(value);
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
    this._value = this.min + (percent * range);
    // check if the step is a integer and then garentee the value is an int
    // becuase of how math works in javascript(floating point) this is not a garentee without parseInt
    if (!(''+this.step).includes('.')) this._value = parseInt(this._value);
    return this._value || 0;
  }

  set value(value) {
    this._value = parseFloat(value);
  }

  get thumb() {
    return this.shadowRoot.querySelector('.mdw-slider__thumb-hover');
  }

  get thumbContainer() {
    return this.shadowRoot.querySelector('.mdw-slider__thumb-container');
  }

  get notchContainer() {
    return this.shadowRoot.querySelector('.mdw-slider__notch-container');
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
        this._initialX = parseInt((this.thumbContainer.style.left || '0px').replace('px', ''));
        break;
      case 'move':
        const { left, width } = this.getBoundingClientRect();
        let x = e.distance.x + this._initialX;
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

  get internalStylesFile() {
    return './internal.css'
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
});

});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-snackbar', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    this.panel.remove();
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get position() {
    return this._position || 'inner-bottom inner-left';
  }

  setPosition(value) {
    const split = value.split(' ');
    this._position = `${split[0] || 'top'} ${split[1] || 'left'}`;
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

    // NOTE is this needed for proper cleanup?
    // remove panel element
    // setTimeout(() => {
    //   this.panel.remove();
    //   this.panel = undefined;
    // }, 200);
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

});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-switch', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return this.shadowRoot.querySelector('input');
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

  get internalStylesFile() {
    return './internal.css'
  }

  template() {
    return html`
      <div class="mdw-track"></div>
      <div class="mdw-thumb-underlay">
        <div class="mdw-thumb">
          <input type="checkbox" role="switch">
          <div class="mdw-ripple mdw-switch-ripple"></div>
        </div>
      </div>
    `;
  }
});

});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-tab-body', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return html`
      <mdw-tab-body-content>
        <!-- slot is added dynamicly -->
      </mdw-tab-body-content>
    `;
  }

  get internalStylesFile() {
    return './internal.css'
  }
});

});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Ripple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-tab-button', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return html`
      <span class="text"><slot></slot></span>
      <span class="mdw-tab-button-indicator">
        <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>
      </span>
      <div class="mdw-ripple mdw-tab-button-ripple"></div>
    `;
  }

  get internalStylesFile() {
    return './internal.css'
  }
});

});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-tabs-bar', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    return html`
      <mdw-tabs-bar-scroller>
        <mdw-tabs-bar-scroller-area>
          <mdw-tabs-bar-scroller-content>
            <slot></slot>
          </mdw-tabs-bar-scroller-content>
        </mdw-tabs-bar-scroller-area>
      </mdw-tabs-bar-scroller>
    `;
  }
});

});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-tabs-content', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-textfield', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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
    if (!this._inputType) this._inputType = this.querySelector('input') ? 'input' : 'textarea';
    return this.querySelector(this._inputType);
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

});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-tooltip', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
  constructor() {
    super();
  }

  template() {
    return html`
      <div class="tooltip">
        <slot></slot>
      </div>
    `;
  }
});

});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



window.addEventListener('DOMContentLoaded', () => {
customElements.define('mdw-top-app-bar', class extends _webformula_pax_core_index_js__WEBPACK_IMPORTED_MODULE_0__["HTMLElementExtendedPaxComponents"] {
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

});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
// TODO enable configuration of theme on load


const MDWTheme = new class {
  constructor() {
    this.hexREGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.paletteRegex = /(?<base>--mdw-theme-palette--)(?<color>\w*)-?(?<contrast>contrast)?-(?<hue>\w*)$/;
    this.textRegex = /(?<base>--mdw-theme-text--)(?<on>on-\w*)?(?<state>\w*)--(?<contrast>\w*)$/;
    this.contentWithContrastRegex = /(?<base>--mdw-theme-)(?<content>\w*)--(?<contrast>\w*)$/;
    this._contrast = 'light';
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
    return this._contrast;
  }

  set contrast(value) {
    if (value !== 'light' && value !== 'dark') throw Error('valid values are "light" and "dark"');
    this._contrast = value;
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routerConfig", function() { return routerConfig; });
const routerConfig = {
  custom: {},
  root: undefined
};

/***/ })
/******/ ]);