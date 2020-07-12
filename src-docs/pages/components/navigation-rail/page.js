import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class NavigationRail extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Navigation rail';
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
<body class="mdw-row">
  <mdw-navigation-rail>
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

  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      <mdw-content>
        <section class="mdw-flex">
          <span class="mdw-title">Example</span>
        </section>
      </mdw-content>
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>
</body>`;

    document.querySelector('#editor-2').content = `
<body class="mdw-row">
  <mdw-sheet-side class="mdw-navigation-drawer">
    ...
  </mdw-sheet-side>
  
  <mdw-navigation-rail>
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

  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      <mdw-content>
        <section>
          <mdw-icon onclick="document.querySelector('.mdw-navigation-drawer').toggle()">menu</mdw-icon>
        </section>
        
        <section class="mdw-flex">
          <span class="mdw-title">Example</span>
        </section>
      </mdw-content>
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>
</body>`;
  }

  template() {
    return './page.html';
  }
}
