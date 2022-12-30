import HTMLElementExtended from '../HTMLElementExtended.js';
import './navigation.css';
import util from '../../core/util.js';


// TODO mobile
// TODO small screens


customElements.define('mdw-navigation', class MDWNavigationElement extends HTMLElementExtended {
  #open = true;
  #rail = this.classList.contains('mdw-rail');

  #mdwPageChange_bound = this.#mdwPageChange.bind(this)

  constructor() {
    super();

    this.classList.add('mdw-no-animation');
    this.#open = !this.classList.contains('mdw-hide') && !this.classList.contains('mdw-state-rail')
  }

  connectedCallback() {
    this.setAttribute('role', 'nav')
    this.#mdwPageChange();
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
    if (this.#rail) this.classList.toggle('mdw-state-rail', !this.#open);
    else this.classList.toggle('mdw-hide', !this.#open);
  }

  toggle() {
    this.open = !this.open;
  }

  #mdwPageChange() {
    [...this.querySelectorAll('.mdw-active')].forEach(anchor => anchor.classList.remove('mdw-active'));

    const fullUrl = location.href;
    const pathname = location.pathname;
    const [fullUrlNoSearch, searchParameters] = location.href.split('?');

    let matches = [...this.querySelectorAll(`mdw-anchor[href="${fullUrl}"]`)];
    if (matches.length === 0) matches = [...this.querySelectorAll(`mdw-anchor[href="${fullUrlNoSearch}"]`)];
    if (matches.length === 0) matches = [...this.querySelectorAll(`mdw-anchor[href="${pathname}"]`)];
    if (matches.length === 0) matches = [...this.querySelectorAll(`mdw-anchor[href="${pathname}?${searchParameters}"]`)];

    matches.forEach(anchor => anchor.classList.add('mdw-active'));
    // TODO nav group
  }
});
