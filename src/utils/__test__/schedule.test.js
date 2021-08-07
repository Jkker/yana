import {
  createEvents, parseDate,
  parseTime,
  parseWeekDays
} from '../scheduleUtils'
describe('parse', () => {
  beforeAll(() => {
    /* Runs before all tests */
  })
  afterAll(() => {
    /* Runs after all tests */
  })
  beforeEach(() => {
    /* Runs before each test */
  })
  afterEach(() => {
    /* Runs after each test */
  })

  test('parseWeekDays', () => {
    const actual = parseWeekDays('TuTh')
    expect(actual).toEqual([2, 4])
  })
  test('parseDate', () => {
    const actual = parseDate('09/02/2021')
    expect(actual).toEqual('2021-09-02')
  })
  test('parseTime', () => {
    const actual = parseTime('5:10PM')
    expect(actual).toEqual('17:10:00')
  })
  test('createEvents', () => {
    const actual = createEvents({
      Campus: 'Washington Square',
      Career: 'Undergraduate',
      'Class Number': '7808',
      Components: 'Lecture Required, Recitation Required',
      Dates: '09/02/2021 - 12/14/2021',
      Description:
        'The use and design of data structures, which organize information in computer memory. Stacks, queues, linked lists, binary trees: how to implement them in a high level language, how to analyze their effect on algorithm efficiency, and how to modify them. Programming assignments.',
      'Enrollment Requirements': 'Prerequiste for CSCI-UA 102',
      Grading: 'CAS Graded',
      'Instruction Mode': 'Online',
      'Instructor(s)': 'Evan M Korth',
      Location: 'Washington Square',
      Meets: 'MoWe 12:30PM - 1:45PM',
      Notes:
        'For the Fall 2021 Semester: Lectures for this class will be held remotely. An in-person and an online recitation will be offered. STUDENTS MUST ALSO REGISTER FOR SECTION 002 or 021 Prerequisite: CSCI-UA.101 Intro to Computer Science Registration is open to CAS, Gallatin, Liberal Studies, Abu Dhabi and Shanghai students on Monday, May 24, 2021. University wide registration will be available Monday, May 31, 2021.',
      Session: 'Regular Academic Session',
      Status: 'Open',
      Units: '4 units',
      catalogNumber: 'CSCI-UA 102 - 001',
      title: 'Data Structures',
    })
    expect(actual).toEqual({
      start: '2021-09-02T17:10:00',
      end: '2021-09-02T19:10:00',
      allDay: false,
    })
  })
})
