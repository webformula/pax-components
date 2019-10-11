import { html } from '@webformula/pax-core';

export default function () {
  return html`
    <mdw-drawer class="navigation mdw-locked-open" style="min-width: 220px;">
      <mdw-drawer-fixed>
        <mdw-drawer-header>
          <span class="main-title">PAX</span>
          <span class="main-title">WEB</span>
          <span class="main-title">COMPONENTS</span>
        </mdw-drawer-header>

        <mdw-drawer-content>
          <nav>
            <span class="title">Documentation</span>
            <a href="/">Getting started</a>
            <a href="#/documentation/install">Installation</a>
            <a href="#/documentation/browsers">Browser compatability</a>

            <mdw-divider></mdw-divider>

            <span class="title">Components</span>
            <a href="#/components/buttons">Buttons</a>
            <a href="#/components/fab">FAB</a>
            <a href="#/components/checkboxes">Checkboxes</a>
            <a href="#/components/switch">Switch</a>
            <a href="#/components/linear-progress">Linear Progress</a>
            <a href="#/components/circular-progress">Circular Progress</a>
            <a href="#/components/top-app-bar">Top app bar</a>
            <a href="#/components/drawers">Drawers</a>
            <a href="#/components/bottom-navigation">Bottom navigation</a>
            <a href="#/components/banners">Banners</a>
            <a href="#/components/snackbar">Snackbar</a>
            <a href="#/components/cards">Cards</a>
            <a href="#/components/panel">Panel</a>
            <a href="#/components/menu">Menu</a>
            <a href="#/components/dialog">Dialog</a>
            <a href="#/components/select">Selects</a>
            <a href="#/components/lists">lists</a>
            <a href="#/components/backdrop">backdrop</a>
            <a href="#/components/text-field">Textfield</a>
            <a href="#/components/autocomplete">Autocomplete</a>
            <a href="#/components/radio">Radio</a>
            <a href="#/components/tabs">Tabs</a>
            <a href="#/components/slider">Slider</a>
            <a href="#/components/sheets">Sheets</a>
          </nav>
        </mdw-drawer-content>
      </mdw-drawer-fixed>
    </mdw-drawer>
  `;
}
