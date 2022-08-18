import { Page } from '@webformula/pax-core';

export default class Tabs extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Tabs';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Tabs</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-tabs-container>
            <mdw-tabs-bar id="tabs-one">
              <mdw-tab-button>one</mdw-tab-button>
              <mdw-tab-button>two</mdw-tab-button>
              <mdw-tab-button>three</mdw-tab-button>
            </mdw-tabs-bar>

            <mdw-tabs-content tabs-id="tabs-one">
              <mdw-tab-body>
                one
              </mdw-tab-body>

              <mdw-tab-body>
                two
              </mdw-tab-body>

              <mdw-tab-body>
                threes
              </mdw-tab-body>
            </mdw-tabs-content>
          </mdw-tabs-container>
        </div>

        <a href="https://material.io/components/tabs" target="_new">Material Design Guidelines: Tabs</a>
        <p>Tabs organize content across different screens, data sets, and other interactions</p>

      </article>
    `;
  }
}
