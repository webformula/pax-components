import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../core/DateUtil.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this._currentView = 'month';
    this.selectedYear = MDWDateUtil.currentYear();
    this.selectedMonth = MDWDateUtil.currentMonth();
    this.selectedDay = MDWDateUtil.currentDay();
    this.updateDate();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.monthDays = MDWDateUtil.getMonthDayArray(this.selectedDate);

    this.panelId = `mdw-date-picker_${MDWUtils.uid()}`;
    this.buildPanel_();

    this.bound_yearClick = this.yearClick.bind(this)
    this.bound_yearChanged = this.yearChanged.bind(this);
    this.bound_monthChanged = this.monthChanged.bind(this);
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

  updateDate() {
    this.selectedDate = MDWDateUtil.buildFromParts({
      year: this.selectedYear,
      month: this.selectedMonth,
      day: this.selectedDay
    });

    if (this.panel && this.panel.querySelector) this.panel.querySelector('.mdw-date-picker--header-date').innerHTML = MDWDateUtil.format(this.selectedDate, 'ddd, MMM DD');
  }

  yearClick() {
    this.changeView('year');
  }

  changeView(value) {
    switch(value) {
      case 'year':
        this._currentView = 'year';
        this.attachYearView();
        break;
      case 'month':
        this._currentView = 'month';
        this.attachMonthView();
        break;
    }
  }

  open() {
    if (this.panel._isOpen) return;
    // TODO re-enalbe click outside to close
    //    this breaks view changing
    this.panel.open();

    switch(this._currentView) {
      case 'year':
        this.panel.querySelector('mdw-date-picker--view-year').isOpen = true;
        break;
      case 'month':
        this.panel.querySelector('mdw-date-picker--view-month').isOpen = true;
        break;
    }
  }

  close() {
    this.panel.close();
  }

  yearChanged({ detail }) {
    this.selectedYear = detail.year;
    this.updateDate();
    this.changeView('month');
  }

  monthChanged({ detail }) {
    this.selectedmonth = detail.month;
    this.selectedDay = detail.day;
    this.updateDate();
  }

  buildPanel_() {
    const panelHTML = `
    <mdw-panel id="${this.panelId}" mdw-flex-position="center center" class="mdw-date-picker-panel">
      <div class="mdw-date-picker--container" style="width: 320px">
        <div class="mdw-date-picker--header">
          <div class="mdw-date-picker--header-title">Select date</div>

          <div mdw-row mdw-flex-position="center space-between">
            <!-- Mon, Nov 17 -->
            <div class="mdw-date-picker--header-date">${MDWDateUtil.format(this.selectedDate, 'ddd, MMM DD')}</div>
            <mdw-icon>edit</mdw-icon>
          </div>
        </div>

        <div class="mdw-date-picker--body">
          <div mdw-row mdw-flex-position="center space-between">
            <div mdw-row mdw-flex-position="start space-around" class="mdw-date-picker--body-year-view-button">
              <div>November 17</div>
              <i class="mdw-select__icon"></i>
            </div>
          </div>

          <!-- year, month, day, schedule? -->
          <div mdw-column class="mdw-date-picker--body-views" style="min-height: 300px;">
            ${
              this._currentView === 'month'
              ? `<mdw-date-picker--view-month mdw-selected-date="${this.selectedDate}"></mdw-date-picker--view-month>`
              : `<mdw-date-picker--view-year></mdw-date-picker--view-year>`
            }
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
    this.viewContainer.innerHTML = '<mdw-date-picker--view-year></mdw-date-picker--view-year>';
    this.viewContainer.querySelector('mdw-date-picker--view-year').addEventListener('MDWDatePicker:yearChanged', this.bound_yearChanged);

    const monthEl = this.viewContainer.querySelector('mdw-date-picker--view-month');
    if (monthEl) monthEl.removeEventListener('MDWDatePicker:monthDayChanged', this.bound_monthChanged);
  }

  attachMonthView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-month mdw-selected-date="${this.selectedDate}"></mdw-date-picker--view-month>`;
    const monthEl = this.viewContainer.querySelector('mdw-date-picker--view-month');
    if (monthEl) monthEl.addEventListener('MDWDatePicker:monthDayChanged', this.bound_monthChanged);
    // this.viewContainer.querySelector(`#mdw-year-${this.selectedYear}`).classList.add('mdw-selected');

    const yearEl = this.viewContainer.querySelector('mdw-date-picker--view-year');
    if (yearEl) yearEl.removeEventListener('MDWDatePicker:yearChanged', this.bound_yearChanged);
  }
});
