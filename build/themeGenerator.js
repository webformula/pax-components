export default new class ThemeGenerator {
  constructor() {
    this.textRegex = /--mdw-theme-text-(\w*)?(-on-\w*)--(\w*)$/;
    this.onRegex = /(--mdw-theme-on-)(\w*)--(\w*)$/;
    this.themeRegex = /(--mdw-theme-)(\w*)--(\w*)$/;
    this.hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    this.rgbRegex = /rgb\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})\)/;
    this.rgbaRegex = /rgba\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})/;
  }
  generateThemeCss(str) {
    const allVariables = this._getAllVariables(str);
    const categories = {
      text: {
        light: [],
        dark: []
      },
      on: {
        light: [],
        dark: []
      },
      theme: {
        light: [],
        dark: []
      },
      none: {
        light: [],
        dark: []
      }
    };
    allVariables.forEach((value) => {
      const parsed = this._parseVariable(value);
      categories[parsed.type][parsed.contrast].push(parsed);
    });
    const css = this._buildCss(categories);
    return css;
  }
  _getAllVariables(str) {
    str = str.replace(/"/g, "").replace(/{+/, "").replace(/}$/, "").replace(/\,-/g, ";\n-").replace(/\;$/, "").trim() + ";";
    return [...str.match(/(.*?):.*?;/g)].map((a) => a.split(":").map((v) => v.trim().replace(";", "")));
  }
  _parseVariable([name, value]) {
    const textMatch = name.match(this.textRegex);
    if (textMatch)
      return {
        name,
        nameNormalized: this._normalizeName(name),
        value,
        rgbArrayString: this._convertToRGBArrayString(value),
        type: "text",
        contrast: textMatch[3]
      };
    const onMatch = name.match(this.onRegex);
    if (onMatch)
      return {
        name,
        nameNormalized: this._normalizeName(name),
        value,
        rgbArrayString: this._convertToRGBArrayString(value),
        type: "on",
        contrast: onMatch[3]
      };
    const themeMatch = name.match(this.themeRegex);
    if (themeMatch)
      return {
        name,
        nameNormalized: this._normalizeName(name),
        value,
        rgbArrayString: this._convertToRGBArrayString(value),
        type: "theme",
        contrast: themeMatch[3]
      };
    return {
      name,
      nameNormalized: this._normalizeName(name),
      value,
      rgbArrayString: this._convertToRGBArrayString(value),
      type: "none",
      contrast: name.indexOf("--dark") > 1 ? "dark" : "light"
    };
  }
  _normalizeName(name) {
    return name.replace("--light", "").replace("--dark", "");
  }
  _convertToRGBArrayString(value) {
    const hexMatch = value.trim().match(this.hexRegex);
    if (hexMatch)
      return `${parseInt(hexMatch[1], 16)}, ${parseInt(hexMatch[2], 16)}, ${parseInt(hexMatch[3], 16)}`;
    const rgbMatch = value.trim().match(this.rgbRegex);
    if (rgbMatch)
      return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;
    const rgbaMatch = value.trim().match(this.rgbaRegex);
    if (rgbaMatch)
      return `${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}`;
    return "";
  }
  _buildCss(categories) {
    return `:root {
  /* --- text variables --- */
${categories.text.light.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}


  /* --- on variables --- */
${categories.on.light.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}


  /* --- theme variables --- */
${categories.theme.light.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}


  /* --- other variablers --- */
${categories.none.light.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}
}

:root.mdw-theme-dark {
  /* --- text variables --- */
${categories.text.dark.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}


  /* --- on variables --- */
${categories.on.dark.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}


  /* --- theme variables --- */
${categories.theme.dark.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}


  /* --- other variablers --- */
${categories.none.dark.map((v) => `  ${v.nameNormalized}: ${v.value};
  ${v.nameNormalized}--rgb: ${v.rgbArrayString};`).join("\n")}
}`;
  }
}();
