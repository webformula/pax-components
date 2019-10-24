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
      <h1 class="article-title">Installation</h1>

      <section>
        <h2>CDN</h2>
        <p>Simply load the pre-compiled all-in-one components, by adding them to the head of your index html (note we need to use type="module" when loading the javascript)</p>

        <monaco-editor language="html">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.css">
          <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.js"></script>
        </monaco-editor>

        <p>We also recomend loading the material icons and fonts</p>

        <monaco-editor language="html">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
        </monaco-editor>
      </section>

      <section>
        <a href="#/documentation/browsers">next: browser compatability</a>
      </section>
    </article>
    `;
  }
}
