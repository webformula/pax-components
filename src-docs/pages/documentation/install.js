import { Page } from '@webformula/pax-core';

export default class Install extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Install';
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/theme.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/entry.css">
      <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/entry.js"></script>

      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    `;

    document.querySelector('#editor-2').content = `
      <!-- include css -->
      <link rel="stylesheet" href="node_modules/@webformula/pax-components/dist/theme.css">
      <link rel="stylesheet" href="node_modules/@webformula/pax-components/dist/entry.css">

      <!-- include font and icons -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    `;
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
          <monaco-editor id="editor-1" language="html"></monaco-editor>
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
            // import the src usign es modules
            import '@webformula/pax-components/src/entry.js';

            // you can alterativly import the dist file, this is a cjs module
            import '@webformula/pax-components/dist/entry.js';
            // or
            require('@webformula/pax-components/dist/entry.js');
          </monaco-editor>

          <monaco-editor id="editor-2" language="html"></monaco-editor>
        </div>
      </mdw-card>

      <section>
        <a href="#/documentation/browsers">next: browser compatability</a>
      </section>
    </article>
    `;
  }
}
