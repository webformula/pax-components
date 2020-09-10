import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class DatePicker extends Page {
  constructor() {
    super();

    this.selectedDate = new Date(1599425150700);
  }

  get title() {
    return 'Date picker';
  }

  template() {
    return './page.html';
  }
}
