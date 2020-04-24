import React, { Component } from 'react';
// import { Grid, Button, TextField } from '@material-ui/core';
import '../style.css';
// import ListingJobForm from '../components/ListingJobForm'
// import fire from '../config/firebase';
import Card from '@material-ui/core/Card';
import JobList from '../components/JobList'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import axios from 'axios';
// import { set } from 'date-fns';




class PendingJobCardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pendingJobs: [],
      ready: false
    }
    this.getJobByID.bind(this);
  }



  componentDidMount() {
    var l = this.props.pendingJob;
    var i;
    for (i = 0; i < l.length; i++) {
      this.getJobByID(l[i])
    }
  }

  renderList() {
    if (this.state.ready & this.state.pendingJobs.length > 0) {
      console.log(this.state, 'state before map')
      var n = 0
      return (
        this.state.pendingJobs.map((notes) => {
          n += 1
          // console.log(notes)
          return (<JobList JobName={notes.JobName} JobDetail={notes.JobDetail}
            Wages={notes.Wages} Location={notes.Location}
            BeginTime={notes.BeginTime} EndTime={notes.EndTime} Date={notes.Date} Employer={notes.Employer} />)
        })
      )
    }
    else {
      // console.log('empty')
      return (
        <Typography variant='body2' gutterBottom align='center'>
          Empty
        </Typography>)
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
      // console.log(jsonData['job'] + 'intgetjob')
      self.state.pendingJobs.push(jsonData['job'])
      self.setState({ ready: true })
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    // console.log('render')
    // console.log(this.state)
    return (
      <div style={{ marginTop: '10px', marginLeft: '10%', width: '80%', marginButtom: '100px' }}>
        <Card >
          <CardContent>
            <Typography variant='h6' gutterBottom align='center' color='error'>
              Pending Jobs
            </Typography>
            {this.renderList()}
          </CardContent>
        </Card>
      </div>
    );
  }
}



export default PendingJobCardList;