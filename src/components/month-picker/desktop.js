import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import './desktop.css';

customElements.define('mdw-month-picker-desktop', class MDWMonthPickerDesktop extends HTMLElementExtended {
  useShadowRoot = false;

  #monthPickerComponent;
  #displayDate = '';
  #monthNames = dateUtil.getMonthNamesShort();
  #monthClick_bound = this.#monthClick.bind(this);
  #yearViewClick_bound = this.#yearViewClick.bind(this);
  #yearClick_bound = this.#yearClick.bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#monthPickerComponent = document.querySelector(`#${this.getAttribute('mdw-month-picker-id')}`);
    this.#displayDate = dateUtil.parse(this.#monthPickerComponent.displayDate);
    this.render();
  }

  afterRender() {
    this.querySelector('.mdw-months-container').addEventListener('click', this.#monthClick_bound);
    this.querySelector('.mdw-year-label').addEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-month-label').addEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-years-container').addEventListener('click', this.#yearClick_bound);
  }

  disconnectedCallback() {
    this.querySelector('.mdw-months-container').removeEventListener('click', this.#monthClick_bound);
    this.querySelector('.mdw-year-label').removeEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-month-label').removeEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-years-container').removeEventListener('click', this.#yearClick_bound);
  }

  setDisplayDate(date) {
    this.#updateDisplayDate(dateUtil.parse(date));
  }

  #monthClick(event) {
    if (!event.target.classList.contains('mdw-month')) return;
    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { month: parseInt(event.target.getAttribute('value')) }));

    setTimeout(() => {
      this.#monthPickerComponent.hide();
    }, 100);
  }

  #yearViewClick() {
    if (this.classList.contains('mdw-year-view')) {
      this.classList.remove('mdw-year-view');
    } else {
      this.classList.add('mdw-year-view');
      const selectedYear = this.querySelector('.mdw-year[selected]');
      if (selectedYear) selectedYear.removeAttribute('selected');

      const currentYear = this.querySelector(`.mdw-year[value="${dateUtil.getYear(this.#displayDate)}"]`);
      if (currentYear) {
        currentYear.setAttribute('selected', '');
        currentYear.scrollIntoView({ block: 'center' });
      }
    }
  }

  #yearClick(event) {
    if (!event.target.classList.contains('mdw-year')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { year: parseInt(event.target.getAttribute('value')) }));

    this.classList.remove('mdw-year-view');
  }

  #updateDisplayDate(date) {
    this.#displayDate = date;
    this.#monthPickerComponent.setValue(dateUtil.format(date, 'YYYY-MM'));

    const currentSelectedMonth = this.querySelector('.mdw-month[selected]');
    if (currentSelectedMonth) currentSelectedMonth.removeAttribute('selected');

    const selectedMonth = this.querySelector(`.mdw-month[value="${date.getMonth() + 1}"]`);
    if (selectedMonth) selectedMonth.setAttribute('selected', '');

    const currentSelectedYear = this.querySelector('.mdw-year[selected]');
    if (currentSelectedYear) currentSelectedYear.removeAttribute('selected');

    const selectedYear = this.querySelector(`.mdw-year[value="${date.getFullYear()}"]`);
    if (selectedYear) selectedYear.setAttribute('selected', '');
  }


  template() {
    const displayMonth = this.#displayDate.getMonth();

    return /* html */`
      <div class="mdw-control-container">
        <div class="mdw-month-label">${dateUtil.format(this.#displayDate, 'MMMM')}</div>
        <div class="mdw-year-label">
          ${dateUtil.getYear(this.#displayDate)}
          <div class="mdw-arrow"></div>
        </div>
      </div>

      <div class="mdw-months-container">
        ${this.#monthNames.map((month, i) => {
          const selected = displayMonth === i;
          return /*html*/`<div class="mdw-month" ${selected ? 'selected': ''} value="${i + 1}">${month}</div>`;
        }).join('\n')}
      </div>

      <div class="mdw-years-container">
        ${dateUtil.defaultYearRange().map(year => {
          return `<div class="mdw-year" value="${year}">${year}</div>`;
        }).join('\n') }
      </div>
    `;
  }
});
