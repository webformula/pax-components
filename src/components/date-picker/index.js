import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../core/DateUtil.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.monthDays = MDWDateUtil.getMonthDayArray(MDWDateUtil.today());
    console.log(this.monthDays);

    this.years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

    this.panelId = `mdw-date-picker_${MDWUtils.uid()}`;
    this.buildPanel_();

    this.bound_yearClick = this.yearClick.bind(this)
  }

  connectedCallback() {
    this.panel.querySelector('.mdw-date-picker--body-year-view-button').addEventListener('click', this.bound_yearClick);
    this.changeView('month');
  }

  disconnectedCallback() {
    this.panel.remove();
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get viewContainer() {
    return this.panel.querySelector('.mdw-date-picker--body-views');
  }

  get selectedYear() {
    return this._selectedYear || 2019;
  }

  set selectedYear(value) {
    this._selectedYear = value;
  }

  yearClick() {
    this.changeView('year');
  }

  changeView(value) {
    switch(value) {
      case 'year':
        this.attachYearView();
        break;
      case 'month':
        this.attachMonthView();
        break;
    }
  }

  open() {
    console.log(this.panel._isOpen)
    if (this.panel._isOpen) return;
    this.panel.open(true);
  }

  close() {
    this.panel.close();
  }

  buildPanel_() {
    const panelHTML = `
    <mdw-panel id="${this.panelId}" mdw-flex-position="center center" class="mdw-date-picker-panel">
      <div class="mdw-date-picker--container" style="width: 320px">
        <div class="mdw-date-picker--header">
          <div class="mdw-date-picker--header-title">Select date</div>

          <div mdw-row mdw-flex-position="center space-between">
            <div class="mdw-date-picker--header-date">Mon, Nov 17</div>
            <mdw-icon>edit</mdw-icon>
          </div>
        </div>

        <div class="mdw-date-picker--body">
          <div mdw-row mdw-flex-position="center space-between">
            <div mdw-row mdw-flex-position="start space-around" class="mdw-date-picker--body-year-view-button">
              <div>November 17</div>
              <i class="mdw-select__icon"></i>
            </div>

            <div mdw-row style="padding-right: 12px;">
              <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons">
                <mdw-icon>keyboard_arrow_left</mdw-icon>
              </mdw-button>

              <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons">
                <mdw-icon>keyboard_arrow_right</mdw-icon>
              </mdw-button>
            </div>
          </div>

          <!-- year, month, day, schedule? -->
          <div mdw-column class="mdw-date-picker--body-views" style="min-height: 300px;">
          </div>
        </div>
      </div>
    </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    const panelEl = this.panel;
    if (panelEl.hoistToBody) panelEl.hoistToBody(this);
    panelEl.style.transform = 'scale(1)';
  }

  attachYearView() {
    const html = `
    <div mdw-row mdw-wrap style="justify-content: space-between;">
      ${this.years.map(y => `<mdw-button id="mdw-year-${y}" class="mdw-date-picker--body-year-button mdw-shaped">${y}</mdw-button>`).join('\n')}
    </div>
    `;

    this.viewContainer.innerHTML = html;
    this.viewContainer.querySelector(`#mdw-year-${this.selectedYear}`).classList.add('mdw-selected');
  }

  attachMonthView() {
    const today = (new Date).getDate();
    const html = `
    <div mdw-row mdw-wrap style="justify-content: space-between;" class="mdw-date-picker--view-month">
      <div class="mdw-date-picker--view-month-day-header">
        ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <div class="mdw-date-picker--view-month-container">
        ${this.monthDays.map(week => `
          <div class="mdw-date-picker--view-month-week-container">
            ${week.map(d => `<div class="mdw-date-picker--day ${d === 7 ? 'mdw-selected' : ''} ${d === today ? 'mdw-today' : ''}">${d}</div>`).join('\n')}
          </div>
        `).join('\n')}
      </div>
    </div>
    `;

    this.viewContainer.innerHTML = html;
    // this.viewContainer.querySelector(`#mdw-year-${this.selectedYear}`).classList.add('mdw-selected');
  }
});
