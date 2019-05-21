const { html } = require('@webformula/pax-core');

module.exports = () => html`
  <mdw-drawer class="navigation">
    <div class="mdw-header">
      <span class="main-title">PAX</span>
      <span class="main-title">WEB</span>
      <span class="main-title">COMPONENTS</span>
    </div>

    <div class="mdw-content">
      <nav>
        <span class="title">Documentation</span>
        <a href="#/">Getting started</a>

        <mdw-divider></mdw-divider>

        <span class="title">Components</span>
        <a href="#/components/buttons">Buttons</a>
        <a href="#/components/fab">FAB</a>
        <a href="#/components/checkboxes">Checkboxes</a>
        <a href="#/components/switch">Switch</a>
        <a href="#/components/circular-progress">Circular Progress</a>
        <a href="#/components/top-app-bar">Top app bar</a>
        <a href="#/components/drawers">Drawers</a>
        <a href="#/components/banners">Banners</a>
        <a href="#/components/cards">Cards</a>
        <a href="#/components/panel">Panel</a>
        <a href="#/components/menu">Menu</a>
        <a href="#/components/dialog">Dialog</a>
        <a href="#/components/select">Selects</a>
        <a href="#/components/lists">lists</a>
        <a href="#/components/backdrop">backdrop</a>
        <a href="#/components/text-field">Textfield</a>
        <a href="#/components/radio">Radio</a>
      </nav>
    </div>
  </mdw-drawer>
`;
