!function(e) {
  var t = {};
  function n(i) {
    if (t[i])
      return t[i].exports;
    var s2 = t[i] = {
      i,
      l: false,
      exports: {}
    };
    return e[i].call(s2.exports, s2, s2.exports, n), s2.l = true, s2.exports;
  }
  n.m = e, n.c = t, n.d = function(e2, t2, i) {
    n.o(e2, t2) || Object.defineProperty(e2, t2, {
      enumerable: true,
      get: i
    });
  }, n.r = function(e2) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e2, "__esModule", {
      value: true
    });
  }, n.t = function(e2, t2) {
    if (1 & t2 && (e2 = n(e2)), 8 & t2)
      return e2;
    if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule)
      return e2;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
      enumerable: true,
      value: e2
    }), 2 & t2 && "string" != typeof e2)
      for (var s2 in e2)
        n.d(i, s2, function(t3) {
          return e2[t3];
        }.bind(null, s2));
    return i;
  }, n.n = function(e2) {
    var t2 = e2 && e2.__esModule ? function() {
      return e2.default;
    } : function() {
      return e2;
    };
    return n.d(t2, "a", t2), t2;
  }, n.o = function(e2, t2) {
    return Object.prototype.hasOwnProperty.call(e2, t2);
  }, n.p = "", n(n.s = 0);
}([function(e, t, n) {
  "use strict";
  n.r(t), n.d(t, "MDWDialog", function() {
    return k;
  }), n.d(t, "MDWSnackbar", function() {
    return C;
  }), n.d(t, "MDWTemplate", function() {
    return S;
  }), n.d(t, "MDWSurface", function() {
    return H;
  }), n.d(t, "MDWDrag", function() {
  }), n.d(t, "MDWSwipe", function() {
  });
  const i = function() {
    if ("undefined" != typeof FORCE_MOBILE && "true" === FORCE_MOBILE)
      return true;
    var e2 = false;
    return function(t2) {
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t2) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t2.substr(0, 4))) && (e2 = true);
    }(navigator.userAgent || navigator.vendor || window.opera), e2;
  }(), o = function() {
    if ("undefined" != typeof FORCE_MOBILE && "true" === FORCE_MOBILE)
      return true;
    var e2 = false;
    return function(t2) {
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t2) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t2.substr(0, 4))) && (e2 = true);
    }(navigator.userAgent || navigator.vendor || window.opera), e2;
  }();
  const r = new class {
    constructor() {
      this._uid = 1, this._setupTransitionEvent(), this._setTransformPropertyName(), this.isPhone = i, this.isPhoneAndTablet = o, this.routeChangeCallbacks = new Set(), this.onReady(() => {
        this.isMobile ? document.body.classList.add("mdw-is-mobile") : document.body.classList.remove("mdw-is-mobile"), window.addEventListener("hashchange", this.onRouteChange);
      });
    }
    onReady(e2) {
      document.body ? e2() : setTimeout(() => {
        this.onReady(e2);
      }, 0);
    }
    uid(e2 = "id") {
      return `${e2}_${this._uid++}`;
    }
    get isMobile() {
      return this.isPhoneAndTablet;
    }
    lockPageScroll() {
      (document.body.classList.contains("prevent-over-scroll") ? document.querySelector("mdw-page > mdw-content") : document.body).style.overflow = "hidden";
    }
    unlockPageScroll() {
      (document.body.classList.contains("prevent-over-scroll") ? document.querySelector("mdw-page > mdw-content") : document.body).style.overflow = "";
    }
    disableUserSelect() {
      document.body.classList.add("mdw-no-select");
    }
    enableUserSelect() {
      document.body.classList.remove("mdw-no-select");
    }
    debounce(e2, t2) {
      let n2;
      return function() {
        const i2 = arguments, s2 = this;
        clearTimeout(n2), n2 = setTimeout(() => {
          n2 = void 0, e2.apply(s2, i2);
        }, t2 || 10);
      };
    }
    throttle(e2, t2) {
      let n2;
      return function() {
        const i2 = arguments, s2 = this;
        n2 || (n2 = true, e2.apply(s2, i2), setTimeout(() => {
          n2 = false;
        }, t2));
      };
    }
    rafThrottle(e2) {
      let t2;
      return function() {
        const n2 = arguments, i2 = this;
        t2 || (t2 = true, e2.apply(i2, n2), requestAnimationFrame(() => {
          t2 = false;
        }));
      };
    }
    querySlotted(e2, t2) {
      if (!e2)
        throw Error("requires either component");
      if (!t2)
        throw Error("requires selector");
      return e2.shadowRoot.querySelector("slot") ? e2.shadowRoot.querySelector("slot").assignedNodes().find((e3) => !!e3.matches && e3.matches(t2)) : null;
    }
    querySlottedAll(e2, t2) {
      if (!e2)
        throw Error("requires either component");
      if (!t2)
        throw Error("requires selector");
      return e2.shadowRoot.querySelector("slot").assignedNodes({
        flatten: true
      }).reduce((e3, n2) => n2.querySelectorAll ? e3.concat([...n2.querySelectorAll(t2)]) : e3, []);
    }
    slottedChildren(e2) {
      if (!e2)
        throw Error("requires either component");
      return e2.shadowRoot.querySelector("slot").assignedNodes();
    }
    get transitionEventName() {
      return this.transitionEventName_;
    }
    get transformPropertyName() {
      return this.transformPropertyName_;
    }
    addBackdrop(e2, t2, n2 = {
      sheet: false
    }) {
      const i2 = this.uid();
      e2.insertAdjacentHTML("afterend", `<div id="${i2}" class="mdw-backdrop"></div>`);
      const s2 = document.querySelector(`#${i2}`);
      return true === n2.sheet && s2.classList.add("mdw-sheet-backdrop"), t2 && s2.addEventListener("click", t2), {
        remove() {
          t2 && s2.removeEventListener("click", t2), s2.remove();
        }
      };
    }
    get searchParamters() {
      return this._extractSearchParameters(this._clean(window.location.href)).split(",").filter((e2) => !!e2).reduce((e2, t2) => {
        const n2 = t2.split("=");
        return e2[n2[0]] = n2[1], e2;
      }, {});
    }
    setSearchParamter(e2, t2) {
      const n2 = this.searchParamters;
      null == t2 ? delete n2[e2] : n2[e2] = t2;
      let i2 = window.location.href.split("?")[0];
      Object.keys(n2).length > 0 && (i2 += "?" + Object.keys(n2).map((e3) => `${e3}=${n2[e3]}`).join(",")), window.history.pushState({
        path: i2
      }, "", i2);
    }
    removeSearchParamter(e2) {
      this.setSearchParamter(e2, void 0);
    }
    addOnRouteChange(e2) {
      return this.routeChangeCallbacks.add(e2), () => {
        this.routeChangeCallbacks.delete(e2);
      };
    }
    removeOnRouteChange(e2) {
      this.routeChangeCallbacks.has(e2) && this.routeChangeCallbacks.delete(e2);
    }
    _routeChange({oldUrl: e2, newURL: t2} = {
      oldUrl: void 0,
      newURL: void 0
    }) {
      this.routeChangeCallbacks.forEach((n2) => n2({
        oldUrl: e2,
        newURL: t2
      }));
    }
    _clean(e2) {
      return e2 instanceof RegExp ? s : e2.replace(/\/+$/, "").replace(/^\/+/, "/");
    }
    _extractSearchParameters(e2) {
      return e2.split(/\?(.*)?$/).slice(1).join("");
    }
    _setupTransitionEvent() {
      const e2 = document.createElement("fakeelement"), t2 = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
      };
      for (let n2 in t2)
        void 0 !== e2.style[n2] && (this.transitionEventName_ = t2[n2]);
    }
    _setTransformPropertyName(e2 = false) {
      if (void 0 === this.transformPropertyName_ || e2) {
        const e3 = document.createElement("div");
        this.transformPropertyName_ = "transform" in e3.style ? "transform" : "webkitTransform";
      }
    }
  }();
  window.MDWUtils = r;
  var a = r;
  const d = new Map(), l = {
    start: "start",
    move: "move",
    end: "end"
  };
  function c(e2, t2) {
    if (!(e2 instanceof HTMLElement))
      throw Error("element must be an instance HTMLElement");
    if ("function" != typeof t2)
      throw Error("callback must be a function");
    const n2 = new m(e2, t2);
    n2.addEvents(), d.get(e2) || d.set(e2, new Map()), d.get(e2).set(t2, n2);
  }
  function h(e2, t2) {
    if (!(e2 instanceof HTMLElement))
      throw Error("element must be an instance HTMLElement");
    const n2 = d.get(e2);
    if (n2)
      if (t2) {
        const e3 = n2.get(t2);
        e3 && e3.removeEvents(), n2.delete(t2);
      } else
        n2.forEach((e3) => e3.removeEvents()), d.delete(e2);
  }
  class m {
    constructor(e2, t2) {
      this.element = e2, this.callback = t2, this.hasPointerEvent = !!window.PointerEvent, this.bound_handleGestureStart = this.handleGestureStart.bind(this), this.bound_handleGestureMove = this.handleGestureMove.bind(this), this.bound_handleGestureEnd = this.handleGestureEnd.bind(this), this.callbackThrottle = a.rafThrottle((e3) => {
        e3.distance = this.getDistance(e3), e3.direction = this.getDirection(this.lastDistance, e3.distance), this.lastDistance = e3.distance, this.callback(e3);
      });
    }
    addEvents() {
      this.disableTouchEvents(), a.isMobile ? this.element.addEventListener("touchstart", this.bound_handleGestureStart, false) : this.element.addEventListener("mousedown", this.bound_handleGestureStart);
    }
    disable() {
      this.removeEvents();
    }
    enable() {
      this.addEvents();
    }
    enableTouchEvents() {
      this.element.style["touch-action"] = "";
    }
    disableTouchEvents() {
      this.element.style["touch-action"] = "none";
    }
    removeEvents() {
      this.enableTouchEvents(), a.isMobile ? (this.element.removeEventListener("touchstart", this.bound_handleGestureStart), this.element.removeEventListener("touchmove", this.bound_handleGestureMove), this.element.removeEventListener("touchend", this.bound_handleGestureEnd), this.element.removeEventListener("touchcancel", this.bound_handleGestureEnd)) : (this.element.removeEventListener("mousedown", this.bound_handleGestureStart), window.removeEventListener("mousemove", this.bound_handleGestureMove), window.removeEventListener("mouseup", this.bound_handleGestureEnd));
    }
    handleGestureStart(e2) {
      "mousedown" === e2.type && 0 !== e2.button || (e2.state = "start", a.isMobile ? (this.element.addEventListener("touchmove", this.bound_handleGestureMove, false), this.element.addEventListener("touchend", this.bound_handleGestureEnd, false), this.element.addEventListener("touchcancel", this.bound_handleGestureEnd, false)) : (window.addEventListener("mousemove", this.bound_handleGestureMove), window.addEventListener("mouseup", this.bound_handleGestureEnd)), this.startTime = Date.now(), this.initialTouchPos = this.getClientXY(e2), this.lastDistance = this.getDistance(e2), this.moved = false);
    }
    handleGestureMove(e2) {
      e2.state = this.moved ? "move" : "start", this.moved = true, this.initialTouchPos && this.callbackThrottle(e2);
    }
    handleGestureEnd(e2) {
      if (e2.state = "end", a.isMobile ? (this.element.removeEventListener("touchmove", this.bound_handleGestureMove), this.element.removeEventListener("touchend", this.bound_handleGestureEnd), this.element.removeEventListener("touchcancel", this.bound_handleGestureEnd)) : (window.removeEventListener("mousemove", this.bound_handleGestureMove), window.removeEventListener("mouseup", this.bound_handleGestureEnd)), false !== this.moved) {
        if (this.endTime = Date.now(), e2.runTime = this.endTime - this.startTime, e2.distance = this.getDistance(e2), e2.direction = this.getDirection({
          x: 0,
          y: 0
        }, e2.distance), e2.velocity = this.getVelocity(e2.distance, e2.runTime), void 0 === e2.clientX) {
          const t2 = this.getClientXY(e2);
          e2.clientX = t2.x, e2.clientY = t2.y;
        }
        this.callback(e2);
      }
    }
    getDistance(e2) {
      const t2 = this.getClientXY(e2);
      return {
        x: t2.x - this.initialTouchPos.x,
        y: t2.y - this.initialTouchPos.y
      };
    }
    getDirection(e2, t2) {
      const n2 = t2.x > e2.x ? 1 : t2.x === e2.x ? 0 : -1, i2 = t2.y > e2.y ? 1 : t2.y === e2.y ? 0 : -1;
      return {
        x: n2,
        y: i2,
        xDescription: 0 === n2 ? "none" : 1 === n2 ? "right" : "left",
        yDescription: 0 === i2 ? "none" : 1 === i2 ? "down" : "up"
      };
    }
    getClientXY(e2) {
      return {
        x: e2.targetTouches && e2.targetTouches.length ? e2.targetTouches[0].clientX : e2.changedTouches && e2.changedTouches.length ? e2.changedTouches[0].clientX : e2.clientX,
        y: e2.targetTouches && e2.targetTouches.length ? e2.targetTouches[0].clientY : e2.changedTouches && e2.changedTouches.length ? e2.changedTouches[0].clientY : e2.clientY
      };
    }
    getVelocity(e2, t2) {
      return {
        x: e2.x / t2,
        y: e2.y / t2
      };
    }
  }
  window.MDWDrag = {
    states: l,
    addDragListener: c,
    removeDragListener: h,
    enableDragListenerForElement: function(e2) {
      if (!(e2 instanceof HTMLElement))
        throw Error("element must be an instance HTMLElement");
      const t2 = d.get(e2);
      t2 && t2.forEach((e3) => e3.enable());
    },
    disableDragListenerForElement: function(e2) {
      if (!(e2 instanceof HTMLElement))
        throw Error("element must be an instance HTMLElement");
      const t2 = d.get(e2);
      t2 && t2.forEach((e3) => e3.disable());
    }
  };
  const u = new Map();
  class p {
    constructor(e2, t2) {
      this.bound_dragEvent = this.dragEvent.bind(this), this.element = e2, this.callback = t2;
    }
    addEvents() {
      c(this.element, this.bound_dragEvent);
    }
    removeEvents() {
      h(this.element, this.bound_dragEvent);
    }
    dragEvent(e2) {
      "end" === e2.state && (Math.abs(e2.velocity.x) > 1.4 || Math.abs(e2.velocity.y) > 1.4) && this.callback(e2);
    }
  }
  function w(e2, t2) {
    const n2 = new p(e2, t2);
    n2.addEvents(), u.get(e2) || u.set(e2, new Map()), u.get(e2).set(t2, n2);
  }
  function b(e2, t2) {
    if (!(e2 instanceof HTMLElement))
      throw Error("element must be an instance HTMLElement");
    const n2 = u.get(e2);
    if (n2)
      if (t2) {
        const e3 = n2.get(t2);
        e3 && e3.removeEvents(), n2.delete(t2);
      } else
        n2.forEach((e3) => e3.removeEvents()), u.delete(e2);
  }
  window.MDWSwipe = {
    addSwipeListener: w,
    removeSwipeListener: b
  };
  new class {
    constructor() {
      this.routes = {}, this.classReference = {}, this.intercepter = void 0, this.pageClassnameRegex = /class\s(.*)\sextends/, this.bound_resolve = this._resolve.bind(this), this.PARAMETER_REGEXP = /([:*])(\w+)/g, this.WILDCARD_REGEXP = /\*/g, this.REPLACE_VARIABLE_REGEXP = "([^/]+)", this.REPLACE_WILDCARD = "(?:.*)", this.FOLLOWED_BY_SLASH_REGEXP = "(?:/$|$)", this.MATCH_REGEXP_FLAGS = "", this._transitionPages = false, this.bound_onTransitionComplete = this._onTransitionComplete.bind(this), this.__mutationObserver = new MutationObserver(() => {
        window.activePage.connectedCallback && window.activePage.connectedCallback(), this._stopWatchingForConnect();
      });
    }
    init() {
      window.addEventListener("hashchange", this.bound_resolve), window.addEventListener("DOMContentLoaded", () => {
        this._resolve(void 0, true);
      });
    }
    interceptRouteChange(e2) {
      "function" == typeof e2 && (this.intercepter = e2);
    }
    get transitionPages() {
      return this._transitionPages;
    }
    set transitionPages(e2) {
      this._transitionPages = !!e2;
    }
    get path() {
      let e2 = window.location.hash.replace(/.*#/, "");
      return e2.indexOf("?") > -1 && (e2 = e2.split("?")[0]), "/" !== e2.charAt(0) && (e2 = "/" + e2), e2;
    }
    get urlParameters() {
      const e2 = this._match(this.path);
      return e2 ? e2.params : {};
    }
    get searchParamters() {
      return this._extractSearchParameters(this._clean(window.location.href)).split(",").filter((e2) => !!e2).reduce((e2, t2) => {
        const n2 = t2.split("=");
        return e2[n2[0]] = n2[1], e2;
      }, {});
    }
    set hash(e2) {
      window.location = `#/${e2}`;
    }
    setSearchParamter(e2, t2) {
      const n2 = this.searchParamters;
      null == t2 ? delete n2[e2] : n2[e2] = t2;
      let i2 = window.location.href.split("?")[0];
      Object.keys(n2).length > 0 && (i2 += "?" + Object.keys(n2).map((e3) => `${e3}=${n2[e3]}`).join(",")), window.history.pushState({
        path: i2
      }, "", i2);
    }
    removeSearchParamter(e2) {
      this.setSearchParamter(e2, void 0);
    }
    addTransitionCSS() {
      this._addTransitionCSSAdded || (document.body.insertAdjacentHTML("beforebegin", "<style>\n      page-container {\n        display: flex;\n      }\n      page-container.in-transition {\n        overflow-x: hidden;\n      }\n      page-render-block {\n        width: 100%;\n        flex-shrink: 0;\n        opacity: 1;\n      }\n      page-render-block.before-transition-page-out {\n        pointer-events: none;\n        user-select: none;\n      }\n      page-render-block.before-transition-page-in {\n        transform: scale(0.9) translateX(-100%);\n        opacity: 0;\n      }\n      page-render-block.transition-page-out {\n        transform: scale(0.9);\n        opacity: 0;\n        transition: opacity .16s linear,\n                    transform .26s cubic-bezier(0,0,.2,1);\n      }\n      page-render-block.transition-page-in {\n        transform: scale(1) translateX(-100%);\n        transform-origin: -50% 0;\n        opacity: 1;\n        transition: opacity .18s linear,\n                    transform .26s cubic-bezier(0,0,.2,1);\n      }\n    </style>"), this._addTransitionCSSAdded = true);
    }
    addPageHideCSS() {
      this._addPageHideCSSAdded || (document.body.insertAdjacentHTML("beforebegin", "<style>\n      .mdw-hide-non-page-container {\n        display: none;\n      }\n    </style>"), this._addPageHideCSSAdded = true);
    }
    addPageClass(e2, t2) {
      const n2 = this.getClassName(e2, t2);
      t2 && this.addPageClassPath(e2, t2), (e2.routes || []).forEach((i2) => {
        if (t2 !== i2) {
          if (this.routes[i2])
            throw Error(`Path already exists: ${i2}`);
          this.classReference[n2] = e2, this.routes[i2] = n2;
        }
      });
    }
    addPageClassPath(e2, t2) {
      const n2 = this.getClassName(e2, t2);
      if (this.routes[t2])
        throw Error(`Path already exists: ${optionalPath}`);
      this.classReference[n2] = e2, this.routes[t2] = n2;
    }
    getClassName(e2, t2) {
      const n2 = this.pageClassnameRegex.exec(e2);
      return n2 ? n2[1] : t2.split("/").pop().replace(".js", "");
    }
    setRoot(e2) {
      if (this.routes[e2]) {
        const t2 = this.classReference[this.routes[e2]];
        this.addPageClassPath(t2, "/");
      } else
        this.addPageClassPath(e2, "/");
    }
    set404({Class: e2}) {
      e2 && (this._notFoundRouteClass = e2);
    }
    showPageOnly() {
      const e2 = document.querySelector("page-container"), t2 = document.documentElement;
      let n2, i2 = e2, s2 = e2;
      for (; i2.parentNode && i2.parentNode !== t2; ) {
        for (i2 = i2.parentNode, n2 = i2.firstChild; n2; )
          1 === n2.nodeType && n2 !== s2 && n2.classList.add("mdw-hide-non-page-container"), n2 = n2.nextSibling;
        s2 = i2;
      }
      this.addPageHideCSS(), this._isShowingPageOnly = true;
    }
    undoShowPageOnly() {
      true === this._isShowingPageOnly && ([...document.querySelectorAll(".mdw-hide-non-page-container") || []].forEach((e2) => e2.classList.remove("mdw-hide-non-page-container")), this._isShowingPageOnly = false);
    }
    _resolve(e2, t2 = false) {
      const {oldURL: n2, newURL: i2} = e2 || {};
      if (false === t2 && void 0 !== n2 && n2 === i2)
        return;
      const s2 = this.intercepter ? this.intercepter(i2, n2) : void 0;
      if (s2 && s2.then && "function" == typeof s2.then && console.error("you cannot return a Promise to the router.intercepter callback. Expecting either true or false"), false === s2)
        return void window.history.go();
      const o2 = this.path, r2 = this._match(o2);
      if (!r2)
        return this._notFoundRouteClass ? this._changePage(this._notFoundRouteClass) : console.warn("no page found and no default not found page setup");
      let a2 = o2;
      if (t2 && this._pageIsPreRendered())
        return;
      let d2 = this._extractSearchParameters(this._clean(window.location.href));
      if (d2 && (a2 += `?${d2}`), void 0 !== n2) {
        const e3 = n2.length > i2.length ? n2.replace(i2, "") : i2.replace(n2, "");
        if ("" === e3 || "#/" === e3)
          return;
      }
      return this._changePage(r2);
    }
    _watchForConnect() {
      const e2 = document.querySelector("page-render-block:not(.previous)");
      this.__mutationObserver.observe(e2, {
        childList: true
      });
    }
    _stopWatchingForConnect() {
      this.__mutationObserver.disconnect();
    }
    resetPageScroll() {
      const e2 = document.querySelector("mdw-page mdw-page-content");
      if (e2 && e2.scrollTop > 0)
        return e2.scrollTop = 0;
      const t2 = document.querySelector("mdw-page mdw-content");
      if (t2 && t2.scrollTop > 0)
        return t2.scrollTop = 0;
      const n2 = document.querySelector("mdw-page");
      if (n2 && n2.scrollTop > 0)
        return n2.scrollTop = 0;
      const i2 = document.querySelector("body");
      if (i2.scrollTop > 0)
        return i2.scrollTop = 0;
      const s2 = document.documentElement;
      return s2.scrollTop > 0 ? s2.scrollTop = 0 : void 0;
    }
    _changePage({Class: e2}) {
      if (!e2)
        throw Error("no class found");
      const t2 = document.querySelector("page-container");
      if (!t2)
        throw Error("<page-container> required for router to work");
      this._stopWatchingForConnect(), this.undoShowPageOnly();
      const n2 = document.querySelector("page-render-block");
      if (!n2)
        return t2.appendChild(document.createElement("page-render-block")), window.activePage = new e2(), this._watchForConnect(), window.activePage.render(), void this.resetPageScroll();
      if (!this._transitionPages)
        return window.activePage.disconnectedCallback(), window.activePage = new e2(), this._watchForConnect(), window.activePage.render(), void this.resetPageScroll();
      n2.classList.add("previous"), n2.classList.add("before-transition-page-out"), window.activePage._disableRender = true, window.activePage.disconnectedCallback();
      const i2 = document.createElement("page-render-block");
      i2.classList.add("before-transition-page-in"), n2.insertAdjacentElement("afterend", i2);
      const s2 = new e2();
      window.activePage = s2, this._watchForConnect(), s2.render();
      const o2 = document.querySelector("title");
      o2 && (o2.innerText = s2.title), t2.classList.add("in-transition"), n2.classList.add("transition-page-out"), i2.classList.add("transition-page-in"), n2.addEventListener("transitionend", this.bound_onTransitionComplete), i2.addEventListener("transitionend", this.bound_onTransitionComplete);
    }
    _onTransitionComplete({target: e2}) {
      e2.removeEventListener("transitionend", this.bound_onTransitionComplete), e2.classList.contains("transition-page-out") ? e2.remove() : (e2.classList.remove("before-transition-page-in"), e2.classList.remove("transition-page-in")), document.querySelector("page-render-block.previous") || document.querySelector("page-render-block.next") || document.querySelector("page-container").classList.remove("in-transition");
    }
    _pageIsPreRendered() {
      const e2 = document.querySelector("page-render-block");
      return !!(e2 && e2.children.length > 0);
    }
    _clean(e2) {
      return e2 instanceof RegExp ? s : e2.replace(/\/+$/, "").replace(/^\/+/, "/");
    }
    _extractSearchParameters(e2) {
      return e2.split(/\?(.*)?$/).slice(1).join("");
    }
    _match(e2) {
      let t2 = this._findMatchedRoutes(e2);
      return !!t2.length && (1 === t2.length ? t2[0] : t2.sort((e3, t3) => t3.params ? 1 : -1)[0]);
    }
    _findMatchedRoutes(e2) {
      return Object.keys(this.routes).map((t2) => {
        const n2 = this.routes[t2], {regexp: i2, paramNames: s2} = this._replaceDynamicURLParts(this._clean(t2)), o2 = e2.replace(/^\/+/, "/").match(i2), r2 = this._regExpResultToParams(o2, s2), a2 = this.classReference[n2];
        return !!o2 && {
          match: o2,
          route: t2,
          params: r2,
          className: n2,
          Class: a2
        };
      }).filter((e3) => e3 && "" !== e3.match[0]);
    }
    _replaceDynamicURLParts(e2) {
      let t2 = [], n2 = "";
      return n2 = e2 instanceof RegExp ? e2 : new RegExp(this._clean(e2).replace(this.PARAMETER_REGEXP, (e3, n3, i2) => (t2.push(i2), this.REPLACE_VARIABLE_REGEXP)).replace(this.WILDCARD_REGEXP, this.REPLACE_WILDCARD) + this.FOLLOWED_BY_SLASH_REGEXP, this.MATCH_REGEXP_FLAGS), {
        regexp: n2,
        paramNames: t2
      };
    }
    _regExpResultToParams(e2, t2) {
      return 0 === t2.length ? null : e2 ? e2.slice(1, e2.length).reduce((e3, n2, i2) => (null === e3 && (e3 = {}), e3[t2[i2]] = decodeURIComponent(n2), e3), null) : null;
    }
  }();
  class g extends HTMLElement {
    constructor() {
      super();
    }
    get _templateId() {
      return `${this.nodeName.toLowerCase()}--template`;
    }
    cloneTemplate(e2) {
      let t2 = document.getElementById(this._templateId);
      t2 || (t2 = this._createTemplate());
      const n2 = t2.content, i2 = this.shadowRoot ? this.shadowRoot : this.attachShadow({
        mode: "open"
      }), s2 = n2.cloneNode(true);
      e2 && (!this.__isBuildProcess && this.beforeRender && this.beforeRender(), s2.querySelector("render-block").innerHTML = this.template()), i2.appendChild(s2), !this.__isBuildProcess && this.afterRender && this.afterRender();
    }
    _createTemplate() {
      const e2 = document.createElement("template");
      return e2.setAttribute("id", this._templateId), e2.innerHTML = `
        <style>
          ${this.styles()}
        </style>
        <render-block>
          ${this.template()}
        </render-block>
    `, document.body.insertAdjacentElement("beforeend", e2), e2;
    }
    connectedCallback() {
      !this.__isBuildProcess && this.addEvents && this.addEvents();
    }
    disconnectedCallback() {
      !this.__isBuildProcess && this.removeEvents && this.removeEvents();
    }
    render() {
      if (this.__isBuildProcess)
        return;
      const e2 = this.shadowRoot.querySelector("render-block");
      if (!e2)
        throw Error("Could not find <render-block>");
      this.removeEvents && this.removeEvents(), this.beforeRender && this.beforeRender(), e2.innerHTML = this.template(), this.afterRender && this.afterRender(), this.addEvents && this.addEvents();
    }
    beforeRender() {
    }
    afterRender() {
    }
    addEvents() {
    }
    removeEvents() {
    }
    styles() {
    }
    externalStyles() {
    }
    template() {
    }
  }
  const _ = new class {
    constructor() {
      this.queue = [];
    }
    add(e2, t2) {
      this.queue.push({
        el: e2,
        resolver: t2
      }), this.handleQueue();
    }
    remove(e2) {
      this.current && this.current.el === e2 ? (this.current.resolver(false), e2._dissmiss()) : this.queue = this.queue.filter((t2) => t2.el !== e2);
    }
    accept(e2) {
      this.current && this.current.el === e2 ? (this.current.resolver(true), e2._dissmiss()) : this.queue = this.queue.filter((t2) => t2.el !== e2);
    }
    handleQueue() {
      0 !== this.queue.length && (this.current || (this.current = this.queue.shift(), this.current.el._show(), this.current.el.addEventListener("close", () => {
        this.current = void 0, setTimeout(() => {
          this.handleQueue();
        }, 300);
      })));
    }
    create({message: e2, dismissLabel: t2 = "dismiss", acceptLabel: n2 = null, template: i2, parent: s2}) {
      if (!e2 && !i2)
        throw Error("Either `message` or `template` is required");
      if (!i2 && !t2 && !n2)
        throw Error("When not using a `template` you are required to provide either a `dismissLabel` or an `acceptLabel`");
      const o2 = a.uid();
      i2 || (i2 = this.template(e2, t2, n2, o2));
      let r2 = s2 || document.querySelector("mdw-page > mdw-top-app-bar");
      r2 || (r2 = document.querySelector("mdw-page")), r2 || (r2 = document.querySelector("body"));
      let d2, l2 = void 0;
      "MDW-TOP-APP-BAR" === r2.nodeName ? (r2.insertAdjacentHTML("afterend", i2), l2 = document.querySelector(`mdw-banner#${o2}`)) : (r2.insertAdjacentHTML("afterbegin", i2), l2 = document.querySelector(`mdw-banner#${o2}`));
      const c2 = new Promise((e3) => {
        d2 = e3;
      });
      return this.add(l2, d2), c2;
    }
    template(e2, t2, n2, i2) {
      return `
      <mdw-banner id="${i2}" class="mdw-elevation-1">
        <div>${e2}</div>
        <div>
          ${t2 ? `<mdw-button onclick="${i2}.dismiss()" class="mdw-secondary">${t2}</mdw-button>` : ""}
          ${n2 ? `<mdw-button onclick="${i2}.accept()" class="mdw-secondary">${n2}</mdw-button>` : ""}
        </div>
      </mdw-banner>
    `;
    }
  }();
  window.MDWBanner = _;
  var v = _;
  customElements.define("mdw-banner", class extends g {
    constructor() {
      super();
    }
    connectedCallback() {
      this.style.marginBottom = `-${this.clientHeight + 1}px`;
    }
    show() {
      v.add(this);
    }
    dismiss() {
      v.remove(this);
    }
    accept() {
      v.accept(this);
    }
    _show() {
      this.classList.add("mdw-show");
    }
    _dissmiss() {
      const e2 = this;
      e2.addEventListener(a.transitionEventName, function t2() {
        e2.removeEventListener(a.transitionEventName, t2), e2.remove();
      }), this.classList.add("mdw-dismiss"), this.dispatchClose();
    }
    dispatchClose() {
      this.dispatchEvent(new CustomEvent("close"));
    }
  }), customElements.define("mdw-bottom-navigation", class extends g {
    constructor() {
      super(), !o && this.hasAttribute("mdw-mobile-only") ? (this.style.display = "none", this.style.pointerEvents = "none") : (this.bound_routeChange = this.routeChange.bind(this), document.body.classList.add("mdw-has-bottom-navigation"));
    }
    connectedCallback() {
      window.addEventListener("hashchange", this.bound_routeChange), window.addEventListener("DOMContentLoaded", this.bound_routeChange);
    }
    disconnectedCallback() {
      window.removeEventListener("hashchange", this.bound_routeChange), window.removeEventListener("DOMContentLoaded", this.bound_routeChange);
    }
    get path() {
      let e2 = window.location.hash.replace(/.*#/, "");
      return e2.indexOf("?") > -1 && (e2 = e2.split("?")[0]), "/" !== e2.charAt(0) && (e2 = "/" + e2), e2;
    }
    routeChange() {
      this.querySelectorAll(".mdw-current-link").forEach((e3) => e3.classList.remove("mdw-current-link"));
      let e2 = this.querySelectorAll(`[href="#${this.path}"]`);
      e2 && 0 !== e2.length || (e2 = this.querySelectorAll(`[alt-href="#${this.path}"]`)), e2.forEach((e3) => e3.classList.add("mdw-current-link"));
    }
  });
  class f {
    constructor(e2 = {}) {
      if (this.RIPPLE_FADE_IN_DURATION = 200, this.RIPPLE_FADE_OUT_DURATION = 150, this.RIPPLE_STATE = {
        FADING_IN: "FADING_IN",
        VISIBLE: "VISIBLE",
        FADING_OUT: "FADING_OUT",
        HIDDEN: "HIDDEN"
      }, !e2.element)
        throw Error("requires config.element");
      if (!e2.triggerElement)
        throw Error("requires config.triggerElement");
      this.element = e2.element, this.triggerElement = [].concat(e2.triggerElement).filter((e3) => !!e3), this.centered = !!e2.centered, this.speedFactor = e2.speedFactor || 1, this.radius = e2.radius, this.color = e2.color || null, this.persistent = !!e2.persistent, this.activeRipples = new Set(), this.isMousedown = false, this.bound_mousesdown_ = this.mousesdown_.bind(this), this.bound_mouseup_ = this.mouseup_.bind(this), this.bound_mouseleave_ = this.mouseleave_.bind(this), this.triggerElement.forEach((e3) => {
        e3.addEventListener("mousedown", this.bound_mousesdown_);
      });
    }
    destroy() {
      this.triggerElement.forEach((e2) => {
        e2.removeEventListener("mousedown", this.bound_mousesdown_);
      });
    }
    mousesdown_(e2) {
      this.isMousedown = true, this.triggerElement.forEach((e3) => {
        e3.addEventListener("mouseup", this.bound_mouseup_), e3.addEventListener("mouseleave", this.bound_mouseleave_);
      }), this.fadeInRipple(e2.pageX, e2.pageY);
    }
    mouseup_(e2) {
      this.isMousedown = false, this.activeRipples.forEach((e3) => {
        e3.config.persistent || e3.state !== this.RIPPLE_STATE.VISIBLE || e3.fadeOut();
      }), this.triggerElement.forEach((e3) => {
        e3.removeEventListener("mouseup", this.bound_mouseup_), e3.removeEventListener("mouseleave", this.bound_mouseleave_);
      });
    }
    mouseleave_() {
      this.isMousedown && this.mouseup_();
    }
    fadeInRipple(e2, t2) {
      const n2 = this.element.getBoundingClientRect();
      if (this.centered)
        e2 = n2.left + n2.width / 2, t2 = n2.top + n2.height / 2;
      else {
        const n3 = this.getViewportScrollPosition();
        e2 -= n3.left, t2 -= n3.top;
      }
      const i2 = this.radius || this.distanceToFurthestCorner(e2, t2, n2), s2 = this.RIPPLE_FADE_IN_DURATION * (1 / this.speedFactor), o2 = e2 - n2.left, r2 = t2 - n2.top, a2 = document.createElement("div");
      a2.classList.add("mdw-ripple-element"), a2.style.left = `${o2 - i2}px`, a2.style.top = `${r2 - i2}px`, a2.style.height = `${2 * i2}px`, a2.style.width = `${2 * i2}px`, a2.style.backgroundColor = this.color, a2.style.transitionDuration = `${s2}ms`, this.element.appendChild(a2), this.enforceStyleRecalculation(a2), a2.style.transform = "scale(1)";
      let d2 = {
        config: {
          centered: this.centered,
          tiggerElement: this.triggerElement,
          speedFactor: this.speedFactor,
          radius: i2,
          color: this.color,
          persistent: this.persistent,
          duration: s2
        },
        element: a2,
        fadeOut: () => l2(),
        state: this.RIPPLE_STATE.FADING_IN
      };
      const l2 = () => {
        this.fadeOutRipple(d2);
      };
      this.activeRipples.add(d2), setTimeout(() => {
        d2.state = this.RIPPLE_STATE.VISIBLE, this.persistent || this.isMousedown || d2.fadeOut();
      }, s2);
    }
    fadeOutRipple(e2) {
      if (!this.activeRipples.delete(e2))
        return;
      const t2 = e2.element;
      t2.style.transitionDuration = `${this.RIPPLE_FADE_OUT_DURATION}ms`, t2.style.opacity = "0", e2.state = this.RIPPLE_STATE.FADING_OUT, setTimeout(() => {
        e2.state = this.RIPPLE_STATE.HIDDEN, t2.parentNode.removeChild(t2);
      }, this.RIPPLE_FADE_OUT_DURATION);
    }
    distanceToFurthestCorner(e2, t2, n2) {
      const i2 = Math.max(Math.abs(e2 - n2.left), Math.abs(e2 - n2.right)), s2 = Math.max(Math.abs(t2 - n2.top), Math.abs(t2 - n2.bottom));
      return Math.sqrt(i2 * i2 + s2 * s2);
    }
    getViewportScrollPosition() {
      const e2 = document.documentElement.getBoundingClientRect();
      return {
        top: -e2.top || document.body.scrollTop || window.scrollY || document.documentElement.scrollTop || 0,
        left: -e2.left || document.body.scrollLeft || window.scrollX || document.documentElement.scrollLeft || 0
      };
    }
    enforceStyleRecalculation(e2) {
      window.getComputedStyle(e2).getPropertyValue("opacity");
    }
  }
  customElements.define("mdw-button", class extends g {
    constructor() {
      super(), this.bound_asyncClick = this.asyncClick.bind(this), this.bound_hrefClick = this.hrefClick.bind(this), this.bound_checkHREFActive = this.checkHREFActive.bind(this), this.cloneTemplate(), this.setupAsync(), this.connectHREF();
    }
    connectedCallback() {
      this.ripple = new f({
        element: this.shadowRoot.querySelector(".mdw-ripple"),
        triggerElement: this
      });
    }
    disconnectedCallback() {
      this.ripple.destroy(), this.removeEventListener("click", this.bound_asyncClick), this.removeEventListener("click", this.bound_hrefClick), window.removeEventListener("hashchange", this.bound_checkHREFActive);
    }
    get spinnerContainer() {
      return this._spinnerContainer || (this._spinnerContainer = this.shadowRoot.querySelector(".mdw-spinner-container")), this._spinnerContainer;
    }
    get pending() {
      return this._pending;
    }
    setupAsync() {
      this.hasAttribute("mdw-async") && this.addEventListener("click", this.bound_asyncClick);
    }
    resolve() {
      false !== this._pending && (this._pending = false, this.hideSpinner());
    }
    asyncClick(e2) {
      true !== this._pending && (this._pending = true, this.showSpinner());
    }
    showSpinner() {
      this._showSpinner = true, this.classList.add("mdw-show-spinner");
      const e2 = this.classList.contains("mdw-primary") || this.classList.contains("mdw-secondary") || this.classList.contains("mdw-error");
      this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="24" class="${e2 ? "mdw-white" : "mdw-grey"}" style="position: absolute; left: calc(50% - 12px); top: 6px;"></mdw-circular-progress>`;
    }
    hideSpinner() {
      this._showSpinner = false, this.classList.remove("mdw-show-spinner"), this.spinnerContainer.innerHTML = "";
    }
    connectHREF() {
      this.hasAttribute("href") && (this.checkHREFActive(), window.addEventListener("hashchange", this.bound_checkHREFActive), this.addEventListener("click", this.bound_hrefClick));
    }
    checkHREFActive() {
      if (!this.hasAttribute("href"))
        return;
      const e2 = document.location.href, t2 = document.location.hash;
      e2 === this.getAttribute("href") || e2 === this.getAttribute("href-alt") || t2 === this.getAttribute("href") || t2 === this.getAttribute("href-alt") ? this.setAttribute("active", "active") : this.removeAttribute("active");
    }
    hrefClick() {
      "_blank" !== this.getAttribute("target") ? document.location.href = this.getAttribute("href") : window.open(this.getAttribute("href"), "_blank");
    }
    template() {
      return '\n      <span class="text"><slot></slot></span>\n      <span class="mdw-spinner-container"></span>\n      <div class="mdw-ripple mdw-button-ripple"></div>\n    ';
    }
    styles() {
      return '\n      :host {\n        user-select: none;\n        -webkit-user-select: none;\n        align-items: center;\n        border: none;\n        box-sizing: border-box;\n        display: inline-flex;\n        font-size: 0.875rem;\n        font-weight: 500;\n        justify-content: center;\n        letter-spacing: 0.08929em;\n        outline: none;\n        overflow: hidden;\n        position: relative;\n        text-decoration: none;\n        text-transform: uppercase;\n        vertical-align: middle;\n        will-change: transform, opacity;\n        margin: 0;\n        background-color: transparent;\n        white-space: nowrap;\n\n        border-radius: 4px;\n        line-height: 2.25rem;\n        padding: 0 8px 0 8px;\n        height: 36px;\n        min-width: 64px;\n\n        color: var(--mdw-theme-on-primary);\n      }\n\n      :host-context(.mdw-density-comfortable),\n      :host(.mdw-density-comfortable) {\n        height: 28px;\n        margin-top: 0;\n        margin-bottom: 0;\n        padding: 0 8px 0 8px;\n      }\n\n      :host-context(.mdw-density-compact),\n      :host(.mdw-density-compact) {\n        height: 24px;\n        margin-top: 0;\n        margin-bottom: 0;\n        padding: 0 4px 0 4px;\n      }\n\n      :host(.mdw-icon):host-context(.mdw-density-comfortable),\n      :host(.mdw-density-comfortable.mdw-icon) {\n        height: 28px;\n        width: 28px;\n        margin-top: 0;\n        margin-bottom: 0;\n      }\n\n      :host(.mdw-icon):host-context(.mdw-density-compact),\n      :host(.mdw-density-compact.mdw-icon) {\n        height: 24px;\n        width: 24px;\n        margin-top: 0;\n        margin-bottom: 0;\n      }\n\n      :host-context(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress,\n      :host(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress {\n        top: 2px !important;\n      }\n\n      :host-context(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress,\n      :host(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress {\n        top: 0 !important;\n      }\n\n\n      :host::before,\n      :host::after {\n        position: absolute;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: "";\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        background-color: var(--mdw-theme-foreground);\n      }\n\n      :host::before {\n        z-index: 1;\n        transition: opacity 15ms linear,\n                    background-color 15ms linear;\n      }\n\n      :host(:hover) {\n        cursor: pointer;\n      }\n\n      :host([disabled]) {\n        background-color: transparent !important;\n        color: var(--mdw-theme-text-disabled-on-background);\n        cursor: default;\n        pointer-events: none;\n      }\n      :host::-moz-focus-inner {\n        padding: 0;\n        border: 0;\n      }\n\n      :host(:active) {\n        outline: none;\n      }\n\n      :host(.mdw-contained),\n      :host(.mdw-raised),\n      :host(.mdw-unelevated) {\n        background-color: var(--mdw-theme-background);\n        padding: 0 16px 0 16px;\n      }\n\n      :host(.mdw-contained)::before,\n      :host(.mdw-raised)::before,\n      :host(.mdw-unelevated)::before {\n        opacity: 0.08;\n      }\n\n      :host(.mdw-contained),\n      :host(.mdw-raised) {\n        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      }\n\n      :host(.mdw-contained:hover),\n      :host(.mdw-contained:focus),\n      :host(.mdw-raised:hover),\n      :host(.mdw-raised:focus) {\n        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n      }\n\n      :host(.mdw-contained:active),\n      :host(.mdw-raised:active) {\n        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n      }\n\n      :host(.mdw-contained[disabled]),\n      :host(.mdw-raised[disabled]) {\n        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n      }\n\n      :host(.mdw-outlined) {\n        border-color: rgba(0, 0, 0, 0.37);\n        line-height: inherit;\n        border-style: solid;\n        padding: 0 14px 0 14px;\n        border-width: 2px;\n      }\n\n      :host(.mdw-shaped) {\n        border-radius: var(--mdw-theme--button-shape-radius, 18px);\n      }\n\n      :host(.mdw-icon) {\n        border-radius: 50%;\n        min-width: 0;\n        width: 48px;\n        height: 48px;\n        padding: 12px;\n        line-height: 19px;\n      }\n      \n      :host(.mdw-icon) span.text {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        font-size: 0.75rem;\n        text-transform: none;\n      }\n\n      :host(.mdw-bottom-navigation) {\n        border-radius: 50%;\n        min-width: 0;\n        max-width: 100px;\n        width: 56px;\n        height: 56px;\n        padding: 28px;\n      }\n\n      :host(:not(.mdw-icon)) .text ::slotted(mdw-icon) {\n        display: inline-block;\n        height: 28px;\n        vertical-align: middle;\n      }\n\n      /*\n      :host(.mdw-icon) ::slotted(mdw-icon) {\n        line-height: 19px;\n        font-weight: normal;\n        font-style: normal;\n        font-size: 24px;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        white-space: nowrap;\n        word-wrap: normal;\n      }\n\n      ::slotted(mdw-icon) {\n        width: 18px;\n        height: 18px;\n        font-size: 18px;\n        margin-left: -4px;\n        margin-right: 2px;\n        vertical-align: top;\n        line-height: 36px;\n      }\n      */\n\n      :host ::slotted(svg.mdw-icon) {\n        fill: currentColor;\n      }\n\n\n      /* primary */\n      :host(.mdw-primary) {\n        color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-primary.mdw-contained),\n      :host(.mdw-primary.mdw-raised),\n      :host(.mdw-primary.mdw-unelevated)  {\n        background-color: var(--mdw-theme-primary);\n        color: var(--mdw-theme-text-primary-on-background);\n      }\n\n      :host(.mdw-primary.mdw-outlined) {\n        border-color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-primary)::before,\n      :host(.mdw-primary)::after {\n        background-color: var(--mdw-theme-primary);\n      }\n\n\n      /* secondary */\n\n      :host(.mdw-secondary) {\n        color: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-secondary.mdw-contained),\n      :host(.mdw-secondary.mdw-raised),\n      :host(.mdw-secondary.mdw-unelevated) {\n        background-color: var(--mdw-theme-secondary);\n        color: var(--mdw-theme-text-primary-on-background);\n      }\n\n      :host(.mdw-secondary.mdw-outlined) {\n        border-color: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-secondary)::before,\n      :host(.mdw-secondary)::after {\n        background-color: var(--mdw-theme-secondary);\n      }\n\n      /* error */\n\n      :host(.mdw-error) {\n        color: var(--mdw-theme-error);\n      }\n\n      :host(.mdw-error.mdw-contained),\n      :host(.mdw-error.mdw-raised),\n      :host(.mdw-error.mdw-unelevated) {\n        background-color: var(--mdw-theme-error);\n        color: var(--mdw-theme-text-primary-on-background);\n      }\n\n      :host(.mdw-error.mdw-outlined) {\n        border-color: var(--mdw-theme-error);\n      }\n\n      :host(.mdw-error)::before,\n      :host(.mdw-error)::after {\n        background-color: var(--mdw-theme-error);\n      }\n\n      :host(:not(.mdw-bottom-navigation):hover)::before {\n        opacity: 0.04;\n      }\n\n      :host(.mdw-show-spinner) span.text {\n        opacity: 0;\n      }\n\n      /* --- Ripple --- */\n\n      .mdw-ripple {\n        overflow: hidden;\n      }\n\n      .mdw-ripple.mdw-ripple-unbounded {\n        overflow: visible;\n      }\n\n      .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-on-primary--rgb), 0.16);\n        position: absolute;\n        border-radius: 50%;\n        pointer-events: none;\n        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n        transform: scale(0);\n      }\n\n      .mdw-button-ripple,\n      .mdw-button-focus-overlay {\n        border-radius: inherit;\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        pointer-events: none;\n      }\n\n\n      :host(.mdw-primary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);\n      }\n\n      :host(.mdw-primary.mdw-contained) .mdw-ripple-element,\n      :host(.mdw-primary.mdw-raised) .mdw-ripple-element,\n      :host(.mdw-primary.mdw-unelevated) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n      }\n\n      :host(.mdw-secondary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);\n      }\n\n      :host(.mdw-secondary.mdw-contained) .mdw-ripple-element,\n      :host(.mdw-secondary.mdw-raised) .mdw-ripple-element,\n      :host(.mdw-secondary.mdw-unelevated) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n      }\n\n      :host(.error) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);\n      }\n\n      :host(.error.mdw-contained) .mdw-ripple-element,\n      :host(.error.mdw-raised) .mdw-ripple-element,\n      :host(.error.mdw-unelevated) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n      }\n\n\n      /* bottom navigation */\n      :host(.mdw-bottom-navigation) span.text {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        font-size: 12px;\n        text-transform: none;\n        line-height: 12px;\n      }\n    ';
    }
  }), customElements.define("mdw-card", class extends g {
    constructor() {
      super(), this.classList.add("mdw-elevation-1");
    }
  }), customElements.define("mdw-checkbox", class extends g {
    constructor() {
      super(), this.bound_handleClick = this.handleClick.bind(this), this.cloneTemplate(), this._defaultIcons(), this.state = "unchecked";
    }
    connectedCallback() {
      this.hasAttribute("indeterminate") && (this.indeterminate = true), this.hasAttribute("checked") && (this.checked = true), this.hasAttribute("mdw-no-ripple") || (this.ripple = new f({
        element: this.shadowRoot.querySelector(".mdw-ripple"),
        triggerElement: [this],
        centered: true
      })), this.addEventListener("click", this.bound_handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.bound_handleClick), this.ripple.destroy();
    }
    static get observedAttributes() {
      return ["checked", "indeterminate"];
    }
    attributeChangedCallback(e2, t2, n2) {
      this[e2] = n2;
    }
    get state() {
      return this._state;
    }
    set state(e2) {
      ["checked", "unchecked", "indeterminate"].includes(e2) || console.error(`ivalid state fro checkbox "${e2}". Only excepts "checked", "unchecked", "indeterminate"`), this.setAttribute("mdw-state", e2);
      const t2 = this._state !== e2;
      this._state = e2, true === t2 && this.dispatchEvent(new Event("change"));
    }
    get checked() {
      return "checked" === this.state;
    }
    set checked(e2) {
      "" === e2 && (e2 = true), this.state = true === e2 ? "checked" : "unchecked";
    }
    get indeterminate() {
      return this.input.indeterminate;
    }
    set indeterminate(e2) {
      "" === e2 && (e2 = true), true === e2 && (this.state = "indeterminate");
    }
    toggle() {
      this.checked = !this.checked;
    }
    handleClick() {
      let e2 = false;
      switch (this.state) {
        case "indeterminate":
          this.state = "checked", e2 = true;
          break;
        case "checked":
          this.state = "unchecked", e2 = true;
          break;
        case "unchecked":
          this.state = "checked", e2 = true;
      }
    }
    _defaultIcons() {
      0 === this.children.length && this.insertAdjacentHTML("afterbegin", "\n        <mdw-icon mdw-checked>check_box</mdw-icon>\n        <mdw-icon mdw-unchecked>check_box_outline_blank</mdw-icon>\n        <mdw-icon mdw-indeterminate>indeterminate_check_box</mdw-icon>\n      ");
    }
    template() {
      return '\n      <slot></slot>\n      <div class="mdw-ripple mdw-checkbox-ripple"></div>\n    ';
    }
    styles() {
      return '\n      :host {\n        --mdw-checkbox-size: 24px;\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-box-sizing: content-box;\n        box-sizing: content-box;\n        cursor: pointer;\n        display: inline-block;\n        position: relative;\n        vertical-align: bottom;\n        white-space: nowrap;\n        cursor: pointer;\n\n        width: var(--mdw-checkbox-size);\n        height: var(--mdw-checkbox-size);\n        line-height: 0;\n        padding: 8px 0;\n      }\n\n      :host(.mdw-no-padding) {\n        padding: 0;\n      }\n\n      :host([disabled]) {\n        pointer-events: none;\n        cursor: not-allowed;\n        opacity: 0.5;\n      }\n\n      :host-context(.mdw-density-comfortable),\n      :host(.mdw-density-comfortable) {\n        padding: 9px;\n        margin: 0;\n      }\n\n      :host-context(.mdw-density-compact),\n      :host(.mdw-density-compact) {\n        padding: 5px;\n        margin: 0;\n      }\n\n      ::slotted(mdw-icon) {\n        position: absolute;\n        user-select: none;\n        outline: none;\n        font-size: var(--mdw-checkbox-size);\n      }\n\n      :host(.mdw-large) {\n        --mdw-checkbox-size: 48px;\n      }\n\n      :host(.mdw-primary) ::slotted(mdw-icon) {\n        color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-secondary) ::slotted(mdw-icon) {\n        color: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-error) ::slotted(mdw-icon) {\n        color: var(--mdw-theme-error);\n      }\n      \n\n      /* --- state: checked --- */\n      :host([mdw-state="checked"]) ::slotted(mdw-icon[mdw-unchecked]),\n      :host([mdw-state="checked"]) ::slotted(mdw-icon[mdw-indeterminate]) {\n        display: none;\n      }\n\n      /* --- state: unchecked --- */\n      :host([mdw-state="unchecked"]) ::slotted(mdw-icon[mdw-checked]),\n      :host([mdw-state="unchecked"]) ::slotted(mdw-icon[mdw-indeterminate]) {\n        display: none;\n      }\n\n      /* --- state: indeterminate --- */\n      :host([mdw-state="indeterminate"]) ::slotted(mdw-icon[mdw-checked]),\n      :host([mdw-state="indeterminate"]) ::slotted(mdw-icon[mdw-unchecked]) {\n        display: none;\n      }\n\n\n      /* --- Ripple --- */\n\n      .mdw-ripple {\n        overflow: hidden;\n      }\n\n      .mdw-ripple.mdw-ripple-unbounded {\n        overflow: visible;\n      }\n\n      .mdw-ripple-element {\n        position: absolute;\n        border-radius: 50%;\n        pointer-events: none;\n        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n        transform: scale(0);\n        background-color: rgba(var(--mdw-theme-on-background--rgb), 0.16);\n      }\n\n      .mdw-checkbox-ripple {\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        border-radius: 50%;\n        z-index: 1;\n        pointer-events: none;\n        overflow: visible;\n      }\n\n      :host(.mdw-primary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);\n      }\n\n      :host(.mdw-secondary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);\n      }\n\n      :host(.mdw-error) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);\n      }\n    ';
    }
  }), customElements.define("mdw-circular-progress", class extends g {
    constructor() {
      super(), this.insertedDiameters = [], this.cloneTemplate();
    }
    connectedCallback() {
      this.diameter = this.getAttribute("mdw-diameter") || 100, this.render(), this.style.width = this.style.height = this.diameter + "px", this.value && (this.value = this.value);
    }
    static get observedAttributes() {
      return ["value"];
    }
    attributeChangedCallback(e2, t2, n2) {
      this[e2] = n2;
    }
    get diameter() {
      return this._diameter;
    }
    set diameter(e2) {
      this._diameter = parseInt(("" + e2).replace("px", "")), this.insertedDiameters[this._diameter] || (this.insertedDiameters.push(this._diameter), this.shadowRoot.querySelector("style").sheet.insertRule(this._getAnimationText(), 0));
    }
    get svg() {
      return this._svg || (this._svg = this.shadowRoot.querySelector("svg")), this._svg;
    }
    get strokeWidth() {
      return this._strokeWidth || this.diameter / 10;
    }
    set strikeWidth(e2) {
      this._strokeWidth = parseInt(("" + e2).replace("px", ""));
    }
    get value() {
      return this.getAttribute("value");
    }
    set value(e2) {
      this._value = Math.max(0, Math.min(100, parseInt(("" + e2).replace("px", "")))), void 0 !== this.diameter && (this.circle.style.strokeDashoffset = this._strokeCircumference * (100 - this._value) / 100 + "px");
    }
    get mode() {
      return "determinate" === this.getAttribute("mdw-mode") ? "determinate" : "indeterminate";
    }
    get circle() {
      return this._circle || (this._circle = this.shadowRoot.querySelector("circle")), this._circle;
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
      return "\n     @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n        0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n        12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n        12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n        25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n        25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n        37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n        37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n        50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n        50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n        62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n        62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n        75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n        75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n        87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n        87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n        100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n      }\n    ";
    }
    _getAnimationText() {
      return this.INDETERMINATE_ANIMATION_TEMPLATE.replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`).replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`).replace(/DIAMETER/g, `${this.diameter}`);
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
      return "\n      :host {\n        display: block;\n        position: relative;\n      }\n\n      svg {\n        position: absolute;\n        transform: rotate(-90deg);\n        top: 0;\n        left: 0;\n        transform-origin: center;\n        overflow: visible;\n      }\n\n      circle {\n        fill: transparent;\n        transform-origin: center;\n        transition: stroke-dashoffset 225ms linear;\n        stroke: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-white) circle {\n        stroke: white;\n      }\n\n      :host(.mdw-grey) circle {\n        stroke: grey;\n      }\n\n      :host(.mdw-secondary) circle {\n        stroke: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-error) circle {\n        stroke: var(--mdw-theme-error);\n      }\n\n      :host([mdw-mode='indeterminate']) {\n        animation: mat-progress-spinner-linear-rotate 2000ms linear infinite;\n      }\n\n      :host([mdw-mode='indeterminate']) circle {\n        transition-property: stroke;\n        animation-duration: 4000ms;\n        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n        animation-iteration-count: infinite;\n      }\n\n      @keyframes mat-progress-spinner-linear-rotate {\n        0%       { transform: rotate(0deg); }\n        100%     { transform: rotate(360deg); }\n      }\n\n      @keyframes mat-progress-spinner-stroke-rotate-100 {\n        0% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotate(0);\n        }\n        12.5% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotate(0);\n        }\n        12.5001% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n        25% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n        25.0001% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotate(270deg);\n        }\n        37.5% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotate(270deg);\n        }\n        37.5001% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n        50% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n        50.0001% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotate(180deg);\n        }\n        62.5% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotate(180deg);\n        }\n        62.5001% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n        75% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n        75.0001% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotate(90deg);\n        }\n        87.5% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotate(90deg);\n        }\n        87.5001% {\n          stroke-dashoffset: 56.5486677px;\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n        100% {\n          stroke-dashoffset: 268.606171575px;\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n      }\n    ";
    }
  });
  const y = new class {
    constructor() {
      this.currentDialog = null;
    }
    open({title: e2, message: t2, okLabel: n2, cancelLabel: i2, position: s2 = "center center", clickOutsideClose: o2 = false}) {
      return new Promise((r2) => {
        const d2 = a.uid("dialog"), l2 = this.template({
          id: d2,
          title: e2,
          message: t2,
          okLabel: n2,
          cancelLabel: i2,
          position: s2
        });
        document.body.insertAdjacentHTML("beforeend", l2);
        const c2 = document.querySelector(`#${d2}`), h2 = (e3) => {
          r2(e3.detail.ok), c2.removeEventListener("close", h2), c2.remove(), this.currentDialog = null;
        };
        c2.addEventListener("close", h2), c2.clickOutsideClose = o2, this.currentDialog = c2, requestAnimationFrame(() => {
          c2.open();
        });
      });
    }
    removeCurrent() {
      this.currentDialog.close();
    }
    template({id: e2, title: t2, message: n2, okLabel: i2, cancelLabel: s2, position: o2}) {
      return `
      <mdw-dialog id="${e2}">
        <mdw-panel mdw-position="${o2}">
          <mdw-dialog-container>
            ${t2 ? `<mdw-dialog-title>${t2}</mdw-dialog-title>` : ""}
            <mdw-dialog-content>${n2}</mdw-dialog-content>
            <mdw-dialog-actions>
              ${s2 ? `<mdw-button class="mdw-error" onclick="${e2}.close(false)">${s2}</mdw-button>` : ""}
              ${i2 ? `<mdw-button onclick="${e2}.close(true)">${i2}</mdw-button>` : ""}
            </mdw-dialog-actions>
          </mdw-dialog-container>
        </mdw-panel>
      </mdw-dialog>
    `;
    }
  }();
  window.MDWDialog = y;
  var k = y;
  customElements.define("mdw-dialog", class extends g {
    constructor() {
      super(), this.bound_onPanelClose = this.onPanelClose.bind(this), this.clickOutsideClose_ = false;
    }
    disconnectedCallback() {
      this.panel.removeEventListener("MDWPanel:closed", this.bound_onPanelClose), this.panel.remove(), this.backdrop && (this.backdrop.remove(), this.backdrop = void 0);
    }
    get panel() {
      return this._panel || (this._panel = this.querySelector("mdw-panel")), this._panel;
    }
    get position() {
      return this._position || "center center";
    }
    set position(e2) {
      this._position = e2;
    }
    get clickOutsideClose() {
      return this.clickOutsideClose_;
    }
    set clickOutsideClose(e2) {
      this.clickOutsideClose_ = e2;
    }
    open(e2 = false) {
      this._fromService = e2, this.panel.hoistToBody(), this.panel.setPosition(this.position), this.panel.addEventListener("MDWPanel:closed", this.bound_onPanelClose), this.backdrop = a.addBackdrop(this.panel, () => {
        true === this.clickOutsideClose && this.close();
      }), requestAnimationFrame(() => {
        this.panel.open();
      });
    }
    close(e2) {
      this.panel.close(), this.dispatchClose(e2);
    }
    onPanelClose() {
      if (!this._fromService)
        return this.panel.removeEventListener("MDWPanel:closed", this.bound_onPanelClose), void (this.backdrop && (this.backdrop.remove(), this.backdrop = void 0));
      this.remove();
    }
    dispatchClose(e2 = false) {
      this.dispatchEvent(new CustomEvent("close", {
        detail: {
          ok: e2
        }
      }));
    }
  }), customElements.define("mdw-fab", class extends g {
    constructor() {
      super(), this.bound_asyncClick = this.asyncClick.bind(this), this.cloneTemplate(), this.setupAsync();
    }
    connectedCallback() {
      this.ripple = new f({
        element: this.shadowRoot.querySelector(".mdw-ripple"),
        triggerElement: this
      });
    }
    disconnectedCallback() {
      this.ripple.destroy(), this.removeEventListener("click", this.bound_asyncClick);
    }
    template() {
      return '\n      <span class="text"><slot></slot></span>\n      <span class="mdw-spinner-container"></span>\n      <div class="mdw-ripple mdw-fab-ripple"></div>\n    ';
    }
    get dense() {
      return this.classList.contains("mdw-dense");
    }
    get spinnerContainer() {
      return this._spinnerContainer || (this._spinnerContainer = this.shadowRoot.querySelector(".mdw-spinner-container")), this._spinnerContainer;
    }
    set disabled(e2) {
      e2 || "" === e2 ? this.setAttribute("disabled", "disabled") : this.removeAttribute("disabled");
    }
    get pending() {
      return this.pending_;
    }
    setupAsync() {
      this.hasAttribute("mdw-async") && this.addEventListener("click", this.bound_asyncClick);
    }
    resolve() {
      false !== this.pending_ && (this.pending_ = false, this.hideSpinner());
    }
    asyncClick(e2) {
      true !== this.pending_ && (this.pending_ = true, this.showSpinner());
    }
    get spinnerStyle() {
      return this.dense ? "position: absolute; left: calc(50% - 12px); top: 8px;" : "position: absolute; left: calc(50% - 16px); top: 12px;";
    }
    get spinnerDiameter() {
      return this.dense ? 24 : 32;
    }
    showSpinner() {
      this._showSpinner = true, this.classList.add("mdw-show-spinner");
      const e2 = this.classList.contains("mdw-primary") || this.classList.contains("mdw-secondary") || this.classList.contains("mdw-error");
      this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="${this.spinnerDiameter}" class="${e2 ? "mdw-white" : "mdw-grey"}" style="${this.spinnerStyle}"></mdw-circular-progress>`;
    }
    hideSpinner() {
      this._showSpinner = false, this.classList.remove("mdw-show-spinner"), this.spinnerContainer.innerHTML = "";
    }
    styles() {
      return "\n      :host(.mdw-show-spinner) span.text {\n        opacity: 0;\n      }\n\n      :host-context(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress {\n        top: 3px !important;\n      }\n\n      :host-context(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress {\n        top: 0 !important;\n      }\n\n      /* --- Ripple --- */\n\n      .mdw-ripple {\n        overflow: hidden;\n      }\n\n      .mdw-ripple.mdw-ripple-unbounded {\n        overflow: visible;\n      }\n\n      .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n        position: absolute;\n        border-radius: 50%;\n        pointer-events: none;\n        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n        transform: scale(0);\n      }\n\n      .mdw-fab-ripple,\n      .mdw-fab-focus-overlay {\n        border-radius: inherit;\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        pointer-events: none;\n      }\n\n\n      :host(.mdw-primary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n      }\n\n      :host(.mdw-secondary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n      }\n\n      :host(.mdw-error) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n      }\n    ";
    }
  }), customElements.define("mdw-icon", class extends g {
    constructor() {
      super(), this.cloneTemplate(), this.hasAttribute("mdw-src") && this.render();
    }
    get src() {
      return this.getAttribute("mdw-src");
    }
    styles() {
      return "\n      :host {\n        font-family: 'Material Icons';\n        font-weight: normal;\n        font-style: normal;\n        font-size: 24px;\n        line-height: 1;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        white-space: nowrap;\n        word-wrap: normal;\n        direction: ltr;\n        font-feature-settings: 'liga';\n        -webkit-font-feature-settings: 'liga';\n        -webkit-font-smoothing: antialiased;\n      }\n\n      :host img {\n        width: 24px;\n        height: 24px;\n      }\n\n\n      :host(.mdw-primary) {\n        color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-secondary) {\n        color: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-error) {\n        color: var(--mdw-theme-error);\n      }\n    ";
    }
    template() {
      const e2 = this.src;
      return e2 ? `<img src="${e2}"></img>` : "<slot></slot>";
    }
  }), customElements.define("mdw-linear-progress", class extends g {
    constructor() {
      super(), this.cloneTemplate();
    }
    connectedCallback() {
      null === this.percent && this.classList.add("mdw-query");
    }
    static get observedAttributes() {
      return ["mdw-percent"];
    }
    attributeChangedCallback(e2, t2, n2) {
      switch (e2) {
        case "mdw-percent":
          this.percent = n2;
      }
    }
    get bar() {
      return this._bar || (this._bar = this.shadowRoot.querySelector(".mdw-bar")), this._bar;
    }
    get percent() {
      return this.getAttribute("mdw-percent");
    }
    set percent(e2) {
      e2 < 0 && (e2 = 0), e2 > 100 && (e2 = 100), this.bar.style.width = `${e2}%`;
    }
    template() {
      return '\n      <div class="mdw-bar"></div>\n    ';
    }
    styles() {
      return "\n      :host {\n        display: block;\n        position: relative;\n        width: 100%;\n        height: 4px;\n        padding-top: 0;\n        margin-bottom: 0;\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.18);\n      }\n\n      .mdw-bar {\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        width: 100%;\n        height: 4px;\n        background-color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-white) {\n        background-color: rgba(255, 255, 255, 0.18);\n      }\n\n      :host(.mdw-white) .mdw-bar {\n        background-color: white;\n      }\n\n      :host(.mdw-grey) {\n        background-color: rgba(50, 50, 50, 0.18);\n      }\n\n      :host(.mdw-grey) .mdw-bar {\n        background-color: grey;\n      }\n\n      :host(.mdw-secondary) {\n        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.18);\n      }\n\n      :host(.mdw-secondary) .mdw-bar {\n        background-color: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-error) {\n        background-color: rgba(var(--mdw-theme-error--rgb), 0.18);\n      }\n\n      :host(.mdw-error) .mdw-bar {\n        background-color: var(--mdw-theme-error);\n      }\n\n\n      :host(.mdw-query) .mdw-bar {\n        transition: all 0.2s linear;\n        animation: query .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);\n      }\n\n      @keyframes query {\n        0% {\n          opacity: 1;\n          transform: translateX(35%) scale(.3, 1);\n        }\n        100% {\n          opacity: 0;\n          transform: translateX(-50%) scale(0, 1);\n        }\n      }\n    ";
    }
  }), customElements.define("mdw-list", class extends g {
    constructor() {
      super(), this.selectedIndexes_ = [];
    }
    static get observedAttributes() {
      return ["mdw-select", "mdw-select-onclick"];
    }
    attributeChangedCallback(e2, t2, n2) {
      switch (e2) {
        case "mdw-select":
          this.selectType = n2;
          break;
        case "mdw-select-onclick":
          this.selectOnclick = null !== n2;
      }
    }
    set selectOnclick(e2) {
      this.selectOnclick_ = e2;
    }
    get selectOnclick() {
      return this.selectOnclick_;
    }
    set selectType(e2) {
      ["single", "multiple"].includes(e2) || console.warn('mdw-list[mdw-select] attribute - only accepts "single" or "multiple"'), this.selectType_ = e2;
    }
    get selectType() {
      return this.selectType_;
    }
    get selected() {
      return [].concat(this.selectedIndexes_);
    }
    deselectAll() {
      [...this.querySelectorAll("mdw-list-item")].forEach((e2) => e2.deselect()), this.selectedIndexes_ = [];
    }
    itemSelected(e2) {
      const t2 = Array.prototype.indexOf.call(this.children, e2) - 1;
      if ("single" === this.selectType_) {
        const e3 = [...this.children];
        this.selectedIndexes_.forEach((t3) => e3[t3].deselect()), this.selectedIndexes_ = [];
      }
      this.selectedIndexes_.push(t2), this.handleChange();
    }
    itemDeselected(e2) {
      const t2 = Array.prototype.indexOf.call(this.children, e2) - 1;
      this.selectedIndexes_.splice(this.selectedIndexes_.indexOf(t2), 1), this.handleChange();
    }
    handleChange() {
      this.dispatchEvent(new CustomEvent("change", this));
    }
    closeExpanded() {
      this.dispatchEvent(new CustomEvent("MDWList:closeExpanded", this));
    }
  }), customElements.define("mdw-list-item", class extends g {
    constructor() {
      super(), this.bound_hrefClick = this.hrefClick.bind(this), this.bound_onSelect = this.onSelect.bind(this), this.bound_onclickSelect = this.onclickSelect.bind(this), this.bound_checkHREFCurrent = this.checkHREFCurrent.bind(this);
    }
    get list() {
      return this.parentNode;
    }
    get expanded() {
      return this.querySelector("mdw-list-item-expanded");
    }
    get key() {
      return this.getAttribute("mdw-key");
    }
    isSelect() {
      return ["single", "multiple"].includes(this.list.selectType);
    }
    selectOnclick() {
      return !!this.list.selectOnclick;
    }
    connectedCallback() {
      this.connectRipple(), this.connectHREF(), this.connectSelect();
      const e2 = this.expanded;
      e2 && requestAnimationFrame(() => {
        e2.listItem = this;
      });
    }
    disconnectedCallback() {
      this.ripple && this.ripple.destroy(), this.removeEventListener("click", this.bound_hrefClick), this._selectEl && this._selectEl.removeEventListener("change", this.bound_onSelect), this.removeEventListener("click", this.bound_onclickSelect), window.removeEventListener("hashchange", this.bound_checkHREFCurrent);
    }
    expand() {
      const e2 = this.expanded;
      e2 && e2.open();
    }
    connectRipple() {
      const e2 = this.querySelector(".mdw-ripple");
      e2 && (this.ripple = new f({
        element: e2,
        triggerElement: this
      }), this.classList.add("mdw-has-ripple"));
    }
    connectHREF() {
      this.hasAttribute("href") && (this.checkHREFCurrent(), window.addEventListener("hashchange", this.bound_checkHREFCurrent), this.addEventListener("click", this.bound_hrefClick));
    }
    checkHREFCurrent() {
      if (!this.hasAttribute("href"))
        return;
      const e2 = document.location.href, t2 = document.location.hash;
      e2 === this.getAttribute("href") || e2 === this.getAttribute("href-alt") || t2 === this.getAttribute("href") || t2 === this.getAttribute("href-alt") ? this.classList.add("mdw-current-link") : this.classList.remove("mdw-current-link");
    }
    hrefClick() {
      "_blank" !== this.getAttribute("target") ? document.location.href = this.getAttribute("href") : window.open(this.getAttribute("href"), "_blank");
    }
    onSelect(e2) {
      e2.target.checked ? this.list.itemSelected(this) : this.list.itemDeselected(this);
    }
    onclickSelect(e2) {
      this.selectOnclick() && e2.target !== this._selectEl && (this._selectEl.checked = !this._selectEl.checked);
    }
    connectSelect() {
      this.isSelect() && (this._selectEl = this.querySelector("mdw-checkbox"), this._selectEl && this._selectEl.addEventListener("change", this.bound_onSelect), this.selectOnclick() && this.addEventListener("click", this.bound_onclickSelect));
    }
    deselect() {
      this._selectEl.checked = false;
    }
  }), customElements.define("mdw-menu", class extends g {
    constructor() {
      super(), this.bound_onClick = this.onClick.bind(this), this.bound_onPanelClick = this.onPanelClick.bind(this), true === a.isMobile ? this.createSheet() : this.createPanel();
    }
    connectedCallback() {
      this.button.addEventListener("click", this.bound_onClick), true !== a.isMobile && (this.classList.add("mdw-panel--container"), this.panel.classList.add("mdw-menu"));
    }
    onClick() {
      true !== a.isMobile ? (this.panel.setPosition(this.panelPosition), this.panel.autoPosition(), this.panel.clickBodyToClose(), this.panel.open(true), this.panel.addEventListener("click", this.bound_onPanelClick)) : this.sheet.open();
    }
    onPanelClick() {
      this.panel.close();
    }
    set panelPosition(e2) {
      this.panelPosition_ = e2;
    }
    get panelPosition() {
      return this.panelPosition_ || "inner-top inner-left";
    }
    get button() {
      return this.children[0];
    }
    get contentElement() {
      return this.querySelector("mdw-menu-content");
    }
    get panel() {
      return this.querySelector("mdw-panel");
    }
    get sheet() {
      return this.querySelector("mdw-sheet");
    }
    createSheet() {
      this.insertAdjacentHTML("beforeend", `
      <mdw-sheet mdw-modal>
        <mdw-sheet-content>
          ${this.contentElement.innerHTML}
        </mdw-sheet-content>
      </mdw-sheet>
    `), this.contentElement.remove();
    }
    createPanel() {
      this.contentElement && (this.insertAdjacentHTML("beforeend", `
      <mdw-panel>
        ${this.contentElement.innerHTML}
      </mdw-panel>
    `), this.contentElement.remove());
    }
  }), customElements.define("mdw-navigation-rail", class extends g {
    constructor() {
      super(), o && this.hasAttribute("mdw-desktop-only") ? (this.style.display = "none", this.style.pointerEvents = "none") : (this.bound_routeChange = this.routeChange.bind(this), document.body.classList.add("mdw-has-navigation-rail"));
    }
    connectedCallback() {
      window.addEventListener("hashchange", this.bound_routeChange), window.addEventListener("DOMContentLoaded", this.bound_routeChange);
    }
    disconnectedCallback() {
      window.removeEventListener("hashchange", this.bound_routeChange), window.removeEventListener("DOMContentLoaded", this.bound_routeChange);
    }
    get path() {
      let e2 = window.location.hash.replace(/.*#/, "");
      return e2.indexOf("?") > -1 && (e2 = e2.split("?")[0]), "/" !== e2.charAt(0) && (e2 = "/" + e2), e2;
    }
    routeChange() {
      this.querySelectorAll(".mdw-current-link").forEach((e3) => e3.classList.remove("mdw-current-link"));
      let e2 = this.querySelectorAll(`[href="#${this.path}"]`);
      e2 && 0 !== e2.length || (e2 = this.querySelectorAll(`[alt-href="#${this.path}"]`)), e2.forEach((e3) => e3.classList.add("mdw-current-link"));
    }
  }), customElements.define("mdw-panel-draggable-header", class extends g {
    constructor() {
      super(), this.bound_onDrag = this.onDrag.bind(this), this.cloneTemplate();
    }
    get draggableElement() {
      return this.shadowRoot.querySelector(".mdw-panel-draggable-header");
    }
    get panel() {
      return this.parentNode;
    }
    connectedCallback() {
      c(this.draggableElement, this.bound_onDrag);
    }
    disconnectedCallback() {
      h(this.draggableElement, this.bound_onDrag);
    }
    onDrag(e2) {
      switch (e2.state) {
        case l.start:
          this._initialLeft = parseInt((this.panel.style.left || "0").replace("px", "")), this._initialTop = parseInt((this.panel.style.top || "0").replace("px", ""));
          break;
        case l.move:
          const t2 = this.panel;
          t2.style.left = `${this._initialLeft + e2.distance.x}px`, t2.style.top = `${this._initialTop + e2.distance.y}px`;
      }
    }
    template() {
      return '\n      <div class="mdw-panel-draggable-header">\n        <slot></slot>\n        <mdw-icon>close</mdw-icon>\n      </div>\n    ';
    }
    styles() {
      return "\n      .mdw-panel-draggable-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        cursor: move;\n        padding: 12px;\n        user-select: none;\n        -webkit-user-select: none;\n      }\n      mdw-icon {\n        cursor: pointer;\n      }\n    ";
    }
  }), customElements.define("mdw-panel", class extends g {
    constructor() {
      super(), this.FOCUSABLE_ELEMENTS = ["button:not(:disabled)", '[href]:not([aria-disabled="true"])', "input:not(:disabled)", "select:not(:disabled)", "textarea:not(:disabled)", '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", "), this._clickOutsideClose = false, this._boundHandleBodyClick = this._handleBodyClick.bind(this), this._boundHandleKeydown = this._handleKeydown.bind(this), this.bound_close = this.close.bind(this), this._clickOutsideCloseIgnorElement = [], this._autoPosition = false, this._animationConfig = {
        type: "scale",
        opacity: true
      }, this.bound_onOpenTransitionEnd = this.onOpenAnimationEnd.bind(this);
    }
    connectedCallback() {
      this.classList.add("mdw-upgraded"), this.transformPropertyName = a.transformPropertyName;
    }
    disconnectedCallback() {
      this.removeBodyClickEvent_(), this.removeKeydownEvent_(), clearTimeout(this._openAnimationEndTimerId), clearTimeout(this._closeAnimationEndTimerId), cancelAnimationFrame(this._animationRequestId);
    }
    static get observedAttributes() {
      return ["mdw-position"];
    }
    attributeChangedCallback(e2, t2, n2) {
      switch (e2) {
        case "mdw-position":
          this._position = n2;
      }
    }
    set clickOutsideClose(e2) {
      this._clickOutsideClose = e2;
    }
    set setQuickOpen(e2) {
      this._isQuickOpen = e2;
    }
    get position() {
      return this._position;
    }
    fullscreen() {
      this.classList.add("mdw-fullscreen");
    }
    setPosition(e2) {
      const t2 = e2.split(" ");
      this._position = `${t2[0] || "top"} ${t2[1] || "left"}`, this.setAttribute("mdw-position", this._position), this._positionSet = true;
    }
    autoPosition() {
      this._autoPosition = true;
    }
    setAnimation(e2) {
      this._animationConfig = e2;
    }
    clickBodyToClose() {
      this._clickOutsideClose = true;
    }
    isOpen() {
      return this._isOpen;
    }
    onOpenAnimationEnd() {
      this.style.transition = "", this.style.transformOrigin = "", this.style.overflow = "", this.style.maxHeight = "", this.classList.remove("mdw-panel--animating-open"), this.removeEventListener("transitionend", this.bound_onOpenTransitionEnd), this.notifyOpen();
    }
    open(e2) {
      void 0 !== e2 && (this._clickOutsideClose = e2);
      const t2 = this.querySelectorAll(this.FOCUSABLE_ELEMENTS);
      this._firstFocusableElement = t2[0], this._lastFocusableElement = t2[t2.length - 1], this.saveFocus(), this._isQuickOpen ? (this.classList.add("mdw-open"), this._isHoisted ? this.setHoistedPosition() : this.setPositionStyle()) : (this.prepareAnimation(), this._isHoisted ? this.setHoistedPosition() : this.setPositionStyle(), this._animationRequestId = this._runNextAnimationFrame(() => {
        switch (this._animationConfig.fullscreen && this.classList.add("mdw-fullscreen"), this._animationConfig.type) {
          case "height":
            this.style.transition = "max-height .22s cubic-bezier(0,0,.2,1), transform .22s cubic-bezier(0,0,.2,1), opacity .22s linear", this.style.maxHeight = this.classList.contains("mdw-fullscreen") ? "100%" : `${this.scrollHeight}px`, this.style.transform = "";
            break;
          case "scale":
          default:
            this.style.transition = "transform .1s cubic-bezier(0,0,.2,1), opacity 0.1s linear", this.style.transform = "";
        }
        this.style.opacity = 1, this.addEventListener("transitionend", this.bound_onOpenTransitionEnd);
      })), this._addBodyClickEvent(), this._addKeydownEvent(), this.addEventListener("MDWPanel:close", this.bound_close), this._isOpen = true;
    }
    prepareAnimation() {
      switch (this.classList.add("mdw-open"), this.classList.add("mdw-panel--animating-open"), this._animationConfig.target && this._animationConfig.fullscreen && (this.style.width = "100%"), this._animationConfig.type) {
        case "height":
          switch (this.style.overflow = "hidden", this.style.maxHeight = this._animationConfig.target ? `${this._animationConfig.target.offsetHeight}px` : "0", this._animationConfig.origin) {
            case "center":
              let e2 = this.classList.contains("mdw-fullscreen") ? window.innerHeight / 2 : this.scrollHeight / 2;
              this._animationConfig.target && (e2 = this._animationConfig.target.getBoundingClientRect().y), this.style.transform = `translateY(${e2}px)`;
              break;
            case "top":
            default:
              this._animationConfig.target && (e2 = this._animationConfig.target.offsetTop, this.style.transform = `translateY(${e2}px)`);
          }
          break;
        case "scale":
        default:
          this.style.transform = "scale(0.9)", this.style.transformOrigin = this._animationConfig.origin || "center";
      }
      this._animationConfig.opacity && (this.style.opacity = 0);
    }
    async close(e2) {
      return new Promise((t2) => {
        e2 && e2.stopPropagation(), this.removeEventListener("MDWPanel:close", this.bound_close), this._isQuickOpen ? (this.classList.remove("mdw-open"), this.resetPosition(), t2()) : (this.classList.add("mdw-panel--animating-closed"), this.removeBodyClickEvent_(), this._animationRequestId = this._runNextAnimationFrame(() => {
          this.classList.remove("mdw-open"), this._closeAnimationEndTimerId = setTimeout(() => {
            this._closeAnimationEndTimerId = 0, this.classList.remove("mdw-panel--animating-closed"), this.resetPosition(), this.notifyClose(), t2();
          }, 75);
        })), this.removeKeydownEvent_(), this._isOpen = false;
        const n2 = this.isFocused(), i2 = document.activeElement && this.contains(document.activeElement);
        (n2 || i2) && this.restoreFocus();
      });
    }
    _runNextAnimationFrame(e2) {
      cancelAnimationFrame(this._animationFrame), this._animationFrame = requestAnimationFrame(() => {
        this._animationFrame = 0, clearTimeout(this._animationTimer), this._animationTimer = setTimeout(e2, 0);
      });
    }
    isFocused() {
      return document.activeElement === this;
    }
    saveFocus() {
      this._previousFocus = document.activeElement;
    }
    restoreFocus() {
      this.contains(document.activeElement) && this._previousFocus && this._previousFocus.focus && this._previousFocus.focus();
    }
    focusFirstElement() {
      this._firstFocusableElement && this._firstFocusableElement.focus && this._firstFocusableElement.focus();
    }
    focusLastElement() {
      this._lastFocusableElement && this._lastFocusableElement.focus && this._lastFocusableElement.focus();
    }
    isFirstElementFocused() {
      this._firstFocusableElement && (this._firstFocusableElement, document.activeElement);
    }
    isLastElementFocused() {
      this._lastFocusableElement && (this._lastFocusableElement, document.activeElement);
    }
    _addBodyClickEvent() {
      this._clickOutsideClose && setTimeout(() => {
        this.hasBodyEvent = true, document.body.addEventListener("click", this._boundHandleBodyClick);
      }, 0);
    }
    removeBodyClickEvent_() {
      this.hasBodyEvent && document.body.removeEventListener("click", this._boundHandleBodyClick), this.hasBodyEvent = false;
    }
    _addKeydownEvent() {
      this.hasKeydownEvent = true, document.body.addEventListener("keydown", this._boundHandleKeydown);
    }
    removeKeydownEvent_() {
      this.hasKeydownEvent && document.body.removeEventListener("keydown", this._boundHandleKeydown), this.hasKeydownEvent = false;
    }
    ignoreElementOnClickToClose(e2) {
      this._clickOutsideCloseIgnorElement.push(e2);
    }
    _handleBodyClick(e2) {
      const t2 = e2.target;
      this._clickOutsideCloseIgnorElement.includes(t2) || this.contains(t2) || (this.removeBodyClickEvent_(), this.close());
    }
    _handleKeydown(e2) {
      const {key: t2, keyCode: n2, shiftKey: i2} = e2, s2 = "Tab" === t2 || 9 === n2;
      "Escape" === t2 || 27 === n2 ? this.close() : s2 && (this.isLastElementFocused() && !i2 ? (this.focusFirstElement(), e2.preventDefault()) : this.isFirstElementFocused() && i2 && (this.focusLastElement(), e2.preventDefault()));
    }
    notifyClose() {
      this.dispatchEvent(new Event("MDWPanel:closed", this));
    }
    notifyOpen() {
      this.dispatchEvent(new Event("MDWPanel:opened"), this);
    }
    hoistToBody(e2) {
      this._isHoisted || (this._container = e2 || this.parentNode, document.body.appendChild(this), this.classList.add("mdw-panel-hoisted"), this._isHoisted = true);
    }
    _autoPositionHoisted() {
      if (!this._autoPosition)
        return;
      const e2 = window.innerHeight, t2 = (this.getBoundingClientRect(), this.offsetHeight);
      let n2 = this.offsetTop;
      if (n2 + t2 > e2 && t2 <= e2) {
        let i2 = n2 - (e2 - t2);
        i2 > 20 ? i2 += 10 : i2 /= 2, n2 -= i2;
      }
      this.style.top = `${n2}px`;
    }
    setHoistedPosition() {
      const e2 = this._container.getBoundingClientRect();
      if (this.style.top = `${e2.top}px`, this.style.left = `${e2.left}px`, this._positionSet) {
        let t2 = 0, n2 = 0;
        this.style.top = `${t2}px`, this.style.left = `${n2}px`, setTimeout(() => {
          const {clientWidth: i2, clientHeight: s2} = document.documentElement, o2 = this.offsetHeight, r2 = this.offsetWidth, a2 = (this.position || " ").split(" "), d2 = a2[0], l2 = a2[1];
          switch (d2) {
            case "top":
              t2 = 0;
              break;
            case "inner-top":
              t2 = e2.y + 12;
              break;
            case "bottom":
              t2 = s2;
              break;
            case "center":
              t2 = s2 / 2 - o2 / 2;
              break;
            case "inner-bottom":
              t2 = s2 - o2 - 12;
          }
          switch (l2) {
            case "left":
              n2 = 0;
              break;
            case "inner-left":
              n2 = e2.x + 12;
              break;
            case "right":
              n2 = i2;
              break;
            case "inner-right":
              n2 = i2 - r2 - 12;
              break;
            case "center":
              n2 = i2 / 2 - r2 / 2;
          }
          this.style.width = `${this.width}px`, this.style.top = `${t2}px`, this.style.left = `${n2}px`;
        }, 0);
      } else
        this._autoPositionHoisted();
    }
    setPositionStyle(e2) {
      e2 ? this._parentOverride = e2 : this._parentOverride && (e2 = this._parentOverride);
      this.position;
      let t2 = 0, n2 = 0;
      if (e2)
        t2 = e2.offsetWidth, n2 = e2.offsetHeight;
      else {
        let e3 = this.parentNode;
        "MDW-SNACKBAR" === e3.nodeName && (e3 = e3.parentNode);
        const i3 = e3.getBoundingClientRect();
        t2 = i3.width, n2 = i3.height;
      }
      const i2 = this.offsetWidth, s2 = this.offsetHeight, o2 = (this.position || " ").split(" "), r2 = o2[0], a2 = o2[1];
      let d2 = 0, l2 = 0;
      switch (r2) {
        case "top":
          d2 = -s2;
          break;
        case "bottom":
          d2 = n2;
          break;
        case "center":
          d2 = n2 / 2 - s2 / 2;
          break;
        case "inner-bottom":
          d2 = n2 - s2;
      }
      switch (a2) {
        case "left":
          l2 = -i2;
          break;
        case "right":
          l2 = t2;
          break;
        case "inner-right":
          l2 = t2 - i2;
          break;
        case "center":
          l2 = t2 / 2 - i2 / 2;
      }
      if (this._autoPosition) {
        const {clientWidth: e3, clientHeight: o3} = document.documentElement, {x: r3, y: a3} = this.getBoundingClientRect();
        a3 + s2 > o3 && (d2 = n2 - s2), r3 + i2 > e3 && (l2 = t2 - i2);
      }
      this.style.top = `${parseInt(d2)}px`, this.style.left = `${parseInt(l2)}px`;
    }
    resetPosition() {
      this.style.top = "", this.style.left = "";
    }
  }), customElements.define("mdw-radio", class extends g {
    constructor() {
      super(), this.insertAdjacentHTML("beforeend", this.rippleTemplate());
    }
    connectedCallback() {
      this.parentNode.initialValue === this.value && (this.input.checked = true), this.input.hasAttribute("type") || this.input.setAttribute("type", "radio"), this.input.hasAttribute("name") || this.input.setAttribute("name", this.name), this.ripple = new f({
        element: this.querySelector(".mdw-ripple"),
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
      return this.querySelector("input");
    }
    get name() {
      return this.parentNode && this.parentNode.hasAttribute("name") ? this.name_ = this.parentNode.getAttribute("name") : this.hasAttribute("name") && (this.name_ = this.getAttribute("name")), this.name_ || (this.name_ = a.uid(), this.parentNode ? this.parentNode.setAttribute("name", this.name_) : this.setAttribute("name", this.name_)), this.name_;
    }
    rippleTemplate() {
      return '\n      <div class="mdw-radio-background">\n        <div class="mdw-radio__outer-circle"></div>\n        <div class="mdw-radio__inner-circle"></div>\n      </div>\n      <div class="mdw-ripple mdw-radio-ripple"></div>\n    ';
    }
  }), customElements.define("mdw-radio-group", class extends g {
    constructor() {
      super(), this.initialValue = this.getAttribute("mdw-value");
    }
  }), customElements.define("mdw-select", class extends g {
    constructor() {
      super(), this.setupLabel_(), this._isEnhanced && this.prepareEnhance_(), this.classList.add("mdw-no-animation"), this.cloneTemplate(true), this.bound_onFocus = this.onFocus.bind(this), this.bound_onBlur = this.onBlur.bind(this), this.bound_onClick = this.onClick.bind(this), this.bound_onChange = this.onChange.bind(this), this.bound_onPanelClick = this.onPanelClick.bind(this), this.bound_onKeyDown = this.onKeyDown.bind(this);
    }
    connectedCallback() {
      this._isEnhanced ? (this._selected && (this.value = this._selected.value), this.shadowRoot.querySelector("render-block").addEventListener("click", this.bound_onClick), document.body.addEventListener("keydown", this.bound_onKeyDown)) : (this.selectElement.addEventListener("focus", this.bound_onFocus), this.selectElement.addEventListener("blur", this.bound_onBlur), this.selectElement.addEventListener("change", this.bound_onChange)), this.onChange(), setTimeout(() => {
        this.classList.remove("mdw-no-animation"), this._isEnhanced && (this.panel.style.minWidth = `${this.offsetWidth}px`);
      }, 0);
    }
    disconnectedCallback() {
      this._isEnhanced ? (this.shadowRoot.querySelector("render-block").removeEventListener("click", this.bound_onClick), document.body.removeEventListener("keydown", this.bound_onKeyDown)) : (this.selectElement.removeEventListener("focus", this.bound_onFocus), this.selectElement.removeEventListener("blur", this.bound_onBlur), this.selectElement.removeEventListener("change", this.bound_onChange));
    }
    get value() {
      return this._isEnhanced ? this._value : this.selectElement.value || this._value;
    }
    set value(e2) {
      this._value = e2, this.onChange(), this.dispatchEvent(new Event("change"));
    }
    get selectElement() {
      return a.querySlotted(this, "select");
    }
    get label() {
      return this.shadowRoot.querySelector("label");
    }
    get labelWidth() {
      return 0.9 * this.label.offsetWidth;
    }
    get enhacedElementId() {
      return this._enhacedElementId || (this._enhacedElementId = `select-enhanced-${a.uid()}`), this._enhacedElementId;
    }
    get panel() {
      return document.querySelector(`#${this.enhacedElementId}`);
    }
    get sheet() {
      return document.querySelector(`#${this.enhacedElementId}`);
    }
    get _isEnhanced() {
      return null !== this.getAttribute("mdw-enhanced");
    }
    get outlined() {
      return [].slice.apply(this.classList || []).includes("mdw-outlined");
    }
    get notch() {
      return this._notch || (this._notch = this.shadowRoot.querySelector(".mdw-outlined-notch")), this._notch;
    }
    setupLabel_() {
      const e2 = this.querySelector("label");
      e2 && (this._labelText = e2.innerText, e2.remove());
    }
    prepareEnhance_() {
      this._optionsMap = [...this.querySelectorAll("option")].map((e3) => ({
        text: e3.innerText,
        value: e3.value,
        selected: e3.hasAttribute("selected")
      })), this._selected = this._optionsMap.filter(({selected: e3}) => true === e3)[0] || {
        text: "",
        value: ""
      };
      const e2 = this.querySelector("select");
      if (e2) {
        const t2 = e2.getAttribute("onchange");
        t2 && this.setAttribute("onchange", t2), e2.remove();
      }
      a.isMobile ? this.prepareSheet_() : this.preparePanel_();
    }
    preparePanel_() {
      const e2 = `
      <mdw-panel id="${this.enhacedElementId}" mdw-position="bottom inner-left" class="mdw-panel-hoisted">
        <mdw-list>
          ${this._optionsMap.map(({text: e3, value: t3, selected: n2}) => `
            <mdw-list-item value="${t3}"${n2 ? " selected" : ""}>${e3}</mdw-list-item>
          `).join("\n")}
        </mdw-list>
      </mdw-panel>
    `;
      document.body.insertAdjacentHTML("beforeend", e2);
      const t2 = this.panel;
      t2.setAnimation({
        target: this.querySelector("select"),
        type: "scale",
        origin: "top",
        opacity: true
      }), t2.hoistToBody(this);
    }
    prepareSheet_() {
      const e2 = `
      <mdw-sheet mdw-modal id=${this.enhacedElementId}>
        <mdw-sheet-content>
          <mdw-list>
            ${this._optionsMap.map(({text: e3, value: t2, selected: n2}) => `
              <mdw-list-item value="${t2}"${n2 ? " selected" : ""}>${e3}</mdw-list-item>
            `).join("\n")}
          </mdw-list>
        </mdw-sheet-content>
      </mdw-sheet>
    `;
      document.body.insertAdjacentHTML("beforeend", e2);
    }
    onFocus() {
      this.classList.add("mdw-focused"), this.outlined && (this.notch.style.width = this.labelWidth + "px");
    }
    onBlur() {
      this.classList.remove("mdw-focused"), this.classList.toggle("mdw-not-empty", this.value), this._isEnhanced && (a.isMobile ? (this.sheet.removeEventListener("MDWSheet:closed", this.bound_onBlur), this.sheet.removeEventListener("click", this.bound_onPanelClick)) : (this.panel.removeEventListener("MDWPanel:closed", this.bound_onBlur), this.panel.removeEventListener("click", this.bound_onPanelClick))), a.unlockPageScroll();
    }
    onChange() {
      this.value && this.label ? (this.label.classList.add("mdw-select--float-above"), this.label.classList.remove("mdw-empty-no-float"), this.outlined && (this.notch.style.width = this.labelWidth + "px")) : (this.label.classList.remove("mdw-select--float-above"), this.label.classList.add("mdw-empty-no-float"), this.outlined && (this.notch.style.width = "0"));
    }
    onClick(e2) {
      if (this._focusIndex, this.onFocus(), a.isMobile) {
        const e3 = this.sheet;
        e3.open(), e3.addEventListener("MDWSheet:closed", this.bound_onBlur), e3.addEventListener("click", this.bound_onPanelClick);
        const t2 = e3.querySelector(".mdw-focused");
        t2 && t2.classList.remove("mdw-focused");
        const n2 = e3.querySelector("[selected]");
        n2 && n2.classList.add("mdw-focused");
      } else {
        const e3 = this.panel;
        e3.autoPosition(), e3.open(true), e3.addEventListener("MDWPanel:closed", this.bound_onBlur), e3.addEventListener("click", this.bound_onPanelClick);
        const t2 = e3.querySelector(".mdw-focused");
        t2 && t2.classList.remove("mdw-focused");
        const n2 = e3.querySelector("[selected]");
        n2 && n2.classList.add("mdw-focused");
      }
      a.lockPageScroll();
    }
    onPanelClick(e2) {
      if (!e2.target.hasAttribute("value"))
        return;
      this.value = e2.target.getAttribute("value"), this.setSelectedText(e2.target.innerText);
      const t2 = this.panel.querySelector("[selected]");
      t2 && t2.removeAttribute("selected"), e2.target.setAttribute("selected", ""), this.panel.close();
    }
    setSelectedText(e2) {
      this.shadowRoot.querySelector(".mdw-select__selected-text").innerText = e2;
    }
    get internalStylesFile() {
      return "./internal.css";
    }
    template() {
      return `
      <i class="mdw-select__icon"></i>
      ${this._isEnhanced ? `
        <div class="mdw-select__selected-text">${this._selected.text}</div>
      ` : "<slot></slot>"}
      <label>${this._labelText}</label>
      ${this.outlined ? "" : '<div class="mdw-line-ripple"></div>'}
      ${this.outlined ? '\n        <div class="mdw-outlined-border-container">\n          <div class="mdw-outlined-leading"></div>\n          <div class="mdw-outlined-notch"></div>\n          <div class="mdw-outlined-trailing"></div>\n        </div>\n      ' : ""}
    `;
    }
    onKeyDown(e2) {
      if (this.panel.isOpen())
        switch (e2.keyCode) {
          case 40:
          case 39:
            this.focusNext(), e2.preventDefault();
            break;
          case 38:
          case 37:
            this.focusPrevious(), e2.preventDefault();
            break;
          case 13:
            this.selectFocused(), e2.preventDefault();
            break;
          default:
            if (e2.keyCode >= 31 || e2.keyCode <= 90) {
              const t2 = this.keyboardSearchNodes(e2.keyCode);
              void 0 !== t2 && this.selectNode(t2), e2.stopPropagation(), e2.preventDefault();
            }
        }
    }
    keyboardSearchNodes(e2) {
      void 0 !== this._clearSearchTimeout && clearTimeout(this._clearSearchTimeout), this._clearSearchTimeout = setTimeout(() => {
        this._clearSearchTimeout = void 0, this._keyboardSearchStr = "", this._keyboardOptionNames = void 0;
      }, 300), void 0 === this._keyboardSearchStr && (this._keyboardSearchStr = ""), this._keyboardSearchStr += String.fromCharCode(e2);
      const t2 = new RegExp("^" + this._keyboardSearchStr, "i");
      this._keyboardOptionNames || (this._keyboardOptionNames = [...this.panel.querySelectorAll("mdw-list-item")].map((e3) => e3.innerText));
      const n2 = this._keyboardOptionNames.length;
      let i2 = 0;
      for (; i2 < n2; ) {
        if (t2.test(this._keyboardOptionNames[i2]))
          return i2;
        i2 += 1;
      }
    }
    selectNode(e2) {
      const t2 = [...this.panel.querySelectorAll("mdw-list-item")];
      this._focusIndex = e2, this._focusedOption && this._focusedOption.classList.remove("mdw-focused"), this._focusedOption = t2[this._focusIndex], this._focusedOption.classList.add("mdw-focused");
    }
    focusNext() {
      if (!this.panel.isOpen())
        return;
      const e2 = [...this.panel.querySelectorAll("mdw-list-item")];
      if (void 0 === this._focusIndex) {
        const t2 = e2.findIndex((e3) => e3.classList.contains("mdw-focused"));
        t2 >= 0 && (this._focusedOption = e2[t2]), this._focusIndex = t2 <= 0 ? 1 : t2 + 1;
      } else
        this._focusIndex += 1;
      this._focusIndex > e2.length - 1 && (this._focusIndex = e2.length - 1), this._focusedOption && this._focusedOption.classList.remove("mdw-focused"), this._focusedOption = e2[this._focusIndex], this._focusedOption.classList.add("mdw-focused");
    }
    focusPrevious() {
      if (!this.panel.isOpen())
        return;
      const e2 = [...this.panel.querySelectorAll("mdw-list-item")];
      void 0 === this._focusIndex ? this._focusIndex = 0 : this._focusIndex -= 1, this._focusIndex <= 0 && (this._focusIndex = 0), this._focusedOption && this._focusedOption.classList.remove("mdw-focused"), this._focusedOption = e2[this._focusIndex], this._focusedOption.classList.add("mdw-focused");
    }
    selectFocused() {
      if (!this.panel.isOpen())
        return;
      const e2 = [...this.panel.querySelectorAll("mdw-list-item")];
      (null == this._focusIndex || this._focusIndex > e2.length - 1) && (this._focusIndex = 0), this.onPanelClick({
        target: e2[this._focusIndex]
      });
    }
    styles() {
      return "\n      :host-context(.mdw-density-comfortable) .mdw-select__icon {\n        bottom: 15px;\n      }\n\n      :host-context(.mdw-density-comfortable) .mdw-select__selected-text {\n        height: 48px;\n        padding-top: 16px;\n      }\n\n      :host(.mdw-outlined):host-context(.mdw-density-comfortable) .mdw-select__icon {\n        bottom: 20px;\n      }\n      \n      :host(.mdw-outlined):host-context(.mdw-density-comfortable) label {\n        top: 18px;\n      }\n\n      :host-context(.mdw-density-compact) .mdw-select__icon {\n        bottom: 12px;\n      }\n\n      :host(.mdw-outlined):host-context(.mdw-density-compact) .mdw-select__icon {\n        top: 18px;\n      }\n\n      :host(.mdw-outlined):host-context(.mdw-density-compact) label {\n        top: 12px;\n      }\n\n      :host-context(.mdw-density-compact) .mdw-select__selected-text {\n        height: 40px;\n        line-height: 1.1rem;\n      }\n\n      :host-context(.mdw-density-compact) ::slotted(select) {\n        height: 40px;\n        padding-top: 12px;\n      }\n\n      :host-context(.mdw-density-compact) label {\n        top: 16px;\n      }\n\n      :host(.mdw-outlined.mdw-focused):host-context(.mdw-density-compact) label,\n      :host(.mdw-outlined):host-context(.mdw-density-compact) label.mdw-select--float-above {\n        transform: translateY(-100%) scale(0.75);\n      }\n\n      ::slotted(label.mdw-empty-no-float) {\n        transform: none;\n      }\n\n      :host(.mdw-focused) .mdw-select__icon {\n        transform: rotate(180deg) translateY(-5px);\n        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n      }\n\n      .mdw-select__icon {\n        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n        pointer-events: none;\n        position: absolute;\n        bottom: 23px;\n        left: auto;\n        right: 8px;\n        width: 0;\n        height: 0;\n        border-left: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-top: 5px solid var(--mdw-theme-on-secondary);\n      }\n\n      ::slotted(select:focus) .mdw-select__icon,\n      :host(.mdw-focused:focus) .mdw-select__icon {\n        transform: rotate(180deg) translateY(-5px);\n        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n      }\n\n      :host(:not(.mdw-select--disabled)) ::slotted(select),\n      :host(:not(.mdw-select--disabled)) .mdw-select__selected-text {\n        border-bottom-color: rgba(var(--mdw-theme-on-background--rgb), 0.54);\n        color: var(--mdw-theme-on-primary);\n      }\n\n      :host(.mdw-focused:not(.mdw-select--disabled)) ::slotted(select),\n      :host(.mdw-focused:not(.mdw-select--disabled)) .mdw-select__selected-text,\n      :host(:not(.mdw-select--disabled)) ::slotted(select:focus),\n      :host(.mdw-focused:focus:not(.mdw-select--disabled)) .mdw-select__selected-text {\n        border-bottom: 2px solid;\n        border-bottom-color: var(--mdw-theme-primary);\n        height: calc(100% + 1px); /* add 1px to height so the text does not get pushed up by border size change */\n      }\n\n      :host(.mdw-outlined) ::slotted(select),\n      :host(.mdw-outlined) .mdw-select__selected-text {\n        border: none;\n      }\n\n      ::slotted(select),\n      .mdw-select__selected-text {\n        position: absolute;\n        padding: 20px 52px 4px 16px;\n        font-family: Roboto,sans-serif;\n        font-size: 1rem;\n        line-height: 1.75rem;\n        font-weight: 400;\n        letter-spacing: .009375em;\n        text-decoration: inherit;\n        text-transform: inherit;\n        box-sizing: border-box;\n        width: 100%;\n        height: 56px;\n        border: none;\n        border-bottom: 1px solid;\n        outline: none;\n        background-color: transparent;\n        color: inherit;\n        white-space: nowrap;\n        cursor: pointer;\n        appearance: none;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n      }\n\n      /* outlined */\n      :host(.mdw-outlined) ::slotted(select),\n      :host(.mdw-outlined) .mdw-select__selected-text {\n        padding: 12px 52px 12px 16px;\n        display: flex;\n        border: none;\n        background-color: transparent;\n        z-index: 1;\n      }\n      :host(.mdw-outlined) ::slotted(select) {\n        border-radius: 4px;\n      }\n\n      ::slotted(select) {\n        border-radius: 4px 4px 0 0;\n      }\n\n      :host([dir=rtl]) ::slotted(select),\n      ::slotted(select[dir=rtl]),\n      :host([dir=rtl]) .mdw-select__selected-text,\n      .mdw-select__selected-text[dir=rtl] {\n        padding-left: 52px;\n        padding-right: 16px;\n      }\n\n\n      label {\n        font-size: 1rem;\n        line-height: 1.75rem;\n        font-weight: 400;\n        letter-spacing: 0.009375em;\n        text-decoration: inherit;\n        text-transform: inherit;\n        position: absolute;\n        left: 0;\n        transform-origin: left top;\n        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n        line-height: 1.15rem;\n        text-align: left;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        cursor: text;\n        overflow: hidden;\n        will-change: transform;\n        transform: none;\n        pointer-events: none;\n        color: rgba(var(--mdw-theme-on-background--rgb), .6);\n        z-index: 1;\n\n        left: 16px;\n        right: initial;\n        top: 21px;\n      }\n\n      :host(.mdw-focused) label {\n        color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-no-animation) label {\n        transition: none;\n      }\n\n      label:not(.mdw-empty-no-float) {\n        transform: translateY(-70%) scale(0.75);\n      }\n\n      ::slotted(select:focus) + label,\n      label.mdw-select--float-above {\n        transform: translateY(-70%) scale(0.75);\n      }\n\n      :host(.mdw-outlined.mdw-focused) label,\n      :host(.mdw-outlined) label.mdw-select--float-above {\n        transform: translateY(-132%) scale(0.75);\n      }\n\n      :host(.mdw-select--with-leading-icon) label {\n        left: 48px;\n        right: initial;\n      }\n\n      :host(.mdw-outlined) label {\n        left: 15px;\n        right: initial;\n        top: 18px;\n      }\n\n      :host(.mdw-outlined.mdw-select--with-leading-icon) label {\n        left: 36px;\n        right: initial;\n      }\n\n      :host(.mdw-outlined.mdw-select--with-leading-icon) label.mdw-select--float-above {\n        left: 36px;\n        right: initial;\n      }\n\n      .mdw-outlined-border-container {\n        display: -ms-flexbox;\n        display: flex;\n        position: absolute;\n        top: 0;\n        right: 0;\n        left: 0;\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n        width: 100%;\n        max-width: 100%;\n        height: 100%;\n        text-align: left;\n        pointer-events: none;\n      }\n\n      .mdw-outlined-leading {\n        border-radius: 4px 0 0 4px;\n        border-left: 1px solid;\n        border-right: none;\n        width: 12px;\n      }\n\n      .mdw-outlined-notch {\n        -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n        width: auto;\n        max-width: calc(100% - 12px * 2);\n      }\n\n      .mdw-outlined-trailing {\n        border-left: none;\n        border-right: 1px solid;\n        border-radius: 0 4px 4px 0;\n        -ms-flex-positive: 1;\n        flex-grow: 1;\n      }\n\n      .mdw-outlined-leading,\n      .mdw-outlined-notch,\n      .mdw-outlined-trailing {\n        box-sizing: border-box;\n        height: 100%;\n        border-top: 1px solid;\n        border-bottom: 1px solid;\n        pointer-events: none;\n\n        border-color: rgba(var(--mdw-theme-on-background--rgb), 0.54);\n      }\n\n      .mdw-outlined-notch {\n        border-top: none;\n      }\n\n      :host(.mdw-focused) .mdw-outlined-leading,\n      :host(.mdw-focused) .mdw-outlined-notch,\n      :host(.mdw-focused) .mdw-outlined-trailing,\n      ::slotted(select:focus) .mdw-outlined-leading,\n      ::slotted(select:focus) .mdw-outlined-notch,\n      ::slotted(select:focus) .mdw-outlined-trailing {\n        border-width: 2px;\n        border-color: var(--mdw-theme-primary);\n      }\n\n      :host(.invalid) .mdw-outlined-leading,\n      :host(.invalid) .mdw-outlined-notch,\n      :host(.invalid) .mdw-outlined-trailing {\n        border-color: var(--mdw-theme-error);\n      }\n    ";
    }
  }), customElements.define("mdw-sheet-bottom-header", class extends g {
    constructor() {
      super(), this.parentNode._registerHeader && this.parentNode._registerHeader(this), this.sheetInstance = this.parentNode, this.bound_close = this.close.bind(this), this.bound_toTop = this.toTop.bind(this), this.innerHTML = this.template(this.isModal, this.title, this.innerHTML);
      const e2 = this.querySelector("mdw-header");
      e2 && (this.classList.add("has-standard-header"), e2.setAttribute("class", this.classList.toString()));
    }
    connectedCallback() {
      this.closeButton && this.closeButton.addEventListener("click", this.bound_close), this._hasMdwHeader && this.mdwHeader.addEventListener("click", this.bound_toTop);
    }
    disconnectedCallback() {
      this.closeButton && this.closeButton.removeEventListener("click", this.bound_close), this._hasMdwHeader && this.mdwHeader.removeEventListener("click", this.bound_toTop);
    }
    get closeButton() {
      return this.querySelector("#mdw-sheet-close-action");
    }
    get mdwHeader() {
      return this.querySelector("mdw-header");
    }
    get isModal() {
      return "modal" === this.parentNode.type;
    }
    get title() {
      return this._title ? this._title : this.hasAttribute("mdw-title") ? this.getAttribute("mdw-title") : "";
    }
    set title(e2) {
      this._title = e2;
    }
    close() {
      if (this.isModal)
        return this.parentNode.close();
      this.parentNode.exitFullscreen();
    }
    disable() {
      this.classList.add("mdw-disabled");
    }
    show() {
      this.classList.add("mdw-show"), this.isShowing = true;
    }
    hide() {
      this.classList.remove("mdw-show"), this.isShowing = false;
    }
    toTop() {
      console.log("to top"), this.parentNode._transitionToNearestPosition();
    }
    template(e2, t2, n2) {
      const i2 = new DOMParser().parseFromString(n2, "text/html").querySelector("mdw-sheet-top-bar");
      return i2 && (n2 = n2.replace(i2.outerHTML, "")), n2 && (this._hasMdwHeader = true), `
      ${i2 ? i2.outerHTML : `
        <mdw-sheet-top-bar>
          <mdw-button id="mdw-sheet-close-action" class="mdw-icon">
            ${e2 ? "<mdw-icon>close</mdw-icon>" : "<mdw-icon>keyboard_arrow_down</mdw-icon>"}
          </mdw-button>
          ${t2}
        </mdw-sheet-top-bar>
      `}

      ${n2 && `<mdw-header>

          ${n2}
        </mdw-header>`}
    `;
    }
  });
  class E {
    constructor(e2) {
      this.componentElement = e2, this.isAnchored = e2.hasAttribute("mdw-anchored");
    }
    get initialPosition() {
      return this.componentElement._headerHeight + window.innerHeight / 4;
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
    registerHeader(e2) {
      this.headerElement = e2, this.headerElement.title = this.title;
    }
    setupHeader() {
      const e2 = this.componentElement.querySelector("mdw-header");
      this.componentElement.insertAdjacentHTML("afterbegin", `<mdw-sheet-bottom-header mdw-title="${this.componentElement.title}" class="${e2.classList.toString()}">${e2 && e2.innerHTML}</mdw-sheet-bottom-header>`), e2 && e2.remove();
    }
    addBackdrop() {
    }
    removeBackdrop() {
    }
    handleOnMove({position: e2, isAtTop: t2, isAboveTop: n2, targetingTop: i2, targetingInitial: s2}) {
      i2 || t2 || n2 ? this.headerElement.show() : this.headerElement.hide(), t2 || n2 ? this.headerElement.classList.add("mdw-fullscreen") : this.headerElement.classList.remove("mdw-fullscreen"), n2 ? this.headerElement.classList.add("mdw-is-above-top") : this.headerElement.classList.remove("mdw-is-above-top");
    }
  }
  class x {
    constructor(e2) {
      this.componentElement = e2;
    }
    get initialPosition() {
      return this.minimizedPosition;
    }
    get minimizedPosition() {
      const e2 = this.componentElement.contentHeight;
      return Math.min(e2, this.clientPosition);
    }
    get clientPosition() {
      return window.innerHeight / 2;
    }
    get isDraggable() {
      return this.componentElement.contentHeight > this.clientPosition;
    }
    registerHeader(e2) {
      this.headerElement = e2, this.headerElement.title = this.title;
    }
    setupHeader() {
      this.componentElement.insertAdjacentHTML("afterbegin", `<mdw-sheet-bottom-header mdw-title="${this.componentElement.title}"></mdw-sheet-bottom-header>`);
    }
    addBackdrop() {
      this.backdrop = a.addBackdrop(this.componentElement, () => {
        this.componentElement.close();
      });
    }
    removeBackdrop() {
      this.backdrop && this.backdrop.remove(), this.backdrop = void 0;
    }
    handleOnMove({position: e2, isAtTop: t2, isAboveTop: n2, targetingTop: i2, targetingInitial: s2}) {
      i2 || t2 || n2 ? this.headerElement.show() : this.headerElement.hide(), t2 || n2 ? this.headerElement.classList.add("mdw-fullscreen") : this.headerElement.classList.remove("mdw-fullscreen"), n2 ? this.headerElement.classList.add("mdw-is-above-top") : this.headerElement.classList.remove("mdw-is-above-top");
    }
  }
  customElements.define("mdw-sheet-bottom", class extends g {
    constructor() {
      switch (super(), this.type) {
        case "modal":
          this._helpers = new x(this);
          break;
        default:
          this._helpers = new E(this);
      }
      this.bound_onTransitionEnd = this._onTransitionEnd.bind(this), this.bound_onTransitionEndClose = this._onTransitionEndClose.bind(this), this.bound_onDrag = this._onDrag.bind(this), this._helpers.setupHeader(), this._setupOverScroll();
    }
    get title() {
      return this.getAttribute("mdw-title");
    }
    get type() {
      return this.hasAttribute("mdw-modal") ? "modal" : "standard";
    }
    get contentElement() {
      return this.querySelector("mdw-content");
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
      const e2 = window.innerHeight, t2 = this.contentHeight, n2 = this._headerHeight;
      return "standard" === this.type ? e2 - (55 - n2) : e2 - (t2 >= e2 - n2 ? 55 - n2 : e2 - n2 - t2);
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
      return this.hasAttribute("mdw-anchored");
    }
    disconnectedCallback() {
      this.classList.contains("mdw-dragging") && (a.unlockPageScroll(), a.disableUserSelect()), this._cancelTransitions();
    }
    open() {
      this._cancelTransitions(), this.classList.add("mdw-show"), this.style.height = `${this.contentHeight + this._headerHeight}px`, this._positionBottom(), this._isAnchored ? this._transitionToPosition(this._minimizedPosition) : this._transitionToPosition(this._initialPosition), this._helpers.addBackdrop(), this._isDraggable && (c(this.contentElement, this.bound_onDrag), this._helpers.headerElement && c(this._helpers.headerElement, this.bound_onDrag));
    }
    async close() {
      return new Promise((e2) => {
        h(this.contentElement, this.bound_onDrag), this._helpers.headerElement && h(this._helpers.headerElement, this.bound_onDrag), this._cancelTransitions(), this.classList.add("mdw-animating-close"), this._positionBottom(), this.addEventListener("transitionend", () => {
          this._cancelTransitions(), this.classList.remove("mdw-show"), this._helpers.removeBackdrop(), e2();
        }, {
          once: true
        });
      });
    }
    minimize() {
      this._cancelTransitions(), this._transitionToPosition(this._minimizedPosition);
    }
    exitFullscreen() {
      this._cancelTransitions(), this._isAnchored ? this._transitionToPosition(this._minimizedPosition) : this._transitionToPosition(this._initialPosition);
    }
    toggle() {
      this.classList.contains("mdw-show") ? this.close() : this.open();
    }
    _registerHeader(e2) {
      this._helpers.registerHeader(e2);
    }
    _positionTop() {
      this._setPosition(this._topPosition);
    }
    _positionBottom() {
      this._currentPosition = 0, this.style.top = "100%";
    }
    _positionInitial() {
      this._setPosition(this._initialPosition);
    }
    _positionMinimized() {
      this._setPosition(this._minimizedPosition);
    }
    _setPosition(e2) {
      const t2 = this._maxScroll;
      let n2 = 0;
      if (e2 > t2) {
        const i3 = 100;
        n2 = i3 * Math.log(e2 - t2 + i3) - i3 * Math.log(i3), e2 = t2;
      }
      const i2 = window.innerHeight + (this._headerHeight - 55);
      this._isAtTop = e2 === i2, this._isAboveTop = e2 > i2, this._isAtOrAboveTop = this._isAtTop || this._isAboveTop, this._currentPosition = e2, this.style.top = `calc(100% - ${e2 + n2}px)`;
      const s2 = window.innerHeight - this._initialPosition, o2 = !this._isAtOrAboveTop && e2 - this._initialPosition >= s2 / 2, r2 = !this._isAtOrAboveTop && e2 - this._initialPosition < s2 / 2;
      this._helpers.handleOnMove({
        position: e2,
        isAtTop: this._isAtTop,
        isAboveTop: this._isAboveTop,
        targetingTop: o2,
        targetingInitial: r2
      });
    }
    _transitionToNearestPosition() {
      const e2 = this._currentPosition;
      if (this._initialOffsetTop === this.offsetTop)
        return e2 === this._minimizedPosition ? this._transitionToPosition(this._initialPosition) : this._transitionToPosition(this._topPosition);
      const t2 = (this._topPosition - this._initialPosition) / 2;
      e2 - this._initialPosition >= t2 ? this._transitionToPosition(this._topPosition) : this._transitionToPosition(this._initialPosition);
    }
    _transitionToPosition(e2) {
      this.classList.add("mdw-animating-open"), requestAnimationFrame(() => {
        this._setPosition(e2), this.addEventListener("transitionend", this.bound_onTransitionEnd);
      });
    }
    _cancelTransitions() {
      this.classList.remove("mdw-animating-open"), this.classList.remove("mdw-animating-close"), this.classList.remove("mdw-animating-scroll"), this.style.transitionDuration = "", this.removeEventListener("transitionend", this.bound_onTransitionEnd), this.removeEventListener("transitionend", this.bound_onTransitionEndClose);
    }
    _onTransitionEnd() {
      this._initialOffsetTop = this.offsetTop, this._cancelTransitions();
    }
    _onTransitionEndClose() {
      this._cancelTransitions(), this.classList.remove("mdw-show"), this._helpers.removeBackdrop();
    }
    _onDrag(e2) {
      switch (e2.state) {
        case "start":
          this._cancelTransitions(), this._startPosition = this._currentPosition, this.classList.add("mdw-dragging"), a.lockPageScroll(), a.disableUserSelect();
          break;
        case "move":
          this._setPosition(this._startPosition - e2.distance.y);
          break;
        case "end":
          this.classList.add("mdw-animating-scroll"), this._handleScrollEnd(e2.velocity.y, e2.direction.y), this.addEventListener("transitionend", this.bound_onTransitionEnd), this.classList.remove("mdw-dragging"), a.unlockPageScroll(), a.enableUserSelect();
      }
    }
    _handleScrollEnd(e2, t2) {
      if (!this._isAtOrAboveTop && e2 < -1.1)
        this._positionTop();
      else {
        if (!this._isAtOrAboveTop && e2 > 0.7)
          return "modal" === this.type ? this.close() : this.minimize();
        {
          const n2 = Math.abs(e2) / 3;
          let i2 = this._scrollDistanceRemaining * n2 * -t2;
          i2 > this._scrollDistanceRemaining && (i2 = this._scrollDistanceRemaining);
          const s2 = i2 + this._currentPosition;
          if (this._isAtOrAboveTop)
            s2 < this._topPosition + 80 ? this._positionTop() : (this.style.transitionDuration = `${0.5 * n2 + 0.3}s`, this._setPosition(s2));
          else {
            const e3 = (this._topPosition - this._initialPosition) / 2;
            s2 - this._initialPosition >= e3 ? this._positionTop() : this._positionInitial();
          }
        }
      }
    }
    _setupOverScroll() {
      this.insertAdjacentHTML("beforeend", '<div class="mdw-sheet-bottom-over-scroll"></div>');
    }
  }), customElements.define("mdw-sheet-side", class extends g {
    constructor() {
      super(), this._useBackdrop = !this.hasAttribute("mdw-no-backdrop"), this.bound_onSwipe = this.onSwipe.bind(this), this.bound_routeChange = this.routeChange.bind(this);
    }
    connectedCallback() {
      this._isNavigationDrawer = this.classList.contains("mdw-navigation-drawer"), this._isNavigationDrawer && document.body.classList.add("mdw-has-navigation-drawer"), a.isMobile && this.setAttribute("mdw-modal", ""), this._isNavigationDrawer && this.isModal && document.body.classList.add("mdw-navigation-drawer-modal"), this.isModal && this._isNavigationDrawer && !this.isHidden && !this.classList.contains("mdw-show") ? this.classList.add("mdw-hide") : this._isNavigationDrawer ? document.body.classList.add("mdw-navigation-drawer-open") : this.isModal && !this.isHidden && this._useBackdrop && (this._backdrop = a.addBackdrop(this, () => this.close(), {
        sheet: true
      })), this._isNavigationDrawer && (window.addEventListener("hashchange", this.bound_routeChange), window.addEventListener("DOMContentLoaded", this.bound_routeChange));
    }
    disconnectedCallback() {
      this._backdrop && this._backdrop.remove(), b(document.body, this.bound_onSwipe), this._isNavigationDrawer && (window.removeEventListener("hashchange", this.bound_routeChange), window.removeEventListener("DOMContentLoaded", this.bound_routeChange));
    }
    get isModal() {
      return this.hasAttribute("mdw-modal");
    }
    get isHidden() {
      return this.classList.contains("mdw-hide");
    }
    get isLeft() {
      return this.classList.contains("mdw-left") || this.classList.contains("mdw-navigation-drawer");
    }
    set useBackdrop(e2) {
      this._useBackdrop = !!e2;
    }
    get path() {
      let e2 = window.location.hash.replace(/.*#/, "");
      return e2.indexOf("?") > -1 && (e2 = e2.split("?")[0]), "/" !== e2.charAt(0) && (e2 = "/" + e2), e2;
    }
    routeChange() {
      this.querySelectorAll(".mdw-current-link").forEach((e3) => e3.classList.remove("mdw-current-link"));
      let e2 = this.querySelectorAll(`[href="#${this.path}"]`);
      e2 && 0 !== e2.length || (e2 = this.querySelectorAll(`[alt-href="#${this.path}"]`)), e2.forEach((e3) => e3.classList.add("mdw-current-link"));
    }
    open() {
      console.log(this.classList.contains("mdw-hide")), setTimeout(() => {
        this.classList.remove("mdw-hide"), this.classList.add("mdw-show"), this.isModal && (w(document.body, this.bound_onSwipe), this._useBackdrop && (this._backdrop = a.addBackdrop(this, () => this.close(), {
          sheet: true
        }))), this._isNavigationDrawer && document.body.classList.add("mdw-navigation-drawer-open");
      }, 10);
    }
    async close() {
      return new Promise((e2) => {
        this.classList.remove("mdw-show"), this.classList.add("mdw-hide"), this._backdrop && this._backdrop.remove(), b(document.body, this.bound_onSwipe), this._isNavigationDrawer && document.body.classList.remove("mdw-navigation-drawer-open"), setTimeout(() => {
          e2();
        }, 200);
      });
    }
    toggle() {
      this.isHidden ? this.open() : this.close();
    }
    onSwipe(e2) {
      this.isLeft ? -1 === e2.direction.x && e2.velocity.x < -0.8 && this.close() : 1 === e2.direction.x && e2.velocity.x > 0.8 && this.close();
    }
  }), customElements.define("mdw-slider", class extends g {
    constructor() {
      super(), this.cloneTemplate(), this.bound_onMouseDown = this.onMouseDown.bind(this), this.bound_onMouseUp = this.onMouseUp.bind(this), this.bound_onMouseMove = this.onMouseMove.bind(this), this.bound_onMouseEnter = this.onMouseEnter.bind(this), this.bound_onMouseLeave = this.onMouseLeave.bind(this), this.bound_trackClick = this.trackClick.bind(this), this.bound_onDrag = this.onDrag.bind(this);
    }
    connectedCallback() {
      this.value = this.attrValue, this.thumbContainer.style.left = `${(this.attrValue - this.min) / this.range * this.offsetWidth}px`, this.notchContainer.style.marginLeft = `-${this.offsetWidth - (this.attrValue - this.min) / this.range * this.offsetWidth}px`, this.throttled_dispatchChange = a.rafThrottle(this.dispatchChange), c(this.thumb, this.bound_onDrag);
    }
    disconnectedCallback() {
      this.track.removeEventListener("click", this.bound_trackClick), h(this.thumb, this.bound_onDrag);
    }
    static get observedAttributes() {
      return ["value", "min", "max", "step"];
    }
    attributeChangedCallback(e2, t2, n2) {
      this[e2] = n2, ["min", "max", "step"].includes(e2) && this.render();
    }
    get min() {
      return this.min_ || 0;
    }
    set min(e2) {
      this.min_ = parseFloat(e2);
    }
    get max() {
      return this.max_ || 100;
    }
    set max(e2) {
      this.max_ = parseFloat(e2);
    }
    get range() {
      return this.max - this.min;
    }
    get step() {
      return this.step_;
    }
    set step(e2) {
      this.step_ = parseFloat(e2);
    }
    get stepCount() {
      return this.step ? Math.floor(this.range / this.step) : 0;
    }
    get attrValue() {
      let e2 = parseFloat(this.getAttribute("value") || 0);
      return e2 < this.min && (e2 = this.min), e2;
    }
    get value() {
      const {width: e2} = this.getBoundingClientRect(), t2 = (this.thumbContainer.style.left || "0px").replace("px", "") / e2, n2 = this.range;
      return this.value_ = this.min + t2 * n2, ("" + this.step).includes(".") || (this.value_ = parseInt(this.value_)), this.value_ || 0;
    }
    set value(e2) {
      this.value_ = parseFloat(e2);
    }
    get thumb() {
      return this.shadowRoot.querySelector(".mdw-slider__thumb-hover");
    }
    get thumbContainer() {
      return this.thumbContainer_ || (this.thumbContainer_ = this.shadowRoot.querySelector(".mdw-slider__thumb-container")), this.thumbContainer_;
    }
    get notchContainer() {
      return this.notchContainer_ || (this.notchContainer_ = this.shadowRoot.querySelector(".mdw-slider__notch-container")), this.notchContainer_;
    }
    get track() {
      return this.shadowRoot.querySelector(".mdw-slider__track-container");
    }
    trackClick(e2) {
      const {left: t2, width: n2} = this.getBoundingClientRect();
      let i2 = e2.layerX;
      e2.clientX < t2 && (i2 = 0), i2 > n2 && (i2 = n2), this.thumbContainer.style.left = `${this.snap(i2, n2)}px`, this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(i2, n2)}px`, this.dispatchChange();
    }
    onDrag(e2) {
      switch (e2.state) {
        case "start":
          this.classList.add("mdw-pressed"), this.initialX_ = parseInt((this.thumbContainer.style.left || "0px").replace("px", ""));
          break;
        case "move":
          const {left: t2, width: n2} = this.getBoundingClientRect();
          let i2 = e2.distance.x + this.initialX_;
          i2 < 0 && (i2 = 0), i2 > n2 && (i2 = n2), this.thumbContainer.style.left = `${this.snap(i2, n2)}px`, this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(i2, n2)}px`, this.throttled_dispatchChange();
          break;
        case "end":
          this.classList.remove("mdw-pressed");
      }
    }
    onMouseDown(e2) {
      this.classList.add("mdw-pressed"), document.addEventListener("mouseup", this.bound_onMouseUp), document.addEventListener("mousemove", this.bound_onMouseMove);
    }
    onMouseUp(e2) {
      this.classList.remove("mdw-pressed"), document.removeEventListener("mouseup", this.bound_onMouseUp), document.removeEventListener("mousemove", this.bound_onMouseMove);
    }
    onMouseMove(e2) {
      const {left: t2, width: n2} = this.getBoundingClientRect();
      let i2 = e2.layerX;
      e2.clientX < t2 && (i2 = 0), i2 > n2 && (i2 = n2), this.thumbContainer.style.left = `${this.snap(i2, n2)}px`, this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(i2, n2)}px`, this.throttled_dispatchChange();
    }
    onMouseEnter(e2) {
      this.classList.add("mdw-hover"), this.thumb.addEventListener("mouseleave", this.bound_onMouseLeave);
    }
    onMouseLeave(e2) {
      this.classList.remove("mdw-hover"), this.thumb.removeEventListener("mouseleave", this.bound_onMouseLeave);
    }
    snap(e2, t2) {
      if (!this.step)
        return e2;
      const n2 = e2 / t2, i2 = this.range, s2 = n2 * i2;
      return (s2 - s2 % this.step) / i2 * t2;
    }
    dispatchChange() {
      this.dispatchEvent(new Event("change", this));
    }
    template() {
      return `
      <div class="mdw-slider__track-container">
        <div class="mdw-slider__track"></div>

        <div class="mdw-slider__notch-container">
          <div class="mdw-slider__notch-pre-container">
            ${[...new Array(this.stepCount)].map((e2) => '<div class="mdw-slider__notch"></div>').join("\n")}
          </div>

          <div class="mdw-slider__notch-post-container">
            ${[...new Array(this.stepCount)].map((e2) => '<div class="mdw-slider__notch"></div>').join("\n")}
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
      return "\n      .mdw-slider__track-container {\n        position: absolute;\n        top: 50%;\n        width: 100%;\n        height: 10px;\n        margin-top: -6px;\n        overflow: hidden;\n        user-select: none;\n        -webkit-user-select: none;\n      }\n\n      .mdw-slider__track {\n        position: absolute;\n        width: 100%;\n        height: 2px;\n        top: 50%;\n        user-select: none;\n        -webkit-user-select: none;\n        /* background-color: var(--mdw-theme-secondary); */\n      }\n\n      /* :host(.mdw-primary) .mdw-slider__track {\n        background-color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-error) .mdw-slider__track {\n        background-color: var(--mdw-theme-error);\n      } */\n\n\n      .mdw-slider__thumb-container {\n        position: absolute;\n        top: 50%;\n        left: 0;\n        user-select: none;\n        -webkit-user-select: none;\n        z-index: 2;\n      }\n\n      .mdw-slider__thumb {\n        box-sizing: border-box;\n        width: 12px;\n        height: 12px;\n        border-radius: 50%;\n        margin-top: -50%;\n        z-index: 2;\n        background-color: var(--mdw-theme-secondary);\n        cursor: pointer;\n        user-select: none;\n        -webkit-user-select: none;\n      }\n\n      :host(.mdw-primary) .mdw-slider__thumb {\n        background-color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-error) .mdw-slider__thumb {\n        background-color: var(--mdw-theme-error);\n      }\n\n      .mdw-slider__thumb-hover {\n        position: absolute;\n        box-sizing: border-box;\n        top: -12px;\n        left: -6px;\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n        transform-origin: center center;\n        transition: opacity .1s ease-out,fill .1s ease-out,\n                    transform .1s ease-out,fill .1s ease-out;\n        opacity: 0;\n        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);\n        cursor: pointer;\n        user-select: none;\n      }\n\n      :host(.mdw-primary) .mdw-slider__thumb-hover {\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);\n      }\n\n      :host(.mdw-error) .mdw-slider__thumb-hover {\n        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);\n      }\n\n      :host(.mdw-hover) .mdw-slider__thumb-hover {\n        opacity: 1;\n      }\n\n      :host(.mdw-pressed) .mdw-slider__thumb-hover {\n        transform: scale(1.8);\n      }\n\n\n\n\n      /* --- notches --- */\n\n      .mdw-slider__notch-container {\n        display: flex;\n        width: 200%;\n        user-select: none;\n        -webkit-user-select: none;\n      }\n\n      .mdw-slider__notch-pre-container {\n        width: 100%;\n        height: 2px;\n        display: flex;\n        flex-direction: row;\n        margin-top: 5px;\n        overflow: hidden;\n        z-index: 1;\n        background-color: var(--mdw-theme-secondary);\n        user-select: none;\n        -webkit-user-select: none;\n      }\n\n      :host(.mdw-primary) .mdw-slider__notch-pre-container {\n        background-color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-error) .mdw-slider__notch-pre-container {\n        background-color: var(--mdw-theme-error);\n      }\n\n      .mdw-slider__notch-pre-container .mdw-slider__notch {\n        height: 2px;\n        flex: 1;\n        border-left: 3px solid rgba(255, 255, 255, 0.6);\n      }\n\n      .mdw-slider__notch-post-container {\n        width: 100%;\n        height: 2px;\n        display: flex;\n        flex-direction: row;\n        margin-top: 5px;\n        overflow: hidden;\n        z-index: 1;\n        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.5);\n        user-select: none;\n        -webkit-user-select: none;\n      }\n\n      :host(.mdw-primary) .mdw-slider__notch-post-container {\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.5);\n      }\n\n      :host(.mdw-error) .mdw-slider__notch-post-container {\n        background-color: rgba(var(--mdw-theme-error--rgb), 0.5);\n      }\n\n      .mdw-slider__notch-post-container .mdw-slider__notch {\n        height: 2px;\n        flex: 1;\n        border-left: 3px solid rgba(0, 0, 0, 0.6);\n      }\n    ";
    }
  });
  const L = new class {
    constructor() {
      this.queue = [];
    }
    add(e2) {
      this.queue.push({
        el: e2
      }), this.handleQueue();
    }
    remove(e2, t2) {
      this.current && this.current.el === e2 ? e2._close(t2) : this.queue = this.queue.filter((t3) => t3.el !== e2);
    }
    handleQueue() {
      0 !== this.queue.length && (this.current || (this.current = this.queue.shift(), this.current.el._open(), this.current.el.addEventListener("close", () => {
        this.current = void 0, setTimeout(() => {
          this.handleQueue();
        }, 300);
      })));
    }
    show({message: e2, actionLabel: t2, position: n2}) {
      return new Promise((i2) => {
        const s2 = this.uid(), o2 = this.template({
          id: s2,
          message: e2,
          actionLabel: t2
        });
        this.topLevelElement.insertAdjacentHTML("beforeend", o2);
        const r2 = document.querySelector(`#${s2}`), a2 = (e3) => {
          i2(e3.detail.ok), r2.removeEventListener("close", a2), r2.remove();
        };
        r2.addEventListener("close", a2), n2 && r2.setPosition(n2), r2.show();
      });
    }
    get topLevelElement() {
      let e2 = document.body.querySelector("mdw-content");
      return e2 || (e2 = document.body.querySelector("mdw-body"), e2 || document.body);
    }
    uid() {
      return `snackbar_${parseInt(99999 * Math.random())}`;
    }
    template({id: e2, message: t2, actionLabel: n2}) {
      return `
      <mdw-snackbar id="${e2}">
        <mdw-panel>
          <mdw-snackbar-container>
            <mdw-snackbar-content>${t2}</mdw-snackbar-content>
            <mdw-snackbar-actions>
              ${n2 ? `<mdw-button class="mdw-action-button">${n2}</mdw-button>` : ""}
              <mdw-button onclick="${e2}.close(true)" class="mdw-close-button mdw-icon">
                <mdw-icon>close</mdw-icon>
              </mdw-button>
            </mdw-snackbar-actions>
          </mdw-snackbar-container>
        </mdw-panel>
      </mdw-snackbar>
    `;
    }
  }();
  window.MDWSnackbar = L;
  var C = L;
  customElements.define("mdw-snackbar", class extends g {
    constructor() {
      super(), this.bound_onPanelClose = this.onPanelClose.bind(this), this.panelId = `${this.getAttribute("id")}_panel`;
    }
    connectedCallback() {
      this.querySelector("mdw-panel").setAttribute("id", `${this.panelId}`), this.hasBckdrop = true, this.panel.clickOutsideClose = false;
    }
    disconnectedCallback() {
      this.panel.removeEventListener("MDWPanel:closed", this.bound_onPanelClose);
    }
    get panel() {
      return document.querySelector(`#${this.panelId}`);
    }
    get position() {
      return this.position_ || "inner-bottom inner-left";
    }
    setPosition(e2) {
      const t2 = e2.split(" ");
      this.position_ = `${t2[0] || "top"} ${t2[1] || "left"}`, this.panel.setPosition(this.position);
    }
    show() {
      C.add(this);
    }
    close(e2) {
      C.remove(this, e2);
    }
    _open() {
      this.panel.hoistToBody(this.parentNode), this.panel.setPosition(this.position), this.panel.autoPosition(), this.panel.open(), this.panel.addEventListener("MDWPanel:closed", this.bound_onPanelClose), this.autoCancelTimeout = setTimeout(() => {
        this.close();
      }, 3000);
    }
    _close(e2) {
      this.panel.removeEventListener("MDWPanel:closed", this.bound_onPanelClose), this.panel.close(), this.dispatchClose(e2), clearTimeout(this.autoCancelTimeout), setTimeout(() => {
        this.panel.remove();
      }, 200);
    }
    onPanelClose() {
      this.panel.removeEventListener("MDWPanel:closed", this.bound_onPanelClose);
    }
    dispatchClose(e2 = false) {
      this.dispatchEvent(new CustomEvent("close", {
        detail: {
          ok: e2
        }
      }));
    }
  }), customElements.define("mdw-switch", class extends g {
    constructor() {
      super(), this.bound_onInputChange = this.onInputChange.bind(this), this.cloneTemplate();
    }
    connectedCallback() {
      this.input.addEventListener("change", this.bound_onInputChange), this.ripple = new f({
        element: this.shadowRoot.querySelector(".mdw-ripple"),
        triggerElement: [this.input],
        radius: 20,
        centered: true
      });
    }
    disconnectedCallback() {
      this.input.addEventListener("click", this.bound_click), this.ripple.destroy();
    }
    static get observedAttributes() {
      return ["checked", "disabled"];
    }
    attributeChangedCallback(e2, t2, n2) {
      this[e2] = n2;
    }
    get input() {
      return this.input_ || (this.input_ = this.shadowRoot.querySelector("input")), this.input_;
    }
    get checked() {
      return this.input.checked;
    }
    set checked(e2) {
      "" === e2 && (e2 = true), this.input.checked = e2, this.updateCheckedClass();
    }
    set disabled(e2) {
      (e2 = !!e2 || "" === e2) ? this.input.setAttribute("disabled", "disabled") : this.input.removeAttribute("disabled");
    }
    updateCheckedClass() {
      this.checked ? this.classList.add("checked") : this.classList.remove("checked");
    }
    dispatchChange() {
      this.dispatchEvent(new Event("change"));
    }
    onInputChange(e2) {
      this.updateCheckedClass(), this.dispatchChange();
    }
    template() {
      return '\n      <div class="mdw-track"></div>\n      <div class="mdw-thumb-underlay">\n        <div class="mdw-thumb">\n          <input type="checkbox" role="switch">\n          <div class="mdw-ripple mdw-switch-ripple"></div>\n        </div>\n      </div>\n    ';
    }
    styles() {
      return '\n      .mdw-track {\n        box-sizing: border-box;\n        width: 32px;\n        height: 14px;\n        border: 1px solid;\n        border-radius: 7px;\n        opacity: .38;\n        transition: opacity 90ms cubic-bezier(.4,0,.2,1),\n                    background-color 90ms cubic-bezier(.4,0,.2,1),\n                    border-color 90ms cubic-bezier(.4,0,.2,1);\n      }\n\n      :host(:not(.checked)) .mdw-track {\n        background-color: rgba(var(--mdw-theme-on-background--rgb), 0.7);\n        border-color: rgba(var(--mdw-theme-on-background--rgb), 0.7);\n      }\n\n      :host(.checked) .mdw-track {\n        background-color: var(--mdw-theme-secondary);\n        border-color: var(--mdw-theme-secondary);\n        opacity: .54;\n      }\n\n      :host(.checked.mdw-primary) .mdw-track {\n        background-color: var(--mdw-theme-primary);\n        border-color: var(--mdw-theme-primary);\n      }\n\n      :host(.checked.mdw-error) .mdw-track {\n        background-color: var(--mdw-theme-error);\n        border-color: var(--mdw-theme-error);\n      }\n\n\n\n      /* --- thumb underlay --- */\n\n      .mdw-thumb-underlay {\n        -webkit-tap-highlight-color: rgba(0,0,0,0);\n        display: flex;\n        position: absolute;\n        will-change: transform,opacity;\n        left: -18px;\n        right: auto;\n        top: -17px;\n        align-items: center;\n        justify-content: center;\n        width: 48px;\n        height: 48px;\n        transform: translateX(0);\n        transition: transform 90ms cubic-bezier(.4,0,.2,1),\n                    background-color 90ms cubic-bezier(.4,0,.2,1),\n                    border-color 90ms cubic-bezier(.4,0,.2,1);\n      }\n\n      :host(.checked) .mdw-thumb-underlay {\n        transform: translateX(20px);\n      }\n\n      .mdw-thumb-underlay:after,\n      .mdw-thumb-underlay:before {\n        position: absolute;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: "";\n        background-color: var(--mdw-theme-secondary);\n      }\n\n      :host(.mdw-primary) .mdw-thumb-underlay:after,\n      :host(.mdw-primary) .mdw-thumb-underlay:before {\n        background-color: var(--mdw-theme-primary);\n      }\n\n      :host(.mdw-error) .mdw-thumb-underlay:after,\n      :host(.mdw-error) .mdw-thumb-underlay:before {\n        background-color: var(--mdw-theme-error);\n      }\n\n      .mdw-thumb-underlay:before {\n        transition: opacity 15ms linear,background-color 15ms linear;\n        z-index: 1;\n      }\n\n\n\n      /* --- thumb --- */\n\n      .mdw-thumb {\n        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n                    0 2px 2px 0 rgba(0,0,0,.14),\n                    0 1px 5px 0 rgba(0,0,0,.12);\n        box-sizing: border-box;\n        width: 20px;\n        height: 20px;\n        border: 10px solid;\n        border-radius: 50%;\n        pointer-events: none;\n        z-index: 1;\n      }\n\n      :host(.checked) .mdw-thumb {\n        background-color: var(--mdw-theme-secondary);\n        border-color: var(--mdw-theme-secondary);\n      }\n\n      :host(.checked.mdw-primary) .mdw-thumb {\n        background-color: var(--mdw-theme-primary);\n        border-color: var(--mdw-theme-primary);\n      }\n\n      :host(.checked.mdw-error) .mdw-thumb {\n        background-color: var(--mdw-theme-error);\n        border-color: var(--mdw-theme-error);\n      }\n\n      :host(:not(.checked)) .mdw-thumb {\n        background-color: #fff;\n        border-color: #fff;\n      }\n\n\n      /* --- input --- */\n\n      input {\n        left: 0;\n        right: auto;\n        position: absolute;\n        top: 0;\n        width: 68px;\n        height: 48px;\n        margin: 0;\n        opacity: 0;\n        cursor: pointer;\n        pointer-events: auto;\n      }\n\n      :host(.checked) input {\n        transform: translateX(-20px);\n      }\n\n\n\n      /* --- ripple --- */\n\n      .mdw-ripple {\n        overflow: hidden;\n      }\n\n      .mdw-ripple.mdw-ripple-unbounded {\n        overflow: visible;\n      }\n\n      .mdw-ripple-element {\n        position: absolute;\n        border-radius: 50%;\n        pointer-events: none;\n        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n        transform: scale(0);\n        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);\n      }\n\n      :host(.mdw-primary) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);\n      }\n\n      :host(.mdw-error) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);\n      }\n\n      .mdw-switch-ripple {\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        border-radius: 50%;\n        z-index: 1;\n        pointer-events: none;\n      }\n    ';
    }
  }), customElements.define("mdw-tab-body", class extends g {
    constructor() {
      super(), this.cloneTemplate();
    }
    connectedCallback() {
      this.parentNode.registerBody(this);
    }
    disconnectedCallback() {
      this.parentNode.unregisterBody(this);
    }
    addSlot() {
      this.shadowRoot.querySelector("mdw-tab-body-content").insertAdjacentHTML("beforeend", "<slot></slot>");
    }
    removeSlot() {
      this.shadowRoot.querySelector("slot").remove();
    }
    activate() {
      this.addSlot(), this.classList.add("mdw-active");
    }
    deactivate() {
      this.removeSlot(), this.classList.remove("mdw-active");
    }
    template() {
      return "\n      <mdw-tab-body-content>\n        <!-- slot is added dynamicly -->\n      </mdw-tab-body-content>\n    ";
    }
    styles() {
      return "\n      mdw-tab-body-content {\n        height: 100%;\n        overflow: auto;\n      }\n    ";
    }
  }), customElements.define("mdw-tab-button", class extends g {
    constructor() {
      super(), this.bound_click = this.click.bind(this), this.cloneTemplate();
    }
    connectedCallback() {
      this.ripple = new f({
        element: this.shadowRoot.querySelector(".mdw-ripple"),
        triggerElement: this
      }), this.parentNode.registerTab(this), this.addEventListener("click", this.bound_click);
    }
    disconnectedCallback() {
      this.ripple.destroy(), this.parentNode.unregisterTab(this), this.removeEventListener("click", this.bound_click);
    }
    get indicator() {
      return this.shadowRoot.querySelector(".mdw-tab-button-indicator__content");
    }
    click(e2) {
      this.parentNode.tabClick(this);
    }
    activate() {
      clearTimeout(this._animationTimer), this.indicator.style.transform = "", this._runNextAnimationFrame(() => {
        this._animationTimer = setTimeout(() => {
          this.classList.add("mdw-active");
        }, 180);
      });
    }
    deactivate(e2) {
      clearTimeout(this._animationTimer), this.indicator.style.transform = `translateX(${e2.toString()}px)`, this._animationTimer = setTimeout(() => {
        this.classList.remove("mdw-active");
      }, 200);
    }
    _runNextAnimationFrame(e2) {
      cancelAnimationFrame(this._animationFrame), this._animationFrame = requestAnimationFrame(() => {
        this._animationFrame = 0, clearTimeout(this._animationTimer), this._animationTimer = setTimeout(e2, 0);
      });
    }
    template() {
      return '\n      <span class="text"><slot></slot></span>\n      <span class="mdw-tab-button-indicator">\n        <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>\n      </span>\n      <div class="mdw-ripple mdw-tab-button-ripple"></div>\n    ';
    }
    styles() {
      return "\n      :host(.mdw-show-spinner) span.text {\n        opacity: 0;\n      }\n\n      /* Add this to button or creat a new componenet mdw-tab */\n      .mdw-tab-button-indicator {\n        display: flex;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        z-index: 1;\n      }\n\n      :host(.mdw-active) .mdw-tab-button-indicator .mdw-tab-button-indicator__content {\n        transition: transform .2s cubic-bezier(.4,0,.2,1);\n      }\n\n      .mdw-tab-button-indicator__content {\n        opacity: 0;\n        transform-origin: left;\n      }\n\n      :host(.mdw-active) .mdw-tab-button-indicator__content {\n        opacity: 1;\n        transform: translateX(0);\n      }\n\n      .mdw-tab-button-indicator .mdw-tab-button-indicator__content--underline {\n        align-self: flex-end;\n        width: 100%;\n        background-color: var(--mdw-theme-primary);\n        height: 2px;\n      }\n\n\n      /* --- Ripple --- */\n\n      .mdw-ripple {\n        overflow: hidden;\n      }\n\n      .mdw-ripple.mdw-ripple-unbounded {\n        overflow: visible;\n      }\n\n      .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);\n        position: absolute;\n        border-radius: 50%;\n        pointer-events: none;\n        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n        transform: scale(0);\n      }\n\n      .mdw-tab-button-ripple,\n      .mdw-tab-button-focus-overlay {\n        border-radius: inherit;\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        pointer-events: none;\n      }\n\n      :host(.mdw-active) .mdw-ripple-element {\n        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);\n      }\n    ";
    }
  }), customElements.define("mdw-tabs-bar", class extends g {
    constructor() {
      super(), this._activeTab = 0, this.tabIdCounter = 0, this._contentElements = [], this.cloneTemplate();
    }
    registerTab(e2) {
      e2.setAttribute("tab-id", this.tabIdCounter), 0 === this.tabIdCounter && (this.activeTab = e2, e2.activate()), this.tabIdCounter++;
    }
    unregisterTab(e2) {
    }
    registerContent(e2) {
      this._contentElements.push(e2), e2.changeTab(this.activeTab.getAttribute("tab-id"));
    }
    unregisterContent(e2) {
      this._contentElements = this._contentElements.filter((t2) => t2 != e2);
    }
    tabClick(e2) {
      const t2 = parseInt(e2.getBoundingClientRect().x - this.activeTab.getBoundingClientRect().x);
      this.activeTab.deactivate(t2), this.activeTab = e2, this.activeTab.activate(), this._contentElements.forEach((e3) => e3.changeTab(this.activeTab.getAttribute("tab-id")));
    }
    get activeTab() {
      return this._activeTab;
    }
    set activeTab(e2) {
      this._activeTab = e2;
    }
    get internalStylesFile() {
      return "./internal.css";
    }
    template() {
      return "\n      <mdw-tabs-bar-scroller>\n        <mdw-tabs-bar-scroller-area>\n          <mdw-tabs-bar-scroller-content>\n            <slot></slot>\n          </mdw-tabs-bar-scroller-content>\n        </mdw-tabs-bar-scroller-area>\n      </mdw-tabs-bar-scroller>\n    ";
    }
    styles() {
      return "\n      mdw-tabs-bar-scroller {\n        display: block;\n        overflow-y: hidden;\n      }\n\n      mdw-tabs-bar-scroller-area {\n        display: flex;\n        /* overflow-x: scroll; */\n      }\n\n      mdw-tabs-bar-scroller-content {\n        position: relative;\n        display: flex;\n        flex: 1 0 auto;\n        transform: none;\n        will-change: transform;\n      }\n\n      ::slotted(mdw-button) {\n        flex: 1 0 auto;\n      }\n    ";
    }
  }), customElements.define("mdw-tabs-content", class extends g {
    constructor() {
      super(), this._bodies = [];
    }
    connectedCallback() {
      this.tabsBar.registerContent(this);
    }
    disconnectedCallback() {
      this.tabsBar && this.tabsBar.unregisterContent(this);
    }
    get tabsBar() {
      return document.body.querySelector(`mdw-tabs-bar#${this.getAttribute("tabs-id")}`);
    }
    registerBody(e2) {
      this._bodies.push(e2), void 0 !== this._wiatForBodyActiveId && this._bodies.length === this._wiatForBodyActiveId + 1 && (this._activeBody = e2, e2.activate(), this._wiatForBodyActiveId = void 0);
    }
    unregisterBody(e2) {
      this._bodies = this._bodies.filter((t2) => t2 != e2);
    }
    changeTab(e2) {
      this._bodies.length ? (this._activeBody && this._activeBody.deactivate(), this._activeBody = this._bodies[e2], this._activeBody.activate()) : this._wiatForBodyActiveId = parseInt(e2);
    }
  }), customElements.define("mdw-textfield", class extends g {
    constructor() {
      super(), this.classList.add("mdw-no-animation"), this.bound_onFocus = this.onFocus.bind(this), this.bound_onBlur = this.onBlur.bind(this), this.bound_onInput = this.onInput.bind(this);
    }
    connectedCallback() {
      this.compose(), this.checkForValue(), requestAnimationFrame(() => {
        this.classList.remove("mdw-no-animation");
      }), this.input.addEventListener("focus", this.bound_onFocus), this.input.addEventListener("blur", this.bound_onBlur), this.input.addEventListener("input", this.bound_onInput), this.classList.toggle("mdw-invalid", !this.valid);
    }
    disconnectedCallback() {
      this.input.removeEventListener("focus", this.bound_onFocus), this.input.removeEventListener("blur", this.bound_onBlur), this.input.removeEventListener("input", this.bound_onInput);
    }
    compose() {
      this.classList.add("mdw-upgraded"), this.isTextarea() && this.classList.add("mdw-textarea"), this.outlined && (this.insertAdjacentHTML("beforeend", this.outlinedHTML), this.setNotchWidth()), this.querySelector(".mdw-line-ripple") || this.insertAdjacentHTML("beforeend", this.lineRippleHTML), this.isTrailingIcon() && this.classList.add("mdw-trailing-icon");
    }
    checkForValue() {
      this.classList.toggle("not-empty", !!this.input.value.length);
    }
    onFocus() {
      this.setNotchWidth();
    }
    onBlur() {
      this.classList.toggle("not-empty", !!this.input.value.length), this.classList.toggle("mdw-invalid", !this.valid);
    }
    onInput() {
      this.classList.toggle("mdw-invalid", !this.valid);
    }
    setNotchWidth() {
      this.outlined && (this.notch.style.width = this.labelWidth + "px");
    }
    isTrailingIcon() {
      return !!this.iconElement && [...this.children].indexOf(this.iconElement) > 1;
    }
    isTextarea() {
      return !!this.querySelector("textarea");
    }
    clear() {
      this.input.value = "";
    }
    get valid() {
      return this.input.validity.valid;
    }
    get outlined() {
      return [].slice.apply(this.classList || []).includes("mdw-outlined");
    }
    get input() {
      return this.inputType_ || (this.inputType_ = this.querySelector("input") ? "input" : "textarea"), this.querySelector(this.inputType_);
    }
    get notch() {
      return this.querySelector(".mdw-outlined-notch");
    }
    get label() {
      return this.querySelector("label");
    }
    get labelWidth() {
      return 0.95 * this.label.offsetWidth;
    }
    get helperTextElement() {
      return this.querySelector("mdw-textfield-helper");
    }
    get iconElement() {
      return this.querySelector("mdw-icon");
    }
    get outlinedHTML() {
      return '\n      <div class="mdw-outlined-border-container">\n        <div class="mdw-outlined-leading"></div>\n        <div class="mdw-outlined-notch"></div>\n        <div class="mdw-outlined-trailing"></div>\n      </div>\n    ';
    }
    get lineRippleHTML() {
      return '<div class="mdw-line-ripple"></div>';
    }
  }), customElements.define("mdw-top-app-bar", class extends g {
    constructor() {
      super(), this._throttledScrollHandler = a.rafThrottle(this._scrollHandler), this._throttledResizeHandler = a.rafThrottle(this._resizeHandler), this.bound_throttledScrollHandler = this._throttledScrollHandler.bind(this), this.bound_throttledResizeHandler = this._throttledResizeHandler.bind(this), document.body.classList.add("mdw-has-top-app-bar");
    }
    connectedCallback() {
      this._isProminent = this.hasAttribute("mdw-prominent"), this._isFixed = this.hasAttribute("mdw-fixed"), this._isShrink = this.hasAttribute("mdw-shrink"), this.parentNode && "HEADER" === this.parentNode.nodeName && (this.parentNode.classList.add("mdw-top-app-bar"), this._isProminent && this.parentNode.classList.add("mdw-prominent"), this._isShrink && this.parentNode.classList.add("mdw-shrink"), this._isFixed && this.parentNode.classList.add("mdw-fixed")), this._isShrink && (this._animationElements = [...this.querySelectorAll("[mdw-animation-property]") || []].map((e2) => {
        const t2 = parseFloat(e2.getAttribute("mdw-animation-start") || 0), n2 = parseFloat(e2.getAttribute("mdw-animation-end") || 0), i2 = e2.getAttribute("mdw-animation-property").split(":");
        return {
          element: e2,
          property: i2[0],
          valueWrapper: i2[1] || "",
          start: t2,
          end: n2,
          range: Math.abs(t2 - n2)
        };
      }), this._scrollTarget = this._getScrollTarget(), this._lastScrollPosition = this._getViewportScrollY(), this._topAppBarHeight = this.clientHeight + 6, this._scrollHandler(), this._createObserver(), this._scrollTarget.addEventListener("scroll", this.bound_throttledScrollHandler)), (this._isFixed || this._isShrink) && (this._page = document.querySelector("mdw-page"), this._page && (this.style.width = `${this._page.offsetWidth}px`)), window.addEventListener("resize", this.bound_throttledResizeHandler);
    }
    disconnectedCallback() {
      this._observer && (this._observer.unobserve(this), this._observer.disconnect(), this._observer = void 0), this._scrollTarget && this._scrollTarget.removeEventListener("scroll", this.bound_throttledScrollHandler), window.removeEventListener("resize", this.throttledResizeHandler);
    }
    notContextual() {
      this.removeAttribute("mdw-contextual");
    }
    contextual() {
      this.setAttribute("mdw-contextual", "");
    }
    _getAllFixedSections() {
      return this.querySelectorAll("section[mdw-fixed]");
    }
    _getScrollTarget() {
      if ("HEADER" === this.parentNode.nodeName) {
        const e3 = this.parentNode.parentNode.querySelector("header + mdw-content:not([mdw-no-scroll])");
        if (e3)
          return e3;
      }
      const e2 = document.querySelector("mdw-page-content");
      if (e2 && e2.contains(this))
        return e2;
      const t2 = document.querySelector("mdw-content");
      return t2 && t2.contains(this) ? t2 : window;
    }
    _getViewportScrollY() {
      return this._scrollTarget[this._scrollTarget === window ? "pageYOffset" : "scrollTop"];
    }
    _scrollHandler() {
      const e2 = Math.max(this._getViewportScrollY(), 0);
      let t2;
      if (this._isProminent) {
        const n2 = this._topAppBarHeight / 2;
        t2 = e2 <= n2 ? e2 : n2;
      } else
        t2 = e2 <= this._topAppBarHeight ? e2 : this._topAppBarHeight;
      this.style.transform = `translateY(-${t2}px)`, this._getAllFixedSections().forEach((e3) => {
        e3.style.transform = `translateY(${t2}px)`;
      });
    }
    _resizeHandler() {
      (this._isFixed || this._isShrink) && (this._page = document.querySelector("mdw-page"), this._page && (this.style.width = `${this._page.offsetWidth}px`));
    }
    _createObserver() {
      0 !== this._animationElements.length && (this._observer = new IntersectionObserver(this._handleIntersect.bind(this), {
        root: null,
        rootMargin: "0px",
        threshold: this._buildThresholdList()
      }), this._observer.observe(this));
    }
    _buildThresholdList() {
      let e2 = [];
      for (let t2 = 1; t2 <= 68; t2++) {
        let n2 = t2 / 68;
        e2.push(n2);
      }
      return this._intersectionThresholds = e2, this._intersectionThresholds;
    }
    _handleIntersect(e2, t2) {
      e2.forEach((e3) => {
        let t3;
        this._isProminent && (t3 = -e3.boundingClientRect.top / (this._topAppBarHeight / 2)), this._animationElements.forEach((e4) => this._animationValue(t3, e4));
      });
    }
    _animationValue(e2, {element: t2, property: n2, valueWrapper: i2, start: s2, end: o2, range: r2}) {
      t2.style[n2] = i2.replace("#", s2 - e2 * r2);
    }
  }), customElements.define("mdw-bound-property", class extends g {
    constructor() {
      super(), this._property = this.innerHTML, this.innerHTML = "";
    }
    connectedCallback() {
      const e2 = this;
      this._value = window.activePage[this._property], Object.defineProperty(window.activePage, this._property, {
        configurable: true,
        enumerable: true,
        get: () => e2._value,
        set(t2) {
          e2._value = t2, e2.innerHTML = t2;
        }
      });
    }
  });
  const T = new class {
    constructor() {
      this._templates = {}, this._loadedTemplates = {};
    }
    registerOnce(e2, t2) {
      this._templates[e2] || this.register(e2, t2);
    }
    async registerAndLoad(e2, t2) {
      this._templates[e2] || (this.register(e2, t2), t2.includes(".html") && await this.loadHtml(t2));
    }
    register(e2, t2) {
      if (!e2)
        throw Error("requires id");
      if (!t2)
        throw Error("requires templateString");
      if (this._templates[e2])
        throw Error(`id "${e2}" already taken`);
      this._templates[e2] = t2;
    }
    unregister(e2) {
      this._templates[e2] = void 0;
    }
    isString(e2) {
      return "string" == typeof e2 && (!e2.includes(".html") && e2.includes("<"));
    }
    async get(e2, t2) {
      if (!this._templates[e2])
        throw Error(`no template found with id: ${e2}`);
      const n2 = this._templates[e2];
      return "function" == typeof n2 ? n2(t2) : n2.includes(".html") ? await this.loadHtml(n2) : n2;
    }
    async loadHtml(e2) {
      if (this._loadedTemplates[e2])
        return this._loadedTemplates[e2];
      const t2 = await fetch(e2), n2 = await t2.text();
      return this._loadedTemplates[e2] = n2, n2;
    }
  }();
  window.MDWTemplate = T;
  var S = T;
  customElements.define("mdw-template", class extends g {
    constructor() {
      super();
      const e2 = this.templateId;
      e2 && S.get(e2).then((e3) => {
        this.insertAdjacentHTML("beforeend", e3);
      });
      const t2 = this.templateUrl;
      t2 && S.loadHtml(t2).then((e3) => {
        this.insertAdjacentHTML("beforeend", e3);
      });
    }
    get templateId() {
      return this.getAttribute("template-id");
    }
    get templateUrl() {
      return this.getAttribute("template-url");
    }
    async show(e2) {
      const t2 = await S.get(e2);
      this.innerHTML = t2;
    }
  });
  const A = ["panel", "sheetBottom", "sheetSide"], P = ["scale", "height"], M = ["top", "center"];
  class R {
    constructor({id: e2, component: t2, template: n2, animation: i2}) {
      this._id = e2, this._component = t2, this._template = n2, this._animation = i2;
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
    async open() {
      const e2 = document.querySelector("mdw-page");
      switch (e2 ? e2.insertAdjacentHTML("afterEnd", this._template) : document.body.insertAdjacentHTML("beforeend", this._template), this._element = document.querySelector(`#${this.id}`), this.component) {
        case "panel":
          this._element.setAnimation(this._animation), this.element.open();
          break;
        case "sheetBottom":
        case "sheetSide":
          this.element.open();
      }
      window._activeSurface && await window._activeSurface.close(), window._activeSurface = this;
    }
    async close() {
      switch (this.component) {
        case "panel":
        case "sheetBottom":
        case "sheetSide":
          await this.element.close();
      }
      this.element.remove(), window._activeSurface = void 0;
    }
  }
  const D = new class {
    constructor() {
      this._defaultMobileComponent = "panel", this._defaultDesktopComponent = "sheetSide";
    }
    setDefaultMobileComponent(e2) {
      this._validateComponent(e2), this._defaultMobileComponent = e2;
    }
    setDefaultDesktopComponent(e2) {
      this._validateComponent(e2), this._defaultDesktopComponent = e2;
    }
    async open({template: e2, templateData: t2, animation: n2, animationTarget: i2, component: s2, mobileComponent: o2, desktopComponent: r2}) {
      (await this.create({
        template: e2,
        templateData: t2,
        animation: n2,
        animationTarget: i2,
        component: s2,
        mobileComponent: o2,
        desktopComponent: r2
      })).open();
    }
    async create({template: e2, templateData: t2, animation: n2, animationTarget: i2, component: s2, mobileComponent: o2, desktopComponent: r2}) {
      s2 || (s2 = this._autoSelectComponent(o2, r2)), this._validateComponent(s2), "panel" === s2 && (n2 || (n2 = this._autoSelectAnimation(i2)), this._validateAnimation(n2));
      const d2 = a.uid("surface"), l2 = S.isString(e2) ? e2 : await S.get(e2, t2);
      let c2;
      switch (s2) {
        case "panel":
          c2 = this._buildPanel({
            id: d2,
            animation: n2,
            templateString: l2
          });
          break;
        case "sheetBottom":
          c2 = this._buildSheetBottom({
            id: d2,
            templateString: l2
          });
          break;
        case "sheetSide":
          c2 = this._buildSheetSide({
            id: d2,
            templateString: l2
          });
      }
      return new R({
        id: d2,
        component: s2,
        template: c2,
        animation: n2
      });
    }
    close() {
      window._activeSurface && window._activeSurface.close();
    }
    _autoSelectComponent(e2, t2) {
      return a.isMobile ? e2 || this._defaultMobileComponent : t2 || this._defaultDesktopComponent;
    }
    _validateComponent(e2) {
      if (!A.includes(e2))
        throw Error(`type must be one of these: ${A.join(", ")}`);
    }
    _autoSelectAnimation(e2) {
      return {
        type: "height",
        origin: "center",
        fullscreen: true,
        target: e2
      };
    }
    _validateAnimation(e2) {
      if (!P.includes(e2.type))
        throw Error(`animation.type must be one of these: ${P.join(", ")}`);
      if (e2.origin && !M.includes(e2.origin))
        throw Error(`animation.type must be one of these: ${M.join(", ")} or not defined`);
    }
    _buildPanel({id: e2, templateString: t2}) {
      return `
      <mdw-panel id="${e2}">
        ${t2}
      </mdw-panel>
    `;
    }
    _buildSheetBottom({id: e2, templateString: t2}) {
      return `
      <mdw-sheet-bottom id="${e2}">
        ${t2}
      </mdw-sheet-bottom>
    `;
    }
    _buildSheetSide({id: e2, templateString: t2}) {
      return `
      <mdw-sheet-side id="${e2}" class="mdw-hide" mdw-modal mdw-no-backdrop>
        ${t2}
      </mdw-sheet-side>
    `;
    }
  }();
  window.MDWSurface = D;
  var H = D;
}]);
