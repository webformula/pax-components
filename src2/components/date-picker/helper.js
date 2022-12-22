import dateUtil from '../../core/dateUtil.js';


export function checkMinMax(minDate, maxDate, displayDate) {
  const previousYearOutOfRange = !minDate ? false : minDate.getFullYear() >= displayDate.getFullYear();
  const nextYearOutOfRange = !maxDate ? false : maxDate.getFullYear() <= displayDate.getFullYear();
  // last day of previous month
  const previousMonthDate = dateUtil.setDateByParts(displayDate, { day: -1 });
  const previousMonthOutOfRange = !minDate ? false : minDate.getTime() > previousMonthDate.getTime();

  // first day of next month
  const nextMonthDate = !maxDate ? '' : dateUtil.setDateByParts(dateUtil.addToDateByParts(displayDate, { month: 1 }), { day: 1 });
  const nextMonthOutOfRange = !maxDate ? false : maxDate.getTime() < nextMonthDate.getTime();

  return {
    previousYearOutOfRange,
    nextYearOutOfRange,
    previousMonthOutOfRange,
    nextMonthOutOfRange
  };
}


export function monthDaysTemplate(date, value, minDate, maxDate, fillPreviousMonth, fillNextMonth) {
  return dateUtil.getMonthDays(date, {
    fillPreviousMonth,
    fillNextMonth,
    minDate,
    maxDate
  }).map(week => week.map(({ display, date, currentMonth, interactive, beforeMinDate, afterMaxDate, isToday }) => {
    let classes = 'mdw-day';
    // let { year, month, day } = dateUtil.getParts(date);
    if (beforeMinDate) classes += ' mdw-before-min-date';
    if (afterMaxDate) classes += ' mdw-after-max-date';
    if (interactive) classes += ' mdw-interactive';
    if (beforeMinDate || afterMaxDate) classes += ' mdw-out-of-range';
    if (isToday && display !== '') classes += ' mdw-today';
    if (!currentMonth) classes += ' mdw-not-current-month';
    const formattedDate = dateUtil.format(date, 'YYYY-MM-dd');
    return /* html */`<div class="${classes}" mdw-date="${formattedDate}" ${value === formattedDate ? 'selected' : ''}>${display}</div>`;
  }).join('\n')).join('\n');
}
