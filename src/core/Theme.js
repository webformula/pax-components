// TODO get rid of jit theming
// This should be part of the build process
// This should also be exposed so users can it in there build process to generate a theme css file
import baseTheme from './base-theme.js';

class ThemeGenerator {
  constructor() {
    // this.paletteRegex = /(--mdw-theme-palette--)(\w*)(-(\w*))?(--(\w*))?$/;
    this.textRegex = /--mdw-theme-text-(\w*)?(-on-\w*)--(\w*)$/;
    this.onRegex = /(--mdw-theme-on-)(\w*)--(\w*)$/;
    this.themeRegex = /(--mdw-theme-)(\w*)--(\w*)$/;
    this.hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.rgbRegex = /rgb\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})\)/;
    this.rgbaRegex = /rgba\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})/;
  }

  generateThemeCss(str /*, theme = { primary: 'deeppurple', secondary: 'teal', error: 'red' } */) {
    const allVariables = this.getAllVariables(str);
    const categories = {
      // palette: { light: [], dark: [] },
      text: { light: [], dark: [] },
      on: { light: [], dark: [] },
      theme: { light: [], dark: [] },
      none: { light: [], dark: [] }
    };
    // const themeValues = Object.keys(theme);
    // const paletteColors = themeValues.map(k => theme[k]);
    allVariables.forEach(value => {
      const parsed = this.parseVariable(value /*, themeValues, paletteColors */);
      // // filter out non theme palettes
      // if (!parsed) return;
      categories[parsed.type][parsed.contrast].push(parsed);
    });
    
    const css = this.buildCss(categories);
    this.createThemeStyleElement(css);
    // allow css to be written to a file
  }

  getAllVariables(str) {
    return [...str.match(/(.*?):.*?;/g)].map(a => (
      a.split(':').map(v => v.trim().replace(';', ''))
    ));
  }

  parseVariable([name, value] /*, themeValues, paletteColors */) {
    // const paletteMatch = name.match(this.paletteRegex);
    // if (paletteMatch) {
    //   const color = paletteMatch[2];
    //   const colorIndex = paletteColors.indexOf(color);

    //   // filter out non theme palettes
    //   if (colorIndex === -1) return;

    //   const themePart = themeValues[colorIndex];
    //   return {
    //     name,
    //     nameNormalized: this.normalizeName(name).replace(color, themePart),
    //     value,
    //     rgbArrayString: this.convertToRGBArrayString(value),
    //     type: 'palette',
    //     contrast: paletteMatch[6] || 'light'
    //   };
    // }

    const textMatch = name.match(this.textRegex);
    if (textMatch) return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'text',
      contrast: textMatch[3]
    };

    const onMatch = name.match(this.onRegex);
    if (onMatch) return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'on',
      contrast: onMatch[3]
    };

    const themeMatch = name.match(this.themeRegex);
    if (themeMatch) return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'theme',
      contrast: themeMatch[3]
    };

    return {
      name,
      nameNormalized: this.normalizeName(name),
      value,
      rgbArrayString: this.convertToRGBArrayString(value),
      type: 'none',
      contrast: name.indexOf('--dark') > 1 ? 'dark' : 'light'
    };
  }

  normalizeName(name) {
    return name.replace('--light', '').replace('--dark', '');
  }

  convertToRGBArrayString(value) {
    const hexMatch = value.trim().match(this.hexRegex);
    if (hexMatch) return `${parseInt(hexMatch[1], 16)}, ${parseInt(hexMatch[2], 16)}, ${parseInt(hexMatch[3], 16)}`;

    const rgbMatch = value.trim().match(this.rgbRegex);
    if (rgbMatch) return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;

    const rgbaMatch = value.trim().match(this.rgbaRegex);
    if (rgbaMatch) return `${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}`;

    return '';
  }

  createThemeStyleElement(str) {
    const styleNode = document.createElement('style');
    document.head.appendChild(styleNode);
    styleNode.type = 'text/css';
    styleNode.appendChild(document.createTextNode(str));
  }

  buildCss(categories) {
    return `:root {
  /* --- text variables --- */
${categories.text.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- on variables --- */
${categories.on.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- theme variables --- */
${categories.theme.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- other variablers --- */
${categories.none.light.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}
}

:root.mdw-theme-dark {
  /* --- text variables --- */
${categories.text.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- on variables --- */
${categories.on.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- theme variables --- */
${categories.theme.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}


  /* --- other variablers --- */
${categories.none.dark.map(v => `  ${v.nameNormalized}: ${v.value};\n  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join('\n')}
}`;
  }
}

const themeGenerator = new ThemeGenerator();

themeGenerator.generateThemeCss(baseTheme());





// const MDWTheme = new class {
//   constructor() {
//     this.hexREGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
//     this.paletteRegex = /(?<base>--mdw-theme-palette--)(?<color>\w*)-?(?<contrast>contrast)?-(?<hue>\w*)$/;
//     this.textRegex = /(?<base>--mdw-theme-text--)(?<on>on-\w*)?(?<state>\w*)--(?<contrast>\w*)$/;
//     this.contentWithContrastRegex = /(?<base>--mdw-theme-)(?<content>\w*)--(?<contrast>\w*)$/;
//     this.contrast_ = 'light';
//     this.palettes = {
//       primary: 'deeppurple',
//       secondary: 'teal',
//       error: 'red'
//     };

//     this.createBaseThemeStyleElement();
//     const initialConfig = Object.assign({ contrast: 'light' }, this.palettes, window.MDWThemeConfig);
//     this.setPalettes(initialConfig);
//     if (['light', 'dark'].indexOf(initialConfig.contrast) > -1) this.contrast = initialConfig.contrast;
//     this.categorize();
//     this.setThemeVars();
//     this.setOtherVars();
//   }

//   get contrast() {
//     return this.contrast_;
//   }

//   set contrast(value) {
//     if (value !== 'light' && value !== 'dark') throw Error('valid values are "light" and "dark"');
//     this.contrast_ = value;
//   }

//   changeTheme({ primary, secondary, error, contrast }) {
//     primary = primary || this.palettes.primary;
//     secondary = secondary || this.palettes.secondary;
//     error = error || this.palettes.error;
//     if (contrast) this.contrast = contrast;
//     this.setPalettes({ primary, secondary, error });
//     this.setThemeVars();
//     this.setOtherVars();
//   }

//   setPalettes({ primary, secondary, error } = {}) {
//     this.palettes = {
//       primary: primary || 'deeppurple',
//       secondary: secondary || 'teal',
//       error: error || 'red'
//     };
//   }

//   setThemeVars() {
//     Object.keys(this.palettes).forEach(key => {
//       const colorName = this.palettes[key];
//       const paletteVars = this.paletteVars(colorName);
//       paletteVars.forEach(palette => {
//         const name = `--mdw-theme-${key}${palette.contrast ? `-${palette.contrast}` : ''}${palette.default === false ? `-${palette.hue}` : ''}`;
//         const value = this.getVar(palette.var);
//         this.setVar(name, value);
//         this.setVar(`${name}--rgb`, this.convertToRGB(value));

//         if (palette.hue === this.contrast) {
//           const normalized = name.replace(`-${this.contrast}`, '');
//           this.setVar(normalized, value);
//           this.setVar(`${normalized}--rgb`, this.convertToRGB(value));
//         }
//       });
//     });
//   }

//   setOtherVars() {
//     this.otherVars().forEach(v => {
//       const value = this.getVar(v.var);
//       this.setVar(v.normalized, value);
//       this.setVar(`${v.normalized}--rgb`, this.convertToRGB(value));
//     });
//   }

//   paletteVars(colorName) {
//     const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith(`--mdw-theme-palette--${colorName}`));
//     return paletteVarNames.map(key => this.normalizedVars[key][0]);
//   }

//   otherVars() {
//     const paletteVarNames = Object.keys(this.normalizedVars).filter(key => key.startsWith('--mdw-theme') && !key.startsWith('--mdw-theme-palette'));
//     return paletteVarNames.map(key => this.pickVar(this.normalizedVars[key]));
//   }

//   setVars() {
//     Object.keys(this.normalizedVars).forEach(key => {
//       const picked = this.pickVar(this.normalizedVars[key]);
//       this.setVar(picked.normalized, this.getVar(picked.var));
//     });
//   }

//   setVar(name, value) {
//     document.documentElement.style.setProperty(name, value);
//   }

//   getVar(name) {
//     return getComputedStyle(document.documentElement).getPropertyValue(name);
//   }

//   pickVar(arr) {
//     let found = arr.find(item => {
//       if (item.default === true && this.contrast === item.contrast) return true;
//     });
//     if (!found) {
//       found = arr.find(item => {
//         if (this.contrast === item.contrast) return true;
//         if (item.default === true) return true;
//       });
//     }
//     return found || arr[0];
//   }

//   categorize() {
//     const parsed = this.getAllVars().map(v => this.parseVar(v));
//     const normalizedHash = parsed.reduce((a, b) => {
//       if (b.noMatch === true || !b.normalized) return a;

//       if (!a[b.normalized]) a[b.normalized] = [];
//       a[b.normalized].push(b);
//       return a;
//     }, {});

//     this.normalizedVars = normalizedHash;
//   }

//   // parse out variables in :root
//   getAllVars() {
//     // return [...baseTheme().matchAll(/(.*?):.*?;/g)].map(a => a[1].trim());
//     return [...baseTheme().match(/(.*?):.*?;/g)].map(a => a.split(':')[0].trim());
//   }

//   getUnmatched() {
//     const parsed = this.getAllVars().map(v => this.parseVar(v));
//     return parsed.filter(n => n.noMatch === true);
//   }

//   parseVar(varName) {
//     if (this.paletteRegex.test(varName)) {
//       const groups = varName.match(this.paletteRegex).groups;
//       const normalized = `${groups.base}${groups.color}${groups.contrast ? `-contrast` : ''}-${groups.hue}`;
//       return Object.assign({
//         var: varName,
//         type: 'palette',
//         default: varName.indexOf('default') > 0,
//         normalized
//       }, groups);
//     }
//     if (this.textRegex.test(varName)) {
//       const groups = varName.match(this.textRegex).groups;
//       const normalized = `${groups.base}${groups.state || ''}${groups.on || ''}`;
//       return Object.assign({
//         var: varName,
//         type: 'text',
//         default: varName.indexOf('default') > 0,
//         normalized
//       }, groups);
//     }
//     if (this.contentWithContrastRegex.test(varName)) {
//       const groups = varName.match(this.contentWithContrastRegex).groups;
//       const normalized = `${groups.base}${groups.content}`;
//       return Object.assign({
//         var: varName,
//         type: 'content',
//         default: varName.indexOf('default') > 0,
//         normalized
//       }, groups);
//     }

//     return {
//       var: varName,
//       noMatch: true
//     };
//   }

//   convertToRGB(hex) {
//     const result = this.hexREGEX.exec(hex.trim());
//     return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
//   }

//   createBaseThemeStyleElement() {
//     const styleNode = document.createElement('style');
//     document.head.appendChild(styleNode);
//     styleNode.type = 'text/css';
//     styleNode.appendChild(document.createTextNode(baseTheme()));
//   }
// };

// window.MDWTheme = MDWTheme;
// export default MDWTheme;
