import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class PageLayout extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
<!doctype html>
<html lang="en">

<head>
  ...
</head>

<body>
  <!-- page header -->
  <mdw-top-app-bar mdw-fixed>
    ...
  </mdw-top-app-bar>

  <!--- page-body -->
  <mdw-row>

    <!-- navigation -->
    <mdw-sheet-side class="mdw-navigation-drawer" mdw-modal>
      ...
    </mdw-sheet-side>

    <!-- page content -->
    <mdw-scroll-container class="mdw-padding">
      ...
    </mdw-scroll-container>

    <!-- side sheet -->
    <mdw-sheet-side style="--mdw-theme-sheet-width: 200px">
      ...
    </mdw-sheet-side>
  </mdw-row>
</body>

</html>
    `;

    document.querySelector('#editor-2').content = `
<!doctype html>
<html lang="en">

<head>
  ...
</head>


<body class="mdw-row">
  <!-- navigation -->
  <mdw-sheet-side class="mdw-navigation-drawer">
    ...
  </mdw-sheet-side>

  <mdw-column>
    <!-- page header -->
    <mdw-top-app-bar mdw-fixed>
      ...
    </mdw-top-app-bar>

    <mdw-row>
      <!-- page content -->
      <mdw-scroll-container>
        ...
      </mdw-scroll-container>

      <!-- side sheet -->
      <mdw-sheet-side style="--mdw-theme-sheet-width: 200px">
        ...
      </mdw-sheet-side>
    </mdw-row>
  </mdw-column>

</html>
    `;

    document.querySelector('#editor-3').content = `
<!doctype html>
<html lang="en">

<head>
  ...
</head>

<body>
  <!-- page header -->
  <mdw-top-app-bar mdw-fixed>
    ...
  </mdw-top-app-bar>

  <!--- page-body -->
  <mdw-row>
    <!-- navigation -->
    <mdw-sheet-side class="mdw-navigation-drawer" mdw-modal>
      ...
    </mdw-sheet-side>

    <!-- page content -->
    <mdw-scroll-container class="mdw-padding">
      ...
    </mdw-scroll-container>

    <!-- side sheet -->
    <mdw-sheet-side mdw-modal>
      ...
    </mdw-sheet-side>
  </mdw-row>
</body>

</html>
    `;
  }

  get title() {
    return 'Layout';
  }

  template() {
    return 'pages/documentation/page-layout/page.html';
  }
}
