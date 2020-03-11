import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

var dummyEvents = []

function getRandomColor() {
  var letters = 'ABCDE'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = event.hexColor;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block',
    justifyContent: 'center',
  };
  return {
    style: style
  };
}

class MyCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentJobs: [],
      ready: false
    }
    this.getJobByID.bind(this);
  }

  componentDidMount() {
    var l = this.props.currentJob;
    console.log(l + 'didmount')
    var i;
    for (i = 0; i < l.length; i++) {
      this.getJobByID(l[i])
    }
  }


  renderList() {
    if (this.state.ready) {
      var n = 0
      return (
        this.state.currentJobs.map((notes) => {
          n += 1
          // return (<JobList  JobName={notes.JobName} JobDetail={notes.JobDetail} 
          //   Wages={notes.Wages} Location={notes.Location}
          //    BeginTime={notes.BeginTime} EndTime={notes.EndTime} Date={notes.Date} Employer={notes.Employer}/>)
          dummyEvents.push({ hexColor: getRandomColor(), end: new Date(notes.Date+' '+notes.EndTime), start: new Date(notes.Date+' '+notes.BeginTime), Title: notes.JobName})
          console.log(dummyEvents)
        })
      )
    }
  }

  getJobByID(id) {
    let self = this;
    fetch("/job/" + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (jsonData) {
      self.state.currentJobs.push(jsonData['job'])
      self.setState({ ready: true })
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        {this.renderList()}
        <Calendar
          views={['month', 'week']}
          defaultView="month"
          localizer={localizer}
          events={dummyEvents}
          // startAccessor="12/1/20"
          // endAccessor="5/12/20"
          style={{ height: 600, width: 1000 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    );
  }
}

export default MyCalendar;