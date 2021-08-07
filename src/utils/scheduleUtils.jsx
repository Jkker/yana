import moment from 'moment-timezone'

export const INPUT_TIME_ZONE = 'America/New_York'
export const INPUT_TIME_FORMAT = 'h:mmA'
export const OUTPUT_TIME_FORMAT = 'HH:mm:[00]'
export const WEEK_DAYS = {
  Su: 0,
  Mo: 1,
  Tu: 2,
  We: 3,
  Th: 4,
  Fr: 5,
  Sa: 6,
}

export const parseDate = (date) => {
  const [m, d, y] = date.split('/')
  return `${y}-${m}-${d}`
}
export const parseTime = (time) =>
  moment(time, INPUT_TIME_FORMAT).format(OUTPUT_TIME_FORMAT)

export const parseWeekDays = (weekDays) =>
  weekDays.match(/.{1,2}/g).map((s) => WEEK_DAYS[s])

export function createEvents({ title, Dates, Meets, ...restInfo }) {
  // eslint-disable-next-line no-unused-vars
  const [daysOfWeek, startTime, _, endTime] = Meets.split(' ')
  const [startRecur, endRecur] = Dates.split(' - ').map(parseDate)
  const event = {
    title,
    id: restInfo['Class Number'],
    startRecur,
    endRecur,
    daysOfWeek: parseWeekDays(daysOfWeek),
    startTime: parseTime(startTime),
    endTime: parseTime(endTime),
  }
  return event
}
