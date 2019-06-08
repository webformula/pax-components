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

      </article>
    `;
  }
};
