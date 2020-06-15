import {Page} from "/web_modules/@webformula/pax-core/index.js";
export default class BottomNavigation extends Page {
  constructor() {
    super();
  }
  connectedCallback() {
    document.querySelector("#editor-1").content = `
<html>
  <head>
    <meta http-equiv="Cache-Control" content="no-store" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono" />
    <link rel="stylesheet" href="../dist/theme.css">
    <link rel="stylesheet" href="../dist/entry.css">
    <link rel="stylesheet" href="main.css">
    <script type="module" src="../dist/entry.js"></script>
  </head>

  <body>
    <mdw-page>
      <mdw-page-content>
        <div>
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
        </div>
      </mdw-page-content>

      <mdw-bottom-navigation>
        <mdw-button class="mdw-icon" href="#/">
          <mdw-icon>home</mdw-icon>
          home
        </mdw-button>
      
        <mdw-button class="mdw-icon" href="#/a">
          <mdw-icon>start</mdw-icon>
          start
        </mdw-button>
      
        <mdw-button class="mdw-icon" href="#/b">
          <mdw-icon>note</mdw-icon>
          note
        </mdw-button>
      </mdw-bottom-navigation>
    </mdw-page>
  </body>
</html>
    `;
  }
  get title() {
    return "Bottom navigation";
  }
  template() {
    return `
      <article class="page-article">
        <h3>Bottom navigation</h3>

        <div class="showcase">
          <mdw-bottom-navigation style="background-color: var(--mdw-theme-primary); color: var(--mdw-theme-text--on-primary); position: relative;">
            <mdw-button class="mdw-icon mdw-current-link">
              <mdw-icon>home</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>start</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>note</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>cake</mdw-icon>
            </mdw-button>
          </mdw-bottom-navigation>
        </div>

        <a href="https://material.io/components/bottom-navigation" target="_new">Material Design Guidelines: Bottom navigation</a>
        <p>Bottom navigation bars allow movement between primary destinations in an app</p>


        <section id="types">
          <h4>Example: mobile with labels</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Mobile</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor id="editor-1" language="html"></monaco-editor>
            </div>

            <div class="mdw-card__content">
              <iframe style="width: 400px; height: 600px; border: 1px solid #ddd" src="bottom-navigation-mobile.html"></iframe>
            </div>
          </mdw-card>
        </section>
      </article>
    `;
  }
}
