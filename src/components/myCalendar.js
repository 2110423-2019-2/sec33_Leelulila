import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const dummyEvents = [
  {
    // get from Back-end
    allDay: false,
    end: new Date('March 11, 2020 20:00:00'),
    start: new Date('March 11, 2020 06:00:00'),
    title: 'hi',
  },

  {
    // get from Back-end
    end: new Date('March 12, 2020 20:00:00'),
    start: new Date('March 12, 2020 06:00:00'),
    title: 'test',
  }
]

const MyCalendar = () => {
  return (<div>
    <Calendar
      localizer={localizer}
      events={dummyEvents}
      // startAccessor="12/1/20"
      // endAccessor="5/12/20"
      style={{ height: 500 }}
    />
  </div>)

}

export default MyCalendar;