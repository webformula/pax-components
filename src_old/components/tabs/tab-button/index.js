import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWRipple from '../../../core/Ripple.js';

customElements.define('mdw-tab-button', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_click = this.click.bind(this);
    this.cloneTemplate();
  }

  connectedCallback() {
    this.ripple = new MDWRipple({
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
