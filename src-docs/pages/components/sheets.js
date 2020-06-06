import { Page } from '@webformula/pax-core';
import MDWSheet from '../../../src/components/sheet/service';

export default class Sheets extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets';
  }

  show() {
    MDWSheet.show({
      template: `
        <mdw-header class="mdw-primary mdw-two-line">
          <mdw-sheet-top-bar>
            <mdw-button class="mdw-icon" onclick="MDWSheet.exitFullscreen()">
              <mdw-icon>keyboard_arrow_down</mdw-icon>
            </mdw-button>

            <span mdw-flex>Standard sheet</span>

            <mdw-button class="mdw-icon">
              <mdw-icon>more_vert</mdw-icon>
            </mdw-button>
          </mdw-sheet-top-bar>

          <section mdw-flex>
            <div class="mdw-title">Main title</div>
            <div class="mdw-subtitle">Sub title</div>
          </section>

          <section>
            <div class="mdw-detail-text">Secondary title</div>
          </section>
        </mdw-header>

        <mdw-content>
          <mdw-list>
            <mdw-list-item>One</mdw-list-item>
            <mdw-list-item>Two</mdw-list-item>
            <mdw-list-item>Three</mdw-list-item>
            <mdw-list-item>Four</mdw-list-item>
            <mdw-list-item>Five</mdw-list-item>
            <mdw-list-item>Six</mdw-list-item>
            <mdw-list-item>Seven</mdw-list-item>
            <mdw-list-item>Eight</mdw-list-item>
            <mdw-list-item>Nine</mdw-list-item>
            <mdw-list-item>Ten</mdw-list-item>
          </mdw-list>
        </mdw-content>
      `
    });
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Sheets</h3>

        <div class="showcase mdw-elevation-1" style="overflow: hidden">
          <mdw-button onclick="activePage.show()">show</mdw-button>
          <mdw-button onclick="MDWSheet.hide()">hide</mdw-button>
        </div>

        <a href="https://material.io/components/sheets-bottom" target="_new">Material Design Guidelines: sheets bottom</a>
        <p>Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen</p>
      </article>
    `;
  };
}
