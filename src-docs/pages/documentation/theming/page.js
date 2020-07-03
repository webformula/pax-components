import { Page } from '/web_modules/@webformula/pax-core/index.js';
import themeGenerator from '../../../themeGenerator.js';

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

  get lightThemeVars() {
    return this.getThemeCss().split(':root.mdw-theme-dark {')[0].trim().replace(/}$/, '').replace(':root {', '');
  }

  get darkThemeVars() {
    return this.getThemeCss().split(':root.mdw-theme-dark {')[1].replace(/}$/, '');
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
      MDWSnackbar.show({ message: 'copy to clipboard denied' });
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
    return './page.html';
  }
}
