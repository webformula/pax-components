import { Page, html } from '@webformula/pax-core';

export default class Cards extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Cards';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Cards</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Card title</h6>
              <subtitle2>subtitle text</subtitle2>
              <body2 class="mdw-card__supporting">This is some supporting text for the card conent</body2>
            </div>

            <div class="mdw-card__actions">
              <div>
                <mdw-button>action 1</mdw-button>
                <mdw-button>action 2</mdw-button>
              </div>
            </div>
          </mdw-card>
        </div>

        <a href="https://material.io/design/components/cards.html">Material Design Guidlines: Banners</a>
        <p>Cards contain content and actions about a single subject</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <!-- <anchor-link selector="#Types">Types</anchor-link> -->
          <!-- <anchor-link selector="#theming">Theming</anchor-link> -->
        </div>

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Basic with header and media</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-card>
                  <div class="mdw-card__content">
                    <h6>Basic card with header and media</h6>
                    <subtitle2>This is a subtitle</subtitle2>
                  </div>

                  <div class="mdw-card__content-action">
                    <div class="mdw-card__media--16-9" style="background-image: url(https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg)"></div>
                    <body2 class="mdw-card__supporting">Visit ten places on our planet that are undergoing the biggest changes today.</body2>
                  </div>

                  <div class="mdw-card__actions">
                    <div>
                      <mdw-button>action one</mdw-button>
                      <mdw-button>action two</mdw-button>
                    </div>
                  </div>
                </mdw-card>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-card>
                <div class="mdw-card__content">
                  <h6>Basic card with header and media</h6>
                  <subtitle2>This is a subtitle</subtitle2>
                </div>

                <div class="mdw-card__content-action">
                  <div class="mdw-card__media--16-9" style="background-image: url(https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg)"></div>
                  <body2 class="mdw-card__supporting">Visit ten places on our planet that are undergoing the biggest changes today.</body2>
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
