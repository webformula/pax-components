import { Page, html } from '@webformula/pax-core';

export default class Sheets extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets ';
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Sheets </h3>

        <div class="showcase" style="overflow: hidden">
          <mdw-button onclick="document.querySelector('mdw-sheet').toggle()">show</mdw-button>

          <!-- mdw-collapsed-height="100" -->
          <mdw-sheet mdw-title="Top title" class="mdw-shaped" >
            <mdw-sheet-header>
              <section mdw-align="start">
                <div class="mdw-title">Main title</div>
                <div class="mdw-subtitle">Sub title</div>
              </section>

              <section mdw-align="end">
                <div class="mdw-detail-text">Secondary title</div>
              </section>
            </mdw-sheet-header>

            <mdw-sheet-content>
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
                <mdw-list-item>Eleven</mdw-list-item>
                <mdw-list-item>Twelve</mdw-list-item>
                <mdw-list-item>Thirteen</mdw-list-item>
                <mdw-list-item>Fourteen</mdw-list-item>
                <mdw-list-item>Fifteen</mdw-list-item>
                <mdw-list-item>Sixteen</mdw-list-item>
                <mdw-list-item>seventeen</mdw-list-item>
                <mdw-list-item>eighteen</mdw-list-item>
                <mdw-list-item>nineteen</mdw-list-item>
                <mdw-list-item>twenty</mdw-list-item>
              </mdw-list>
            </mdw-sheet-content>
          </mdw-sheet>

        </div>

        <a href="https://material.io/components/sheets-bottom/">Material Design Guidlines: sheets bottom</a>
        <p>Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen</p>
      </article>
    `;
  };


  tem() {
    return html`
      <article class="page-article">
        <h3>Sheets </h3>

        <div class="showcase" style="overflow: hidden">
          <mdw-button onclick="document.querySelector('mdw-sheet').toggle()">show</mdw-button>

          <mdw-sheet>
            <!-- optional - will be backfilled -->
            <mdw-sheet-header>
              <mdw-sheet-title>Test title</mdw-sheet-title>
            </mdw-sheet-header>

            <mdw-sheet-content>
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
                <mdw-list-item>Eleven</mdw-list-item>
                <mdw-list-item>Twelve</mdw-list-item>
                <mdw-list-item>Thirteen</mdw-list-item>
                <mdw-list-item>Fourteen</mdw-list-item>
                <mdw-list-item>Fifteen</mdw-list-item>
                <mdw-list-item>Sixteen</mdw-list-item>
              </mdw-list>
            </mdw-sheet-content>
          </mdw-sheet>

        </div>

        <a href="https://material.io/components/sheets-bottom/">Material Design Guidlines: sheets bottom</a>
        <p>Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen</p>


        <section id="examples">
          <h4>Examples</h4>

          <!-- modal basic -->
          <mdw-card id="modal-basic">
            <div class="mdw-card__content">
              <h6>Modal: basic</h6>
              <div class="description">Modal with a list and no header</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-sheet mdw-modal mdw-title="Top title">
                  <mdw-sheet-content>
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
                      <mdw-list-item>Eleven</mdw-list-item>
                      <mdw-list-item>Twelve</mdw-list-item>
                      <mdw-list-item>Thirteen</mdw-list-item>
                      <mdw-list-item>Fourteen</mdw-list-item>
                      <mdw-list-item>Fifteen</mdw-list-item>
                      <mdw-list-item>Sixteen</mdw-list-item>
                    </mdw-list>
                  </mdw-sheet-content>
                </mdw-sheet>
              </code-mirror>
            </div>

            <div class="mdw-card__content row">
              <mdw-button onclick="document.querySelector('#modal-basic-sheet').toggle()">show</mdw-button>
              <mdw-sheet mdw-modal id="modal-basic-sheet" mdw-title="Top title">
                <mdw-sheet-content>
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
                    <mdw-list-item>Eleven</mdw-list-item>
                    <mdw-list-item>Twelve</mdw-list-item>
                    <mdw-list-item>Thirteen</mdw-list-item>
                    <mdw-list-item>Fourteen</mdw-list-item>
                    <mdw-list-item>Fifteen</mdw-list-item>
                    <mdw-list-item>Sixteen</mdw-list-item>
                  </mdw-list>
                </mdw-sheet-content>
              </mdw-sheet>
            </div>
          </mdw-card>

          <!-- modal with header -->
          <mdw-card id="modal-header">
            <div class="mdw-card__content">
              <h6>Modal: basic</h6>
              <div class="description">Modal with a list and no header</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-sheet mdw-modal>
                  <mdw-sheet-header>
                    <mdw-sheet-title>Test title</mdw-sheet-title>
                  </mdw-sheet-header>

                  <mdw-sheet-content>
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
                      <mdw-list-item>Eleven</mdw-list-item>
                      <mdw-list-item>Twelve</mdw-list-item>
                      <mdw-list-item>Thirteen</mdw-list-item>
                      <mdw-list-item>Fourteen</mdw-list-item>
                      <mdw-list-item>Fifteen</mdw-list-item>
                      <mdw-list-item>Sixteen</mdw-list-item>
                    </mdw-list>
                  </mdw-sheet-content>
                </mdw-sheet>
              </code-mirror>
            </div>

            <div class="mdw-card__content row">
              <mdw-button onclick="document.querySelector('#modal-header-sheet').toggle()">show</mdw-button>
              <mdw-sheet mdw-modal id="modal-header-sheet">
                <mdw-sheet-header>
                  <mdw-sheet-title>Test title</mdw-sheet-title>
                </mdw-sheet-header>

                <mdw-sheet-content>
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
                    <mdw-list-item>Eleven</mdw-list-item>
                    <mdw-list-item>Twelve</mdw-list-item>
                    <mdw-list-item>Thirteen</mdw-list-item>
                    <mdw-list-item>Fourteen</mdw-list-item>
                    <mdw-list-item>Fifteen</mdw-list-item>
                    <mdw-list-item>Sixteen</mdw-list-item>
                  </mdw-list>
                </mdw-sheet-content>
              </mdw-sheet>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
