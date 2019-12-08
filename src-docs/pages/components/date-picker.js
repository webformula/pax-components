import { Page, html } from '@webformula/pax-core';

export default class DatePicker extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Date picker';
  }

  openDatePicker() {
    const picker = document.querySelector('#picker');
    console.log(picker);
    picker.open();
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Date picker</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-button onclick="activePage.openDatePicker()">open</mdw-button>

          <mdw-date-picker id="picker">
          </mdw-date-picker>
        </div>

        <a href="https://material.io/components/pickers/" target="_new">Material Design Guidlines: pickers</a>
        <p>Date pickers let users select a date, or a range of dates</p>

        <section>
        </section>
      </article>
    `;
  }
}
