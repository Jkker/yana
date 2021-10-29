import { Box } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useClassList } from '@models'
import { INPUT_TIME_ZONE } from '@utils/scheduleUtils'
import React from 'react'

const renderEvent = ({ event, timeText }) => {
  return (
    <Box
      cursor="pointer"
      height="100%"
      overflow="hidden"
      // bgColor={event.backgroundColor}
      p={'2px'}
      _hover={{ background: 'rgba(0,0,0,0.05)' }}
      _active={{ background: 'rgba(0,0,0,0.1)' }}
      transition="all 0.2s"
    >
      <b>{event.title}</b>
      <br />
      {event.extendedProps.instructor} {timeText}
    </Box>
  )
}

export default function Calendar({ calendarRef, showClassDetails }) {
  // const { onCopy } = useClipboard(curr?.id)
  const [list, dispatch, ACTIONS] = useClassList()

  const eventClick = ({ event }) => {
    // setCurr(event)
    const {
      title,
      id,
      start,
      end,
      extendedProps,
      backgroundColor,
      borderColor,
      textColor,
    } = event

    showClassDetails({
      title,
      id,
      start,
      end,
      extendedProps,
      backgroundColor,
      borderColor,
      textColor,
    })
  }
  // useEffect(() => {
  //   if (curr) {
  //     onCopy()
  //     toast({
  //       title: `Copied ${curr.id} to clipboard`,
  //       status: 'success',
  //       duration: 2000,
  //       isClosable: true,
  //     })
  //   }
  // }, [curr])

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[
        momentTimezonePlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ]}
      events={list}
      timeZone={INPUT_TIME_ZONE}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek',
      }}
      initialView="timeGridWeek"
      weekends={false}
      weekNumbers={true}
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      eventDisplay="block"
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
      eventContent={renderEvent}
      eventClick={eventClick}
    />
  )
}
