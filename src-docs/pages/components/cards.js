import { Page } from '@webformula/pax-core';

export default class Cards extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Cards';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Cards</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Card title</h6>
              <div class="mdw-subtitle">subtitle text</div>
              <div class="mdw-card__supporting mdw-body">This is some supporting text for the card content</div>
            </div>

            <div class="mdw-card__actions">
              <div>
                <mdw-button>action 1</mdw-button>
                <mdw-button>action 2</mdw-button>
              </div>
            </div>
          </mdw-card>
        </div>

        <a href="https://material.io/design/components/cards.html" target="_new">Material Design Guidelines: Cards</a>
        <p>Cards contain content and actions about a single subject</p>

        <!-- <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div> -->

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Basic with header and media</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-card>
                  <div class="mdw-card__content">
                    <h6>Basic card with header and media</h6>
                    <div class="mdw-subtitle">This is a subtitle</div>
                  </div>

                  <div class="mdw-card__content-action">
                    <div class="mdw-card__media--16-9" style="background-image: url(https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg)"></div>
                    <div class="mdw-card__supporting mdw-body">Visit ten places on our planet that are undergoing the biggest changes today.</div>
                  </div>

                  <div class="mdw-card__actions">
                    <div>
                      <mdw-button>action one</mdw-button>
                      <mdw-button>action two</mdw-button>
                    </div>
                  </div>
                </mdw-card>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-card>
                <div class="mdw-card__content">
                  <h6>Basic card with header and media</h6>
                  <div class="mdw-subtitle">This is a subtitle</div>
                </div>

                <div class="mdw-card__content-action">
                  <div class="mdw-card__media--16-9" style="background-image: url(https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg)"></div>
                  <div class="mdw-card__supporting mdw-body">Visit ten places on our planet that are undergoing the biggest changes today.</div>
                </div>

                <div class="mdw-card__actions">
                  <div>
                    <mdw-button>action one</mdw-button>
                    <mdw-button>action two</mdw-button>
                  </div>
                </div>
              </mdw-card>
            </div>
          </mdw-card>

        </section>

      </article>
    `;
  }
}
