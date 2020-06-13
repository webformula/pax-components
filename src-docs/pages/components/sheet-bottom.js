import { Page } from '@webformula/pax-core';

export default class SheetsBottom extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets: bottom';
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return /* html */`
      <style>

        mdw-sheet-top-bar.mdw-fullscreen {
          background-color: white;
        }
      </style>
      
      <article class="page-article">
        <h3>Sheets: bottom</h3>

        <div class="showcase mdw-elevation-1" style="overflow: hidden">
          <mdw-button onclick="document.querySelector('mdw-sheet-bottom').toggle()">open</mdw-button>

          <mdw-sheet-bottom id="theSheet" mdw-title="Standard sheet" class="mdw-shaped">
            <mdw-header class="mdw-primary mdw-two-line">
              <mdw-sheet-top-bar>
                <mdw-button class="mdw-icon" onclick="document.querySelector('#theSheet').exitFullscreen()">
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
          </mdw-sheet-bottom>
        </div>

        <a href="https://material.io/components/sheets-bottom" target="_new">Material Design Guidelines: sheets bottom</a>
        <p>Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen</p>
        

        <div style="display: inline-block">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#modal-basic">Modal: basic</anchor-link>
          <anchor-link selector="#modal-shaped">Modal: shaped</anchor-link>
          <anchor-link selector="#standard-basic">Standard: basic</anchor-link>
          <anchor-link selector="#standard-anchored">Standard: anchored</anchor-link>
        </div>

      
        <!-- Modal -->
        <mdw-card id="modal-basic">
          <div class="mdw-card__content">
            <h6>Modal: basic</h6>
            <div class="description">Modal with a list and no header</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="html">
              <mdw-sheet-bottom mdw-modal mdw-title="Modal sheet">
                <mdw-content>
                  <mdw-list>
                    <mdw-list-item>One</mdw-list-item>
                    <mdw-list-item>Two</mdw-list-item>
                    ...
                  </mdw-list>
                </mdw-content>
              </mdw-sheet-bottom>
            </monaco-editor>
          </div>

          <div class="mdw-card__content mdw-row">
            <mdw-button onclick="document.querySelector('#modal-sheet').toggle()">open</mdw-button>
            <mdw-sheet-bottom mdw-modal mdw-title="Modal sheet" id="modal-sheet">
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
              </mdw-content>
            </mdw-sheet-bottom>
          </div>
        </mdw-card>

        <!-- Modal shaped -->
        <mdw-card id="modal-basic">
          <div class="mdw-card__content">
            <h6>Modal: shaped</h6>
            <div class="description">Modal with shaped corners</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="html">
              <mdw-sheet-bottom mdw-modal mdw-title="Modal shaped" class="mdw-shaped">
                <mdw-content>
                  <mdw-list>
                    <mdw-list-item>One</mdw-list-item>
                    <mdw-list-item>Two</mdw-list-item>
                    ...
                  </mdw-list>
                </mdw-content>
              </mdw-sheet-bottom>
            </monaco-editor>
          </div>

          <div class="mdw-card__content mdw-row">
            <mdw-button onclick="document.querySelector('#shaped-modal').toggle()">open</mdw-button>
            <mdw-sheet-bottom mdw-modal mdw-title="Modal shaped" class="mdw-shaped test" id="shaped-modal">
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
            </mdw-sheet-bottom>
          </div>
        </mdw-card>
      </article>

        
        <!-- Standard --->
        <mdw-card id="standard-basic">
          <div class="mdw-card__content">
            <h6>Standard: basic</h6>
            <div class="description">Standard modal with header and shaped corners</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="html">
              <mdw-sheet-bottom id="theSheet" mdw-title="Standard sheet" class="mdw-shaped">
              <mdw-header>
                <mdw-sheet-top-bar>
                  <mdw-button class="mdw-icon" onclick="theSheet.exitFullscreen()">
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
                  ...
                </mdw-list>
              </mdw-content>
            </mdw-sheet-bottom>
            </monaco-editor>
          </div>

          <div class="mdw-card__content mdw-row">
            <mdw-button onclick="document.querySelector('#theSheet').toggle()">open</mdw-button>
            <mdw-sheet-bottom id="theSheet" mdw-title="Standard sheet" class="mdw-shaped">
              <mdw-header>
                <mdw-sheet-top-bar>
                  <mdw-button class="mdw-icon" onclick="theSheet.exitFullscreen()">
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
            </mdw-sheet-bottom>
          </div>
        </mdw-card>


        <!-- Standard --->
        <mdw-card id="standard-anchored">
          <div class="mdw-card__content">
            <h6>Standard: anchored</h6>
            <div class="description">Standard modal with header and shaped corners</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="html">
              <mdw-sheet-bottom id="anchoredSheet" mdw-title="Standard sheet" class="mdw-shaped" mdw-anchored>
              <mdw-header class="mdw-primary mdw-two-line">
                <mdw-sheet-top-bar>
                  <mdw-button class="mdw-icon" onclick="anchoredSheet.exitFullscreen()">
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
                  ...
                </mdw-list>
              </mdw-content>
            </mdw-sheet-bottom>
            </monaco-editor>
          </div>

          <div class="mdw-card__content mdw-row">
            <mdw-button onclick="document.querySelector('#anchoredSheet').toggle()">open</mdw-button>
            <mdw-sheet-bottom id="anchoredSheet" mdw-title="Standard sheet" class="mdw-shaped" mdw-anchored>
              <mdw-header class="mdw-primary mdw-two-line">
                <mdw-sheet-top-bar>
                  <mdw-button class="mdw-icon" onclick="anchoredSheet.exitFullscreen()">
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
            </mdw-sheet-bottom>
          </div>
        </mdw-card>
    `;
  };
}
