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


    this.state = {
      checkgetjobalready: false,

    }


  }


  render() {
    {console.log(this.CurrentEmployee)}
    if (fire.auth().currentUser.email == this.Employer) {
      return (
        <Card alignItems='center' id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: 'pink', opacity: '80%', borderRadius: '10%', alignItems: 'center' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <h2>(Owner)Title : {this.JobName}</h2>
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
                />

              </Grid>

            </Grid>
          </div>
        </Card>
      );

    }
    else if (this.CurrentEmployee.includes(fire.auth().currentUser.email)) {
      return (

        <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '250px', backgroundColor: 'pink', opacity: '80%', borderRadius: '10%' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <h2>(Already Apply)Title : {this.JobName}</h2>
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
                  <h2>Title : {this.JobName}</h2>
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