import moment from 'moment';
import { RRule } from 'rrule';

const DATE_FORMAT = 'MM/DD/YYYY';

export default function createClassSchedule(c) {
  const schedule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: c.Meets.split(' ')[0]
      .match(/.{1,2}/g)
      .map((s) => RRule[s.toUpperCase()]),
    dtstart: moment(c.Dates.split(' - ')[0], DATE_FORMAT).toDate(),
    until: moment(c.Dates.split(' - ')[1], DATE_FORMAT).toDate(),
  });
  c.schedule = schedule;
  return schedule;
}
