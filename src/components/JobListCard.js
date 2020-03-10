import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import '../style.css';
import ListingJobForm from '../components/ListingJobForm'
import fire from '../config/firebase';
import Card from '@material-ui/core/Card';
import JobList from '../components/JobList'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { set } from 'date-fns';




class JobCardList extends Component {

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
    console.log(l+'didmount')
    var i;
    for (i = 0; i < l.length; i++) {
      this.getJobByID(l[i])
    }
  }

  renderList() {
    if (this.state.ready) {
      console.log(this.state, 'state before map')      
      var n = 0
      return (
        this.state.currentJobs.map((notes) => {
          n+=1
          console.log(notes)
          return (<JobList  JobName={notes.JobName} JobDetail={notes.JobDetail} 
            Wages={notes.Wages} Location={notes.Location}
             BeginTime={notes.BeginTime} EndTime={notes.EndTime} Date={notes.Date} Employer={notes.Employer}/>)
        })
      )
    }
    else{
      return(<JobList title={'Load Job List'} />)
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
      console.log(jsonData['job']+ 'intgetjob')
      self.state.currentJobs.push(jsonData['job'])
      self.setState({ ready: true })
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    console.log('render')
    console.log(this.state)
    return (
      <div style={{ marginTop: '100px', marginLeft: '10%', width: '80%', marginButtom: '100px' }}>
        <Card >
          <CardContent>
            <Typography variant='h6' gutterBottom align='center'>
              Your Jobs
            </Typography>
            {this.renderList()}
          </CardContent>
        </Card>
      </div>
    );
  }
}



export default JobCardList;