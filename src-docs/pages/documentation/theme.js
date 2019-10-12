import { Page, html } from '@webformula/pax-core';

export default class ThemePage extends Page {
  constructor() {
    super();
    this.currentPrimary = 'deep-purple';
    this.currentPrimary = 'teal';
    this.currentErrpr = 'red';
    this.contrast = 'dark';
  }

  get title() {
    return 'Theme';
  }

  changePrimary(color) {
    if (color === this.currentPrimary) return;
    this.currentPrimary = color;
    MDWTheme.changeTheme({ primary: color });
  }

  changeSecondary(color) {
    if (color === this.currentSecondary) return;
    this.currentSecondary = color;
    MDWTheme.changeTheme({ secondary: color });
  }

  changeError(color) {
    if (color === this.currentError) return;
    this.currentError = color;
    MDWTheme.changeTheme({ error: color });
  }

  changeContrast(contrast) {
    if (contrast === this.contrast) return;
    this.contrast = contrast;
    MDWTheme.changeTheme({ contrast: contrast });
  }

  template() {
    return html`
    <article class="page-article">
      <h3>Theme</h3>
      <h5>Tools to help with mobile development</h5>


      <section id="theming">
        <mdw-card>
          <div class="mdw-card__content">
            <h6>Colors</h6>
          </div>

          <div class="mdw-card__content" mdw-row>
            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changePrimary(this.value)">
              <select>
                <option value="deep-purple" selected>deep-purple</option>
                <option value="purple">purple</option>
                <option value="blue">blue</option>
                <option value="teal">teal</option>
                <option value="red">red</option>
              </select>
              <label>Select primary palette</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changeSecondary(this.value)">
              <select>
                <option value="deep-purple">deep-purple</option>
                <option value="purple">purple</option>
                <option value="blue">blue</option>
                <option value="teal" selected>teal</option>
                <option value="red">red</option>
              </select>
              <label>Select secondary palette</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changeError(this.value)">
              <select>
                <option value="deep-purple">deep-purple</option>
                <option value="purple">purple</option>
                <option value="blue">blue</option>
                <option value="teal">teal</option>
                <option value="red" selected>red</option>
              </select>
              <label>Select error palette</label>
            </mdw-select>
          </div>

          <div class="mdw-card__content">
            <mdw-select class="mdw-padding" mdw-enhanced onchange="$ThemePage.changeContrast(this.value)">
              <select>
                <option value="light">light</option>
                <option value="dark" selected>dark</option>
              </select>
              <label>Select contrast</label>
            </mdw-select>
          </div>
        </mdw-card>
      </section>


      <section id="theming">
        <h4>Buttons</h4>

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
}
