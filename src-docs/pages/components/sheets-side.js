import { Page } from '@webformula/pax-core';

export default class SheetsSide extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets side';
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return /* html */`
      <div mdw-row style="height: 100%;">
        <article class="page-article">
          <h3>Sheets side</h3>

          <div class="showcase mdw-elevation-1" style="overflow: hidden">
          </div>

          <a href="https://material.io/components/sheets-bottom" target="_new">Material Design Guidlines: sheets bottom</a>
          <p>Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen</p>
        </article>

        <mdw-sheet-side>
          <mdw-sheet-side--header>
            <div class="mdw-title">Title</div>
          </mdw-sheet-side--header>
          body
        </mdw-sheet-side>
      </div>
    `;
  };
}
