import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class GettingStarted extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'App index.html';
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
<html lang="en">
  <head>
    <title></title>

    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/theme.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/entry.css">
    <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/entry.js"></script>

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <script src="app-entry.js"></script>
  </head>

  <body>
    <mdw-sheet-side class="mdw-navigation-drawer">
      <mdw-header>
        <section>
          <div class="mdw-title">Nav title</div>
          <div class="mdw-subtitle">Pages</div>
        </section>
      </mdw-header>

      <mdw-content>
        <mdw-list>
          <mdw-list-item class="mdw-current-link">
            <mdw-icon>inbox</mdw-icon>
            Inbox
          </mdw-list-item>

          <mdw-list-item>
            <mdw-icon>star</mdw-icon>
            Two
          </mdw-list-item>
        </mdw-list>
      </mdw-content>
    </mdw-sheet-side>

    <mdw-page>
      <mdw-top-app-bar>
        <section>
          <mdw-icon onclick="document.querySelector('.mdw-navigation-drawer').toggle()">menu</mdw-icon>
        </section>
        <section>
          <span class="mdw-title">Example</span>
        </section>
      </mdw-top-app-bar>

      <mdw-page-content>
        ...content
      </mdw-page-content>
    </mdw-page>
  </body>
</html>
    `;
  }

  template() {
    return /* html */`
    <article class="page-article">
      <h1 class="article-title">Getting started</h1>
      <p>How to setup the application</p>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>index.html</h6>
          <div class="mdw-subtitle2">Main app layout</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <monaco-editor id="editor-1" language="html"></monaco-editor>
        </div>

        <div class="mdw-card__content" style="display: block;">
          <div class="demo">
            <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="app-index.html"></iframe>
          </div>
        </div>
      </mdw-card>

      <section mdw-row>
        <mdw-button class="mdw-secondary" href="#/documentation/install">< install</mdw-button>
        <span mdw-flex></span>
        <mdw-button class="mdw-secondary" href="#/documentation/browsers">compatibility ></mdw-button>
      </section>
    </article>
    `;
  }
}
