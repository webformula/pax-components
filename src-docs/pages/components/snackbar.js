const { Page, html } = require('@webformula/pax-core');

module.exports = class Snackbar extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Snackbar';
  }

  showSnackbar() {
    MDWSnackbar.show({
      message: 'message message 123',
      actionLabel: 'act',
    }).then(data => {
      console.log(data);
    });
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Snackbar</h3>

        <div class="showcase">
          <mdw-button onclick="$Snackbar.showSnackbar()">show snackbar</mdw-button>
        </div>

        <a href="https://material.io/design/components/snackbars.html">Material Design Guidlines: Snackbars</a>
        <p>Snackbars provide brief messages about app processes at the bottom of the screen</p>


        <section id="types">
          <h4>Examples</h4>

          <mdw-card id="positon-top-left">
            <div class="mdw-card__content">
              <h6>Service example</h6>
            </div>

            <div class="mdw-card__content--no-padding" style="background-color: #f3f3f3;">
              <code-mirror type="javascript">
                showSnackbar()
                  // MDWSnackbar is globally available
                  // Only 1 item will show at a time
                  //   The rest of the items are queued up and will
                  //   automatically display when the current item is removed
                  MDWSnackbar.show({
                    message: 'message message 123',
                    actionLabel: 'act',
                  }).then(function (data) {
                    // this is called when the action button is clicked
                    console.log(data);
                  });
                }
              </code-mirror>

              <code-mirror type="html">
                <mdw-button onclick="$Snackbar.showSnackbar()">show snackbar</mdw-button>
              </code-mirror>
            </div>
          </mdw-card>
        </section>
      </article>
    `;
  }
};
