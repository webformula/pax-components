export default new class DateUtil {
  // Sets the local (en-us).
  // leaving this undeifend will use the browser default
  get local() {
    return this._locale;
  }

  set local(value) {
    this._locale = value;
  }

  // Sets the timezone used.
  // leaving this undeifend will use the browser default
  get timezone() {
    return this._timezone;
  }

  set timezone(value) {
    this._timezone = value;
  }

  parse(dateString) {
    return Date.parse(dateString);
  }

  buildFromParts({ year = this.currentYear(), month = this.currentMonth(), day = this.currentDay()}) {
    return new Date(year, month, day);
  }

  currentYear() {
    return this.today().getFullYear();
  }

  currentMonth() {
    return this.today().getMonth();
  }

  currentDay() {
    return this.today().getDate();
  }

  defaultYearRange(startYear = 1940, range = 100) {
    return [...new Array(range)].map((_, i) => startYear + i);
  }

  getMonthsSurroundingYear(date = this.today(), yearRange = 2) {
    const firstYear = this.parse(date).getFullYear() - yearRange;
    const years = yearRange * 2;
    // add 12 dates for each month for each year
    return [...new Array(years)].flatMap((_, i) => [...new Array(12)].map((_, j) => new Date(firstYear + i, j, 1)));
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

  getAdjacentMonth(date, addedMonths = 0) {
    return new Date(date.getFullYear(), date.getMonth() + addedMonths, 1);
  }

  // style = 'long' | 'short' | 'narrow'
  getMonthNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
    return this.range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
  }

  // getDateNames() {
  //   const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
  //   return this.range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
  // }

  // style = 'long' | 'short' | 'narrow'
  getDayOfWeekNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
    return this.range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
  }

  getYearName(date) {
    const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
    return this._stripDirectionalityCharacters(this._format(dtf, date));
  }

  getFirstDateOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getLastDateOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  // getFirstDayOfWeek() {
  //   return 0;
  // }

  // 0 - 6
  getDayOfTheWeekNumber(date) {
    return (date.getDay() + 7) % 7;
  }

  getNumDaysInMonth(date) {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }

  getMonthDayArray(date) {
    const firstDay = this.getDayOfTheWeekNumber(this.getFirstDateOfMonth(date));
    const lastday = this.getDayOfTheWeekNumber(this.getLastDateOfMonth(date));
    const numDaysInMonth = this.getNumDaysInMonth(date);
    // calculate length of month filling in the first and last week with empty days for display purposes
    const length = firstDay + numDaysInMonth + (7 - lastday - 1);
    const monthDays = [...Array(length)].map((_, i) => {
      if (i < firstDay || i >= numDaysInMonth) return '';
      return i - firstDay + 1;
    });
    const res = [];
    while (monthDays.length) {
      res.push(monthDays.splice(0, 7));
    }
    return res;
  }

  isSameYear(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear();
  }

  isSameMonth(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getMonth() === date2.getMonth();
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



  // --- format date ---

  identity(x) {
    return x;
  }

  tokenize(intlFormatter, date) {
    return intlFormatter.formatToParts(date).filter(token => token.type !== 'literal');
  }

  normalize(parts) {
    // Chrome <= 71 incorrectly case `dayperiod` (#4)
    parts.dayPeriod = parts.dayPeriod || parts.dayperiod;
    return parts;
  }


  // format dates
  //   date: js date object
  //   formatPattern:
  //      ddd, MMM DD = Thu, Dec 12
  //      YYYY - MMMM - dddd = 2019 - Dmonth - wednesday
  //      YY - MMM - ddd = 19 - 10 - 21
  format(date, formatPattern) {
    const intlFormattersOptions = [
      {
        weekday: 'long', // dddd
        year: 'numeric', // YYYY
        month: '2-digit', // MM
        day: '2-digit', // DD
        hour: '2-digit', // hh
        minute: '2-digit', // mm
        second: '2-digit' // ss
      },
      {
        month: 'long',
        hour: '2-digit',
        hour12: false
      }
    ];
    const [intlFormatter, intlFormatterLong] = intlFormattersOptions.map(
      intlFormatterOptions =>
        new Intl.DateTimeFormat(this.locale, {
          ...intlFormatterOptions,
          timeZone: this.timezone
        })
    );
    const tokens = this.tokenize(intlFormatter, date);
    const longTokens = this.tokenize(intlFormatterLong, date).map(token => {
      return token.type !== 'literal' ? { type: `l${token.type}`, value: token.value } : token;
    });
    const allTokens = [...tokens, ...longTokens];
    const parts = allTokens.reduce((parts, token) => {
      parts[token.type] = token.value;
      return parts;
    }, {});
    const patternRegexp = new RegExp(`[YMDdAaHhms]+`, 'g');
    const formatters = {
      YYYY: parts => parts.year, // 2019
      YY: parts => parts.year.slice(-2), // 19
      MMMM: parts => parts.lmonth, // December
      MMM: parts => parts.lmonth.slice(0, 3), // Dec
      MM: parts => parts.month, // 12
      DD: parts => parts.day, // 21
      dd: parts => parts.day, // 21
      dddd: parts => parts.weekday, // Saturday
      ddd: parts => parts.weekday.slice(0, 3), // Sat
      A: parts => parts.dayPeriod, // AM / PM
      a: parts => parts.dayPeriod.toLowerCase(), // am / pm
      HH: parts => parts.lhour, // 00
      hh: parts => parts.hour, // 12
      mm: parts => parts.minute, // 23
      ss: parts => parts.second // 54
    };
    const allFormatters = { ...formatters };
    return formatPattern.replace(patternRegexp, mask => (allFormatters[mask] || this.identity)(parts, date));
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

  range(length, valueFunction) {
    const valuesArray = Array(length);
    let i = 0;
    for (i; i < length; i += 1) {
      valuesArray[i] = valueFunction(i);
    }

    return valuesArray;
  }
}
