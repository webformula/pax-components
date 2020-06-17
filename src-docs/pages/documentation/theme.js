import { Page } from '/web_modules/@webformula/pax-core/index.js';
import themeGenerator from '../../themeGenerator.js';

export default class ThemePage extends Page {
  constructor() {
    super();

    this.initialValues = {
      // main colors
      '--mdw-theme-primary--light': '#6200ee',
      '--mdw-theme-secondary--light': '#018786',
      '--mdw-theme-error--light': '#b00020',
      '--mdw-theme-background--light': '#ffffff',
      '--mdw-theme-surface--light': '#ffffff',

      '--mdw-theme-primary--dark': '#b39ddb',
      '--mdw-theme-secondary--dark': '#80cbc4',
      '--mdw-theme-error--dark': '#ef9a9a',
      '--mdw-theme-background--dark': '#121212',
      '--mdw-theme-surface--dark': '#121212',


      // on variables
      '--mdw-theme-on-primary--light': '#000000',
      '--mdw-theme-on-secondary--light': '#000000',
      '--mdw-theme-on-error--light': '#000000',
      '--mdw-theme-on-background--light': '#000000',

      '--mdw-theme-on-primary--dark': '#ffffff',
      '--mdw-theme-on-secondary--dark': '#ffffff',
      '--mdw-theme-on-error--dark': '#ffffff',
      '--mdw-theme-on-background--dark': '#ffffff',


      // text variables
      '--mdw-theme-text-primary-on-background--light': '#ffffff',
      '--mdw-theme-text-secondary-on-background--light': 'rgba(255,255,255, .7)',
      '--mdw-theme-text-hint-on-background--light': 'rgba(255,255,255, .5)',
      '--mdw-theme-text-disabled-on-background--light': 'rgba(255,255,255, .5)',
      '--mdw-theme-text-icon-on-background--light': 'rgba(255,255,255, .5)',

      '--mdw-theme-text-primary-on-background--dark': 'rgba(0,0,0, .87)',
      '--mdw-theme-text-secondary-on-background--dark': 'rgba(0,0,0, .54)',
      '--mdw-theme-text-hint-on-background--dark': 'rgba(0,0,0, .38)',
      '--mdw-theme-text-disabled-on-background--dark': 'rgba(0,0,0, .38)',
      '--mdw-theme-text-icon-on-background--dark': 'rgba(0,0,0, .38)',


      // other
      '--mdw-theme-checkboxborder--light': 'rgba(0,0,0, .54)',
      '--mdw-theme-checkboxborderdisabled--light': 'rgba(0,0,0, .26)',
      '--mdw-theme-list_item_focus--light': 'rgba(0,0,0,.06)',

      '--mdw-theme-checkboxborder--dark': 'rgba(255,255,255, .5)',
      '--mdw-theme-checkboxborderdisabled--dark': 'rgba(255,255,255, .24)',
      '--mdw-theme-list_item_focus--dark': 'rgba(100,100,100,.16)',

    };

    this.setValues = Object.assign({}, this.initialValues);
    this.bound_onGlobalContrastChange = this.onGlobalContrastChange.bind(this);
  }

  get title() {
    return 'Theme';
  }

  get globalContrastSwitch() {
    return document.querySelector('#global-contrast-switch');
  }

  get contrastSwitch() {
    return document.querySelector('#theme-contrast-switch');
  }

  connectedCallback() {
    this.globalContrastSwitch.addEventListener('change', this.bound_onGlobalContrastChange);
  }

  disconnectedCallback() {
    this.globalContrastSwitch.removeEventListener('change', this.bound_onGlobalContrastChange);
  }

  onGlobalContrastChange({ target }) {
    this.contrastSwitch.checked = target.checked;
  }

  getThemeCss() {
    return themeGenerator.generateThemeCss(JSON.stringify(this.setValues));
  }

  setValue(inputElement, property) {
    // TODO invalidate input
    if (!this.isValidColor(inputElement.value)) {
      inputElement.setCustomValidity('invalid color');
      return;
    }
    inputElement.setCustomValidity('');

    inputElement.parentNode.querySelector('.post-icon').style.backgroundColor = inputElement.value;
    this.setValues[property] = inputElement.value;
    document.documentElement.style.setProperty(property, inputElement.value);
  }

  isValidColor(value) {
    const s = new Option().style;
    s.color = value;
    return !!s.color;
  }

  copyTheme() {
    const css = themeGenerator.generateThemeCss(JSON.stringify(this.setValues));
    navigator.clipboard.writeText(css).then(() => {
      MDWSnackbar.show({ message: 'Theme copied to clipboard' });
    }, () => {
      MDWSnackbar.show({ message: 'copy to clipbard denied' });
    });
  }

  downloadTheme() {
    const css = themeGenerator.generateThemeCss(JSON.stringify(this.setValues));
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(css));
    element.setAttribute('download', 'theme.css');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  resetTheme() {
    this.setValues = Object.assign({}, this.initialValues);
    Object.entries(this.initialValues).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    this.render();
  }

  changeContrast() {
    window.changeContrast();
    document.querySelector('#global-contrast-switch').checked = !document.querySelector('#global-contrast-switch').checked;
  }

  styles() {
    return /* css */`
      .colors-container {
        padding: 56px 24px;
      }

      .colors-container mdw-textfield {
        width: 150px;
        margin: 8px 8px;
      }
    `;
  }


  template() {
    const theme = this.getThemeCss();
    const lightThemeVars = theme.split(':root.mdw-theme-dark {')[0].trim().replace(/}$/, '').replace(':root {', '');
    const darkThemeVars = theme.split(':root.mdw-theme-dark {')[1].replace(/}$/, '');

    return /* html */`
    <article class="page-article">
      <h1 class="article-title">Theming</h1>
      <p>Material Theming is a systematic approach to customize your app to better represent your brand <a href="https://material.io/design/material-theming/#material-theming" style="display: inline;" target="_new">Material Theming</a></p>

      <h6>How does theming work?</h6>
      <p style="margin-top: -12px">There are 3 main colors you can set in material. Primary, secondary, and error. Along side the colors you can adjust the colors that show on them for content like text and icons.There is also 2 contrast setting you can choose. Light (default), and dark (the cool one)</p>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>Add you theme</h6>
        </div>

        <div class="mdw-card__content">
          To add a custom theme, use the genroator below and create a css file. Once you have the theme css file you can load that in place of 'theme.css' in pax-components distrobution.
        </div>

        <div class="mdw-card__content--no-padding">
          <monaco-editor language="html">
            <!-- add your theme css -->
            <link rel="stylesheet" href="your-path/your-theme.css">

            <!-- remove this distributation css file -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/theme.css">
          </monaco-editor>
        </div>
      </mdw-card>

      <div mdw-row style="align-items: baseline">
        <mdw-card style="margin-right: 24px">
          <div class="mdw-card__content" mdw-row mdw-flex-position="space-between center">
            <h6 mdw-flex>Customize your perfect theme</h6>
            <div>
              <label>Contrast</label>
              <mdw-switch id="theme-contrast-switch" onchange="activePage.changeContrast()" ${document.querySelector('#global-contrast-switch').checked ? 'checked' : ''}></mdw-switch>
            </div>
          </div>

          <div class="mdw-card__content" style="display: block;">
            <div mdw-column>
              <div class="mdw-subtitle" style="margin-bottom: -32px; padding-left: 12px; z-index: 1; color: black;">Light</div>
              <div class="colors-container mdw-density-compact" mdw-row mdw-wrap mdw-flex-position="center" style="background-color: ${this.setValues['--mdw-theme-background--light']}; ${lightThemeVars}">
                <mdw-textfield>
                  <label>Primary light</label>
                  <input value="${this.setValues['--mdw-theme-primary--light']}" oninput="activePage.setValue(this, '--mdw-theme-primary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-primary--light']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>Secondary light</label>
                  <input value="${this.setValues['--mdw-theme-secondary--light']}" oninput="activePage.setValue(this, '--mdw-theme-secondary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-secondary--light']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>Error light</label>
                  <input value="${this.setValues['--mdw-theme-error--light']}" oninput="activePage.setValue(this, '--mdw-theme-error')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-error--light']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>On primary (text) light</label>
                  <input value="${this.setValues['--mdw-theme-on-primary--light']}" oninput="activePage.setValue(this, '--mdw-theme-on-primary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-on-primary--light']}"></div>
                </mdw-textField>

                <!-- add later
                <mdw-textfield>
                  <label>On secondary light</label>
                  <input value="${this.setValues['--mdw-theme-on-secondary--light']}" oninput="activePage.setValue(this, '--mdw-theme-on-secondary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-on-secondary--light']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>On error light</label>
                  <input value="${this.setValues['--mdw-theme-on-error--light']}" oninput="activePage.setValue(this, '--mdw-theme-on-error')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-on-error--light']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Primary on background light</label>
                  <input value="${this.setValues['--mdw-theme-text-primary-on-background--light']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-primary-on-background--light']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Secondary on background light</label>
                  <input value="${this.setValues['--mdw-theme-text-secondary-on-background--light']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-secondary-on-background--light']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Hint on background light</label>
                  <input value="${this.setValues['--mdw-theme-text-hint-on-background--light']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-hint-on-background--light']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Disabled on background light</label>
                  <input value="${this.setValues['--mdw-theme-text-disabled-on-background--light']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-disabled-on-background--light']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Icon on background light</label>
                  <input value="${this.setValues['--mdw-theme-text-icon-on-background--light']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-icon-on-background--light']}"></div>
                </mdw-textField>
                -->
              </div>

              <div class="mdw-subtitle" style="margin-bottom: -32px; color: white; padding-left: 12px; z-index: 1">Dark</div>
              <div class="colors-container mdw-density-compact" mdw-row mdw-wrap mdw-flex-position="center" style="background-color: ${this.setValues['--mdw-theme-background--dark']}; ${darkThemeVars}">
                <mdw-textfield>
                  <label>Primary dark</label>
                  <input value="${this.setValues['--mdw-theme-primary--dark']}" onchange="activePage.setValue(this, '--mdw-theme-primary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-primary--dark']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>Secondary dark</label>
                  <input value="${this.setValues['--mdw-theme-secondary--dark']}" onchange="activePage.setValue(this, '--mdw-theme-secondary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-secondary--dark']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>Error dark</label>
                  <input value="${this.setValues['--mdw-theme-error--dark']}" onchange="activePage.setValue(this, '--mdw-theme-error')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-error--dark']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>On primary (text) dark</label>
                  <input value="${this.setValues['--mdw-theme-on-primary--dark']}" onchange="activePage.setValue(this, '--mdw-theme-on-primary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-on-primary--dark']}"></div>
                </mdw-textField>

                <!-- add later
                <mdw-textfield>
                  <label>On secondary dark</label>
                  <input value="${this.setValues['--mdw-theme-on-secondary--dark']}" onchange="activePage.setValue(this, '--mdw-theme-on-secondary')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-on-secondary--dark']}"></div>
                </mdw-textField>

                <mdw-textfield>
                  <label>On error dark</label>
                  <input value="${this.setValues['--mdw-theme-on-error--dark']}" onchange="activePage.setValue(this, '--mdw-theme-on-error')"/>
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-on-error--dark']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Primary on background dark</label>
                  <input value="${this.setValues['--mdw-theme-text-primary-on-background--dark']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-primary-on-background--dark']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Secondary on background dark</label>
                  <input value="${this.setValues['--mdw-theme-text-secondary-on-background--dark']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-secondary-on-background--dark']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Hint on background dark</label>
                  <input value="${this.setValues['--mdw-theme-text-hint-on-background--dark']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-hint-on-background--dark']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Disabled on background dark</label>
                  <input value="${this.setValues['--mdw-theme-text-disabled-on-background--dark']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-disabled-on-background--dark']}"></div>
                </mdw-textField>

                <mdw-textfield style="width: 240px">
                  <label>Icon on background dark</label>
                  <input value="${this.setValues['--mdw-theme-text-icon-on-background--dark']}" />
                  <div class="post-icon" style="height: 100%; width: 64px; background-color: ${this.setValues['--mdw-theme-text-icon-on-background--dark']}"></div>
                </mdw-textField>
                -->
              </div>
            </div>
          </div>

          <div class="mdw-card__actions">
            <mdw-button class="mdw-raised mdw-primary" onclick="activePage.downloadTheme()">Download</mdw-button>
            <mdw-button class="mdw-raised mdw-secondary" onclick="activePage.copyTheme()">Copy to clipboard</mdw-button>
            <mdw-button class="mdw-error" onclick="activePage.resetTheme()">reset theme</mdw-button>
          </div>
        </mdw-card>

        <mdw-card>
          <div class="mdw-card__content">
            <h6>This is a demonstration of the theme</h6>
            <div class="mdw-subtitle">This is a subtitle</div>
          </div>

          <div class="mdw-card__content-action">
            <div class="mdw-card__media--16-9" style="background-image: url(https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg)"></div>
            <div class="mdw-card__supporting mdw-body">Visit ten places on our planet that are undergoing the biggest changes today.</div>
          </div>

          <div class="mdw-card__actions" mdw-wrap>
            <mdw-button class="mdw-raised mdw-primary">primary</mdw-button>
            <mdw-button class="mdw-raised mdw-secondary">secondary</mdw-button>
            <mdw-button class="mdw-raised mdw-error">error</mdw-button>
          </div>
        </mdw-card>
      </div>

      <section>
        <h2>Palettes</h2>
        <p>Here are some palettes to choose colors from</p>

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

      <section mdw-row>
        <mdw-button class="mdw-secondary" href="#/documentation/browsers">< compatibility</mdw-button>
        <span mdw-flex></span>
        <mdw-button class="mdw-secondary" href="#/documentation/layout">layout ></mdw-button>
      </section>
    </article>
    `;
  }
}
