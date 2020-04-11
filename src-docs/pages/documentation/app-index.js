import { Page } from '@webformula/pax-core';

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
      <mdw-sheet-side--header>
        <h6>PAX</h6>
      </mdw-sheet-side--header>

      <mdw-sheet-side--content>
        <nav>
          <a href="#/home">Welcome</a>

          <span class="title">Documentation</span>

          <a href="#/documentation/getting-started">Getting started</a>
          <a href="#/documentation/install">Installation</a>

          <mdw-divider></mdw-divider>
          <span class="title">Components</span>
          <a href="#/components/buttons">Buttons</a>
          <a href="#/components/fab">Buttons: FAB</a>
          <a href="#/components/cards">Cards</a>
        </nav>
      </mdw-sheet-side--content>
    </mdw-sheet-side>

    <mdw-page>
      <header>
        <mdw-top-app-bar mdw-fixed>
          <section>
            <mdw-icon onclick="document.querySelector('.mdw-navigation-drawer').toggle()">menu</mdw-icon>
          </section>

          <section mdw-flex>
            <span class="mdw-title">PAX web components _VERSION_</span>
          </section>
        </mdw-top-app-bar>
      </header>

      <mdw-page-content>
        <!-- place page contents here -->

        <!-- if you are using PAX-core then you can place the page-container element here -->
        <page-container></page-container>
        
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
