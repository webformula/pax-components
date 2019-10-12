import { Page, html } from '@webformula/pax-core';

export default class Install extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Install';
  }

  template() {
    return html`
    <article class="page-article">
      <h3>Installation</h3>

      <h5>CDN</h5>
      <p>Simply load the pre-compiled all-in-one components, by adding them to the head of your index html (note we need to use type="module" when loading the javascript)</p>

      <code-mirror mode="html">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.css">
        <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.js"></script>
      </code-mirror>

      <p>We also recomend loading the material icons and fonts</p>

      <code-mirror mode="html">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
      </code-mirror>

      <a href="#/documentation/browsers">next: browser compatability</a>
    </article>
    `;
  }
}
