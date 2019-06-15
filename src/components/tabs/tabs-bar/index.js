customElements.define('mdw-tabs-bar', class extends HTMLElementExtended {
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

  cssFile() {
    return '/src/components/tabs/tabs-bar/internal.css'
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
