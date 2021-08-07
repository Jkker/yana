import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import timeGridPlugin from '@fullcalendar/timegrid'
import React from 'react'
import { createEvents, INPUT_TIME_ZONE } from '../../../utils/scheduleUtils'

export default function Calendar({ list }) {
  const events = React.useMemo(() => list.map((c) => createEvents(c), [list]))
  console.log('🚀 ~ file: Calender.jsx ~ line 12 ~ Calendar ~ events', events)

  return (
    <FullCalendar
      plugins={[
        momentTimezonePlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ]}
      events={events}
      timeZone={INPUT_TIME_ZONE}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek',
      }}
      initialView="timeGridWeek"
      weekends={false}
      weekNumbers={true}
      // weekNumberCalculation={(date) => moment(date).diff(,'week')}
      views={{
        dayGrid: {
          // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
        },
        timeGrid: {
          // options apply to timeGridWeek and timeGridDay views
          nowIndicator: true,
        },
        week: {
          // options apply to dayGridWeek and timeGridWeek views
        },
        day: {
          // options apply to dayGridDay and timeGridDay views
        },
      }}
    />
  )
}
