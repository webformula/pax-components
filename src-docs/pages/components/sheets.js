import { Page } from '@webformula/pax-core';

export default class Sheets extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets';
  }


  template() {
    return /* html */`
      <article class="page-article">
        <h3>Sheets</h3>

        <div class="showcase mdw-elevation-1" style="overflow: hidden">
        </div>

        <a href="https://material.io/components/sheets-bottom" target="_new">Material Design Guidelines: sheets bottom</a>
        <p>Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen</p>
      </article>
    `;
  };
}
