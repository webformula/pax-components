import { Page } from '@webformula/pax-core';

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
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return 'pages/components/sheet-side/page.html';
  }
}
