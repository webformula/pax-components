import HTMLElementExtended from '../HTMLElementExtended.js';
import './navigation.css';
import util from '../../core/util.js';
import device from '../../core/device.js';


customElements.define('mdw-navigation', class MDWNavigationElement extends HTMLElementExtended {
  #open = true;
  #rail = this.classList.contains('mdw-rail');
  #backdrop;
  #secondaryDrawer;

  #mdwPageChange_bound = this.#mdwPageChange.bind(this);
  #backdropClick_bound = this.#backdropClick.bind(this);

  constructor() {
    super();

    this.classList.add('mdw-no-animation');
    if (device.isMobile) this.classList.add('mdw-hide');
    this.#open = !this.classList.contains('mdw-hide') && !this.classList.contains('mdw-state-rail');

    if (this.classList.contains('mdw-rail')) {
      [...this.querySelectorAll('mdw-anchor')].forEach(anchor => {
        anchor.classList.add('mdw-rail');
        if (!device.isMobile) anchor.classList.toggle('mdw-state-rail', !this.#open);
      });
    }

    // TODO secondary drawer
    // if (this.querySelector(':scope > mdw-navigation-group')) {
    //   this.#secondaryDrawer = document.createElement('div');
    //   this.#secondaryDrawer.classList.add('mdw-navigation-secondary-draw');
    //   this.insertAdjacentElement('afterend', this.#secondaryDrawer);
    // }
  }

  connectedCallback() {
    this.setAttribute('role', 'nav');
    // the nested components are not ready until next frame
    util.nextAnimationFrameAsync().then(() => {
      this.#mdwPageChange();
    });
    window.addEventListener('mdwPageChange', this.#mdwPageChange_bound);

    util.nextAnimationFrameAsync().then(() => {
      this.classList.remove('mdw-no-animation');
    });
  }

  get open() {
    return this.#open;
  }
  set open(value) {
    this.#open = !!value;

    if (!this.#rail || device.isMobile) {
      this.classList.toggle('mdw-hide', !this.#open);
      [...this.querySelectorAll('mdw-anchor')].forEach(anchor => anchor.classList.remove('mdw-state-rail'));
    } else {
      this.classList.toggle('mdw-state-rail', !this.#open);
      [...this.querySelectorAll('mdw-anchor')].forEach(anchor => anchor.classList.toggle('mdw-state-rail', !this.#open));
    }

    if (device.isMobile) {
      if (this.#open) {
        this.#backdrop = document.createElement('mdw-backdrop');
        this.insertAdjacentElement('beforebegin', this.#backdrop);
        this.#backdrop.addEventListener('click', this.#backdropClick_bound);
      } else if (this.#backdrop) {
        this.#backdrop.removeEventListener('click', this.#backdropClick_bound);
        this.#backdrop.remove();
      }
    }

    if (!this.open && !this.classList.contains('mdw-state-rail')) {
      const active = this.querySelector('mdw-anchor.mdw-active');
      if (active) active.scrollIntoView({ block: 'center' });
    }

    this.dispatchEvent(new Event('change'));
  }

  toggle() {
    this.open = !this.open;
  }

  #backdropClick() {
    this.open = false;
  }

  #mdwPageChange() {
    [...this.querySelectorAll('.mdw-active')].forEach(anchor => anchor.active = false);

    const fullUrl = location.href;
    const pathname = location.pathname;
    const [fullUrlNoSearch, searchParameters] = location.href.split('?');

    let matches = [...this.querySelectorAll(`mdw-anchor[href="${fullUrl}"]`)];
    if (matches.length === 0) matches = [...this.querySelectorAll(`mdw-anchor[href="${fullUrlNoSearch}"]`)];
    if (matches.length === 0) matches = [...this.querySelectorAll(`mdw-anchor[href="${pathname}"]`)];
    if (matches.length === 0) matches = [...this.querySelectorAll(`mdw-anchor[href="${pathname}?${searchParameters}"]`)];

    matches.forEach(anchor => anchor.active = true);

    if (device.isMobile) this.open = false;
  }
});