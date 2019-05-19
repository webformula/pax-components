const { Page, html } = require('@webformula/pax-core');

module.exports = class Dialog extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Dialog';
  }

  get d1() {
    return document.querySelector('#d1');
  }

  showDialog() {
    this.d1.hoistToBody();
    this.d1.show();
  }

  ok() {
    this.d1.close();
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Menu</h3>

        <div class="showcase">
          <mdw-button onclick="$Dialog.showDialog()">show dialog</mdw-button>
        </div>

        <mdw-dialog id="d1">
          <mdw-panel>
            <mdw-dialog-container>

              <mdw-dialog-title>Title</mdw-dialog-title>

              <mdw-dialog-content>
                This is some content
              </mdw-dialog-content>

              <mdw-dialog-actions>
                <mdw-button class="mdw-error" onclick="d1.close()">cancel</mdw-button>
                <mdw-button onclick="$Dialog.ok()">ok</mdw-button>
              </mdw-dialog-actions>

            </mdw-dialog-container>
          </mdw-panel>
        </mdw-dialog>

      </article>
    `;
  }
};
