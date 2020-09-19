import { Page } from '/web_modules/@webformula/pax-core';

export default class DatePicker extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Date picker';
  }

  template() {
    return 'pages/components/date-picker/page.html';
  }
}
