import { Page, html } from '@webformula/pax-core';

export default class ThemePage extends Page {
  constructor() {
    super();
    this.currentPrimary = 'deep-purple';
    this.currentPrimary = 'teal';
    this.currentErrpr = 'red';
    this.contrast = 'light';
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
      <h5>Material Theming is a systematic approach to customize your app to better represent your brand</h5>

      <div class="links">
        <div class="eyebrow">External links</div>
        <anchor-link selector="#playground" offset="64">Playground</anchor-link>
        <anchor-link selector="#info" offset="64">Overview</anchor-link>
        <anchor-link selector="#customize" offset="64">Customize</anchor-link>
      </div>

      <section id="playground">
        <mdw-card>
          <div class="mdw-card__content" style="margin-bottom: -42px;">
            <h6>Playground</h6>
            <p>Play with the colors and contrast below. There is also a contrast switch in the top app bar so you can change the contrast on any page.</p>
          </div>

          <div class="mdw-card__content" mdw-row>
            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changePrimary(this.value)">
              <select>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="deeppurple" selected>Deep purple</option>
                <option value="indigo">Indigo</option>
                <option value="blue">Blue</option>
                <option value="lightblue">Light blue</option>
                <option value="cyan">Cyan</option>
                <option value="teal">Teal</option>
                <option value="green">Green</option>
                <option value="lightgreen">Light green</option>
                <option value="lime">lime</option>
                <option value="yellow">yellow</option>
                <option value="Amber">Amber</option>
                <option value="orange">Orange</option>
                <option value="deeporange">Deep orange</option>
              </select>
              <label>Primary palette</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changeSecondary(this.value)">
              <select>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="deeppurple">Deep purple</option>
                <option value="indigo">Indigo</option>
                <option value="blue">Blue</option>
                <option value="lightblue">Light blue</option>
                <option value="cyan">Cyan</option>
                <option value="teal" selected>Teal</option>
                <option value="green">Green</option>
                <option value="lightgreen">Light green</option>
                <option value="lime">lime</option>
                <option value="yellow">yellow</option>
                <option value="Amber">Amber</option>
                <option value="orange">Orange</option>
                <option value="deeporange">Deep orange</option>
              </select>
              <label>Secondary palette</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changeError(this.value)">
              <select>
                <option value="red" selected>Red</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="deeppurple">Deep purple</option>
                <option value="indigo">Indigo</option>
                <option value="blue">Blue</option>
                <option value="lightblue">Light blue</option>
                <option value="cyan">Cyan</option>
                <option value="teal">Teal</option>
                <option value="green">Green</option>
                <option value="lightgreen">Light green</option>
                <option value="lime">lime</option>
                <option value="yellow">yellow</option>
                <option value="Amber">Amber</option>
                <option value="orange">Orange</option>
                <option value="deeporange">Deep orange</option>
              </select>
              <label>Error palette</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced mdw-flex onchange="$ThemePage.changeContrast(this.value)">
              <select>
                <option value="light" selected>light</option>
                <option value="dark">dark</option>
              </select>
              <label>Contrast</label>
            </mdw-select>
          </div>

          <div class="mdw-card__content" style="display: block;">
            <mdw-button id="base-raised" class="mdw-raised">base</mdw-button>
            <mdw-button id="primary-raised" class="mdw-raised mdw-primary">primary</mdw-button>
            <mdw-button id="secondary-raised" class="mdw-raised mdw-secondary">secondary</mdw-button>
            <mdw-button id="error-raised" class="mdw-raised mdw-error">error</mdw-button>
          </div>
        </mdw-card>
      </section>

      <section id="info">
        <h4>Overview</h4>
        <p>There are 4 main parts to the theme system that you can adjust to fit your brands needs</p>
        <ul>
          <li>Primary colors</li>
          <li>Secondary colors</li>
          <li>Error colors</li>
          <li>Contrast</li>
        </ul>

        <h6>Colors</h6>
        <p>The colors are built from palettes. There are 16 built in palettes to choose from. You can also add your own custom palettes</p>
        <ul>
          <li>Red</li>
          <li>Pink</li>
          <li>Purple</li>
          <li>Deep purple</li>
          <li>Indigo</li>
          <li>Blue</li>
          <li>Light blue</li>
          <li>Cyan</li>
          <li>Teal</li>
          <li>Green</li>
          <li>Light green</li>
          <li>lime</li>
          <li>yellow</li>
          <li>Amber</li>
          <li>Orange</li>
          <li>Deep orange</li>
        </ul>

        <h6>Contrast</h6>
        <p>There are 2 contrasts. These are built from the color palettes. Dark mode can be used to help readability and accesability. It is common to turn on dark mode at night or in dark areas.</p>
        <ul>
          <li>Light (default)</li>
          <li>Dark</li>
        </ul>
      </section>

      <section id="customize">
        <h4>Customize</h4>

        <p>Add your own custom colors... Coming soon!</p>
      </section>

      <section>
        <a href="#/documentation/mobile">next: Mobile</a>
      </section>
    </article>
    `;
  }
}
