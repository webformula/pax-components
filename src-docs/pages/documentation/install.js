import { Page } from '/web_modules/@webformula/pax-core/index.js';

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
      <link rel="stylesheet" href="node_modules/pax-components/dist/theme.css">
      <link rel="stylesheet" href="node_modules/pax-components/dist/entry.css">

      <!-- include font and icons -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    `;
  }

  template() {
    return /* html */`
    <article class="page-article">
      <h1 class="article-title">Installation</h1>
      <p>You have two options. Include with a CDN, or install via NPM</p>

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
            npm i pax-components
          </monaco-editor>

          <monaco-editor language="javascript">
            // import the src using es modules
            import 'pax-components/src/entry.js';

            // you can alteratively import the dist file, this is a cjs module
            import 'pax-components/dist/entry.js';
            // ors
            require('pax-components/dist/entry.js');
          </monaco-editor>

          <monaco-editor id="editor-2" language="html"></monaco-editor>
        </div>
      </mdw-card>

      <section mdw-row>
        <mdw-button class="mdw-secondary" href="#/home">< welcome</mdw-button>
        <span mdw-flex></span>
        <mdw-button class="mdw-secondary" href="#/documentation/app-index">app index.html ></mdw-button>
      </section>
    </article>
    `;
  }
}
