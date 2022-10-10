const MDWDate = new class MDWDate {
  #intlFormatter;
  #intlFormatterLong;
  #local = 'en-US';
  #timezone;
  #yearMonthDayRegex = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?!\S)/;
  #yearMonthRegex = /([12]\d{3})-(0[1-9]|1[0-2])(?!\S)/;
  #specialCharacterRegex = /[\u200e\u200f]/g;
  #formatPatternRegex = new RegExp(`[YMDdAaHhms]+`, 'g');

  constructor() {
    this.#intlFormatter = Intl.DateTimeFormat(this.#local, {
      weekday: 'long', // dddd
      year: 'numeric', // YYYY
      month: '2-digit', // MM
      day: '2-digit', // DD
      hour: '2-digit', // hh
      minute: '2-digit', // mm
      second: '2-digit', // ss
      timeZone: this.#timezone
    });

    this.#intlFormatterLong = Intl.DateTimeFormat(this.#local, {
      month: 'long',
      hour: '2-digit',
      hour12: false,
      timeZone: this.#timezone
    });
  }

  parse(value) {
    // this will return an invalid date abject
    if (['null', 'undefined', 'Invalid Date'].includes(value)) return new Date('');

    if (typeof value === 'number') return new Date(value);

    // format used for inputs yyyy-mm-dd
    if (typeof value === 'string') {
      const inputDateMatch = value.match(this.#yearMonthDayRegex);
      if (inputDateMatch) {
        const [_, year, month, day] = inputDateMatch;
        return this.buildFromParts({
          year,
          month,
          day
        });
      }

      const inputYearMonthMatch = value.match(this.#yearMonthRegex);
      if (inputYearMonthMatch) {
        const [_, year, month] = inputYearMonthMatch;
        return this.buildFromParts({
          year,
          month,
          day: '01'
        });
      }
    }

    return new Date(Date.parse(value));
  }


  // format dates
  //   date: js date object
  //   formatPattern:
  //      ddd, MMM DD = Thu, Dec 12
  //      YYYY-MMMM-dddd = 2019-month-wednesday
  //      YY/MMM/ddd = 19/10/22
  format(date, pattern) {
    if (!this.isValid(date)) return;

    const tokens = this.#intlFormatter.formatToParts(date).filter(token => token.type !== 'literal');
    const tokensLong = this.#intlFormatterLong.formatToParts(date)
      .filter(token => token.type !== 'literal')
      .map(token => ({
        type: `l${token.type}`,
        value: token.value
      }));
    const parts = [...tokens, ...tokensLong].reduce((parts, token) => {
      parts[token.type] = token.value;
      return parts;
    }, {});
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

    return pattern.replace(this.#formatPatternRegex, mask => {
      return (formatters[mask] || this.#defaultFormatter)(parts, date)
    });
  }

  #defaultFormatter(v) {
    return v;
  }

  buildFromParts({ year, month, day }) {
    return new Date(year, month - 1, day);
  }

  isValid(date) {
    return !isNaN(date.getTime());
  }

  today() {
    return new Date();
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

  getFirstDateOfMonth(date) {
    return new Date(this.getYear(date), this.getMonth(date) - 1, 1);
  }

  getParts(date) {
    return {
      year: this.getYear(date),
      month: this.getMonth(date),
      day: this.getMonthDay(date)
    };
  }

  addToDateByParts(date, { year, month, day}) {
    const parts = this.getParts(date);
    if (year) parts.year += year;
    if (month) parts.month += month;
    if (day) parts.day += day;
    return this.buildFromParts(parts);
  }

  setDateByParts(date, { year, month, day }) {
    const parts = this.getParts(date);
    if (year) parts.year = year;
    if (month) parts.month = month;
    if (day) parts.day = day;
    return this.buildFromParts(parts);
  }

  // style = 'long' | 'short' | 'narrow'
  getDayNames(style) {
    const format = new Intl.DateTimeFormat(this.#local, { weekday: style }).format;
    return [...Array(7).keys()]
      .map(day => format(new Date(Date.UTC(2021, 5, day))));
  }

  // used for generating a array of years for a calendar
  defaultYearRange(startYear = this.getYear(new Date()) - 50, range = 100) {
    return [...new Array(range)].map((_, i) => startYear + i);
  }

  getMonthDays(date, { fillNextMonth = false, minDate, maxDate }) {
    if (minDate && !this.isValid(minDate)) minDate = undefined;
    if (maxDate && !this.isValid(maxDate)) maxDate = undefined;

    const firstDay = this.getWeekDay(this.getFirstDateOfMonth(date));
    const year = this.getYear(date);
    const month = this.getMonth(date);
    const todayParts = this.getParts(this.today());

    // start on sunday
    let currentDate = this.setDateByParts(date, { day: 1 });
    currentDate = this.addToDateByParts(currentDate, { day: -firstDay });


    const monthDays = [...Array(6 * 7)].map((_, i) => {
      const date = currentDate;
      const parts = this.getParts(date);

      // -1, 0, 1
      let monthOffset = 0;
      if (parts.year < year) monthOffset = -1;
      if (parts.year > year) monthOffset = 1;
      if (parts.year === year && parts.month < month) monthOffset = -1;
      if (parts.year === year && parts.month > month) monthOffset = 1;

      const display = (fillNextMonth && monthOffset > 0) || monthOffset === 0 ? parts.day : '';
      const currentMonth = parts.month === month;
      const beforeMinDate = minDate ? date < minDate : false;
      const afterMaxDate = maxDate ? date > maxDate : false;
      const interactive = !beforeMinDate && !afterMaxDate && display !== '';
      const isToday = todayParts.year === parts.year && todayParts.month === parts.month && todayParts.day === parts.day;

      currentDate = this.addToDateByParts(date, { day: 1 });

      return {
        date,
        display,
        interactive,
        currentMonth,
        beforeMinDate,
        afterMaxDate,
        isToday
      };
    });

    // split into week rows
    const weeks = [];
    while (monthDays.length) {
      weeks.push(monthDays.splice(0, 7));
    }
    return weeks;
  }
};

window.MDWDate = MDWDate;
export default MDWDate;
