import React, { Component } from 'react';
import fire from '../config/firebase';
import Grid from '@material-ui/core/Grid';
import JobListCard from '../components/JobListCard';
//import Calendar from '../components/Calendar'
import JobList from '../components/JobList';
import { Container } from '@material-ui/core';
import MyCalendar from '../components/myCalendar';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
    }
  }

  componentDidMount() {
    this.authListener();
    this.getProfile();
  }

  getProfile() {
    var user = fire.auth().currentUser;
    let self = this;
    fetch("/useremail/" + user.email, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (jsonData) {
      self.setState({ user: jsonData });
      return this.state.listing;
    }).catch(function (err) {
      console.log(err);
    });
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  render() {
    if (this.state.user.currentJob === undefined && this.state.user.pendingJob === undefined) return null
    else
      console.log(this.state.user.currentJob + ' propstransfer')
    return (
      <div >
        <Grid style={{ display: 'flex' }}>
          <Grid item sm={8} style={{ marginLeft: '5px', marginRight: '5px', marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <MyCalendar currentJob={this.state.user.currentJob} />
          </Grid>
          <Grid item sm={4} style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px' }}>
            <JobListCard currentJob={this.state.user.currentJob} pendingJob={this.state.user.pendingJob} id={'idkrub'} />
          </Grid>
        </Grid>
      </div>);

  }
}

export default Profile;