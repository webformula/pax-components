import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';
import './component.css';


customElements.define('mdw-navigation', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #rippleElements = [];
  #mdwPageChange_bound = this.#mdwPageChange.bind(this);
  #onClickOutside_bound = this.#onClickOutside.bind(this);

  constructor() {
    super();

    if (!this.classList.contains('mdw-state-rail')) {
      this.classList.add('mdw-state-drawer');
    }

    if (document.body.classList.contains('mdw-mobile')) {
      this.classList.remove('mdw-rail-enabled');
      this.classList.remove('mdw-state-rail');
      this.classList.remove('mdw-show');
    }

    if (this.classList.contains('mdw-rail-enabled') && document.body.classList.contains('mdw-small-screen')) {
      this.classList.add('mdw-state-rail');
      this.classList.remove('mdw-state-drawer');
    }

    if (this.classList.contains('mdw-rail-enabled')) {
      window.addEventListener('mdw:screen-small', () => {
        this.classList.add('mdw-state-rail');
        this.classList.remove('mdw-state-drawer');
      });

      window.addEventListener('mdw:screen-normal', () => {
        this.classList.add('mdw-state-drawer');
        this.classList.remove('mdw-state-rail');
      });
    }
  }

  async connectedCallback() {
    this.#rippleElements = [...this.querySelectorAll('nav > a > .mdw-ripple')].map(element => new Ripple({
      element: element,
      triggerElement: element.parentNode
    }));

    window.addEventListener('mdwPageChange', this.#mdwPageChange_bound);
    this.#mdwPageChange();

    [...this.querySelectorAll('a')].forEach(element => {
      const label = element.querySelector('.mdw-label');
      if (label && !label.classList.contains('mdw-rail-hide')) {
        element.classList.add('mdw-contains-label');
      }
    });

    await util.nextAnimationFrameAsync();
    this.classList.add('mdw-enable-animation');

    if (this.#shouldAddClickOutsideEvent) this.addEventListener('click', this.#onClickOutside_bound);
  }

  disconnectedCallback() {
    window.removeEventListener('mdwPageChange', this.#mdwPageChange_bound);
    this.#rippleElements.forEach(r => r.destroy());
  }

  get isOpen() {
    if (this.classList.contains('mdw-show')) return true;
    if (
      document.body.classList.contains('mdw-small-screen')
      && !document.body.classList.contains('mdw-mobile')
      && this.classList.contains('mdw-state-drawer')
    ) return true;
    if (
      !document.body.classList.contains('mdw-small-screen')
      && !document.body.classList.contains('mdw-mobile')
      && this.classList.contains('mdw-state-drawer')
    ) return true;
    return false;
  }

  get #shouldAddClickOutsideEvent() {
    if (this.classList.contains('mdw-show')) return true;
    if (
      document.body.classList.contains('mdw-small-screen')
      && !document.body.classList.contains('mdw-mobile')
      && this.classList.contains('mdw-state-drawer')
    ) return true;
    return false;
  }

  async toggle() {
    if (this.classList.contains('mdw-rail-enabled')) {
      if (this.classList.contains('mdw-state-rail')) {
        this.classList.remove('mdw-state-rail');
        this.classList.add('mdw-state-drawer');
        this.classList.remove('mdw-drawer-to-rail-animation');
        this.classList.add('mdw-rail-to-drawer-animation');
      } else {
        this.classList.remove('mdw-state-drawer');
        this.classList.add('mdw-state-rail');
        this.classList.remove('mdw-rail-to-drawer-animation');
        this.classList.add('mdw-drawer-to-rail-animation');
      }

      await util.animationendAsync(this);
      this.classList.remove('mdw-drawer-to-rail-animation');
      this.classList.remove('mdw-rail-to-drawer-animation');

    } else {
      if (this.classList.contains('mdw-show')) {
        this.classList.remove('mdw-show');
        this.classList.add('mdw-hide');
      } else {
        this.classList.remove('mdw-hide');
        this.classList.add('mdw-show');
      }
    }

    setTimeout(() => {
      if (this.#shouldAddClickOutsideEvent) this.addEventListener('click', this.#onClickOutside_bound, true);
      else this.removeEventListener('click', this.#onClickOutside_bound, true);
    }, 0);
  }

  #mdwPageChange() {
    let currentLink = this.querySelector('a.mdw-current-link');
    if (currentLink) currentLink.classList.remove('mdw-current-link');

    // try full url
    let match = this.querySelector(`a[href="${location.href}"]`);

    // try full url without search parameters
    if (!match) match = this.querySelector(`a[href="${location.href.split('?')[0]}"]`);

    // try pathname with search parameters
    if (!match) match = this.querySelector(`a[href="${location.pathname}?${location.href.split('?')[1]}"]`);

    // try just pathname
    if (!match) match = this.querySelector(`a[href="${location.pathname}"]`);

    if (match) match.classList.add('mdw-current-link');
  }

  #onClickOutside(event) {
    if (event.target.hasAttribute('href')) this.toggle();
    if (event.target.nodeName === 'MDW-NAVIGATION') this.toggle();
  }
});
