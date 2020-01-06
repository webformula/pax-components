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
    picker.open();
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Date picker</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-button onclick="activePage.openDatePicker()">
            open
            <mdw-date-picker id="picker"></mdw-date-picker>
          </mdw-button>
        </div>

        <a href="https://material.io/components/pickers/" target="_new">Material Design Guidlines: pickers</a>
        <p>Date pickers let users select a date, or a range of dates</p>

        <section>
          <h4>Example</h4>

          <!-- contained -->
          <mdw-card id="contained">
            <div class="mdw-card__content">
              <h6>Date input</h6>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-textfield>
                <mdw-icon>events</mdw-icon>
                <input type="date">
                <label>Date</label>
                <mdw-date-picker mdw-min-date="2019-12-10"></mdw-date-picker>
              </mdw-textfield>
            </div>
          </mdw-card>


          <mdw-card id="contained">
            <div class="mdw-card__content">
              <h6>Date input</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield>
                  <mdw-icon>events</mdw-icon>
                  <input type="date">
                  <label>Begin icon</label>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-textfield>
                <mdw-icon>events</mdw-icon>
                <input type="date">
                <label>Date</label>
                <mdw-date-picker></mdw-date-picker>
              </mdw-textfield>
            </div>
          </mdw-card>
        </section>

        <section style="height: 500px;">
          <mdw-textfield>
            <mdw-icon>events</mdw-icon>
            <input type="date">
            <label>Date</label>
          </mdw-textfield>
        </section>

      </article>
    `;
  }
}
