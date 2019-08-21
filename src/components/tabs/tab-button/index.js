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
    return html`
      <span class="text"><slot></slot></span>
      <span class="mdw-tab-button-indicator">
        <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>
      </span>
      <div class="mdw-ripple mdw-tab-button-ripple"></div>
    `;
  }

  get stylesFile() {
    return 'src/components/tabs/tab-button/internal.css'
  }
});
