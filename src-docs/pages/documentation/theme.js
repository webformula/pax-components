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
      <h1 class="article-title">Theme</h1>
      <p>Material Theming is a systematic approach to customize your app to better represent your brand</p>

      <!-- <div class="links">
        <div class="eyebrow">External links</div>
        <anchor-link selector="#playground" offset="64">Playground</anchor-link>
        <anchor-link selector="#info" offset="64">Overview</anchor-link>
        <anchor-link selector="#customize" offset="64">Customize</anchor-link>
      </div> -->

      <mdw-card>
        <div class="mdw-card__content" style="margin-bottom: -42px;">
          <h6>Playground</h6>
          <div class="mdw-subtitle2">Play with the colors and contrast below. There is also a contrast switch in the top app bar so you can change the contrast on any page.</div>
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

      <section id="info">
        <h2>Contrast</h2>
        <p>There are 2 contrasts. These are built from the color palettes. Dark mode can be used to help readability and accesability. It is common to turn on dark mode at night or in dark areas.</p>
        <ul>
          <li>Light (default)</li>
          <li>Dark</li>
        </ul>
      </section>

      <section>
        <h2>Color scheme</h2>
        <p>There are 4 main parts to the theme system that you can adjust to fit your brands needs. Primary, secondary, error, and contrast.</p>
      </section>

      <section>
        <h2>Palettes</h2>
        <p>These colors are built from palettes. There are 16 built in palettes to choose from. You can also add your own custom palettes</p>

        <div mdw-row mdw-wrap class="palettes-container">
          <div mdw-column>
            <h2 class="palette-title">Red</h2>
            ${["#ffebee","#ffcdd2","#ef9a9a","#e57373","#ef5350","#f44336","#e53935","#d32f2f","#c62828","#b71c1c","#ff8a80","#ff5252","#ff1744","#d50000"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Pink</h2>
            ${["#FCE4EC","#F8BBD0","#F48FB1","#F06292","#EC407A","#E91E63","#D81B60","#C2185B","#AD1457","#880E4F","#FF80AB","#FF4081","#F50057","#C51162"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Purple</h2>
            ${["#f3e5f5","#e1bee7","#ce93d8","#ba68c8","#ab47bc","#9c27b0","#8e24aa","#7b1fa2","#6a1b9a","#4a148c","#ea80fc","#e040fb","#d500f9","#aa00ff"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Deep Purple</h2>
            ${["#ede7f6","#d1c4e9","#b39ddb","#9575cd","#7e57c2","#673ab7","#5e35b1","#512da8","#4527a0","#311b92","#b388ff","#7c4dff","#651fff","#6200ea"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Indigo</h2>
            ${["#E8EAF6","#C5CAE9","#9FA8DA","#7986CB","#5C6BC0","#3F51B5","#3949AB","#303F9F","#283593","#1A237E","#8C9EFF","#536DFE","#3D5AFE","#304FFE"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">blue</h2>
            ${["#e3f2fd","#bbdefb","#90caf9","#64b5f6","#42a5f5","#2196f3","#1e88e5","#1976d2","#1565c0","#0d47a1","#82b1ff","#448aff","#2979ff","#2962ff"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Light blue</h2>
            ${["#E1F5FE","#B3E5FC","#81D4FA","#4FC3F7","#29B6F6","#03A9F4","#039BE5","#0288D1","#0277BD","#01579B","#80D8FF","#40C4FF","#00B0FF","#0091EA"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Cyan</h2>
            ${["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA","#00BCD4","#00ACC1","#0097A7","#00838F","#006064","#84FFFF","#18FFFF","#00E5FF","#00B8D4"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Teal</h2>
            ${["#e0f2f1","#b2dfdb","#80cbc4","#4db6ac","#26a69a","#009688","#00897b","#00796b","#00695c","#004d40","#a7ffeb","#64ffda","#1de9b6","#00bfa5"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Green</h2>
            ${["#E8F5E9","#C8E6C9","#A5D6A7","#81C784","#66BB6A","#4CAF50","#43A047","#388E3C","#2E7D32","#1B5E20","#B9F6CA","#69F0AE","#00E676","#00C853"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Light green</h2>
            ${["#F1F8E9","#DCEDC8","#C5E1A5","#AED581","#9CCC65","#8BC34A","#7CB342","#689F38","#558B2F","#33691E","#CCFF90","#B2FF59","#76FF03","#64DD17"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Lime</h2>
            ${["#F9FBE7","#F0F4C3","#E6EE9C","#DCE775","#D4E157","#CDDC39","#C0CA33","#AFB42B","#9E9D24","#827717","#F4FF81","#EEFF41","#C6FF00","#AEEA00"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Yello</h2>
            ${["#FFFDE7","#FFF9C4","#FFF59D","#FFF176","#FFEE58","#FFEB3B","#FDD835","#FBC02D","#F9A825","#F57F17","#FFFF8D","#FFFF00","#FFEA00","#FFD600"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Amber</h2>
            ${["#FFF8E1","#FFECB3","#FFE082","#FFD54F","#FFCA28","#FFC107","#FFB300","#FFA000","#FF8F00","#FF6F00","#FFE57F","#FFD740","#FFC400","#FFAB00"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Orange</h2>
            ${["#FFF3E0","#FFE0B2","#FFCC80","#FFB74D","#FFA726","#FF9800","#FB8C00","#F57C00","#EF6C00","#E65100","#FFD180","#FFAB40","#FF9100","#FF6D00"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
          <div mdw-column>
            <h2 class="palette-title">Deep orange</h2>
            ${["#FBE9E7","#FFCCBC","#FFAB91","#FF8A65","#FF7043","#FF5722","#F4511E","#E64A19","#D84315","#BF360C","#FF9E80","#FF6E40","#FF3D00","#DD2C00"].map(c => `
                <div class="palette-color-block" style="background: ${c}">${c}</div>
              `).join('\n')}
          </div>
        </div>
      </section>

      <section id="customize">
        <h4>Customize</h4>

        <p>Add your own custom colors... Coming soon!</p>
      </section>

      <section>
        <!-- <a href="#/documentation/mobile">next: Mobile</a> -->
        <a href="#/components/buttons">components: Buttons</a>
      </section>
    </article>
    `;
  }
}
