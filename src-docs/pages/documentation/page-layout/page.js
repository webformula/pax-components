import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class PageLayout extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.css">
  <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
  <script src="app-entry.js"></script>
</head>

<body>
  <!-- page header -->
  <mdw-top-app-bar>
  ...
  </mdw-top-app-bar>

  <!--- page-body -->
  <mdw-scroll-container>

    <!-- navigation -->
    <mdw-sheet-side class="mdw-navigation-drawer">
    ...
    </mdw-sheet-side>

    <!-- page content -->
    <mdw-scroll-content>
    ...
    </mdw-scroll-content>

    <!-- side sheet -->
    <mdw-sheet-side id="sideSheet">
    ...
    </mdw-sheet-side>

  </mdw-scroll-container>
</body>
    `;

    document.querySelector('#editor-2').content = `
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.css">
  <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
  <script src="app-entry.js"></script>
</head>

<body class="mdw-row">
  <!-- navigation -->
  <mdw-sheet-side class="mdw-navigation-drawer">
  ...
  </mdw-sheet-side>

  <div mdw-column>
    <!-- page header -->
    <mdw-top-app-bar>
    ...
    </mdw-top-app-bar>

      <!--- page-body -->
    <mdw-scroll-container>

      <!-- page content -->
      <mdw-scroll-content>
      ...
      </mdw-scroll-content>

      <!-- side sheet -->
      <mdw-sheet-side id="sideSheet">
      ...
      </mdw-sheet-side>

    </mdw-scroll-container>
    
  </div>
</body>
    `;

    document.querySelector('#editor-3').content = `
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.css">
  <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
  <script src="app-entry.js"></script>
</head>

<body class="mdw-row">
  <div mdw-column>
    <!-- navigation -->
    <mdw-sheet-side class="mdw-navigation-drawer">
    ...
    </mdw-sheet-side>

    <!-- page header -->
    <mdw-top-app-bar>
    ...
    </mdw-top-app-bar>

      <!--- page-body -->
    <mdw-scroll-container>

      <!-- page content -->
      <mdw-scroll-content>
      ...
      </mdw-scroll-content>

    </mdw-scroll-container>
    
    <!-- side sheet -->
    <mdw-sheet-side id="sideSheet">
    ...
    </mdw-sheet-side>
  </div>
</body>
    `;

    document.querySelector('#editor-1').content = `
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.css">
  <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@_VERSION_/release/entry.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
  <script src="app-entry.js"></script>
</head>

<body>
  <!-- page header -->
  <mdw-top-app-bar>
  ...
  </mdw-top-app-bar>

  <!--- page-body -->
  <mdw-scroll-container>

    <!-- navigation -->
    <mdw-sheet-side class="mdw-navigation-drawer">
    ...
    </mdw-sheet-side>

    <!-- page content -->
    <mdw-scroll-content>
    ...
    </mdw-scroll-content>
  </mdw-scroll-container>

  <!-- side sheet -->
  <mdw-sheet-side id="sideSheet">
  ...
  </mdw-sheet-side>
</body>
    `;
  }

  get title() {
    return 'Layout';
  }

  template() {
    return './page.html';
  }
}
