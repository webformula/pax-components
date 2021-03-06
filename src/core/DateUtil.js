// NOTE Months start at 1 not 0

class MDWDateUtil {
  constructor() {
    this.yearMonthDayRegex = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?!\S)/;
  }

  createInstance() {
    return new MDWDateUtil();
  }

  // Sets the local (en-us).
  // leaving this undefined will use the browser default
  // get local() {
  //   return this._locale;
  // }

  // set local(value) {
  //   this._locale = value;
  // }

  // // Sets the timezone used.
  // // leaving this undefined will use the browser default
  // get timezone() {
  //   return this._timezone;
  // }

  // set timezone(value) {
  //   this._timezone = value;
  // }

  parse(value) {
    // this will return an invalid date abject
    if (['null', 'undefined', 'Invalid Date'].includes(value)) return new Date('');

    if (typeof value === 'number') return new Date(value);

    // format used for inputs yyyy-mm-dd
    if (typeof value === 'string') {
      const inputDateMatch = value.match(this.yearMonthDayRegex);
      if (inputDateMatch) {
        const [_, year, month, day] = inputDateMatch;
        return this.buildFromParts({
          year,
          month,
          day
        });
      }
    }

    return new Date(Date.parse(value));
  }

  // Month starts at 1
  buildFromParts({ year, month, day }) {
    return new Date(year, month - 1, day);
  }

  adjustDate(date, { add = undefined, set = undefined }) {
    let { year, month, day } = this.getParts(date);

    if (set) {
      if (set.year) year = set.year;
      if (set.month) month = set.month;
      if (set.day) day = set.day;
    }

    if (add) {
      if (add.year) year += add.year;
      if (add.month) month += add.month;
      if (add.day) day += add.day;
    }

    return this.buildFromParts({ year, month, day });
  }

  clone(date) {
    return new Date(date.getTime());
  }

  isValid(date) {
    return !isNaN(date.getTime());
  }

  today() {
    return new Date();
  }

  getParts(date) {
    return {
      year: this.getYear(date),
      month: this.getMonth(date),
      day: this.getMonthDay(date)
    };
  }

  getYear(date) {
    return date.getFullYear();
  }

  getMonth(date) {
    return date.getMonth() + 1;
  }

  getWeekDay(date) {
    return date.getDay();
  }

  getMonthDay(date) {
    return date.getDate();
  }

  // style = 'long' | 'short' | 'narrow'
  getMonthNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
    return this.range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
  }

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
    return new Date(this.getYear(date), this.getMonth(date) - 1, 1);
  }

  getLastDateOfMonth(date) {
    return new Date(this.getYear(date), this.getMonth(date) - 1, 0);
  }

  getNumDaysInMonth(date) {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }

  isSameYear(date1, date2) {
    if (!date1 || !date2) return false;
    return this.getYear(date1) === this.getYear(date2);
  }

  isSameMonth(date1, date2) {
    if (!date1 || !date2) return false;
    return this.getMonth(date1) === this.getMonth(date2);
  }

  // used for generating a calendar month view
  getMonthDayArray(date, { fillInMonth = false, minDate = undefined, maxDate = undefined }) {
    const firstDay = this.getWeekDay(this.getFirstDateOfMonth(date));
    // const lastday = this.getWeekDay(this.getLastDateOfMonth(date));
    const targetYear = this.getYear(date);
    const targetMonth = this.getMonth(date);
    const todayParts = this.getParts(this.today());

    // start on sunday
    let currentDate = this.adjustDate(date, {
      set: { day: 1 },
      add: { day: -firstDay }
    });

    if (minDate && !this.isValid(minDate)) minDate = undefined;
    if (maxDate && !this.isValid(maxDate)) maxDate = undefined;

    // 6 rows of 7 days
    const monthDays = [...Array(6 * 7)].map((_, i) => {
      const date = currentDate;
      const year = this.getYear(date);
      const month = this.getMonth(date);
      const day = this.getMonthDay(date);
      // -1, 0, 1
      const targetMonthOffset = year < targetYear ? -1 : year > targetYear ? 1 : month < targetMonth ? -1 : month === targetMonth ? 0 : 1;
      const display = (fillInMonth && targetMonthOffset > 0) || targetMonthOffset === 0 ? day : '';

      const currentMonth = month === targetMonth;
      const beforeMinDate = minDate ? currentDate < minDate : false;
      const afterMaxDate = maxDate ? currentDate > maxDate : false;
      const interactable = !beforeMinDate && !afterMaxDate && display !== '';
      const isToday = todayParts.year === year && todayParts.month === month && todayParts.day === day
      currentDate = this.adjustDate(currentDate, { add: { day: 1 } });

      return {
        display,
        date,
        interactable,
        currentMonth,
        beforeMinDate,
        afterMaxDate,
        isToday
      };
    });

    // split into week rows
    const res = [];
    while (monthDays.length) {
      res.push(monthDays.splice(0, 7));
    }

    return res;
  }

  // used for generating a array of years for a calendar
  defaultYearRange(startYear = this.getYear(new Date()) - 50, range = 100) {
    return [...new Array(range)].map((_, i) => startYear + i);
  }

  // used for generating a months for a calendar display
  getMonthsSurroundingYear(date = this.today(), yearRange = 2) {
    const firstYear = this.parse(date).getFullYear() - yearRange;
    const years = yearRange * 2;
    // add 12 dates for each month for each year
    return [...new Array(years)].flatMap((_, i) => [...new Array(12)].map((_, j) => new Date(firstYear + i, j, 1)));
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
    if (!this.isValid(date)) return;

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
};

const defaultInstance = new MDWDateUtil();
window.MDWDateUtil = defaultInstance;
export default defaultInstance;
