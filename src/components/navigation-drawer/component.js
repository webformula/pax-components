import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';
import util from '../../core/util.js';

// todo routing

customElements.define('mdw-navigation-drawer', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #rippleElements = [];
  #onScrimClick_bound = this.#onScrimClick.bind(this);
  #locationChange_bound = this.#locationChange.bind(this);
  #combinedLinks = [];
  #scrollPercent = 0;
  #navigationRailScrollPercent = 0;

  constructor() {
    super();
  }

  async connectedCallback() {
    this.#rippleElements = [...this.querySelectorAll('nav > a > .mdw-ripple')].map(element => new Ripple({
      element: element,
      triggerElement: element.parentNode
    }));

    window.addEventListener('locationchange', this.#locationChange_bound);
    this.#locationChange();

    await util.nextAnimationFrameAsync()
    this.#prepareNavigationRailLinkAnimations();
  }

  disconnectedCallback() {
    this.#rippleElements.forEach(r => r.destroy());
    window.removeEventListener('locationchange', this.#locationChange_bound);
  }

  #locationChange() {
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

    if (this.#shouldBeModal()) this.hide();
  }

  async show() {
    this.querySelector('nav').scrollTop = 0;
    this.classList.remove('mdw-hide');
    this.classList.add('mdw-show');

    this.#combinedLinks.forEach(links => {
      links.drawerLinkIcon.style.transform = '';
    });
    const nav = this.querySelector('nav');
    nav.scrollTop = this.#navigationRailScrollPercent * (nav.scrollHeight - nav.offsetHeight);

    if (this.#shouldBeModal()) {
      this.insertAdjacentHTML('afterend', '<div class="mdw-scrim-navigation"></div>');
      const scrimElement = document.querySelector('.mdw-scrim-navigation');
      await util.nextAnimationFrameAsync();
      scrimElement.classList.add('mdw-run-animation');
      scrimElement.addEventListener('click', this.#onScrimClick_bound);
    }
  }

  async hide() {
    this.classList.remove('mdw-show');
    this.classList.add('mdw-hide');
    
    this.#combinedLinks.forEach(links => {
      links.drawerLinkIcon.style.transform = `translateY(${links.distance}px)`;
    });
    const rail = document.querySelector('mdw-navigation-rail nav');
    rail.scrollTop = this.#scrollPercent * (rail.scrollHeight - rail.offsetHeight);

    const scrimElement = document.querySelector('.mdw-scrim-navigation');
    if (scrimElement) {
      scrimElement.removeEventListener('click', this.#onScrimClick_bound);
      scrimElement.classList.remove('mdw-run-animation');
      await util.transitionendAsync(scrimElement);
      scrimElement.remove();
    }
  }

  // TODO handle initial states between mobile and desktop
  toggle() {
    if (this.classList.contains('mdw-hide')) this.show();
    else this.hide();
  }


  #onScrimClick() {
    this.hide();
  }

  #shouldBeModal() {
    return util.isMobileOrSmallScreen() || !!document.querySelector('mdw-navigation-rail');
  }

  #prepareNavigationRailLinkAnimations() {
    const navigationRail = document.querySelector('mdw-navigation-rail');
    if (!navigationRail) return;

    let missing = false;
    let missingInMiddle = false;
    const combinedLinks = [...this.querySelectorAll('a')].map(drawerLink => {
      const railLink = navigationRail.querySelector(`a[href="${drawerLink.getAttribute('href')}"]`);
      if (!railLink) {
        missing = true;
        return;
      }
      if (missing === true) missingInMiddle = true;
      missing = false;

      const drawerLinkIcon = drawerLink.querySelector('mdw-icon');
      const railLinkIcon = railLink.querySelector('mdw-icon');
      const drawerLinkTop = drawerLinkIcon.getBoundingClientRect().y;
      const railLinkTop = railLinkIcon.getBoundingClientRect().y;
      const distance = railLinkTop - drawerLinkTop;

      return {
        drawerLinkIcon,
        distance
      };
    });

    // cannot match up link icons if there are missing patches
    if (missingInMiddle === true) return;
    this.#combinedLinks  = combinedLinks;
    this.#combinedLinks.forEach(links => {
      links.drawerLinkIcon.style.transform = `translateY(${links.distance}px)`;
    });

    // link scrolls together
    document.querySelector('mdw-navigation-rail nav').addEventListener('scroll', event => {
      this.#navigationRailScrollPercent = event.target.scrollTop / (event.target.scrollHeight - event.target.offsetHeight);
    });
    this.querySelector('nav').addEventListener('scroll', event => {
      this.#scrollPercent = event.target.scrollTop / (event.target.scrollHeight - event.target.offsetHeight);
    });
  }
});
