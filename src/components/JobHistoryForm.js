import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import EmployeeListModal from '../components/EmployeeListModal';
import AcceptedEmployeeListModal from '../components/AcceptedEmployeeListModal';
import EmployerMenuAction from './EmployerMenuAction';
import CreateReviewModal from './CreateReviewModal';
import EditJobOwnedForm from '../components/EditJobOwnedForm';

class JobHistoryForm extends Component {

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
    this.Status = props.Status;
    this.WorkKey = props.WorkKey;
    this.CurrentEmployee = props.CurrentEmployee;

    this.state = {
      checkgetjobalready: false,

    }

    // this.onGetjob = this.onGetjob.bind(this);

    // this.onStartjob = this.onStartjob.bind(this);

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
      <Card alignItems="left" id="ListingJobForm" style={{ marginBottom: '20px', height: '300px' }}>
        <div>
          <Grid style={{ display: 'flex', marginLeft: '30px' }}>
            <Grid item xs={12}>
              <h2 class='title'>Title : {this.JobName}</h2>
              <p>Detail : {this.JobDetail}</p>
              <p>Wages : {this.Wages} ฿</p>
              <p>Location : {this.Location}</p>
              <p>Date : {this.Date}</p>
              <p>Time : {this.BeginTime} - {this.EndTime}</p>
              <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <CreateReviewModal JobName={this.JobName} />
              </Grid>
            </Grid>
          </Grid>


        </div>
      </Card>
    );

  }





}

JobHistoryForm.propTypes = {
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
export default JobHistoryForm;