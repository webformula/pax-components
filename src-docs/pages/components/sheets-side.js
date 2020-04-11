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
      <article class="page-article">
        <h3>Sheets side</h3>

        <a href="https://material.io/components/sheets-side" target="_new">Material Design Guidelines: sheets side</a>
        <p>Side sheets that are modal on mobile, due to limited screen width, can become standard side sheets on tablet and desktop. The reverse is also true.</p>

        <section id="types">
          <h4>Types</h4>

          <mdw-card id="with-click">
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-sheet-side>
                  <mdw-sheet-side--header>
                    <div class="mdw-title">Title</div>
                  </mdw-sheet-side--header>
                  <mdw-sheet-side--content>
                    body
                  </mdw-sheet-side--content>
                </mdw-sheet-side>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="sheets-side-standard.html"></iframe>
              </div>
            </div>
          </mdw-card>

          <mdw-card id="with-click">
            <div class="mdw-card__content">
              <h6>Modal</h6>
              <p>Modal is automatically turned on for mobile</p>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-sheet-side class="mdw-modal">
                  <mdw-sheet-side--header>
                    <div class="mdw-title">Title</div>
                  </mdw-sheet-side--header>
                  <mdw-sheet-side--content>
                    body
                  </mdw-sheet-side--content>
                </mdw-sheet-side>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="sheets-side-modal.html"></iframe>
              </div>
            </div>
          </mdw-card>
        </section>
      </article>
    `;
  };
}
