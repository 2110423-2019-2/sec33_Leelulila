import React, {Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const dummyEvents = [

  {
    // get from Back-end
    hexColor: getRandomColor(),
    end: new Date('March 12, 2020 20:00:00'),
    start: new Date('March 12, 2020 06:00:00'),
    title: 'test',
  },

  {
    // get from Back-end
    hexColor: getRandomColor(),
    allDay: false,
    end: new Date('March 11, 2020 07:00:00'),
    start: new Date('March 11, 2020 06:00:00'),
    title: 'Pam hate teemo',
  },
]

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
          n+=1
          console.log(notes)
          console.log(n)
          // return (<JobList  JobName={notes.JobName} JobDetail={notes.JobDetail} 
          //   Wages={notes.Wages} Location={notes.Location}
          //    BeginTime={notes.BeginTime} EndTime={notes.EndTime} Date={notes.Date} Employer={notes.Employer}/>)
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
      console.log(jsonData['job'] + 'intgetjob')
      self.state.currentJobs.push(jsonData['job'])
      self.setState({ ready: true })
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    console.log(dummyEvents[0].title)
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