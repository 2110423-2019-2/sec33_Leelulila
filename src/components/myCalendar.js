import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const dummyEvents = [
  {
    allDay: false,
    end: new Date('December 09, 2017 20:00:00'),
    start: new Date('December 09, 2017 06:00:00'),
    title: 'hi',
  }
]

const MyCalendar =() => {
  console.log('calendar test')
  return(<div>
    <Calendar
      localizer={localizer}
      events={dummyEvents}
      startAccessor="12/1/20"
      endAccessor="5/12/20"
      style={{ height: 500}}
    />
  </div>)
  
  }

  export default MyCalendar;