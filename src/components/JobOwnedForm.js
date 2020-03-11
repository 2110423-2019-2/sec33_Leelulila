import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import EmployeeListModal from '../components/EmployeeListModal';
import AcceptedEmployeeListModal from '../components/AcceptedEmployeeListModal';



class JobOwnedForm extends Component {

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

    this.state = {
      checkgetjobalready: false,

    }

    // this.onGetjob = this.onGetjob.bind(this);

    this.onDeletejob = this.onDeletejob.bind(this);
    // this.onStartjob = this.onStartjob.bind(this);

  }



  onDeletejob() {
    fetch("/job/" + this.WorkKey, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(window.location.reload(false))
    // window.location.reload(false);
  }



  // onStartjob(){
  //   var firebaseRef = fire.database().ref('ListingJob')

  //   firebaseRef.child(this.Workkey).update({
  //     Status:'In Duty'
  //   })
  //   window.location.reload(false);
  // }


  render() {
    //   var email = fire.auth().currentUser.email;
    //   var indexofat = email.indexOf('@');
    //   var subemail = email.substring(0,indexofat);

    return (
      <Card alignItems="left" id="ListingJobForm" style={{ marginBottom: '20px', height: '270px' }}>
        <div>
          <Grid style={{ display: 'flex' }}>
            <Grid item md={10}>
              <h2>Title : {this.JobName}</h2>
              <p>Detail : {this.JobDetail}</p>
              <p>Wages : {this.Wages} ฿</p>
              <p>Location : {this.Location}</p>
              <p>Date : {this.Date}</p>
              <p>Time : {this.BeginTime} - {this.EndTime}</p>
            </Grid>
            <Grid>
              <EmployeeListModal
              WorkKey={this.WorkKey} />
              <AcceptedEmployeeListModal
              WorkKey={this.WorkKey} />
              <Button variant="contained" color="secondary" onClick={this.onDeletejob} style={{ height: '40px', marginTop: '20%', marginRight: '20px' }}>Delete</Button>
            </Grid>
          </Grid>


        </div>
      </Card>
    );

  }





}

JobOwnedForm.propTypes = {
  JobName: PropTypes.string,
  JobDetail: PropTypes.string,
  Wages: PropTypes.string,
  Amount: PropTypes.string,
  Date: PropTypes.string,
  BeginTime: PropTypes.string,
  EndTime: PropTypes.string,
  Location: PropTypes.string,
  Employer: PropTypes.string
  // Status: PropTypes.string
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
export default JobOwnedForm;