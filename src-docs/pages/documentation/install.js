import { Page } from '@webformula/pax-core';

export default class Install extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Install';
  }

  template() {
    return /* html */`
    <article class="page-article">
      <h1 class="article-title">Installation</h1>
      <p>You have two options. Include with the CDN, or install via NPM</p>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>CDN</h6>
          <div class="mdw-subtitle2">Include the javascript and css, thats it.</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <monaco-editor language="html">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.css">
            <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.js"></script>

            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
          </monaco-editor>
        </div>
      </mdw-card>


      <h6>Or</h6>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>NPM</h6>
          <div class="mdw-subtitle2">Install and import</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <monaco-editor language="bash">
            # install
            npm i @webformula/pax-components
          </monaco-editor>

          <monaco-editor language="javascript">
            // import
            import '@webformula/pax-components/dist/entry.js';
          </monaco-editor>

          <monaco-editor language="html">
            <!-- include css -->
            <link rel="stylesheet" href="node_modules/@webformula/pax-components/dist/entry.css">

            <!-- include font and icons -->
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
          </monaco-editor>
        </div>
      </mdw-card>

      <section>
        <a href="#/documentation/browsers">next: browser compatability</a>
      </section>
    </article>
    `;
  }
}
