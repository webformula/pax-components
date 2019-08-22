export default new class MDWTheme {
  constructor() {
    this.hexREGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.setContrast();
    this.setPalettes();
    this.configureVars();
  }

  setPalettes({ primary, secondary, error } = {}) {
    this.palettes = {
      primary: primary || 'deep-purple',
      secondary: secondary || 'teal',
      error: error || 'red'
    };
  }

  setContrast(contrast = 'light') {
    this.contrast = contrast;
  }

  configureVars() {
    this.setTheme();
    this.createRGBValues();
    this.applyContrast();
    this.createBaseVars();
  }

  setTheme() {
    Object.keys(this.palettes).forEach(key => {
      const colorName = this.palettes[key];
      this.paletteVars(colorName).forEach(varName => {
        this.setVar(varName.replace(colorName, key), this.getVar(varName));
      });
    });
  }

  createRGBValues() {
    this.rgbConversionList().forEach(name => {
      this.setVar(`${name.replace(`--default`, '')}--rgb`, this.convertToRGB(this.getVar(name)));
    });
  }

  applyContrast() {
    this.contrastList(this.contrast).forEach(name => {
      this.setVar(name.replace(`--${this.contrast}`, ''), this.getVar(name));
    });
  }

  // this will take any var with --default and create a var without default in it
  // example: --mdw-theme-primary--default -> --mdw-theme-primary
  createBaseVars() {
    this.defaultList().forEach(name => {
      this.setVar(name.replace(`--default`, ''), this.getVar(name));
    });
  }

  convertToRGB(hex) {
    const result = this.hexREGEX.exec(hex.trim());
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  }

  getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }

  getAllVars() {
    return getComputedStyle(document.documentElement);
  }

  setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  defaultList() {
    return this.rgbConversionList();
  }

  rgbConversionList() {
    return [
      '--mdw-theme-primary--default',
      '--mdw-theme-secondary--default',
      '--mdw-theme-error--default',
      '--mdw-theme-surface--default',
      '--mdw-theme-background--default',
      '--mdw-theme-foreground--default'
    ];
  }

  contrastList(contrast) {
    return [
      `--mdw-theme-primary--${contrast}--on`,
      `--mdw-theme-secondary--${contrast}--on`,
      `--mdw-theme-error--${contrast}--on`,
      `--mdw-theme-surface--${contrast}--on`,
      `--mdw-theme-text--primary--${contrast}`,
      `--mdw-theme-text--secondary--${contrast}`,
      `--mdw-theme-text--hint--${contrast}`,
      `--mdw-theme-text--disabled--${contrast}`,
      `--mdw-theme-text--icon--${contrast}`,
      `--mdw-theme-divider--${contrast}`,
      `--mdw-theme-divider--on--${contrast}`,
      `--mdw-theme-text--primary--on-${contrast}`,
      `--mdw-theme-text--secondary--on-${contrast}`,
      `--mdw-theme-text--hint--on-${contrast}`,
      `--mdw-theme-text--disabled--on-${contrast}`,
      `--mdw-theme-text--icon--on-${contrast}`
    ];
  }

  paletteVars(name) {
    return [
        `--mdw-theme-palette--${name}-50`,
        `--mdw-theme-palette--${name}-100`,
        `--mdw-theme-palette--${name}-200`,
        `--mdw-theme-palette--${name}-300`,
        `--mdw-theme-palette--${name}-400`,
        `--mdw-theme-palette--${name}-500`,
        `--mdw-theme-palette--${name}-600`,
        `--mdw-theme-palette--${name}-700`,
        `--mdw-theme-palette--${name}-800`,
        `--mdw-theme-palette--${name}-900`,
        `--mdw-theme-palette--${name}-A100`,
        `--mdw-theme-palette--${name}-A200`,
        `--mdw-theme-palette--${name}-A400`,
        `--mdw-theme-palette--${name}-A700`,
        `--mdw-theme-palette--${name}-contrast-50`,
        `--mdw-theme-palette--${name}-contrast-100`,
        `--mdw-theme-palette--${name}-contrast-200`,
        `--mdw-theme-palette--${name}-contrast-300`,
        `--mdw-theme-palette--${name}-contrast-400`,
        `--mdw-theme-palette--${name}-contrast-500`,
        `--mdw-theme-palette--${name}-contrast-600`,
        `--mdw-theme-palette--${name}-contrast-700`,
        `--mdw-theme-palette--${name}-contrast-800`,
        `--mdw-theme-palette--${name}-contrast-900`,
        `--mdw-theme-palette--${name}-contrast-A100`,
        `--mdw-theme-palette--${name}-contrast-A200`,
        `--mdw-theme-palette--${name}-contrast-A400`,
        `--mdw-theme-palette--${name}-contrast-A700`
    ];
  }
}
