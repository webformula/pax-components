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
    </section>
  </nav>
`;
