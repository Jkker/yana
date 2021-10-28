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
const COLOR_LIST = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]

const mapIDtoColor = (id) => COLOR_LIST[id % COLOR_LIST.length]

export const parseDate = (date) => {
  const [m, d, y] = date.split('/')
  return `${y}-${m}-${d}`
}
export const parseTime = (time) =>
  moment(time, INPUT_TIME_FORMAT).format(OUTPUT_TIME_FORMAT)

export const parseWeekDays = (weekDays) =>
  weekDays.match(/.{1,2}/g).map((s) => WEEK_DAYS[s])

export function createEvents(data, colors) {
  // eslint-disable-next-line no-unused-vars
  const { title, Dates, Meets } = data
  const [daysOfWeek, startTime, _, endTime] = Meets.split(' ')
  const [startRecur, endRecur] = Dates.split(' - ').map(parseDate)
  const ID = data.classNumber
  const color = mapIDtoColor(ID)
  const event = {
    title,
    id: ID,
    startRecur,
    endRecur,
    daysOfWeek: parseWeekDays(daysOfWeek),
    startTime: parseTime(startTime),
    endTime: parseTime(endTime),
    color: colors[color][400],
    textColor: colors[color][50],
    extendedProps: { color, ...data },
  }
  return event
}
