import { Page } from '@webformula/pax-core';

export default class NavigationRail extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Navigation rail';
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
<html>
  <head>
    <meta http-equiv="Cache-Control" content="no-store" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono" />
    <link rel="stylesheet" href="../local-dist/theme._VERSION_.css">
    <link rel="stylesheet" href="../local-dist/entry._VERSION_.css">
    <link rel="stylesheet" href="main.css">
    <script type="module" src="../local-dist/entry._VERSION_.js"></script>
  </head>

  <body style="height: 100%">
    <mdw-navigation-rail style="position: relative;">
      <mdw-button class="mdw-icon" href="#/">
        <mdw-icon>home</mdw-icon>
      </mdw-button>

      <mdw-button class="mdw-icon">
        <mdw-icon>star</mdw-icon>
        star
      </mdw-button>

      <mdw-button class="mdw-icon">
        <mdw-icon>inbox</mdw-icon>
        inbox
      </mdw-button>
    </mdw-navigation-rail>

    <mdw-page>
      <mdw-top-app-bar>
        <section>
          <span class="title">Example</span>
        </section>
      </mdw-top-app-bar>
      <mdw-content class="constrain-width">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
      </mdw-content>
    </mdw-page>
  </body>
</html>
    `;

    document.querySelector('#editor-2').content = `
    <html>
  <head>
    <meta http-equiv="Cache-Control" content="no-store" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono" />
    <link rel="stylesheet" href="../local-dist/theme._VERSION_.css">
    <link rel="stylesheet" href="../local-dist/entry._VERSION_.css">
    <link rel="stylesheet" href="main.css">
    <script type="module" src="../local-dist/entry._VERSION_.js"></script>
  </head>

  <body style="height: 100%">
    <mdw-navigation-rail style="position: relative;">
      <mdw-button class="mdw-icon" href="#/">
        <mdw-icon>home</mdw-icon>
      </mdw-button>
    
      <mdw-button class="mdw-icon">
        <mdw-icon>star</mdw-icon>
        star
      </mdw-button>
    
      <mdw-button class="mdw-icon">
        <mdw-icon>inbox</mdw-icon>
        inbox
      </mdw-button>
    </mdw-navigation-rail>

    <mdw-sheet-side class="mdw-navigation-drawer">
      <mdw-sheet-side--header>
        <div class="mdw-title">Nav title</div>
        <div class="mdw-subtitle">Pages</div>
      </mdw-sheet-side--header>

      <mdw-sheet-side--content>
        <mdw-list>
          <mdw-list-item class="mdw-current-link" onclick="$Drawers.handleNavLClick(this)">
            <span class="mdw-list-item__graphic material-icons">inbox</span>
            Inbox
          </mdw-list-item>

          <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
            <span class="mdw-list-item__graphic material-icons">star</span>
            Two
          </mdw-list-item>

          <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
            <span class="mdw-list-item__graphic material-icons">star</span>
            Three
          </mdw-list-item>

          <mdw-divider></mdw-divider>

          <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
            <span class="mdw-list-item__graphic material-icons">star</span>
            Four
          </mdw-list-item>

          <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
            <span class="mdw-list-item__graphic material-icons">star</span>
            Five
          </mdw-list-item>

          <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
            <span class="mdw-list-item__graphic material-icons">star</span>
            Six
          </mdw-list-item>
        </mdw-list>
      </mdw-sheet-side--content>
    </mdw-sheet-side>

    <mdw-page>
      <mdw-top-app-bar>
        <section>
          <mdw-icon onclick="document.querySelector('.mdw-navigation-drawer').toggle()">menu</mdw-icon>
          <span class="title">Example</span>
        </section>
      </mdw-top-app-bar>
      <mdw-page-content class="constrain-width">
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
  anim id est laborum.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
  anim id est laborum.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
  anim id est laborum.
        </p>
      </mdw-page-content>
    </mdw-page>
  </body>
</html>
    `;
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Navigation rail</h3>

        <div class="showcase mdw-elevation-1" style="background-color: #DDD">
          <mdw-navigation-rail style="position: relative;">
            <mdw-button class="mdw-icon" href="#/components/navigation-rail">
              <mdw-icon>home</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>star</mdw-icon>
              star
            </mdw-button>
          </mdw-navigation-rail>
        </div>

        <a href="https://material.io/components/navigation-rail/" target="_new">Material Design Guidelines: Navigation rail</a>
        <p>Navigation rails provide ergonomic movement between primary destinations in apps</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#basic" offset="64">Basic</anchor-link>
          <anchor-link selector="#nav" offset="64">With navigation drawer</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <mdw-card id="basic">
            <div class="mdw-card__content">
              <h6>Rail only</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor id="editor-1" language="html"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="navigation-rail.html"></iframe>
              </div>
            </div>
          </mdw-card>


          <mdw-card id="nav">
            <div class="mdw-card__content">
              <h6>Rail with navigation drawer</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor id="editor-2" language="html"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="navigation-rail-with-drawer.html"></iframe>
              </div>
            </div>
          </mdw-card>

        </section>

      </article>
    `;
  }
}
