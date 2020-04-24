import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

var dummyEvents = []

var i = 0

function getRandomColor(i) {
  if (i<0){
    return '#E0E0E0'
  }
  else{
    var colors = ['#FF9999', '#FFCC99', '#FFFF99', '#CCFF99', '#99FF99', '#99FFCC', '#99FFFF', '#99CCFF', '#9999FF', '#CC99FF', '#FF99FF', '#FF99CC']
    return colors[(i%12)]
  } 
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
    var i;
    for (i = 0; i < l.length; i++) {
      this.getJobByID(l[i])

    }
  }


  renderList() {
    dummyEvents = []
    if (this.state.ready) {
      var n = 0
      return (
        this.state.currentJobs.map((notes) => {
          n += 1
          i = parseInt(notes.BeginTime.slice(0, 2))-1
          dummyEvents.push({ hexColor: getRandomColor(i), end: new Date(notes.Date + ' ' + notes.EndTime), start: new Date(notes.Date + ' ' + notes.BeginTime), title: notes.JobName })
          // console.log(i)
        })

      )
    }
  }

  getJobByID(id) {
    let self = this;
    fetch("/api/jobs/" + id, {
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
    { this.renderList() }
    return (
      <div>
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