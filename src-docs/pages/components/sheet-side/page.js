import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class SheetsSide extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets: side';
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
<body class="mdw-row">
  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      ...
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>

  <mdw-sheet-side id="sideSheet">
    <mdw-header>
      <div class="mdw-title" mdw-flex>Title</div>
      <mdw-button class="mdw-icon" onclick="sideSheet.close()">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    </mdw-header>
    <mdw-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </mdw-content>
  </mdw-sheet-side>
</body>`;

    document.querySelector('#editor-2').content = `
<body class="mdw-row">
  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      ...
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>

  <!-- added mdw-modal attribute -->
  <mdw-sheet-side id="sideSheet" mdw-modal>
    <mdw-header>
      <div class="mdw-title mdw-flex">Title</div>
      <mdw-button class="mdw-icon" onclick="sideSheet.close()">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    </mdw-header>
    <mdw-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </mdw-content>
  </mdw-sheet-side>
</body>`;


    document.querySelector('#editor-3').content = `
<body>
  <mdw-page>
    <mdw-top-app-bar>
      <section mdw-flex>
        <span class="mdw-title">Example</span>
      </section>
      <section>
        <mdw-icon onclick="document.querySelector('mdw-sheet-side').toggle()">menu</mdw-icon>
      </section>
    </mdw-top-app-bar>

    <mdw-page-content>
      ...content
    </mdw-page-content>
  </mdw-page>

  <mdw-sheet-side mdw-scroll id="sideSheet">
    <mdw-header>
      <div class="mdw-title mdw-flex">Title</div>
      <mdw-button class="mdw-icon" onclick="sideSheet.hide()"">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    </mdw-header>
    <mdw-content>
      ...content
    </mdw-content>
  </mdw-sheet-side>
</body>
    `;
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return './page.html';
  }
}
