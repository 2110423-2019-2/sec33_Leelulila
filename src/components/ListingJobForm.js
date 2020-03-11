import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import JobCardModal from '../components/JobCardModal'
import fire from '../config/firebase';
import Modal from '@material-ui/core/Modal';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BeenhereIcon from '@material-ui/icons/Beenhere'; 

class ListingJobForm extends Component {

  constructor(props) {
    super(props);
    
    this.JobName = props.JobName;
    this.JobDetail = props.JobDetail;
    this.Wages = props.Wages;
    this.Amount = props.Amount;
    this.Date = props.Date;
    this.BeginTime = props.BeginTime;
    this.EndTime = props.EndTime;
    this.Location = props.Location;
    this.Employer = props.Employer;
    this.WorkKey = props.WorkKey;
    this.CurrentEmployee = props.CurrentEmployee;
    this.CurrentAcceptedEmployee = props.CurrentAcceptedEmployee;

    console.log(this.JobName + "created ")

    this.state = {
      checkgetjobalready: false,
      currentJobs: [],
      dayandtime: {}
    }
  }

  componentDidMount() {
    try {
      var l = this.props.currentJob;
      console.log('type')
      console.log(typeof (l))
      var i;
      for (i = 0; i < l.length; i++) {
        this.getJobByID(l[i])
      }
    }
    catch (err) {
      window.location.reload()
    }    
  }

  CreateDictDayTime() {

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
      if(self.state.dayandtime[jsonData['job']['Date']]==null)
      {
        self.state.dayandtime[jsonData['job']['Date']]=[]
      }
      var tuple = []
      tuple = [jsonData['job']['BeginTime'], jsonData['job']['EndTime']]
      self.state.dayandtime[jsonData['job']['Date']].push(tuple)
      console.log('state')
      console.log(self.state)
    }).catch(function (err) {
      console.log(err);
    })
  }


  render() {
    if (fire.auth().currentUser.email == this.Employer) {
      return (
        <Card alignItems='center' id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#86c6f6', opacity: '80%', borderRadius: '10%', alignItems: 'center' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <StarsIcon style={{ fontSize: 'xx-large', color: '#FFFB00' }} />
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {this.Wages} ฿</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <EventOutlinedIcon />
                  <p> : {this.Date}</p>
                </div>

                <JobCardModal
                  JobName={this.JobName}
                  JobDetail={this.JobDetail}
                  Wages={this.Wages}
                  Amount={this.Amount}
                  Date={this.Date}
                  BeginTime={this.BeginTime}
                  EndTime={this.EndTime}
                  Location={this.Location}
                  Employer={this.Employer}
                  WorkKey={this.WorkKey}
                  CurrentEmployee={this.CurrentEmployee}
                  DayAndTime = {this.state.dayandtime}
                />

              </Grid>

            </Grid>
          </div>
        </Card>
      );

    }
    else if (this.CurrentEmployee.includes(fire.auth().currentUser.email) || this.CurrentAcceptedEmployee.includes(fire.auth().currentUser.email)) {
      return (

        <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#e5b1ea', opacity: '80%', borderRadius: '10%' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <BeenhereIcon style={{ ontSize: 'xx-large', color: '#ad16ac' }} />
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {this.Wages} ฿</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <EventOutlinedIcon />
                  <p> : {this.Date}</p>
                </div>

                <JobCardModal
                  JobName={this.JobName}
                  JobDetail={this.JobDetail}
                  Wages={this.Wages}
                  Amount={this.Amount}
                  Date={this.Date}
                  BeginTime={this.BeginTime}
                  EndTime={this.EndTime}
                  Location={this.Location}
                  Employer={this.Employer}
                  WorkKey={this.WorkKey}
                  CurrentEmployee={this.CurrentEmployee}
                  DayAndTime = {this.state.dayandtime}
                />
              </Grid>

            </Grid>


          </div>
        </Card>
      );

    }

    else {
      return (
        <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: 'pink', opacity: '80%', borderRadius: '10%' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AddCircleIcon color='secondary' style={{ fontSize: 'xx-large' }} />
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {this.Wages} ฿</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <EventOutlinedIcon />
                  <p> : {this.Date}</p>
                </div>
                <JobCardModal
                  JobName={this.JobName}
                  JobDetail={this.JobDetail}
                  Wages={this.Wages}
                  Amount={this.Amount}
                  Date={this.Date}
                  BeginTime={this.BeginTime}
                  EndTime={this.EndTime}
                  Location={this.Location}
                  Employer={this.Employer}
                  WorkKey={this.WorkKey}
                  CurrentEmployee={this.CurrentEmployee}
                  DayAndTime = {this.state.dayandtime}
                />

              </Grid>

            </Grid>


          </div>
        </Card>
      );
    }
  }





}

ListingJobForm.propTypes = {
  JobName: PropTypes.string,
  JobDetail: PropTypes.string,
  Wages: PropTypes.string,
  Amount: PropTypes.string,
  Date: PropTypes.string,
  BeginTime: PropTypes.string,
  EndTime: PropTypes.string,
  Location: PropTypes.string,
  Employer: PropTypes.string,
  WorkKey: PropTypes.string,
  Status: PropTypes.string
  // this.JobName = props.JobName;
  // this.JobDetail = props.JobDetail;
  // this.Wages = props.Wages;
  // this.Amount = props.Amount;
  // this.Date = props.Date;
  // this.BeginTime = props.BeginTime;
  // this.EndTime = props.EndTime;
  // this.Location = props.Location;
  // this.Employer = props.Employer;
}
export default ListingJobForm;