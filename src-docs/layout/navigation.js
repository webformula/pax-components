const { html } = require('@webformula/pax-core');

module.exports = () => html`
  <nav>
    <span class="main-title">PAX</span>
    <span class="main-title">WEB</span>
    <span class="main-title">COMPONENTS</span>

    <section>
      <span class="title">Documentation</span>
      <a href="#/">Getting started</a>
    </section>

    <section>
      <span class="title">Components</span>
      <a href="#/components/buttons">Buttons</a>
      <a href="#/components/checkboxes">Checkboxes</a>
      <a href="#/components/circular-progress">Circular Progress</a>
      <a href="#/components/top-app-bar">Top app bar</a>
    </section>
  </nav>
`;
