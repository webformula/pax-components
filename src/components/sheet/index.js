import { HTMLElementExtended } from '@webformula/pax-core';
import MDWScreen from './service.js';
import MDWUtils from '../../core/Utils.js';

const validComponents = ['mdw-panel', 'mdw-sheet-side'];

customElements.define('mdw-screen', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onPanelClose = this.onPanelClose.bind(this);
  }

  disconnectedCallback() {
    this.component.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }
  
  get desktopComponent() {
    return this._desktopComponent || 'mdw-sheet-side';
  }
  set desktopComponent(value) {
    if (!validComponents.includes(value)) throw Error(`Invalid components, please use one of these: ${validComponents.join(' ')}`);
    this._desktopComponent = value;
  }

  get mobileComponent() {
    return this._mobileComponent || 'mdw-sheet-side';
  }
  set mobileComponent(value) {
    if (!validComponents.includes(value)) throw Error(`Invalid components, please use one of these: ${validComponents.join(' ')}`);
    this._mobileComponent = value;
  }

  // get component based on mobile context and config
  get component() {
    if (!this._component) {
      if (MDWUtils.isMobile) this._component = this.mobileComponent === 'mdw-sheet-side' ? this.querySelector('mdw-sheet-side') : this.querySelector('mdw-panel');
      else this._component = this.desktopComponent === 'mdw-panel' ? this.querySelector('mdw-panel') : this.querySelector('mdw-sheet-side');
    }
    return this._component;
  }

  set animation(value) {
    this._animation = value;
  }

  close() {
    if (this.component.nodeName === 'MDW-PANEL') this.closePanel();
    else this.closeSideSheet();
  }

  closePanel() {
    this.component.close();
    this.dispatchEvent(new Event('close'));
    MDWScreen.currentScreen = undefined;
  }

  onPanelClose() {
    this.component.remove();
    this.remove();
  }

  closeSideSheet() {
    this.component.hide();
  }


  open() {
    if (this.component.nodeName === 'MDW-PANEL') this.openPanel();
    else this.openSideSheet();
  }

  openPanel() {
    this.component.classList.add('mdw-screen');
    this.component.hoistToBody();
    this.component.fullscreen();
    this.component.setPosition('top left');
    if (this._animation) this.component.setAnimation(this._animation);
    this.component.addEventListener('MDWPanel:closed', this.bound_onPanelClose);

    requestAnimationFrame(() => {
      this.component.open();
    });
  }

  openSideSheet() {
    this.component.show();
  }
});
