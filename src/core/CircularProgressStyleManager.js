new class CircularProgressStyleManager {
  constructor() {
    this.styleTag = HTMLStyleElement = null;
    this.diameters = new Set([100]);
  }

  exists(diameter) {
    return !!this.diameters[diameter];
  }

  create(diameter, str) {
    if (this.exists(diameter)) return;

    let styleTag = this.styleTag;

    if (!styleTag) {
      styleTag = this._document.createElement('style');
      document.head.appendChild(styleTag);
      this.styleTag = styleTag;
    }

    if (styleTag && styleTag.sheet) {
      styleTag.sheet.insertRule(str, 0);
    }

    this.diameters.add(this.diameter);
  }
}
