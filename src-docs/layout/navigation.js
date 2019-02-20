const { html } = require('@webformula/pax-core');

module.exports = ({ title }) => html`
  <nav>
    <span class="main-title">PAX</span>
    <span class="main-title">WEB</span>
    <span class="main-title">COMPONENTS</span>

    <section>
      <span class="title">Documentation</span>
      <a href="/documentation/getting-started" ${title === 'Getting started' ? 'class="active"' : ''}>Getting started</a>
    </section>

    <section>
      <span class="title">Components</span>
      <a href="#/components/buttons" ${title === 'Buttons' ? 'class="active"' : ''}>Buttons</a>
    </section>
  </nav>
`;
