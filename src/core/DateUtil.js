export default class DateUtil {
  // Sets the local (en-us).
  // leaving this undeifend will use the browser default
  get local() {
    return this.locale_;
  }

  set local(value) {
    this.locale_ = value;
  }

  // Sets the timezone used.
  // leaving this undeifend will use the browser default
  get timezone() {
    return this.timezone_;
  }

  set timezone(value) {
    this.timezone_ = value;
  }

  getYear(date) {
    return date.getFullYear();
  }

  getMonth(date) {
    return date.getMonth();
  }

  getDate(date) {
    return date.getDate();
  }
  
  // style = 'long' | 'short' | 'narrow'
  getMonthNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: this.timezone });
    return range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
  }

  getDateNames() {
    const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: this.timezone });
    return range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
  }

  // style = 'long' | 'short' | 'narrow'
  getDayOfWeekNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: this.timezone });
    return range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
  }

  getYearName(date) {
    const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: this.timezone });
    return this._stripDirectionalityCharacters(this._format(dtf, date));
  }

  getFirstDayOfWeek() {
    return 0;
  }

  getNumDaysInMonth(date) {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }

  clone(date) {
    return new Date(date.getTime());
  }

  today() {
    return new Date();
  }

  createDate(year, month, date) {
    // Check for invalid month and date (except upper bound on date which we have to check after
    // creating the Date).
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    let result = this._createDateWithOverflow(year, month, date);
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() != month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  parse(value) {
    // We have no way using the native JS Date to set the parse format or locale, so we ignore these
    // parameters.
    if (typeof value == 'number') return new Date(value);
    return value ? new Date(Date.parse(value)) : null;
  }

  format(date, displayFormat) {
    if (!this.isValid(date)) {
      throw Error('NativeDateAdapter: Cannot format invalid date.');
    }

    // TODO how do i not need this?
    // // On IE and Edge the i18n API will throw a hard error that can crash the entire app
    // // if we attempt to format a date whose year is less than 1 or greater than 9999.
    // if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
    //   date = this.clone(date);
    //   date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
    // }

    displayFormat = {...displayFormat, timeZone: this.timeZone};

    const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
    return this._stripDirectionalityCharacters(this._format(dtf, date));
  }

  toIso8601(date) {
    return [
      date.getUTCFullYear(),
      this._2digit(date.getUTCMonth() + 1),
      this._2digit(date.getUTCDate())
    ].join('-');
  }

  isValid(date) {
    return !isNaN(date.getTime());
  }


  // Creates a date but allows the month and date to overflow
  _createDateWithOverflow(year, month, date) {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) result.setFullYear(this.getYear(result) - 1900);
    return result;
  }

  _stripDirectionalityCharacters(str) {
    return str.replace(/[\u200e\u200f]/g, '');
  }

  _format(dtf, date) {
    const d = new Date(Date.UTC(
        date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
        date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    return dtf.format(d);
  }
}
