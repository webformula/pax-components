customElements.define('mdw-tabs', class extends HTMLElementExtended {
  constructor() {
    super();
    this._activeTab = 0;
    this.tabIdCounter = 0;
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
    el.setAttribute('tab-id', this.tabIdCounter++);
    // TODO handle if it is active
  }

  // called from mdw-tab
  tabClick(el) {
    const moveX = parseInt(el.getBoundingClientRect().x - this.activeTab.getBoundingClientRect().x);
    // const direction = parseInt(this.activeTab.getAttribute('tab-id')) < parseInt(el.getAttribute('tab-id')) ? 'right' : 'left';
    this.activeTab.deactivate(moveX);
    this.activeTab = el;
    this.activeTab.activate();
  }

  get activeTab() {
    return this._activeTab;
  }

  set activeTab(el) {
    this._activeTab = el;
  }

  querySlotted(selector) {
    return this.shadowRoot.querySelector('slot').assignedNodes().find(el => el.matches && el.matches(selector));
  }

  querySlottedAll(selector) {
    return this.shadowRoot.querySelector('slot').assignedNodes().filter(el => el.matches && el.matches(selector));
  }

  cssFile() {
    return '/src/components/tabs/internal.css'
  }

  template() {
    return html`
      <mdw-tab-scroller>
        <mdw-tab-scroller-area>
          <mdw-tab-scroller-content>
            <slot></slot>
          </mdw-tab-scroller-content>
        </mdw-tab-scroller-area>
      </mdw-tab-scroller>
    `;
  }
});
