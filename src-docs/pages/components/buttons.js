const { Page, html } = require('@webformula/pax-core');

module.exports = class Buttons extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Buttons';
  }

  mockWait() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Buttons</h3>

        <div class="showcase">
          <mdw-button>basic</mdw-button>
          <mdw-button raised class="primary">raised</mdw-button>
        </div>

        <a href="https://material.io/design/components/buttons.html">Material Design Guidlines: Buttons</a>
        <p>Buttons allow users to take actions, and make choices, with a single tap</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <div class="codecase">
            <div class="title">Text Button</div>
            <div class="description">Text buttons are typically used for less important actions</div>
            <code-mirror mode="html">
              <mdw-button>text</mdw-button>
              <mdw-button dense>text dense</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button>text</mdw-button>
              <mdw-button dense>text dense</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Contained button</div>
            <div class="description">Contained buttons have more emphasis, as they use use a color fill and shadow</div>
            <code-mirror mode="html">
              <mdw-button raised>raised</mdw-button>
              <mdw-button raised class="primary">raised primary</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button raised>raised</mdw-button>
              <mdw-button raised class="primary">raised primary</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Outlined button</div>
            <div class="description">Outlined buttons are used for more emphasis than text buttons due to the stroke</div>
            <code-mirror mode="html">
              <mdw-button outlined>outlined</mdw-button>
              <mdw-button outlined class="secondary">outlined shaped secondary</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button outlined>outlined</mdw-button>
              <mdw-button outlined dense class="secondary">outlined dense secondary</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Shaped button</div>
            <a href="https://material.io/design/shape/about-shape.html">Material Design Guidlines: Shape</a>
            <div class="description">Material surfaces can be displayed in different shapes. Shapes direct attention, identify components, communicate state, and express brand</div>
            <code-mirror mode="html">
              <mdw-button shaped raised>shaped raised</mdw-button>
              <mdw-button shaped outlined class="secondary">shaped outlined dense</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button shaped raised class="primary">shaped raised</mdw-button>
              <mdw-button shaped outlined class="error">shaped outlined</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Async button</div>
            <div class="description">Async can be added to any button, this will add a spinner while th passed in promise is pending</div>
            <code-mirror mode="html">
              <mdw-button raised class="primary" async="$Buttons.mockWait()">Async</mdw-button>
            </code-mirror>
            <code-mirror mode="javascript">
              <code>
                class Buttons extends Page {
                  constructor() {
                    super();
                  }

                  mockWait() {
                    return new Promise(resolve => {
                      setTimeout(resolve, 3000);
                    });
                  }
                }
              </code>
            </code-mirror>
            <div class="demo">
              <mdw-button raised class="primary" async="$Buttons.mockWait()">Async</mdw-button>
            </div>
          </div>

        </section>

        <section id="theming">
          <h4>Theming</h4>

          <div class="codecase">
            <div class="title">Colors</div>
            <code-mirror mode="html">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </div>
          </div>
        </section>

      </article>
    `;
  }
};
