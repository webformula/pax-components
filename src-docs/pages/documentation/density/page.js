import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class Density extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Density';
  }

  get densityWrapperElement() {
    return document.querySelector('#density-wrapper');
  }

  updateDensity(value) {
    this.densityWrapperElement.classList.remove('mdw-density-comfortable');
    this.densityWrapperElement.classList.remove('mdw-density-compact');

    if (value && value !== 'default') this.densityWrapperElement.classList.add(value);
  }

  template() {
    return './page.html';
  }
}
