import { Page, html } from '@webformula/pax-core';

export default class Home extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Home';
  }

  showDialog() {
    const validForm = document.querySelector('form').checkValidity();

    if (validForm) {
      MDWDialog.show({
        title: 'Confirmed',
        message: 'Your data is confirmed',
        okLabel: 'ok',
        cancelLabel: 'cancel'
      }).then(data => {
        console.log(data);
      });
    } else {
      MDWDialog.show({
        title: 'Invalid',
        message: 'Your data is invalid',
        okLabel: 'ok',
        cancelLabel: 'cancel'
      }).then(data => {
        console.log(data);
      });
    }
  }

  template() {
    return html`
    <article class="page-article">
      <h3>PAX</h3>
      <h5>Material design: web components</h5>

      <p>
      PAX material design web components are a complete set of components with no dependencies. These web components can be used with any website (frameworkm or no framework) as long as the browser supports web components.
      PAX components are also compatable on mobile sites. There are many components that are targeted directly at mobile development (<a href="#/components/backdrop">Backdrop</a>).
      </p>

      <h6>Powerful, and light wieght</h6>
      <p>
      PAX components are built to be as simple, lightweight and performant as possible. Since these are built using web compnents, wich are a native browser feature. We are taking advantage of the lowest level posiible in the browser for components.
      </p>

      <h6>Built with PAX-CORE</h6>
      <p>
      PAX components are built using PAX core. This means the components are easy to develop and the end product requires no dependencies. So no broken npm sub modules.
      </p>

      <div style="height: 24px;"></div>
      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>Install</h6>
          <div class="description">Include the javascript and css, thats it.</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <code-mirror mode="javascript">
            <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@0.3.0-beta/dist/pax-components.css"> -->
            <!-- <script src="https://cdn.jsdelivr.net/gh/webformula/pax-components@0.3.0-beta/dist/pax-components.js"></script> -->
          </code-mirror>
        </div>

        <!-- <div class="mdw-card__content" style="display: block;">
          <mdw-button id="raised" class="mdw-raised">raised</mdw-button>
          <mdw-button id="raised-primary" class="mdw-raised  mdw-primary">raised primary</mdw-button>
        </div> -->
      </mdw-card>

      <div style="height: 24px;"></div>
      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>Example usage</h6>
          <div class="description">Include the javascript and css, thats it.</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <code-mirror mode="javascript">
            showDialog() {
              const validForm = document.querySelector('form').checkValidity();

              if (validForm) {
                MDWDialog.show({
                  title: 'Confirmed',
                  message: 'Your data is confirmed',
                  okLabel: 'ok',
                  cancelLabel: 'cancel'
                }).then(data => {
                  console.log(data);
                });
              } else {
                MDWDialog.show({
                  title: 'Invalid',
                  message: 'Your data is invalid',
                  okLabel: 'ok',
                  cancelLabel: 'cancel'
                }).then(data => {
                  console.log(data);
                });
              }
            }
          </code-mirror>

          <code-mirror mode="html">
            <div class="mdw-column">
              <form name="test">
                <div class="mdw-row">
                  <mdw-textfield mdw-flex>
                    <input>
                    <label>A field</label>
                  </mdw-textfield>

                  <mdw-textfield mdw-flex>
                    <input>
                    <label>B field</label>
                  </mdw-textfield>
                </div>

                <mdw-textfield>
                  <input>
                  <label>Filler out</label>
                </mdw-textfield>
              </form>

              <mdw-button class="mdw-raised mdw-primary" onclick="$Home.showDialog()">Presto</mdw-button>
            </div>
          </code-mirror>
        </div>

        <div class="mdw-card__content" style="display: block;">
          <div class="mdw-column">
            <form name="test">
              <div class="mdw-row">
                <mdw-textfield mdw-flex>
                  <input required>
                  <label>A field</label>
                </mdw-textfield>

                <mdw-textfield mdw-flex>
                  <input required>
                  <label>B field</label>
                </mdw-textfield>
              </div>

              <mdw-textfield>
                <input required>
                <label>Filler out</label>
              </mdw-textfield>
            </form>

            <mdw-button class="mdw-raised mdw-primary" onclick="$Home.showDialog()">Presto</mdw-button>
          </div>
        </div>
      </mdw-card>

      <div style="height: 64px;"></div>
      <h4>Components</h4>
    </article>
    `;
  }
}
