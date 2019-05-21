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

  showDialogWithService() {
    MDWDialog.show({
      title: 'Title',
      message: 'message message 123',
      okLabel: 'ok',
      cancelLabel: 'cancel'
    }).then(data => {
      console.log(data);
    });
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

        <a href="https://material.io/design/components/dialogs.html">Material Design Guidlines: Dialogs</a>
        <p>Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#service">Dialog service</anchor-link>
          <anchor-link selector="#template">Dialog template</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <!-- contained -->
          <mdw-card id="service">
            <div class="mdw-card__content">
              <h6>Dialog service</h6>
              <div class="description">Use MDWDialog service to create promise based dialog</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="javascript">
                MDWDialog.show({
                  title: 'Title',
                  message: 'message message 123',
                  okLabel: 'ok',
                  cancelLabel: 'cancel'
                }).then(data => {
                  console.log(data);
                });
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button class="mdw-raised  mdw-primary" onclick="$Dialog.showDialogWithService()">show dialog</mdw-button>
            </div>
          </mdw-card>


          <mdw-card id="template">
            <div class="mdw-card__content">
              <h6>Dialog from template</h6>
              <div class="description">Place html dialog in page</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-dialog id="d1">
                  <mdw-panel>
                    <mdw-dialog-container>
                      <mdw-dialog-title>Title</mdw-dialog-title>
                      <mdw-dialog-content>
                        This is some content
                      </mdw-dialog-content>
                      <mdw-dialog-actions>
                        <mdw-button class="mdw-error" onclick="d1.close()">cancel</mdw-button>
                        <mdw-button onclick="d1.close(true)">ok</mdw-button>
                      </mdw-dialog-actions>
                    </mdw-dialog-container>
                  </mdw-panel>
                </mdw-dialog>

                <!--
                  document.querySelector('#d1').hoistToBody();
                  document.querySelector('#d1').show();
                -->
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button class="mdw-raised  mdw-primary" onclick="$Dialog.showDialog()">show dialog</mdw-button>
            </div>
          </mdw-card>


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
