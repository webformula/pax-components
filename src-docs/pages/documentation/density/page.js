import { Page } from '@webformula/pax-core';

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
    return 'pages/documentation/density/page.html';
  }
}
