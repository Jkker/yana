import React from 'react';
import moment from 'moment'
import BigCalendar,{ Calendar, Views } from 'react-big-calendar';
import events from '../events';
import * as dates from '../../src/utils/dates';

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });



export default function Calender(props) {
  return (
    <Calendar
      events={events}
      views={allViews}
      step={60}
      showMultiDayTimes
      max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
      defaultDate={new Date(2015, 3, 1)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
    />
  );
}


