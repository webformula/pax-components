import { Page, html } from '@webformula/pax-core';

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
    this.position_ = `${this.posY || 'inner-bottom'} ${this.posX || 'inner-left'}`;
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
    return html`
      <article class="page-article">
        <h3>Snackbar</h3>

        <div row>
          <div flex=".33" column>
            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Snackbar.setSnackbarPositionY(this.value)">
                <option value="top">top</option>
                <option value="inner-top">inner-top</option>
                <option value="bottom">bottom</option>
                <option value="inner-bottom" selected>inner-bottom</option>
                <option value="center">center</option>
              </select>
              <label>Positon Y</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Snackbar.setSnackbarPositionX(this.value)">
                <option value="left">left</option>
                <option value="inner-left" selected>inner-left</option>
                <option value="right">right</option>
                <option value="inner-right">inner-right</option>
                <option value="center">center</option>
              </select>
              <label>Positon X</label>
            </mdw-select>
          </div>

          <div flex=".66">
            <div class="showcase mdw-elevation-1">
              <mdw-button onclick="$Snackbar.showSnackbar()">show snackbar</mdw-button>
            </div>
          </div>
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
}
