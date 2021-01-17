import { Page } from '@webformula/pax-core';

export default class Snackbar extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Snackbar';
  }

  get position() {
    this.setSnackbarPosition();
    return this.position_;
  }

  setSnackbarPositionY(value) {
    this.posY = value;
    this.setSnackbarPosition();
  }

  setSnackbarPositionX(value) {
    this.posX = value;
    this.setSnackbarPosition();
  }

  setSnackbarPosition() {
    this.position_ = `${this.posX || 'inner-left'} ${this.posY || 'inner-bottom'}`;
  }

  showSnackbar() {
    MDWSnackbar.show({
      message: 'message message 123',
      actionLabel: 'act',
      position: this.position
    }).then(data => {
      console.log('show answered', data);
    });
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Snackbar</h3>

        <mdw-row>
          <mdw-column class="mdw-flex-033">
            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="activePage.setSnackbarPositionX(this.value)">
                <option value="left">left</option>
                <option value="inner-left" selected>inner-left</option>
                <option value="right">right</option>
                <option value="inner-right">inner-right</option>
                <option value="center">center</option>
              </select>
              <label>Positon X</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="activePage.setSnackbarPositionY(this.value)">
                <option value="top">top</option>
                <option value="inner-top">inner-top</option>
                <option value="bottom">bottom</option>
                <option value="inner-bottom" selected>inner-bottom</option>
                <option value="center">center</option>
              </select>
              <label>Positon Y</label>
            </mdw-select>
          </mdw-column>

          <div class="mdw-flex-066">
            <div class="showcase mdw-elevation-1">
              <mdw-button onclick="activePage.showSnackbar()">show snackbar</mdw-button>
            </div>
          </div>
        </mdw-row>

        <a href="https://material.io/design/components/snackbars.html" target="_new">Material Design Guidelines: Snackbars</a>
        <p>Snackbars provide brief messages about app processes at the bottom of the screen</p>


        <section id="types">
          <h4>Examples</h4>

          <mdw-card id="positon-top-left">
            <div class="mdw-card__content">
              <h6>Service example</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
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
              </monaco-editor>

              <monaco-editor language="html">
                <mdw-button onclick="activePage.showSnackbar()">show snackbar</mdw-button>
              </monaco-editor>
            </div>
          </mdw-card>
        </section>
      </article>
    `;
  }
}
