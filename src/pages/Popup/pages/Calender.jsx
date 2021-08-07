import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { useState, useEffect } from 'react'
import { INPUT_TIME_ZONE } from '../../../utils/scheduleUtils'
import { Box, useClipboard, useToast } from '@chakra-ui/react'

const renderEvent = ({ event, timeText }) => {
  return (
    <Box
      cursor="pointer"
      height="100%"
      overflow="hidden"
      p={'2px'}
      _hover={{ background: 'rgba(0,0,0,0.05)' }}
      _active={{ background: 'rgba(0,0,0,0.1)' }}
      transition="all 0.2s"
    >
      {event.title} {timeText}
    </Box>
  )
}

export default function Calendar({ list }) {
  const [curr, setCurr] = useState(list[0])
  const { onCopy } = useClipboard(curr?.id)
  const toast = useToast()
  const eventClick = ({ event }) => {
    setCurr(event)
  }
  useEffect(() => {
    if (curr) {
      onCopy()
      toast({
        title: `Copied ${curr.id} to clipboard`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }, [curr])
  return (
    <FullCalendar
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
      initialDate="2021-09-06"
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
