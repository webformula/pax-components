const { Page, html, css } = require('@webformula/pax-core');

module.exports = class Buttons extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Buttons';
  }

  mockWait(button) {
    if (button.pending) return;
    setTimeout(() => {
      button.resolve();
    }, 3000);
  }

  styles() {
    return css`
      .page-article mdw-button {
        margin: 8px;
      }
    `;
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Buttons</h3>

        <div class="showcase">
          <mdw-button id="basic">basic</mdw-button>
          <mdw-button class="mdw-raised mdw-primary">raised</mdw-button>
        </div>

        <a href="https://material.io/design/components/buttons.html">Material Design Guidlines: Buttons</a>
        <p>Buttons allow users to take actions, and make choices, with a single tap</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#contained" offset="64">Contained button</anchor-link>
          <anchor-link selector="#outlined" offset="64">Outlined button</anchor-link>
          <anchor-link selector="#shaped" offset="64">Shaped button</anchor-link>
          <anchor-link selector="#async" offset="64">Async with spinner</anchor-link>
          <anchor-link selector="#icons" offset="64">Buttons with icons</anchor-link>
          <anchor-link selector="#theming" offset="64">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <!-- contained -->
          <mdw-card id="contained">
            <div class="mdw-card__content">
              <h6>Contained button</h6>
              <div class="description">Contained buttons have more emphasis, as they use use a color fill and shadow</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button class="mdw-raised">raised</mdw-button>
                <mdw-button class="mdw-raised mdw-primary">raised primary</mdw-button>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="raised" class="mdw-raised">raised</mdw-button>
              <mdw-button id="raised-primary" class="mdw-raised  mdw-primary">raised primary</mdw-button>
            </div>
          </mdw-card>


          <!-- Outlined -->
          <mdw-card id="outlined">
            <div class="mdw-card__content">
              <h6>Outlined button</h6>
              <div class="description">Outlined buttons are used for more emphasis than text buttons due to the stroke</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button class="mdw-outlined">outlined</mdw-button>
                <mdw-button class="mdw-outlined mdw-dense mdw-secondary">outlined shaped secondary</mdw-button>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="outlined" class="mdw-outlined">outlined</mdw-button>
              <mdw-button id="outlined-dense" class="mdw-outlined mdw-dense mdw-secondary">outlined dense secondary</mdw-button>
            </div>
          </mdw-card>


          <!-- shaped -->
          <mdw-card id="shaped">
            <div class="mdw-card__content">
              <h6>Shaped button</h6>
              <a href="https://material.io/design/shape/about-shape.html">Material Design Guidlines: Shape</a>
              <div class="description">Material surfaces can be displayed in different shapes. Shapes direct attention, identify components, communicate state, and express brand</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button class="mdw-shaped mdw-raised mdw-primary">shaped raised</mdw-button>
                <mdw-button class="mdw-shaped mdw-outlined mdw-secondary">shaped outlined dense</mdw-button>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="shaped" class="mdw-shaped mdw-raised mdw-primary">shaped raised</mdw-button>
              <mdw-button id="shaped-outlined" class="mdw-shaped mdw-outlined mdw-error">shaped outlined</mdw-button>
            </div>
          </mdw-card>


          <!-- async -->
          <mdw-card id="async">
            <div class="mdw-card__content">
              <h6>Async with spinner</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button id="async-button" class="mdw-raised mdw-primary" mdw-async onclick="$Buttons.mockWait(this)">Async</mdw-button>
              </code-mirror>
              <code-mirror mode="javascript">
                <code>
                  class Buttons extends Page {
                    constructor() {
                      super();
                    }

                    mockWait(button) {
                      if (button.pending) return;
                      setTimeout(() => {
                        button.resolve();
                      }, 3000);
                    }
                  }
                </code>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="async-button" class="mdw-raised mdw-primary" mdw-async onclick="$Buttons.mockWait(this)">Async</mdw-button>
            </div>
          </mdw-card>


          <!-- icons -->
          <mdw-card id="icons">
            <div class="mdw-card__content">
              <h6>Buttons with icons</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button>
                  <mdw-icon>star</mdw-icon>
                  Icon
                </mdw-button>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="icon" class="mdw-raised mdw-primary">
                <mdw-icon>star</mdw-icon>
                Icon
              </mdw-button>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Disabled</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button disabled class="mdw-primary">Disabled</mdw-button>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button disabled class="mdw-primary">Disabled</mdw-button>
            </div>
          </mdw-card>
        </section>


        <section id="theming">
          <h4>Theming</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Colors</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-button class="mdw-raised">base</mdw-button>
                <mdw-button class="mdw-raised mdw-primary">primary</mdw-button>
                <mdw-button class="mdw-raised mdw-secondary">secondary</mdw-button>
                <mdw-button class="mdw-raised mdw-error">error</mdw-button>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="base-raised" class="mdw-raised">base</mdw-button>
              <mdw-button id="primary-raised" class="mdw-raised mdw-primary">primary</mdw-button>
              <mdw-button id="secondary-raised" class="mdw-raised mdw-secondary">secondary</mdw-button>
              <mdw-button id="error-raised" class="mdw-raised mdw-error">error</mdw-button>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
