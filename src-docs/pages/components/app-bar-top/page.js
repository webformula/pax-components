import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class TopAppBar extends Page {
  constructor() {
    super();

    this.selectedIndexesLength = 0;
    this.bound_onSelect = this.onSelect.bind(this);
  }

  get title() {
    return 'App bar: Top';
  }

  get contextualList() {
    return document.querySelector('mdw-list.contextual');
  }

  get contextualTopAppBar() {
    return document.querySelector('mdw-top-app-bar.contextual');
  }

  connectedCallback() {
    this.contextualList.addEventListener('change', this.bound_onSelect);

    document.querySelector('#editor-1').content = `
<body>
  <mdw-scroll-container>
    <mdw-top-app-bar>
      <mdw-content>
        <section>
          <mdw-icon>menu</mdw-icon>
        </section>

        <section class="mdw-flex">
          <span class="mdw-title">Standard</span>
        </section>

        <section>
          <mdw-icon>bookmark</mdw-icon>
        </section>
      </mdw-content>
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>
</body>`;

    document.querySelector('#editor-2').content = `
<body>
  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      <mdw-content>
        <section>
          <mdw-icon>menu</mdw-icon>
        </section>

        <section class="mdw-flex">
          <span class="mdw-title">Standard</span>
        </section>

        <section>
          <mdw-icon>bookmark</mdw-icon>
        </section>
      </mdw-content>
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>
</body>`;

    document.querySelector('#editor-3').content = `
<body>
  <mdw-scroll-container>
    <mdw-top-app-bar mdw-prominent mdw-shrink>
      <mdw-content>
        <section mdw-fixed>
          <sub-section>
            <mdw-icon>menu</mdw-icon>
          </sub-section>
        </section>
        
        <section class="mdw-flex">
          <sub-section></sub-section>
          <sub-section>
            <span class="mdw-title" mdw-animation-property="transform: scale(#)" mdw-animation-start="1.5"
              mdw-animation-end="1">Title</span>
          </sub-section>
        </section>
        
        <section mdw-fixed>
          <sub-section>
            <mdw-icon>more_vert</mdw-icon>
          </sub-section>
        </section>
      </mdw-content>
    </mdw-top-app-bar>

    <div>
      ...Page content
    </div>
  </mdw-scroll-container>
</body>`;
  }

  disconnectedCallback() {
    this.contextualList && this.contextualList.removeEventListener('change', this.bound_onSelect);
  }

  onSelect() {
    const selectedIndexes = this.contextualList.selected;
    if (!selectedIndexes || !selectedIndexes.length) return this.contextualTopAppBar.notContextual();

    this.selectedIndexesLength = selectedIndexes.length;
    this.contextualTopAppBar.contextual();
  }

  styles() {
    return `
      .showcase mdw-top-app-bar::after {
        padding-right: 0 !important;
      }
    `;
  }

  template() {
    return './page.html';
  }
}
