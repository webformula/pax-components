// TODO enable configuration of theme on load

const MDWTheme = new class {
  constructor() {
    this.hexREGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.paletteRegex = /(?<base>--mdw-theme-palette--)(?<color>\w*)-?(?<contrast>contrast)?-(?<hue>\w*)$/;
    this.textRegex = /(?<base>--mdw-theme-text--)(?<on>on-\w*)?(?<state>\w*)--(?<contrast>\w*)$/;
    this.contentWithContrastRegex = /(?<base>--mdw-theme-)(?<content>\w*)--(?<contrast>\w*)$/;
    this.contrast_ = 'light';

    const initialConfig = Object.assign({
      contrast: 'light',
      primary: 'deeppurple',
      secondary: 'teal',
      error: 'red'
    }, window.MDWThemeConfig);

    this.setPalettes(initialConfig);
    if (['light', 'dark'].indexOf(initialConfig.contrast) > -1) this.contrast = initialConfig.contrast;
    this.categorize();
    this.setThemeVars();
    this.setOtherVars();
  }

  get contrast() {
    return this.contrast_;
  }

  set contrast(value) {
    if (value !== 'light' && value !== 'dark') throw Error('valid values are "light" and "dark"');
    this.contrast_ = value;
  }

  changeTheme({ primary, secondary, error, contrast }) {
    primary = primary || this.palettes.primary;
    secondary = secondary || this.palettes.secondary;
    error = error || this.palettes.error;
    this.contrast = contrast;
    this.setPalettes({ primary, secondary, error });
    this.setThemeVars();
    this.setOtherVars();
  }

  setPalettes({ primary, secondary, error } = {}) {
    this.palettes = {
      primary: primary || 'deeppurple',
      secondary: secondary || 'teal',
      error: error || 'red'
    };
  }

  setThemeVars() {
    Object.keys(this.palettes).forEach(key => {
      const colorName = this.palettes[key];
      const paletteVars = this.paletteVars(colorName);
      paletteVars.forEach(palette => {
        const name = `--mdw-theme-${key}${palette.contrast ? `-${palette.contrast}` : ''}${palette.default === false ? `-${palette.hue}` : ''}`;
        const value = this.getVar(palette.var);
        this.setVar(name, value);
        this.setVar(`${name}--rgb`, this.convertToRGB(value));

        if (palette.hue === this.contrast) {
          const normalized = name.replace(`-${this.contrast}`, '');
          this.setVar(normalized, value);
          this.setVar(`${normalized}--rgb`, this.convertToRGB(value));
        }
      });
    });
  }

  setOtherVars() {
    this.otherVars().forEach(v => {
      const value = this.getVar(v.var);
      this.setVar(v.normalized, value);
      this.setVar(`${v.normalized}--rgb`, this.convertToRGB(value));
    });
  }

  paletteVars(colorName) {
    const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith(`--mdw-theme-palette--${colorName}`));
    return paletteVarNames.map(key => this.normalizedVars[key][0]);
  }

  otherVars() {
    const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith('--mdw-theme') && !key.startsWith('--mdw-theme-palette'));
    return paletteVarNames.map(key => this.pickVar(this.normalizedVars[key]));
  }

  setVars() {
    Object.keys(this.normalizedVars).forEach(key => {
      const picked = this.pickVar(this.normalizedVars[key]);
      this.setVar(picked.normalized, this.getVar(picked.var));
    });
  }

  setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }

  pickVar(arr) {
    let found = arr.find(item => {
      if (item.default === true && this.contrast === item.contrast) return true;
    });
    if (!found) {
      found = arr.find(item => {
        if (this.contrast === item.contrast) return true;
        if (item.default === true) return true;
      });
    }
    return found || arr[0];
  }

  categorize() {
    const parsed = this.getAllVars().map(v => this.parseVar(v));
    const normalizedHash = parsed.reduce((a, b) => {
      if (b.noMatch === true || !b.normalized) return a;

      if (!a[b.normalized]) a[b.normalized] = [];
      a[b.normalized].push(b);
      return a;
    }, {});

    this.normalizedVars = normalizedHash;
  }

  // parse out variables in :root
  getAllVars() {
    return [...document.styleSheets]
      .filter(s => s.href === null || s.href.startsWith(window.location.origin))
      .reduce((a, sheet) => a.concat([...sheet.cssRules].reduce((a2, rule) => {
        if (rule.selectorText === ':root') return a2.concat([...rule.style].filter(n => n.startsWith('--')));
        return a2;
      }, [])), []);
  }

  getUnmatched() {
    const parsed = this.getAllVars().map(v => this.parseVar(v));
    return parsed.filter(n => n.noMatch === true);
  }

  parseVar(varName) {
    if (this.paletteRegex.test(varName)) {
      const groups = varName.match(this.paletteRegex).groups;
      const normalized = `${groups.base}${groups.color}${groups.contrast ? `-contrast` : ''}-${groups.hue}`;
      return Object.assign({
        var: varName,
        type: 'palette',
        default: varName.indexOf('default') > 0,
        normalized
      }, groups);
    }
    if (this.textRegex.test(varName)) {
      const groups = varName.match(this.textRegex).groups;
      const normalized = `${groups.base}${groups.state || ''}${groups.on || ''}`;
      return Object.assign({
        var: varName,
        type: 'text',
        default: varName.indexOf('default') > 0,
        normalized
      }, groups);
    }
    if (this.contentWithContrastRegex.test(varName)) {
      const groups = varName.match(this.contentWithContrastRegex).groups;
      const normalized = `${groups.base}${groups.content}`;
      return Object.assign({
        var: varName,
        type: 'content',
        default: varName.indexOf('default') > 0,
        normalized
      }, groups);
    }

    return {
      var: varName,
      noMatch: true
    };
  }

  convertToRGB(hex) {
    const result = this.hexREGEX.exec(hex.trim());
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  }
};

window.MDWTheme = MDWTheme;

export default MDWTheme;
