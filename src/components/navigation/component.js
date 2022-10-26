import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';
import './component.css';

customElements.define('mdw-navigation', class MDWNavigation extends HTMLElementExtended {
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

    if (this.classList.contains('mdw-rail-enabled') && document.body.classList.contains('mdw-small-viewport')) {
      this.classList.add('mdw-state-rail');
      this.classList.remove('mdw-state-drawer');
    }

    if (this.classList.contains('mdw-rail-enabled')) {
      window.addEventListener('mdw-viewport-small', () => {
        this.classList.add('mdw-state-rail');
        this.classList.remove('mdw-state-drawer');
      });

      window.addEventListener('mdw-viewport-normal', () => {
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

    [...this.querySelectorAll('a'), ...this.querySelectorAll('.mdw-nav-group-control')].forEach(element => {
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

  get state() {
    if (util.isMobile) {
      if (this.classList.contains('mdw-show')) return 'drawer';
      return 'hidden';
    } else {
      if (this.classList.contains('mdw-hide')) return 'hidden';
      if (this.classList.contains('mdw-state-rail')) return 'rail';
      return 'drawer';
    }
  }

  // get isOpen() {
  //   if (this.classList.contains('mdw-show')) return true;
  //   if (
  //     document.body.classList.contains('mdw-small-viewport')
  //     && !document.body.classList.contains('mdw-mobile')
  //     && this.classList.contains('mdw-state-drawer')
  //   ) return true;
  //   if (
  //     !document.body.classList.contains('mdw-small-viewport')
  //     && !document.body.classList.contains('mdw-mobile')
  //     && this.classList.contains('mdw-state-drawer')
  //   ) return true;
  //   return false;
  // }

  get #shouldAddClickOutsideEvent() {
    if (this.classList.contains('mdw-show')) return true;
    if (
      document.body.classList.contains('mdw-small-viewport')
      && !document.body.classList.contains('mdw-mobile')
      && this.classList.contains('mdw-state-drawer')
    ) return true;
    return false;
  }

  async toggle() {
    console.log('toggle');
    if (this.classList.contains('mdw-rail-enabled')) {
      if (this.classList.contains('mdw-state-rail')) {
        this.classList.remove('mdw-state-rail');
        this.classList.add('mdw-state-drawer');
      } else {
        this.classList.remove('mdw-state-drawer');
        this.classList.add('mdw-state-rail');
      }
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

    window.dispatchEvent(new CustomEvent('mdw-navigation-state', { detail: this.state }));
  }

  #mdwPageChange() {
    const currentLinks = [...this.querySelectorAll('.mdw-current-link')];
    currentLinks.forEach(e => e.classList.remove('mdw-current-link'));

    // try full url
    let matches = [...this.querySelectorAll(`a[href="${location.href}"]`)];

    // try full url without search parameters
    if (!matches.length) matches = [...this.querySelectorAll(`a[href="${location.href.split('?')[0]}"]`)];

    // try pathname with search parameters
    if (!matches.length) matches = [...this.querySelectorAll(`a[href="${location.pathname}?${location.href.split('?')[1]}"]`)];

    // try just pathname
    if (!matches.length) matches = [...this.querySelectorAll(`a[href="${location.pathname}"]`)];

    if (matches.length) {
      matches.forEach(link => {
        link.classList.add('mdw-current-link');
        let navParent = link.parentNode;

        // nav group for rails
        if (navParent.classList.contains('mdw-nav-group-content')) {
          const groupControl = navParent.parentNode.querySelector('.mdw-nav-group-control');
          groupControl.classList.add('mdw-current-link');

          // TODO make dynamic, allow multi-nesting?
          navParent = this.parentNode.parentNode;
        }

        // expanders
        if (navParent.classList.contains('mdw-expander-content')) {
          const expander = navParent.parentNode;
          setTimeout(() => {
            expander.show();
          }, 0);

          // TODO make dynamic, allow multi-nesting?
          navParent = this.parentNode.parentNode;
        }

        // only fix scroll for non rail
        if (!navParent.classList.contains('mdw-rail')) {
          const bounds = link.getBoundingClientRect();

          // TODO add for nav group?
          if (this.classList.contains('mdw-state-rail') && link.parentNode.classList.contains('mdw-rail')) {
            if (bounds.y >= 0 && (bounds.y + bounds.height) <= this.offsetHeight) return;
            link.scrollIntoView({ block: 'center' });
          } else if (!this.classList.contains('mdw-state-rail') && !link.parentNode.classList.contains('mdw-rail')) {
            if (bounds.y >= 0 && (bounds.y + bounds.height) <= this.offsetHeight) return;
            link.scrollIntoView({ block: 'center' });
          }
        }
      });
    }
  }

  #onClickOutside(event) {
    if (event.target.hasAttribute('href')) this.toggle();
    if (event.target.nodeName === 'MDW-NAVIGATION') this.toggle();
  }
});
